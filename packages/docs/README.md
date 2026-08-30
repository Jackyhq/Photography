# @afilmory/docs

Static Vite + React + MDX documentation for Jacky's Photography, published at [docs.photo.jackyw.cn](https://docs.photo.jackyw.cn/).

## Commands

Run from the repository root:

```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
pnpm create:doc
```

`pnpm docs:build` validates TypeScript and MDX, renders every route and regenerates the tracked route and table-of-contents indexes.

## Sources and Generated Indexes

- `contents/` contains routed MDX pages.
- `references/` contains supporting material that is not published as a route.
- `src/`, `plugins/` and `scripts/` implement the documentation application and static output pipeline.
- `src/routes.ts`, `src/routes.json` and `src/toc-data.ts` are generated; do not edit them by hand.

Every routed page requires `title`, `description`, `createdAt` and `lastModified` frontmatter. Use `pnpm create:doc` to scaffold a page, then run `pnpm docs:build` before publishing it.

## Authoritative Guides

- [Architecture](https://docs.photo.jackyw.cn/architecture) defines workspace ownership and data flow.
- [Docs Site](https://docs.photo.jackyw.cn/docs-site) defines writing, routing and verification conventions.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) defines local setup, generated-file boundaries and the repository validation matrix.
