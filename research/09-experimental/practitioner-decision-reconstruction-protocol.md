---
title: Practitioner decision-reconstruction protocol
status: proposed
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
execution_status: not-run
scope: Phase 1 exploratory interviews and Phase 2 artifact walkthroughs for reconstructing 50-plus recent content decisions
source_documents:
  - ../00-method/practitioner-research-plan.md
  - ../00-method/research-protocol.md
  - ../01-discipline/discipline-and-competencies.md
  - ../02-workflow/end-to-end-workflow.md
  - ../02-workflow/artifacts-and-collaboration.md
  - ../08-synthesis/candidate-system-model.md
  - ../08-synthesis/research-gap-register.md
  - ../sources/source-record-template.md
  - product-desktop-study-protocol.md
  - shared-benchmark-fixture-specification.md
  - voice-tone-graph-and-measurement.md
---

# Practitioner decision-reconstruction protocol

## Result and evidence boundary

**[Proposal]** Use a 70-minute recent-decision interview plus participant-controlled artifact walkthrough to reconstruct how a bounded content decision moved from request to evidence, control, ownership, approval, delivery, and evaluation. The study should produce at least 50 threshold-eligible decision records from at least 12 recent projects or tasks without requesting or retaining proprietary literals by default.

This protocol operationalizes Phase 1, exploratory interviews, and Phase 2, artifact walkthroughs, in the [practitioner research plan](../00-method/practitioner-research-plan.md). It reserves `phase` for the practitioner-study sequence and `stage` for the separate [end-to-end workflow](../02-workflow/end-to-end-workflow.md); decisions from every workflow stage are eligible.

The canonical claim labels come from the [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary): **[Sourced fact]**, **[Documented practice]**, **[Research finding]**, **[Cross-source finding]**, **[Inference]**, **[Proposal]** or **[Product hypothesis]**, and **[Open question]**. Unless explicitly labeled otherwise, every sampling rule, prompt, field, threshold, and pilot choice below is a **[Proposal]**.

Keep three axes independent in every operational record:

- `source_type` describes the underlying material and uses one exact value from the canonical source vocabulary. A participant's oral or written account is `practitioner account`; an artifact receives the type supported by what it is, such as `documented organizational practice`, `vendor documentation`, or `official guidance`. `artifact observation` and `researcher inference` are never source types. If the material cannot yet be classified, leave the source record pending and do not promote a claim from it rather than inventing a type.
- `evidence_basis` describes how a bounded field or assertion is supported: `participant_report`, `direct_artifact_observation`, or `researcher_inference`. An inference must be a separate analyst-authored claim with an explicit canonical `claim_label` and links to the source records it interprets; it cannot masquerade as an observed source.
- `access_mode` describes what the researcher actually inspected: `live_participant_account`, `live_participant_controlled_artifact`, `retained_redacted_extract`, `consented_recording_or_transcript`, or `neutral_field_observation_log`. Absence is never an access mode: when no artifact or record was inspected, create no evidence-source record for it and use the applicable field/artifact missingness instead. Access mode neither changes source type nor strengthens the evidence basis.

These are study wire values, not silent aliases for the desk-source template. On an explicitly approved promotion to a desk source record, `consented_recording_or_transcript` maps to `transcript reviewed` only when a transcript was actually reviewed; `retained_redacted_extract` maps to `direct full text` only for the exact retained extract, with its narrower scope and redaction limitation recorded. Live-only accounts, participant-controlled artifacts, and neutral observation logs remain study records unless a permitted retained derivative is reviewed and independently classified. `abstract only` and `metadata only` apply only when an actual abstract or metadata record was accessed; artifact absence creates no desk source.

One participant account is not automatically a **[Research finding]**. A finding may be reported only after analysis states the method, sample, limitations, counterevidence, and scope.

This document reports no recruited participants, completed sessions, observed practice, validated schema, saturation, approval, or benchmark result. It authorizes no recruitment, recording, artifact transfer, model processing, or external action.

## Study decisions and non-goals

The study should inform five decisions:

1. Which candidate entities, relationships, fields, and states are necessary, redundant, ambiguous, or missing in the [candidate system model](../08-synthesis/candidate-system-model.md).
2. How practitioners distinguish evidence sources, governing applicability, accountable ownership, authorized approval, execution control, delivery, and evaluation in actual work.
3. Which minimum artifact fields preserve a decision across design, code, CMS, localization, support, and production without imposing disproportionate burden.
4. Which negative cases and failure patterns should become synthetic fixtures and hard probes.
5. Which contextual judgments can be defined reliably enough for expert rubrics or judges, and which must remain qualitative, specialist, or user-research questions.

The study is not designed to estimate population prevalence, rank practitioners, certify an organization, collect a corpus of product strings, infer universal role boundaries, validate user outcomes, or promote repeated wording into canon. Frequency and consequence remain separate: one rare high-consequence case may change the model.

## Unit of analysis and counting rule

The interview case is one recent project or task; the unit of analysis is a decision inside it. Each session guarantees depth on one focal decision. A linked decision may be reconstructed only when time, consent, and evidence permit; the 50-decision threshold must never pressure the moderator to split one choice, rush a participant, or promote an incomplete contrast.

A `decision_eligible` record is one bounded choice, deferral, rejection, escalation, or deliberate non-choice about a problem, behavior, claim, concept, structure, pattern, term, expression, delivery, assurance, or lifecycle action. It must have:

- a specific trigger or question;
- at least one considered option, including “do nothing,” “change the behavior,” or “leave unresolved”;
- a participant who directly contributed to, observed, owned, approved, implemented, or evaluated it;
- a recoverable time and project/task context;
- a consequence or criterion that made the choice material.

Set `threshold_eligible: true` only when `decision_eligible: true` and either `artifact_backed: true` or a later end-to-end observation is linked. `artifact_backed: true` requires a participant-authorized, contemporaneous artifact observation with an `artifact_id`, a safe time/version link, and direct support for at least one decision element beyond a final literal or screen: the question, option, evidence, rationale, disposition, owner, scoped approval, or change mapping. A final expression or live screenshot alone supports a delivery observation; it does not make the decision reconstruction artifact-backed.

A broad project summary, general philosophy, preferred phrase, or hypothetical scenario is not `decision_eligible`. A protected `case_decision_crosswalk_id` links reports about the same project/task and decision across participants. Duplicate accounts create separate report records linked to one decision ID; they do not increase the decision or project/task denominator.

Count revisions, supersessions, and locale realizations as one decision lineage unless a new question, materially different alternatives, changed controlled meaning/consequence/action, or independently scoped disposition creates a new decision. Report both unique project and unique task counts; do not add them together to manufacture the inherited minimum of 12 recent projects or tasks.

## Participant and decision sampling

### Full-study frame

Use purposive maximum-variation sampling, with a planned center of 25 interviews inside the research plan's 20–30 interview starting range. Treat 50 threshold-eligible decisions as a coverage gate, not a per-session quota. Review observed decision yield after each five-session batch; continue toward 30, use an approved follow-up, narrow the claim, or seek an approved extension when depth and coverage cannot both be met. Continue, narrow, or extend only through the coverage review below.

| Coverage dimension | Full-study requirement or balancing target | Counting rule |
| --- | --- | --- |
| Decisions and tasks | **Inherited proposal:** at least 50 `threshold_eligible` decisions from at least 12 distinct recent projects or tasks | Report unique projects and unique tasks separately; duplicate reports and one decision lineage count once |
| Domains | **Inherited proposal:** at least six materially different domains | Do not relabel adjacent teams in one product as different domains |
| Role and seniority | Include core practitioners, close collaborators, individual contributors, and content leaders/system owners | Record function and decision role separately from title |
| Language and geography | Include work outside US-only English, non-English-first and multilingual decisions, and bidirectional products | Translation after a frozen English decision does not by itself count as non-English-first design; record language, script, direction, locale, and market separately |
| Specialist coverage | Include accessibility/inclusive-design and localization/globalization specialists | A generalist saying a check occurred does not replace specialist perspective |
| Risk | **Balancing target:** at least 10 low-consequence/reversible and 10 high-consequence or controlled decisions | Low means limited and readily reversible inconvenience; moderate means meaningful task/trust impact or recoverable harm; high/controlled means material money, access, rights, health, safety, privacy, eligibility, broad exposure, irreversibility, or governed meaning. Preserve participant and researcher classifications separately |
| Responsibility layers | Cover purpose/outcome; meaning/structure; interaction/expression; system/delivery; assurance/lifecycle | One decision may span layers; name the primary and secondary layers |
| Operating context | Cover greenfield/change and takeover/retrofit; add migration, locale launch, incident/late-stage, platform, or maintenance cases as available | Report blank strata rather than filling them with weak analogies |
| Surfaces and channels | Cover more than one of web, mobile, conversational, notification, transactional, support, document, and agent-mediated work | Count the actual delivery context, not a prototype's intended future channel |
| Organization model | Seek solo/small, centralized, embedded, federated/distributed, platform, agency/consultancy, or rotating-specialist contexts | Organization model is descriptive context, not a maturity score |
| Practice formalization and adoption | Include first-specialist/emergent, locally repeatable, shared-system, and distributed-governance contexts | Describe available practices, adoption, ownership, and exceptions; do not compute one maturity score |

The research plan's broader proposed validation threshold still requires at least three tasks observed end to end. Interview and artifact evidence cannot satisfy that contextual-observation requirement; keep it open for the later study phase.

### Decision eligibility screen

Prefer a decision completed, paused, rejected, or materially revised in the previous six months. Accept up to 12 months only to fill a documented coverage gap, and record the recall interval.

Set `decision_eligible: true` when the participant can describe their direct role and the material question. Set `threshold_eligible: true` only after the artifact-backed or observation rule and cross-participant/lineage deduplication pass. A wholly hypothetical case, polished outcome with no recoverable decision, or inseparable duplicate is not decision-eligible. A participant may still describe a sensitive case at a safe abstraction for thematic analysis; it does not count toward 50 unless the threshold rule passes.

### Pre-screen privacy notice

Show this notice and record `screening_consent: yes/no` before collecting screening answers:

> This short voluntary screen asks about your work function, broad context, and one recent decision only to select a varied research sample. Do not name an employer, client, product, person, or proprietary content. No recording, artifact transfer, or model/AI processing occurs in screening. Contact, accommodation, and compensation information is held separately from research answers with the stated access roles. Screened-out answers and their contact link will be deleted within 30 calendar days after cohort selection unless you withdraw sooner or an approved policy disclosed before collection requires a different period. Only nonidentifying recruitment counts may remain. You may stop or request deletion through the contact route shown here.

### Screening questions

Collect only the minimum needed to select a maximum-variation sample:

1. Which functions did you perform in the decision: content design/UX writing, strategy/IA/operations, research, product/design, engineering, localization, accessibility, domain/policy, approval, delivery, or another function?
2. Were you an individual contributor, lead/system owner, close collaborator, accountable owner, authorized approver, implementer, evaluator, or more than one?
3. Which organization model and broad size band best describe the work? How formalized, shared, and adopted were its content practices? Do not request an employer or product name.
4. Which broad domain, markets, languages, scripts, directions, surfaces/channels, and user groups were in scope?
5. What could have happened if the decision was wrong: limited inconvenience, recoverable task/trust harm, or material money/access/rights/health/safety/privacy/eligibility harm? How reversible was it, and how many people could be exposed?
6. When did it occur, and was it greenfield/change, takeover, migration, locale launch, accessibility remediation, incident/late-stage, platform, or maintenance work?
7. In one sentence, what specific question or choice can you safely reconstruct, and what was your direct role?
8. Which redacted artifact class could you safely walk through: brief, research note, journey/state model, content model, prototype, decision log, review comment, source mapping, localization record, test/QA result, or other?
9. Does the example involve customer data, secrets, legal privilege, a security vulnerability, safeguarding, clinical data, employee cases, or unpublished strategy? If yes, select another example or discuss only an approved abstraction.
10. About how long have you performed the function or functions relevant to this specific decision? Offer `less_than_1_year`, `1_to_3_years`, `4_to_7_years`, `8_to_12_years`, `13_or_more_years`, and the participant-facing choice “Prefer not to disclose,” stored as the exact wire value `not_disclosed`. `prefer_not_to_disclose` is not a valid wire value. Store one `function` plus `experience_band` pair for each relevant function rather than collapsing different functions into one tenure. This is role-relevant experience context, not an age, title, seniority, quality, or maturity proxy.

After screening, authorized operations staff ask separately for the participant's preferred spoken and written participation language, whether live interpretation or translated materials are requested, and what other access, communication, scheduling, or accommodation would make participation workable; they do not require diagnosis disclosure. Exact employer, product, client, contact, accommodation, and compensation records remain in the separate recruitment/operations system and never enter the research dataset. Compensation is based on participation time and expertise, not artifact access, recording, optional reuse permissions, or whether a case counts.

## Consent, safety, and data minimization

### Pre-session consent packet and opening reconfirmation

Provide the plain-language study information and granular consent form before the session, with enough time for review, questions, and an accessible alternative. For every recording, transcription, or model/AI path, the packet names the controller/provider and subprocessors; purposes and data categories; storage and processing regions; any cross-border transfer and disclosed safeguard; authorized access; retention, backup, deletion, and withdrawal limits; training or service-improvement use; and the rights/contact route. Record `consent_document_id`, form and processing-notice versions, delivery and decision timestamps, participant receipt, each permission value, each approved processor/path version, and every later change or withdrawal.

Use minutes 0–5 only to reconfirm or change the pre-recorded permissions, answer questions, and establish safe sharing boundaries. Read this before contextual questions or screen sharing:

> We are studying how a recent content decision was made. We do not request or retain your company's literal copy by default. Participation is voluntary. You may skip any question, stop sharing, withdraw, or end the session without giving a reason. Please do not show customer or employee data, secrets, privileged legal material, security vulnerabilities, unpublished strategy, controlled clinical or safeguarding records, or material you are not authorized to share. Your consent does not override employer, client, or professional confidentiality. We will separate what you tell us, what an artifact shows, and what we infer. The information and consent form you received records each permission separately. I have consent version [ID] with these current choices: [read choices and restrictions]. What questions or changes do you have, and do you reconfirm participation under these boundaries?

Record separate `yes`, `no`, or `withdrawn` values for:

- participation;
- researcher note-taking and coded use of the resulting record;
- audio recording;
- video or screen recording;
- named transcription path, including service, subprocessors, region/transfer, retention/deletion, training/improvement terms, and human correction;
- participant-controlled artifact viewing;
- retention of one exact redacted artifact extract;
- named model/AI path, including provider, subprocessors, region/transfer, data path, retention/deletion, and training/improvement terms;
- de-identified paraphrase in research outputs;
- verbatim quotation;
- attribution of a quote or claim;
- transformation of an abstracted case into an independently authored synthetic fixture or judge-item candidate; and
- future contact.

Declining participation ends the session; declining notes means no research record is created. Every other permission is optional and independent. Recording consent never implies transcription, model-processing, artifact-retention, quotation, attribution, or benchmark consent. If a processing path has not been approved and explained, its value is `no`.

### Collection and stop rules

- View only a participant-selected, redacted copy or participant-controlled screen after they confirm they are authorized to show it. Never request production access, credentials, source repositories, customer accounts, or unrestricted design/CMS/TMS workspaces.
- Keep video, screen recording, screenshots, and automated capture off during the artifact walkthrough by default, even when video recording was permitted for the interview. Retain an exact redacted extract only under its separate permission and approved storage rule. Capture structural notes and abstracted meanings rather than proprietary literals.
- Ask about the foreseeable situational load and evidence that affected tone; do not diagnose or infer an individual's emotion.
- If prohibited material appears, stop sharing and all recording immediately; do not repeat it into notes. Quarantine any possibly affected recording or extract from ordinary researcher access, notify the named incident owner, delete or approved-redact it under the incident route, and record only the sensitivity category and disposition. Resume only after the participant and incident owner confirm a safe boundary.
- Stop when consent is unclear, the participant appears distressed, redaction is inadequate, a real person could be harmed, or the approved storage/processing boundary would be exceeded.
- State the exact approved confidentiality/escalation limits and withdrawal/deletion window before recruitment. Explain what can no longer be withdrawn after irreversible de-identification or aggregate publication.
- Let participants review any attributed claim. Do not require review of anonymous analytic interpretations, but provide a way to correct factual misrepresentation.

### Conditional multilingual interpretation and translation contract

Apply this contract whenever the participant requests interpretation, any study material is translated, an original-language record is rendered into another language for analysis, or a coder cannot directly evaluate the source language. Language access is part of the study design, not a post hoc transcription convenience.

1. **Consent and language choice.** Provide the information sheet, consent choices, withdrawal route, and artifact-sharing warnings in a language and accessible form the participant can understand. Record the participant's preferred spoken and written languages, script and direction where relevant, whether they want a human interpreter, and whether they consent separately to the named interpretation and translation paths. Reconfirm those choices before an interpreter joins or any record is sent for translation. Participation, note-taking, recording, transcription, interpretation, translation, artifact viewing, model processing, quotation, and reuse remain separate permissions; declining interpretation or translation cannot reduce compensation or require the participant to proceed in another language.
2. **Provider and access boundary.** Before use, record the interpreter or translator's provider/contract ID, role, languages and declared competency, confidentiality terms, approved people and subprocessors, processing region and transfer safeguards, exact data classes, purpose, access method, retention/deletion, training or service-improvement terms, and incident route. Link the participant's consent record, a current `data_processing_record_id`, and the provider's least-privilege access record; none substitutes for another. Give the provider only the minimum consented material. Live interpretation does not confer artifact access; artifact viewing, exact extracts, recordings, and transcripts each require their applicable permission and access record. Unapproved consumer translation tools and ad hoc model translation are prohibited.
3. **Original-language evidence-source record.** Preserve the permitted original-language account, note, transcript, or artifact observation as its own immutable member of the canonical evidence-source family. Record `evidence_source_id`, canonical `source_type`, `evidence_basis`, actual `access_mode`, language, locale when known, script, direction, creator/speaker role, capture method, consent and access class, created/observed time, evidence-source version, and a content hash when a legally retained snapshot exists. A translated rendering never replaces or silently edits this record.
4. **Derived translation and provenance.** Store each interpreted transcript, translation, correction, or back-translation as a versioned derived record with `translation_record_id`, exact `source_evidence_source_id` plus source version/hash, source and target language/locale/script/direction, `provider_id`, `translator_or_interpreter_id`, human/machine method, approved model/service and version when applicable, prompt/configuration when applicable, creation time, transformation steps, translation version, uncertainty flags, and supersedes/superseded-by links. When a rendering is admitted as evidence for coding, assign it a distinct `rendering_evidence_source_id` and store the typed relationship `DERIVED_TRANSLATION_OF(rendering_evidence_source_id, source_evidence_source_id)` with both exact versions/hashes. Record access, retention, deletion, and downstream-use limits for the derived record independently.
5. **Human correction and participant meaning.** A qualified human reviews every machine-produced transcript or translation before it is used for semantic coding, quotation, or a decision record. Preserve the uncorrected output, corrected version, correction diff, reviewer, timestamp, rationale for meaning-changing corrections, and unresolved alternatives. During playback, check decision-critical terms, alternatives, negation, modality, authority, risk, and disposition in the participant's preferred language. A translated quotation requires the participant's quote permission and, for attribution, their review of both the source-language excerpt and proposed rendering; label who translated it rather than presenting the rendering as verbatim.
6. **Coder competency and equal evidence.** Record each coder's assessed language/locale/script competency, relevant domain competency, permitted evidence, and authorized coding scope before assignment. A coder may directly judge source-language semantics or locale acceptability only within that declared competency. Otherwise they code only fields supported by the same approved, human-corrected translation available to the other coder; source-language nuance, translation quality, and locale acceptability are excluded from that agreement denominator and routed to a qualified bilingual or in-market specialist. Specialist adjudication is scoped and cannot be replaced by majority vote.
7. **Uncertainty and failure.** If no approved competent provider, understandable consent material, human correction route, or equally accessible evidence exists, pause that processing path. Retain the original record only within its consented boundary, mark the affected fields `not_observed` or `unknown` as applicable, exclude them from comparative or agreement claims, and report the resulting language-access limitation. Do not translate by inference to make the record complete.

## Material and access prerequisites

No session is ready until every row has an exact, approved value rather than an assumption.

| Need | Required evidence before use |
| --- | --- |
| Study governance | Named study owner; approved ethics/research route; compensation independent of optional permissions/counting; risk and incident owner; confidentiality/escalation limits; accessibility and withdrawal routes |
| Participant materials | Pre-screen notice/consent; screening form; plain-language session consent; artifact-authorization/redaction guide; accommodation route; participant copy of rights and contact path |
| Processing register | Exact note, recording, transcription, model/AI, transfer, subprocessor, training/improvement, region, retention, and deletion decisions |
| Language access | Participant language choice; translated consent/material versions; named interpretation/translation provider, competency and access contract; original/derived record lineage; human-correction and specialist-coding route |
| Storage | Exact encrypted location; access roles; contact-key separation; backup behavior; retention period; deletion schedule; breach/escalation path |
| Session environment | Accessible meeting method; participant-controlled sharing; recording off until consent; artifact screen/video capture off by default; quarantine route; no production connector |
| Research team | Trained moderator, observer/note-taker, and two independent coders; roles may combine only when both coders receive the same permitted evidence and lock their coding before discussion; access to locale, accessibility, domain, privacy, or safeguarding review when required |
| Working instruments | Session guide; consent log; artifact log; decision-record template; codebook version; coverage dashboard; disagreement/adjudication log; reflexivity log; redaction/incident log |
| Identifiers | Preallocated participant, session, decision-reconstruction, project/task case, crosswalk, decision/lineage, typed record-link, claim, artifact, evidence source, governing instrument, applicability, owner, approver, approval, control/grant, occurrence, release, and evaluation IDs with no identifying meaning |

## Exact 70-minute recent-decision interview

Use one deep focal decision. A linked decision is optional and counts only when it independently meets the decision and threshold rules; a negative-case prompt is not a second decision. Do not trade away consent, safety, playback, or closing to increase yield.

Begin in the participant's language. Collect an uninterrupted critical-incident account before introducing the candidate model's terms. The later structured prompts are completeness probes, not answers the participant is expected to endorse; map their language to canonical records during analysis.

| Time | Segment | Moderator action and core prompts | Required capture |
| ---: | --- | --- | --- |
| 0–5 | Consent and boundaries | Reconfirm or change the pre-recorded granular permissions; answer questions; confirm accommodation and safe sharing; ask the participant to close or redact unrelated material | Consent document/path versions, reconfirmation/change timestamps, current values, recording state, restrictions, stop route |
| 5–10 | Role and operating context | “What was your function in this work, what could you decide, recommend, approve, implement, or evaluate, and about how long had you performed each function relevant to this decision?” | Function-and-experience-band pairs, decision role, organization model, domain, locale/channel context |
| 10–15 | Select the focal case | “Choose the most recent specific decision you can safely reconstruct. What was the decision question—not the whole project—and when did it happen?” | Project/task case ID, provisional decision ID, recency, direct involvement, artifact class |
| 15–20 | Uninterrupted critical-incident account | “Starting when you first became aware of it, tell me what happened through the decision and what followed. I will listen first and clarify afterward.” Interrupt only for safety or consent | Participant sequence and vocabulary; people, artifacts, surprises, and outcome they name without model prompts |
| 20–35 | Clarify the decision timeline | Use only the unanswered neutral prompts below; anchor events to artifacts and people rather than polished philosophy | Trigger, problem, options, evidence, constraints, actors, sequence, disposition, uncertainty |
| 35–50 | Artifact walkthrough | Participant controls the authorized redacted artifact with artifact capture off. Trace the focal decision across versions/systems without retaining proprietary literals | Artifact basis, safe coordinates, contradictions, missing fields, temporal/version links |
| 50–61 | Record-family probes | In the participant's words, clarify sources, constraints, responsibility, any approvals, delivery, and evaluation; only then map to separate canonical records | Independent families, actual versus documented route, state mismatches, reviews, outcome evidence |
| 61–66 | Negative case, optional linked decision, and delegation | Select one negative-case prompt matched to a gap. If a genuine linked decision surfaces, record it for later eligibility review. Ask the mode-specific agent boundary | Counterexample; optional second decision question/options/disposition; escalation and trust/control need |
| 66–70 | Playback and close | Summarize without proprietary content: “What have I misunderstood, missed, or misnamed?” Explain withdrawal/deletion route and next use | Participant correction, unresolved points, permission changes, consented follow-up only |

### Decision-timeline prompts

After the uninterrupted account, ask only what remains unclear. Record the participant's term before using a canonical term; do not presuppose a conflict, governing instrument, approval, or delivery state.

1. What request, event, defect, evidence, or deadline triggered the work? What did the request assume?
2. What user or service problem did you believe needed solving? What would have happened if you had simply rewritten the words?
3. Which actors, entry points, states, consequences, routes, surfaces, channels, locales, and nonvisual experiences mattered?
4. What product behavior, domain fact, operation, or policy had to be understood first? What remained unknown?
5. What did you consult or rely on? What did each item contribute? If people treated sources differently, how did they describe and resolve—or preserve—that difference?
6. Did any law, policy, standard, contract, terminology system, component rule, or other constraint enter the work? What did the team call it, and who, if anyone, treated it as applicable here?
7. Who contributed information, carried responsibility, accepted or rejected the decision, changed a source, or released it? What words did the team use for those roles?
8. Which alternatives were considered, including changing behavior, changing structure, doing nothing, escalating, or leaving the question unresolved? What criteria ruled them in or out?
9. What was actually decided, rejected, deferred, or superseded? For which product, state, audience, locale, jurisdiction, version, and period?
10. What did you change outside the string itself? What uncertainty or dissent remained?

### Authority, delivery, and evaluation prompts

1. What reviews or checks occurred, what did the team call them, and which question did each answer? Probe critique, fact, legal/compliance, accessibility, locale, user evaluation, built verification, and release only when relevant.
2. What, if anything, was treated as “approval” or acceptance? What exact version and scope did it cover, who could give it, and were conditions or an expiry recorded? Preserve the participant's wording; when the approval type cannot be established, record `approval_type: unknown`, `not_disclosed`, or `not_observed`, as applicable, and do not supply one.
3. Separately, what permission or authorization, if any, allowed someone or a tool to change a source, CMS, design, configuration, or publication target? Was residual release risk accepted through another decision?
4. Where did the decision appear: design, code, CMS, TMS, notification system, support material, or another source? What stable link or handoff carried it?
5. Was it only mapped, patched, built, verified, released, or directly observed live? How did you know? Where did delivery drift from the decision?
6. What was evaluated before implementation, verified in the build, and measured after release? Which object/version, method, population, limitation, and outcome were attached?
7. What evidence later changed, challenged, deprecated, or retired the decision? Who owns the next review trigger?

## Artifact walkthrough instrument

Before sharing, confirm the participant is authorized to show the material, then ask them to choose the safest artifact for the focal decision and hide names, literals, URLs, IDs, comments, tabs, and unrelated content. If no safe artifact remains, use a blank timeline, preserve the practitioner account's actual access mode—normally `live_participant_account` for the unrecorded live account or `consented_recording_or_transcript` when that permitted record was actually reviewed—and set only `artifact_backed: false` plus the applicable artifact-missingness reason. Create no absent-artifact evidence-source record and do not alter any evidence dimension to represent artifact absence.

For each artifact shown, capture:

1. What artifact class is this, who created or maintained it, and what decision was it meant to carry?
2. What date/version and apparent state did it have at the time? Is that state explicitly recorded or remembered?
3. Which part is participant report, which part is directly visible in the artifact, and which part is our interpretation? Store each separately with its own `source_type`, `evidence_basis`, and `access_mode`; an inference becomes a linked claim rather than a synthetic source.
4. Where are the trigger, context, evidence, alternatives, rationale, owner, approver, scope, state, implementation mapping, and evaluation? Use the defined missingness values; do not fill gaps from plausibility.
5. Which adjacent artifact or system came before and after it? What stable ID, key, link, or human handoff connected them?
6. What changed between versions, who changed it, and was the rationale preserved?
7. Where does this artifact conflict with the participant's account, another artifact, implementation, locale, or live experience?
8. What could be removed from the proposed schema without losing reconstruction? What missing field would have prevented rework or harm?

The artifact log stores an abstract description, artifact class, observed fields, safe date/version band, consent, redaction, and evidentiary limitations. It does not retain proprietary literals or artifact files by default.

## Decision-record extraction contract

### Record families that must remain separate

| Record family | ID and relationship | Capture | Never infer |
| --- | --- | --- | --- |
| Research claim | `claim_id`; a decision has zero or more claims; a claim links to zero or more evidence sources | Abstract assertion, exact scope, and explicit canonical `claim_label`; a raw participant statement remains a source until the research team makes a bounded claim | `research finding` from one report, or a claim label from source type |
| Evidence source and dimensions | `evidence_source_id`; a source may support, challenge, or contextualize many claims | Safe reference; canonical `source_type`; separate `evidence_basis` and `access_mode`; evidentiary role, provenance, scope, method, language/locale, date, limitations; observation `unobserved/observed/corroborated`; challenge `undisputed/disputed`; freshness `current/stale`; lineage `active/superseded`; qualifier `none/inferred/assumed` | A source type from basis/access, stronger evidence from access mode, or approval, applicability, authority, organizational rule, delivery, or outcome |
| Language-access processing, when applicable | `language_access_record_id`; links exact consent, data-processing, provider, and least-privilege access records | Participant language choice; interpretation/translation permissions; provider identity, competency and contract; approved data, purpose, people/subprocessors, region/transfer, access, retention/deletion, downstream use, and incident route | Consent from language preference, artifact access from live interpretation, or processing authority from provider availability |
| Translation derivative, when applicable | `translation_record_id`; `source_evidence_source_id` links one exact original evidence-source version, and an admitted rendering receives its own `rendering_evidence_source_id` | Typed `DERIVED_TRANSLATION_OF` relationship; source/target language, locale, script and direction; provider and translator/interpreter identity; human/machine method and service version; both evidence-source hashes/versions; transformation, correction, uncertainty and supersession lineage; access/retention/deletion limits | Source replacement by a translation, an unjoined derivative, locale acceptability from fluency alone, or semantic equivalence from an unreviewed machine output |
| Governing instrument | `governing_instrument_id`; one instrument has zero or more applicability records | Instrument class, issuer, jurisdiction, version/effective dates, controlled scope | Applicability merely because it is topical, nearby, or policy-like |
| Applicability determination | `applicability_id`; links one instrument to an exact claim/decision scope | Question, determination or open status, evidence, decision-maker/owner, scope, date, and review trigger | Owner, approval, or correctness from the instrument alone |
| Accountable owner | `owner_id`; links only declared responsibility classes/scopes | Responsibility class, product/domain/locale scope, delegation, escalation, and whether explicit, reported, contested, or absent | Approval power from authorship, seniority, title, or artifact custody |
| Approver authorization | `approver_id`; an approver may issue zero or more typed approval records | Authorized role/person class, approval class, scope, delegation source, conditions, validity | Approval merely from attendance, title, comment, or ownership |
| Decision | `decision_id` plus `decision_lineage_id`; one version has one state | Question, options, rationale, version, scope, and `question/option/proposed/approved/rejected/superseded/deprecated/retired` | Delivery from approval, or approval from frequency/live occurrence |
| Semantic-decision approval | `semantic_approval_id`; links one approver authorization to one exact decision version/scope | Conditions, date, expiry/review trigger, and approval evidence | Mutation authority, release approval, capability, implementation, or effectiveness |
| Connection authorization, when applicable | `connection_authorization_id`; independent control record | Principal/client/workspace, connector/resource, scopes/fields/operations, purpose, expiry, revocation | A task operation or data-processing permission |
| Data-processing authorization, when applicable | `data_processing_record_id`; independent control record | Purpose, data/fields/subjects, providers/regions, uses, retention/deletion/rights, owner/approver links | Connection, task capability, content approval, or durable memory |
| Durable-memory decision, when applicable | `memory_decision_id`; independent control record | Allowed records/fields, purpose, store/region/access, retention/deletion/export, owner/approval | General permission to persist or reuse any study data |
| Telemetry decision, when applicable | `telemetry_decision_id`; independent control record | Event/field schema, redaction, purpose/destination, access, retention/deletion, owner/approval | Permission for the observed operation or secondary use |
| Phase-gate result, when applicable | `phase_gate_result_id`; one declared phase/profile disposition | Profile/version, evidence, `pass/blocked/not applicable`, date, expiry/invalidation | A capability grant, approval, or later-phase eligibility |
| Capability grant, when applicable | `capability_grant_id`; one exact operation/resource per current grant | Issuer/principal, tool/operation/resource, data/egress/environment boundary, expiry, revocation | Semantic, mutation, or release approval |
| Runtime-verification grant, when applicable | `runtime_grant_id`; separate capability-grant subtype | Executor/actions, build/environment, filesystem/network/data/credential bounds, duration, cancellation, cleanup | Static read, model/connector, mutation, publication, or enforcement capability |
| Mutation/change approval, when applicable | `mutation_approval_id`; binds one exact diff/target transaction | Base/current value, target, environment, purpose, conditions, date, expiry, rollback | Semantic meaning, release risk acceptance, or execution capability |
| Implementation occurrence and delivery | `occurrence_id`; a decision/expression may have many occurrences, each with one current delivery state | Exact safe system/coordinate and `unmapped/mapped/patched/built/verified/released/observed-live/rolled-back/removed` with evidence | Approval, universal availability, comprehension, or success |
| Build and release | `build_id` and `release_id`; one release exposes an exact build to a scoped audience | Build/revision, environment, audience, locale/market, flags, effective time, publication/readback/rollback evidence | Release approval, semantic approval, or positive outcome |
| Release approval | `release_approval_id`; links an authorized approver to one exact build/exposure scope when policy requires it | Residual risks, audience, locale/market, environment/window, conditions, date, expiry | Semantic approval, mutation/publication capability, release execution, or positive outcome |
| Evaluation | `evaluation_id`; many evaluations may attach to an exact object/version | Question/hypothesis, method, sample/segment, timing, result, uncertainty, limitations, evaluator, and decision effect | Canon, causal proof without suitable design, approval, or delivery-state advancement |

### Extraction schema

Use a small universal core for each decision reconstruction plus conditional modules and repeated linked records. Shared evidence sources, instruments, approver authorizations, and evaluations keep one family-specific record and join to one or more reconstructions through typed record links; do not duplicate them per participant or case. Do not flatten the record families above into one row or lifecycle flag.

| Module | Applicability | Fields |
| --- | --- | --- |
| Universal identity | Every decision-reconstruction record | `decision_reconstruction_id`, `study_id`, `session_id`, `participant_id`, `case_id`, `project_id` and/or `task_id`, `case_decision_crosswalk_id`, `decision_id`, `decision_lineage_id`, instrument/codebook versions, coder, timestamps |
| Universal evidence basis | Every decision-reconstruction record | One or more linked `evidence_source_id` values with independent canonical `source_type`, `evidence_basis`, and `access_mode`; any analyst-authored inference as a linked `claim_id` with explicit canonical `claim_label`; consent/redaction; paraphrase/quote status; `artifact_backed`; artifact-missingness reason |
| Universal participant/context | Every decision-reconstruction record | One or more role-relevant `function` plus `experience_band` pairs using the defined screening values or `not_disclosed`, decision role, organization model/size band, practice formalization/adoption, broad domain/geography/market, language/script/direction, recency, entry mode, workflow stage(s), responsibility layer(s) |
| Universal decision anatomy | Every `decision_eligible` record | Abstracted question, trigger, direct role, options, disposition, criteria, rationale, scope, participant-described consequence/reversibility/exposure, researcher analytic risk, dissent, uncertainty |
| Universal analytic status | Every decision-reconstruction record | `decision_eligible`, `threshold_eligible`, coverage cells, negative-case flag, open-code memo, field pressure, coder labels, disagreement/adjudication state |
| Linked-record joins | Every conditional record-family instance | Family-specific record ID; `record_link_id`; typed relationship to one or more `decision_reconstruction_id`, `decision_id`, or `claim_id` values; source/target versions; provenance basis; consent/access class; record version and timestamps. Shared records are referenced, not copied |
| Experience context | When product/service experience context affected the decision | User need/job, journey, entry point, event, preconditions, semantic state, behavior, consequence, recovery, actor/role, surface/channel, component/pattern/slot, locale/jurisdiction |
| Claim and evidence | When a material claim or source was involved | `claim_id`, explicit canonical `claim_label`, bounded claim/scope; typed evidence-source links, roles, bases, five evidence dimensions, conflicts, limitations, freshness/review need |
| Control and applicability | When an instrument or rule may constrain the choice | Governing-instrument and separate applicability IDs, scope, jurisdiction/effective date, applicability owner/decision/open question, conflict/review trigger |
| Ownership and approvals | When responsibility or approval affected the choice | Owner and approver IDs/classes/scopes; separate semantic, mutation, and release approval IDs with exact version/scope/conditions/date/evidence or explicit absence |
| Artifacts and collaboration | When an artifact or handoff existed | Artifact IDs/classes, authorization, purpose, safe coordinates, sequence/version link, handoff/side conversation, participant-versus-artifact conflict, missing fields |
| Expression and delivery | When a semantic message/expression or implementation existed | Message/expression/occurrence/release IDs; source/design/CMS/TMS/support mapping; independent delivery state; build/release/live evidence |
| Assurance and evaluation | When review, test, verification, or measurement occurred | Review type/question; pre-implementation evaluation; built verification; post-release outcome evaluation; separate evaluation IDs with method/sample/result/limitations |
| Lifecycle | When reconsideration or maintenance occurred | Supersedes/superseded by, review trigger, maintenance owner, drift, rework, rollback/removal, eventual outcome |
| Agent/action controls | When a tool or agent operation was part of the case | Requested `Discover/Advise/Draft/Apply/Enforce` mode; connection, processing, memory, telemetry, phase-gate, capability/runtime-grant, and change-transaction IDs; evidence demanded; prohibited action; escalation |
| Multilingual language access | When interpretation, translation, or cross-language coding occurred | `language_access_record_id`, `translation_record_id`, `source_evidence_source_id`, and any `rendering_evidence_source_id`; typed derivation relationship; granular consent; provider/access terms; immutable source/rendering versions and hashes; target rendering and method/version; human correction/diff; uncertainty; coder competency/scope; participant playback or quote review |

No universal-core cell is blank. Mark a conditional module `not_applicable` with a reason rather than fabricating every field. Within an applicable module use:

- `absent` when the artifact/system was observed and the expected field or record was not present;
- `unknown` when the value remains unknown after an appropriate probe;
- `not_disclosed` when the participant withheld it or consent prevented collection;
- `not_observed` when the researchers lacked direct observation or an artifact; and
- `not_applicable` when the construct genuinely does not apply.

These missingness values are independent of `artifact_backed` and the canonical evidence observation value `unobserved`; none is a decision or delivery state.

## Counterexample and negative-case prompts

Select at least one per session, driven by the coverage register. Do not ask all of them mechanically.

- Tell me about a time the right content-design decision was to change behavior, sequence, policy, or process—or add no content.
- When did the documented workflow fail to describe the actual route? Which side conversation, workaround, deadline, or power dynamic changed the decision?
- When did two credible sources or specialists disagree? What remained disputed, and what would be false if we forced one consensus field?
- Have you seen approved content that was not implemented, live content that was not approved, or a verified build that was not released? How was that combination handled?
- When did critique, fact check, legal review, user evaluation, QA, or release approval get mistaken for another kind of evidence?
- When did an English/source-language structure, dominant term, or global pattern fail in another locale? Who could challenge it?
- When did visually acceptable copy fail nonvisually, cognitively, or with assistive technology?
- Describe an incident, mandated launch, or late-stage request where the ideal process was compressed. What could not safely be skipped, and what debt was recorded?
- Which low-risk decision would make this record schema disproportionate? What is the smallest record that would still protect later reconstruction?
- Which rare decision mattered more than its frequency? What control or refusal boundary did it require?
- What part of this decision would you trust an agent to observe, advise on, draft, apply, or enforce? What exact evidence, approval, diff, rollback, or verification would change your answer?
- What have our questions or record missed, misnamed, overstated, or made hard to explain?

## Initial analytic codebook

Codes are **[Proposal]** analytic descriptors, not canonical claim labels, approval states, or evidence strengths. Apply multiple codes when the record supports them; never infer a code from title alone.

| Code | Include when | Exclude or counterexample |
| --- | --- | --- |
| `D-PROBLEM` | Chooses the problem, outcome, scope, or whether content is an intervention | A deliverable is accepted without examining the problem |
| `D-BEHAVIOR` | Chooses product/service behavior, state, sequence, consequence, action, or recovery | Wording adapts to already-set behavior without changing it |
| `D-FACT` | Chooses, defers, or escalates a factual/controlled claim or its applicability | A source is consulted but no claim decision occurs |
| `D-STRUCTURE` | Chooses concept, object, relation, hierarchy, navigation, message priority, or progressive disclosure | Cosmetic ordering with no meaning or task effect |
| `D-EXPRESSION` | Chooses interaction language, term, voice/tone application, mechanics, or locale expression | Product meaning or behavior is silently changed through wording; add `D-BEHAVIOR` or `D-FACT` |
| `D-ACCESS` | Chooses visible/nonvisual semantics, instructions, status, error association, communication support, or inclusive behavior | Readability-only preference presented as accessibility |
| `D-LOCALE` | Chooses language/market structure, concept adaptation, terminology, formats, direction, or locale parity | Downstream word substitution with no locale decision |
| `D-DELIVERY` | Chooses schema, key, component, channel, implementation mapping, migration, release, or rollback | Delivery state is merely reported; coding requires a choice |
| `D-EVALUATION` | Chooses hypothesis, method, measure, guardrail, interpretation, or next evidence action | Stakeholder preference is called user validation |
| `D-GOVERNANCE` | Chooses ownership, approval route, rule, exception, review trigger, maintenance, deprecation, or retirement | A title is assumed to define authority without a decision |
| `P-REFRAME-NO-CONTENT` | Requested copy becomes a different problem, behavior/process change, or deliberate no-content outcome | Words are shortened but the intervention stays the same |
| `P-EVIDENCE-SWITCH` | A new source, observation, or conflict materially changes the decision | More sources are collected but do not affect options, scope, or disposition |
| `P-UNOFFICIAL-PATH` | Side conversation, workaround, political negotiation, or undocumented route materially affects the outcome | Routine collaboration already represented in the formal process |
| `P-AUTHORITY-GAP` | Owner/approver is absent, contested, overridden, or outside nominal role boundaries | A known authorized route works as documented |
| `P-ARTIFACT-MEDIATED` | An artifact preserves or changes context, rationale, state, or coordination | An artifact is only a passive final presentation |
| `P-HANDOFF-LOSS` | Rationale, state, variables, locale, accessibility, uncertainty, or mapping is lost between people/systems | A documented handoff preserves the needed decision record |
| `P-STATE-DIVERGENCE` | Evidence, decision, approval, delivery, release, or evaluation states conflict in a material way | Different states are correctly separate and consistent |
| `P-REVIEW-CONFLATION` | Critique, assurance, fact check, specialist review, user evaluation, QA, or release approval is treated as interchangeable | Each review answers and records its own question |
| `P-LATE-EMERGENCY` | Incident, freeze, mandate, or deadline compresses the route and creates explicit debt or risk | Ordinary time pressure with no material process change |
| `P-NEGATIVE-CASE` | A proposed common field, rule, stage, or relationship fails or requires a scoped extension | A familiar variant is already representable without changing the model |
| `P-DELEGATION-BOUNDARY` | The case supplies mode-specific agent trust, refusal, evidence, approval, control, or verification requirements | General enthusiasm or concern without an action boundary |
| `P-DRIFT-REWORK` | Staleness, divergence, missing ownership, late review, or repeated defect causes maintenance or rework | Planned iteration with no identified system failure |

Every decision also has an uncoded participant-language summary and an `open_code_memo`. When existing codes do not fit, record a `candidate_new_code`, definition, evidence span, and counterexample; do not force the material into `P-NEGATIVE-CASE`. Add, merge, or retire codes only in a versioned codebook change with an explicit recoding rule for earlier records.

## Independent coding, disagreement, and reflexivity

1. Before Session 1, lock the unitization guide, extraction schema, and codebook version. A decision boundary follows the eligibility rule, never the desired count.
2. Two researchers independently unitize and code 100% of the first five pilot sessions. After the pilot, use the frozen selection algorithm below to independently unitize enough complete session/case clusters to include at least 25% of post-pilot `decision_eligible` records or 15 decisions, whichever is greater and capped at the available frame. This is a minimum disagreement audit, not automatically a sufficient reliability sample.
3. For an artifact-dependent field in the double-coded subset, both coders must either witness the authorized walkthrough or receive the same consented redacted extract or neutral field-level observation log. If their evidence access differs, record the asymmetry and exclude that field from the agreement denominator.
4. The moderator and observer may serve as the two pilot coders because both witness the same session; they must not discuss interpretation until each has locked unit boundaries, fields, codes, rationale, and timestamp.
5. Retain each coder's original values before discussion. Classify disagreement as `unitization`, `evidence basis`, `code definition`, `scope`, `authority/approval`, `state`, `severity/consequence`, `missing context`, or `genuine interpretation`.
6. Reconcile by returning to the shared permitted evidence. Correct an error; revise a vague code for future records; or preserve dual interpretations and mark the issue unresolved. Do not force consensus or erase minority/specialist evidence.
7. Use a qualified specialist with declared scope to adjudicate only that construct. Majority vote does not establish governing applicability, locale acceptability, accessibility, domain truth, or user outcome.
8. Report pre-adjudication unitization agreement separately from field/code agreement, plus raw disagreement counts and taxonomy. The five-session pilot uses descriptive disagreement only.
9. In the larger sample, use alpha only for a field admitted by the estimator contract below and after its documented analyzable-unit, prevalence, missingness, measurement-level, clustering, and interval-stability checks pass. Sparse, constant, inaccessible, or otherwise excluded fields remain descriptive.
10. When that check passes, treat a lower confidence bound below `0.67` on Krippendorff's alpha as a **[Product hypothesis]** trigger to revise the rubric, anchors, context packet, sampling, or training before comparative claims. For deterministic high-risk annotations intended to gate a fixture, the current experimental hypothesis is a lower bound of at least `0.80` plus direct adjudication of every disagreement. Neither target is a universal standard.
11. Maintain a reflexivity log covering researcher role/background, product thesis, assumptions, relationship to participants, sampling decisions, leading prompts, interpretation changes, and cases that resist the model.

### Reproducible post-pilot selection and interval estimator

Freeze this contract before S001 as part of `pilot-0.1`; changing a seed, cell definition, estimator, threshold, exclusion, or resampling unit creates a new analysis-plan version and makes results from the new plan a separate analysis.

**Selection frame and target**

1. A data manager who is not either analytic coder creates a protected session/case manifest after the post-pilot collection frame closes. It contains all post-pilot sessions with note-taking/coded-use consent, their mechanically indexed candidate-decision spans, and only the frozen selection metadata listed below. It does not expose first-coder codes, rationales, dispositions, quotations, or outcomes to the selection operator.
2. The primary extraction produces the frozen count `N` of post-pilot `decision_eligible` records. Set `K = min(N, max(15, ceil(0.25 * N)))`. The first five pilot sessions remain a separate 100% double-coded set and do not reduce `K`.
3. Use the literal UTF-8 seed `content-md-pdrp-double-code-v1|2026-08-17`. For each session/case cluster, compute `SHA-256(seed + "|" + session_id + "|" + case_id)` and sort ascending by the full lowercase hexadecimal digest. Store the seed, ordered input IDs, digests, input-manifest hash, instrument version, and selection-script version in an immutable selection manifest.
4. Derive coverage cells only from values frozen before selection: each normalized broad domain present in the frame; each function and decision-role group present; participant-described consequence `low`, `moderate`, `high_or_controlled`, or `unknown`; language context `US_English_only`, `multilingual_or_non_English_first`, and `bidirectional`; accessibility relevance `material`, `not_material`, or `unknown`; artifact basis expected at session close `safe_artifact_viewed` or `no_safe_artifact_viewed`; and focal-decision negative-case status `yes`, `no`, or `undetermined`. Preserve multi-membership rather than forcing one cell.
5. Starting with no selected clusters, repeatedly select the cluster that covers the greatest number of still-uncovered observed cells; break every tie by ascending digest. When no remaining cluster covers a new cell, continue in ascending digest order. Select whole session/case clusters and have the second coder unitize their complete shared evidence from scratch, blind to primary unit boundaries and values. Continue until the selected clusters contain at least `K` primary-extracted `decision_eligible` records. If complete feasible cell coverage requires more than `K`, continue until every observed cell with jointly codable evidence is represented. This may exceed 25% and is intentional.
6. A selected cluster is never silently replaced. If the two coders lack the same permitted evidence for the whole cluster, retain it in the flow diagram as access-excluded and continue the deterministic order until `K` jointly unitizable records is reached; if only particular fields differ in access, keep the cluster and apply the field-level exclusion below. Report selected, coded, access-excluded, unmatched-unit, and analyzable counts. Report any cell that remains uncovered rather than altering the seed or hand-picking a substitute.
7. Coders may double-code additional records for training, safety review, or operational learning, but label them `exploratory_extra`; they do not enter the confirmatory agreement denominator. The selection manifest alone defines that denominator.

**Agreement fields and confidence intervals**

- Compute pre-adjudication Krippendorff's alpha separately for each admitted structured field at its analysis-plan measurement level: nominal unless a genuine ordered scale and distance function were frozen in advance. For each multi-label analytic code, compute a separate nominal present/absent alpha on eligible units; do not manufacture one alpha by flattening unrelated codes.
- Define one bootstrap cluster as all records linked to the same protected project/task case group across sessions; when no cross-participant project/task link exists, the `session_id` is the cluster. Resample these clusters with replacement and keep every record and both coder values inside each sampled cluster. This is the resampling unit for the interval; never resample individual decisions as independent rows.
- For each admitted field, run 10,000 nonparametric cluster-bootstrap replicates. Hash the literal UTF-8 string `content-md-pdrp-alpha-ci-v1|2026-08-17|<field_id>` with `SHA-256`, interpret the first 32 hexadecimal digits as one unsigned big-endian 128-bit integer, and use it to initialize `PCG64`. In each replicate draw exactly the observed number of bootstrap clusters with replacement, duplicating all member units when a cluster is drawn more than once. Recompute alpha and report Hyndman–Fan type-7 2.5th and 97.5th percentiles of the defined replicate estimates as the 95% percentile interval. For a given field, include a unit only when both coders supplied a rubric-valid value; do not impute a missing coder value. Record software, package, version, distance function, random-number generator, field ID, digest/integer seed, and count of excluded units and undefined replicates.
- Do not report an interval or apply the `0.67` or `0.80` lower-bound trigger when there are fewer than eight analyzable bootstrap clusters, the observed field has fewer than two populated categories, alpha is undefined, or more than 5% of bootstrap replicates are undefined. Report raw coder-by-value counts, disagreements, missingness, and the reason as descriptive evidence instead. The interval is an uncertainty summary for this clustered sample, not a population-validity claim.
- Exclude from alpha: IDs and join keys; instrument/codebook versions and timestamps; consent, access-control, retention, deletion, redaction, and incident-control values copied from operational records; hashes and mechanically derived provenance; unconstrained narrative fields, quotations, rationales, summaries, and open memos; final adjudicated values; deterministic derivatives such as coverage flags and `threshold_eligible`; fields outside either coder's authorized evidence or declared competency; source-language nuance, translation quality, or locale acceptability when either coder relies only on a translation; fields `not_applicable` for the complete analyzable subset; and unmatched units created by unitization disagreement. Report these exclusions and audit deterministic fields separately rather than treating agreement as evidence of validity.
- Treat schema-defined `absent`, `unknown`, `not_disclosed`, `not_observed`, and `not_applicable` as distinct coded values only when the field's frozen rubric makes them valid alternatives and both coders had the access and competency to distinguish them. Otherwise treat the value as missing for that field and report why. Report unitization boundary disagreement and unmatched units separately from field/code alpha; never adjudicate or align them away before the pre-adjudication report.

## Coverage, saturation, and completion logic

Review the coverage dashboard after Sessions 5, 10, 15, 20, and 25, then after every additional five if the approved study extends. Report participants; unique projects and tasks; `decision_eligible` and `threshold_eligible` lineages; artifact basis; domains; roles; languages/scripts/directions/locales; organization models; practice formalization/adoption; participant-described consequence and researcher risk; responsibility layers; workflow stages; channels; negative cases; and missing model fields. Report refusals, withdrawals, attrition, inaccessible participation, recruitment channels, and organizational self-selection separately.

A **material new structure** is an observed decision that cannot be represented without adding or changing a core entity, relationship, state, required field, scope rule, or non-entailment boundary. A new example of an existing code is not automatically a new structure.

The Phase 1–2 collection may close only when:

1. at least 50 unique `threshold_eligible` decision lineages from at least 12 distinct recent projects or tasks and at least six materially different domains are mapped;
2. the inherited proposed role, language/geography, accessibility, and localization coverage requirements and the declared risk balancing targets are met or a limitation explicitly narrows the claim;
3. two successive five-session batches collected under the same material instrument version add no core structure and no unrepresentable negative case; a new high-consequence exception restarts this stability review;
4. critical disagreements, field missingness, refusals, and underrepresented cells are understood well enough to state the model's boundary; and
5. the separate requirement for three end-to-end observed tasks remains visibly open until the contextual-observation phase completes it.

This is coverage and conceptual-stability logic, not statistical or universal saturation. A substantive change to eligibility, unitization, universal-core/conditional-module rules, record-family boundaries, or code definitions resets the two-batch stability clock; earlier records remain versioned evidence and are recoded only under a declared rule. If the conditions are unmet after 30 interviews, do not proclaim saturation or recruit indefinitely by habit. Re-scope the claim, revise the instrument, or seek an approved extension based on the named gap.

## Pseudonymization, anonymization, and derived-data contract

- Treat raw and linked working records as **pseudonymized**, not anonymous. Use nonsemantic IDs: `P###` participant, `S###` session, `J###` case, `G###` project, `T###` task, `X###` protected crosswalk, `D###` decision, `A###` artifact, `E###` evidence, and `V###` evaluation. Keep the contact and crosswalk/re-identification keys encrypted and access-separated.
- Generalize organization, geography, team size, date, role, and domain only as much as needed to reduce mosaic re-identification. Review combinations, not each field in isolation.
- Paraphrase by default. Use a verbatim quote only under separate quote consent and, when attributed, participant review.
- Replace proprietary strings with semantic descriptions such as “pending-payment status headline”; remove names, URLs, ticket numbers, keys, node IDs, exact amounts, screenshots, and distinctive incident details. Generalize or consistently shift dates while preserving event order, recency, version lineage, and freshness bands needed for analysis.
- Store raw recordings, transcripts, notes, artifact extracts, consent, and the contact key in separate access classes. Derived records must retain provenance without retaining identifying content.
- Call a released derivative **anonymized** only after its direct/linkage keys are removed and a mosaic-risk review finds no reasonably usable re-identification route. If that would destroy meaning or still leave a person/organization identifiable, withhold the case rather than invent a generic version.
- A fixture or judge item must be independently authored and synthetic. Never copy a participant's wording, screenshot, schema, policy, or proprietary workflow into an evaluation asset.
- Deletion propagates through raw and linkable derived records within the stated window. Record the point at which an aggregate or irreversibly de-identified artifact can no longer be withdrawn.

## Outputs and promotion rules

| Output | Contents | Promotion rule and boundary |
| --- | --- | --- |
| Restricted decision-reconstruction set | Pseudonymized linked decisions, evidence bases, artifact observations, separations, codes, disagreements, and limitations | Restricted research data, not anonymous/public canon, training data, organizational guidance, or an import-ready schema |
| Ontology field-pressure register | For every candidate entity/field/relation: supported cases, missingness, ambiguity, burden, counterexample, domain/locale scope, and proposed change | Recurrence supports a **[Proposal]**, not approval; one high-consequence negative case may justify a safety boundary even when rare |
| Synthetic fixture seed briefs | Abstracted state, conflict, unknown, failure, expected safe disposition, coverage denominator, and provenance route | Independently author and specialist-review before entry into the [shared fixture](shared-benchmark-fixture-specification.md); no proprietary content |
| Judge/rubric candidate cards | Construct definition, context packet, positive/negative anchors, counterexamples, `insufficient context` rule, evidence span, proposed rater qualifications, disagreement, and intended decision use | Inputs only to a separate qualified-rater rubric/benchmark validation; this study's coding agreement cannot establish judge reliability or validity, and a judge never supplies authority, approval, applicability, or user outcome |
| Coverage and reflexivity report | Sample/decision matrix, refusals, attrition, missing strata, field missingness, negative cases, researcher assumptions, protocol versions, and limitations | Supports only claims inside the achieved sample and evidence boundary |
| Candidate-model change set | Versioned additions, removals, aliases, required/optional changes, and unresolved alternatives against the [candidate model](../08-synthesis/candidate-system-model.md) | Remains `proposed` until separate review and approval; source counts never auto-promote a rule |

For later judge development, preserve hard constraints, contextual dimensions, semantic preservation, naturalness, accessibility, localization, and user outcome as separate evaluation planes. Original coder disagreement can seed a rubric and fixture, but a separate blinded qualified-rater study must establish rubric reliability, validity, and limits; adjudication never rewrites pre-adjudication evidence.

## Exact first five-session pilot

The pilot calibrates the instrument; it is not representative evidence and cannot establish saturation. Each session uses the same 70-minute script, two researchers, one focal `decision_eligible` case selected for artifact review, one required non-counting negative-case probe, and an optional linked decision. The pilot measures whether a second complete record is feasible; it does not assume 10 decisions.

| Order | Participant profile | Required focal decision and artifact | Non-counting negative-case probe | Instrument pressure tested |
| ---: | --- | --- | --- | --- |
| S001 | Individual-contributor product content designer in consumer commerce | Recent low/moderate reversible feature or flow decision; intake plus prototype/review artifact | A request whose right response was behavior/structure change or no content | Unit boundary, problem reframing, options, low-risk minimum core |
| S002 | Content designer in financial services or payments | Recent high-consequence payment, eligibility, privacy, or controlled-claim decision; redacted evidence plus scoped review/approval artifact | Approved-not-delivered or delivered-not-approved mismatch | Evidence/instrument/applicability/owner/approver/approval separation |
| S003 | Localization or in-market content specialist responsible for an Arabic/English bidirectional product | Recent locale decision changing concept, structure, term, variable, or route; source/locale artifact plus query or decision record | English/source-first rule that failed | Language/script/direction, locale authority, expression versus message |
| S004 | Accessibility specialist with direct product-content responsibility | Recent error, status, consequential action, or recovery decision spanning visible and nonvisual experience; specification plus test/QA artifact | Visually acceptable content that failed interaction, cognition, or assistive use | Accessibility plane, built verification versus user evaluation |
| S005 | Product engineer in a federated team who partnered directly with a content practitioner | Recent cross-system or cross-channel implementation decision; manifest plus ticket/review history or outcome artifact | Official workflow versus the actual side-channel or handoff route | Collaborator perspective, handoff loss, delivery/evaluation, unofficial work |

### Pilot execution and review

1. Before S001, freeze protocol, consent, schema, and codebook version `pilot-0.1`; preallocate IDs; rehearse the stop rule with synthetic material.
2. Admit a profile only when the participant confirms they are authorized to show a safe redacted artifact for the focal decision. Artifact retention remains optional; participant-controlled viewing is sufficient.
3. Use one moderator and one observer as the two pilot coders. Both witness the permitted artifact walkthrough; the observer timestamps events and basis changes but does not independently lead or discuss interpretation before coding is locked.
4. Within 24 hours, each researcher separately completes the session basis log. Within 48 hours, both independently unitize, extract, and code the focal decision. Review an optional linked case for eligibility; do not repair a negative-case probe or incomplete contrast by inference.
5. Between sessions, fix only safety, accessibility, or clear operability defects. Log every wording/order change. A substantive construct change creates a new instrument version and an explicit comparability note.
6. After S005, retain pre-adjudication records, classify and adjudicate disagreements, audit consent/redaction/deletion, calculate field missingness and descriptive agreement, and complete the five-session coverage review.
7. Count a pilot focal or genuine linked decision toward 50 only when the final instrument preserves its meaning, `threshold_eligible` status, artifact basis, consent, and comparability. Otherwise retain it as pilot evidence only.

The pilot passes when all five focal decisions are safely reconstructable; every universal-core field and applicable module has a value or defined missingness reason; the sessions stay within 60–75 minutes; no prohibited material is retained; the two coders can apply a stable decision boundary; all disagreements are retained and dispositioned; and the review reports optional linked-decision yield plus which prompts, fields, and codes to keep, revise, or remove. Failure on safety, consent, unitization, or record-family separation requires revision and another bounded pilot before the full study.

## Limitations and non-claims

- Recall and artifact availability favor documented, recent, and institutionally legible work; side-channel decisions may remain underrepresented.
- Artifact observation can corroborate that a representation existed, not that it was authoritative, approved, implemented, or effective.
- Paired accounts can expose disagreement but do not reveal private motives or make one role the truth source.
- The 50-decision and six-domain thresholds are model-validation starting points, not evidence of global representativeness.
- Phase 1–2 work cannot replace contextual observation, participatory research with affected users, specialist review, security/privacy validation, or outcome studies.
- No ontology field, fixture rule, or judge criterion becomes canonical merely because it appears frequently in this study.
