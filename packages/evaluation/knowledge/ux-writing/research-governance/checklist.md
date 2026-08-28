# UX-Writing Research and Governance Checklist

Use this proposal-only checklist from question framing through retirement. A checked item records reviewed evidence; it does not itself approve research, release, data use, or training.

## 1. Decision and Scope

- [ ] The decision, owner, purpose, population, task, surface, state, locale, and risk are explicit.
- [ ] User, organization, and affected-party outcomes and conflicts are recorded.
- [ ] Non-goals and prohibited inference are defined.
- [ ] Acceptance, abstention, escalation, rollback, and retirement criteria are set.
- [ ] Required current external authority is identified.

## 2. Evidence Classification

- [ ] Every claim is classified as deterministic, specialist, research, or preference.
- [ ] Source identity, locator, version, scope, currency, authority, and allowed use are present.
- [ ] Practitioner evidence is not acting as policy, law, product state, or conformance proof.
- [ ] Generated content does not cite itself as evidence.
- [ ] Contradictory and missing evidence is preserved.
- [ ] Claims remain no broader than their sources and methods.

## 3. Research Design

- [ ] The hypothesis and decision link are explicit.
- [ ] Population, exclusions, affected parties, and low-frequency high-consequence groups are addressed.
- [ ] Recruitment, consent, protocol, materials, setting, and data handling are approved.
- [ ] The method can support the intended inference.
- [ ] Ordinary, interrupted, repeated, and adverse contexts are included as applicable.
- [ ] Analysis plan, limitations, stopping rules, and unanswered questions are recorded.

## 4. Measurement

- [ ] Primary outcome describes intended user and system state.
- [ ] Metric definition, source/event, denominator, window, and owner are versioned.
- [ ] Countermetrics cover error, harm, regret, reversal, complaint, exclusion, and operational transfer.
- [ ] Meaningful segments are predefined without unsafe deanonymization.
- [ ] Missing data, instrumentation drift, novelty, and seasonality are considered.
- [ ] Correlation, attribution, and causation are not conflated.
- [ ] A favorable soft metric cannot waive a hard failure.

## 5. Rule Proposal

- [ ] Rule identity, classification, scope, conditions, inputs, and operator vocabulary are defined.
- [ ] Pass, fail, unknown, not-applicable, specialist, and research behavior is explicit.
- [ ] Reason codes, repair output, precedence, and conflicts are documented.
- [ ] Ordinary, boundary, adverse, unknown, and not-applicable fixtures are original and present.
- [ ] False-positive and false-negative risks are reviewed.
- [ ] The smallest evidence-supported scope is used.

## 6. Roles and Approval

- [ ] Request, evidence, research, rule, evaluation, implementation, monitoring, and audit owners are named.
- [ ] Required domain, accessibility, locale, privacy, security, and affected-population review is complete.
- [ ] Role conflicts and separation-of-duties decisions are recorded.
- [ ] Approval binds exact digest, version, scope, conditions, residual risk, effective date, and review date.
- [ ] Merge, use, silence, or popularity is not treated as approval.
- [ ] Inactive approval and release activation remain separate decisions.

## 7. Version and Release

- [ ] Released artifacts are immutable and content-addressed.
- [ ] Material changes create a successor version.
- [ ] Migration, compatibility, fixtures, rollout, and rollback are defined.
- [ ] Canonical input and rule-pack digests produce replayable deterministic output.
- [ ] Evaluator version, rule order, evidence, reason codes, and timestamp are retained.
- [ ] Existing records and open findings have an explicit migration disposition.

## 8. Monitoring and Correction

- [ ] Release links to build, runtime observation, incidents, complaints, and corrections.
- [ ] Monitoring stays within approved purpose and data boundaries.
- [ ] Countermetrics and affected-population segments are reviewed on schedule.
- [ ] Evidence expiry, ownership loss, runtime drift, and authority changes trigger review.
- [ ] Suspension prevents new decisions while preserving history.
- [ ] Corrections identify affected releases, records, users, and remedy owners as applicable.

## 9. Retirement

- [ ] Retirement reason, effective date, approver, and successor are recorded.
- [ ] New application is blocked while historical replay remains possible.
- [ ] Affected rules, releases, findings, and implementations are inventoried.
- [ ] Remediation, notification, rollback, or re-evaluation is assigned.
- [ ] Source and decision history remain auditable under retention policy.

## 10. Training and Learning Boundary

- [ ] Training, retrieval, exemplar, preference, and rule-learning uses are separately classified.
- [ ] Operational acceptance is not treated as training authorization.
- [ ] Purpose, provenance, rights, consent or governing basis, and accountable owner are approved.
- [ ] Sensitive-data minimization, security, retention, deletion, and nonuse behavior are defined.
- [ ] Population scope, quality, bias, harm, memorization, and contamination are reviewed.
- [ ] Dataset and configuration digests bind the approval.
- [ ] Revocation, correction, and incident response are operable where required.

## 11. Final Disposition

- [ ] Hard planes passed before preferences were evaluated.
- [ ] Material unknowns produce `needs_evidence`, not invented resolution.
- [ ] Human-outcome claims without evidence produce `research_required`.
- [ ] Governed judgments without authority produce `specialist_review`.
- [ ] Only approved, active, unexpired versions can affect decisions.
- [ ] The complete request-to-retirement lineage can be reconstructed.

## Lineage

Synthesized from lifecycle/lineage, hard-before-soft evaluation, evidence classification, competency/method mapping, research criteria, abstention, remaining gaps, and promotion decision in the cross-book synthesis. Proposal-only; implementation authority remains `none`.
