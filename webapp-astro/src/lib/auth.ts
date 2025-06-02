import { type AstroCookies, type ValidRedirectStatus } from "astro";
import type { AppCookie } from "./types";
import { navigate } from "astro:transitions/client";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";

type RedirectFunction = (
  path: string,
  status?: ValidRedirectStatus,
) => Response;

export function logoutCookie(astroCtx: { cookies: AstroCookies }) {
  astroCtx.cookies.delete("app", {
    path: "/",
  });
}

export function redirectToLoginPage(astroCtx: { redirect: RedirectFunction }) {
  return astroCtx.redirect("/login");
}

export function redirectToHomePage(astroCtx: { redirect: RedirectFunction }) {
  return astroCtx.redirect("/");
}

export function redirectToLoginPageClientSide() {
  return navigate("/login");
}

export function logout(astroCtx: {
  cookies: AstroCookies;
  redirect: RedirectFunction;
}) {
  logoutCookie(astroCtx);
  redirectToLoginPage(astroCtx);
}

export function getCookie(astroCtx: { cookies: AstroCookies }) {
  return astroCtx.cookies.get("app")?.json() as AppCookie | undefined;
}

export function loginCookie(
  astroCtx: { cookies: AstroCookies },
  cookie: AppCookie,
) {
  return astroCtx.cookies.set("app", cookie, { path: "/" });
}

// function revokeAccessToken(cookies?: AppCookie) {
//   if (!cookies?.access_token || !cookies?.refresh_token) {
//     return;
//   }
//   const supabase = createSupabaseAnon()
// }

export function createAuthenticatedSupabaseAnonSSR(astroCtx: {
  cookies: AstroCookies;
}) {
  const cookie = getCookie(astroCtx);
  const client = createServerClient("SUPABASE_URL", "SUPABASE_ANON_KEY", {
    cookies: {
      getAll() {
        return [
          {
            name: "app",
            value: astroCtx.cookies.get("app")?.value ?? "",
          },
        ];
      },
      setAll(_cookies) {
        _cookies[0].value = JSON.stringify(cookie);
      },
    },
  });

  return client;
}
