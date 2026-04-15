const { test, expect } = require("@playwright/test")

const baseurl = "https://eventhub.rahulshettyacademy.com";
const apiurl = "https://api.eventhub.rahulshettyacademy.com/api";

const y_user = {email: 'ajar@yahoo.com', password: 'Ajar@123'};
const g_user = {email: 'ajar@gmail.com', password: 'Ajar@123'};

async function LoginPage(page, user) {

    await page.goto(`${baseurl}/login`);
    await page.locator("#email").fill(user.email);
    await page.locator("#password").fill(user.password);

    await page.locator("#login-btn").click();
await page.locator(".object-cover").first().waitFor();
await expect(page.getByText("Browse Events →")).toBeVisible();
//await page.goto(`${baseurl}/events`);
    
}

test('first ', async ({page, request})=>
{

//to get the token
const Lresponse = await request.post(`${apiurl}/auth/login`, 
    {data: {email: y_user.email, password: y_user.password} }
);
await Lresponse.ok();
const lres = await Lresponse.json();
const rtoken = await lres.token;
await console.log(rtoken);

// to get the ID
const ldata = await request.get(`${apiurl}/events`,
{headers:{Authorization :`Bearer ${rtoken}`},
}
)
ldata.ok();
const edata = await ldata.json();
const eventId = await edata.data[0].id;
console.log(eventId);  // same name to be given in below data 

//create  a booking by giving data
const book1= await request.post(`${apiurl}/bookings`,
    {
        headers: {Authorization :`Bearer ${rtoken}`},
        data: {
            eventId,  // get it same name from above 
            customerName: 'yahoo user',
            customerEmail: y_user.email,
            customerPhone: '8787878794',
            quantity: 1
        
        },
    }
);
book1.ok();
const book2 = await book1.json();
//console.log(book2);
const book3 = await book2.data.id;
console.log(book3);

await LoginPage(page, g_user);  //logged in via gmail user

await page.goto(`${baseurl}/bookings/${book3}`, {waitUntil:'networkidle'});  //checking with yahoo id in gmail

expect(page.getByRole('heading', { name: 'Access Denied' })).toBeVisible(); //validation of access 

await page.pause();


})

test('Visual check', async ({page})=>
{
await page.goto("https://eventhub.rahulshettyacademy.com");
expect(await page.screenshot()).toMatchSnapshot("academy.png");
})