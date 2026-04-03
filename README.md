
# <p align="center">Jacky's Photography</p>

> [!IMPORTANT]
> 本项目由 [Jackyhq](https://github.com/Jackyhq) 基于原仓库 [Afilmory/afilmory](https://github.com/Afilmory/afilmory) 进行深度定制与二次开发。
> 在保留原项目核心优势的基础上，本项目包含了由 Jackyhq 独立开发的自动化部署、构建优化及功能增强。
>
> **⚠️ 版权声明：**
> 仓库中 `photos/` 目录下的所有照片均为 **Jackyhq 个人拍摄的作品**。这些照片**不属于开源范围**，未经明确书面许可，严禁以任何形式（包括但不限于商业用途、二次分发、个人展示等）进行转载、引用或使用。

Afilmory (/əˈfɪlməri/) 是一个专为个人摄影网站创造的词汇，融合了自动对焦（AF）、光圈（Aperture，光影控制）、胶片（Film，复古媒介）和记忆（Memory，定格瞬间）。

这是一个基于 React + TypeScript 构建的现代摄影画廊网站，支持从多种存储源（S3, GitHub）自动同步照片。它具有高性能的 WebGL 渲染、瀑布流布局、EXIF 信息展示、缩略图生成等功能。

演示画廊：

- **[photo.jackyw.cn](https://photo.jackyw.cn) (本项目演示)**

## 🌟 特性

### 核心功能

- 🖼️ **高性能 WebGL 图像渲染器** - 自定义 WebGL 组件，支持流畅的缩放和平移操作。
- 📱 **响应式瀑布流布局** - 基于 Masonic，完美适配各种屏幕尺寸。
- 🎨 **现代 UI 设计** - 使用 Tailwind CSS 和 Radix UI 组件库构建。
- ⚡ **增量同步** - 智能检测变更，仅处理新增或修改的照片。
- 🌐 **国际化 (i18n)** - 支持多语言切换。
- 🔗 **OpenGraph** - 自动生成社交媒体分享的 OpenGraph 元数据。

### 图像处理

- 🔄 **HEIC/HEIF 格式支持** - 自动转换苹果设备的 HEIC 格式。
- 📷 **TIFF 格式支持** - 自动转换 TIFF 格式。
- 🖼️ **智能缩略图生成** - 多尺寸缩略图优化加载性能。
- 📊 **EXIF 信息展示** - 完整的拍摄参数，包括相机型号、焦距、光圈等。
- 🌈 **Blurhash 占位图** - 优雅的图片加载体验。
- 📱 **实况照片 (Live Photo) 支持** - 自动检测并展示 iPhone 实况照片。
- ☀️ **HDR 图像支持** - 支持展示 HDR 图像。

### 进阶特性

- 🎛️ **富士胶片模拟 (Fujifilm Recipe)** - 读取并展示富士相机的胶片模拟设置。
- 🔍 **全屏查看器** - 支持手势操作的图像查看器。
- 🏷️ **文件系统标签** - 根据文件系统自动生成标签。
- ⚡ **并发处理** - 支持多进程/多线程并发处理。
- 🗂️ **多存储支持** - 支持 S3、GitHub 等多种存储后端。
- 📷 **图片分享** - 支持将图片分享至社交媒体或通过 iframe 嵌入。
- 🗺️ **交互式地图探索** - 使用 MapLibre 将照片的 GPS 坐标可视化。

## 🏗️ 技术架构

### 前端技术栈

- **React 19** - 最新的 React 版本及其编译器。
- **TypeScript** - 完整的类型安全支持。
- **Vite** - 现代构建工具。
- **Tailwind CSS** - 原子化 CSS 框架。
- **Radix UI** - 无障碍组件库。
- **Jotai** - 状态管理。
- **TanStack Query** - 数据获取和缓存。
- **React Router 7** - 路由管理。
- **i18next** - 国际化。

### 构建系统

- **Node.js** - 服务端运行环境。
- **Sharp** - 高性能图像处理库。
- **AWS SDK** - S3 存储操作。
- **Worker Threads/Cluster** - 并发处理支持。
- **EXIF-Reader** - EXIF 数据提取。

### 存储架构

采用适配器模式设计，支持多种存储后端：

- **S3 兼容存储** - AWS S3, MinIO, 阿里云 OSS 等。
- **GitHub 存储** - 使用 GitHub 仓库作为图片存储。
- **Eagle 存储** - 使用 Eagle 应用库作为图片存储。
- **本地文件系统** - 用于开发和测试的本地存储。

## 🚀 快速开始

### GitHub Actions 自动化部署

项目内置了 GitHub Actions 工作流，当你在 `photos/` 目录中更新照片并推送到 `main` 分支时：
1. 自动进行照片标准化处理。
2. 自动更新照片索引清单 (`photos-manifest.json`)。
3. 自动构建前端项目。
4. **自动同步**：构建后的静态产物会自动拷贝到根目录下的 `/web` 文件夹并提交到仓库。你可以直接将 Cloudflare Pages 或其他平台指向该目录进行零配置部署。

## ⚙️ 配置选项

#### 远程仓库配置 (`repo`)

为了在 CI 中实现增量构建，需要配置一个缓存仓库，用于在每次构建前拉取缓存并在构建后上传结果。

```json
{
  "repo": {
    "enable": true,
    "url": "https://github.com/username/gallery-assets"
  }
}
```

这会自动从远程仓库拉取资源，避免每次都重新构建。

**为了实现上传功能，你需要在环境变量中提供 `GIT_TOKEN`。**

#### 存储配置 (`storage`)

- `provider`: 存储提供商 (`s3` | `github`)
- `bucket`: S3 Bucket 名称
- `region`: S3 区域
- `endpoint`: S3 节点（可选）
- `prefix`: 文件前缀
- `customDomain`: 自定义域名
- `excludeRegex`: 排除文件的正则表达式（可选）

#### 系统处理 (`system.processing`)

- `defaultConcurrency`: 默认并发数
- `digestSuffixLength`: 附加在照片 ID 后的 SHA-256 摘要长度
- `enableLivePhotoDetection`: 启用实况照片检测
- `supportedFormats`: 可选的照片格式处理白名单

#### 系统可观测性 (`system.observability`)

- `showProgress`: 显示构建进度
- `showDetailedStats`: 显示详细统计信息
- `logging.verbose`: 详细日志
- `logging.level`: 日志级别 (`info` | `warn` | `error` | `debug`)
- `logging.outputToFile`: 输出日志到文件
- `performance.worker.workerCount`: 工作进程数量
- `performance.worker.timeout`: 工作进程超时时间（毫秒）
- `performance.worker.useClusterMode`: 启用集群模式

## 📋 命令行指令

### 构建指令

```bash
# 查看帮助
pnpm run build:manifest -- --help

# 增量更新（默认）
pnpm run build:manifest

# 强制完整更新
pnpm run build:manifest -- --force

# 仅重新生成缩略图
pnpm run build:manifest -- --force-thumbnails

# 仅重新生成清单
pnpm run build:manifest -- --force-manifest
```

### 开发指令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 注意事项

- 确保你的 S3 Bucket 中已经存放了照片文件。
- 如果使用远程仓库缓存，请先配置 `builder.config.ts`。

## 📄 许可证

本项目遵循 [Attribution Network License (ANL) v1.0](LICENSE)。
Copyright (c) 2025-2026 Jackyhq. All rights reserved.

