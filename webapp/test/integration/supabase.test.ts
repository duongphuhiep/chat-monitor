import { SupabaseAdmin, SupabaseAnon } from "./supabase.ts";
import { expect } from "jsr:@std/expect";

Deno.test("register and signin success", async () => {
  const UserEmail = `test_${Date.now()}@supabasetest.com`;

  let newUserId: string | null | undefined;
  { // register
    const { data, error } = await SupabaseAnon.auth.signUp({
      email: UserEmail,
      password: "password",
    });
    if (error?.code == "user_already_exists") {
      console.log("user_already_exists - continue the test");
    } else {
      expect(error).toBeNull();
      newUserId = data?.user?.id;
      expect(newUserId).toBeTruthy();
    }
  }
  let jwtToken: string | null | undefined;
  let refreshToken: string | null | undefined;
  { // signin returns jwt
    const { data, error } = await SupabaseAnon.auth.signInWithPassword({
      email: UserEmail,
      password: "password",
    });
    expect(error).toBeNull();
    jwtToken = data?.session?.access_token;
    refreshToken = data?.session?.refresh_token;
    expect(jwtToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
    console.log(
      "🚀 ~ Deno.test ~ jwtToken, refreshToken:",
      jwtToken,
      refreshToken,
    );
  }
  { // get user from jwt
    const { data, error } = await SupabaseAnon.auth.getUser(jwtToken);
    expect(error).toBeNull();
    console.log("🚀 ~ getUser ~  data:", data);
  }
  { // list users
    const { data, error } = await SupabaseAdmin.auth.admin.listUsers();
    expect(error).toBeNull();
    newUserId = data?.users?.find((user) => user.email === UserEmail)?.id;
  }
  { // delete user
    const { data: _, error } = await SupabaseAdmin.auth.admin.deleteUser(
      newUserId as string,
    );
    expect(error).toBeNull();
  }
});
