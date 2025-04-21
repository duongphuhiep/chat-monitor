import { action, query, redirect } from "@solidjs/router";
import { supabaseAnon } from "../supabase.ts";
import { getSessionData, loginSession, logoutSession } from "./session.ts";

export const getUser = query(async () => {
  "use server";
  try {
    console.log("getUser is called");
    const session = await getSessionData();
    //not login yet
    if (!session?.jwt) throw redirect("/login");
    //get user
    const {data, error} = await supabaseAnon.auth.getUser(session?.jwt);
    if (error) throw error;
    return data.user;
  } catch (err) {
    console.log("🚀 ~ getUser ~ err:", err)
    await logoutSession();
    throw redirect("/login");
  }
}, "user");

export const loginOrRegister = action(async (formData: FormData) => {
  "use server";
  const email = String(formData.get("username"));
  const password = String(formData.get("password"));
  const loginType = String(formData.get("loginType"));
  const validationError = validateUsername(email) || validatePassword(password);
  if (validationError) return new Error(validationError);

  if (loginType === "register") {
    const confirmPassword = String(formData.get("confirm-password"));
    if (confirmPassword !== password) {
      throw new Error("Confirm Password does not match");
    }
    const { data: _, error } = await supabaseAnon.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
  } else { //login
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });
    loginSession({
      jwt: data?.session?.access_token,
      refreshToken: data?.session?.refresh_token,
    });
    if (error) {
      throw error;
    }
  }
  return redirect("/");
});

export const logout = action(async () => {
  "use server";
  await logoutSession();
  return redirect("/login");
});

function validateUsername(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return `Invalid email format`;
  }
}

function validatePassword(password: string) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}
