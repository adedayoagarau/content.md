---
title: Voice and tone construct cognitive-validation protocol
status: proposed
started: 2026-08-18
updated: 2026-08-18
evidence_cutoff: 2026-08-18
protocol_id: VT-CCVP
protocol_revision: design-0.1
execution_status: not-run
authority: none
program_dependency: P4-06a
scope: Proposal-only cognitive-interview protocol for the meaning of current voice and tone cards, anchors, response categories, ordinal bands, counterfactual operation, and fixed-panel claim limits
source_documents:
  - voice-tone-measurement-estimand-and-coverage-specification.md
  - voice-tone-human-calibration-instrument.md
  - voice-tone-graph-and-measurement.md
  - voice-tone-synthetic-calibration-development-bundle.md
  - materials-and-access-register.md
  - ../00-method/research-protocol.md
  - ../05-technology/security-privacy-and-trust-boundaries.md
  - practitioner-decision-reconstruction-protocol.md
  - ../10-cognitive-ergonomics/practitioner-review-and-validation-protocol.md
---

# Voice and tone construct cognitive-validation protocol

## Result and non-authority boundary

**[Proposal]** Use a bounded, development-stage cognitive-interview pilot to learn whether qualified prospective raters interpret each current card, its anchors, the five raw submitted-response categories—`LEFT`, `RIGHT`, `indistinguishable`, `both_unacceptable`, and `insufficient_context`—the later deterministic mapping of locked `LEFT`/`RIGHT` to canonical `A`/`B`, the raw `0`–`4` fit bands, and a proposed operative-counterfactual rule as intended. The pilot is an instrument-understanding study. It is not a calibration study, reliability study, preference study, product study, user-outcome study, or fixed-panel quantitative study.

This file is a **proposal-only, not-for-use protocol**. It records no recruitment, screening, participant, consent choice, interview, material exposure, rating, code, adjudication, result, construct validation, coverage repair, calibration, approval, or authorization. It does not:

- materialize or approve participant-facing materials;
- make any current A/B pair renderable or hard-eligible;
- change any current card definition, card identity, family assignment, split, candidate, counterexample, coverage denominator, or graph;
- close `P4-06a`, `P4-06b`, or any other materials-register dependency;
- establish reliability, validity, a tie model, an ordinal model, a counterfactual coefficient, a card threshold, a scalar score, a global utility, or a calibrated probability;
- authorize research outreach, participant contact, recording, transcription, model processing, persistence, browser or Computer Use operation, connector use, external service use, build work, or execution; or
- create semantic-decision approval, study approval, architecture approval, mutation approval, release approval, a phase-gate result, or a task capability grant.

Every count below is a proposed design count. It is not an observed sample or result. An authorized successor study must mint a new frozen execution record that binds the exact protocol, materials, people, controls, and analysis plan. This Markdown file cannot serve as that record.

## Evidence and reconciliation boundary

The protocol applies the repository's [canonical claim vocabulary](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary). In particular, **[Proposal]** describes the study design, **[Product hypothesis]** describes a development rule that still needs evaluation, and **[Open question]** preserves a decision that cannot be settled by this protocol alone.

| Local source | What it establishes for this protocol | Boundary retained |
| --- | --- | --- |
| [Estimand and coverage specification](voice-tone-measurement-estimand-and-coverage-specification.md#exact-current-state-reconciliation) | There are 49 current card identities, none meets the declared `10`-family and `6/4` coverage rule, and the first quantitative target—if later authorized—is conditional on one exact message set and fixed qualified panel | Cognitive exposure is not construct-to-family measurement coverage; the current eligible calibration count remains zero |
| Human calibration [construct cards](voice-tone-human-calibration-instrument.md#construct-cards) and [rating/mapping contract](voice-tone-human-calibration-instrument.md#rating-record-field-contract) | Exact `VT-D01`–`VT-D07` wording, anchors, raw submitted `LEFT`/`RIGHT` plus three nondecisive outcomes, later canonical `A`/`B` mapping, raw `0`–`4` bands, procedural abstention, evidence-span, privacy, and administration proposals | The instrument is not run, and its A/B candidate packet is not renderable |
| [Graph and measurement model](voice-tone-graph-and-measurement.md#22-counterfactual-test-families) | Counterfactual, pairwise, rater, multilingual, accessibility, hard/soft, and state-separation proposals | Formulas and records are proposals; no construct or comparison is validated |
| [Synthetic development bundle](voice-tone-synthetic-calibration-development-bundle.md#shared-interpretation-contract) | Seven `VT-D*` cards are local to `MSG-07`; 42 `VT-P*` cards are each local to one other family; every candidate and card assignment is open prose design material | The 22 pairs remain `not_run`, nonrenderable, rights-unresolved, and without comparability evidence |
| [Materials and access register](materials-and-access-register.md#p4-06-measurement-readiness-decomposition) | `P4-06a` requires both a versioned cognitive-interview protocol and results; later coverage, simulation, fixed-panel, method-review, and record-contract dependencies stay separate | This protocol supplies only a proposed protocol artifact and no result or phase advancement |
| [Security, privacy, and trust boundary](../05-technology/security-privacy-and-trust-boundaries.md#consent-is-not-one-event) | Connection, processing, persistence, telemetry, consent, approvals, phase eligibility, and task authorization remain separate | A participant's consent or an unlocked device never creates operational authority |
| [Practitioner decision-reconstruction protocol](practitioner-decision-reconstruction-protocol.md#consent-safety-and-data-minimization) | Granular consent, safe collection, language access, independent coding, pseudonymization, incident handling, and missingness boundaries | No participant or proprietary material is imported into this study |
| [Cognitive-ergonomics validation protocol](../10-cognitive-ergonomics/practitioner-review-and-validation-protocol.md#validation-layers-and-decision-rights) | Scientific, practice, specialist, rule, user, and governance review have distinct questions and decision rights | This cognitive pilot cannot certify science, product behavior, user benefit, or governance approval |

## Current design facts that must not be changed by interpretation

**[Cross-source finding]** The current materials contain:

- 7 `VT-D*` identities, all and only assigned to `MSG-07-UNKNOWN-POSTCOMMIT`;
- 42 `VT-P*` identities, each assigned to exactly one of the other 21 semantic-message families;
- 49 current card identities in total;
- 22 proposed message families, 22 isolated A/B pair drafts, and 44 unique candidate IDs;
- 14 intended calibration families and 8 open public-test families at bundle level; and
- 0 card identities currently eligible for a dimension-calibration claim under the declared `10`-family and `6/4` rule.

The cognitive pilot below proposes exactly two independent **meaning exposures** per current card identity. A meaning exposure is not a semantic-message-family assignment, applicable-family observation, rating, comparison, calibration record, or coverage unit under `P4-06b`. `49 cards × 2 interviews = 98 cognitive exposures` does not alter the `0` current eligible calibration claims. No result may pool differently defined cards or reuse a participant's explanation as a new family assignment.

## Study objective and exact research questions

**[Proposal]** The objective is to find card and response-language defects early enough to revise the instrument before any quantitative allocation, simulation, fixed-panel pilot, or automated-judge claim.

| ID | Exact research question | Unit | Permitted result |
| --- | --- | --- | --- |
| `RQ-CV-01` | On first reading, what construct, direction, evidence, and boundary does a participant believe one exact card asks them to judge? | One participant × one exact card/version/context | Descriptive interpretation and defect code |
| `RQ-CV-02` | Do the positive and negative anchors make the intended continuum and its limits distinguishable without supplying a preferred candidate or overall-quality rule? | One card exposure and its independently authored anchor probes | Anchor-order and boundary disposition |
| `RQ-CV-03` | Can participants distinguish raw submitted `LEFT`, `RIGHT`, `indistinguishable`, `both_unacceptable`, and `insufficient_context` from one another and from an item-level procedural abstention? | Shared raw-response-ontology task with displayed-side vignettes | Raw-category-meaning disposition; no tie model or canonical winner |
| `RQ-CV-04` | After a raw response is locked, can participants explain how an exact presentation assignment maps `LEFT` or `RIGHT` to canonical candidate `A` or `B`, while leaving nondecisive outcomes unchanged and preserving raw side/order fields? | Separate post-lock mapping-comprehension task | Mapping-language disposition; no rating, recode, or side-effect estimate |
| `RQ-CV-05` | Do participants interpret raw bands `0`, `1`, `2`, `3`, and `4` as an ordered card-specific fit ladder, with `null/not_rateable` outside the ladder, without assuming equal intervals or cross-card comparability? | Card-specific ladder task plus shared reflection | Ordinal-anchor disposition; no coefficient or mean |
| `RQ-CV-06` | Can participants identify when a packet lacks information needed for the named construct and distinguish that substantive condition from a procedural inability to respond? | Missing-context and procedural-boundary vignettes | Missing-field and abstention-boundary disposition |
| `RQ-CV-07` | Which adjacent or overlapping cards are interpreted as the same construct, as different constructs, or as inseparable without additional context? | Cross-card comparison of definitions only, never candidate ranking | Retain/revise/split/merge/remove review signal |
| `RQ-CV-08` | What must change, and what must remain fixed, for a proposed counterfactual difference to count as an operative change rather than wording drift, invalid semantic change, or an accessibility/locale adaptation? | One base/counterfactual interpretation task | Counterfactual-operation disposition; no invariance estimate |
| `RQ-CV-09` | Can participants correctly state what a future fixed-message/fixed-panel result would and would not support? | Claim-sorting and teach-back task | Briefing-comprehension disposition; no generalization evidence |

The study does not ask whether a participant likes a card, whether one candidate is better overall, whether an organization should adopt a voice principle, whether the product behavior is true, or whether users would understand or benefit from an expression.

## Construct and response meanings under examination

These are the proposed meanings to test, not answers that moderators teach before the participant's first response.

| Object | Proposed meaning under examination | Invalid collapse to detect |
| --- | --- | --- |
| Exact card | One versioned construct, direction, context, and anchor set | Generic “good writing,” brand preference, or another card |
| Positive/negative anchor | Observable evidence illustrating the declared direction and boundary in the exact context | Gold candidate, universal rule, or full scale endpoint by assertion |
| Raw `LEFT` / `RIGHT` | Submitted decisive choice for the candidate displayed on that side, on one exact card; the raw value locks before canonical identity mapping | Canonical candidate identity, side preference, overall winner, approval, or product preference |
| Derived canonical `A` / `B` | Deterministic post-lock result obtained only by joining raw `LEFT`/`RIGHT` to the exact frozen presentation assignment | Raw submitted response, in-place recode, or evidence that side/order had no effect |
| `indistinguishable` | No meaningful difference on the declared dimension | Both acceptable by default, both unacceptable, half a win, or missing response |
| `both_unacceptable` | Neither candidate is acceptable on the declared dimension | Tie, double loss in a binary model, hard-gate result, or procedural abstention |
| `insufficient_context` | The packet lacks information needed to make the declared dimension judgment | Rater incompetence, conflict, inaccessible presentation, or ordinary uncertainty |
| Procedural abstention | No dimension outcome because remaining qualified scope, conflict, access, language/locale, or technical conditions prevent a valid response after skip, withdrawal, and integrity routes have been excluded | A sixth submitted category, participant skip, withdrawal, invalidation, neutral judgment, or failed candidate |
| Raw band `0`–`4` | Card-specific ordered fit categories from clear mismatch through clear fit | Equal-distance interval scale, cross-card score, utility, or approval grade |
| `null/not_rateable` | No valid band under the declared response rule | Midpoint, zero, missing-as-poor, or `insufficient_context` without its typed fields |
| Proposed operative counterfactual change | A material change in the declared response, evidence basis, recommendation, or generated content that can be attributed to the one reviewed changed factor after semantic and functional validity checks pass | Any token difference, invalid meaning change, identity erasure, locale adaptation, or unreviewed causal claim |
| Fixed-panel result | A result conditional on one exact frozen eligible message set and one exact fixed qualified panel under one exact procedure | Population of future raters, new messages, products, users, organization voice, or universal truth |

## Study design and participant frame

### Design form

**[Proposal]** Use moderated one-to-one cognitive interviews with concurrent or retrospective verbalization, neutral comprehension probes, example sorting, teach-back, and structured debrief. The first bounded pilot has:

- 14 proposed participant slots, `CI-P01`–`CI-P14`;
- one 75-minute session per slot;
- one shared raw-response-ontology task, one separate post-lock mapping-comprehension task, one shared counterfactual task, and one fixed-panel claim-sorting task per completed session;
- seven exact card exposures per participant;
- two independent participant exposures per each of the 49 current card identities; and
- no candidate winner, quantitative fit result, reliability statistic, or calibration outcome.

Fourteen is a workload-allocation design for the first pilot, not a power calculation, minimum-validity theorem, or rater-population sample. If the pilot exposes material defects, the protocol is revised and a new-version pilot is run; additional interviews are not added merely until a preferred result appears.

### Participant qualification

A proposed participant must satisfy all of the following for their assigned cards:

1. be an adult able to give study-specific consent;
2. demonstrate recent direct practice making or reviewing product-content decisions in rendered or structured context;
3. distinguish product fact, hard eligibility, voice/tone judgment, personal preference, approval, delivery, and user outcome in a qualification exercise outside the study cards;
4. have direct competence for the assigned surface or construct—for example web recovery, transactional messages, notifications, API/problem details, accessibility/content semantics, or consequential actions;
5. complete the exact language and access-needs screen without qualification being inferred from nationality, employer, title, age, disability, or years alone;
6. disclose authorship, study-design, product/vendor, candidate, evaluator, and other conflicts; and
7. have no access to the coding key, expected material dispositions, another participant's record, or an aggregate result before their session locks.

The target frame should include varied product-content practitioners, content strategists/system practitioners, transactional or API specialists, and accessibility-informed content practitioners. Variation is purposive and descriptive. It cannot support percentages about the profession or any demographic, locale, or user population.

The moderator must be trained in cognitive interviewing and neutral probing. Two analytic coders must be trained on the frozen codebook. Specialist adjudicators are assigned only to their declared surface, accessibility, locale/language, methodological, privacy, or domain scope. A card author or bundle author may explain provenance to the study owner before freeze, but cannot moderate, primary-code, or singly adjudicate that card.

### Development-sample and later-panel separation

Cognitive-interview participants are development reviewers, not automatically qualified fixed-panel raters. Exposure to card wording, anchor probes, counterfactual materials, or revision discussion may create training and leakage. Therefore:

- this pilot is excluded from any future calibration or public-test response denominator;
- these participants do not become the later fixed qualified panel by participation alone;
- any later panel requires a separate sampling frame, qualification record, consent, allocation, and authorization;
- the later panel must not see analysis-locked public-test outcomes or development keys; and
- no cognitive-interview explanation becomes a gold label or approved definition automatically.

## Exact cognitive-exposure allocation

The allocation below covers current **card identities**, not semantic-message-family measurement coverage. `CI-P01` and `CI-P08`, for example, are two different future participant slots. The two slots assigned to a group receive reverse card order; material form, probe order, and any deviation are recorded.

| Group | Exact current card identities | First participant slot | Independent second slot | Count per slot |
| --- | --- | --- | --- | ---: |
| `CV-G01` | `VT-D01`; `VT-D02`; `VT-D03`; `VT-D04`; `VT-D05`; `VT-D06`; `VT-D07` | `CI-P01` | `CI-P08` | 7 |
| `CV-G02` | `VT-P01-REVIEW-CLARITY/design-0.1`; `VT-P01-REVIEW-RESTRAINT/design-0.1`; `VT-P02-COMMITMENT-EXPLICITNESS/design-0.1`; `VT-P02-NONCOERCIVE-COMMITMENT/design-0.1`; `VT-P03-PROGRESS-CERTAINTY/design-0.1`; `VT-P03-PROGRESS-RESTRAINT/design-0.1`; `VT-P04-CORRECTION-ACTIONABILITY/design-0.1` | `CI-P02` | `CI-P09` | 7 |
| `CV-G03` | `VT-P04-NONBLAMING-CORRECTION/design-0.1`; `VT-P05-CHOICE-OPTIONALITY/design-0.1`; `VT-P05-PRIVACY-CHOICE-RESTRAINT/design-0.1`; `VT-P06-PRECOMMIT-RECOVERY/design-0.1`; `VT-P06-OFFLINE-RESTRAINT/design-0.1`; `VT-P08-PARTIAL-STATE-CLARITY/design-0.1`; `VT-P08-RECONCILIATION-RESTRAINT/design-0.1` | `CI-P03` | `CI-P10` | 7 |
| `CV-G04` | `VT-P09-DESTRUCTIVE-CONSEQUENCE/design-0.1`; `VT-P09-DESTRUCTIVE-RESTRAINT/design-0.1`; `VT-P10-CONFIRMED-STATE-SEPARATION/design-0.1`; `VT-P10-SUCCESS-CELEBRATION/design-0.1`; `VT-P11-EXPIRY-RECOVERY/design-0.1`; `VT-P11-EXPIRY-URGENCY/design-0.1`; `VT-P12-STATUS-ACTION-CONTINUITY/design-0.1` | `CI-P04` | `CI-P11` | 7 |
| `CV-G05` | `VT-P12-STATUS-ACTION-RESTRAINT/design-0.1`; `VT-P13-COMMUNICATION-STATE/design-0.1`; `VT-P13-EMAIL-RESTRAINT/design-0.1`; `VT-P14-STATUS-PRIVACY/design-0.1`; `VT-P14-SMS-RESTRAINT/design-0.1`; `VT-P15-UNKNOWN-API-STATE/design-0.1`; `VT-P15-API-RESTRAINT/design-0.1` | `CI-P05` | `CI-P12` | 7 |
| `CV-G06` | `VT-P16-RETRYABILITY-SCOPE/design-0.1`; `VT-P16-API-RESTRAINT/design-0.1`; `VT-P17-ACCESS-DENIAL-CLARITY/design-0.1`; `VT-P17-NONDISCLOSIVE-RESTRAINT/design-0.1`; `VT-P18-REFERENCE-CONCEPT/design-0.1`; `VT-P18-IDENTIFIER-RESTRAINT/design-0.1`; `VT-P19-SUPPORT-BOUNDARY/design-0.1` | `CI-P06` | `CI-P13` | 7 |
| `CV-G07` | `VT-P19-SUPPORT-RESTRAINT/design-0.1`; `VT-P20-COUNT-NATURALNESS/design-0.1`; `VT-P20-COUNT-RESTRAINT/design-0.1`; `VT-P21-AMOUNT-CLARITY/design-0.1`; `VT-P21-AMOUNT-RESTRAINT/design-0.1`; `VT-P22-NONCOMMITTING-RETURN/design-0.1`; `VT-P22-RETURN-RESTRAINT/design-0.1` | `CI-P07` | `CI-P14` | 7 |

Exact arithmetic:

```text
7 groups × 7 cards = 49 current card identities
49 identities × 2 different participant slots = 98 proposed cognitive exposures
14 participant slots × 7 cards = 98 proposed cognitive exposures
```

A card with fewer than two valid completed exposures returns `insufficient_evidence` for this pilot. It is not silently reassigned after interpretation data are visible. A replacement may fill a predeclared participant slot only under the frozen replacement rule and receives the same group and order form; replacement reason and original terminal state stay in the denominator.

## Materials required before any session

Every material must have an ID, revision, content hash, owner, independent reviewer, intended use, access class, accessibility review, rights disposition, and freeze timestamp. The current prose cards and bundle do not satisfy this requirement by themselves.

| Material | Minimum content | Fail-closed condition |
| --- | --- | --- |
| Study definition | Protocol, research questions, participant frame, allocation, codebook, stopping rule, analysis boundary, roles, controls, and nonclaims | Any value is unfrozen, unowned, or inconsistent with this protocol |
| Plain-language participant packet | Purpose, voluntary nature, tasks, time, synthetic-material boundary, risks, compensation, choices, access supports, withdrawal/deletion, incident contact, and result limits | Not approved, inaccessible, unavailable in the participant's study language, or materially different from the consent record |
| Card definition packet | Exact card ID/version, context, plane, question, direction, positive/negative anchors, adjacent-card boundaries, and non-entailments | Card version mismatch, missing context, canonical candidate identity cue, expected winner, or approval cue |
| First-read form | One card shown without interpretation key; fields for paraphrase, evidence, excluded evidence, direction, ambiguity, and questions | Moderator or UI exposes the proposed answer before lock |
| Anchor-probe set | Independently authored positive, negative, boundary, irrelevant, and insufficient-context micro-examples; source and safety review | Copied vendor/participant text, unreviewed controlled claim, real data, or a pre-labeled answer shown to the participant |
| Raw response-ontology vignettes | At least two distinct displayed-side vignettes for each of `LEFT`, `RIGHT`, `indistinguishable`, `both_unacceptable`, `insufficient_context`, and each nonoverlapping procedural-abstention family; canonical candidate identity hidden until raw lock | Canonical `A`/`B`, expected answer, hard failure, item skip, withdrawal, invalidation, or missingness is confounded with the raw category |
| Post-lock mapping-comprehension set | Exact assignment reference; displayed-left and displayed-right candidate refs; raw response and lock time; counterbalanced `A-left/B-right` and `B-left/A-right` forms; unchanged nondecisive cases; side/order fields | Mapping appears before raw lock, overwrites the raw response, omits assignment identity, or implies side/order is harmless |
| Ordinal ladder set | Card-specific examples intended to pressure boundaries among `0`–`4` plus `null/not_rateable`; no numeric distance claim | Examples differ on uncontrolled meaning, safety, or more than the intended anchor |
| Counterfactual set | Valid and invalid base/counterfactual pairs with changed field, held-constant fields, semantic/functional review, order form, and no expected-effect disclosure | Protected/proxy manipulation lacks an approved functional-purpose/safety review, or the pair changes multiple unresolved factors |
| Fixed-panel claim cards | Bounded and overgeneralized statements about fixed messages, fixed raters, new messages, new raters, products, users, and organization voice | Claims reveal a preferred response rather than test comprehension |
| Accessible administration forms | Semantic structure, keyboard/alternative input, visible focus, zoom/reflow, high contrast, screen-reader labels, nonvisual alternatives, breaks, and response-mode choice | Equivalent participation is not available or the method makes think-aloud performance the construct |
| Coding and adjudication pack | Exact code definitions, examples/counterexamples outside study items, decision rules, blind coding form, conflict route, and version | Coders see another coder's values or card-author intent before lock |

The current A/B candidate drafts must not be shown as admitted comparison items. A future cognitive-material pack may reference the exact card wording and a safely reviewed synthetic context summary, but it must use independently authored micro-examples unless the candidate pair separately satisfies rights, exact hard eligibility, comparability, and the study's material authorization. This protocol does not satisfy those conditions.

## Neutral administration and task script

### Participant-facing orientation

Use the following meaning without adding an expected answer:

> We are testing the study materials, not you. These are proposed research definitions for fictional product-content situations. Please tell us what each item seems to ask, what feels clear or unclear, and how you reached that interpretation. There is no preferred candidate, and your response does not approve content or judge your professional ability. You may pause, skip an item, change your participation choices, or stop at any time.

### Exact 75-minute session

| Time | Segment | Neutral task | Required record |
| ---: | --- | --- | --- |
| 0–5 | Consent and access | Reconfirm each permission, study language, response mode, access support, recording state, stop route, and restrictions | Consent-event reference; current choices; accommodation mode; capture state |
| 5–10 | Unscored practice | Use an unrelated synthetic practice item to demonstrate first-read lock and optional verbalization | Practice completion; no study-card code |
| 10–20 | Raw response ontology | With only displayed `LEFT`/`RIGHT` identities visible, sort neutral vignettes among the five raw submitted outcomes and procedural abstention; teach back the differences | Locked raw choices, displayed-side/order fields, explanation, hesitation, and category-confusion codes |
| 20–25 | Post-lock mapping | On separate administrative examples whose raw response is already locked, apply the exact assignment to derive canonical `A`/`B`; leave nondecisive outcomes unchanged | Raw-response ref, assignment ref, mapping answer, deterministic derived answer, side/order fields, and mapping-confusion codes |
| 25–55 | Seven card tasks | For each assigned card: first-read paraphrase, evidence boundary, anchor sorting, band ladder, adjacent-card boundary, and missing-context probe | Seven independent card-interpretation records |
| 55–62 | Cross-card ordinal reflection | Explain whether `0`–`4` gaps feel ordered, equal, card-specific, and comparable; identify `null/not_rateable` conditions | Ordinal-interpretation record |
| 62–68 | Counterfactual meaning | Review one valid and one invalid pair; name changed/held fields, validity, and what would count as an operative change | Counterfactual-interpretation records |
| 68–72 | Fixed-panel teach-back | Sort bounded versus overgeneralized result statements and explain the boundary | Generalization-boundary record |
| 72–75 | Playback and close | Moderator summarizes ambiguities without correcting the participant; participant corrects the summary; confirm withdrawal/deletion route | Playback corrections; permission changes; terminal session state |

If a participant needs a break or alternative response mode, the operator uses the preapproved flexible-timing rule rather than compressing consent, card tasks, playback, or close. An incomplete session retains exact terminal states; it is not reconstructed from moderator memory.

### Card task and neutral probes

For each card, lock the first-reading response before showing anchor probes.

1. **First meaning:** “In your own words, what does this card ask someone to notice or decide?”
2. **Direction:** “What would count as more of this construct here? What would not?”
3. **Evidence:** “Which parts of a packet would you need? Which information should not affect this judgment?”
4. **Boundary:** “How is this different from the most similar card you can identify?”
5. **Anchors:** “Place these examples under positive, negative, boundary, irrelevant, or cannot judge. Tell me what made the difference.”
6. **Bands:** “Place the examples on `0`–`4` or `not rateable`. Where are the hardest boundaries? Do not assume equal distance.”
7. **Missing context:** “What missing fact, if any, would prevent a valid response on this card?”
8. **Revision:** “Which word or example would you change to make the intended boundary clearer, without changing the construct?”

The moderator may use only these neutral follow-ups after the first response:

- “Tell me more about that.”
- “What in the material led you there?”
- “What else could this mean?”
- “What would make the alternative category apply?”
- “What felt missing or outside your scope?”
- “Did anything in the layout or response method affect your answer?”

The moderator must not say “correct,” name an expected category, reveal canonical candidate identity before raw lock, reveal author intent, defend wording, suggest a winner, equate agreement with expertise, or teach the proposed definition before the participant's item record locks. The mapping exercise begins only after every raw response used by that exercise is immutable; it uses separate administrative examples and never revisits or replaces the participant's raw choice.

### Think-aloud and probing boundaries

- Concurrent think-aloud is optional. Participants may use silent review followed by retrospective explanation, typed response, sign-supported communication, augmentative communication, or another approved mode.
- Verbal fluency, speed, memory for the prompt, or comfort narrating cognition is not the construct and cannot affect qualification or card disposition.
- Ask what the participant notices in the material; do not ask them to disclose a diagnosis, private experience, employer content, or personal emotional state.
- Do not infer emotion, literacy, disability, culture, susceptibility, or expertise from pauses, eye movements, interaction telemetry, accent, dialect, or response time.
- Record first interpretation before clarification. A later teach-back is a separate field and never overwrites the first-read record.
- Do not probe proprietary examples. If a participant starts introducing one, interrupt, restate the synthetic-only boundary, and follow the incident rule if protected material was captured.
- A participant may decline any probe without their other completed responses being recoded as negative.

## Response, abstention, failure, and missingness contract

### Raw response and derived mapping invariants

The five raw submitted outcomes are exactly:

```text
LEFT
RIGHT
indistinguishable
both_unacceptable
insufficient_context
```

`LEFT` and `RIGHT` refer only to the displayed side in the exact presentation. They are locked with `presentation_assignment_ref`, `displayed_left_candidate_ref`, `displayed_right_candidate_ref`, card position, vignette position, and order-form version before any canonical candidate identity is revealed or joined.

Only a separate deterministic post-lock mapping may derive the canonical outcome:

```text
raw LEFT  -> canonical candidate assigned to displayed left
raw RIGHT -> canonical candidate assigned to displayed right
indistinguishable -> unchanged
both_unacceptable -> unchanged
insufficient_context -> unchanged
```

The raw record is immutable. The derived record references rather than replaces it. A deterministic mapping-input, assignment, or implementation-integrity failure invalidates only the affected derived record and leaves a valid raw response intact. A participant's incorrect answer in the mapping-comprehension task is instead a valid `participant_mapping_error` observation when the task material and procedure are intact. Raw and derived outcomes have separate fields and denominators; neither may be combined in one category table. Counterbalancing and a correct mapping do not prove absence of side, vignette-order, card-order, or session-position effects. This cognitive pilot reports mapping comprehension and defects only; it does not estimate those effects.

### Item-level terminal states

| State | Meaning | Analytic treatment |
| --- | --- | --- |
| `completed_valid` | Assigned item was presented under the frozen form and a valid response locked | Eligible for descriptive cognitive coding |
| `participant_skip` | Participant chose not to answer the item while remaining in the session | Missing item with reason; never a category judgment |
| `procedural_abstention` | After skip, withdrawal, and invalidation routes are excluded, conflict, outside scope, unsupported language/locale, inaccessible presentation, technical failure, or another declared scope/access inability prevented a valid response | Missing item with the closed procedural reason; never `insufficient_context` |
| `started_not_completed` | Item began but no valid lock occurred | Preserve presented fields and reason; no inferred completion |
| `not_presented` | Assigned item was never shown | Retain in assignment denominator with reason |
| `invalidated` | Key/blinding, identity, form, material, version, mapping-input/assignment, lock, or other integrity failure affected that task item | Preserve original event trail and any separately valid upstream raw response when permitted; no interpretation of the invalidated item enters analysis |
| `withdrawn` | Participant withdrew participation or the applicable notes/coded-data use | Apply the approved deletion/withdrawal path; retain only what that path permits |

Within a valid response-ontology vignette, `insufficient_context` remains a substantive answer about the vignette. At study-operation level, unavailable context about the participant, material, or procedure uses the terminal states above. The same phrase must not be used for both planes.

Apply exactly one terminal state under this precedence:

1. participation or applicable data-use withdrawal → `withdrawn`;
2. key/blinding, identity, form, material, version, mapping-input/assignment, lock, or other integrity failure → `invalidated`;
3. participant chooses not to answer while remaining in the study → `participant_skip`;
4. remaining declared scope, conflict, access, language/locale, or technical inability → `procedural_abstention`;
5. an item that began but ends for a nonclassified operational reason → `started_not_completed`;
6. an assigned item never shown for a nonclassified operational reason → `not_presented`; otherwise
7. a valid locked item → `completed_valid`.

An optional-path consent change that leaves participation and notes/coded use current changes that path only; it does not create an item terminal state. If participation or notes/coded use is `no` before any item, no participant response record is created; the allocation ledger records the unfilled slot without inventing an item response. Required denominators are `assigned`, `presented`, `started`, `completed_valid`, `participant_skip`, `procedural_abstention`, `started_not_completed`, `not_presented`, `invalidated`, and `withdrawn`. Each assigned item reaches exactly one terminal bucket. No value is imputed, recoded to agreement, or replaced by a midpoint.

### Procedural-abstention reasons

Use exactly one primary reason and optional minimized secondary reasons:

```text
outside_qualified_scope
conflict_of_interest
inaccessible_presentation
language_or_locale_unsupported
technical_failure
other_declared_scope_or_access_reason
```

Participant choice to skip always routes to `participant_skip`; participation or applicable data-use withdrawal always routes to `withdrawn`; key/blinding, identity, form, material, version, mapping-input/assignment, lock, or integrity failure always routes to `invalidated`. None may appear as a procedural-abstention reason. Free text must not contain personal, employer, client, customer, account, credential, or proprietary information.

## Independent coding and adjudication

### Coding unit and code families

The primary unit is one participant × one exact task item × one material version. Two coders independently code every valid first-pilot item from the same permitted record. They lock unit boundary, fields, evidence spans, codes, rationale, and timestamp before discussion.

| Code family | Required values or examples | Purpose |
| --- | --- | --- |
| Construct interpretation | `aligned`, `partially_aligned`, `construct_shift`, `generic_quality_collapse`, `adjacent_card_conflation`, `unresolved` | Preserve the first-read meaning and boundary |
| Direction and anchors | `direction_preserved`, `direction_reversed`, `anchor_order_clear`, `anchor_boundary_ambiguous`, `anchor_changes_construct`, `unresolved` | Detect misleading or circular anchors |
| Raw response ontology | `raw_category_distinct`, `left_right_as_display_position`, `left_right_as_candidate_identity`, `left_right_as_side_preference`, `indistinguishable_vs_both_unacceptable`, `indistinguishable_vs_insufficient_context`, `insufficient_context_vs_procedural_abstention`, `forced_decisive_response`, `unresolved` | Locate exact raw-category and side-meaning conflations |
| Post-lock mapping | `raw_derived_separation_preserved`, `raw_derived_collapse`, `left_maps_to_a_correct`, `left_maps_to_b_correct`, `right_maps_to_a_correct`, `right_maps_to_b_correct`, `nondecisive_unchanged`, `mapping_error`, `side_or_order_erased`, `unresolved` | Test deterministic mapping comprehension without rewriting raw responses or dismissing side/order |
| Ordinal ladder | `ordered_as_intended`, `nonmonotonic`, `endpoint_ambiguous`, `adjacent_boundary_ambiguous`, `equal_interval_assumed`, `cross_card_transfer_assumed`, `not_rateable_misplaced`, `unresolved` | Test ordering and nonclaims without creating an interval measure |
| Evidence and context | `required_field_identified`, `irrelevant_field_admitted`, `missing_context_identified`, `invented_context`, `evidence_boundary_unclear`, `unresolved` | Check whether a valid packet can be recognized |
| Counterfactual | `valid_change_recognized`, `held_constant_fields_lost`, `semantic_drift`, `functional_invalidity`, `token_difference_only`, `operative_change_ambiguous`, `identity_or_locale_harm`, `unresolved` | Pressure-test the proposed operative-change meaning |
| Generalization | `fixed_set_fixed_panel_boundary_preserved`, `new_message_generalization`, `new_rater_generalization`, `product_or_user_generalization`, `organization_voice_overclaim`, `unresolved` | Detect fixed-panel overclaim |
| Administration | `prompt_leading`, `material_defect`, `access_method_effect`, `fatigue_or_burden`, `technical_defect`, `none_observed` | Separate instrument behavior from participant interpretation |

Coders cite the exact response span or timestamp and distinguish participant words from researcher inference. A code is an analytic description, not a canonical claim label, evidence source type, approval, or participant trait.

### Disagreement and adjudication

1. Preserve both original coding records immutably.
2. Classify disagreement as `unit_boundary`, `evidence_span`, `code_definition`, `construct_scope`, `anchor_direction`, `raw_response_category`, `post_lock_mapping`, `terminal_state_precedence`, `ordinal_boundary`, `counterfactual_validity`, `generalization_boundary`, `accessibility`, `locale_language`, or `genuine_interpretation`.
3. Return first to the shared permitted record and frozen codebook; do not consult card-author intent as evidence.
4. Use an independently qualified specialist only for the exact disputed method, accessibility, language/locale, API/surface, or domain boundary.
5. Adjudication may correct a coding error, retain dual interpretations, identify a material defect, or route the card to revision. It never rewrites the participant response or pre-adjudication codes.
6. Majority vote cannot establish product truth, accessibility, locale validity, construct validity, approval, or user outcome.

The first pilot reports raw code counts, co-occurrence, exact disagreements, first-read/after-probe changes, missingness, burden, and qualitative patterns. It does not report Krippendorff alpha, a validity percentage, or a confidence interval as proof. A later agreement analysis would require its own preregistered unit, dependence, missingness, prevalence, and interval contract.

## Development decision rules

These rules control only the disposition of a **successor draft**. They do not label a construct validated or calibrated.

### Per-card disposition

| Disposition | Exact pilot rule | Effect |
| --- | --- | --- |
| `successor_draft_candidate` | Two valid independent first-read exposures preserve the card's construct, direction, context, and material evidence boundary; neither reverses an anchor; no unresolved safety/accessibility/locale defect; any wording issue is nonmaterial | May enter a separately reviewed successor-card draft; no quantitative use |
| `revise_and_reinterview` | Either valid exposure materially shifts the construct, reverses an anchor, admits an irrelevant controlling fact, cannot distinguish a necessary adjacent boundary, or shows a repeated administration defect | Mint a new card revision and obtain two new independent exposures; old records remain |
| `split_merge_or_remove_review` | Both independent exposures collapse the same construct with an adjacent card, expose incompatible meanings, or cannot locate an observable judgment after neutral probes | Route to independent construct/method review; no silent pooling or renaming |
| `insufficient_evidence` | Fewer than two valid independent exposures, unresolved material disagreement, or missing specialist/access route | No successor-readiness claim; fill the named dependency under a new frozen allocation |
| `invalid_pilot_material` | Material integrity, rights, safety, semantic validity, or study-control failure affects the material | Quarantine affected material; participant/data withdrawal remains only the separate `withdrawn` item route |

The `successor_draft_candidate` label means only that this two-exposure development check found no material comprehension defect under the exact pilot conditions. It is not `requires_cognitive_validation` resolved, `P4-06a` closed, or evidence that the card belongs in more families.

### Shared response-ontology disposition

**[Product hypothesis]** Revise and rerun the affected category material when either:

- two independent participants conflate the same category pair on the same controlled vignette class;
- any material design makes `both_unacceptable` behave as a tie, `insufficient_context` behave as procedural abstention, or a missing response behave as a substantive outcome;
- the task treats canonical `A`/`B` as raw submitted categories, treats `LEFT`/`RIGHT` as stable candidate identities or personal side preference, or forces a decisive `LEFT`/`RIGHT` response when a nondecisive category is warranted;
- a participant skip, participation/data withdrawal, integrity failure, or substantive `insufficient_context` response is routed into procedural abstention; or
- an access or layout condition changes the available category meaning.

This is a conservative development trigger, not an error-rate acceptance threshold. Even if no trigger appears, a tie-capable model remains unavailable until the separately specified measurement, simulation, and pilot conditions pass.

### Post-lock mapping disposition

**[Product hypothesis]** Revise and rerun the mapping language or administrative material when either independent counterbalanced form:

- exposes canonical `A`/`B` before the raw response lock;
- cannot map raw `LEFT` and `RIGHT` through the exact presentation assignment;
- rewrites the raw field instead of creating a derived record;
- changes `indistinguishable`, `both_unacceptable`, or `insufficient_context` during mapping;
- loses displayed-side, card-order, vignette-order, or session-position fields; or
- teaches or implies that counterbalancing eliminates side/order effects.

A correct cognitive mapping task supports only a successor administrative design. It does not produce a canonical candidate rating, validate the allocation, or estimate a side/order effect.

### Ordinal-band disposition

Route the band set to `revise_and_reinterview` when either independent exposure reverses the intended order, places `not_rateable` inside the quality ladder, or shows that an endpoint changes meaning across the card's own examples. Record equal-interval and cross-card interpretations as explicit warnings requiring instruction or anchor revision. No raw or normalized band may be averaged across cards, contexts, locales, or participants because this pilot appears clear.

### Counterfactual disposition

A counterfactual-operation successor may be drafted only when both assigned valid interviews can:

1. name the one changed factor;
2. name the held-constant semantic and functional fields;
3. reject invalid semantic drift, identity erasure, or uncontrolled locale/surface changes;
4. distinguish any token difference from a material operative change; and
5. identify the response, evidence, recommendation, or generated-content field where an operative change would be observed.

Otherwise return `revise_and_reinterview` or `insufficient_evidence`. No difference threshold, causal effect, fairness claim, invariance pass, or coefficient is created.

### Fixed-panel nonclaim disposition

The participant teach-back must preserve this statement:

> A future first-study estimate would describe only the exact frozen eligible messages and exact frozen qualified panel under the exact procedure. It would not, without a new design and evidence, describe new messages, future raters, a product population, an organization voice, user preference, user outcome, or universal quality.

Misunderstanding routes the briefing and claim cards to revision. Participant agreement with the statement does not establish the statistical target or supply a sampling frame.

## Proposed record contract

### Record families

| Record family | Minimum content |
| --- | --- |
| `CognitiveValidationStudyDefinitionRecord` | Protocol/material/codebook/allocation IDs, revisions, hashes; RQs; participant frame; roles; authorization/control refs; analysis and stopping plans; `execution_status` |
| `CognitiveParticipantQualificationRecord` | Pseudonymous participant ID; assigned competence scope; qualification evidence; conflicts; language/access mode; consent reference; eligible/ineligible disposition and limits |
| `CognitiveExposureAssignmentRecord` | Participant slot, card/group, material form/order, assignment time, replacement lineage, no expected answer |
| `CognitiveInterviewSessionRecord` | Session/material/operator versions; consent event; planned/actual timing; access mode; capture state; terminal state; deviations; incident/withdrawal refs |
| `CardInterpretationRecord` | Exact card/context/material refs; first-read paraphrase; direction; needed/excluded evidence; adjacent boundary; anchor sort; raw band placements; missing context; revision suggestion; item terminal state |
| `ResponseOntologyTaskRecord` | Vignette/version/order; assignment and displayed-left/right refs; when `completed_valid`, one raw response limited to `LEFT`, `RIGHT`, `indistinguishable`, `both_unacceptable`, or `insufficient_context`; otherwise null raw response plus the one terminal state/reason; raw lock time when completed; explanation; category alternatives; hesitation note; procedural/substantive distinction; no canonical outcome field |
| `ResponseMappingComprehensionRecord` | Immutable raw-response ref; exact presentation-assignment ref; displayed-left/right candidate refs; card/vignette/order positions; mapping-exposure time after raw lock; participant mapping explanation; deterministic canonical `A`/`B` or unchanged nondecisive result; mapping-defect codes; no raw overwrite |
| `OrdinalInterpretationRecord` | Card/band-set refs; raw ordering; boundary explanations; `not_rateable` placement; equal-distance and cross-card assumptions; terminal state |
| `CounterfactualInterpretationRecord` | Base/counterfactual refs; changed and held fields; semantic/functional validity; proposed operative field; invalidity reason; terminal state |
| `FixedPanelBoundaryRecord` | Claim-card refs; bounded/unsupported sort; teach-back; overgeneralization type; terminal state |
| `CognitiveCodingRecord` | Coder qualification/scope; exact source record; locked codes and evidence spans; rationale; codebook version; lock time; no adjudicated overwrite |
| `CognitiveAdjudicationRecord` | Immutable coder refs; disagreement class; specialist scope; evidence reviewed; disposition; retained dissent; no participant-response rewrite |
| `CognitivePilotDispositionRecord` | Denominator ledger; per-card and shared-object dispositions; missingness; incidents; limitations; required revisions; explicit decision/approval/delivery/execution effects all `none` |

### Shared identity, status, and integrity fields

Every persisted research record must include:

- `schema_version`, stable nonsemantic `record_id`, `record_version`, `study_id`, `study_version`, `protocol_id`, and `protocol_revision`;
- exact material, card, context, response-ontology, codebook, allocation, administration-profile, and analysis-plan versions/hashes where applicable;
- separate `raw_submitted_outcome` and `derived_canonical_outcome` fields where applicable; a raw-response record has the former only, while a mapping record links the immutable raw record and stores the latter;
- `presentation_assignment_ref`, displayed-left/right candidate refs, card/vignette/session positions, assignment form, raw-lock time, and mapping time whenever side mapping applies;
- `participant_id` only as a pseudonymous study ID; contact, compensation, consent-control, and re-identification keys remain separate;
- `created_at`, `producer_id`, `producer_role`, `supersedes_record_id`, and immutable event history;
- `execution_status` from `not_run`, `scheduled`, `in_progress`, `completed`, `stopped`, `invalidated`, or `withdrawal_processing`;
- item terminal state and nonempty typed reason whenever the state is not `completed_valid`;
- exactly one item terminal state under the frozen precedence; a terminal reason cannot also appear in another state's enum;
- `decision_effect: none`, `approval_effect: none`, `delivery_effect: none`, and `execution_effect: none`; and
- a reviewed canonical serialization and record-hash contract before persistence. This protocol selects no serializer and creates no record hash.

Unknown values remain null with typed missingness; they do not default to an expected answer. Narrative fields are minimized and must distinguish participant report, direct task observation, and researcher inference.

## Privacy, consent, authorization, and operational gates

### Granular participant choices

Before screening or collection, an authorized successor study must provide accessible plain-language materials and separately record `yes`, `no`, or `withdrawn` for:

- screening;
- participation;
- researcher notes and coded research use;
- audio recording;
- video or screen capture;
- named transcription;
- live interpretation;
- translation;
- named model/AI processing;
- exact retained extracts;
- durable research retention;
- telemetry;
- de-identified paraphrase;
- quotation;
- attribution;
- future instrument or benchmark reuse; and
- future contact.

Only participation plus approved notes/coded-use permission are required for the baseline notes-only path. Every other path defaults to `no`. Recording never implies transcription, model use, quotation, reuse, or persistence beyond the separately approved record. Compensation cannot depend on optional permissions, item completion, or alignment with an expected interpretation.

### Baseline data boundary

The proposed baseline is human-only, synthetic-only, notes-only, and capture-off:

- no customer, payment, account, credential, employer, client, production, or proprietary data;
- no admitted candidate comparison, derived product outcome, product login, vendor workspace, connector, external browser, or Computer Use;
- no model, embedding, automated transcription, or sentiment/behavior inference;
- no raw screen, clipboard, browser history, keystroke, gaze, facial, biometric, or background telemetry;
- no diagnosis or unnecessary demographic collection; and
- no raw quotation unless separately consented and approved.

Record functional participation supports, not diagnoses. Keep contact/compensation, consent/control, research response, code/adjudication, and re-identification keys in separate access classes. Apply the approved retention, deletion, backup, withdrawal, and derivative-propagation rules to each class.

### Gates before recruitment or use

No outreach, screening, scheduling, or session may occur until all applicable records exist and match the exact study:

1. named study owner, research/ethics route, privacy/security owner, incident owner, accessibility owner, and stop authority;
2. approved study definition, participant frame, recruitment route, compensation rule, participant materials, and rights/contact route;
3. rights and independent safety review for every stimulus and material;
4. processing, storage, access, retention, backup, deletion, withdrawal, and incident records for every data class;
5. trained moderator, observer when used, two independent coders, and scoped specialist/adjudication capacity;
6. accessibility and language-path review for the exact participant and administration profile;
7. frozen material, allocation, codebook, analysis, replacement, stopping, and invalidation versions/hashes;
8. current participant-specific consent and session-readiness record; and
9. every applicable phase result and independently issued exact task grant for any operation. A requested mode, protocol, study approval, consent event, or unlocked device is not that grant.

Any future model, connector, browser, Computer Use, recording, transcription, translation, or external-service path requires its own approved processing/control route and applicable security phase evidence. This protocol neither needs nor authorizes those paths.

## Accessibility and multilingual limits

### Accessible participation

The study must offer equivalent semantic access through keyboard and alternative input, screen reader, zoom/reflow, high contrast, reduced motion, plain-language instructions, breaks, asynchronous preview where methodologically safe, typed or spoken response, and participant-requested communication support. The research owner tests the exact administration form with qualified accessibility review before recruitment.

If an approved equivalent mode cannot be provided, return `inaccessible_presentation`, stop the affected task, and report the missing stratum. Do not interpret access friction, slower response, shorter rationale, or inability to speak concurrently as construct confusion. Accessibility conformance of the interview material does not establish accessibility of a product candidate, and participation by an accessibility-informed practitioner does not substitute for affected-user evidence.

### Language and locale

The first proposed pilot is limited to card wording and synthetic materials in `en` / `Latn` / `ltr` / `en-US`. It makes no `fr-CA`, `ar-EG`, bidirectional, translated-card, cross-locale, culture, or multilingual-comparability claim.

A later language branch requires a new protocol/material revision, participant-facing consent in an understandable language, qualified translator/interpreter and in-market review, original/derived lineage, versioned human correction, local card anchors, direct language competence, and within-locale analysis. English paraphrases cannot validate another language's construct meaning. Machine translation cannot fill a missing language branch.

## Stopping, invalidation, and incident rules

### Stop or pause the session immediately when

- participation or notes/coded-use consent is absent, ambiguous, changed, or withdrawn;
- the participant requests a stop, appears distressed, or cannot use the material equivalently;
- real personal, proprietary, controlled, customer, payment, account, credential, security, privileged, clinical, or safeguarding material appears;
- the presented card, context, anchor, response, allocation, administration, or codebook version differs from the frozen manifest;
- the moderator reveals an expected answer, author intent, another participant's response, or aggregate result before lock;
- an unapproved recording, model, connector, browser, telemetry, persistence, download, or network path activates;
- a rights, processing, storage, task-grant, access, retention, deletion, or incident control is missing, expired, revoked, or mismatched; or
- the operator cannot explain or maintain the data and stop boundary.

A stopped session is not a negative card result. Preserve only the event metadata permitted by consent and incident policy.

Route affected items exactly once under the terminal precedence: participation/data-use withdrawal is `withdrawn`; a key, form, material, version, assignment, lock, or other integrity failure is `invalidated`; a voluntary item decline while participation continues is `participant_skip`; and only a remaining scope, conflict, access, language/locale, or technical inability is `procedural_abstention`. If no item was exposed and none of those higher-precedence states applies, use `not_presented`. Do not copy a stop cause into two terminal buckets.

### Quarantine and response

When prohibited material or an unauthorized effect occurs:

1. stop capture and exposure without repeating the material into notes;
2. isolate any potentially affected record from ordinary analyst access;
3. notify the named incident owner through the approved route;
4. classify only the minimum sensitivity/effect category and affected record IDs;
5. delete, redact, revoke, or retain under the approved incident/legal route;
6. document participant notification and support when applicable; and
7. resume only under a new explicit incident disposition and participant reconfirmation, or terminate.

### Study-level invalidation or revision triggers

- allocation or material key exposure;
- form/version drift across supposedly comparable interviews;
- card-author coaching or unblinded primary coding;
- uncontrolled semantic differences in anchor or counterfactual examples;
- access-method effects that change available meaning;
- missing item/participant denominators;
- deletion or withdrawal not propagated to linkable derivatives;
- selective exclusion of dissent, missingness, or failed items; or
- any attempt to reinterpret cognitive clarity as coverage, calibration, approval, or user outcome.

## Pilot readiness, closure, and exit criteria

### Readiness

The pilot is `not_ready` until every material, role, consent, processing, storage, access, incident, allocation, codebook, analysis, and authorization gate above has a current exact record. A synthetic tabletop may test forms only under a separately authorized rehearsal; it creates no participant result and cannot substitute for the pilot.

### Closure states

The pilot closes with exactly one overall state:

| State | Meaning |
| --- | --- |
| `pilot_closed_successor_revision_possible` | All procedural exit criteria pass and every object has a bounded development disposition; this does not mean validated |
| `pilot_closed_revision_and_rerun_required` | The run closed safely, but one or more material constructs, categories, bands, counterfactual meanings, or administration forms require a new version and new interviews |
| `pilot_incomplete` | Planned valid exposure or record coverage is missing; no missing item is inferred or replaced after outcome inspection |
| `invalid_run` | Integrity, consent, rights, control, leakage, or procedure failure invalidates the claimed pilot result |
| `stopped_for_safety_or_incident` | The pilot stopped under the declared safety/incident route; resumption requires a new decision |

### Exact procedural exit criteria

An authorized pilot may close as anything other than `pilot_incomplete` only when:

1. all 14 participant slots have a terminal session state under the frozen replacement rule;
2. all 49 current card identities have exactly two valid independent completed cognitive exposures, or the overall state is `pilot_incomplete`;
3. all completed participants have terminal shared raw-response-ontology, post-lock mapping-comprehension, ordinal-reflection, counterfactual, and fixed-panel-boundary records;
4. every valid item has two independently locked coding records and every material disagreement has a retained adjudication or explicit unresolved state;
5. assigned, presented, started, `completed_valid`, `participant_skip`, `procedural_abstention`, `started_not_completed`, `not_presented`, `invalidated`, and `withdrawn` denominators reconcile exactly, with each assigned item in exactly one terminal bucket under the frozen precedence;
6. per-card, raw-response-ontology, post-lock mapping, ordinal, counterfactual, generalization, accessibility, burden, and administration dispositions are reported with evidence spans and limitations;
7. every consent change, withdrawal, retention action, deletion action, deviation, incident, and residual record is closed or explicitly unresolved under its owner;
8. no analysis-locked public-test response, candidate winner, construct score, reliability statistic, utility, calibrated probability, or user/product outcome is emitted; and
9. an independent method/research review records whether the next action is revise, rerun, retire, or draft a separately reviewed successor instrument.

Meeting these procedural criteria does not close `P4-06a` by itself. `P4-06a` still requires the authorized, inspectable results and their independent review. `P4-06b` remains separate and must either establish adequate card-specific family coverage under a predeclared rule or explicitly narrow/remove the calibration claim. `P4-06c` simulation, `P4-06d` fixed-panel piloting, `P4-06e` independent method review, and `P4-06f` result records also remain open until their own evidence exists.

## Required report and prohibited interpretations

The pilot report must include:

- exact study, protocol, material, card, context, allocation, codebook, and administration versions;
- participant qualification scopes and conflicts without unnecessary identity or demographic detail;
- recruitment, consent, processing, storage, access, retention, deletion, language, and accessibility boundaries;
- the complete exposure and terminal-state denominator ledger;
- first-read and after-probe interpretations separately;
- card-by-card anchor and boundary patterns; raw `LEFT`/`RIGHT`/nondecisive category patterns; separate post-lock mapping-comprehension results; side/order fields and defects; ordinal, counterfactual, and fixed-panel patterns;
- both original coding records, disagreement taxonomy, adjudication, and retained dissent;
- material defects, access-method effects, burden, incidents, withdrawals, invalidations, and missingness;
- each successor-draft disposition and the exact evidence supporting it; and
- explicit current states for coverage, calibration, implementation, architecture binding, approval, and execution.

The report must not state or imply that:

- a card is valid, calibrated, reliable, universal, approved, or ready for automation;
- two cognitive exposures are two message families or satisfy measurement coverage;
- agreement proves correctness, product truth, organization voice, user preference, or outcome;
- clear ordinal labels create equal intervals or comparable scores;
- canonical `A`/`B` are raw submitted responses, or raw `LEFT`/`RIGHT` can be overwritten after mapping;
- correct mapping or counterbalancing proves side/order effects are absent;
- `indistinguishable` is half a win or `both_unacceptable` is a tie;
- a counterfactual wording difference is causal, fair, safe, or invariant;
- an `en-US` result transfers to another language, locale, script, surface, domain, or risk;
- a fixed-panel result describes future raters or messages; or
- participant consent, a protocol, or a study result authorizes a build, model, browser, product action, persistence, publication, or approval.

## Known limitations and open questions

- **[Open question]** Are two independent meaning exposures per card sufficient even for a development disposition, or should the successor pilot increase repetitions for specific card families after simulation and method review?
- **[Open question]** Which card pairs require direct boundary comparison without producing halo, fatigue, or hidden overall-quality judgment?
- **[Open question]** Can the `0`–`4` anchors remain stable across materially different cards, or must some cards use a different response design?
- **[Open question]** Which displayed-side response-ontology vignettes can isolate raw category meaning without importing hard-gate, canonical candidate, or candidate-quality cues?
- **[Open question]** Which post-lock mapping-comprehension task best exposes raw/derived confusion without training away or concealing side and order effects?
- **[Open question]** What counterfactual tasks can test operative meaning without identity erasure, invalid locale substitution, or participant exposure to manipulative content?
- **[Open question]** Which accessibility and communication modes require method adaptations before first-read and think-aloud records are comparable even descriptively?
- **[Open question]** Which future study should examine affected-user interpretation of tone, distinct from expert card usability?
- **[Open question]** After card revision, what independent method review and simulation evidence is required before freezing a confirmatory threshold?

The purposive professional sample cannot establish population prevalence, affected-user comprehension, accessibility outcomes, cross-locale invariance, or product benefit. Repeated interviewer prompts can change interpretation, so first-read and probed responses remain separate. Synthetic examples can remove real-world ambiguity and therefore cannot establish that real packets will be sufficient.

## Bottom line

**[Proposal]** The next safe measurement step is to test whether people can understand the proposed instrument before asking the instrument to produce numbers. The bounded pilot would give every current card two independent cognitive interviews, test the raw response ontology and post-lock canonical mapping without erasing side/order, test the ordinal ladder directly, pressure-test a counterfactual-operation definition, and verify that fixed-panel claims remain narrow. It deliberately leaves current construct coverage at zero and leaves every reliability, calibration, utility, population, product, user-outcome, approval, build, and run claim unavailable.

Current authoritative status:

```text
document_status: proposed
protocol_revision: design-0.1
execution_status: not-run
participant_material_status: not-materialized
recruitment_status: not-authorized
participant_count: 0
card_cognitive_exposure_count: 0
raw_response_ontology_task_count: 0
mapping_comprehension_task_count: 0
cognitive_validation_result_status: none
p4_06a_status: protocol-proposed-results-missing
p4_06b_coverage_status: missing-current-eligible-count-zero
calibration_status: not-established
implementation_status: none
architecture_binding_status: none
approval_status: none
authority: none
```
