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

For navigation, metadata or generation changes, also run `pnpm exec vitest run packages/docs` from the repository root. These checks need no private photos or gallery manifest.

## Sources and Generated Indexes

- `contents/` contains routed MDX pages.
- `references/` contains supporting material that is not published as a route.
- `src/`, `plugins/` and `scripts/` implement the documentation application and static output pipeline.
- `src/routes.ts`, `src/routes.json` and `src/toc-data.ts` are generated; do not edit them by hand.
- `src/page-meta.ts` supplies both static HTML and client navigation metadata.
- `dist/` contains directory HTML pages, a noindex `404.html`, `robots.txt` and `sitemap.xml`. Publish the entire directory as the documentation site.

Every routed page requires `title`, `description`, `createdAt` and `lastModified` frontmatter. Use `pnpm create:doc` to scaffold a page, then run `pnpm docs:build` before publishing it.

Public URLs use trailing slashes, for example `/architecture/`. Hosting must serve generated route files and preserve a real HTTP 404 for unknown paths; see the hosting section in [Docs Site](contents/docs-site.mdx).

## Authoritative Guides

- [Architecture](https://docs.photo.jackyw.cn/architecture) defines workspace ownership and data flow.
- [Docs Site](https://docs.photo.jackyw.cn/docs-site) defines writing, routing and verification conventions.
