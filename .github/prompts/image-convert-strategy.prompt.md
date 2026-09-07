---
mode: agent
---

# 图像转换策略指引

添加浏览器不支持的格式前，先阅读根目录和 `apps/web/AGENTS.md`。当前策略入口是 `apps/web/src/lib/image-convert/index.ts`，不是旧的 `image-converter-strategies.ts`。

## 当前实现入口

| 职责                              | 文件                                                |
| --------------------------------- | --------------------------------------------------- |
| 策略接口和返回类型                | `apps/web/src/lib/image-convert/type.ts`            |
| MIME 检测、延迟注册、相同请求去重 | `apps/web/src/lib/image-convert/index.ts`           |
| 转换并发队列                      | `apps/web/src/lib/image-convert/pipeline.ts`        |
| HEIC 转换与缓存参考               | `apps/web/src/lib/image-convert/strategies/heic.ts` |
| TIFF 转换参考                     | `apps/web/src/lib/image-convert/strategies/tiff.ts` |
| 图片请求与取消                    | `apps/web/src/lib/image-loader-manager.ts`          |
| Blob 缓存与释放                   | `apps/web/src/lib/media-blob-cache.ts`              |

现有注册策略是 HEIC 和 TIFF。不要以不存在的 WebP、AVIF 策略作为参考，也不要为浏览器已经支持的格式增加不必要的转换。

## 扩展步骤

1. 核对目标格式、MIME 类型和浏览器原生支持情况。管理器已经用 `file-type` 检测格式；`shouldConvert` 负责判断是否仍需要转换。
2. 在 `strategies/` 新建聚焦于该格式的实现，遵循 `ImageConverterStrategy` 的 `getName`、`getSupportedFormats`、`shouldConvert`、`convert` 签名。
3. 在 `ImageConverterManager` 构造函数内参照现有注册延迟导入。重型解码库留在策略模块中，不能通过入口文件的静态 import 提前加载。

```typescript
// 当前 HEIC 注册方式；新增格式应使用它自己的名称、MIME 和模块。
this.registerLazyStrategy('HEIC', ['image/heic', 'image/heif'], async () => {
  const { HeicConverterStrategy } = await import('./strategies/heic')
  return new HeicConverterStrategy()
})
```

`registerStrategy` 仍供已实例化的策略使用；不要将它作为重型转换器的默认注册方式。`registerLazyStrategy` 是管理器内部方法。

4. 返回真实的 `url`、`convertedSize`、`format`、`originalSize`。状态文案使用现有 i18n/`LoadingCallbacks`，只在有真实进度时报告进度。
5. 复用管理器的并发队列和相同 URL 请求去重。先确认所有权，再把可复用结果加入现有媒体缓存；每个创建的 Blob URL 必须有对应的释放路径。
6. 调用方取消或切图后，旧结果不能更新当前查看器。底层解码器未必能中断，不能仅凭外部 AbortSignal 就宣称转换已停止；必须丢弃失效结果并正确释放未接管资源。

## 验证

从仓库根目录运行相关单测和 `pnpm --filter web type-check`，再检查生产构建与 `pnpm run bundle:budget`。用公开合成或专门授权的样本覆盖：

- 普通 JPEG/PNG 路径不会下载新转换库。
- 浏览器原生支持时跳过转换；不支持时转换输出能够显示。
- 相同请求复用，连续请求受并发限制。
- 转换失败、切图和关闭查看器时，状态及资源能够正确收尾。

不要复制大型真实照片进源码作为测试样本。若新增样本需要生成 manifest，使用根 `AGENTS.md` 的独立 fixture 工作流。
