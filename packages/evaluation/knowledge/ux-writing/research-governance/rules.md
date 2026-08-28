# UX-Writing Research and Governance Rules

These proposal-only rules govern evidence classification and rule lifecycle. They do not authorize research, data use, release, training, or enforcement.

## Deterministic Governance Gates

### RG-01 Classify every claim

Assign each claim exactly one primary lane: `deterministic`, `specialist`, `research`, or `preference`.

- Record secondary dependencies separately.
- Unknown classification blocks promotion.
- Never convert a heuristic into a hard rule through confident wording.

### RG-02 Preserve source boundaries

Record source identity, locator, version, scope, currency, authority class, and allowed use.

- Practitioner evidence cannot establish law, policy, product state, or conformance.
- Generated output cannot cite itself as evidence.
- A summary cannot silently broaden its source.

### RG-03 Define the decision before the method

Every research or evaluation activity must name the decision, hypothesis, population, task, risk, and acceptance criteria it informs.

Activity without a decision record remains exploratory and cannot approve a rule.

### RG-04 Match method to claim

Require a method capable of supporting the proposed inference.

- Use deterministic checks for machine-verifiable contracts.
- Use specialists for governed judgments.
- Use affected-population research for interpretation and outcome claims.
- Label aesthetic choices as preferences.

### RG-05 Evaluate hard planes first

Hard failures or material unknowns on authority, truth, state, safety, governed requirements, accessibility structure, consequence, agency, or recovery block preference ranking and promotion.

### RG-06 Version metrics and countermetrics

Each metric requires definition, event/source, denominator, window, segmentation, missing-data treatment, owner, and countermetrics.

- Do not use clicks, conversion, retention, or satisfaction alone as user benefit.
- Do not compare results across changed definitions without an explicit bridge.

### RG-07 Preserve research limitations

Store recruitment, exclusions, consent, context, protocol, sample, analysis, contradictory observations, uncertainty, and transfer limits.

Do not rewrite “observed in this study” as “users always.”

### RG-08 Require role accountability

Every proposal needs a request owner, evidence owner, rule author, evaluator, approver, implementation owner, and monitoring owner as applicable.

Unresolved ownership blocks release. Conflicting roles require recorded approval-policy treatment.

### RG-09 Promote through fixtures and conflict review

Before approval, require original ordinary, boundary, adverse, unknown-input, and not-applicable fixtures.

- Test false-positive and false-negative risks.
- Record conflicts with existing rules and precedence decisions.
- A passing happy path is insufficient.

### RG-10 Make approval explicit and scoped

Approval records must identify approver authority, exact artifact digest, version, scope, locale, conditions, residual risks, effective date, and expiry or review date.

Silence, usage, merge, model output, or stakeholder praise is not approval.

### RG-11 Release immutably

Never mutate a released rule in place. Material changes create a new version with migration notes, compatibility impact, fixtures, and rollback.

### RG-12 Keep evaluation replayable

Store canonical input digest, rule-pack digest, evaluator version, applied rule order, evidence references, outcomes, reason codes, and timestamp.

Identical canonical inputs and versions must reproduce deterministic findings and ordering.

### RG-13 Monitor consequences after release

Connect releases to production observation, population segments, adverse outcomes, incidents, complaints, reversals, and correction latency.

Monitoring cannot expand data use beyond approved purpose.

### RG-14 Suspend or retire stale rules

Trigger review when evidence expires, authority changes, runtime behavior drifts, metrics regress, adverse impact appears, or a conflict cannot be resolved.

Retirement must preserve history, reason, successor, affected versions, and remediation status.

### RG-15 Separate training and learning promotion

No candidate, accepted string, reviewer action, research record, interaction log, or production outcome enters training, retrieval, exemplars, preference learning, or rule generation without a distinct governed approval.

Require purpose, provenance, rights, consent or governing basis, minimization, retention/deletion, security, population scope, quality, harm review, nonuse behavior, and owner.

### RG-16 Abstain when evidence cannot bear the claim

Return `unknown`, `specialist_review`, or `research_required` rather than a decision-ready rule when authority, method, affected population, product state, locale, accessibility, or harm evidence is materially incomplete.

## Advisory Practices

- Prefer the smallest rule scope supported by evidence.
- Review low-frequency, high-consequence populations even when aggregate metrics look healthy.
- Keep research materials and decision records usable asynchronously.
- Record rejected alternatives and why they were rejected.
- Calibrate severity with observed false positives and false negatives.
- Schedule expiry before the source is likely to become stale.

## Promotion Disposition

| Disposition | Meaning |
|---|---|
| `draft` | Unreviewed proposal; no execution |
| `needs_evidence` | Material input or authority absent |
| `research_required` | Human outcome untested |
| `specialist_review` | Governed decision pending |
| `approved_inactive` | Approved but not released |
| `active` | Released under named version and scope |
| `suspended` | Temporarily excluded from decisions |
| `retired` | Preserved for history, never newly applied |

## Lineage

Derived from synthesis sections **Lifecycle**, **Hard-before-soft**, **Evidence-strength classification**, **Competency and method map**, **Evaluation and escalation criteria**, **Mandatory abstention**, **Remaining evidence gaps**, and **Promotion decision**. No runtime authority.
