# content.md Live, Learning, Research, and Runtime Program Execution Order

> **For agentic workers:** This file is the mandatory cross-plan dispatch contract. Use `superpowers:subagent-driven-development`, one production implementer at a time, with a fresh review after every task. Each production task still follows its source plan and `superpowers:test-driven-development`.

**Goal:** Make the five approved implementation plans executable as one program without concurrent edits, missing prerequisites, or last-writer-wins changes to shared schemas, package manifests, CLI composition, and verification surfaces.

**Applies to:**

- [Public UX-writing journey corpus](2026-08-20-contentmd-public-ux-writing-journey-corpus.md)
- [Recursive learning and ranking](2026-08-20-contentmd-recursive-learning-ranking.md)
- [Governed live intelligence](2026-08-20-contentmd-governed-live-intelligence.md)
- [Portable runtime](2026-08-20-contentmd-portable-runtime.md)
- [Optional Cloudflare runtime adapter](2026-08-20-contentmd-runtime-cloudflare.md)

## Dispatch invariants

1. Only one production implementer may be active in this workspace. Research review may run in parallel only when it is read-only and touches no implementation path.
2. Before dispatch, the coordinator records the exact base commit, current porcelain status, declared task paths, narrow red test, and external prerequisites in the SDD ledger.
3. A task may change only paths declared by its source plan. A newly discovered shared-file need stops the task until this contract and the source plan are reviewed.
4. Each task starts with a failing test, reaches the narrow green state, runs its required regression set under the pinned Node 24 runtime, receives independent review, and is committed before the next task begins.
5. Shared files are cumulative registries, manifests, or integration surfaces. A later task must preserve earlier entries and tests; it may extend them only under a new unique ID or an explicit tested migration.
6. No task may use live browser evidence from the nonconforming GOV.UK pilot as controlled-corpus, prompt, learning, calibration, or benchmark material.
7. Cloudflare work remains emulator-only. No deployment, credential entry, production route, DNS change, remote state mutation, or production-live claim is part of this program order.

## Normative total order

The default is deliberately serial. A different order requires a reviewed revision of this file before dispatch.

| Sequence | Source plan and task | Entry condition | Exit evidence |
| --- | --- | --- | --- |
| 1 | Public corpus Task 1 | Current frozen pattern packet and schema baseline | Canonical pattern wire, lossless legacy converter, schema parity, retained packet bytes unchanged |
| 2 | Recursive learning Tasks 1–6, in order | Public Task 1 committed | Offline learning schemas, qualification, datasets, features, training, evaluation, and governance semantics committed |
| 3 | Governed live-intelligence Tasks 1–8, in order | Recursive Task 6 committed; shared schema baseline green | Strict model outputs, governed recorded/live adapter boundary, CLI composition, offline verification committed |
| 4 | Recursive learning Tasks 7–9, in order | Governed Tasks 6–8 committed | CLI integration, LIL-WRITE engine self-test, and independent learning verification committed; official attempt remains `not_started` |
| 5 | Public corpus Tasks 2–8, in order except Tasks 3 and 4 may be implemented sequentially in either order; Task 5 navigation may remain gated | Recursive Task 1 and governed Task 3 committed | Typed research records, deterministic graph, exact acquisition-denial/gate state, project-owned comparisons, writer/evaluator integration, and implementation verification committed; no controlled corpus claim until conforming acquisition passes |
| 6 | Portable runtime Tasks 1–8, in order | Live, learning, and public package semantics committed and all foundation checks green | Local conformance receipt and canonical-first portability evidence committed |
| 7 | Recursive Task 10 and conforming Public Task 5 acquisition/review | Each action's separate exact current authorization and reviewer/control prerequisites pass | Evidence results recorded without changing implementation; overall acceptance remains blocked on any failed, invalid, or unrun required gate |

Tasks 3 and 4 in the public plan have no shared production paths with each other, but this program still dispatches them one at a time because the workspace-wide single-implementer rule is stronger than their local parallel allowance.

### Optional Cloudflare branch

Cloudflare is not on the required acceptance path. After Portable Task 8 produces the local conformance receipt, Cloudflare Tasks 1–8 may run as optional branch `O1` only when a separate exact adopter-environment approval exists. `O1` remains serial with any other production task in this workspace, but its absence, deferral, or rejection cannot block Recursive Task 10, conforming public acquisition, or Live Intelligence and Learning 0.1 acceptance. Passing `O1` establishes emulator-only adapter evidence; production deployment remains unauthorized.

## Shared-file ownership and merge semantics

“Owner” below means the only task allowed to mutate the path during that serialized slot. It does not confer product, repository, security, release, or publication authority.

| Shared surface | Ordered task owners | Required merge rule |
| --- | --- | --- |
| `packages/schemas/src/schema-registry.ts` and `packages/schemas/src/index.ts` | Recursive T1 -> Governed T1 -> Public T2 -> Portable T1 -> Cloudflare T1 | Preserve every prior schema ID; reject duplicate IDs, version rewrites, and silently replaced validators |
| `packages/schemas/test/schema-registry.test.ts` | Portable T1 -> Cloudflare T1 | Preserve the portable registry cases and add Cloudflare cases without weakening earlier negative coverage |
| `packages/schemas/src/runtime-records.schema.json` | Portable T1 -> Cloudflare T1 | Cloudflare may extend only host-specific records; portable interfaces and prior fixtures remain valid |
| `packages/writer/src/prompt-compiler.ts` and `packages/writer/src/index.ts` | Governed T3 -> Public T7 | Public T7 consumes the verified compiler and adds only digest-bound approved graph context; raw browser wording remains barred |
| `packages/learning/src/feedback.ts` | Recursive T2 -> Portable T2 | Portable T2 changes persistence/composition only; qualification semantics and tests remain unchanged |
| `packages/learning/src/index.ts` | Recursive T1 -> Recursive T2 and later ranking tasks | Later exports are additive; schema/type identities remain stable |
| `packages/learning/package.json` | Recursive T4 -> later recursive-learning package tasks | Preserve the exact TypeScript 5.9.3 compiler alias and all prior package requirements unless a later reviewed release profile explicitly supersedes them |
| `packages/agent/src/local-runtime.ts` and `packages/agent/src/index.ts` | Governed T6 -> Recursive T7 -> Portable T2/T7 | Each owner preserves prior proposal-only and authority boundaries; portable migration cannot widen model or learning authority |
| `packages/cli/src/main.ts` and `packages/cli/src/commands/shared.ts` | Governed T7 -> Recursive T7 -> Recursive T8 (`main.ts` only) -> Portable T7 | Commands compose additively; no command bypasses the shared authorization and currentness checks |
| `packages/governance/package.json` | Governed T4 -> Portable T1 | Portable dependency cleanup must preserve governed-live behavior and tests |
| `pnpm-workspace.yaml`, `pnpm-lock.yaml`, and root `tsconfig.json` | Recursive T4 (`pnpm-lock.yaml` only) -> Governed T5 -> Public T3 -> Portable T1 -> Cloudflare T1 | Reconcile against the immediately prior committed state; preserve Task 4's pinned compiler alias resolution; never regenerate from an older plan branch |
| `scripts/check-package-boundaries.mjs` | Public T3 -> Portable T2 -> Cloudflare T6 | Additive forbidden/allowed-edge assertions; all earlier negative tests remain green |
| `package.json`, `README.md`, and `scripts/verify-foundation.mjs` | Governed T8 -> Recursive T9 -> Public T8 -> Portable T1 (`package.json` only) -> Portable T8 -> Cloudflare T1 (`package.json` only) -> Cloudflare T8 | Each task preserves prior scripts, package requirements, documentation, and independent checks; package installation tasks extend rather than replace the root manifest |
| `scripts/verify-portable-runtime.mjs` | Portable T8 -> Cloudflare T8 | Cloudflare adds an adapter check without weakening the local conformance receipt |

Files modified multiple times inside one source plan remain owned by that plan's current task; its own task order controls those changes.

## Cross-plan prerequisites that fail closed

- Public Task 6 consumes `learning-records.schema.json`; it may not run before recursive Task 1 is committed and green.
- Public Task 7 modifies `prompt-compiler.ts`; it may not run before governed Task 3 is committed and green.
- Portable Task 1 freezes interfaces only after live provider records, learning records, research records, and graph snapshot semantics are stable in the preceding plans.
- Cloudflare Task 1 consumes the portable runtime schema and verifier only after the portable conformance receipt exists. An implementation plan or local test result is not that receipt.
- Browser navigation in Public Task 5 is a separate action-time gate. This program order does not satisfy SEC-P0-G, SEC-P0-B, isolation, capture, privacy, retention, telemetry, or cleanup prerequisites.
- A successful synthetic benchmark, emulator test, or local adapter test does not authorize promotion, deployment, publication, or production use.
- The program may advance after the LIL-WRITE-001 implementation and negative/synthetic verifier tests pass, but overall release acceptance remains blocked until a separately authorized official one-shot run with qualified independent reviewers passes every frozen gate.
- The program may likewise advance after Public Task 5 records the fail-closed `not_started` acquisition state. No later code task converts that state into corpus evidence; public-corpus acceptance remains blocked until the conforming browser batch and two required reviews complete.

## Pinned local verification commands

Every release task runs these commands from the workspace root before its plan-specific verifier. Bare `node`, `pnpm`, `npx`, and package scripts that spawn the ambient Node 26 runtime are not accepted.

    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --version
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm install --frozen-lockfile
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run --reporter=dot
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
    /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
    git diff --check

Expected first line: `v24.14.0`. Any mismatch or nonzero exit stops dispatch.

## Dirty-worktree and commit protocol

The coordinator records `git status --porcelain=v1 -z` and the current commit before each task. Completion compares the final status with that baseline plus the task's declared paths. Pre-existing user changes are neither overwritten nor treated as task output. Unexpected paths, conflict markers, missing baseline paths, or changes outside the task declaration fail the task.

After narrow tests, full verification, and independent review pass, the task receives one focused commit. The next task uses that commit as its base. A reviewer may request changes, but the same implementation task must return to green and be re-reviewed before dispatch advances.

## Completion meaning

Completing the required order means the governed-live, recursive-learning, public-research machinery, and portable-runtime implementations plus their independent static/synthetic verification records coexist without shared-file races. The optional Cloudflare branch may be added after portable conformance but is not required. Completion does not mean public research is conforming, the writing system is effective in real products, human or cognitive validation passed, a model or runtime is promoted, Cloudflare is deployed, or content publication is authorized.
