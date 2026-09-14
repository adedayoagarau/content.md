# Content-design evaluation scenarios

Run:

```bash
node scripts/generate-content-design-evaluation-scenarios.mjs
```

The generator creates exactly 10,000 deterministic scenarios across ten
abilities, situations, surfaces, locales, and candidate variants. The set tests
voice and tone in the same evaluation order as factual accuracy, product state,
action, consequence, recovery, semantic fidelity, accessibility, localization,
structure, and governance.

Each ability has all four controls required by the content-design standard:
positive controls, clear failures, underspecified evidence cases, and semantic
near-misses. Locale-routing can supersede an otherwise valid or preference-level
candidate, while missing material evidence is evaluated before expression.
Candidate style labels are also removed from review packets. Reviewers receive
the intended contextual voice profile and situational tone, not the generator's
description of how the candidate sounds.

The current matrix contains 220 unique visible candidate strings and 270 unique
candidate-plus-supporting-context expressions. Reuse across ability and locale
slices is intentional: it tests whether the same words receive different
judgments when context changes. The diversity tests prevent a future generator
from collapsing the suite back into a handful of repeated phrases.

These records are project-authored synthetic evaluation candidates. Generator
labels are hypotheses used to exercise the evaluation pipeline; they are not
human gold labels, observed product evidence, approved retrieval material, or
training-eligible examples. Human review must populate `human_gold` through a
separate governed qualification workflow rather than editing generated files.

## Qualification path

1. Select a stratified sample by ability, risk, surface, locale, and candidate
   variant.
2. Give the scenario to an independent content-design reviewer without showing
   the generator label.
3. Record the disposition, failed or satisfied dimensions, rationale, acceptable
   invariants, reviewer role, and review evidence in a separate append-only
   record.
4. Adjudicate disagreements without replacing either original review.
5. Admit only qualified records to a versioned gold set.
6. Keep held-out scenarios isolated from retrieval and learning evaluation.

Create the deterministic 100-scenario blind review packet with:

```bash
npm run prepare:content-design-review
```

The packet includes one scenario for every ability-by-candidate-variant cell.
It omits injected defects and provisional generator expectations. Reviewers
should work only from the packet, not from `scenarios.jsonl`.

Use `createReviewSubmissionTemplate()` from
`scripts/qualify-content-design-review.mjs` to create a separate response file.
The packet itself remains immutable. Qualification requires every response, a
qualified-content-designer role, an independence attestation, evidence refs,
hard-dimension judgments, and a meaning-based rationale. Qualified records are
benchmark-eligible only; retrieval and training remain disabled. The same
module scores bound tool predictions overall and by ability, risk, surface,
locale, voice, and tone.

```bash
node scripts/qualify-content-design-review.mjs \
  --template \
  --packet docs/tests/fixtures/content-design-scenarios/review-sample-100.json \
  --out review-submission.json
```

Generate the deterministic `content.md` baseline predictions from the blind
packet before opening any completed human review:

```bash
npm run predict:content-design-scenarios
```

Predictions are bound to the packet digest and report
`unscored_pending_qualified_gold`. The baseline uses only explicit text and
scenario context checks; null or unknown dimensions remain visible instead of
being converted into invented confidence.
