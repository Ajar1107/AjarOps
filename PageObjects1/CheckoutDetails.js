class CheckoutDetails 
{
    constructor(page)
    {
      this.page = page;
      this.detail = page.locator(".field [type='text']");
      this.submit = page.locator("[type='submit']");
      this.coupong = page.locator("[style*='green']");
      this.dropdown = page.locator(".ta-results");


    }

    async CheckDetails(cvv, name, coupon)
    {
    await this.detail.nth(1).fill(cvv);
    await this.detail.nth(2).fill(name);
    await this.detail.nth(3).fill(coupon);
    //click on submit
    await this.submit.click();
    await this.coupong.waitFor(); //page refresh so wait required

    await this.page.locator("[placeholder='Select Country']").pressSequentially('ind', { delay: 150 }); //type slowly
    
    await this.dropdown.waitFor();
    const ocount = await this.dropdown.locator("button").count(); //sepcifying which count and they are buttons tag.

    for (let i = 0; i < ocount; i++) {
        const text = await this.dropdown.locator("button").nth(i).textContent();
        if (text === " Indonesia") //check spaces too
        {
            await this.dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await this.page.waitForLoadState('networkidle');

    }
    async PlaceOrder()
    {
        await this.page.locator(".btnn").click();
    }
}

module.exports = {CheckoutDetails};