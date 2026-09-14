---
title: Recursive learning and ranking release verification 0.1
status: current-development-evidence
verified_at: 2026-08-30
runtime: Node.js 24.14.0
---

# Recursive learning and ranking release verification 0.1

This record covers the deterministic, authority-free development fixture for the recursive expression-ranking lifecycle. It does not claim that the model writes text, outperforms qualified content designers, improves a real product, may learn from browser observations, or is approved for deployment.

## Reproduced fixture

- 120 project-owned synthetic preference records.
- 30 disjoint transitive leakage groups with exactly four examples each.
- Deterministic group splits: 20 train, 5 validation, and 5 sealed test groups; 80/20/20 examples.
- One sealed learning-dataset manifest whose test state remains `sealed`.
- One frozen 21-feature expression profile.
- Exact binary64 coefficient, loss, prediction, reversal, and ranking witnesses through the independently checked pairwise golden.
- A 10,000-replicate sealed evaluation, 50-observation no-influence shadow run, candidate promotion, drift review, second promotion, rollback, qualification-revocation suspension, and baseline fallback through the Task 6 simulator golden.
- Zero browser or competitor expressions in preferences, labels, vectors, fitting, predictions, or ranking.
- `authority_effect: none` throughout the release fixture.

## Independent verification

Run:

```sh
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-learning.mjs
```

The verifier independently checks canonical bytes and record digests, recomputes the SHA-256 leakage split and complete group closure, proves the sealed dataset membership and counts, verifies the 21-feature profile, checks the externally locked pairwise and Task 6 fixtures, and executes all three deterministic generators in `--check` mode. The pairwise generator compares production fitting and predictions with a separately implemented binary64 oracle. The Task 6 generator replays the sealed evaluation, bootstrap, shadow no-influence evidence, promotion predicate and binding transitions, drift, revocation, rollback, and fallback.

The complete verification is intentionally expensive: full Task 4 replay is exhausted for each shadow observation. Runtime is a performance concern, not omitted evidence; the verifier uses a bounded 30-minute child timeout.

## Frozen artifact SHA-256

| Artifact | SHA-256 |
| --- | --- |
| `scripts/generate-learning-fixtures.mts` | `ca086c388e9bbf1abc860ff1d7ace362293b5573a51f667ac11591bf6a047238` |
| `scripts/verify-learning.mjs` | `671aa2c7e67482c418146461481d60700503b687d87c6071fa615ba930ee028a` |
| `fixtures/learning-ranking/preferences.jsonl` | `a4d36aaf02bac56ae319b1a7c30416da8783fcb279b1c35b3a08bfb7a64bcd59` |
| `fixtures/learning-ranking/leakage-groups.jsonl` | `abc8d5db87f2e4446185ee189f07e48b36cd272ae7c9520292bab23d4e4aefa6` |
| `fixtures/learning-ranking/dataset-manifest.json` | `8001c9a40cd0e24bcccac490585d6b60c5447f7a315ca8b3ee6ed52d0ac498be` |
| `fixtures/learning-ranking/feature-profile.json` | `29ad9962cd527df43120430c4e5ee5383179f2c859c5e582481187348ec8ca7b` |
| `fixtures/learning-ranking/shadow-plan.json` | `68c5cf8b0647f534862486d9dcb95597189d518cf383f5ec18ab6be0ae83821d` |
| `fixtures/learning-ranking/golden-model.json` | `f97b18599e5e7af2329876bba704584eda1854f54a2421f3481e6878aa56e7cf` |
| `fixtures/learning-ranking/task6-simulator-golden.json` | `d9893424d17e77b62bd54b24982d31990458391d0e217610ef37df18f31165ff` |

These four identities were requalified on 2026-09-14 after the root package
manifest gained content-design benchmark scripts and its Task 4 resolution pin
was refreshed. Exact-runtime comparison confirmed unchanged feature
definitions, learned coefficient bits, prediction expectations, and Task 6
terminal outcomes; the new locks bind changed upstream artifact identities.

## Boundary

The official `LIL-WRITE-001` attempt is `not_started`. No official test set has been opened, no qualified human-review result exists, and no learned binding is authorized for a real product. Public-web observations remain evidence-only and cannot become preference examples; reviewed structural abstractions must first produce new project-owned candidates under product authority.
