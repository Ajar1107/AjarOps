const { test,expect } = require('@playwright/test');

test('calendar test', async ({ page }) => {
    const date = 11;
    const month = 2;
    const year = 1994;
    const expectedList = [year, month, date];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__calendar-button").click();
    await page.pause();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator("[class*='prev-button']").click();
    await page.locator("[class*='prev-button']").click();
    await page.locator("[class*='prev-button']").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months button").nth(1).click();
    await page.locator("//abbr[text()= '" + date + "']").click();

    const date2 = page.locator(".react-date-picker__inputGroup input"); //all elements highlight 

    for (let i=0; i< expectedList.length; i++ )
    {
        const value = await date2.nth(i).inputValue();  // "1994-02-11" format 
        expect(value).toEqual(expectedList[i]);
    }


    await page.pause();


})