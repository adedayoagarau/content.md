---
title: Phase 1 practitioner-study readiness templates
status: proposed
created: 2026-08-18
updated: 2026-08-18
execution_status: not-for-use
scope: Internal-only empty templates for assembling Phase 1 governance, recruitment, processing, staffing, participant-material, operational-record, and live-synthetic-rehearsal evidence
source_documents:
  - ../materials-and-access-register.md
  - ../practitioner-decision-reconstruction-protocol.md
  - ../practitioner-field-kit.md
  - ../practitioner-field-kit-tabletop-rehearsal-2026-08-17.md
  - ../v0-architecture-and-build-decision-packet.md
---

# Phase 1 practitioner-study readiness templates

## Result and authority boundary

**[Proposal]** This folder materializes the empty internal record shapes needed to prepare the [Phase 1 practitioner-study readiness gates](../materials-and-access-register.md#phase-1-gate-sequence). It does not close any gate.

Every file in this folder is `proposed` and `not-for-use`. Together they record no name, contact route, authenticated identity, authority, approval, outreach, screening, participant, consent choice, artifact, storage location, processor, provider, retained data, session, rehearsal result, or owner ID. They create no permission to recruit, schedule, collect, record, interpret, translate, store, process, rehearse with operational tools, use Computer Use, or contact anyone.

Use `not-established` literally: the required evidence is absent from this packet. It must never be read as approval, denial, waiver, not-applicable, or a promise that evidence exists elsewhere. A value such as `controlled-role:study-owner` is only a role-class reference; it is not a person, account, authenticated identity, owner ID, authority record, or assignment.

## Packet inventory

| Template | Phase 1 dependency or gate | What it structures | Current template state |
| --- | --- | --- | --- |
| [Governance owner and gate decision](governance-owner-and-gate-decision-template.md) | P1-01 and P1-A through P1-D | Role capacities, separate authority evidence, gate scope, effective period, conflicts, and decision trace | `not-for-use` |
| [Recruitment-start route and handoff](recruitment-start-route-and-handoff-template.md) | P1-02; recruitment-start portion of P1-03; screening portion of P1-07 and P1-09 | Frozen inactive candidate → P1-B gate binding → later exact activation, plus screening boundary, operations-to-research handoff, and deletion trigger | `not-for-use` |
| [Processing, storage, and lifecycle decision register](processing-storage-and-lifecycle-decision-register-template.md) | P1-07 and conditional P1-08 | One independent decision per data/processing path, access separation, retention, deletion, withdrawal, incident, transfer, and downstream-use controls | `not-for-use` |
| [Research-team readiness record](research-team-readiness-record-template.md) | P1-05 | Controlled roles, assignments, training, competency, access, conflict, independent coding, and rehearsal evidence | `not-for-use` |
| [Participant-materials assembly manifest](participant-materials-assembly-manifest-template.md) | P1-03 and conditional P1-08 | Required material classes, versions, accessibility/language variants, review evidence, and delivery dependencies | `not-for-use` |
| [Pilot 0.1 operational record pack](pilot-0.1-operational-record-pack-template.md) | P1-09 and P1-C/P1-D record prerequisites | Instrument/version manifest, record-family separation, unallocated ID families, run-sheet and handoff forms | `not-for-use` |
| [Live synthetic rehearsal runbook](live-synthetic-rehearsal-runbook.md) | P1-06 and the pre-pilot release checklist | Future two-researcher synthetic test of stop, quarantine, access restriction, deletion propagation, handoff, state capture, and timing | `not-for-use` |

## Use contract

1. Treat the [practitioner decision-reconstruction protocol](../practitioner-decision-reconstruction-protocol.md) as authoritative when a template is incomplete or inconsistent.
2. Keep these repository copies empty of protected, identifying, operational, or secret values. Do not enter names, contact details, credentials, re-identification keys, participant data, artifact contents, real storage pointers, provider details, or signed decisions here.
3. An authorized owner may later instantiate a controlled record only in a separately approved system and only after that system's access, retention, deletion, audit, and incident boundary is established. This packet chooses no such system.
4. Each instantiated record must bind its own authenticated identity, actual decision capacity, delegation or authority source, scope, conditions, effective period, review trigger, and revocation route. Authorship, file custody, job title, chat participation, or a `controlled-role:*` label proves none of these.
5. For P1-B, preserve the order `frozen inactive route candidate → gate decision on that exact version → later activation of the unchanged candidate`. Activation cannot be gate evidence, and a changed candidate must restart the sequence.
6. Preserve separate records for study governance, participant permission, processing, connection, memory, telemetry, capability, semantic approval, mutation approval, release approval, delivery, release, and evaluation. One cannot stand in for another.
7. If required evidence is absent, stale, incompatible, or unresolved, leave the field `not-established` and hold the affected path. Do not repair the gap by inference.

## Current evidence boundary

The [materials and access register](../materials-and-access-register.md#gate-summary-at-the-evidence-cutoff) records Phase 1 as not ready. The [static tabletop](../practitioner-field-kit-tabletop-rehearsal-2026-08-17.md#gate-disposition) traced document paths but did not supply operational evidence. These templates do not change either result.

The next evidentiary step described by the tabletop is a separately authorized two-researcher rehearsal using synthetic materials and approved tools. The [runbook](live-synthetic-rehearsal-runbook.md) remains unusable until its exact preconditions are evidenced outside this folder.
