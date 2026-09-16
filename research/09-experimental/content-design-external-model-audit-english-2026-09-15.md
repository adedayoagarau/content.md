# English-only external model audit

Date: 2026-09-15  
Status: exploratory evidence; not qualified human gold  
Authority effect: none

## Inputs and boundary

Claude and Cursor independently reviewed the complete blinded 10,000-scenario
packet with digest
`2edd2fce34431e75c574b7ad975b5906e9afb58657b36a42dc8c2ea55a0c718c`.
Both returned 100 JSONL batches and 10,000 structurally valid records with the
expected IDs in order.

The adopting product scope is English-language content only. Analysis therefore
excluded the localization ability, non-English target locales, and the
`locale_readiness` score. The resulting comparison contained 2,700 records
across `en-US`, `en-GB`, and `en-IN`.

This slice is an analysis of external model judgments against synthetic
controls. It is not an evaluation of `content.md`, a validated benchmark, or an
effectiveness result.

## Instruction-compliance finding

Cursor cited locale or localization in 7,002 of 10,000 raw records and used
missing in-locale review to abstain on much of the non-English-target material.
Claude cited locale in 1,000 records, concentrated in the localization ability.
The raw 31.39% disposition agreement is therefore contaminated by different
interpretations of locale scope and must not be used as a quality measure.

Within the English-only slice, Claude had zero locale references and Cursor had
two. Inter-reviewer disposition agreement was 81.26% (2,194/2,700).

## Diagnostic results

Agreement with generator controls was 81.48% for Claude and 92.19% for Cursor.
Generator controls are hypotheses, not adjudicated truth.

Both reviewers agreed on every English-only example of blameful language,
false certainty, unsupported authority, unsupported urgency, vague action, and
missing material evidence. The 506 disposition disagreements concentrated in:

| Candidate variant | Disagreements |
| --- | ---: |
| Concise and calm | 246/270 |
| Warm and supportive | 95/270 |
| Plain and direct | 84/270 |
| Missing consequence | 81/270 |

Hard-dimension agreement was 99% for factual accuracy, 99% for state accuracy,
90% for authority boundary, 79% for recovery, 73% for agency, and 61% for
semantic fidelity. The weakest surface agreement was email (67.04%) and help
article (67.41%).

Mean absolute reviewer distance was largest for hierarchy (0.92 points) and
specificity (0.79) on the 1–5 scale. Voice fit (0.36), tone fit (0.41), and
economy (0.34) were closer, but still lack qualified human calibration.

## Resulting standard changes

The candidate standard now:

- makes English-only scope explicit and excludes localization claims;
- treats material semantic omissions as hard failures;
- distinguishes a missing consequence from a consequence carried in supporting
  content;
- defines contextual agency and recovery requirements;
- limits human preference review to cases where hard requirements pass;
- clarifies when warmth and concision pass or require revision; and
- distinguishes compact controls from stand-alone email, help, navigation, and
  screen-reader expressions.

## Next evidence gate

Select a 100-item disagreement pilot spanning the four ambiguous variants and
weakest surfaces. Two qualified content designers must review it independently
before any rule becomes human gold. Preserve disagreements through adjudication.
Then author and freeze a newly unseen English-only held-out set. The exposed
10,000-scenario matrix and its old reservation cannot support the formal
effectiveness claim.

External model responses remain ineligible for retrieval, ranking, training,
publication approval, or automatic rule adoption.
