# content.md content-design standard

Status: candidate standard for human calibration  
Version: 0.1

This standard defines the content-design ability that `content.md` is intended
to demonstrate. It is an evaluation contract, not a claim that the current
implementation has already met every requirement.

## The job

Given a product state and bounded evidence, `content.md` should help a person
make the smallest content decision that enables the intended task without
changing facts, concealing consequences, removing agency, or claiming authority
it does not have.

The unit of quality is a message in context—not an isolated string. A review or
candidate must be evaluated with its user, purpose, journey stage, product
state, action, consequence, recovery, surface, locale, and evidence.

## Core abilities

| Ability | The agent must | Demonstrated when |
| --- | --- | --- |
| Frame the problem | Identify the user task, product state, actors, decision, risk, and missing evidence before editing words. | The brief separates known facts, constraints, assumptions, and unresolved questions. |
| Model meaning | Preserve the actor, action, object, state, timing, options, consequences, and recovery that are material to the experience. | Every material invariant is mapped to evidence and to the proposed expression. |
| Design the interaction | Treat labels, guidance, validation, progress, results, and recovery as a coherent state sequence. | Content matches the available action and gives an operable next step. |
| Structure information | Put essential information where people need it and maintain consistent concepts and destination labels. | Hierarchy, progressive disclosure, terminology, and navigation promises remain coherent. |
| Write clearly | Use direct, specific, economical language appropriate to the channel without losing meaning. | A candidate is understandable on first reading and contains no avoidable words or ambiguity. |
| Protect agency and trust | Make material choices, commitments, costs, automation, uncertainty, and consequences visible. | The user can understand what will happen and can refuse, recover, or seek help where applicable. |
| Design for access and locale | Account for accessible names, reading order, non-text context, expansion, direction, terminology, and specialist review. | The agent states what text can establish and routes runtime or in-locale claims to qualified review. |
| Evaluate and improve | Compare candidates against hard constraints first, then explain preference-level tradeoffs. | The output diagnoses failures, produces an actionable repair brief, and abstains when evidence is insufficient. |
| Maintain the system | Link decisions to occurrences, owners, evidence, approval state, and measurement. | A change remains traceable and does not turn observed or generated content into automatic canon. |

## Evaluation order

Quality is assessed in this order. A later layer cannot compensate for failure
in an earlier one.

1. **Evidence and authority** — Are the facts current, scoped, attributable,
   and within the agent's authority?
2. **Truth and state accuracy** — Does the content represent what happened,
   what is happening, and what can happen next?
3. **Action, consequence, and recovery** — Can the user act safely and
   understand the material result, alternatives, and remedy?
4. **Semantic completeness** — Are all required meanings present without
   contradiction or unsupported certainty?
5. **Accessibility and locale readiness** — Are text-level obligations met and
   specialist or runtime checks correctly routed?
6. **Comprehension and structure** — Is the information findable, ordered, and
   understandable in context?
7. **Voice, tone, and economy** — Is the expression appropriate, consistent,
   and concise after the hard constraints pass?

## Required dispositions

- **Pass**: The candidate satisfies every applicable hard requirement and has
  no unresolved question that could change meaning or action.
- **Revise**: The problem is established and the candidate fails a repairable
  requirement.
- **Abstain**: Missing or conflicting evidence could change a fact, state,
  action, consequence, right, safety outcome, or recovery path.
- **Escalate**: Adequacy depends on product, legal, policy, accessibility,
  locale, security, privacy, medical, financial, or other qualified authority.
- **Human preference review**: Hard requirements pass, but contextual clarity,
  hierarchy, tone, or tradeoffs remain judgment calls.

Generated language is always a proposal. None of these dispositions grants
approval, mutation, publication, policy, or release authority.

## Gold-set design

The capability suite must contain realistic, source-bound scenarios rather
than free-standing copy prompts. Each scenario records:

- context and intended user outcome;
- current and preceding product states;
- actors, available actions, consequence, reversibility, and recovery;
- approved facts and forbidden claims;
- surface, channel, locale, accessibility context, and risk;
- expected findings and disposition;
- acceptable meaning invariants, not one mandatory sentence;
- reviewer role and evidence provenance.

Every capability needs all four controls:

1. a clear failure the agent must detect;
2. a valid candidate the agent must accept;
3. an underspecified case where it must abstain or escalate;
4. a near-miss that tests whether it preserves meaning rather than matching
   keywords.

## Release thresholds

A content-design capability may be described as demonstrated only when:

- all critical safety scenarios pass with no false acceptance;
- all abstention and specialist-routing scenarios produce the expected
  disposition;
- positive controls are not rejected by over-broad rules;
- candidate comparisons are calibrated against independent content-design
  review, with disagreements retained rather than overwritten;
- benchmark gold is bound to a current governed reviewer qualification for the
  exact packet; a claimed role or independence attestation is insufficient;
- results are reported by ability, risk, surface, and locale—not only as one
  aggregate score;
- critical false acceptance, abstention recall, escalation recall, positive
  false rejection, and the complete disposition confusion matrix remain visible;
- the exact fixtures, rubric, implementation, and result digests are
  reproducible.

No fine-tuning is justified by corpus size alone. Approved evidence should
first improve retrieval, repair briefs, deterministic checks, and a reviewed
gold set. A learned or fine-tuned candidate must then beat the non-learned
baseline on held-out scenarios without regressing safety, abstention, or
minority-slice performance.

## Current baseline

The current executable baseline demonstrates four bounded cases: unsafe retry
after an unknown payment outcome, an obscured subscription choice, undisclosed
automated-assistant limits, and a supported success confirmation. This is
evidence of deterministic diagnosis and repair-brief generation only.

It does not yet demonstrate broad content-design quality. The next gold-set
expansion must cover controls and validation, destructive actions, permissions,
empty and zero states, onboarding, notifications, navigation and hierarchy,
accessible naming, localization and bidirectionality, multi-step recovery, and
candidate-generation quality.

The repository includes 10,000 reproducible synthetic candidates under
`docs/tests/fixtures/content-design-scenarios/`. They provide broad matrix
coverage for exercising evaluators, sampling review work, and finding rule
gaps. Every ability includes positive, clear-failure, underspecified, and
near-miss controls; those are generator hypotheses, not validated judgments.
The scenarios are deliberately ineligible for retrieval, gold-set learning, or
fine-tuning until independent review records a qualified disposition and
meaning-based rationale.

The deterministic 500-item calibration cohort selects five distinct contexts
for every ability-by-candidate-variant cell and covers all ten situations,
surfaces, and target locales within every ability. Use it for independent human
calibration only after the 100-item workflow packet is operational. Keep final
effectiveness measurement on a separately frozen held-out set; reviewer
agreement and repeated exposure to the calibration cohort are not test results.
The separately committed 500-item held-out reservation contains only immutable
scenario references. It is disjoint from calibration and remains
`frozen_unopened` until calibration is complete and evaluation is authorized.
The remaining 9,000 scenarios are reserve coverage, not automatically a test
set or human gold.

The packaged deterministic baseline has processed the complete blinded matrix;
the reproducible result is recorded in the
[10,000-scenario verification](verification/content-design-benchmark-10000.md).
That record demonstrates execution and coverage, not judgment accuracy.
