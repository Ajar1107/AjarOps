const { test } = require("@playwright/test");
const {LoginPage} = require('../PageObjects/LoginPage.js');
const {DashboarPage} = require('../PageObjects/DashboardPage.js');
const {CheckoutDetails} = require('../PageObjects/CheckoutDetails.js');
const {ThankyouPage} = require("../PageObjects/ThankyouPage.js");
//const { POManager } = require("../PageObjects/POManager.js");

const {test1} = require('../utils/Testbase.js');

// json -> string -> java object (for proper working JSON method)
const dataset = JSON.parse(JSON.stringify(require('../utils/TestData.json')));


test1('@API second run',async ({page,testDataOrder})=> 
    {
   const loginPage = new LoginPage(page);
   await loginPage.landPage();
   await loginPage.ValidLogin(testDataOrder.email, testDataOrder.pwd);

   //Merging the Pageobjects (Dashboard page with products)
   const dashBoardpage = new DashboarPage(page);
   await dashBoardpage.productsShow(testDataOrder.pname);
   await dashBoardpage.cartnavg();
   await dashBoardpage.Checkout();
   //await page.pause();
})

for( const data of dataset)
{
test(`Client run ${data.pname}`, async ({ page }) => {
    // const context = await browser.newContext();
    // const page =await context.newPage();

    // const email = "g.rajanaidu49@gmail.com";
    // const pwd = "Awesome@123";
     //const pname = "iphone 13 pro";
    //const coupon ="rahulshettyacademy";
    // const cvv = "345";
    // const name = "Rahul";

    //Page object manager to handle all page objects
// const pOManager = new POManager(page);
// const loginPage = pOManager.getLoginPage();


   // Merging with PageOjects (login):    
   const loginPage = new LoginPage(page);
   await loginPage.landPage();
   await loginPage.ValidLogin(data.email, data.pwd);

   //Merging the Pageobjects (Dashboard page with products)
   const dashBoardpage = new DashboarPage(page);
   await dashBoardpage.productsShow(data.pname);
   await dashBoardpage.cartnavg();
   await dashBoardpage.Checkout();

// Merging the Pageobjects (checkout page with details)
const checkoutDetails = new CheckoutDetails(page);
await checkoutDetails.CheckDetails(data.cvv, data.name, data.coupon);
await checkoutDetails.PlaceOrder();

//Thank you page and verifying order id
const thankyouPage = new ThankyouPage(page);
await thankyouPage.ThanksPage();
await thankyouPage.finalID();
//await page.pause();
    


})
};