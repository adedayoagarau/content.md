---
title: GOV.UK public licensed voice-profile candidate
status: working-note
started: 2026-08-19
updated: 2026-08-19
evidence_cutoff: 2026-08-19
source_access_date: 2026-08-19
research_mode: public-web-read-only
profile_id: VP-CAND-GOVUK-PUBLIC-001
profile_version: candidate-0.1
profile_status: candidate-not-approved-for-harness
authority_effect: none
organization_fidelity_claim: prohibited
license_disposition: OGL-v3-with-exceptions-and-attribution-required
implementation_status: not-built
evaluation_status: not-run
source_documents:
  - ../00-method/research-protocol.md
  - public-voice-and-tone-systems-corpus-2026-08-17.md
  - voice-tone-graph-and-measurement.md
  - voice-tone-measurement-simulation-protocol.md
---

# GOV.UK public licensed voice-profile candidate

## Result and boundary

This note turns a bounded set of current, official, publicly readable GOV.UK writing guidance into a proposed voice, tone, terminology, and mechanics profile for paper review and synthetic measurement-design pressure tests.

It does **not** approve the profile for the measurement harness, claim that it represents every UK government body or public service, establish current production behaviour, or authorize implementation, publication, model evaluation, user research, or organizational-fidelity scoring. It is a research candidate derived from documented GOV.UK practice. An authorized owner would still need to approve an exact version and scope before controlled use.

The source pages say GOV.UK content is generally available under the Open Government Licence (OGL) v3.0 except where otherwise stated. This note paraphrases the guidance and supplies project-authored examples. It does not reuse logos, crests, personal data, third-party material, or source examples as a brand asset. Any later reuse must retain attribution, check page-level exceptions, and recheck the current source at action time.

### Claim notation

- **[Sourced fact]** — a proposition directly supported by an official source within its stated scope.
- **[Documented practice]** — what GOV.UK says its writers should do; not a universal content rule.
- **[Inference]** — a bounded translation into the proposed graph or measurement model.
- **[Proposal]** — an unapproved candidate rule, dimension, example, or control.
- **[Open question]** — a gap that needs evidence or an authorized decision.

## Source and licence register

| Source ID | Official source | Source type and access | Scope used here | Freshness and locator | Licence or rights boundary | Limitations |
| --- | --- | --- | --- | --- | --- | --- |
| GOVUK-VP-S01 | [Writing for user interfaces](https://www.gov.uk/service-manual/design/writing-for-user-interfaces) | official guidance; direct public read | transactional UI tone, cognitive load, error language, accessibility, mechanics, legal content | published 2017-10-10; updated 2018-04-16; page and headings read 2026-08-19 | page footer says OGL v3.0 except where otherwise stated | older page; does not prove present runtime use |
| GOVUK-VP-S02 | [Use the right tone](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/right-tone/) | official guidance; direct public read | publishing tone, direct address, organizational speaker clarity, offensive-language constraint | rolling publishing guidance; page read 2026-08-19; no immutable snapshot retained | GOV.UK terms and site licensing apply; check exceptions | publishing guidance is mutable and is not a universal service-state policy |
| GOVUK-VP-S03 | [Use clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/) | official guidance; direct public read | plain language, user terms, specialist language, requirement words, active voice | rolling publishing guidance; page read 2026-08-19; no immutable snapshot retained | GOV.UK terms and site licensing apply; check exceptions | cited third-party research is not independently re-evaluated here |
| GOVUK-VP-S04 | [A to Z style guide](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/) | official guidance; direct public read | abbreviations, direct address, inclusive terms, UK English, UI verbs, capitalization and mechanics | rolling guide read 2026-08-19; no immutable snapshot retained | GOV.UK terms and site licensing apply; check exceptions | large, changing domain glossary; only cited entries are projected here |
| GOVUK-VP-S05 | [Service Standard](https://www.gov.uk/service-manual/service-standard) | official guidance; direct public read | user needs, whole journey, channel consistency, accessibility, privacy, measurement and reliability | page read 2026-08-19 | page footer says OGL v3.0 except where otherwise stated | service-quality controls are not voice dimensions |
| GOVUK-VP-S06 | [GOV.UK terms and conditions](https://www.gov.uk/help/terms-conditions) | official terms; direct public read | ownership, OGL coverage, exceptions, change and accuracy boundaries | updated 2024-09-03; read 2026-08-19 | most Crown content is OGL; exceptions and credited material remain separate | does not adjudicate every page-level asset or third-party item |
| GOVUK-VP-S07 | [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) | official licence; search-result and linked-page access | licence identity and general reuse framework | version 3.0; destination access was protected during this pass, while official indexed text and GOV.UK links established the licence identity | attribution and licence conditions apply; excluded information is not licensed | exact action-time compliance and page exceptions require rights review |

**[Sourced fact]** GOV.UK says its content is updated continuously and may be changed or removed without notice, while the most current version is on GOV.UK. This profile therefore records an access date and must not be treated as an immutable upstream rule set. [GOV.UK terms](https://www.gov.uk/help/terms-conditions)

## Candidate profile

### Stable voice principles

These are model projections, not newly sourced universal rules.

| Candidate dimension | Proposed operational meaning | Primary evidence | Measurement boundary |
| --- | --- | --- | --- |
| `VP-GOVUK-D01 clear_and_direct` | Put the user action or important fact first; use short, concrete sentences and active voice | GOVUK-VP-S01, S03 | clarity is not automatically brevity; required legal or safety detail cannot be deleted |
| `VP-GOVUK-D02 human_authority` | Sound like a capable public-service speaker: conversational and helpful, but not overly familiar, pompous, promotional, or machine-like | GOVUK-VP-S01, S02 | authority must come from valid source and role records, never tone alone |
| `VP-GOVUK-D03 restrained_under_consequence` | Reduce humour, emotional colour, courtesy padding, and brand performance as stress or consequence rises | GOVUK-VP-S01, S02 | restraint must not become coldness, omission, or concealment of uncertainty |
| `VP-GOVUK-D04 inclusive_role_truth` | Use accessible language, direct address, gender-neutral reference, descriptive links, and an unambiguous speaker | GOVUK-VP-S01, S02, S03, S04 | does not replace accessibility testing, localization, or valid role authorization |

**[Documented practice]** GOV.UK UI guidance tells writers to minimize cognitive load, use the language users use, start with less, write short and directly, and put important words first. It connects those choices to inclusion and accessibility rather than treating them as cosmetic style. [Writing for user interfaces](https://www.gov.uk/service-manual/design/writing-for-user-interfaces)

**[Documented practice]** Current publishing guidance describes GOV.UK tone as specific, informative, clear, concise, brisk without terseness, human without imprecision, serious without pomposity, and low in subjective emotional colour. It asks writers to address the user directly and make the organizational speaker clear. [Use the right tone](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/right-tone/)

### Situational tone policy

| Policy ID | Context predicate | Candidate response policy | Hard boundary | Evidence |
| --- | --- | --- | --- | --- |
| `VP-GOVUK-T01` | ordinary validation error; service otherwise works | state the problem directly and give the next action | do not add an apology merely for validation | GOVUK-VP-S01 |
| `VP-GOVUK-T02` | complete or serious service failure | use a brief apology, truthful status, and actionable recovery or timing information | apology cannot replace status, recovery, ownership, or uncertainty | GOVUK-VP-S01 |
| `VP-GOVUK-T03` | high-stress, serious, rights-sensitive, or consequential task | use precise, restrained, non-humorous wording; front-load the material fact | no humour, hype, false reassurance, or overfamiliarity | GOVUK-VP-S01, S02 |
| `VP-GOVUK-T04` | legal requirement or right | use plain language; distinguish `must`, process `need`, and optional `can` by actual obligation | tone cannot create or alter the governing requirement | GOVUK-VP-S01, S03 |
| `VP-GOVUK-T05` | transactional action or instruction | use direct, active, action-led wording and remove unnecessary courtesy padding | do not obscure the actor, object, or consequence | GOVUK-VP-S01, S02, S03 |
| `VP-GOVUK-T06` | specialist term is necessary | retain the exact term and explain it on first use | do not replace controlled meaning with a friendlier but inaccurate synonym | GOVUK-VP-S03, S04 |

### Terminology and mechanics projection

| Rule ID | Type | Candidate rule | Exceptions or scope | Evidence |
| --- | --- | --- | --- | --- |
| `VP-GOVUK-L01` | preferred | use the user's familiar terms and direct `you` address | evidence can justify a different audience term | GOVUK-VP-S02, S03, S04 |
| `VP-GOVUK-L02` | preferred | use active voice and action-led verbs; use `select` for a UI control | passive voice can be more user-centred when the outcome matters more than the actor | GOVUK-VP-S03, S04 |
| `VP-GOVUK-L03` | controlled | expand abbreviations on first use | listed widely known terms, file types, qualifications, or evidence-backed audience familiarity | GOVUK-VP-S04 |
| `VP-GOVUK-L04` | controlled | use `sorry` only for a serious failure; usually omit `please`, `please note`, and `thank you` | courtesy can remain where evidence and context justify it; this candidate does not ban politeness universally | GOVUK-VP-S01, S02 |
| `VP-GOVUK-L05` | controlled | use `must` for an actual legal requirement, `need` for a process requirement, and `can` for an option | governing facts and authorized legal review determine applicability | GOVUK-VP-S03 |
| `VP-GOVUK-L06` | mechanics | use sentence case; write one idea per sentence; use descriptive headings and links | proper nouns and exact source terms retain their required form | GOVUK-VP-S01, S04 |
| `VP-GOVUK-L07` | avoid | avoid negative or complex contractions where they can be misread | ordinary positive contractions can remain | GOVUK-VP-S01, S03, S04 |
| `VP-GOVUK-L08` | prohibited candidate behaviour | do not rely on colour, shape, size, or location alone; do not use non-descriptive `click here` links | none within the candidate UI scope | GOVUK-VP-S01 |
| `VP-GOVUK-L09` | prohibited candidate behaviour | do not use humorous errors in serious or stressful service states | humour outside those states remains out of scope and needs separate evidence | GOVUK-VP-S01 |
| `VP-GOVUK-L10` | preferred inclusive term | use `allow list` and `block list`, not white/black-list variants | exact quoted, legal, or historical material needs a separate treatment decision | GOVUK-VP-S04 |
| `VP-GOVUK-L11` | privacy rule | do not put personal information in a URL title | privacy control, not a stylistic score | GOVUK-VP-S01 |

## Project-authored examples

The following examples are new synthetic material. They demonstrate the candidate interpretation and are not GOV.UK source text, production copy, approved content, or gold labels.

| Example ID | State | Better candidate | Counterexample | Why the counterexample fails |
| --- | --- | --- | --- | --- |
| `VP-GOVUK-EX01` | validation | Enter a postcode. | Sorry! Please pop your postcode in for us. | adds apology, familiarity, and padding without a service failure |
| `VP-GOVUK-EX02` | serious outage | Sorry, the service is unavailable. Try again after 3pm. | Oops! Something went wonky. | hides operational detail behind humour and vague language |
| `VP-GOVUK-EX03` | legal requirement | You must report the change within 14 days. | You may wish to let us know fairly soon. | weakens a controlled obligation and removes the deadline |
| `VP-GOVUK-EX04` | process requirement | You need your reference number to continue. | Your reference number is required for the continuation process. | uses passive, abstract wording and hides the user action |
| `VP-GOVUK-EX05` | optional action | You can save a copy. | You may potentially be able to retain a copy. | obscures a simple option with hedging |
| `VP-GOVUK-EX06` | accessible navigation | Select Review your application. | Click the green button on the right. | depends on input mode, colour, and location |
| `VP-GOVUK-EX07` | specialist term | A caveat is a formal notice that may affect this application. | Complete the caveat step. | uses an unexplained specialist term |
| `VP-GOVUK-EX08` | completion | Application submitted. | Thanks a million — you're all done! | adds emotional colour and overclaims completion beyond the named state |

## Graph projection

**[Inference]** The public guidance can pressure-test the graph as separate record families. It should not be flattened into one vector.

| Graph object | Candidate records | Required separation |
| --- | --- | --- |
| `VoiceProfile` | VP-GOVUK-D01–D04 | stable stance only; no task authority or product truth |
| `TonePolicy` | VP-GOVUK-T01–T06 | context predicate, response policy, exclusion, evidence and version |
| `TerminologyEntry` | VP-GOVUK-L01–L05 and L10 | preferred, controlled, avoided or prohibited state plus exceptions |
| `MechanicsRule` | VP-GOVUK-L06–L09 and L11 | sentence, link, UI-reference, privacy and stress-state constraints |
| `ContextPacket` | task, state, consequence, user role, speaker role, channel, locale, accessibility need and governing facts | context values must come from the evaluated case, not from the profile |
| `DecisionRecord` | candidate status only | approval remains `not established`; no delivery or evaluation state is implied |

### Hard-before-soft proposal

**[Proposal]** A future paper walkthrough may treat the following as non-averagable candidate violations:

- misstating a legal requirement, right, service state, actor, or next action
- relying on colour, shape, size, location, or non-descriptive link text to carry required meaning
- using humour or false reassurance in a serious or high-stress state
- exposing personal information in a URL title
- hiding a necessary specialist or controlled term without explanation

The four voice dimensions remain soft, multidimensional judgments. A warm sentence cannot compensate for a wrong obligation, inaccessible instruction, or false service state.

## Intended paper-only uses

This candidate may be used to:

- check whether the graph can represent stable voice separately from state-specific tone
- check whether terminology preferences, mechanics, accessibility and privacy controls stay typed and independent
- author synthetic, clearly labelled pressure cases for a later approved simulator specification
- test whether evidence, version, exception and scope fields survive projection

It must not be used to:

- score GOV.UK, another government, a vendor, a real product, or a person
- claim that generated copy is GOV.UK-compliant or organization-faithful
- replace legal, accessibility, privacy, policy, localization, content-owner or user-research review
- train or calibrate a model, run a judge, publish content, or authorize implementation
- treat OGL availability as brand endorsement or as permission to reuse excluded assets

## Approval and evidence gaps

| Gap ID | Current state | Evidence or decision needed to close it |
| --- | --- | --- |
| `VP-GOVUK-G01` | no authorized profile owner or approver | authenticated, scoped, version-bound approval record |
| `VP-GOVUK-G02` | rolling publishing pages are not snapshot-hash bound | permitted immutable captures or content hashes plus action-time freshness check |
| `VP-GOVUK-G03` | source exceptions were not adjudicated item by item | rights review covering exact reused material and attribution form |
| `VP-GOVUK-G04` | no locale-specific profile | authorized locale sources, translators, terminology, exceptions and evaluation |
| `VP-GOVUK-G05` | no cognitive or participant validation | approved study, qualified sample, valid consent and non-zero results |
| `VP-GOVUK-G06` | no mapping approval for this repository's harness | exact schema mapping, profile version, use scope and release decision |
| `VP-GOVUK-G07` | no production observation | conforming evidence showing whether any named service implements the guidance |

## Current disposition

`VP-CAND-GOVUK-PUBLIC-001@candidate-0.1` is a public-source, licence-traceable **candidate**. It narrows the missing-material problem for graph and simulator design, but it does not close the repository's requirement for an owner-approved organization voice and terminology package. Approval, implementation, run, calibration, release, and organizational-fidelity states remain absent.
