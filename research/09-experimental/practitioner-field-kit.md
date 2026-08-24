---
title: Practitioner decision-reconstruction field kit
status: proposed
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
execution_status: not-run
scope: Field-ready recruitment, consent, moderation, artifact, language-access, incident, follow-up, and record-handoff instruments for the first five practitioner pilot sessions
source_documents:
  - practitioner-decision-reconstruction-protocol.md
  - ../00-method/research-protocol.md
  - ../00-method/practitioner-research-plan.md
---

# Practitioner decision-reconstruction field kit

## Purpose, status, and authority boundary

**[Proposal]** This kit converts the [practitioner decision-reconstruction protocol](practitioner-decision-reconstruction-protocol.md) into instruments an authorized research team can prepare for the five-session `pilot-0.1`. The protocol remains authoritative when this kit is incomplete or inconsistent. The canonical claim and source vocabulary remains the one in the [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary).

This kit is **not yet approved or run**. It records no recruited or contacted people, consent decisions, sessions, artifacts, findings, or validated decisions. It authorizes no outreach, scheduling, compensation, recording, interpretation, translation, artifact access or retention, model processing, publication, or external action.

Every field marked `unset_blocking` requires an exact approved value before the affected activity. A researcher cannot turn `unset_blocking` into implied permission. A participant's permission cannot replace organizational study approval, processing authorization, provider agreement, or researcher access control; those records also cannot replace participant permission.

Use these terms exactly and independently:

- `source_type`: what the underlying material is. A participant's oral or written account is `practitioner account`; an artifact uses the canonical type supported by the artifact itself. `artifact observation` and `researcher inference` are not source types.
- `evidence_basis`: how a bounded field or assertion is supported: `participant_report`, `direct_artifact_observation`, or `researcher_inference`.
- `access_mode`: what was actually inspected: `live_participant_account`, `live_participant_controlled_artifact`, `retained_redacted_extract`, `consented_recording_or_transcript`, or `neutral_field_observation_log`.

Artifact absence creates no evidence-source record. Record `artifact_backed: false` and the applicable missingness reason. An analyst inference is a separate claim with a canonical `claim_label` and linked evidence sources; it cannot be written as if a participant or artifact supplied it.

## Field-use sequence and stop gates

| Order | Instrument or activity | May proceed only when | Stop or hold when |
| ---: | --- | --- | --- |
| 1 | Governance setup | Study, ethics/research, risk, incident, compensation, accessibility, confidentiality, withdrawal, and deletion routes have named owners and approved versions | Any owner, route, limit, or processing decision is `unset_blocking` |
| 2 | Recruitment preparation | Recruitment source, eligibility logic, privacy notice, compensation, contact-key separation, deletion date, and accessible response route are approved | Recruitment would depend on employer/product disclosure or optional permissions |
| 3 | Screening | `screening_consent: yes` is recorded before answers | Consent is `no`, `withdrawn`, unclear, or not recorded |
| 4 | Selection and scheduling | Eligibility is determined from minimum screening data; operations records remain separate | A safe recent decision or authorized artifact class cannot be identified |
| 5 | Session preparation | Information sheet, granular consent, processing notices, language access, storage, access, and incident routes are exact and participant-readable | A named provider/path or participant-language material is missing |
| 6 | Session start | Participation and note-taking/coded-use are both `yes`; optional permissions are individually recorded; boundaries are reconfirmed | Either required permission is not `yes` or the participant cannot understand the boundary |
| 7 | Artifact walkthrough | Participant-controlled viewing is `yes`; authorization and redaction checks pass | Prohibited, unrelated, inadequately redacted, or unauthorized material appears |
| 8 | Record handoff | Consent/access class, evidence axes, provenance, redaction, and allowed destinations are complete | A record's provenance, consent, processor, retention, or deletion route is unresolved |
| 9 | Analysis or reuse | The exact record and purpose are within current permissions and controls | A new purpose, processor, destination, quotation, attribution, fixture, or model path lacks its own permission/control |

## Configuration card: complete before any external action

Copy this card into the protected study-governance system. Do not place contact details, credentials, or re-identification keys in this repository.

| Configuration field | Required exact value before use | Current kit state |
| --- | --- | --- |
| `study_id` and `instrument_version` | Nonsemantic study ID; frozen version `pilot-0.1` or an approved successor | `unset_blocking` |
| Study owner | Named accountable role/person and escalation route | `unset_blocking` |
| Ethics/research route | Approval ID, scope, version, approver, effective/expiry dates | `unset_blocking` |
| Recruitment owner and sources | Authorized operator, exact channels, audience, and outreach window | `unset_blocking` |
| Compensation | Amount/range, currency, timing, payment processor, tax/privacy notice; independent of optional permissions and case counting | `unset_blocking` |
| Screening storage | Exact encrypted store, access roles, cohort-selection date, deletion date, backup behavior | `unset_blocking` |
| Participant rights contact | Reachable contact, response target, accessible alternatives | `unset_blocking` |
| Confidentiality/escalation limits | Exact limits, mandatory escalation conditions, owner, participant-facing wording | `unset_blocking` |
| Risk and incident route | Incident owner, secure reporting path, quarantine location, breach/escalation and disposition procedure | `unset_blocking` |
| Session platform | Accessible method, approved settings, host roles, region, retention, recording default off | `unset_blocking` |
| Research storage | Stores and access roles by contact, consent/control, raw, analytic, translated, and released record class | `unset_blocking` |
| Retention/deletion | Exact periods, deletion windows, backup behavior, propagation method, irreversible-de-identification boundary | `unset_blocking` |
| Recording path | Audio and video/screen decisions, provider, region/transfer, retention, deletion, access, training/improvement terms | `unset_blocking` |
| Transcription path | Provider/subprocessors, exact data, purpose, region/transfer, correction, retention/deletion, training/improvement terms | `unset_blocking` |
| Model/AI path | Provider/subprocessors, exact data, purpose, region/transfer, retention/deletion, training/improvement terms | `unset_blocking`; default `no` |
| Language-access path | Materials, provider/contract, competency, access, region/transfer, retention/deletion, human correction, incident route | `unset_blocking` when applicable |
| Research team | Moderator, observer, data manager, two coders, and conditional specialist roles plus training/access records | `unset_blocking` |
| Accessible participation | Request route, formats, interpretation, scheduling, communication, and support arrangements | `unset_blocking` |

## Recruitment brief

### Research purpose

Learn how practitioners made one recent, material content decision: what triggered it; what they needed to understand; which options they considered; what evidence and constraints applied; who owned, approved, changed, delivered, or evaluated it; what artifacts carried it; and what was lost or preserved across systems. The study is about decision reconstruction, not writing quality, practitioner performance, employer maturity, or collecting proprietary strings.

### Pilot sample

Recruit exactly one eligible participant for each pilot profile after governance approval. Do not invent a participant or substitute a nearby profile merely to fill a cell.

| Session | Target profile | Safe focal case and artifact class | Coverage purpose |
| --- | --- | --- | --- |
| `S001` | Individual-contributor product content designer in consumer commerce | Recent low/moderate reversible feature or flow decision; intake plus prototype/review artifact | Decision boundary, problem reframing, options, low-risk core |
| `S002` | Content designer in financial services or payments | Recent high-consequence payment, eligibility, privacy, or controlled-claim decision; redacted evidence plus scoped review/approval artifact | Evidence, applicability, ownership, approval, and delivery separation |
| `S003` | Localization or in-market specialist responsible for an Arabic/English bidirectional product | Locale decision changing concept, structure, term, variable, or route; source/locale artifact plus query/decision record | Language, script, direction, locale authority, expression/message separation |
| `S004` | Accessibility specialist with direct product-content responsibility | Error, status, consequential action, or recovery decision spanning visible and nonvisual experience; specification plus test/QA artifact | Accessibility, built verification, and user evaluation separation |
| `S005` | Product engineer in a federated team who partnered directly with a content practitioner | Cross-system or cross-channel implementation decision; manifest plus ticket/review history or outcome artifact | Collaborator account, handoff loss, delivery/evaluation, unofficial route |

### Inclusion requirements

An operations reviewer may mark a person `screen_eligible` only when all are true:

- the person voluntarily consented to screening;
- they directly contributed to, observed, owned, approved, implemented, or evaluated one bounded decision;
- the decision was completed, paused, rejected, or materially revised within six months, or within 12 months only for a documented coverage gap;
- the case has a specific question, at least one considered option, a recoverable project/task and time context, and a material consequence or criterion;
- the person can discuss the case without identifying an employer, client, product, person, or proprietary literal;
- they confirm authorization to show a safe redacted artifact class for the focal case through participant-controlled viewing; retention remains optional;
- the research team can provide understandable consent and an accessible participation route in the person's requested language; and
- the case does not require the researcher to access production systems, credentials, unrestricted repositories, customer accounts, or unapproved processors.

### Exclusion or alternate-case conditions

Do not select a case that is wholly hypothetical, only a general philosophy, only a polished final string, outside the person's direct involvement, inseparable from a known duplicate, or unsafe to abstract. Ask for another case or end selection when it depends on customer/employee data, secrets, legal privilege, a security vulnerability, safeguarding or controlled clinical material, an active employee case, unpublished strategy, or anything the person is not authorized to show.

Exclusion from this study is not a judgment about expertise. Do not use job title, employer prestige, writing style, artifact polish, willingness to record, willingness to retain an extract, willingness to allow model processing, or likely threshold eligibility as a selection-quality proxy. Compensation cannot depend on any optional permission or whether the case is ultimately countable.

### Recruitment message constraints

An approved invitation must state the 70-minute duration, broad purpose, voluntary nature, compensation, decision/artifact safety boundary, accessible participation route, screening privacy link, and contact route. It must not promise anonymity, imply employer endorsement, request employer/product names, ask candidates to send artifacts, state that recording is required, or describe optional permissions as incentives.

Suggested neutral description for an authorized recruiter to adapt after approval:

> We are preparing a research study about how people make and carry one recent product-content decision across evidence, collaboration, and delivery. Participation would include a short eligibility screen and, if selected, one 70-minute conversation with an optional participant-controlled walkthrough of an artifact you are authorized to show in redacted form. We do not request proprietary copy, customer data, credentials, or production access. Recording, transcription, artifact retention, model processing, quotation, attribution, and future contact are separate optional choices. Compensation is for your time and expertise regardless of those choices. Accessible formats, language support, and other participation arrangements are available through [approved route]. Please read [approved screening privacy notice] before choosing whether to continue.

Do not send this text until all configuration-card recruitment and screening fields are resolved and the authorized study owner approves the exact version and channel.

## Neutral screener

### Screening privacy notice

Display this notice before any screening question. Replace bracketed operational fields with approved exact values; if any remains unresolved, do not open the screen.

> This optional screen helps us select a varied research sample. It asks about your work function, broad context, and one recent decision. Please do not name an employer, client, product, person, or proprietary content. We will not record you, ask you to transfer an artifact, or use model/AI processing during screening. Contact, accessibility, scheduling, and compensation details are stored separately from research answers and are available only to [approved access roles]. We will delete screened-out answers and their contact link by [exact date, no later than 30 calendar days after cohort selection], unless you withdraw sooner or the approved policy described here requires a different period: [exact policy or `none`]. Only nonidentifying recruitment counts may remain. You may stop or ask for deletion through [approved contact route]. Selecting “I agree” means only that we may collect and use your answers for sample selection; it is not consent to a session, recording, artifact viewing, transcription, translation, model processing, quotation, or future contact.

Record `screening_notice_version`, delivery timestamp, `screening_consent: yes/no`, decision timestamp, and withdrawal status before answers. If the value is not `yes`, collect nothing else.

### Screener questions

Use the participant-facing wording. Store only the normalized values declared in the frozen screener/codebook; keep optional free text to one safely abstract sentence.

1. Which function or functions did you personally perform in the decision? Select all that apply: content design/UX writing; content strategy, information architecture, or content operations; research; product or service design; engineering; localization or in-market content; accessibility or inclusive design; domain or policy expertise; approval; delivery or release; another function; prefer not to disclose.
2. What was your direct relationship to the decision? Select all that apply: individual contributor; lead or system owner; close collaborator; accountable owner; authorized approver; implementer; evaluator; another role; prefer not to disclose.
3. Without naming an organization, which broad operating model best describes the work: solo/small team; centralized; embedded; federated/distributed; platform; agency/consultancy; rotating specialist; another model; not known; prefer not to disclose? Which broad size band and level of practice formalization/adoption apply?
4. Without naming a product, which broad domain, markets, languages, scripts, directions, surfaces/channels, and user groups were in scope?
5. If the decision had been wrong, which description best fits the plausible consequence: limited and readily reversible inconvenience; meaningful but recoverable task or trust harm; material money, access, rights, health, safety, privacy, eligibility, broad exposure, or difficult-to-reverse harm; not known; prefer not to disclose? How reversible was it and how broad could exposure have been?
6. When did the decision occur: within six months; seven to 12 months; more than 12 months; not known; prefer not to disclose? Was the context greenfield/change, takeover/retrofit, migration, locale launch, accessibility remediation, incident/late-stage, platform, maintenance, another context, or not known?
7. In one safely abstract sentence, what specific question or choice could you reconstruct? Do not include names, exact product wording, ticket numbers, URLs, amounts, or other proprietary details.
8. What was your direct part in that specific choice?
9. Which artifact class could you safely walk through in redacted form while controlling your own screen: brief; research note; journey/state model; content model; prototype; decision log; review comment; source mapping; localization record; test/QA result; another class; no safe artifact?
10. Would the example require showing or discussing customer or employee data, secrets, legal privilege, a security vulnerability, safeguarding, controlled clinical material, an active employee case, unpublished strategy, or material you are not authorized to share? Select `yes`, `no`, `not known`, or `prefer not to disclose`. If `yes` or `not known`, do not describe it; choose another case or stop.
11. For each function relevant to this decision, how long had you performed that function: `less_than_1_year`, `1_to_3_years`, `4_to_7_years`, `8_to_12_years`, `13_or_more_years`, or the participant-facing “Prefer not to disclose,” stored as `not_disclosed`? Store one `function` plus `experience_band` pair; never collapse multiple functions into one tenure.

After the research screen, an authorized operations worker asks separately for preferred spoken and written participation languages, desired interpretation or translated materials, and any access, communication, scheduling, or other participation arrangement. Do not request a diagnosis. Store contact, exact employer/client/product, accommodation, scheduling, and compensation details only in the separate operations system.

### Selection disposition

| Disposition | Use when | Record |
| --- | --- | --- |
| `screen_eligible` | Every inclusion requirement passes and one pilot profile/coverage need is supported | Safe rationale using only screen fields; potential session cell; reviewer and timestamp |
| `alternate_case_requested` | Person may fit, but the proposed case is unsafe, too old without a gap, hypothetical, or lacks a safe authorized artifact | Condition only; no prohibited detail; contact only through the disclosed screening-logistics route and retention window. Later research contact still requires `future_contact: yes` |
| `coverage_hold` | Eligible, but another profile is needed for the current pilot | Coverage cell; hold expiry; deletion date; no quality ranking |
| `not_selected` | Eligibility does not pass or current pilot has no matching cell | Minimum non-stigmatizing reason; deletion date |
| `withdrawn` | Person withdraws screening data | Withdrawal request ID; verified scope; deletion status; no reason required |

## Consent matrix with independent choices

### Consent-record rules

Provide the participant an accessible, plain-language information sheet and consent form early enough to review. Name every controller, provider and subprocessor; purpose and data category; storage/processing region; transfer safeguard; authorized access role; retention, backup and deletion behavior; training/service-improvement use; withdrawal limit; and contact route for each applicable path.

Record `consent_document_id`, information-sheet version, consent-form version, processing-notice version, delivery timestamp, participant receipt, decision timestamp, reconfirmation timestamp, approved processor/path version, restrictions, and every change or withdrawal. The only permission wire values are `yes`, `no`, or `withdrawn`. If a path was not explained and approved, record `no`.

| Permission field | Participant-facing choice | Required to participate? | Operational effect of `no` |
| --- | --- | ---: | --- |
| `participation` | Take part in the 70-minute research conversation | Yes | End or do not start the session |
| `researcher_note_taking_and_coded_use` | Researchers take protected notes and code a pseudonymized decision record for this study | Yes | Create no research record; end or do not start |
| `audio_recording` | Record interview audio through the named path | No | Audio off; rely only on permitted live notes |
| `video_or_screen_recording` | Record camera video and/or the named meeting screen through the exact explained path | No | Video/screen recording off. Even when `yes`, this permission alone never permits artifact capture |
| `named_transcription_path` | Send permitted recording to the exact named transcription path and human correction route | No | No transcript; recording permission does not imply transcription |
| `participant_controlled_artifact_viewing` | Show a participant-selected redacted artifact while the participant controls sharing | No | No artifact walkthrough; set `artifact_backed: false`. A separately linked later end-to-end observation may support `threshold_eligible`, but never changes `artifact_backed` |
| `retain_exact_redacted_artifact_extract` | Retain one exact participant-approved redacted extract in the named restricted store | No | Retain no extract, screenshot, file, or literal; structural notes may be taken only under note consent |
| `interpretation_path` | Use the exact named live interpretation provider and access path | No | Do not introduce an interpreter; do not require participation in another language |
| `translation_path` | Translate exact permitted study material or records through the named path and human correction | No | Keep records within their permitted original-language route; do not translate by inference |
| `named_model_ai_path` | Process exact declared data through the named model/AI provider and configuration | No | No model/AI processing; other permissions do not imply it |
| `deidentified_paraphrase_in_outputs` | Use a de-identified paraphrase in research outputs | No | Keep the account within restricted analysis; do not paraphrase into outputs |
| `verbatim_quotation` | Use an exact quotation under the declared review route | No | Paraphrase only if separately permitted; no quote |
| `attribution_of_quote_or_claim` | Attach the approved identity description to a separately permitted quote or claim | No | No attribution; quote consent alone does not imply attribution |
| `synthetic_fixture_or_judge_item_transformation` | Use an abstracted case only as input to an independently authored synthetic fixture or judge-item candidate | No | Do not use the case for fixture/judge-item derivation |
| `future_contact` | Contact the participant about follow-up or later research | No | No follow-up beyond rights, compensation, safety, or already-requested administrative completion |

Recording, transcription, interpretation, translation, artifact viewing, extract retention, model/AI processing, paraphrase, quotation, attribution, synthetic transformation, and future contact remain independent. Compensation is unchanged by any optional answer. Consent never overrides employer/client confidentiality or professional duties.

### Opening reconfirmation script: minutes 0–5

Before contextual questions or sharing, read:

> We are studying how one recent content decision was made. We do not request or retain your organization's literal copy by default. Participation is voluntary. You may skip a question, pause, stop sharing, withdraw, or end the session without giving a reason. Please do not show customer or employee data, secrets, legally privileged material, security vulnerabilities, unpublished strategy, controlled clinical or safeguarding records, or anything you are not authorized to share. Your permission does not override employer, client, or professional confidentiality. We will keep separate what you report, what an artifact directly shows, and what researchers infer. I have consent document [exact ID/version] with the following current choices and restrictions: [read every permission and restriction]. What questions or changes do you have? Do you reconfirm participation and protected researcher note-taking under these boundaries?

Record changes before enabling any optional path. State recording status aloud. A late `no` or `withdrawn` stops that path immediately without ending other permitted activity unless participation or notes changed.

## Pre-session participant privacy and preparation notice

Send only after the approved information and consent packet and before the session. Replace every bracketed field with an approved exact value.

> **What this session is for**  
> We want to understand how one recent, specific product-content decision moved from a request or problem through evidence, options, collaboration, and delivery. We are not evaluating you, your employer, or the quality of a final sentence.
>
> **What we ask you to prepare**  
> Choose one decision from the last six months that you personally helped make, observe, own, approve, implement, or evaluate. If the research team has confirmed that your case fills a specific coverage gap, it may be up to 12 months old. It should involve a real choice, including a decision to change behavior or structure, do nothing, defer, reject, or escalate. If you are authorized, prepare one redacted artifact to show while you control your own screen. You do not need to send the artifact to us.
>
> **Do not bring or show**  
> Do not show customer or employee data, passwords or credentials, private keys, secrets, privileged legal material, security vulnerabilities, safeguarding or controlled clinical records, unpublished strategy, or anything you are not authorized to share. Hide employer, client, product and person names; exact product copy; comments; URLs; ticket or node IDs; exact amounts; browser tabs; notifications; and unrelated material. If safe redaction is not possible, we can use a blank timeline or choose another case.
>
> **Your choices**  
> Participation and protected note-taking/coded research use are required for a research session. Audio recording, video/screen recording, transcription, participant-controlled artifact viewing, retention of a redacted extract, interpretation, translation, model/AI processing, paraphrase, quotation, attribution, transformation into a synthetic fixture candidate, and future contact are separate choices. Saying no to any optional choice does not affect compensation. You may change a choice during the session.
>
> **Use, access, and retention**  
> Your exact approved processing paths, who can access each record, storage/processing regions, retention and deletion dates, backup behavior, and any limits to withdrawal are described in [information-sheet and processing-notice IDs/versions]. Contact and compensation details are stored separately from research records. Working research data is pseudonymized, not promised to be anonymous. We use de-identified paraphrases by default when separately permitted.
>
> **Stopping, withdrawal, and deletion**  
> You may skip a question, pause, stop sharing, end the session, or withdraw without giving a reason. To request correction, withdrawal, or deletion, use [approved contact route]. We will confirm the records and time window covered. [Exact deletion service level and exact boundary after irreversible de-identification or aggregate publication.]
>
> **Language and access**  
> Your requested spoken/written language and participation arrangements are [confirmed values]. The approved interpretation/translation route, if any, is [exact route or `none`]. Please contact [approved route] if this is not workable; no diagnosis is required.
>
> **Session details**  
> Date/time/time zone: [exact values]. Accessible meeting route: [exact route]. Duration: 70 minutes. Compensation: [exact terms]. Research contact: [exact route]. Rights/privacy contact: [exact route].

## Artifact eligibility and redaction checklist

### Before the session

An operations reviewer and participant confirm only the artifact **class**, not its contents. Mark each item `pass`, `fail`, or `not_known`. Any `fail` or `not_known` in authorization, prohibited-data, redaction, or technical-boundary items blocks the walkthrough until resolved or replaced.

| Check | Pass condition |
| --- | --- |
| Participant authority | Participant affirms they are authorized to show this redacted artifact in this research setting |
| Decision relevance | Artifact was contemporaneous with the focal decision and may support its question, option, evidence, rationale, disposition, owner, scoped approval, or change mapping—not only a final literal |
| Safe class | It is a brief, research note, journey/state model, content model, prototype, decision log, review comment, source mapping, localization record, test/QA result, or another approved class |
| No prohibited material | It does not require customer/employee data, credentials, secrets, privilege, vulnerability details, safeguarding/controlled clinical material, active employee cases, or unpublished strategy |
| Participant-controlled route | Participant can show a redacted copy or their screen without granting workspace, repository, account, credential, or production access |
| Redaction feasibility | Names, literals, URLs, identifiers, comments, exact amounts, dates where distinctive, and unrelated material can be hidden without destroying the decision structure |
| Consent | Current `participant_controlled_artifact_viewing: yes`; any extract retention has its own current choice |
| Capture boundary | Automated capture, screenshots, and artifact screen/video recording are off by default; the exact permitted meeting/recording state is visible |

### Participant redaction check immediately before sharing

Ask the participant to check, without showing the screen yet:

- employer, client, product, team, and person names are hidden;
- customer and employee data is absent;
- exact copy is replaced or covered unless the exact redacted extract has been separately approved;
- comments, avatars, email addresses, handles, ticket/node IDs, URLs, file paths, keys, credentials, and QR/bar codes are hidden;
- exact amounts, dates, markets, incident details, or combinations that could identify the organization are generalized when not necessary;
- browser tabs, bookmarks, notifications, sidebars, file history, presenter notes, hidden layers, and unrelated frames/pages are closed or hidden;
- secret, privileged, vulnerable, safeguarding, clinical, unpublished-strategy, and active employee material is absent; and
- only the approved artifact and the minimum needed versions are ready to show.

Moderator asks: “Are you authorized to show this redacted view here, and are you comfortable starting participant-controlled sharing now?” Record the answer and timestamp. `yes` permits viewing only within the current consent/control boundary; it does not permit capture, retention, external access, or reuse.

### During the walkthrough

- The participant navigates. The researcher never requests control, credentials, a repository, production access, unrestricted design/CMS/TMS access, or a file transfer.
- Record abstract structure, artifact class, safe date/version band, observed fields, contradiction/missingness, provenance, consent, and limitations. Do not type proprietary literals into notes.
- State basis changes: “You reported…” for `participant_report`; “I can directly see…” for `direct_artifact_observation`; “Our later interpretation…” only in a separate `researcher_inference` claim.
- A final expression or screenshot alone supports delivery observation; it does not make the reconstructed decision `artifact_backed: true`.
- If unsafe content appears, say “Please stop sharing now,” stop all recording immediately, avoid repeating the content, and follow the incident route below.

### Exact redacted extract retention

Retention is allowed only when all are true: `retain_exact_redacted_artifact_extract: yes`; exact extract and purpose were described; participant reconfirms authority; approved storage/access/region/retention/deletion records are current; the extract passes a second redaction and mosaic-risk review; and its source, version/hash, scope, limitations, and withdrawal route are logged. Otherwise retain no file, screenshot, literal, or copied coordinates.

## Seventy-minute moderator guide

### Moderator principles

- Begin in the participant's preferred language and address the participant directly, including when an interpreter is present.
- Reconstruct one deep focal decision. A linked decision is optional; a negative-case prompt is not a second decision.
- First collect an uninterrupted critical-incident narrative. Introduce canonical model terms only as later completeness probes, never as answers to endorse.
- Ask about the situational load and evidence that affected tone; do not diagnose or infer emotion.
- Preserve “unknown,” “not observed,” “not disclosed,” absence, disagreement, deferral, and deliberate non-choice. Do not repair a gap from plausibility.
- Protect consent, safety, playback, and closing time; never rush them to increase decision yield.

| Minutes | Segment | Moderator script and action | Observer capture |
| ---: | --- | --- | --- |
| 0–5 | Consent and boundaries | Read the opening reconfirmation; answer questions; confirm language/access arrangements; ask participant to close unrelated material; state recording/capture status | Exact consent/path versions, choices, restrictions, timestamps, recording state, stop route |
| 5–10 | Role and context | “What was your function in this work? What could you decide, recommend, approve, implement, or evaluate? About how long had you performed each function relevant to this decision?” | Function/experience pairs, decision role, organization model, broad domain, locale/channel |
| 10–15 | Select focal case | “Choose the most recent specific decision you can safely reconstruct. What was the decision question—not the whole project—and when did it happen?” Verify safe artifact class without viewing | Case/project/task IDs, provisional decision/lineage IDs, recency, direct role, artifact class |
| 15–20 | Uninterrupted account | “Starting when you first became aware of it, tell me what happened through the decision and what followed. I will listen first and clarify afterward.” Interrupt only for consent or safety | Participant sequence and vocabulary; named actor classes, artifacts, surprises, outcome; basis `participant_report` |
| 20–35 | Clarify timeline | Ask only unanswered decision-timeline prompts below. Anchor to events, artifacts, and roles rather than general philosophy | Trigger, problem, entry/state/behavior/consequence/recovery, evidence, options, criteria, actors, sequence, disposition, uncertainty |
| 35–50 | Artifact walkthrough | Run eligibility/redaction checks; participant controls sharing; artifact capture off. Ask artifact prompts below | Directly observed fields, safe dates/versions, contradiction, missingness, prior/next handoff, basis transitions |
| 50–61 | Record-family probes | Clarify source, governing applicability, ownership, authorization, typed approvals, delivery state, release, and evaluation separately | Family-specific candidate records; actual/documented route; approval/delivery mismatches; unknowns |
| 61–66 | Negative case and agent boundary | Ask one matched negative-case prompt; log but do not force a second decision. Ask the agent-boundary prompt | Counterexample; optional linked question/options; safe delegation, escalation, trust/control need |
| 66–70 | Playback and close | Give a safe abstract playback: “What have I misunderstood, missed, or misnamed?” Reconfirm use, follow-up, withdrawal and deletion routes | Corrections, unresolved points, permission changes, follow-up scope, session disposition |

### Decision-timeline prompts: use only when unanswered

1. What request, event, defect, evidence, or deadline triggered the work? What did the request assume?
2. What user or service problem did you believe needed solving? What might have happened if you had only rewritten the words?
3. Which actors, entry points, states, behaviors, consequences, recovery routes, surfaces, channels, locales, and nonvisual experiences mattered?
4. Which product behavior, domain fact, operation, or policy did you need to understand first? What remained unknown?
5. What did you consult or rely on? What did each item contribute? Where sources differed, how did people describe, resolve, or preserve the difference?
6. Did any law, policy, standard, contract, terminology system, component rule, or other constraint enter the work? What did the team call it? Who, if anyone, determined that it applied here?
7. Who contributed information, carried responsibility, accepted or rejected the semantic decision, changed a source, released a build, or evaluated it? What words did the team use for those roles?
8. Which alternatives were considered, including changing behavior, changing structure, doing nothing, escalating, or leaving the issue unresolved? What criteria ruled them in or out?
9. What was decided, rejected, deferred, or superseded? For which product, state, audience, locale, jurisdiction, version, and period?
10. What changed outside the string itself? What dissent or uncertainty remained?

### Artifact prompts

1. What artifact class is this, who created or maintained it, and which decision was it intended to carry?
2. What date/version and apparent state did it have then? Is that directly recorded or remembered?
3. Which parts support the question, options, evidence, rationale, disposition, owner, scoped approval, or change mapping?
4. What is missing? Use defined missingness rather than filling a gap.
5. What artifact or system came before and after? What stable ID, key, link, or human handoff connected them?
6. What changed between versions, who changed it, and was the rationale preserved?
7. Where does this artifact conflict with your account, another artifact, implementation, locale, or live experience?
8. What field could be removed without losing reconstruction? What missing field would have prevented rework or harm?

### Record-family probes

1. Which sources supplied facts or context? What was each source's scope, date, limitation, and role?
2. Which instrument or rule may have constrained the choice? Separately, who determined whether it applied to this exact scope?
3. Who carried which responsibility? Who, if anyone, had authorization to approve the semantic decision, approve a source mutation, or approve release risk? What exact version and scope did each approval cover, with which conditions or expiry?
4. What permission or capability allowed a person or tool to connect, read, change, or publish in a system? Keep this separate from content approval.
5. Where did the decision occur: design, code, CMS, TMS, notification system, support material, or another source? Was it `unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, or `removed`, and what evidence supports that state?
6. What was evaluated before implementation, verified in the build, or measured after release? Which exact object/version, method, population, limitation, and outcome were attached?
7. What later changed, challenged, deprecated, superseded, or retired the decision? Who owns the next review trigger?

### Negative-case prompts: select one matched to a coverage gap

- Tell me about a request where writing was not the right answer and the behavior, structure, workflow, or request had to change—or nothing should be added.
- Tell me about a case marked approved that was not delivered, or something delivered without the semantic approval people assumed it had.
- Tell me about a source-language or English-first rule that failed for a locale, script, direction, concept, variable, or route.
- Tell me about content that looked acceptable visually but failed interaction, cognition, assistive use, or recovery.
- Tell me where the documented workflow differed from the actual side-channel, tool, handoff, or release route.

Record a negative case as a probe unless it independently satisfies decision eligibility and evidence rules after review. Do not inflate the decision count.

### Agent-boundary prompt

Ask the branch matching the participant's experience:

- **Read-only agent:** “What could an agent safely discover, map, or flag without making a change? What context would it need, and when must it abstain or escalate?”
- **Proposal agent:** “What could an agent draft or recommend while keeping the human decision visible? Which evidence, alternatives, uncertainty, and approval scope would you need to inspect?”
- **Mutation-capable agent:** “What exact connection, data, capability, semantic approval, mutation approval, release approval, readback, rollback, and audit evidence would you require before trusting it to change anything?”

Do not treat the participant's preference as authorization or a validated system requirement. It is a `practitioner account` pending analysis.

### Closing playback

Give a brief paraphrase that excludes proprietary wording and separates bases:

> I heard you report that [safe abstract sequence]. In the artifact, we directly observed [safe structural observation]. The parts still unknown or disputed are [items]. I have not treated the artifact as proof of approval, delivery, or outcome unless we separately observed evidence for those. What have I misunderstood, missed, or named in a way that does not fit your work?

Then state what current permissions allow next, how compensation works, whether any consented follow-up is requested, and the exact withdrawal/deletion route. Do not seek new optional permissions during closing to rescue a data gap.

## Multilingual and interpretation branch

Activate this branch when a participant requests interpretation, any participant material is translated, an original-language record is rendered for analysis, or a coder cannot directly evaluate the source language.

### Before the session

1. Record preferred spoken and written language, locale if relevant, script, direction, and participant-requested interpretation/translation or accessible format. Language preference is not processing consent.
2. Provide understandable information, consent choices, artifact warnings, withdrawal route, and scheduling details in the approved language/form.
3. Record separate `interpretation_path` and `translation_path` consent decisions plus current `data_processing_record_id` values for each provider/path.
4. Record provider/contract ID, interpreter/translator ID, declared language/locale competency, confidentiality, approved people/subprocessors, data classes, purpose, access method, region/transfer, retention/deletion, training/improvement terms, and incident route.
5. Give the provider minimum necessary material. Live interpretation does not grant artifact, extract, recording, transcript, or model access.
6. Record moderator, observer, coder, interpreter, translator, and specialist language/locale/script/domain competencies and authorized scope. If no approved competent route exists, pause rather than require another language.

### Interpreted opening

Moderator addresses the participant, not the interpreter:

> We will speak to each other directly. [Interpreter role/ID] will interpret as fully and neutrally as possible and will identify any uncertainty rather than summarize or answer for you. You may pause, correct a term, ask for repetition, or stop interpretation at any point. This interpretation path has the access and retention limits described in [exact notice/version]. It does not give the interpreter access to an artifact unless you separately permit that exact access. Do you reconfirm your current interpretation choice and restrictions?

Interpreter renders in first person, preserves uncertainty, negation, modality, authority terms, hesitation relevant to meaning, and speaker turns; flags an untranslatable or ambiguous term without choosing a meaning. Moderator slows pace, asks one question at a time, avoids idioms, and leaves interpretation time without shortening consent, artifact safety, playback, or closing.

### Artifact walkthrough with interpretation

- Reconfirm whether the interpreter may view the exact artifact. Interpretation permission alone is insufficient.
- Use a participant-controlled redacted view appropriate to script direction and assistive needs; do not normalize bidirectional structure into left-to-right notes.
- Capture the participant's original decision-critical terms with permitted safe abstractions, then any candidate rendering and uncertainty. Do not make an English term canonical merely because the interpreter used it.
- Check concepts, alternatives, negation, modality, authority, risk, disposition, variables, order, and route in the participant's preferred language during playback.

### Original and translated record lineage

1. Preserve each permitted original-language account, note, transcript, or artifact observation as its own immutable evidence-source version with language, locale when known, script, direction, creator/speaker role, capture method, consent/access class, time, and hash when a legally retained snapshot exists.
2. A translated rendering receives a `translation_record_id`; exact `source_evidence_source_id` plus version/hash; source/target language, locale, script, direction; provider/person IDs; human/machine method and service version; prompt/configuration when applicable; transformation and correction steps; uncertainty; access/retention/deletion; and supersession lineage.
3. If admitted for coding, the rendering receives a distinct `rendering_evidence_source_id` and typed `DERIVED_TRANSLATION_OF(rendering_evidence_source_id, source_evidence_source_id)` link. It never replaces the original.
4. A qualified human reviews every machine transcript/translation before semantic coding, quotation, or decision-record use. Preserve uncorrected output, corrected version, diff, reviewer, timestamp, reasons for meaning-changing corrections, and unresolved alternatives.
5. A translated quotation needs separate quotation permission and, for attribution, participant review of both source-language excerpt and proposed rendering. Label the translator; do not call the rendering verbatim.

Coders may judge source-language semantics or locale acceptability only inside declared competency. Otherwise both coders use the same approved human-corrected rendering; exclude source-language nuance, translation quality, and locale acceptability from agreement and route them to a qualified bilingual/in-market specialist. If equal evidence or a competent provider is unavailable, mark fields `not_observed` or `unknown`, exclude them from comparative claims, and report the language-access limitation.

## Session run sheet

### Protected header

| Field | Required value |
| --- | --- |
| Study/session | `study_id`; `session_id`; instrument, consent, processing-notice, schema, and codebook versions |
| Participant/case | `participant_id`; `case_id`; protected project/task crosswalk IDs; no name/contact here |
| People | Moderator; observer; interpreter if applicable; role/access/competency records |
| Timing | Scheduled and actual start/end with time zone |
| Language/access | Spoken/written language; locale/script/direction; approved interpretation/translation; access arrangements |
| Permissions | Current consent record ID and every permission/restriction; do not copy contact details |
| Processing | Current provider/path IDs; recording/capture states; approved stores, access classes, retention/deletion |
| Safety | Incident owner/route; participant stop phrase/method; quarantine route |

### T-minus 24 hours

- Confirm governance and configuration card are fully approved; no `unset_blocking` field applies.
- Preallocate nonsemantic participant/session/case/project/task/crosswalk/decision/artifact/evidence/evaluation and typed-record IDs. Keep the contact link in the separate encrypted operations system.
- Confirm participant received the exact information, consent, processing, privacy/preparation, compensation, rights, meeting, and language/access materials.
- Confirm the proposed focal case/artifact class only; never request a file.
- Verify meeting security, accessible route, recording default off, artifact/screenshot/automated capture off, minimum host access, and quarantine path.
- Moderator and observer review consent restrictions but not a hypothesis about the participant. Both independently record reflexivity expectations before the session.

### T-minus 10 minutes

- Open only the protected run sheet, consent logger, neutral notes instrument, timer, and incident contact. Close unrelated windows and disable notifications.
- Verify participant-facing recording indicator and technical recording state are off.
- Confirm no model/AI note-taker, assistant, summarizer, browser extension, transcription bot, or meeting feature is active unless its exact named path is separately consented and controlled.
- Confirm interpreter identity/access when applicable; do not admit an unlisted observer or provider.
- Observer marks `session_state: ready_for_reconfirmation`; this does not mean consent is reconfirmed.

### Live state log

| Time/event | Allowed state transition | Required log |
| --- | --- | --- |
| Participant joins | `ready_for_reconfirmation` → `consent_review` | Identity matched through operations route without copying identity; attendees; language/access check |
| Required permissions both `yes` | `consent_review` → `interview_active` | Reconfirmation timestamp, current choices/restrictions, path states |
| Optional path enabled | `off` → `on` only after its current `yes` is read back | Exact path/version, enable time, operator; participant-visible confirmation |
| Artifact check passes | `interview_active` → `artifact_view_active` | Artifact ID/class, authorization, redaction, viewing consent, capture off, start time |
| Artifact sharing ends | `artifact_view_active` → `interview_active` | End time, what was observed abstractly, any incident/missingness |
| Participant pauses | Active state → `paused_by_participant` | Time and affected paths; no reason required |
| Permission changes | Affected path → `off` or session → `closing` | New consent value/time; stop confirmation; downstream quarantine/deletion need |
| Unsafe material or unclear consent | Any active state → `incident_hold` | Stop time, sensitivity category only, affected record IDs, incident owner notification |
| Normal close | `interview_active` → `playback` → `closed_pending_handoff` | Playback corrections, unresolved points, final permissions, follow-up scope, end time |

### Within 30 minutes after close

- Keep recording/transcription/model paths off; verify files appeared only in approved locations. Do not copy data to convenience tools.
- Observer and moderator separately identify each note's basis and access mode; do not discuss analytic codes yet.
- Register any incident, consent change, participant correction, follow-up request, quarantine, or deletion propagation need.
- Create the handoff manifest below. If any required field is unresolved, set package state `quarantined_pending_resolution`, restrict access, and notify the named owner.
- Send only the approved administrative follow-up variant appropriate to the session state.

### Within 24 and 48 hours

- Within 24 hours, moderator and observer independently complete the session basis log and reflexivity entry using only permitted evidence.
- Within 48 hours, the two pilot coders independently unitize, extract, and code the focal decision; both must have the same permitted evidence and lock coding before discussion.
- Do not repair a negative-case probe, missing field, inaccessible language nuance, or incomplete linked decision by inference.
- Retain pre-adjudication records. Record, classify, then adjudicate disagreements without overwriting original values.

## Participant follow-up

Follow-up is administrative by default. Research questions require `future_contact: yes` and a specifically approved purpose. Rights, safety, compensation, correction of factual misrepresentation, and participant-requested deletion do not depend on marketing-style future-contact permission; use only the promised rights/operations route.

### Completed-session note

> Thank you for taking part in the practitioner decision-reconstruction session on [date]. Your compensation is [exact status and timing] and does not depend on optional permissions, artifact access, or whether a case is included in analysis. Your current research permissions are recorded in consent document [ID/version] as: [plain-language list]. We retained [exact record classes] and did not retain [exact declined classes]. You may request correction, withdrawal, or deletion through [rights contact]. The applicable request window and any limit after irreversible de-identification or aggregate publication are [exact terms]. We will contact you with additional research questions only if `future contact` is currently yes; you may change that choice at any time.

### No research record created

Use when participation or note-taking/coded use was `no` or withdrawn before record creation:

> Thank you for your time. No research session record was created. Administrative records required to complete [compensation/scheduling purpose] will be handled under [exact notice, store, access, retention, and deletion terms]. You may contact [rights route] with a question or request.

### Incident or deletion acknowledgment

Do not include sensitive details in ordinary email or messaging:

> We received your [safety/withdrawal/deletion] request on [date/time] under request ID [nonsemantic ID]. The verified scope is [plain-language record classes and date range]. The records are now [quarantined/deletion in progress/deleted/partly outside withdrawal because of the previously disclosed boundary]. We expect the next status by [exact date]. Please use [secure rights route] rather than replying with sensitive details.

### Clarification request, only with `future_contact: yes`

> During analysis we found one factual point that remains unresolved: [safe abstract question]. Please do not send an artifact or proprietary wording. Replying is optional, compensation is unchanged, and you may decline or change future-contact permission through [rights route]. Any reply will be handled under [exact consent/processing notice and retention terms].

Do not seek a new artifact, quote, attribution, fixture permission, or model-processing permission through casual follow-up. Route a new purpose through a versioned information/consent process.

## Incident, withdrawal, and deletion handling

### Immediate incident procedure

Apply when prohibited material appears; consent becomes unclear; a participant is distressed; redaction fails; an unapproved person/tool/process accesses data; or the approved storage, network, region, transfer, or retention boundary is exceeded.

1. Say “Please stop sharing now.” Stop audio, video/screen, transcription, model/AI, interpretation/translation transfer, and automated capture as applicable.
2. Do not repeat the content into notes, chat, a ticket, or ordinary email. Record only non-content metadata: time, sensitivity category, affected record/path IDs, and immediate state.
3. Move or lock the possibly affected record into the approved quarantine route without creating extra copies. Restrict ordinary researcher access.
4. Notify the named incident owner through the secure route. The moderator does not decide alone whether to redact, delete, retain, report, or resume.
5. Confirm participant safety and choice. They may pause, switch cases, continue without the path, or end without penalty.
6. Incident owner records disposition, required notifications, affected permissions/controls, redaction/deletion method, confirmation evidence, residual risk, and whether resumption is allowed.
7. Resume only after the participant reconfirms a safe boundary and the incident owner authorizes it. Otherwise close and use the appropriate follow-up.

Never place the sensitive content itself in `incident_summary`. Link only to the quarantined object under restricted access when retention is legally and ethically allowed.

### Withdrawal request procedure

1. Accept through the disclosed rights route without requiring a reason. Create `withdrawal_request_id`; record receipt time, authenticated request route, requested scope, and desired contact method.
2. Verify identity using the minimum approved operations data. Do not copy identity into the research dataset.
3. Resolve scope against the contact/crosswalk key: screening, session, recordings, transcripts, notes, artifact extracts, translations, claims, linkable derived records, quotation/attribution, fixture/judge candidate, and future contact.
4. Immediately stop new processing and quarantine affected linkable records while scope is resolved. Set affected consent values to `withdrawn` with time/version; preserve the prior audit event rather than overwriting it.
5. Explain any previously disclosed limit: an aggregate or irreversibly de-identified derivative may no longer be linkable or withdrawable. Do not claim this boundary unless the earlier anonymization and mosaic-risk review actually supports it.
6. Issue and track deletion work for raw and linkable derived records across primary stores, processors, exports, caches, and backups under the approved schedule.
7. Send status and completion through the secure rights route. Retain only the minimum non-content audit proof required by the approved policy.

### Deletion execution record

| Field | Required content |
| --- | --- |
| Request | `deletion_request_id`, linked withdrawal/incident ID when applicable, received/verified times, authorized operator |
| Scope | Exact participant/session/record IDs, systems/processors, record versions, translations/derivatives, quotations/attributions, fixture/judge candidates |
| Holds and limits | Approved legal/ethics hold if any; exact disclosed irreversible boundary; owner and evidence |
| Actions | Per-system deletion/redaction/quarantine command or human action, actor, timestamp, result, verification evidence |
| Backups | Backup class, deletion/expiry behavior, access restriction until expiry, expected final date |
| Propagation | Crosswalk/contact key, raw, transcript, artifact, analytic, translation, output, and processor status |
| Completion | `complete`, `partial_with_disclosed_limit`, or `failed`; residual items, owner, next action/date, participant notification |

A tombstone may retain only a non-content request ID, affected classes, completion state/date, and required audit proof. It must not preserve deleted content, identity, a reversible link, or a new rationale about the participant.

## Exact data and record handoff

### Access-separated destinations

| Record class | Examples | Destination and access boundary |
| --- | --- | --- |
| Operations | Contact, scheduling, language/access request, compensation, identity verification | Separate encrypted operations store; authorized operations roles only; never copied into analytic records |
| Crosswalk/re-identification | Participant/contact link; project/task/case/decision duplicate crosswalk | Separate encrypted key store; designated data manager only; analysts receive nonsemantic IDs |
| Consent and control | Consent events, processing notices, data-processing records, provider access, retention/deletion, incident/withdrawal | Restricted governance store; named study/data/privacy roles; never flattened into evidence |
| Raw research | Permitted audio/video, original transcript, exact retained extract | Separate restricted raw store by consent/access class; no model or translation path unless separately allowed |
| Analytic working | Pseudonymized notes, neutral observation log, artifact log, evidence-source records, decision reconstructions, pre-adjudication coding | Restricted research store; access by declared role, evidence permission, language/domain competency, and analysis purpose |
| Translation derivatives | Interpreter notes, machine output, corrected translation, diffs, rendering evidence sources | Restricted language-access store or declared partition; original/derivative lineage and independent access/retention |
| Release candidates | De-identified paraphrase, attributed material, synthetic fixture seed brief, judge-item candidate | Separate review queue; only when exact optional permission and promotion rule pass; not public/canonical by default |

### Handoff package manifest

Create one append-only `handoff_package_id` for each session. The package points to records in their approved stores; it does not bundle or duplicate them.

| Manifest section | Required fields |
| --- | --- |
| Identity/version | `handoff_package_id`, `study_id`, `session_id`, `participant_id`, `case_id`, instrument/schema/codebook versions, created time, creator role |
| Control envelope | Current consent record/event IDs; information/processing notice versions; applicable data-processing, connection, memory, telemetry, access, retention, deletion, incident, language-access and capability records, or explicit `not_applicable` rationale |
| Record index | Record ID, family/class, store pointer, object version/hash when retained, language/locale/script/direction, access class, purpose, owner, allowed roles |
| Evidence dimensions | For each evidence source: canonical `source_type`; exact `evidence_basis`; exact `access_mode`; scope, method, time, limitations; observation/challenge/freshness/lineage/qualifier dimensions |
| Provenance | Source-to-derived links, artifact/decision/time/version relationship, transformation history, redaction review, translation lineage, typed record links |
| Consent application | Which exact permission allows which exact record/use; restrictions; effective/change/withdrawal timestamps; no implied permission |
| Lifecycle | Retention trigger/date, deletion date/window, backup behavior, review trigger, supersession, quarantine or deletion status |
| Quality/safety | Missingness, unresolved provenance, incident/withdrawal IDs, prohibited-content check, mosaic-risk review need, observer/moderator sign-off |
| Next allowed step | One exact permitted action such as `independent_basis_logging`, `independent_coding`, `restricted_analysis`, or `no_further_processing`; responsible role and deadline |

Set package status to one of:

- `ready_for_independent_basis_logging`: required controls, permissions, provenance, destinations, and safety checks pass;
- `ready_for_independent_coding`: basis logs are locked, both coders have the same permitted evidence, and competency/access scopes pass;
- `quarantined_pending_resolution`: any consent, incident, processor, provenance, redaction, language access, storage, or deletion issue is unresolved;
- `withdrawn_pending_deletion`: processing stopped and deletion propagation is active;
- `closed_no_research_record`: participation/note permission failed or no research record was created.

### Record-by-record transfer checks

For every pointer in the manifest, the sender and receiver independently confirm:

1. exact record ID, family, version/hash, and source/derived status;
2. participant/session/case/decision linkage through nonsemantic IDs only;
3. current consent and access class permit the receiver, purpose, evidence, language, and processing path;
4. `source_type`, `evidence_basis`, and `access_mode` are all present and none was inferred from another;
5. direct observation is limited to what was actually visible; participant report remains report; analyst inference is a separate claim;
6. artifact absence created no source; `artifact_backed` and missingness are accurate;
7. owner, approver authorization, semantic approval, mutation approval, release approval, capability grant, delivery occurrence, release, and evaluation remain separate record families when applicable;
8. translation does not replace the original and has a complete `DERIVED_TRANSLATION_OF` lineage;
9. retention, deletion, withdrawal, incident, and backup states are actionable; and
10. the receiver records acceptance or rejection with time, reason, and no silent repair.

### Minimum session evidence handoff

The moderator and observer each produce an independent basis log within 24 hours. Each bounded note receives one basis/access pairing:

| What happened | `source_type` | `evidence_basis` | `access_mode` |
| --- | --- | --- | --- |
| Participant said something live, with no permitted recording reviewed | `practitioner account` | `participant_report` | `live_participant_account` |
| Participant showed an authorized redacted artifact live | Type supported by the artifact itself | `direct_artifact_observation` | `live_participant_controlled_artifact` |
| Researcher reviewed a separately permitted retained extract | Type supported by the exact extract | `direct_artifact_observation` | `retained_redacted_extract` |
| Researcher reviewed a permitted recording or transcript | `practitioner account` for the account | `participant_report` | `consented_recording_or_transcript` |
| Observer recorded neutral session events | Source type supported by the event/material; leave pending when unclassifiable | Basis supported by the bounded field | `neutral_field_observation_log` |
| Analyst proposes meaning across records | No synthetic source type | `researcher_inference` | Access mode belongs to each linked evidence source; inference is a separate claim |

Do not promote an inference or one participant account to **[Research finding]**. Do not promote an artifact to authoritative, applicable, approved, implemented, released, live, effective, or canonical merely because it was viewed.

### Exact downstream handoff by time

| Deadline | Sender → receiver | Required deliverable | Acceptance gate |
| --- | --- | --- | --- |
| Within 30 minutes | Moderator/observer → data steward | Handoff manifest, consent changes, path states, record pointers, incident/withdrawal flags | Storage/access/provenance/control checks; otherwise quarantine |
| Within 24 hours | Moderator and observer → protected analytic store | Separately locked basis logs and reflexivity entries | Every bounded note has basis/access/provenance or defined missingness; no analytic discussion yet |
| Within 48 hours | Data steward → coder A and coder B | Identical permitted evidence set, frozen instrument/codebook, competency and access scope | Both acknowledge same versions; inaccessible fields excluded; coding independent until lock |
| After both locks | Coders → adjudication queue | Original unitization, values, rationales, missingness, disagreements, timestamps | Pre-adjudication values immutable; no alignment hidden |
| After adjudication | Adjudicator/data steward → restricted research set | Typed dispositions plus preserved originals; coverage and field-pressure updates | Consent, lineage, non-entailment, and promotion checks |
| Only after separate review | Research set → fixture/judge/output queue | Independently authored synthetic brief, rubric candidate, or permitted paraphrase/quote | Exact permission, specialist review, de-identification/mosaic review, and promotion rule pass |

## Session completion checklist

A session is operationally complete only when all applicable items pass:

- the participant understood and reconfirmed current permissions in an accessible language/form;
- optional paths matched their recorded choices and were disabled when not permitted;
- the focal case remained bounded and safe;
- participant-controlled artifact authorization/redaction passed, or `artifact_backed: false` and missingness were recorded without an absent source;
- no prohibited material was retained; any incident is dispositioned or quarantined;
- participant report, direct artifact observation, and researcher inference are separated;
- participant playback corrections and unresolved points are preserved;
- consent changes, follow-up scope, withdrawal/deletion route, and compensation state were communicated;
- the package manifest points to access-separated records with exact versions, permissions, provenance, retention, and deletion;
- moderator and observer basis logs are independently locked; and
- the session is labeled `completed_operationally`, `quarantined_pending_resolution`, `withdrawn_pending_deletion`, or `closed_no_research_record` without implying a research finding or threshold-eligible decision.

Operational completion does not prove `decision_eligible`, `artifact_backed`, `threshold_eligible`, agreement, saturation, model validity, agent capability, or product effectiveness. Those require the separate extraction, coding, adjudication, coverage, observation, and evaluation rules in the protocol.

## Pre-pilot release checklist

The research team may schedule `S001` only after:

1. the study owner approves this exact field-kit version and the authoritative protocol version;
2. the configuration card contains no applicable `unset_blocking` value;
3. recruitment, screening, consent, participant notice, compensation, language access, storage, incident, withdrawal, and deletion instruments pass legal/ethics/privacy/accessibility review required by the study context;
4. `pilot-0.1` protocol, schema, codebook, and analysis plan are frozen and their versions appear in every instrument;
5. the moderator, observer, data steward, and both coders rehearse this kit with synthetic material, including consent change, prohibited-artifact exposure, interpreted participation, withdrawal, deletion, and handoff quarantine;
6. the rehearsal proves recording and automated capture stay off by default, unsafe sharing can be stopped, records route to access-separated stores, and deletions propagate through a synthetic lineage;
7. every pilot profile has an approved recruitment source and accessible language/support path without inventing or pre-committing a participant; and
8. the study owner records `pilot_execution_authorized: yes` with exact scope, effective period, revocation route, and version IDs.

Until then, `execution_status` remains `not-run` and the only allowed use of this document is internal preparation and synthetic rehearsal within separately approved controls.
