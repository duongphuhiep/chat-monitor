import { expect } from "jsr:@std/expect";
import puppeteer from "https://deno.land/x/puppeteer_plus/mod.ts";
import { SupabaseAdmin } from "./supabase.ts";

const UserEmail = `test_${Date.now()}@logintest.com`;
const LoginPageUrl = "http://localhost:3000/login";
const HomePageUrl = "http://localhost:3000/";

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();

Deno.test("register and signin success on browser", async () => {
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(LoginPageUrl);

  // Locate the radio button and click on it
  const radioButton = await page.waitForSelector(
    'input[type="radio"][name="loginType"][value="register"]',
  );
  await radioButton?.click();

  // Locate the username input field and type in "pupet@email.com"
  const usernameInput = await page.waitForSelector("#username-input");
  await usernameInput?.type(UserEmail);

  // Locate the username input field and type in "pupet@email.com"
  const passwordInput = await page.waitForSelector("#password-input");
  await passwordInput?.type("mypassword");

  const confirmPasswordInput = await page.waitForSelector(
    "#confirm-password-input",
  );
  await confirmPasswordInput?.type("mypassword");

  // Locate the submit button and click on it
  const submitButton = await page.waitForSelector("button[type='submit']");
  await submitButton?.click();

  await page.waitForNavigation();
  expect(page.url()).toBe(HomePageUrl);

  const newUserId = await getUserId();
  expect(newUserId?.length).toBeGreaterThan(0);

  await dropUser(newUserId!);
});

async function getUserId(): Promise<string | undefined> {
  const { data, error } = await SupabaseAdmin.auth.admin.listUsers();
  expect(error).toBeNull();
  return data?.users?.find((user) => user.email === UserEmail)?.id;
}

async function dropUser(userId: string): Promise<void> {
  const { data: _, error } = await SupabaseAdmin.auth.admin.deleteUser(userId);
  expect(error).toBeNull();
}
