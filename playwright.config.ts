import { defineConfig, devices } from '@playwright/test'

const useProductionBuild = process.env.PLAYWRIGHT_PRODUCTION === 'true'

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  reporter: process.env.CI ? [['dot'], ['html', { open: 'never' }]] : 'list',
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:13333',
    // Playwright 1.60 consumes reducedMotion through contextOptions, not a top-level fixture.
    contextOptions: { reducedMotion: 'reduce' },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: useProductionBuild
      ? 'pnpm --filter web exec vite preview --host 127.0.0.1 --port 13333 --strictPort'
      : 'AFILMORY_SKIP_MANIFEST_PRECHECK=true pnpm --filter web dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:13333',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
  ],
})
