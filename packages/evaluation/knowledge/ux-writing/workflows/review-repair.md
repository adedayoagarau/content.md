# Review and repair workflow

Use this workflow to evaluate existing user-facing content and create a deterministic repair brief.

## Prerequisites

- A resolved target occurrence and its current expression.
- Product evidence for material facts and behavior.
- Actor, state, action, consequence, recovery, channel, locale, and risk context.

## Steps

### 1. Normalize the request

- [ ] Bind target, actors, authority, state, and affected parties.
- [ ] Record required facts, evidence references, prohibited claims, and open questions.
- [ ] Stop with `unknown` if missing context could change truth, consequence, agency, or recovery.

Reference: `../context-state/rules.md`

### 2. Select applicable packs

- [ ] Always evaluate context/state and governance.
- [ ] Add only packs matched by surface, state, action, channel, locale, and risk.
- [ ] Record exact rule-pack versions and digests.

Reference: `../guidelines.md`

### 3. Evaluate the hard plane

- [ ] Evaluate evidence, state, actor authority, consequence, agency, recovery, semantic fidelity, and applicable locale/access requirements.
- [ ] Return `fail` for contradicted hard assertions.
- [ ] Return `unknown` for absent evidence or required specialist judgment.
- [ ] Do not evaluate voice/tone while the hard plane is not `pass`.

### 4. Evaluate craft guidance

- [ ] Apply advisory structure, terminology, clarity, concision, and tone rules.
- [ ] Preserve project-approved exceptions and suppression rationale.
- [ ] Never let advisory scores compensate for hard failure.

### 5. Create the repair brief

- [ ] List meaning that must be preserved.
- [ ] List exact changes required by findings.
- [ ] List prohibited claims, required facts, consequence, recovery, channel, locale, and acceptance criteria.
- [ ] Preserve unresolved questions rather than inventing answers.

### 6. Generate and re-evaluate when requested

- [ ] Bind the repair-brief digest into the rewrite prompt.
- [ ] Treat every expression as a proposal with `authority_effect: none`.
- [ ] Recompute derived facts and run the same rules on every candidate.

## Exit criteria

- [ ] Report and repair brief are replayable from input and rule-pack digests.
- [ ] Every finding shows reason, consequence, project evidence, and repair.
- [ ] Any remaining unknown or specialist requirement is explicit.
