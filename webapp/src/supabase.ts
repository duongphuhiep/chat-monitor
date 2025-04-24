import { createClient } from "@supabase/supabase-js";

const SUPABASE_API_URL = process.env.SUPABASE_API_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!SUPABASE_API_URL) {
  console.error("SUPABASE_API_URL is not defined");
  process.exit(1);
}

export const supabaseAnon = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);
export const supabaseAdmin = createClient(
  SUPABASE_API_URL,
  SUPABASE_SERVICE_ROLE_KEY,
);
