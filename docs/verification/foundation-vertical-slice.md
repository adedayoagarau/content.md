---
title: content.md foundation vertical-slice verification
status: verified-bounded-synthetic-slice
verified: 2026-08-20
runtime: Node.js 24.14.0
package_manager: pnpm 11.9.0
verifier_sha256: 5d9445f34afb49fb4b0ed235e70736efdf62fc61e97c7eed7bcb332e72e613e5
---

# Foundation vertical-slice verification

The local foundation passed its independent verifier on 20 August 2026. This establishes a reproducible, permission-bounded synthetic workflow. It does **not** establish a released universal agent, live-model writing quality, real-product safety, browser research, human validity, or machine-learning improvement.

## Verified subject

- Branch: `feature/contentmd-foundation`
- Packages: 13 private workspace packages, all at `0.1.0`
- Runtime: Node.js `24.14.0` on macOS arm64
- Package manager: `pnpm@11.9.0`
- Fixture: `fixtures/synthetic-web-app`
- Fixture tree digest: `5a956b19e3eea6c0fb3d40e8a090c207f820662e1f3c2fab65a632eeee7c6ba2`
- Verifier: `scripts/verify-foundation.mjs`, SHA-256 `5d9445f34afb49fb4b0ed235e70736efdf62fc61e97c7eed7bcb332e72e613e5`

## Commands

```bash
export PATH="/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH"
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm typecheck
pnpm lint
pnpm verify:foundation
```

The verifier also performs its own fresh temporary-workspace install from `pnpm-lock.yaml` with lifecycle scripts disabled. Install-time dependency retrieval is outside the retained CLI network boundary.

## Results

| Plane | Result |
| --- | --- |
| Test suite | 95/95 tests passed across 41 test files |
| Independent verifier | 246/246 checks passed |
| Package boundaries | 13/13 packages passed declared-dependency checks |
| Schemas | 4 documents; all 70 references resolved |
| Initialization | First adoption created four installer-owned files; second adoption created none; host bytes were unchanged |
| Determinism | Two clean roots produced matching portable digests for doctor, discovery, model, research, review, strategy, draft, and rewrite |
| Recorded provider | Strategy, draft, and rewrite matched exact cassette request digests |
| Network and filesystem boundary | Retained CLI subprocesses ran with Node filesystem permissions restricted to the temporary project and with Node socket, TLS, HTTP(S), DNS, and `fetch` entry points replaced by a fail-closed guard |
| Mutation | Preview changed no product file; apply without approval exited `21`; exact approval changed one declared file; readback passed |
| Rollback | A separate rollback authorization restored exact original bytes and passed readback |
| Memory | Two projections matched; canonical export/import remained byte-identical; event-export digest `d315503fcf9898fec2315b50c5d8afb270ef73f5a4004dd7f3246298281fe9b3` |
| Learning | Candidate remained `proposed`, `not_requested`, with `authority_effect: none` |
| Uninstall | Preview listed only the four manifest-declared installer-owned files and removed nothing |

The eight portable output digests were:

1. doctor — `e34112c027fb944cb37cfc935e3844cebaeb0c2e8f5c4467e1ff5406db65d784`
2. discovery — `30a2b4fea3e19b5572fdf195e1525bf01829705e5111152f6605717006297694`
3. model — `65016f4344b8bb2436793b7b008c94dcb41f4f55cd3db7f038bc327b86ff5301`
4. research ingest — `454e9c278524bc92130ef58d3e0ced3b8ae21956db10444552dc6ca726c37cbe`
5. deterministic review — `b92a925979e794042b2e3b8343b3f9de9b2c4e76bb19cdc404ef4b6ad9968495`
6. recorded strategy — `0264517f9c8953f4d106b1e1e61bbac551ba0c8739ab913ee19e720cf77f7368`
7. recorded draft — `0d1cfa4dab3331710f4040fd021472cfda04d4736c1cf310ae83102d26a798a6`
8. recorded rewrite — `1cc79b1628f6eb230ea09a2e48a7bcfbe38025fa24181f080815aa2bbca39aa7`

## Known warning

Node.js 24.14.0 reports its built-in SQLite module as experimental. The version guard intentionally rejects other major/minor runtime families until separately tested.

## Explicit nonclaims

This verification does not establish:

- live-model usefulness, writing quality, or provider reliability;
- browser, desktop, competitor, account, connector, or remote research capability;
- a hosted service, packaged public installer, local workbench, or cloud runtime;
- safe operation on a real product or authority to mutate one;
- approved brand voice, terminology, locale, accessibility, legal, policy, or product facts;
- cognitive validity, qualified content-designer agreement, representative-user outcomes, or benchmark superiority;
- learning promotion, model training, autonomous policy change, publication, or release authority; or
- closure of Phase 4, B0, B1, Track B, architecture `r2`, or any conforming research gate.

## Next evidence

The next engineering tranche is live-provider and evaluation work behind the same records and controls. Browser/desktop research, Agents SDK hosting, the workbench, external adapters, learned ranking, domain packs, and human/product validation remain separate follow-on plans.
