---
title: UX writing capability implementation decision packet
status: deterministic-review-repair-implemented
date: 2026-08-26
authority: research-only
---

# UX writing capability implementation decision packet

## Decision

Proceed with a phased, contract-first UX-writing capability. The six-book corpus is sufficient to define and test bounded request, candidate, and evaluation contracts. It is not sufficient to authorize autonomous publication, product-state mutation, policy interpretation, specialist approval, or model training.

The first implementation slice should make the existing draft, rewrite, and review paths state-aware. It should not add a free-form “UX writer persona.”

## Implementation update — 2026-08-26

Phase 1 is implemented as a backward-compatible production foundation:

- `packages/schemas/src/ux-writing-records.schema.json` registers closed durable request and candidate records with `authority_effect: none`;
- `packages/evaluation/src/ux-writing.ts` provides canonical hard-first evaluation with stable reason codes and explicit abstention, escalation, revision, and bounded-approval dispositions;
- focused schema and evaluation tests cover unsafe retry, incomplete outcome evidence, RTL specialist review, invariant mapping, authority rejection, and hard-plane gating of voice/tone;
- at that milestone, the capability remained disconnected from live model execution, publication, mutation, learning, and training.

Focused verification passed: 22 schema tests, 23 evaluation tests, and TypeScript builds for both packages. The verification host used Node 25.5.0 while the repository declares Node `>=24.14.0 <25`; this is an environment variance, not a suppressed result.

The deterministic review-and-repair slice is now integrated across the existing runtime:

- nine approved core rule packs encode a closed condition language, hard/advisory classification, applicability, audit lineage, and canonical digests;
- project overlays may add approved rules and suppress only explicitly suppressible advisory rules; core hard rules are immutable;
- review reports expose reason, consequence, product evidence, and repair guidance while keeping book/source lineage in the audit boundary;
- failed or unknown reviews produce an integrity-bound repair brief that preserves semantic invariants, prohibited claims, required facts, recovery, and acceptance criteria;
- repair-aware rewrites use a separate strict model-output schema and must map every declared semantic invariant;
- generated candidates are re-evaluated and cannot self-certify semantic preservation; unresolved preservation yields `unknown` and abstention;
- the existing `review` and `rewrite` commands accept `--ux-context` and `--repair-brief` without changing legacy prompt or output-schema digests.

The explanatory knowledge base lives under `packages/evaluation/knowledge/ux-writing/`: nine progressive-disclosure packs, integrated guidelines, review/repair and promotion workflows, and an explicit runtime-promotion map. These files carry source provenance and calibration context but have no direct runtime authority.

Focused verification now passes 26 schema tests, 34 evaluation tests, 43 writer tests, the targeted agent and CLI UX-writing tests, and TypeScript builds for schemas, evaluation, writer, agent, and CLI. The Node 25.5.0 versus declared Node 24 variance remains; full agent/CLI suite results on this host are therefore not treated as release evidence.

## Evidence boundary

The decision draws from the six completed book ledgers and the cross-book synthesis. It preserves three acquisition gaps: *Content Design*, *Writing for Designers*, and *Designing Connected Content* were not supplied and have not been studied. Indexed external technical research was unavailable because the required Firecrawl Developer Index interface was not callable in this environment. Repository evidence and book-derived research remain separate.

## Capability contract

The capability accepts a structured request that binds:

- product and surface scope;
- actors, authority, goals, and affected parties;
- current, previous, next, success, failure, and unknown states;
- message intent and required facts;
- forbidden or unsupported claims;
- action labels, consequences, reversibility, and recovery;
- risk, locale, accessibility, voice, tone, and evidence context;
- open questions and acceptance criteria.

It returns a candidate record containing semantic invariants, one or more channel-specific expressions, assumptions, alternatives, unresolved questions, evaluation outcomes, and a disposition. A candidate has no implementation authority.

The research schema is [ux-writing-capability-record-proposals.schema.json](./ux-writing-capability-record-proposals.schema.json). It remains deliberately unregistered.

## Package-by-package change map

| Area | First bounded change | Explicit non-goal |
|---|---|---|
| `packages/schemas` | Review, refine, then register production request and candidate schemas with validators and stable IDs. | Do not register the research proposal unchanged. |
| `packages/writer` | Compile structured UX-writing context into draft and rewrite prompts; require semantic invariants before expression; surface missing information as abstention. | Do not encode book prose, examples, or a universal house style. |
| `packages/evaluation` | Evaluate truth/state, consequence, agency, safety, recovery, accessibility, and locale before voice/tone; distinguish deterministic, specialist, research, human-judgment, and preference findings. | Do not convert contextual heuristics into universal hard failures. |
| `packages/agent` | Assemble evidence, reject unsupported state claims, preserve unresolved questions, and emit candidates only. | Do not publish, mutate product state, approve policy, or impersonate specialists. |
| `packages/cli` | Extend existing `draft`, `rewrite`, and `review` inputs/outputs with a UX-writing context file and structured candidate/report output. | Do not create a parallel command family unless existing workflows prove inadequate. |
| governance | Record authority, evidence lineage, review requirements, and disposition at every boundary. | No silent approval, enforcement, learning, or training promotion. |

## Evaluation order

1. Schema and evidence completeness.
2. State and factual consistency.
3. Actor authority and affected-party visibility.
4. Consequence, reversibility, recovery, and safe retry.
5. Accessibility and locale invariants.
6. Channel fit and information sequence.
7. Voice and tone eligibility.
8. Preference among candidates that passed the hard plane.

A hard-plane failure prevents voice/tone scoring from laundering an unsafe or false candidate into acceptability.

## Failure semantics

The capability must abstain or escalate when:

- required state, consequence, authority, or policy evidence is absent;
- an action outcome is unknown and retry may duplicate harm;
- a legal, clinical, financial, eligibility, privacy, or localization judgment requires qualified review;
- semantic parity across channel or locale cannot be established;
- a requested expression depends on deception, coercion, invented certainty, or concealed material loss.

An abstention is a valid result. It must identify the missing evidence and a useful next action.

## Synthetic verification

The original fixture plan in [ux-writing-synthetic-fixture-plan-2026-08-26.json](./ux-writing-synthetic-fixture-plan-2026-08-26.json) covers 12 scenarios and ordinary/adverse variants. Initial automated coverage should prioritize:

1. unknown payment outcome and unsafe retry;
2. destructive action with shared impact;
3. unsupported eligibility reasoning;
4. uncertain medication identity;
5. bundled notification consent;
6. voice-channel identity uncertainty;
7. RTL and currency semantic parity;
8. screen-reader status and recovery;
9. generated-answer evidence gaps;
10. coercive cancellation;
11. public-name restriction disclosure;
12. deceptive human-operated prototypes.

## Sequencing

### Phase 0 — review the research contracts

- Validate field names against existing project, occurrence, pattern, voice/tone, and evidence records.
- Decide which fields are required at schema level and which are conditional evaluation rules.
- Review privacy exposure: request records may contain sensitive product context but must not contain unnecessary user data.

### Phase 1 — production contracts and pure evaluation

- Add versioned schemas and TypeScript types.
- Add canonical validation and deterministic evaluation functions.
- Implement fixtures for hard-plane failures and abstention.
- Keep the capability disconnected from live model execution.

### Phase 2 — writer and agent integration (implemented for deterministic repair)

- Compile validated context into prompts.
- Parse candidate records strictly.
- Reject ungrounded facts and invariant loss.
- Require explicit governance authorization for any downstream application.

### Phase 3 — CLI exposure and calibration (CLI exposed; broader calibration remains)

- Add context-file support to existing commands.
- Run synthetic and project-owned calibration cases.
- Measure reviewer agreement separately from automated pass rate.
- Promote contextual rules only with project evidence and recorded approval.

## Acceptance criteria for the first code slice

- Invalid or incomplete high-risk requests fail closed with stable reason codes.
- Unknown action outcomes never produce an unconditional retry recommendation.
- Every expression maps to explicit semantic invariants.
- Hard-plane failure suppresses voice/tone evaluation.
- Candidate output preserves assumptions and unresolved questions.
- Specialist-required findings cannot be automatically approved.
- No candidate can authorize publication or mutation.
- All records are deterministic, canonicalizable, and covered by unit tests.
- Existing draft, rewrite, and review behavior remains backward compatible until an explicit migration decision.

## Promotion gate

Promote this proposal into runtime only after maintainers review the schema, conditional requirements, failure reason taxonomy, and fixture expectations. Promotion should be a separate commit-sized decision with tests. Learning/training use requires an additional governance decision and a licensed, purpose-reviewed corpus; the supplied books are research sources, not training data.
