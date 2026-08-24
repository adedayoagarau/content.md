# SIBF-CHK-001 open-development fixture draft

> Status: `research_draft` · `non_executable` · `canonical: false` · `signed: false` · `license_status: unresolved` · `review_status: unreviewed` · `holdout_status: not_created` · `calibration_status: not_run` · `b1_ready: false`

This directory materializes a substantial, inspectable research-development representation of the proposed `SIBF-CHK-001` fixture. It is grounded in the [shared benchmark fixture specification](../../../shared-benchmark-fixture-specification.md) and the [materials and access register](../../../materials-and-access-register.md). It is not the licensed operator fixture, sealed evaluator, private holdout, executable application, runnable test harness, signed manifest, or B1 evidence.

Everything in this directory is permanently open development material. Publication of these draft labels would make them unsuitable for any private holdout even if access were later restricted. A future holdout requires a new ID, materially different journey/message families and traps, independent authorship and review, separate access controls, and a separate leakage record.

## What is represented

- exactly 90 synthetic candidates across the ten source classes frozen by the design contract;
- a provisional, unreviewed mapping to 61 user-facing occurrences, including 57 static occurrences and four runtime-only/unresolvable-static occurrences;
- 29 explicit exclusions;
- 56 normalized expression slots and 56 current expression versions linked to 22 semantic messages;
- state coverage labels F0–F8, including the separate F4a and F4b states, plus cross-cutting sets F9–F12;
- BF-01–BF-10, U-01–U-05, C-01–C-06, six deliberate accessibility defects, eight critical probes, S-01–S-10, and M-01–M-12;
- fictional nonfunctional data, reserved domains, and inert adversarial text only.

The original design-0.1 target of 34 expressions is falsified by this materialization: it merged locale, channel, modality, surface, component, slot, and runtime identities. The dated [denominator falsification and remap](evaluator-open-development/expression-denominator-falsification-and-remap.json) records the canonical full-tuple rule, the exact current open-development count of 56 slots/56 versions, and every old-ID split. This directory remains the iterative, never-frozen `design-0.1-open-development` pressure test. A separate design-0.2 proposal now exists outside this directory, but it is `proposed/not-for-use`; no approved design-0.2 fixture release has been created.

These are declared research-draft counts, not measured product or benchmark results. The evaluator records are deliberately called `provisional`; no qualified annotator, specialist, rights reviewer, checkout behavior owner, repository owner, or independent verifier has reviewed or approved them.

## Package map

- [Draft status](status.json) — authoritative status boundary for this directory.
- [Draft manifest](manifest.draft.json) — expected files, rejected historical target, and current open-development denominators; hashes and signatures remain null.
- [Provenance](provenance/) — project-authorship, synthetic-data, third-party exclusion, and unresolved-rights records.
- [Open operator design](operator-design-open/README.md) — source-like synthetic records and non-executable run boundary.
- [Open evaluator development](evaluator-open-development/README.md) — exposed provisional annotations, relationships, conflicts, and probes.

## Fixed message families

| ID | Bounded semantic job | Primary state/channel |
| --- | --- | --- |
| `MSG-01-REVIEW-SUMMARY` | Orient the shopper to the review boundary | F0 / web heading |
| `MSG-02-COMMIT-ORDER` | Name the consequential order commitment | F0 / web action |
| `MSG-03-SUBMISSION-PROGRESS` | Represent one pending submission without success | F1 / web status |
| `MSG-04-POSTAL-CORRECTION` | Identify and recover from the postal-code error | F2 / web field error |
| `MSG-05-SMS-PREFERENCE` | Explain the optional attempt-scoped SMS choice | F3 / web choice |
| `MSG-06-OFFLINE-PRECOMMIT` | Preserve safe retry before submission | F4a / web recovery |
| `MSG-07-UNKNOWN-POSTCOMMIT` | Preserve uncertainty and prevent duplicate commitment | F4b / web recovery |
| `MSG-08-PARTIAL-RECONCILIATION` | Separate authorization attempt from order creation | F5 / web status |
| `MSG-09-CLEAR-CHECKOUT` | Expose local deletion, irreversibility, and non-cancellation | F6 / dialog |
| `MSG-10-ORDER-CONFIRMED` | Confirm the order boundary without claiming receipt delivery | F7 / visible web, assistive web, email, and SMS |
| `MSG-11-QUOTE-EXPIRED` | Require refreshed price and availability while preserving cart | F8 / web recovery |
| `MSG-12-CHECK-STATUS` | Return to canonical status without retrying payment | F4b–F5 / web and email action |
| `MSG-13-RECEIPT-ATTEMPT` | Keep queued, sent, and delivered receipt states distinct | F7 / email |
| `MSG-14-SMS-STATUS` | Send a privacy-minimized optional status alert | F3/F4b / SMS |
| `MSG-15-API-UNKNOWN` | Provide safe unknown-state problem detail | F4b–F5 / API |
| `MSG-16-API-RETRYABLE` | Classify retry only for precommit recoverability | F4a / API |
| `MSG-17-STATUS-ACCESS-DENIED` | Represent expired or unauthorized status access safely | F4b–F5 / web |
| `MSG-18-ATTEMPT-REFERENCE` | Name the synthetic support/status reference | F5 / web |
| `MSG-19-SUPPORT-PATH` | Offer a bounded support path without inventing availability | F5 / web |
| `MSG-20-ITEM-COUNT` | Preserve ICU item-count structure | F0 / web |
| `MSG-21-TOTAL-AND-CURRENCY` | Bind total and ISO currency to the quote record | F0/F8 / web |
| `MSG-22-RETURN-TO-CART` | Offer a noncommitting recovery path | F0/F4a / web |

## Hard boundary

No file here may be executed as instructions, imported as a package, treated as an applicable policy, or used to appoint an owner or approver. `historical_*`, `current_open_development_*`, and `provisional_*` fields describe the pressure test. Every `actual_result` remains `null`, every run/calibration/adjudication field remains `not_run`, and every review remains `unreviewed`.
