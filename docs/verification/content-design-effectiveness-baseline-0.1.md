# Content-design effectiveness baseline 0.1

Date: 2026-09-21
Status: `baseline_established_hold_for_qualified_review`
Language scope: English

## Decision

`content.md` has a reproducible engineering and evaluation baseline. It does
not yet have qualified evidence that its generated product content is broadly
effective. The repository may be merged as a development system, but it must
not claim expert-level writing effectiveness or use these results as approval,
human gold, retrieval input, training input, or publication authority.

## Baseline evidence

| Layer | Current result | What it establishes | What it does not establish |
| --- | --- | --- | --- |
| English use-case classification | 200 authored synthetic cases; 200/200 pass every provisional deterministic criterion; report digest `6005038125ee36c16fff56f94877a37a6060a410f6684992ddca4c1584c64619` | Deterministic classification, routing, missing-context detection, and authority boundaries | Human-qualified taxonomy accuracy; 0 cases are qualified |
| Deterministic content-design matrix | 10,000 scenarios and predictions; packet digest `2edd2fce34431e75c574b7ad975b5906e9afb58657b36a42dc8c2ea55a0c718c`; prediction digest `d83f80e4661adabb9d31ebc193e66c8ad048a3baab093f24509906392872d5dc` | Reproducible execution, cross-dimensional coverage, visible abstention and escalation paths | Accuracy or writing effectiveness without qualified human gold |
| External-model comparison | 10,000 Claude and 10,000 Cursor records verified; usable English-expression slice contains 2,700 records with 81.2593% disposition agreement | Where two independent model reviewers agree or disagree under the frozen exploratory protocol | Human preference, correctness, or a model leaderboard |
| Authored product challenges | 100 English scenarios; 5 have unreviewed `content.md` candidates; 95 await generation; all 100 preserve `authority_effect: none` | A realistic scenario bank and an honest completion denominator | A complete writing baseline or evidence that the five candidates are good |

## External-audit diagnostic

Agreement on the 2,700-case English-expression slice is strongest for factual
accuracy and state accuracy, both 99%. The weakest hard-dimension agreement is:

| Dimension | Claude/Cursor agreement |
| --- | ---: |
| Semantic fidelity | 61% |
| Agency | 73% |
| Recovery | 79% |
| Authority boundary | 90% |

These are calibration priorities, not measured `content.md` error rates. The
original frozen packet contained locale variables, so the full 10,000-record
31.39% agreement is protocol-contaminated and is not used as a content-quality
measure.

## Current capability statement

The current product is suitable for supervised local pilots. It can discover
content, model bounded context, detect deterministic state and recovery risks,
classify English UX-writing use cases, produce review packets, compare
candidates, preview an exact change, apply one confirmed local patch, and undo
it. Broad writing effectiveness remains unproven.

## Calibration and held-out plan

1. Keep generated scenarios, external-model judgments, and human gold separate.
2. Complete `content.md` candidates and rationales for a calibration subset of
   the authored English challenges.
3. Blind candidate identity and obtain two independent qualified
   content-designer reviews; preserve abstentions and disagreements.
4. Adjudicate hard failures before scoring clarity, hierarchy, voice, tone, or
   economy.
5. Freeze the rules, prompts, and calibration results before authoring or
   opening a disjoint English held-out set.
6. Measure the frozen system once on held-out cases and report hard-failure
   false acceptance, abstention and escalation recall, positive false
   rejection, per-dimension coverage, and slice results.

No fine-tuning is justified unless approved retrieval, repair briefs,
deterministic rules, and prompt/context improvements fail a predeclared target
on qualified held-out evidence.

## Reproduction performed

The consolidated branch was rebuilt under Node `24.20.0` and pnpm `11.9.0`.
The 10,000-case verifier, 100 authored-challenge verifier, 200-case use-case
evaluator, and external-audit analyzer reproduced the values above. The
use-case evaluator correctly returned governance exit code `20` with
`release_disposition: hold_for_qualified_review` because all 200 adjudications
remain pending qualified review.
