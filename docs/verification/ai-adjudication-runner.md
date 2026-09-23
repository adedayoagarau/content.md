# AI-first UX-coordinate adjudication

## Outcome

content.md now has a provider-neutral adjudication runner for English UX-content
classification. It treats the existing AI system as the primary semantic
decision-maker rather than inserting a person after every model result.

```text
source + source/derived labels
  -> AI classifier
  -> deterministic contract and ontology validation
  -> blinded AI evaluator
  -> pass: accept AI labels
     revise: reclassify and re-evaluate (maximum 0–3 rounds)
     abstain: stop for missing evidence
     escalate: request external authority
```

## Acceptance contract

The classifier must return every requested coordinate axis exactly once. Values
must belong to the repository-owned vocabulary; English locale values must be
canonical BCP 47 tags; exact and ambiguous labels must cite task evidence; and
unclassified labels must expose material uncertainty.

The evaluator must decide all six atomic criteria:

- evidence relation;
- requested-axis coverage;
- compatibility with existing source and derived labels;
- ontology conformance;
- internal consistency; and
- honest uncertainty.

A pass is valid only when all six pass, no correction or unresolved item
remains, and no requested axis is unclassified. The resulting labels are
`ai_accepted` and proceed without default human review.

## Failure and exception behavior

- `revise` supplies bounded corrections to the classifier. A repeated
  classification digest stops as `revision_stalled`.
- `abstain` records missing evidence and does not silently route semantic work
  to a person.
- `authority_escalation` is the human-exception route for decisions the model
  cannot own, such as legal or product-policy approval.
- Malformed output, response-binding failure, or exhausted/stalled refinement
  fails closed as a human exception rather than being accepted.

The frozen English use-case benchmark uses the same ownership model: its
primary qualified reviewer is `ai_classifier_evaluator`. A person can
adjudicate only through `qualified_ux_content_exception_reviewer` with an
explicit exception reason.

Every request has a strict output schema, one call, zero provider retries,
provider storage disabled, transient retention, explicit egress digests, and an
authority effect of `none`. The durable run record contains digests, model
bindings, and decision rationales but does not persist the raw source payload.
Source content and existing labels are explicitly treated as untrusted data,
never as model instructions; model outputs still pass deterministic ontology,
evidence-reference, response-binding, and verdict checks.

## What this does not authorize

AI semantic acceptance does not authorize generation reuse, RAG, training,
benchmark promotion, policy creation, legal approval, publication, or a product
change. Those are separate decisions with separate evidence and authority.

## Verification

```bash
pnpm exec tsc -b packages/schemas packages/evaluation packages/model-provider-sdk packages/agent --pretty false --force
pnpm exec vitest run packages/schemas/test/model-output-registry.test.ts packages/evaluation/test/ai-adjudication.test.ts packages/agent/test/ai-adjudication-workflow.test.ts
node --test scripts/compile-ux-content-corpus.test.mjs
node scripts/compile-ux-content-corpus.mjs --check
```
