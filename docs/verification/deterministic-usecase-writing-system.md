# Deterministic use-case UX-writing system

Status: English-only development contract, coordinate classifier `0.3.0`; policy resolver `0.2.0`; benchmark `0.1.0`

## Purpose

Map an evidence-bound English UX-writing request across independent request, task, state, message, and delivery axes. Resolve a registered policy route—and then an expression template—only when the route's required axes and facts are complete. The system does not infer product behavior from wording, approve copy, or treat observed third-party wording as reusable material.

This version accepts `en` and English BCP 47 variants such as `en-US` and `en-GB`. A non-English locale or a localization/translation request returns an explicit `out_of_scope` result. It does not silently fall back to English or claim cross-language parity.

## Pipeline

```text
structured evidence -> independent axis classifications
                                      |
                         one matching policy route
                                      |
                    required facts and gates complete
                                      v
                         one route-bound template
                                      |
                         deterministic expression
```

The classifier is a closed rule set. It uses explicit structured fields; free text is retained as input evidence but is not used to infer product state. Each axis returns `exact`, `ambiguous`, or `unclassified`; an unsupported language or capability uses `out_of_scope` as the axis reason. A missing required axis, no matching policy, multiple matching policies, missing fact, or zero/multiple eligible templates causes abstention.

Routes are evaluated from explicit constraints. Missing unrelated axes do not block a uniquely matched route. If no route matches exactly but one or more routes remain plausible because a distinguishing axis is unresolved, the resolver returns `classification_incomplete` with those axes instead of selecting a nearest route.

## Classification axes

| Layer | Independent axes | Implemented coverage |
| --- | --- | --- |
| Request | work intent, locale | 9 supported work intents; English-only locale validation with explicit scope status |
| Task | journey, task structure, action, consequence risk, reversibility | 11 journeys, 6 task structures, 32 actions, 5 risk values, and 5 reversibility values |
| State | product state, event state, state cause | 16 product states, 14 lifecycle/event states, and 15 established causes |
| Message | message purpose, content slot, interaction pattern | 22 purposes, 16 slots, and 35 patterns |
| Delivery | content scope, channel, attention mode, conversation state | 7 affected scopes, 9 channels, 6 attention modes, and 11 conversational states |

The registry contains 39 policy routes and 25 source records. New high-value separations include:

- first-use, no-results, cleared-data, permission, configuration, and system-caused empty states
- input validation, eligibility results, and unmet prerequisites
- operation status, linear step location, and flexible multi-task status
- no-input, no-match, dependent-system error, parameter confirmation, action confirmation, handoff, and ending turns
- SMS and push notifications as separate channels

Each built-in route declares evidence references, required axes, required facts, forbidden claims, recovery requirements, and review gates. Evidence references explain why a distinction exists; they do not make the route universally valid or production-approved.

## Grounding model

`ux-writing-taxonomy.ts` is the machine-readable grounding layer. It contains:

- the English-only scope decision and excluded capabilities
- a definition and decision effect for every classifier axis
- inclusion and exclusion criteria for every decision-critical value on the five new axes
- source records with provenance, retrieval date, and the limited claim each source supports
- a critical-distinction registry for near-neighbor cases

Official standards and design-system guidance are implementation precedents, not a substitute for product-specific research. Local experimental annotations remain hypotheses rather than gold labels.

## Frozen use-case benchmark and adjudication

`fixtures/ux-writing-usecases/benchmark-v0.1.jsonl` freezes 200 English authored-synthetic regression cases. It is broad by construction, not by an unsupported claim of completeness:

| Case family | Count | Purpose |
| --- | ---: | --- |
| Canonical resolved route | 39 | One unique complete case for every built-in route |
| English regional variant | 39 | The same route coverage with `en-GB` and alternate allowed route values where available |
| Missing required fact | 39 | Required-fact abstention for every route |
| Missing distinguishing axis | 39 | Classification-incomplete abstention for every route |
| Critical near neighbor | 14 | Validation/eligibility, processing/step location, linear/flexible work, empty-state causes, alert/dialog attention, conversational repair states, and parameter/action confirmation |
| Out of scope | 10 | Non-English locale and localization/translation requests |
| Complete coordinate with no route | 10 | Fully classified but unsupported combinations |
| Text-only non-evidence | 10 | Copy strings that must not become product-state evidence |

The paired `adjudication-v0.1.jsonl` contains one record per case. Every record begins in `pending_qualified_review` with blank reviewer fields. The primary qualified reviewer is the AI classifier-evaluator. `accepted`, `revised`, and `excluded` require a non-empty adjudicator ID, a canonical UTC ISO timestamp, and a rationale; revised cases also require a complete replacement expectation. A human can enter only as `qualified_ux_content_exception_reviewer` with a non-empty exception reason. Unknown states and malformed provenance fail closed. The generated bank is therefore a deterministic regression corpus, not human gold, production approval, or evidence of classifier validity.

`ux-writing-benchmark.ts` reports each criterion separately: deterministic replay, language scope, axis values, resolution status/reason, route, candidate routes, missing axes, missing facts, and authority boundary. It preserves case-level evidence and separate provisional and qualified metrics. It deliberately emits no aggregate quality score. A fully green provisional replay still returns `hold_for_qualified_review` until the independent AI adjudication packet is complete; this is not a default human gate.

The manifest locks case and adjudication bytes, generator inputs, category counts, all 39 route IDs, English-only scope, and corpus exclusions. Good Microcopy material is explicitly excluded while it remains `awaiting_classifier`; it is not used as prompt, training, benchmark, or gold authority.

Generate or verify the frozen bytes with:

```bash
node --import tsx scripts/generate-ux-writing-usecase-benchmark.mts
node --import tsx scripts/generate-ux-writing-usecase-benchmark.mts --check
```

## Shadow CLI

The CLI exposes the classifier and benchmark evaluator without adopting a repository or writing runtime state:

```bash
contentmd usecase classify --input usecase-request.json --json
contentmd usecase evaluate \
  --benchmark fixtures/ux-writing-usecases/benchmark-v0.1.jsonl \
  --adjudications fixtures/ux-writing-usecases/adjudication-v0.1.jsonl \
  --json
```

Classification returns `mode: "shadow"`, `authority_effect: "none"`, and `write_effect: "none"`. An abstention is a completed classification result, not an internal failure. Evaluation uses governance exit code `20` while qualified adjudication is pending, even when every provisional deterministic criterion passes.

## Safety and authority boundaries

- Classification is deterministic and replayable from its serialized input.
- Selection is not approval. Existing UX-writing review and evidence gates remain authoritative for hard failures, unknown product state, recovery safety, and human judgment.
- An unknown outcome must not silently become “try again”; retry safety depends on the action contract and outcome evidence.
- Templates must declare required facts. Missing facts produce `abstain`, not a guessed placeholder.
- A component name does not establish message purpose, attention behavior, or affected scope; those are separate axes.
- `empty`, `error`, and `confirmation` are not sufficient routes without an established cause or outcome where the distinction affects recovery.
- A future model may propose structured facts or candidate templates, but it must remain a shadow/proposal layer. It cannot alter rules, thresholds, policy, authority, or promotion state.

## Verification

The primary implementation is in `packages/evaluation/src/ux-writing-coordinate.ts`, `packages/evaluation/src/ux-writing-taxonomy.ts`, `packages/evaluation/src/ux-writing-policy-routes.ts`, and `packages/evaluation/src/ux-writing-benchmark.ts`. The earlier flat API in `usecase-classifier.ts` remains compatibility-only.

Focused tests cover deterministic replay, English scope enforcement, text/non-evidence separation, unknown labels, missing-fact and missing-axis abstention, route ambiguity, template ambiguity, source integrity, critical near-neighbor pairs, all 200 frozen cases, adjudication-state validation, criterion-level reporting, exact regeneration, CLI output, and the no-write shadow boundary. This verifies contract behavior only. It does not demonstrate classifier completeness, human agreement, user comprehension, writing effectiveness, or production readiness.

The sealed learning runtimes are requalified separately to exact Node.js `24.20.0` profiles for macOS arm64 and Linux x64. See `learning-runtime-requalification-24.20.0.md`; the broad workspace engine range alone is not release evidence.
