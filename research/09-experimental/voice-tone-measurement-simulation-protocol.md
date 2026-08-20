---
title: Voice and tone measurement simulation protocol
status: proposed
started: 2026-08-18
updated: 2026-08-19
evidence_cutoff: 2026-08-19
document_id: VT-MSP
document_revision: design-0.1
execution_status: not-run
authority: none
phase_dependency: P4-06c
scope: Proposal-only reproducible pre-pilot simulation design for voice and tone allocation and analysis operating characteristics
source_documents:
  - voice-tone-measurement-estimand-and-coverage-specification.md
  - voice-tone-measurement-primary-research-notes-2026-08-17.md
  - voice-tone-human-calibration-instrument.md
  - voice-tone-graph-and-measurement.md
  - product-study-and-judge-agent-system.md
  - voice-tone-synthetic-calibration-development-bundle.md
  - materials-and-access-register.md
  - ../00-method/research-protocol.md
  - ../05-technology/security-privacy-and-trust-boundaries.md
---

# Voice and tone measurement simulation protocol

## Result and non-authority boundary

**[Proposal]** Use the frozen synthetic-generating assumptions, scenario grid, estimand mappings, diagnostics, Monte Carlo rules, record contracts, and independent-review gate below to examine the operating characteristics of candidate voice/tone measurement designs before a human pilot is considered.

This document is a **paper protocol only**. Its simulation status is `not-run`, its authority is `none`, and it supplies no result. All simulated messages, raters, outcomes, predictions, events, effects, and probabilities described below are hypothetical. A future simulation could reveal mathematical or allocation failure under stated assumptions; it could not establish construct validity, cognitive validity, a human-pilot outcome, product quality, organization voice, user impact, approval, or a universally valid threshold.

No numeric threshold, sample size, exclusion, interval method, estimator, graph rule, reliability cutoff, calibration rule, or stopping rule in this document is accepted for study use. Each is a proposed object to stress-test. This file does not:

- run or authorize a simulation, study, pilot, model, agent, judge, harness, browser, connector, network call, software installation, or executable;
- create ratings, gold labels, calibrated probabilities, voice profiles, treatment winners, approved fixtures, or evidence about real people;
- resolve the current construct-to-family coverage contradiction or validate any response meaning;
- bind or advance an architecture, materials-register phase, release, product decision, or implementation plan; or
- authorize persistence or publication of a future result.

**[Cross-source finding]** The [materials register](materials-and-access-register.md#p4-06-measurement-readiness-decomposition) now records `P4-06c` as `specified-not-materialized`: this document supplies the proposed plan, but not the required conforming simulator or results. Independent method review, cognitive validation, pilot authorization, and pilot data also remain absent.

## Evidence and interpretation boundary

The claim labels follow the repository [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary). Statistical availability is not measurement validity.

| Reconciled source | Contract carried into this protocol | Boundary retained |
| --- | --- | --- |
| [Estimand and coverage specification](voice-tone-measurement-estimand-and-coverage-specification.md#result-and-non-authority-boundary) | Eleven explicit estimands; fixed-message/fixed-panel first target; exact coverage failure; typed outcome, missingness, interval, and status rules | Existing estimand dispositions are not upgraded |
| [Primary measurement notes](voice-tone-measurement-primary-research-notes-2026-08-17.md#required-simulations-and-sensitivity-analyses) | Dependence-aware simulation, directed-graph diagnostics, interval coverage, calibration, missingness, and sensitivity requirements | Mathematical methods do not validate constructs |
| [Human calibration instrument](voice-tone-human-calibration-instrument.md#pairwise-outcomes-ties-and-abstentions) | Five submitted outcomes, separate procedural abstention, raw ordinal bands, side/order coding, and proposed coverage/allocation numbers | Instrument remains unrun; response meanings require cognitive validation |
| [Graph and measurement model](voice-tone-graph-and-measurement.md#part-iii--mathematical-measurement-model) | Hard/soft separation, multidimensional measures, typed graph identity, comparison topology, uncertainty, and no universal scalar | No soft score may compensate for a hard failure |
| [Judge-agent system](product-study-and-judge-agent-system.md#evidence-and-state-model) | Immutable evidence/judgment separation, exact version provenance, null-on-unsupported behavior, and human authority | No judge exists here and no generated value is truth or approval |
| [Synthetic development bundle](voice-tone-synthetic-calibration-development-bundle.md#shared-interpretation-contract) | Current 22-family, 22-isolated-pair, 44-candidate development structure | Draft prose is not a rating, eligible packet, holdout, or recurring-treatment graph |
| [Security boundaries](../05-technology/security-privacy-and-trust-boundaries.md#non-negotiable-invariants) | Fail-closed capability, untrusted-input, minimum-data, provenance, and independent-control expectations | No capability can self-authorize and no raw participant or production data is needed |

## Frozen source manifest

The design snapshot is the UTF-8 bytes of the nine local inputs below. A future run must recompute every SHA-256 before scenario generation. Any mismatch makes that run `invalid_run`; silently accepting a newer source is prohibited.

| Source | SHA-256 at design freeze |
| --- | --- |
| [Estimand specification](voice-tone-measurement-estimand-and-coverage-specification.md) | `46cb3198471bffe0e1159f005d56c83db881a5ca054f502a6d63f227288361d7` |
| [Primary measurement notes](voice-tone-measurement-primary-research-notes-2026-08-17.md) | `f4d8c21a1ffebf7048dbdf441030f487aaf12cedca3a257bcec0d63f63a3d35c` |
| [Human instrument](voice-tone-human-calibration-instrument.md) | `cd72336240fa79afed74ad0892967439f231051c6ca49a6e296d8018c767ca8e` |
| [Graph model](voice-tone-graph-and-measurement.md) | `b2d9512c904038faf7fb113fa15f98d9a50a4f0e7c713f6e2f53cb3d622b3384` |
| [Judge system](product-study-and-judge-agent-system.md) | `1f2782f10d180c120798746e267e4b58e40e1b3f6b870d1a98e5d5ec91720946` |
| [Synthetic bundle](voice-tone-synthetic-calibration-development-bundle.md) | `21dd80efb1c2190b75f6367fe4fbcfa7a2dd4ac7762ac1e184074b52c7285f12` |
| [Materials register](materials-and-access-register.md) | `51121966ef93d68ccc83fbced3a2e8f1bc0254c64c3a01edda97471aa70a6292` |
| [Research protocol](../00-method/research-protocol.md) | `ed9ba9bc2714a53cf107043e00eee6433ab453d9425a58842adc50abdf685ac4` |
| [Security boundaries](../05-technology/security-privacy-and-trust-boundaries.md) | `7841c183b42c0cbb9c921b93644e68e9120b9b8f1fef3e8820257458057c6da6` |

No message text, production content, participant data, credential, external corpus, or hidden evaluator is an input. Future result records must add the protocol-file hash, implementation hash, runtime manifest, and output hashes; they may not replace this source manifest.

**[Research finding]** The 19 August source-manifest refresh changed only the judge system's browser-detach/cleanup contract and the materials register's recorded decision not to retry Chrome Guest. The scenario grid, generating assumptions, estimands, analysis methods, status unions, stopping rules, and mathematical design remain unchanged. The refreshed hashes prevent a future run from silently accepting the earlier control-state snapshot; they do not constitute a simulation run, independent method review, or approval.

## Study question, targets, and units

**[Proposal]** The simulation question is: under explicitly synthetic assumptions, when do proposed allocation and analysis choices return defined, correctly scoped, and uncertainty-aware outputs, and when must they fail closed?

The primary simulated target is the same narrow target selected by the [estimand specification](voice-tone-measurement-estimand-and-coverage-specification.md#first-study-generalization-target): one exact finite set of eligible synthetic semantic-message families and one exact finite qualified-rater panel. Effects for that finite set and panel are drawn once per scenario and then held fixed across Monte Carlo replicates. Replicates vary randomized allocation, procedural disposition, submitted outcome, and estimator behavior. They do **not** imply sampling from all messages or all raters.

Three sensitivity targets deliberately change the question:

| Target ID | Locked `target_population_kind` | Messages | Raters | Permitted interpretation |
| --- | --- | --- | --- | --- |
| `T-FIXED-FIXED` | `fixed_messages_fixed_panel` | Exact finite synthetic set | Exact finite synthetic panel | Instrument-debugging behavior for those simulated identities only |
| `T-NEW-MESSAGE` | `new_messages_fixed_panel` | Effects redrawn each replicate | Exact finite synthetic panel | Hypothetical new-message generalization under the generating distribution only |
| `T-NEW-RATER` | `fixed_messages_rater_population` | Exact finite synthetic set | Effects redrawn each replicate | Hypothetical new-rater generalization under the generating distribution only |
| `T-NEW-RATER-MESSAGE` | `new_messages_rater_population` | Effects redrawn each replicate | Effects redrawn each replicate | Hypothetical superpopulation behavior under both generating distributions only |

Changing the target changes the estimand and interval procedure. A method that covers one row may not be reported as covering another.

The observational unit is one submitted or procedurally unsubmitted rater × semantic-message-family × construct-card × candidate-pair assignment. The dependence units are rater, semantic-message family, card identity, recurring treatment where present, and repeated assignment. Candidate-side position and session order are design variables, not properties of the content.

## Current-design negative controls

Before stochastic generation, every future implementation must reproduce these source-derived deterministic checks:

| Check ID | Frozen current condition | Required diagnostic |
| --- | --- | --- |
| `NC-COVERAGE` | Every one of 49 current card identities has only one applicable family; `VT-D01`–`VT-D07` each have `1/1/0`; every `VT-P*` has `1/1/0` or `1/0/1` | Zero card identities pass proposed `10 total / 6 calibration / 4 public-test` coverage |
| `NC-GRAPH` | 22 isolated A/B pairs, 44 unique candidate IDs, 22 undirected components, no recurring treatment | Global candidate Bradley–Terry utility is `unsupported`; no rank or finite global MLE is emitted |
| `NC-HOLDOUT` | A card with `0` public-test families | Held-out dimension calibration output is null with an exact coverage reason |

Failure to reproduce any negative control makes the entire future run `invalid_run`. Passing them is implementation consistency, not substantive evidence.

## Estimand mapping

The simulation may evaluate estimator behavior only where a synthetic truth is defined. It must retain the [locked estimand IDs and dispositions](voice-tone-measurement-estimand-and-coverage-specification.md#estimand-card-contract-and-terminal-statuses); it may not invent a single voice-quality estimand.

| Estimand | Synthetic quantity, when defined | Required simulation treatment | Present design disposition remains |
| --- | --- | --- | --- |
| `EST-01` | **Descriptive response and prevalence:** raw LEFT/RIGHT, derived A/B, all other submitted categories, procedural reasons, invalidity, and unresolved missingness for exact cards/messages/panel | Category recovery, explicit denominators, missingness, side/order sensitivity, and interval coverage | `design_supported` |
| `EST-02` | **Evidence-span coverage and defect prevalence:** resolvable required-span coverage, insufficient-context field completion, packet-defect flags, and `hard_issue_suspected`, all separately | Deterministic locator/denominator/null invariants and missingness sensitivity only; no composite evidence-quality truth | `design_supported` |
| `EST-03` | **Nominal five-outcome response reproducibility:** nominal agreement and alpha for one cognitively validated card and five submitted outcomes | Prevalence/dependence/degeneracy behavior, confusion tables, missingness, and interval coverage; no universal cutoff | `requires_cognitive_validation` |
| `EST-04` | **Ordinal fit-band reproducibility:** candidate-specific `r_raw` bands `0..4`, with separate `r_graph = r_raw + 1` and `x = r_raw / 4` adapters | Ordinal agreement/alpha, band and threshold recovery, dependence, degeneracy, and interval coverage; never infer equal spacing | `requires_cognitive_validation` |
| `EST-05` | **Pair-level outcome:** full five-outcome distribution for one exact isolated A/B dyad and fixed panel | Pair-specific category bias/coverage, missingness, disagreement, and side sensitivity; no between-dyad utility | `requires_pilot_data` |
| `EST-06` | **Presentation-side and card-order effect:** category-specific side/order contrasts under the exact centered coding and allocation | Balance, bias, type-I error, power, aliasing, selection, and interval coverage | `requires_simulation` |
| `EST-07` | **Recurring-treatment utility:** utility only for a future stable treatment identity recurring in an admissible observed directed graph | Current isolated-dyad negative control plus hypothetical recurring-treatment topology, separation, and strong-connectivity diagnostics | `unsupported` |
| `EST-08` | **Event-specific automated-predictor calibration:** future `E_mismatch/card-version` probability for one exact pre-outcome prediction profile and held-out scope | Synthetic calibration, resolution, discrimination, answer coverage, selective risk, and missing prediction; current real output null | `unsupported` |
| `EST-09` | **Counterfactual invariance:** paired five-outcome transitions and raw-band differences for an exact reviewed operative change | Valid/invalid operation, semantic-drift, order, threshold-shift, and paired-missingness sensitivities only | `requires_cognitive_validation` |
| `EST-10` | **Set-level organization voice:** future per-principle vector/distribution over a context-balanced recurring construct set | No current generating truth or estimator; test only that one-family/current-card shortcuts fail closed | `unsupported` |
| `EST-11` | **Any scalar decision policy:** future local policy over complete hard-gate state plus a separate soft vector and uncertainty | No generating truth or estimator; verify that hard/unknown/missing states cannot be compensated or scalarized | `unsupported` |

Simulation cannot move `EST-03`, `EST-04`, or `EST-09` past cognitive validation, `EST-05` past pilot data, or `EST-07`, `EST-08`, `EST-10`, or `EST-11` into current support.

Where the table requires fixed-message/fixed-panel interval coverage, `design-0.1` exposes a blocking method gap: it has no target-valid interval for category proportions, nominal/ordinal alpha, process proportions, direct calibration metrics, or paired counterfactual summaries. Those metrics may have point estimates, but the missing interval is an explicit non-pass prerequisite for every fixed-panel, sample, coverage, reliability-bound, or counterfactual operating decision. It may not disappear from an “applicable bands” denominator, and no `simulation_supported_for_*` phrase may be emitted for a decision that requires it.

## Protocol identity, serialization, and random streams

### Frozen design identifiers

| Field | Frozen value |
| --- | --- |
| `protocol_id` | `VT-MSP/design-0.1` |
| `scenario_grid_id` | `VT-MSP-GRID/design-0.1` |
| `generating_profile_id` | `VT-MSP-DGM/design-0.1` |
| `math_profile_id` | `VT-MSP-MATH/design-0.1` |
| `analysis_profile_id` | `VT-MSP-ANALYSIS/design-0.1` |
| `schedule_profile_id` | `VT-MSP-SCHEDULE/design-0.1` |
| `population_block_id` | `VT-MSP-POP/design-0.1` |
| `record_profile_id` | `VT-MSP-WIRE/design-0.1` |
| `master_seed_hex` | `0936b9edacae71a576b398b17e36ea1db4d4f0162706559ce5cd3444f0b3e0cc` |
| `prng_id` | `Philox-4x32-10` |
| `canonical_serialization` | `RFC 8785 JCS`, UTF-8, duplicate-key rejection |
| `content_hash` | `SHA-256` |

Scenario parameters are canonical JSON strings, integers, booleans, or decimal strings. Decimal strings must match `^-?(0|[1-9][0-9]*)(\.[0-9]+)?$` and are parsed once into IEEE-754 binary64 using round-to-nearest, ties-to-even. Non-finite numbers, negative zero, duplicate keys, implicit defaults, unordered set semantics, locale-sensitive number parsing, and runtime timestamps inside hashed design records are prohibited.

The hash of a record is SHA-256 over its RFC 8785 canonical UTF-8 bytes with its own top-level `record_hash` field omitted. Arrays retain declared order. IDs are case-sensitive. The future implementation manifest must freeze language, runtime, numerical-library, estimator-library, operating-system, and container/build hashes before the first run; an unfrozen or changed manifest makes a run invalid.

Scenario identity uses a separate, noncircular preimage. `ScenarioParameterPreimage` has exactly these eight top-level keys: `analysis_profile_id`, `factor_selections`, `generating_profile_id`, `math_profile_id`, `scenario_grid_id`, `schedule_profile_id`, `target_id`, and `target_population_kind`. The four profile values and both target values are strings. `factor_selections` has exactly the 26 keys shown in the baseline vector below. Categorical selections are ID strings; rate/effect selections are objects with exactly string `id` and decimal-string `value`; count selections have string `id` and integer `value`; `coverage` has exactly integer `calibration`, `public_test`, and `total` plus string `id`. No other nesting, optional member, null, alias, or implicit default is allowed. Expected-null conditions are deterministic analytic outputs, never scenario-identity inputs.

`ScenarioParameterPreimage` contains no arm membership, `scenario_id`, `scenario_parameter_hash`, `record_hash`, timestamp, result, seed output, or derived field. First deduplicate complete factor/target bundles, then union and sort their arm memberships as `ScenarioRecord` provenance outside the preimage. Compute `scenario_parameter_hash = SHA-256(JCS(ScenarioParameterPreimage))`; derive `scenario_id = "SIM-" + first_20_lowercase_hex(scenario_parameter_hash)`. The completed `ScenarioRecord` then receives its own ordinary `record_hash`. A short-ID collision invalidates the grid; the full parameter hash is always the primary key.

The following single line is the normative RFC 8785 baseline preimage; its member names, nesting, integer/string types, and decimal-string spellings are exact.

```json
{"analysis_profile_id":"VT-MSP-ANALYSIS/design-0.1","factor_selections":{"base_rate":{"id":"Q30","value":"0.30"},"calibration_profile":"K0-CALIBRATED","card_count":{"id":"CARD4","value":4},"counterfactual_profile":"CF0-INVARIANT","coverage":{"calibration":6,"id":"C10","public_test":4,"total":10},"dependence_profile":"D1-MODERATE","graph_profile":"G-NONE","heldout_count":{"id":"N1000","value":1000},"heterogeneity_profile":"H0-HOMOGENEOUS","invalidation_rate":{"id":"I00","value":"0.00"},"locale_stratum":"SLOC-1","minimum_event_count":{"id":"E20","value":20},"missing_prediction_rate":{"id":"MP00","value":"0.00"},"missingness_mechanism":"MCAR","nonlock_rate":{"id":"NL00","value":"0.00"},"nonstart_rate":{"id":"NS00","value":"0.00"},"order_design":"O-BALANCED","order_effect":{"id":"OFX0","value":"0.00"},"ordinal_profile":"OM0-CORRECT-PO","prevalence_profile":"P0-BALANCED","procedural_rate":{"id":"M05","value":"0.05"},"rater_count":{"id":"R3","value":3},"session_profile":"X0-NONE","side_design":"S-EXACT","side_effect":{"id":"SFX0","value":"0.00"},"treatment_context":{"id":"TC0-NONE","value":"0.00"}},"generating_profile_id":"VT-MSP-DGM/design-0.1","math_profile_id":"VT-MSP-MATH/design-0.1","scenario_grid_id":"VT-MSP-GRID/design-0.1","schedule_profile_id":"VT-MSP-SCHEDULE/design-0.1","target_id":"T-FIXED-FIXED","target_population_kind":"fixed_messages_fixed_panel"}
```

Its normative `scenario_parameter_hash` is `99174ca8571c01f2decac14e6247398bf5dad82e879a92c4d08fab8883925066`, and its short ID is `SIM-99174ca8571c01f2deca`.

The fixed, nested population-block preimage is the exact RFC 8785 line `{"card_max":7,"family_max":22,"population_block_id":"VT-MSP-POP/design-0.1","rater_max":8,"treatment_max":8}`; its SHA-256 is `ccf7463f2c6c3344ff06421e0e32ceecab30103333eaa82fdd012e8350182e20`. Coverage, card, and panel levels select prefixes of these same 22 family, 7 card, and 8 rater IDs. Thus R3/R5/R8, C1/C10/C16/C22, CARD1/CARD4/CARD7, allocation, and target comparisons share the same nominal fixed identities and underlying standard-normal slots.

For each ordinary `(scenario_parameter_hash, replicate_index, stream_name)`, compute:

`SHA-256(UTF8("VT-MSP/design-0.1" || NUL || master_seed_hex || NUL || scenario_parameter_hash || NUL || replicate_index || NUL || stream_name))`.

For `finite-effects` and `finite-effects-reference` only, replace `scenario_parameter_hash` in that formula with the frozen `population_block_hash`; all other bytes and separators are unchanged. `replicate_index` is unsigned base-10 ASCII with no leading zero; stochastic replicates are `1..100000`, scenario-frozen finite effects use `0`, and truth-reference indices use `1..10000000`. Interpret digest bytes `0..3` and `4..7` as Philox key words `k0,k1`, and bytes `8..11`, `12..15`, `16..19`, and `20..23` as counter words `c0,c1,c2,c3`, all unsigned big-endian. Store bytes `24..31` as `stream_fingerprint`; do not use them as random input. Increment the 128-bit counter as one unsigned big-endian integer, emit Philox words in `c0,c1,c2,c3` order, and map each word to `u = (word + 0.5) / 2^32`.

The only stream names, in consumption order, are `finite-effects`, `finite-effects-reference`, `allocation`, `nonstart`, `nonlock`, `procedural-abstention`, `procedural-reason`, `invalidation`, `submitted-outcome`, `ordinal-band`, `evidence-span`, `counterfactual`, `event`, `prediction`, and `resample`. Inside either finite-effects stream, always consume the complete population block: one inverse-normal draw in this exact order: family effect by channel `(preference,rateability,unacceptability,tie)` then all 22 ascending family IDs; rater effect by the same channel order then all 8 rater IDs; rater×family effect by channel, rater ID, family ID; rater severity by rater ID; threshold location by rater ID; threshold log-scale by rater ID; one uniform interpretation-class draw by rater ID; and treatment×context effect by all 8 treatment IDs then all 22 family IDs. Lower factor levels use prefixes and still consume unused slots. Draws for zero-SD or inactive `H*` parameters are consumed and multiplied by zero; class 1 is selected when its uniform is `<0.70`.

Other stream field order is: allocation `(split,side,family_order,card_order,counterfactual_order)`; one variate per scheduled member in `nonstart`, `nonlock`, `procedural-abstention`, and `procedural-reason`, except the shared counterfactual-pair nonstart defined below; invalidation `(flag,reason)`; submitted outcome; ordinal `(left,right)`; evidence `(span_resolves,missing_context_complete,hard_issue_suspected,identity_defect,context_defect,rendering_defect,accessibility_defect,allocation_defect)`; counterfactual `(outcome,left_band,right_band)`; event `(oracle_probability,observed_event)` per ascending calibration case; prediction `(error,missingness)` per ascending calibration case; and resampling in method-ID, interval-ID, resample-index, selection-index order. Objects are ordered by canonical synthetic ID. Every scheduled object consumes its full fixed allotment even if an earlier disposition makes later values unused. Standard normals use `AS241/binary64`; beta values use one inverse-beta-CDF transform under the frozen numerical library; correlated normals use lower-triangular Cholesky with positive diagonal. No adaptive reseeding, global mutable generator, stream reuse, or outcome-dependent consumption is allowed.

Card/candidate latent fits are deterministic truths, not omitted random draws. For ascending card index `c=1..7`, canonical candidate-A fit is `(-0.75,-0.50,-0.25,0.00,0.25,0.50,0.75)_c`; candidate-B fit is its negative. `CARD1` uses the first value, `CARD4` the first four, and `CARD7` all seven. The ordinal family, rater, and rater×family terms are exactly the already generated `rateability`-channel effects; rater severity and treatment×context are then added as declared. No unnamed ordinal channel exists. Thus every ordinal bias/RMSE cell has a stored pre-noise truth.

The conformance vector below is normative. It uses that baseline `scenario_parameter_hash`, replicate index `1`, and stream `allocation`.

| Value | Expected lowercase hexadecimal words/bytes |
| --- | --- |
| Derived SHA-256 digest | `cf6e7224bce4fd212e66682ed44513c745f8579564c6045573c2f86243f2510f` |
| Key words `k0 k1` | `cf6e7224 bce4fd21` |
| Initial counter words `c0 c1 c2 c3` | `2e66682e d44513c7 45f85795 64c60455` |
| First Philox output block | `62130e4c 598a535f 7354a9c3 84fdecb0` |
| Stored stream fingerprint | `73c2f86243f2510f` |

The protocol specifies algorithms and records, not executable code. An independently verified conformance implementation is a separate future material.

## Synthetic-generating model

### Admission and identities

Synthetic IDs are `SMSG-####`, `SCARD-####`, `SRATER-####`, `STREAT-####`, and `SASSIGN-########`. They carry no prose. Hard factual/safety eligibility and measurement comparability are frozen Boolean inputs. A hard failure, unknown eligibility, card mismatch, or non-comparable pair is excluded before soft generation and recorded; it cannot be offset by a simulated soft score.

Coverage cells define exact counts of applicable family IDs by split. Splits are assigned before effects or outcomes and are immutable. Calibration code may inspect calibration IDs only. Public-test IDs and synthetic event labels are unavailable to fitting/tuning functions until the evaluation stage.

### Crossed finite effects

For every nondegenerate scenario, independent standard-normal effects are generated for four latent channels: pair preference, rateability, absolute unacceptability, and tie propensity. The dependence profile scales shared family effects, shared rater effects, and rater × family interactions:

| Dependence ID | Family SD | Rater SD | Interaction SD | Primary meaning |
| --- | ---: | ---: | ---: | --- |
| `D0-INDEPENDENT` | `0.00` | `0.00` | `0.00` | Bernoulli/multinomial independence negative control |
| `D1-MODERATE` | `0.35` | `0.25` | `0.15` | Moderate crossed clustering |
| `D2-HIGH` | `0.80` | `0.60` | `0.40` | High crossed clustering |

Within a channel the finite effect is `family + rater + interaction`; the four channels are independent throughout `design-0.1`. For every stochastic replicate `r`, generate complete `finite-effects` slot sets using both replicate index `0` and index `r`, even when one set will be unused. Fixed-message targets select index-0 family and treatment×context slots; new-message targets select index-`r` family and treatment×context slots. Fixed-panel targets select index-0 rater, severity, threshold, and interpretation-class slots; rater-population targets select those slots at index `r`. A rater×family interaction selects index `0` only for `T-FIXED-FIXED`; if either crossed unit is redrawn, it selects index `r`. Unused complete slot sets remain in the seed-consumption audit. This component rule, rather than one ambiguous stream redraw, defines all four target rows.

Rater heterogeneity is a separate frozen factor:

| ID | Severity | Threshold behavior | Construct-interpretation behavior |
| --- | --- | --- | --- |
| `H0-HOMOGENEOUS` | `0` | Common thresholds | One interpretation class |
| `H1-SEVERITY` | Rater shift `N(0,0.50^2)` added to ordinal latent fit | Common thresholds | One class |
| `H2-THRESHOLD` | Rater shift `N(0,0.50^2)` | Rater thresholds `s_r + exp(l_r) * tau`, with `s_r~N(0,0.35^2)` and `l_r~N(0,0.20^2)` | One class |
| `H3-INTERPRETATION-MIX` | Same as `H1-SEVERITY` | Common thresholds | Class 1 probability `0.70`; class 2 probability `0.30`, canonical preference loading `-1`, tie logit `+0.75`, insufficient-context logit `+0.50`, and ordinal-latent loading `-1` |

Class membership and rater parameters are finite effects under fixed-panel targets and redraw only for rater-population targets. `H3-INTERPRETATION-MIX` intentionally represents an incoherent pooled construct; it diagnoses sensitivity and cannot validate a card.

For recurring-treatment scenarios only, treatment truths on eight identities are `(-1.40,-1.00,-0.60,-0.20,0.20,0.60,1.00,1.40)` in ascending `STREAT` order. Treatment×context interactions are independent zero-mean normal effects with SD `TC0-NONE=0.00`, `TC1-MODERATE=0.35`, or `TC2-HIGH=0.80`. A decisive contrast uses the difference between both treatments' base utilities plus their family-specific interactions. `G0-CURRENT-DYADS` has no recurring treatment truth and must remain null.

### Synthetic truth by target

Truth is frozen before replicate results are inspected. For `T-FIXED-FIXED`, a proportion/process/evidence/counterfactual truth is the ratio of its exact expected numerator to exact expected eligible denominator over the frozen finite schedule and index-0 effects; the implementation sums the declared Bernoulli and categorical probabilities rather than realized draws. Nominal or ordinal alpha truth is the same statistic applied to exact expected coincidence counts. A correctly specified regression truth is its stored generating coefficient; a pooled or misspecified model without one stored scalar target uses `synthetic_truth_status=undefined` with `misspecified_model_no_scalar_truth` and receives no bias or coverage decision, while its point estimate may remain `estimated`. `G6-ROUND-ROBIN` uses the centered eight-treatment truth vector; graph guard fixtures use `not_applicable`, not a utility truth. Calibration uses its sealed oracle probabilities for proper-score expectations and profile diagnostics, not `EV-BIAS`.

Only Arm E evaluates superpopulation coverage. For each of `T-NEW-MESSAGE`, `T-NEW-RATER`, and `T-NEW-RATER-MESSAGE`, its five `A-CAT-PROP` truths are the superpopulation ratios `E[valid submitted category-k count]/E[valid submitted five-category count]` under the declared DGM and complete Arm-E schedule. Compute them with an independent reference integration: at each reference index, use `finite-effects-reference`; retain index-0 components for fixed units and select reference-index components for the redrawn message, rater, and interaction units under the same component rule as the target; analytically sum conditional numerator and denominator probabilities over the entire schedule; then ratio the accumulated sums. Start with `1,000,000` reference indices, add blocks of `1,000,000`, and cap at `10,000,000`. Within each accumulated block, use consecutive batches of `10,000`; reference Monte Carlo error is the sample SD of batch ratios divided by the square root of the batch count. Every five-category truth must have error at most `0.00025`; otherwise `synthetic_truth_status=undefined`, value is null, and reason is `reference_precision_unmet`. The four target cells use the same reference indices and population-block slots, so fixed components and random numbers are paired. Reference records and their stream fingerprints are retained separately from study replicates.

### Procedural and submitted outcomes

Each scheduled assignment passes through this fixed sequence: `eligible → nonstart check → started → nonlock check → procedural-abstention check and reason → raw display response locked → invalidation check → derived mapping`. A nonstart has no `started_at` or rating; a nonlock has `started_at` but no `locked_at`; both remain in the assignment ledger. Procedural abstention has `response_status=abstained`, no display outcome, and no fit bands. Invalidation occurs only after a raw lock and preserves the raw record plus `invalid_reason`.

Submitted-record invalidation is MCAR and independent of outcome. After every raw lock, the first reserved invalidation uniform sets `invalidated=1` iff it is less than the selected `I02=0.02` or `I10=0.10`; `I00` deterministically returns zero. The second uniform is always consumed and, when invalidated, selects one of four equal-width synthetic reason bins in this order: `post_lock_integrity_failure`, `mapping_reference_mismatch`, `duplicate_submission`, `late_exclusion_trigger`. These exact synthetic reasons are integrity diagnostics, not prevalence claims. No invalidation draw may delete or rewrite the locked raw record.

For target procedural-abstention rate `m`, MCAR uses `Pr(M=1)=m`; MAR adds `+0.75` log-odds for last-quartile session position and `+0.50` for `high_rateability_difficulty`; MNAR adds `+1.00 * abs(canonical_preference_contrast)` to the MAR predictor. Nonstart and nonlock have their own rates and streams. Under MAR, nonstart adds `+0.50 * interpretation_class_mismatch`; nonlock adds `+0.75 * last_quartile` and `+0.50 * fatigue_active`. MNAR adds the same unobserved absolute-contrast term.

Covariates are exact: with `N` scheduled session units and 1-based position `i`, `last_quartile=1` iff `i > floor(0.75*N)`; `high_rateability_difficulty=1` iff the pre-outcome family+rater+interaction rateability effect is strictly greater than `0.50`; `high_context_difficulty=1` iff the family-only rateability effect is strictly greater than `0.50`; `interpretation_class_mismatch=1` only for class 2 under `H3-INTERPRETATION-MIX`; and `fatigue_active=1` only in the last quartile under `X1-FATIGUE` or `X3-COMBINED`.

`NS*`, `NL*`, and `M*` are conditional hazards, not scheduled-population incidences: nonstart is conditional on eligible assignments; nonlock on the realized started set; and procedural abstention on the realized started-and-locked set. Solve and draw them in that order. For each reached risk set, a target rate `0.00` bypasses the logit, records `boundary_zero`, and returns no event. For a target strictly between zero and one, solve the intercept so the mean logistic probability over that realized at-risk set equals the target: binary64 bisection on `[-40.0,40.0]`, stop at the first absolute mean error at most `1e-12`, cap `200` iterations, then consume its already reserved draws. An empty later risk set records a zero denominator and no event rather than inventing an intercept. `MP00` uses the same zero bypass on all Arm-F cases. Failure to bracket or converge sets `run_validity_status=invalid_run` with `intercept_solver_failure`. Truth and denominator ledgers report each conditional hazard against its named reached risk set and also report scheduled-population incidence separately.

Conditional on procedural abstention, reason is drawn from the exact instrument enum. Baseline weights are: `outside_qualified_scope=0.15`, `conflict_of_interest=0.10`, `blindness_breach=0.10`, `inaccessible_presentation=0.10`, `locale_or_language_unsupported=0.15`, `technical_failure=0.20`, `consent_withdrawn=0.10`, and `other_declared_reason=0.10`. MAR/MNAR multiply, then renormalize, the applicable reason weight by `exp(0.75)` for: `interpretation_class_mismatch`/outside scope; `S-ALIASED`/blindness breach; `fatigue_active`/inaccessible presentation; `SLOC-2`/locale unsupported; `last_quartile`/technical failure; and `high_context_difficulty`/other declared reason. Conflict and consent weights have no covariate. These are hypothetical mechanisms, not prevalence claims about people.

The prevalence profile is ordered in canonical latent categories `(A, B, indistinguishable, both_unacceptable, insufficient_context)`. For a nondegenerate profile, start with `log(pi_k)`. Let the canonical A-versus-B contrast include family/rater/interaction effects, any recurring treatment×context effect, `beta_side * 2 * side_code_a`, `beta_order * order_code`, and declared carryover. Add half this contrast to canonical `A` and subtract half from `B`; add the rateability effect to `insufficient_context`, the unacceptability effect to `both_unacceptable`, and the tie effect to `indistinguishable`. Normalize with softmax and draw one **latent canonical category**. Degenerate profiles bypass logarithms.

The latent category is never written as the raw decisive response. The frozen presentation assignment maps candidate A and B to left/right. Latent `A` becomes raw `LEFT` when A is displayed left and raw `RIGHT` when A is displayed right; latent `B` maps conversely. The three nondecisive categories retain their labels. The locked raw record therefore stores exactly `LEFT`, `RIGHT`, `indistinguishable`, `both_unacceptable`, or `insufficient_context`. A separate immutable mapping record loads that raw response and assignment, derives canonical `A` or `B` where applicable, and preserves both fields, candidate IDs, assignment hash, and mapping version. Raw LEFT/RIGHT and derived A/B are reported in separate numerator/denominator fields and are never pooled.

`design-0.1` fits no tie likelihood: `indistinguishable` remains a fifth nominal category. `both_unacceptable` and `insufficient_context` are always separate substantive outcomes. None is a loss, missing value, or procedural abstention. Invalid and unobserved records are terminal states outside the five-category vector. Any future tie model requires cognitive validation and a new protocol revision.

For `EST-02`, a required evidence span resolves with baseline probability `0.90`; required missing-context fields complete with probability `0.90`; and each named packet-defect flag plus `hard_issue_suspected` has baseline probability `0.02`. The MAR stress adds `+0.75` log-odds of resolver failure for late session and high context difficulty. These indicators test locator, denominator, and null invariants only. They do not make a span correct, a hard issue true, or a composite evidence-quality construct.

### Ordinal bands

For each candidate/card rating, a latent value equals the declared synthetic card fit plus matching family, rater, interaction, severity, session, and treatment×context effects. Ordinal profile is exactly one of:

| ID | Generating rule |
| --- | --- |
| `OM0-CORRECT-PO` | For `j=0..3`, `logit Pr(r_raw<=j given z,r)=tau_(r,j)-1.00*z`; baseline `tau=(-1.25,-0.35,0.35,1.25)`, so the stored common latent coefficient is exactly `beta=1.00` with this sign |
| `OM1-NONPROPORTIONAL` | Adjacent logits `log(P_j/P_(j-1)) = a_j + b_j*z`, `a=(1.00,0.50,-0.50,-1.00)`, `b=(0.25,0.75,1.25,1.75)` |
| `OM2-ADJACENT` | Same adjacent-logit intercepts with common `b=(1,1,1,1)` |
| `OM3-SPARSE` | `P_j` proportional to `(0.970,0.020,0.007,0.002,0.001)_j * exp(0.25*j*z)` for `j=0..4` |

For `H2-THRESHOLD`, `OM0-CORRECT-PO` transforms each threshold to `s_r+exp(l_r)*tau_j`; the adjacent profiles transform each adjacent intercept to `s_r+exp(l_r)*a_j`, with `OM3` using `a_j=log(w_j/w_(j-1))` from its displayed weights. These rater-specific-intercept cells are deliberately misspecified by the pooled analysis model and have no scalar coefficient-bias target. For raw `LEFT`, `RIGHT`, `indistinguishable`, or `both_unacceptable`, all profiles generate display-left and display-right bands in `0..4`. For `insufficient_context`, procedural abstention, nonstart, or nonlock, both bands are null under the locked invariant even though the stream allotment is still consumed. The mapping record derives candidate-specific bands without changing them. Adapters are exactly `r_graph = r_raw + 1` and `x = r_raw / 4`. Recovery of a latent coefficient is a model-under-assumption diagnostic only; these adapters do not assert equal intervals or cross-card comparability.

### Synthetic event probabilities

The calibration arm defines a synthetic binary event and predictor; it does not represent a current product event. For base rate `q`, first obtain `pi_raw` from `Beta(2q,2(1-q))`, then set the sealed oracle event probability `pi=min(max(pi_raw,0.000001),0.999999)`, and only then draw `Y~Bernoulli(pi)`. The clip occurs before the event draw and its count is reported. Predictor profiles transform this clipped `pi` exactly as frozen below and clip the transformed would-be prediction `p_star` to the same bounds after adding any error. No profile is recentered.

Arm F uses a separate candidate-specific calibration-case schedule outside the ordinary pairwise assignment, presentation, session, and process denominators. It retains `C10`, `CARD4`, `R3`, `T-FIXED-FIXED`, and sealed public-test families `SMSG-0007..SMSG-0010`. For held-out count `N`, create `SCASE-000001..SCASE-N`. The lexicographic unit list is public-test family ID × card ID × rater ID `SRATER-0001..SRATER-0003` × candidate suffix `{A,B}`, of size `U=4*4*3*2=96`; case `j` uses unit `1+((j-1) mod U)` and context-occurrence ID `SCTX-` plus six-digit `1+floor((j-1)/U)`. Each case is one prediction unit and one synthetically stipulated qualified, submitted, valid candidate-card event record; it has no pairwise display outcome, side, order, nonstart, nonlock, procedural-abstention, or invalidation field. The baseline values of those inactive scenario factors remain in the preimage but do not generate Arm-F objects or denominators. Arm F consumes only its case-ordered `event` and `prediction` slots plus analysis resampling slots.

The exact event ID is `E_mismatch/SCARD-cccc/design-0.1`, where `cccc` is the assigned card index, and the event is `1` iff candidate-specific `r_raw` is in `{0,1}`. For case index `j`, reserved `Y=1` maps to `r_raw=(j-1) mod 2`; `Y=0` maps to `r_raw=2+((j-1) mod 3)`. Thus `observed_event_status=observed` and `observed_event_value=Y` for every valid Arm-F case. The prediction is logically and timestamp-ordered before this band/event. Each record retains case, candidate, pair, family, card, context-occurrence, rater, split, and profile IDs, so dependence and coverage can be reported without pretending repeated IDs are independent model runs. Available synthetic predictions always use `probability_status=predicted_uncalibrated`; missing predictions use `abstained` with `predictor_abstained`. No simulation output may use `predicted_calibrated_for_scope`. If public-test coverage is zero, no cases are created and calibration outputs are `unsupported_scope`/`unsupported` with `insufficient_card_coverage`.

## Frozen factor levels

### Submitted-outcome prevalence

Vectors are ordered `(A, B, indistinguishable, both_unacceptable, insufficient_context)` and apply at zero latent effect.

| ID | Frozen vector |
| --- | --- |
| `P0-BALANCED` | `(0.35, 0.35, 0.10, 0.10, 0.10)` |
| `P1-ASYMMETRIC` | `(0.65, 0.15, 0.05, 0.10, 0.05)` |
| `P2-TIE-RICH` | `(0.20, 0.20, 0.40, 0.10, 0.10)` |
| `P3-BOTH-RICH` | `(0.15, 0.15, 0.10, 0.50, 0.10)` |
| `P4-CONTEXT-RICH` | `(0.15, 0.15, 0.10, 0.10, 0.50)` |
| `P5-SPARSE-NONCHOICE` | `(0.49, 0.49, 0.005, 0.005, 0.01)` |
| `P6-DEGENERATE-A` | `(1.00, 0.00, 0.00, 0.00, 0.00)` |
| `P7-DEGENERATE-TIE` | `(0.00, 0.00, 1.00, 0.00, 0.00)` |

### Missingness, invalidation, allocation, and coverage

| Factor | Frozen levels |
| --- | --- |
| Procedural target rate | `M00=0.00`, `M05=0.05`, `M15=0.15`, `M30=0.30`, `M50=0.50` |
| Nonstart rate | `NS00=0.00`, `NS05=0.05`, `NS15=0.15` |
| Nonlock rate | `NL00=0.00`, `NL05=0.05`, `NL15=0.15` |
| Missingness mechanism | `MCAR`, `MAR-ORDER-CONTEXT`, `MNAR-PREFERENCE` |
| Submitted-record invalidation | `I00=0.00`, `I02=0.02`, `I10=0.10` |
| Missing-prediction rate | `MP00=0.00`, `MP15=0.15`, `MP30=0.30` |
| Raters per pair | `R2=2`, `R3=3`, `R5=5`, `R8=8` |
| Card coverage `(total/calibration/public-test)` | `C1=(1,1,0)`, `C10=(10,6,4)`, `C16=(16,10,6)`, `C22=(22,14,8)` |
| Cards per family/session | `CARD1=1`, `CARD4=4`, `CARD7=7` |
| Rater heterogeneity | `H0-HOMOGENEOUS`, `H1-SEVERITY`, `H2-THRESHOLD`, `H3-INTERPRETATION-MIX` |
| Ordinal generator | `OM0-CORRECT-PO`, `OM1-NONPROPORTIONAL`, `OM2-ADJACENT`, `OM3-SPARSE` |
| Treatment×context SD | `TC0-NONE=0.00`, `TC1-MODERATE=0.35`, `TC2-HIGH=0.80` |
| Side allocation | `S-EXACT` equal when even; `S-NEAR` absolute count difference at most one; `S-8020` canonical A left with probability `0.80`; `S-ALIASED` canonical A always left |
| Side log-odds effect | `SFX0=0.00`, `SFX1=0.22314355131420976`, `SFX2=0.6931471805599453` |
| Order design | `O-BALANCED` cyclic forward/reverse blocks; `O-RANDOM` seeded Fisher–Yates; `O-LATE-BIAS` latent-difficulty sort; `O-ALIASED` identity sort |
| Order coefficient per full standardized span | `OFX0=0.00`, `OFX1=0.25`, `OFX2=0.75` |
| Session effects | `X0-NONE`, `X1-FATIGUE`, `X2-CARRYOVER`, `X3-COMBINED` |

When a numeric factor is substituted into `ScenarioParameterPreimage`, its `value` is the exact right-hand decimal spelling above encoded as a JSON string; `SFX1` and `SFX2` therefore use their displayed binary64-ready decimal expansions, never `log(...)`. Rater/card/event counts and the three coverage counts are JSON integers. Categorical selections are exact ID strings.

Side coding is `+0.5` when canonical A is displayed left and `-0.5` when displayed right. For `card_count > 1`, order coding is `(2 * card_position_index - card_count - 1) / (card_count - 1)`; for one card it is null. In every `CARD1` cell the DGM omits the order term rather than multiplying by or coercing null, and the order estimate/interval are `unsupported`/`unsupported_scope` with `order_effect_not_identifiable_single_card`; side and session effects remain eligible. This applies even when the selected factor ID is `OFX1` or `OFX2`.

### Exact assignment and session schedule

Under `G-NONE`, coverage `(F,F_cal,F_test)` creates one shared set of family IDs `SMSG-0001..F`, card IDs `SCARD-0001..card_count`, pair IDs `SPAIR-0001..F`, and candidates `SCAND-ffff-A` and `SCAND-ffff-B`. The same `F` families and `F` pairs recur across cards; they are not recreated per card. Canonical candidate A/B identity is fixed by the suffix, then independently assigned left/right. The first `F_cal` families belong to calibration and the next `F_test` to sealed public test for every card. Each of `R` ascending raters receives every family × card unit once, for exactly `F * card_count * R` assignments `SASSIGN-cccc-ffff-rrrr`. Assignment order is card, family, then rater. No outcome may alter identity, membership, split, or count.

Side assignment uses 1-based card `c`, family `f`, and rater `r`: `S-EXACT` puts canonical A left iff `(c+f+r)` is even; because every noncurrent coverage level has even `F`, it is exactly balanced over the cell and differs by at most one within an odd-rater pair. A `C1` cell with an odd total assignment count records the unavoidable difference of one rather than claiming exact equality. For `S-NEAR`, let `shift=(c+f-2) mod R`; A is left iff `((r-1+shift) mod R) < ceil(R/2)`. This gives every pair a side-count difference at most one while rotating the extra A-left assignment across raters/cards/families. `S-8020` uses the allocation uniform `<0.80`. `S-ALIASED` puts canonical A left on every assignment, so candidate identity and side are deliberately identical without consulting any latent effect. The assignment is frozen before response noise.

Each rater has one session. Under `O-BALANCED`, ascending family order is cyclically rotated by `(r-1) mod F`; within each family the card list is rotated by `(r-1) mod card_count`; a rater with even 1-based index `r` reverses the complete rotated unit list, while an odd-indexed rater keeps it forward. `O-RANDOM` applies descending-index Fisher–Yates, `j=1+floor(i*u)`, to all family-card units. `O-LATE-BIAS` sorts units by ascending pre-outcome synthetic rateability difficulty so the most difficult occupy the last quartile, breaking ties by synthetic ID. `O-ALIASED` uses the same order for every rater: under `G-NONE`, sort by pair ID, then card ID, then family ID; under a graph schedule, sort by the ordered endpoint treatment IDs, then card ID, then family ID. Session-position code uses the same centered formula as card order over all scheduled session units and remains distinct from `order_code`.

`X1-FATIGUE` adds `+0.50` log-odds to nonlock and `insufficient_context` and subtracts `0.25` from ordinal latent fit in the last session quartile. `X2-CARRYOVER` adds `+0.50` to the next canonical A/B contrast in the direction of the immediately preceding valid decisive mapped response and resets after any nondecisive or unobserved record. `X3-COMBINED` applies both; `X0-NONE` applies neither. These effects are generated after the schedule is frozen.

Graph scenarios use a separate exact schedule and force `CARD1`. `G0-CURRENT-DYADS` uses the current 22 family IDs, 22 one-family pairs, 44 unique candidates, the frozen `C22` split, and `R` ratings per pair: exactly `22*R` assignments and no recurring treatment. For `G1-CHAIN-SEPARATED` through `G6-ROUND-ROBIN`, use the selected coverage's same `F` shared context families; for each scheduled graph edge and each family, create one pair whose canonical A/B treatments are the edge's first/second listed endpoints, then assign all `R` raters. Assignment count is `edge_count*F*R`, where edge counts are respectively `7,8,8,7,10,28` for `G1` through `G6`; `G5` has eight cycle edges plus directed bridge edges `(4,5)` and `(5,4)`. Treatment IDs recur across families and edges; expression IDs remain pair-local. Split is by the shared family ID. Side and raw-to-derived mapping use the same rules as the ordinary schedule.

### Comparison-graph fixtures

Graph diagnostics operate on recurring entity IDs and observed decisive wins only. Schedule connectivity and observed directed strong connectivity are separate fields.

| ID | Frozen fixture | Expected diagnostic purpose |
| --- | --- | --- |
| `G-NONE` | No recurring-entity graph; use the ordinary family/card/pair schedule except Arm F's separate calibration-case schedule | Non-graph baseline for Arms A–C, E–F, and I–K |
| `G0-CURRENT-DYADS` | 44 candidate vertices; edges `(1,2),(3,4),...,(43,44)` | 22 components, no recurrence, global utility unsupported |
| `G1-CHAIN-SEPARATED` | 8 treatments; scheduled chain `(1,2),...,(7,8)`; lower ID wins every decisive comparison | Weakly connected, not directed-strongly-connected, separation |
| `G2-DIRECTED-CYCLE` | 8 treatments; decisive arcs `1→2→...→8→1` | Directed strong-connectivity positive control |
| `G3-TWO-CYCLES` | Two directed 4-cycles with no cross-edge | Two strongly connected components; no global utility |
| `G4-UNDEFEATED-STAR` | 8 treatments; treatment 1 defeats 2–8 | Weakly connected with undefeated entity; no finite interior ordinary-BT MLE |
| `G5-BRIDGE-VULNERABLE` | Two directed 4-cycles plus reciprocal scheduled bridge `(4,5)` | Strong connectivity depends on observed bridge directions and missingness |
| `G6-ROUND-ROBIN` | Complete scheduled round robin on 8 recurring treatments | Empirical strong connectivity must be checked, never assumed |

`G1-CHAIN-SEPARATED` through `G5-BRIDGE-VULNERABLE` are isolated deterministic graph-guard fixtures. After process checks, compute the universal five-category probabilities, replace the two decisive masses by one `decisive` mass `p_A+p_B`, and draw from ordered categories `(decisive,indistinguishable,both_unacceptable,insufficient_context)` with probabilities `(p_A+p_B,p_indistinguishable,p_both,p_context)`. A decisive draw always makes the source of the fixture's listed directed arc defeat its target; the graph schedule makes that source canonical candidate A and target canonical candidate B. Map canonical A to raw `LEFT` when A is displayed left and raw `RIGHT` otherwise. Thus decisive probability, direction, and raw mapping are frozen and no latent-B draw can oppose an arc. Nondecisive, nonstarted, nonlocked, abstained, invalid, and missing records add no arc. `G6-ROUND-ROBIN` alone uses the universal latent A/B DGM and treatment×context contrast. Recovery for `TC0-NONE`, `TC1-MODERATE`, and `TC2-HIGH` therefore applies only to G6; every diagnostic is computed from the resulting observed graph, never inferred from the schedule.

Ordinary unpenalized Bradley–Terry fitting is attempted only when recurring identity is declared, a scale constraint is frozen, the observed directed win graph is strongly connected, and no separation diagnostic fires. A failed condition returns the exact precheck state frozen in the null map below. Penalization may be explored as a named sensitivity but may not disguise non-identifiability or become the ordinary-BT result.

### Calibration profiles

| ID | `(a,b,epsilon SD)` or rule | Expected behavior to detect |
| --- | --- | --- |
| `K0-CALIBRATED` | `p_star=pi` exactly | Correctly specified positive control |
| `K1-INTERCEPT` | `(+0.75,1,0)` | Calibration-in-the-large error |
| `K2-UNDERFIT` | `(0,0.60,0.10)` | Predictions too moderate |
| `K3-OVERCONFIDENT` | `(0,1.80,0.10)` | Predictions too extreme |
| `K4-LOW-RESOLUTION` | `p=q` for every observed case | Marginal calibration with no resolution |
| `K5-INVERTED` | `(0,-1,0.10)` | Harmful inverse ranking |
| `K6-MISSING-INFORMATIVE` | `p_star=pi`, but prediction missingness rises by `+1.00` log-odds with `abs(logit(p_star))` | Selection-sensitive calibration |

Calibration base rates are `Q10=0.10`, `Q30=0.30`, and `Q50=0.50`; held-out case counts are `N100`, `N300`, `N1000`, and `N5000`. Candidate minimum-profile rules are `E10` (at least 10 events and 10 non-events), `E20`, and `E50`. Those are thresholds under examination, not accepted rules.

Every profile consumes its reserved prediction-error uniform `u_error`. Set `epsilon=sigma*AS241(u_error)`, where `sigma` is the displayed epsilon SD; this is an exact mean-zero normal transform under the frozen `AS241/binary64` profile. `K0`, `K4`, and `K6` consume but ignore `epsilon`. For `K1`–`K3` and `K5`, compute `p_star=clip(logit_inverse(a+b*logit(pi)+epsilon))`; `K4` sets `p_star=q`; and `K0/K6` retain `p_star=pi`.

Every case also consumes its reserved prediction-missingness uniform `u_missing`. For `K0`–`K5`, `MP00` uses the deterministic zero bypass; otherwise the exposed prediction is missing iff `u_missing < MP`, exactly implementing MCAR. For `K6/MP15` and `K6/MP30`, solve a separate intercept so `mean(logit_inverse(intercept+1.00*abs(logit(p_star))))` over all `N` sealed would-be predictions equals the selected marginal rate. This solver is binary64 bisection on `[-40.0,40.0]`, stops at the first absolute mean error at most `1e-12`, and caps at `200` iterations; failure to bracket or converge makes the run `invalid_run` with `intercept_solver_failure`. After solving, prediction is missing iff `u_missing` is below its case probability. `K6/MP00` uses the deterministic zero bypass, performs no intercept solve, and has exactly zero missing predictions. Store `pi` and `p_star` in an evaluation-sealed `CalibrationTruthRecord` even when the exposed prediction is missing; only the missingness diagnostic may unseal `p_star`, after all prediction and event records are locked. `K6/MP00` has no missingness slope by design: it must emit one mapped boundary diagnostic record with a null estimate and estimated-coefficient count `0`, `estimator_attempt_status=precheck_undefined`, `estimate_status=unsupported`, and `interval_status=unsupported_scope` with `diagnostic_inapplicable_boundary`. If scored cases contain fewer than the selected `E*` count of either events or non-events, `A-CAL-LOGIT`, the reliability table, and discrimination outputs map to `precheck_undefined`, `estimate_status=unsupported`, and `interval_status=unsupported_scope` with `minimum_event_profile_not_met`; the K6 missingness path is governed independently by its MP boundary/fit rule. Brier score, log loss, scored counts, and coverage remain descriptive when mathematically defined.

Calibration metrics use cases with a nonmissing pre-outcome prediction; no other case enters a score denominator. Brier score is `mean((p-Y)^2)` and log loss is `-mean(Y*ln(p)+(1-Y)*ln(1-p))`. The primary reliability table has 10 equal-count bins after sorting by `p` then case ID; earlier bins receive one extra record when the count is not divisible. For bin `k`, report `n_k`, mean prediction `p_k`, and event rate `y_k`; binned reliability is `sum(n_k/n*(p_k-y_k)^2)`, resolution is `sum(n_k/n*(y_k-ybar)^2)`, and uncertainty is `ybar*(1-ybar)`. AUROC is the event/non-event Mann–Whitney fraction with tied prediction pairs worth `0.5`. Prediction answer coverage and scored-event coverage are nonmissing predictions divided by all `N` scheduled cases; observed-event coverage is `N/N`. Selective risk is cumulative Brier score at available-prediction fractions `f=0.10,0.20,...,1.00`, sorting by descending `abs(p-0.5)` then case ID and taking the first `ceil(f*N_available)` cases. Every metric records its numerator, denominator, and candidate/pair/family/card/rater clusters.

### Counterfactual branch

Counterfactual packets use abstract operation `SCFOP-0001`: changed field `synthetic_surface_token`; all candidate, card, semantic state, risk, and functional fields are declared held constant. Valid profiles pair base and counterfactual responses from the same synthetic rater and balance base-first versus counterfactual-first by assignment parity. Exact profiles are:

| ID | Frozen change |
| --- | --- |
| `CF0-INVARIANT` | Same latent category probabilities and ordinal thresholds as base; independent response noise |
| `CF1-THRESHOLD-SHIFT` | Add `+0.50` to all counterfactual ordinal thresholds |
| `CF2-CONSTRUCT-SHIFT` | Counterfactual canonical-preference and ordinal latent loadings reverse sign for every rater; in `H3-INTERPRETATION-MIX`, the two class loadings therefore swap |
| `CF3-ITEM-DIF` | In abstract stratum `SLOC-2` only, add `+0.75` to the canonical A/B contrast and `+0.50` to ordinal latent fit |
| `CF4-INVALID-OPERATION` | Mark semantic/functional validity false and add an undeclared changed field; generate no response or estimate |

The branch reports the paired five-outcome transition matrix, paired raw-band differences, discordant-pair counts, order sensitivity, profile-class/stratum interaction, missing-pair rate, and invalid-operation rejection. It is a sensitivity study under synthetic stipulations, not fairness, cultural, semantic, or counterfactual validity evidence.

In `ARM-K-COUNTERFACTUAL`, every ordinary scheduled assignment becomes one consecutive two-member pair with IDs suffixed `-BASE` and `-CF`; both share rater, family, card, candidates, side assignment, and finite effects. `(card_index + family_index + rater_index)` even presents base first; odd presents counterfactual first. One pair-level `nonstart` draw applies to both. If started, BASE and CF consume separate `nonlock`, `procedural-abstention`, `procedural-reason`, `invalidation`, and `evidence-span` slots in BASE-then-CF ID order regardless of presentation order. BASE alone uses its ordinary `submitted-outcome` category draw and two ordinary `ordinal-band` draws. CF alone uses exactly the three reserved `counterfactual` draws—one category uniform followed by left- and right-band uniforms—after applying its selected `CF*` profile. No CF outcome or band draw is taken from the ordinary streams, and no BASE outcome or band draw is taken from the counterfactual stream. Missingness can therefore yield base-only, CF-only, both-valid, or neither-valid records. Transition and paired-band denominators contain only both-submitted, both-valid, successfully mapped pairs; all four disposition counts remain in the denominator ledger. `CF4-INVALID-OPERATION` fails admissibility before process draws, consumes every reserved BASE and CF slot under this same rule, emits no rating, and returns `estimate_status=unsupported` with `unsupported_estimand_scope`.

## Exact scenario grid

The grid is the set union below, deduplicated by complete factor/target bundle before hashing. No analyst may add, remove, or inspect-select a cell after results are visible. The full baseline is `P0-BALANCED/M05/MCAR/I00/NS00/NL00/R3/C10/CARD4/D1-MODERATE/H0-HOMOGENEOUS/OM0-CORRECT-PO/TC0-NONE/S-EXACT/SFX0/O-BALANCED/OFX0/X0-NONE/G-NONE/K0-CALIBRATED/Q30/N1000/E20/MP00/CF0-INVARIANT/T-FIXED-FIXED/SLOC-1`.

| Arm | Mandatory cells | Purpose |
| --- | --- | --- |
| `ARM-A-OUTCOME` | `{P0-BALANCED,P1-ASYMMETRIC,P2-TIE-RICH,P3-BOTH-RICH,P4-CONTEXT-RICH,P5-SPARSE-NONCHOICE,P6-DEGENERATE-A,P7-DEGENERATE-TIE}` × `{M00,M05,M15,M30,M50}` × `{MCAR,MAR-ORDER-CONTEXT,MNAR-PREFERENCE}` × `{I00,I02,I10}` × `{R2,R3,R5,R8}` × `{D0-INDEPENDENT,D1-MODERATE,D2-HIGH}`; all else baseline | Prevalence, missingness, invalidity, panel size, dependence, undefined/degenerate behavior |
| `ARM-B-COVERAGE` | `{C1,C10,C16,C22}` × `{R2,R3,R5,R8}` × `{D0-INDEPENDENT,D1-MODERATE,D2-HIGH}` × `{P0-BALANCED,P2-TIE-RICH,P3-BOTH-RICH,P4-CONTEXT-RICH}`; all else baseline | Candidate `3`-rater and `10/6/4` rules, held-out availability, reliability/interval behavior |
| `ARM-C-ALLOCATION` | `{S-EXACT,S-NEAR,S-8020,S-ALIASED}` × `{SFX0,SFX1,SFX2}` × `{O-BALANCED,O-RANDOM,O-LATE-BIAS,O-ALIASED}` × `{OFX0,OFX1,OFX2}` × `{R2,R3,R5,R8}` × `{CARD1,CARD4,CARD7}` × `{X0-NONE,X1-FATIGUE,X2-CARRYOVER,X3-COMBINED}` × `{M00,M15,M30}` | Side/order/session balance, raw-to-derived mapping, aliasing, fatigue/carryover, bias, estimability, power, coverage |
| `ARM-D-GRAPH` | `({G0-CURRENT-DYADS}×{C22} ∪ {G1-CHAIN-SEPARATED,G2-DIRECTED-CYCLE,G3-TWO-CYCLES,G4-UNDEFEATED-STAR,G5-BRIDGE-VULNERABLE,G6-ROUND-ROBIN}×{C10,C22})` × `{R2,R3,R5,R8}` × `{CARD1}` × `{M00,M15,M50}` × `{P0-BALANCED,P1-ASYMMETRIC,P2-TIE-RICH,P6-DEGENERATE-A,P7-DEGENERATE-TIE}` × `{D0-INDEPENDENT,D2-HIGH}` × `{TC0-NONE,TC1-MODERATE,TC2-HIGH}` | Recurrence, treatment×context, components, separation, strong connectivity, estimator failure under the graph-specific count rule |
| `ARM-E-INTERVAL` | Targets `{T-FIXED-FIXED,T-NEW-MESSAGE,T-NEW-RATER,T-NEW-RATER-MESSAGE}` × coverage `{C10,C16,C22}` × rater counts `{R3,R5,R8}` × dependence `{D0-INDEPENDENT,D1-MODERATE,D2-HIGH}` × missingness `{M00/MCAR,M15/MAR-ORDER-CONTEXT,M30/MNAR-PREFERENCE}` | Target-matched and target-mismatched interval coverage |
| `ARM-F-CALIBRATION` | `{K0-CALIBRATED,K1-INTERCEPT,K2-UNDERFIT,K3-OVERCONFIDENT,K4-LOW-RESOLUTION,K5-INVERTED,K6-MISSING-INFORMATIVE}` × `{Q10,Q30,Q50}` × `{N100,N300,N1000,N5000}` × `{E10,E20,E50}` × `{MP00,MP15,MP30}` | Calibration, resolution, discrimination, sample/coverage gates, null behavior |
| `ARM-I-PROCESS` | `{NS00,NS05,NS15}` × `{NL00,NL05,NL15}` × `{M05,M15,M30}` × `{MCAR,MAR-ORDER-CONTEXT,MNAR-PREFERENCE}` × `{X0-NONE,X1-FATIGUE,X2-CARRYOVER,X3-COMBINED}` × `{H0-HOMOGENEOUS,H3-INTERPRETATION-MIX}` | Separate nonstart, nonlock, procedural-reason, fatigue, carryover, and nonignorable process behavior |
| `ARM-J-HETEROGENEITY-ORDINAL` | `{H0-HOMOGENEOUS,H1-SEVERITY,H2-THRESHOLD,H3-INTERPRETATION-MIX}` × `{OM0-CORRECT-PO,OM1-NONPROPORTIONAL,OM2-ADJACENT,OM3-SPARSE}` × `{R3,R5,R8}` × `{C10,C16,C22}` × `{P0-BALANCED,P5-SPARSE-NONCHOICE,P7-DEGENERATE-TIE}` × `{D0-INDEPENDENT,D1-MODERATE,D2-HIGH}` | Severity, threshold, interpretation-class, proportional-odds violation, alternate ordinal model, and sparse-band behavior |
| `ARM-K-COUNTERFACTUAL` | `{CF0-INVARIANT,CF1-THRESHOLD-SHIFT,CF2-CONSTRUCT-SHIFT,CF3-ITEM-DIF,CF4-INVALID-OPERATION}` × `{M00/MCAR,M15/MAR-ORDER-CONTEXT,M30/MNAR-PREFERENCE}` × `{H0-HOMOGENEOUS,H3-INTERPRETATION-MIX}` × `{SLOC-1,SLOC-2}` | Invariance, threshold shift, construct shift, item DIF, paired missingness/order, and invalid-operation rejection |

Each row means the exact Cartesian product shown, with every unlisted factor explicitly expanded to the full baseline value before serialization. Generate complete bundles per arm, deduplicate identical bundles, union and lexicographically sort all contributing arm IDs in `ScenarioRecord.arm_memberships`, then hash the arm-free preimage once. Suffixes, aliases, omitted-factor defaults, and analyst-renamed IDs are prohibited.

The frozen pre-dedup row counts are: A `4,320`; B `192`; C `20,736`; D `4,680`; E `324`; F `756`; I `648`; J `1,296`; K `60`; total `33,012`. Factor-bundle deduplication yields exactly `32,858` unique scenario preimages; 154 duplicate memberships collapse into 133 multi-arm bundles. Any other count sets `run_validity_status=invalid_run` with `scenario_grid_mismatch`. `LEAKAGE-MATRIX/design-0.1` contributes 64 separate input-guard fixtures, not scenario preimages.

## Frozen analysis and interval profile

`VT-MSP-ANALYSIS/design-0.1` binds these method IDs; a result may not substitute a library default or unnamed method.

| Method ID | Exact estimator/procedure |
| --- | --- |
| `A-CAT-PROP/design-0.1` | Separate numerator/declared-denominator proportions for each raw, derived, process, evidence, and defect category |
| `A-SIDEORDER-LOGIT/design-0.1` | Decisive-only logistic ML for derived `A=1,B=0`, with intercept and frozen columns `2*side_code_a`, nonnull `order_code`, and, only for `X2-CARRYOVER`/`X3-COMBINED`, signed preceding-decisive carryover; nondecisive selection remains separately reported |
| `A-ALPHA-NOM/design-0.1` | Krippendorff alpha with nominal distance on pre-adjudication five-category mapped outcomes; `unsupported` when expected disagreement is nonpositive |
| `A-ALPHA-ORD/design-0.1` | Krippendorff alpha using category order, not numeric spacing: over pooled pairable nonmissing bands let `n_g` be frequency in category `g`; for `c<k`, distance is `[sum_(g=c)^k n_g - (n_c+n_k)/2]^2`, symmetric with zero diagonal; units with fewer than two valid ratings contribute no coincidence but remain in the ledger; `unsupported` when expected disagreement is nonpositive |
| `A-ORD-PO-ML/design-0.1` | Candidate-band cumulative-logit ML `logit Pr(r_raw<=j)=tau_j-beta*z` using the stored pre-noise latent `z`; four ordered thresholds are parameterized as first threshold plus three positive exponentiated gaps |
| `A-ORD-ADJ-ML/design-0.1` | Candidate-band adjacent-category ML `log(P_j/P_(j-1))=a_j+b_j*z`, with four free intercepts and four free slopes on the stored pre-noise latent `z` |
| `A-BT-ML/design-0.1` | Ordinary unpenalized decisive-only Bradley–Terry maximum likelihood with `sum(theta)=0`, only after identity/connectivity/separation guards |
| `A-BT-RIDGE/design-0.1` | Sensitivity only: maximize `logL - 0.1*sum(theta^2)` under `sum(theta)=0`; never relabeled ordinary BT or identification repair |
| `A-CAL-LOGIT/design-0.1` | Held-out logistic calibration intercept/slope for observed binary event on pre-outcome `logit(p)`, alongside direct Brier/log-loss/count metrics |
| `A-CAL-MISS-LOGIT/design-0.1` | Arm-F K6 missing-prediction diagnostic: for MP15/MP30, logistic ML for the missing-prediction indicator on evaluation-unsealed `abs(logit(p_star))`; for MP00, a mapped boundary precheck record with zero missing predictions and zero emitted coefficients; the sealed would-be prediction is never used to fit or score the event predictor |
| `A-CF-PAIRED/design-0.1` | Both-valid paired transition table, raw-band differences, and discordant counts under the frozen pair ledger |

Every ML method uses binary64 damped Newton iterations, QR solve with positive diagonal, and step-halving until the declared objective does not decrease. Starts are: all-zero coefficients for side/order; `tau=(-1.25,-0.35,0.35,1.25), beta=1` for proportional odds; `a=(0,0,0,0), b=(1,1,1,1)` for adjacent category; zero constrained utilities for BT; `(intercept=0,slope=1)` for event calibration; and `(0,0)` for missingness calibration. Convergence requires maximum absolute gradient at most `1e-10` and maximum absolute parameter step at most `1e-10`; cap `200` iterations. Singular solve, cap, non-finite intermediate, unordered recovered PO threshold, or complete/quasi separation sets `estimator_attempt_status=estimator_failure` and `estimator_nonconvergence`. Ordinary BT also requires its scale and graph guards before iteration. `A-SIDEORDER-LOGIT` omits the order column for `CARD1` and returns that coefficient/interval `unsupported`/`unsupported_scope`; a constant or exactly aliased requested design column returns only the affected coefficient/interval `unsupported`/`unsupported_scope` with `assignment_aliased`. `O-ALIASED` always prechecks the order coefficient as `assignment_aliased` because card identity has no within-card position variation, even if the numeric design matrix has rank. For `K4-LOW-RESOLUTION`, constant `logit(p)` is aliased with the calibration intercept: `A-CAL-LOGIT` emits no estimated intercept or slope value, emits the two required unsupported coefficient records, and takes the exact constant-predictor precheck path below; the separately computed prediction-variance diagnostic remains defined.

The arm-to-method mapping is normative; an unlisted method does not run:

| Arm | Primary method IDs | Interval rule |
| --- | --- | --- |
| `ARM-A-OUTCOME`, `ARM-B-COVERAGE` | `A-CAT-PROP/design-0.1`, `A-ALPHA-NOM/design-0.1` | No supported fixed-target interval for these unmodeled estimators in `design-0.1` |
| `ARM-C-ALLOCATION` | `A-SIDEORDER-LOGIT/design-0.1` | `I-FIXED-PARAM-PCT/design-0.1` |
| `ARM-D-GRAPH` | Frozen graph diagnostics, then `A-BT-ML/design-0.1` only when all guards pass; `A-BT-RIDGE/design-0.1` only in its named sensitivity for recurring-identity `G1`–`G6` cells | `I-FIXED-PARAM-PCT/design-0.1` only after ordinary-BT guards pass |
| `ARM-E-INTERVAL` | `A-CAT-PROP/design-0.1` for each five-category proportion | Message/rater/crossed target methods plus the naive mismatch control; fixed-target category intervals are unsupported |
| `ARM-F-CALIBRATION` | `A-CAL-LOGIT/design-0.1`, direct calibration metrics, and `A-CAL-MISS-LOGIT/design-0.1` for every K6 cell: fitted only for MP15/MP30 and a required boundary record for MP00 | `I-FIXED-PARAM-PCT/design-0.1` for modeled regression coefficients; direct-metric intervals unsupported |
| `ARM-I-PROCESS` | `A-CAT-PROP/design-0.1` | No supported fixed-target interval for unmodeled proportions |
| `ARM-J-HETEROGENEITY-ORDINAL` | `A-ALPHA-ORD/design-0.1`; `A-ORD-PO-ML/design-0.1` for `OM0-CORRECT-PO`; `A-ORD-ADJ-ML/design-0.1` for `OM1-NONPROPORTIONAL`, `OM2-ADJACENT`, and `OM3-SPARSE` | `I-FIXED-PARAM-PCT/design-0.1` for modeled ordinal coefficients; alpha interval unsupported |
| `ARM-K-COUNTERFACTUAL` | `A-CF-PAIRED/design-0.1` | No supported fixed-target interval for unmodeled paired tables/differences |

Interval IDs and target mapping are exact:

| Interval ID | Target | Construction |
| --- | --- | --- |
| `I-FIXED-PARAM-PCT/design-0.1` | Modeled fixed-message/fixed-panel coefficients only | Conditional parametric bootstrap: hold observed design rows fixed; draw one outcome from each fitted Bernoulli/categorical probability in ascending row ID for side/order, ordinal, ordinary BT, event calibration, or K6 missingness; then refit the same model |
| `I-MESSAGE-PCT/design-0.1` | `new_messages_fixed_panel` | Resample the `F` family IDs with replacement and carry all their rater/card records |
| `I-RATER-PCT/design-0.1` | `fixed_messages_rater_population` | Resample the `R` rater IDs with replacement and carry all their family/card records |
| `I-CROSSED-PCT/design-0.1` | `new_messages_rater_population` | Independently resample `F` families and `R` raters; each observation receives the product of its two selection multiplicities |
| `I-NAIVE-WALD/design-0.1` | Deliberate Arm-E mismatch control | For category proportion `phat` with submitted denominator `n`, use `phat ± 1.959963984540054*sqrt(phat*(1-phat)/n)` without clipping endpoints |

Each bootstrap uses exactly `1,999` resamples. Message, rater, and crossed methods use `j=1+floor(n*u)` on their named sorted unit lists, independently for each crossed list. A parametric method holds exact identities/allocation/process rows fixed, consumes one uniform per ascending fixed outcome row, and maps it through the fitted model CDF; it does not resample identities. Consumption is ordered by method ID, interval ID, resample `1..1999`, then selection/row ID. Refit the same estimator and return the 0.025/0.975 Hyndman–Fan type-7 quantiles: `h=(n_success-1)*p+1` with linear interpolation between adjacent ordered successful values. `failed_resample_count >= 100` makes `interval_status=undefined` with `failed_resample_limit`; with at most 99 failures, compute over successful values and report the count. Unmodeled fixed-target estimators have `interval_status=unsupported_scope`, never an identity-resampling substitute. Point-estimator failure maps separately under the locked unions.

## Candidate analyses and metrics

Every metric record names its estimand, target, eligible denominator, observed denominator, dependence units, method, synthetic truth, locked estimate/probability/interval unions, and typed reasons. Undefined values remain null. Run validity, simulation completion, estimator attempts, and paper-design disposition remain separate fields.

| Domain | Required metrics and diagnostics |
| --- | --- |
| Five-category outcome | Separate raw LEFT/RIGHT and derived A/B counts/denominators; nondecisive-category bias, RMSE, empirical 95% interval coverage, mean width, submitted/invalid/process counts, and category-zero rate; mapping round-trip failures must be zero |
| Evidence/defect | Required-span resolver coverage, missing-context completion, flag-specific prevalence, locator/null invariant failures, and separate denominator ledgers; no composite score |
| Tie/category handling | Misclassification caused by each prohibited collapse; separate recovery of `indistinguishable`, `both_unacceptable`, and `insufficient_context`; no tie-likelihood claim |
| Ordinal | Raw display- and derived candidate-band distributions, nominal/ordinal alpha degeneracy, coefficient bias under each stipulated model, threshold-order/proportional-odds diagnostics, convergence, sparse-band behavior, and adapter round-trip invariants |
| Dependence/heterogeneity | Naive-versus-target-matched standard-error ratio, coverage by target/dependence level, effective family/rater cluster counts, interpretation-class confusion, and outcome/threshold sensitivity across declared profiles; no variance-component recovery claim |
| Process states | Nonstart, nonlock, each procedural-abstention reason, invalidation, and unresolved rates/denominators; complete-case bias by mechanism; reason-recovery and terminal-state invariant failures |
| Side/order/session | Assignment imbalance, derived-A coefficient bias/RMSE against `SFX*`/`OFX*`, 95% interval coverage, sign error, estimability, aliasing detection, zero-effect false-positive rate, carryover recovery, and fatigue-related selection/session diagnostics |
| Graph | Vertex/edge counts, undirected components, directed strongly connected components, undefeated/winless entities, recurrence, separation, finite-MLE status, convergence, and prohibited-output count |
| Reliability | Statistic-defined rate, point/interval sampling behavior under stipulated construct, prevalence sensitivity, and disagreement retention; no universal alpha truth |
| Calibration | Brier score and decomposition, log loss, calibration-in-the-large, calibration slope, reliability table with fixed equal-count bins, AUROC as discrimination only, missing-prediction rate, event/non-event counts, and interval coverage |
| Counterfactual | Paired five-outcome transition matrix, paired raw-band differences, discordant-pair count, paired missingness, order sensitivity, profile/stratum interaction, and invalid-operation rejection; no inferential invariance test |
| Leakage/invalidation | Injected versus detected overlap/leakage, false-negative and false-positive detection, records nulled, and attempted prohibited outputs |
| Computation | Replicate count, estimator warnings/failures, non-finite count, Monte Carlo standard error, cap status, elapsed resource fields, and record-hash verification |

The matching interval ID is selected only from the frozen target table above. Arm E evaluates the message, rater, crossed, and naive methods; its fixed-message/fixed-panel category interval is deliberately `unsupported_scope` because `A-CAT-PROP` has no fitted conditional generative law. The modeled-only parametric method is not relabeled for category proportions. This is a required-method gap and mandatory non-pass, not evidence that an interval is unnecessary. A future review may require a protocol revision, but a run cannot substitute a method after seeing coverage.

For every bounded replicate probability, let `n` be the exact denominator of the indicator being summarized and `phat=sum(indicator)/n`. Its Monte Carlo standard error is `sqrt(phat*(1-phat)/n)` and its Monte Carlo 95% interval is Wilson's score interval over that same `n`; no retained replicate outside the indicator denominator is inserted into either calculation. For `EV-COVERAGE`, `n` is exactly the truth-eligible, estimated-interval denominator frozen below. For defined rate, type-I error, graph-guard success, and calibration gate/detection, `n` is each metric's separately frozen retained-valid denominator. A zero `n` returns null MCSE and Wilson bounds and cannot pass or stop for precision. For bias/RMSE, define standardized replicate error `e_r=(estimate_r-truth)/s` using the `EV-BIAS` scale. Partition consecutive replicate indices into `B=R/1000` complete batches; `R` is always checked at a multiple of 1,000. Within each batch compute `T_b=mean(e_r)` for bias or `sqrt(mean(e_r^2))` for RMSE over defined estimates. If a batch has none, precision is unmet. Otherwise `MCSE_batch=sample_SD(T_b)/sqrt(B)` with divisor `B-1`, and relative MCSE is `MCSE_batch/max(abs(T_all),0.01)`, where `T_all` is the corresponding all-replicate standardized bias or RMSE. These are errors of the simulation summary, not intervals for a human population.

The instrument's historical hypotheses are lower-confidence-bound rules, not point-alpha rules: the relevant lower bound would have to be at least `0.67`, or `0.80` for the separately contemplated high-risk annotation, under the exact [inter-rater reliability contract](voice-tone-human-calibration-instrument.md#inter-rater-reliability). Because `design-0.1` has no valid fixed-target alpha interval, its alpha `IntervalRecord` has `interval_status=unsupported_scope`, no lower confidence bound exists, `0.67` and `0.80` appear only as reference lines on sampling curves, and no threshold pass/fail comparison is performed. Original disagreements and prevalence/pathology warnings remain visible. Simulation cannot establish that either cutoff is substantively appropriate.

## Proposed evaluation bands, not accepted thresholds

The following bands make simulation decisions reproducible. They are simulation-evaluation hypotheses only.

| Evaluation ID | Proposed pass band inside a valid scenario cell | If not met |
| --- | --- | --- |
| `EV-DEFINED` | At least `0.99` of replicates return a defined value when the estimand is mathematically stipulated; exactly `0` prohibited values when it is not | Candidate rule fails that cell |
| `EV-BIAS` | Absolute standardized bias at most `0.10`, using the frozen scale rule below | Candidate estimator fails that cell |
| `EV-COVERAGE` | On the frozen eligible-replicate denominator below, conditional empirical coverage of a nominal 95% interval is `0.94..0.97` and its Monte Carlo 95% interval includes `0.95` | Interval method fails that cell |
| `EV-TYPE1` | Zero-effect false-positive rate `0.04..0.06` with Monte Carlo interval including `0.05` | Allocation/analysis rule fails that cell |
| `EV-GRAPH-GUARD` | Every graph-ineligible replicate yields null; every positive-control topology is classified correctly | Graph guard fails |
| `EV-LEAK-GUARD` | Every injected nonzero overlap/leakage case is detected and invalidated; zero-injection false positive is `0` | Entire implementation is invalid, not merely low-performing |
| `EV-CAL-DIAGNOSTIC` | In every diagnostic-eligible calibration cell, `K0-CALIBRATED` intervals meet `EV-COVERAGE` and each named nonbaseline profile has replicate detection rate at least `0.90`; the profile cell-pass fraction is `1.00` | Calibration profile/rule remains unsupported |
| `EV-RECORD` | `1.00` schema, hash, denominator, seed, null-union, and provenance conformance | Entire implementation is invalid |

No scientific conclusion follows from a pass. The bands themselves require independent review and simulation evidence before anyone may propose them for a pilot.

For `EV-BIAS`, let `b = mean(estimate - stored_truth)` over all retained valid replicates, counting estimator failure as undefined rather than excluding it from `EV-DEFINED`. The standardizer is `max(sqrt(theta*(1-theta)),0.10)` for a probability/proportion truth `theta`; `1.00` for log-odds, ordinal, calibration, or treatment-utility coefficients; and `4.00` for raw-band means or differences. A metric without `synthetic_truth_status=exact` or `reference_approximated`, without one scalar truth, or outside these named scales does not receive `EV-BIAS`. The probability floor makes boundary truths explicit and prevents division by zero.

`EV-TYPE1` applies only to an identifiable Arm-C side coefficient with `SFX0` or order coefficient with `OFX0` and `CARD4/CARD7`. Its replicate rejection indicator is `1` exactly when the named 95% `I-FIXED-PARAM-PCT/design-0.1` interval is estimated and excludes zero (`upper<0` or `lower>0`); an undefined interval is nonrejection and remains visible in `EV-DEFINED`. `S-ALIASED`, `O-ALIASED`, and `CARD1` coefficients are precheck nulls, not type-I trials.

For `EV-COVERAGE`, an eligible replicate has a valid retained run record, `synthetic_truth_status` equal to `exact` or `reference_approximated`, and `interval_status=estimated`. Its indicator is `1` iff `lower<=synthetic_truth_value<=upper`, inclusive. The resulting quantity is labeled **conditional interval coverage**. Its denominator is exactly the count of such eligible replicates; undefined, invalid, unsupported, and not-run intervals are excluded from conditional coverage but each has a separately reported count and remains in the `EV-DEFINED` denominator. A zero eligible coverage denominator returns no coverage value and cannot pass.

The metric-to-band applicability map is exhaustive:

| Scope | Applicable bands |
| --- | --- |
| Arm A/B category, evidence, process proportions | `EV-DEFINED`, `EV-BIAS`; fixed-target interval remains unsupported and is a non-pass for any operating decision requiring uncertainty |
| Arm A/B nominal alpha | `EV-DEFINED`; no `EV-BIAS`; fixed-target interval remains unsupported, so no lower-bound rule is evaluated |
| Arm C identifiable side/order coefficient | `EV-DEFINED`, `EV-BIAS`, `EV-COVERAGE`, plus `EV-TYPE1` only in the zero-effect cells defined above; expected-null coefficients use only the prohibited-output half of `EV-DEFINED` |
| Arm D | `EV-GRAPH-GUARD` for every cell; `EV-DEFINED`, `EV-BIAS`, and `EV-COVERAGE` only for guard-eligible `G6-ROUND-ROBIN` ordinary-BT utility coefficients |
| Arm E five-category proportions | `EV-DEFINED`, `EV-BIAS`, and `EV-COVERAGE` only for matching new-message, new-rater, or crossed intervals; fixed-target and mismatched intervals are unsupported/diagnostic |
| Arm F | `EV-DEFINED` for named regression/direct outputs, `EV-COVERAGE` for defined K0 calibration coefficients, and `EV-CAL-DIAGNOSTIC`; K4 regression and K6/MP00 missingness coefficients use expected-null prohibited-output checks; no `EV-BIAS` |
| Arm I process proportions | `EV-DEFINED`, `EV-BIAS`; fixed-target interval remains unsupported |
| Arm J | `EV-DEFINED` for alpha and the selected ordinal model; ordinal `EV-BIAS`/`EV-COVERAGE` only for modeled `H0-HOMOGENEOUS`, `H1-SEVERITY`, or `H3-INTERPRETATION-MIX` coefficients; alpha interval unsupported |
| Arm K | `EV-DEFINED` and `EV-BIAS` for CF0–CF3 paired proportions/band differences; fixed-target interval unsupported; CF4 uses only prohibited-output `EV-DEFINED` |
| Leakage fixtures; every scenario/record | `EV-LEAK-GUARD`; `EV-RECORD` respectively |

“All applicable bands” in the operating table means exactly this map; no analyst chooses a band after results are visible.

Band applicability does not waive a required interval. Before any fixed-panel, rater-sample, coverage, reliability-bound, or counterfactual support decision, the decision engine separately checks that every interval required by the locked estimand and instrument is `estimated` under a target-valid method. In `design-0.1` that prerequisite is deterministically false for the unmodeled fixed-target metrics listed above, so the two operating rows below cannot emit fixed-panel or coverage support and the alpha row cannot emit a threshold result, regardless of point-estimate bands.

Calibration failure diagnostics are frozen as follows: for `K1-INTERCEPT`, a 95% calibration-in-the-large interval excludes `0`; for `K2-UNDERFIT`, `K3-OVERCONFIDENT`, and `K5-INVERTED`, a 95% calibration-slope interval excludes `1`, with `K5-INVERTED` also requiring an estimated negative slope; for `K4-LOW-RESOLUTION`, prediction variance is at most `10^-12`, while its two aliased calibration coefficient records must follow the expected-null precheck, have null values, and yield estimated-coefficient count `0`; for `K6-MISSING-INFORMATIVE` with MP15/MP30, the `A-CAL-MISS-LOGIT/design-0.1` slope interval on evaluation-unsealed `abs(logit(p_star))` excludes `0`. K6/MP00 is excluded from the diagnostic-eligible-cell denominator and passes only its required boundary-record check: zero missing predictions, a null estimate, and estimated missingness-coefficient count `0` with the frozen unsupported statuses. A replicate meets its event gate only when scored cases contain at least its selected `E*` count of both events and non-events. A cell is diagnostic-eligible exactly when at least `0.90` of all retained valid replicates meet that scored gate. Within an eligible cell, the detection-rate denominator is every retained valid replicate; a replicate scores `1` only when the gate is met, the required diagnostic is defined, and the profile-specific condition holds, otherwise `0`. For each profile, cell-pass fraction is passing diagnostic-eligible cells divided by all diagnostic-eligible cells and must equal `1.00`; a zero cell denominator is undefined, not a pass. Detection is reported separately from Brier score and discrimination; no one metric may compensate for a failed calibration diagnostic.

## Operating-rule decision table

| Candidate operating rule | Simulation question | Required cells | Exact paper decision after a future valid run | Current status |
| --- | --- | --- | --- | --- |
| `3` raters per pair | How do `R3`, `R5`, and `R8` change modeled definedness, bias, disagreement, and the available side/order intervals across primary stress cells? | Arms A–C and E | Always `fixed_panel_support_unavailable` in `design-0.1`: report the sampling curves and the blocking fixed-target category/alpha interval gap; do not emit `simulation_supported_for_fixed_panel` | `requires_simulation` |
| `10/6/4` card coverage | How does `C10` affect held-out definedness and the available target-matched coverage diagnostics without split leakage? | Arms B and E plus `LEAKAGE-MATRIX/design-0.1` | Always `coverage_candidate_support_unavailable` in `design-0.1`: report target-matched diagnostics, current fixture failure, and the blocking fixed-target interval gap; do not emit `simulation_supported_for_coverage_candidate` | `requires_simulation`; current identities still fail coverage |
| `14/8` bundle split | Can bundle-wide allocation substitute for card-specific coverage? | Negative control plus B | Always `unsupported`; pooling card identities is prohibited | `unsupported` |
| Alpha lower bounds `0.67/0.80` | How do prevalence, panel size, and missingness affect alpha sampling curves around the instrument's proposed lower-bound rules? | Arms A, B, E | Report point-alpha sampling curves with the two reference lines and `interval_status=unsupported_scope`; perform no lower-bound pass/fail decision until an exact target-valid alpha interval is modeled | `requires_cognitive_validation` |
| Exact/near side balance | Does the design identify side effects and control zero-effect errors? | Arm C | Candidate may be `simulation_supported_for_allocation` only if applicable bands pass under nonzero side/order stress; aliased designs must fail closed | `requires_simulation` |
| Ordinary BT admission | Do identity and observed directed-strong-connectivity guards prevent separated/global output? | Arm D | Candidate may be `simulation_supported_for_graph_guard` only if `EV-GRAPH-GUARD` passes exactly | `requires_simulation`; current global utility `unsupported` |
| Interval method by target | Does each method cover its matching target and expose mismatch? | Arm E | Select no method unless its target-matched cells pass and mismatched claims remain explicitly unavailable | `requires_simulation` |
| Calibration minimum `E10/E20/E50` | Which event/non-event gate supports stable exact-profile diagnostics? | Arm F | At most nominate a future candidate; real calibration remains `requires_pilot_data` or `unsupported` without exact held-out evidence | `requires_simulation` |

`simulation_supported_for_*` is a future simulation-result phrase, not one of the canonical design dispositions, not approval, and not permission to collect data. It must never be shortened to `validated`, `accepted`, or `ready`.

## Monte Carlo stopping and completeness

These are frozen computation rules, not human-study stopping rules:

1. Generate exactly `10,000` valid replicates per mandatory cell before checking precision.
2. Add batches of `1,000` valid replicates, preserving replicate indices, until Monte Carlo standard error is at most `0.0025` for each bounded primary probability applicable to that cell: defined rate, 95% coverage, Arm-C zero-effect rejection, graph-guard success, and calibration gate/detection. Each stop calculation uses the same exact `n`, `phat`, and Wilson denominator defined for that probability above; in particular, coverage uses only truth-eligible replicates with an estimated interval, even when that `n` is smaller than the valid-replicate count. A zero denominator cannot stop for precision. Leakage fixtures are deterministic guards and have no Monte Carlo stop.
3. Every applicable standardized bias/RMSE must have batch relative MCSE at most `0.01`; when `abs(T_all)<0.01`, it must also have absolute `MCSE_batch<=0.0025`.
4. Stop at `100,000` valid replicates per cell. If any criterion remains unmet, set `cell_completion_status=simulation_precision_unmet`; do not make an operating-rule decision from it.
5. Estimator failures count in the defined-rate denominator and are never redrawn. Invalid **run-level** records do not count as valid replicates; the complete run is invalid and must restart under a new run ID after remediation, while preserving the failed provenance record.
6. All `32,858` mandatory scenarios must end with `cell_completion_status=complete` or `cell_completion_status=simulation_precision_unmet`, and all 64 leakage fixtures must have their expected guard result. A missing, manually skipped, or post-result-added scenario/test sets `run_completion_status=incomplete`.

There is no efficacy, futility, or threshold-acceptance early stop. Resource exhaustion sets `run_completion_status=incomplete`; it is not converted into evidence.

## Leakage, invalid runs, and failure states

Synthetic public-test labels and IDs are sealed from fitting and rule selection. Leakage includes ID overlap, copied labels, tuning on public-test outcomes, post-result scenario changes, resample crossing of split boundaries, or a predictor derived from the held-out event. Leakage cannot be repaired by deleting one metric after inspection.

`LEAKAGE-MATRIX/design-0.1` is an isolated input-guard matrix, not a `ScenarioParameterPreimage`. It is the exact Cartesian product of split-overlap rate × label-leakage rate, each decimal string in `{0.00,0.01,0.05,0.20}`, coverage `{C10,C22}`, and profile `{K0-CALIBRATED,K3-OVERCONFIDENT}`: 64 fixtures sorted by coverage, profile, overlap rate, then leakage rate. The clean eligible universe is the lexicographic public-test family IDs (`SMSG-0007..0010` for C10; `SMSG-0015..0022` for C22) × `SCARD-0001..0004` × `SRATER-0001..0003` × candidate suffix `{A,B}`. Record IDs are `LGREC-<coverage>-<profile>-ffff-cccc-rrrr-<suffix>`; therefore `eligible_count` is exactly `96` for C10 and `192` for C22. Clean record index `j` has synthetic event label `1` iff `((j-1) mod 10)<3`; the profile ID is metadata for the guard and does not change this universe. Its `case_content_hash` is SHA-256 of the JCS object with exactly `candidate_suffix`, `card_id`, `event_label`, `family_id`, `profile_id`, and `rater_id`; the clean record then has exactly those fields plus `record_id`, `split="public_test"`, and `case_content_hash`.

For each channel with nonzero rate `x`, select the first `k=max(1,ceil(x*eligible_count))` clean records. Split-overlap injection adds one calibration shadow record `LGSHADOW-<clean-id>` with the same family ID and case-content hash while retaining the original public-test record; overlap is exactly the relation “one family/case-content hash appears in both calibration and public-test memberships.” Label-leakage injection adds prohibited pre-outcome field `feature_leaked_event` equal to that record's sealed event label; label leakage is exactly equality of that feature and the held-out label. When both channels select a record, both transforms apply. Record per-channel and union injected/detected counts. A conforming guard rejects before generation or fitting and detects every transformed relation; the all-zero fixture makes no transform and must be accepted. Any nonzero fixture that passes, any injected relation not counted, or any zero fixture rejected sets `invalid_run` with the exact guard reason.

| Field | Level | Frozen union | Required behavior |
| --- | --- | --- | --- |
| `run_validity_status` | Run | `not_run`, `valid`, `invalid_run` | Locked validity union; `invalid_run` propagates `invalid` to every affected analytic union |
| `run_completion_status` | Run | `not_started`, `running`, `complete`, `incomplete` | Separate computational completeness; `incomplete` blocks aggregate decisions but does not itself rewrite validity |
| `cell_completion_status` | Cell | `not_started`, `running`, `complete`, `simulation_precision_unmet`, `incomplete` | Precision/completeness state only; never placed in an estimate, probability, or interval status |
| `input_guard_status` | Input fixture | `not_checked`, `accepted`, `rejected_input` | A rejected negative-test fixture never reaches generation or fitting |
| `estimator_attempt_status` | Replicate/method | `not_attempted`, `precheck_undefined`, `estimated`, `estimator_failure` | Domain/precheck null is distinct from a numerical failure; both remain in the replicate denominator |
| `estimate_status` | Analytic estimate | `not_run`, `estimated`, `undefined`, `invalid`, `unsupported` | Locked estimate union; value present only for `estimated` |
| `synthetic_truth_status` | Simulation truth | `not_run`, `exact`, `reference_approximated`, `undefined`, `not_applicable`, `invalid` | Separate from estimate state; value present only for `exact` or precision-qualified `reference_approximated` |
| `probability_status` | Prediction | `not_run`, `predicted_uncalibrated`, `predicted_calibrated_for_scope`, `abstained`, `unsupported_scope`, `invalid` | Locked probability union; probability present only for either predicted status |
| `observed_event_status` | Event label | `not_observed`, `observed`, `abstained`, `unsupported_scope`, `invalid` | Observed event is `0` or `1` only for `observed`; otherwise null with reasons |
| `interval_status` | Interval | `estimated`, `undefined`, `invalid`, `unsupported_scope`, `not_run` | Locked interval union; both endpoints present only for `estimated` |
| `terminal_status` | Paper design | `design_supported`, `requires_cognitive_validation`, `requires_simulation`, `requires_pilot_data`, `unsupported` | Separate disposition; never rewritten by run or analytic state |

Precheck and fit outcomes map exactly as follows; no implementation may choose another null union. Evaluate every applicable precheck, retain its reasons in table order, and use `unsupported`/`unsupported_scope` over `undefined` if both could apply.

| Condition | Attempt | Estimate | Interval | Exact reasons |
| --- | --- | --- | --- | --- |
| Method is not mapped to the arm | `not_attempted` | no metric record | no interval record | none |
| Zero analytic denominator | `precheck_undefined` | `unsupported` | `unsupported_scope` | estimate `zero_denominator`; interval `unsupported_target_scope` |
| Alpha expected disagreement nonpositive | `precheck_undefined` | `unsupported` | `unsupported_scope` | estimate `expected_disagreement_nonpositive`; interval `unsupported_target_scope` |
| `CARD1` order coefficient | `precheck_undefined` for that coefficient | `unsupported` | `unsupported_scope` | estimate `order_effect_not_identifiable_single_card`; interval `unsupported_target_scope` |
| Constant/aliased side or order, including `S-ALIASED` side and `O-ALIASED` order | `precheck_undefined` for that coefficient | `unsupported` | `unsupported_scope` | estimate `assignment_aliased`; interval `unsupported_target_scope` |
| Calibration public-test coverage absent | `precheck_undefined` | `unsupported`; probability `unsupported_scope` | `unsupported_scope` | estimate `insufficient_card_coverage`; probability `unsupported_event_scope`; interval `unsupported_target_scope` |
| Calibration scored event/non-event minimum not met for `A-CAL-LOGIT`, reliability, or discrimination | `precheck_undefined` | `unsupported` | `unsupported_scope` | estimate `minimum_event_profile_not_met`; interval `unsupported_target_scope`; K6 missingness diagnostic is unaffected |
| K4 constant-prediction calibration intercept/slope | `precheck_undefined` for both coefficients | two coefficient `MetricRecord`s, each `unsupported` with null value; estimated-coefficient count `0` | two `unsupported_scope` records | estimate `constant_prediction_calibration_not_identifiable`; interval `unsupported_target_scope`; direct prediction variance remains separately estimated |
| K6 with MP00 missingness diagnostic boundary | one required diagnostic record with `precheck_undefined` | `unsupported` with null value; estimated-coefficient count `0` and `missing_prediction_count=0` | one `unsupported_scope` record | estimate `diagnostic_inapplicable_boundary`; interval `unsupported_target_scope` |
| `G0-CURRENT-DYADS` lacks recurring identity | `precheck_undefined` | `unsupported` | `unsupported_scope` | estimate `nonrecurring_entity_identity`; interval `unsupported_target_scope` |
| Recurring graph not observed-directed-strongly-connected | `precheck_undefined` | `unsupported` | `unsupported_scope` | estimate `observed_graph_not_strongly_connected`; interval `unsupported_target_scope` |
| Separation/undefeated/winless guard fires | `precheck_undefined` | `unsupported` | `unsupported_scope` | estimate `separation_detected`; interval `unsupported_target_scope` |
| `CF4-INVALID-OPERATION` | `precheck_undefined` | `unsupported` | `unsupported_scope` | estimate `unsupported_estimand_scope`; interval `unsupported_target_scope` |
| Eligible numerical fit fails | `estimator_failure` | `undefined` | `undefined` | estimate `estimator_nonconvergence`; interval `estimate_undefined` |
| Eligible fit succeeds | `estimated` | `estimated` | per named interval procedure | empty estimate reasons; interval reasons per procedure |

Any of the following sets `run_validity_status=invalid_run`: source/protocol/implementation hash mismatch; unfrozen runtime; scenario-grid mismatch; duplicate ID/hash; shortened-ID collision; seed/PRNG/stream mismatch; forbidden random-stream reuse; canonicalization failure; non-finite serialized value; negative-control mismatch; split overlap or held-out leakage that reaches analysis or occurs outside the isolated negative-test envelope; failure to reject an injected leakage fixture; prohibited raw/production/participant input; unrecorded exclusion; denominator mismatch; overwritten result; missing provenance; graph diagnostic contradicted by emitted utility; or a non-null value in a status requiring null.

Numerical nonconvergence confined to a correctly retained replicate sets `estimator_attempt_status=estimator_failure`, affected `estimate_status=undefined`, and affected `interval_status=undefined`; it does not necessarily invalidate the run. Suppressing, retrying with an undisclosed method, changing the seed, or excluding that replicate makes the run invalid.

The exact invalid-run propagation is: `run_validity_status=invalid_run` with the exact cause in `run_validity_reason_codes`; affected `estimate_status=invalid`, `synthetic_truth_status=invalid`, `probability_status=invalid`, and `interval_status=invalid`; affected numeric fields are null; and each affected analytic/truth reason array contains `invalid_run_propagated`. The analytic record links the run record carrying the exact cause. `terminal_status` does not change.

### Frozen reason-code vocabulary

Reason arrays may contain only the codes below. A new cause requires a protocol revision before use.

| Record family | Exact reason codes |
| --- | --- |
| Run validity | `source_hash_mismatch`; `protocol_hash_mismatch`; `implementation_hash_mismatch`; `runtime_manifest_unfrozen`; `scenario_grid_mismatch`; `duplicate_record_id`; `scenario_id_collision`; `prng_conformance_failure`; `random_stream_reuse`; `canonicalization_failure`; `nonfinite_serialized_value`; `negative_control_mismatch`; `intercept_solver_failure`; `held_out_leakage`; `split_overlap`; `leakage_guard_failure`; `prohibited_input`; `unrecorded_exclusion`; `denominator_mismatch`; `record_overwrite`; `missing_provenance`; `graph_guard_contradiction`; `status_value_union_violation` |
| Estimate | `simulation_not_run`; `zero_denominator`; `minimum_event_profile_not_met`; `diagnostic_inapplicable_boundary`; `constant_prediction_calibration_not_identifiable`; `expected_disagreement_nonpositive`; `insufficient_card_coverage`; `nonrecurring_entity_identity`; `observed_graph_not_strongly_connected`; `separation_detected`; `assignment_aliased`; `order_effect_not_identifiable_single_card`; `estimator_nonconvergence`; `unsupported_estimand_scope`; `invalid_run_propagated` |
| Synthetic truth | `simulation_not_run`; `misspecified_model_no_scalar_truth`; `reference_precision_unmet`; `descriptive_only`; `invalid_run_propagated` |
| Probability/event | `simulation_not_run`; `predictor_abstained`; `unsupported_event_scope`; `prediction_generated_after_outcome`; `event_not_observed`; `observed_event_abstained`; `invalid_observed_event`; `held_out_leakage`; `invalid_run_propagated` |
| Interval | `simulation_not_run`; `estimate_undefined`; `unsupported_target_scope`; `insufficient_effective_clusters`; `failed_resample_limit`; `invalid_run_propagated` |
| Completion/input | `monte_carlo_precision_cap_reached`; `mandatory_cell_incomplete`; `expected_rejected_input`; `unexpected_input_acceptance` |

## Required sensitivity analyses

Sensitivity outputs below are mandatory secondary analyses of already enumerated cells; they do not create another scenario arm or change `ScenarioParameterPreimage`. Each output references its base scenario hash, analysis ID, and sensitivity ID and cannot overwrite the primary result.

| Sensitivity ID | Exact base cells and secondary operation | Question bounded to the simulation |
| --- | --- | --- |
| `SA-TARGET` | Compare the four `target_population_kind` cells already paired in `ARM-E-INTERVAL`, with all other factor values identical | Which uncertainty claims change with target? |
| `SA-MISSING` | Compare `{M00/MCAR,M15/MAR-ORDER-CONTEXT,M30/MNAR-PREFERENCE}` cells already paired in Arms A, E, I, and K | Which conclusions rely on missingness mechanism? |
| `SA-CATEGORY-COLLAPSE` | On each Arm A replicate, recompute once with `both_unacceptable→indistinguishable` and once with `insufficient_context` removed only from the secondary analytic denominator while retained in the ledger; retain the primary five-category result | Quantify harm from both prohibited collapses |
| `SA-ORDINAL` | Compare the four ordinal-profile cells already paired in `ARM-J-HETEROGENEITY-ORDINAL` | How model-dependent is ordinal recovery? |
| `SA-BT-PENALTY` | In every Arm D `G1`–`G6` recurring-identity cell, run the named ridge sensitivity whether or not ordinary-BT connectivity/separation guards pass; compare with ordinary BT where defined and retain every guard result | Show that finite penalized output does not repair identity/connectivity |
| `SA-INTERVAL` | In every Arm E cell, apply `I-MESSAGE-PCT/design-0.1`, `I-RATER-PCT/design-0.1`, `I-CROSSED-PCT/design-0.1`, and `I-NAIVE-WALD/design-0.1`; label only a matching new-message/new-rater/crossed method eligible and record the fixed-target gap | Expose dependence-unit mismatch |
| `SA-CAL-BINS` | In Arm F, repeat the primary reliability procedure with `5`, `10`, and `20` bins, sorting scored cases by `p` then case ID and allocating earlier bins one extra record when counts do not divide evenly | Show bin sensitivity without selecting a flattering table |
| `SA-CAL-COMPLETE-CASE` | In Arm F, compare complete-prediction metrics with known full synthetic truth; perform no IPW model | Quantify selection bias under the frozen missingness mechanism |
| `SA-COUNTERFACTUAL` | Compare the five counterfactual profiles and both `SLOC-1/SLOC-2` cells already paired in Arm K | Bound threshold, construct, item/stratum, and invalid-operation dependence |

Locale strata are abstract `SLOC-1` and `SLOC-2`; they do not model or characterize any actual language or culture. No cross-locale rank is produced. Missing any applicable secondary operation makes its base cell `incomplete` for sensitivity reporting but does not change the primary metric.

## Record contracts

All records are append-only, content-addressed, and schema-valid. A corrected run receives a new `run_id`; prior records are not overwritten.

### Design and scenario records

| Record | Required fields |
| --- | --- |
| `SimulationDesignRecord` | `protocol_id`, `protocol_hash`, `source_manifest[]`, `scenario_grid_id`, `generating_profile_id`, `math_profile_id`, `analysis_profile_id`, `schedule_profile_id`, `population_block_id/hash`, `record_profile_id`, `master_seed_hex`, `prng_id`, `canonical_serialization`, `execution_status`, `authority`, `record_hash` |
| `ImplementationManifestRecord` | `implementation_id/hash`, `repository_revision`, `runtime/libraries/container/os` with versions and hashes, `conformance_test_hash`, `created_at`, `author_role`, `independent_verifier_role`, `record_hash` |
| `ScenarioParameterPreimage` | Exactly the eight top-level keys, 26 factor keys, types, and value encodings frozen by the normative baseline schema; exact substitutions only; excludes arm membership and every derived ID/hash/timestamp/result |
| `ScenarioRecord` | `scenario_parameter_hash`, derived `scenario_id`, complete embedded `ScenarioParameterPreimage`, sorted `arm_memberships`, `input_guard_status`, input-guard reasons, and its own independently derived `record_hash` |
| `LeakageFixtureRecord` | `LEAKAGE-MATRIX/design-0.1`, coverage/profile IDs, decimal-string overlap/leakage rates, eligible/injected/detected counts, `input_guard_status`, exact reasons, and `record_hash` |

### Run, replicate, and metric records

| Record | Required fields |
| --- | --- |
| `SimulationRunRecord` | `run_id`, design/implementation hashes, start/end timestamps, `run_validity_status`, `run_validity_reason_codes`, `run_completion_status`, completion reason codes, mandatory/complete/precision-unmet cell counts, input/output manifest hashes, operator role, prohibited-capability attestation, `record_hash` |
| `AssignmentDispositionRecord` | Assignment/schedule refs; `eligible`, `nonstarted`, `nonlocked`, `abstained`, `submitted`, and `invalidated` timestamps/booleans as applicable; exact procedural or invalidation reason; no response for nonstart/nonlock/abstention |
| `SyntheticRatingRecord` | Raw `display_pairwise_outcome` in `{LEFT,RIGHT,indistinguishable,both_unacceptable,insufficient_context}` or null; display-left/right bands; response status; procedural reason; evidence/missing-context/defect fields; exact presentation assignment ref; lock/hash fields |
| `SyntheticMappingRecord` | Locked raw rating/assignment hashes, raw display outcome, derived canonical `A`, `B`, or unchanged nondecisive outcome, display and candidate IDs/bands, mapping profile/version, derivation timestamp, `record_hash` |
| `CalibrationCaseRecord` | Arm-F case/unit/context/candidate/pair/family/card/rater/split IDs, exact event ID/definition, `r_raw`, pre-outcome prediction status/value, observed-event status/value, logical ordering fields, and `record_hash` |
| `CalibrationTruthRecord` | Case/profile refs, sealed `pi` and `p_star`, clip flags, seal/unseal state and timestamps, permitted evaluation-only use, stream coordinates, and `record_hash`; unavailable to prediction fitting/scoring until evaluation |
| `ReplicateRecord` | `run_id`, `scenario_parameter_hash`, decimal `replicate_index`, stream fingerprints/counters, eligible/assigned/nonstarted/nonlocked/abstained/submitted/invalid/unobserved counts, raw and derived mapping counts, graph diagnostics, `estimator_attempt_status` and reasons by method, leakage flags, warning hashes, `record_hash` |
| `MetricRecord` | Locked common envelope: `estimand_id/revision`, `construct_ref`, `response_ontology_ref`, `target_population_kind`, full scope, `admissibility_profile_ref`, numerator/denominator/ledger, `estimate_status/reason_codes/value/scale`, separate `synthetic_truth_status/value/reason_codes/mcse`, `run_validity_status/reason_codes`, separate `terminal_status`, model/plan/split refs, diagnostics, limitations, prohibited interpretations, dependence units, method/version, Monte Carlo error, and `record_hash` |
| `ProbabilityRecord` | Exact event ID/revision/definition, prediction unit, `probability_status/reason_codes/value`, pre-outcome generation time, model/prompt/feature/profile/split refs, raw-score fields, `observed_event_status/reason_codes/value`, proper score, reliability bins, discrimination, answer coverage, selective risk, abstention breakdown, `record_hash` |
| `IntervalRecord` | `interval_status/reason_codes`, level/lower/upper/scale, method/version, `target_generalization`, sampling/cluster/strata arrays, family/rater/effective-cluster counts, resample repetitions/seed, convergence/failure fields, coverage-validation status/simulation ref, multiplicity policy, interpretation, `record_hash` |
| `CellDecisionRecord` | `scenario_parameter_hash`, completed valid replicates, stop reason, band results, `cell_completion_status`, prohibited-output count, operating decision and reasons, `record_hash` |

For an estimate, `estimate_value` is present and `estimate_reason_codes` is empty exactly when `estimate_status=estimated`; for `not_run`, `undefined`, `invalid`, or `unsupported`, value is null and reasons are nonempty. Synthetic truth value is finite with empty reasons for `exact`; for `reference_approximated`, it is finite with empty reasons and `synthetic_truth_mcse<=0.00025`; for every other truth status value and MCSE are null and reasons are nonempty. Truth unavailability never populates estimate reasons or changes an otherwise valid point estimate. For a probability, value is in `[0,1]` and reasons are empty exactly for `predicted_uncalibrated` or `predicted_calibrated_for_scope`; it is null with reasons for every other probability status. For an interval, finite ordered endpoints are present and reasons are empty exactly for `interval_status=estimated`; otherwise both endpoints are null and reasons are nonempty. No generic `status`, `confidence`, `score`, or cross-layer fallback field is allowed.

Before execution, the protocol-level mapping is `run_validity_status=not_run`, `estimate_status=not_run`, `synthetic_truth_status=not_run`, `probability_status=not_run`, and `interval_status=not_run`, with numeric fields null and `simulation_not_run` reasons. A post-fit numerical failure uses `estimate_status=undefined`, never a domain guard; a zero-denominator, degenerate, aliased, or unsupported-scope precheck uses `estimate_status=unsupported` as mapped above. Simulation precision and completeness stay only in their dedicated cell/run fields.

### Provenance and review records

| Record | Required fields |
| --- | --- |
| `ProvenanceRecord` | Parent record hash, source/design/implementation/runtime/input/output hashes, derivation method/version, seed coordinates, timestamp, actor role, data-class declaration, capability envelope, `record_hash` |
| `MethodReviewRecord` | Review ID, exact design/implementation hashes, reviewer identity/role and independence declaration, estimand/DGM/grid/graph/interval/calibration/stopping/leakage/schema checklist dispositions, blocking issues, `reviewed_no_blocking_issue\|revision_required`, date, signature/hash |
| `OperatingRuleReviewRecord` | Candidate rule ID, exact valid run/cell hashes, applicable band results, cognitive/pilot prerequisites, canonical design disposition, recommendation text, accountable human decision owner, `record_hash` |

Raw synthetic draws need not contain content; participant identifiers and production data are prohibited. Logs retain numeric diagnostics and hashes, not secrets. Access, retention, publication, and any persistence beyond an approved append-only local result path require separate authority under the [security controls](../05-technology/security-privacy-and-trust-boundaries.md#logging-audit-and-observability).

## Independent method review

Before a future implementation is run, a method reviewer who did not author the simulator must inspect the exact protocol and implementation hashes. Review must cover:

- target/estimand/unit alignment and fixed-versus-redrawn dependence units;
- prevalence vectors and all five submitted outcomes plus procedural, invalid, and unobserved states;
- DGM equations, random-stream conformance, finite-effect freezing, and scenario completeness;
- coverage/split logic, side/order coding, graph recurrence, directed strong connectivity, and separation guards;
- candidate estimators, interval targets, calibration event/profile/split definitions, and null unions;
- Monte Carlo precision, stopping, failure retention, leakage injection/detection, and prohibited inputs; and
- schema, hashes, provenance, reproducibility, and exact claims the simulation cannot support.

`revision_required` blocks a run. `reviewed_no_blocking_issue` means only that the synthetic experiment is methodologically runnable as specified. It is not architecture approval, study authorization, construct validation, pilot readiness, or threshold acceptance. Any material revision creates a new protocol revision, source/design hashes, review, and run ID.

## Exact design-disposition rules

The canonical paper-design dispositions are mutually exclusive primary statuses. Apply the first matching rule from top to bottom; retain other unmet prerequisites as secondary reason codes.

| Precedence | Canonical status | Exact criterion |
| ---: | --- | --- |
| 1 | `unsupported` | The claimed entity/construct/event/unit/target is undefined or contradictory; identity does not recur where a utility is claimed; required graph/coverage conditions fail by design; the claim collapses independent outcomes; or no admissible estimator can identify it. Value and interval must be null. |
| 2 | `requires_cognitive_validation` | A coherent quantitative design depends on unresolved human interpretation of a construct, anchor, ordinal band, `indistinguishable`, `both_unacceptable`, `insufficient_context`, or counterfactual. Simulation may show sensitivity but cannot clear this status. |
| 3 | `requires_simulation` | Identity and response meaning are sufficiently stipulated for paper analysis, but a numeric allocation, sample, coverage, exclusion, estimator, interval, graph guard, calibration diagnostic, or stop rule lacks completed valid operating-characteristic evidence and independent review. |
| 4 | `requires_pilot_data` | Cognitive validation and applicable simulation/review prerequisites could be satisfied, but the claim requires observed ratings, disagreement, missingness, events, or empirical model behavior from a separately authorized exact pilot. |
| 5 | `design_supported` | The claim is a coherent bounded descriptive paper design, needs no unresolved cognitive, simulation, or pilot premise for that design statement, preserves null/failure states and scope, and does not assert empirical validity, performance, or approval. |

Simulation success cannot skip a higher-precedence prerequisite. A future valid run may change a candidate numeric rule from `requires_simulation` to `requires_pilot_data` at most; a human owner must review that transition. It cannot change an `unsupported` current-bundle utility into support, validate a response ontology, or establish a product outcome.

## Completion and reporting gate

This protocol is complete as a **proposal for review** only when its source hashes, links, factor levels, grid, generating assumptions, streams, estimand mappings, metrics, stopping rules, failure states, wire contracts, and disposition rules are internally consistent. That paper completeness does not close `P4-06c`.

A future P4-06c evidence packet would require, at minimum:

1. an independently reviewed conforming implementation manifest;
2. one valid, complete run covering every frozen mandatory cell;
3. immutable scenario-, replicate-, metric-, failure-, provenance-, and review records;
4. exact reporting of precision-unmet cells, leakage tests, estimator failures, and sensitivity results; and
5. a separate human decision record that says which hypotheses remain `requires_cognitive_validation`, `requires_simulation`, `requires_pilot_data`, or `unsupported`—without calling any threshold accepted merely because a synthetic band passed.

## Closure

| Item | Status at this revision | Reason |
| --- | --- | --- |
| Paper protocol artifact | `design_supported` | The retained generators, diagnostics, methods, null paths, and explicit method gaps are reproducibly specified for independent review; this is not support for a fixed-panel, sample, coverage, reliability-bound, or counterfactual operating rule |
| Simulation execution/results | `requires_simulation` | No implementation or run exists |
| Construct/response validity | `requires_cognitive_validation` | No cognitive-validation evidence exists |
| Human pilot inference | `requires_pilot_data` | No pilot is authorized or run |
| Current global candidate utility and universal scalar | `unsupported` | Current identity/graph and construct conditions do not define them |
| Numeric thresholds and operating rules | `requires_simulation` | No threshold is accepted; all numeric values remain hypotheses |
| Authority to implement, collect, fit, persist, or release | `none` | This proposal has `authority: none` |

**[Proposal]** Preserve this boundary verbatim in any future simulation report: simulations are hypothetical operating-characteristic studies under frozen assumptions, not evidence of construct validity, pilot outcome, real-world calibration, voice quality, product benefit, or authorization.
