const { test, expect } = require("@playwright/test");
const { log } = require("node:console");
const { request } = require("node:http");
const { text } = require("node:stream/consumers");

test("first run", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    // await page.goto("http://www.google.com");
    // console.log(await page.title());
    // await expect(page).toHaveTitle("Google");

    //To abort the images or css loading, if it doesn't impact code written.
// page.route("**/*.css", route=> route.abort());
// page.route("//*/.{jpg, img, jpeg}", route=> route.abort());

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy1");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("[value='user']").check();
    await page.locator("#okayBtn").click();

    // to get the URL's as output
// page.on("request", request=> console.log(request.url()));
// page.on('response', response=> console.log(response.url(),response.status()));

    await page.locator(".form-control").last().selectOption("Consultant");
    await page.locator("[type='checkbox']").check();
    await expect(page.locator("[type='checkbox']")).toBeChecked();
    //await page.locator("#signInBtn").click();

    console.log(await page.locator(".alert").textContent());
    expect(await page.locator(".alert").textContent()).toContain("Incorrect")

    //to clear and fill again in fields:
    await page.locator("#username").fill("");
    await page.locator("#username").fill("rahulshettyacademy");
    expect(page.locator(".blinkingText").first()).toHaveAttribute("class", "blinkingText");

    //any page to open in background
    const [npage] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator(".blinkingText").first().click(),
    ])

    const text = await npage.locator(".red").textContent();
    console.log(text);

// Splitting text
   const sp1 = text.split('@');
   const sp2  = sp1[1].split(" ")[0];
   const sp3 = sp2.split(".")[0];
console.log(sp3);


await page.locator("#username").fill(sp3);
console.log(page.locator("#username").inputValue());

await npage.waitForLoadState("networkidle");
await page.locator("[value = 'Sign In']").click();

//await page.pause();




})