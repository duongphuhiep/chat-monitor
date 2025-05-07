import { test, type Page } from '@playwright/test';
import { dropUser } from '../shared/supabase';

const UserEmail = `test_${Date.now()}@logintest.com`;
const UserPassword = 'password';

test('register and signin success on browser', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  console.info('Register new user start ', UserEmail);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.clickRegisterRadioBtn();
  await loginPage.inputUserName(UserEmail);
  await loginPage.inputUserPassword(UserPassword);
  await loginPage.inputConfirmPassword(UserPassword);
  await loginPage.clickSubmitBtn();
  await page.waitForURL(HomePage.Url, { timeout: 10_000 });
  console.info('Register new user ok', UserEmail);

  console.info('Signin start', UserEmail);
  await loginPage.goto();
  await loginPage.clickLoginRadioBtn();
  await loginPage.inputUserName(UserEmail);
  await loginPage.inputUserPassword(UserPassword);
  await loginPage.clickSubmitBtn();

  await page.waitForURL(HomePage.Url, { timeout: 10_000 });
  console.info('Signin ok', UserEmail);

  console.info('Signout start');
  const homePage = new HomePage(page);
  await homePage.clickSignOutBtn();

  await page.waitForURL(LoginPage.Url, { timeout: 10_000 });
  console.info('Signout ok', UserEmail);

  console.info('Drop user start', UserEmail);
  await dropUser(UserEmail);
  console.info('Drop user ok', UserEmail);
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
    const radioButton = this.page.getByRole('radio', { name: 'Register' });
    await radioButton.click();
  }
  public async clickLoginRadioBtn() {
    const radioButton = this.page.getByRole('radio', { name: 'Login' });
    await radioButton.click();
  }
  public async inputUserName(userName: string) {
    const usernameInput = this.page.getByRole('textbox', { name: 'Username' });
    await usernameInput.fill(userName);
  }
  public async inputUserPassword(userPassword: string) {
    const passwordInput = this.page
      .getByRole('textbox', { name: 'Password' })
      .first();
    await passwordInput.fill(userPassword);
  }
  public async inputConfirmPassword(userPassword: string) {
    const confirmPasswordInput = this.page.getByRole('textbox', {
      name: 'Confirm Password',
    });
    await confirmPasswordInput.fill(userPassword);
  }
  public async clickSubmitBtn() {
    const submitButton = this.page.getByRole('button', {
      name: /Login|Register/i,
    });
    await submitButton.click();
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
    console.log(
      '🚀 ~ HomePage ~ clickSignOutBtn ~ this.page.url():',
      this.page.url()
    );
    const signOutButton = this.page.getByRole('button', { name: 'Logout' });
    await signOutButton.waitFor({ state: 'visible', timeout: 10_000 });
    await signOutButton.click();
  }
}
