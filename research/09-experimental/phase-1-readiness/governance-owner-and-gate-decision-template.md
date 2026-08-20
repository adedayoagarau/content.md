---
title: Governance owner and Phase 1 gate decision template
status: proposed
created: 2026-08-18
updated: 2026-08-18
execution_status: not-for-use
scope: Internal-only empty structure for Phase 1 study-governance capacities and P1-A through P1-D gate decisions
source_documents:
  - ../materials-and-access-register.md
  - ../practitioner-decision-reconstruction-protocol.md
  - ../practitioner-field-kit.md
  - ../v0-architecture-and-build-decision-packet.md
---

# Governance owner and Phase 1 gate decision template

## Authority boundary

**[Proposal]** Use this structure only to prepare a future controlled governance record for P1-01 and the four [Phase 1 gates](../materials-and-access-register.md#phase-1-gate-sequence). This Markdown file is not that record.

Current disposition: `not-for-use`. Every identity, authority, decision, approval, evidence-record reference, effective date, and gate result is `not-established`. No role is assigned. No recruitment, screening, collection, rehearsal, storage, processing, or participant operation is authorized.

The decision discipline follows the [v0 architecture decision precedent](../v0-architecture-and-build-decision-packet.md#approval-record-to-create-if-accepted): a future record must bind authenticated identity to actual capacity and scope. Authorship, repository custody, title, conversation participation, or a controlled-role reference does not establish authority. One person may fill more than one capacity only when each capacity and its authority basis are separately evidenced.

## Controlled-role capacity register

The strings below are role classes, not owner IDs or assignments.

| Controlled-role reference | Capacity that a future authenticated record must establish | Identity and assignment evidence | Delegation or authority source | Scope and escalation boundary | Current state |
| --- | --- | --- | --- | --- | --- |
| `controlled-role:study-owner` | Accountable study scope, participant duty of care, stop authority, compensation independence, and gate disposition | `not-established` | `not-established` | `not-established` | `not-established` |
| `controlled-role:research-ethics-route-owner` | Applicable research or ethics route, review scope, conditions, expiry, and change triggers | `not-established` | `not-established` | `not-established` | `not-established` |
| `controlled-role:risk-incident-owner` | Incident intake, quarantine disposition, notification, safe-resume or termination decision | `not-established` | `not-established` | `not-established` | `not-established` |
| `controlled-role:privacy-security-reviewer` | Processing, access, transfer, retention, deletion, breach, and security boundary review | `not-established` | `not-established` | `not-established` | `not-established` |
| `controlled-role:accessibility-route-owner` | Accessible participation route, format support, and escalation for unmet access needs | `not-established` | `not-established` | `not-established` | `not-established` |
| `controlled-role:withdrawal-deletion-owner` | Rights request intake, scope resolution, deletion propagation, residual verification, and response boundary | `not-established` | `not-established` | `not-established` | `not-established` |
| `controlled-role:compensation-operations-owner` | Compensation policy and operation independent of optional permissions and case counting | `not-established` | `not-established` | `not-established` | `not-established` |
| `controlled-role:research-operations-owner` | Recruitment, screening, scheduling, contact-data separation, and accessible operations route | `not-established` | `not-established` | `not-established` | `not-established` |
| `controlled-role:data-steward` | Access-separated record routing, nonsemantic ID controls, handoff, lifecycle, and evidence preservation | `not-established` | `not-established` | `not-established` | `not-established` |

## Future governance decision record shape

All values remain absent in this repository template.

| Field | Required future evidence | Current value |
| --- | --- | --- |
| Decision-record ID and version | Nonsemantic identifier issued by the approved governance system; append-only version history | `not-established` |
| Study and instrument boundary | Exact study scope plus protocol, field-kit, schema, codebook, analysis-plan, and participant-material versions | `not-established` |
| Decision requested | Exact gate and operation being considered; no bundled permission | `not-established` |
| Evidence cutoff | Date/time and versions considered by the decision-makers | `not-established` |
| Role decisions | Separate authenticated decision in each applicable capacity above | `not-established` |
| Authority basis | Delegation, charter, policy, or other inspectable source for each capacity and decision class | `not-established` |
| Decision and rationale | Exact disposition with supporting evidence, counterevidence, unresolved questions, and non-waivable limits | `not-established` |
| Conditions and exclusions | Exact data, people, tools, places, purposes, operations, and paths allowed or prohibited | `not-established` |
| Compatibility check | Conflicts among governance, processing, accessibility, recruitment, operational, or participant-material records | `not-established` |
| Effective period | Issue time, effective time, expiry or review date, and time zone | `not-established` |
| Revocation and change triggers | Route and triggers including protocol, material, processor, region, store, role, tool, data class, or risk change | `not-established` |
| Evidence references | Independently inspectable source records; no copied protected content | `not-established` |
| Recorded-by and verification | Authenticated recorder plus independent readback or verification evidence | `not-established` |

## Gate-by-gate decision worksheet

Each gate needs a separate future decision. Evidence belonging to a later gate cannot be demanded early or invented to close an earlier gate.

For P1-B, apply this non-circular sequence: first freeze an exact inactive recruitment-route candidate with a no-outreach boundary; second, make the P1-B decision against that candidate ID/version/hash and its independent component evidence; third, if the gate passes, create a separate activation record that binds the passing gate to the unchanged candidate. The activation record is downstream evidence and cannot be required to make the gate decision. Any candidate change requires a new candidate version, a new P1-B decision, and a new activation record. See the [recruitment route sequence](recruitment-start-route-and-handoff-template.md#non-circular-record-sequence).

| Gate | Exact operation a future gate may permit | Evidence that must be linked before a future transition | Evidence that must remain later | Decision-record reference | Current gate result |
| --- | --- | --- | --- | --- | --- |
| P1-A — acquisition preparation | Internal owner identification, review preparation, participant-material drafting, staffing preparation, and synthetic-rehearsal preparation only | Versioned register and protocols; visible proposed scope, no-outreach boundary, owner types, and missing dependencies; any actual internal action follows its own normal authority route | Participant records, consent, artifact plans or observations, decision records, and pilot findings | `not-established` | `not-established` |
| P1-B — recruitment and screening | Exact approved outreach, prescreen, screening, intake, language/access question, and broad artifact-class feasibility question; actual operation also requires the later activation record | P1-01; frozen inactive route-candidate ID/version/hash with prospective operator capacity plus reviewed channel/text/handoff component evidence; recruitment-start participant-materials evidence; screening/contact processing; screening instruments, nonsemantic ID plan, and separated data boundary | Route activation, recruited cohort, full participant-specific consent, artifact contents, session data, or findings | `not-established` | `not-established` |
| P1-C — one participant session | One exact scheduled pilot session, with collection only after opening reconfirmation and artifact viewing only after its separate checks | Participant-specific screen and pilot-cell evidence; delivered materials and recorded choices; safe artifact-class plan without acquisition; team/access; environment rehearsal; all intended data paths; language-access disposition; frozen instruments and identifiers | Actual artifact support, threshold eligibility, completed reconstruction, agreement, adjudication, or pilot result | `not-established` | `not-established` |
| P1-D — post-session record and pilot exit | Controlled handoff, independent coding, adjudication, lifecycle checks, five-session coverage review, and proceed/revise/rerun consideration | Per-session event-time consent, basis, observation or absence, permitted records, independent locked coding, disagreement, lifecycle and incident state; all five sessions meet the protocol's pilot review contract | Full-study coverage, model stability, contextual observations, or representative-practice claims | `not-established` | `not-established` |

## Non-entailment and closure checks

A future gate record is invalid unless all checks can be evidenced:

- the exact gate and requested operation are named;
- each decision-maker is authenticated and their actual capacity, authority source, scope, and decision class are separate;
- governance, participant permission, processing, connection, memory, telemetry, capability, semantic approval, mutation approval, release approval, delivery, release, and evaluation remain independent;
- conditions, exclusions, effective period, expiry, revocation, and change triggers are explicit;
- the P1-B decision references a pre-existing frozen inactive candidate, while any activation record is later and binds the unchanged candidate rather than supplying missing gate evidence;
- unresolved or conflicting evidence remains unresolved rather than silently repaired;
- no participant-specific information is copied into this repository template; and
- a chat message, signature image, promise, role label, job title, or file edit is not treated as the controlled decision record.

The controlled record, not this template, must determine whether a gate is held, returned for revision, or eligible for a scoped transition. Until that record exists and is independently inspectable, every gate result here remains `not-established` and every operational path remains `not-for-use`.
