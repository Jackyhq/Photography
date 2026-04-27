# <p align="center">Jacky's Photography</p>

> [!IMPORTANT]
> 本项目由 [Jackyhq](https://github.com/Jackyhq) 基于原仓库 [Afilmory/afilmory](https://github.com/Afilmory/afilmory) 进行深度定制与二次开发。
> 在保留原项目核心优势的基础上，本项目包含了由 Jackyhq 独立开发的自动化部署、构建优化、照片标准化和交互体验增强。
>
> **版权声明：**
> 仓库中 `photos/` 目录下的所有照片均为 **Jackyhq 个人拍摄的作品**。这些照片**不属于开源范围**，未经明确书面许可，严禁以任何形式（包括但不限于商业用途、二次分发、个人展示等）进行转载、引用或使用。

Afilmory (/əˈfɪlməri/) 是一个专为个人摄影网站创造的词汇，融合了自动对焦（AF）、光圈（Aperture，光影控制）、胶片（Film，复古媒介）和记忆（Memory，定格瞬间）。

这是一个基于 React、TypeScript、Vite 和 pnpm workspaces 构建的个人摄影画廊。项目以纯客户端 SPA 的形式发布，照片元数据由 `@afilmory/builder` 在构建前生成，前端通过静态 `photos-manifest.json` 提供瀑布流浏览、全屏查看、EXIF 展示、地图探索、Live Photo 和 HDR 等体验。

演示画廊：

- **[photo.jackyw.cn](https://photo.jackyw.cn)**

## 特性

### 画廊体验

- **高性能图片查看器**：`@afilmory/webgl-viewer` 提供流畅的缩放和平移体验，移动端可回退到 DOM 查看器。
- **响应式瀑布流布局**：基于 Masonic，适配桌面和移动端。
- **全屏照片详情**：支持 EXIF、直方图、胶片模拟信息、Live Photo、HDR 标识和缩略图导航。
- **命令面板与筛选**：支持按标题、标签、相机和镜头信息检索照片。
- **地图探索**：使用 MapLibre 展示带 GPS 信息的照片位置，并支持聚合与缩略图预览。
- **国际化**：基于 i18next，支持多语言文案。
- **移动端首屏优化**：首页缩略图使用响应式 WebP 资源，关键首屏图片会在 HTML 阶段预加载，详情页、命令面板和特殊格式转换逻辑按需加载。

### 构建与处理

- **增量构建**：根据现有 manifest、文件大小和修改时间判断是否需要重新处理。
- **多存储适配**：支持 `local`、`s3`、`github` 和 `eagle` 存储提供商。
- **格式处理**：支持 JPEG、PNG、HEIC/HEIF、TIFF、BMP 等常见照片格式的读取与转换。
- **缩略图与占位图**：生成 `360w`/`640w` WebP 缩略图、`640w` JPEG fallback、Thumbhash 和色调分析数据。
- **照片标准化**：`photos/incoming` 中的照片可按 EXIF 时间自动重命名并移动到分类目录。
- **并发处理**：支持 worker/cluster 模式，适合批量照片处理。

## 技术栈

- **前端**：React 19、React Router 7、TypeScript、Vite、Tailwind CSS 4、Radix UI、Jotai、TanStack Query、Motion。
- **图像处理**：Sharp、exiftool-vendored、heic-to/heic-convert、Blurhash、Thumbhash。
- **地图**：MapLibre GL、react-map-gl、MapLibre Geocoder。
- **工程化**：pnpm workspace、ESLint、Prettier、simple-git-hooks、lint-staged。
- **文档站**：`packages/docs` 使用 Vite、React 和 MDX 生成静态文档。

## 项目结构

```plain
apps/web/                 # 主摄影画廊 SPA
packages/builder/         # 照片处理、缩略图、EXIF 和 manifest 生成工具
packages/data/            # manifest 数据访问层和 photoLoader
packages/docs/            # MDX 文档站点
packages/hooks/           # 共享 React hooks
packages/sdk/             # 轻量 SDK/schema
packages/ui/              # 共享 UI 组件和设计系统基础件
packages/utils/           # 通用工具、RSS、动画和数据处理工具
packages/webgl-viewer/    # WebGL 图片查看器
photos/                   # 个人照片源文件，不属于开源范围
```

## 快速开始

### 环境要求

- Node.js 24（CI 使用 Node 24）
- pnpm 10.19.0
- Perl（`exiftool-vendored` 运行时需要）

### 本地开发

```bash
# 安装依赖
pnpm install

# 可选：标准化 photos/incoming 中的新照片
pnpm run photos:standardize

# 生成或更新照片 manifest
pnpm run build:manifest

# 启动画廊开发服务器
pnpm dev
```

`pnpm dev` 会先执行 web precheck；如需跳过 manifest 预检查，可设置 `SKIP_PRECHECK=1` 后再启动。

### 生产构建

```bash
# 构建生产版 SPA
pnpm build

# 构建文档站
pnpm docs:build
```

构建产物位于 `apps/web/dist/`。GitHub Actions 会额外把该目录同步到根目录 `web/`，便于 Cloudflare Pages 等静态平台直接指向。

## 常用命令

```bash
# Web 开发
pnpm dev

# Web 生产构建
pnpm build

# 文档站开发/构建/预览
pnpm docs:dev
pnpm docs:build
pnpm docs:preview

# 构建照片 manifest
pnpm run build:manifest
pnpm run build:manifest -- --force
pnpm run build:manifest -- --force-thumbnails
pnpm run build:manifest -- --force-manifest
pnpm run build:manifest -- --config

# 照片入库标准化
pnpm run photos:standardize

# 质量检查
pnpm lint
pnpm format
pnpm --filter web type-check
```

## 配置

### 站点配置

站点品牌、作者、社交链接和地图配置由 `config.json` 与 `site.config.ts` 控制：

```json
{
  "name": "Jacky's Photography",
  "title": "Jackywhq's Photography",
  "url": "https://photo.jackyw.cn",
  "accentColor": "#007bff",
  "map": ["maplibre"],
  "mapStyle": "builtin",
  "mapProjection": "mercator"
}
```

前端会在构建时读取默认配置，也支持运行时注入 `window.__SITE_CONFIG__` 覆盖部分字段。

### 照片构建配置

照片处理由 `builder.config.ts` 控制。当前项目使用本地照片目录作为源：

```ts
import { defineBuilderConfig } from '@afilmory/builder'

export default defineBuilderConfig(() => ({
  storage: {
    provider: 'local',
    basePath: './photos',
    baseUrl: 'https://photos3.jackyw.cn/photos/',
    excludeRegex: '^incoming($|/.*)',
  },
}))
```

`storage.provider` 可选值：

- `local`：读取本地目录，适合本仓库的照片源、开发和自托管。
- `s3`：读取 S3 兼容存储，适合生产级对象存储与 CDN。
- `github`：读取 GitHub 仓库内容，适合小型图库或静态资源仓库。
- `eagle`：读取 Eagle 4 资料库，可按标签或文件夹筛选并导出照片。

常见系统参数位于 `system.processing` 和 `system.observability`，可配置默认并发数、Live Photo 检测、摘要后缀、日志级别、worker 数、cluster 模式和 worker 超时。

## 照片工作流

1. 将新照片放入 `photos/incoming/`，或直接放入 `photos/<分类>/`。
2. 运行 `pnpm run photos:standardize`。脚本会读取 EXIF 时间，将文件重命名为 `YYYYMMDDHHmmss.ext`，并移动到目标分类目录；直接放在 `incoming` 根目录的文件会进入 `photos/随手/`。
3. 运行 `pnpm run build:manifest`。构建器会扫描照片、提取 EXIF、生成缩略图和 manifest。
4. 运行 `pnpm dev` 预览，或运行 `pnpm build` 生成静态站点。

当缩略图策略或 manifest 结构变更时，使用完整重建命令确保生成物与前端代码一致：

```bash
pnpm run build:manifest -- --force-thumbnails --force-manifest
pnpm --filter web type-check
pnpm build
```

## 自动部署

`.github/workflows/deploy.yml` 在推送到 `main` 且相关路径变更时运行，也支持手动触发。流程包括：

1. 安装 pnpm 与 Node.js 24。
2. 执行 `pnpm install`。
3. 执行 `pnpm run photos:standardize`。
4. 执行 `pnpm run build:manifest`。
5. 执行 `pnpm run build`，并通过 `SKIP_PRECHECK=1` 避免重复生成 manifest。
6. 校验 `apps/web/dist/`，复制 sitemap 为 `googlesitemap.xml`。
7. 将构建产物同步到根目录 `web/` 并提交 `photos/**`、manifest 和 `web/**`。
8. 上传 `apps/web/dist/` 到 GitHub Pages 并部署。

## 文档

- 文档站源码位于 `packages/docs/contents/`。
- 新建文档可运行 `pnpm create:doc`。
- 文档站开发命令为 `pnpm docs:dev`，生产构建为 `pnpm docs:build`。
- 移动端性能、响应式缩略图和分包策略记录在 `packages/docs/contents/performance/index.mdx`。

## 许可证

本项目代码遵循 [Attribution Network License (ANL) v1.0](LICENSE)。

Copyright (c) 2025-2026 Jackyhq. All rights reserved.
