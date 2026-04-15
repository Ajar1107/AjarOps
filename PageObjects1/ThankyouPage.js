class ThankyouPage
{
constructor(page)
{
this.page =page;
this.ord1 = page.locator(".hero-primary");
this.ord2 = page.locator(".em-spacer-1 .ng-star-inserted");
this.orderbutton = page.locator("[routerlink*='myorders']");
this.load = page.locator("tbody");
this.rowsall = page.locator("tbody tr");
this.cont = page.locator(".email-container");
this.final =  page.locator(".col-text");
}

async ThanksPage()
{
    const thank = await this.ord1.textContent();
    console.log(thank);

    const oid = await this.ord2.textContent();
    console.log(oid);

await this.orderbutton.last().click();
await this.load.waitFor(); //wait till body loads

const rows = this.rowsall;  //row wise tag
const rcount = await rows.count();

    for (let i = 0; i < rcount; i++) {
        const rid = await rows.nth(i).locator("th").textContent(); //first nth used because tr row loaded first then th.
        if (oid.includes(rid))  //if both are same using the includes it matches as same
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

}
    
async finalID()
{
    await this.cont.waitFor();
    const fid = await this.final.textContent();
    console.log(fid);
}
    


}
module.exports = {ThankyouPage};