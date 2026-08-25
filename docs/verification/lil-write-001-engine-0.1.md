# LIL-WRITE-001 engine verification 0.1

Date: 2026-08-23
Runtime: Node.js 24.14.0
Benchmark: `LIL-WRITE-001`

## Bounded result

The sealed writing-benchmark mechanism and wholly synthetic development fixture are implemented and reproducible. The fixture is marked `fixture_status: synthetic_test_only`, `official_attempt_effect: none`, and `benchmark_claim_eligibility: false` throughout.

The official benchmark state is `not_started`. No official attempt, qualified-review packet, opened result, benchmark-pass claim, writing-effectiveness claim, or longitudinal evidence exists.

## Reproduced development-fixture facts

- 60 project-authored synthetic tasks across 6 products and the exact 10-slot grid.
- 48 web and 12 notification tasks; 30 tasks per locale.
- 60 unique provider-plan, nonce-claim, receipt, output, and four-candidate-set chains.
- 120 deterministic selection traces: one baseline and one learned trace per task over the same four candidates.
- 120 synthetic blinded original reviews with two qualified independent reviewers per task.
- 60 durable valid task dispositions and no fabricated adjudications.
- 10,000 deterministic hierarchical paired-bootstrap replicates, reproduced from the frozen seed and SHA-256 counter draws.
- Five independent negative plan-set cases: missing, duplicate, wrong-task, wrong-digest, and extra entry.

The pass-shaped result exists only to exercise every engine predicate. It is not admissible as an official benchmark result.

## Verification commands

```sh
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --self-test fixtures/learning-ranking/lil-write-001-development
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-lil-write-001.mjs --assert-official-not-started fixtures/learning-ranking/lil-write-001
```

Both commands exited 0. The self-test returned manifest digest `264ab25da87001f2788bd22f82c01d2bebef9925f5405592f9181141fd385097` and synthetic result digest `babf092032b0a17aba62e866efa52b0610883c9ff49d87b2362e204cdf1b60de`.

Focused implementation verification:

```text
Task 8 Learning/Schemas: 5 files, 653 tests passed
Benchmark CLI: 1 file, 6 tests passed
Learning/Schemas typecheck: passed
Agent/CLI typecheck: passed
Owned diff check: passed
```

One broader pre-existing CLI learning test remains red because its generated Task 5 dataset fixture is not training-eligible (`104` train, `12` validation, `4` test examples). That failure is outside the benchmark CLI slice and is retained for the final integrated gate rather than suppressed.

## File SHA-256

| File | SHA-256 |
| --- | --- |
| `packages/learning/src/writing-benchmark.ts` | `64c5c18ae709267986ad06d583adbdae9120d42b4f8270d5fab03d6c216de973` |
| `scripts/generate-lil-write-001-development.mts` | `5748b18b2b3b26aa91b17c22f58e147da26271452f0b0b492fad109857944c0f` |
| `scripts/verify-lil-write-001.mjs` | `59f73d4fb184f9bc47da6fb8de771431f1706ef0a227623e4aee7161667304f3` |
| `fixtures/learning-ranking/lil-write-001-development/manifest.json` | `011bf19ad0c1d815dc5d36d2625d7a3a9e1bd7fea65eec0fbc2a158caf71fb68` |
| `fixtures/learning-ranking/lil-write-001-development/tasks.jsonl` | `55f8792d5cfe81a1dddd0fa7612e26663b24202e59c42f82f3593fc9285e3a3f` |
| `fixtures/learning-ranking/lil-write-001-development/candidate-sets.jsonl` | `c37f99792139dd14db7514047e38561c20ec3bbad2e2dccd3e6d744814aa249f` |
| `fixtures/learning-ranking/lil-write-001-development/selections.jsonl` | `336d2c62b923947061a9e9a0b63503b4a310caa5c61a90374fe8562043d93262` |
| `fixtures/learning-ranking/lil-write-001-development/reviews.jsonl` | `1ebc5611353a894a5f19dbb2acd72153f5d295f4f411f4cf073c2c9afd897749` |
| `fixtures/learning-ranking/lil-write-001-development/result.json` | `3191478c907490f018dfd2a1d2855c72f9d17e233f2ef3b0848207280ce8ca17` |

The remaining fixture hashes are independently checked by `verify-lil-write-001.mjs` through canonical bytes and their embedded record digests.
