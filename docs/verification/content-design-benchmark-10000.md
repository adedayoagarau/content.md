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
| `revise` | 5,080 |
| `escalate` | 4,428 |
| `human_preference_review` | 492 |
| `pass` | 0 |

Packet digest:
`3a3bdf31a593f38fa9e4b592ae8d00a740a780a38245d65ac092d8e74cc80460`

Prediction-set digest:
`495827bd56516b66095d76e50a0ceeea441dcf807c4b70b4427a53b70387841e`

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
