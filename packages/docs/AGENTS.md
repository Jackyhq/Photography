# Documentation Maintenance

This file applies to `packages/docs/`. Follow the repository [AGENTS.md](../../AGENTS.md) as well.

## Sources and ownership

- `contents/` owns published MDX content; [Docs Site](contents/docs-site.mdx) is the writing and hosting guide.
- [Architecture](contents/architecture/index.mdx) defines workspace ownership. Check implementation files before changing architecture claims.
- `src/routes.ts`, `src/routes.json`, and `src/toc-data.ts` are tracked generated indexes. Regenerate them through the docs build; do not hand-edit them.
- `dist/` is generated deployment output, including HTML, `404.html`, `robots.txt`, and `sitemap.xml`.
- Docs work does not require the private `photos/` checkout or the gallery manifest builder.

## Routing and metadata

- Public document URLs use directory trailing slashes, such as `/architecture/`; internal route keys omit them. Reuse `getDocsPath`, `normalizeDocsPath`, and `getDocsUrl` from `src/site.ts`.
- Navigation uses real anchors. Preserve modified clicks, external URLs, downloads, browser history, and document fragments.
- `src/page-meta.ts` is the shared source for static and client page metadata. Keep title, canonical, OpenGraph, Twitter and structured data synchronized.
- Unknown routes render a deterministic noindex 404 without a homepage canonical. HTTP status is the hosting platform's responsibility; generated HTML alone cannot set it.
- Use serializers when generating TypeScript, escape HTML metadata, and render the same React tree for SSR and hydration.

## Editing and validation

Every MDX page requires `title`, `description`, `createdAt`, and `lastModified`. Update `lastModified` when changing its content. Keep code examples aligned with the current implementation.

Run from the repository root using Node.js 24 and pnpm 10.19.0:

```bash
# Content changes: regenerate indexes and all static pages.
pnpm docs:build

# Routing, metadata or generation changes: run the focused regression suite too.
pnpm exec vitest run packages/docs

# Read-only code checks.
pnpm exec eslint packages/docs
pnpm --filter @afilmory/docs type-check
```

For browser verification, check direct nested URLs, a sidebar click followed by Back/Forward, modified link clicks, canonical metadata, and an unknown URL. Validate the production host's 404 status and redirect behavior after deployment; a successful local build does not prove external hosting configuration.
