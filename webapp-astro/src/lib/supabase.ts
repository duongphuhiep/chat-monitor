import { createClient } from "@supabase/supabase-js";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

const SUPABASE_API_URL = import.meta.env.SUPABASE_API_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY as string;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env
  .SUPABASE_SERVICE_ROLE_KEY as string;

if (!SUPABASE_API_URL) {
  console.error("SUPABASE_API_URL is not defined");
  throw new Error("SUPABASE_API_URL is not defined");
}

export function createSupabaseAdmin() {
  console.info("createSupabaseAdmin");
  return createClient(SUPABASE_API_URL, SUPABASE_SERVICE_ROLE_KEY);
}

export function createSupabaseAnon(astroCtx: {
  cookies: AstroCookies;
  request: Request;
}) {
  return createServerClient(SUPABASE_API_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        const cookieHeader = astroCtx.request.headers.get("cookie");
        if (!cookieHeader) {
          return [];
        }
        const cookies = parseCookieHeader(cookieHeader);
        return cookies as
          | {
              name: string;
              value: string;
            }[]
          | null;
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          astroCtx.cookies.set(name, value, options),
        );
      },
    },
  });
}
