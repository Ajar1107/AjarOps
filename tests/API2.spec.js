const { test, expect } = require("@playwright/test");
let webcontext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const email = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    

    await page.goto("https://rahulshettyacademy.com/client/");
    await email.fill("g.rajanaidu49@gmail.com");
    await pwd.fill("Awesome@123");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");

    await context.storageState({ path: 'state.json' });  //file name created 
// send the file name in storage that has token
    webcontext = await browser.newContext({ storageState: 'state.json' }); 

})


test("first run", async () => {

    const page = await webcontext.newPage();  // declaring as new page to navigate

    await page.goto("https://rahulshettyacademy.com/client/"); //need t 
    await page.locator(".card-body").first().waitFor();
    const alltitles = await page.locator(".card-body").allTextContents();
    console.log(alltitles);

}
)


test("second run", async () => {

    const page = await webcontext.newPage();  // declaring as new page to navigate
    const pname = "iphone 13 pro";
     
    await page.goto("https://rahulshettyacademy.com/client/");
    const alltitles = await page.locator(".card-body").allTextContents();
    console.log(alltitles);

    const product = page.locator(".card-body"); //declare body of it
    const count = await product.count(); //count of all products

    for (let i = 0; i < count; i++) {
        if (await product.nth(i).locator("b").textContent() === pname)  //product wise goes then check name after that comapre it.
        {
            await product.nth(i).locator("text =Add to Cart").click(); // product wise goes and select the comapred one, added to cart.
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();  //to click on cart
    // await page.locator("[type='button']").first().click(); // to continue shopping

    await page.locator("div li").last().waitFor(); //waiting till page loads the items
    await page.locator("[type='button']").last().click(); // to checkout page
    await page.waitForLoadState('networkidle');
    await page.locator(".field [type='text']").nth(1).fill("345");
    await page.locator(".field [type='text']").nth(2).fill("Rahul");
    await page.locator(".field [type='text']").nth(3).fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    await page.locator("[style*='green']").waitFor(); //page refresh so wait required
    //await page.waitForLoadState('networkidle');
    await page.locator("[placeholder='Select Country']").pressSequentially('ind', { delay: 150 }); //type slowly
    const dropdown = page.locator(".ta-results"); // results load when we type
    await dropdown.waitFor();
    const ocount = await dropdown.locator("button").count(); //sepcifying which count and they are buttons tag.

    for (let i = 0; i < ocount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " Indonesia") //check spaces too
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.waitForLoadState('networkidle');
    await page.locator(".btnn").click();


    const thank = await page.locator(".hero-primary").textContent();
    console.log(thank);

    const oid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(oid);

    await page.locator("[routerlink*='myorders']").last().click();
    await page.locator("tbody").waitFor(); //wait till body loads
    const rows = page.locator("tbody tr");  //row wise tag
    const rcount = await rows.count();

    for (let i = 0; i < rcount; i++) {
        const rid = await rows.nth(i).locator("th").textContent(); //first nth used because tr row loaded first then th.
        if (oid.includes(rid))  //if both are same using the includes it matches as same
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }


    const fid = await page.locator(".col-text").textContent();
    console.log(fid);




    //await page.pause();


})