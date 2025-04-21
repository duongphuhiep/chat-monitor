import { action, query, redirect } from "@solidjs/router";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_API_URL = Deno.env.get("VITE_SUPABASE_API_URL") as string;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_ANON_KEY") as string;
const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);

export const getUser = query(async () => {
  "use server";
  // try {
  //   const session = await getSession();
  //   const userId = session.data.userId;
  //   if (userId === undefined) throw new Error("User not found");
  //   const user = await db.user.findUnique({ where: { id: userId } });
  //   if (!user) throw new Error("User not found");
  //   return { id: user.id, username: user.username };
  // } catch {
  //   await logoutSession();
  //   throw redirect("/login");
  // }
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
      return new Error("Confirm Password does not match");
    }
    const { data: _, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return error;
    }
  } else { //login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("🚀 ~ login ~ data:", data);
    if (error) {
      return error;
    }
  }
  return redirect("/");
});

export const logout = action(async () => {
  "use server";
  //await logoutSession();
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
