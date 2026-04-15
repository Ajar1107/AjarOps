
import {Page, Locator, expect} from '@playwright/test';

export class LoginPage {

page: Page;
signInbutton: Locator;
userName : Locator;
passWord : Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
    }

    async landPage() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }


    async ValidLogin(email: any, pwd: any) {
        await this.userName.fill(email);
        await this.passWord.fill(pwd);
        await this.signInbutton.click();
        await this.page.locator(".card-body").first().waitFor();
    }


}