# Conversational and AI Interaction Knowledge

This proposal-only pack models conversation as a sequence of accountable interface turns. It supports review and repair only; it does not authorize automated action, publication, provider training, or claims about intelligence, privacy, accessibility, or professional competence.

## Interaction Model

Review a conversational exchange as:

`participant turn → system interpretation → evidence/tool use → system turn → state change → participant understanding → repair or handoff`

Every system turn should resolve five questions:

1. Who or what produced this turn?
2. What input and evidence support it?
3. What is known, inferred, generated, or still unknown?
4. What action or state change occurred?
5. How can the person inspect, correct, stop, or escalate?

Conversation is a useful interaction form, not evidence that a system listens, understands, remembers, cares, or relates like a person.

## Key Concepts

### Turn contract

The evidence-backed definition of a turn's speaker, addressee, intent, inputs, claims, actions, state, and available next moves.

- A turn must respond to the current interaction state, not merely resemble a relevant answer.
- A system question should explain what information is needed when the purpose is not obvious.
- A system answer should distinguish content from controls, status, and provenance.

### Temporal coherence

The exchange preserves prior commitments, corrections, unresolved questions, and state transitions across turns.

Temporal coherence does not permit undocumented memory. Retention scope, duration, and reuse require product and privacy evidence.

### Repair

A bounded path for recovering from misunderstanding, missing input, stale context, tool failure, or an unsupported request.

Repair may include:

- restating the interpreted request;
- asking one decision-relevant question;
- allowing edit, reset, undo, or source inspection;
- distinguishing failed, pending, partial, and unknown outcomes;
- transferring context to an accountable human route.

### System identity and operator

**System identity** names the interface role. **Operator** identifies the accountable organization or service. **Turn origin** states whether content is deterministic, retrieved, generated, human-authored, or hybrid.

Names such as assistant, advisor, coach, agent, or expert are not neutral: they imply capabilities and authority that must be evidenced.

### Capability boundary

The approved set of tasks, tools, sources, actions, and claims available in the current context.

- A fluent answer cannot expand this boundary.
- Tool access does not prove a tool call occurred or succeeded.
- Access to a source does not prove a claim is grounded in it.
- A candidate must not imply professional judgment it cannot provide.

### Grounded answer

An answer whose material claims are traceable to approved, current sources or authoritative runtime state.

Grounding needs claim-level support, scope, currency, and qualification. A decorative citation list or generic “based on your data” statement is insufficient.

### Calibrated uncertainty

An explicit distinction among known, inferred, estimated, conflicting, missing, and unknowable information.

Uncertainty language should connect to consequence and next action. Vague hedging is not a substitute for evidence.

### Handoff

A stateful transfer to a human or specialist with disclosed availability, expected timing, destination, shared context, and fallback.

A link labeled “Contact support” is not a verified handoff unless the route and context transfer are operable.

## Shared-Device Privacy

Conversational interfaces can expose prompts, history, notifications, speech, identity, and inferred attributes to bystanders or other account users. Review requires evidence for:

- account and speaker recognition limits;
- display, audio, notification, and transcript exposure;
- memory scope, retention, correction, deletion, and nonuse controls;
- sensitive-data minimization and purpose;
- safe re-entry, lock, session expiry, and handoff behavior.

Do not personalize from a profile when the current person or audience is unresolved.

## Evidence Classification

### Deterministic candidates

With approved facts, check speaker/operator presence, turn origin, source references, claim-state consistency, tool result state, memory controls, action/handoff presence, and semantic invariants.

### Advisory criteria

Turn pacing, question order, warmth, acknowledgement, disclosure placement, conversational rhythm, and personality are contextual. They cannot override hard findings.

### Specialist criteria

Escalate high-risk domain claims, privacy/security practice, consent, accessibility behavior, sensitive identity language, legal disclosure, locale adaptation, and human-like professional roles.

### Research criteria

Test comprehension, trust calibration, repair success, capability discoverability, handoff continuity, modality fit, repeat-use effects, and shared-device behavior with affected populations.

## Failure Semantics

- `pass`: approved evidence proves all applicable structural requirements.
- `fail`: the turn contradicts evidence or omits a required structural element.
- `unknown`: a missing fact could change truth, state, privacy, action, or recovery.
- `not_applicable`: declared applicability conditions do not match.
- `specialist_review`: the judgment exceeds deterministic authority.

Material unknown or hard failure blocks stylistic scoring and decision-ready generation.

## Common Misconceptions

- **“Natural language means understanding.”** Fluency is expression, not proof of interpretation or competence.
- **“A citation makes an answer grounded.”** Each material claim needs a supported relationship to a source.
- **“The assistant remembers me.”** Memory must be a disclosed, inspectable product behavior, not a persona claim.
- **“Apologizing repairs the experience.”** Repair requires restored progress, safe action, or accountable handoff.
- **“Human handoff is always safer.”** Availability, context transfer, authority, privacy, and fallback must be verified.

## Lineage

Transformed from the cross-book synthesis sections **Design the whole temporal interaction**, **Make claims, actors, and responsibility explicit**, **Treat error and recovery as product behavior**, **Govern voice and situational tone**, **Conversation**, **Personality**, **Personalization**, **AI assistance**, **Evaluation and escalation criteria**, and **Remaining evidence gaps**. The corpus provides practitioner evidence only; implementation authority is `none`.
