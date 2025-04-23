import { createAsync, type RouteDefinition } from "@solidjs/router";
import { getUser, logout } from "../lib/index.ts";

export const route = {
  preload() { 
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    getUser("preload") 
  }
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(() => getUser("home"), { deferStream: true });
  return (
    <main class="w-full p-4 space-y-2">
      <h2 class="font-bold text-3xl">Hello {user()?.email}</h2>
      <h3 class="font-bold text-xl">Message board</h3>
      <form action={logout} method="post">
        <button name="logout" type="submit">
          Logout
        </button>
      </form>
    </main>
  );
}
