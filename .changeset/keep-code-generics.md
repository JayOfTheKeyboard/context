---
"@neuledge/context": patch
---

Keep generic types and JSX inside code examples. The MDX tag cleanup also ran inside fenced blocks and inline code, so `createTRPCClient<AppRouter>()` was indexed as `createTRPCClient()`, `List<String>` as `List`, and `<App />` vanished. Every such code line was damaged in the four doc sets measured: 289 in the NestJS docs, 298 in tRPC, 44 in Kysely and 88 in Drizzle. MDX component tags such as `<AppOnly>` outside code are still removed.
