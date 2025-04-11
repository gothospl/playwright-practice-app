import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,
  expect: {
    timeout: 2000
  },

  retries: 1,
  reporter: 'html',
  
  use: {
    baseURL: process.env.DEV == '1' ? 'http://localhost:4201/'
      : process.env.STAGING == '1' ? 'http://localhost:4202'
      : 'http://localhost:4200',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  projects: [
    {
      name: 'dev-firefox',
      use: { ...devices['Desktop Firefox'],
        baseURL: 'http://localhost:4201/'
       },
    },
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox'
      }
    }
  ]
});
