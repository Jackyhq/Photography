# Builder instructions

This scope owns photo processing and storage, not browser rendering. Read [README.md](README.md) for current directories and configuration; the root `AGENTS.md` owns runtime versions and the public-fixture workflow.

- Storage implementations belong in `src/storage/providers/`; shared contracts live in `src/storage/interfaces.ts` and are exported by `src/storage/index.ts`.
- Photo orchestration belongs in `src/photo/`, image transforms in `src/image/`, and manifest persistence/migrations in `src/manifest/`.
- Preserve atomic writes, strict failure handling, concurrency bounds and cancellation. Storage providers must retain existing path/symlink protections.
- `plugins/builder/photo-descriptions.ts` at repository root merges human-maintained descriptions; changes there are covered by `pnpm run type-check:scripts`.
- Keep a single owner for generated manifest/thumbnail files. Never edit `apps/web/src/data/photos-manifest.json` manually to implement a feature.
- The private `photos/` checkout contains copyrighted personal works. Use the root public-fixture procedure in a disposable checkout for reproducible validation.
- For schema changes, inspect manifest version/migrations, `packages/data`, static metadata generation and the gallery consumers together. Add migrations only when persisted compatibility requires them.

Useful checks from repository root:

```bash
pnpm --filter @afilmory/builder type-check
pnpm run type-check:scripts
pnpm exec vitest run packages/builder scripts
```

Processing changes should also pass a strict fixture manifest build. Do not run `photos:standardize` or publish storage changes as a substitute for testing.
