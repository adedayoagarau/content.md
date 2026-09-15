# Content-design calibration cohort 500 verification

Status: `verified_unreviewed_calibration_instrument`; no quality, accuracy,
retrieval, training, release-authority, or fine-tuning claim.

Commit `b252243875f293ee4e9c43263b925e2fb4c1cc38` was replayed from a clean
git archive under Node `24.14.0` and pnpm `11.9.0` with an offline frozen
install that reused 78 of 78 packages and downloaded none.

## Demonstrated

- The committed packet contains 500 unique blinded work units.
- Every one of the 100 ability-by-candidate-variant cells contributes five
  distinct scenario contexts.
- Every ability covers all ten situations, ten surfaces, and ten target locales.
- Candidate variant, generated voice and tone labels, injected defect,
  evaluation control, and provisional expectation are absent from reviewer
  work units.
- Every work unit remains `unreviewed`, with `authority_effect: none`,
  `retrieval_eligibility: never`, `training_eligibility: never`, and
  `benchmark_eligibility: false`.
- Regeneration reproduces packet digest
  `0700ba4c6b252c3cec3459e134381dc571459d0682143981d577442d84683e5a`.

## Clean replay

| Gate | Outcome |
| --- | --- |
| Build | passed |
| Committed native tests | 101/101 passed |
| Calibration generator and committed-fixture parity | passed |
| Foundation verifier | 1,118/1,118 passed |
| Packed CLI journey | passed; original 100-item package workflow retained |
| Package security | 27/27 passed |
| Release dry-run | passed; `publish_effect: none_dry_run` |
| Distribution boundary | unchanged four-file `contentmd@0.1.0` tarball |

The cohort is repository-native and is not embedded in the npm tarball. The
100-item packet remains the packaged workflow check. Moving the 500-item cohort
into the public CLI is a later product decision after reviewer usability and
effort are measured.

## Required next evidence

Two qualified independent content designers must review the same immutable
packet without access to generator labels. Their original submissions must be
preserved, compared, and adjudicated without rewriting either review. A
separate frozen held-out set is required for effectiveness measurement after
calibration. Reviewer agreement alone is not evaluator accuracy, product
quality, or evidence that fine-tuning is warranted.
