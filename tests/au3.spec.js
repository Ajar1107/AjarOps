const {test,expect}= require("@playwright/test");

test('third run', async ({page}) =>
{
    //Login part
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.getByPlaceholder("email@example.com").fill("g.rajanaidu49@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("Awesome@123");
await page.getByText("Login").click();

await page.waitForLoadState('networkidle');
await page.locator(".card-body").first().waitFor();

//select product to cart
await page.locator(".card-body").filter({hasText: "ADIDAS ORIGINAL"}).getByRole('button', {name:  "Add To Cart"}).click();
await page.getByRole("listitem").getByRole('button', {name: "Cart"}).click(); //list item first 

await page.locator("div li").first().waitFor();
await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();  //to be visible

await page.getByRole('button',{name: "Checkout"}).click();

await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150});
await page.getByRole('button', {name: "India"}).nth(1).click();
await page.getByText("Place Order ").click();

await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
const id = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(id);

await page.getByRole('button', {name: "ORDERS"}).click();


await page.pause();

}
)