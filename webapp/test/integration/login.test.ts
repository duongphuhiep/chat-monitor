import { expect } from "jsr:@std/expect";
import puppeteer from "https://deno.land/x/puppeteer_plus/mod.ts";
import { supabaseAdmin } from "./supabase.ts";

const UserEmail = `test_${Date.now()}@logintest.com`;
const UserPassword = "password";
const LoginPageUrl = "http://localhost:3000/login";
const HomePageUrl = "http://localhost:3000/";

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();

Deno.test("register and signin success on browser", async t => {
  const page = await browser.newPage();

  await t.step("Register new user", async () => {
    await page.goto(LoginPageUrl);
  
    // Locate the radio button and click on it
    const radioButton = await page.waitForSelector(
      'input[type="radio"][name="loginType"][value="register"]'
    );
    await radioButton?.click();
  
    // Locate the username input field and type in "pupet@email.com"
    const usernameInput = await page.waitForSelector("#username-input");
    await usernameInput?.type(UserEmail);
  
    // Locate the username input field and type in "pupet@email.com"
    const passwordInput = await page.waitForSelector("#password-input");
    await passwordInput?.type(UserPassword);
  
    const confirmPasswordInput = await page.waitForSelector(
      "#confirm-password-input"
    );
    await confirmPasswordInput?.type(UserPassword);
  
    // Locate the submit button and click on it
    const submitButton = await page.waitForSelector("button[type='submit']");
    await submitButton?.click();
    await page.waitForNavigation({timeout:3000});
    expect(page.url()).toBe(LoginPageUrl);
  });

  await t.step("Signin success", async () => {
    expect(page.url()).toBe(LoginPageUrl);
    // Locate the username input field and type in "pupet@email.com"
    const usernameInput = await page.waitForSelector("#username-input");
    await usernameInput?.type(UserEmail);
  
    // Locate the username input field and type in "pupet@email.com"
    const passwordInput = await page.waitForSelector("#password-input");
    await passwordInput?.type(UserPassword);
    
    // Locate the submit button and click on it
    const submitButton = await page.waitForSelector("button[type='submit']");
    await submitButton?.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(HomePageUrl);
  })
  
  await t.step("Signout success", async () => {
    expect(page.url()).toBe(HomePageUrl);
    const signOutButton = await page.waitForSelector("button[name='logout']");
    await signOutButton?.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(LoginPageUrl);
  })
  
  await t.step("Drop user", async () => {
    const newUserId = await getUserId();
    expect(newUserId?.length).toBeGreaterThan(0);
    await dropUser(newUserId!);
  })
  
  async function getUserId(): Promise<string | undefined> {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    expect(error).toBeNull();
    return data?.users?.find((user) => user.email === UserEmail)?.id;
  }
  
  async function dropUser(userId: string): Promise<void> {
    const { data: _, error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    expect(error).toBeNull();
  }
  
});

