 import { createClient } from "@supabase/supabase-js";
const SUPABASE_API_URL = Deno.env.get("SUPABASE_API_URL") as string;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") as string;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get(
  "SUPABASE_SERVICE_ROLE_KEY",
) as string;

if (!SUPABASE_API_URL) {
  console.error("SUPABASE_API_URL is not defined");
  Deno.exit(1);
}

export const supabaseAnon = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);
export const supabaseAdmin = createClient(
  SUPABASE_API_URL,
  SUPABASE_SERVICE_ROLE_KEY,
);
