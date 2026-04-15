const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const {AfterStep, BeforeStep, Status} = require('@cucumber/cucumber');

// Increase default timeout from 5 seconds to 60 seconds
setDefaultTimeout(60000);


let browser;
let context;
let page;


Before(async function () {
  browser = await chromium.launch({headless: false});
  context = await browser.newContext();
  page = await context.newPage();
});

After(async function () {
  if (page) await page.close();
  if (context) await context.close();
  if (browser) await browser.close();
});


BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await  page.screenshot({ path: 'screenshot1.png' });
  }
});

Given('login to ecommerce2 application using {string} and {string}', async function (username, password) {
  // Navigate to practice login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
  // Wait for form fields to be visible
  await page.locator("#username").waitFor({ state: 'visible', timeout: 5000 });
  await page.locator("#password").waitFor({ state: 'visible', timeout: 5000 });

  // Fill login credentials using provided parameters
  await page.locator("#username").fill(username);
  await page.locator("#password").fill(password);
  
  // Select user role
  await page.locator("[value='user']").check();
   
  // Click okay button
  await page.locator("#okayBtn").click();
  
  // Wait for page to load after clicking
  await page.waitForLoadState('domcontentloaded');
  
  // Wait for next element to appear
  //await page.locator(".form-control").waitFor({ state: 'visible', timeout: 5000 });
  // Now proceed with the rest of the form interactions
  // Wait for form controls to be available
  await page.locator(".form-control").last().waitFor({ state: 'visible', timeout: 5000 });
  
  // Select option from dropdown
  await page.locator(".form-control").last().selectOption("Consultant");
  
  // Check the checkbox
  await page.locator("[type='checkbox']").check();
  
  // Verify checkbox is checked
  await expect(page.locator("[type='checkbox']")).toBeChecked();

  await page.waitForLoadState("networkidle");
await page.locator("[value = 'Sign In']").click();

});

Then('error message is displayed', async function () {
  // Wait for alert message to appear first before doing anything else
    await page.locator(".alert").waitFor({ state: 'visible', timeout: 3000 });
  
  // Get alert message text
  const alertMessage = await page.locator(".alert").textContent();
  console.log("Alert message:", alertMessage);
  
  // Verify alert contains "Incorrect" message
  if (!alertMessage || !alertMessage.includes("Incorrect")) {
    throw new Error(`Expected 'Incorrect' message but got: "${alertMessage}"`);
  }
  

});



Given('login to ecommerce application using {string} and {string}', async function (email, pwd) {
  // Navigate to application and perform login
  await page.goto("https://rahulshettyacademy.com/client/");
  
  // Wait for form fields to be visible
  await page.locator("#userEmail").waitFor({ state: 'visible', timeout: 5000 });
  await page.locator("#userPassword").waitFor({ state: 'visible', timeout: 5000 });

  const emailField = page.locator("#userEmail");
  const pwdField = page.locator("#userPassword");

  await emailField.fill(email);
  await pwdField.fill(pwd);
  await page.locator("#login").click();
  
  // Wait for dashboard to load - use domcontentloaded instead of networkidle
  await page.waitForLoadState("domcontentloaded");
  
  // Verify we're on the dashboard by waiting for product cards
  await page.locator(".card-body").first().waitFor({ timeout: 10000 });
  
  // Save authentication state for subsequent steps
  await context.storageState({ path: 'state.json' });
});

When('i add {string} to the cart', async function (productName) {
  // Find and add product to cart
  const product = page.locator(".card-body");
  const count = await product.count();

  for (let i = 0; i < count; i++) {
    const productText = await product.nth(i).locator("b").textContent();
    if (productText === productName) {
      await product.nth(i).locator("text=Add to Cart").click();
      await page.waitForLoadState('domcontentloaded');
      break;
    }
  }
});

Then('verify {string} is displayed in cart', async function (productName) {
  // Navigate to cart and verify product is present
  await page.locator("[routerlink*='cart']").click();
  await page.waitForLoadState('domcontentloaded');
  
  // Wait for cart items to load
  await page.locator("div li").first().waitFor({ timeout: 5000 });
  
  // Verify product is in cart by checking all text content
  const cartContent = await page.locator(".cart").allTextContents();
  const isPresent = cartContent.some(content => content.includes(productName));
  
  if (!isPresent) {
    throw new Error(`Product ${productName} not found in cart`);
  }
});

When('enter valid details and place the order', async function () {
  // Proceed to checkout and enter payment details
  await page.locator("div li").last().waitFor({ timeout: 5000 });
  await page.locator("[type='button']").last().click();
  await page.waitForLoadState('domcontentloaded');

  // Fill checkout details with a slight delay to ensure fields are ready
  await page.locator(".field [type='text']").nth(1).fill("345");
  await page.locator(".field [type='text']").nth(2).fill("Rahul");
  await page.locator(".field [type='text']").nth(3).fill("rahulshettyacademy");
  await page.locator("[type='submit']").click();
  
  // Wait for green confirmation element to appear
  await page.locator("[style*='green']").waitFor({ state: 'visible', timeout: 5000 });

  // Select country and place order
  await page.locator("[placeholder='Select Country']").pressSequentially('ind', { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor({ timeout: 5000 });
  
  const ocount = await dropdown.locator("button").count();
  let countryFound = false;

  for (let i = 0; i < ocount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() === "Indonesia") {
      await dropdown.locator("button").nth(i).click();
      countryFound = true;
      break;
    }
  }

  if (!countryFound) {
    throw new Error("Indonesia not found in dropdown");
  }

  await page.waitForLoadState('domcontentloaded');
  await page.locator(".btnn").click();
});

Then('verify order is present in order history.', async function () {
  // Check if order is present in order history
  const thankYouElement = await page.locator(".hero-primary").textContent();
  console.log("Thank you message:", thankYouElement);

  const oid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log("Order ID:", oid);

  if (!oid || oid.trim() === "") {
    throw new Error("Order ID not found on thank you page");
  }

  await page.locator("[routerlink*='myorders']").last().click();
  await page.waitForLoadState('domcontentloaded');
  await page.locator("tbody").waitFor({ timeout: 5000 });
  
  const rows = page.locator("tbody tr");
  const rcount = await rows.count();
  let found = false;

  for (let i = 0; i < rcount; i++) {
    const rid = await rows.nth(i).locator("th").textContent();
    if (rid && oid.includes(rid.trim())) {
      found = true;
      console.log("Order found in history with ID:", rid);
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  if (!found) {
    throw new Error(`Order ${oid} not found in order history`);
  }
});

