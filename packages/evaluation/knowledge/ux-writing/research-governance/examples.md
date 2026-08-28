# UX-Writing Research and Governance Examples

All examples are original synthetic governance scenarios in a proposal-only pack. They are not approved studies, rules, metrics, or training practices.

## 1. Preference Masquerading as a Rule

### Weak proposal

```yaml
claim: Every error message must sound cheerful.
classification: deterministic
evidence: The brand team prefers optimism.
```

**Problems:** Preference is mislabeled as universal behavior; state, consequence, locale, and affected-population evidence are absent.

### Governed proposal

```yaml
claim: Use the approved optimistic voice only after truth and recovery pass.
classification: preference
scope: low-risk account settings, en-US
blocked_when: [loss, denial, unknown_outcome, safety_incident]
approval_status: draft
```

**Why:** It preserves preference while bounding its authority.

## 2. Click Rate as False Success

**Scenario:** A new cancellation page raises “Keep plan” clicks by 18%.

### Invalid conclusion

```text
The copy improved user outcomes, so promote the retention pattern globally.
```

### Required evidence record

```yaml
primary_metric: intentional_plan_retention
countermetrics:
  - cancellation_completion
  - repeated_cancel_attempts
  - support_contacts
  - refunds_and_disputes
  - regret_after_7_days
segments: [assistive_technology, locale, tenure, prior_cancel_attempt]
disposition: research_required
```

**Why:** A click does not distinguish informed retention from obstruction or confusion.

## 3. Narrow Study, Broad Claim

**Scenario:** Six experienced desktop users understand an abbreviated control label in a moderated session.

### Invalid promotion

```yaml
rule: The abbreviation is universally clear.
status: active
```

### Bounded finding

```yaml
finding: Participants in this study interpreted the label as intended.
population: experienced desktop users, en-US
limitations: [small_sample, moderated_setting, no_mobile, no_AT, no_repeat_use]
next_step: test excluded and high-consequence populations
status: research_finding
```

**Why:** The finding retains population and method limits.

## 4. Deterministic Terminology Check

**Facts:** An approved terminology record requires “workspace owner” for one product scope and locale.

```yaml
rule_id: TERM-017
classification: deterministic
condition: component_scope == workspace_admin && locale == en-US
assertion: role_label == "workspace owner"
unknown_when: terminology_record_missing_or_expired
fixtures: [ordinary_match, prohibited_synonym, other_scope_not_applicable]
```

**Why:** The rule checks an approved exact contract without claiming the term is universally best.

## 5. Rule Promotion Packet

```yaml
proposal_id: RG-P-042
claim: Unknown payment outcomes must not offer unconditional retry.
evidence_refs: [runtime_state_contract_v3, payment_risk_review_12]
classification: deterministic
fixtures:
  - confirmed_failure_retry_allowed
  - pending_outcome_retry_blocked
  - duplicate_risk_adverse
  - non_transaction_not_applicable
reviewers: [payments_owner, risk_specialist, accessibility_reviewer]
status: approved_inactive
version: 1.0.0
release_condition: evaluator_replay_and_UI_runtime_tests_pass
```

**Why:** Evidence, classification, fixtures, roles, state, version, and release gate are explicit.

## 6. Versioned Change and Rollback

**Scenario:** Rule `RECOVERY-004@1.1.0` adds a required support route for partial submissions.

```yaml
change_type: material
successor: RECOVERY-004@1.1.0
predecessor: RECOVERY-004@1.0.0
migration: map partial_submission fixtures to support_route_required
compatibility: new hard finding for previously advisory cases
rollback: restore pack digest 8f2a and suspend 1.1.0
monitor: [false_positive_rate, abandoned_recovery, support_route_failures]
```

**Why:** Released logic is not edited in place, and reversal is reproducible.

## 7. Retirement After Evidence Drift

**Facts:** A platform update removes the state transition that a rule evaluates.

```yaml
rule: STATE-031@2.0.0
status: retired
reason: referenced transition removed in runtime contract v9
effective_end: 2026-11-01
successor: none
affected_releases: [web-2026.09, ios-2026.10]
remediation: re-evaluate open findings as not_applicable
history_retained: true
```

**Why:** Retirement prevents new use while preserving audit history and remediation.

## 8. Generated Examples Are Not Training Data

**Scenario:** Reviewers accepted 400 generated error-message candidates.

### Invalid assumption

```text
Acceptance makes these safe to add automatically to the next training set.
```

### Required disposition

```yaml
training_use: prohibited_pending_separate_review
needed:
  - defined training purpose and accountable owner
  - provenance and rights review
  - sensitive-data and memorization assessment
  - population and bias/harm review
  - retention, deletion, security, and nonuse behavior
  - explicit approval tied to an immutable dataset digest
```

**Why:** Content approval and training authorization are different decisions.

## 9. Audit Replay

```yaml
review_id: UXREV-908
input_digest: sha256:input-a4e1
rule_pack_digest: sha256:pack-38bd
evaluator_version: 0.8.0
applied_rules: [STATE-002@1.0.0, RECOVERY-004@1.1.0]
outcomes: [pass, fail]
reason_codes: [STATE_MATCH, SUPPORT_ROUTE_MISSING]
evidence_refs: [build-772-state-log, approved-support-contract]
```

**Why:** Another evaluator can reconstruct the deterministic decision without relying on narrative memory.

## Lineage

Patterns were synthesized from lifecycle, evidence classification, hard-before-soft evaluation, method mapping, research criteria, abstention, gaps, and promotion sections of the cross-book synthesis. No book example or prose was copied.
