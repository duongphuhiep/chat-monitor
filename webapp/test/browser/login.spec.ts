import { test, type Page } from '@playwright/test';
import { dropUser } from '../shared/supabase';

const UserEmail = `test_${Date.now()}@logintest.com`;
const UserPassword = 'password';

test('register and signin success on browser', async ({ page }) => {
  console.info('Register new user');
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.clickRegisterRadioBtn();
  await loginPage.inputUserName(UserEmail);
  await loginPage.inputUserPassword(UserPassword);
  await loginPage.inputConfirmPassword(UserPassword);
  await loginPage.clickSubmitBtn();

  await page.waitForURL(LoginPage.Url, { timeout: 10000 });
  await page.waitForLoadState('domcontentloaded');

  console.info('Signin success');
  await loginPage.clickLoginRadioBtn();
  await loginPage.inputUserName(UserEmail);
  await loginPage.inputUserPassword(UserPassword);
  await loginPage.clickSubmitBtn();

  await page.waitForURL(HomePage.Url, { timeout: 10000 });
  await page.waitForLoadState('domcontentloaded');

  console.info('Signout success');
  const homePage = new HomePage(page);
  await homePage.clickSignOutBtn();

  await page.waitForURL(LoginPage.Url, { timeout: 10000 });
  await page.waitForLoadState('domcontentloaded');

  console.info('Drop user');
  await dropUser(UserEmail);
});

class LoginPage {
  public static readonly Url = 'http://localhost:3000/login';

  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  public async goto() {
    await this.page.goto(LoginPage.Url);
  }
  public async clickRegisterRadioBtn() {
    const radioButton = await this.page.locator(
      'input[type="radio"][name="loginType"][value="register"]'
    );
    await radioButton?.click();
  }
  public async clickLoginRadioBtn() {
    const radioButton = await this.page.locator(
      'input[type="radio"][name="loginType"][value="login"]'
    );
    await radioButton?.click();
  }
  public async inputUserName(userName: string) {
    const usernameInput = await this.page.locator('#username-input');
    await usernameInput.fill(userName);
  }
  public async inputUserPassword(userPassword: string) {
    const passwordInput = await this.page.locator('#password-input');
    await passwordInput?.fill(userPassword);
  }
  public async inputConfirmPassword(userPassword: string) {
    const confirmPasswordInput = await this.page.locator(
      '#confirm-password-input'
    );
    await confirmPasswordInput?.fill(userPassword);
  }
  public async clickSubmitBtn() {
    const submitButton = await this.page.locator("button[type='submit']");
    await submitButton?.click();
  }
}

class HomePage {
  public static readonly Url = 'http://localhost:3000/';
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  public async goto() {
    await this.page.goto(HomePage.Url);
  }
  public async clickSignOutBtn() {
    const signOutButton = await this.page.locator("button[name='logout']");
    await signOutButton?.click();
  }
}
