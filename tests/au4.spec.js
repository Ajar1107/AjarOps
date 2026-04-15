const { test, expect } = require("@playwright/test");

//test.describe.configure({mode: "parallel"});
//test.describe.configure({mode:'serial'});
// test.skip();  // to skip when running parllel with same pages navigation

test('Login', async ({ page }) => {
    const user = page.locator("#email");
    const pwd = page.locator("#password");
    //const baseurl  = page.goto("https://eventhub.rahulshettyacademy.com/login");

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await user.fill("g.rajanaidu49@gmail.com");
    await pwd.fill("Awesome@123");
    await page.locator("#login-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible();

    await page.locator("#event-card").first().waitFor();
    await page.locator(".relative button").first().click();
    await page.locator(".relative a").first().click();

    await page.locator("#event-title-input").fill("Raja marriage fucntion");
    await page.getByPlaceholder("Describe the event…").fill("Event function is related to huldi function with dance and songs");
    //await page.locator("#city").filter({hasText : 'Anantapur'});
    await page.locator("#city").fill("Anantapur");
    await page.getByPlaceholder("Venue name & address").fill("Near Naresh function hall");
    await page.pause();
    const time = "2026-08-23T10:01";
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill(String(time));
    await page.getByLabel("Price ($)").fill("101");
    await page.getByLabel("Total Seats").fill("502");

    //await page.locator("#event-date-&-time").fill("2026-03-22T11:30");
    //await page.locator("#price-($)").fill("100");
    //await page.locator("#total-seats").fill("500");

    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();

})

test('new one', async ({ page }) => {
    const user = page.locator("#email");
    const pwd = page.locator("#password");

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await user.fill("g.rajanaidu49@gmail.com");
    await pwd.fill("Awesome@123");
    await page.locator("#login-btn").click();

    await page.locator("#nav-events").click();
    await page.locator("#event-card").first().waitFor();
    const event1 = page.locator("#event-card");
    const event2 = await event1.filter({ hasText: 'Raja marriage fucntion' });
    const eventn = await event1.filter({ hasText: 'Raja marriage fucntion' }).locator(".flex .text-xs").last().textContent();
    console.log(eventn);
    await event2.locator("#book-now-btn").click();

    await page.waitForLoadState('networkidle');
    await page.locator(".w-9").last().click();
    await page.locator(".w-9").last().click();
    await page.locator(".w-9").last().click();
    await page.pause();
    await page.locator("#customerName").fill("Raja");
    await page.locator("#customer-email").fill("g.rajanaidu49@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("7995885131");
    await page.getByText("Confirm Booking").click();

    const bookref = await page.locator(".booking-ref").textContent();
    console.log(bookref);

    await page.getByRole('button', { name: "View My Bookings" }).click();

    await page.locator(".space-y-4").waitFor();
    const ev = await page.locator("#booking-card").filter({ hasText: bookref }).locator(".flex .booking-ref").textContent();
    console.log(ev);
    await expect(ev).toEqual(bookref);

    await page.locator("#booking-card").filter({ hasText: bookref }).getByRole('button', { name: "View Details" }).click();
    await page.getByRole("heading", { name: 'Refund' }).waitFor();
    await page.locator("#check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();

    const tes = await page.getByText('Checking your refund').textContent();
    console.log(tes);
    await page.pause();
    const ref1 = await page.getByText("Eligible for refund.").textContent();
    console.log(ref1);





})
