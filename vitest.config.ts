import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(rootDir, 'apps/web/src'),
      '@pkg': path.resolve(rootDir, 'package.json'),
      '@config': path.resolve(rootDir, 'site.config.ts'),
      '@locales': path.resolve(rootDir, 'locales'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: [
      'apps/web/src/**/*.test.ts',
      'apps/web/src/**/*.test.tsx',
      'apps/web/plugins/**/*.test.ts',
      'packages/**/*.test.ts',
      'packages/**/*.test.tsx',
      'scripts/**/*.test.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: [
        'apps/web/src/App.tsx',
        'apps/web/src/components/**/*.tsx',
        'apps/web/src/hooks/**/*.{ts,tsx}',
        'apps/web/src/lib/**/*.ts',
        'apps/web/src/modules/**/*.tsx',
        'apps/web/src/providers/**/*.tsx',
        'apps/web/plugins/**/*.ts',
        'packages/builder/src/builder/failure-policy.ts',
        'packages/builder/src/fs/atomic-write.ts',
        'packages/builder/src/storage/providers/local-provider.ts',
        'packages/builder/src/storage/providers/s3-provider.ts',
        'packages/builder/src/worker/cluster-pool.ts',
      ],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.d.ts',
        // coverage-v8 cannot parse this uncovered TSX file without first transforming it.
        'apps/web/src/modules/gallery/MasonryHeaderMasonryItem.tsx',
      ],
      thresholds: {
        branches: 17,
        functions: 19,
        lines: 20,
        statements: 19,
        'apps/web/src/components/ui/slider.tsx': {
          branches: 70,
          functions: 100,
          lines: 95,
          statements: 85,
        },
        'packages/builder/src/builder/failure-policy.ts': {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
        'packages/builder/src/fs/atomic-write.ts': {
          branches: 80,
          functions: 100,
          lines: 95,
          statements: 95,
        },
        'packages/builder/src/storage/providers/local-provider.ts': {
          branches: 10,
          functions: 10,
          lines: 10,
          statements: 10,
        },
        'packages/builder/src/storage/providers/s3-provider.ts': {
          branches: 15,
          functions: 20,
          lines: 15,
          statements: 15,
        },
        'packages/builder/src/worker/cluster-pool.ts': {
          branches: 15,
          functions: 15,
          lines: 20,
          statements: 20,
        },
      },
    },
  },
})
