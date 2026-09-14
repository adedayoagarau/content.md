# Content-design benchmark 10,000-scenario verification

Date: 2026-09-14  
Status: passed  
Runtime: Node 24

## Claim tested

The packaged `contentmd benchmark content-design` evaluator can process the
complete 10,000-scenario synthetic matrix through a label-blinded packet while
preserving identity, authority, and eligibility boundaries.

This verifies deterministic execution and coverage. It does **not** verify
content-design accuracy, because no qualified human gold set exists yet.

## Reproduce

```bash
node scripts/generate-content-design-evaluation-scenarios.mjs
node --test scripts/prepare-content-design-review-sample.test.mjs
node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
node scripts/verify-content-design-benchmark.mjs
```

The verifier creates the full blinded packet and prediction file in a temporary
directory, checks them, reports the result, and removes the temporary files.
It does not duplicate the bulk generated records in the repository.

## Result

| Measure | Result |
| --- | ---: |
| Synthetic scenarios | 10,000 |
| Blinded packet records | 10,000 |
| Predictions | 10,000 |
| Predictions per core ability | 1,000 |
| `revise` | 5,000 |
| `escalate` | 4,500 |
| `human_preference_review` | 500 |
| `pass` | 0 |

Packet digest:
`23d372369bd17ac2d10ab79f5ec330b1ca9e3843581d9e3e10397c983e1bad25`

Prediction-set digest:
`51d0c303cbaa972c787872031b3788bb2bc60c88b8a435ae81ccebfbc6971490`

The prediction set reports:

- `evaluation_status: unscored_pending_qualified_gold`
- `label_access: blind_packet_only`
- `authority_effect: none`

## Interpretation

The baseline does not collapse into a universal approval decision and does not
promote synthetic candidates into evidence, gold, retrieval, or training data.
Its cautious distribution is not proof that the individual judgments are
correct. Accuracy, false-acceptance risk, and quality calibration remain blocked
on independent qualified content-design review.
