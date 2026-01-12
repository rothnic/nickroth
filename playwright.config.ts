import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for visual regression testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  
  /* Shared settings for all the projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'http://localhost:4322',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run preview -- --port 4322',
    url: 'http://localhost:4322',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  /* Folder for storing screenshots */
  snapshotDir: './tests/snapshots',
  
  /* Update snapshots option */
  updateSnapshots: 'missing',
  
  /* Configure screenshot comparison */
  expect: {
    toHaveScreenshot: {
      /* Allow some threshold for anti-aliasing differences */
      maxDiffPixelRatio: 0.01,
      /* Animation stabilization time */
      animations: 'disabled',
    },
  },
});
