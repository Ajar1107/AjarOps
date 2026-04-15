 
 const { test, expect } = require("@playwright/test");
 
 test("second run", async ({ page }) => {
     // const context = await browser.newContext();
     // const page =await context.newPage();
 
     const email = page.locator("#userEmail");
     const pwd = page.locator("#userPassword");
     //const pname = "iphone 13 pro";
 
     await page.goto("https://rahulshettyacademy.com/client/");
     await email.fill("g.rajanaidu49@gmail.com");
     await pwd.fill("Awesome@123");
     await page.locator("#login").click();
 
     //page wait 
     //await page.waitForLoadState("networkidle");
     await page.locator(".card-body").first().waitFor();
 
     await page.locator("[routerlink*='myorders']").click();
 
 
 
 //work on fake data REQUEST

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
route => route.continue
({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69b78928f86ba51a6507b395"}))

await page.locator("td button").nth(0).click();  //to get the locator time taken
await page.pause();
await expect( page.getByText('You are not authorize to view')).toBeVisible();

 })