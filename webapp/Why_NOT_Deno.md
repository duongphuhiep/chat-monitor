# Migrating away from Deno to NodeJS

This small project initially used Deno, but I decided to migrate back to NodeJS for better compatibility with existing libraries and tools.

BIG problem with Deno: Ecosystem

The Deno Ecosystem is not as well established as the NodeJS Eco-System. I often have to use tools or packages of the NodeJS ecosystem. For example

- `eslint`: support richer rule set than `Deno-lint`, some rules are very important to me, I end up using both of them.
- `Playwright` / `puppeteer` are not friendly when running with Deno, randomly giving error "Leaks detected: A timer as started before the test...".

I end up wasting time to fight the Deno-NodeJS compatibility / configuration rather than concentrating on the project.

I might come back to Deno if:

- Deno would be a true Drop-in replacement to NodeJS to the point that I can "alias node=deno" and all NodeJs packages or existing toolchains of NodeJS can just work with Deno without any changes or configuration.
- Or when the Deno ecosystem will be mature enough to the point that all the big libray or frameworks officially support it: (Pnpm, Vite, Vue, Svelte, Playwright, supabase-cli..)
