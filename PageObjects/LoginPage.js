class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
    }

    async landPage() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }


    async ValidLogin(email, pwd) {
        await this.userName.fill(email);
        await this.passWord.fill(pwd);
        await this.signInbutton.click();
        await this.page.locator(".card-body").first().waitFor();
    }


}
module.exports = { LoginPage };