const {test, expect, request} = require("@playwright/test");
const {APIutils} = require('../utils/APIutils');

const reqpayload = {userEmail:"g.rajanaidu49@gmail.com",userPassword:"Awesome@123"};
const reqorderload = {orders:[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};
const fake = {data:[],message:"No Orders"};
let response;

test.beforeAll(async ()=>
{
const req1 = await request.newContext();
const apiUtils = new APIutils(req1, reqpayload);
response =await  apiUtils.createOrder(reqorderload);

// const rload = await req1.post("	https://rahulshettyacademy.com/api/ecom/auth/login", {data: reqpayload})
//  expect(rload.ok()).toBeTruthy();  //to check http response of 200

// const rjson = await rload.json();  // to get in json format
// rtoken = rjson.token;
// console.log(rtoken);

// const oload = await req1.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
//     {
//     data: reqorderload,
//     headers: {
//     'Authorization' : rtoken , 
//     'Content-Type': 'application/json' 
// }
// });

// const orespnse = await oload.json();
// odata = await orespnse.orders[0];  //response data to be added
// console.log(odata);

});

test("second run", async ({ page }) => {

    //Path for token and skip login
    await page.addInitScript(value => 
        {window.localStorage.setItem('token', value);

        }, response.rtoken); 

    const pname = "iphone 13 pro";
    await page.goto("https://rahulshettyacademy.com/client/");

    //Working on route for fake data RESPONSE
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/699816651fe6115f6a97ce7d",
       // await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"   //using * as not required ID
    async route=> 
        { 
            const response =  await page.request.fetch(route.request()); //getting request data
            let body = JSON.stringify(fake);  // injecting fake data
            route.fulfill(
                {
                     response, body,   //declaring both request and fake data
                }
            )
        

    })

    await page.locator("[routerlink*='myorders']").last().click();
    // await page.locator("tbody").waitFor(); //wait till body loads
    // const rows = page.locator("tbody tr");  //row wise tag
    // const rcount = await rows.count();

    // for (let i = 0; i < rcount; i++) {
    //     const rid = await rows.nth(i).locator("th").textContent(); //first nth used because tr row loaded first then th.
    //     if (response.odata.includes(rid))  //if both are same using the includes it matches as same
    //     {
    //         await rows.nth(i).locator("button").first().click();
    //         break;
    //     }
    // }

    // const fid = await page.locator(".col-text").textContent();
    // console.log(fid);

     //await page.pause();
     await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/699816651fe6115f6a97ce7d");
console.log(await page.locator(".mt-4").textContent());


})