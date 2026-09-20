# Deterministic use-case UX-writing system

Status: English-only development contract, coordinate classifier `0.3.0`; policy resolver `0.2.0`

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

## Safety and authority boundaries

- Classification is deterministic and replayable from its serialized input.
- Selection is not approval. Existing UX-writing review and evidence gates remain authoritative for hard failures, unknown product state, recovery safety, and human judgment.
- An unknown outcome must not silently become “try again”; retry safety depends on the action contract and outcome evidence.
- Templates must declare required facts. Missing facts produce `abstain`, not a guessed placeholder.
- A component name does not establish message purpose, attention behavior, or affected scope; those are separate axes.
- `empty`, `error`, and `confirmation` are not sufficient routes without an established cause or outcome where the distinction affects recovery.
- A future model may propose structured facts or candidate templates, but it must remain a shadow/proposal layer. It cannot alter rules, thresholds, policy, authority, or promotion state.

## Verification

The primary implementation is in `packages/evaluation/src/ux-writing-coordinate.ts`, `packages/evaluation/src/ux-writing-taxonomy.ts`, and `packages/evaluation/src/ux-writing-policy-routes.ts`. The earlier flat API in `usecase-classifier.ts` remains compatibility-only.

Focused tests cover deterministic replay, English scope enforcement, text/non-evidence separation, unknown labels, missing-fact and missing-axis abstention, route ambiguity, template ambiguity, source integrity, and critical near-neighbor pairs. This verifies contract behavior only. It does not demonstrate classifier completeness, human agreement, user comprehension, writing effectiveness, or production readiness.

Local verification on 2026-09-19 used Node.js `24.19.0`, which satisfies the workspace engine range `>=24.14.0 <25`. All 55 evaluation tests passed, and the 18-package boundary check and TypeScript build passed. The repository-wide test command separately reproduced the pre-existing fail-closed learning-golden boundary: Task 5 and Task 6 runtime admission remains sealed to Node.js `24.14.0` and rejects the Node.js `24.19.0` host. This feature does not alter or requalify those governed runtime profiles, and no full-suite pass is claimed.
