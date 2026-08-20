---
title: Recruitment-start route and handoff template
status: proposed
created: 2026-08-18
updated: 2026-08-18
execution_status: not-for-use
scope: Internal-only empty structure for a future P1-B recruitment, screening, operations, and research-data handoff decision
source_documents:
  - ../materials-and-access-register.md
  - ../practitioner-decision-reconstruction-protocol.md
  - ../practitioner-field-kit.md
---

# Recruitment-start route and handoff template

## Authority and data boundary

**[Proposal]** Use this template to prepare the three separate records required for a non-circular P1-B transition: a frozen inactive route candidate, the P1-B gate decision that reviews that exact candidate, and an activation record that binds a passing gate to the unchanged candidate. This Markdown file issues none of them. It contains no recruitment message, recipient, candidate person, contact detail, participant identifier, screening answer, channel decision, operator assignment, compensation choice, or approval.

Current disposition: `not-for-use`. Outreach, screening, scheduling, contact, and handoff are prohibited by this packet. They remain prohibited after a route candidate is drafted or frozen. They may begin only when a separate controlled P1-B decision passes for that exact candidate and a separate activation record proves the gate/candidate binding, effective period, and current operator route. `controlled-role:authorized-recruitment-operator` and similar strings are role classes only; they are not assigned people, owner IDs, accounts, or authority.

## Non-circular record sequence

| Order | Controlled record | What it may establish | What it cannot establish | Current state |
| ---: | --- | --- | --- | --- |
| 1 | Draft and freeze a route candidate | An exact reviewable proposal for operator capacity, channel, audience, outreach-text version, prescreen materials, compensation, accessible response, rights, processing, lifecycle, and handoff; separately issued internal component evidence may be linked | Outreach authority, P1-B passage, activation, a contacted person, screening, or data collection | `not-for-use` |
| 2 | P1-B gate decision reviews the frozen candidate | Whether the exact candidate ID, version, hash, component evidence, and all other P1-B prerequisites support the scoped gate transition | A changed candidate, silent condition, participant record, session permission, or retroactive activation | `not-for-use` |
| 3 | Activate the unchanged route | A pointer-only operational record that binds the passing P1-B gate to the identical candidate ID/version/hash, exact scope, effective period, current operator assignment, and revocation route | New substantive conditions, correction of a gate gap, a different channel/text/operator/data path, or any participant/session permission | `not-for-use` |

The frozen candidate must exist before the P1-B decision. The activation record must exist after that decision. Neither may be used as evidence for the other in reverse. If activation reveals a mismatch or requires any substantive change, activation stops: create and freeze a new candidate, obtain a new P1-B decision for that version, and then create a new activation record. No record may be backdated.

## Stage 1 — frozen inactive route candidate

| Field | Required future evidence | Current value |
| --- | --- | --- |
| Candidate-record ID, version, and hash | Nonsemantic, immutable review reference created in the approved operations/governance system | `not-established` |
| Candidate lifecycle event | Draft and freeze events, actors/capacities, times, reason, and explicit inactive/no-outreach boundary | `not-established` |
| Study and pilot boundary | Exact study, protocol, field-kit, target pilot cells S001–S005, and outreach window | `not-established` |
| Proposed operator and component evidence | Authenticated prospective assignment to `controlled-role:authorized-recruitment-operator`, capacity, authority source, scope, expiry, and explicit inactive-until-activation state | `not-established` |
| Proposed recruitment source and channel | Exact reviewed source, audience, channel, geographic or language scope, restrictions, and component-decision reference; no use before activation | `not-established` |
| Outreach-text reference | Exact version and review record; this template stores no invitation copy | `not-established` |
| Prescreen notice and screener | Exact versions, accessibility evidence, language variants, delivery order, and stop behavior | `not-established` |
| Compensation route | Amount or range, currency, timing, processor and notice, with independence from optional permissions and case counting | `not-established` |
| Accessible response route | Approved formats, language/access intake, response target, and escalation boundary | `not-established` |
| Rights route | Approved withdrawal and deletion path; this template stores no contact details | `not-established` |
| Contact/research-data separation | Current processing and access records for operations contact data, screening responses, and crosswalk | `not-established` |
| Screening retention/deletion | Trigger, exact deadline, backup behavior, propagation method, and evidence of deletion | `not-established` |
| Screening handoff | Exact normalized fields, sender and receiver roles, purpose, access class, and rejection behavior | `not-established` |
| Refusal and withdrawal handling | Minimum non-content record, stop behavior, deletion work, and compensation boundary | `not-established` |
| Review and invalidation | Effective period plus triggers for channel, copy, population, processor, store, role, protocol, or risk change | `not-established` |

Freezing makes the candidate stable enough to review; it does not approve or activate it. Each linked component record must be independently inspectable and must state whether it is a capacity assignment, text/material review, processing decision, or another bounded internal decision. No component record is outreach authority by itself.

## Stage 2 — P1-B gate binding

The P1-B gate record is created through the [governance gate template](governance-owner-and-gate-decision-template.md#gate-by-gate-decision-worksheet). It must bind all of the following without copying protected or identifying values into this repository:

| Gate-binding field | Required future evidence | Current value |
| --- | --- | --- |
| P1-B decision-record ID/version | Current, scoped, independently inspectable gate record | `not-established` |
| Frozen route candidate | Exact candidate ID, version, hash, freeze event, and inactive/no-outreach state | `not-established` |
| Candidate component evidence | Exact operator-capacity, channel/text, materials, processing, lifecycle, identifier, handoff, accessibility, and rights records reviewed | `not-established` |
| Gate evidence cutoff | Date/time, versions, and compatibility result considered by the decision-makers | `not-established` |
| Gate disposition and conditions | Exact decision, rationale, conditions, exclusions, unresolved issues, effective period, and revocation/change triggers | `not-established` |
| Candidate integrity after decision | Proof the candidate hash is unchanged from the reviewed version | `not-established` |

An activation record is not a P1-B prerequisite and cannot be cited as evidence that the gate should pass. The gate reviews only the frozen inactive candidate and its independently issued component evidence.

## Stage 3 — route activation record

| Activation field | Required future evidence | Current value |
| --- | --- | --- |
| Activation-record ID/version | Nonsemantic pointer-only operational record created after the gate decision | `not-established` |
| Passing P1-B gate | Exact current decision-record ID/version, scope, conditions, effective period, and revocation state | `not-established` |
| Activated route candidate | Exact candidate ID/version/hash identical to the version reviewed by P1-B | `not-established` |
| Gate/candidate compatibility | Mechanical hash/version match plus human readback of scope and conditions; no silent change | `not-established` |
| Current operator activation | Authenticated assignment, actual capacity, authority source, exact scope, start/expiry, access, and revocation check | `not-established` |
| Exact operational boundary | Channel, audience, outreach-text/prescreen versions, window, compensation, accessible response, rights, processing, lifecycle, and handoff exactly as gated | `not-established` |
| Conditions realization | Evidence that every pre-activation gate condition is met; unresolved conditions stop activation | `not-established` |
| Effective period and stop route | Activation/effective/expiry times, revocation route, and change/invalidation triggers | `not-established` |
| Independent readback | Verifier confirms gate, candidate, activation, operator, versions, and boundary are current and mutually compatible | `not-established` |

Activation is a binding and operational-readiness record, not a second route-design decision and not permission to modify the frozen candidate. Any mismatch, expiry, revocation, or substantive change invalidates the activation and returns the route to the candidate → gate → activation sequence.

## Pilot-cell routing boundary

The future route may recruit toward the five profiles in the [exact first five-session pilot](../practitioner-decision-reconstruction-protocol.md#exact-first-five-session-pilot). It must not invent or pre-commit a person to any cell.

| Pilot cell | Broad target class | Minimum safe case/artifact feasibility signal in the approved screen | Current route state |
| --- | --- | --- | --- |
| S001 | Product-content individual contributor in consumer commerce | Recent bounded reversible decision and an authorized redacted artifact class | `not-established` |
| S002 | Content designer in financial services or payments | Recent high-consequence decision and safe evidence plus scoped review/approval artifact class | `not-established` |
| S003 | Arabic/English bidirectional localization or in-market specialist | Recent locale decision and safe source/locale plus query/decision artifact class | `not-established` |
| S004 | Accessibility specialist with direct product-content responsibility | Recent visible/nonvisual decision and safe specification plus test/QA artifact class | `not-established` |
| S005 | Product engineer who directly partnered with a content practitioner | Recent cross-system/channel decision and safe manifest plus history/outcome artifact class | `not-established` |

The screening route may ask only for broad class and safe-viewing feasibility. It must not request an artifact, file, exact wording, credential, customer account, production access, repository access, employer/client/product name, URL, ticket number, or proprietary literal.

## Operations-to-research handoff contract

Contact, identity, scheduling, compensation, accommodation details, and exact employer/client/product details remain in the separately controlled operations boundary described by the [field kit](../practitioner-field-kit.md#neutral-screener). This template chooses no store or processor.

| Handoff element | May be passed only after the future P1-B decision and route activation | Must not be passed | Current evidence |
| --- | --- | --- | --- |
| Candidate reference | A nonsemantic reference allocated under the approved identifier plan | Name, email, phone, social handle, address, employer, client, product, or reversible contact key | `not-established` |
| Screening permission | Current screening-consent event reference and withdrawal state | Session, recording, artifact, model, quotation, attribution, reuse, or future-contact permission inferred from screening | `not-established` |
| Eligibility | Normalized screen fields needed for declared inclusion/exclusion and pilot-cell routing; safe rationale and reviewer time | Stigmatizing judgment, prestige ranking, optional-permission ranking, inferred expertise, or proprietary free text | `not-established` |
| Case feasibility | Broad decision age/context, direct role, safely abstract question, artifact class, and safe-viewing feasibility | Artifact content, upload, identifier, screenshot, literal, credential, account, or repository link | `not-established` |
| Language/access request | Minimum operational signal needed to arrange understandable materials and participation | Diagnosis or unnecessary details in the research dataset | `not-established` |
| Lifecycle | Contact-link separation, hold expiry, screening deletion trigger, withdrawal/deletion work reference | Indefinite retention or silent reuse | `not-established` |
| Handoff receipt | Receiver role, exact fields/versions, accepted or rejected disposition, reason, and time | Silent repair, inferred missing values, or copied operations data | `not-established` |

## Pre-start checks

Recruitment remains `not-for-use` unless future controlled records prove all of the following:

- a frozen inactive route candidate existed before the gate decision and has an immutable ID, version, hash, and no-outreach boundary;
- P1-01 and the exact P1-B gate decision are current, reference that candidate, and are mutually compatible;
- a later activation record references the passing gate and the identical candidate version/hash without adding or changing scope;
- the authorized operator, channel, audience, outreach version, time window, and escalation route are exact;
- the prescreen notice appears before any question and screening answers are collected only after `screening_consent: yes`;
- outreach and screening request no employer/product name, artifact, credential, production access, proprietary literal, or sensitive case detail;
- optional recording, transcription, artifact retention, model processing, quotation, attribution, benchmark reuse, and future contact have no bearing on selection or compensation;
- operations/contact, screening, crosswalk, consent/control, and analytic boundaries are separated by current access and lifecycle decisions;
- accessible formats and requested language support have a safe route; and
- refusal, withdrawal, screened-out deletion, incident, and handoff-rejection paths are testable.

This template cannot be sent as an invitation and cannot be used to collect a response. A future outreach-text artifact must have its own version and review inside the frozen candidate; its existence, its review, and even a passing P1-B decision do not activate the route without the later exact binding record. None creates a participant or session permission.
