---
title: Voice and tone synthetic calibration development bundle
status: proposed
started: 2026-08-18
updated: 2026-08-18
evidence_cutoff: 2026-08-18
bundle_id: VTSCDB-SIBF-CHK-001
bundle_revision: design-0.1
execution_status: not-run
record_form: nonpersisted-prose-design-drafts
license_status: unresolved
scope: Open synthetic development material for 22 en-US semantic-message families in SIBF-CHK-001
source_documents:
  - voice-tone-human-calibration-instrument.md
  - voice-tone-graph-and-measurement.md
  - shared-benchmark-fixture-specification.md
  - public-voice-and-tone-systems-corpus-2026-08-17.md
  - fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/README.md
---

# Voice and tone synthetic calibration development bundle

## Result and boundary

**[Proposal]** This file supplies an open development bundle for constructing, reviewing, and eventually materializing the 22 semantic-message families anticipated by `SIBF-CHK-001/design-0.1`. It contains exactly 22 A/B pair drafts: 44 separately drafted fictional candidate expressions. It also contains two counterexample drafts per family: one deliberately hard-failing or meaning-changing example and one factually aligned but deliberately tone-misaligned example.

Every family record, pair record, candidate expression, pending check, and counterexample below is a **prose design draft**. Nothing in this file is a persisted harness record. No canonical serialization or canonicalization tool exists for these drafts, so this file assigns no content-address, integrity digest, or record hash to any item.

This bundle is **not run**. It creates no gold item, reference answer, calibrated construct, voice approval, tone approval, semantic approval, hard-eligibility result, comparison-readiness result, B1 evidence, phase advancement, accessibility result, locale-quality result, user outcome, implementation state, publication, or release. Each A/B expression is designed as a standalone fictional draft rather than a marked edit of a reference winner. That design intent is `candidate_authorship_design: independently_composed_standalone`; it does not establish that different people authored the alternatives. The required study-level independence field remains `author_independence: not_established` until an accountable study documents authorship, separation, and conflict controls.

The A/B texts are candidate stimuli, not recommended product copy. A future study may revise, reject, or replace any pair except that a revision must mint new candidate versions and repeat leakage review. Counterexamples are training and diagnostic material only. They are excluded from the eligible-pair denominator and must never be passed to raters as if they had survived the hard gate.

## Grounding

This bundle is bounded by:

- the [human calibration instrument](voice-tone-human-calibration-instrument.md), including its exact `F4b` seed, construct cards, hard-first admission rule, split discipline, abstentions, and nonclaims;
- the [voice and tone graph and measurement model](voice-tone-graph-and-measurement.md), including typed context, separate hard and soft planes, comparison eligibility, multidimensional reporting, and retained uncertainty;
- the [shared benchmark fixture](shared-benchmark-fixture-specification.md), including `BF-01`–`BF-10`, `U-01`–`U-05`, `F0`–`F12`, channel/privacy constraints, and the target of 22 semantic messages;
- the [public voice and tone corpus](public-voice-and-tone-systems-corpus-2026-08-17.md), used only to motivate observable dimensions and non-transfer rules, never to copy a public brand or vendor string; and
- the [open fixture research draft](fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/README.md) and its [current open-development expression-to-message map](fixture-research-drafts/SIBF-CHK-001/design-0.1-open-development/evaluator-open-development/expression-message-links.jsonl), which materialize fixture-owned research mappings without satisfying B1 or freezing an approved successor fixture revision.

No public brand or vendor expression is reproduced as a stimulus. Familiar functional words such as “status,” “order,” and “cart” come from the fictional fixture’s concept and behavior packet, not from a brand corpus.

## Bundle manifest — prose design draft

| Field | Exact design value |
| --- | --- |
| Bundle | `VTSCDB-SIBF-CHK-001/design-0.1` |
| Fixture target | `SIBF-CHK-001/design-0.1`; materialization not established |
| Candidate language | `en` only |
| Candidate script | `Latn` only |
| Candidate direction | `ltr` only |
| Candidate locale | `en-US` only |
| Intended family split | 14 `calibration`; 8 `public-test` |
| Forced family | `MSG-07-UNKNOWN-POSTCOMMIT` / `F4b` is `calibration` because the seed is public |
| A/B pair denominator | 22 pair drafts |
| Candidate-expression denominator | 44 candidate drafts |
| Counterexample denominator | 44 excluded drafts: 22 hard/meaning failures and 22 accurate-but-tone-misaligned examples |
| Default execution state | `not_run` |
| Default rendered state | `renderable_to_raters: false` |
| Default winner and ratings | `reference_winner: null`; `ratings: []` |
| Candidate authorship design | `independently_composed_standalone`; design intent only, not verified human-author independence |
| Default author independence | `not_established` |
| Default license | `unresolved` |
| Persistence/integrity | Nonpersisted prose only; no record hashes |

### Frozen family and intended-split manifest

The split below is an **intended open-development allocation**, not a sealed study manifest or held-out result. `public-test` means visible test-development material in this open repository; it is not a private holdout and cannot support a durable unseen-test claim.

| Ordinal | Frozen semantic-message ID | Fixture family | Intended split |
| ---: | --- | --- | --- |
| 01 | `MSG-01-REVIEW-SUMMARY` | `F0` review summary, web | `calibration` |
| 02 | `MSG-02-COMMIT-ORDER` | `F0` consequential order action, web | `calibration` |
| 03 | `MSG-03-SUBMISSION-PROGRESS` | `F1` progress/status, web | `calibration` |
| 04 | `MSG-04-POSTAL-CORRECTION` | `F2` field correction, web | `calibration` |
| 05 | `MSG-05-SMS-PREFERENCE` | `F3` optional SMS choice, web | `calibration` |
| 06 | `MSG-06-OFFLINE-PRECOMMIT` | `F4a` offline before commit, web | `calibration` |
| 07 | `MSG-07-UNKNOWN-POSTCOMMIT` | `F4b` unknown result after commit, web | `calibration` |
| 08 | `MSG-08-PARTIAL-RECONCILIATION` | `F5` partial reconciliation, web | `calibration` |
| 09 | `MSG-09-CLEAR-CHECKOUT` | `F6` destructive confirmation, web dialog | `calibration` |
| 10 | `MSG-10-ORDER-CONFIRMED` | `F7` order confirmation and receipt boundary, web | `calibration` |
| 11 | `MSG-11-QUOTE-EXPIRED` | `F8` quote expiry and recovery, web | `calibration` |
| 12 | `MSG-12-CHECK-STATUS` | `F4b`/`F5` canonical status action, web/email | `calibration` |
| 13 | `MSG-13-RECEIPT-ATTEMPT` | `F7` receipt communication attempt, email | `calibration` |
| 14 | `MSG-14-SMS-STATUS` | `F3`/`F4b` privacy-safe status alert, SMS | `calibration` |
| 15 | `MSG-15-API-UNKNOWN` | `F4b`/`F5` unknown-result problem detail, API | `public-test` |
| 16 | `MSG-16-API-RETRYABLE` | `F4a` safe-retry problem detail, API | `public-test` |
| 17 | `MSG-17-STATUS-ACCESS-DENIED` | `F4b`/`F5` expired or unauthorized status access, web | `public-test` |
| 18 | `MSG-18-ATTEMPT-REFERENCE` | `F5` attempt reference, authenticated web | `public-test` |
| 19 | `MSG-19-SUPPORT-PATH` | `F5` support fallback without service-level claim, web | `public-test` |
| 20 | `MSG-20-ITEM-COUNT` | `F0` ICU item count, web | `public-test` |
| 21 | `MSG-21-TOTAL-AND-CURRENCY` | `F0`/`F8` quote-bound total and currency, web | `public-test` |
| 22 | `MSG-22-RETURN-TO-CART` | `F0`/`F4a` secondary recovery, web | `public-test` |

## Shared interpretation contract

The applicable construct-card list on each pair is a future research assignment, not a declaration that the construct is measurable there. The exact `VT-D01`–`VT-D07` cards in the [calibration instrument](voice-tone-human-calibration-instrument.md#construct-cards) are packet-local to `CP-SIBF-CHK-001-F4B-en-US-web-001`: their questions and anchors refer to an unknown payment result, the existing-attempt status action, the no-new-payment boundary, consequential uncertainty, and the exact `en-US` web-recovery packet. This bundle assigns those exact cards only to `MSG-07-UNKNOWN-POSTCOMMIT`. It does not generalize their labels to review, validation, consent, success, email, SMS, API, destructive, expiry, or other message contexts.

All other families use the separately identified `VT-P*` **proposed context-card designs** below. A `VT-P*` card is scoped to one message family, state, channel, and surface. It does not inherit a definition, anchor, score, threshold, scale, evidence record, reliability estimate, or calibration profile from any `VT-D*` card. Every `VT-P*` card has `calibration/comparability evidence: none; proposed_not_run`; even a well-written definition cannot change that state. Reuse in another family requires a new card ID and its own definition. A future instrument must independently review the construct, response design, anchors, hard admission contract, and comparability before any rater sees it.

Every pair record below inherits the following exact initialization from this shared contract. Its heading explicitly labels the record as a prose design draft, and its control table restates the execution-sensitive fields so no pair can be mistaken for admitted material:

- `record_kind: prose_design_draft`;
- exact family, context, candidate, slot, and intended-split values;
- `hard_eligibility.execution_state: not_run`, both canonical hard-gate results `null`, and both hard-pass references `null`;
- `measurement_comparability.execution_state: not_run`, with empty result and profile maps;
- `renderable_to_raters: false`, `reference_winner: null`, and `ratings: []`;
- `candidate_authorship_design: independently_composed_standalone`, which is a draft-method label rather than evidence of different human authors;
- `author_independence: not_established`; and
- `license_status: unresolved`.

The pending hard-check IDs are proposed checklist-design handles. They are not executed check results or approved deterministic rules. A future materialization must define exact inputs, applicability, method, authority, and immutable output records before using them.

### Proposed context-card registry — prose design drafts

The definitions below are construct hypotheses for pair development. “Positive” and “negative” anchors describe the direction of the proposed question in the stated context only. They are not reference answers, candidate labels, gold, weights, or universal voice/tone rules.

| Proposed card ID | Exact family/context | Plane | Bounded pairwise question | Positive anchor | Negative anchor | Calibration/comparability evidence |
| --- | --- | --- | --- | --- | --- | --- |
| `VT-P01-REVIEW-CLARITY/design-0.1` | `MSG-01`; `F0`; `en-US` web review summary | Message-family information behavior | Which candidate makes the item count, quote total/currency, expiry, and need to review updated values easiest to identify without adding a commitment claim? | Runtime-bound values and expiry/review boundary are explicit and scan together | Stale literal, hidden currency, missing expiry consequence, or premature commitment language | `none; proposed_not_run` |
| `VT-P01-REVIEW-RESTRAINT/design-0.1` | `MSG-01`; `F0`; `en-US` web review summary | Situational tone | Which candidate uses more proportionate expressive restraint at the precommit review boundary? | Plain orientation without affection, flourish, celebration, or artificial urgency | Sentimental cart language, performance, hype, or pressure before commitment | `none; proposed_not_run` |
| `VT-P02-COMMITMENT-EXPLICITNESS/design-0.1` | `MSG-02`; `F0`; `en-US` web consequential action | Message-family action behavior | Which candidate more explicitly represents that activation submits one order and starts one payment attempt without claiming completion? | Action and immediate commitment consequence are concrete; visible and accessible names agree | Generic continuation, completed-payment claim, or mismatched consequential action name | `none; proposed_not_run` |
| `VT-P02-NONCOERCIVE-COMMITMENT/design-0.1` | `MSG-02`; `F0`; `en-US` web consequential action | Situational tone | Which candidate better supports deliberate commitment without pressure, celebration, or presumed readiness? | Calm, direct description that leaves activation to the shopper | Hype, artificial urgency, shame, “ready?” pressure, or enthusiastic presumption | `none; proposed_not_run` |
| `VT-P03-PROGRESS-CERTAINTY/design-0.1` | `MSG-03`; `F1`; `en-US` web status/live announcement | Message-family state behavior | Which candidate more faithfully distinguishes one in-progress submission from a completed order or payment? | One attempt and pending result are clear; no second submission or success is implied | “Done,” “placed,” “paid,” repeated submission, or vague progress without state | `none; proposed_not_run` |
| `VT-P03-PROGRESS-RESTRAINT/design-0.1` | `MSG-03`; `F1`; `en-US` web status/live announcement | Situational tone | Which candidate uses more proportionate restraint while a consequential submission result is pending? | Brief, controlled status without alarm, celebration, humor, or decorative metaphor | “Magic,” excitement, drama, blame, or chatty repetition during waiting | `none; proposed_not_run` |
| `VT-P04-CORRECTION-ACTIONABILITY/design-0.1` | `MSG-04`; `F2`; `en-US` web postal-field error | Message-family recovery behavior | Which candidate more clearly identifies the postal field and the supported correction while preserving the field relationship? | Field, correction, focus target, and retry path are explicit and aligned | Wrong state, wrong field, restart instruction, vague error, or broken focus relation | `none; proposed_not_run` |
| `VT-P04-NONBLAMING-CORRECTION/design-0.1` | `MSG-04`; `F2`; `en-US` web postal-field error | Situational tone | Which candidate gives the correction with less blame, scolding, childishness, or patronization? | Neutral problem description and concrete correction | “You did it wrong,” “oopsie,” mockery, scolding, or presumed incompetence | `none; proposed_not_run` |
| `VT-P05-CHOICE-OPTIONALITY/design-0.1` | `MSG-05`; `F3`; `en-US` web SMS preference | Message-family choice behavior | Which candidate more clearly preserves the optional attempt-scoped purpose, no-marketing boundary, retention limit, and operable decline path? | Purpose, scope, retention, allow, and decline are distinguishable without relabeling the choice as legal consent | Preselection, hidden decline, marketing expansion, missing retention, or false consent claim | `none; proposed_not_run` |
| `VT-P05-PRIVACY-CHOICE-RESTRAINT/design-0.1` | `MSG-05`; `F3`; `en-US` web SMS preference | Situational tone | Which candidate frames the privacy-relevant choice more neutrally and without promotional or coercive pressure? | Matter-of-fact optional choice with balanced actions | “VIP,” exclusivity, fear of missing out, nudging, or minimizing data use | `none; proposed_not_run` |
| `VT-P06-PRECOMMIT-RECOVERY/design-0.1` | `MSG-06`; `F4a`; `en-US` web offline recovery | Message-family recovery behavior | Which candidate more clearly preserves that no payment attempt was submitted and that retry or return is available after reconnection? | Precommit state, preserved checkout, retry condition, and cart path are clear | Failed-payment claim, postcommit uncertainty, unsafe “pay again,” or lost-data claim | `none; proposed_not_run` |
| `VT-P06-OFFLINE-RESTRAINT/design-0.1` | `MSG-06`; `F4a`; `en-US` web offline recovery | Situational tone | Which candidate communicates the routine offline interruption with more proportionate calm and less metaphor or blame? | Direct connection state and recovery without drama | “Lost signal” performance, road/show metaphors, alarm, or shopper blame | `none; proposed_not_run` |

| Proposed card ID | Exact family/context | Plane | Bounded pairwise question | Positive anchor | Negative anchor | Calibration/comparability evidence |
| --- | --- | --- | --- | --- | --- | --- |
| `VT-P08-PARTIAL-STATE-CLARITY/design-0.1` | `MSG-08`; `F5`; `en-US` access-controlled web recovery | Message-family state behavior | Which candidate more clearly separates accepted authorization, absent order creation, unresolved reconciliation, status recovery, and the no-new-payment boundary? | All supported state parts and safe next action remain distinct | Refund/reversal promise, completed or failed claim, hidden order state, or fresh payment action | `none; proposed_not_run` |
| `VT-P08-RECONCILIATION-RESTRAINT/design-0.1` | `MSG-08`; `F5`; `en-US` access-controlled web recovery | Situational tone | Which candidate uses more proportionate restraint during partial financial failure and unresolved reconciliation? | Plain seriousness without humor, flourish, false reassurance, or alarm | “Plot twist,” celebration, catastrophe language, or promise of a favorable outcome | `none; proposed_not_run` |
| `VT-P09-DESTRUCTIVE-CONSEQUENCE/design-0.1` | `MSG-09`; `F6`; `en-US` web dialog | Message-family consequential-action behavior | Which candidate more clearly states local deletion, irreversibility, the non-cancellation boundary, and the keep-versus-clear alternatives? | Deleted objects, permanence, non-effect on payment, and both actions are explicit | Payment-cancellation claim, reversible implication, hidden object, or mismatched button name | `none; proposed_not_run` |
| `VT-P09-DESTRUCTIVE-RESTRAINT/design-0.1` | `MSG-09`; `F6`; `en-US` web dialog | Situational tone | Which candidate treats irreversible local deletion with more deliberate and proportionate restraint? | Serious, concrete language without dramatizing or trivializing the action | “Nuke,” joke, euphemism, dare, shame, or casual minimization | `none; proposed_not_run` |
| `VT-P10-CONFIRMED-STATE-SEPARATION/design-0.1` | `MSG-10`; `F7`; `en-US` web confirmation | Message-family state behavior | Which candidate more clearly confirms order creation and payment while keeping receipt communication state separate? | Order/payment confirmation is exact and receipt delivery is not inferred | Receipt delivered/understood claim, vague “everything done,” or omitted durable status | `none; proposed_not_run` |
| `VT-P10-SUCCESS-CELEBRATION/design-0.1` | `MSG-10`; `F7`; `en-US` web confirmation | Situational tone | Which candidate uses a more proportionate level of celebration for the confirmed order without obscuring state? | Clear acknowledgment with restrained or context-justified positive affect | Exclamation-heavy celebration, hype, or personality that dominates the confirmation | `none; proposed_not_run` |
| `VT-P11-EXPIRY-RECOVERY/design-0.1` | `MSG-11`; `F8`; `en-US` web expiry recovery | Message-family recovery behavior | Which candidate more clearly preserves the cart while requiring refreshed price and availability before commitment? | Expired quote, preserved cart, refresh requirement, and review action are explicit | Deleted-cart claim, stale total, immediate payment action, or hidden refresh requirement | `none; proposed_not_run` |
| `VT-P11-EXPIRY-URGENCY/design-0.1` | `MSG-11`; `F8`; `en-US` web expiry recovery | Situational tone | Which candidate avoids artificial urgency while still making expiry and the required review salient? | Calm factual expiry with no invented deadline pressure | “Race,” countdown, alarm, scarcity, or blame beyond the supported expiry fact | `none; proposed_not_run` |
| `VT-P12-STATUS-ACTION-CONTINUITY/design-0.1` | `MSG-12`; `F4b`/`F5`; `en-US` web/email return action | Message-family cross-channel action behavior | Which candidate more clearly routes the same existing attempt to canonical web status without implying a new payment or channel-local outcome? | Existing-attempt status action remains semantically continuous across web and email | Fresh submission, vague destination, inconsistent action identity, or email treated as canonical result | `none; proposed_not_run` |
| `VT-P12-STATUS-ACTION-RESTRAINT/design-0.1` | `MSG-12`; `F4b`/`F5`; `en-US` web/email return action | Situational tone | Which candidate states the consequential status action with more proportionate directness and less curiosity framing or flourish? | Precise, neutral status language | “Peek,” intrigue, mystery, promotional framing, or pressure | `none; proposed_not_run` |
| `VT-P13-COMMUNICATION-STATE/design-0.1` | `MSG-13`; `F7`; `en-US` receipt email | Message-family communication-state behavior | Which candidate more clearly preserves queued versus sent/delivered receipt state while keeping order/payment confirmation separate? | Queued receipt is named without asserting send, delivery, opening, or understanding | Delivery/engagement claim, state collapse, or missing order boundary | `none; proposed_not_run` |
| `VT-P13-EMAIL-RESTRAINT/design-0.1` | `MSG-13`; `F7`; `en-US` receipt email | Situational tone | Which candidate uses more proportionate transactional-email restraint while communicating the queued receipt state? | Clear, compact subject/body without hype, vagueness, or self-congratulation | “Ta-da,” chatty flourish, celebratory subject, or vague action language | `none; proposed_not_run` |
| `VT-P14-STATUS-PRIVACY/design-0.1` | `MSG-14`; `F3`/`F4b`; `en-US` SMS alert | Message-family privacy behavior | Which candidate better preserves a privacy-minimized status alert and return to canonical web status without exposing amount, method, or detailed outcome? | Attempt-scoped update and web link with no sensitive detail or local outcome claim | Amount, payment method, failure detail, retry action, or SMS treated as canonical status | `none; proposed_not_run` |
| `VT-P14-SMS-RESTRAINT/design-0.1` | `MSG-14`; `F3`/`F4b`; `en-US` SMS alert | Situational tone | Which candidate is more proportionate and direct for a short privacy-sensitive status alert? | Concise neutral alert and action | “Mystery,” promotion, excitement, alarm, or chatty lock-screen language | `none; proposed_not_run` |

| Proposed card ID | Exact family/context | Plane | Bounded pairwise question | Positive anchor | Negative anchor | Calibration/comparability evidence |
| --- | --- | --- | --- | --- | --- | --- |
| `VT-P15-UNKNOWN-API-STATE/design-0.1` | `MSG-15`; `F4b`/`F5`; `en-US` API problem detail | Message-family structured-state behavior | Which candidate more clearly binds the unknown-result code/type, nonretryable classification, and existing-attempt status relation without raw diagnostics? | Stable unknown-state identity, `retryable: false`, and safe status recovery agree | Failed/completed code, `retryable: true`, new-payment detail, or raw exception | `none; proposed_not_run` |
| `VT-P15-API-RESTRAINT/design-0.1` | `MSG-15`; `F4b`/`F5`; `en-US` API problem detail | Situational tone | Which candidate uses more proportionate restraint in the API's human-readable unknown-state detail? | Plain precise detail without humor, idiom, anthropomorphism, or alarm | Hide-and-seek metaphor, panic, blame, flourish, or false reassurance | `none; proposed_not_run` |
| `VT-P16-RETRYABILITY-SCOPE/design-0.1` | `MSG-16`; `F4a`; `en-US` API problem detail | Message-family structured-recovery behavior | Which candidate more clearly binds precommit state, `SUBMISSION_NOT_STARTED`, same-checkout recovery, and `retryable: true` without transferring the rule postcommit? | Code, state, detail, and retry relation all express exact F4a scope | Payment-result code, nonretryable classification, new attempt, or postcommit generalization | `none; proposed_not_run` |
| `VT-P16-API-RESTRAINT/design-0.1` | `MSG-16`; `F4a`; `en-US` API problem detail | Situational tone | Which candidate communicates routine precommit retryability with more technical restraint? | Direct connection/retry detail without metaphor or celebration | “Coast is clear,” “another whirl,” excitement, or vague reassurance | `none; proposed_not_run` |
| `VT-P17-ACCESS-DENIAL-CLARITY/design-0.1` | `MSG-17`; `F4b`/`F5`; `en-US` web access-denied state | Message-family access/recovery behavior | Which candidate more clearly states that this proof cannot open status and supplies safe checkout/support fallback without exposing the protected attempt state? | Access failure and both bounded recovery paths are clear; underlying state stays hidden | Confirms attempt existence/outcome, exposes reference, or offers fresh payment | `none; proposed_not_run` |
| `VT-P17-NONDISCLOSIVE-RESTRAINT/design-0.1` | `MSG-17`; `F4b`/`F5`; `en-US` web access-denied state | Situational tone | Which candidate uses more neutral, nonblaming, nondisclosive language for expired or unauthorized access? | Calm access statement without accusation, slang, or diagnostic detail | “Ghosted,” blame, security theater, alarm, or unnecessary cause disclosure | `none; proposed_not_run` |
| `VT-P18-REFERENCE-CONCEPT/design-0.1` | `MSG-18`; `F5`; `en-US` access-controlled web reference | Message-family terminology behavior | Which candidate more clearly names `{attemptReference}` as an attempt identifier for status/support without turning it into an order number or confirmation? | Attempt concept, value, helper, and copy action align | “Order number,” confirmation claim, provider identifier, or hidden/mismatched action | `none; proposed_not_run` |
| `VT-P18-IDENTIFIER-RESTRAINT/design-0.1` | `MSG-18`; `F5`; `en-US` access-controlled web reference | Situational tone | Which candidate labels the sensitive operational identifier with more professional restraint? | Plain functional label and helper | Breadcrumb metaphor, cuteness, authority theater, or public-surface flourish | `none; proposed_not_run` |
| `VT-P19-SUPPORT-BOUNDARY/design-0.1` | `MSG-19`; `F5`; `en-US` web support path | Message-family recovery behavior | Which candidate more clearly offers support with the attempt reference without promising hours, response time, reversal, or resolution? | Support route and reference use are explicit; unknown service/outcome facts remain absent | SLA, “instant,” guaranteed result, or support replacing canonical status | `none; proposed_not_run` |
| `VT-P19-SUPPORT-RESTRAINT/design-0.1` | `MSG-19`; `F5`; `en-US` web support path | Situational tone | Which candidate describes the support path with more proportionate and role-accurate restraint? | Direct help route without hero language or presumed availability | “Puzzle-solvers,” “heroes,” adventure framing, cheerleading, or false immediacy | `none; proposed_not_run` |
| `VT-P20-COUNT-NATURALNESS/design-0.1` | `MSG-20`; `F0`; `en-US` web ICU item count after separate structural pass | Independent language quality | Which candidate is more natural and scannable for the complete `en-US` singular/other count while preserving identical count meaning? | Idiomatic singular and plural branches in context | Awkward branch wording or unclear count relationship; structural defects remain hard-plane issues | `none; proposed_not_run` |
| `VT-P20-COUNT-RESTRAINT/design-0.1` | `MSG-20`; `F0`; `en-US` web ICU item count after separate structural pass | Situational tone | Which candidate states the item count with more proportionate neutrality for order review? | Plain count without emotional characterization | “Lonely,” “glorious,” abundance hype, judgment, or celebration | `none; proposed_not_run` |
| `VT-P21-AMOUNT-CLARITY/design-0.1` | `MSG-21`; `F0`/`F8`; `en-US` web quote summary | Message-family financial-information behavior | Which candidate more clearly relates the runtime total, ISO currency, quote identity, and expiry boundary? | `{total}`, `{currency}`, and `{quoteExpiry}` are salient and semantically linked | Stale literal, missing currency, perpetual-price claim, or obscured expiry | `none; proposed_not_run` |
| `VT-P21-AMOUNT-RESTRAINT/design-0.1` | `MSG-21`; `F0`/`F8`; `en-US` web quote summary | Situational tone | Which candidate presents the consequential amount with more proportionate restraint and less pressure? | Plain amount label and expiry note | “Grand reveal,” exclamation, “make your move,” scarcity, or sales pressure | `none; proposed_not_run` |
| `VT-P22-NONCOMMITTING-RETURN/design-0.1` | `MSG-22`; `F0`/`F4a`; `en-US` web secondary action | Message-family recovery behavior | Which candidate more clearly returns to the preserved cart without submitting, cancelling, or implying a payment attempt? | Noncommitting return action and no-submission state are explicit; names align | Payment cancellation, new attempt, hidden destination, or accessible-name mismatch | `none; proposed_not_run` |
| `VT-P22-RETURN-RESTRAINT/design-0.1` | `MSG-22`; `F0`/`F4a`; `en-US` web secondary action | Situational tone | Which candidate frames the optional return path with more neutral and respectful restraint? | Direct return language without judgment or performance | “Scoot,” infantilizing prompt, shame, urgency, or presumed reluctance | `none; proposed_not_run` |

## Family 01 — `MSG-01-REVIEW-SUMMARY`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F0`; current quote, no submission attempt |
| Risk | `moderate`; a missing or stale summary can obscure commitment inputs |
| Channel / surface | `web` / responsive `/checkout/review` summary region |
| Consequence | The shopper is reviewing the items and current quote before a commitment action |
| Recovery / valid next action | Review the summary, continue to the separately governed order action, or return to cart |
| Controlled facts | `BF-01`, `BF-10`; runtime supplies item count, total, ISO currency, and quote expiry |
| Unknowns preserved | Refreshed price and availability after expiry; `U-04` and `U-05` are not resolved here |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P01-REVIEW-CLARITY/design-0.1`, `VT-P01-REVIEW-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-01-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-01-a` | `design-0.1` | `heading`: `Review your order`<br>`summary`: `{itemCount, plural, one {# item} other {# items}} · {total} {currency}`<br>`expiry_note`: `This quote expires at {quoteExpiry}. After that, review updated price and availability.` |
| `cand-msg-01-b` | `design-0.1` | `heading`: `Check your order details`<br>`summary`: `{itemCount, plural, one {# item} other {# items}} totaling {total} {currency}`<br>`expiry_note`: `Review price and availability again after {quoteExpiry}.` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-01-01/design-0.1` semantic inputs; `HC-MSG-01-02/design-0.1` ICU and quote-variable structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-01-hard/design-0.1` — hard/meaning failure | `heading`: `Review your order`<br>`summary`: `2 items · $99`<br>`expiry_note`: `This price won't change.` | Exclude from pair denominator; route to quote-binding and unsupported-guarantee hard review. It must not reach a voice/tone rater. |
| `cex-msg-01-tone/design-0.1` — accurate, tone-misaligned | `heading`: `Give your cart one last loving look!`<br>`summary`: `{itemCount, plural, one {# item} other {# items}} · {total} {currency}`<br>`expiry_note`: `This quote expires at {quoteExpiry}; review updated price and availability after that.` | Exclude from pair denominator; retain as a possible `VT-P01-REVIEW-RESTRAINT/design-0.1` development counterexample, not a validated training item. A rater outside `en-US` web scope abstains; a rater lacking enough rendered hierarchy returns `insufficient_context`. |

## Family 02 — `MSG-02-COMMIT-ORDER`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F0`; consequential action before submission |
| Risk | `high`; activation creates one submission attempt and begins a payment commitment path |
| Channel / surface | `web` / `/checkout/review` primary action |
| Consequence | One order submission attempt is created; duplicate activation is disabled while pending |
| Recovery / valid next action | Activate once when ready, or use the separate return-to-cart action |
| Controlled facts | `BF-02`; `C-01` preserves disagreement among inherited action terms |
| Unknowns preserved | Current canonical label and authorized approver remain unresolved under `C-01`/`U-05` |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P02-COMMITMENT-EXPLICITNESS/design-0.1`, `VT-P02-NONCOERCIVE-COMMITMENT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-02-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-02-a` | `design-0.1` | `supporting_text`: `This submits your order and starts one payment attempt.`<br>`visible_action`: `Place order`<br>`accessible_action_name`: `Place order` |
| `cand-msg-02-b` | `design-0.1` | `supporting_text`: `You're about to submit your order and begin one payment attempt.`<br>`visible_action`: `Submit order`<br>`accessible_action_name`: `Submit order` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-02-01/design-0.1` commitment semantics; `HC-MSG-02-02/design-0.1` visible/accessible action parity |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-02-hard/design-0.1` — hard/meaning failure | `supporting_text`: `Your payment is complete.`<br>`visible_action`: `Place order`<br>`accessible_action_name`: `Pay again` | Exclude; route to premature-success, unsafe-action, and accessible-name hard review. No style rating is permitted. |
| `cex-msg-02-tone/design-0.1` — accurate, tone-misaligned | `supporting_text`: `Ready to make it official? This starts one order submission and payment attempt—let's make it happen!`<br>`visible_action`: `Place order`<br>`accessible_action_name`: `Place order` | Exclude; retain for proposed `VT-P02-NONCOERCIVE-COMMITMENT/design-0.1` review of pressure and flourish around commitment. Use `insufficient_context` if consequence hierarchy is not rendered; otherwise rate only after this proposed card has its own supported instrument and comparability evidence. |

## Family 03 — `MSG-03-SUBMISSION-PROGRESS`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F1`; one submission attempt exists and its result is not known |
| Risk | `high`; false success or duplicate action could misstate or duplicate commitment |
| Channel / surface | `web` / `/checkout/review` submitting status and live announcement |
| Consequence | The order attempt is in progress; no completion state is established |
| Recovery / valid next action | Wait; duplicate activation remains unavailable |
| Controlled facts | `BF-02`, `F1`; one meaningful polite status announcement |
| Unknowns preserved | Payment and order result, completion timing, and cancellation behavior |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P03-PROGRESS-CERTAINTY/design-0.1`, `VT-P03-PROGRESS-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-03-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-03-a` | `design-0.1` | `status_heading`: `Submitting your order`<br>`body`: `One payment attempt is in progress. Wait for the result.`<br>`live_announcement`: `Submitting your order. Wait for the result.` |
| `cand-msg-03-b` | `design-0.1` | `status_heading`: `Order submission in progress`<br>`body`: `We're waiting for the result of this attempt. Don't submit again.`<br>`live_announcement`: `Order submission in progress. Wait for the result.` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-03-01/design-0.1` state/certainty; `HC-MSG-03-02/design-0.1` live-region and duplicate-action structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-03-hard/design-0.1` — hard/meaning failure | `status_heading`: `Order placed`<br>`body`: `Your payment went through.`<br>`live_announcement`: `Order complete.` | Exclude; route to false-success hard review. Do not expose to tone raters. |
| `cex-msg-03-tone/design-0.1` — accurate, tone-misaligned | `status_heading`: `Checkout magic in progress!`<br>`body`: `One payment attempt is in progress. Sit tight while we wait for the result.`<br>`live_announcement`: `Submitting your order. Wait for the result.` | Exclude; retain for proposed `VT-P03-PROGRESS-RESTRAINT/design-0.1` review of playful flourish during consequential uncertainty. Presentation inaccessible or repeated live-region context requires procedural abstention, not a negative style label. |

## Family 04 — `MSG-04-POSTAL-CORRECTION`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F2`; postal code is invalid and submission has not begun |
| Risk | `moderate`; unclear or blaming correction can block progress or discard valid work |
| Channel / surface | `web` / `/checkout/payment` error summary, inline error, and focus link |
| Consequence | The postal field must be corrected before resubmission |
| Recovery / valid next action | Move to the postal field, correct it, and resubmit while preserving other safe input |
| Controlled facts | `F2`; summary/inline/label/focus relationship must agree |
| Unknowns preserved | Exact allowed postal format and locale-specific rule are not authored by these drafts |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P04-CORRECTION-ACTIONABILITY/design-0.1`, `VT-P04-NONBLAMING-CORRECTION/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-04-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-04-a` | `design-0.1` | `error_summary`: `Enter a valid postal code`<br>`inline_error`: `Check the postal code and try again.`<br>`focus_link`: `Fix postal code`<br>`accessible_focus_link`: `Fix postal code` |
| `cand-msg-04-b` | `design-0.1` | `error_summary`: `Postal code needs attention`<br>`inline_error`: `Enter the postal code in a valid format.`<br>`focus_link`: `Go to postal code`<br>`accessible_focus_link`: `Go to postal code` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-04-01/design-0.1` correction semantics; `HC-MSG-04-02/design-0.1` summary/field/focus relationship |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-04-hard/design-0.1` — hard/meaning failure | `error_summary`: `Payment failed`<br>`inline_error`: `Start the checkout again.`<br>`focus_link`: `Retry payment`<br>`accessible_focus_link`: `Retry payment` | Exclude; route to false state and wrong recovery hard review. No tone comparison is allowed. |
| `cex-msg-04-tone/design-0.1` — accurate, tone-misaligned | `error_summary`: `Oopsie—your postal code needs a tiny makeover!`<br>`inline_error`: `Fix the postal code, then try again.`<br>`focus_link`: `Fix postal code`<br>`accessible_focus_link`: `Fix postal code` | Exclude; retain for proposed `VT-P04-NONBLAMING-CORRECTION/design-0.1` review of childish or patronizing treatment. A rater who cannot inspect the field relationship records `insufficient_context`. |

## Family 05 — `MSG-05-SMS-PREFERENCE`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F3`; optional per-attempt SMS status preference is not yet chosen |
| Risk | `high privacy`; coercion or scope drift can misrepresent data use and optionality |
| Channel / surface | `web` / `/checkout/payment` choice group |
| Consequence | A synthetic phone number may be used only for this attempt's status updates |
| Recovery / valid next action | Choose updates or continue without SMS; decline cannot block checkout |
| Controlled facts | `BF-09`; no marketing use; deletion 24 hours after a terminal attempt state; no preselection |
| Unknowns preserved | `U-04` legal applicability and whether any external consent instrument governs release |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P05-CHOICE-OPTIONALITY/design-0.1`, `VT-P05-PRIVACY-CHOICE-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-05-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-05-a` | `design-0.1` | `heading`: `Get status updates by text`<br>`body`: `Use this number only for updates about this checkout attempt. Texts are optional, and we delete the number 24 hours after the attempt reaches a final status.`<br>`allow_action`: `Get text updates`<br>`decline_action`: `Continue without texts`<br>`accessible_allow_action`: `Get text updates`<br>`accessible_decline_action`: `Continue without texts` |
| `cand-msg-05-b` | `design-0.1` | `heading`: `Choose whether to get text updates`<br>`body`: `We can text status updates for this attempt. We won't use the number for marketing, and we'll delete it 24 hours after the attempt reaches a final status.`<br>`allow_action`: `Yes, send updates`<br>`decline_action`: `No, continue`<br>`accessible_allow_action`: `Yes, send updates`<br>`accessible_decline_action`: `No, continue` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-05-01/design-0.1` optionality/purpose/retention; `HC-MSG-05-02/design-0.1` unselected choice and accessible-action parity |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-05-hard/design-0.1` — hard/meaning failure | `heading`: `Consent to texts`<br>`body`: `By continuing, you agree to marketing messages.`<br>`allow_action`: `Continue`<br>`decline_action`: `Not now` | Exclude; route to purpose, optionality, retention, and legal-label hard review. No style rating is permitted. |
| `cex-msg-05-tone/design-0.1` — accurate, tone-misaligned | `heading`: `Want VIP checkout play-by-play?`<br>`body`: `Texts are optional and only cover this attempt. We won't use the number for marketing, and we'll delete it 24 hours after the attempt reaches a final status.`<br>`allow_action`: `Get text updates`<br>`decline_action`: `Continue without texts`<br>`accessible_allow_action`: `Get text updates`<br>`accessible_decline_action`: `Continue without texts` | Exclude; retain for proposed `VT-P05-PRIVACY-CHOICE-RESTRAINT/design-0.1` review of promotional framing around a privacy choice. A privacy or locale concern routes to specialist review, not majority preference. |

## Family 06 — `MSG-06-OFFLINE-PRECOMMIT`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F4a`; offline before the submission boundary; no payment attempt submitted |
| Risk | `moderate`; the wrong state could invite an unsafe cross-state retry rule later |
| Channel / surface | `web` / `/checkout/recover` pre-submit offline variant |
| Consequence | Checkout cannot submit while offline; safe entered data remains available |
| Recovery / valid next action | Reconnect and retry, or return to cart |
| Controlled facts | `BF-03`, `F4a`; retry is safe only before submission |
| Unknowns preserved | Connection-restoration timing and any outcome beyond this pre-submit state |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P06-PRECOMMIT-RECOVERY/design-0.1`, `VT-P06-OFFLINE-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-06-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-06-a` | `design-0.1` | `headline`: `You're offline`<br>`body`: `Your checkout details are still here. Reconnect to retry, or return to your cart.`<br>`visible_action`: `Retry`<br>`accessible_action_name`: `Retry`<br>`secondary_action`: `Return to cart` |
| `cand-msg-06-b` | `design-0.1` | `headline`: `Checkout is waiting for a connection`<br>`body`: `No payment attempt was submitted. When you're online, try again or return to your cart.`<br>`visible_action`: `Try again`<br>`accessible_action_name`: `Try again`<br>`secondary_action`: `Return to cart` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-06-01/design-0.1` pre-submit state/retry safety; `HC-MSG-06-02/design-0.1` preserved-data and action structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-06-hard/design-0.1` — hard/meaning failure | `headline`: `Payment failed`<br>`body`: `Retry your payment now.`<br>`visible_action`: `Pay again`<br>`accessible_action_name`: `Pay again` | Exclude; route to false payment state and state-family conflation hard review. It must not enter the pair denominator. |
| `cex-msg-06-tone/design-0.1` — accurate, tone-misaligned | `headline`: `Your checkout lost its signal`<br>`body`: `No payment attempt was submitted. Reconnect and let's get this show back on the road.`<br>`visible_action`: `Try again`<br>`accessible_action_name`: `Try again` | Exclude; retain for proposed `VT-P06-OFFLINE-RESTRAINT/design-0.1` review of metaphor and flourish. If the rater cannot verify this is `F4a`, the correct response is `insufficient_context`. |

## Family 07 — `MSG-07-UNKNOWN-POSTCOMMIT`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F4b`; offline after commit; submission may have reached the synthetic payment service |
| Risk | `high`; false failure or a fresh retry could create duplicate commitment |
| Channel / surface | `web` / `/checkout/recover` unknown-result variant |
| Consequence | Payment and order outcome are unknown |
| Recovery / valid next action | When connectivity returns, check the existing attempt's status; do not submit another payment yet |
| Controlled facts | `BF-03`, `BF-05`, `BF-07`, `F4b` |
| Unknowns preserved | Payment/order outcome; `U-01`–`U-04`; no hold, reversal, refund, later-order, support-time, or jurisdiction promise |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-D01`, `VT-D02`, `VT-D03`, `VT-D04`, `VT-D05`, `VT-D06`, `VT-D07` |

### Pair record `CP-SIBF-CHK-001-F4B-en-US-web-001` — prose design draft

The following seed candidate IDs, versions, slots, and text are preserved exactly from the [human calibration instrument](voice-tone-human-calibration-instrument.md#exact-candidate-stimuli).

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-f4b-a` | `design-0.1` | `headline`: `We couldn't confirm the payment`<br>`body`: `You're offline, and the payment status is unknown. When you're back online, check the status. Don't submit another payment yet.`<br>`visible_action`: `Check status`<br>`accessible_action_name`: `Check status` |
| `cand-f4b-b` | `design-0.1` | `headline`: `Payment status is unknown`<br>`body`: `Don't submit another payment yet. When you're back online, check this attempt's status.`<br>`visible_action`: `Check status`<br>`accessible_action_name`: `Check status` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` only |
| Pending hard-check design IDs | `HC-F4B-01`, `HC-F4B-02`, `HC-F4B-03`, `HC-F4B-04`, `HC-F4B-05`, `HC-F4B-06`, `HC-F4B-07` |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-07-hard/design-0.1` — hard/meaning failure | `headline`: `Payment failed`<br>`body`: `Submit another payment now.`<br>`visible_action`: `Pay again`<br>`accessible_action_name`: `Pay again` | Exclude; expected hard-plane disposition is false-state plus unsafe-retry failure. Never show it as an eligible style alternative. |
| `cex-msg-07-tone/design-0.1` — accurate, tone-misaligned | `headline`: `Mystery payment alert!`<br>`body`: `We can't confirm the result yet. Don't submit again; check the status when you're online.`<br>`visible_action`: `Check status`<br>`accessible_action_name`: `Check status` | Exclude; retain for `VT-D04` review of alarm/playfulness during financial uncertainty. A rater who cannot distinguish `F4a` from `F4b` returns `insufficient_context`; suspected truth defects reopen hard review. |

## Family 08 — `MSG-08-PARTIAL-RECONCILIATION`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F5`; authorization accepted, order creation failed, reconciliation pending |
| Risk | `high`; a promise about reversal, refund, order creation, or retry can cause financial harm |
| Channel / surface | `web` / access-controlled `/checkout/recover/{attempt-reference}` status |
| Consequence | A payment authorization exists, no order was created, and the final reconciliation result is unresolved |
| Recovery / valid next action | Check the current attempt status; use support with the attempt reference when needed; do not start another payment while unresolved |
| Controlled facts | `BF-04`, `BF-05`, `BF-07`, `F5` |
| Unknowns preserved | `U-01` hold duration, `U-02` reversal/refund/later-order outcome, `U-03` support timing, `U-04` applicability |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P08-PARTIAL-STATE-CLARITY/design-0.1`, `VT-P08-RECONCILIATION-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-08-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-08-a` | `design-0.1` | `headline`: `We're checking this payment attempt`<br>`body`: `The payment authorization was accepted, but the order wasn't created. The outcome is still being reconciled. Check the status before taking another payment action.`<br>`visible_action`: `Check payment status`<br>`accessible_action_name`: `Check payment status` |
| `cand-msg-08-b` | `design-0.1` | `headline`: `Payment and order status need reconciliation`<br>`body`: `An authorization was accepted, but no order was created. Use this attempt's status for the latest result. Don't submit another payment while it remains unresolved.`<br>`visible_action`: `View attempt status`<br>`accessible_action_name`: `View attempt status` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-08-01/design-0.1` authorization/order/uncertainty semantics; `HC-MSG-08-02/design-0.1` safe status recovery and sensitive-detail boundary |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-08-hard/design-0.1` — hard/meaning failure | `headline`: `Payment reversed`<br>`body`: `The authorization will disappear within 24 hours. Pay again now.`<br>`visible_action`: `Retry payment`<br>`accessible_action_name`: `Retry payment` | Exclude; route to unsupported timing/outcome and unsafe-retry hard review. Do not present for style comparison. |
| `cex-msg-08-tone/design-0.1` — accurate, tone-misaligned | `headline`: `Plot twist: the order didn't make it`<br>`body`: `The authorization was accepted, but no order was created. Check the current attempt status before another payment action.`<br>`visible_action`: `Check payment status`<br>`accessible_action_name`: `Check payment status` | Exclude; retain for proposed `VT-P08-RECONCILIATION-RESTRAINT/design-0.1` review of humor in partial financial failure. Raters who cannot judge the exact risk context return `insufficient_context`; suspected factual issues reopen the hard plane. |

## Family 09 — `MSG-09-CLEAR-CHECKOUT`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F6`; destructive confirmation after payment state is no longer unknown |
| Risk | `high`; clearing is irreversible locally and must not be confused with cancelling payment |
| Channel / surface | `web` / recovery-page modal dialog |
| Consequence | Local cart and entered checkout details are permanently deleted; provider-side payment attempts are not cancelled or reversed |
| Recovery / valid next action | Clear checkout or keep it; clear is unavailable while payment state is unknown |
| Controlled facts | `BF-06`, `F6`; dialog/action names expose consequence and remain aligned |
| Unknowns preserved | No external cancellation, reversal, refund, or legal effect is inferred |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P09-DESTRUCTIVE-CONSEQUENCE/design-0.1`, `VT-P09-DESTRUCTIVE-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-09-en-US-web-dialog-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-09-a` | `design-0.1` | `dialog_title`: `Clear this checkout?`<br>`body`: `This permanently deletes the cart and checkout details on this device. It won't cancel or reverse a payment attempt.`<br>`destructive_action`: `Clear checkout`<br>`accessible_destructive_action`: `Clear checkout`<br>`safe_action`: `Keep checkout` |
| `cand-msg-09-b` | `design-0.1` | `dialog_title`: `Delete local checkout details?`<br>`body`: `Clearing can't be undone. It removes this cart and entered checkout details, but it doesn't cancel or reverse a payment attempt.`<br>`destructive_action`: `Delete checkout details`<br>`accessible_destructive_action`: `Delete checkout details`<br>`safe_action`: `Go back` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-09-01/design-0.1` destructive effect/non-effect; `HC-MSG-09-02/design-0.1` dialog and consequential-action semantics |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-09-hard/design-0.1` — hard/meaning failure | `dialog_title`: `Cancel this payment?`<br>`body`: `Clear checkout to reverse the payment.`<br>`destructive_action`: `Cancel payment`<br>`safe_action`: `Keep payment` | Exclude; route to false effect, object, and action-name hard review. It cannot enter style evaluation. |
| `cex-msg-09-tone/design-0.1` — accurate, tone-misaligned | `dialog_title`: `Nuke this checkout?`<br>`body`: `This permanently deletes the local cart and entered details. It won't cancel or reverse a payment attempt.`<br>`destructive_action`: `Clear checkout`<br>`accessible_destructive_action`: `Clear checkout`<br>`safe_action`: `Keep checkout` | Exclude; retain for proposed `VT-P09-DESTRUCTIVE-RESTRAINT/design-0.1` review of aggressive metaphor around irreversible loss. If dialog hierarchy or focus behavior is absent, raters use `insufficient_context` or procedural accessibility abstention as applicable. |

## Family 10 — `MSG-10-ORDER-CONFIRMED`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F7`; order created and payment outcome confirmed; receipt attempt is independent |
| Risk | `high`; success copy can falsely collapse order, payment, and receipt-delivery states |
| Channel / surface | `web` / `/orders/{order-reference}/confirmation` |
| Consequence | The order and payment boundary is confirmed; receipt communication may still have another event state |
| Recovery / valid next action | View durable order details and separately represented receipt status |
| Controlled facts | `BF-07`, `BF-08`, `F7`, `C-03` |
| Unknowns preserved | Whether a receipt attempt is queued, sent, delivered, opened, or understood unless its separate event says so |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P10-CONFIRMED-STATE-SEPARATION/design-0.1`, `VT-P10-SUCCESS-CELEBRATION/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-10-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-10-a` | `design-0.1` | `heading`: `Order confirmed`<br>`body`: `Your order was created and the payment outcome is confirmed. Receipt delivery has its own status.`<br>`visible_action`: `View order details`<br>`accessible_action_name`: `View order details` |
| `cand-msg-10-b` | `design-0.1` | `heading`: `Your order was created`<br>`body`: `Payment is confirmed. The receipt message is tracked separately from this order status.`<br>`visible_action`: `View order details`<br>`accessible_action_name`: `View order details` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-10-01/design-0.1` order/payment/receipt state separation; `HC-MSG-10-02/design-0.1` durable-status and announcement structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-10-hard/design-0.1` — hard/meaning failure | `heading`: `Everything delivered`<br>`body`: `Your order and receipt arrived successfully.`<br>`visible_action`: `Done`<br>`accessible_action_name`: `Done` | Exclude; route to order/receipt/delivery-state collapse hard review. No soft score can rescue it. |
| `cex-msg-10-tone/design-0.1` — accurate, tone-misaligned | `heading`: `Woo-hoo!!! Your order is confirmed`<br>`body`: `The order was created and payment is confirmed. Receipt delivery has its own status.`<br>`visible_action`: `View order details`<br>`accessible_action_name`: `View order details` | Exclude; retain for proposed `VT-P10-SUCCESS-CELEBRATION/design-0.1` review of excessive celebration and register. A style rater must not infer whether celebration improves user outcome. |

## Family 11 — `MSG-11-QUOTE-EXPIRED`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F8`; quote expired before a new commitment |
| Risk | `high`; stale price or availability can misstate a financial commitment |
| Channel / surface | `web` / `/checkout/expired` |
| Consequence | The cart remains, but price and availability require refresh before another commitment |
| Recovery / valid next action | Review the refreshed cart |
| Controlled facts | `BF-10`, `F8`; no stale total remains in assistive output |
| Unknowns preserved | New price, availability, and quote expiry until supplied by the refreshed quote |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P11-EXPIRY-RECOVERY/design-0.1`, `VT-P11-EXPIRY-URGENCY/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-11-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-11-a` | `design-0.1` | `headline`: `This quote expired`<br>`body`: `Your cart is still here. Review updated price and availability before placing a new order.`<br>`visible_action`: `Review updated cart`<br>`accessible_action_name`: `Review updated cart` |
| `cand-msg-11-b` | `design-0.1` | `headline`: `Review your cart again`<br>`body`: `The earlier quote has expired. Your items remain, but price and availability must be refreshed before you continue.`<br>`visible_action`: `Review cart`<br>`accessible_action_name`: `Review cart` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-11-01/design-0.1` expiry/cart preservation; `HC-MSG-11-02/design-0.1` refreshed quote and stale-assistive-output structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-11-hard/design-0.1` — hard/meaning failure | `headline`: `Your cart expired`<br>`body`: `Your items were deleted. Pay the previous total to continue.`<br>`visible_action`: `Pay now`<br>`accessible_action_name`: `Pay now` | Exclude; route to false cart state, stale total, and invalid action hard review. Never show to a style rater. |
| `cex-msg-11-tone/design-0.1` — accurate, tone-misaligned | `headline`: `Time ran out!`<br>`body`: `Your cart is still here, but the quote expired. Race back to review updated price and availability.`<br>`visible_action`: `Review updated cart`<br>`accessible_action_name`: `Review updated cart` | Exclude; retain for proposed `VT-P11-EXPIRY-URGENCY/design-0.1` review of alarm and artificial urgency. If no evidence establishes the time-pressure presentation, return `insufficient_context`. |

## Family 12 — `MSG-12-CHECK-STATUS`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F4b`/`F5`; an existing payment attempt needs a current result |
| Risk | `high`; the action must not be interpreted as a fresh submission or channel-local truth |
| Channel / surface | `web` recovery action plus email return action to canonical web status |
| Consequence | The existing attempt's current status determines safe next steps |
| Recovery / valid next action | Open the access-controlled canonical web status for the same attempt |
| Controlled facts | `BF-05`, `BF-07`; email returns to web and does not establish outcome |
| Unknowns preserved | Payment/order result, channel delivery state, timing, and `U-01`–`U-04` |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P12-STATUS-ACTION-CONTINUITY/design-0.1`, `VT-P12-STATUS-ACTION-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-12-en-US-web-email-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-12-a` | `design-0.1` | `supporting_text`: `Use the status page for the latest result of this attempt.`<br>`web_action`: `Check status`<br>`accessible_web_action`: `Check this attempt's status`<br>`email_action`: `Check status online` |
| `cand-msg-12-b` | `design-0.1` | `supporting_text`: `The checkout status page has the latest result for this attempt.`<br>`web_action`: `View attempt status`<br>`accessible_web_action`: `View this attempt's status`<br>`email_action`: `View status on the web` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-12-01/design-0.1` existing-attempt/canonical-status semantics; `HC-MSG-12-02/design-0.1` link scope, privacy, and visible/accessible action parity |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-12-hard/design-0.1` — hard/meaning failure | `supporting_text`: `Pay again to see the latest result.`<br>`web_action`: `Submit new payment`<br>`accessible_web_action`: `Submit new payment`<br>`email_action`: `Pay again` | Exclude; route to unsafe retry and wrong-action hard review. It cannot enter comparative rating. |
| `cex-msg-12-tone/design-0.1` — accurate, tone-misaligned | `supporting_text`: `Curious what happened? Take a peek at this attempt's current status.`<br>`web_action`: `Check status`<br>`accessible_web_action`: `Check this attempt's status`<br>`email_action`: `Check status online` | Exclude; retain for proposed `VT-P12-STATUS-ACTION-RESTRAINT/design-0.1` review of casual phrasing in consequential recovery. If the visible/accessibility semantics appear mismatched, reopen hard review instead of scoring tone. |

## Family 13 — `MSG-13-RECEIPT-ATTEMPT`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F7`; order created and receipt email becomes eligible, while communication-attempt events remain independent |
| Risk | `high`; the template must not claim sent, delivered, opened, understood, or successful merely because it was created or queued |
| Channel / surface | `email` / transactional subject, body, and canonical web action |
| Consequence | The message communicates an order receipt after order creation without becoming proof of its own delivery or comprehension |
| Recovery / valid next action | Return through the attempt-authorized route to durable order details |
| Controlled facts | `BF-07`, `BF-08`, `C-03`; receipt is created only after order creation |
| Unknowns preserved | Provider/client dispatch and engagement events unless separately observed; delivery and comprehension are never inferred |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P13-COMMUNICATION-STATE/design-0.1`, `VT-P13-EMAIL-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-13-en-US-email-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-13-a` | `design-0.1` | `subject`: `Your receipt is queued`<br>`body`: `Your order was created and payment is confirmed. The receipt attempt for order {orderReference} is queued, not yet reported as sent or delivered. Use the order page for current details.`<br>`visible_action`: `View order details`<br>`accessible_action_name`: `View order details` |
| `cand-msg-13-b` | `design-0.1` | `subject`: `Receipt pending send`<br>`body`: `Order {orderReference} is confirmed. The receipt message is queued; no sent or delivered event is recorded. The order page has the durable status.`<br>`visible_action`: `Open order details`<br>`accessible_action_name`: `Open order details` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-13-01/design-0.1` order/receipt/communication-state separation; `HC-MSG-13-02/design-0.1` subject privacy and authorized-link structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-13-hard/design-0.1` — hard/meaning failure | `subject`: `Your receipt was delivered`<br>`body`: `You received and understood the receipt for order {orderReference}.`<br>`visible_action`: `Done` | Exclude; route to communication-event and recipient-outcome collapse hard review. The fact that a template exists supplies no eligibility. |
| `cex-msg-13-tone/design-0.1` — accurate, tone-misaligned | `subject`: `Ta-da! Your receipt is queued`<br>`body`: `Your order was created and payment is confirmed. The receipt attempt is queued, not yet reported as sent or delivered. Pop over to the order page for details.`<br>`visible_action`: `View order details`<br>`accessible_action_name`: `View order details` | Exclude; retain for proposed `VT-P13-EMAIL-RESTRAINT/design-0.1` review of celebratory and chatty email phrasing. Email-delivery expertise gaps require abstention, not inference. |

## Family 14 — `MSG-14-SMS-STATUS`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F3`/`F4b`; optional per-attempt SMS alert returns to web status without exposing the detailed financial state |
| Risk | `high privacy`; a shared or reassigned number must not receive amount, payment method, detailed failure, or unsupported outcome |
| Channel / surface | `SMS` / transactional status alert |
| Consequence | The recipient is notified that a status check is available; the SMS does not become the canonical status |
| Recovery / valid next action | Open the attempt-authorized web status or continue without SMS |
| Controlled facts | `BF-07`, `BF-09`; preference/suppression is attempt-specific and web remains canonical |
| Unknowns preserved | Payment/order outcome, message dispatch/receipt/engagement, and the identity of a shared-device reader |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P14-STATUS-PRIVACY/design-0.1`, `VT-P14-SMS-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-14-en-US-sms-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-14-a` | `design-0.1` | `sms_body`: `Checkout update: check this attempt's current status on the web: {statusLink}` |
| `cand-msg-14-b` | `design-0.1` | `sms_body`: `Status update for this checkout attempt: open the web status for the latest result: {statusLink}` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `calibration` |
| Pending hard-check design IDs | `HC-MSG-14-01/design-0.1` canonical-status and uncertainty semantics; `HC-MSG-14-02/design-0.1` SMS privacy, purpose, and link structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-14-hard/design-0.1` — hard/meaning failure | `sms_body`: `Your $98.40 card payment failed. Pay again here: {statusLink}` | Exclude; route to sensitive-detail exposure, false state, and unsafe action hard review. It cannot reach tone rating. |
| `cex-msg-14-tone/design-0.1` — accurate, tone-misaligned | `sms_body`: `Checkout mystery! Peek at this attempt's latest web status: {statusLink}` | Exclude; retain for proposed `VT-P14-SMS-RESTRAINT/design-0.1` review of flippancy and “mystery” framing. A reviewer unable to inspect the exact SMS/lock-screen presentation abstains for inaccessible or insufficient context. |

## Family 15 — `MSG-15-API-UNKNOWN`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F4b`/`F5`; a submission may have crossed the boundary and the result is unknown or unresolved |
| Risk | `high`; an incorrect retry classification can trigger duplicate commitment |
| Channel / surface | `API` / structured problem type, code, safe human detail, and recovery relation |
| Consequence | The client must preserve the existing attempt and avoid treating unknown as failed |
| Recovery / valid next action | Query the existing attempt status; do not create another submission while unresolved |
| Controlled facts | `BF-03`, `BF-05`, `F4b`, `F5`; stable code/type drives client handling |
| Unknowns preserved | Payment/order result, reconciliation timing, provider diagnostics, and `U-01`–`U-04` |
| Language identity | Human-readable detail is `en` / `Latn` / `ltr` / `en-US`; machine fields are not linguistic candidates |
| Applicable card designs | `VT-P15-UNKNOWN-API-STATE/design-0.1`, `VT-P15-API-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-15-en-US-api-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-15-a` | `design-0.1` | `problem_type`: `https://fixture.invalid/problems/payment-result-unknown`<br>`code`: `PAYMENT_RESULT_UNKNOWN`<br>`title`: `Payment result is unknown`<br>`detail`: `Check the existing attempt status before another submission.`<br>`retryable`: `false`<br>`status_relation`: `/attempts/{attemptReference}/status` |
| `cand-msg-15-b` | `design-0.1` | `problem_type`: `https://fixture.invalid/problems/payment-result-unknown`<br>`code`: `PAYMENT_RESULT_UNKNOWN`<br>`title`: `Submission result not yet confirmed`<br>`detail`: `Do not start a new payment. Query this attempt's status.`<br>`retryable`: `false`<br>`status_relation`: `/attempts/{attemptReference}/status` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `public-test` |
| Pending hard-check design IDs | `HC-MSG-15-01/design-0.1` unknown-state/retry classification; `HC-MSG-15-02/design-0.1` safe-detail, stable-code, and status-relation structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-15-hard/design-0.1` — hard/meaning failure | `code`: `PAYMENT_FAILED`<br>`title`: `Payment failed`<br>`detail`: `Submit the payment again.`<br>`retryable`: `true` | Exclude; route to false state, unstable handling, and unsafe retry hard review. It must not enter a voice/tone denominator. |
| `cex-msg-15-tone/design-0.1` — accurate, tone-misaligned | `code`: `PAYMENT_RESULT_UNKNOWN`<br>`title`: `Payment result is playing hide-and-seek`<br>`detail`: `Check the existing attempt status before another submission.`<br>`retryable`: `false` | Exclude; retain for proposed `VT-P15-API-RESTRAINT/design-0.1` review of childish metaphor in API human detail. Reviewers without API-detail scope abstain; no exact seed-card judgment is requested. |

## Family 16 — `MSG-16-API-RETRYABLE`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F4a`; no payment attempt was submitted because the checkout was offline before commit |
| Risk | `high`; retryability must not transfer to postcommit unknown states |
| Channel / surface | `API` / structured precommit recovery problem detail |
| Consequence | The same checkout may be retried after connectivity returns |
| Recovery / valid next action | Reconnect and retry this checkout; no new-attempt warning is required for the exact precommit state |
| Controlled facts | `BF-03`, `F4a`; retry is safe before the submission boundary |
| Unknowns preserved | Connection timing and all postcommit outcomes |
| Language identity | Human-readable detail is `en` / `Latn` / `ltr` / `en-US`; machine fields are not linguistic candidates |
| Applicable card designs | `VT-P16-RETRYABILITY-SCOPE/design-0.1`, `VT-P16-API-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-16-en-US-api-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-16-a` | `design-0.1` | `problem_type`: `https://fixture.invalid/problems/connection-required-before-submission`<br>`code`: `SUBMISSION_NOT_STARTED`<br>`title`: `Submission did not start`<br>`detail`: `Reconnect before retrying this checkout.`<br>`retryable`: `true`<br>`retry_relation`: `same_checkout` |
| `cand-msg-16-b` | `design-0.1` | `problem_type`: `https://fixture.invalid/problems/connection-required-before-submission`<br>`code`: `SUBMISSION_NOT_STARTED`<br>`title`: `Checkout can be retried after reconnecting`<br>`detail`: `No payment attempt was submitted. Retry when a connection is available.`<br>`retryable`: `true`<br>`retry_relation`: `same_checkout` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `public-test` |
| Pending hard-check design IDs | `HC-MSG-16-01/design-0.1` precommit/retryability semantics; `HC-MSG-16-02/design-0.1` type/code/detail/retry-relation structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-16-hard/design-0.1` — hard/meaning failure | `code`: `PAYMENT_CONFIRMED`<br>`title`: `Payment complete`<br>`detail`: `No retry is available.`<br>`retryable`: `false` | Exclude; route to false payment state and incorrect retry classification hard review. No style comparison is allowed. |
| `cex-msg-16-tone/design-0.1` — accurate, tone-misaligned | `code`: `SUBMISSION_NOT_STARTED`<br>`title`: `The coast is clear!`<br>`detail`: `No payment attempt was submitted. Reconnect and give checkout another whirl.`<br>`retryable`: `true` | Exclude; retain for proposed `VT-P16-API-RESTRAINT/design-0.1` review of idiom and playfulness. API reviewers lacking the exact client context abstain; no exact seed-card judgment is requested. |

## Family 17 — `MSG-17-STATUS-ACCESS-DENIED`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F4b`/`F5`; an attempt-status proof is expired, invalid, or unauthorized |
| Risk | `high privacy/security`; the response must not disclose protected attempt state or confirm more than the access decision permits |
| Channel / surface | `web` landing state reached from web or email link |
| Consequence | The requested status cannot be opened through this proof |
| Recovery / valid next action | Return to checkout or use the bounded support reference without a service-level promise |
| Controlled facts | Channel fallback and access-check contract; safe expired/unauthorized state |
| Unknowns preserved | Whether the proof expired or lacked authorization when disclosing that distinction is not supported; underlying attempt state remains hidden |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P17-ACCESS-DENIAL-CLARITY/design-0.1`, `VT-P17-NONDISCLOSIVE-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-17-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-17-a` | `design-0.1` | `headline`: `This status link can't be used`<br>`body`: `The link is expired or isn't authorized for this attempt. Return to checkout or use the support reference.`<br>`primary_action`: `Return to checkout`<br>`accessible_primary_action`: `Return to checkout`<br>`secondary_action`: `Use support reference` |
| `cand-msg-17-b` | `design-0.1` | `headline`: `Status unavailable from this link`<br>`body`: `We can't open this attempt's status with this link. Start from checkout, or continue with the support reference.`<br>`primary_action`: `Go to checkout`<br>`accessible_primary_action`: `Go to checkout`<br>`secondary_action`: `Continue with support reference` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `public-test` |
| Pending hard-check design IDs | `HC-MSG-17-01/design-0.1` access-state and non-disclosure semantics; `HC-MSG-17-02/design-0.1` safe fallback, link, and action structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-17-hard/design-0.1` — hard/meaning failure | `headline`: `No such payment attempt exists`<br>`body`: `Attempt {attemptReference} was declined.`<br>`primary_action`: `Try another payment` | Exclude; route to disclosure, invented state, and unsafe retry hard review. It must not reach tone comparison. |
| `cex-msg-17-tone/design-0.1` — accurate, tone-misaligned | `headline`: `This link has ghosted you`<br>`body`: `We can't open the attempt status from this link. Head back to checkout or use the support reference.`<br>`primary_action`: `Return to checkout`<br>`accessible_primary_action`: `Return to checkout`<br>`secondary_action`: `Use support reference` | Exclude; retain for proposed `VT-P17-NONDISCLOSIVE-RESTRAINT/design-0.1` review of slang and levity. Security ambiguity routes to specialist review; inaccessible presentation requires procedural abstention. |

## Family 18 — `MSG-18-ATTEMPT-REFERENCE`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F5`; an access-checked recovery view may show the synthetic attempt reference |
| Risk | `high privacy`; the identifier must not be exposed on public, lock-screen, email-subject, or unauthorized surfaces |
| Channel / surface | `web` / authenticated or attempt-authorized recovery detail |
| Consequence | The reference identifies the checkout attempt for status or support; it is not an order confirmation |
| Recovery / valid next action | Copy or use the reference with the status/support path |
| Controlled facts | `F5` reference is selectable; channel and privacy contract |
| Unknowns preserved | Order outcome, authorization timing, support timing, and any provider-internal identifier |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P18-REFERENCE-CONCEPT/design-0.1`, `VT-P18-IDENTIFIER-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-18-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-18-a` | `design-0.1` | `label`: `Attempt reference`<br>`value`: `{attemptReference}`<br>`helper`: `Use this reference when you contact support.`<br>`copy_action`: `Copy reference`<br>`accessible_copy_action`: `Copy attempt reference` |
| `cand-msg-18-b` | `design-0.1` | `label`: `Payment attempt reference`<br>`value`: `{attemptReference}`<br>`helper`: `Keep this reference for status or support. It doesn't confirm an order.`<br>`copy_action`: `Copy attempt reference`<br>`accessible_copy_action`: `Copy attempt reference` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `public-test` |
| Pending hard-check design IDs | `HC-MSG-18-01/design-0.1` attempt-versus-order semantics; `HC-MSG-18-02/design-0.1` access, exposure, variable, and action-name structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-18-hard/design-0.1` — hard/meaning failure | `label`: `Order number`<br>`value`: `{attemptReference}`<br>`helper`: `This confirms your order.` | Exclude; route to concept conflation and false confirmation hard review. It cannot enter soft measurement. |
| `cex-msg-18-tone/design-0.1` — accurate, tone-misaligned | `label`: `Your trusty payment breadcrumb`<br>`value`: `{attemptReference}`<br>`helper`: `Keep this attempt reference for status or support.`<br>`copy_action`: `Copy attempt reference`<br>`accessible_copy_action`: `Copy attempt reference` | Exclude; retain for proposed `VT-P18-IDENTIFIER-RESTRAINT/design-0.1` review of metaphor and register. If the access-controlled surface cannot be verified, record `insufficient_context` or reopen privacy review. |

## Family 19 — `MSG-19-SUPPORT-PATH`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F5`; unresolved reconciliation may require a bounded support route |
| Risk | `high`; invented hours, response time, authority, or guaranteed outcome can mislead recovery |
| Channel / surface | `web` / recovery support section |
| Consequence | Support can be approached with the attempt reference, without replacing the canonical status or promising resolution |
| Recovery / valid next action | Open support options and supply the attempt reference when appropriate |
| Controlled facts | `F5`; support role and attempt reference exist |
| Unknowns preserved | `U-03` response time and hours; `U-01`, `U-02`, `U-04`, and `U-05` remain outside the support copy |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P19-SUPPORT-BOUNDARY/design-0.1`, `VT-P19-SUPPORT-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-19-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-19-a` | `design-0.1` | `heading`: `Need help with this attempt?`<br>`body`: `Use the attempt reference when you contact support.`<br>`visible_action`: `View support options`<br>`accessible_action_name`: `View support options` |
| `cand-msg-19-b` | `design-0.1` | `heading`: `Contact support about this attempt`<br>`body`: `Include the attempt reference so support can identify the checkout.`<br>`visible_action`: `Go to support`<br>`accessible_action_name`: `Go to support` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `public-test` |
| Pending hard-check design IDs | `HC-MSG-19-01/design-0.1` support-scope and no-service-level semantics; `HC-MSG-19-02/design-0.1` reference and action structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-19-hard/design-0.1` — hard/meaning failure | `heading`: `Instant help is waiting`<br>`body`: `Support will reply within five minutes and reverse the payment.`<br>`visible_action`: `Start instant chat` | Exclude; route to invented availability, response time, and outcome hard review. It is never an eligible tone stimulus. |
| `cex-msg-19-tone/design-0.1` — accurate, tone-misaligned | `heading`: `Let's untangle this checkout adventure`<br>`body`: `Contact support about this attempt and include the attempt reference so it can be identified.`<br>`visible_action`: `View support options`<br>`accessible_action_name`: `View support options` | Exclude; retain for proposed `VT-P19-SUPPORT-RESTRAINT/design-0.1` review of playful role framing. If support-channel behavior is not in the packet, the correct response is `insufficient_context`. |

## Family 20 — `MSG-20-ITEM-COUNT`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F0`; current quote exposes an item-count variable for the review summary |
| Risk | `moderate`; flattened or missing plural structure can change meaning and break localization |
| Channel / surface | `web` / review-summary value |
| Consequence | The shopper can identify how many items the current quote covers |
| Recovery / valid next action | Review the item list before commitment |
| Controlled facts | `BF-01`, `F10`; `itemCount` and all required ICU plural branches are structural inputs |
| Unknowns preserved | Runtime item count and non-English grammatical realization |
| Language identity | Candidate text is `en` / `Latn` / `ltr` / `en-US` only |
| Applicable card designs | `VT-P20-COUNT-NATURALNESS/design-0.1`, `VT-P20-COUNT-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-20-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-20-a` | `design-0.1` | `icu_message`: `{itemCount, plural, one {# item in your cart} other {# items in your cart}}`<br>`variable_contract`: `itemCount:number` |
| `cand-msg-20-b` | `design-0.1` | `icu_message`: `{itemCount, plural, one {Your cart has # item} other {Your cart has # items}}`<br>`variable_contract`: `itemCount:number` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `public-test` |
| Pending hard-check design IDs | `HC-MSG-20-01/design-0.1` count semantics; `HC-MSG-20-02/design-0.1` ICU variable/selectors/branches structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-20-hard/design-0.1` — hard/meaning failure | `item_count_message`: `Your cart has {itemCount} items` | Exclude; route to missing ICU plural branches and singular-meaning hard review. It cannot be admitted for tone comparison. |
| `cex-msg-20-tone/design-0.1` — accurate, tone-misaligned | `icu_message`: `{itemCount, plural, one {One lonely item in your cart} other {A glorious # items in your cart}}` | Exclude; retain for proposed `VT-P20-COUNT-RESTRAINT/design-0.1` review of emotional and celebratory count framing. Non-English quality is outside this candidate and must not be inferred. |

## Family 21 — `MSG-21-TOTAL-AND-CURRENCY`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F0`/`F8`; review or expiry view binds total and ISO currency to the current quote record |
| Risk | `high`; a stale literal or lost currency code can misstate financial commitment |
| Channel / surface | `web` / review summary and expired-quote recovery |
| Consequence | The displayed amount belongs to a versioned quote and must refresh after expiry |
| Recovery / valid next action | Review the current quote before commitment; refresh price and availability after expiry |
| Controlled facts | `BF-01`, `BF-10`, `C-04`; authoritative fields are `total`, `currency`, and `quoteExpiry` |
| Unknowns preserved | Exact runtime values, refreshed price, availability, and non-English formatting |
| Language identity | Candidate text is `en` / `Latn` / `ltr` / `en-US` only |
| Applicable card designs | `VT-P21-AMOUNT-CLARITY/design-0.1`, `VT-P21-AMOUNT-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-21-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-21-a` | `design-0.1` | `total_label`: `Order total`<br>`total_value`: `{total} {currency}`<br>`expiry_note`: `This quote expires at {quoteExpiry}.` |
| `cand-msg-21-b` | `design-0.1` | `total_label`: `Total for this quote`<br>`total_value`: `{total} {currency}`<br>`expiry_note`: `Review price and availability again after {quoteExpiry}.` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `public-test` |
| Pending hard-check design IDs | `HC-MSG-21-01/design-0.1` quote/current-value semantics; `HC-MSG-21-02/design-0.1` total/currency/expiry variable structure |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-21-hard/design-0.1` — hard/meaning failure | `total_label`: `Order total`<br>`total_value`: `$49.99`<br>`expiry_note`: `This amount never changes.` | Exclude; route to stale literal, missing ISO-currency binding, and unsupported guarantee hard review. No style rating is allowed. |
| `cex-msg-21-tone/design-0.1` — accurate, tone-misaligned | `total_label`: `Grand total reveal!`<br>`total_value`: `{total} {currency}`<br>`expiry_note`: `This quote expires at {quoteExpiry}, so make your move.` | Exclude; retain for proposed `VT-P21-AMOUNT-RESTRAINT/design-0.1` review of flourish and pressure. A reviewer must not infer cross-locale amount quality from an `en-US` draft. |

## Family 22 — `MSG-22-RETURN-TO-CART`

### Family/context record — prose design draft

| Field | Exact value |
| --- | --- |
| State and event | `F0`/`F4a`; no submission boundary has been crossed |
| Risk | `moderate`; the secondary action must not imply payment cancellation or submit a new attempt |
| Channel / surface | `web` / review or precommit-recovery secondary action |
| Consequence | The shopper leaves the commitment path and returns to the preserved cart |
| Recovery / valid next action | Return to cart without submitting the order |
| Controlled facts | `F0`, `F4a`; cart/entered data remains available where safe and no payment attempt exists in the exact state |
| Unknowns preserved | Later cart price/availability and any action after leaving this state |
| Language identity | `en` / `Latn` / `ltr` / `en-US` |
| Applicable card designs | `VT-P22-NONCOMMITTING-RETURN/design-0.1`, `VT-P22-RETURN-RESTRAINT/design-0.1` |

### Pair record `CP-SIBF-CHK-001-MSG-22-en-US-web-001` — prose design draft

| Candidate | Version | Exact slots |
| --- | --- | --- |
| `cand-msg-22-a` | `design-0.1` | `supporting_text`: `Return without submitting this order.`<br>`visible_action`: `Return to cart`<br>`accessible_action_name`: `Return to cart` |
| `cand-msg-22-b` | `design-0.1` | `supporting_text`: `Go back to your cart. No payment attempt has started.`<br>`visible_action`: `Back to cart`<br>`accessible_action_name`: `Back to cart` |

| Control field | Exact draft value |
| --- | --- |
| Intended split | `public-test` |
| Pending hard-check design IDs | `HC-MSG-22-01/design-0.1` noncommit/return semantics; `HC-MSG-22-02/design-0.1` route and visible/accessible action parity |
| Hard eligibility | `execution_state: not_run`; `canonical_hard_gate_result_a: null`; `canonical_hard_gate_result_b: null`; `hard_pass_ref_a: null`; `hard_pass_ref_b: null` |
| Measurement comparability | `execution_state: not_run`; `canonical_results_by_dimension: {}`; `profiles_by_dimension: {}` |
| Rating state | `renderable_to_raters: false`; `reference_winner: null`; `ratings: []` |
| Provenance state | `author_independence: not_established`; `license_status: unresolved` |

### Excluded counterexample drafts

| ID / type | Exact draft | Expected disposition and abstention/review note |
| --- | --- | --- |
| `cex-msg-22-hard/design-0.1` — hard/meaning failure | `supporting_text`: `Return to your cart and cancel the payment.`<br>`visible_action`: `Cancel payment`<br>`accessible_action_name`: `Return to cart` | Exclude; route to false payment effect and visible/accessible action mismatch hard review. It cannot enter soft comparison. |
| `cex-msg-22-tone/design-0.1` — accurate, tone-misaligned | `supporting_text`: `Not ready? Scoot back to your cart—no payment attempt has started.`<br>`visible_action`: `Return to cart`<br>`accessible_action_name`: `Return to cart` | Exclude; retain for proposed `VT-P22-RETURN-RESTRAINT/design-0.1` review of overly casual motion language. If the exact F0/F4a state is absent, the rater returns `insufficient_context`. |

## Structural-only locale placeholders — no linguistic candidates

The fixture contains `fr-CA` and `ar-EG` structural branches, but this bundle creates **no** linguistic candidate, translation, adaptation, reference string, pair, construct score, or locale-quality judgment for either locale. Existing open fixture strings are not imported as candidate stimuli. The rows below are structural placeholders only.

| Placeholder ID | Locale identity | Permitted structural fields | Linguistic candidate state | Required future disposition |
| --- | --- | --- | --- | --- |
| `LOC-PLACEHOLDER-fr-CA-design-0.1` | language `fr`; script `Latn`; direction `ltr`; locale `fr-CA` | Message ID, variable names/types, ICU selectors/branches, markup boundaries, locale tag, direction field, source coordinate, and explicit missingness | `none`; candidate IDs and text slots absent | `unsupported_locale`; require independently authored or qualified-reviewed original-language candidates, rights record, hard passes, locale-specific cards, and direct qualified raters |
| `LOC-PLACEHOLDER-ar-EG-design-0.1` | language `ar`; script `Arab`; direction `rtl`; locale `ar-EG` | Message ID, variable names/types, ICU selectors/branches, markup/bidi boundaries, locale tag, direction field, source coordinate, and explicit missingness | `none`; candidate IDs and text slots absent | `unsupported_locale`; require independently authored or qualified-reviewed original-language candidates, rights record, RTL rendering evidence, hard passes, locale-specific cards, and direct qualified raters |

Structural preservation is not linguistic correctness, naturalness, cultural fit, accessibility, translation quality, or cross-locale comparability. Neither placeholder belongs to the 44-candidate denominator.

## Counterexample handling and abstention boundary

The 44 counterexample drafts are not candidate A or B, do not belong to the 22-pair denominator, and have no hard-eligibility or comparability state. They are visibly preclassified design hypotheses for later independent review; their labels are not gold.

- A hard/meaning counterexample routes first to the applicable behavior, semantic, structural, accessibility, privacy, security, or domain specialist. It does not reach pairwise voice/tone rating unless a later corrected version obtains its own ID, version, exact pass records, and comparability record.
- An accurate-but-tone-misaligned counterexample may become separate training material only after an independent hard review confirms exact meaning and structure. Its draft label does not establish that it is factually eligible or tone-misaligned.
- A rater uses `insufficient_context` when the packet lacks a fact needed to apply the card. The rater uses procedural abstention for outside-qualified-scope, conflict, blindness breach, inaccessible presentation, unsupported locale/language, technical failure, consent withdrawal, or another minimized declared reason.
- A suspected hard issue reopens the hard plane; a style judgment cannot waive it. Specialist dissent is preserved rather than averaged away.

## Promotion gate

No pair may change `renderable_to_raters` from `false` until a separately governed materialization produces:

1. a stable semantic-message and context record for the exact fixture revision;
2. immutable candidate occurrences for every exact slot and surface;
3. independently persisted `PASS` hard-evaluation references for candidate A and candidate B, including every required applicable check;
4. a `SUPPORTED` measurement-comparability result for each requested card in the exact language, locale, surface, risk, context, graph, rule, rubric, and instrument stratum;
5. frozen construct cards, rendered profile, split/allocation manifests, training material, rater qualifications, consent/privacy controls, and analysis plan;
6. resolved candidate and annotation rights; and
7. an independently reviewed authorship/conflict record.

Any missing, stale, mismatched, `FAIL`, `UNKNOWN`, `NOT_APPLICABLE`, `UNSUPPORTED`, or unverifiable requirement leaves the pair nonrenderable. A passing hard record would not prove voice fit. A supported comparison profile would not prove hard eligibility. Neither would approve content, advance B1, authorize a study, or support a product/user outcome claim.

## Exact design-count and invariant checklist

This checklist describes editorial/static checks over this Markdown artifact. It is not canonical-record validation, candidate evaluation, or study execution.

| Check | Expected | Observed in this file | Interpretation |
| --- | ---: | ---: | --- |
| Frozen family headings | 22 | 22 | One heading for each exact `MSG-01`–`MSG-22` ID |
| Family/context records labeled prose design draft | 22 | 22 | No family record is a persisted fixture or study record |
| A/B pair records labeled prose design draft | 22 | 22 | One pair per family |
| Candidate expression rows | 44 | 44 | Two exact fictional alternatives per pair |
| Unique candidate IDs | 44 | 44 | Compound candidate ID/version identities do not repeat; `cand-f4b-a` and `cand-f4b-b` are retained |
| Candidate versions present | 44 | 44 | Every candidate is `design-0.1` |
| Candidate authorship design | 44 | 44 standalone alternatives | This is a drafting constraint; human-author independence remains unestablished |
| Applicable-card assignment rows | 22 | 22 | One exact assignment row per message family |
| Exact `VT-D01`–`VT-D07` assignments | 7 references in one family | 7, all and only in `MSG-07` | Exact seed cards are not generalized outside the F4b packet |
| Proposed context-card definitions | 42 unique | 42 unique | Two `VT-P*` definitions for each of the other 21 families |
| Proposed context-card assignments | 42 | 42, each assigned once to its matching family | No proposed card is reused cross-family |
| Proposed-card calibration/comparability evidence | 42 `none; proposed_not_run` | 42 | A definition is not calibration or comparison readiness |
| Intended calibration families | 14 | 14 | `MSG-01`–`MSG-14`; includes public `MSG-07`/`F4b` seed |
| Intended public-test families | 8 | 8 | `MSG-15`–`MSG-22`; open development, never a private holdout |
| Candidate locale identities | 22 pairs | 22 `en`/`Latn`/`ltr`/`en-US` pair contexts | No `fr-CA` or `ar-EG` linguistic candidate exists |
| Pair-specific pending hard-check sets | 22 | 22 | Design handles only; no result inferred |
| Unique pending hard-check design IDs | 49 | 49 | 42 family-specific design handles plus the seven exact `HC-F4B-01`–`HC-F4B-07` seed handles |
| Hard-eligibility initialization | 22 | 22 `not_run`; 44 null canonical results; 44 null pass refs | No pair is hard-eligible |
| Measurement-comparability initialization | 22 | 22 `not_run`; 22 empty result maps; 22 empty profile maps | No dimension is comparison-ready |
| Nonrenderable pair state | 22 | 22 `false` | No candidate may be shown as an admitted rating pair |
| Reference winners | 22 null | 22 null | No preferred or gold candidate |
| Rating collections | 22 empty | 22 empty | No human or model rating exists |
| Author-independence state | 22 `not_established` | 22 | No independent-authorship claim |
| License state | 22 `unresolved` | 22 | No redistribution or study-use permission inferred |
| Hard/meaning counterexample drafts | 22 | 22 | Excluded from pair denominator |
| Accurate-but-tone-misaligned counterexample drafts | 22 | 22 | Excluded from pair denominator and not prevalidated |
| Counterexample IDs unique | 44 | 44 | Each draft has one family/type/version identity |
| `fr-CA` linguistic candidates | 0 | 0 | Structural placeholder only |
| `ar-EG` linguistic candidates | 0 | 0 | Structural/RTL placeholder only |
| Record hashes | 0 | 0 | Prose design drafts are nonpersisted and uncanonicalized |

### Exact `F4b` seed invariants

The `MSG-07` pair must remain byte-for-byte equivalent in candidate ID, version, slot names, and slot text to the exact seed in the human instrument:

- `cand-f4b-a/design-0.1`: headline `We couldn't confirm the payment`; body `You're offline, and the payment status is unknown. When you're back online, check the status. Don't submit another payment yet.`; visible and accessible action `Check status`.
- `cand-f4b-b/design-0.1`: headline `Payment status is unknown`; body `Don't submit another payment yet. When you're back online, check this attempt's status.`; visible and accessible action `Check status`.

Any edit to an exact candidate slot, even punctuation, requires a new candidate version and invalidates the old draft's future eligibility references.

## Bottom line

This bundle makes the next human-calibration step inspectable without pretending it has happened. It fixes 22 family contexts, 22 A/B prose-design pairs, 44 excluded counterexamples, a 14/8 intended development split, and an explicit `en-US`-only linguistic boundary. It keeps the seven exact seed cards local to `MSG-07` and gives the other 21 families 42 separately identified, context-bound, not-run card proposals. It leaves every truth, structure, comparison, calibration, authorship, rights, locale, rating, approval, accessibility, outcome, implementation, phase, and release question in its proper not-run or unresolved state.
