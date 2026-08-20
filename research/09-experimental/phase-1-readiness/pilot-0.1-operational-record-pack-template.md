---
title: Pilot 0.1 operational record pack template
status: proposed
created: 2026-08-18
updated: 2026-08-18
execution_status: not-for-use
scope: Internal-only empty manifest for the versioned instruments, unallocated identifier families, session-state records, evidence records, coding records, lifecycle records, and handoff records required by pilot-0.1
source_documents:
  - ../materials-and-access-register.md
  - ../practitioner-decision-reconstruction-protocol.md
  - ../practitioner-field-kit.md
---

# Pilot 0.1 operational record pack template

## Authority and data boundary

**[Proposal]** This file materializes the empty record-pack shape required by P1-09 and the [pilot execution contract](../practitioner-decision-reconstruction-protocol.md#pilot-execution-and-review). It is not a frozen pack, an identifier allocation, a session instrument, or a participant record.

Current disposition: `not-for-use`. The target label `pilot-0.1` comes from the protocol; no protocol, schema, codebook, consent, analysis plan, or form has been operationally frozen by this template. No study, session, participant, case, project, artifact, evidence, decision, claim, owner, approver, approval, control, occurrence, release, evaluation, incident, withdrawal, deletion, or handoff identifier is allocated here.

## Pack-level manifest

| Field | Required future value | Current value |
| --- | --- | --- |
| Operational-pack ID and version | Nonsemantic controlled reference with append-only history | `not-established` |
| Target instrument label | Exact approved instrument version corresponding to the protocol's `pilot-0.1` target or approved successor | `not-established` |
| Applicable gate records | Current P1-A/P1-B/P1-C/P1-D records as appropriate to the operation | `not-established` |
| Protocol and field-kit versions | Exact versions and hashes | `not-established` |
| Schema, codebook, and analysis-plan versions | Exact frozen versions and hashes | `not-established` |
| Participant-material manifest | Exact compatible manifest and versions | `not-established` |
| Processing/lifecycle register | Exact applicable decisions for every intended path | `not-established` |
| Team-readiness record | Exact role, training, access, conflict, and independence evidence | `not-established` |
| Environment/rehearsal evidence | Exact approved-tool, stop, quarantine, access, deletion, handoff, state, and timing evidence | `not-established` |
| Pack owner and verifier | Authenticated controlled-role assignments, capacity, authority source, scope, and expiry | `not-established` |
| Effective period and invalidation | Issue/effective/expiry times and change triggers | `not-established` |

## Component manifest

| Component | Required contents | Artifact/version/hash reference | Current state |
| --- | --- | --- | --- |
| Governance configuration card | Study, governance, recruitment, compensation, rights, incident, platform, storage, processing, language-access, team, and accessibility references | `not-established` | `not-for-use` |
| Session guide | Exact 70-minute moderator guide, neutral prompts, playback, close, and stop points | `not-established` | `not-for-use` |
| Protected run-sheet header | Nonsemantic record references, versions, role/access records, timing, language/access, permissions, processing, and safety routes | `not-established` | `not-for-use` |
| Consent event log | Independent permission values, restrictions, versions, event times, path actions, and immutable history | `not-established` | `not-for-use` |
| Live state log | Allowed state transitions, exact event times, path state, stop confirmation, and close state | `not-established` | `not-for-use` |
| Artifact eligibility and observation log | Broad class plan, authority/redaction checks, capture state, access mode, direct observations, missingness, and retention disposition | `not-established` | `not-for-use` |
| Moderator basis log | Each bounded note's source type, evidence basis, access mode, scope, time, limitations, and provenance | `not-established` | `not-for-use` |
| Observer basis log | Independently locked event and evidence-basis record using only permitted evidence | `not-established` | `not-for-use` |
| Decision-reconstruction form | Question, options, evidence, constraints, actors, ownership, approval, capability, disposition, delivery, evaluation, uncertainty, and missingness as separate records | `not-established` | `not-for-use` |
| Codebook | Frozen units, codes, inclusions/exclusions, missingness, non-entailments, and version-change rules | `not-established` | `not-for-use` |
| Coder A record | Independent unitization, values, codes, rationale, missingness, and lock time | `not-established` | `not-for-use` |
| Coder B record | Independent unitization, values, codes, rationale, missingness, and lock time | `not-established` | `not-for-use` |
| Disagreement and adjudication log | Original values, disagreement class, adjudicator scope, typed disposition, rationale, and unresolved state without overwrite | `not-established` | `not-for-use` |
| Reflexivity log | Role, prior exposure, assumptions, conflicts, changes, and limitations recorded separately before discussion | `not-established` | `not-for-use` |
| Coverage dashboard | Participant/case/decision counts, pilot cells, domains, roles, language/script/direction, risks, artifacts, negative cases, missingness, refusals, withdrawal, and attrition | `not-established` | `not-for-use` |
| Redaction and incident log | Non-content metadata, stop/quarantine, affected pointers, owner notification, disposition, safe-resume/termination, and residual risk | `not-established` | `not-for-use` |
| Withdrawal and deletion work log | Request, authenticated operations route, scope, path stop, derivative propagation, per-system actions, backups, completion, and minimal audit proof | `not-established` | `not-for-use` |
| Handoff package manifest | Pointer-only record index, controls, evidence dimensions, provenance, lifecycle, safety, next allowed step, and receiver decision | `not-established` | `not-for-use` |
| Session completion checklist | Operational completion, unresolved/quarantine/withdrawal state, and explicit non-claims | `not-established` | `not-for-use` |
| Five-session pilot review | Timing, safety, field missingness, decision boundary, disagreement, optional linked-decision yield, changes, and proceed/revise/rerun evidence | `not-established` | `not-for-use` |

## Identifier-family allocation plan

The future approved identifier service or procedure must preallocate nonidentifying values. This template names families only and allocates nothing.

| Identifier family | Required separation or purpose | Namespace/allocator record | Current allocation state |
| --- | --- | --- | --- |
| Study, participant, session, and case | Keep identity out of semantic IDs; participant/contact link remains in the separate operations boundary | `not-established` | `not-established` |
| Project, task, and crosswalk | Preserve deduplication and lineage without exposing names or literals | `not-established` | `not-established` |
| Decision reconstruction and decision lineage | Separate interview reconstruction from the underlying bounded decision and its supersession | `not-established` | `not-established` |
| Typed record link | Preserve relationship type and version without flattening record families | `not-established` | `not-established` |
| Artifact and evidence source | Distinguish observed artifact/material from the evidence basis and access mode | `not-established` | `not-established` |
| Claim | Keep researcher inference separate from participant report and artifact observation | `not-established` | `not-established` |
| Governing instrument and applicability | Separate an instrument from a scoped applicability determination | `not-established` | `not-established` |
| Owner, approver, and approval | Preserve responsibility, authorization capacity, and typed approval as independent families | `not-established` | `not-established` |
| Connection, processing, memory, telemetry, and capability control | Keep each authorization and runtime boundary independent | `not-established` | `not-established` |
| Change transaction and mutation/release approval | Separate an exact change from permission to mutate or release | `not-established` | `not-established` |
| Delivery occurrence and release | Distinguish mapping, build, verification, live occurrence, and release state | `not-established` | `not-established` |
| Evaluation | Bind method, object/version, population, limitations, outcome, and time separately from release | `not-established` | `not-established` |
| Incident, withdrawal, deletion, and handoff | Trace safety and lifecycle events without embedding identity | `not-established` | `not-established` |

## Record-family and evidence-axis invariants

Every future form and transfer must preserve these invariants from the [field kit handoff contract](../practitioner-field-kit.md#record-by-record-transfer-checks):

- `source_type`, `evidence_basis`, and `access_mode` are separate and explicit;
- a live participant statement remains `practitioner account` plus `participant_report` and its actual access mode;
- direct artifact observation is limited to what was actually visible and does not confer authority, applicability, approval, implementation, release, outcome, or canonical status;
- artifact absence creates no source record; `artifact_backed: false` and a defined missingness value record the absence;
- researcher inference is a separate claim linked to evidence, never rewritten as participant or artifact evidence;
- governing instrument, applicability, accountable owner, approver authorization, semantic approval, connection, processing, memory, telemetry, capability, change, mutation approval, release approval, delivery, release, and evaluation remain distinct; and
- original, translated, corrected, redacted, derived, and superseded records retain typed lineage and their own versions.

## State and handoff checks

| Check | Required future evidence | Current value |
| --- | --- | --- |
| State-transition enforcement | Only the field kit's allowed consent, interview, artifact, pause, incident, playback, and close transitions can be recorded | `not-established` |
| Immutable consent history | A change or withdrawal adds an event and stops affected paths without overwriting prior history | `not-established` |
| Capture default | Audio, video/screen, screenshot, automated capture, transcription, model, and interpretation/translation paths are off unless independently permitted and controlled | `not-established` |
| Pointer-only handoff | The manifest points to access-separated records and does not bundle or duplicate them | `not-established` |
| Quarantine on unresolved fields | Any consent, processor, provenance, redaction, language, storage, incident, or deletion gap withholds acceptance | `not-established` |
| Identical coder evidence | Coder A and coder B acknowledge the same permitted versions before independent work | `not-established` |
| Pre-adjudication preservation | Both locked records and disagreement remain immutable after adjudication | `not-established` |
| Lifecycle propagation | Withdrawal/deletion reaches raw and linkable derived records, translations, exports, caches, processors, and backups within the approved boundary | `not-established` |

## Pack freeze and release boundary

A future `pilot-0.1` pack can be frozen only after all component versions resolve; governance, processing, materials, team, and rehearsal records are current and compatible; the synthetic rehearsal passes its bounded operational checks; and an independent verifier confirms no required field, conditional path, state, access class, or immutable history is lost.

Freezing a pack does not authorize recruitment or a session. Scheduling S001 still requires the exact governance and gate decisions in the [pre-pilot release checklist](../practitioner-field-kit.md#pre-pilot-release-checklist). This repository template remains `not-for-use` even if a separate controlled pack is later created.

