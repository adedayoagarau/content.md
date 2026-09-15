# External model audit of 10,000 content-design scenarios

Status: `structurally_verified_exploratory_model_audit`; not qualified human
gold and not evidence of `content.md` effectiveness.

On 2026-09-15, the returned Claude and Cursor audit folders were validated
against the current generated scenario matrix under Node `24.14.0`. The raw
model outputs remain outside the repository as separately retained evaluation
evidence. They are not retrieval, ranking, training, or release inputs.

## Bound evidence

| Artifact | Verified value |
| --- | --- |
| Source blind-packet digest | `2edd2fce34431e75c574b7ad975b5906e9afb58657b36a42dc8c2ea55a0c718c` |
| Input batches | 100 batches; 10,000 work units; every manifest file digest and generated work unit matched |
| Claude submission | 10,000 schema-valid, ordered records; digest `f9670038327ace68ea7eee99f75db3a10eb9ba24b29006ed670dafce70bd8579` |
| Cursor submission | 10,000 schema-valid, ordered records; digest `2cf80f12d61ec2893f5b5464ad225000330fa92c460fbe7224a6ca80f129758b` |
| Authority effect | `none` |

The submission digest binds the ordered file names and exact JSONL bytes for
all 100 files from one reviewer. It is not an approval signature.

## Protocol contamination

The handoff was intended to support an English-only comparison, but the frozen
input packet still contained target-locale and localization-status fields, the
rubric still included locale readiness, and the written model prompt still
named locale readiness. Locale or localization appeared in 1,000 Claude
records and 7,002 Cursor records. Raw 10,000-record disposition agreement was
therefore only 31.39% (3,139/10,000) and is not a useful content-quality
measure.

This is a protocol-design failure, not evidence that one reviewer is better.
An instruction delivered outside the frozen packet is not reproducible review
evidence. The current English product boundary must be enforced by removing
locale variables from the next packet by construction.

## English-expression slice

The usable exploratory slice includes target labels `en-US`, `en-GB`, and
`en-IN`, excludes the `localization` ability, and excludes `locale_readiness`
scores. Locale-only control labels are normalized explicitly: positive controls
become `pass`, near misses become `human_preference_review`, and other control
dispositions remain unchanged. This leaves 2,700 records.

| Measure | Result |
| --- | ---: |
| Inter-reviewer disposition agreement | 81.26% (2,194/2,700) |
| Claude agreement with normalized synthetic controls | 81.48% (2,200/2,700) |
| Cursor agreement with normalized synthetic controls | 92.19% (2,489/2,700) |
| Residual Claude locale references | 0 |
| Residual Cursor locale references | 2 |

Synthetic-control agreement is diagnostic only. The controls are generator
hypotheses, not adjudicated truth.

### Hard-dimension agreement

| Dimension | Agreement |
| --- | ---: |
| Factual accuracy | 99% |
| State accuracy | 99% |
| Authority boundary | 90% |
| Recovery | 79% |
| Agency | 73% |
| Semantic fidelity | 61% |

The reviewers agreed on all English-slice examples of blameful language, false
certainty, unsupported authority, unsupported pressure, vague actions, and
missing material evidence. The 506 disposition disagreements concentrate in
`concise_calm` (246), `warm_supportive` (95), `plain_direct` (84), and
`missing_consequence` (81). These disagreements show where the decision rules
need qualified human calibration.

### Quality-score distance

Mean absolute distance on paired 1–5 scores:

| Dimension | Distance | Paired scores |
| --- | ---: | ---: |
| Hierarchy | 0.92 | 2,430 |
| Specificity | 0.79 | 2,430 |
| Accessibility readiness | 0.51 | 2,430 |
| Clarity | 0.43 | 2,430 |
| Tone fit | 0.41 | 2,430 |
| Voice fit | 0.36 | 2,430 |
| Economy | 0.33 | 2,430 |

The lowest-agreement surfaces were email (67.04%) and help article (67.41%).
The lowest-agreement situations were navigation destination (74.44%),
successful update (74.44%), and empty state (75.93%). These slices need
surface- and state-specific anchors before quality scores can be interpreted.

## Reproduction

Keep the returned audit directory unchanged, then run:

```bash
pnpm analyze:content-design-external-audit \
  /path/to/contentmd-content-design-external-audit-10000
```

The analyzer fails closed on input hash or generator drift, missing or extra
batch files, invalid JSONL, wrong record order or identity, invalid enums,
missing required scores, and malformed evidence fields. It reports exact
coverage and disagreements without modifying the returned evidence.

## Disagreement pilot checkpoint

The analyzer can also create a blinded 100-item human-review pilot and a
separate operator manifest:

```bash
pnpm analyze:content-design-external-audit \
  /path/to/contentmd-content-design-external-audit-10000 \
  --pilot-out /isolated/reviewer-copy/review-packet.json \
  --pilot-manifest-out /operator-only/selection-manifest.json \
  --reviewer-a-template-out /isolated/reviewer-a/review-submission.json \
  --reviewer-b-template-out /isolated/reviewer-b/review-submission.json
```

The current verified submissions produce pilot packet digest
`039de50636f99db3733f01f34ab45ea0fac4eed33f3d5943c42d43d1e1e23cf5`
and selection-manifest digest
`957390801d2065883ed00e9993bfa166e50156b0ef6e9e7237215b2471c3a254`.
The packet contains 25 cases from each of the four disputed variants, all nine
English abilities, all ten situations, and all ten surfaces. Every ability
appears 11 or 12 times. Regional and translation variables, model judgments,
and hidden synthetic controls are absent from the reviewer packet.

This pilot uses previously exposed synthetic scenarios and is calibration input
only. Reviewers must receive isolated copies of the packet and
[reviewer prompt](../tests/fixtures/content-design-disagreement-pilot/REVIEWER-PROMPT.md),
while the selection manifest remains operator-only until both submissions are
frozen.

## Decision

These outputs can guide rubric repair, but they must not be promoted to gold or
used to tune the evaluator. The next defensible sequence is:

1. generate a new English-only calibration packet with locale fields absent;
2. add anchored rules for semantic fidelity, agency, recovery, hierarchy, and
   specificity;
3. select a disagreement pilot across the weakest variants, surfaces, and
   situations;
4. obtain two independent qualified content-designer reviews and adjudicate
   disagreements;
5. freeze the rules before authoring a separate unseen English-only held-out
   set;
6. improve the deterministic evaluator against calibration data only, then
   measure once on the held-out set.

Fine-tuning remains unjustified until approved retrieval and deterministic
improvements fail a predeclared target on qualified held-out evidence.
