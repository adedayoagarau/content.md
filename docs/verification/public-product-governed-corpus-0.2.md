# Governed public-product corpus 0.2 verification

Status: `verified_projection_incomplete`; evidence asset only; not part of the
`contentmd` npm package and not accepted for prompts, retrieval, benchmarks, or
training.

This record covers the official v0.2 projection replayed from commit `bc0d9bc`
under Node `24.14.0` on `darwin` / `arm64`. The governed snapshot time is
`2026-08-27T23:59:59.999-12:00`. A later wall-clock date cannot be substituted
for that value because the taxonomy, review-governance evidence, and disposition
ledger are snapshot-bound.

## Governed inputs

| Input | Bound value |
| --- | --- |
| Governed batch registry | 73 batch names; digest `f2ef694b626a7f89b75a661a2f6eb3bd9a5ef919ac76ea5ea0c31dabc3f7bbce` |
| Experience taxonomy | 343 mappings; digest `cff7a3065020898e5f724858b0793d512b599fe42043d28f57921a95195b9acc` |
| Disposition ledger | digest `2857e379a2b129571c6bec8307934c94f64823582c9f216fed9df73828fb1ea1` |
| Review governance | digest `d887a34da2cc32d00687c94df25b90d0d41600c98aa879212436baca225a9098` |

Official verification reads only the digest-bound batch registry. Additional
date-stamped directories are acquisition candidates until a separately reviewed
registry update admits them. Development-fixture verification may inspect those
directories but cannot change their authority or eligibility.

## Replayed projection

| Measure | Result |
| --- | ---: |
| Raw sources | 1,495 |
| Raw observations | 1,473 |
| Active and qualified sources | 498 |
| Active and qualified observations | 429 |
| Companies | 113 |
| Products | 176 |
| Industries | 26 |
| Mapped observations | 429 |
| Unmapped observations | 0 |
| Normalized structural signatures | 48 |
| Direct observed slots | 51 |
| Products with direct observations | 22 |
| Products meeting the five-state target | 1 |
| Held subjects | 1,090 |
| Superseded subjects | 951 |

The deterministic report digest is
`595539dbbca797210aab5ca64afcf7577c4793ca678c4b4c336027812b289eb1`.
The expected process exit is nonzero because the projection fails its declared
breadth and direct-state targets. `accepted_projection_ref` remains `null`, and
the report retains `authority_effect: none`, `prompt_eligibility: never`,
`training_eligibility: never`, and `benchmark_eligibility: false`.

## Remaining evidence gates

- Company coverage is 113 of 5,000.
- Product coverage is 176 of 20,000.
- Industry coverage is 26 of 250.
- 175 products remain below five distinct directly observed states.
- New candidates require direct signed-out observation, exact source binding,
  rights review, normalization, independent review where required, and a
  digest-bound registry update before they can enter official projection.
- Projection acceptance would still not authorize copied public wording for
  generation, product mutation, publication, or fine-tuning.

## Reproduction

Use the repository-pinned runtime after a clean offline install and build:

```bash
pnpm install --offline --frozen-lockfile
pnpm build
node --test \
  scripts/verify-public-product-corpus.test.mjs \
  scripts/verify-public-product-corpus-worker-batches.test.mjs
node scripts/verify-public-product-corpus.mjs \
  --as-of 2026-08-27T23:59:59.999-12:00 \
  --contract-version 0.2.0 \
  --verification-mode official
```

The final command is expected to exit `1` while emitting the report digest
above. A matching nonzero result proves deterministic detection of incomplete
coverage; it is not a passing corpus or product-quality result.
