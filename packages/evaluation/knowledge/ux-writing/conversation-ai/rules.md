# Conversational and AI Interaction Rules

These proposal-only rules apply hard gates only when approved project or governing evidence supplies the contract. Treat conversational quality as advisory and route governed judgments to specialists.

## Deterministic Gates

### CAI-01 Resolve each turn

Require turn identifier, current state, speaker, addressee, intent, origin, material inputs, and permitted next states.

- **Fail:** the candidate contradicts a supplied turn contract.
- **Unknown:** a missing field could change meaning, action, privacy, or recovery.

### CAI-02 Disclose accountable identity

Resolve the system role, accountable operator, and whether a turn is deterministic, retrieved, generated, human-authored, or hybrid when material.

- Do not use “I,” “we,” assistant, advisor, coach, agent, expert, or partner without an approved referent and role.
- Do not imply a human is present when automation produced the turn.

### CAI-03 Bound capability claims

Candidate language must remain within evidenced tasks, tools, sources, permissions, and authority.

- Prohibit unsupported claims of listening, seeing, remembering, understanding, feeling, monitoring, verification, prediction, or professional judgment.
- Do not infer capability from persona, fluency, or an available integration.

### CAI-04 Ground material claims

Require approved source or runtime-state references for each material factual claim.

- Preserve source scope, currency, conflicts, and qualifications.
- Fail when a cited source does not support the mapped claim.
- Mark unknown when grounding cannot be resolved.

### CAI-05 Represent uncertainty explicitly

Classify each material claim as known, retrieved, inferred, estimated, conflicting, missing, or unresolved when the distinction affects action.

- State what is uncertain and why.
- Provide a safe verification, correction, wait, or escalation route.
- Do not convert probabilistic output into certain language.

### CAI-06 Report tool and action state truthfully

Distinguish intended, requested, authorized, started, pending, partial, succeeded, failed, and unknown outcomes.

- A proposed action is not an executed action.
- A tool invocation is not proof of success.
- Unknown transaction outcome blocks unconditional retry.

### CAI-07 Preserve participant input and correction

Keep relevant submitted information available across a repair unless retention or safety evidence requires otherwise.

- Provide edit, clarify, reset, cancel, or undo according to the approved interaction contract.
- Never silently rewrite a material user intent.

### CAI-08 Make memory bounded and controllable

When the product uses cross-turn or cross-session context, require evidence for purpose, fields, duration, audience, and controls.

- Do not claim memory when none exists.
- Do not reuse sensitive or inferred context outside its approved purpose.
- Require inspect, correct, delete, reset, or nonuse routes when governing records specify them.

### CAI-09 Protect unresolved shared-device contexts

When account user, speaker, subject, or audience may differ, do not reveal or personalize with sensitive context until the interaction contract resolves access and exposure.

- Cover display, audio, transcript, notification, and handoff channels.
- Escalate privacy and security decisions to specialists.

### CAI-10 Provide bounded repair

On misunderstanding or failure, state the interpreted task, preserved state, failure or uncertainty, and available next moves.

- Do not repeat the same failed prompt without a changed condition.
- Do not use apology or reassurance as the only recovery.

### CAI-11 Make human handoff operable

When a human route is required or promised, require destination, availability, expected timing, transferred context, user control over that context, and fallback.

- Do not state “I’ve connected you” before authoritative confirmation.
- Do not conceal a bot loop behind a human-support label.

### CAI-12 Keep high-risk authority human-governed

For medical, legal, financial, safety, policy, eligibility, privacy, security, or regulated decisions, require approved domain sources and specialist disposition.

Generation may summarize bounded evidence; it may not invent or assume decision authority.

### CAI-13 Preserve channel parity

Material identity, uncertainty, consequence, status, and recovery must survive approved projections across visual, speech, notification, transcript, and assistive modes.

Rendered accessibility and locale behavior require current external and runtime verification.

### CAI-14 Enforce hard-before-soft evaluation

Do not rank personality, warmth, humor, cadence, brevity, or charm while CAI-01 through CAI-13 contains a hard failure or material unknown.

## Advisory Guidance

- Ask one decision-relevant question at a time when it reduces repair cost.
- Confirm interpreted intent before a consequential or ambiguous action.
- Keep turns relevant to the current task and disclose topic changes.
- Use acknowledgement to orient, not to claim emotion or relationship.
- Make interruption, resumption, and exit predictable.
- Prefer stable role behavior over elaborate character traits.
- Make uncertainty proportionate to consequence and useful for action.
- Test first use, repeat use, interruption, correction, and failure—not only ideal dialogue.

## Specialist and Research Routing

**Specialist review:** privacy/security, consent, high-risk claims, accessibility semantics, locale/cultural adaptation, sensitive identity, professional role, incident response, and required remedies.

**Research:** comprehension, trust calibration, conversational-versus-graphical fit, perceived identity, repair success, handoff continuity, notification welcome, memory expectations, and shared-device exposure.

## Repair Brief Requirements

Include failed rule IDs, current turn/state, semantic invariants, known evidence, material unknowns, prohibited claims, safe next moves, grounding requirements, privacy boundary, handoff contract, and re-evaluation criteria.

## Lineage

Derived from the synthesis sections **Convergent competency map** (2–4, 6–10), the contradiction rows **Conversation**, **Personality**, **Personalization**, **AI assistance**, **Read aloud**, and **Real-time collaboration**, plus **Hard constraints**, **Mandatory abstention or escalation**, and **Remaining evidence gaps**. Proposal-only; no runtime authority.
