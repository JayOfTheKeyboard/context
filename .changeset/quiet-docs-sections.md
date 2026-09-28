---
"@neuledge/context": patch
---

Keep documentation sections whose folder shares a name with a skipped repo directory (`build`, `examples`, `test`, `dev`, `internal`, `plans`, `spec`, and the rest) when the scan starts inside a docs folder. These names were skipped at every depth, so with `docs_path` set a real section vanished and the build still reported success: `docker/docs` lost its whole Docker Build manual (`content/manuals/build/`, 100 pages), `cloudflare-docs` lost 49 Workers examples, `kysely` lost 40 of its 67 pages and `bun` lost its 32 test-runner guides. Tooling directories (`node_modules`, `dist`, `out`, `fixtures`, `__tests__` and similar) are still skipped everywhere, and a whole-repo scan skips everything it did before.
