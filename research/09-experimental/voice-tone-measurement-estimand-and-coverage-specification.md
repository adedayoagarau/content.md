---
title: Voice and tone measurement estimand and coverage specification
status: proposed
started: 2026-08-18
updated: 2026-08-18
evidence_cutoff: 2026-08-18
document_id: VT-MECS
document_revision: design-0.1
execution_status: not-run
authority: none
scope: Proposal-only paper reconciliation of first-study estimands, current construct coverage, response semantics, identifiability, uncertainty, and future wire requirements
source_documents:
  - voice-tone-graph-and-measurement.md
  - voice-tone-human-calibration-instrument.md
  - voice-tone-synthetic-calibration-development-bundle.md
  - voice-tone-measurement-primary-research-notes-2026-08-17.md
  - product-study-and-judge-agent-system.md
  - CDM-V0-ARCH-DECISION-r2.md
  - materials-and-access-register.md
---

# Voice and tone measurement estimand and coverage specification

## Result and non-authority boundary

**[Proposal]** Use eleven explicit estimand cards, one fixed-panel first-study target, and fail-closed coverage and mathematical guards before any quantitative voice/tone claim is attempted. The current open synthetic bundle can support paper inspection of response and pair-level reporting designs. It cannot presently support a calibrated dimension, a global Bradley–Terry candidate utility, a recurring-treatment utility, an event-probability calibration claim, a set-level organization-voice claim, or a scalar quality policy.

This file is a **proposal-only, not-for-use paper design reconciliation**. It does not:

- implement or modify a harness, schema, product, judge, graph, agent, fixture, or runtime;
- materialize a study packet, candidate record, counterfactual, prediction, probability, interval, simulation, or result;
- collect or analyze a rating;
- calibrate or validate a construct, threshold, model, judge, voice profile, or tone policy;
- approve Track A, create or approve Track B, bind `r2`, advance a materials-register phase, or authorize planning, building, execution, persistence, browser use, external research, or product study; or
- revise any source document named in the frontmatter.

Every quantitative value below is either a documented design count, a scale/code definition, or a proposed future operating rule. It is not an observed study result.

## Evidence and reconciliation boundary

The specification reconciles the following current local sources without changing their authority or state:

| Source | Current contribution | Boundary preserved here |
| --- | --- | --- |
| [Voice/tone graph and measurement model](voice-tone-graph-and-measurement.md#part-iii--mathematical-measurement-model) | Typed graph, multidimensional soft vector, endpoint normalization, set-level voice, uncertainty, pairwise comparison, and no-universal-score boundary | Formulas remain proposals; this file supplies no validated construct, coefficient, interval, or threshold |
| [Human calibration instrument](voice-tone-human-calibration-instrument.md#construct-cards) | `VT-D01`–`VT-D07`, raw `0`–`4` fit bands, five submitted pairwise outcomes, procedural abstentions, 14/8 intended split, and the 10-family `6/4` calibration rule | The instrument is not run; its numeric targets remain hypotheses and its exact cards remain packet-local |
| [Synthetic calibration development bundle](voice-tone-synthetic-calibration-development-bundle.md#shared-interpretation-contract) | Exact 22-family, 22-pair, 44-candidate paper bundle; exact card-to-family assignments; all hard/comparability/results remain not run | Prose drafts do not become records, eligible pairs, gold, release material, or ratings |
| [Primary measurement research notes](voice-tone-measurement-primary-research-notes-2026-08-17.md#cross-topic-implications-for-the-current-instrument) | Eleven-field estimand requirement, strong directed-connectivity condition, fixed-panel/population distinction, tie/missingness limits, simulations, and no-scalar conclusion | Statistical availability is not construct validity or permission to fit |
| [Product-study and judge-agent system](product-study-and-judge-agent-system.md#evidence-and-state-model) | Independent evidence/judgment records, hard/soft separation, pairwise record boundary, abstention, calibration metadata, and human authority | No agent or schema is implemented and no judge output is treated as truth or approval |
| [`r2` architecture successor](CDM-V0-ARCH-DECISION-r2.md#authority-and-disposition) | L0 proposal boundary, deterministic static scope, blank human packet, and exact future Track B binding requirement | This paper does not bind `r2`; L1 and every later rung remain absent |
| [Materials and access register](materials-and-access-register.md#phase-4--static-read-only-harness) | P4-03 schema/profile need and P4-06 missing qualified-review/measurement infrastructure | No material, access, accountable owner, phase exit, or authorization is supplied |

**[Cross-source finding]** The sources agree on the qualitative safety boundary—hard failures are non-compensable, results are multidimensional, uncertainty stays typed, and approval/outcome states remain separate—but the current construct coverage and comparison schedule do not identify most proposed quantitative claims.

## Exact current-state reconciliation

### Coverage contradiction

**[Cross-source finding]** The current documents contain an exact coverage contradiction that must be resolved before collection:

- The human instrument requires at least **10 applicable semantic-message families per exact dimension/stratum**, with at least **6 calibration** and **4 analysis-locked public-test** families.
- Each of `VT-D01`–`VT-D07` is assigned **only** to `MSG-07-UNKNOWN-POSTCOMMIT`, which is in the intended calibration split. Therefore each `VT-D*` card currently has coverage `1 total / 1 calibration / 0 public-test`.
- The bundle defines 42 `VT-P*` card identities for the other 21 families. Every `VT-P*` card identity is assigned to exactly **one** semantic-message family. A calibration-family `VT-P*` therefore has coverage `1/1/0`; a public-test-family `VT-P*` has coverage `1/0/1`.
- There are 49 distinct current card identities: 7 `VT-D*` plus 42 `VT-P*`. **No current dimension/card identity meets the 10-family `6/4` rule.**

The bundle-wide `14 calibration / 8 public-test` allocation does not repair dimension-level coverage. Counts cannot be pooled across differently defined cards merely because their labels mention clarity, restraint, naturalness, state, recovery, or another similar concept. Such pooling would change the construct after seeing the design and would violate the cards' one-family scope.

### Construct-to-family matrix

The matrix below is exhaustive for the current prose bundle. “Coverage per listed card” is the exact assignment count of each individual identity in that row, not a pooled family count.

| Semantic-message family | Intended split | Current construct-card identities | Coverage per listed card `(total/calibration/public-test)` | Meets `10` and `6/4`? |
| --- | --- | --- | --- | --- |
| `MSG-01-REVIEW-SUMMARY` | calibration | `VT-P01-REVIEW-CLARITY/design-0.1`; `VT-P01-REVIEW-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-02-COMMIT-ORDER` | calibration | `VT-P02-COMMITMENT-EXPLICITNESS/design-0.1`; `VT-P02-NONCOERCIVE-COMMITMENT/design-0.1` | `1/1/0` | No |
| `MSG-03-SUBMISSION-PROGRESS` | calibration | `VT-P03-PROGRESS-CERTAINTY/design-0.1`; `VT-P03-PROGRESS-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-04-POSTAL-CORRECTION` | calibration | `VT-P04-CORRECTION-ACTIONABILITY/design-0.1`; `VT-P04-NONBLAMING-CORRECTION/design-0.1` | `1/1/0` | No |
| `MSG-05-SMS-PREFERENCE` | calibration | `VT-P05-CHOICE-OPTIONALITY/design-0.1`; `VT-P05-PRIVACY-CHOICE-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-06-OFFLINE-PRECOMMIT` | calibration | `VT-P06-PRECOMMIT-RECOVERY/design-0.1`; `VT-P06-OFFLINE-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-07-UNKNOWN-POSTCOMMIT` | calibration | `VT-D01`; `VT-D02`; `VT-D03`; `VT-D04`; `VT-D05`; `VT-D06`; `VT-D07` | `1/1/0` | No |
| `MSG-08-PARTIAL-RECONCILIATION` | calibration | `VT-P08-PARTIAL-STATE-CLARITY/design-0.1`; `VT-P08-RECONCILIATION-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-09-CLEAR-CHECKOUT` | calibration | `VT-P09-DESTRUCTIVE-CONSEQUENCE/design-0.1`; `VT-P09-DESTRUCTIVE-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-10-ORDER-CONFIRMED` | calibration | `VT-P10-CONFIRMED-STATE-SEPARATION/design-0.1`; `VT-P10-SUCCESS-CELEBRATION/design-0.1` | `1/1/0` | No |
| `MSG-11-QUOTE-EXPIRED` | calibration | `VT-P11-EXPIRY-RECOVERY/design-0.1`; `VT-P11-EXPIRY-URGENCY/design-0.1` | `1/1/0` | No |
| `MSG-12-CHECK-STATUS` | calibration | `VT-P12-STATUS-ACTION-CONTINUITY/design-0.1`; `VT-P12-STATUS-ACTION-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-13-RECEIPT-ATTEMPT` | calibration | `VT-P13-COMMUNICATION-STATE/design-0.1`; `VT-P13-EMAIL-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-14-SMS-STATUS` | calibration | `VT-P14-STATUS-PRIVACY/design-0.1`; `VT-P14-SMS-RESTRAINT/design-0.1` | `1/1/0` | No |
| `MSG-15-API-UNKNOWN` | public-test | `VT-P15-UNKNOWN-API-STATE/design-0.1`; `VT-P15-API-RESTRAINT/design-0.1` | `1/0/1` | No |
| `MSG-16-API-RETRYABLE` | public-test | `VT-P16-RETRYABILITY-SCOPE/design-0.1`; `VT-P16-API-RESTRAINT/design-0.1` | `1/0/1` | No |
| `MSG-17-STATUS-ACCESS-DENIED` | public-test | `VT-P17-ACCESS-DENIAL-CLARITY/design-0.1`; `VT-P17-NONDISCLOSIVE-RESTRAINT/design-0.1` | `1/0/1` | No |
| `MSG-18-ATTEMPT-REFERENCE` | public-test | `VT-P18-REFERENCE-CONCEPT/design-0.1`; `VT-P18-IDENTIFIER-RESTRAINT/design-0.1` | `1/0/1` | No |
| `MSG-19-SUPPORT-PATH` | public-test | `VT-P19-SUPPORT-BOUNDARY/design-0.1`; `VT-P19-SUPPORT-RESTRAINT/design-0.1` | `1/0/1` | No |
| `MSG-20-ITEM-COUNT` | public-test | `VT-P20-COUNT-NATURALNESS/design-0.1`; `VT-P20-COUNT-RESTRAINT/design-0.1` | `1/0/1` | No |
| `MSG-21-TOTAL-AND-CURRENCY` | public-test | `VT-P21-AMOUNT-CLARITY/design-0.1`; `VT-P21-AMOUNT-RESTRAINT/design-0.1` | `1/0/1` | No |
| `MSG-22-RETURN-TO-CART` | public-test | `VT-P22-NONCOMMITTING-RETURN/design-0.1`; `VT-P22-RETURN-RESTRAINT/design-0.1` | `1/0/1` | No |

Exact aggregate checks:

| Check | Current value | Consequence |
| --- | ---: | --- |
| Semantic-message families | 22 | Bundle-wide context count only |
| Intended split | 14 calibration; 8 public-test | Does not equal per-card coverage |
| `VT-D*` identities | 7 | All seven occur only in `MSG-07` |
| `VT-P*` identities | 42 | Two unique identities in each non-`MSG-07` family; each identity occurs once |
| Total card identities | 49 | None reaches 10 total families or the 6/4 split |
| Current dimension-calibration claims eligible | 0 | Every such claim remains unavailable |

### Candidate graph and utility contradiction

**[Cross-source finding]** The bundle contains exactly 22 A/B pair drafts and 44 unique candidate IDs. No candidate ID recurs in another family. The scheduled undirected candidate-comparison graph is therefore the disjoint union of 22 two-vertex dyads: 44 vertices, 22 components, and no edge between components.

Because the study is not run, there is no observed directed win graph yet. Even if each dyad later receives decisive judgments in both directions, the full candidate graph would still have 22 disconnected components. Therefore:

- there is no current or design-identifiable **global Bradley–Terry candidate utility**;
- `A` and `B` are candidate/presentation identities within a pair, not recurring treatments;
- a utility for a vendor, model, prompt, rewrite strategy, or “A-side” cannot be inferred from current IDs or drafting order; and
- the valid current quantitative endpoint is pair-level outcome reporting, not a global candidate ranking.

**[Sourced fact]** For the ordinary unpenalized Bradley–Terry likelihood with decisive binary outcomes, a finite unique interior maximum-likelihood estimate requires the **observed directed win graph to be strongly connected** after one scale-identifying constraint. Mere undirected connectivity is insufficient. This admission condition does not establish fit, construct validity, transitivity, or context invariance ([Bradley and Terry, 1952](https://doi.org/10.1093/biomet/39.3-4.324); [Yan, 2014](https://arxiv.org/html/1411.1168v1)).

A future recurring-treatment analysis would require independently defined treatment identities that actually recur across message families, an assignment design that separates treatment from candidate authorship and display side, and an observed directed graph satisfying strong connectivity within one exact dimension and comparable stratum. None exists now.

## First-study generalization target

**[Proposal]** The first executed voice/tone study, if separately made ready and authorized, should be an **instrument-debugging study conditional on one exact fixed qualified rater panel and one exact frozen eligible message set**. It should not claim inference to a population of future raters.

| Target | First-study disposition | What an interval would mean |
| --- | --- | --- |
| These exact eligible messages and this exact frozen qualified panel | Primary target | Repeated allocation/measurement behavior conditional on both fixed sets, under the exact declared randomization and missingness rules |
| New message families with the same fixed panel | Not a first-study target | Would require an identified message-family sampling frame and whole-family resampling/model |
| New qualified raters with the same messages | Not a first-study target | Would require a rater sampling frame and justified rater-population model |
| New message families and new qualified raters | Unsupported in the first study | Would require crossed message/rater sampling or a validated multiway/hierarchical procedure |

“Qualified raters” does not itself define a rater population. A later rater-population estimand must state the source population, inclusion frame, recruitment/selection mechanism, qualification procedure, nonresponse process, and whether raters are sampled or fixed. Repeating measurements from the same panel does not create population generalization.

## Response, tie, abstention, and missingness semantics

### Raw and derived response states

| Record state | Exact measurement meaning | Fit-band rule | Analysis rule |
| --- | --- | --- | --- |
| Raw `LEFT` | Submitted decisive judgment for the candidate displayed on the left, on one exact card only | Both `0`–`4` bands required | Map to canonical `A` or `B` only through the locked presentation assignment |
| Raw `RIGHT` | Submitted decisive judgment for the candidate displayed on the right, on one exact card only | Both `0`–`4` bands required | Map to canonical `A` or `B` only through the locked presentation assignment |
| `indistinguishable` | Submitted judgment that there is no meaningful difference on the declared dimension | Both bands required | A tie only if cognitive validation supports that interpretation; never half a win by default |
| `both_unacceptable` | Submitted judgment that neither candidate is acceptable on the declared dimension | Both bands required | Separate substantive category; not a tie, loss, or missing value |
| `insufficient_context` | Submitted judgment that the packet cannot support the dimension decision | Both bands null/`not_rateable`; uncertainty `0`; typed missing-context field required | Separate rateability outcome; not procedural abstention and not imputed |
| Procedural abstention | No dimension outcome because of declared scope, conflict, blinding, access, locale/language, technical, consent, or other procedural reason | No bands | Missing response with retained reason and denominator; never neutral or a tie |
| Invalidated record | A response exists but fails packet, identity, consent, hard-pass, comparability, assignment, accessibility, integrity, or incident rules | Preserve original values immutably | Retain in audit denominator with exact invalidation reason; exclude only under the preregistered rule |
| Unobserved assignment | Eligible/assigned work did not yield a locked valid response | No invented values | Preserve `not_presented`, `not_started`, `started_not_locked`, or another declared terminal reason separately |

Canonical `A`/`B` is derived after lock:

```text
LEFT  -> candidate assigned to displayed left
RIGHT -> candidate assigned to displayed right
indistinguishable -> unchanged
both_unacceptable -> unchanged
insufficient_context -> unchanged
```

The reporting ledger must preserve, at minimum, `eligible`, `assigned`, `presented`, `attempted`, `submitted`, `insufficient_context`, `procedural_abstention`, `invalidated`, and `missing_unresolved` denominators. No response is deleted, imputed, or recoded merely to make agreement, coverage, or calibration appear better.

### Ordinal adapter

The human instrument records raw fit `r_raw` in `{0,1,2,3,4}`. The graph's ordinal endpoint normalization is defined for `r_graph` in `{1,...,K}`. The only permitted adapter for this exact five-band rubric is:

```text
r_graph = r_raw + 1
K = 5
x = (r_graph - 1) / (K - 1) = r_raw / 4
```

Thus `0,1,2,3,4` map to `0,0.25,0.5,0.75,1`. The record must retain both `r_raw` and the adapter/version. `x` is an endpoint normalization within this rubric only. It does not make category gaps psychologically equal, turn the scale into an interval measure, or make scores comparable across cards, families, contexts, surfaces, risks, languages, locales, or cultures.

### Side and order coding

Side and order must be derived from the locked assignment, never inferred from candidate IDs:

```text
side_code_a = +0.5  when canonical candidate A was displayed LEFT
side_code_a = -0.5  when canonical candidate A was displayed RIGHT

order_code = (2 * card_position_index - card_count - 1) / (card_count - 1)
             for card_count > 1
order_code = null for card_count = 1
```

With this definition, `order_code=-1` is first and `order_code=+1` is last. Required companion fields are `presentation_assignment_ref`, `allocation_block_id`, `displayed_left_candidate_ref`, `displayed_right_candidate_ref`, `card_position_index`, `card_count`, `session_position_index`, `assignment_probability` when known, and the allocation-manifest version/hash.

For a decisive-only sensitivity model, a positive coefficient on `side_code_a` means candidate A was selected more often when displayed left than when displayed right. The primary side analysis must still report all five submitted categories and procedural missingness by side; a decisive-only model cannot hide side-induced changes in ties, both-unacceptable judgments, insufficient context, or abstention. Card order, session fatigue, candidate side, candidate identity, and any future recurring treatment identity remain separate terms.

## Estimand-card contract and terminal statuses

Every first-study quantitative claim must use exactly these eleven fields:

1. construct and exact card version;
2. response variable and outcome ontology;
3. candidate/treatment unit and recurring identity;
4. target message-family and rater populations;
5. locale, language, script, surface, risk, and context scope;
6. admissible records and missingness treatment;
7. dependence and sampling units;
8. comparison-graph and identifiability conditions;
9. model, assumptions, diagnostics, interval, and held-out metric;
10. failure/abstention return state and current terminal status; and
11. prohibited interpretations.

The terminal status is a disposition of the **paper design**, not a study result:

| Status | Meaning |
| --- | --- |
| `design_supported` | The current sources specify a coherent bounded descriptive design; execution and empirical support remain absent |
| `requires_cognitive_validation` | Response categories, construct meaning, anchors, or counterfactual operation must be validated with people before quantitative use |
| `requires_simulation` | Operating characteristics under the exact allocation/dependence/missingness design must be studied before freezing a rule |
| `requires_pilot_data` | The estimand is bounded, but no current observation can estimate it |
| `unsupported` | Current identities, coverage, data, authority, or construct do not identify the claim; no number may be emitted |

### EST-01 — Descriptive response and prevalence

| Field | Exact design value |
| ---: | --- |
| 1 | Each exact frozen construct-card identity/version separately; response ontology `VT-HUMAN-RESPONSE/estimand-design-0.1`; no pooling of `VT-D*` and `VT-P*` identities |
| 2 | Counts and proportions for raw `LEFT`, raw `RIGHT`, derived `A`, derived `B`, `indistinguishable`, `both_unacceptable`, `insufficient_context`, procedural-abstention reasons, invalidations, and unresolved missing states; raw and derived outcomes are never combined in one denominator |
| 3 | One rater-by-pair-by-card assignment; the candidate unit is one exact immutable candidate expression; no recurring treatment is asserted |
| 4 | Primary target is the exact frozen eligible message set and exact fixed qualified panel; no inference to new messages or raters |
| 5 | Report separately for exact card, language, script, locale, surface, risk, semantic-message family, split, and context version; current linguistic candidates are `en`/`Latn`/`en-US` only |
| 6 | Preserve every eligible, assigned, presented, attempted, submitted, abstained, invalidated, and missing record; use explicit denominators; no imputation or complete-case denominator substitution |
| 7 | Repeated assignments share raters and semantic-message families; descriptive counts need no independence claim, while any interval must reproduce the declared allocation/dependence process |
| 8 | No utility graph is required for category counts; candidate and assignment identity must reconcile exactly before derived A/B prevalence is reported |
| 9 | Frequency tables and category proportions with numerator/denominator; any interval is conditional on the fixed sets and uses a predeclared design-valid procedure; report split-specific values, not a tuned test result |
| 10 | On valid paper structure return `design_supported`; before execution, return `not_run` with all estimates null; unresolved denominator or identity returns `unsupported` for the affected cell |
| 11 | Prevalence is not agreement, validity, quality, approval, user preference, user outcome, population incidence, or evidence that a card is calibrated |

### EST-02 — Evidence-span coverage and defect prevalence

| Field | Exact design value |
| ---: | --- |
| 1 | Each exact card/version and the frozen evidence-span/packet-defect taxonomy separately |
| 2 | Evidence-span coverage: valid span-resolving submitted records divided by submitted records that require spans (`LEFT`, `RIGHT`, `indistinguishable`, `both_unacceptable`); report missing-context-field completion for `insufficient_context` separately; report each packet-defect flag and `hard_issue_suspected` separately |
| 3 | One locked human dimension rating; spans address displayed candidate slots/substrings and never become product facts |
| 4 | Exact eligible packets and exact fixed qualified panel only; no claim about future raters, products, or production defects |
| 5 | Separate by card, family, locale, surface, risk, slot, split, presentation profile, and defect type |
| 6 | Invalid spans, unresolved locators, empty required spans, insufficient-context records, abstentions, and invalid records stay visible in distinct denominators; no fabricated span for missing information |
| 7 | Multiple spans and flags occur within rating, pair, family, and rater; interval methods must respect at least family and rater dependence when generalization requires either |
| 8 | No comparison graph is needed; exact stimulus hash, displayed side, slot locator, and mapping assignment must resolve |
| 9 | Report coverage proportions, flag-specific prevalence, locator failure table, and sensitivity including/excluding preregistered invalid records; no composite evidence-quality score; held-out reporting uses the frozen taxonomy unchanged |
| 10 | Current paper design returns `design_supported`; execution fields remain null/not run; an unresolved locator contract returns `unsupported` rather than treating all spans as valid |
| 11 | A cited span does not prove the rationale correct, establish construct validity, resolve a hard issue, authorize a decision, or demonstrate user outcome |

### EST-03 — Nominal five-outcome response reproducibility

| Field | Exact design value |
| ---: | --- |
| 1 | One exact cognitively validated card/version and its five submitted canonical outcomes; no pooled latent “voice/tone” construct |
| 2 | Derived canonical `A`, `B`, `indistinguishable`, `both_unacceptable`, and `insufficient_context` with nominal distance; procedural abstention is missing with reason, not a sixth response category |
| 3 | One exact pair/card rated independently by multiple qualified raters; unique candidates have no transferable utility |
| 4 | Exact fixed qualified panel and exact frozen eligible families for that card; population-rater reliability requires a new estimand |
| 5 | One exact language/script/locale/surface/risk/context stratum; never pool unsupported strata to reach a denominator |
| 6 | Compute pre-adjudication only on admissible locked responses; retain all abstention/missingness rates and invalid records; do not impute or let adjudication rewrite originals |
| 7 | Ratings cross raters and message families; the interval procedure must match whether both are fixed, one is sampled, or both are sampled |
| 8 | Utility connectivity is not required for alpha, but at least two qualified observations per unit and nondegenerate category information are required; current one-family-per-card coverage fails the instrument's 10-family `6/4` rule |
| 9 | Krippendorff alpha with nominal distance only if expected disagreement is positive, accompanied by raw agreement, full confusion table, category prevalence, missingness, information diagnostics, and a design-valid interval; calibration/test reported separately |
| 10 | Return `requires_cognitive_validation` now; also require coverage repair, simulation, and pilot evidence before any coefficient; undefined expected disagreement returns `unsupported`, not `1` or `0` |
| 11 | Reproducibility is not correctness, construct validity, consensus authority, fairness, product truth, approval, or a universal reliability threshold |

### EST-04 — Ordinal fit-band reproducibility

| Field | Exact design value |
| ---: | --- |
| 1 | One exact cognitively validated card/version with raw anchored bands `0`–`4`; the graph adapter/version is separate metadata |
| 2 | Candidate-specific ordinal `r_raw` in `{0,1,2,3,4}`; null only under declared not-rateable/abstention rules; do not use pairwise outcome as the ordinal response |
| 3 | One candidate-by-card rating nested in an exact pair and rater; A and B bands remain separate observations linked to the same context |
| 4 | Exact fixed panel and exact frozen eligible family set; no generalization to new raters or messages |
| 5 | Exact card/language/script/locale/surface/risk/context stratum; normalized `x=r_raw/4` is not cross-stratum comparability evidence |
| 6 | Preserve null/not-rateable reasons, insufficient-context two-null invariant, procedural abstentions, invalid records, and all raw bands; no midpoint imputation |
| 7 | Two candidate ratings share pair/context/rater; repeated cards share rater; families are the clustering unit for new-family claims and raters for new-rater claims |
| 8 | No utility graph is required; category order and card-specific anchors must be cognitively supported, expected disagreement must be nonzero, and current 1-family coverage fails the `6/4` rule |
| 9 | Ordinal-distance alpha as a diagnostic with per-band counts, adjacent-versus-large disagreements, confusion, threshold diagnostics, and design-valid interval; an ordinal mixed model is optional only after threshold/proportionality/dependence checks; evaluate frozen form on public test |
| 10 | Return `requires_cognitive_validation`; unequal psychological spacing is assumed, not estimated away; failed thresholds or degenerate prevalence return `unsupported` for model-based claims |
| 11 | Raw or normalized bands are not interval-scale scores, utilities, approval grades, universal voice strength, or values that may be averaged across dimensions |

### EST-05 — Pair-level outcome

| Field | Exact design value |
| ---: | --- |
| 1 | One exact card/version applied to one exact candidate dyad |
| 2 | Full five-outcome distribution after locked LEFT/RIGHT-to-A/B mapping, with procedural abstention and invalid/missing states outside the submitted-outcome distribution |
| 3 | The estimand unit is one isolated A/B dyad; literal candidate IDs are unique and do not recur |
| 4 | Exact fixed qualified panel for that pair/card; the 22 bundle families form 22 separate dyads, not one ranking population |
| 5 | Exact pair context, language, locale, surface, risk, family, split, candidate versions, and assignment profile |
| 6 | Retain all five submitted categories; never force `indistinguishable`, `both_unacceptable`, or `insufficient_context` into A/B; report procedural missingness separately |
| 7 | Raters are repeated across pairs/cards; pair-level proportions are conditional on the fixed panel and any interval must represent the exact allocation |
| 8 | No between-dyad identifiability is claimed; within-pair reporting requires only exact identity/mapping, not a global comparison graph |
| 9 | Report category counts/proportions, paired band distributions, disagreement, side-stratified sensitivity, and exact fixed-panel uncertainty if justified; no BT utility; public-test summaries use frozen rules |
| 10 | Return `requires_pilot_data`; the bundle is not run and all current outcomes are null; insufficient context stays an observed substantive category |
| 11 | A within-pair plurality is not a global winner, absolute quality, treatment effect, approved copy, user preference, or causal product outcome |

### EST-06 — Presentation-side and card-order effect

| Field | Exact design value |
| ---: | --- |
| 1 | Exact card/version plus frozen allocation and side/order coding contract in this document |
| 2 | Primary outcome is the five-category canonical response distribution; secondary decisive-only outcome is A versus B with nondecisive categories reported as a selection process, not discarded silently |
| 3 | One rater-by-pair-by-card assignment; candidate A is the identity anchor for `side_code_a`; no treatment identity is inferred |
| 4 | Exact fixed panel and frozen eligible assignments; effect is conditional on this allocation, not a universal cognitive side effect |
| 5 | Exact card/family/locale/surface/risk/context/session block; card position and session position are separate |
| 6 | Preserve nondecisive outcomes, abstentions, invalidations, and missing assignments by side/order; no complete-case-only primary result without sensitivity |
| 7 | Randomization/counterbalancing unit, block, rater, pair, and family must be explicit; repeated responses create rater and family dependence |
| 8 | Requires positive assignment probability for both candidate-side positions in each claimed block and no deterministic alias between side, candidate, split, treatment, or card order |
| 9 | First report category-specific risk differences by side/order; any multinomial or decisive logistic extension must use declared centered codes, interaction limits, balance diagnostics, randomization checks, and a design-valid interval; simulate bias, type-I error, and coverage before freezing tolerance |
| 10 | Return `requires_simulation`; no side/order estimate exists; broken balance or aliased assignment returns `unsupported` |
| 11 | A side/order association is not candidate quality, rater bias as a personal trait, treatment effect, construct invalidity by itself, or permission to post-hoc rebalance after outcomes are known |

### EST-07 — Recurring-treatment utility

| Field | Exact design value |
| ---: | --- |
| 1 | No current construct/treatment estimand exists; a future card must name one exact validated dimension and treatment-definition version |
| 2 | Decisive A/B outcome for an actual recurring treatment contrast; validated `indistinguishable` may use a preregistered tie-capable model; other outcomes remain separate |
| 3 | Required unit is a stable treatment/system/strategy identity recurring across families; current 44 literal candidates are unique and current A/B labels are not treatments |
| 4 | Undefined now; a future design must state the eligible message-family population and fixed-panel or rater-population target |
| 5 | One exact comparable card/language/locale/surface/risk/context stratum; no pooled cross-card utility |
| 6 | Hard-eligible/comparable records only; ties, both-unacceptable, insufficient context, abstentions, invalidations, and missingness retained under separate mechanisms |
| 7 | Treatment assignments repeat across families and raters; future model must represent message-family and rater dependence and allocation probabilities |
| 8 | Ordinary unpenalized BT requires recurring entity IDs, a scale constraint, and a strongly connected observed directed win graph; current schedule has 44 vertices in 22 disconnected dyads and fails by design |
| 9 | Future only: BT or justified tie-capable extension with separation, connectivity, cycles, side/rater effects, fit, sensitivity, intervals, and analysis-locked predictive log loss; no model may be fitted now |
| 10 | Return `unsupported`; do not emit a utility, rank, standard error, or probability until a new recurring-treatment design satisfies every condition |
| 11 | Candidate wording, side A/B, vendor, model, prompt, or author cannot be retroactively relabeled as a recurring treatment; strong connectivity would not prove validity or causal effect |

### EST-08 — Event-specific automated-predictor calibration

| Field | Exact design value |
| ---: | --- |
| 1 | Candidate future event `E_mismatch/card-version`: a qualified submitted candidate-card rating has `r_raw` in `{0,1}`; this event definition itself requires card cognitive validation and freezing before use |
| 2 | Binary observed event per admissible candidate-card-rater record; predictor emits `p_mismatch` in `[0,1]` before that human response; insufficient context and procedural abstention are unavailable labels with separate coverage |
| 3 | Prediction unit is one exact candidate/card/context before a qualified rater response; repeated rater outcomes for the same prediction are dependent and do not create independent model runs |
| 4 | First target would be the exact fixed panel and frozen eligible families only; no rater-population or product-population probability claim |
| 5 | Exact event/card/model/prompt/feature/graph/rule/rubric/language/locale/surface/risk/context and split versions |
| 6 | Calibration and analysis-locked public-test records must be separated by family; abstentions and unsupported predictions contribute to answer coverage and are never deleted or scored as negative events |
| 7 | Predictions cluster within candidate, pair, family, and repeated rater; interval and scoring procedure must match the fixed-panel target and family split |
| 8 | Event must be observable and nondegenerate; prediction generated before outcome; untouched public-test families; current per-card 1-family coverage, absent predictor, absent probabilities, and absent outcomes make calibration unidentified |
| 9 | Future only: Brier score, reliability table/diagram with bin counts, calibration error with stated definition, discrimination, answer coverage, selective risk, context-stratified error, interval coverage, and frozen public-test evaluation; no “confidence” proxy |
| 10 | Return `unsupported`; current wire records contain no qualifying event prediction or held-out outcome and no probability may be called calibrated |
| 11 | Probability is not evidence strength, semantic truth, approval confidence, user outcome likelihood, general model confidence, or calibration in another card/locale/model version |

### EST-09 — Counterfactual invariance

| Field | Exact design value |
| ---: | --- |
| 1 | One exact validated card/version plus one exact counterfactual-operation definition/version reviewed for functional and semantic validity |
| 2 | Paired transition matrix between base and counterfactual five-category outcomes, paired raw-band differences, and a separately defined operative-change indicator; do not collapse every response difference into harm |
| 3 | One base/counterfactual candidate packet pair differing only in declared variables; same rater where authorized or a predeclared independent design; current counterexamples are not counterfactual pairs |
| 4 | Exact fixed panel and exact validated counterfactual packet set; no demographic-population preference inference |
| 5 | Exact language/locale/surface/risk/context and declared changed/held-constant fields; protected attributes or proxies appear only under approved functional-purpose review |
| 6 | Hard eligibility and semantic equivalence must pass for both packets; insufficient context, abstention, accessibility problems, invalid swaps, and missing pairs remain separate |
| 7 | Paired responses share rater, base message, family, and card; order/carryover and multiple counterfactuals require declared blocking and multiplicity treatment |
| 8 | Changed and held-constant fields must be identifiable; no unreviewed semantic drift; enough valid pairs in each claimed stratum; no inference from a synthetic edge alone |
| 9 | Report transition table, paired differences, discordant-pair counts, order sensitivity, interval under the declared fixed-panel design, and a broad threshold sensitivity; no cross-locale pooling without invariance evidence |
| 10 | Return `requires_cognitive_validation`; valid swaps and “operative change” meaning are unresolved, and current bundle supplies no eligible counterfactual records |
| 11 | Invariance in synthetic ratings is not absence of real-world harm, fairness certification, cultural universality, demographic preference, causal user outcome, or permission to use identity as a tone feature |

### EST-10 — Set-level organization voice

| Field | Exact design value |
| ---: | --- |
| 1 | A future approved organization-voice principle `p` and observable behavior definition/version applied consistently across a context-balanced set `D`; current packet-local cards are insufficient |
| 2 | Per-fixture behavior-fit observations retained as a vector/distribution; proposed summary `V_p(D)` only after construct and weighting validation |
| 3 | Unit is a semantic-message family/fixture sampled into `D`; literal expression is nested within context; a single pair cannot certify voice |
| 4 | Undefined now; future target must state organization/product scope, message-family population, context balance, and fixed-panel or rater-population target |
| 5 | Report by risk, event, surface, locale, and time/version; never infer organization voice from industry or demographics |
| 6 | Only hard-eligible, comparable, independently reviewed observations; unknown/applicability/missing strata remain visible and cannot be zero-filled |
| 7 | Families, occurrences, raters, and contexts may be clustered; weights and sampling probabilities must be declared and sum to a positive denominator |
| 8 | Same principle/behavior identity must recur across enough context-balanced families; current `VT-D01`/`VT-D02` occur only in `MSG-07` and `VT-P*` identities are family-local, so the construct is not identified |
| 9 | Future only: per-principle vector, weighted set summary with weight sensitivity, clustered interval matched to target, subgroup/context diagnostics, and analysis-locked validation; no single-expression shortcut |
| 10 | Return `unsupported`; no current context-balanced set, reusable validated principle measure, weights, or data exists |
| 11 | Set-level voice is not tone fit, personality, one brand adjective, approval, product outcome, vendor rank, or a scalar that may compensate for hard failure |

### EST-11 — Any scalar decision policy

| Field | Exact design value |
| ---: | --- |
| 1 | No empirical construct is defined; a future accountable owner may define one exact local decision-policy/version after all component constructs are valid |
| 2 | Input is the complete hard-gate state plus separate soft vector and uncertainty; output may be a local ordering/recommendation only under declared weights/floors, never a latent universal quality response |
| 3 | Decision unit is one hard-eligible candidate set in one fixed comparable context; no cross-context recurring scalar identity |
| 4 | Exact decision participants and context only; no message, rater, product, or user population is implied by a policy value |
| 5 | One exact locale/surface/risk/context/rubric/version; any scope change invalidates the policy unless separately decided |
| 6 | Any hard `FAIL`, `UNKNOWN`, or required unresolved state blocks the scalar; missing soft components stay missing; no imputation or compensation |
| 7 | Dependence remains in component estimates; a scalar cannot erase uncertainty, disagreement, or clustering |
| 8 | Requires commensurable validated inputs or explicitly justified transformations, nonnegative declared weights with positive sum, independent floors, and an accountable decision record; none exists |
| 9 | Future only: report full vector, Pareto set, policy formula, weights, floors, epsilon/domain handling, uncertainty propagation, and sensitivity across plausible weights; no learned universal weight from current fixture |
| 10 | Return `unsupported`; no scalar estimate, score, threshold, or winner may be emitted from current cards or bundle |
| 11 | A scalar policy is not discovered truth, universal quality, approval, user benefit, compliance, or permission to hide a hard failure, conflict, unsupported locale, or dissent |

## Simulation and sensitivity design

**[Proposal]** No acceptance threshold should be frozen from prose alone. A future separately authorized simulation artifact should run only after a successor construct-to-family allocation is specified. The current exact allocation should be included as a deterministic failure scenario: one family per card cannot satisfy the 10-family `6/4` rule, and 22 isolated candidate dyads cannot identify global candidate utility.

### Frozen inputs required before simulation

| Input | Required content |
| --- | --- |
| Simulation definition | ID/version/hash, author/reviewer, purpose, estimand IDs, software/runtime/dependency versions, immutable seed plan |
| Allocation | Exact family/card/rater/split/side/order schedule and assignment probabilities; current and each proposed successor scenario separate |
| Data-generating model | Category prevalence, rater thresholds/severity, message heterogeneity, context interaction, tie mechanism, side/order effects, predictor behavior, and dependence parameters |
| Missingness | Separate mechanisms for insufficient context, each procedural-abstention reason, invalidation, nonstart, and nonlock; include random, observed-variable-dependent, and plausible nonignorable cases |
| Graph | Current 22 isolated dyads plus hypothetical recurring-entity graphs that are strongly connected, weakly connected, disconnected, and separated |
| Construct validity scenarios | Distinct/unidimensional cards, merged cards, threshold drift, rater interpretation classes, and invalid counterfactual operations |
| Generalization target | Fixed message/fixed panel, new messages/fixed panel, fixed messages/new raters, or crossed new messages/new raters; never mix targets in one coverage claim |

### Scenario grid

The simulation must vary at least:

- decisive A/B, `indistinguishable`, `both_unacceptable`, and `insufficient_context` prevalence, including rare and degenerate categories;
- procedural abstention and invalidation by locale, difficulty, rater scope, side, and card order;
- rater threshold, severity, and construct-interpretation heterogeneity;
- message-family heterogeneity and treatment-by-context interaction;
- presentation-side, card-order, session-position, fatigue, and carryover effects;
- current isolated, weakly connected, strongly connected, disconnected, undefeated, and separated comparison graphs;
- 1-family current coverage, the proposed minimum 10-family `6/4` coverage, and larger balanced allocations;
- small cluster counts and one-way versus crossed rater/message dependence;
- correct, misspecified, proportional-odds-violating, and sparse ordinal models;
- calibrated, miscalibrated, low-resolution, and high-abstention predictors; and
- invariant, threshold-shifted, construct-shifted, and item-DIF counterfactual/locale branches.

### Required simulation outputs

For each estimand/scenario/target, report:

- estimability/undefined rate and exact failure reason;
- bias, Monte Carlo standard error, empirical standard error, root-mean-square error, and interval coverage where a true parameter exists;
- type-I error and power only for preregistered hypotheses with a defensible null/effect scale;
- alpha degeneracy and information/prevalence diagnostics;
- graph component, strong-connectivity, separation, convergence, and model-fit failure rates;
- probability calibration, Brier score, resolution/discrimination, answer coverage, and selective risk where applicable;
- missingness and complete-case bias under each mechanism;
- side/order bias and alias detection;
- sensitivity to thresholds, weights, floors, resampling unit, interval method, and model choice; and
- the terminal status each operating condition would return.

Use a preregistered Monte Carlo precision rule rather than presenting an arbitrary repetition count as scientific validity. A proposed starting rule is at least 10,000 replicates per cell and continued sampling until the Monte Carlo standard error for a nominal-coverage estimate is at most `0.0025`, capped at 100,000 with any unmet precision reported. This is a simulation-engineering proposal, not a validated acceptance threshold.

## Mathematical domain guards

Every future analysis must fail closed under these guards:

1. **Denominators.** A proportion requires a declared denominator greater than zero. Every numerator must be a subset of that exact denominator. Zero-denominator cells return `unsupported`, not zero.
2. **Coverage.** A calibrated-dimension claim requires at least 10 preregistered applicable families in one exact stratum, at least 6 calibration and 4 public-test, with every applicable family represented or retained as a denominator failure. The current allocation fails.
3. **Hard eligibility and comparability.** A required result other than exact current `PASS`/`SUPPORTED`, including missing, stale, mismatched, not run, unknown, or not applicable where pass is required, blocks the quantitative record.
4. **Ordinal domain.** `r_raw` must be integer `0`–`4` or valid null. `r_graph=r_raw+1`; `x=r_raw/4`. Normalization does not authorize means, equal-distance assumptions, or cross-card comparisons.
5. **Nominal alpha.** Observed and expected disagreement must be defined; expected disagreement must be positive; the distance function and missing-data handling must be frozen. Degenerate category prevalence returns `unsupported` with raw tables.
6. **Ordinal models.** Category ordering, threshold order, link, proportionality, random-effects/dependence structure, convergence, separation, and sparse-cell behavior require diagnostics. A failed assumption returns the descriptive distribution, not a forced coefficient.
7. **Bradley–Terry.** The entity must recur, one scale constraint must be declared, outcomes used by the likelihood must be valid, and the observed directed win graph must be strongly connected. Mere schedule connectivity or undirected connectivity is insufficient.
8. **Ties.** `indistinguishable` may enter only a cognitively validated, explicitly specified tie mechanism. It is not half a win by default. `both_unacceptable`, `insufficient_context`, and procedural abstention never enter as ties.
9. **Side/order.** Both side assignments require positive known assignment probability within claimed blocks; side, candidate, treatment, split, and order cannot be aliased. Sign conventions must match this document.
10. **Probabilities.** Any numeric probability forecast requires one exact binary event and prediction unit, a value in `[0,1]`, a pre-outcome timestamp, and a frozen model/profile. It may be labeled `predicted_uncalibrated` without held-out evidence, but it must not be described as calibrated. `predicted_calibrated_for_scope` additionally requires a current exact calibration profile and in-scope held-out evaluation. A model output without probability semantics belongs in a separate raw-score field, not `probability_value`. Unsupported, abstained, invalid, and not-run predictions have null probability plus a typed reason, never `0.5`.
11. **Brier/calibration.** The observed event must be `0` or `1`; the probability must be available before observation; bins and calibration statistic must be predeclared; report counts, discrimination, answer coverage, and interval. Calibration in one event/scope does not transfer.
12. **Intervals.** Level must be strictly between 0 and 1; lower/upper must be finite, ordered, and on the declared parameter scale; the method must match fixed versus sampled messages/raters and their dependence. A few clusters or failed resamples must be reported, not hidden.
13. **Counterfactuals.** Base and counterfactual must differ only on reviewed declared fields, remain semantically and functionally valid, and preserve exact pairing. Invalid or identity-erasing swaps return `unsupported`.
14. **Set-level voice.** The same principle/behavior construct must recur over a context-balanced `D`; weights must be nonnegative with positive sum; every exclusion and unknown remains visible. One message or one family cannot certify voice.
15. **Scalarization.** Hard eligibility must pass; every component, transformation, direction, floor, weight, epsilon, owner, context, expiry, and sensitivity range must be declared. Missing or ordinal components cannot be silently coerced into a total.
16. **Held-out discipline.** Public-test families cannot influence construct wording, anchors, thresholds, model fitting, calibration, stopping, exclusions, or simulation tuning. Leakage sets `run_validity_status: invalid_run`; the affected common estimate, probability, and interval statuses map to `invalid`, all affected numeric result fields are null, and the typed reason includes `held_out_leakage`.

## Required future wire fields

These are proposed requirements for successor schemas. They do not alter the current judge or graph schemas.

### Common estimand/result envelope

| Field | Required semantics |
| --- | --- |
| `estimand_id`, `estimand_revision` | Exact immutable card in this family of specifications |
| `construct_ref` | Exact card/principle/event/policy ID, version, and digest |
| `response_ontology_ref` | Exact outcome/band/tie/abstention/missingness schema |
| `target_population_kind` | `fixed_messages_fixed_panel`, `new_messages_fixed_panel`, `fixed_messages_rater_population`, or `new_messages_rater_population` |
| `scope` | Language, script, direction, locale, market/jurisdiction or explicit unknown, surface, risk, context, family, split, and time/version |
| `admissibility_profile_ref` | Hard-pass, comparability, consent, qualification, assignment, integrity, and invalidation rules |
| `numerator`, `denominator`, `denominator_ledger_ref` | Exact counts and immutable ledger; null unless applicable |
| `estimate_status` | `not_run`, `estimated`, `undefined`, `invalid`, or `unsupported` |
| `estimate_reason_codes` | Nonempty typed array whenever `estimate_status` is not `estimated`; empty only for a valid estimate |
| `run_validity_status`, `run_validity_reason_codes` | `not_run`, `valid`, or `invalid_run`; `invalid_run` requires a nonempty typed reason array and forces affected analytic statuses to `invalid` |
| `terminal_status` | One of the five paper-design statuses defined above, in a separately versioned design-disposition field |
| `estimate_value`, `estimate_scale` | Numeric value and exact scale, or null with a reason; no generic `score` |
| `model_ref`, `analysis_plan_ref`, `split_manifest_ref` | Frozen versions/digests and pre-outcome timestamps |
| `diagnostics`, `limitations`, `prohibited_interpretations` | Typed arrays that cannot be omitted on success |
| `record_hash_algorithm`, `record_hash_canonical_serialization`, `record_hash_preimage_contract`, `record_hash` | Same explicit immutable-record integrity contract used by the judge system or an approved successor |

### Probability fields

| Field | Required semantics |
| --- | --- |
| `probability_event_id`, `probability_event_revision` | Stable identity for one binary observable event |
| `probability_event_definition` | Exact rule mapping an admissible future observation to `0` or `1` |
| `prediction_unit_ref` | Exact candidate/card/context or other predeclared unit |
| `probability_value` | Number in `[0,1]` exactly when status is `predicted_uncalibrated` or `predicted_calibrated_for_scope`; null for every other status |
| `probability_status` | `not_run`, `predicted_uncalibrated`, `predicted_calibrated_for_scope`, `abstained`, `unsupported_scope`, or `invalid` |
| `probability_reason_codes` | Empty only for either predicted status; nonempty typed array for `not_run`, `abstained`, `unsupported_scope`, or `invalid` |
| `prediction_generated_at` | Must precede outcome visibility |
| `model_id`, `model_version`, `prompt_profile_ref`, `feature_profile_ref` | Exact immutable predictor state |
| `raw_model_score`, `raw_model_score_scale` | Optional non-probability model output; never substituted into `probability_value` and never called calibrated |
| `calibration_profile_ref` | Exact scope/version or null; cannot be inferred from a model name |
| `calibration_split_ref`, `evaluation_split_ref` | Family-level separation with leakage status |
| `observed_event` | `0` or `1` exactly when `observed_event_status: observed`; otherwise null |
| `observed_event_status`, `observed_event_reason_codes` | `not_observed`, `observed`, `abstained`, `unsupported_scope`, or `invalid`; every non-observed status requires a nonempty typed reason array |
| `proper_score_name`, `proper_score_value` | Exact score definition/version; Brier when selected, never a generic accuracy field |
| `reliability_bins` | Per-bin boundaries, counts, mean prediction, observed rate, and interval; empty when unsupported |
| `discrimination_metrics` | Named metrics with definitions and applicability |
| `answer_coverage`, `selective_risk`, `abstention_breakdown` | Jointly required when abstention is possible |

Probability status/value/profile matrix:

| `probability_status` | `probability_value` | `calibration_profile_ref` | Required interpretation |
| --- | --- | --- | --- |
| `not_run` | null | null | No forecast operation occurred; typed reason required |
| `predicted_uncalibrated` | required in `[0,1]` | null | Event-specific numeric forecast only; must be labeled uncalibrated and receives no calibrated-scope claim |
| `predicted_calibrated_for_scope` | required in `[0,1]` | required, current, and exact | Calibration and held-out evaluation references must match event, unit, model, card, and scope |
| `abstained` | null | null or prior profile reference for audit only | No probability for this unit; typed abstention reason and coverage accounting required |
| `unsupported_scope` | null | null | Event/model/profile does not support this unit or scope; typed reason required |
| `invalid` | null | null or invalidated profile reference for audit only | Integrity, timing, leakage, outcome, or other validity failure; typed reason required |

### Interval fields

| Field | Required semantics |
| --- | --- |
| `interval_status` | `estimated`, `undefined`, `invalid`, `unsupported_scope`, or `not_run` |
| `interval_reason_codes` | Empty only for `estimated`; nonempty typed array for `undefined`, `invalid`, `unsupported_scope`, or `not_run` |
| `interval_level` | Number strictly between 0 and 1 |
| `interval_lower`, `interval_upper` | Ordered finite endpoints or both null with reason |
| `interval_scale` | Exact parameter scale and any transform/back-transform |
| `interval_method`, `interval_method_version` | Percentile/basic/BCa/studentized/model-based/design-based or other exact method |
| `target_generalization` | Exact fixed/sampled message and rater target |
| `sampling_units`, `cluster_units`, `strata` | Explicit arrays; no generic `clustered: true` |
| `message_family_count`, `rater_count`, `effective_cluster_counts` | Counts used by the procedure |
| `resample_repetitions`, `seed_ref` | Exact values when resampling applies |
| `convergence_status`, `failed_resample_count`, `failure_rate` | Required even when endpoints are returned |
| `coverage_validation_status`, `simulation_ref` | `not_assessed`, `assessed_for_exact_design`, `failed`, or `not_applicable`, plus immutable evidence ref |
| `multiplicity_policy_ref` | Required when more than one interval supports a joint decision |
| `interval_interpretation` | Repeated-sampling/design statement; never posterior probability unless an explicitly different approved Bayesian model is used |

Canonical invalid-run mapping:

```text
run_validity_status = invalid_run
estimate_status = invalid
probability_status = invalid
interval_status = invalid
estimate_value = null
probability_value = null
interval_lower = null
interval_upper = null
reason_codes include the exact invalidation cause
```

The paper-design `terminal_status` remains a separate design disposition and is never rewritten to `invalid_run`. Unknown, invalid, not-run, undefined, or unsupported result fields must be null with the applicable typed reason code. A serializer must not default a missing probability to `0.5`, a missing interval to `[0,1]`, or an undefined coefficient to zero.

## Exact recommended successor revisions

**[Proposal]** The next document revisions should occur in this order. This file makes none of them:

1. **Human instrument successor.** Add immutable estimand-card references; state fixed-panel instrument debugging as the first target; incorporate the exact raw/display/derived response ledger and `r_raw` adapter; require strong directed connectivity for ordinary unpenalized BT; and keep cognitive validation before nominal/tie/ordinal claims.
2. **Construct and bundle successor.** Resolve the coverage contradiction before collection. Either validate reusable construct identities and assign each claimed dimension to at least 10 genuinely applicable families with a prelocked `6/4` split, or remove the calibration claim for that dimension. Do not rename or pool the current family-local `VT-P*` cards to manufacture coverage.
3. **Candidate/treatment successor.** If utility is scientifically needed, define independently evidenced recurring treatment IDs and balanced assignments across families. Otherwise formally limit the first study to pair-level outcomes. Never treat A/B side, vendor, model, or prose authorship as a treatment by default.
4. **Counterfactual successor.** Create separately reviewed base/counterfactual operation definitions, semantic-validity checks, changed/held-constant fields, order controls, and cognitive-interview tasks. Current counterexamples remain excluded diagnostic prose.
5. **Graph/measurement successor.** Add versioned `EstimandDefinitionRecord`, `MeasurementResultRecord`, probability, interval, terminal-status, simulation, and domain-guard contracts while preserving hard/soft and evidence/decision/delivery separation.
6. **Judge-system successor.** Add the raw response/mapping/missingness ledger, side/order codes, event-probability and interval fields, fixed-panel/population target, diagnostics, and fail-closed status union. Do not let a judge emit a generic confidence or scalar score.
7. **Materials-register successor.** Add distinct future needs for cognitive interviews, construct-coverage review, simulation, fixed-panel pilot data, statistician/method review, and retained probability/interval records. Keep P4-06 `missing` until the required people, materials, controls, and authorization actually exist.
8. **`r2` successor only after its existing prerequisites.** If an exact Track B release is separately approved, bind only that release and later reference approved deterministic schemas. Do not bind this Track A paper, add a model/judge to the current static boundary, or treat this specification as L1/L2 authority.

## Closure

**[Cross-source finding]** The current material is useful for design falsification: it exposes a response ontology, 22 varied contexts, 44 unique candidate drafts, and the exact places where measurement cannot yet proceed. Its present shape also proves that bundle-wide family count is not construct coverage and that isolated A/B dyads are not a global ranking graph.

**[Proposal]** The narrow supported next path is: cognitively validate the response and construct meanings; repair or explicitly narrow construct-to-family coverage; simulate the exact proposed allocation and analysis; materialize only under separate authority; then run a fixed-panel instrument-debugging pilot that reports descriptive and pair-level results first. Recurring treatment utility, event-specific calibration, set-level voice, rater-population inference, and any scalar policy remain unavailable until their own identities, data, assumptions, controls, and evidence exist.

Current authoritative status:

```text
document_status: proposed
execution_status: not-run
study_status: not-authorized
calibration_status: not-established
implementation_status: none
architecture_binding_status: none
approval_status: none
```
