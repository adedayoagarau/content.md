# Independent content-design review guide

Status: reviewer runbook for the candidate benchmark; completing this process
does not grant product, publication, policy, retrieval, or training authority.

Current scope: evaluate the supplied English-language expression only. Ignore
target locale, translation status, direction, and presumed in-market adequacy.
Do not score locale readiness. This review makes no localization claim.

Use this guide to review the blinded `content.md` content-design benchmark. You
do not need to understand the repository or inspect its source code. Do not open
the scenario generator, hidden labels, baseline predictions, another reviewer's
answers, or the held-out reservation before submitting your independent review.

## People and responsibilities

| Role | Responsibility | Must not |
| --- | --- | --- |
| Reviewer | Judge each candidate against the supplied context and rubric; export the original submission. | Inspect hidden labels, coordinate answers with another reviewer, or issue their own qualification. |
| Program steward | Resolve reviewer identity and issue a current, packet-scoped qualification bundle through the adopting program's governed process. | Treat a role string, self-attestation, or this repository as proof of qualification. |
| Benchmark operator | Preserve immutable inputs and outputs, run qualification, scoring, and calibration commands, and retain disagreements. | Edit reviewer answers, expose predictions before review, average away disagreements, or promote benchmark records into retrieval or training. |

One person must not perform all three roles for the same review. Two-reviewer
calibration requires two distinct qualified reviewers working independently.

## What to judge

Read the complete context before judging the wording. Evaluate in this order:

1. Evidence and authority.
2. Truth and product-state accuracy.
3. Action, consequence, and recovery.
4. Semantic completeness.
5. Accessibility readiness.
6. Comprehension and structure.
7. Voice, tone, and economy.

Use the dispositions as follows:

- `pass`: every applicable hard requirement passes and no unresolved fact could
  change the meaning or action.
- `revise`: the problem is sufficiently established and the candidate has a
  repairable failure.
- `abstain`: missing or conflicting evidence could change a material fact,
  state, action, consequence, right, safety outcome, or recovery path.
- `escalate`: adequacy requires product, legal, policy, accessibility, locale,
  security, privacy, financial, medical, or another qualified authority.
- `human_preference_review`: hard requirements pass, but a contextual writing
  tradeoff still requires human judgment.

For `pass`, `revise`, or `human_preference_review`, score every displayed
quality dimension. For `abstain` or `escalate`, leave a quality score empty when
the missing evidence or specialist decision prevents a responsible judgment.
Record hard-dimension outcomes independently; do not let strong style compensate
for a factual, state, agency, recovery, semantic, or authority failure.

## Review sequence

The benchmark operator creates the packet and the reviewer's non-authoritative
qualification request:

```bash
npx contentmd benchmark content-design --sample-out review-sample-100.json
npx contentmd benchmark content-design \
  --packet review-sample-100.json \
  --reviewer-id reviewer.example \
  --qualification-request-out reviewer-qualification-request.json
```

The program steward resolves the reviewer and returns a valid qualification
issuance bundle bound to the packet digest. The request itself grants nothing.

The reviewer starts the local, loopback-only review desk:

```bash
npx contentmd benchmark content-design \
  --packet review-sample-100.json \
  --review-workbench
```

Review one scenario at a time. It is safe to export an incomplete progress
backup and import it later. Incomplete progress has no authority. Before final
export, confirm that the reviewer identity, review time, independent-review
attestation, and steward-issued qualification bundle are present. Keep the
original exported submission unchanged.

The benchmark operator qualifies the completed submission for this benchmark
only and scores the frozen baseline predictions:

```bash
npx contentmd benchmark content-design \
  --packet review-sample-100.json \
  --submission reviewer-response.json \
  --gold-out reviewer-qualified-gold.json

npx contentmd benchmark content-design \
  --packet review-sample-100.json \
  --gold reviewer-qualified-gold.json \
  --predictions contentmd-predictions.json \
  --report-out evaluation-report.json
```

Repeat the review independently with a second reviewer, then compare the two
qualified gold files:

```bash
npx contentmd benchmark content-design \
  --packet review-sample-100.json \
  --gold reviewer-a-gold.json \
  --compare-gold reviewer-b-gold.json \
  --report-out reviewer-calibration.json
```

## Required retained evidence

Retain the exact packet, both qualification requests and steward-issued bundles,
both original submissions, both qualified gold files, the frozen prediction
set, the evaluation reports, and the calibration report. Preserve the explicit
adjudication queue. If the packet digest, reviewer identity, qualification scope,
or source files differ, stop rather than merging the records.

The result may support a bounded benchmark statement only after the applicable
release thresholds in the [content-design standard](content-design-standard.md)
are met. It does not make synthetic scenarios approved product evidence and
does not make any record eligible for retrieval, ranking, fine-tuning, release,
or publication.
