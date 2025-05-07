# Migrating away from Deno to NodeJS

This small project initially used Deno, but I decided to migrate back to NodeJS for better compatibility with existing libraries and tools.

BIG problem with Deno: Ecosystem

The Deno Ecosystem is not as well established as the NodeJS Eco-System. I often have to use tools or packages of the NodeJS ecosystem. For example

- `eslint`: support richer rule set than `Deno-lint`, some rules are very important to me, I end up using both of them.
- `Playwright` / `puppeteer` are not friendly when running with Deno, randomly giving error "Leaks detected: A timer as started before the test...".

I end up wasting time to fight the Deno-NodeJS compatibility / configuration rather than concentrating on the project.

I might come back to Deno only if the project stack is 100% supported Deno eg: ([Hono](https://hono.dev/), [Fresh](https://fresh.deno.dev/))
In other words, no need to use anything outside of the Deno ecosystem.
