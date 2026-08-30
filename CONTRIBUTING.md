# 贡献指南

感谢你为 Jacky's Photography 提交改进。本仓库同时包含公开源码、构建工具和文档，但照片源文件属于私有版权内容。开始开发前，请先确认你的改动不依赖、复制或公开任何个人照片。

## 开发环境

- Node.js 24
- pnpm 10.19.0
- Perl（`exiftool-vendored` 的运行依赖）

安装依赖：

```bash
pnpm install
```

### 使用公开合成照片开发

外部贡献者不需要访问私有照片仓库。可以生成 CI 同款的合成 fixture：

```bash
pnpm run fixtures:photos

export AFILMORY_E2E_FIXTURE=true
export AFILMORY_PHOTOS_PATH=apps/web/public/__fixtures/photos
export AFILMORY_PHOTOS_BASE_URL=/__fixtures/photos/

pnpm run build:manifest -- --force --strict
pnpm dev
```

fixture 只会写入专用的 `apps/web/public/__fixtures/photos/` 目录，不包含 Jacky 的照片。

### 使用私有照片仓库开发

只有获得 `Jackyhq/Photography-Photos` 访问权限的维护者才应使用真实照片：

```bash
git clone git@github.com:Jackyhq/Photography-Photos.git photos
pnpm run build:manifest
pnpm dev
```

不要把 `photos/` 中的文件、截图、缩略图、EXIF/GPS 信息或其他衍生媒体放入提交、Issue、测试 fixture 或公开日志。

## 代码放置

- `apps/web/` 保存画廊应用专用的页面、组件和交互。
- `packages/ui/` 只保存跨功能复用的 UI 基础件。
- `packages/builder/` 负责照片扫描、元数据、缩略图和 manifest 构建。
- `packages/data/` 是前端读取 manifest 的共享边界。
- `packages/hooks/`、`packages/sdk/` 和 `packages/utils/` 保存职责明确的共享能力。

完整的包职责、依赖边界和数据流见[架构文档](https://docs.photo.jackyw.cn/architecture)。优先扩展现有抽象，避免在应用内复制共享逻辑。

## 源文件与生成文件

不要手动编辑这些生成物：

- `apps/web/src/data/photos-manifest.json`
- `apps/web/public/thumbnails/`
- `apps/web/dist/`
- 根目录 `web/`
- `packages/docs/src/routes.ts`
- `packages/docs/src/routes.json`
- `packages/docs/src/toc-data.ts`

前四类 Web 输出由照片构建器或生产构建生成。文档路由和目录索引由 `pnpm docs:build` 根据 `packages/docs/contents/` 重新生成。

`content/photo-descriptions.json` 是人工维护的源数据，不是可随意覆盖的构建缓存。使用 `pnpm run photos:descriptions:sync` 更新时，应检查并保留已有标题、双语描述和编辑标签。

## 验证矩阵

按改动范围运行最小但充分的验证：

| 改动范围                  | 至少运行                                                                   |
| ------------------------- | -------------------------------------------------------------------------- |
| 文档或文档脚本            | `pnpm docs:build`；相关脚本测试                                            |
| TypeScript 共享包         | `pnpm run lint:check`、`pnpm run type-check`、相关单元测试                 |
| Builder、存储或照片流水线 | 合成 fixture 的严格 manifest 构建、相关单元测试                            |
| Web 逻辑或样式            | `pnpm --filter web type-check`、相关单元测试、`pnpm build`                 |
| Bundle 或加载策略         | `pnpm build`、`pnpm run bundle:budget`，必要时 `pnpm --filter web analyze` |
| 用户主流程                | `pnpm run test:e2e`                                                        |

仓库 CI 会执行更完整的 lint、类型检查、覆盖率、文档构建、生产构建、bundle budget 和 Playwright E2E。

## 文档规则

- 面向使用者的页面放在 `packages/docs/contents/`，并保持内容针对本仓库，而不是泛化描述上游 Afilmory。
- 每个 MDX 页面必须包含 `title`、`description`、`createdAt` 和 `lastModified` frontmatter。
- 新页面优先使用 `pnpm create:doc`；修改页面时保持 `lastModified` 当前。
- 不要手改生成的路由或目录文件；运行 `pnpm docs:build` 验证 MDX、静态渲染和内部导航。
- 涉及部署的说明必须与 `.github/workflows/deploy.yml`、`package.json` 和 `vercel.json` 的当前行为一致。

## 提交前检查

提交应只包含当前任务需要的文件。不要格式化或重写无关代码，也不要提交本地日志、编辑器状态、构建目录或私有媒体。若改动会改变 manifest schema、公开数据范围、部署写入或许可证边界，请在说明中明确列出兼容性和隐私影响。
