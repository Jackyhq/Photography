# @afilmory/docs

Documentation site for Jacky's Photography. It is a Vite, React, and MDX static site that documents this repository's photo pipeline, storage setup, performance notes, and deployment workflows.

## Commands

From the repository root:

```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
pnpm create:doc
```

From `packages/docs/`:

```bash
pnpm dev
pnpm build
pnpm preview
pnpm create:doc
```

`pnpm build` runs the client build, SSR/static rendering, and final output processing.

## Structure

```plain
packages/docs/
├── contents/              # MDX documentation pages
│   ├── index.mdx          # Project overview
│   ├── docs-site.mdx      # Docs maintenance guide
│   ├── performance/       # Loading and performance notes
│   ├── storage/           # Builder storage providers
│   └── deployment/        # Platform deployment guides
├── plugins/               # Route and table-of-contents Vite plugins
├── scripts/               # Static output processing
└── src/                   # React app, components, styles, generated routes
```

## Routing

Routes are generated from `contents/`:

- `contents/index.mdx` -> `/`
- `contents/storage/index.mdx` -> `/storage`
- `contents/deployment/github-pages.mdx` -> `/deployment/github-pages`

The generator writes `src/routes.ts` and `src/routes.json`; do not edit those files by hand.

## Writing Docs

Each content page should include frontmatter:

```yaml
---
title: Page Title
description: Short page description.
createdAt: 2026-04-29T00:00:00+08:00
lastModified: 2026-04-29T00:00:00+08:00
---
```

Keep `lastModified` current. The repo hook runs `pnpm update:lastmodified` for staged Markdown and MDX files, and the script can also be run manually with file paths.

Use `pnpm create:doc` when adding a new page. It scaffolds frontmatter and places the file under `packages/docs/contents/`.

## Content Guidelines

- Keep examples specific to this workspace: Node.js 24, pnpm 10.19.0, React 19, Vite, and the current `builder.config.ts`.
- Document the static SPA output path, `apps/web/dist/`, and the mirrored root `web/` output used by CI.
- Do not describe `photos/` as sample or reusable media; those files are personal copyrighted works.
- Prefer concise operational docs over generic framework explanations.

## Verification

```bash
pnpm docs:build
```

Run this before publishing documentation changes to catch MDX, route generation, and static rendering issues.
