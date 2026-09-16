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
| Situations represented per ability | 10/10 |
| Surfaces represented per ability | 10/10 |
| Target locales represented per ability | 10/10 |
| Risk levels | 4 |
| Intended voice profiles | 4 |
| Situational-tone profiles | 4 |
| Channels | 6 |
| Text directions | LTR and RTL |
| `revise` | 5,000 |
| `abstain` | 1,000 |
| `escalate` | 3,700 |
| `human_preference_review` | 100 |
| `pass` | 200 |
| Accessibility-readiness score coverage | 1,000/10,000 (10%) |
| Every other quality-dimension score coverage | 10,000/10,000 (100%) |
| Recovery results | 5,400 pass; 600 fail; 4,000 not applicable |
| Authority-boundary results | 9,000 pass; 1,000 unknown |

Packet digest:
`2edd2fce34431e75c574b7ad975b5906e9afb58657b36a42dc8c2ea55a0c718c`

Prediction-set digest:
`d83f80e4661adabb9d31ebc193e66c8ad048a3baab093f24509906392872d5dc`

The prediction set reports:

- `evaluation_status: unscored_pending_qualified_gold`
- `label_access: blind_packet_only`
- `authority_effect: none`

It also reports score coverage before human labels exist. Accessibility
readiness is scored only for the 1,000 screen-reader-status scenarios, so its
10% matrix coverage is explicit; clarity, specificity, hierarchy, locale
readiness, voice fit, tone fit, and economy are scored for all 10,000 records.
Coverage is not accuracy.

Every hard dimension also reports pass, fail, unknown, and not-applicable
counts. Recovery is applicable in 6,000 matrix records and not applicable in
4,000. The matrix now
contains 1,000 explicit unsupported-authority controls; the evaluator returns
`unknown` and routes those records to escalation rather than treating them as
preference questions. This demonstrates control-path execution, not judgment
accuracy, which still requires qualified human gold.

## Interpretation

The baseline exercises all five dispositions and does not collapse into a
universal approval or rejection decision. Every ability includes positive,
clear-failure, underspecified, and near-miss controls, while untranslated
candidates continue to route to in-locale review. The evaluator does not promote
synthetic candidates into evidence, gold, retrieval, or training data. This
distribution is not proof that the individual judgments are correct. Accuracy,
false-acceptance risk, and quality calibration remain blocked on independent
qualified content-design review.

The release verifier also rejects a matrix that collapses any ability,
situation, surface, or locale axis. Every ability must span all ten situations,
all ten surfaces, and all ten target locales. It separately checks contextual
risk, intended voice, situational tone, channel, LTR/RTL direction, unique
scenario digests, and absence of generator-only candidate labels from the blind
review packet.

Gold qualification now requires a current governed reviewer-qualification
replay bound to the reviewer, `qualified_content_designer` role,
`content_design_benchmark_review` objective, and exact packet digest. A role
string plus self-attestation is rejected. The replay verifies internal policy,
grant, approval, scope, currency, and revocation consistency; external principal
and issuer authentication remains the adopting project's responsibility.
