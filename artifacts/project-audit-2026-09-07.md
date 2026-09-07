项目审计：SEO、前端性能、代码结构、项目文档与 AI 指引

审计日期：2026-09-07。源码基线：`e6b7b50`。以下为修复前的审计快照，保留当时的证据与行号；后续已按用户授权开展环境升级及源码修复，当前处理状态见 [修复记录](project-fixes-2026-09-07.md)。审计阶段本身没有修改应用源码或私有照片。

现有工程基础较完整：图库有单图静态 HTML、图片 sitemap、结构化数据、响应式缩略图、列表虚拟化、按功能拆包和资源预算，CI 也覆盖类型检查、测试和构建。剩余问题主要是这些机制的边界没有统一，以及文档导航、代码生成和遗留指引的偏差。没有必要因为项目使用 SPA 或组件文件较长就整体重写。

优先级说明：P2 表示应安排修复的正常优先级缺陷；P3 表示工程保障、文档准确性或增强项。以下结论同时标明验证方式，不能把源码推导当成线上性能测量。

**验证基线**

| 检查                     | 结果与范围                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `pnpm test`              | 64 个测试文件、208 项测试通过                                                                        |
| `pnpm run lint:check`    | 通过；使用不自动修改代码的检查命令                                                                   |
| `pnpm run type-check`    | 全 workspace 通过；另见第 13 项的覆盖范围缺口                                                        |
| 图库生产构建             | 临时副本中直接执行 Vite build，通过；使用现有 389 张照片 manifest，没有重新处理照片                  |
| `pnpm docs:build`        | 临时副本构建通过                                                                                     |
| `pnpm run bundle:budget` | 临时副本通过，首页各语言启动资源约 311.9–326.3 KiB gzip；预算 340 KiB                                |
| 单图 HTML                | 389 页，总计约 3.41 MiB，最大约 9.2 KiB                                                              |
| 浏览器抽查               | 首页正常渲染；复现首次单图返回首页的元数据残留，以及文档浏览器后退问题                               |
| 定向诊断                 | 真实 WebGL destroy 和 HistogramChart 的临时复现测试均暴露问题，见第 8、9 项；这些不是原有 208 项测试 |
| 线上只读请求             | 验证文档站错误路径、robots/sitemap 返回内容，以及 canonical/重定向行为                               |

本机 Node 为 22.17.0，项目和 CI 约定 Node 24。本次没有运行完整 Playwright E2E、coverage 或 Lighthouse/CrUX 测量；不据此报告真实用户 LCP、INP 或性能评分。构建数据来自当前本地 manifest，不代表线上最新照片数量。临时构建没有 Git 元数据，构建日志中取 Git hash 的提示属于隔离环境差异。

**1. [P2] 图库照片入口缺少可抓取链接，首页原始 HTML 也没有照片入口**

照片卡片在 [MasonryPhotoItem.tsx:440](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/modules/gallery/MasonryPhotoItem.tsx#L440) 使用 `m.button` 和点击回调，没有指向单图页面的 `href`。浏览器渲染后依然如此。首页原始 HTML 主要是启动画面，没有照片链接和图片正文。

影响：图库虽然可以通过 sitemap 暴露单图 URL，但没有形成从首页到作品的正常内链；只解析 HTML 或链接的读取器无法沿照片入口继续读取，用户也不能直接通过链接语义在新标签打开作品。Google 对可抓取链接的建议是带有效 `href` 的 anchor，而非仅有脚本点击事件的标签。[Google 官方说明](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

建议：保留现有查看器交互，普通点击可由路由接管，但卡片应具备真实单图链接；保留修饰键和新标签行为。另为首页或分类页提供适量构建时生成的作品链接与描述，避免一次塞入全部作品。文档侧栏 [Sidebar.tsx:121](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/docs/src/components/Sidebar.tsx#L121) 也应使用真实文档链接；文档正文已有交叉链接，无需声称整个文档站无链接。

验证：源码、首页原始 HTML、渲染后的浏览器 DOM。

**2. [P2] 单图的无 JavaScript 回退被全屏启动画面遮挡**

[photo-page-meta.ts:231](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/plugins/vite/photo-page-meta.ts#L231) 确实输出了含图片和说明的 `noscript`。但 [index.html:106](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/index.html#L106) 的启动画面固定覆盖整个视口，`z-index:9999`，只有 React 启动后才会被替换。

影响：JavaScript 被禁用时，回退内容虽然存在于 HTML，却被启动画面遮住。脚本加载失败时也缺少有用的错误回退。这里不能推导成“Google 完全无法索引”，因为结构化数据及原始文本仍存在。

建议：至少在 `noscript` 中隐藏启动画面并设置回退图片的响应式样式；进一步让静态正文先可见，再由交互层增强。为入口脚本失败提供可用状态。

验证：生产 HTML 和 CSS 覆盖关系；本轮未做真正禁用 JavaScript 的浏览器截图。

**3. [P2] 首次从单图进入后返回首页，会残留该照片的元数据**

[useTitle.ts:7](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/hooks/useTitle.ts#L7) 和 [usePageMeta.ts:46](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/hooks/usePageMeta.ts#L46) 在卸载时恢复进入页面时捕获的值。首次请求单图静态 HTML 时，捕获的就是该照片信息；首页没有显式设置自己的完整元数据。

浏览器已复现：首次访问 `/photos/20260823082234/`，关闭查看器回到 `/` 后，canonical 已变成首页，但标题仍为“弧形阶梯 | Jackywhq's Photography”，`og:url` 仍指向该照片。已有 Service Worker 的访问可能从首页 app shell 开始，因此不是每种访问顺序都能复现。

另外，照片 JSON-LD 只由构建插件写入，缺少随客户端路由变化更新或移除的机制。应避免静态脚本、照片 hook、首页各自维护部分 head，产生互相矛盾的结果。

建议：建立统一的按路由计算的页面元数据模型，首页、照片、地图分别明确设置 title、description、canonical、OG 和 JSON-LD；构建和运行时共用纯数据生成逻辑。验收必须包含“新会话直达单图 → 下一张 → 回首页”。

验证：全新本地 origin 的真实浏览器交互与 head 读取；JSON-LD 生命周期为源码检查。

**4. [P2] 线上文档站把不存在路径和机器文件回退成 200 首页**

2026-09-07 使用正常浏览器 User-Agent 请求，下列地址均返回 `200`、`text/html`、首页 Overview 标题及根 canonical：

- [sitemap.xml](https://docs.photo.jackyw.cn/sitemap.xml)
- [robots.txt](https://docs.photo.jackyw.cn/robots.txt)
- [本轮不存在路径](https://docs.photo.jackyw.cn/audit-missing-page-seo-20260907/)

影响：不存在页面呈现 soft-404 行为，sitemap 请求拿不到 XML，robots 请求拿不到有效的规则文件。缺少 robots.txt 本身不等于禁止抓取；这里的问题是错误的响应内容和 catch-all 行为。

仓库内 [docs/scripts/build.ts:24](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/docs/scripts/build.ts#L24) 只输出已有路由 HTML，没有生成 sitemap、robots 或 404。线上回退的完整原因还涉及托管配置，不能仅凭这段代码确定具体是哪条平台规则。

建议：静态文档站优先按真实文件服务；为未知 URL 返回真实 404，为 sitemap/robots 提供对应内容及 MIME 类型，增加部署后 HTTP smoke check。不要套用图库 SPA 的所有回退规则。

验证：线上只读 HTTP 请求和构建输出。

**5. [P3] canonical 与静态目录 URL 的尾斜杠规则不统一**

文档路由使用 `/architecture` 生成 canonical，而线上该地址重定向到 `/architecture/`。见 [docs/scripts/build.ts:60](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/docs/scripts/build.ts#L60) 与 [docs/src/site.ts:13](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/docs/src/site.ts#L13)。图库地图页的构建元数据使用 `/explory/`，客户端 [photo-route.ts:7](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/lib/photo-route.ts#L7) 则去掉非照片路径的尾斜杠。

建议：统一规范 URL 函数，让 HTML canonical、运行时 canonical、导航链接、sitemap 和服务器重定向一致。优先修正无谓的重定向和矛盾信号，不应夸大成已证实的排名损失。

验证：源码、静态输出及线上重定向抽查。

**6. [P2] 下一屏缩略图预取和实际显示使用不同尺寸规则**

[useUpcomingThumbnailPrefetch.ts:76](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/hooks/useUpcomingThumbnailPrefetch.ts#L76) 根据传入列宽并限制最高 2 倍 DPR 选图，[MasonryRoot.tsx:222](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/modules/gallery/MasonryRoot.tsx#L222) 传入布局列宽参数；卡片却按 [MasonryPhotoItem.tsx:25](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/modules/gallery/MasonryPhotoItem.tsx#L25) 的固定 `50vw / 33vw / 350px` 选图。

默认移动布局的 150px 参数、390px 视口、DPR 2/3 下，预取算法选 360w，而实际 `50vw` 声明通常使浏览器选 640w。这样预取的资源可能无法用于进入视口后的显示，下载两种尺寸。浏览器缓存、节流和选图策略会影响是否实际发生，不能把它写成所有手机必现。

建议：预取和图片使用同一份实际尺寸、`srcset` 和 `sizes` 规则；优先让浏览器用相同响应式声明选图。检查用户调整列数后的情况。

验证：代码路径和尺寸计算；本轮未完成移动浏览器网络瀑布图复现。现有 360w 文件平均约 20.1 KB，若 18 张预取均未复用，额外流量量级约 360 KB，这是估算。

**7. [P2] 查看器的小缩略图固定下载 640w**

[GalleryThumbnail.tsx:249](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/components/ui/photo-viewer/GalleryThumbnail.tsx#L249) 为 48/64px 的缩略图只设置 `src=photo.thumbnailUrl`，没有响应式候选；[production-thumbnail.ts:1](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/plugins/vite/__internal__/production-thumbnail.ts#L1) 的生产归一化使该字段选择 640w。

本地 389 组文件实测：360w 总计 7,832,676 B，640w 总计 22,271,124 B，平均分别约 20.1 KB 和 57.3 KB，后者为前者的 2.84 倍。这是资源大小比较，不代表每次打开都下载全部 389 张；缩略条已有虚拟化。

建议：复用已有 WebP `srcset` 并将 `sizes` 设为实际 itemSize，保留浏览器 DPR 选择。地图小标记也可检查相同用法，暂不必新增生成规格。

验证：渲染源码、生产字段归一化及实际文件大小。

**8. [P2] WebGL 销毁没有清理瓦片纹理和活动缩放动画**

[WebGLImageViewerEngine.ts:1034](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/webgl-viewer/src/WebGLImageViewerEngine.ts#L1034) 清理了 LOD、主纹理、部分缓冲和 worker，却未遍历删除 `tileCache` 中的纹理。动画循环在 [同文件:595](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/webgl-viewer/src/WebGLImageViewerEngine.ts#L595) 申请 RAF，但 destroy 没有取消该动画或设置 `isAnimating=false`。

影响：缩放后切图或关闭时，资源释放依赖后续回收；尚未结束的动画可能继续访问已销毁的渲染对象。本轮没有证明永久内存泄漏，也没有测量真实 GPU 占用。

直接调用真实 destroy 并记录 GPU 清理调用，结果为 `deletedTileTextures:0, remainingTiles:1, isAnimating:true`。

建议：明确实例销毁状态；逐项释放并清空瓦片纹理、清空待处理队列、取消动画帧，并让异步回调在销毁后停止提交结果。

验证：审计时的独立临时诊断测试（未入库）；修复后的正式回归见 [WebGLImageViewerEngine.test.ts](../packages/webgl-viewer/src/WebGLImageViewerEngine.test.ts)。测试只在临时副本，断言失败用于证明缺陷。

**9. [P2] 快速切图时旧请求会污染当前直方图状态**

[HistogramChart.tsx:192](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/components/ui/photo-viewer/HistogramChart.tsx#L192) 创建异步 Image 并设置 onload/onerror，但 effect 没有 cleanup 或请求版本检查。先切到新照片再收到旧照片的成功/失败回调，会提交过期直方图或错误状态。

定向复现顺序为 `old.webp → current.webp → old.onerror`，当前组件显示了旧请求导致的错误。

建议：effect 清理时解绑回调并标记取消，只有当前请求可以更新状态；按 URL 缓存计算结果可作为后续优化。

验证：审计时的独立临时诊断测试（未入库）；修复后的正式回归见 [HistogramChart.test.tsx](../apps/web/src/components/ui/photo-viewer/HistogramChart.test.tsx)。测试只在临时副本，断言失败用于证明缺陷。

**10. [P2] 文档站浏览器前进/后退不更新正文**

[docs/App.tsx:29](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/docs/src/App.tsx#L29) 通过组件 state 和 `history.pushState` 导航，却没有 `popstate` 监听。浏览器后退只改变地址，没有同步正文状态。

已在本地生产文档中复现：从首页点击 Architecture 后返回，地址回到 `/`，正文仍为 Architecture。侧栏选中态和标题也可能随之与地址不一致。

建议：使用路由器或补全 history 状态同步；导航链接使用真实 href，统一处理路径规范、元数据更新和滚动恢复。增加一个生产文档导航 E2E，覆盖点击、后退、前进和刷新。

验证：源码与真实浏览器操作。

**11. [P2] 常见文档标题可让代码生成失败**

[route-generater.ts:232](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/docs/plugins/route-generater.ts#L232) 把 route path/title 原样拼到单引号 TypeScript 字符串里。用 `title: Jacky's Guide` 调用真实生成器，会生成 `title: 'Jacky's Guide'`，Prettier 报 `',' expected`，中断构建。

建议：对插入源码的字符串统一用 `JSON.stringify`，包括标题、路径、import 字符串；增加撇号、反斜杠等输入的生成器测试。仅给现有标题去掉撇号不能解决问题。

验证：临时目录中的真实生成器最小复现，未修改现有文档。

**12. [P2] 专门给 AI 的转换策略 prompt 仍指导旧文件结构**

[image-convert-strategy.prompt.md:75](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/.github/prompts/image-convert-strategy.prompt.md#L75) 指向不存在的 `image-converter-strategies.ts`，列出当前不存在的 WebP/AVIF 策略，并以直接实例化注册作为默认示例。

实际结构见 [image-convert/index.ts:29](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/src/lib/image-convert/index.ts#L29)：HEIC/TIFF 通过 `registerLazyStrategy` 动态加载，具体实现放在 strategies 下。`registerStrategy` API 仍存在；问题是指引的路径和默认扩展方式已经过时，不应误报该 API 已不存在。

建议：把示例改到真实文件与延迟注册模式，补充转换队列、取消、Blob URL 所有权与清理约定，并要求验证普通 JPEG/PNG 路径不会引入新转换器。删掉不存在的示例策略，避免 AI 根据“参考实现”凭空扩展架构。

验证：文档和当前实现逐项对照。

**13. [P3] 全 workspace 类型检查并未覆盖所有生产脚本**

[package.json:33](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/package.json#L33) 递归执行各包的 type-check，但没有根目录脚本工程。通过 `tsc --listFilesOnly` 核对，根照片标准化/描述同步脚本、动态加载的照片描述 builder 插件、文档静态输出脚本没有纳入这些检查集合；web 工程仅顺带覆盖部分资产脚本。

建议：增加独立 `tsconfig.scripts.json` 和 `type-check:scripts`，覆盖根脚本、动态 builder 插件及 docs 输出脚本，纳入 CI。不要让根 type-check:scripts 再递归调用根 type-check。

这是保障范围缺口，不表示这些脚本目前已有类型错误。对路由生成器这类文本生成代码还需针对生成结果的测试，类型检查不能替代它。

**14. [P3] 部分包内 README 和性能文档仍有事实错误**

| 文档位置                                                                                                                                                                    | 与实现的偏差                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [storage/providers/README.md:95](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/builder/src/storage/providers/README.md#L95) | 多处示例导入不存在的 `@/core/storage`                                                                                 |
| [photo/README.md:89](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/builder/src/photo/README.md#L89)                         | `processThumbnailAndBlurhash` 示例传 6 个参数，当前签名为 4 个                                                        |
| [webgl-viewer/readme.md:52](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/webgl-viewer/readme.md#L52)                       | 目录树/扩展说明引用不存在的 types.ts、utils.ts、example.tsx；类型实际在 interface.ts                                  |
| [performance/index.mdx:64](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/docs/contents/performance/index.mdx#L64)           | 仍称 PWA 使用 script-defer 注入，实际为 AppUpdateProvider 注册；Google Fonts/Geist 加载描述也与当前系统字体实现不一致 |

建议：优先修正会直接产生错误代码的示例。对关键包导出和命令采用短小、可执行的示例，重复的目录树和配置值改为引用唯一权威入口。

**其他增强项**

- Sitemap 的修改时间应反映页面内容变化。[sitemap.ts:45](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/plugins/vite/sitemap.ts#L45) 优先取照片 `lastModified`，而 [local-provider.ts:235](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/packages/builder/src/storage/providers/local-provider.ts#L235) 取文件系统 mtime。CI 新 checkout 会改变该值，单独编辑照片文案又未必反映在这里。可用内容 hash 与持久化更新时间，或者在不能保证准确时省略该字段。
- [photo-page-meta.ts:185](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/plugins/vite/photo-page-meta.ts#L185) 的 ImageObject 尚未输出 creator、creditText、copyrightNotice 等。建议利用明确的作者信息补齐署名；只有确有授权条款时才提供 license。Google 图片元数据展示有特定字段要求，但这不等于一般图片索引的必要条件，原图内嵌 IPTC 也可能提供相关信息。[Google 图片元数据文档](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)
- EXIF 下方的 GPS 小地图没有进入可视区的门控，挂载后即加载 MapLibre。可以在区域接近可视区或用户展开时再加载。隔离构建的引擎约 285 KB gzip；这是延后可选功能的机会，不能算成首页必载成本。
- 已有资源预算值得保留；后续可补少量真实用户性能采样，区分首次打开图库、直接单图、打开地图和连续切图的体验。压缩包大小不能替代 LCP/INP。

**面向 AI 的文档优化顺序**

1. 修正第 12、14 项的错误资料，确保 AI 先读到正确路径、签名和示例。
2. 在 [根 AGENTS.md:46](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/AGENTS.md#L46) 增加只读检查命令和按变更范围选择的检查表：lint:check、workspace type-check、单测、docs build、bundle budget、生产 E2E。现有隐私与生成物边界应继续保留。
3. 在 [web AGENTS.md:26](https://github.com/Jackyhq/Photography/blob/e6b7b50009191a53f10355b845777ad77d3f0623/apps/web/AGENTS.md#L26) 说明生产使用 router.prod.tsx、/manifest 页面只在开发环境存在、稳定公开 manifest URL 与轻量索引/完整 manifest/多语言文本资源的职责。把路由、响应式图片与资源清理的不变量写清楚。
4. 为 builder 和 docs 增加简短局部 AGENTS，链接各自权威 README/MDX，说明修改时最相关的命令和验收点；避免再次复制所有配置和目录树。
5. 将公开合成 fixture 工作流明确列为不访问私有照片的验证入口。说明哪些步骤写生成物、哪些会重命名照片，避免 AI 为普通 UI 改动无意运行照片标准化。
6. 如果需要供外部 AI 阅读的 Markdown/llms 索引，应从同一份已校验 MDX 自动生成，作为阅读便利性功能。优先保证正文、链接、canonical 和响应状态准确。Google 明确不依赖 llms.txt 来优化其搜索和生成式功能，因此不要把“没有 llms.txt”当作 SEO 缺陷或排名捷径。[Google AI 搜索指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

建议分批实施：先修文档导航/代码生成、首次单图元数据及 WebGL/直方图生命周期；再修真实链接、文档部署响应与图片选图规则；最后同步 AI 指引、类型检查范围和文档示例。每一批只补能验证该行为的检查，不需要把整站迁移到新框架。
