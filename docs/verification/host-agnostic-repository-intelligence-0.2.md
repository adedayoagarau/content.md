# Host-agnostic repository intelligence 0.2 verification

Date: 2026-08-25  
Status: passing development verification  
Authority effect: none

## Verified claim

The local `content.md` runtime can inspect a mixed TypeScript, React, Next.js, Python, FastAPI, template, and documentation repository without network access; rank repository evidence; compile an evidence-linked content model; exchange bounded interpretation and writing packets with an IDE model; require review and explicit decisions; preview and apply one exact approved target; reparse and verify the result; and serve a loopback-only, read-only workbench.

This verifies executable development behavior. It does not establish organizational approval, production deployment, publication authority, writing effectiveness, or universal repository compatibility.

## Independent verifier

Run from the repository root with Node.js 24.14.x:

```bash
pnpm verify:repository-intelligence
```

Canonical result on 2026-08-25:

```json
{"authority_effect":"none","before_after_integrity":{"approved_target":"studio/app/analyze/page.tsx","changed_original_paths":["CLAUDE.md","studio/app/analyze/page.tsx"],"installer_owned_bridge":"CLAUDE.md","unrelated_originals_unchanged":true},"canary_checks":{"GENERATED_OUTPUT_CANARY":"absent","PRIVATE_DATA_CANARY":"absent","SECRET_CANARY":"absent"},"contract_version":"contentmd.repository-intelligence-verification/0.2.0","coverage":{"failed":0,"inventoried":14,"scanned":10,"skipped":5,"unsupported":4},"fixture_digest":"3f9161488877d3bca01ecab291bdbd37e55c1b3d0bb3b2d1b04d25d50e009253","network_denial":{"network_attempt_completed":false,"preload_loaded":true},"node_version":"24.14.0","result":"pass","test_counts":{"assertions":25,"commands":12},"verifier_digest":"aa4b3e4640c45a5b6400d93b1995bd5c6a96d9e41c489685fd543307921aa995"}
```

The verifier creates a fresh temporary mixed-stack repository, denies network APIs in the child runtime, checks exact inventory coverage, proves private/generated canaries never enter outputs, validates source and artifact digests, exercises adoption and the IDE task loop, applies only the approved source target plus the installer-owned host bridge, verifies reparsed readback, and confirms unrelated original files are unchanged.

## Focused gates

- Focused result: 26 test files passed; 100 tests passed.
- Repository discovery handles ignored worktrees, private repository mirrors, out-of-root symlinks, dangling symlinks, empty static content, empty router-relative paths, and normalized multiline JSX coordinates.
- TypeScript project references compile without diagnostics.
- The workbench returns a three-pane evidence view, voice meter, and journey visualization with a restrictive content security policy, `no-store`, `nosniff`, and 404s for arbitrary paths.
- All task artifacts are content-addressed and stored only in the managed local runtime. Raw repository source is not returned by the workbench.
- The apply path is single-target, decision-bound, authorization-bound, digest-checked, atomically written, reparsed, and rollback-capable.

## Known unrelated suite state

The repository-wide test sweep is not green: 136 files passed and 30 failed; 1,474 tests passed, 794 failed, and 7 were skipped. The dominant failure is the pre-existing recursive-learning fixture error `task4_contract_invalid:producer_witness`, which cascades through later learning tests. Two loopback server tests also fail when run inside the filesystem/network sandbox with `listen EPERM`; the same focused suite passes with loopback access. These failures are outside this repository-intelligence slice and are not represented as passing here.

The historical foundation verifier also stops at its pinned pnpm-runtime gate in this desktop environment: the available pnpm is 11.19.0 while the repository requires 11.9.0, and the bundled Node executable has no colocated pnpm module at the verifier's expected path. This is reported as a harness/runtime prerequisite failure, not converted into a pass.

## Live acceptance

The read-only Carter acceptance is recorded separately in [Carter repository-intelligence acceptance](../pilot/carter-repository-intelligence-acceptance.md). It validates a real mixed Python/TypeScript product repository but does not mutate Carter or establish anything about Carter's live deployment.
