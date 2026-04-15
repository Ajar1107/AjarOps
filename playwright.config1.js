// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';
//import { config } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = 
({
  testDir: './tests',
  retries : 1,      // to retry the failed test
  workers: 2,       // how many workers need to open parllely...workers means each test work with one worker.
  timeout: 30*1000,
  expect: {timeout: 5*1000,},

 reporter: 'html',

 projects: [    //Providing in an array for different browsers to run
  {
   name: "Chrome",
    use: {
    browserName: 'chromium',  //firefox  //webkit  //chromium
    headless: false,
    screenshot : 'off',
   // video: 'retain-on-failure',
    trace: 'on',
   // ...devices['Pixel 4a (5G)']
  
    
    }
  },

  {
    name: "Mozilla",
    use: {
    browserName: 'firefox',  //firefox  //webkit  //chromium
    headless: false,
    screenshot : 'on',
    trace: 'retain-on-failure' ,
    // viewport: {width: 720, height: 720},  //to view in what size we want
    // ...devices['Galaxy S24'],   // to view in which mobile give in array with single quotes
    // permission: ['geolocation'],  //when we get pop-up of location in browser
    // ignoreHttpsErrors : true,  //when we get SSL certificate error in browser.
    
    }
  },
]

  // /* Run tests in files in parallel */
  // fullyParallel: true,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
 
  // /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 

    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',
  ,

  // /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
}
);
module.exports=config

