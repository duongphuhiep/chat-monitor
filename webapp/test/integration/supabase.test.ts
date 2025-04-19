import { expect } from "jsr:@std/expect";
import { createClient } from "@supabase/supabase-js";
import { UUID } from 'node:crypto';

const SUPABASE_API_URL = Deno.env.get("VITE_SUPABASE_API_URL") as string;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_ANON_KEY") as string;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get(
  "VITE_SUPABASE_SERVICE_ROLE_KEY",
) as string;

if (!SUPABASE_API_URL) {
  console.error("VITE_SUPABASE_API_URL is not defined");
  Deno.exit(1);
}

const supabaseAnon = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(SUPABASE_API_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.test("test auth", async () => {
  const userEmail = "hiep1@example.com";
  let newUserId: string|null|undefined;
  {
    const { data, error } = await supabaseAnon.auth.signUp({
      email: userEmail,
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
  {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    expect(error).toBeNull();
    newUserId = data?.users?.find((user) => user.email === userEmail)?.id;
  }
  {
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(
      newUserId as string,
    );
    expect(error).toBeNull();
  }
});
