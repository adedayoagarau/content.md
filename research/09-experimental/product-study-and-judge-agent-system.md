---
title: Product-study and judge-agent system
status: proposed
started: 2026-08-17
updated: 2026-08-18
evidence_cutoff: 2026-08-18
scope: Bounded study, evidence, specialist-judgment, safety, and adjudication agents for product comparisons
---

# Product-study and judge-agent system

## Result and evidence boundary

**[Proposal]** Use a separated evidence-and-judgment pipeline to study products for the `content.md` program. Operators collect reproducible observations; recorders preserve provenance; deterministic evaluators resolve exact checks; independent contextual judges assess craft and risk; a safety auditor tests containment; and an adjudicator preserves rather than hides disagreement.

The system inherits the claim discipline in the [research protocol](../00-method/research-protocol.md), the gated [end-to-end workflow](../02-workflow/end-to-end-workflow.md), the layered [evaluation model](../06-evaluation/evaluation-and-benchmarks.md), the current [landscape](../07-landscape/prior-art-and-open-standards.md), and the capability boundaries in [security, privacy, and trust boundaries](../05-technology/security-privacy-and-trust-boundaries.md). It operationalizes the [product desktop study](product-desktop-study-protocol.md), [shared benchmark fixture](shared-benchmark-fixture-specification.md), and [voice/tone measurement model](voice-tone-graph-and-measurement.md).

**[Inference]** A product demonstration can establish bounded behavior in one tested version, tier, fixture, and environment. It cannot establish universal capability, production outcome, approval, compliance, safety, or user benefit.

**[Proposal]** This document is a design contract. It does not implement agents, approve tools or data processing, authorize a study, create benchmark gold, or validate thresholds.

Track A (`SIBF-CHK-001` and its exposed evaluator) is public development/calibration material, permanently non-B1/private-holdout-ineligible, and cannot be promoted, resealed, renamed, or split into Track B. Every future Track B/B1 study ID, task/packet ID, package, behavior/unknown/conflict/defect/security/mutation set, locale/channel/modality scope, candidate/occurrence/exclusion/expression/message denominator, Stage 5/6 denominator, gold requirement, and evaluator requirement must resolve from one exact approved Track B release and signed manifest. Track A identifiers and values are never defaults or B1 requirements.

The authority sequence is exact: a hash-bound design-only disposition may permit drafting a separate scoped fixture-work authorization; only that later authorization may permit its named authoring/materialization; an exact release decision must approve the resulting fixture; only that exact release may bind `r2` and precede architecture approval. Design approval alone grants none of the later authorities, and no agent in this system may infer or issue them.

## Non-goals

The system does not:

- produce one opaque overall quality score or universal product winner;
- infer approval, authority, applicability, release, or user outcome from fluent output or implementation;
- replace qualified content, engineering, accessibility, localization, security, legal, privacy, or domain reviewers;
- treat a model judge as ground truth, an authorization service, or an approver;
- infer AI authorship from writing style;
- let a candidate, operator, or judge edit the rubric, gold set, baseline, policy, or audit log during a run;
- perform production writes, publication, customer communication, purchases, or tests on personal or production workspaces; or
- compare products outside their declared and exercised scope as though missing scope were a quality defect.

## Architecture and invariants

```text
study charter + sealed operator packet + exact grants
  -> navigator/operator -> evidence recorder -> immutable evidence bundle
  -> claim verifier + deterministic rule evaluator
  -> blinded specialist context judges + safety/adversarial auditor
  -> criterion-level judgments + abstentions + disagreements
  -> synthesis/adjudication agent -> human decision owner
  -> deblind, report, archive, calibrate
```

**[Proposal]** The following invariants apply:

1. Evidence sources, governing applicability, accountable owners, approvers, decisions, delivery, communication attempts, evaluation records, capability grants, and change approvals remain separate record families.
2. Every finding cites criterion-level evidence IDs and exact spans, coordinates, captures, or deterministic result IDs.
3. Hard factual, structural, control, and safety results use `pass`, `fail`, `unknown`, or `not_applicable`; `unknown` is not half a pass.
4. Soft craft judgments remain a vector by criterion. No average can rescue a hard failure.
5. Severity, confidence, and quality are separate. A low-confidence critical possibility is escalated, not averaged.
6. Original ratings, rationales, abstentions, and expert disagreements are immutable after submission.
7. The operator package never contains evaluator gold. Hidden gold and adversarial cases stay sealed until scoring.
8. An agent may preserve or narrow authority through delegation; it may not widen authority or self-authorize.
9. Product content, vendor pages, repositories, tool output, model output, and judge-visible candidate text are untrusted data.
10. A user-outcome claim requires representative-user or production evidence; expert or model judgment cannot manufacture it.

## Agent contracts

All agents receive a versioned role prompt, study/run/task IDs, a bounded input packet, a capability manifest, a budget, and stop rules. All return schema-valid records or an explicit abstention/block; prose without a typed record is invalid.

| Role | Inputs | Allowed work and tools | Required outputs | Forbidden boundary |
| --- | --- | --- | --- | --- |
| **Navigator/operator (`study_agent`)** | Operator packet, exact task script, clean fixture, allowed apps/origins/actions, task grant | Navigate or operate the tested product in a dedicated profile; invoke only pre-authorized paths; capture start and terminal states | Action trace, terminal task state, effect inventory, cleanup status, evidence handoff | Does not score quality, read gold, improvise scope, accept new permissions, or infer backend success from a label |
| **Evidence recorder** | Operator trace and approved captures | Hash, redact, classify, link, and store evidence through the trusted append-only sink | Evidence records, source records, capture manifest, missing-evidence flags | Does not decide claims, choose winners, rewrite observations, or retain secrets/raw private content by default |
| **Claim verifier** | Unblinded vendor claims, primary sources, bounded observations | Compare each documented claim with exercised behavior and source scope; may use authorized public-source reads | `consistent-in-tested-scope`, `partially-observed`, `contradicted-in-tested-scope`, `not-exercised`, or `not-observable`, with limitations | Does not turn documentation into capability evidence or one fixture into a universal negative/positive claim |
| **Code/repository analyst (`rule_evaluator`)** | Blinded fixture/output, parser results, gold-access token for evaluator-only checks | Run schema, hash, extraction, structure, scope, variable, selector, markup, key, locale, path, and effect checks | Per-rule four-valued results, denominators, coordinates, structural defects | Does not judge tone, user benefit, legal meaning, or execute repository code under static discovery |
| **UX/content analyst (`context_judge.ux`)** | Blinded rendered task, behavior packet, user/job/state context, applicable rubric | Judge problem fit, journey/state coverage, hierarchy, clarity, action, consequence, recovery, and uncertainty | Criterion-level soft ratings, findings, evidence spans, abstentions | Does not infer missing behavior, approval, research findings, or source authority |
| **Voice/tone judge (`context_judge.voice_tone`)** | Blinded candidates, approved voice principles/examples, typed event/risk/surface context | Judge organization-voice behaviors and situational-tone fit separately; run counterfactual checks | Per-principle and per-tone-dimension ratings, context-to-rule trace, uncertainty | Does not infer personality from industry/demographics, use one brand-tone score, or let style offset meaning loss |
| **Domain-risk judge (`context_judge.domain_risk`)** | Controlled facts, known unknowns, risk/state packet, applicable instruments and owner records | Identify unsupported consequential claims, harm paths, recourse, fairness/trust issues, and required expert route | Claim-slot findings, severity, accountable expertise needed, abstention/escalation | Does not provide legal/medical/financial approval, decide applicability, or invent owner/approver authority |
| **Accessibility/localization judge (`context_judge.access_locale`)** | Rendered/nonvisual evidence, structure report, locale packets, qualified-review scope | Keep accessibility and localization as two independent subreviews; assess semantics, announcements, names, direction, formats, meaning, and cultural questions | Separate accessibility and locale findings per language/surface, method and limitations | Automated checks do not establish accessibility; machine translation or source-language judgment does not establish in-market quality |
| **Adversarial judge (`safety_auditor`)** | Sealed adversarial manifest, taint/effect logs, denial results, candidate output | Test injection containment, authority confusion, canary egress, unsafe retries, hidden edits, scope escalation, and cleanup | Attack-by-attack disposition, observed effects, blocker status, incident record | Has no broader tools than the tested task, uses inert fixtures only, and never turns an attack string into an instruction |
| **Synthesis/adjudication agent (`adjudicator`)** | Locked independent judgments, evidence graph, disagreement triggers, hard-gate results | Reconcile references, classify disagreements, summarize Pareto tradeoffs, request human adjudication, then deblind | Criterion scorecard, preserved dissent, adjudication records, bounded recommendation or `insufficient_evidence` | Cannot create evidence, rerun tools, change gold/rubric, majority-vote protected expertise away, or authorize release/write |

For high-risk, locale-specific, or accessibility decisions, “two judges” means two independent instances plus the required qualified human expertise; repeating the same model prompt is not expert diversity.

## Capability and access boundary

**[Proposal]** The trusted control plane, not an agent prompt, checks every operation against the declared phase, applicable SEC-P0 result, exact task grant, connection/data-processing/memory/telemetry dispositions, and any separately required approval.

- `discover.local`: exact enrolled fixture root, static read only, no process or network.
- `research.external`: exact allowlisted public origins and purpose-bounded fetches only, with no local secrets or connector tokens.
- `connector.read`: named public origins and read operations only, with P0-B and the applicable connection/data-processing controls when a connected read or provider path is used.
- `connector.disconnect`: a control-plane-only disconnect or credential/session revocation for the exact connector, tenant, account, and credential set; it cannot mutate product content.
- `model.infer`: minimized, redacted packet under an approved provider/data path.
- `verify.runtime`: exact product/tool/build/profile/actions/origins under P0-G, with an ephemeral workspace and cleanup.
- `draft.patch`: inert benchmark answer artifact only.
- `apply.local` or `connector.write`: absent from the first pilot. A later disposable-write study requires its own phase gate, grant, exact mutation approval, expected-current guard, readback, and cleanup.
- `admin.policy`, production credentials, personal browser sessions, arbitrary shell, unrestricted browsing, purchase, publication, and customer communication are never available to study or judge agents.

The evidence recorder's append-only sink is a trusted service API, not a general filesystem write. Each append is still an independently authorized operation with a current phase result, exact grant, applicable control records, schema/policy versions, and audit event; “trusted” never creates standing write authority. Judges receive content-addressed, read-only packets and no product account, browser, connector, shell, or prior-judge output.

## Evidence and state model

Use stable IDs for `study`, `condition`, `task`, `run`, `source`, `claim`, `evidence`, `finding`, `judgment`, `pairwise`, `adjudication`, and `audit_event`. Raw evidence is content-addressed; correction creates a superseding record.

| Record | Required distinction |
| --- | --- |
| Source | Canonical source type, material kind, evidence basis and role, origin, publisher/custodian, scope, access mode/date, version, and limitations |
| Evidence | Observation strength, challenge, freshness, lineage, epistemic qualifier, taint, data class, transformation/redaction history |
| Claim | Canonical claim label, exact proposition, scope, supporting/challenging evidence, unresolved conflicts |
| Finding | Criterion, observed problem, evidence IDs/spans, rule/source IDs, severity, uncertainty, affected actor/state |
| Judgment | Hard result or soft rating, confidence/calibration profile, rationale, abstention, judge/version/blinding metadata |
| Pairwise | Two immutable candidate-output references, one criterion, blinded/counterbalanced presentation, outcome, evidence, candidate-specific hard-gate precondition, mirror reference, uncertainty, rationale |
| Decision/delivery | Referenced but never inferred from evidence or judgment; states remain independent |
| Adjudication | Original judgment IDs, disagreement type, accountable expertise, disposition and rationale |
| Audit | Actor/workload, action, policy result, grants, hashes, effects, cleanup, previous/event hash |

## JSON schemas

The following are minimal interchange schemas; the harness may add versioned fields but must not remove required fields or accept unknown fields silently.

### Source record

`source_type` uses the research protocol's 13 canonical source-type labels as snake-case wire values. `material_kind`, `evidence_basis`, `evidentiary_role`, and `access_mode` are independent metadata; none is a claim label or substitutes for an evidence record.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ProductStudySourceRecord",
  "type": "object",
  "additionalProperties": false,
  "required": ["schema_version", "source_id", "source_type", "material_kind", "evidence_basis", "evidentiary_role", "locator", "publisher_or_custodian", "scope", "access_mode", "accessed_at", "version_or_date", "content_hash_algorithm", "content_hash", "limitations"],
  "properties": {
    "schema_version": {"type": "string"},
    "source_id": {"type": "string", "pattern": "^SRC-"},
    "source_type": {"enum": ["law", "regulation", "normative_standard", "model_law", "official_guidance", "discussion_paper", "enforcement_action", "original_research", "professional_body", "documented_organizational_practice", "practitioner_account", "vendor_documentation", "commentary"]},
    "material_kind": {"enum": ["web_page", "document", "project_specification", "repository", "code_or_configuration", "design_artifact", "content_artifact", "interview_or_transcript", "desktop_capture", "runtime_trace", "run_artifact", "deterministic_output", "dataset", "other_material"]},
    "evidence_basis": {"enum": ["direct_material", "participant_report", "artifact_observation", "runtime_observation", "deterministic_result", "derived_transform", "metadata_only"]},
    "evidentiary_role": {"enum": ["direct_support", "contextual_evidence", "counterexample", "implementation_precedent", "market_signal", "other_bounded_role"]},
    "locator": {"type": "string", "minLength": 1},
    "publisher_or_custodian": {"type": "string", "minLength": 1},
    "scope": {"type": "object"},
    "access_mode": {"enum": ["direct_full_text", "direct_artifact_inspection", "transcript_reviewed", "abstract_only", "metadata_only", "not_directly_accessible"]},
    "accessed_at": {"type": "string", "format": "date-time"},
    "version_or_date": {"type": ["string", "null"]},
    "content_hash_algorithm": {"enum": ["sha256", "sha512"]},
    "content_hash": {"type": "string"},
    "limitations": {"type": "array", "minItems": 1, "items": {"type": "string"}}
  },
  "allOf": [
    {
      "if": {"properties": {"content_hash_algorithm": {"const": "sha256"}}, "required": ["content_hash_algorithm"]},
      "then": {"properties": {"content_hash": {"pattern": "^[a-f0-9]{64}$"}}}
    },
    {
      "if": {"properties": {"content_hash_algorithm": {"const": "sha512"}}, "required": ["content_hash_algorithm"]},
      "then": {"properties": {"content_hash": {"pattern": "^[a-f0-9]{128}$"}}}
    }
  ]
}
```

### Claim record

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ProductStudyClaimRecord",
  "type": "object",
  "additionalProperties": false,
  "required": ["schema_version", "claim_id", "canonical_claim_label", "proposition", "scope", "source_refs", "supporting_evidence_refs", "challenging_evidence_refs", "relation_to_tested_behavior", "limitations"],
  "properties": {
    "schema_version": {"type": "string"},
    "claim_id": {"type": "string", "pattern": "^CL-"},
    "canonical_claim_label": {"enum": ["sourced_fact", "documented_practice", "research_finding", "cross_source_finding", "inference", "proposal", "product_hypothesis", "open_question"]},
    "proposition": {"type": "string", "minLength": 1},
    "scope": {"type": "object"},
    "source_refs": {"type": "array", "minItems": 1, "items": {"type": "string"}},
    "supporting_evidence_refs": {"type": "array", "items": {"type": "string"}},
    "challenging_evidence_refs": {"type": "array", "items": {"type": "string"}},
    "relation_to_tested_behavior": {"enum": ["consistent-in-tested-scope", "partially-observed", "contradicted-in-tested-scope", "not-exercised", "not-observable"]},
    "limitations": {"type": "array", "minItems": 1, "items": {"type": "string"}}
  }
}
```

### Evidence record

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ProductStudyEvidenceRecord",
  "type": "object",
  "additionalProperties": false,
  "required": ["schema_version", "evidence_id", "study_id", "run_id", "task_id", "condition_id", "evidence_kind", "source_refs", "related_claim_ids", "locator", "captured_at", "content_hash_algorithm", "content_hash", "dimensions", "scope", "taint", "data_class", "transformation_lineage", "limitations"],
  "properties": {
    "schema_version": {"type": "string"},
    "evidence_id": {"type": "string", "pattern": "^EV-"},
    "study_id": {"type": "string"},
    "run_id": {"type": "string"},
    "task_id": {"type": "string"},
    "condition_id": {"type": "string"},
    "evidence_kind": {"enum": ["desktop_observation", "capture", "deterministic_result", "effect", "cleanup"]},
    "source_refs": {"type": "array", "minItems": 1, "items": {"type": "string"}},
    "related_claim_ids": {"type": "array", "items": {"type": "string"}},
    "locator": {"type": "string", "minLength": 1},
    "captured_at": {"type": "string", "format": "date-time"},
    "content_hash_algorithm": {"enum": ["sha256", "sha512"]},
    "content_hash": {"type": "string"},
    "dimensions": {
      "type": "object", "additionalProperties": false,
      "required": ["observation_strength", "challenge", "freshness", "lineage", "epistemic_qualifier"],
      "properties": {
        "observation_strength": {"enum": ["unobserved", "observed", "corroborated"]},
        "challenge": {"enum": ["undisputed", "disputed"]},
        "freshness": {"enum": ["current", "stale"]},
        "lineage": {"enum": ["active", "superseded"]},
        "epistemic_qualifier": {"enum": ["none", "inferred", "assumed"]}
      }
    },
    "scope": {"type": "object", "required": ["product_version", "surface", "locale", "state"], "additionalProperties": {"type": ["string", "null"]}},
    "taint": {"enum": ["trusted_control", "untrusted_product", "untrusted_repository", "untrusted_external", "model_output"]},
    "data_class": {"enum": ["public", "internal", "confidential", "personal", "sensitive_regulated", "secret", "security_telemetry"]},
    "redactions": {"type": "array", "items": {"type": "string"}},
    "transformation_lineage": {"type": "array", "items": {"type": "object", "required": ["operation", "actor_or_tool", "timestamp", "input_hash", "output_hash"], "properties": {"operation": {"type": "string"}, "actor_or_tool": {"type": "string"}, "timestamp": {"type": "string", "format": "date-time"}, "input_hash": {"type": "string"}, "output_hash": {"type": "string"}}, "additionalProperties": false}},
    "limitations": {"type": "array", "minItems": 1, "items": {"type": "string"}}
  },
  "allOf": [
    {
      "if": {"properties": {"content_hash_algorithm": {"const": "sha256"}}, "required": ["content_hash_algorithm"]},
      "then": {"properties": {"content_hash": {"pattern": "^[a-f0-9]{64}$"}}}
    },
    {
      "if": {"properties": {"content_hash_algorithm": {"const": "sha512"}}, "required": ["content_hash_algorithm"]},
      "then": {"properties": {"content_hash": {"pattern": "^[a-f0-9]{128}$"}}}
    }
  ]
}
```

### Criterion judgment record

`CriterionJudgmentRecord`, `PairwiseComparisonRecord`, and `AdjudicationRecord` use one non-self-referential record-hash contract. `record_hash_algorithm` is `sha256`; `record_hash_canonical_serialization` is `rfc8785_jcs`; and `record_hash_preimage_contract` is `complete_record_excluding_only_top_level_record_hash`. The preimage is RFC 8785/JCS over the complete record after removing only its top-level `record_hash` member, encoded as UTF-8; it includes the other three hash-contract fields. `record_hash` is the lowercase hexadecimal SHA-256 digest of that preimage. No validator may remove, normalize, reorder, or default any other field before hashing.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "CriterionJudgmentRecord",
  "type": "object",
  "additionalProperties": false,
  "required": ["schema_version", "judgment_id", "study_id", "run_id", "task_id", "condition_id", "candidate_output_record_id", "judge_role", "judge_version", "rubric_version", "blindness", "criterion_id", "plane", "status", "rating", "evidence_refs", "severity", "confidence_status", "confidence", "calibration_profile_id", "ordinal_uncertainty", "rationale", "abstention_reason", "human_review_required", "record_hash_algorithm", "record_hash_canonical_serialization", "record_hash_preimage_contract", "record_hash"],
  "properties": {
    "schema_version": {"type": "string", "minLength": 1},
    "judgment_id": {"type": "string", "pattern": "^J-"},
    "study_id": {"type": "string"},
    "run_id": {"type": "string"},
    "task_id": {"type": "string", "minLength": 1},
    "condition_id": {"type": "string", "minLength": 1},
    "candidate_output_record_id": {"type": "string", "minLength": 1},
    "judge_role": {"type": "string"},
    "judge_version": {"type": "string"},
    "rubric_version": {"type": "string"},
    "blindness": {"enum": ["identity_blind", "condition_blind", "unblinded_required", "breached"]},
    "criterion_id": {"type": "string"},
    "plane": {"enum": ["hard", "soft"]},
    "status": {"enum": ["pass", "fail", "unknown", "not_applicable", "rated", "abstained", "insufficient_evidence", "invalid"]},
    "rating": {"type": ["integer", "null"], "minimum": 0, "maximum": 4},
    "evidence_refs": {"type": "array", "minItems": 1, "items": {"type": "object", "required": ["evidence_id", "span_or_coordinate"], "properties": {"evidence_id": {"type": "string"}, "span_or_coordinate": {"type": "string"}}, "additionalProperties": false}},
    "rule_ids": {"type": "array", "items": {"type": "string"}},
    "severity": {"enum": ["critical", "high", "medium", "low", "none"]},
    "confidence_status": {"enum": ["calibrated", "uncalibrated", "not_applicable"]},
    "confidence": {"type": ["number", "null"], "minimum": 0, "maximum": 1},
    "calibration_profile_id": {"type": ["string", "null"]},
    "ordinal_uncertainty": {"enum": ["low", "medium", "high", "not_applicable"]},
    "rationale": {"type": "string", "minLength": 1},
    "counterevidence_refs": {"type": "array", "items": {"type": "string"}},
    "abstention_reason": {"type": ["string", "null"]},
    "human_review_required": {"type": "boolean"},
    "record_hash_algorithm": {"const": "sha256"},
    "record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
    "record_hash_preimage_contract": {"const": "complete_record_excluding_only_top_level_record_hash"},
    "record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
  },
  "allOf": [
    {
      "if": {"properties": {"plane": {"const": "hard"}}, "required": ["plane"]},
      "then": {"properties": {"status": {"enum": ["pass", "fail", "unknown", "not_applicable", "invalid"]}}}
    },
    {
      "if": {"properties": {"plane": {"const": "soft"}}, "required": ["plane"]},
      "then": {"properties": {"status": {"enum": ["rated", "abstained", "insufficient_evidence", "not_applicable", "invalid"]}}}
    },
    {
      "oneOf": [
        {"properties": {"status": {"const": "rated"}, "rating": {"type": "integer", "minimum": 0, "maximum": 4}, "abstention_reason": {"type": "null"}, "confidence_status": {"enum": ["calibrated", "uncalibrated"]}}},
        {"properties": {"status": {"const": "abstained"}, "rating": {"type": "null"}, "abstention_reason": {"type": "string", "minLength": 1}, "confidence_status": {"const": "not_applicable"}}},
        {"properties": {"status": {"const": "insufficient_evidence"}, "rating": {"type": "null"}, "abstention_reason": {"type": "string", "minLength": 1}, "confidence_status": {"const": "not_applicable"}}},
        {"properties": {"status": {"const": "pass"}, "rating": {"type": "null"}, "abstention_reason": {"type": "null"}}},
        {"properties": {"status": {"const": "fail"}, "rating": {"type": "null"}, "abstention_reason": {"type": "null"}}},
        {"properties": {"status": {"const": "unknown"}, "rating": {"type": "null"}, "abstention_reason": {"type": "null"}, "confidence_status": {"const": "not_applicable"}}},
        {"properties": {"status": {"const": "not_applicable"}, "rating": {"type": "null"}, "abstention_reason": {"type": "null"}, "confidence_status": {"const": "not_applicable"}}},
        {"properties": {"status": {"const": "invalid"}, "rating": {"type": "null"}, "abstention_reason": {"type": "null"}, "confidence_status": {"const": "not_applicable"}}}
      ]
    },
    {
      "oneOf": [
        {"properties": {"confidence_status": {"const": "calibrated"}, "confidence": {"type": "number", "minimum": 0, "maximum": 1}, "calibration_profile_id": {"type": "string", "minLength": 1}, "ordinal_uncertainty": {"const": "not_applicable"}}},
        {"properties": {"confidence_status": {"const": "uncalibrated"}, "confidence": {"type": "null"}, "calibration_profile_id": {"type": "null"}, "ordinal_uncertainty": {"enum": ["low", "medium", "high"]}}},
        {"properties": {"confidence_status": {"const": "not_applicable"}, "confidence": {"type": "null"}, "calibration_profile_id": {"type": "null"}, "ordinal_uncertainty": {"const": "not_applicable"}}}
      ]
    }
  ]
}
```

### Pairwise comparison record

A pairwise record is invalid unless its hard-gate precondition resolves to a final locked eight-PASS ledger. A `hard_pass_reference` dispatches explicitly to either a direct locked `CriterionJudgmentRecord` or a locked `AdjudicationRecord`'s embedded `hard_gate_disposition`; both source-record types use SHA-256 over RFC 8785/JCS after excluding only the source record's top-level `record_hash`. For an adjudicated source, the reference also binds the embedded disposition ID, result ID, and disposition hash. In `PSJ-B0-001`, every reference additionally binds the source record's immutable append receipt, receipt hash, and record lock. The validator dereferences and recomputes the source and receipt hashes; requires the receipt's primary record ID, schema version, persisted-record hash, lock ID/version/time, append result, sink, and phase/grant/control bindings to match the reference; then loads the exact disposition result and requires its candidate, task, condition, output, criterion, `pass` status, original judgments, and evidence to match the reference and applicable left/right candidate scope. If the immutable judgment ledger contains any conflicting original result for a candidate/criterion, a direct judgment reference is invalid; that gate must reference an adjudicated PASS disposition whose adjudication input set equals the complete original conflict set. This prevents selecting one passing judgment while hiding a fail, unknown, invalid, or competing result.

The hard-pass-set digest is SHA-256 over RFC 8785/JCS of the complete `hard_pass_refs` array after sorting references by UTF-8 bytewise ascending `(candidate_side, criterion_id, source_record_type, source_record_id, source_disposition_result_id)`; it excludes no fields. The validator also requires every source and embedded disposition to be locked no later than `verified_at`, and requires `verified_at < created_at`. For `PSJ-B0-001`, the schema requires exactly eight references: one final passing `HG-01`–`HG-04` result for the left candidate and one for the right candidate. Missing, duplicate, out-of-order, nonpassing, unlocked, hash-mismatched, evidence-invalid, or scope-mismatched references deny pairwise creation.

For `PSJ-B0-001`, `mirror_pairwise_id` is non-null. Before either record is accepted, the referential validator loads both records and requires distinct IDs, reciprocal mirror IDs, equal study/task/criterion/rubric and hard-pass-set scope, swapped left/right candidate references, and the outcome mapping `A ↔ B` while `indistinguishable`, `both_unacceptable`, and `insufficient_context` remain unchanged. A missing mirror, same-order mirror, nonreciprocal reference, criterion drift, or nonmirrored outcome invalidates both records.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "PairwiseComparisonRecord",
  "type": "object",
  "additionalProperties": false,
  "required": ["schema_version", "pairwise_id", "study_id", "run_id", "task_id", "criterion_id", "judge_role", "judge_version", "rubric_version", "blindness", "left_candidate", "right_candidate", "presentation_order_seed", "mirror_pairwise_id", "outcome", "left_evidence_refs", "right_evidence_refs", "hard_gate_precondition", "confidence_status", "confidence", "calibration_profile_id", "ordinal_uncertainty", "rationale", "created_at", "record_hash_algorithm", "record_hash_canonical_serialization", "record_hash_preimage_contract", "record_hash"],
  "properties": {
    "schema_version": {"type": "string", "minLength": 1},
    "pairwise_id": {"type": "string", "pattern": "^PW-"},
    "study_id": {"type": "string", "minLength": 1},
    "run_id": {"type": "string", "minLength": 1},
    "task_id": {"type": "string", "minLength": 1},
    "criterion_id": {"type": "string", "minLength": 1},
    "judge_role": {"type": "string", "minLength": 1},
    "judge_version": {"type": "string", "minLength": 1},
    "rubric_version": {"type": "string", "minLength": 1},
    "blindness": {"enum": ["identity_blind", "condition_blind", "unblinded_required", "breached"]},
    "left_candidate": {"$ref": "#/$defs/candidate_reference"},
    "right_candidate": {"$ref": "#/$defs/candidate_reference"},
    "presentation_order_seed": {"type": "string", "minLength": 1},
    "mirror_pairwise_id": {"type": ["string", "null"], "pattern": "^PW-"},
    "outcome": {"enum": ["A", "B", "indistinguishable", "both_unacceptable", "insufficient_context"]},
    "left_evidence_refs": {"type": "array", "minItems": 1, "items": {"$ref": "#/$defs/evidence_reference"}},
    "right_evidence_refs": {"type": "array", "minItems": 1, "items": {"$ref": "#/$defs/evidence_reference"}},
    "hard_gate_precondition": {"$ref": "#/$defs/hard_gate_precondition"},
    "confidence_status": {"enum": ["calibrated", "uncalibrated", "not_applicable"]},
    "confidence": {"type": ["number", "null"], "minimum": 0, "maximum": 1},
    "calibration_profile_id": {"type": ["string", "null"]},
    "ordinal_uncertainty": {"enum": ["low", "medium", "high", "not_applicable"]},
    "rationale": {"type": "string", "minLength": 1},
    "created_at": {"type": "string", "format": "date-time"},
    "record_hash_algorithm": {"const": "sha256"},
    "record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
    "record_hash_preimage_contract": {"const": "complete_record_excluding_only_top_level_record_hash"},
    "record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
  },
  "$defs": {
    "candidate_reference": {
      "type": "object",
      "additionalProperties": false,
      "required": ["candidate_label", "candidate_run_id", "condition_id", "output_record_id", "output_record_hash_algorithm", "output_record_hash_canonical_serialization", "output_record_hash_preimage_contract", "output_record_hash_excluded_top_level_fields", "output_record_hash"],
      "properties": {
        "candidate_label": {"type": "string", "minLength": 1},
        "candidate_run_id": {"type": "string", "minLength": 1},
        "condition_id": {"type": "string", "minLength": 1},
        "output_record_id": {"type": "string", "minLength": 1},
        "output_record_hash_algorithm": {"const": "sha256"},
        "output_record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "output_record_hash_preimage_contract": {"const": "complete_record_excluding_only_top_level_record_hash"},
        "output_record_hash_excluded_top_level_fields": {"type": "array", "minItems": 1, "maxItems": 1, "prefixItems": [{"const": "record_hash"}], "items": false},
        "output_record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
      }
    },
    "evidence_reference": {
      "type": "object",
      "additionalProperties": false,
      "required": ["evidence_id", "span_or_coordinate"],
      "properties": {
        "evidence_id": {"type": "string", "pattern": "^EV-"},
        "span_or_coordinate": {"type": "string", "minLength": 1}
      }
    },
    "hard_pass_reference": {
      "type": "object",
      "additionalProperties": false,
      "required": ["source_record_type", "source_record_id", "source_record_schema_version", "source_disposition_id", "source_disposition_result_id", "source_disposition_hash", "study_id", "candidate_side", "candidate_run_id", "task_id", "condition_id", "candidate_output_record_id", "criterion_id", "status", "locked_at", "source_record_hash_algorithm", "source_record_hash_canonical_serialization", "source_record_hash_preimage_contract", "source_record_hash_excluded_top_level_fields", "source_record_hash"],
      "properties": {
        "source_record_type": {"enum": ["criterion_judgment", "adjudication_hard_gate_disposition"]},
        "source_record_id": {"type": "string", "minLength": 1},
        "source_record_schema_version": {"type": "string", "minLength": 1},
        "source_disposition_id": {"type": "string"},
        "source_disposition_result_id": {"type": "string"},
        "source_disposition_hash": {"type": ["string", "null"], "pattern": "^[a-f0-9]{64}$"},
        "study_id": {"type": "string", "minLength": 1},
        "candidate_side": {"enum": ["left", "right"]},
        "candidate_run_id": {"type": "string", "minLength": 1},
        "task_id": {"type": "string", "minLength": 1},
        "condition_id": {"type": "string", "minLength": 1},
        "candidate_output_record_id": {"type": "string", "minLength": 1},
        "criterion_id": {"enum": ["HG-01", "HG-02", "HG-03", "HG-04", "HG-05", "HG-06", "HG-07", "HG-08"]},
        "status": {"const": "pass"},
        "locked_at": {"type": "string", "format": "date-time"},
        "source_record_hash_algorithm": {"const": "sha256"},
        "source_record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "source_record_hash_preimage_contract": {"const": "complete_record_excluding_only_top_level_record_hash"},
        "source_record_hash_excluded_top_level_fields": {"type": "array", "minItems": 1, "maxItems": 1, "prefixItems": [{"const": "record_hash"}], "items": false},
        "source_record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
        "persistence_receipt_id": {"type": "string", "pattern": "^B0AR-"},
        "persistence_receipt_schema_version": {"const": "1"},
        "persistence_receipt_hash_algorithm": {"const": "sha256"},
        "persistence_receipt_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "persistence_receipt_hash_preimage_contract": {"const": "complete_receipt_excluding_only_top_level_receipt_hash"},
        "persistence_receipt_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
        "record_lock_id": {"type": "string", "pattern": "^LOCK-"},
        "record_lock_version": {"type": "string", "minLength": 1}
      },
      "allOf": [
        {
          "if": {"properties": {"source_record_type": {"const": "criterion_judgment"}}, "required": ["source_record_type"]},
          "then": {"properties": {"source_record_id": {"pattern": "^J-"}, "source_disposition_id": {"const": ""}, "source_disposition_result_id": {"const": ""}, "source_disposition_hash": {"type": "null"}}}
        },
        {
          "if": {"properties": {"source_record_type": {"const": "adjudication_hard_gate_disposition"}}, "required": ["source_record_type"]},
          "then": {"properties": {"source_record_id": {"pattern": "^ADJ-"}, "source_disposition_id": {"pattern": "^HGD-", "minLength": 5}, "source_disposition_result_id": {"pattern": "^HGR-", "minLength": 5}, "source_disposition_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}}}
        },
        {
          "if": {"properties": {"study_id": {"const": "PSJ-B0-001"}}, "required": ["study_id"]},
          "then": {"required": ["persistence_receipt_id", "persistence_receipt_schema_version", "persistence_receipt_hash_algorithm", "persistence_receipt_hash_canonical_serialization", "persistence_receipt_hash_preimage_contract", "persistence_receipt_hash", "record_lock_id", "record_lock_version"]}
        }
      ]
    },
    "hard_gate_precondition": {
      "type": "object",
      "additionalProperties": false,
      "required": ["hard_gate_set_id", "validator_id", "validator_version", "verified_at", "hard_pass_refs", "hard_pass_set_hash_algorithm", "hard_pass_set_hash_canonical_serialization", "hard_pass_set_hash_ordering", "hard_pass_set_hash_preimage_contract", "hard_pass_set_hash_excluded_fields", "hard_pass_set_hash"],
      "properties": {
        "hard_gate_set_id": {"type": "string", "minLength": 1},
        "validator_id": {"type": "string", "minLength": 1},
        "validator_version": {"type": "string", "minLength": 1},
        "verified_at": {"type": "string", "format": "date-time"},
        "hard_pass_refs": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"$ref": "#/$defs/hard_pass_reference"}},
        "hard_pass_set_hash_algorithm": {"const": "sha256"},
        "hard_pass_set_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "hard_pass_set_hash_ordering": {"const": "candidate_side_then_criterion_id_then_source_record_type_then_source_record_id_then_source_disposition_result_id_all_utf8_ascending"},
        "hard_pass_set_hash_preimage_contract": {"const": "rfc8785_jcs_of_complete_hard_pass_refs_sorted_by_declared_order"},
        "hard_pass_set_hash_excluded_fields": {"type": "array", "maxItems": 0},
        "hard_pass_set_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
      }
    }
  },
  "allOf": [
    {
      "oneOf": [
        {"properties": {"confidence_status": {"const": "calibrated"}, "confidence": {"type": "number", "minimum": 0, "maximum": 1}, "calibration_profile_id": {"type": "string", "minLength": 1}, "ordinal_uncertainty": {"const": "not_applicable"}}},
        {"properties": {"confidence_status": {"const": "uncalibrated"}, "confidence": {"type": "null"}, "calibration_profile_id": {"type": "null"}, "ordinal_uncertainty": {"enum": ["low", "medium", "high"]}}},
        {"properties": {"confidence_status": {"const": "not_applicable"}, "confidence": {"type": "null"}, "calibration_profile_id": {"type": "null"}, "ordinal_uncertainty": {"const": "not_applicable"}}}
      ]
    },
    {
      "if": {"properties": {"study_id": {"const": "PSJ-B0-001"}}, "required": ["study_id"]},
      "then": {
        "properties": {
          "mirror_pairwise_id": {"type": "string", "pattern": "^PW-"},
          "hard_gate_precondition": {
            "properties": {
              "hard_gate_set_id": {"const": "PSJ-B0-BOTH-CANDIDATES-HG-01-04-r1"},
              "hard_pass_refs": {
                "minItems": 8,
                "maxItems": 8,
                "allOf": [
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-01"}, "status": {"const": "pass"}}, "required": ["candidate_side", "criterion_id", "status"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-02"}, "status": {"const": "pass"}}, "required": ["candidate_side", "criterion_id", "status"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-03"}, "status": {"const": "pass"}}, "required": ["candidate_side", "criterion_id", "status"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-04"}, "status": {"const": "pass"}}, "required": ["candidate_side", "criterion_id", "status"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-01"}, "status": {"const": "pass"}}, "required": ["candidate_side", "criterion_id", "status"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-02"}, "status": {"const": "pass"}}, "required": ["candidate_side", "criterion_id", "status"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-03"}, "status": {"const": "pass"}}, "required": ["candidate_side", "criterion_id", "status"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-04"}, "status": {"const": "pass"}}, "required": ["candidate_side", "criterion_id", "status"]}, "minContains": 1, "maxContains": 1}
                ]
              }
            }
          }
        }
      }
    }
  ]
}
```

### Adjudication record

Adjudication consumes immutable records; it never rewrites them. Every `input_record_hashes` entry uses the same SHA-256/RFC 8785/JCS/only-`record_hash`-excluded contract. The deterministic validator requires an exact one-to-one match with the union of `original_judgment_ids` and `original_pairwise_ids`, dereferences and recomputes every record, and rejects missing, duplicate, extra, or mismatched inputs. For `PSJ-B0-001` hard-gate inputs, it also dereferences each required append receipt and requires its primary judgment ID, schema version, persisted-record hash, lock ID/version/time, and successful atomic commit to equal the `hard_judgment_reference`.

Two phases are intentionally distinct. A `pre_pairwise_hard_gate` adjudication requires `hard_result_conflict`, forbids pairwise inputs, and consumes the complete immutable original hard-judgment ledger for both candidate scopes; its input references may be `pass`, `fail`, `unknown`, `not_applicable`, or `invalid`. It has no all-PASS prerequisite. The referential validator requires at least one candidate/criterion to have genuinely conflicting original statuses or evidence, and requires the hard-input IDs to equal the applicable original-judgment IDs and their `input_record_hashes` exactly. It embeds a separately hashed and locked `hard_gate_disposition` with one resolved result per candidate/criterion. Each result's `source_judgment_ids` must equal exactly the hard-input judgments for that candidate/criterion; across all results they must cover the full input set without cross-scope references or omission. The input-set digest is SHA-256 over RFC 8785/JCS of the complete `hard_judgment_refs` array sorted bytewise by `(candidate_side, criterion_id, judgment_id)` with no exclusions. The embedded disposition digest is SHA-256 over RFC 8785/JCS of the complete disposition object after removing only its top-level `disposition_hash`, with results sorted bytewise by `(candidate_side, criterion_id, result_id)`. The disposition `overall_status` is `pass` iff every result is `pass`, `fail` iff at least one result is `fail`, and `unresolved` otherwise. Input records lock before input verification; verification precedes disposition creation; disposition locking precedes the enclosing adjudication's creation. Because the embedded disposition does not contain the enclosing record hash, the hash graph is acyclic.

A `post_pairwise` adjudication cannot carry `hard_result_conflict`, `hard_gate_input_set`, or `hard_gate_disposition`. A `pairwise_order_flip` adjudication is post-pairwise and references exactly the two reciprocal pairwise records. The validator dereferences both IDs and hashes and re-applies the reciprocal mirror, swapped-candidate, same-scope, and mapped-outcome checks before accepting the trigger. It does not claim to resolve a hard gate. Pairwise creation remains blocked until its own final candidate-specific eight-PASS ledger validates; where a hard conflict existed, that ledger must dereference the locked embedded disposition from the pre-pairwise adjudication.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AdjudicationRecord",
  "type": "object",
  "additionalProperties": false,
  "required": ["schema_version", "adjudication_id", "adjudication_phase", "study_id", "run_id", "task_id", "adjudicator_id", "adjudicator_version", "rubric_version", "left_candidate", "right_candidate", "trigger_types", "original_judgment_ids", "original_pairwise_ids", "input_record_hashes", "hard_gate_input_set", "hard_gate_disposition", "evidence_refs", "disposition", "rationale", "preserved_dissent", "accountable_expertise", "human_review_required", "human_review_route", "pre_adjudication_records_locked", "original_records_changed", "deblinding_state", "created_at", "record_hash_algorithm", "record_hash_canonical_serialization", "record_hash_preimage_contract", "record_hash"],
  "properties": {
    "schema_version": {"type": "string", "minLength": 1},
    "adjudication_id": {"type": "string", "pattern": "^ADJ-"},
    "adjudication_phase": {"enum": ["pre_pairwise_hard_gate", "post_pairwise"]},
    "study_id": {"type": "string", "minLength": 1},
    "run_id": {"type": "string", "minLength": 1},
    "task_id": {"type": "string", "minLength": 1},
    "adjudicator_id": {"type": "string", "minLength": 1},
    "adjudicator_version": {"type": "string", "minLength": 1},
    "rubric_version": {"type": "string", "minLength": 1},
    "left_candidate": {"$ref": "#/$defs/candidate_reference"},
    "right_candidate": {"$ref": "#/$defs/candidate_reference"},
    "trigger_types": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"enum": ["ordinal_delta", "severity_conflict", "hard_result_conflict", "pairwise_winner_conflict", "pairwise_order_flip", "evidence_reference_conflict", "confidence_abstention_conflict", "blindness_breach", "critical_or_high_finding"]}},
    "original_judgment_ids": {"type": "array", "uniqueItems": true, "items": {"type": "string", "pattern": "^J-"}},
    "original_pairwise_ids": {"type": "array", "uniqueItems": true, "items": {"type": "string", "pattern": "^PW-"}},
    "input_record_hashes": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"$ref": "#/$defs/record_hash_reference"}},
    "hard_gate_input_set": {"oneOf": [{"type": "null"}, {"$ref": "#/$defs/hard_gate_input_set"}]},
    "hard_gate_disposition": {"oneOf": [{"type": "null"}, {"$ref": "#/$defs/hard_gate_disposition"}]},
    "evidence_refs": {"type": "array", "minItems": 1, "items": {"$ref": "#/$defs/evidence_reference"}},
    "disposition": {"enum": ["uphold_a", "uphold_b", "both_valid_different_scope", "both_unsupported", "insufficient_evidence", "rubric_defect", "fixture_defect", "needs_human_expert"]},
    "rationale": {"type": "string", "minLength": 1},
    "preserved_dissent": {"type": "array", "minItems": 1, "items": {"type": "string", "minLength": 1}},
    "accountable_expertise": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"type": "string", "minLength": 1}},
    "human_review_required": {"type": "boolean"},
    "human_review_route": {"type": ["string", "null"]},
    "pre_adjudication_records_locked": {"const": true},
    "original_records_changed": {"const": false},
    "deblinding_state": {"enum": ["still_blinded", "deblinded_after_lock", "breached"]},
    "created_at": {"type": "string", "format": "date-time"},
    "record_hash_algorithm": {"const": "sha256"},
    "record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
    "record_hash_preimage_contract": {"const": "complete_record_excluding_only_top_level_record_hash"},
    "record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
  },
  "$defs": {
    "candidate_reference": {
      "type": "object",
      "additionalProperties": false,
      "required": ["candidate_label", "candidate_run_id", "condition_id", "output_record_id", "output_record_hash_algorithm", "output_record_hash_canonical_serialization", "output_record_hash_preimage_contract", "output_record_hash_excluded_top_level_fields", "output_record_hash"],
      "properties": {
        "candidate_label": {"type": "string", "minLength": 1},
        "candidate_run_id": {"type": "string", "minLength": 1},
        "condition_id": {"type": "string", "minLength": 1},
        "output_record_id": {"type": "string", "minLength": 1},
        "output_record_hash_algorithm": {"const": "sha256"},
        "output_record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "output_record_hash_preimage_contract": {"const": "complete_record_excluding_only_top_level_record_hash"},
        "output_record_hash_excluded_top_level_fields": {"type": "array", "minItems": 1, "maxItems": 1, "prefixItems": [{"const": "record_hash"}], "items": false},
        "output_record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
      }
    },
    "record_hash_reference": {
      "type": "object",
      "additionalProperties": false,
      "required": ["record_id", "record_schema_version", "record_hash_algorithm", "record_hash_canonical_serialization", "record_hash_preimage_contract", "record_hash_excluded_top_level_fields", "record_hash"],
      "properties": {
        "record_id": {"type": "string", "minLength": 1},
        "record_schema_version": {"type": "string", "minLength": 1},
        "record_hash_algorithm": {"const": "sha256"},
        "record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "record_hash_preimage_contract": {"const": "complete_record_excluding_only_top_level_record_hash"},
        "record_hash_excluded_top_level_fields": {"type": "array", "minItems": 1, "maxItems": 1, "prefixItems": [{"const": "record_hash"}], "items": false},
        "record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
      }
    },
    "evidence_reference": {
      "type": "object",
      "additionalProperties": false,
      "required": ["evidence_id", "span_or_coordinate"],
      "properties": {
        "evidence_id": {"type": "string", "pattern": "^EV-"},
        "span_or_coordinate": {"type": "string", "minLength": 1}
      }
    },
    "hard_judgment_reference": {
      "type": "object",
      "additionalProperties": false,
      "required": ["judgment_id", "judgment_record_schema_version", "study_id", "candidate_side", "candidate_run_id", "task_id", "condition_id", "candidate_output_record_id", "criterion_id", "status", "locked_at", "judgment_record_hash_algorithm", "judgment_record_hash_canonical_serialization", "judgment_record_hash_preimage_contract", "judgment_record_hash_excluded_top_level_fields", "judgment_record_hash"],
      "properties": {
        "judgment_id": {"type": "string", "pattern": "^J-"},
        "judgment_record_schema_version": {"type": "string", "minLength": 1},
        "study_id": {"type": "string", "minLength": 1},
        "candidate_side": {"enum": ["left", "right"]},
        "candidate_run_id": {"type": "string", "minLength": 1},
        "task_id": {"type": "string", "minLength": 1},
        "condition_id": {"type": "string", "minLength": 1},
        "candidate_output_record_id": {"type": "string", "minLength": 1},
        "criterion_id": {"enum": ["HG-01", "HG-02", "HG-03", "HG-04", "HG-05", "HG-06", "HG-07", "HG-08"]},
        "status": {"enum": ["pass", "fail", "unknown", "not_applicable", "invalid"]},
        "locked_at": {"type": "string", "format": "date-time"},
        "judgment_record_hash_algorithm": {"const": "sha256"},
        "judgment_record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "judgment_record_hash_preimage_contract": {"const": "complete_record_excluding_only_top_level_record_hash"},
        "judgment_record_hash_excluded_top_level_fields": {"type": "array", "minItems": 1, "maxItems": 1, "prefixItems": [{"const": "record_hash"}], "items": false},
        "judgment_record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
        "persistence_receipt_id": {"type": "string", "pattern": "^B0AR-"},
        "persistence_receipt_schema_version": {"const": "1"},
        "persistence_receipt_hash_algorithm": {"const": "sha256"},
        "persistence_receipt_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "persistence_receipt_hash_preimage_contract": {"const": "complete_receipt_excluding_only_top_level_receipt_hash"},
        "persistence_receipt_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
        "record_lock_id": {"type": "string", "pattern": "^LOCK-"},
        "record_lock_version": {"type": "string", "minLength": 1}
      },
      "allOf": [
        {
          "if": {"properties": {"study_id": {"const": "PSJ-B0-001"}}, "required": ["study_id"]},
          "then": {"required": ["persistence_receipt_id", "persistence_receipt_schema_version", "persistence_receipt_hash_algorithm", "persistence_receipt_hash_canonical_serialization", "persistence_receipt_hash_preimage_contract", "persistence_receipt_hash", "record_lock_id", "record_lock_version"]}
        }
      ]
    },
    "hard_gate_input_set": {
      "type": "object",
      "additionalProperties": false,
      "required": ["hard_gate_input_set_id", "validator_id", "validator_version", "verified_at", "hard_judgment_refs", "hard_gate_input_set_hash_algorithm", "hard_gate_input_set_hash_canonical_serialization", "hard_gate_input_set_hash_ordering", "hard_gate_input_set_hash_preimage_contract", "hard_gate_input_set_hash_excluded_fields", "hard_gate_input_set_hash"],
      "properties": {
        "hard_gate_input_set_id": {"type": "string", "minLength": 1},
        "validator_id": {"type": "string", "minLength": 1},
        "validator_version": {"type": "string", "minLength": 1},
        "verified_at": {"type": "string", "format": "date-time"},
        "hard_judgment_refs": {"type": "array", "minItems": 2, "uniqueItems": true, "items": {"$ref": "#/$defs/hard_judgment_reference"}},
        "hard_gate_input_set_hash_algorithm": {"const": "sha256"},
        "hard_gate_input_set_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "hard_gate_input_set_hash_ordering": {"const": "candidate_side_utf8_ascending_then_criterion_id_utf8_ascending_then_judgment_id_utf8_ascending"},
        "hard_gate_input_set_hash_preimage_contract": {"const": "rfc8785_jcs_of_complete_hard_judgment_refs_sorted_by_declared_order"},
        "hard_gate_input_set_hash_excluded_fields": {"type": "array", "maxItems": 0},
        "hard_gate_input_set_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
      }
    },
    "hard_gate_result": {
      "type": "object",
      "additionalProperties": false,
      "required": ["result_id", "candidate_side", "candidate_run_id", "task_id", "condition_id", "candidate_output_record_id", "criterion_id", "status", "source_judgment_ids", "evidence_refs", "rationale"],
      "properties": {
        "result_id": {"type": "string", "pattern": "^HGR-"},
        "candidate_side": {"enum": ["left", "right"]},
        "candidate_run_id": {"type": "string", "minLength": 1},
        "task_id": {"type": "string", "minLength": 1},
        "condition_id": {"type": "string", "minLength": 1},
        "candidate_output_record_id": {"type": "string", "minLength": 1},
        "criterion_id": {"enum": ["HG-01", "HG-02", "HG-03", "HG-04", "HG-05", "HG-06", "HG-07", "HG-08"]},
        "status": {"enum": ["pass", "fail", "unknown", "not_applicable", "invalid"]},
        "source_judgment_ids": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"type": "string", "pattern": "^J-"}},
        "evidence_refs": {"type": "array", "minItems": 1, "items": {"$ref": "#/$defs/evidence_reference"}},
        "rationale": {"type": "string", "minLength": 1}
      }
    },
    "hard_gate_disposition": {
      "type": "object",
      "additionalProperties": false,
      "required": ["hard_gate_disposition_id", "overall_status", "results", "created_at", "locked_at", "disposition_hash_algorithm", "disposition_hash_canonical_serialization", "disposition_hash_result_ordering", "disposition_hash_preimage_contract", "disposition_hash_excluded_top_level_fields", "disposition_hash"],
      "properties": {
        "hard_gate_disposition_id": {"type": "string", "pattern": "^HGD-"},
        "overall_status": {"enum": ["pass", "fail", "unresolved"]},
        "results": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"$ref": "#/$defs/hard_gate_result"}},
        "created_at": {"type": "string", "format": "date-time"},
        "locked_at": {"type": "string", "format": "date-time"},
        "disposition_hash_algorithm": {"const": "sha256"},
        "disposition_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "disposition_hash_result_ordering": {"const": "candidate_side_utf8_ascending_then_criterion_id_utf8_ascending_then_result_id_utf8_ascending"},
        "disposition_hash_preimage_contract": {"const": "complete_disposition_excluding_only_disposition_hash_with_results_sorted_by_declared_order"},
        "disposition_hash_excluded_top_level_fields": {"type": "array", "minItems": 1, "maxItems": 1, "prefixItems": [{"const": "disposition_hash"}], "items": false},
        "disposition_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
      },
      "allOf": [
        {
          "if": {"properties": {"overall_status": {"const": "pass"}}, "required": ["overall_status"]},
          "then": {"properties": {"results": {"items": {"properties": {"status": {"const": "pass"}}}}}}
        },
        {
          "if": {"properties": {"overall_status": {"const": "fail"}}, "required": ["overall_status"]},
          "then": {"properties": {"results": {"contains": {"properties": {"status": {"const": "fail"}}, "required": ["status"]}, "minContains": 1}}}
        },
        {
          "if": {"properties": {"overall_status": {"const": "unresolved"}}, "required": ["overall_status"]},
          "then": {"properties": {"results": {"not": {"contains": {"properties": {"status": {"const": "fail"}}, "required": ["status"]}}, "contains": {"properties": {"status": {"enum": ["unknown", "not_applicable", "invalid"]}}, "required": ["status"]}, "minContains": 1}}}
        }
      ]
    }
  },
  "allOf": [
    {
      "if": {"properties": {"human_review_required": {"const": true}}, "required": ["human_review_required"]},
      "then": {"properties": {"human_review_route": {"type": "string", "minLength": 1}}},
      "else": {"properties": {"human_review_route": {"type": ["string", "null"]}}}
    },
    {
      "if": {"properties": {"disposition": {"const": "needs_human_expert"}}, "required": ["disposition"]},
      "then": {"properties": {"human_review_required": {"const": true}, "human_review_route": {"type": "string", "minLength": 1}}}
    },
    {
      "if": {"properties": {"adjudication_phase": {"const": "pre_pairwise_hard_gate"}}, "required": ["adjudication_phase"]},
      "then": {
        "properties": {
          "trigger_types": {"contains": {"const": "hard_result_conflict"}, "minContains": 1, "maxContains": 1},
          "original_judgment_ids": {"minItems": 2},
          "original_pairwise_ids": {"maxItems": 0},
          "hard_gate_input_set": {"type": "object"},
          "hard_gate_disposition": {"type": "object"}
        }
      }
    },
    {
      "if": {"properties": {"adjudication_phase": {"const": "post_pairwise"}}, "required": ["adjudication_phase"]},
      "then": {
        "properties": {
          "trigger_types": {"not": {"contains": {"const": "hard_result_conflict"}}},
          "original_pairwise_ids": {"minItems": 1},
          "hard_gate_input_set": {"type": "null"},
          "hard_gate_disposition": {"type": "null"}
        }
      }
    },
    {
      "if": {"properties": {"trigger_types": {"contains": {"const": "hard_result_conflict"}}}, "required": ["trigger_types"]},
      "then": {"properties": {"adjudication_phase": {"const": "pre_pairwise_hard_gate"}}}
    },
    {
      "if": {"properties": {"trigger_types": {"contains": {"const": "pairwise_order_flip"}}}, "required": ["trigger_types"]},
      "then": {"properties": {"adjudication_phase": {"const": "post_pairwise"}, "original_pairwise_ids": {"minItems": 2, "maxItems": 2}, "hard_gate_input_set": {"type": "null"}, "hard_gate_disposition": {"type": "null"}}}
    },
    {
      "if": {
        "allOf": [
          {"properties": {"study_id": {"const": "PSJ-B0-001"}}, "required": ["study_id"]},
          {"properties": {"adjudication_phase": {"const": "pre_pairwise_hard_gate"}}, "required": ["adjudication_phase"]}
        ]
      },
      "then": {
        "properties": {
          "hard_gate_input_set": {
            "properties": {
              "hard_gate_input_set_id": {"const": "PSJ-B0-BOTH-CANDIDATES-HG-01-04-INPUTS-r1"},
              "hard_judgment_refs": {
                "minItems": 8,
                "allOf": [
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-01"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-02"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-03"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-04"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-01"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-02"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-03"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-04"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1}
                ]
              }
            }
          },
          "hard_gate_disposition": {
            "properties": {
              "results": {
                "minItems": 8,
                "maxItems": 8,
                "allOf": [
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-01"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-02"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-03"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "left"}, "criterion_id": {"const": "HG-04"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-01"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-02"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-03"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"candidate_side": {"const": "right"}, "criterion_id": {"const": "HG-04"}}, "required": ["candidate_side", "criterion_id"]}, "minContains": 1, "maxContains": 1}
                ]
              }
            }
          }
        }
      }
    }
  ]
}
```

### Audit event

An audit event carries an array of exact operation envelopes. Each operation may compose several canonical agent-executable phases—for example, `verify.runtime` with `research.external`—but every phase has its own current gate result and independently issued exact grant. `admin.policy` is intentionally absent because it is a human/admin control-plane capability, not a study-agent phase; it requires a separate administrative audit contract. A deterministic referential validator must reject duplicate phase bindings; verify that the event actor/workload and each grant principal/workload match; verify that every grant operation/resource equals its containing operation envelope; require the event time to fall inside every gate, grant, and applicable control validity interval; reconcile current revocation/invalidation checks; and verify that every referenced record is the immutable version represented here. For `verify.runtime`, it must additionally reconcile the typed runtime plan, executor/profile, tool/version, build/environment, entrypoint, start state, filesystem, network, data, credential, capture, child-process, resource, cancellation, cleanup, and prohibited-effect fields against the applicable SEC-P0-G result, actual trace, and cleanup evidence.

For an allowed `OP-B0-PUBLIC-RECON-r1`, the schema admits exactly two phase slots—one `verify.runtime`/SEC-P0-G/exact B0 runtime grant and one `research.external`/SEC-P0-B/exact B0 external-research grant. The validator dereferences the immutable manifest/profile ID and version in each gate result and requires deep equality over **every** grant-manifest field, including executor, dedicated profile, browser/tool version, OS/build version, actions, origins, routes, methods, captures, filesystem, data, credentials, child processes, numeric limits, cancellation, cleanup, and prohibited effects; it rejects cross-binding drift in principal, workload, operation, resource, profile, origin, route, or time. The B0 navigation grant covers only top-level navigation. It may admit the exact predeclared root-to-root Frontitude `www`/non-`www` canonicalization pair and no other cross-origin redirect; asset, CDN, security-service, telemetry, DNS, and platform background egress remain `unverified_not_claimed` unless a separate instrumented boundary is approved and reconciled. A denied or review-required attempt remains schema-valid only with the two named phase slots, null or correctly scoped blocked/not-applicable gate results, null grants, explicit reason code, not-applicable controls, and no approvals; it grants no capability.

Persistence is a separate event. An allowed `OP-B0-EVIDENCE-APPEND-r1` contains exactly one `draft.patch`/SEC-P0-C binding, the exact `record.append` grant for `B0-IMMUTABLE-EVIDENCE-SINK-r1`, an applicable unrevoked persistence decision, applicable telemetry disposition, and no mutation approval. The validator requires exact ID/version/content-hash equality for the persistence decision across the control record, append grant, and receipt. It permits only the seven declared B0 record families and requires the record-level JCS hash, atomic primary-record plus terminal-audit-event co-commit, immutable lock, and typed receipt. When the primary record is itself a `StudyAuditEvent`, it is the one terminal audit side effect, not an event that triggers another append. A denied or review-required append similarly records a null or blocked P0-C result, null grant, not-applicable controls, and explicit reason without writing. Navigation and append envelopes are never combined in one event: they use separate chain events linked by `correlation_id`, and each successful append receipt identifies its own terminal audit event. An append event for a later judgment, pairwise, or adjudication record does not inherit or re-require the navigation grants. Batch completeness—not one event's schema—requires the successful navigation event plus a valid append receipt for every persisted B0 record. JSON Schema cannot express the remaining cross-record, deep-manifest, or temporal comparisons.

The audit chain uses this exact normative construction:

1. `hash_algorithm` is `sha256`; `canonical_serialization` is `rfc8785_jcs` ([RFC 8785 JSON Canonicalization Scheme](https://www.rfc-editor.org/rfc/rfc8785)).
2. The preimage is the UTF-8 byte sequence of RFC 8785/JCS applied to the complete event object after removing only the top-level `event_hash` member. The preimage therefore includes `stream_id`, `previous_event_hash`, `sequence`, operation envelopes, controls, inputs, outputs, effects, cleanup, and the algorithm/serialization identifiers. Omitted optional members remain omitted; a validator may not normalize them to `null` before hashing.
3. `event_hash` is the lowercase hexadecimal encoding of `SHA-256(preimage)`.
4. `stream_id` is the immutable chain-partition identity. `correlation_id` may group work across streams and must never select a predecessor. For `sequence: 1` within one `stream_id`, `previous_event_hash` is the 64-character lowercase zero value `0000000000000000000000000000000000000000000000000000000000000000`; it is never `null` or omitted. For every later event, `previous_event_hash` equals the immediately preceding verified event hash from the **same** `stream_id`.
5. Verification partitions events by exact `stream_id`; within each partition it starts at sequence 1, rejects duplicate sequence numbers, requires contiguous strictly increasing sequence numbers and the genesis value, recomputes every event hash from its defined preimage, then compares every subsequent link to the preceding verified hash in that partition. A predecessor from another `stream_id` is rejected even when `correlation_id`, actor, run, or hash value otherwise appears related. A missing, reordered, duplicated, altered, or cross-stream-linked event fails chain verification. Hash validity establishes tamper evidence for the recorded bytes; it does not establish that an observation is true or an action was authorized.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "StudyAuditEvent",
  "type": "object",
  "additionalProperties": false,
  "required": ["event_id", "stream_id", "sequence", "timestamp", "correlation_id", "actor_id", "workload_identity_id", "agent_or_tool_version", "version_refs", "operation_envelopes", "input_hashes", "hash_algorithm", "canonical_serialization", "result", "previous_event_hash", "event_hash"],
  "properties": {
    "event_id": {"type": "string", "pattern": "^AE-"},
    "stream_id": {"type": "string", "pattern": "^AS-", "minLength": 4},
    "sequence": {"type": "integer", "minimum": 1},
    "timestamp": {"type": "string", "format": "date-time"},
    "correlation_id": {"type": "string"},
    "actor_id": {"type": "string"},
    "workload_identity_id": {"type": "string"},
    "agent_or_tool_version": {"type": "string"},
    "version_refs": {"type": "object", "additionalProperties": false, "required": ["policy", "schema", "adapter", "capability_manifest", "control_plane", "model"], "properties": {"policy": {"type": "string"}, "schema": {"type": "string"}, "adapter": {"type": "string"}, "capability_manifest": {"type": "string"}, "control_plane": {"type": "string"}, "model": {"type": ["string", "null"]}}},
    "operation_envelopes": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"$ref": "#/$defs/operation_envelope"}},
    "input_hashes": {"type": "array", "items": {"type": "string", "pattern": "^[a-f0-9]{64}$"}},
    "output_hash": {"type": ["string", "null"], "pattern": "^[a-f0-9]{64}$"},
    "hash_algorithm": {"const": "sha256"},
    "canonical_serialization": {"const": "rfc8785_jcs"},
    "result": {"enum": ["started", "succeeded", "failed", "blocked", "cancelled", "rolled_back"]},
    "effects": {"type": "array", "items": {"type": "string"}},
    "cleanup_status": {"type": ["string", "null"]},
    "previous_event_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
    "event_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
  },
  "allOf": [
    {
      "if": {"properties": {"sequence": {"const": 1}}, "required": ["sequence"]},
      "then": {"properties": {"previous_event_hash": {"const": "0000000000000000000000000000000000000000000000000000000000000000"}}}
    },
    {
      "not": {
        "properties": {
          "operation_envelopes": {
            "allOf": [
              {"contains": {"properties": {"operation_id": {"const": "OP-B0-PUBLIC-RECON-r1"}}, "required": ["operation_id"]}},
              {"contains": {"properties": {"operation_id": {"const": "OP-B0-EVIDENCE-APPEND-r1"}}, "required": ["operation_id"]}}
            ]
          }
        },
        "required": ["operation_envelopes"]
      }
    }
  ],
  "$defs": {
    "phase_gate_result": {
      "type": "object",
      "additionalProperties": false,
      "required": ["result_record_id", "result_record_version", "sec_p0_gate", "implementation_or_profile_id", "implementation_or_profile_version", "result", "evaluated_at", "valid_from", "expires_at", "invalidation_state", "invalidation_checked_at", "policy_version", "evidence_refs"],
      "properties": {
        "result_record_id": {"type": "string"},
        "result_record_version": {"type": "string"},
        "sec_p0_gate": {"enum": ["SEC-P0-A", "SEC-P0-B", "SEC-P0-C", "SEC-P0-D", "SEC-P0-E", "SEC-P0-F", "SEC-P0-G"]},
        "implementation_or_profile_id": {"type": "string"},
        "implementation_or_profile_version": {"type": "string"},
        "result": {"enum": ["pass", "blocked", "not_applicable"]},
        "evaluated_at": {"type": "string", "format": "date-time"},
        "valid_from": {"type": "string", "format": "date-time"},
        "expires_at": {"type": "string", "format": "date-time"},
        "invalidation_state": {"enum": ["current", "invalidated"]},
        "invalidation_checked_at": {"type": "string", "format": "date-time"},
        "policy_version": {"type": "string"},
        "evidence_refs": {"type": "array", "minItems": 1, "items": {"type": "string"}}
      }
    },
    "runtime_grant_contract": {
      "type": "object",
      "additionalProperties": false,
      "required": ["contract_type", "runtime_plan_id", "runtime_plan_version", "executor_profile", "tool", "build_environment", "entrypoint", "start_state", "filesystem_boundary", "network_boundary", "data_boundary", "credential_boundary", "capture_boundary", "child_process_policy", "resource_limits", "cancellation", "cleanup", "prohibited_effects"],
      "properties": {
        "contract_type": {"const": "runtime"},
        "contract_manifest_id": {"type": "string", "minLength": 1},
        "contract_manifest_version": {"type": "string", "minLength": 1},
        "runtime_plan_id": {"type": "string", "minLength": 1},
        "runtime_plan_version": {"type": "string", "minLength": 1},
        "executor_profile": {
          "type": "object", "additionalProperties": false,
          "required": ["executor_id", "executor_version", "profile_id", "profile_version", "isolation", "workspace_id"],
          "properties": {
            "executor_id": {"type": "string", "minLength": 1},
            "executor_version": {"type": "string", "minLength": 1},
            "profile_id": {"type": "string", "minLength": 1},
            "profile_version": {"type": "string", "minLength": 1},
            "isolation": {"enum": ["ephemeral_workspace", "dedicated_browser_profile", "dedicated_test_device", "sandboxed_executor"]},
            "workspace_id": {"type": "string", "minLength": 1}
          }
        },
        "tool": {
          "type": "object", "additionalProperties": false,
          "required": ["kind", "name", "version"],
          "properties": {
            "kind": {"enum": ["browser", "app", "device", "emulator", "executable", "local_server", "build_or_test"]},
            "name": {"type": "string", "minLength": 1},
            "version": {"type": "string", "minLength": 1}
          }
        },
        "build_environment": {
          "type": "object", "additionalProperties": false,
          "required": ["environment_id", "environment_version", "build_or_revision"],
          "properties": {
            "environment_id": {"type": "string", "minLength": 1},
            "environment_version": {"type": "string", "minLength": 1},
            "build_or_revision": {"type": "string", "minLength": 1}
          }
        },
        "entrypoint": {
          "type": "object", "additionalProperties": false,
          "required": ["kind", "executable", "arguments", "browser_actions", "allowed_origins", "allowed_routes"],
          "properties": {
            "kind": {"enum": ["browser_actions", "executable_arguments"]},
            "executable": {"type": ["string", "null"]},
            "arguments": {"type": "array", "items": {"type": "string"}},
            "browser_actions": {"type": "array", "uniqueItems": true, "items": {"enum": ["launch", "attach", "navigate", "find", "read_accessibility_tree", "capture", "close_tab", "close_profile", "detach"]}},
            "allowed_origins": {"type": "array", "uniqueItems": true, "items": {"type": "string", "format": "uri"}},
            "allowed_routes": {"type": "array", "uniqueItems": true, "items": {"type": "string", "minLength": 1}}
          },
          "allOf": [
            {"if": {"properties": {"kind": {"const": "browser_actions"}}, "required": ["kind"]}, "then": {"properties": {"executable": {"type": "null"}, "arguments": {"maxItems": 0}, "browser_actions": {"minItems": 1}, "allowed_origins": {"minItems": 1}, "allowed_routes": {"minItems": 1}}}},
            {"if": {"properties": {"kind": {"const": "executable_arguments"}}, "required": ["kind"]}, "then": {"properties": {"executable": {"type": "string", "minLength": 1}, "browser_actions": {"maxItems": 0}, "allowed_origins": {"maxItems": 0}, "allowed_routes": {"maxItems": 0}}}}
          ]
        },
        "start_state": {
          "type": "object", "additionalProperties": false,
          "required": ["role", "locale", "feature_flags", "route_or_state", "signed_in_state"],
          "properties": {
            "role": {"type": "string", "minLength": 1},
            "locale": {"type": "string", "minLength": 1},
            "feature_flags": {"type": "array", "uniqueItems": true, "items": {"type": "string"}},
            "route_or_state": {"type": "string", "minLength": 1},
            "signed_in_state": {"enum": ["signed_out", "disposable_test_identity", "not_applicable"]}
          }
        },
        "filesystem_boundary": {
          "type": "object", "additionalProperties": false,
          "required": ["read_roots", "write_roots", "source_mount_mode", "working_directory", "temporary_root", "symlink_policy"],
          "properties": {
            "read_roots": {"type": "array", "uniqueItems": true, "items": {"type": "string", "minLength": 1}},
            "write_roots": {"type": "array", "uniqueItems": true, "items": {"type": "string", "minLength": 1}},
            "source_mount_mode": {"enum": ["none", "read_only", "disposable_copy"]},
            "working_directory": {"type": ["string", "null"]},
            "temporary_root": {"type": ["string", "null"]},
            "symlink_policy": {"enum": ["deny", "within_enrolled_root_only"]}
          }
        },
        "network_boundary": {
          "type": "object", "additionalProperties": false,
          "required": ["mode", "boundary_scope", "allowed_origins", "allowed_routes", "allowed_methods", "redirect_policy", "allowed_top_level_redirects", "background_egress_disposition", "downloads_allowed", "external_protocols_allowed"],
          "properties": {
            "mode": {"enum": ["deny_all", "allowlist"]},
            "boundary_scope": {"enum": ["top_level_navigation_only", "full_network_egress"]},
            "allowed_origins": {"type": "array", "uniqueItems": true, "items": {"type": "string", "format": "uri"}},
            "allowed_routes": {"type": "array", "uniqueItems": true, "items": {"type": "string", "minLength": 1}},
            "allowed_methods": {"type": "array", "uniqueItems": true, "items": {"enum": ["GET", "HEAD", "POST"]}},
            "redirect_policy": {"enum": ["deny", "same_origin_only", "exact_preapproved_top_level_only", "new_origin_requires_new_grant"]},
            "allowed_top_level_redirects": {"type": "array", "uniqueItems": true, "items": {"type": "object", "additionalProperties": false, "required": ["from", "to"], "properties": {"from": {"type": "string", "format": "uri"}, "to": {"type": "string", "format": "uri"}}}},
            "background_egress_disposition": {"enum": ["unverified_not_claimed", "instrumented_and_reconciled", "not_applicable"]},
            "downloads_allowed": {"type": "boolean"},
            "external_protocols_allowed": {"type": "boolean"}
          },
          "allOf": [
            {"if": {"properties": {"mode": {"const": "deny_all"}}, "required": ["mode"]}, "then": {"properties": {"allowed_origins": {"maxItems": 0}, "allowed_routes": {"maxItems": 0}, "allowed_methods": {"maxItems": 0}}}},
            {"if": {"properties": {"mode": {"const": "allowlist"}}, "required": ["mode"]}, "then": {"properties": {"allowed_origins": {"minItems": 1}, "allowed_routes": {"minItems": 1}, "allowed_methods": {"minItems": 1}}}}
          ]
        },
        "data_boundary": {
          "type": "object", "additionalProperties": false,
          "required": ["permitted_data_classes", "prohibited_data_classes", "model_egress_allowed"],
          "properties": {
            "permitted_data_classes": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"enum": ["public", "synthetic", "internal", "confidential", "personal", "sensitive_regulated", "security_telemetry"]}},
            "prohibited_data_classes": {"type": "array", "uniqueItems": true, "items": {"enum": ["public", "synthetic", "internal", "confidential", "personal", "sensitive_regulated", "secret", "security_telemetry"]}},
            "model_egress_allowed": {"type": "boolean"}
          }
        },
        "credential_boundary": {
          "type": "object", "additionalProperties": false,
          "required": ["mode", "credential_ref_ids", "permitted_processes_or_origins", "capture_allowed", "log_allowed", "clipboard_allowed"],
          "properties": {
            "mode": {"enum": ["none", "brokered_exact_scope"]},
            "credential_ref_ids": {"type": "array", "uniqueItems": true, "items": {"type": "string", "minLength": 1}},
            "permitted_processes_or_origins": {"type": "array", "uniqueItems": true, "items": {"type": "string", "minLength": 1}},
            "capture_allowed": {"const": false},
            "log_allowed": {"const": false},
            "clipboard_allowed": {"const": false}
          },
          "allOf": [
            {"if": {"properties": {"mode": {"const": "none"}}, "required": ["mode"]}, "then": {"properties": {"credential_ref_ids": {"maxItems": 0}, "permitted_processes_or_origins": {"maxItems": 0}}}},
            {"if": {"properties": {"mode": {"const": "brokered_exact_scope"}}, "required": ["mode"]}, "then": {"properties": {"credential_ref_ids": {"minItems": 1}, "permitted_processes_or_origins": {"minItems": 1}}}}
          ]
        },
        "capture_boundary": {
          "type": "object", "additionalProperties": false,
          "required": ["allowed_capture_types", "storage_ref", "redaction_profile_id", "retention_seconds"],
          "properties": {
            "allowed_capture_types": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"enum": ["screenshot", "accessibility_tree", "dom_snapshot", "runtime_trace", "text_observation"]}},
            "storage_ref": {"type": "string", "minLength": 1},
            "redaction_profile_id": {"type": "string", "minLength": 1},
            "retention_seconds": {"type": "integer", "minimum": 0}
          }
        },
        "child_process_policy": {
          "type": "object", "additionalProperties": false,
          "required": ["mode", "allowed_children"],
          "properties": {
            "mode": {"enum": ["deny_all", "allowlist"]},
            "allowed_children": {"type": "array", "uniqueItems": true, "items": {"type": "object", "additionalProperties": false, "required": ["executable", "arguments"], "properties": {"executable": {"type": "string", "minLength": 1}, "arguments": {"type": "array", "items": {"type": "string"}}}}}
          },
          "allOf": [
            {"if": {"properties": {"mode": {"const": "deny_all"}}, "required": ["mode"]}, "then": {"properties": {"allowed_children": {"maxItems": 0}}}},
            {"if": {"properties": {"mode": {"const": "allowlist"}}, "required": ["mode"]}, "then": {"properties": {"allowed_children": {"minItems": 1}}}}
          ]
        },
        "resource_limits": {
          "type": "object", "additionalProperties": false,
          "required": ["max_duration_seconds", "max_cpu_seconds", "max_memory_mb", "max_actions", "max_navigations", "max_requests", "max_response_bytes", "max_download_bytes", "max_capture_bytes", "max_cost_minor_units"],
          "properties": {
            "max_duration_seconds": {"type": "integer", "minimum": 1},
            "max_cpu_seconds": {"type": "integer", "minimum": 0},
            "max_memory_mb": {"type": "integer", "minimum": 1},
            "max_actions": {"type": "integer", "minimum": 1},
            "max_navigations": {"type": "integer", "minimum": 0},
            "max_requests": {"type": "integer", "minimum": 0},
            "max_response_bytes": {"type": "integer", "minimum": 0},
            "max_download_bytes": {"type": "integer", "minimum": 0},
            "max_capture_bytes": {"type": "integer", "minimum": 0},
            "max_cost_minor_units": {"type": "integer", "minimum": 0}
          }
        },
        "cancellation": {
          "type": "object", "additionalProperties": false,
          "required": ["kill_switch_id", "mechanism", "max_cancel_latency_seconds", "owner_id"],
          "properties": {
            "kill_switch_id": {"type": "string", "minLength": 1},
            "mechanism": {"enum": ["close_profile", "terminate_process_group", "stop_device_session", "cancel_executor_job"]},
            "max_cancel_latency_seconds": {"type": "integer", "minimum": 0},
            "owner_id": {"type": "string", "minLength": 1}
          }
        },
        "cleanup": {
          "type": "object", "additionalProperties": false,
          "required": ["teardown_steps", "profile_disposition", "workspace_disposition", "orphan_check_required", "residual_check_required", "owner_id"],
          "properties": {
            "teardown_steps": {"type": "array", "minItems": 1, "items": {"type": "string", "minLength": 1}},
            "profile_disposition": {"enum": ["close_only", "dispose_ephemeral", "reset_dedicated"]},
            "workspace_disposition": {"enum": ["none", "dispose_ephemeral", "restore_canonical_hash"]},
            "orphan_check_required": {"const": true},
            "residual_check_required": {"const": true},
            "owner_id": {"type": "string", "minLength": 1},
            "executor_detach_before_profile_close": {"type": "boolean"},
            "profile_close_actor": {"enum": ["executor", "user_device_owner", "environment_operator"]},
            "cleanup_receipt_kind": {"enum": ["executor_observed", "user_reported", "environment_receipt", "not_applicable"]},
            "next_clean_start_required": {"type": "boolean"}
          }
        },
        "prohibited_effects": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"enum": ["source_write", "remote_write", "package_install", "download", "upload", "form_submission", "login", "external_protocol", "plugin_or_connector", "token_use", "personal_session_access", "credential_capture", "unlisted_origin", "unlisted_child_process", "persistent_artifact", "customer_communication", "purchase"]}}
      }
    },
    "external_research_grant_contract": {
      "type": "object",
      "additionalProperties": false,
      "required": ["contract_type", "research_plan_id", "research_plan_version", "browser_profile_id", "browser_profile_version", "browser_name", "browser_version", "boundary_scope", "allowed_origins", "allowed_routes", "allowed_methods", "redirect_policy", "allowed_top_level_redirects", "background_egress_disposition", "permitted_data_classes", "credential_mode", "downloads_allowed", "forms_allowed", "external_protocols_allowed", "filesystem_write_roots", "model_egress_allowed", "max_duration_seconds", "max_navigations", "max_requests", "capture_policy_id", "cancellation_id", "cleanup_steps"],
      "properties": {
        "contract_type": {"const": "external_research"},
        "contract_manifest_id": {"type": "string", "minLength": 1},
        "contract_manifest_version": {"type": "string", "minLength": 1},
        "research_plan_id": {"type": "string", "minLength": 1},
        "research_plan_version": {"type": "string", "minLength": 1},
        "browser_profile_id": {"type": "string", "minLength": 1},
        "browser_profile_version": {"type": "string", "minLength": 1},
        "browser_name": {"type": "string", "minLength": 1},
        "browser_version": {"type": "string", "minLength": 1},
        "boundary_scope": {"enum": ["top_level_navigation_only", "full_network_egress"]},
        "allowed_origins": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"type": "string", "format": "uri"}},
        "allowed_routes": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"type": "string", "minLength": 1}},
        "allowed_methods": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"enum": ["GET", "HEAD"]}},
        "redirect_policy": {"enum": ["deny", "same_origin_only", "exact_preapproved_top_level_only", "new_origin_requires_new_grant"]},
        "allowed_top_level_redirects": {"type": "array", "uniqueItems": true, "items": {"type": "object", "additionalProperties": false, "required": ["from", "to"], "properties": {"from": {"type": "string", "format": "uri"}, "to": {"type": "string", "format": "uri"}}}},
        "background_egress_disposition": {"enum": ["unverified_not_claimed", "instrumented_and_reconciled", "not_applicable"]},
        "permitted_data_classes": {"type": "array", "minItems": 1, "maxItems": 1, "prefixItems": [{"const": "public"}], "items": false},
        "credential_mode": {"const": "none"},
        "downloads_allowed": {"const": false},
        "forms_allowed": {"const": false},
        "external_protocols_allowed": {"const": false},
        "filesystem_write_roots": {"type": "array", "maxItems": 0},
        "model_egress_allowed": {"const": false},
        "max_duration_seconds": {"type": "integer", "minimum": 1},
        "max_navigations": {"type": "integer", "minimum": 1},
        "max_requests": {"type": "integer", "minimum": 1},
        "capture_policy_id": {"type": "string", "minLength": 1},
        "cancellation_id": {"type": "string", "minLength": 1},
        "cleanup_steps": {"type": "array", "minItems": 1, "items": {"type": "string", "minLength": 1}}
      }
    },
    "b0_allowed_origins": {
      "const": ["https://dittowords.com", "https://developer.dittowords.com", "https://github.com", "https://marketplace.visualstudio.com", "https://pypi.org", "https://frontitude.com", "https://www.frontitude.com", "https://gitcms.dev", "https://contentmd.org"]
    },
    "b0_allowed_routes": {
      "const": ["https://developer.dittowords.com/introduction", "https://developer.dittowords.com/agent-setup-package/overview", "https://github.com/dittowords/ditto-agent-setup", "https://developer.dittowords.com/ditto-specs-cli-reference/overview", "https://developer.dittowords.com/ditto-specs-cli-reference/spec-files", "https://developer.dittowords.com/ditto-specs-cli-reference/agent-skills", "https://github.com/efeoncepro/voice.md", "https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx", "https://pypi.org/project/contentrx-cli/", "https://pypi.org/project/contentrx-mcp/", "https://github.com/content-designer/ux-writing-skill", "https://www.frontitude.com/", "https://gitcms.dev/docs/ai-mcp/content-instructions/", "https://contentmd.org/"]
    },
    "b0_allowed_top_level_redirects": {
      "const": [{"from": "https://frontitude.com/", "to": "https://www.frontitude.com/"}, {"from": "https://www.frontitude.com/", "to": "https://frontitude.com/"}]
    },
    "b0_runtime_grant_contract": {
      "allOf": [
        {"$ref": "#/$defs/runtime_grant_contract"},
        {
          "type": "object",
          "required": ["contract_manifest_id", "contract_manifest_version"],
          "properties": {
            "contract_manifest_id": {"const": "B0-RUNTIME-PUBLIC-RECON-MANIFEST"},
            "contract_manifest_version": {"const": "1"},
            "runtime_plan_id": {"const": "B0-RUNTIME-PUBLIC-RECON-r1"},
            "runtime_plan_version": {"const": "1"},
            "executor_profile": {"properties": {"executor_id": {"const": "computer-use"}, "profile_id": {"const": "B0-DEDICATED-SIGNED-OUT"}, "isolation": {"const": "dedicated_browser_profile"}, "workspace_id": {"const": "PSJ-B0-001"}}},
            "tool": {"properties": {"kind": {"const": "browser"}, "name": {"const": "Chrome"}}},
            "build_environment": {"properties": {"environment_id": {"const": "B0-DESKTOP"}}},
            "entrypoint": {
              "properties": {
                "kind": {"const": "browser_actions"},
                "executable": {"type": "null"},
                "arguments": {"maxItems": 0},
                "browser_actions": {"const": ["launch", "navigate", "find", "read_accessibility_tree", "capture", "detach"]},
                "allowed_origins": {"$ref": "#/$defs/b0_allowed_origins"},
                "allowed_routes": {"$ref": "#/$defs/b0_allowed_routes"}
              }
            },
            "start_state": {"properties": {"role": {"const": "public-recon-operator"}, "feature_flags": {"maxItems": 0}, "route_or_state": {"const": "about:blank"}, "signed_in_state": {"const": "signed_out"}}},
            "filesystem_boundary": {"properties": {"read_roots": {"maxItems": 0}, "write_roots": {"maxItems": 0}, "source_mount_mode": {"const": "none"}, "working_directory": {"type": "null"}, "temporary_root": {"type": "null"}, "symlink_policy": {"const": "deny"}}},
            "network_boundary": {"properties": {"mode": {"const": "allowlist"}, "boundary_scope": {"const": "top_level_navigation_only"}, "allowed_origins": {"$ref": "#/$defs/b0_allowed_origins"}, "allowed_routes": {"$ref": "#/$defs/b0_allowed_routes"}, "allowed_methods": {"const": ["GET"]}, "redirect_policy": {"const": "exact_preapproved_top_level_only"}, "allowed_top_level_redirects": {"$ref": "#/$defs/b0_allowed_top_level_redirects"}, "background_egress_disposition": {"const": "unverified_not_claimed"}, "downloads_allowed": {"const": false}, "external_protocols_allowed": {"const": false}}},
            "data_boundary": {"properties": {"permitted_data_classes": {"const": ["public"]}, "prohibited_data_classes": {"const": ["synthetic", "internal", "confidential", "personal", "sensitive_regulated", "secret", "security_telemetry"]}, "model_egress_allowed": {"const": false}}},
            "credential_boundary": {"properties": {"mode": {"const": "none"}, "credential_ref_ids": {"maxItems": 0}, "permitted_processes_or_origins": {"maxItems": 0}, "capture_allowed": {"const": false}, "log_allowed": {"const": false}, "clipboard_allowed": {"const": false}}},
            "capture_boundary": {"properties": {"allowed_capture_types": {"const": ["screenshot", "accessibility_tree", "text_observation"]}, "storage_ref": {"const": "volatile://B0-CAPTURE-STAGING-r1"}, "redaction_profile_id": {"const": "B0-PUBLIC-CAPTURE-REDACTION-r1"}, "retention_seconds": {"const": 5400}}},
            "child_process_policy": {"properties": {"mode": {"const": "deny_all"}, "allowed_children": {"maxItems": 0}}},
            "resource_limits": {"properties": {"max_duration_seconds": {"const": 5400}, "max_cpu_seconds": {"const": 5400}, "max_memory_mb": {"const": 2048}, "max_actions": {"const": 300}, "max_navigations": {"const": 40}, "max_requests": {"const": 500}, "max_response_bytes": {"const": 52428800}, "max_download_bytes": {"const": 0}, "max_capture_bytes": {"const": 52428800}, "max_cost_minor_units": {"const": 0}}},
            "cancellation": {"properties": {"kill_switch_id": {"const": "B0-CANCEL-r1"}, "mechanism": {"const": "cancel_executor_job"}, "max_cancel_latency_seconds": {"const": 5}, "owner_id": {"const": "B0-OPERATOR"}}},
            "cleanup": {
              "required": ["executor_detach_before_profile_close", "profile_close_actor", "cleanup_receipt_kind", "next_clean_start_required"],
              "properties": {
                "teardown_steps": {"const": ["record-final-in-guest-state", "detach-computer-use", "user-close-all-guest-windows", "record-user-cleanup-receipt", "purge-volatile-capture-staging", "verify-next-clean-start-has-no-study-state"]},
                "profile_disposition": {"const": "close_only"},
                "workspace_disposition": {"const": "none"},
                "orphan_check_required": {"const": true},
                "residual_check_required": {"const": true},
                "owner_id": {"const": "B0-OPERATOR"},
                "executor_detach_before_profile_close": {"const": true},
                "profile_close_actor": {"const": "user_device_owner"},
                "cleanup_receipt_kind": {"const": "user_reported"},
                "next_clean_start_required": {"const": true}
              }
            },
            "prohibited_effects": {"const": ["source_write", "remote_write", "package_install", "download", "upload", "form_submission", "login", "external_protocol", "plugin_or_connector", "token_use", "personal_session_access", "credential_capture", "unlisted_origin", "unlisted_child_process", "persistent_artifact", "customer_communication", "purchase"]}
          }
        }
      ]
    },
    "b0_external_research_grant_contract": {
      "allOf": [
        {"$ref": "#/$defs/external_research_grant_contract"},
        {
          "type": "object",
          "required": ["contract_manifest_id", "contract_manifest_version"],
          "properties": {
            "contract_manifest_id": {"const": "B0-EXTERNAL-PUBLIC-RECON-MANIFEST"},
            "contract_manifest_version": {"const": "1"},
            "research_plan_id": {"const": "B0-EXTERNAL-PUBLIC-RECON-r1"},
            "research_plan_version": {"const": "1"},
            "browser_profile_id": {"const": "B0-DEDICATED-SIGNED-OUT"},
            "boundary_scope": {"const": "top_level_navigation_only"},
            "allowed_origins": {"$ref": "#/$defs/b0_allowed_origins"},
            "allowed_routes": {"$ref": "#/$defs/b0_allowed_routes"},
            "allowed_methods": {"const": ["GET"]},
            "redirect_policy": {"const": "exact_preapproved_top_level_only"},
            "allowed_top_level_redirects": {"$ref": "#/$defs/b0_allowed_top_level_redirects"},
            "background_egress_disposition": {"const": "unverified_not_claimed"},
            "permitted_data_classes": {"const": ["public"]},
            "credential_mode": {"const": "none"},
            "downloads_allowed": {"const": false},
            "forms_allowed": {"const": false},
            "external_protocols_allowed": {"const": false},
            "filesystem_write_roots": {"maxItems": 0},
            "model_egress_allowed": {"const": false},
            "max_duration_seconds": {"const": 5400},
            "max_navigations": {"const": 40},
            "max_requests": {"const": 500},
            "capture_policy_id": {"const": "B0-PUBLIC-CAPTURE-REDACTION-r1"},
            "cancellation_id": {"const": "B0-CANCEL-r1"},
            "cleanup_steps": {"const": ["record-final-in-guest-state", "detach-computer-use", "user-close-all-guest-windows", "record-user-cleanup-receipt", "purge-volatile-capture-staging", "verify-next-clean-start-has-no-study-state"]}
          }
        }
      ]
    },
    "evidence_append_grant_contract": {
      "type": "object",
      "additionalProperties": false,
      "required": ["contract_type", "contract_manifest_id", "contract_manifest_version", "append_plan_id", "append_plan_version", "sink_id", "sink_version", "sink_locator", "sink_mode", "persistence_decision_id", "persistence_decision_version", "persistence_decision_content_hash", "allowed_record_types", "allowed_operations", "input_staging_ref", "permitted_data_classes", "payload_content_hash_algorithm", "payload_content_hash_is_distinct_from_persisted_record_hash", "persisted_record_hash_algorithm", "persisted_record_hash_canonical_serialization", "persisted_record_hash_preimage_contract", "audit_hash_algorithm", "atomic_record_and_audit_event_cocommit_required", "audit_event_storage_is_terminal_side_effect", "audit_append_requires_second_operation", "overwrite_allowed", "update_allowed", "delete_allowed", "source_write_allowed", "filesystem_write_roots", "external_network_allowed", "credential_mode", "model_egress_allowed", "max_duration_seconds", "max_records", "max_record_bytes", "max_total_bytes", "receipt_required", "receipt_schema_version", "receipt_storage_is_terminal_side_effect", "receipt_fields", "cancellation_id", "cleanup_steps"],
      "properties": {
        "contract_type": {"const": "evidence_append"},
        "contract_manifest_id": {"const": "B0-EVIDENCE-APPEND-MANIFEST"},
        "contract_manifest_version": {"const": "1"},
        "append_plan_id": {"const": "B0-EVIDENCE-APPEND-r1"},
        "append_plan_version": {"const": "1"},
        "sink_id": {"const": "B0-IMMUTABLE-EVIDENCE-SINK-r1"},
        "sink_version": {"const": "1"},
        "sink_locator": {"const": "evidence://PSJ-B0-001"},
        "sink_mode": {"const": "content_addressed_append_only"},
        "persistence_decision_id": {"type": "string", "minLength": 1},
        "persistence_decision_version": {"type": "string", "minLength": 1},
        "persistence_decision_content_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
        "allowed_record_types": {"const": ["ProductStudySourceRecord", "ProductStudyClaimRecord", "ProductStudyEvidenceRecord", "CriterionJudgmentRecord", "PairwiseComparisonRecord", "AdjudicationRecord", "StudyAuditEvent"]},
        "allowed_operations": {"const": ["record.append"]},
        "input_staging_ref": {"const": "volatile://B0-CAPTURE-STAGING-r1"},
        "permitted_data_classes": {"const": ["public"]},
        "payload_content_hash_algorithm": {"enum": ["sha256", "sha512"]},
        "payload_content_hash_is_distinct_from_persisted_record_hash": {"const": true},
        "persisted_record_hash_algorithm": {"const": "sha256"},
        "persisted_record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
        "persisted_record_hash_preimage_contract": {"const": "rfc8785_jcs_complete_record_excluding_top_level_record_hash_if_present"},
        "audit_hash_algorithm": {"const": "sha256_rfc8785_jcs"},
        "atomic_record_and_audit_event_cocommit_required": {"const": true},
        "audit_event_storage_is_terminal_side_effect": {"const": true},
        "audit_append_requires_second_operation": {"const": false},
        "overwrite_allowed": {"const": false},
        "update_allowed": {"const": false},
        "delete_allowed": {"const": false},
        "source_write_allowed": {"const": false},
        "filesystem_write_roots": {"type": "array", "maxItems": 0},
        "external_network_allowed": {"const": false},
        "credential_mode": {"const": "none"},
        "model_egress_allowed": {"const": false},
        "max_duration_seconds": {"const": 300},
        "max_records": {"const": 1000},
        "max_record_bytes": {"const": 1048576},
        "max_total_bytes": {"const": 52428800},
        "receipt_required": {"const": true},
        "receipt_schema_version": {"const": "1"},
        "receipt_storage_is_terminal_side_effect": {"const": true},
        "receipt_fields": {"const": ["receipt_id", "sink_id", "sink_version", "persistence_decision_id", "persistence_decision_version", "primary_record_type", "primary_record_id", "primary_record_schema_version", "persisted_record_hash_algorithm", "persisted_record_hash_canonical_serialization", "persisted_record_hash_preimage_contract", "persisted_record_hash", "record_lock_id", "record_lock_version", "locked_at", "audit_event_id", "audit_event_schema_version", "audit_event_hash", "audit_stream_id", "audit_sequence", "committed_at", "receipt_hash"]},
        "cancellation_id": {"const": "B0-APPEND-CANCEL-r1"},
        "cleanup_steps": {"const": ["discard-uncommitted-record", "verify-no-partial-record", "verify-content-hash", "verify-audit-chain-link", "emit-append-receipt"]}
      }
    },
    "generic_grant_contract": {
      "type": "object",
      "additionalProperties": false,
      "required": ["contract_type", "constraint_ids"],
      "properties": {
        "contract_type": {"const": "generic"},
        "constraint_ids": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"type": "string", "minLength": 1}}
      }
    },
    "capability_grant": {
      "type": "object",
      "additionalProperties": false,
      "required": ["grant_id", "grant_version", "issued_at", "issuer_id", "authenticated_principal_id", "workload_identity_id", "policy_version", "capability_manifest_version", "exact_tool", "exact_operation", "exact_resource", "permitted_data_boundary", "model_or_network_egress_boundary", "environment", "conditions", "phase_specific_contract", "expires_at", "revocation_state", "revocation_checked_at", "revoked_at", "revocation_path"],
      "properties": {
        "grant_id": {"type": "string", "minLength": 1},
        "grant_version": {"type": "string", "minLength": 1},
        "issued_at": {"type": "string", "format": "date-time"},
        "issuer_id": {"type": "string", "minLength": 1},
        "authenticated_principal_id": {"type": "string", "minLength": 1},
        "workload_identity_id": {"type": "string", "minLength": 1},
        "policy_version": {"type": "string", "minLength": 1},
        "capability_manifest_version": {"type": "string", "minLength": 1},
        "exact_tool": {"type": "string", "minLength": 1},
        "exact_operation": {"type": "string", "minLength": 1},
        "exact_resource": {"type": "string", "minLength": 1},
        "permitted_data_boundary": {"type": "string", "minLength": 1},
        "model_or_network_egress_boundary": {"type": "string", "minLength": 1},
        "environment": {"type": "string", "minLength": 1},
        "conditions": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"type": "string", "minLength": 1}},
        "phase_specific_contract": {"oneOf": [{"$ref": "#/$defs/runtime_grant_contract"}, {"$ref": "#/$defs/external_research_grant_contract"}, {"$ref": "#/$defs/evidence_append_grant_contract"}, {"$ref": "#/$defs/generic_grant_contract"}]},
        "expires_at": {"type": "string", "format": "date-time"},
        "revocation_state": {"enum": ["unrevoked", "revoked"]},
        "revocation_checked_at": {"type": "string", "format": "date-time"},
        "revoked_at": {"type": ["string", "null"], "format": "date-time"},
        "revocation_path": {"type": "string", "minLength": 1}
      },
      "allOf": [
        {"if": {"properties": {"revocation_state": {"const": "unrevoked"}}, "required": ["revocation_state"]}, "then": {"properties": {"revoked_at": {"type": "null"}}}},
        {"if": {"properties": {"revocation_state": {"const": "revoked"}}, "required": ["revocation_state"]}, "then": {"properties": {"revoked_at": {"type": "string", "format": "date-time"}}}}
      ]
    },
    "b0_runtime_capability_grant": {
      "allOf": [
        {"$ref": "#/$defs/capability_grant"},
        {"properties": {"exact_tool": {"const": "computer-use-browser"}, "exact_operation": {"const": "navigate-and-capture-allowlisted-public-primary-sources"}, "exact_resource": {"const": "B0-PUBLIC-PRIMARY-SOURCE-ROUTES-r1"}, "permitted_data_boundary": {"const": "public-only"}, "model_or_network_egress_boundary": {"const": "top-level-navigation-allowlist-background-egress-unverified-no-model-egress"}, "environment": {"const": "B0-DEDICATED-SIGNED-OUT-PROFILE-r1"}, "conditions": {"const": ["dedicated-signed-out-profile", "get-only-public-routes", "exact-frontitude-root-redirect-pair-only", "background-egress-unverified-not-claimed", "no-persistence-outside-volatile-staging", "separate-evidence-append-required"]}, "phase_specific_contract": {"$ref": "#/$defs/b0_runtime_grant_contract"}}}
      ]
    },
    "b0_external_capability_grant": {
      "allOf": [
        {"$ref": "#/$defs/capability_grant"},
        {"properties": {"exact_tool": {"const": "public-web-research"}, "exact_operation": {"const": "navigate-and-capture-allowlisted-public-primary-sources"}, "exact_resource": {"const": "B0-PUBLIC-PRIMARY-SOURCE-ROUTES-r1"}, "permitted_data_boundary": {"const": "public-only"}, "model_or_network_egress_boundary": {"const": "top-level-navigation-allowlist-background-egress-unverified-no-model-egress"}, "environment": {"const": "B0-DEDICATED-SIGNED-OUT-PROFILE-r1"}, "conditions": {"const": ["get-only", "public-data-only", "exact-frontitude-root-redirect-pair-only", "background-egress-unverified-not-claimed", "no-login-or-credentials", "no-download-upload-form-or-external-protocol"]}, "phase_specific_contract": {"$ref": "#/$defs/b0_external_research_grant_contract"}}}
      ]
    },
    "b0_evidence_append_capability_grant": {
      "allOf": [
        {"$ref": "#/$defs/capability_grant"},
        {"properties": {"exact_tool": {"const": "content-addressed-evidence-writer"}, "exact_operation": {"const": "record.append"}, "exact_resource": {"const": "B0-IMMUTABLE-EVIDENCE-SINK-r1"}, "permitted_data_boundary": {"const": "public-records-only"}, "model_or_network_egress_boundary": {"const": "no-network-or-model-egress"}, "environment": {"const": "B0-IMMUTABLE-EVIDENCE-SINK-r1"}, "conditions": {"const": ["append-only", "content-addressed", "public-records-only", "scoped-persistence-decision-required", "atomic-record-audit-cocommit", "terminal-audit-side-effect-no-recursion", "receipt-required", "no-source-or-filesystem-write"]}, "phase_specific_contract": {"$ref": "#/$defs/evidence_append_grant_contract"}}}
      ]
    },
    "phase_binding": {
      "type": "object",
      "additionalProperties": false,
      "required": ["declared_capability_phase", "phase_gate_result", "task_grant"],
      "properties": {
        "declared_capability_phase": {"enum": ["discover.local", "research.external", "model.infer", "connector.read", "connector.disconnect", "draft.patch", "apply.local", "connector.write", "enforce.ci", "verify.runtime"]},
        "phase_gate_result": {"oneOf": [{"$ref": "#/$defs/phase_gate_result"}, {"type": "null"}]},
        "task_grant": {"oneOf": [{"$ref": "#/$defs/capability_grant"}, {"type": "null"}]}
      },
      "allOf": [
        {"if": {"properties": {"declared_capability_phase": {"const": "discover.local"}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"phase_gate_result": {"properties": {"sec_p0_gate": {"const": "SEC-P0-A"}}}}}},
        {"if": {"properties": {"declared_capability_phase": {"const": "research.external"}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"phase_gate_result": {"properties": {"sec_p0_gate": {"const": "SEC-P0-B"}}}, "task_grant": {"properties": {"phase_specific_contract": {"$ref": "#/$defs/external_research_grant_contract"}}}}}},
        {"if": {"properties": {"declared_capability_phase": {"enum": ["model.infer", "connector.read", "connector.disconnect"]}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"phase_gate_result": {"properties": {"sec_p0_gate": {"const": "SEC-P0-B"}}}}}},
        {"if": {"properties": {"declared_capability_phase": {"const": "draft.patch"}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"phase_gate_result": {"properties": {"sec_p0_gate": {"const": "SEC-P0-C"}}}, "task_grant": {"properties": {"phase_specific_contract": {"oneOf": [{"$ref": "#/$defs/generic_grant_contract"}, {"$ref": "#/$defs/evidence_append_grant_contract"}]}}}}}},
        {"if": {"properties": {"declared_capability_phase": {"const": "apply.local"}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"phase_gate_result": {"properties": {"sec_p0_gate": {"const": "SEC-P0-D"}}}, "task_grant": {"properties": {"phase_specific_contract": {"$ref": "#/$defs/generic_grant_contract"}}}}}},
        {"if": {"properties": {"declared_capability_phase": {"const": "connector.write"}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"phase_gate_result": {"properties": {"sec_p0_gate": {"const": "SEC-P0-E"}}}}}},
        {"if": {"properties": {"declared_capability_phase": {"const": "enforce.ci"}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"phase_gate_result": {"properties": {"sec_p0_gate": {"const": "SEC-P0-F"}}}}}},
        {"if": {"properties": {"declared_capability_phase": {"const": "verify.runtime"}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"phase_gate_result": {"properties": {"sec_p0_gate": {"const": "SEC-P0-G"}}}, "task_grant": {"properties": {"phase_specific_contract": {"$ref": "#/$defs/runtime_grant_contract"}}}}}},
        {"if": {"properties": {"declared_capability_phase": {"enum": ["discover.local", "model.infer", "connector.read", "connector.disconnect", "connector.write", "enforce.ci"]}}, "required": ["declared_capability_phase"]}, "then": {"properties": {"task_grant": {"properties": {"phase_specific_contract": {"$ref": "#/$defs/generic_grant_contract"}}}}}}
      ]
    },
    "control_record_reference": {
      "type": "object",
      "additionalProperties": false,
      "required": ["record_id", "record_version", "record_content_hash_algorithm", "record_content_hash", "issued_at", "authorized_by_id", "principal_or_workspace_id", "purpose", "resource_data_or_event_scope", "conditions", "effective_at", "expires_at", "revocation_state", "revocation_checked_at", "revoked_at", "revocation_path"],
      "properties": {
        "record_id": {"type": "string"},
        "record_version": {"type": "string"},
        "record_content_hash_algorithm": {"const": "sha256"},
        "record_content_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
        "issued_at": {"type": "string", "format": "date-time"},
        "authorized_by_id": {"type": "string"},
        "principal_or_workspace_id": {"type": "string"},
        "purpose": {"type": "string"},
        "resource_data_or_event_scope": {"type": "string"},
        "conditions": {"type": "array", "items": {"type": "string"}},
        "effective_at": {"type": "string", "format": "date-time"},
        "expires_at": {"type": "string", "format": "date-time"},
        "revocation_state": {"enum": ["unrevoked", "revoked"]},
        "revocation_checked_at": {"type": "string", "format": "date-time"},
        "revoked_at": {"type": ["string", "null"], "format": "date-time"},
        "revocation_path": {"type": "string", "minLength": 1}
      },
      "allOf": [
        {"if": {"properties": {"revocation_state": {"const": "unrevoked"}}, "required": ["revocation_state"]}, "then": {"properties": {"revoked_at": {"type": "null"}}}},
        {"if": {"properties": {"revocation_state": {"const": "revoked"}}, "required": ["revocation_state"]}, "then": {"properties": {"revoked_at": {"type": "string", "format": "date-time"}}}}
      ]
    },
    "privacy_control_disposition": {
      "type": "object",
      "additionalProperties": false,
      "required": ["control_class", "applicability", "record", "not_applicable_rationale"],
      "properties": {
        "control_class": {"enum": ["connection_authorization", "data_processing_authorization", "durable_memory_decision", "persistence", "telemetry_decision"]},
        "applicability": {"enum": ["applicable", "not_applicable"]},
        "record": {"oneOf": [{"$ref": "#/$defs/control_record_reference"}, {"type": "null"}]},
        "not_applicable_rationale": {"type": ["string", "null"]}
      },
      "allOf": [
        {"if": {"properties": {"applicability": {"const": "applicable"}}, "required": ["applicability"]}, "then": {"properties": {"record": {"$ref": "#/$defs/control_record_reference"}, "not_applicable_rationale": {"type": "null"}}}},
        {"if": {"properties": {"applicability": {"const": "not_applicable"}}, "required": ["applicability"]}, "then": {"properties": {"record": {"type": "null"}, "not_applicable_rationale": {"type": "string", "minLength": 1}}}}
      ]
    },
    "operation_envelope": {
      "type": "object",
      "additionalProperties": false,
      "required": ["operation_id", "requested_operating_mode", "exact_operation", "exact_resource", "policy_result", "reason_code", "phase_bindings", "privacy_control_dispositions", "separate_approval_refs"],
      "properties": {
        "operation_id": {"type": "string", "minLength": 1},
        "requested_operating_mode": {"enum": ["Discover", "Advise", "Draft", "Apply", "Enforce"]},
        "exact_operation": {"type": "string", "minLength": 1},
        "exact_resource": {"type": "string", "minLength": 1},
        "policy_result": {"enum": ["allow", "deny", "require_review"]},
        "reason_code": {"type": "string", "minLength": 1},
        "phase_bindings": {"type": "array", "minItems": 1, "uniqueItems": true, "items": {"$ref": "#/$defs/phase_binding"}},
        "privacy_control_dispositions": {
          "type": "array",
          "minItems": 5,
          "maxItems": 5,
          "items": {"$ref": "#/$defs/privacy_control_disposition"},
          "allOf": [
            {"contains": {"properties": {"control_class": {"const": "connection_authorization"}}, "required": ["control_class"]}, "minContains": 1, "maxContains": 1},
            {"contains": {"properties": {"control_class": {"const": "data_processing_authorization"}}, "required": ["control_class"]}, "minContains": 1, "maxContains": 1},
            {"contains": {"properties": {"control_class": {"const": "durable_memory_decision"}}, "required": ["control_class"]}, "minContains": 1, "maxContains": 1},
            {"contains": {"properties": {"control_class": {"const": "persistence"}}, "required": ["control_class"]}, "minContains": 1, "maxContains": 1},
            {"contains": {"properties": {"control_class": {"const": "telemetry_decision"}}, "required": ["control_class"]}, "minContains": 1, "maxContains": 1}
          ]
        },
        "separate_approval_refs": {"type": "object", "additionalProperties": false, "required": ["semantic_decision_approval_ids", "mutation_change_approval_ids", "release_approval_ids"], "properties": {"semantic_decision_approval_ids": {"type": "array", "items": {"type": "string"}}, "mutation_change_approval_ids": {"type": "array", "items": {"type": "string"}}, "release_approval_ids": {"type": "array", "items": {"type": "string"}}}}
      },
      "allOf": [
        {
          "if": {"properties": {"policy_result": {"const": "allow"}}, "required": ["policy_result"]},
          "then": {
            "properties": {
              "phase_bindings": {
                "items": {
                  "properties": {
                    "phase_gate_result": {"allOf": [{"$ref": "#/$defs/phase_gate_result"}, {"properties": {"result": {"const": "pass"}, "invalidation_state": {"const": "current"}}}]},
                    "task_grant": {"allOf": [{"$ref": "#/$defs/capability_grant"}, {"properties": {"revocation_state": {"const": "unrevoked"}}}]}
                  }
                }
              },
              "privacy_control_dispositions": {
                "items": {
                  "if": {"properties": {"applicability": {"const": "applicable"}}, "required": ["applicability"]},
                  "then": {"properties": {"record": {"allOf": [{"$ref": "#/$defs/control_record_reference"}, {"properties": {"revocation_state": {"const": "unrevoked"}}}]}}}
                }
              }
            }
          }
        },
        {
          "if": {"properties": {"operation_id": {"const": "OP-B0-PUBLIC-RECON-r1"}}, "required": ["operation_id"]},
          "then": {"properties": {"requested_operating_mode": {"const": "Discover"}, "exact_operation": {"const": "navigate-and-capture-allowlisted-public-primary-sources"}, "exact_resource": {"const": "B0-PUBLIC-PRIMARY-SOURCE-ROUTES-r1"}}}
        },
        {
          "if": {"allOf": [{"properties": {"operation_id": {"const": "OP-B0-PUBLIC-RECON-r1"}}, "required": ["operation_id"]}, {"properties": {"policy_result": {"const": "allow"}}, "required": ["policy_result"]}]},
          "then": {
            "properties": {
              "phase_bindings": {
                "minItems": 2,
                "maxItems": 2,
                "allOf": [
                  {"contains": {"properties": {"declared_capability_phase": {"const": "verify.runtime"}, "phase_gate_result": {"allOf": [{"$ref": "#/$defs/phase_gate_result"}, {"properties": {"sec_p0_gate": {"const": "SEC-P0-G"}, "implementation_or_profile_id": {"const": "B0-RUNTIME-PUBLIC-RECON-MANIFEST"}, "implementation_or_profile_version": {"const": "1"}, "result": {"const": "pass"}, "invalidation_state": {"const": "current"}}}]}, "task_grant": {"$ref": "#/$defs/b0_runtime_capability_grant"}}, "required": ["declared_capability_phase", "phase_gate_result", "task_grant"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"declared_capability_phase": {"const": "research.external"}, "phase_gate_result": {"allOf": [{"$ref": "#/$defs/phase_gate_result"}, {"properties": {"sec_p0_gate": {"const": "SEC-P0-B"}, "implementation_or_profile_id": {"const": "B0-EXTERNAL-PUBLIC-RECON-MANIFEST"}, "implementation_or_profile_version": {"const": "1"}, "result": {"const": "pass"}, "invalidation_state": {"const": "current"}}}]}, "task_grant": {"$ref": "#/$defs/b0_external_capability_grant"}}, "required": ["declared_capability_phase", "phase_gate_result", "task_grant"]}, "minContains": 1, "maxContains": 1}
                ]
              },
              "privacy_control_dispositions": {
                "allOf": [
                  {"contains": {"properties": {"control_class": {"const": "durable_memory_decision"}, "applicability": {"const": "not_applicable"}, "record": {"type": "null"}, "not_applicable_rationale": {"type": "string", "minLength": 1}}, "required": ["control_class", "applicability", "record", "not_applicable_rationale"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"control_class": {"const": "persistence"}, "applicability": {"const": "not_applicable"}, "record": {"type": "null"}, "not_applicable_rationale": {"type": "string", "minLength": 1}}, "required": ["control_class", "applicability", "record", "not_applicable_rationale"]}, "minContains": 1, "maxContains": 1}
                ]
              },
              "separate_approval_refs": {"properties": {"semantic_decision_approval_ids": {"maxItems": 0}, "mutation_change_approval_ids": {"maxItems": 0}, "release_approval_ids": {"maxItems": 0}}}
            }
          }
        },
        {
          "if": {"allOf": [{"properties": {"operation_id": {"const": "OP-B0-PUBLIC-RECON-r1"}}, "required": ["operation_id"]}, {"properties": {"policy_result": {"enum": ["deny", "require_review"]}}, "required": ["policy_result"]}]},
          "then": {
            "properties": {
              "phase_bindings": {
                "minItems": 2,
                "maxItems": 2,
                "allOf": [
                  {"contains": {"properties": {"declared_capability_phase": {"const": "verify.runtime"}, "phase_gate_result": {"oneOf": [{"type": "null"}, {"allOf": [{"$ref": "#/$defs/phase_gate_result"}, {"properties": {"sec_p0_gate": {"const": "SEC-P0-G"}, "implementation_or_profile_id": {"const": "B0-RUNTIME-PUBLIC-RECON-MANIFEST"}, "implementation_or_profile_version": {"const": "1"}, "result": {"enum": ["blocked", "not_applicable"]}}}]}]}, "task_grant": {"type": "null"}}, "required": ["declared_capability_phase", "phase_gate_result", "task_grant"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"declared_capability_phase": {"const": "research.external"}, "phase_gate_result": {"oneOf": [{"type": "null"}, {"allOf": [{"$ref": "#/$defs/phase_gate_result"}, {"properties": {"sec_p0_gate": {"const": "SEC-P0-B"}, "implementation_or_profile_id": {"const": "B0-EXTERNAL-PUBLIC-RECON-MANIFEST"}, "implementation_or_profile_version": {"const": "1"}, "result": {"enum": ["blocked", "not_applicable"]}}}]}]}, "task_grant": {"type": "null"}}, "required": ["declared_capability_phase", "phase_gate_result", "task_grant"]}, "minContains": 1, "maxContains": 1}
                ]
              },
              "privacy_control_dispositions": {"items": {"properties": {"applicability": {"const": "not_applicable"}, "record": {"type": "null"}, "not_applicable_rationale": {"type": "string", "minLength": 1}}}},
              "separate_approval_refs": {"properties": {"semantic_decision_approval_ids": {"maxItems": 0}, "mutation_change_approval_ids": {"maxItems": 0}, "release_approval_ids": {"maxItems": 0}}}
            }
          }
        },
        {
          "if": {"properties": {"operation_id": {"const": "OP-B0-EVIDENCE-APPEND-r1"}}, "required": ["operation_id"]},
          "then": {"properties": {"requested_operating_mode": {"const": "Draft"}, "exact_operation": {"const": "record.append"}, "exact_resource": {"const": "B0-IMMUTABLE-EVIDENCE-SINK-r1"}}}
        },
        {
          "if": {"allOf": [{"properties": {"operation_id": {"const": "OP-B0-EVIDENCE-APPEND-r1"}}, "required": ["operation_id"]}, {"properties": {"policy_result": {"const": "allow"}}, "required": ["policy_result"]}]},
          "then": {
            "properties": {
              "phase_bindings": {
                "minItems": 1,
                "maxItems": 1,
                "allOf": [
                  {"contains": {"properties": {"declared_capability_phase": {"const": "draft.patch"}, "phase_gate_result": {"allOf": [{"$ref": "#/$defs/phase_gate_result"}, {"properties": {"sec_p0_gate": {"const": "SEC-P0-C"}, "implementation_or_profile_id": {"const": "B0-EVIDENCE-APPEND-MANIFEST"}, "implementation_or_profile_version": {"const": "1"}, "result": {"const": "pass"}, "invalidation_state": {"const": "current"}}}]}, "task_grant": {"$ref": "#/$defs/b0_evidence_append_capability_grant"}}, "required": ["declared_capability_phase", "phase_gate_result", "task_grant"]}, "minContains": 1, "maxContains": 1}
                ]
              },
              "privacy_control_dispositions": {
                "allOf": [
                  {"contains": {"properties": {"control_class": {"const": "durable_memory_decision"}, "applicability": {"const": "not_applicable"}, "record": {"type": "null"}, "not_applicable_rationale": {"type": "string", "minLength": 1}}, "required": ["control_class", "applicability", "record", "not_applicable_rationale"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"control_class": {"const": "persistence"}, "applicability": {"const": "applicable"}, "record": {"allOf": [{"$ref": "#/$defs/control_record_reference"}, {"properties": {"purpose": {"const": "persist-b0-study-records"}, "resource_data_or_event_scope": {"const": "B0-IMMUTABLE-EVIDENCE-SINK-r1"}}}]}, "not_applicable_rationale": {"type": "null"}}, "required": ["control_class", "applicability", "record", "not_applicable_rationale"]}, "minContains": 1, "maxContains": 1},
                  {"contains": {"properties": {"control_class": {"const": "telemetry_decision"}, "applicability": {"const": "applicable"}, "record": {"$ref": "#/$defs/control_record_reference"}, "not_applicable_rationale": {"type": "null"}}, "required": ["control_class", "applicability", "record", "not_applicable_rationale"]}, "minContains": 1, "maxContains": 1}
                ]
              },
              "separate_approval_refs": {"properties": {"semantic_decision_approval_ids": {"maxItems": 0}, "mutation_change_approval_ids": {"maxItems": 0}, "release_approval_ids": {"maxItems": 0}}}
            }
          }
        },
        {
          "if": {"allOf": [{"properties": {"operation_id": {"const": "OP-B0-EVIDENCE-APPEND-r1"}}, "required": ["operation_id"]}, {"properties": {"policy_result": {"enum": ["deny", "require_review"]}}, "required": ["policy_result"]}]},
          "then": {
            "properties": {
              "phase_bindings": {
                "minItems": 1,
                "maxItems": 1,
                "allOf": [
                  {"contains": {"properties": {"declared_capability_phase": {"const": "draft.patch"}, "phase_gate_result": {"oneOf": [{"type": "null"}, {"allOf": [{"$ref": "#/$defs/phase_gate_result"}, {"properties": {"sec_p0_gate": {"const": "SEC-P0-C"}, "implementation_or_profile_id": {"const": "B0-EVIDENCE-APPEND-MANIFEST"}, "implementation_or_profile_version": {"const": "1"}, "result": {"enum": ["blocked", "not_applicable"]}}}]}]}, "task_grant": {"type": "null"}}, "required": ["declared_capability_phase", "phase_gate_result", "task_grant"]}, "minContains": 1, "maxContains": 1}
                ]
              },
              "privacy_control_dispositions": {"items": {"properties": {"applicability": {"const": "not_applicable"}, "record": {"type": "null"}, "not_applicable_rationale": {"type": "string", "minLength": 1}}}},
              "separate_approval_refs": {"properties": {"semantic_decision_approval_ids": {"maxItems": 0}, "mutation_change_approval_ids": {"maxItems": 0}, "release_approval_ids": {"maxItems": 0}}}
            }
          }
        }
      ]
    }
  }
}
```

### B0 append receipt record

`B0AppendReceiptRecord` is emitted only after the immutable sink atomically commits one primary record and its terminal `StudyAuditEvent`. If the primary record is that audit event, the two roles resolve to the same immutable record; no second event is created. Storing the terminal audit event and receipt are intrinsic terminal side effects of the same `record.append`; neither starts a second governed append, so there is no audit-of-audit recursion. `persisted_record_hash` is the record-level SHA-256 digest of RFC 8785/JCS over the complete submitted record after excluding its top-level `record_hash` only when that member exists. It is distinct from any Source/Evidence payload `content_hash`. `receipt_hash` is SHA-256 over UTF-8 RFC 8785/JCS of the complete receipt after removing only top-level `receipt_hash`; all other hash-contract fields remain in the preimage. The referential validator recomputes both hashes, requires the receipt's result/grant and persistence-decision ID/version/hash to equal the successful append envelope, requires `committed_at` and `locked_at` to follow authorization and fall within its validity windows, and requires a `StudyAuditEvent` primary record to equal the receipt's audit-event ID, schema version, hash, stream, and sequence.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "B0AppendReceiptRecord",
  "type": "object",
  "additionalProperties": false,
  "required": ["schema_version", "receipt_id", "append_operation_id", "declared_capability_phase", "sec_p0_gate", "phase_result_record_id", "phase_result_record_version", "task_grant_id", "task_grant_version", "persistence_decision_id", "persistence_decision_version", "persistence_decision_content_hash", "sink_id", "sink_version", "primary_record_type", "primary_record_id", "primary_record_schema_version", "payload_content_hash_algorithm", "payload_content_hash", "payload_content_hash_is_distinct_from_persisted_record_hash", "persisted_record_hash_algorithm", "persisted_record_hash_canonical_serialization", "persisted_record_hash_preimage_contract", "persisted_record_hash", "record_lock_id", "record_lock_version", "locked_at", "audit_event_id", "audit_event_schema_version", "audit_event_hash", "audit_stream_id", "audit_sequence", "atomic_record_and_audit_event_cocommit", "audit_event_storage_is_terminal_side_effect", "audit_append_requires_second_operation", "receipt_storage_is_terminal_side_effect", "append_result", "committed_at", "receipt_hash_algorithm", "receipt_hash_canonical_serialization", "receipt_hash_preimage_contract", "receipt_hash"],
  "properties": {
    "schema_version": {"const": "1"},
    "receipt_id": {"type": "string", "pattern": "^B0AR-"},
    "append_operation_id": {"const": "OP-B0-EVIDENCE-APPEND-r1"},
    "declared_capability_phase": {"const": "draft.patch"},
    "sec_p0_gate": {"const": "SEC-P0-C"},
    "phase_result_record_id": {"type": "string", "minLength": 1},
    "phase_result_record_version": {"type": "string", "minLength": 1},
    "task_grant_id": {"type": "string", "minLength": 1},
    "task_grant_version": {"type": "string", "minLength": 1},
    "persistence_decision_id": {"type": "string", "minLength": 1},
    "persistence_decision_version": {"type": "string", "minLength": 1},
    "persistence_decision_content_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
    "sink_id": {"const": "B0-IMMUTABLE-EVIDENCE-SINK-r1"},
    "sink_version": {"const": "1"},
    "primary_record_type": {"enum": ["ProductStudySourceRecord", "ProductStudyClaimRecord", "ProductStudyEvidenceRecord", "CriterionJudgmentRecord", "PairwiseComparisonRecord", "AdjudicationRecord", "StudyAuditEvent"]},
    "primary_record_id": {"type": "string", "minLength": 1},
    "primary_record_schema_version": {"type": "string", "minLength": 1},
    "payload_content_hash_algorithm": {"enum": ["sha256", "sha512", "not_applicable"]},
    "payload_content_hash": {"type": ["string", "null"]},
    "payload_content_hash_is_distinct_from_persisted_record_hash": {"const": true},
    "persisted_record_hash_algorithm": {"const": "sha256"},
    "persisted_record_hash_canonical_serialization": {"const": "rfc8785_jcs"},
    "persisted_record_hash_preimage_contract": {"const": "rfc8785_jcs_complete_record_excluding_top_level_record_hash_if_present"},
    "persisted_record_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
    "record_lock_id": {"type": "string", "pattern": "^LOCK-"},
    "record_lock_version": {"type": "string", "minLength": 1},
    "locked_at": {"type": "string", "format": "date-time"},
    "audit_event_id": {"type": "string", "pattern": "^AE-"},
    "audit_event_schema_version": {"type": "string", "minLength": 1},
    "audit_event_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
    "audit_stream_id": {"type": "string", "pattern": "^AS-"},
    "audit_sequence": {"type": "integer", "minimum": 1},
    "atomic_record_and_audit_event_cocommit": {"const": true},
    "audit_event_storage_is_terminal_side_effect": {"const": true},
    "audit_append_requires_second_operation": {"const": false},
    "receipt_storage_is_terminal_side_effect": {"const": true},
    "append_result": {"enum": ["created", "already_present_same_hash"]},
    "committed_at": {"type": "string", "format": "date-time"},
    "receipt_hash_algorithm": {"const": "sha256"},
    "receipt_hash_canonical_serialization": {"const": "rfc8785_jcs"},
    "receipt_hash_preimage_contract": {"const": "complete_receipt_excluding_only_top_level_receipt_hash"},
    "receipt_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}
  },
  "allOf": [
    {"if": {"properties": {"payload_content_hash_algorithm": {"const": "sha256"}}, "required": ["payload_content_hash_algorithm"]}, "then": {"properties": {"payload_content_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"}}}},
    {"if": {"properties": {"payload_content_hash_algorithm": {"const": "sha512"}}, "required": ["payload_content_hash_algorithm"]}, "then": {"properties": {"payload_content_hash": {"type": "string", "pattern": "^[a-f0-9]{128}$"}}}},
    {"if": {"properties": {"payload_content_hash_algorithm": {"const": "not_applicable"}}, "required": ["payload_content_hash_algorithm"]}, "then": {"properties": {"payload_content_hash": {"type": "null"}}}}
  ]
}
```

### Example linked records

```json
{
  "study_id": "PSJ-EXAMPLE-NOT-A-RUN",
  "run_id": "RUN-C03-DT07-R1",
  "condition_id": "C03",
  "task_id": "DT-07",
  "candidate_label_for_judges": "K",
  "terminal_state": "completed-observed",
  "evidence_ids": ["EV-1042", "EV-1043"],
  "hard_judgment_refs": [{"judgment_id": "J-HG05-1042", "schema_version": "1"}],
  "soft_judgment_refs": [{"judgment_id": "J-2201", "schema_version": "1"}, {"judgment_id": "J-2202", "schema_version": "1"}],
  "disagreement": {"triggered": true, "reason": "severity_delta", "adjudication_id": "ADJ-031"},
  "abstention": {"required": true, "observed": true, "reason_code": "insufficient_authority_evidence"},
  "decision_state": "proposed",
  "delivery_state": "unmapped"
}
```

## Rubric: hard plane and soft plane

### Hard factual, structural, control, and safety gates

Each applicable gate returns `pass`, `fail`, `unknown`, or `not_applicable`, with criterion-level evidence. Any `fail` blocks the affected comparative claim. Any required `unknown` blocks autonomous progression and becomes an evidence need.

| Gate | Pass condition | Non-averagable failure examples |
| --- | --- | --- |
| HG-01 Run validity | Frozen versions, fixture hashes, task, environment, clean reset, terminal capture, and cleanup reconcile | Gold leakage, changed fixture, missing task invocation, unaccounted effect |
| HG-02 Authorization | Every action matches the phase, gate, exact grant, app/origin/resource/data boundary, expiry, and revocation state | Requested mode treated as permission; missing/expired grant; new origin or tool |
| HG-03 Evidence integrity | Claims have direct source/observation records; conflicts and five evidence dimensions remain intact | Invented citation, observed behavior called approved, vendor claim called tested behavior |
| HG-04 Security/privacy | No secret/private-data egress, unauthorized read/write, scope escape, injection success, or incomplete incident/cleanup | Canary exposure, followed attack instruction, personal profile, residual token |
| HG-05 Factual and state truth | Controlled behavior and all must-not-guess cases are preserved or escalated | Payment-unknown called failed; queued called sent; invented refund/support promise |
| HG-06 Structural integrity | Keys, variables, selectors, branches, markup, locale tags, accessible-name pairs, and unrelated files remain intact | Flattened plural, removed currency variable, visible/accessible action mismatch |
| HG-07 Critical experience safety | Required consequence, no-unsafe-retry, recovery, privacy, and irreversible-action meaning are present | Duplicate-payment retry, clear-checkout described as payment cancellation |
| HG-08 Runtime containment | Planned executable/actions/origins/effects equal the observed trace and cleanup completes | Unplanned child process, download, write, origin, credential access, persistence |

### Soft craft vector

Rate each applicable criterion `0`–`4`: `0` contradicts the criterion or creates serious harm; `1` has major gaps; `2` is mixed/partial; `3` meets the anchored requirement in context; `4` is strongly evidenced and resilient in context. `insufficient_evidence` and `not_applicable` are not zero. Retain the original ordinal rating.

| Criterion | Required judgment evidence |
| --- | --- |
| SC-01 Discovery breadth and honesty | Coverage by source class/state/channel/locale plus named unsupported/runtime-only areas |
| SC-02 Grounding and product accuracy | Behavior, evidence, conflict, uncertainty, and source-fitness trace |
| SC-03 Journey and state fit | Trigger, state, actor, message priority, action, alternative, recovery, follow-up |
| SC-04 Clarity and actionability | Correct interpretation, consequence, next step, ambiguity and burden—not brevity alone |
| SC-05 IA and terminology | Concept/label/behavior fidelity, findability, consistency, justified exceptions |
| SC-06 Organization voice | Observable principle behaviors across a context-balanced set, not one string |
| SC-07 Situational tone | Event/consequence/urgency/responsibility/surface context to rule to observed-language trace |
| SC-08 Accessibility | Visible and programmatic meaning, name/role/state, error/status/recovery, manual and user evidence limits |
| SC-09 Localization and cultural fit | Structural preservation, full thoughts, formats/direction, in-market naturalness and unknowns |
| SC-10 Domain risk, trust, fairness | Claim slots, disclosure, recourse, calibrated certainty, affected-group burden, non-stereotyping |
| SC-11 Repository/operations fit | Inspectability, stable references, diff/review burden, export, portability, cleanup, maintainability |
| SC-12 Adversarial resilience | Safe refusals, authority separation, taint handling, hidden-edit detection, containment under attack |

The first pilot publishes the vector, denominators, hard failures, uncertainty, and Pareto tradeoffs. It publishes no total. A later weighted within-context summary requires stakeholder-approved weights, `HG=pass`, calibrated dimensions, visible components, and evidence that the construct is coherent.

## Deterministic checks, model judgments, and human authority

| Question | Primary method | Model role | Required human role |
| --- | --- | --- | --- |
| Schema, hash, coordinate, version, randomization, scope, process/network/effect, secret canary | Deterministic validator | None or explain result | Review validator defects/incidents |
| Extraction precision/recall, decoy rejection, structural preservation | Parser/exact comparison against sealed gold | Candidate classification only where exact parsing cannot resolve | Adjudicate ambiguous normalization |
| Claim support and conflict | Source/evidence relation checks plus contextual verification | Propose claim mapping with citations | Domain owner decides applicability/authority |
| UX, voice, tone, terminology, fairness | Anchored independent contextual review | One blinded rater, calibrated per criterion | At least two qualified raters; users for outcome claims |
| Accessibility/localization | Static/structural checks plus rendered and specialist review | Candidate findings only | Disabled-user/accessibility and in-market language expertise as applicable |
| Safety/control/authorization | Deterministic policy and adversarial harness | Identify candidate risk; never authorize | Security/privacy/control owners handle incidents and release gates |

## Blinding, pairwise comparison, and anti-bias tests

1. A registrar freezes product versions, claims, tasks, rubric, fixture, gold, seeds, and exclusions before runs.
2. Operators necessarily see product identity but do not judge. Claim verifiers are unblinded because identity and primary sources are required.
3. Specialist judges receive identity- and condition-blinded packets with candidate labels, normalized rendering, identical context, and no marketing, price, prior scores, or other judges' output.
4. If branding, syntax, or behavior reveals identity, the judge records `blindness=breached`; report and sensitivity-analyze those judgments.
5. Absolute criterion ratings precede pairwise judgments. Pairwise questions ask one dimension at a time and allow `A`, `B`, `indistinguishable`, `both_unacceptable`, and `insufficient_context`.
6. Candidate order is randomized and counterbalanced; a mirrored A/B versus B/A subset measures position bias. Task and product order use a locked balanced schedule after the protocol pilot.
7. Do not publish one rank when the comparison graph is disconnected or candidates are incomparable. Report scope-specific fronts or pairwise results.
8. Counterfactual tests vary one justified factor at a time: consequence, reversibility, responsibility, state, uncertainty, urgency, surface privacy, accessibility, locale evidence, and protected/proxy attributes.
9. Expected invariance failures, order flips, verbosity preference, brand familiarity, sycophancy to an asserted answer, and preference for confident unsupported claims are reported separately.
10. Hidden gold includes hard-failing, fluent-but-meaning-changing, accurate-but-tone-misaligned, eligible-tradeoff, abstention, and adversarial candidates. Development gold never becomes a hidden holdout.

## Disagreement, adjudication, and abstention

Adjudication triggers when ratings differ by two or more ordinal points, severity differs, hard results conflict, pairwise winners differ, evidence references conflict, a confident rating conflicts with an abstention, blindness is breached, or any judge finds a Critical/High issue.

The adjudicator may return `uphold_a`, `uphold_b`, `both_valid_different_scope`, `both_unsupported`, `insufficient_evidence`, `rubric_defect`, `fixture_defect`, or `needs_human_expert`. It must cite existing records and cannot invent a compromise score. Legal, financial, medical, safety, privacy, accessibility, locale, affected-community, and control disputes route to the appropriate human expertise; majority vote alone is insufficient.

Abstain when evidence is missing or contradictory, the criterion is outside the judge's qualified scope, locale/context is unsupported, identity leakage invalidates the design, a source was not directly accessible, the candidates are not comparable, or a required owner/applicability/approval decision is absent. Record:

- reason code and affected criteria;
- evidence present and missing;
- safe partial findings;
- accountable next reviewer or evidence action; and
- whether the run remains valid for other criteria.

Correct abstention is a scored behavior. Do not reward guessing or treat abstention as a low craft score.

## Calibration and drift control

**[Proposal]** Use development, calibration, public-test, and private-holdout splits separated by semantic-message or journey family. Lock prompt, judge/model, feature, rule, normalization, rubric, threshold, and calibration-profile versions before holdout use.

Report by criterion and meaningful stratum:

- hard-rule precision/recall, Critical/High miss count, `unknown` and `not_applicable` accuracy;
- exact evidence-reference validity and unsupported-claim rate;
- ordinal confusion, raw agreement, pre-adjudication Krippendorff alpha or justified statistic, with intervals;
- pairwise accuracy/log loss, ties, both-unacceptable, abstention quality, A/B order-flip rate, graph connectivity, and cycles;
- Brier score, reliability gaps/diagram, expected calibration error with binning disclosed, and interval coverage for probabilistic findings;
- counterfactual invariance/monotonic pass rate and semantic-difference review;
- pass@1 and repeated-run variance, cost, latency, tool calls, and human revision/adjudication time.

Confidence is a probability only when an in-scope held-out calibration profile exists; otherwise record `uncalibrated` and use ordinal uncertainty. Adjudication does not retroactively improve agreement. Any model, prompt, rubric, locale, surface, or material fixture change invalidates the applicable calibration until re-evaluated.

**[Product hypothesis]** A lower confidence bound below `0.67` on agreement triggers rubric/context/rater revision before comparative use; deterministic high-risk labels target at least `0.80` plus adjudication of every disagreement. These are pilot hypotheses, not universal thresholds.

## Prompt-injection and adversarial handling

1. Product/repository/external content is stored as tainted evidence, never concatenated into system instructions or tool definitions.
2. The context compiler selects minimum fragments, retains provenance/hash/taint, redacts prohibited fields, and marks untrusted boundaries. Delimiters are defense in depth, not the security boundary.
3. The policy layer, outside the model, denies new tools, origins, paths, credentials, scopes, writes, and approvals regardless of candidate text.
4. Links, images, commands, scripts, downloads, macros, lifecycle hooks, and model-generated patches remain inert unless an independent exact capability authorizes them.
5. Seeded-secret canaries are represented by type/location/fingerprint only; any value in model context, output, capture, or log is an incident and hard failure.
6. Run every malicious/security case and mutation guard declared by the exact enrolled release manifest. The historical Track A `S-01`–`S-10` and `M-01`–`M-12` sets are public development examples only and create no Track B/B1 requirement. A model output that hides a change or claims approval is untrusted candidate evidence.
7. If injection changes a judge instruction, tool list, source priority, output schema, or action, invalidate the affected run, preserve the trace, rotate/revoke exposed credentials if any, and resume only from a clean reset under an amended batch record.

## Run, convergence, stop, and invalidation rules

1. Freeze the manifest, operator/evaluator packages, hashes, products, versions, tasks, order, budgets, rubrics, calibration profiles, and exclusion policy.
2. Verify applicable phase gates, exact grants, allowed origins/data/effects, clean profiles, fixture start hashes, gold sealing, and cleanup plan.
3. Run deterministic conditions twice from clean reset. Outputs must match on declared deterministic fields or the condition is nondeterministic and investigated.
4. Run model-mediated conditions at least three times; report pass@1 separately from any@3. Do not select the best run as typical performance.
5. Record and validate evidence before judging. A missing terminal state or incomplete result cannot be repaired by a judge's inference.
6. Run independent absolute judgments; complete any required pre-pairwise hard-gate adjudication; admit only hard-eligible candidates to mirrored pairwise comparisons; run the adversarial audit and any post-pairwise adjudication; then deblind.
7. Stop rerunning when the preregistered count is met. An optional bounded diagnostic rerun is allowed only for a named infrastructure failure and remains excluded with its reason.
8. A refinement loop stops after two unchanged rounds, two non-improving rounds, or three total rounds. The candidate never sees holdout gold, and refinement is evaluated as a separate condition.
9. Stop immediately on a missing/expired/mismatched control record; new origin/tool/process/permission; secret/private data; scope escape; unauthorized effect; injection escape; capture gap; fixture/gold leak; unreconciled version; resource/cost limit; or unclear cleanup/recovery.
10. Use the exact terminal-state wire values from the desktop protocol. `blocked-access`, `blocked-credential`, `blocked-permission`, `blocked-network`, `blocked-entitlement`, `unsupported-in-tested-version`, `not-applicable`, `aborted-safety`, and `invalid-run` are never converted to numeric zero or silently omitted.

## Exact first pilot: PSJ-B0-001, design-ready but blocked

**[Proposal]** The first pilot is a judge-system dry run over newly collected **B0 public-surface evidence**, not a hands-on capability comparison. It needs no product accounts, installs, tokens, uploads, purchases, or tested-product execution, but it is still blocked. The exact public-reconnaissance operation composes two bindings: `verify.runtime` requires its immutable current SEC-P0-G `pass` result and independently issued exact unrevoked runtime-verification grant; `research.external` requires its immutable current SEC-P0-B `pass` result and independently issued exact unrevoked public-research grant. Both must bind the same authenticated principal/workload and exact operation/resource, remain valid for the event time, and pass current invalidation/revocation checks. Persisting any emitted record is a later, independently controlled `OP-B0-EVIDENCE-APPEND-r1` event with one `draft.patch`/SEC-P0-C result-and-grant binding, an exact scoped persistence decision, applicable telemetry disposition, atomic record/audit commit, and receipt. Applicable independent controls or explicit not-applicable rationales and a dedicated signed-out profile are also required. The existing Ditto observation is nonconforming legacy pilot evidence and cannot seed the scored run.

### Objective and conditions

- Study ID: `PSJ-B0-001`; protocol design/source-review cutoff: `2026-08-17`. The actual run ID, `run_freeze_at`, execution evidence window, `run_evidence_cutoff_at`, and immutable version freeze are generated and recorded at action time under the desktop protocol; the design cutoff is not reused as the execution date.
- Products: Ditto, VOICE.md, ContentRX, UX Writing Skill, Frontitude, GitCMS CONTENT.md, and the `content-md` web specification.
- Allowed evidence: newly collected records from the primary public origins and route script in [B0](product-desktop-study-protocol.md#first-batch-script-protocol-defined-execution-gated). The prior Ditto observation may inform protocol design only; it is excluded from scored evidence and denominators.
- Authorization units: navigation envelope `OP-B0-PUBLIC-RECON-r1`, exact operation `navigate-and-capture-allowlisted-public-primary-sources`, with exactly one `verify.runtime`/SEC-P0-G result-and-grant binding and exactly one `research.external`/SEC-P0-B result-and-grant binding; and separate persistence envelope `OP-B0-EVIDENCE-APPEND-r1`, exact operation `record.append`, with exactly one `draft.patch`/SEC-P0-C result-and-grant binding plus its exact persistence decision/control. A mode label, shared grant, missing binding, or combined navigation/append event denies the affected operation.
- Condition unit: one product × `DT-00` public-source/access task. Do not run `DT-01`–`DT-12`.
- Operator: one navigator in a dedicated signed-out profile; recorder separate. For B0, the claim verifier, two independent synthesis/context judges, safety auditor, and any adjudicator are human/manual roles working from locked packets. The deterministic checks run inside the trusted schema/hash/reference validator, not as a study agent. B0 invokes neither `discover.local` nor `model.infer`; automating any of these roles requires a new exact phase result, grant, control envelope, and preregistered condition.
- Hard gates: HG-01 through HG-04. Soft criteria: SC-02 and SC-11 only. All others are `not_applicable`, not zero. No `PairwiseComparisonRecord` may be created until its `PSJ-B0-BOTH-CANDIDATES-HG-01-04-r1` precondition dereferences a final eight-PASS ledger: one `HG-01`–`HG-04` result for each left and right candidate scope, using direct locked judgments where uncontested and the locked embedded adjudication disposition wherever an original hard-result conflict existed. A pre-pairwise hard-conflict adjudication consumes the complete original ledger and is therefore allowed before this PASS condition.

### Pre-registered execution

1. After the isolation rehearsal and all required bindings pass, generate the action-time run ID and `run_freeze_at`; then freeze the seven product labels, 14 scheduled URLs and order, route-manifest/schema/policy/redaction/adapter/browser/profile/OS versions, 90-minute limit, no-login/no-install boundary, navigation envelope `OP-B0-PUBLIC-RECON-r1`, append envelope `OP-B0-EVIDENCE-APPEND-r1`, and an exact recorded random seed before navigation. The route evidence denominator is 14 scheduled routes × two passes = 28 route-pass observations. Every route-pass receives its own safe full-state evidence plus claim-supporting route evidence, or an explicit blocked/unsafe-capture limitation; this is independent of the exactly three product-level claims per product and the 21-claim denominator.
2. Before either pass, resolve and validate all four immutable navigation authorization references: the exact SEC-P0-G result and runtime-verification grant for `verify.runtime`, and the exact SEC-P0-B result and public-research grant for `research.external`. Validate exact operation/resource and principal/workload equality, time validity, current invalidation/revocation state, immutable manifest equality, and applicable independent control records. Record that composite navigation envelope only in its own event; deny rather than degrade if either binding is unavailable. Before persisting each Source, Claim, Evidence, CriterionJudgment, PairwiseComparison, Adjudication, or StudyAudit event, separately validate the exact SEC-P0-C result, append grant, persistence decision ID/version/hash, and telemetry disposition; atomically co-commit the primary record and terminal audit event; then validate and retain the typed append receipt and lock reference.
3. Run the B0 route twice from independently clean dedicated-profile start states. Record every top-level redirect, visible version/date/status, access/entitlement clue, named artifact, declared credential/network/install/export/uninstall boundary, and limitation. Only the exact predeclared Frontitude root `www`/non-`www` canonicalization pair may continue across origins; every other new origin or route stops. Treat asset and background egress as unverified and make no confinement claim. Investigate any pass difference before scoring deterministic fields.
4. Create exactly three claims per product: declared primary job, declared repository/agent/code/design workflow capability, and declared access/install/data boundary. Total denominator: 21 claims.
5. The human claim verifier assigns one of the five claim relations and cites the direct source plus observation that the page displayed it. No product behavior is marked exercised.
6. The trusted deterministic validator checks 100% schema validity, source URL resolution, capture/hash/receipt/lock linkage, audit-chain construction/link verification, label vocabulary, terminal task state, top-level allowed-origin/route/redirect conformance, the explicit `unverified_not_claimed` background-egress disposition, and absence of capability language unsupported by observations.
7. Create blinded packets with vendor/brand tokens masked where this does not destroy the claim. Two human judges independently assess source fitness/limitation quality and operational inspectability; they do not rank product quality.
8. Before pairwise creation, trigger a `pre_pairwise_hard_gate` `AdjudicationRecord` for every hard-result conflict. It must hash-reference the complete locked original judgment set, accept non-PASS inputs, and lock its embedded candidate-specific disposition. If any resulting gate is not `pass`, pairwise remains blocked.
9. After the final candidate-specific eight-reference PASS ledger validates, create 14 schema-valid `PairwiseComparisonRecord`s covering seven pre-registered candidate pairings, each shown in both orders: every product appears four times, twice left and twice right. Allowed outcomes include indistinguishable, both unacceptable, and insufficient context. Before the precondition passes, the validator must deny pairwise-record creation rather than emit an unscored result.
10. Inject four hidden evaluator cases among ordinary packets: documentation presented as observed capability; a polished claim with no direct source; a contradictory source/observation pair; and a correct `not-observable` privacy/retention claim. Add two inert prompt-injection strings that attempt to change source priority or reveal another packet.
11. Trigger a `post_pairwise` `AdjudicationRecord` for every evidence mismatch, abstention/confidence conflict, or pairwise order flip. Preserve and hash-reference all pre-adjudication records. An order flip must reference the two reciprocal pairwise records and must leave both hard-gate fields null.
12. Debrief only after records lock. Output a protocol gap/access map, never a product winner or build-versus-buy recommendation.

### Pilot exit hypotheses

- 21/21 claim records and all evidence/audit records pass schema and reference validation;
- zero unlisted **top-level navigation** origin/route, account, install, download, upload, form, credential, purchase, source/product/remote/general-filesystem write, or retained-session effects; the only persistence effects are validated immutable-sink appends with atomic terminal audit events and receipts. Asset, CDN, security-service, telemetry, DNS, and platform background egress remain unobserved rather than counted as zero, so the pilot makes no network-confinement claim;
- 4/4 hidden evidence cases and 2/2 injection cases receive the expected disposition with no scope change;
- zero vendor claims are reported as exercised behavior;
- every judgment includes criterion-level evidence, confidence status, and an abstention path;
- all 14 pairwise records pass their schemas and exact final candidate-specific eight-PASS ledger; every triggered adjudication passes its phase-specific schema, immutable input dereference, hash, evidence, and time-order checks; and every hard conflict is resolved before pairwise or leaves pairwise blocked;
- pairwise order-flip, raw agreement, pre-adjudication agreement, evidence-reference validity, cost/time, and disagreement reasons are reported; and
- all tabs/sessions are closed and cleanup is evidenced.

Failure makes the judge-system pilot inconclusive; it says nothing about product quality.

## Next hands-on batch and open needs

**[Proposal]** A future hands-on Track B batch has no study ID until one exact approved Track B release manifest supplies the fixture/release identity, tasks, conditions, packages, scopes, denominators, gold, and evaluator contract. It begins only when every entry criterion in the [shared fixture](shared-benchmark-fixture-specification.md#batch-b1-fixture-entry-criteria) and [desktop protocol](product-desktop-study-protocol.md#batch-b1-entry-gate) passes for that same exact release. `PSJ-B1-SIBF-CHK-001` is a retired legacy proposal and must not be minted or run.

Open material and access needs are:

- a hash-bound design-only disposition followed by a separately approved scoped fixture-work authorization; only the latter can permit its named new-identity Track B authoring/materialization work;
- an exact release decision approving the resulting Track B fixture, followed by `r2` binding only to that release and only then a separate architecture decision;
- the exact approved Track B operator release and signed manifest, with independently authored and verified identities, roles, tasks/packets, sets, locales/channels/modalities, candidate/occurrence/exclusion/expression/message denominators, Stage 5/6 denominators, gold, and evaluator requirements; no Track A value or identifier may be inherited;
- a sealed Track B evaluator package containing exactly the manifest-declared deterministic, adjudicated, intentionally unresolved, contextual, and specialist-reviewed gold, with its private material unexposed to operators, products, development tooling, and model context;
- exact product/package/skill/host/model versions and official acquisition sources;
- dedicated browser/editor/host profiles, disposable vendor workspaces, plan/tier entitlements, and instrumented network/process/effect capture;
- product-specific account, token, OAuth/MCP, provider retention/data-processing, minimal-scope, expiry, revocation, disconnect, export, deletion, and cleanup decisions;
- every independent rater, accountable owner, and behavior, engineering, security/privacy, accessibility, locale, channel, or other specialist reviewer required by the exact Track B manifest;
- approved capture/redaction/retention storage, append-only audit storage, calibration infrastructure, cost/time budgets, and incident owner; and
- a versioned executable `content.md` condition before the program itself is compared. The current research corpus is not an executable product condition.

Track A and its exposed evaluator may support only disclosed public development/calibration and noncomparative regression evidence; they can never satisfy these needs or become private holdout material. Until the sequence and all manifest-derived needs are complete, the defensible result is a sourced claim map, judge-system calibration evidence, and a blocked-access plan—not a capability ranking, release decision, or architecture mandate.
