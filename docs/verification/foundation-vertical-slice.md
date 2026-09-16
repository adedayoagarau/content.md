---
title: content.md foundation vertical-slice verification
status: verified-bounded-synthetic-slice
verified: 2026-09-14
runtime: Node.js 24.14.0
package_manager: pnpm 11.9.0
verifier_sha256: 4e98069987cfacec5dc52bd1acfb9ec420ffb0e88db8de9795e79a654077fdae
---

# Foundation vertical-slice verification

The local foundation passed its independent verifier again on 14 September
2026. This establishes a reproducible, permission-bounded synthetic workflow.
It does **not** establish live-model writing quality, real-product safety,
browser research, human validity, or machine-learning improvement.

## Verified subject

- Branch: `codex/taxonomy-issuance-v0.2`
- Packages: 18 private workspace packages, all at `0.1.0`
- Runtime: Node.js `24.14.0` on macOS arm64
- Package manager: `pnpm@11.9.0`
- Fixture: `fixtures/synthetic-web-app`
- Fixture tree digest: `58e2a9a0b5f177b144d9bdea3f65cf84856626255e013e7e8b82ac4e895609c4`
- Verifier: `scripts/verify-foundation.mjs`, SHA-256 `4e98069987cfacec5dc52bd1acfb9ec420ffb0e88db8de9795e79a654077fdae`

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
| Independent verifier | 1,118/1,118 checks passed |
| Package boundaries | 18/18 packages passed declared-dependency checks |
| Schemas | 13 documents; all 880 references resolved |
| Initialization | Digest-bound adoption created five installer-owned files plus one `AGENTS.md` marker block; second adoption created nothing; every pre-existing host byte remained unchanged |
| Content task | Repository-derived task preparation and candidate review preserved root-bound identities, matched portable semantics across identical fixtures, and granted no authority |
| Determinism | Same-root replays matched for doctor, discovery, model, research ingest, and deterministic review |
| Network and filesystem boundary | Retained CLI subprocesses ran with Node filesystem permissions restricted to the temporary project and with Node socket, TLS, HTTP(S), DNS, and `fetch` entry points replaced by a fail-closed guard |
| Mutation | Preview changed no product file; apply without approval exited `21`; exact approval changed one declared file; readback passed |
| Rollback | A separate rollback authorization restored exact original bytes and passed readback |
| Memory | Two projections matched; canonical export/import remained byte-identical; event-export digest `650d3233f3d0d99e3cb38b4efd30499ea65f0a6fcc7a5e314ac15d2270f9ecb3` |
| Learning | Candidate remained `proposed`, `not_requested`, with `authority_effect: none` |
| Uninstall | Preview listed only five manifest-declared files and the exact installer-owned `AGENTS.md` marker block; it removed nothing |

The five same-root replay digests were:

1. doctor — `120c010b7073f3e4bed0476c80db96b3717cfe7ab27eb2ab9c9792b3c611b04f`
2. discovery — `173c93e94c1a03de3bef0401461124ce6d920de886a537562fa2015eea38c0e2`
3. model — `19e7dd1ef565a988cff3c54dcea8b026993ec6e213334949dc8cfca1bc194736`
4. research ingest — `b391d82befdf0d8f2c4b1cd195adf3da94e504395ae80826eb0f75d85240b5c0`
5. deterministic review — `a46e8fd0bbd3065f659ec31130670b4446204c788ac4c0e6dbac0c63f082fde6`

## Known warning

Node.js 24.14.0 reports its built-in SQLite module as experimental. The version guard intentionally rejects other major/minor runtime families until separately tested.

## Explicit nonclaims

This verification does not establish:

- live-model usefulness, writing quality, or provider reliability;
- browser, desktop, competitor, account, connector, or remote research capability;
- a hosted service, public registry publication, or cloud runtime;
- safe operation on a real product or authority to mutate one;
- approved brand voice, terminology, locale, accessibility, legal, policy, or product facts;
- cognitive validity, qualified content-designer agreement, representative-user outcomes, or benchmark superiority;
- learning promotion, model training, autonomous policy change, publication, or release authority; or
- closure of Phase 4, B0, B1, Track B, architecture `r2`, or any conforming research gate.

## Next evidence

The next evidence tranche is qualified content-designer review of the blinded
content-design benchmark. Browser/desktop research, hosted runtimes, external
adapters, approved evidence ingestion, learned ranking, domain packs, and
human/product validation remain separately governed follow-on work.
