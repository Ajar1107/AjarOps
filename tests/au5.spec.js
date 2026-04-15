const {test, expect} = require('@playwright/test');

test("new fwd", async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

// await page.goto("https://www.google.com");
// await page.goBack();
// await page.goForward();

await expect( page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect( page.locator("#displayed-text")).toBeHidden();

await page.locator("#confirmbtn").click();
await page.on('dialog', dialog => dialog.accept());
// await page.on('dialog', dialog => dialog.dismiss());

await page.locator("#mousehover").hover();
await page.pause();

// const f1 = page.frameLocator("[name='iframe-name']");
//await f1.locator("li a[href*='lifetime-access'] : visible").click();
const frame1 = page.frameLocator("#courses-iframe");
const frame2 = frame1.getByRole('link', {name: "All Access plan"});  // time taken locator to find
await frame2.click();
const red = await frame1.locator(".text h2").textContent();
console.log( red.split(" ")[1]);


})