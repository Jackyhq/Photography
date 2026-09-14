# 项目维护记录

日期：2026-09-14。检查基于 `main` 的 `e9dfca5`，修复在隔离 worktree 中使用公开合成照片验证。此次没有修改私有照片、照片文案或原工作区的生成清单。

## 结果

- [PR #87](https://github.com/Jackyhq/Photography/pull/87) 的 GitHub Actions 和 Vercel 均因 MapLibre 6 移除隐式全局类型而报 8 条 TS2503。相关组件改为显式导入 GeoJSON / MapLibre 类型，并声明 `@types/geojson`。
- MapLibre 升至 `6.4.1`，同时将 `react-map-gl` 升至支持 v6 的 `8.1.3`，避免旧 wrapper 访问已移除的 `map.transform`。探索地图和照片小地图均通过 Vite `?worker&url` 配置 Worker。
- Sharp 升至 `0.35.4`；builder 和 OpenGraph 脚本改用显式类型导入，并移除指向 Sharp 内部旧声明文件的 TypeScript 路径别名。
- Vitest / coverage 升至 `4.1.11`，baseline-browser-mapping、Browserslist、humanfs 和 js-yaml 更新至修复版本；覆盖锁文件中的旧传递依赖。
- 本地 `pnpm audit` 从 12 项（1 critical、6 high、5 moderate）降为 0。GitHub 的 11 条告警需修复合并到默认分支后由平台重新评估；此次没有手动忽略告警。

## 告警逐项核对

这里区分依赖版本是否受影响与当前站点是否可利用。没有仓库 SECURITY.md；以下静态结论依据架构、部署方式和实际调用点。`not_actionable` 仅表示当前配置没有使用告警所需的入口，并不否认上游包的漏洞，也不作为忽略依赖升级的理由。

| GitHub 告警 | 包 / 位置                       | 静态结论       | 证据与限制                                                                 | 修复版本 |
| ----------- | ------------------------------- | -------------- | -------------------------------------------------------------------------- | -------- |
| #193        | js-yaml / lock                  | needs_review   | 经 ESLint 解析开发配置；未证实不可信 YAML 能跨越受支持边界。               | 4.3.2    |
| #192        | sharp / lock                    | needs_review   | builder 处理照片字节；私有照片源限制了攻击面，但扩展名检查不是解码器隔离。 | 0.35.4   |
| #191        | sharp / root package            | needs_review   | 图片生成脚本使用 Sharp；未证实外部攻击者能提供输入。                       | 0.35.4   |
| #190        | sharp / builder package         | needs_review   | 图片管线直接处理 buffer；未执行恶意原生解码样本。                          | 0.35.4   |
| #189        | vitest / lock                   | not_actionable | 当前运行 jsdom 单元测试，没有 browser-mode mock RPC 服务。                 | 4.1.11   |
| #188        | baseline-browser-mapping / lock | needs_review   | 开发工具依赖；未发现面向站点用户的参数入口。                               | ≥2.11.0  |
| #187        | @vitest/mocker / lock           | not_actionable | 没有独立 mockerPlugin / interceptorPlugin WebSocket 服务。                 | 4.1.11   |
| #186        | maplibre-gl / lock              | not_actionable | 两处 Map 组件均关闭 attributionControl，当前未使用告警中的 HTML sink。     | 6.4.1    |
| #185        | maplibre-gl / web package       | not_actionable | 同上；仍升级依赖并验证 DOM.sanitize 修复。                                 | 6.4.1    |
| #184        | browserslist / lock             | needs_review   | 构建工具可读取统计配置；攻击者对受支持构建环境的控制未建立。               | 4.28.7   |
| #182        | @humanfs/node / lock            | not_actionable | 经 ESLint 引入，所检调用为遍历/目录检查，没有 copy/copyAll。               | 0.16.8   |

需核实条件的队列顺序：Sharp 三项、Browserslist、js-yaml、baseline-browser-mapping；它们均已做版本修复，不声称线上利用已经发生。

## 验证

- Node `24.20.0` / pnpm `10.19.0`。
- 严格公开 fixture manifest 构建通过；没有在维护者的原清单上生成夹具。
- 全项目 lint、类型检查、单元测试及覆盖率门槛通过。
- 文档构建通过，生成 11 篇页面及 404、robots、sitemap。
- 生产图库构建通过；完整桌面/移动 E2E：39 项通过，3 项为设备专属场景跳过。
- 新增地图回归覆盖真实 Worker 创建、GeoJSON 的 WebGL 像素输出、缩放、标记弹层、小地图 onLoad 与零页面异常；本地测试地图数据不依赖第三方瓦片。
- 单独验证 MapLibre sanitizer 清除连续和嵌套危险属性，同时保留正常 HTTPS 链接。
- 单独完成 Sharp AVIF 编码/解码；本地确认 libheif `1.23.2`、libvips `8.18.6`。未运行恶意原生解码 PoC，未验证生产 Linux 实机。
- 独立只读复核没有发现可操作的修复遗漏；bundle budget 复核通过。

## 体积变化

MapLibre 6 将 Worker 独立输出。旧检查假设只有一个文件，且地图路由没有统计独立 Worker。现在明确要求主文件、Worker 和 HEIC 各一份，并检查它们都不进入 PWA 安装预缓存。

| 项目                     | gzip      | Brotli    | 预算          |
| ------------------------ | --------- | --------- | ------------- |
| MapLibre 主文件 + Worker | 378.9 KiB | 312.1 KiB | 390 / 320 KiB |
| 地图路由（含 Worker）    | 418.3 KiB | 345.8 KiB | 430 / 380 KiB |
| GPS 照片查看器           | 508.6 KiB | 424.5 KiB | 600 / 520 KiB |

上游升级使 MapLibre 合计 gzip 比旧 360 KiB 门槛高约 19 KiB，因此该门槛调为 390 KiB；Brotli、地图路由和 GPS 路由预算保持原值。回归测试保证 Worker 缺失、未计入路由或意外预缓存都会失败。

## 定期维护与后续

已在本 Codex 任务设置每周一北京时间 10:00 检查依赖告警、开放 PR 和失败 Actions。状态没有实质变化时不通知，发现问题时先做隔离修复和验证。用户已授权本次及后续维护提交修复 PR；等待最新提交的全部适用检查通过且复核无问题后，直接合并到 main，再确认部署与告警状态。

- 最新 main 部署已成功；9 月 7 日较早的图库点击失败已由当前基线修复。
- #87 的 CodeQL 比较为 neutral，提示缺少 actions / javascript-typescript 对应配置；本轮没有修改远端扫描设置，合并前应留意新 PR 的扫描结果。
- GitHub 显示安全报告政策未配置；现有私密漏洞报告渠道已开启。本轮没有擅自制定支持版本或漏洞响应时限。
- 本记录中的验证数字来自提交前的隔离检查；远端 PR 检查、合并和部署结果以 GitHub 对应记录为准。

参考：[MapLibre 安全公告](https://github.com/maplibre/maplibre-gl-js/security/advisories/GHSA-jrc7-96c5-q579)、[React wrapper 版本说明](https://github.com/visgl/react-map-gl/releases)、[MapLibre Vite 设置](https://github.com/maplibre/maplibre-gl-js/blob/v6.4.1/docs/index.md)、[Sharp 安全公告](https://github.com/lovell/sharp/security/advisories/GHSA-rgj7-g3m4-5g8c)。
