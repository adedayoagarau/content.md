---
title: Voice and tone human calibration instrument
status: proposed
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
instrument_id: VTHCI-SIBF-CHK-001
instrument_revision: design-0.1
execution_status: not-run
scope: Proposed Track A public-development/public-test calibration instrument for the exposed synthetic SIBF-CHK-001 checkout-recovery fixture; never Track B or private holdout
source_documents:
  - voice-tone-graph-and-measurement.md
  - shared-benchmark-fixture-specification.md
  - ../08-synthesis/candidate-system-model.md
  - ../05-technology/security-privacy-and-trust-boundaries.md
---

# Voice and tone human calibration instrument

## Result

**[Proposal]** Use independent, qualified human judgments to learn whether the proposed voice and tone dimensions are understandable, discriminable, and reliable within one versioned checkout-recovery context. The instrument keeps four questions separate:

1. Does each candidate first satisfy the applicable factual, semantic, structural, accessibility, privacy, and safety requirements?
2. Can raters consistently recognize an observable voice or tone construct in the same rendered context?
3. When two hard-eligible candidates differ, can raters compare one declared dimension without converting it into an overall preference?
4. Does the resulting human distribution support a narrowly scoped calibration profile, or should the dimension remain qualitative or research-only?

This instrument is **proposed and not run**. It creates no human ratings, reference winner, gold label, product fact, approved voice profile, approved tone policy, calibration result, release criterion, or product-quality claim. It does not authorize recruitment, recording, model processing, persistence, runtime execution, source mutation, publication, or release.

This instrument, `SIBF-CHK-001`, every candidate/packet it names, and its exposed evaluator are Track A public-development/calibration material. They are permanently non-B1/private-holdout-ineligible and cannot be promoted, resealed, renamed, or split into Track B. The historical 22-family allocation below is only a Track A `14 calibration / 8 public-test-analysis-locked` proposal; it is never a Track B split or private holdout.

Any future Track B calibration/evaluation instrument must use a new identity and derive its study ID, packet/candidate IDs, message families, split and denominators, locales/channels/surfaces, gold, and evaluator requirements from the exact approved Track B release manifest. No Track A value or identifier is a default, target, minimum, or B1 requirement.

The first exact seed packet is a pair of newly authored synthetic expressions for fixture state `F4b`. They are calibration stimuli, not canonical payment guidance or production copy. Their presence in this document does not make either candidate hard-eligible. The packet remains `pending_hard_eligibility` and `renderable_to_raters: false` until both exact candidate versions have independently persisted `PASS` evaluation records and the requested dimension has a `SUPPORTED` measurement-comparability result.

## Evidence and claim boundary

This instrument inherits the repository's canonical claim vocabulary. The instrument primarily uses:

- **[Proposal]** for a study procedure, construct, record, threshold, or acceptance rule that still requires validation;
- **[Product hypothesis]** for a pilot threshold or expected relation that is not a universal standard; and
- **[Open question]** for an unresolved methodological choice that must not be silently defaulted.

The grounding documents establish the following boundaries:

- The [voice and tone graph](voice-tone-graph-and-measurement.md#result) separates hard constraints from multidimensional soft measurement and preserves uncertainty.
- Its [pairwise protocol](voice-tone-graph-and-measurement.md#23-pairwise-comparisons) allows `A`, `B`, `indistinguishable`, `both_unacceptable`, and `insufficient_context`, admits only candidates with exact immutable hard-pass references, and never pools distinct dimensions into a latent universal quality rank.
- Its [human annotation protocol](voice-tone-graph-and-measurement.md#40-human-annotation-protocol) requires separate training material, qualified raters, counterbalanced order, retained rationales, pre-adjudication reliability, and accountable adjudication.
- The [shared fixture](shared-benchmark-fixture-specification.md#fixture-identity-and-bounded-product-story) supplies the fictional product, known behavior, deliberate unknowns, state matrix, structural obligations, and scope exclusions. This instrument adds no behavior to it.
- The [candidate system model](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records) keeps evidence, decision, delivery, approval, and evaluation records independent. Human ratings are evaluation evidence only.
- The [canonical security architecture](../05-technology/security-privacy-and-trust-boundaries.md#canonical-control-records-and-independent-evidencestate-dimensions) separates connection, data processing, persistence, telemetry, semantic approval, mutation approval, release approval, phase eligibility, and task authorization.

The agentic-evaluation principles used here are clear criteria, distinct evaluator responsibilities, structured outputs, logged trajectories, iteration limits, convergence checks, and analysis-locked public-test evaluation. A rater or later model judge is not treated as truth, an approver, or an authorization service.

## Study question and unit of analysis

**[Proposal]** The primary question is:

> Within one fixed semantic-message family, context, language, script, direction, locale, market, jurisdiction scope, surface, fixture revision, graph version, rule-set version, and rubric version, can qualified raters apply each proposed voice or tone construct with sufficient reliability and uncertainty discipline to support a fixture-scoped calibration profile?

The units must not collapse:

| Unit | Definition | Not equivalent to |
| --- | --- | --- |
| Semantic-message family | One stable content decision and job across its expressions | One literal string |
| Candidate | One exact, versioned expression for that message and context | A product, model, vendor, or approved decision |
| Hard-eligibility record | Immutable evaluation proving the exact candidate passed all required applicable hard checks | Measurement comparability, style fit, approval, or release |
| Dimension judgment | One rater's response to one construct card for one candidate pair | Overall preference or user outcome |
| Pairwise outcome | Relative judgment for one dimension and stratum | Absolute fitness, total quality, or cross-locale rank |
| Anchored fit band | Ordinal relation between one candidate and one research construct | Interval measurement or proof of an approved target |
| Calibration profile | Versioned evidence about a dimension, rater population, context stratum, and method | Voice canon, tone policy, or general human preference |

No observation may be generalized beyond its declared fixture, message family, state, risk, locale, surface, construct, rater scope, and instrument version.

## Non-goals

This instrument does not:

- ask which candidate is more likable, more persuasive, more on-brand overall, or more likely to convert;
- use one score to combine voice, tone, meaning, naturalness, accessibility, localization, privacy, or safety;
- infer an organization's voice from industry, corpus frequency, an existing string, or this fictional fixture;
- ask style raters to decide payment behavior, retry safety, legal applicability, approval, or release;
- infer user emotion, literacy, competence, or preference from locale, language, name, disability, age, nationality, dialect, or another demographic or proxy;
- treat English as the latent reference scale for `fr-CA`, `ar-EG`, or any later locale;
- use machine translation as a rating proxy or local-language acceptance record;
- produce a product winner, agent winner, or architecture mandate; or
- claim user comprehension, recovery success, trust, fairness, harm reduction, or accessibility conformance from expert ratings.

## Control and authority boundary

**[Proposal]** Every actual run must resolve its operations through the canonical capability and control model before any participant sees a packet or any record is retained.

| Proposed study action | Minimum control question | Failure disposition |
| --- | --- | --- |
| Assemble a packet from enrolled local synthetic files | Does exact static read have a current `discover.local` / `SEC-P0-A` result and exact current task grant? | Do not assemble; record `blocked_control` outside the rating corpus |
| Render or inspect a browser/build/state | Does the exact immutable runtime plan have a current `verify.runtime` / `SEC-P0-G` result and exact runtime-verification grant for an isolated profile? | Do not launch or attach; use an already authorized static packet or stop |
| Send any content to a model or external analysis service | Does the exact path have current `model.infer` or `research.external` / `SEC-P0-B`, an exact grant, and applicable data-processing records? | No egress; retain a human-only or local-only path |
| Use a connector | Is connection authorization current for the exact resource and is the individual read/write operation independently granted? | Do not connect or call |
| Retain a rating or report | Is the exact append covered by a scoped persistence decision and separately authorized inert-record append under the canonical draft-artifact boundary? | Return or destroy ephemerally; no silent storage |
| Emit telemetry | Does a current telemetry decision permit the exact event fields, destination, purpose, access, retention, and deletion? | Emit nothing; raw content telemetry is off |
| Modify fixture, graph, rule, voice profile, tone policy, or source content | Is there a separately governed change transaction with all applicable phase results, grants, approvals, expected-current checks, and readback? | Outside this instrument; deny |

The baseline does not authorize a third-party survey, shared document, or remote form. If a later collection path writes to an external service, the study owner must classify that exact effect and satisfy every additionally applicable connector/write phase, gate, task grant, connection, processing, persistence, telemetry, mutation, and readback control; the inert local-record append described above cannot be reused as remote-write authority.

For every operation, connection authorization, data-processing authorization, persistence, durable memory, telemetry, semantic-decision approval, mutation/change approval, release approval, phase result, and task grant remain different records. A participant's consent does not substitute for organizational processing authority or a task grant. A high agreement score does not approve a voice principle. An adjudication does not change delivery state. A rating never authorizes a write.

## Readiness gate

**[Proposal]** Recruitment and collection remain blocked until all rows pass. A row may be `ready`, `blocked`, or `not_applicable_with_recorded_rationale`; absence is not readiness.

| Readiness item | Required evidence before collection |
| --- | --- |
| Track A public calibration fixture | An exact released Track A public-development package, operator/exposed-evaluator hashes, fixed clock, message IDs, candidate IDs, source coordinates, and an explicit non-B1/non-private-holdout classification. No design approval or candidate package satisfies this row |
| Candidate eligibility | Two immutable, externally dereferenceable exact-candidate hard-pass records per pair, including candidate/context/graph/rule versions and required `PASS` check references |
| Comparability | A current profile returns `SUPPORTED` for the exact pair, dimension, locale, surface, context, and rubric versions |
| Instrument | Frozen construct cards, response rules, evidence-span rules, training key, randomization manifest, split manifest, and analysis plan |
| Raters | Eligibility, scope, conflicts, training, language/locale competence, and accessibility accommodations resolved without demographic proxies |
| Consent and privacy | Plain-language information, granular choices, withdrawal/deletion route, approved processing and persistence records, retention cutoff, and incident route |
| Locale | Original-language candidates, qualified review, direction/rendering evidence, terminology scope, and locale-specific construct anchors |
| Security | Applicable SEC-P0 results, exact task grants, isolated profiles, redaction, capture rules, bounds, cancellation, cleanup, and audit path |
| Independence | Candidate authors, product vendors, hard-gate reviewers, raters, adjudicators, and analysis owners have declared and managed conflicts |

No row can be waived by a good-looking candidate, participant availability, a deadline, or a previous run.

# Part I — Rater design

## Rater roles

**[Proposal]** Separate roles so one person does not silently supply every kind of authority:

| Role | Primary responsibility | Must not do in that role |
| --- | --- | --- |
| Study operator | Deliver consent and frozen packets; follow the allocation manifest | Explain which candidate is expected to win or alter stimuli after seeing ratings |
| Hard-eligibility reviewer | Verify product-behavior, semantic, structure, accessibility, privacy, and safety checks before pair admission | Convert style preference into a hard rule or rate soft dimensions for the same pair in the primary analysis |
| Voice/content rater | Apply one frozen construct card at a time; cite visible evidence; record uncertainty or abstention | Infer product facts, owner authority, approval, locale quality outside qualified scope, or user outcome |
| Locale rater | Rate in the exact language/locale and rendered context within declared competence | Judge through an English translation or speak for a demographic group |
| Specialist reviewer | Review domain, accessibility, privacy/security, or affected-community issues within exact expertise | Have dissent erased by a generalist majority |
| Data steward | Manage consent linkage, pseudonymization, access, retention, withdrawal, and deletion | Judge candidates or expose identity to analysts unnecessarily |
| Analyst | Compute preregistered reliability, order effects, pairwise models, uncertainty, and analysis-locked public-test metrics | Change the rubric, exclusions, split, or stopping rule after seeing public-test results |
| Adjudicator | Classify disagreement and decide whether the rubric, fixture, context, or expertise is insufficient | Rewrite original ratings, inflate pre-adjudication agreement, or create a compromise score |

## Rater eligibility

**[Proposal]** Eligibility is demonstrated and dimension-specific, not inferred from title, employer, nationality, age, or years alone. A primary voice/content rater must:

1. demonstrate recent practice making or reviewing product-content decisions in context, including state, consequence, action, recovery, and constraints;
2. explain the distinction between organization voice, situational tone, meaning preservation, naturalness, accessibility, localization, and personal preference;
3. complete the frozen training module on material that is outside both Track A calibration and analysis-locked public-test splits;
4. answer every boundary item correctly: hard eligibility before style, `indistinguishable` versus `both_unacceptable`, `insufficient_context` versus procedural abstention, and evaluation versus approval;
5. meet the preregistered construct-card qualification rule on the separate training set;
6. declare languages, locales, surfaces, domains, accessibility methods, and constructs they can judge directly;
7. disclose candidate authorship, vendor/product relationships, financial interests, advocacy roles, and other relevant conflicts; and
8. accept the consent and data-use boundary for the exact run.

The qualification record carries only evidence needed for assignment. It does not collect nationality, ethnicity, gender, disability diagnosis, age, or other protected attributes merely to infer style competence.

### Primary pilot staffing

**[Product hypothesis]** Assign at least three independent qualified raters to every eligible pair/dimension in the initial `en-US` pilot. This exceeds the graph model's two-rater minimum and avoids making a single disagreement look like consensus. A pair/dimension with fewer than three completed eligible ratings may remain descriptive but cannot satisfy this instrument's comparative acceptance criteria.

The hard plane separately requires the accountable checkout-behavior, accessibility, privacy/security, and structural expertise for the applicable checks. Those specialists do not become voice/tone raters by virtue of their domain role. Conversely, voice/tone raters do not decide hard product truth.

## Conflict and independence rules

- A candidate author, system vendor employee, evaluator-package author, or person who saw the sealed analysis key is excluded from the primary blinded rating for that candidate. Their separately identified diagnostic review may be retained outside the primary denominator.
- Raters do not see other raters' judgments, adjudication, model scores, candidate provenance, or system identity before locking their own records.
- The person who changes a construct card after Track A calibration cannot analyze the untouched analysis-locked public-test set without an independent verification of the frozen version and exclusions.
- A specialist may serve more than one role only when the roles are recorded, the judgments remain independently authored and locked, and the primary comparison does not count duplicated identity as independent raters.
- Compensation, continued participation, and future work must not depend on selecting a particular candidate or agreeing with the study owner.

## Consent and privacy boundary

**[Proposal]** Use a plain-language study notice and record each permission independently before screening or collection. Minimum choices are:

| Choice | Meaning | Default if absent |
| --- | --- | --- |
| `participation` | Take part in this exact synthetic calibration study | `no`; no session |
| `rating_and_notes` | Retain pseudonymous responses, evidence spans, and short rationales | `no`; no research record |
| `session_recording` | Record audio/video/screen beyond the rating record | `no`; not needed for the baseline instrument |
| `named_model_processing` | Send declared rating fields to a named model/provider under the stated path | `no`; human-only analysis remains available |
| `future_benchmark_reuse` | Reuse de-identified ratings in later benchmark versions | `no`; current-study use only |
| `quotation` | Reuse a de-identified rationale excerpt | `no` |
| `attribution` | Associate a name or public role with a contribution | `no`; attribution is unnecessary for primary analysis |

The notice must state:

- the study purpose and that all product material is synthetic;
- the exact data collected, why, who can access it, and what is not collected;
- provider, subprocessor, region, transfer, training/improvement, retention, backup, deletion, and rights details for every processing path;
- that participation is voluntary and questions may be skipped;
- that consent does not waive employer, client, or professional confidentiality;
- that no real customer, payment, account, credential, employer, or proprietary content should be introduced;
- how to withdraw, request correction, or request deletion before the declared de-linking/analysis cutoff;
- what cannot be withdrawn after a validly disclosed irreversible de-identification step, if any; and
- the incident contact and accessible alternative format.

### Data minimization

The primary dataset contains only:

- a pseudonymous rater ID held separately from contact/payment records;
- versioned eligibility and qualified-scope fields;
- consent-record reference and current permission states;
- conflict and blindness flags;
- packet, dimension, order-allocation, and response records;
- exact evidence spans and concise rationales; and
- study timestamps needed for sequence and integrity checks.

Do not retain raw recruitment correspondence, identity documents, demographic profiles, unrelated free text, clipboard contents, browser history, full-screen captures, or participant audio/video in the baseline path. Accommodations are recorded only as the functional support requested, not a diagnosis.

### Participant stop rules

Stop the session immediately when consent is absent, ambiguous, withdrawn, or contradicted; the participant introduces real or proprietary material; a hidden identity or conflict makes blinding invalid; an accessibility need cannot be supported; the approved processing path changes; the participant experiences distress; or the operator cannot explain the data boundary. A stopped session does not become a negative rating.

# Part II — Exact candidate-pair packet

## Packet identity and state

**[Proposal]** The first fixed seed is:

| Field | Exact value |
| --- | --- |
| Packet ID | `CP-SIBF-CHK-001-F4B-en-US-web-001` |
| Packet revision | `design-0.1` |
| Instrument | `VTHCI-SIBF-CHK-001/design-0.1` |
| Fixture | `SIBF-CHK-001/design-0.1` |
| Intended split | Track A `calibration` only; never a public-test-analysis-locked item, Track B item, or private holdout |
| Fixture state | `F4b offline after commit` |
| Language/script/direction | `en` / `Latn` / `ltr` |
| Locale | `en-US` |
| Market/jurisdiction | `US` / unresolved; no jurisdictional instrument may be inferred |
| Channel/surface | Responsive desktop web, `/checkout/recover`, unknown-result variant |
| Packet state | `pending_hard_eligibility` |
| Renderable to raters | `false` |
| Reference winner | none |
| Ratings | none |

The intended split does not claim that the fixture, semantic-message ID, candidates, or split manifest have been materialized. The packet may enter the calibration set only after all exact identifiers, hashes, hard-pass references, control records, and comparability records are frozen.

## Rater-visible context panel

The following text is shown verbatim after the packet becomes eligible:

> **Fictional checkout context**
>
> A guest shopper is on the checkout recovery page after losing connectivity during submission. The submission may have reached the synthetic payment service. The system cannot yet establish the payment and order outcome. Submitting another payment while the outcome is unknown could create a duplicate commitment. When connectivity returns, the shopper can check the status of the existing attempt. The web recovery status is the canonical status.
>
> Judge only the named dimension on the next card. Do not infer whether the payment failed, completed, will be reversed, will become an order, how long an authorization might appear, or when support will respond.

This panel paraphrases only `BF-03`, `BF-05`, `BF-07`, `F4b`, and the declared unknowns/exclusions in the [fixture](shared-benchmark-fixture-specification.md#known-behavior-packet). It does not add a provider, duration, guarantee, refund, reversal, support promise, or jurisdictional conclusion.

## Exact candidate stimuli

The candidates are synthetic research stimuli. Candidate IDs remain hidden from raters; presentation labels are assigned by the sealed allocation manifest.

### Candidate `cand-f4b-a/design-0.1`

| Slot | Exact stimulus |
| --- | --- |
| Headline | `We couldn't confirm the payment` |
| Body | `You're offline, and the payment status is unknown. When you're back online, check the status. Don't submit another payment yet.` |
| Visible action | `Check status` |
| Accessible action name | `Check status` |

### Candidate `cand-f4b-b/design-0.1`

| Slot | Exact stimulus |
| --- | --- |
| Headline | `Payment status is unknown` |
| Body | `Don't submit another payment yet. When you're back online, check this attempt's status.` |
| Visible action | `Check status` |
| Accessible action name | `Check status` |

Neither candidate is a reference answer. The study owner must not edit either string after allocation begins. Any text change creates a new candidate version, invalidates its previous pass/comparability references, and requires a new split and leakage review.

## Hard factual and safety eligibility before style

**[Proposal]** A deterministic or specialist hard-eligibility process must answer the following candidate-specific questions under an exact frozen rule-set version. These are pre-rating eligibility questions, not approved production rules merely because they appear here.

| Check ID | Required question | Source boundary |
| --- | --- | --- |
| `HC-F4B-01` | Does the candidate preserve that the payment/order outcome is unknown rather than failed, completed, refunded, reversed, or guaranteed? | `BF-03`, `BF-05`, `F4b`, `U-02` |
| `HC-F4B-02` | Does the candidate avoid offering or implying a new payment submission while the state remains unknown? | `BF-03`, `F4b`, hard probe 2 |
| `HC-F4B-03` | Does the next action point to the existing status path when connectivity returns? | `BF-05`, `F4b` |
| `HC-F4B-04` | Does the candidate avoid an invented hold duration, reversal/refund promise, later-order promise, jurisdictional rule, or support time? | `U-01`–`U-04` |
| `HC-F4B-05` | Are headline, body, visible action, and accessible action bound to the same exact candidate and semantic-message context, with the visible and accessible action names aligned? | `F4b`, accessibility contract, graph identity invariants |
| `HC-F4B-06` | Are variables, markup, locale, surface, and runtime-condition bindings complete for the materialized occurrence, with no hidden sensitive detail? | fixture structure, accessibility, privacy, and graph context |
| `HC-F4B-07` | Do candidate, context, graph, fixture, rule-set, semantic-message, and evaluation-record IDs, versions, hashes, and required check references reconcile exactly? | graph comparison eligibility and canonical control model |

Admission requires:

```text
candidate A exact hard gate = PASS
and candidate B exact hard gate = PASS
and every required applicable check reference = PASS
and both immutable pass-record references dereference and rehash
and measurement comparability for the requested dimension = SUPPORTED
```

`FAIL`, `UNKNOWN`, `NOT_APPLICABLE`, a missing record, a stale record, a mismatched version/hash/scope, an unverified append, or `UNSUPPORTED`/`UNKNOWN` comparability blocks the dimension card. `not_run` and `pending_hard_eligibility` are execution/packet states, never hard-gate or comparability results. Until evaluation occurs, canonical hard-gate and comparability result fields are null rather than populated with a workflow label. A caller-provided boolean or rater assurance is insufficient. Hard eligibility and measurement comparability remain independent.

If a rater later suspects a factual or safety defect, they do not silently override the pass record. They set `hard_issue_suspected: true`, cite the exact span and concern, and the pair is quarantined from comparative analysis pending independent hard-plane review.

## Verbatim rater instructions

Show this text before the first dimension card:

> You will compare two proposed versions of the same fictional checkout message. The presentation order is randomized. Product and author identity are hidden. Both versions must have passed a separate factual and safety review before this screen is available.
>
> Rate one named dimension at a time. Do not choose the version you like overall. First rate how well each version fits the current dimension. Then choose the pairwise outcome for that dimension only.
>
> Choose `indistinguishable` when there is no meaningful difference on this dimension. Choose `both unacceptable` when both are unsuitable on this dimension even if they differ. Choose `insufficient context` when the packet does not support the judgment. Use procedural abstention when the dimension is outside your qualified scope, you have a conflict, the presentation is inaccessible, or blinding has failed.
>
> Cite the words or slots that support your judgment. Do not infer missing product behavior, user emotion, culture, authority, approval, implementation, or outcome. There is no expected winner.

## Construct cards

**[Proposal]** Present exactly one card at a time. Card IDs and definitions are versioned independently. The direction column defines the construct; it does not mean that the maximum value is always desirable in another context.

| Card ID | Plane | Construct and direction | Exact pairwise question | Positive anchor in this context | Negative anchor in this context |
| --- | --- | --- | --- | --- | --- |
| `VT-D01` | Organization-voice behavior | `direct_actual_state`: more direct about what is known and unknown | Which candidate more directly represents the actual known/unknown state without overclaiming? | Names the unresolved status plainly and distinguishes it from a confirmed outcome | Generic error, euphemism, or an unearned failed/completed claim |
| `VT-D02` | Organization-voice behavior | `agency_support`: more support for the person's valid next action without coercion | Which candidate better preserves agency by making the valid status action clear without inviting a new payment? | Clear existing-attempt status path and no unsafe fresh submission | No usable next action, coercion, or a retry that could duplicate commitment |
| `VT-D03` | Situational tone | `explicitness`: more explicit about the material consequence and action boundary | Which candidate makes the consequence and no-new-payment boundary more explicit? | The unknown status and temporary no-new-payment boundary are unmistakable | The risk is buried, vague, or dependent on inference |
| `VT-D04` | Situational tone | `expressive_restraint`: more restrained under consequential financial uncertainty | Which candidate uses more proportionate expressive restraint for this uncertain payment state? | Plain, controlled language without humor, celebration, flourish, or dramatic alarm | Playful, celebratory, metaphorical, overly emotive, or alarmist treatment |
| `VT-D05` | Situational tone | `uncertainty_calibration`: more faithful expression of the exact uncertainty | Which candidate better calibrates uncertainty without false certainty or vague hedging? | States the unresolved status at the supported level and no further | Converts unknown into failed/completed, promises a result, or obscures the uncertainty |
| `VT-D06` | Situational tone | `accountability_nonblaming`: more accurate allocation of responsibility without blaming the shopper | Which candidate better avoids blaming the shopper while still making the system state and next step clear? | Describes the state and available action without assigning fault or presumed incompetence | Blames, scolds, patronizes, or hides the system's inability to confirm the outcome |
| `VT-D07` | Independent language quality | `naturalness_en_us_web`: more natural for the exact `en-US` responsive-web recovery context | Which candidate sounds more natural and usable in this exact locale and surface while preserving the same meaning? | Idiomatic, coherent, scannable language for the complete rendered message | Awkward, fragmentary, ambiguous, or register-inappropriate language |

`VT-D01` and `VT-D02` are observable behaviors associated with a proposed voice principle. A set-level organization-voice conclusion requires a context-balanced corpus; no single pair certifies voice. `VT-D03`–`VT-D06` are context-conditioned tone constructs. `VT-D07` is deliberately independent: naturalness cannot rescue a hard failure or substitute for voice/tone fit.

## Anchored candidate fit bands

For each card, rate each candidate separately before the pairwise outcome:

| Raw value | Wire label | Exact interpretation |
| ---: | --- | --- |
| `0` | `clear_mismatch` | Direct evidence conflicts with the card's positive anchor or enacts its negative anchor materially |
| `1` | `substantial_mismatch` | More evidence falls outside than inside the defined construct for this context |
| `2` | `mixed_or_borderline` | Material evidence points in both directions, or the fit sits at an unresolved boundary |
| `3` | `plausible_fit` | The candidate is consistent with the construct; any limitation is minor and named |
| `4` | `clear_fit` | The candidate clearly and consistently enacts the construct in the complete packet |
| null | `not_rateable` | The rater cannot validly apply this construct; a reason is required |

The scale is ordinal. Do not assume equal psychological distance between values or average it across dimensions. A later graph adapter may apply the graph's documented endpoint normalization within this exact rubric, but it must retain the raw value and may not use normalization to claim cross-construct, cross-context, or cross-locale comparability.

## Pairwise outcomes, ties, and abstentions

The canonical dimension outcome is exactly one of:

| Outcome | Meaning | Not the same as |
| --- | --- | --- |
| `A` | Candidate A is better on this dimension | Overall winner or approval |
| `B` | Candidate B is better on this dimension | Overall winner or approval |
| `indistinguishable` | No meaningful difference on this dimension | Both candidates failing |
| `both_unacceptable` | Neither candidate is acceptable on this dimension | A tie between acceptable alternatives |
| `insufficient_context` | The packet lacks information needed to judge this dimension | Procedural conflict or lack of rater competence |

Procedural abstention is stored separately:

- `outside_qualified_scope`;
- `conflict_of_interest`;
- `blindness_breach`;
- `inaccessible_presentation`;
- `locale_or_language_unsupported`;
- `technical_failure`;
- `consent_withdrawn`; or
- `other_declared_reason` with minimized explanation.

An abstained response has no pairwise outcome and no candidate fit bands. `insufficient_context` is a substantive submitted judgment about the packet, but it always carries two null/`not_rateable` fit bands, `ordinal_uncertainty: 0`, and at least one typed `missing_context_fields` entry. This deterministic encoding prevents a rater from assigning candidate fit after declaring that the comparison lacks the context needed for the dimension.

## Ordinal judgment uncertainty

**[Proposal]** Do not ask for an uncalibrated numeric probability. Record one ordinal, rater-reported judgment-certainty value:

| Raw value | Wire label | Exact anchor |
| ---: | --- | --- |
| `0` | `unrateable` | No valid candidate comparison; required for procedural abstention and `insufficient_context` |
| `1` | `tentative` | The rater can make a provisional judgment, but a plausible packet clarification could reverse it |
| `2` | `supported` | The judgment is clear enough from the packet; remaining uncertainty is named and unlikely to reverse it |
| `3` | `strongly_supported` | Direct, salient evidence under the card anchors makes reversal unlikely within this exact context |

This field is not evidence strength, product uncertainty, model probability, inter-rater reliability, or approval confidence. It is not averaged into the fit bands. For `A`, `B`, `indistinguishable`, or `both_unacceptable`, values `1`–`3` are allowed and a short uncertainty reason is required. For `insufficient_context` and procedural abstention, value `0` is required. Any other combination fails record validation.

## Evidence spans and rationale

Every `A`, `B`, `indistinguishable`, or `both_unacceptable` response includes:

- at least one exact candidate slot or substring that supports the judgment;
- candidate side and displayed position as seen by the rater;
- a concise rationale tied only to the construct card;
- a named uncertainty or `none_observed`;
- whether a possible hard-plane issue was noticed; and
- whether the presentation, identity masking, or context appeared defective.

An `insufficient_context` response instead includes one or more typed missing fields, a concise explanation of why each is necessary for this dimension, any visible span that exposes the gap, and the same defect/hard-issue flags. It cannot fabricate an evidence span for absent information.

Evidence spans do not become product facts. A rationale may explain a judgment but cannot appoint an owner, infer an approval, or change the fixture.

# Part III — Administration and bias controls

## Sequence for one rating session

**[Proposal]** Use this order:

1. confirm current consent and accommodation;
2. load the frozen study, fixture, split, packet, rubric, and allocation versions;
3. verify rater eligibility for the assigned dimensions and locale;
4. verify that the packet is `ready_for_rating`, both hard-pass references revalidate, and dimension comparability is `SUPPORTED`;
5. show the context panel once and allow it to remain available;
6. for each construct card, show the two candidates in the assigned order;
7. collect candidate A and B fit bands independently;
8. collect the five-outcome pairwise response or procedural abstention;
9. collect ordinal judgment uncertainty, evidence spans, rationale, and defect flags;
10. lock the raw response before moving to the next card;
11. complete the assigned cards without showing previous raters or aggregate results;
12. offer a final instrument-feedback field that is stored separately from candidate ratings; and
13. confirm the withdrawal/contact route and dispose of any ephemeral session data outside the approved record.

Fit-band ratings precede pairwise response to reduce hindsight rationalization. No overall-winner question appears before or after the cards.

## Blinding

- Replace candidate, author, model, product, and vendor identity with neutral presentation labels.
- Retain only context required for the construct; remove marketing copy, price/tier, prior scores, popularity, and system claims.
- Do not alter language, layout, hierarchy, accessible semantics, or message structure merely to hide identity.
- When identity is inferable from wording or behavior, record `blindness_breach`; do not pretend the packet is blinded.
- The operator sees the allocation needed to deliver the task but not any expected result, because none exists.
- Analysts receive pseudonymous rating records and sealed candidate mappings only after raw records lock.

## Order randomization and counterbalancing

**[Proposal]** Create and hash the complete allocation manifest before recruitment. It must satisfy:

1. For every pair/dimension, candidate A appears left and right equally often; with an odd assigned rater count, the imbalance is at most one.
2. Dimension-card order uses a balanced schedule so each card appears in early, middle, and late positions across raters.
3. Rater assignment is blocked by declared locale and qualified scope, not demographic identity.
4. A rater sees one presentation order for a given pair/dimension; mirrored records come from independently assigned raters rather than an immediate same-person repetition.
5. Any predeclared masked-repeat subset is separated enough to reduce recall and is analyzed as a stability diagnostic, not added as an independent unit.
6. Allocation never adapts to emerging candidate scores, disagreement, or desired balance after collection starts.
7. The raw response records displayed side and label. Candidate mapping occurs only in a separate derived mapping record after the raw response is locked.

Report side counts, card-position counts, deviations, order effects, and any mapping failure. A materially meaningful side or sequence effect blocks a stable comparative claim until the design is revised and rerun under a new instrument version.

## Anti-stereotype controls

**[Proposal]** Apply these controls before, during, and after collection:

- Candidate context contains event, state, consequence, action, uncertainty, surface, and locale facts—not protected attributes or demographic proxies.
- Names, pronouns, dialect markers, nationality, age cues, disability cues, and other proxies cannot change tone targets unless an explicit functional or rights-related requirement, evidence, purpose, and review justify the exact difference.
- Raters are never asked to infer how a demographic group “likes to be spoken to.”
- `naturalness` is scoped to a declared task/register and must not treat dialect as defective by default.
- No card asks whether a person is anxious, confused, happy, devastated, less expert, or more vulnerable based on identity or trace behavior.
- A counterfactual protected/proxy swap is a separate invariance test. It does not ask raters to rank groups or generate culture scores.
- Any justified functional difference remains local to its exact requirement and is not generalized into organization voice or national personality.
- Dissent from qualified locale, accessibility, or affected-community expertise is retained and routed; it is not erased by majority vote.

For an invariance pair, preserve semantic message, event, consequence, action, locale, surface, and structure. If the swap makes the expression unnatural or changes identity-relevant meaning, invalidate the counterfactual rather than interpreting a rating difference as bias.

## Accessible administration

The rating interface and packet must support keyboard and alternative input, visible focus, semantic headings, table alternatives, zoom/reflow, high contrast, reduced motion, and screen-reader access. Candidate visible and accessible text must remain distinct fields when the fixture requires it. The system must not expose more sensitive detail through hidden text or accessibility metadata. If equivalent administration cannot be provided, record `inaccessible_presentation` and do not turn the missing rating into disagreement.

# Part IV — Multilingual branch

## Locale readiness

**[Proposal]** The baseline exact seed is `en-US` only. A `fr-CA` or `ar-EG` branch remains `unsupported_locale` until all of the following exist for the exact message family:

1. independently authored or qualified-reviewed original-language candidates, with language, script, direction, locale, market, and jurisdiction recorded independently and unknown jurisdiction preserved explicitly;
2. immutable source and derived-record lineage, including any translation/adaptation method;
3. exact variables, ICU selectors/branches, markup, language tags, direction, and bidi-sensitive boundaries;
4. locale-specific terminology and surface context;
5. hard-pass records for each exact locale candidate;
6. `SUPPORTED` comparability within that locale/dimension/rubric version;
7. construct cards written or adapted in the rating language and reviewed for conceptual rather than literal equivalence;
8. at least three independent qualified raters for the pilot branch; and
9. a locale-specific reliability and limitation report.

Language and locale competence are evidenced through direct professional or community practice and the frozen qualification exercise, not nationality or a machine score. A rater may qualify for one construct or surface and not another.

## Multilingual administration

- Present complete original-language strings in their intended direction and rendered slot structure.
- Do not ask a rater to judge `fr-CA` or `ar-EG` through an English back-translation.
- Preserve the original record and any translation/adaptation as separate, linked, immutable records.
- Ask semantic obligation, terminology, naturalness, pragmatic fit, and voice/tone questions separately.
- Use in-language anchors and examples. Do not reuse English length, politeness, formality, warmth, or naturalness thresholds.
- Record language, script, direction, locale, market, jurisdiction or explicit jurisdiction-unknown status, surface, message family, rubric, and rater-language scope on every rating and calibration profile.
- Analyze reliability within locale first. Do not pool ratings into a global rank.
- Return `unsupported_locale` rather than falling back to English when the required evidence is absent.

## Cross-locale comparison gate

**[Open question]** This instrument does not establish measurement invariance across locales. A later protocol must preregister common anchor scenarios, adapted-item review, local-rater evidence, and differential-item or appropriate multi-group analysis. Until that protocol passes, raw fit bands, normalized values, pairwise utilities, and reliability estimates are not comparable across locales.

# Part V — Split, calibration, and analysis

## Development, calibration, and analysis-locked public-test separation

**[Proposal]** Split by semantic-message family, never by individual string or rating. Every candidate, paraphrase, locale expression, surface form, and counterfactual for one semantic message stays in the same split.

| Track A public calibration split | Purpose | May change the instrument? | May support a reported analysis-locked public-test claim? |
| --- | --- | --- | --- |
| Separate training/development material | Teach boundaries and construct cards; test rater qualification | Yes | No |
| Calibration | Revise card wording, anchors, rating procedure, automated-model mapping, and pilot thresholds | Yes, but every change creates a new instrument/calibration version | No |
| Public test — analysis locked | Evaluate the frozen Track A instrument and any frozen automated prediction after calibration locks | No | Yes, only as disclosed Track A public-test/calibration evidence within exact scope and limitations; never as private holdout or B1 evidence |

The exposed Track A design contains a historical 22-semantic-message target. **[Proposal]** Its public calibration split would allocate 14 complete families to Track A calibration and 8 to Track A public test under an analysis lock, stratified as far as the material permits by state, consequence, risk, surface, and locale. `CP-SIBF-CHK-001-F4B-en-US-web-001` is forced into Track A calibration because its complete text is public in this document. The remaining Track A mapping would be created once from a declared seed, reviewed without response data, hashed, analysis-locked, and never repaired after scores are visible. This `22 → 14/8` allocation is public-test/calibration-only, never Track B, private holdout, or B1 evidence.

This Track A 14/8 allocation is a public calibration design target, not a claim that 22 materialized, pair-eligible families exist or that every dimension applies to every channel and surface. Before ratings, the Track A split manifest separately freezes the full applicable-family denominator for each exact dimension/language/locale/surface/risk stratum. A Track A calibration claim requires at least 10 applicable semantic-message families in that stratum, with at least 6 assigned to calibration and 4 to analysis-locked public test. Every family declared applicable in that stratum must supply at least one eligible comparable pair with the required rater coverage; an unavailable applicable family stays in the denominator and blocks calibration. A genuinely inapplicable family is excluded only through a pre-rating, evidence-linked applicability record and cannot be invented merely to meet the count. No family is replaced after outcome inspection. If the final Track A material cannot support the minimum and complete applicable denominator, the dimension remains `research_only` or this public instrument version is revised before collection; no result advances Track A toward B1.

Track A and this exposed instrument can never function as a private holdout or B1 input. A future Track B requires a new fixture/instrument/study identity, independently authored message families and traps, an independently established split and denominators from its exact approved release manifest, sealed access, and a leakage register; Track A cannot be promoted or split into it.

## Dimension-by-dimension analysis

Do not compute a universal total. For every dimension and comparable stratum, report:

- number of semantic-message families, candidate pairs, raters, completed responses, substantive `insufficient_context` judgments, and procedural abstentions;
- fit-band distributions by candidate, without assuming interval distances;
- pairwise outcome counts including ties and both-unacceptable results;
- evidence-span coverage and defect/hard-issue flags;
- raw agreement, category prevalence, confusion table, and pre-adjudication reliability with interval;
- side, card-position, rater, and message-family effects;
- disagreement taxonomy and post-adjudication disposition, without replacing originals;
- comparison-graph connectivity, cycles, and disconnected components; and
- limitations, exclusions, invalidations, and unsupported strata.

## Inter-rater reliability

**[Proposal]** Use statistics that match the record type:

| Record | Primary statistic | Required companion evidence |
| --- | --- | --- |
| Five-outcome pairwise response | Krippendorff alpha with nominal distance | Raw agreement, full confusion table, category prevalence, missingness/abstentions, clustered interval |
| Candidate fit band `0`–`4` | Krippendorff alpha with declared ordinal distance | Per-band counts, adjacent versus large disagreements, clustered interval |
| Ordinal judgment certainty `0`–`3` | Ordinal alpha as a diagnostic only | Distribution by outcome and abstention reason; never used as correctness |
| Complete candidate rank, only if actually collected later | Appropriate concordance statistic | Do not synthesize a full rank from partial pairwise data |

Cluster or bootstrap by semantic-message family because candidates and raters share contexts. Report the resampling method, unit, strata, sample sizes, distance function, missingness, and interval. Adjudication happens after reliability is computed and cannot improve the pre-adjudication statistic.

**[Product hypothesis]** A lower confidence bound below `0.67` for a contextual voice/tone dimension triggers revision of the card, anchors, packet, sampling, or training before that dimension supports comparative claims. If a deterministic high-risk annotation is later added to the instrument, its lower-bound target is at least `0.80` and every disagreement receives direct adjudication. These are inherited pilot hypotheses, not universal standards.

High agreement is not construct validity, product truth, user success, approval, or fairness. Low agreement may reveal a rubric defect, context defect, prevalence problem, genuine expert disagreement, heterogeneous locale/surface strata, or insufficient rater qualification.

## Pairwise model

**[Proposal]** For decisive `A`/`B` judgments within one connected dimension and comparable stratum, a Bradley–Terry model may estimate relative candidate utilities:

```text
P(A preferred to B | dimension, stratum)
  = exp(theta_A) / (exp(theta_A) + exp(theta_B))
```

Fix an anchor or sum-to-zero constraint. Report standard errors or message-clustered intervals and analysis-locked public-test pairwise log loss. Test side and rater effects under a preregistered extension. Use a declared tie-capable extension or separate tie analysis for `indistinguishable`; never relabel ties as half a win without justification. `both_unacceptable`, `insufficient_context`, and procedural abstentions remain separate and are not converted to ties.

Do not publish one global ranking when the graph is disconnected or strata differ in dimension, state, risk, locale, surface, or rubric version. Inspect cycles and context interactions rather than forcing transitivity. Do not pool `VT-D01`–`VT-D07` into one latent quality rank.

## Calibration of an automated evaluator

If a later model predicts a clearly defined event such as `qualified raters mark candidate outside the target band for VT-D03`, then:

1. define the event and prediction unit before fitting;
2. fit any threshold, temperature, interval, or mapping only on calibration data;
3. freeze graph, prompt, model, features, rules, normalization, rubric, and calibration versions;
4. evaluate untouched Track A analysis-locked public-test families once under the preregistered plan;
5. report Brier score, reliability table/diagram, bin counts, interval coverage, discrimination, and context-stratified errors; and
6. label the predictor `uncalibrated` or `unsupported_scope` when direct analysis-locked public-test evidence is absent.

Repeated model runs are not independent human evidence. A correlation with mean ratings is not calibrated scale agreement. Any material fixture, model, prompt, feature, rubric, locale, or surface change invalidates the affected calibration profile until re-evaluated.

## Disagreement and adjudication

**[Proposal]** Preserve every original record. Trigger review when:

- candidate fit bands differ by two or more ordinal points;
- pairwise outcomes identify different winners;
- `indistinguishable`, `both_unacceptable`, or `insufficient_context` conflicts materially with decisive responses;
- high rater certainty conflicts with abstention or a possible hard issue;
- evidence spans point to different slots or meanings;
- a locale, accessibility, domain, privacy/security, or affected-community specialist raises a scoped concern;
- candidate identity or presentation order appears to affect the result; or
- the packet, fixture, card, hard-pass record, or comparability profile may be defective.

The adjudication record may return:

- `one_interpretation_supported_for_exact_scope`;
- `both_interpretations_valid_different_scope`;
- `both_candidates_unacceptable`;
- `insufficient_context`;
- `rubric_defect`;
- `fixture_or_packet_defect`;
- `hard_eligibility_reopen`;
- `measurement_not_comparable`; or
- `needs_qualified_human_decision`.

It does not manufacture an average, erase dissent, relabel a proposal as approved, or retroactively alter reliability. A majority cannot overrule the expertise required for product behavior, accessibility, locale, privacy/security, or affected-community harm.

## Stopping, invalidation, and convergence rules

### Stop or pause collection immediately

- consent, processing authority, persistence authority, phase eligibility, task grant, or revocation status is missing or changes;
- a candidate hard-pass record or comparability profile fails revalidation;
- a real secret, personal datum, payment credential, customer record, or proprietary artifact appears;
- the packet, allocation, split, or rubric version differs from the frozen manifest;
- a participant cannot access the material equivalently;
- a candidate mapping is exposed before raw responses lock;
- a suspected hard factual/safety defect appears;
- unplanned model, connector, network, telemetry, recording, download, or persistence occurs; or
- the participant withdraws or the operator cannot maintain the privacy boundary.

### Stop analysis for a dimension

- the comparison graph is disconnected for the intended claim;
- the locale or surface is unsupported;
- order or card-position effects are materially meaningful under the preregistered tolerance;
- required evidence spans are systematically absent or invalid;
- the lower reliability bound misses the pilot target after one preregistered rubric-revision cycle;
- calibration performance fails to improve under the preregistered iteration limit; or
- the Track A analysis-locked public-test split has been inspected before the instrument and calibration profile are frozen.

The evaluator–optimizer cycle is bounded: one initial calibration collection, one documented rubric/context revision when triggered, and one new-version calibration rerun. If the dimension still misses the acceptance hypothesis, mark it `research_only` and stop optimizing against the same participants or items. Do not continue sampling until the preferred result appears.

### Complete collection only when

- the preregistered eligible pair/dimension assignments have terminal states;
- every enrolled rater has a terminal consent/session state;
- every raw record is locked, every missing record has a reason, and cleanup is reconciled;
- the Track A analysis-locked public-test set remains untouched until the frozen analysis begins; and
- no unresolved privacy, security, source-integrity, allocation, hard-gate, or cleanup incident remains in a supposedly valid run.

# Part VI — Typed record contract

## Record families

**[Proposal]** Store each family separately and immutably. Correction creates a superseding record; it never overwrites history.

| Record family | Minimum fields |
| --- | --- |
| `CalibrationStudyDefinitionRecord` | Study/instrument/fixture versions; execution state; construct-card IDs; rater design; split and allocation manifest references; analysis and stopping-plan versions; control and privacy references; timestamps |
| `RaterQualificationRecord` | Pseudonymous rater ID; consent reference; declared dimension/locale/surface scope; qualification evidence; training version/result; conflicts; accommodations; eligibility and limitations |
| `CandidatePairPacketRecord` | Packet ID/version; fixture/message/context/candidate IDs and versions; language, script, direction, locale, market, jurisdiction or explicit unknown; surface and message family; exact slot content; split; hard-pass references or separate packet execution state with null canonical results; comparability per dimension; rendered-profile reference; renderable flag |
| `PresentationAssignmentRecord` | Packet/dimension/rater block; displayed labels and sides; card position; allocation-manifest version/hash; no expected answer |
| `HumanDimensionRatingRecord` | Locked raw display-level response; language, script, direction, locale, market, jurisdiction or explicit unknown, surface, and message family; candidate fit bands; pairwise outcome or abstention; ordinal uncertainty; evidence spans or missing-context fields; rationale; defect/hard-issue flags; blindness; timestamps |
| `RatingMappingRecord` | Locked raw-rating reference; sealed presentation assignment; canonical candidate mapping; derived canonical outcome; mapping validator/version; no modification of raw record |
| `ReliabilityReportRecord` | Exact record set and exclusions; statistic/distance; unit/strata; sample counts; missingness; raw agreement; alpha/interval; disagreements; limitations; acceptance effect |
| `PairwiseModelReportRecord` | Dimension/stratum; connected components; decisive/tie/other counts; model/version; utilities/intervals; side/rater effects; analysis-locked public-test loss; limits |
| `CalibrationProfileCandidateRecord` | Construct; language, script, direction, locale, market, jurisdiction or explicit unknown, surface, and message-family scope; graph/rule/rubric/model versions; Track A calibration and analysis-locked public-test references; performance and intervals; support status; invalidation triggers; never an approval |
| `CalibrationAdjudicationRecord` | Immutable input IDs/hashes; trigger; accountable expertise; disposition; rationale; preserved dissent; human-review route; no rewritten originals |
| `CalibrationAuditEvent` | Actor/workload; exact operation; mode/phase/gate/grant; applicable control records; result/denial; record hashes; cleanup/incident linkage; no raw content by default |

## Shared record requirements

Every persisted record includes:

- `schema_version`, stable record ID, record version, creation timestamp, producer ID/version, and study ID/version;
- exact fixture, instrument, rubric, graph, rule-set, split, allocation, and calibration versions when applicable;
- language, script, direction, locale, market, jurisdiction or explicit jurisdiction-unknown status, surface, and semantic-message family when the record contains or evaluates language;
- source record IDs and immutable hashes rather than copied state claims;
- independent consent, data-processing, persistence, telemetry, and operation-control references where applicable;
- `record_hash_algorithm: sha256`;
- `record_hash_canonical_serialization: rfc8785_jcs`;
- `record_hash_preimage_contract: complete_record_excluding_only_top_level_record_hash`; and
- lowercase SHA-256 `record_hash` computed over UTF-8 RFC 8785/JCS after removing only the top-level `record_hash` member.

The record hash is integrity evidence, not truth, approval, authorship authority, or permission to persist. Duplicate keys, unknown required-enum values, version mismatches, nonfinite numbers, invalid timestamps, and extra undeclared fields fail validation under the exact schema version.

## Human dimension rating invariants

**[Proposal]** A `HumanDimensionRatingRecord` is valid only when:

1. the rater qualification covers the exact dimension, locale, and surface;
2. current consent permits ratings and notes;
3. the referenced packet was `ready_for_rating` at presentation time;
4. both exact hard-pass references and dimension comparability revalidated before presentation;
5. the presentation assignment existed before the response and maps to the frozen allocation manifest;
6. the response is either `submitted` or `abstained`;
7. `submitted` carries one display-level pairwise outcome; `insufficient_context` additionally carries two null fit bands and at least one typed missing-context field;
8. `abstained` carries no fit bands or pairwise outcome and has one procedural reason;
9. ordinal uncertainty is `0` for `insufficient_context` or abstention and `1`–`3` for every other submitted outcome;
10. decisive/tie/both-unacceptable evidence spans refer only to displayed packet fields and exact substrings, while `insufficient_context` names the absent typed fields instead of inventing spans;
11. raw display-level response locks before canonical candidate mapping; and
12. no rating field sets decision, approval, delivery, release, capability, or user-outcome state.

## Exact not-run packet record

The following JSON is a complete, parseable initialization record for the seed packet. It deliberately contains no pass reference, comparability grant, rating, winner, hash, semantic-message ID, or claim that the fixture has been materialized. A later ready record is a new version, not an in-place edit of this record.

```json
{
  "schema_version": "experimental.human-calibration-packet.v0",
  "record_id": "packet:CP-SIBF-CHK-001-F4B-en-US-web-001",
  "record_version": "design-0.1",
  "study_id": "study:VTHCI-SIBF-CHK-001",
  "study_version": "design-0.1",
  "instrument_id": "VTHCI-SIBF-CHK-001",
  "instrument_version": "design-0.1",
  "execution_state": "not_run",
  "fixture": {
    "fixture_id": "SIBF-CHK-001",
    "fixture_revision": "design-0.1",
    "state_id": "F4b",
    "semantic_message_id": null,
    "context_id": null,
    "language": "en",
    "script": "Latn",
    "direction": "ltr",
    "locale": "en-US",
    "market": "US",
    "jurisdiction": null,
    "jurisdiction_status": "unresolved",
    "channel": "responsive_desktop_web",
    "surface": "/checkout/recover:unknown-result"
  },
  "split": {
    "intended_split": "calibration",
    "split_manifest_id": null,
    "split_manifest_version": null,
    "split_manifest_hash": null
  },
  "candidate_a": {
    "candidate_id": "cand-f4b-a",
    "candidate_version": "design-0.1",
    "headline": "We couldn't confirm the payment",
    "body": "You're offline, and the payment status is unknown. When you're back online, check the status. Don't submit another payment yet.",
    "visible_action": "Check status",
    "accessible_action_name": "Check status",
    "candidate_content_hash": null
  },
  "candidate_b": {
    "candidate_id": "cand-f4b-b",
    "candidate_version": "design-0.1",
    "headline": "Payment status is unknown",
    "body": "Don't submit another payment yet. When you're back online, check this attempt's status.",
    "visible_action": "Check status",
    "accessible_action_name": "Check status",
    "candidate_content_hash": null
  },
  "hard_eligibility": {
    "execution_state": "not_run",
    "canonical_hard_gate_result_a": null,
    "canonical_hard_gate_result_b": null,
    "hard_pass_ref_a": null,
    "hard_pass_ref_b": null,
    "required_check_ids": [
      "HC-F4B-01",
      "HC-F4B-02",
      "HC-F4B-03",
      "HC-F4B-04",
      "HC-F4B-05",
      "HC-F4B-06",
      "HC-F4B-07"
    ]
  },
  "measurement_comparability": {
    "execution_state": "not_run",
    "canonical_results_by_dimension": {},
    "profiles_by_dimension": {}
  },
  "construct_card_ids": [
    "VT-D01",
    "VT-D02",
    "VT-D03",
    "VT-D04",
    "VT-D05",
    "VT-D06",
    "VT-D07"
  ],
  "renderable_to_raters": false,
  "reference_winner": null,
  "rating_record_ids": [],
  "limitations": [
    "The fixture and candidate occurrences are not materialized.",
    "No hard-pass or measurement-comparability record exists.",
    "The candidates are synthetic calibration stimuli, not product guidance or gold labels."
  ],
  "record_hash": null
}
```

`record_hash: null` is valid only for this nonpersisted design example. A persisted record must use the shared hash contract and cannot contain null for that field.

## Rating record field contract

| Field | Type and allowed values | Required rule |
| --- | --- | --- |
| `rating_id` | stable ID | Unique, versioned, pseudonymous |
| `rater_qualification_ref` | immutable record reference | Must cover dimension/locale/surface |
| `packet_ref` | exact packet ID/version/hash | Must resolve to `ready_for_rating` |
| `dimension_ref` | exact card ID/version | One card only |
| `measurement_identity` | typed object | Exact language, script, direction, locale, market, jurisdiction or explicit unknown, surface, and semantic-message family |
| `presentation_assignment_ref` | exact assignment ID/version/hash | Created before response |
| `response_status` | `submitted` or `abstained` | Controls nullable fields |
| `display_fit_left`, `display_fit_right` | integer `0`–`4` or null | Both null only when abstained or not rateable under declared rule |
| `display_pairwise_outcome` | `LEFT`, `RIGHT`, `indistinguishable`, `both_unacceptable`, `insufficient_context`, or null | `LEFT`/`RIGHT` map to canonical `A`/`B` only in derived record |
| `abstention_reason` | declared procedural enum or null | Required only when abstained |
| `ordinal_uncertainty` | integer `0`–`3` | Must obey outcome invariants |
| `uncertainty_reason` | minimized string | Required for every submitted rating |
| `evidence_spans` | typed array | Nonempty for `LEFT`, `RIGHT`, `indistinguishable`, or `both_unacceptable`; may be empty for `insufficient_context` only |
| `missing_context_fields` | typed array | Nonempty only and always for `insufficient_context`; empty otherwise |
| `rationale` | concise string or null | Required when submitted; tied to one card |
| `hard_issue_suspected` | boolean | `true` quarantines pair pending review |
| `packet_defect_flags` | typed array | Includes identity, context, rendering, accessibility, or allocation issue |
| `blindness_state` | `intact`, `suspected_breach`, or `breached` | Breach excluded/sensitivity-analyzed per plan |
| `started_at`, `locked_at` | ISO timestamps | `started_at < locked_at`; mapping occurs later |
| `record_hash` | SHA-256 under shared contract | Required after persistence |

## Derived mapping invariant

A `RatingMappingRecord` loads the locked raw rating and the exact presentation assignment, then maps:

```text
LEFT  -> candidate mapped to displayed left
RIGHT -> candidate mapped to displayed right
indistinguishable -> unchanged
both_unacceptable -> unchanged
insufficient_context -> unchanged
```

The mapping record preserves the raw display outcome, candidate IDs/versions, mapping-manifest hash, validator version, and derivation timestamp. It cannot change fit bands, evidence spans, rationale, uncertainty, abstention, or defect flags.

# Part VII — Acceptance criteria

## Instrument acceptance before a run

**[Proposal]** The instrument is ready for collection only when all criteria pass:

1. Every local source link resolves to the exact grounding section.
2. An exact Track A public-development release exists for this instrument, its hashes and exposed-evaluator status verify, and a separate scoped collection authorization passes; this design document alone is insufficient. That release remains permanently non-B1/private-holdout-ineligible.
3. The exact semantic-message, context, candidate, graph, rule, rubric, fixture, rendered-profile, and split versions are frozen and content-addressed.
4. Every rated pair has two external immutable `PASS` records whose exact candidate/context/version/hash/check bindings revalidate.
5. Every requested dimension has a `SUPPORTED` comparability profile for the exact stratum.
6. Construct cards, anchors, instructions, response enums, uncertainty scale, abstention rules, allocation, stopping rules, and analysis plan are frozen.
7. Training material is outside Track A calibration and analysis-locked public test, independently reviewed, and has a locked qualification key; this document assigns no candidate winner.
8. At least three independent qualified raters are assigned per eligible pair/dimension in the primary pilot.
9. Consent, data processing, persistence, access, retention, withdrawal/deletion, incident, and accessibility paths are approved and tested.
10. Applicable SEC-P0 results, exact grants, independent controls, redaction, audit, cleanup, and revocation checks are current.
11. The allocation schedule passes side/card-position balance and mapping validation before any response.
12. The Track A calibration/analysis-locked-public-test split is frozen by semantic-message family, and the public seed pair is absent from the analysis-locked public-test allocation; this is an analysis lock, not a private seal or holdout.

## Rating-record acceptance

A rating enters analysis only when:

- consent and rater eligibility were current at presentation and lock time;
- the exact packet, pass references, and comparability profile revalidated;
- the response follows the submitted/abstained union and uncertainty invariants;
- evidence spans resolve to the displayed stimulus;
- the raw record locked before candidate mapping;
- no unplanned data, tool, model, network, recording, persistence, or identity exposure occurred; and
- no unresolved hard-issue, packet-defect, mapping, consent, security, or cleanup flag invalidates it.

Invalid records remain in the audit denominator with a reason; they are not silently deleted to improve agreement.

## Dimension-calibration acceptance

**[Product hypothesis]** A dimension may be labeled `calibrated_for_fixture_scope` only when:

1. hard eligibility and comparability passed for every included pair;
2. the exact Track A dimension/language/locale/surface/risk stratum contains at least 10 preregistered applicable semantic-message families—at least 6 calibration and 4 analysis-locked public test—and every applicable family contributes at least one eligible comparable pair with at least three independent qualified ratings; unavailable applicable families remain denominator failures, while exclusions require a pre-rating evidence-linked `not_applicable` record;
3. the calibration and analysis-locked public-test reliability statistics are both defined with nonzero expected disagreement, and each pre-adjudication lower confidence bound is at least `0.67` for the exact contextual dimension and declared strata;
4. the frozen construct card, anchors, response rules, exclusions, and analysis are applied to the public test without revision, and no public-test response influenced calibration, rater training, thresholds, or stopping;
5. fit-band use, evidence spans, missing-context reasons, and disagreement review support the construct interpretation rather than only category prevalence or a degenerate all-one-category result;
6. side, card-position, rater, and message-family effects do not invalidate the intended claim in either calibration or analysis-locked public test;
7. pairwise results preserve ties, both-unacceptable judgments, insufficient context, abstentions, cycles, and disconnected components;
8. when a pairwise utility model is claimed, its connected comparison graph and preregistered loss/stability criteria pass on analysis-locked public test; absence of a valid model does not get hidden by the human reliability result;
9. any automated predictor is fitted only on calibration and meets its preregistered calibration/error/coverage criteria on untouched analysis-locked public-test families;
10. anti-stereotype counterfactuals show no materially meaningful operative change without an approved functional reason, or the dimension remains research-only;
11. multilingual claims are limited to locales with direct qualified evidence and within-locale reliability; and
12. the report makes no approval, delivery, release, user-outcome, universal-voice, universal-tone, or cross-locale comparability claim.

Failure of any item results in `research_only`, `unsupported_scope`, `instrument_revision_required`, or `invalid_run` as applicable. It does not result in a lower-quality hidden pass.

## Non-compensable failures

No reliability, naturalness, pairwise win, rater certainty, or model calibration can offset:

- an unsupported consequential claim;
- a required hard check that is `FAIL`, `UNKNOWN`, or `NOT_APPLICABLE` rather than an exact `PASS`;
- unsafe duplicate-payment action;
- invented refund, reversal, hold-duration, support, jurisdiction, approval, implementation, or outcome claims;
- visible/accessible semantic mismatch or sensitive-detail exposure;
- an unsupported locale or invalid cross-locale comparison;
- stereotype activation or demographic proxy use without an approved functional need;
- consent, privacy, data-processing, persistence, authorization, control, source-integrity, or cleanup failure; or
- a mutation, publication, release, or state transition performed or inferred by the study.

# Part VIII — Run checklist and reporting

## Pre-session checklist

- Current study, fixture, instrument, packet, rubric, split, allocation, analysis, and control versions verified.
- Rater qualification, scope, conflict, consent, and accommodations verified.
- Candidate pass references rehashed and exact required checks confirmed `PASS`.
- Dimension comparability confirmed `SUPPORTED`.
- No candidate identity, expected answer, prior score, or other-rater output in the packet.
- Presentation and accessibility checks passed in the exact administration profile.
- Data-processing, persistence, telemetry, retention, deletion, incident, and cleanup records current.
- Cancellation, withdrawal, technical failure, and hard-issue quarantine routes available.

## Post-session checklist

- Raw ratings locked before candidate mapping.
- Abstentions, insufficient-context responses, defects, and suspected hard issues retained distinctly.
- Candidate mapping derived from the exact sealed assignment and verified independently.
- Session artifacts outside the approved record disposed of; no orphan capture, cache, local file, or remote object remains.
- Consent changes or withdrawals applied through the recorded path.
- Incidents and invalid records classified without editing original responses.
- No feedback or aggregate result shown to later raters before their records lock.

## Minimum report

The report must state:

- that `SIBF-CHK-001` is fictional and the instrument's exact revision;
- what was materialized, what was merely proposed, and what remained unavailable;
- rater qualification scopes, without unnecessary identity or demographic data;
- consent, processing, persistence, and execution boundaries;
- split and leakage controls;
- exact candidate/context/rubric/graph/rule versions;
- hard-eligibility and comparability admission counts;
- dimension-by-dimension fit distributions, pairwise outcomes, uncertainty, and evidence coverage;
- pre-adjudication reliability with intervals, raw agreement, prevalence, missingness, and disagreement taxonomy;
- side/order effects, connected components, cycles, and analysis-locked public-test metrics where applicable;
- original dissent and adjudication effects separately;
- multilingual and anti-stereotype evidence and unsupported scopes;
- cost, time, rater burden, invalid runs, incidents, and cleanup; and
- narrow conclusions, limitations, and required next evidence.

It must not report one universal score, conceal a hard failure in an average, identify a product winner, call a proposed construct approved, or infer user success.

## Known limitations

- The exact seed pair is publicly authored and therefore calibration-only.
- No Track A public-development release or collection authorization exists, so no packet can currently satisfy the hard-pass reference contract; even if released, Track A remains permanently non-B1/private-holdout-ineligible.
- One fictional checkout context cannot establish organization voice, cross-domain tone rules, or real shopper outcomes.
- Expert judgment can be reliable and still wrong, incomplete, culturally narrow, inaccessible, or poorly aligned with affected users.
- The proposed reliability thresholds are development hypotheses, not universal validity standards.
- Three fixture locales would still be insufficient for multilingual generalization.
- Pairwise preference identifies relative judgment within a connected stratum; it does not establish an absolute target or causal effect.
- This fixture and instrument are already exposed Track A public-development/calibration material and can never substitute for Track B, private holdout, or B1 evidence.

## Open questions

1. **[Open question]** Which of `VT-D01`–`VT-D07` remain separable after cognitive interviews, and which should be merged, renamed, or kept qualitative?
2. **[Open question]** Do anchored fit bands improve construct calibration beyond pairwise judgments, or introduce halo and false precision?
3. **[Open question]** What number and diversity of semantic-message families is sufficient for stable message-clustered reliability by risk and locale?
4. **[Open question]** Which blinded presentation preserves enough visual and accessible context without revealing candidate provenance?
5. **[Open question]** Which counterfactual swaps are semantically valid rather than unnatural or identity-erasing?
6. **[Open question]** What measurement-invariance method is defensible for short product messages across scripts, locales, and surfaces?
7. **[Open question]** Do content designers, locale specialists, affected users, and accessibility specialists interpret the same construct cards differently for valid reasons?
8. **[Open question]** Does the instrument improve real content decisions and review efficiency, or primarily create automation bias and metric gaming?

## Bottom line

**[Proposal]** Track A public calibration should teach the graph where its proposed dimensions are usable and where it must abstain. The safe sequence is fixed: resolve exact context, establish two immutable hard passes, establish dimension comparability, collect independent one-dimension judgments with ties and abstentions, preserve ordinal uncertainty and dissent, fit only within a connected declared stratum, evaluate only on untouched Track A analysis-locked public-test message families, and return `research_only` when evidence is not strong enough.

The resulting records are evaluation evidence. They never become product truth, voice canon, tone policy, approval, delivery, release, capability, or user outcome by arithmetic or repetition.
