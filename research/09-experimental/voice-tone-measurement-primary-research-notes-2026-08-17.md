---
title: Voice and tone measurement primary research notes
status: working-note
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
execution_status: not-executed
research_mode: public-primary-sources-read-only
scope: Primary-source measurement foundation for the experimental voice and tone graph and human calibration instrument
source_documents:
  - voice-tone-graph-and-measurement.md
  - voice-tone-human-calibration-instrument.md
  - ../00-method/research-protocol.md
  - ../06-evaluation/evaluation-and-benchmarks.md
  - ../08-synthesis/candidate-system-model.md
---

# Voice and tone measurement primary research notes

## Result

**[Cross-source finding]** The proposed voice-and-tone measurement system needs a family of explicitly scoped estimands, response models, reliability diagnostics, uncertainty procedures, and human-review gates; the reviewed statistical literature does not support one universal voice score, a universal reliability cutoff, or a global cross-locale rank. Pairwise choice, ties, ordinal ratings, missingness, calibration, and cross-group comparability are different measurement problems and require different assumptions and diagnostics ([Bradley and Terry, 1952](https://doi.org/10.1093/biomet/39.3-4.324); [Davidson, 1970](https://doi.org/10.1080/01621459.1970.10481082); [Krippendorff, 2011](https://repository.upenn.edu/bitstreams/0421f871-f005-4322-b06a-a66bec328e3b/download); [Meredith, 1993](https://doi.org/10.1007/BF02294825); [Rubin, 1976](https://doi.org/10.1093/biomet/63.3.581); [Das and Dennis, 1997](https://doi.org/10.1007/BF01197559)).

**[Inference]** This source set does not directly evaluate embedding-derived voice measurement. It therefore cannot establish an embedding or embedding distance as a truth target; any such representation remains a scoped model feature or research hypothesis requiring direct construct validation, not ground truth or a universal score.

**[Proposal]** Treat the current graph and instrument as a versioned research design whose measurement claims remain `not-executed`. Before fitting anything, freeze the exact construct, outcome ontology, unit, target population, comparison graph, locale/surface/risk stratum, sampling design, split, missingness policy, and intended generalization. If those do not identify a defensible estimand, return `research_only`, `unsupported_scope`, or `measurement_not_comparable` rather than producing a number.

**[Open question]** The evidence does not yet establish that `VT-D01`–`VT-D07` are distinct, unidimensional, invariant, or useful constructs. Cognitive interviews, qualitative disagreement analysis, and a sufficiently connected pilot must precede any claim that the cards define stable quantitative scales.

This is a **working note** and the described study has **not been executed**. It reports no ratings, fitted parameters, reliability result, calibration profile, validated threshold, approved voice system, approved tone policy, product winner, release decision, or user outcome.

## Evidence and claim boundary

**[Documented practice]** This note follows the repository's [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary): factual and mathematical claims are linked directly to an original paper, official standard, government method, author repository, or authoritative technical documentation; proposals are bounded applications to the experimental content-design system.

**[Inference]** A method being mathematically available does not make it valid for this instrument. Model choice depends on the response type, sampling design, dependence structure, comparison graph, missingness mechanism, and claim scope. A high reliability coefficient can coexist with an invalid construct, a calibrated forecast can have weak discrimination, and a precise estimate can answer the wrong question.

**[Proposal]** Preserve the separations already required by the [voice-and-tone graph](voice-tone-graph-and-measurement.md#non-negotiable-separations), the [human calibration instrument](voice-tone-human-calibration-instrument.md#study-question-and-unit-of-analysis), the [evaluation canon](../06-evaluation/evaluation-and-benchmarks.md#evaluation-layers), and the [candidate system model](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records). Measurement evidence must not set product truth, approval, delivery, release, or user-outcome state.

## Research question map

| Existing design seam | Primary measurement question | Evidence-backed disposition for the next revision |
| --- | --- | --- |
| Five pairwise outcomes | Which outcomes belong in a preference likelihood? | Model `A`, `B`, and a validated `indistinguishable` tie mechanism only; retain `both_unacceptable`, `insufficient_context`, and procedural abstention as distinct processes |
| Candidate utilities | What entities recur in a connected comparison graph? | Do not fit candidate-level Bradley–Terry utilities to isolated dyads; define recurring systems/treatments or report pair-level outcomes only |
| Fit bands `0`–`4` | Are category gaps equal? | No interval assumption; use distributions and an ordinal model only if thresholds and proportionality are defensible |
| Repeated raters and messages | What population is the inference about? | Declare fixed-panel versus rater-population estimand; account for message-family and rater dependence when both are sampled |
| Five-outcome agreement | What does one alpha summarize? | Report full-response reproducibility plus prevalence, confusion, missingness, and outcome-specific diagnostics; do not interpret alpha as validity |
| Locale branches | Is the construct comparable across languages and cultures? | Treat every branch as a new adaptation until conceptual equivalence, local evidence, and an identified invariance/DIF design pass |
| Automated evaluator probability | Probability of which event, for which population? | Define one observable event and unit, evaluate on untouched families, and report proper score, calibration, discrimination, coverage, and intervals |
| Composite quality | Whose tradeoffs and which hard constraints? | Keep hard gates non-compensable and soft results vector-valued; any scalarization is a declared, local decision policy rather than discovered truth |

## Source method and register

Sources were reviewed from public web pages available without an account as of the 2026-08-17 cutoff. No form was submitted, no account was created, and no organization was contacted. Some publisher pages expose only metadata and abstracts; an abstract supports only the claims it actually states. Links to author manuscripts, official repositories, or standards do not transfer reuse rights to this repository.

| ID | Primary or authoritative source | Publication / page state | Access and licensing boundary | Used for |
| --- | --- | --- | --- | --- |
| M01 | [Bradley and Terry, “Rank Analysis of Incomplete Block Designs: I,” Biometrika](https://doi.org/10.1093/biomet/39.3-4.324) | Original paper, 1952 | Publisher metadata and first-page preview; full text may require access | Binary paired-comparison probability model |
| M02 | [Ford, “Solution of a Ranking Problem from Binary Comparisons”](https://doi.org/10.1080/00029890.1957.11989117) | Original paper, 1957 | Publisher metadata inspected; full text may require access; no reuse permission observed | Historical attribution only; the exact theorem is supported by M02a rather than inferred from this metadata record |
| M02a | [Yan, “Ranking in the generalized Bradley–Terry models when the strong connection condition fails,” arXiv v1](https://arxiv.org/html/1411.1168v1) | Public author manuscript, version 1 dated 2014-11-05; later published as a 2016 journal article | Public full-text arXiv HTML directly inspected; arXiv perpetual non-exclusive distribution license; no broader repository reuse permission inferred | Necessary-and-sufficient strong directed-connectivity condition for the ordinary Bradley–Terry MLE and failure when it is absent |
| M03 | [Davidson, “On Extending the Bradley–Terry Model to Accommodate Ties”](https://doi.org/10.1080/01621459.1970.10481082) | Original paper, 1970 | Publisher abstract; full text may require access | Tie-capable paired-comparison model |
| M04 | [Turner et al., “Modelling rankings in R: the PlackettLuce package”](https://doi.org/10.1007/s00180-020-00959-3) | Open-access original paper, 2020 | CC BY 4.0 article; software has its own license | Explicit Davidson-style tie parameterization and connected-network handling |
| M04a | [Joe, “Extended Use of Paired Comparison Models, with Application to Chess Rankings”](https://doi.org/10.2307/2347814); [public RePEc abstract](https://ideas.repec.org/a/bla/jorssc/v39y1990i1p85-93.html) | Original empirical paper, 1990 | Public publisher-supplied abstract in RePEc directly inspected; publisher full text may require access; no reuse permission observed | Reported Davidson-model misfit associated with player-level variation in draw percentages |
| M05 | [Krippendorff, “Computing Krippendorff's Alpha-Reliability”](https://repository.upenn.edu/bitstreams/0421f871-f005-4322-b06a-a66bec328e3b/download) | Author technical note, 2011 | Public author-repository document; copyright retained | Alpha formula, distance functions, multiple coders, incomplete data |
| M06 | [Krippendorff, “Reliability in Content Analysis”](https://doi.org/10.1111/j.1468-2958.2004.tb00738.x) | Original methodological paper, 2004 | Publisher abstract; full text may require access | Reliability-statistic interpretation and misconceptions |
| M06a | [Krippendorff, “Agreement and Information in the Reliability of Coding”](https://repository.upenn.edu/server/api/core/bitstreams/86b17550-83f8-422c-9ff0-628df92e1120/content) | Revised author manuscript of the 2011 journal article | Public author-repository manuscript inspected through indexed full-text retrieval; direct automated refetch returned `403` at validation time; copyright retained and no reuse license observed | Low-variation and information-deficiency limits of reliability coefficients |
| M07 | [McCullagh, “Regression Models for Ordinal Data”](https://doi.org/10.1111/j.2517-6161.1980.tb01109.x) | Original paper, 1980 | Publisher summary; full text may require access | Ordinal rather than cardinal modeling |
| M08 | [Hedeker and Gibbons, “A random-effects ordinal regression model for multilevel analysis”](https://pubmed.ncbi.nlm.nih.gov/7787006/) | Original paper, 1994 | PubMed abstract; journal text may require access | Clustered and longitudinal ordinal responses |
| M09 | [Meredith, “Measurement Invariance, Factor Analysis and Factorial Invariance”](https://doi.org/10.1007/BF02294825) | Original paper, 1993 | Publisher/ERIC metadata; full text may require access | Measurement-invariance conditions |
| M10 | [ETS, “Differential Item Functioning: Its Consequences”](https://www.ets.org/research/policy_research_reports/publications/report/2010/ibmd.html) | Official research report, 2010 | Public report record; copy request may apply to full text | DIF consequences and score dependence |
| M10a | [ETS, “When Do Item Response Function and Mantel-Haenszel Definitions of Differential Item Functioning Coincide?”](https://www.ets.org/research/policy_research_reports/publications/report/1989/ihne.html) | Official research report, 1989 | Public abstract; copy request may apply to full text | Conditional item-response definition and method dependence |
| M11 | [International Test Commission, Guidelines for Translating and Adapting Tests](https://www.intestcom.org/page/14) | Official guidance, second edition described as 2017 | Public overview; linked guideline is copyrighted | Linguistic and cultural adaptation, confirmation, interpretation, documentation |
| M12 | [U.S. Census Bureau, cognitive testing of translations in multiple languages](https://www.census.gov/library/working-papers/2008/adrm/ssm2008-02.html) | Official working paper, 2008 | Public abstract and linked government PDF | In-language expert panels and cognitive pretesting |
| M13 | [Henrich, Heine, and Norenzayan, “The weirdest people in the world?”](https://pubmed.ncbi.nlm.nih.gov/20550733/) | Original review article, 2010 | PubMed record links free article | Population-sampling limits on broad behavioral claims |
| M14 | [Brier, “Verification of Forecasts Expressed in Terms of Probability”](https://journals.ametsoc.org/doi/10.1175/1520-0493%281950%29078%3C0001%3AVOFEIT%3E2.0.CO%3B2) | Original paper, 1950 | Publisher HTML/PDF; copyright applies | Quadratic probability score |
| M15 | [Murphy, “A New Vector Partition of the Probability Score”](https://journals.ametsoc.org/configurable/content/journals%24002fapme%24002f12%24002f4%24002f1520-0450_1973_012_0595_anvpot_2_0_co_2.xml) | Original paper, 1973 | Publisher abstract/full-text controls; copyright applies | Reliability, resolution, and uncertainty decomposition |
| M16 | [Gneiting and Raftery, “Strictly Proper Scoring Rules, Prediction, and Estimation”](https://doi.org/10.1198/016214506000001437) | Original theory/review paper, 2007 | Publisher abstract; author manuscript also public | Propriety and forecast evaluation |
| M17 | [Vaicenavicius et al., “Evaluating model calibration in classification”](https://proceedings.mlr.press/v89/vaicenavicius19a.html) | Peer-reviewed original paper, 2019 | PMLR open access | Calibration definitions and evaluation subtleties |
| M18 | [Nixon et al., “Measuring Calibration in Deep Learning”](https://openaccess.thecvf.com/content_CVPRW_2019/html/Uncertainty_and_Robustness_in_Deep_Visual_Learning/Nixon_Measuring_Calibration_in_Deep_Learning_CVPRW_2019_paper.html) | Peer-reviewed workshop paper, 2019 | CVF open-access paper | Binning, class-conditional, and ECE limitations |
| M19 | [Efron, “Bootstrap Methods: Another Look at the Jackknife”](https://doi.org/10.1214/aos/1176344552) | Original paper, 1979 | Project Euclid/publisher access; copyright applies | Bootstrap resampling foundation |
| M20 | [Cameron, Gelbach, and Miller, “Robust Inference With Multiway Clustering”](https://doi.org/10.1198/jbes.2010.07136) | Original paper, 2011 | Publisher abstract; author preprint public separately | Nonnested two-way dependence |
| M21 | [NIST, “What are confidence intervals?”](https://www.itl.nist.gov/div898/handbook/prc/section1/prc14.htm) | Official statistics handbook page | Public U.S. government technical guidance | Repeated-sampling interpretation |
| M22 | [Rubin, “Inference and Missing Data”](https://doi.org/10.1093/biomet/63.3.581) | Original paper, 1976 | Publisher abstract; full text may require access | Ignorability and missingness mechanism |
| M23 | [El-Yaniv and Wiener, “On the Foundations of Noise-free Selective Classification”](https://jmlr.org/papers/v11/el-yaniv10a.html) | Original open-access paper, 2010 | JMLR public article | Risk–coverage tradeoff for reject options |
| M24 | [Das and Dennis, “A Closer Look at Drawbacks of Minimizing Weighted Sums”](https://doi.org/10.1007/BF01197559) | Original paper, 1997 | Publisher access may be restricted; author copy exists | Weighted-sum limits for Pareto-set generation |
| M25 | [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/) | Author-hosted book and materials, page current at cutoff | Cambridge copyright; authors permit public web access | Vector optimization and scalarization foundation |

# Topic notes

## 1. Bradley–Terry pairwise models

### Sourced mathematical and measurement fact

**[Sourced fact]** The Bradley–Terry model assigns each compared item a positive worth `pi_i` and models a decisive binary outcome as follows ([Bradley and Terry, 1952](https://doi.org/10.1093/biomet/39.3-4.324)):

```text
P(i beats j) = pi_i / (pi_i + pi_j)
             = logistic(theta_i - theta_j), where theta_i = log(pi_i)
```

The worths are relative: multiplying every `pi` by the same constant does not change the probabilities, so an anchor or equivalent constraint is required ([Bradley and Terry, 1952](https://doi.org/10.1093/biomet/39.3-4.324)).

**[Sourced fact]** For the ordinary, unpenalized Bradley–Terry likelihood for decisive binary outcomes with positive worth parameters and one scale-identifying constraint, a finite, unique interior maximum-likelihood estimate exists if and only if the observed directed win graph is strongly connected. Equivalently, every ordered pair of items has a directed path of wins from the first item to the second. In cut form, for every nonempty proper subset `S`, at least one item in `V − S` must have defeated an item in `S`; because the condition is evaluated for every such `S`, the complementary cut supplies the reverse direction. A merely undirected-connected comparison schedule is insufficient, and undefeated or completely separated items make the ordinary estimate non-finite or nonexistent. Ford is retained as the historical attribution at metadata scope; the exact condition was checked in Yan's accessible author manuscript ([Ford, 1957](https://doi.org/10.1080/00029890.1957.11989117); [Yan, 2014, arXiv v1](https://arxiv.org/html/1411.1168v1)).

### Bounded proposed application to content design

**[Proposal]** Use the ordinary unpenalized Bradley–Terry likelihood only for one declared dimension and one comparable stratum, only when the entity assigned a utility recurs, and only when the observed directed win graph is strongly connected. Mere undirected connectivity is insufficient. Plausible entities include a frozen generation system, rewrite treatment, or stable alternative family evaluated across message families. Include presentation side and other preregistered design effects when the design supports them.

**[Proposal]** If candidates are unique strings and each semantic-message family contributes one isolated A/B dyad, do not estimate global candidate utilities. Report the pair-level outcome distribution, and—if the same two recurring treatments generated alternatives across families—model the treatment contrast with message-family and rater dependence rather than pretending unique strings share an absolute scale.

### Failure modes and limitations

**[Inference]** A strongly connected directed observed-win graph is an admission condition for the ordinary unpenalized model, not proof of good fit, transitivity, construct validity, or context invariance. Cycles can be genuine context interactions; forcing them into a total rank can conceal that the proposed dimension changes meaning across states, surfaces, risks, or raters.

**[Inference]** Candidate identity is especially hazardous here. A utility attached to a literal expression cannot transfer automatically to another message, locale, or surface. A utility attached to a model or vendor risks conflating system identity with prompt, evidence, context, or authoring treatment.

### Unresolved validation

**[Open question]** Which recurring entity, if any, is scientifically meaningful across message families: system, treatment, pattern, expression strategy, or none? The pilot must draw and inspect the comparison graph before fitting and must report components, separation, side effects, cycles, and held-out predictive fit.

## 2. Davidson-style tie handling

### Sourced mathematical and measurement fact

**[Sourced fact]** Davidson extended Bradley–Terry to a three-outcome comparison with an explicit no-preference/tie event. In one common parameterization, with `nu >= 0` and `D = pi_i + pi_j + nu * sqrt(pi_i*pi_j)`, the probabilities are as follows ([Davidson, 1970](https://doi.org/10.1080/01621459.1970.10481082); [Turner et al., 2020](https://doi.org/10.1007/s00180-020-00959-3)):

```text
P(i wins) = pi_i / D
P(j wins) = pi_j / D
P(tie)    = nu * sqrt(pi_i*pi_j) / D
```

The tie probability is largest for equal-worth items; when `pi_i = pi_j`, it is `nu / (2 + nu)`. Equivalent implementations may place the factor or log transform in the tie parameter, so the exact parameterization must be recorded ([Davidson, 1970](https://doi.org/10.1080/01621459.1970.10481082); [Turner et al., 2020](https://doi.org/10.1007/s00180-020-00959-3)).

**[Sourced fact]** Tie mechanisms can misfit when tie prevalence varies materially by competitor or context; an empirical chess application reported poor Davidson-model fit because draw percentages varied substantially among players ([Joe, 1990, public abstract](https://ideas.repec.org/a/bla/jorssc/v39y1990i1p85-93.html)).

### Bounded proposed application to content design

**[Proposal]** Admit only a cognitively validated `indistinguishable` response to a Davidson-style tie likelihood. Keep `both_unacceptable`, `insufficient_context`, and procedural abstention outside that likelihood. They encode acceptability failure, packet insufficiency, and missing response respectively—not symmetric no preference.

**[Proposal]** Estimate a common tie parameter only after checking whether tie rates vary by rater, construct card, message family, locale, risk, surface, and presentation order. If a simple tie model fails, report ties descriptively or fit a preregistered extension rather than relabeling them as half-wins.

### Failure modes and limitations

**[Inference]** `Indistinguishable` can still mix at least two processes: candidates genuinely expressing the construct equally and raters being unable to discriminate with the given card. The Davidson model does not by itself identify which process produced a tie.

**[Inference]** Coding `both_unacceptable` as a tie would make two joint failures look like equal acceptable worth. Coding `insufficient_context` as a tie would turn a measurement defect into evidence about candidate proximity. Either transformation changes the estimand.

### Unresolved validation

**[Open question]** Do cognitive interviews and evidence spans show that raters consistently distinguish `indistinguishable`, `both_unacceptable`, and `insufficient_context`? If not, revise the instrument before choosing a tie likelihood.

## 3. Krippendorff alpha and statistic-selection limits

### Sourced mathematical and measurement fact

**[Sourced fact]** Krippendorff's alpha has the general form `alpha = 1 - D_o / D_e`, where `D_o` is observed disagreement and `D_e` is disagreement expected from the pooled value distribution. The distance function defines what counts as disagreement; the method supports multiple coders, incomplete matrices, and nominal, ordinal, interval, ratio, or specialized distances ([Krippendorff, 2011](https://repository.upenn.edu/bitstreams/0421f871-f005-4322-b06a-a66bec328e3b/download)).

**[Sourced fact]** Reliability is about reproducibility of the data-making process, not the validity, truth, usefulness, or fairness of the construct. Krippendorff also identifies low-information and prevalence configurations in which chance-corrected agreement can be unstable or misleading without companion evidence ([Krippendorff, 2004](https://doi.org/10.1111/j.1468-2958.2004.tb00738.x); [Krippendorff, 2011, “Agreement and Information in the Reliability of Coding”](https://repository.upenn.edu/server/api/core/bitstreams/86b17550-83f8-422c-9ff0-628df92e1120/content)).

### Bounded proposed application to content design

**[Proposal]** For the full five-outcome pairwise response, nominal alpha can summarize whether raters reproduce the complete response ontology. Always pair it with the confusion table, category prevalence, raw agreement, missingness, cluster-aware interval, and outcome-specific disagreement. Map displayed `LEFT`/`RIGHT` to canonical candidates before agreement analysis, while preserving the immutable display-level record.

**[Proposal]** For fit bands `0`–`4`, declare the ordinal distance exactly and report per-band distributions and adjacent versus distant disagreement. Treat ordinal certainty `0`–`3` as a process diagnostic only, not as correctness or evidence strength.

**[Proposal]** Report at least two distinct questions when data permit: full-response reproducibility, including rateability judgments; and preference reproducibility among substantively rateable records. Do not silently condition on a selected subset—show which records left the denominator and why.

### Failure modes and limitations

**[Cross-source finding]** Alpha's ability to accept incomplete matrices does not establish that missingness is ignorable. The coefficient's computational handling and Rubin's inferential conditions address different questions; procedural abstention can depend on locale, accessibility, expertise, conflict, or difficulty and therefore must be analyzed as a process, not erased ([Krippendorff, 2011](https://repository.upenn.edu/bitstreams/0421f871-f005-4322-b06a-a66bec328e3b/download); [Rubin, 1976](https://doi.org/10.1093/biomet/63.3.581)).

**[Inference]** One alpha can hide substantively different confusions—for example, `A` versus `B`, `A` versus `both_unacceptable`, and `A` versus `insufficient_context`. A high value can also be driven by a dominant category, while an undefined value can occur when expected disagreement is zero.

**[Inference]** The instrument's lower-bound targets `0.67` and `0.80` are product hypotheses. The reviewed primary sources do not turn either number into a universal validity or release standard, and a confidence-bound rule also depends on sampling unit, interval method, construct risk, and intended decision.

### Unresolved validation

**[Open question]** Which agreement estimand best matches each decision: reproducibility of the entire response process, decisive preference, rateability, or ordinal candidate fit? Simulations using the planned prevalence, rater allocation, and missingness patterns should test bias, coverage, undefined cases, and sensitivity before thresholds are frozen.

## 4. Ordinal and multilevel models

### Sourced mathematical and measurement fact

**[Sourced fact]** McCullagh's ordinal regression family models stochastic ordering without assigning cardinal scores to ordered categories. A cumulative-logit form uses ordered cutpoints and a common slope under the proportional-odds specification, rather than assuming that the distance from `0` to `1` equals the distance from `3` to `4` ([McCullagh, 1980](https://doi.org/10.1111/j.2517-6161.1980.tb01109.x)).

**[Sourced fact]** Random-effects ordinal models were developed for clustered and longitudinal ordinal responses, explicitly representing within-cluster dependence rather than treating every rating as independent ([Hedeker and Gibbons, 1994](https://pubmed.ncbi.nlm.nih.gov/7787006/)).

### Bounded proposed application to content design

**[Proposal]** If the data and construct support it, analyze one fit-band dimension with a cumulative-link mixed model such as:

```text
logit P(Y <= k) = tau_k - X*beta - u_rater - u_message_family
```

where `tau_0 < ... < tau_3` are estimated cutpoints, `X` contains only preregistered candidate/treatment, side, order, and context effects, and crossed rater/message terms match the actual allocation. Keep the raw bands and predicted category probabilities; do not replace them with a normalized mean.

**[Proposal]** Use partial pooling only within a declared dimension and comparable stratum. Report model assumptions, priors or estimation method, convergence, category sparsity, random-effect distributions, proportional-odds diagnostics, sensitivity to rater scope, and held-out prediction.

### Failure modes and limitations

**[Inference]** A cumulative-link model introduces a latent continuous ordering and usually a shared-slope assumption. Neither is guaranteed merely because labels were numbered `0`–`4`. Sparse bands, few raters, separation, non-proportional effects, and rater-specific threshold use can make estimates fragile or uninterpretable.

**[Inference]** Averaging the bands across `VT-D01`–`VT-D07` would assume both interval distances and cross-construct commensurability. An ordinal model within one construct does not authorize that aggregation.

### Unresolved validation

**[Open question]** Do raters use the five anchors in the intended order and with sufficiently similar thresholds? Compare cognitive-interview evidence, category-response curves, proportional-odds diagnostics, rater threshold variation, and a nonparametric descriptive baseline before retaining a quantitative ordinal model.

## 5. Measurement invariance and differential item functioning

### Sourced mathematical and measurement fact

**[Sourced fact]** Measurement invariance concerns whether a measurement model retains the relevant relation between observed indicators and the construct across populations or conditions; Meredith formalized conditions for factorial invariance and warned that group comparison requires more than fitting the same labels in each group ([Meredith, 1993](https://doi.org/10.1007/BF02294825)).

**[Sourced fact]** Differential item functioning examines whether an item's response function is the same across groups after conditioning on the measured trait. Different DIF definitions and matching methods need not coincide, and DIF can affect total and latent-score estimates ([ETS, 1989](https://www.ets.org/research/policy_research_reports/publications/report/1989/ihne.html); [ETS, 2010](https://www.ets.org/research/policy_research_reports/publications/report/2010/ibmd.html)). Detecting DIF is not by itself an explanation of cause or a complete fairness judgment.

**[Documented practice]** The International Test Commission's adaptation guidelines cover preconditions, development, confirmation, administration, scoring/interpretation, and documentation, and state that cultural adaptation is required even when no language translation occurs ([ITC guidelines overview](https://www.intestcom.org/page/14)).

### Bounded proposed application to content design

**[Proposal]** Do not compare raw fit bands, pairwise utilities, alpha values, or calibrated probabilities across locales until the study identifies the construct, indicator/item, common anchors, rater population, and appropriate invariance or DIF model. The analysis plan must say whether the intended equivalence is structural, ordinal, threshold, metric, scalar, or another explicitly justified form.

**[Proposal]** Treat construct-card translation as instrument adaptation. Preserve original and adapted cards as separate versioned records, perform conceptual review and in-language cognitive interviewing, and then use local raters and common anchor scenarios to test whether response thresholds or item effects differ.

### Failure modes and limitations

**[Inference]** The current instrument has one card per proposed construct and only seven cards. It has not yet defined a defensible multi-indicator latent model, so naming multi-group factor analysis or IRT does not make those methods identified. The protocol must first decide what counts as an item and what repeated observations are evidence of the same construct.

**[Inference]** A statistically detected group difference is not automatically DIF; a detected DIF signal is not automatically bias; and absence of detected DIF in a small or poorly anchored sample is not equivalence. Each signal needs content, locale, accessibility, and affected-community review.

### Unresolved validation

**[Open question]** Can common anchor scenarios preserve the same semantic obligations, consequence, risk, and pragmatic task across `en-US`, `fr-CA`, `ar-EG`, different scripts, and different rendered surfaces? Until qualified local review and an adequately powered, identified model answer that question, each locale remains a separate measurement scope.

## 6. Calibration, Brier score, and reliability diagrams

### Sourced mathematical and measurement fact

**[Sourced fact]** Brier's original probability score averages the sum of squared differences between forecast probabilities and one-hot outcomes over mutually exclusive and exhaustive categories. For a binary event `y_i in {0,1}`, the now-common single-event convention is `n^-1 * sum((p_i - y_i)^2)`; summing both binary class terms produces twice that value, so every report must state its convention ([Brier, 1950](https://journals.ametsoc.org/doi/10.1175/1520-0493%281950%29078%3C0001%3AVOFEIT%3E2.0.CO%3B2); [Gneiting and Raftery, 2007](https://doi.org/10.1198/016214506000001437)).

**[Sourced fact]** Murphy decomposed the probability score into uncertainty, reliability, and resolution. In the common loss convention, `Brier = uncertainty - resolution + reliability`, showing that calibration/reliability is only one property of forecast quality ([Murphy, 1973](https://journals.ametsoc.org/configurable/content/journals%24002fapme%24002f12%24002f4%24002f1520-0450_1973_012_0595_anvpot_2_0_co_2.xml)).

**[Sourced fact]** Proper scoring rules are designed so truthful predictive distributions optimize expected score, while calibration evaluation itself contains finite-sample and multidimensional subtleties. Common expected-calibration-error summaries depend on binning, class conditioning, which probabilities are included, and the norm used ([Gneiting and Raftery, 2007](https://doi.org/10.1198/016214506000001437); [Vaicenavicius et al., 2019](https://proceedings.mlr.press/v89/vaicenavicius19a.html); [Nixon et al., 2019](https://openaccess.thecvf.com/content_CVPRW_2019/html/Uncertainty_and_Robustness_in_Deep_Visual_Learning/Nixon_Measuring_Calibration_in_Deep_Learning_CVPRW_2019_paper.html)).

### Bounded proposed application to content design

**[Proposal]** Define a probability target as a narrow, observable event, for example: `a randomly drawn qualified rater from the declared population returns both_unacceptable for VT-D03 on this exact candidate pair and context`. Record whether the event is per-rating, majority-panel, adjudicated disposition, or another unit; those are not interchangeable truths.

**[Proposal]** On untouched semantic-message families, report Brier score, reliability table/diagram with bin counts, discrimination or resolution, prevalence/uncertainty, calibration slope/intercept or a preregistered alternative, and cluster-aware intervals. Show results by supported locale, surface, risk, and construct rather than only an aggregate.

**[Proposal]** Calibrate model outputs only on the calibration split, freeze the mapping, and evaluate once on the locked test split. Any change to the model, prompt, evidence retrieval, rubric, event definition, population, locale, or surface creates a new calibration scope.

### Failure modes and limitations

**[Inference]** A low Brier score can be achieved partly through event prevalence, and a well-calibrated predictor can have little resolution. A reliability diagram without counts or intervals can hide sparse bins. ECE alone can change with binning choices and should not be a release gate.

**[Inference]** Human panel outcomes are fallible measurements, not ground truth. Calibration to rater behavior can reproduce rubric defects, cultural narrowness, automation bias, or systematic error even when probability forecasts match observed frequencies.

### Unresolved validation

**[Open question]** Which rater event is operationally useful and ethically defensible for each evaluator action, and how stable is its calibration under new message families, raters, locales, surfaces, and time? No probability should be surfaced without that event definition and scope.

## 7. Confidence intervals and resampling

### Sourced mathematical and measurement fact

**[Sourced fact]** Efron's nonparametric bootstrap approximates a statistic's sampling behavior by repeatedly sampling with replacement from the empirical distribution and recomputing the statistic ([Efron, 1979](https://doi.org/10.1214/aos/1176344552)).

**[Sourced fact]** When observations are dependent in nonnested dimensions, one-way independence assumptions can understate uncertainty; multiway cluster methods were developed for settings with two or more nonnested clustering dimensions ([Cameron, Gelbach, and Miller, 2011](https://doi.org/10.1198/jbes.2010.07136)).

**[Sourced fact]** A frequentist confidence level describes the long-run coverage of the interval-producing procedure under repeated sampling, not a posterior probability that the fixed parameter lies in this one realized interval ([NIST](https://www.itl.nist.gov/div898/handbook/prc/section1/prc14.htm)).

### Bounded proposed application to content design

**[Proposal]** Declare the generalization target before choosing an interval:

| Target claim | Dependence that must be represented | Candidate procedure to validate |
| --- | --- | --- |
| These exact messages and this fixed rater panel | Repeated dimensions/candidates within message and rater | Design-based or model-based interval conditional on both fixed sets |
| New message families, same fixed panel | Message-family sampling | Resample whole semantic-message families, retaining all linked candidates, surfaces, ratings, and outcomes |
| New qualified raters, same message set | Rater sampling | Resample raters or use a justified rater random-effects model |
| New message families and new raters | Crossed message and rater sampling | Validated multiway or crossed hierarchical method; one-way message bootstrap is insufficient by itself |

**[Proposal]** Keep every expression, locale variant, surface occurrence, and counterfactual belonging to one semantic-message family inside the same resample. Predeclare percentile, basic, studentized, BCa, model-based, or other interval; report repetitions, seed, convergence/failure rate, cluster counts, strata, and sensitivity.

### Failure modes and limitations

**[Inference]** “Cluster by semantic-message family” is incomplete when the same raters score many families and the claim generalizes beyond the panel. Conversely, resampling raters alone does not represent new-message uncertainty. Very few clusters, rare categories, disconnected pairwise graphs, boundary estimates, and post-selection can produce poor or undefined coverage.

**[Inference]** More bootstrap repetitions reduce Monte Carlo noise in the resampling calculation; they do not repair a biased sample, invalid construct, wrong resampling unit, leakage, missing-not-at-random process, or model misspecification.

### Unresolved validation

**[Open question]** What is the smallest claim the first pilot needs: fixed-panel instrument debugging or population-level rater generalization? A simulation based on the frozen allocation should compare interval coverage under plausible message, rater, tie, abstention, and prevalence structures before any lower-bound acceptance rule is used.

## 8. Multilingual and cross-cultural measurement limits

### Sourced mathematical and measurement fact

**[Documented practice]** The ITC requires test adaptation to address cultural context, development, empirical confirmation, administration, score interpretation, and documentation; moving an instrument to another cultural setting can require adaptation even without translation ([ITC](https://www.intestcom.org/page/14)).

**[Sourced fact]** In a U.S. Census Bureau multilingual study, language-expert/methodologist panels, committee translation, in-language cognitive interviews, and iterative recommendations were used because linguistic conventions and communication styles could change a translated material's communicative effect ([Pan et al., 2008](https://www.census.gov/library/working-papers/2008/adrm/ssm2008-02.html)).

**[Sourced fact]** Henrich, Heine, and Norenzayan found substantial population variability across reviewed behavioral domains and warned against treating narrow Western samples as species-representative ([Henrich et al., 2010](https://pubmed.ncbi.nlm.nih.gov/20550733/)).

### Bounded proposed application to content design

**[Proposal]** Store language, script, direction, locale, market, jurisdiction, surface, adaptation method, rater-language scope, and cultural-review scope independently. Do not infer any field from nationality, geography, an embedding, or a machine translation.

**[Proposal]** For each locale branch, use original-language stimuli in the intended rendering; adapt construct cards for conceptual and pragmatic equivalence; conduct in-language cognitive interviews; recruit qualified local raters; and analyze within-locale reliability before considering common-anchor invariance tests.

**[Proposal]** Preserve source and adapted expressions as linked but distinct records. Back-translation can be an audit artifact, but it cannot substitute for direct original-language judgment of terminology, naturalness, politeness, formality, accessibility, or situational tone.

### Failure modes and limitations

**[Inference]** Language is not locale, locale is not culture, and country is not a personality. English anchor adjectives, length norms, directness rules, or politeness scales can shift construct meaning when translated or moved to a different institutional relationship.

**[Inference]** A few locales do not establish “multilingual” generality. Pooling them can overweight the best-resourced languages, hide unsupported scripts or accessibility needs, and convert unequal evidence coverage into a false global rank.

### Unresolved validation

**[Open question]** Which construct cards survive conceptual review without importing English-specific pragmatics, and which require locale-specific observables rather than a common quantitative scale? Record qualified dissent as evidence rather than resolving it by global majority vote.

## 9. Abstention and missingness

### Sourced mathematical and measurement fact

**[Sourced fact]** Rubin showed that ignoring the missing-data process is justified only under specific conditions, such as missing at random plus parameter distinctness for direct-likelihood or Bayesian inference; missingness is not automatically ignorable because a software routine accepts blank cells ([Rubin, 1976](https://doi.org/10.1093/biomet/63.3.581)).

**[Sourced fact]** Selective classification formalizes a reject option through a risk–coverage tradeoff: abstaining can reduce error among accepted predictions by reducing the fraction of cases answered. Performance therefore requires both conditional risk and coverage, not accuracy on answered cases alone ([El-Yaniv and Wiener, 2010](https://jmlr.org/papers/v11/el-yaniv10a.html)).

### Bounded proposed application to content design

**[Proposal]** Preserve four different record states:

| State | Measurement meaning | Analysis treatment |
| --- | --- | --- |
| `indistinguishable` | Submitted tie/no meaningful difference on the declared dimension | Tie outcome only if cognitive validation supports that meaning |
| `both_unacceptable` | Submitted judgment that neither candidate meets the construct's acceptable range | Distinct substantive outcome; never a tie or missing value |
| `insufficient_context` | Submitted judgment that the packet cannot support the dimension decision | Distinct rateability outcome with typed missing fields |
| Procedural abstention | No dimension outcome because of scope, conflict, accessibility, consent, technical, or other declared reason | Missing response with retained reason and denominator |

**[Proposal]** For automated evaluators, report answer coverage, selective risk/error among answered cases, abstention reason, and both measures by locale, risk, surface, and construct. For human ratings, report enrollment, assignment, attempted, submitted, insufficient-context, and procedural-abstention denominators separately.

**[Proposal]** Do not impute a preference, code abstention as neutral, or delete unavailable families to meet a minimum count. If an adjustment model is proposed, state the missingness assumptions and perform sensitivity analysis against plausible nonignorable mechanisms.

### Failure modes and limitations

**[Inference]** A system can appear highly accurate by answering only easy cases. It can also appear reliable after excluding the very locales, accessibility modes, risks, or ambiguous contexts where the construct fails. Overall coverage can hide these selective failures.

**[Inference]** Procedural reasons may be informative: `locale_or_language_unsupported`, `outside_qualified_scope`, and `inaccessible_presentation` can cluster systematically. Treating them as random missing data would erase evidence about scope and instrument design.

### Unresolved validation

**[Open question]** Which abstention taxonomy is understandable and complete in pilot use, and what downstream action should each reason trigger? The answer must be tested through rater debriefs and missingness patterns, not inferred from category names alone.

## 10. Multiple objectives and no universal scalar

### Sourced mathematical and measurement fact

**[Sourced fact]** In multiobjective optimization, a weighted sum is one scalarization that embeds a choice of relative weights. Weighted sums do not recover all parts of a nonconvex Pareto frontier, and even evenly spaced weights can produce unevenly spaced solutions on a convex frontier ([Das and Dennis, 1997](https://doi.org/10.1007/BF01197559)).

**[Sourced fact]** Vector optimization distinguishes Pareto-efficient points from a unique preferred compromise; scalarization can identify supported efficient points under stated mathematical conditions, but selecting weights remains part of the decision formulation rather than an empirical discovery that all objectives share one natural unit ([Boyd and Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/)).

### Bounded proposed application to content design

**[Proposal]** Keep factual safety, semantic obligations, accessibility requirements, privacy/security, locale support, and approval gates non-compensable. Among hard-eligible candidates, retain a vector for voice behavior, situational tone, terminology, semantic preservation, naturalness, localization, accessibility, and surface fit.

**[Proposal]** A candidate can Pareto-dominate another within a frozen comparable vector only when it is no worse on every declared objective and better on at least one. Nondominated candidates still require an accountable context-specific decision; Pareto status is not approval or universal superiority.

**[Proposal]** If a product team later chooses a scalar decision rule, require the decision owner, exact context, objective directions, transformations, weights, non-compensable floors, rationale, sensitivity analysis, and expiry/version. Preserve the raw vector and show whether the choice changes across plausible weights.

### Failure modes and limitations

**[Inference]** A weighted average of ordinal fit bands assumes cardinal distances and cross-dimension commensurability that the instrument has not established. A geometric mean, learned ranker, or embedding distance still encodes tradeoffs and cannot make hard failures compensable.

**[Inference]** A global scalar encourages metric gaming and hides who accepted which tradeoff. It is especially unsafe across locales, risks, surfaces, and domains because those scopes may have different constructs, evidence, and hard obligations—not different “industry personalities.”

### Unresolved validation

**[Open question]** Which decisions genuinely need a ranked recommendation, which need a nondominated set with explanation, and which require a qualified owner to resolve conflicting objectives? Validate decision usefulness and harms before adding any scalarizer.

# Cross-topic implications for the current instrument

## Claims the present design cannot yet make

**[Cross-source finding]** The reviewed evidence does not validate the instrument's current numerical pilot targets—three raters per pair, 10 applicable families per stratum, a 14/8 family split, or lower alpha bounds of `0.67`/`0.80`—as universal or sufficient. These can remain transparent product hypotheses, but their operating characteristics must be evaluated for this allocation, prevalence, dependence, risk, and claim ([Krippendorff, 2004](https://doi.org/10.1111/j.1468-2958.2004.tb00738.x); [Efron, 1979](https://doi.org/10.1214/aos/1176344552); [Cameron et al., 2011](https://doi.org/10.1198/jbes.2010.07136)).

**[Inference]** The first run should be an instrument-debugging and construct-calibration study, not a production evaluator certification. With seven single construct cards, a small synthetic fixture, one public seed pair, and unsupported locale branches, it cannot establish organization voice, cross-domain tone, cross-locale invariance, or representative-user outcomes.

**[Proposal]** Before collection, replace every generic “fit model” instruction with an estimand card containing:

1. construct and exact card version;
2. response variable and outcome ontology;
3. candidate/treatment unit and recurring identity;
4. target message-family and rater populations;
5. locale, language, script, surface, risk, and context scope;
6. admissible records and missingness treatment;
7. dependence and sampling units;
8. comparison-graph and identifiability conditions;
9. model, assumptions, diagnostics, interval, and held-out metric;
10. failure/abstention return state; and
11. prohibited interpretations.

## Minimum analysis stack for a first executed pilot

**[Proposal]** If readiness and ethics gates pass, the minimum analysis stack should remain ordered and non-compensatory:

1. Validate packet/version integrity, hard eligibility, rater qualification, consent, allocation, accessibility, and comparability.
2. Report denominators, category prevalence, fit-band distributions, evidence-span coverage, defects, `insufficient_context`, and procedural abstentions.
3. Compute pre-adjudication agreement with declared distance, raw confusion, information/prevalence diagnostics, and a design-valid interval.
4. Draw the pairwise graph; stop global utility fitting when entities are isolated, disconnected, or separated.
5. Fit a tie-capable model only if `indistinguishable` is cognitively distinct and model diagnostics support its mechanism.
6. Fit an ordinal/multilevel model only if category ordering, thresholds, dependence structure, and sample support it.
7. Preserve calibration and test-family separation; evaluate event-specific probabilities with proper score, calibration, discrimination, coverage, and intervals.
8. Analyze every locale separately; run invariance/DIF only after the item/construct model and anchors are identified.
9. Present hard results and the full soft vector; do not compute a universal total.
10. Preserve original disagreement and adjudication separately, then return the narrowest supported status.

## Required simulations and sensitivity analyses

**[Proposal]** Before freezing acceptance rules, simulate the actual planned design across plausible:

- decisive, tie, both-unacceptable, and insufficient-context prevalences;
- procedural abstention mechanisms, including locale- and difficulty-dependent missingness;
- rater threshold, severity, and construct-interpretation variation;
- message-family heterogeneity and treatment-by-context interaction;
- presentation-side and card-order effects;
- connected, weakly connected, disconnected, and separated comparison graphs;
- small cluster counts and rare categories;
- one-way versus crossed rater/message dependence;
- calibrated, miscalibrated, low-resolution, and high-abstention evaluators; and
- invariant, threshold-shifted, and item-DIF locale branches.

**[Open question]** Which simulation parameters can be grounded in prior pilot or analogous primary data without importing an unrelated domain? When no defensible values exist, report a broad sensitivity envelope rather than a single power number.

## Stop conditions

**[Proposal]** Do not fit or report a quantitative construct when any of these conditions holds:

- the response categories are not cognitively distinct;
- candidate/treatment identity does not recur in a connected graph for the intended rank;
- the intended message or rater population is undefined;
- hard eligibility or measurement comparability is unresolved;
- outcome prevalence makes the planned statistic undefined or uninformative;
- rater/message dependence is ignored for a population-level claim;
- ordinal thresholds or model assumptions fail materially;
- missingness is selective and no defensible analysis/sensitivity plan exists;
- locale adaptation or common anchors are unsupported;
- the test split has influenced instrument or calibration revision;
- calibration is reported without a precise event, coverage, and held-out scope; or
- an aggregate would compensate for a hard failure or conceal material conflict.

# Evidence gaps and next primary research

**[Open question]** The following gaps remain after this primary-source pass:

1. A primary-method comparison of nominal alpha, category-specific agreement, and model-based rater/item reliability under the exact five-outcome ontology.
2. A preregistered simulation study for small, crossed rater-by-message designs with ties, abstentions, and sparse ordinal bands.
3. An identified invariance/DIF design for short UX messages where scenarios, not questionnaire items, may carry most of the construct variation.
4. Evidence that content-design construct cards improve real decision quality, not only rater agreement.
5. Representative-user evidence connecting expert-rated voice/tone behavior to comprehension, trust, safe action, recovery, and harm without reducing those outcomes to style preference.
6. Longitudinal evidence about calibration drift after prompt, retrieval, model, policy, locale, or product changes.
7. Governance research on who may define local multiobjective tradeoffs and how dissent, expiry, and override are recorded.

## Bottom line

**[Proposal]** The measurement foundation should be a typed set of conditional models and explicit abstention states, not a universal voice metric. The ordinary unpenalized Bradley–Terry model is for decisive comparisons whose observed directed win graph is strongly connected; mere undirected connectivity is insufficient. Davidson is a testable tie mechanism, not a bucket for every non-win; alpha is a reproducibility diagnostic, not validity; ordinal models preserve order without inventing equal distances; invariance/DIF requires an identified cross-group construct; Brier and reliability diagrams evaluate a precisely defined probability event; intervals must reproduce the sampling and dependence design; multilingual branches require adaptation and local evidence; missingness and abstention remain visible; and multiple objectives stay vector-valued unless an accountable local decision explicitly supplies the tradeoff.
