# Deterministic UX-content corpus adjudication pilot

## Outcome

content.md can now turn the governed 200-product corpus into a deterministic,
source-bound AI adjudication batch without treating the corpus as training data
or sending it to a provider during planning.

The read-only pilot planner selects one eligible discovery unit for every
product-domain and taxonomy intersection:

```text
10 product domains x 14 taxonomy sections = 140 adjudication units
```

The current corpus produces plan
`corpus_adjudication_plan.84be84e286488331f70663ef190da7a7`, with digest
`84be84e286488331f70663ef190da7a72f2afd864b44c5bbd271a993c4ab0275`.
It covers all 140 cells, verifies all 140 bounded source sections, and uses 136
unique products. Product reuse is minimized because the finance discovery pool
contains 13 eligible products and the health pool contains 11; the other eight
domains contribute 14 unique products each.

## Run the non-model plan

```bash
contentmd usecase adjudicate-corpus \
  --root /absolute/path/to/content.md \
  --mode plan \
  --json
```

Planning writes nothing. It verifies every product and review-unit digest,
enforces the English-only and rights gates, re-hashes the exact source lines,
and reports the selected matrix. The 28 non-English units and 28 legal-review
units remain excluded before a model port can be invoked.

## Execute an authorized recorded replay

```bash
contentmd usecase adjudicate-corpus \
  --root /absolute/path/to/content.md \
  --mode recorded \
  --cassette /absolute/path/to/digest-bound-responses.jsonl \
  --processing-authorization-ref authorization.example \
  --classifier-model model.recorded.ux-classifier \
  --evaluator-model model.recorded.ux-evaluator \
  --json
```

Recorded mode is deliberately offline. The command does not expose a shortcut
for live provider access. A live port can be composed programmatically only
through the existing governed provider path and still requires a separate,
current processing authorization.

Before the first model request, the runner revalidates all three projection
witnesses and every selected section, so drift fails the whole batch without
partial egress. Immediately before each unit request, it reads the bounded
source lines again and verifies their raw SHA-256 digest. It then materializes the
existing classifier -> deterministic validation -> blinded evaluator -> bounded
revision workflow. Source text exists only in the transient task and model
request; it is not placed in the run store.

## Immutable and resumable results

Each authorized run is content-addressed by the plan, processing authorization,
model profiles, execution references, resource limits, and revision limit. Its
local artifacts live under:

```text
.contentmd/adjudication/runs/<run-id>/
  run.json
  plan.json
  results/0001.json ...
  decisions.jsonl
  summary.json
```

Files are created immutably and verified on reuse. An interrupted run skips
already verified units, while a changed or corrupted result fails closed. The
durable records contain source references and digests, model/request/output
digests, classifications, evaluations, and decisions; they do not contain the
raw source payload.

The summary reports decision routes, contract failures, evaluator verdicts,
revision rounds, per-criterion outcomes, requested and returned axis statuses,
and domain/taxonomy slices. These measurements are the evidence needed to
improve the taxonomy and calibrate later classifiers; they do not promote this
public corpus to benchmark or training use.

## Verification boundary

The implementation and deterministic 140-cell plan are verified. The exact
cassette-backed execution path is tested offline, including resume and tamper
detection. No live model call and no full 140-unit semantic replay occurred in
this change, so it makes no model-quality or production-readiness claim.

```bash
pnpm exec tsc -b packages/agent packages/cli --pretty false --force
pnpm exec vitest run \
  packages/agent/test/corpus-adjudication.test.ts \
  packages/agent/test/ai-adjudication-workflow.test.ts \
  packages/evaluation/test/ai-adjudication.test.ts \
  packages/model-provider-sdk/test/recorded-provider.test.ts \
  packages/cli/test/usecase-shadow.test.ts
node --test scripts/compile-ux-content-corpus.test.mjs
node scripts/compile-ux-content-corpus.mjs --check
```
