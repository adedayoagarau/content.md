---
title: "Public UX-writing journey observations: bounded pilot"
status: working-note
created: 2026-08-20
updated: 2026-08-20
observation_batch_id: VTM-01-PREMANIFEST-PILOT
research_mode: operator-directed-computer-use-public-web
authority_effect: none
prompt_eligibility: never
training_eligibility: never
benchmark_eligibility: false
execution_status: one-public-journey-partially-observed
protocol_conformance: nonconforming-personal-profile-pilot
profile_isolation: not_established
privacy_session_transmission: not_established
---

# Public UX-writing journey observations: bounded pilot

## Result and boundary

This note records the first bounded Computer Use observation for the proposed public UX-writing journey corpus. It covers only a public, unauthenticated portion of the GOV.UK passport application journey observed on 20 August 2026.

The observation is evidence of visible and accessibility-exposed product behavior at that time. It is not evidence that the wording was approved, performed well, generalizes to another service, or is an objectively “best” example. It grants no voice authority and is ineligible for prompts, training, benchmark scoring, or automatic pattern promotion.

The operator used a fresh research tab inside an existing Chrome profile. The profile was not benchmark-isolated. Unrelated tabs, history, bookmarks, cookies, extensions, downloads, and storage were not inspected. No account was created, no login was attempted, no personal data was entered, no payment or submission was completed, and no screenshot or page body was retained.

This observation occurred before the VTM-01 acquisition manifest, dedicated-profile isolation, exact `verify.runtime` and `research.external` authorization records, and typed browser-record validator were materialized. Browser-session privacy and transmission boundaries are therefore not established. It is retained only as a nonconforming pre-manifest pilot for designing those records and is excluded from controlled-corpus and benchmark use. Any controlled evidence must be recollected under the frozen manifest and current controls.

## Source record VTM-SRC-GOVUK-PASSPORT-001

### Citation

- **Stable source ID:** VTM-SRC-GOVUK-PASSPORT-001
- **Title:** Apply online for a UK passport and public application filter
- **Author or organization:** Government Digital Service and HM Passport Office
- **Requested URLs:** [GOV.UK passport start](https://www.gov.uk/apply-renew-passport) and [HM Passport Office application start](https://passport.service.gov.uk/start)
- **Effective observed URLs:** `https://www.gov.uk/apply-renew-passport`, `https://passport.service.gov.uk/filter/overseas`, and `https://passport.service.gov.uk/filter/age`
- **Exact locators:** page heading and primary action on the public start page; main question and continuation control on `/filter/overseas`; main heading, date fields, error summary, linked summary item, and inline error on `/filter/age`
- **Published or updated:** not established by the observed UI
- **Version or edition:** mutable public rendered service; no immutable version established
- **Accessed:** 2026-08-20 between approximately 11:50 and 12:07 America/Los_Angeles
- **Source type:** documented organizational practice
- **Access mode:** direct full text
- **Observation method:** operator-directed Computer Use over rendered public UI and accessibility tree
- **Snapshot or archive reference:** none; no screenshot or page body retained
- **Content hash:** not established because no source body was lawfully retained
- **License or reuse determination:** the rendered footer linked the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/), but content-specific exceptions and attribution remain to be assessed; this record stays evidence-only

### Scope

- **Domain or industry:** UK central government public service
- **Geography or jurisdiction:** United Kingdom
- **Language or locale:** English as rendered; a Welsh route was visible but not exercised
- **Audience:** people beginning an online passport application, including people applying on behalf of another adult or child
- **Channel or surface:** public responsive web service
- **Journey slice:** entry, initial eligibility filtering, personal-detail form, and validation recovery

### Evidence

- **Canonical claim label:** sourced fact
- **Evidentiary role:** direct implementation observation and method-design precedent
- **Claims supported:** the observed journey used a direct task heading and primary start action, contextualized whose details to use, requested date of birth with a numeric example, and presented an empty-submit error in both a linked summary and inline at the field
- **Practices described:** state-specific instruction, identity-context clarification, example formatting, error summary, focus target, and inline error repetition
- **Decision informed:** the browser-evidence schema needs separate state, locator, visible/accessibility presentation, direct-exercise, and recovery-link fields

### Orthogonal evidence dimensions

- **Observation strength:** observed
- **Challenge:** undisputed within this single trace; no independent rendering or second operator
- **Freshness:** current for the exact 2026-08-20 observation; recheck before any reuse because the service is mutable
- **Lineage:** active as a pilot record; any conforming recollection supersedes it for operational use
- **Epistemic qualifier:** none for the UI elements directly observed; all pattern interpretations below are separately labeled inference or proposal

### Linked control records

- **Applicable governing-instrument IDs:** not established by this source record
- **Applicability determination:** not established by this source record
- **Accountable-owner IDs:** not established by this source record
- **Authorized-approver IDs:** not established by this source record
- **Approval-record IDs:** none
- **Linked decision IDs:** none
- **Linked implementation-occurrence IDs:** the observed public UI is evidence of one rendered occurrence, but no internal implementation ID is available
- **Linked evaluation-record IDs:** none

### Boundaries

- **Limitations:** no immutable capture, no DOM/source snapshot, no second operator, no assistive-technology output beyond the accessibility tree, no mobile device, no Welsh journey, and no completion, payment, pending, success, cancellation, support, or outage state
- **Conflicts or counterexamples:** none assessed in this trace
- **Commercial or institutional incentives:** the publisher operates the service and defines its own guidance; this does not establish comparative superiority
- **Volatility:** high
- **Recheck trigger:** manifest-controlled recollection, service release, content change, or use in a project decision

## Observation trace

| Observation ID | Journey state | Directly exercised | Bounded observation | Evidence boundary |
| --- | --- | --- | --- | --- |
| VTM-OBS-GOVUK-001 | Entry | Yes, public navigation only | The public page named the online passport task, placed critical travel timing near the start, listed card readiness, and used the short primary action “Start now” | No conversion or outcome evidence |
| VTM-OBS-GOVUK-002 | Eligibility filter | Yes, synthetic `Yes` selection | The first filter asked whether the applicant lives in the UK and explained that an agent applying for someone else should answer with that person's details | Synthetic answer only; no eligibility decision completed |
| VTM-OBS-GOVUK-003 | Form instruction | Yes, navigation only | The next page used the field heading “Date of birth,” a day-month-year example, separately labelled fields, a Back route, and a Continue action | No personal value entered |
| VTM-OBS-GOVUK-004 | Validation error | Yes, empty submission | Empty continuation changed the page title, added a “There is a problem” summary with a field link, and repeated a specific inline instruction at the date field | Shows one validation path only |
| VTM-OBS-GOVUK-005 | Accessibility and support | Observed, not exercised | The accessibility tree exposed headings, labels, field relationships, error text, error-summary link target, cookie choices, help, accessibility, privacy, terms, and Welsh routes | No screen-reader session or link destination test |

## Claim records

### VTM-CLM-GOVUK-001

**[Sourced fact]** In the public rendered slice observed on 20 August 2026, the passport service tied validation recovery to the affected input through both a summary link and inline error, rather than relying on color or a generic failure notice.

- **Supporting observations:** VTM-OBS-GOVUK-003 and VTM-OBS-GOVUK-004
- **Counterevidence:** not assessed
- **Generalization boundary:** one UK government service, one empty-submit state, English, desktop Chrome accessibility tree

### VTM-CLM-GOVUK-002

**[Sourced fact]** In the public rendered slice observed on 20 August 2026, the service separated task framing, readiness information, applicant-context clarification, input guidance, and validation recovery across successive pages instead of putting every observed instruction on the entry screen.

- **Supporting observations:** VTM-OBS-GOVUK-001 through VTM-OBS-GOVUK-004
- **Counterevidence:** later states were not observed
- **Generalization boundary:** this is a state-sequencing observation, not a universal minimal-copy rule

### VTM-CLM-GOVUK-003

**[Inference]** A reusable content.md pattern candidate could encode “summary plus field-linked recovery” as a mechanism, while prohibiting reuse of source wording and requiring each product to supply its own field name, cause, recovery action, accessibility behavior, and project approval.

- **Supporting observations:** VTM-OBS-GOVUK-004 and VTM-OBS-GOVUK-005
- **Decision state:** proposed
- **Approval state:** not established
- **Prompt eligibility:** never until a separate project-authored abstraction is reviewed and approved

## Candidate voice/tone graph projection

This is a proposed projection for testing the graph record shape. It is not an approved GOV.UK profile and not a project voice.

| Candidate node | Epistemic status | Proposed bounded value | Evidence | Missing authority or validation |
| --- | --- | --- | --- | --- |
| Stable stance | Inference | direct, task-focused, helpful | VTM-OBS-GOVUK-001 to 004 | organization voice owner and approval not established |
| Tone policy: entry | Inference | clear and readiness-oriented | VTM-OBS-GOVUK-001 | later-entry variants and outcome evidence absent |
| Tone policy: eligibility | Inference | neutral and clarifying | VTM-OBS-GOVUK-002 | other eligibility outcomes not observed |
| Tone policy: validation | Inference | specific, non-celebratory, recovery-led | VTM-OBS-GOVUK-004 | only empty input observed |
| Mechanics | Inference | concise heading, explicit label, example separated from instruction, linked error summary | VTM-OBS-GOVUK-003 to 005 | rendered mobile and assistive-technology verification absent |
| Hard constraint candidate | Proposal | do not imply application, payment, or passport success before the corresponding state is known | none; project truth-model hypothesis | requires product-state evidence, governing applicability, owner, and approval |

Proposed edges:

    VTM-SRC-GOVUK-PASSPORT-001 SUPPORTS VTM-CLM-GOVUK-001
    VTM-SRC-GOVUK-PASSPORT-001 SUPPORTS VTM-CLM-GOVUK-002
    VTM-OBS-GOVUK-004 OBSERVES VTM-CLM-GOVUK-001
    VTM-CLM-GOVUK-001 INFORMS VTM-CLM-GOVUK-003

No edge grants `APPROVES`, `GOVERNS`, `PROMOTES`, `PROMPT_ELIGIBLE`, or `TRAINING_ELIGIBLE`.

## What the pilot changes

The pilot is sufficient to require these fields in the planned browser evidence record:

- requested, effective, and state URLs;
- public/private and profile-isolation status;
- source, observation, claim, and pattern-candidate identities;
- direct exercise versus visual observation;
- page-title, summary, field, action, relationship, and destination locators;
- channel, locale, state, actor, and affected-user coordinates;
- body/screenshot retention and hash state;
- rights, prompt, training, benchmark, and authority dispositions;
- five orthogonal evidence dimensions;
- observed and unobserved journey slots;
- supersession route for conforming recollection.

## Next authorized work

The approved implementation plan first freezes the VTM-01 acquisition manifest and typed validators. Public read-only observation may continue only after the dedicated signed-out ephemeral profile, exact route/origin allowlist, current SEC-P0-G and SEC-P0-B results and grants, and capture, redaction, retention, telemetry, and cleanup controls all pass. No third-party expression can reach generation or learning unless it is replaced by a separately reviewed, project-authored abstraction and passes rights and similarity controls.
