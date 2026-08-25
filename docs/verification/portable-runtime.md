# Portable Runtime 0.1 verification

Status: `verified_synthetic_local`

This record covers the portable local runtime implemented in the worktree based on commit `77eddaa1a00eccf538ecf8a5b6aea72a6f7d754e`. It is a development verification claim over synthetic fixtures. It is not evidence of a Cloudflare adapter, a Cloudflare deployment, a production host, a hosted account, a live connector, a production user outcome, or general writing effectiveness.

## Runtime and release evidence

| Item | Verified value |
| --- | --- |
| Release | `portable-runtime/0.1` |
| Node | `24.14.0` |
| Node executable | `/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node` |
| Platform | `darwin` / `arm64` |
| pnpm | `11.9.0` |
| Portable verifier | 67 checks passed, 0 failed |
| Portable receipt digest | `52f3a58d5e5f4c9b62404d71ab7da6bf4a7187b8616ebe97878161071ff34d7f` |
| Retained foundation | 1,008 checks passed |
| Foundation verifier digest | `aef73fa08f656ec4f2e5a9c356d73c3333ce94be27fbac795d53b3f043d74aa3` |
| Full repository tests | 121 files, 2,077 tests passed |
| Package boundaries | 17 packages passed |
| Pairwise golden | `2f23b63bc922a1b3a26bcb9911eac4d00bd5f01fd11154fb71a70aeecd03a570` |

The fallback-pnpm install named by the plan requires noninteractive mode in this environment. The first direct invocation exited `1` with `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`; the same frozen command under `CI=true` exited `0`, reported all 18 workspace projects already up to date, and used pnpm 11.9.0. The independent verifier additionally copied every manifest, cloned the active content-addressed store into a fresh temporary root, invoked the exact fallback-pnpm install arguments with trusted frozen-store and offline environment controls, and observed zero downloads.

## Commands and outcomes

| Command | Outcome |
| --- | --- |
| Node range assertion | exit 0 |
| `CI=true .../fallback/pnpm install --frozen-lockfile --ignore-scripts --prefer-offline` | exit 0; 18 workspace projects; already up to date |
| `node node_modules/typescript/bin/tsc -b tsconfig.json` | exit 0 |
| `node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false` | exit 0 |
| `node scripts/check-package-boundaries.mjs` | exit 0; 17 packages |
| `node node_modules/vitest/vitest.mjs run` | exit 0; 121 files and 2,077 tests |
| `node --import tsx scripts/generate-pairwise-golden.mts --check` | exit 0; external byte lock verified |
| `node scripts/verify-foundation.mjs` | exit 0 inside the independent portable verifier; 1,008 retained checks |
| `node scripts/verify-portable-runtime.mjs --sdd-ledger .superpowers/sdd/2026-08-20-contentmd-portable-runtime/progress.md` | exit 0; 67 checks and 0 failures |

## Independent portable-runtime checks

The verifier emitted these check IDs:

```text
runtime.node-range
runtime.exec-path
runtime.clean-install-store
runtime.pnpm-version
runtime.clean-install
runtime.clean-install-offline-evidence
supply-chain.forbidden-dependencies
supply-chain.forbidden-imports
packages.runtime-sdk.manifest
packages.runtime-sdk.source-closure
packages.runtime-sdk.build-closure
packages.runtime-local.manifest
packages.runtime-local.source-closure
packages.runtime-local.build-closure
schemas.runtime-family-closure
schemas.runtime-validation
packages.boundaries
detection.authority-effect
detection.fixture-non-effect
detection.env-canary
detection.live-status-unknown
detection.env-canary-read-boundary
detection.cloudflare-nonbindable
detection.cloudflare-local-fallback
authority.forged.event-store
authority.no-state-change.event-store
authority.forged.jobs
authority.no-state-change.jobs
authority.forged.approval-pause
authority.no-state-change.approval-pause
authority.forged.progress
authority.no-state-change.progress
authority.forged.export
authority.no-state-change.export
authority.forged.blob-store
authority.no-state-change.blob-store
authority.forged.scheduler
authority.no-state-change.scheduler
authority.forged.ingress
authority.no-state-change.ingress
authority.forged.secrets
authority.no-state-change.secrets
authority.forged.sync
authority.no-state-change.sync
authority.forged.health
authority.no-state-change.health
authority.forged.cleanup
authority.no-state-change.cleanup
authority.single-use-replay
replica.trace-shape
replica.trace-replay
replica.canonical-first-and-host-loss
export.permitted-bundle-reverification
binding.profile-fixture
binding.authority-fixture
binding.governed-activation
binding.projection-digest
binding.projection-readback
binding.activation-event-readback
binding.activation-payload-digest
binding.activation-event-digest
binding.event-projection-binding
foundation.retained
foundation.nonzero-checks
workspace.initial-status-present
workspace.status-readable
workspace.portable-runtime-boundary
```

## Supported synthetic local interfaces

The verified local profile exposes exactly these focused interfaces:

```text
runtime.event-store
runtime.blob-store
runtime.jobs
runtime.approval-pause
runtime.progress
runtime.export
runtime.scheduler
runtime.ingress
runtime.secrets
runtime.sync
runtime.health
runtime.cleanup
```

Every interface was called with a forged operation. Each call failed with `runtime_binding_not_authorized:forged_operation`, and an independent semantic state digest proved no runtime state changed. A valid single-use operation was then replayed and failed with `runtime_operation_nonce_replayed`.

## Detection and no-effect evidence

Detection ran with a network-denial preload. Complete fixture-tree digests matched before and after `runtime inspect`; inspection declared `authority_effect: none`; an instrumented filesystem proved that only the selected `package.json` was read; and `.env` canary bytes were neither read nor emitted. Live deployment state remained explicitly unknown.

A synthetic Cloudflare-shaped fixture produced a `runtime.cloudflare-agents` candidate with `bindable: false` and `availability: adapter_unavailable_pending_plan_4`. The recommended bindable fallback remained `runtime.local`. This is detection evidence only.

Run-specific fixture digests from the recorded verifier receipt were:

```text
binding_projection 9b5cd0a200e75c5efd54e3d632fabf01ee07711272abeda7295ef02a48f6bc73
canonical_replica_trace 71f0bb3732745f2004f6d6e4f0b922ec7eb43b08b47f6afb46cf7dfe5b75e433
cloudflare_candidate_before_profile 8d6d061bc8f5fb39fd1862b303a0251c4dbb49758d4c2388c06926348ad86081
foundation_verifier aef73fa08f656ec4f2e5a9c356d73c3333ce94be27fbac795d53b3f043d74aa3
node_local 96a30ab5653ff0f84104f7894bafe3e4683ee362213c1bee36b70d0a3b2a3207
```

## Canonical-first, binding, and readback evidence

The canonical replica trace contains four fixed steps and replays byte-exactly. The verifier forced replaceable-host persistence before canonical acknowledgement and observed denial. It then removed the replaceable host copy and restored event, manifest, checkpoint, acknowledgement, and blob digests from canonical state.

Local binding required an exact proposal, a separate approved decision, current controls, seven exact runtime authorization records, and all 12 passing conformance receipts. Projection occurred only after the activation append and independent SQLite readback. The verifier independently recomputed the projection digest, payload digest, event digest, sequence binding, and permitted export bundle.

The event store now distinguishes ordinary idempotent replay from one-shot exclusive claims. Two concurrent provider-attempt claims cannot both report success; the losing claim fails as already claimed while the append-only stream retains exactly one event.

## Remaining limitations

- Verification used synthetic local host fixtures.
- No `agents`, `wrangler`, or `@cloudflare/*` dependency or production import exists in this release.
- No Cloudflare adapter, deployment, account, Durable Object, Worker, hosted workflow, or Cloudflare equivalence was verified.
- No production host, live connector, authenticated organization authority, production publication, or production user outcome was verified.
- This receipt verifies runtime controls and deterministic behavior. It makes no claim that content.md is generally or universally effective as a writer.
- Chrome browser control was independently rechecked on 2026-08-23: session naming, live-tab enumeration, navigation, and DOM reading succeeded. Live cross-industry product acquisition remains a separate action-time evidence gate and was not performed by this portable-runtime verification.
