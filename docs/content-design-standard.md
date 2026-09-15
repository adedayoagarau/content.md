# content.md content-design standard

Status: candidate standard for human calibration  
Version: 0.2

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
state, action, consequence, recovery, surface, and evidence.

## Current language scope

Version 0.2 evaluates English-language product content only. Reviewers and the
deterministic baseline must not use target locale, translation status,
direction, or presumed in-market adequacy to change a disposition or quality
score. Locale readiness and localization quality are outside the current
capability claim and require a later, separately governed benchmark with
qualified in-language reviewers.

English-language scope does not mean global readiness. It means the current
system may judge the supplied English expression while making no claim about
translation, cultural fit, regional terminology, bidirectionality, expansion,
or in-market usability.

## Core abilities

| Ability | The agent must | Demonstrated when |
| --- | --- | --- |
| Frame the problem | Identify the user task, product state, actors, decision, risk, and missing evidence before editing words. | The brief separates known facts, constraints, assumptions, and unresolved questions. |
| Model meaning | Preserve the actor, action, object, state, timing, options, consequences, and recovery that are material to the experience. | Every material invariant is mapped to evidence and to the proposed expression. |
| Design the interaction | Treat labels, guidance, validation, progress, results, and recovery as a coherent state sequence. | Content matches the available action and gives an operable next step. |
| Structure information | Put essential information where people need it and maintain consistent concepts and destination labels. | Hierarchy, progressive disclosure, terminology, and navigation promises remain coherent. |
| Write clearly | Use direct, specific, economical language appropriate to the channel without losing meaning. | A candidate is understandable on first reading and contains no avoidable words or ambiguity. |
| Protect agency and trust | Make material choices, commitments, costs, automation, uncertainty, and consequences visible. | The user can understand what will happen and can refuse, recover, or seek help where applicable. |
| Design for access | Account for accessible names, reading order, announcements, and non-text context while separating text review from runtime verification. | The agent states what text can establish and routes runtime accessibility claims to qualified verification. |
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
5. **Accessibility readiness** — Are text-level obligations met and specialist
   or runtime checks correctly routed?
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

## English decision rules

Apply these rules after evidence, truth, and state checks. They resolve the
largest ambiguities observed in the exploratory Claude and Cursor audit; they
remain candidates until qualified human calibration.

- **Semantic fidelity is a hard requirement.** A material actor, state, action,
  object, timing, option, consequence, or recovery path may be expressed in the
  candidate or supplied supporting content. If a required meaning is absent,
  use `revise`; do not reduce the omission to a preference question.
- **Material consequences cannot be traded for brevity.** If the scenario says
  a consequence is required and it appears nowhere in the complete expression,
  use `revise`. If the consequence is present in supporting content, do not
  fail a compact control merely because the label does not repeat it.
- **Agency is contextual.** Use `revise` when content obscures a material
  choice, commitment, refusal path, cost, automation, uncertainty, or control.
  Do not require a refusal or alternative where the supplied product state says
  none is applicable.
- **Recovery is actionability, not mandatory reassurance.** A recovery-required
  state must expose a safe available action or route. Use `revise` when that
  route is missing, unsafe, or contradicted. Do not fail a completed or
  informational state merely for lacking a recovery instruction.
- **Warmth is subordinate to task meaning.** Optional supportive language is a
  preference question only when it is brief, appropriate to risk, and does not
  delay, dilute, dramatize, or contradict the state and action. Otherwise use
  `revise`.
- **Concision is not automatically a preference question.** Pass concise copy
  when the complete expression preserves every material meaning and fits the
  surface. Use `revise` when compression introduces ambiguity, hides a
  consequence, or makes the destination or action unclear.
- **Surface fit changes expression, not required meaning.** Buttons name the
  action; nearby content may carry state and consequence. Emails and help
  articles require enough context and hierarchy to stand alone. Navigation
  labels must accurately promise the destination. Screen-reader status content
  must make the changed state understandable without relying on visual context.
- **Human preference review is narrow.** Use it only after all applicable hard
  requirements pass and two acceptable English expressions differ mainly in
  hierarchy, emphasis, warmth, rhythm, or economy. It must not absorb a known
  semantic, agency, recovery, or authority failure.

## Gold-set design

The capability suite must contain realistic, source-bound scenarios rather
than free-standing copy prompts. Each scenario records:

- context and intended user outcome;
- current and preceding product states;
- actors, available actions, consequence, reversibility, and recovery;
- approved facts and forbidden claims;
- surface, channel, accessibility context, and risk;
- expected findings and disposition;
- acceptable meaning invariants, not one mandatory sentence;
- reviewer role and evidence provenance.

Every capability needs all four controls:

1. a clear failure the agent must detect;
2. a valid candidate the agent must accept;
3. an underspecified case where it must abstain or escalate;
4. a near-miss that tests whether it preserves meaning rather than matching
   keywords.

The shared matrix also includes an explicit unsupported-authority control. A
candidate that claims approval, authorization, or guarantee without evidence
must not pass or be reduced to a style preference; the deterministic baseline
routes that uncertainty to escalation.

## Release thresholds

A content-design capability may be described as demonstrated only when:

- all critical safety scenarios pass with no false acceptance;
- all abstention and specialist-routing scenarios produce the expected
  disposition;
- positive controls are not rejected by over-broad rules;
- candidate comparisons are calibrated against independent content-design
  review, with disagreements retained by ability and by hard or quality
  dimension rather than overwritten;
- benchmark gold is bound to a current governed reviewer qualification for the
  exact packet; a claimed role or independence attestation is insufficient;
- results are reported by ability, risk, and surface—not only as one aggregate
  score;
- quality-score coverage and missing evaluator judgments remain visible beside
  quality error for every reported slice and each quality dimension;
- hard-requirement coverage and accuracy remain visible for each hard
  dimension rather than only as an aggregate;
- critical false acceptance, abstention recall, escalation recall, positive
  false rejection, and the complete disposition confusion matrix remain visible;
- the exact fixtures, rubric, implementation, and result digests are
  reproducible.

No fine-tuning is justified by corpus size alone. Approved evidence should
first improve retrieval, repair briefs, deterministic checks, and a reviewed
gold set. A learned or fine-tuned candidate must then beat the non-learned
baseline on held-out scenarios without regressing safety, abstention, or
minority-slice performance.

## Current implementation evidence

The regular-user UX-writing review path has four fixed end-to-end fixtures:
unsafe retry after an unknown payment outcome, an obscured subscription choice,
undisclosed automated-assistant limits, and a supported success confirmation.
Those fixtures demonstrate deterministic diagnosis and repair-brief generation;
they are not the full content-design benchmark.

The historical deterministic benchmark processes 10,000 generated candidates
across ten abilities, situations, surfaces, and target locales. It exercised
localization routing as well as English content behavior. The exploratory
Claude and Cursor audit showed that locale metadata dominated some reviewer
dispositions, so that matrix is not the current English-only benchmark. It
remains execution and ambiguity evidence, not evidence that the evaluator's
judgments are correct.

Broad content-design quality therefore remains undemonstrated. Independent
qualified review must establish whether the rubric, generated expectations,
and evaluator behavior hold across those slices. Onboarding, richer multi-step
flows, candidate generation from repair briefs, rendered accessibility, and
in-locale judgment also require later product or study evidence rather than an
inference from synthetic coverage.

The repository includes 10,000 reproducible synthetic candidates under
`docs/tests/fixtures/content-design-scenarios/`. They provide broad matrix
coverage for exercising evaluators, sampling review work, and finding rule
gaps. Every ability includes positive, clear-failure, underspecified, and
near-miss controls; those are generator hypotheses, not validated judgments.
The scenarios are deliberately ineligible for retrieval, gold-set learning, or
fine-tuning until independent review records a qualified disposition and
meaning-based rationale.

The historical 500-item calibration cohort and held-out reservation are bound
to the locale-bearing matrix. All 10,000 scenarios were later exposed to
external model review, so neither artifact can support a future independent
effectiveness claim. The next formal calibration and held-out sets must be
newly authored, English-only by construction, independently reviewed, and
frozen before evaluator improvement begins.

The packaged deterministic baseline has processed the complete blinded matrix;
the reproducible result is recorded in the
[10,000-scenario verification](verification/content-design-benchmark-10000.md).
That record demonstrates execution and coverage, not judgment accuracy.
