class DashboarPage {
    constructor(page) {
        this.page  = page;
        this.product = page.locator(".card-body");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async productsShow(pname) {
        //const product = page.locator(".card-body"); //declare body of it
        const alltitles = await this.product.allTextContents();
        console.log(alltitles);
        const count = await this.product.count(); //count of all products

        for (let i = 0; i < count; i++) {
            if (await this.product.nth(i).locator("b").textContent() === pname)  //product wise goes then check name after that comapre it.
            {
                await this.product.nth(i).getByRole('button', { name: 'Add to Cart' }).click(); // product wise goes and select the comapred one, added to cart.
                console.log("Looking for:", pname);
                break;
            }
        }
        //await this.page.waitForLoadState('networkidle');

    }

    async cartnavg()
    {
      await this.cart.click();
       await this.page.locator("div li").last().waitFor();
    }

    async Checkout()
    {
    await this.page.locator("[type='button']").last().click(); // to checkout page
    await this.page.waitForLoadState('networkidle');
    }
  


}
module.exports = { DashboarPage };
