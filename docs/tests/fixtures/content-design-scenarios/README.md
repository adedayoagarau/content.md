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
