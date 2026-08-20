---
title: Psychology claim register for cognitive ergonomics
status: working-research
started: 2026-08-17
updated: 2026-08-18
evidence_cutoff: 2026-08-17
practitioner_validation: not-validated
normative_status: non-normative
claim_count: 31
domain_count: 16
---

# Psychology claim register for cognitive ergonomics

## Status and use boundary

This register is **working research**, is **not practitioner-validated**, and is **not normative**. It is a set of bounded evidence claims and validation requirements, not a library of psychological “laws.” No record below is approved product guidance, an authorization to manipulate behavior, proof of implementation, or evidence of product quality.

The registered sources and access limits are in [cognitive-ergonomics-source-notes.md](../sources/cognitive-ergonomics-source-notes.md). User-supplied articles and popular design-law summaries were discovery inputs only and are not cited as authority.

## Record semantics

- **Canonical claim label** is one of the project labels: `sourced fact`, `research finding`, `cross-source finding`, `inference`, `proposal`, `product hypothesis`, or `open question`.
- **Source types** identify the inspected source forms for this claim. They do not imply strength, applicability, or approval.
- **Evidence class** records the inspected basis as `primary`, `primary theory/model`, `narrative review`, `critical synthesis`, `semi-systematic review`, `systematic review`, or `meta`; explicit combinations preserve mixed evidence. Primary normative or official qualifiers identify direct governing or guidance material and do not imply empirical strength.
- **Comparison/intervention** states what was compared, manipulated, synthesized, governed, or not identified; it is never silently inferred from the claim title.
- **Measured effect representation** states the observed outcome form and whether a portable numeric effect is available. A direction, association, rule, or conformance condition is not silently converted into an effect size.
- **Evidence record IDs and exact source IDs** bind the claim to a versioned evidence record and its source lineage. Search records document a bounded search, including a negative result; they are not positive evidence for the claim.
- **Evidence dimensions** are the five orthogonal canonical fields `observation_strength`, `challenge`, `freshness`, `lineage`, and `epistemic_qualifier`. Their values describe the current evidence record and never advance a decision.
- **Replication/corroboration** distinguishes independent corroboration from a review that reuses an original study. Repetition in articles is never counted as replication.
- **Semantic decision ID/version/state** records only the versioned meaning decision. **Semantic approval record IDs/scope/status** is separate and explicitly records whether an authorized approval exists. Neither field encodes evidence strength, freshness, applicability, implementation, delivery, release, conformance, or evaluation.
- No average effect is treated as a universal rule. Association is not converted to causation.

## Domain coverage

| Exact domain | Claim IDs |
| --- | --- |
| Attention and perception | CER-C001, CER-C002, CER-C026 |
| Memory and cognitive load | CER-C003, CER-C004, CER-C024, CER-C025 |
| Recognition versus recall | CER-C005, CER-C031 |
| Mental models and sensemaking | CER-C006 |
| Information scent and wayfinding | CER-C007 |
| Choice and decision architecture | CER-C008 |
| Motivation, progress, and feedback | CER-C009, CER-C010 |
| Emotion, stress, uncertainty, and trust | CER-C011, CER-C012, CER-C013, CER-C014 |
| Social influence, social proof, and authority | CER-C015 |
| Persuasion and elaboration | CER-C016, CER-C027 |
| Defaults, reversibility, and user control | CER-C017, CER-C018 |
| Habit formation and behavioral triggers | CER-C019 |
| Research-response and observation biases | CER-C020 |
| Cognitive accessibility | CER-C021, CER-C022, CER-C031 |
| Cultural, linguistic, and localization boundaries | CER-C023, CER-C030 |
| Deceptive and manipulative design | CER-C028, CER-C029 |

## Required-phenomenon coverage

| Required phenomenon | Tested in | Disposition |
| --- | --- | --- |
| Choice overload and “fewer choices” | CER-C008 | conditional; universal fewer-is-better rule rejected |
| Short-term-memory number limits | CER-C003 | bounded constructs; direct UI-count rule rejected |
| F- and Z-shaped reading patterns | CER-C002 | F is task/layout-bound; universal F/Z rule unsupported |
| Goal-gradient effect | CER-C009 | conditional product hypothesis |
| Peak-end effect | CER-C011 | bounded retrospective-evaluation finding |
| Aesthetic-usability effect | CER-C012 | perception bias can diverge from performance |
| Speech versus reading | CER-C024 | no universal modality winner |
| Neural synchrony or brain coupling | CER-C027 | association only; product prescription blocked |
| Hawthorne or observer effects | CER-C020 | heterogeneous research-participation effects |
| Color | CER-C021 | context-dependent; never sole semantic cue |
| Shape | CER-C023 | reliable aggregate effects with cultural and task exceptions |
| Dual coding | CER-C025 | meaningful, integrated multimodality is conditional; slogan rejected |
| “Visuals are processed 60,000 times faster” | CER-C026 | unsupported; abstain |
| Social proof | CER-C015 | conditional and can backfire |
| Scarcity | CER-C028 | bounded value effect; separate non-normative internal prohibition proposed |
| Habit-loop claims | CER-C019 | simple loop and fixed-day rules rejected |

## Claim records

### CER-C001 — Inattentional blindness is task-dependent

| Field | Value |
| --- | --- |
| Stable ID | CER-C001 |
| Canonical claim label | research finding |
| Claim | People focused on a demanding monitoring task may fail to notice a visible, unexpected event; detection depends on the task and the unexpected object's relation to the attended set. |
| Construct | selective attention; inattentional blindness |
| Domain | Attention and perception |
| Original source IDs | CE-S001 |
| Source types | original research |
| Comparison/intervention | Monitoring-task conditions varied unexpected-object similarity and attentional demand; detection and nondetection were compared. |
| Measured effect representation | Binary notice outcome and condition-dependent detection differences; no portable product effect size is recorded. |
| Evidence record IDs and exact source IDs | CER-EV-C001-v1; sources: CE-S001 |
| Evidence dimensions | observation_strength=observed; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary |
| Population or sample | Adult laboratory observers in dynamic-scene experiments |
| Task or environment | Monitor and count events in a video while an unexpected object crosses the scene |
| Outcome | Detection or nondetection of the unexpected event |
| Replication or corroboration | No independent exact replication was evaluated in this source packet; CE-S001 contains multiple conditions, not independent replications |
| Contradictory or null findings | Some participants noticed the event; detection changed with similarity and task difficulty, so blindness was not inevitable |
| Moderators or boundaries | Attentional set, target similarity, monitoring difficulty, expectation, and task |
| Cultural or localization limits | Cross-locale and language effects were not established; the visual task contained little linguistic content |
| Accessibility implications | Critical content can be missed when attention is occupied; disabled users may face different competing demands, but this study did not sample those groups |
| Harms | Treating presence on screen as proof of notice can conceal missed warnings, fees, errors, or state changes |
| Safe content-design application | Use as a hypothesis to make critical state changes salient, timely, redundant, and testable in the task context |
| Prohibited or high-risk application | Do not hide material information in low-attention regions or claim that one visual treatment guarantees notice |
| Product-specific validation | Test the exact state transition with representative users under realistic distraction; measure notice, comprehension, action, and delayed recall |
| Evidence freshness | Foundational 1999 evidence; source and limits rechecked 2026-08-17; current product replication required |
| Semantic decision ID/version/state | CER-DEC-C001 / v0.1 / proposed; bounded research finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C002 — F- and Z-shaped reading patterns are not universal laws

| Field | Value |
| --- | --- |
| Stable ID | CER-C002 |
| Canonical claim label | cross-source finding |
| Claim | An F-like scan path has been observed in particular text-heavy web tasks, while scan paths vary with page design and task; support for a universal F or Z reading rule was not identified in this packet. |
| Construct | visual scanning; reading order; eye movement |
| Domain | Attention and perception |
| Original source IDs | CE-S002, CE-S003 |
| Source types | original research |
| Comparison/intervention | Desktop-web gaze was observed across task and layout conditions; a primary Z-pattern comparison was not identified in this packet. |
| Measured effect representation | Fixation and scan-path distributions varied by task and layout; no universal F/Z effect estimate is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C002-v1; CER-SEARCH-Z-001; sources: CE-S002, CE-S003 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary |
| Population or sample | Participants in two dated desktop-web eye-tracking studies; CE-S003 had 30 participants viewing 22 pages |
| Task or environment | Browse or search text- and image-based pages; view varied websites under controlled conditions |
| Outcome | Fixations, gaze distribution, and scan-path variation |
| Replication or corroboration | CE-S002 and CE-S003 both show task or layout dependence but do not constitute an exact replication of one named pattern |
| Contradictory or null findings | CE-S002 found individual and more random image-search paths; CE-S003 found design complexity affected scan-path variation; a primary Z-pattern study was not identified in this packet |
| Moderators or boundaries | Layout, information type, task, page complexity, device, viewport, familiarity, and likely reading direction |
| Cultural or localization limits | Left-to-right desktop pages dominate the evidence; right-to-left, vertical-script, multilingual, and bidirectional layouts are unresolved |
| Accessibility implications | Magnification, reflow, screen readers, keyboard navigation, cognitive disability, and low vision can produce different access sequences |
| Harms | A named pattern can justify placing essential content where actual users do not find it or can erase non-Latin reading behavior |
| Safe content-design application | Treat scan-pattern language as a testable layout hypothesis, not a placement rule; preserve logical and programmatic order |
| Prohibited or high-risk application | Do not certify discoverability, accessibility, or reading order from an F or Z overlay |
| Product-specific validation | Test the exact responsive layout, task, content type, language direction, and assistive technologies; prioritize task success over pattern resemblance |
| Evidence freshness | 2004 and 2007 evidence; rechecked 2026-08-17; current-device and multilingual evidence is a stated gap |
| Semantic decision ID/version/state | CER-DEC-C002 / v0.1 / proposed; the Z-pattern evidence question remains open and the universal F/Z rule is an abstention |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C003 — Memory numbers do not set interface item counts

| Field | Value |
| --- | --- |
| Stable ID | CER-C003 |
| Canonical claim label | cross-source finding |
| Claim | Miller's seven-plus-or-minus-two and Cowan's approximately four chunks describe differently controlled memory and information-processing phenomena; neither validates a maximum number of menu items, options, fields, steps, or words. |
| Construct | short-term memory; working-memory capacity; chunking |
| Domain | Memory and cognitive load |
| Original source IDs | CE-S004, CE-S005 |
| Source types | original research |
| Comparison/intervention | Capacity estimates were derived across absolute-judgment, span, recoding, and controlled-memory conditions rather than interface item-count interventions. |
| Measured effect representation | Differing information and chunk-capacity estimates; no UI count threshold or portable product effect is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C003-v1; sources: CE-S004, CE-S005 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary theory/model and narrative review |
| Population or sample | Multiple laboratory literatures synthesized across the two sources |
| Task or environment | Absolute judgment, immediate span, recoding, and controlled capacity-estimation tasks |
| Outcome | Information transmission, span, or estimated chunk capacity |
| Replication or corroboration | Cowan reanalyzes a related literature under different controls; it is corroboration of limited capacity, not replication of a fixed number |
| Contradictory or null findings | The central estimates differ because task, chunk definition, rehearsal, and grouping differ; apparent capacity changes with recoding |
| Moderators or boundaries | Meaningful chunks, expertise, rehearsal, interference, modality, presentation, task, and measurement |
| Cultural or localization limits | Language, numeracy, script, familiarity, and learned grouping can change what constitutes a chunk; the reviewed evidence cannot set locale-neutral counts |
| Accessibility implications | Memory limits vary and can be lower or differently expressed for some cognitive disabilities, stress states, ages, or tasks; fixed averages exclude people |
| Harms | Mechanical item caps can delete necessary options, create deeper navigation, or falsely certify a cognitively demanding task |
| Safe content-design application | Reduce avoidable recall, group by user meaning, keep context available, and test the complete task rather than enforcing a magic count |
| Prohibited or high-risk application | Do not lint “more than 7” or “more than 4” as a usability failure without task evidence |
| Product-specific validation | Measure comprehension, comparison, errors, time, abandonment, backtracking, and assistance across option structures and representative access needs |
| Evidence freshness | Foundational 1956 and 2001 sources; rechecked 2026-08-17; modern product-task evidence required |
| Semantic decision ID/version/state | CER-DEC-C003 / v0.1 / proposed; bounded cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C004 — Extraneous cognitive demand can impair learning, but “less” is not always better

| Field | Value |
| --- | --- |
| Stable ID | CER-C004 |
| Canonical claim label | cross-source finding |
| Claim | Problem-solving demands and interesting but irrelevant details can consume attention or disrupt learning in studied educational tasks; necessary explanation and task support must not be removed in the name of simplicity. |
| Construct | cognitive load; coherence; seductive details |
| Domain | Memory and cognitive load |
| Original source IDs | CE-S006, CE-S038 |
| Source types | original research |
| Comparison/intervention | Problem-solving or instructional material with different levels or kinds of extraneous and irrelevant detail was compared. |
| Measured effect representation | Learning, retention, and transfer differences across conditions; no universal less-content effect is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C004-v1; sources: CE-S006, CE-S038 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary and meta |
| Population or sample | Learners in problem-solving experiments and 39 experimental seductive-detail effects |
| Task or environment | Solve problems or learn instructional material with relevant versus irrelevant additions |
| Outcome | Learning, retention, and transfer |
| Replication or corroboration | CE-S038 synthesizes multiple experiments; it is not a replication of CE-S006 and tests a related but distinct construct |
| Contradictory or null findings | CE-S038 reports mixed explanatory mechanisms and moderators; the evidence does not show all detail is harmful |
| Moderators or boundaries | Prior knowledge, task complexity, pacing, relevance, coherence, medium, and learning objective |
| Cultural or localization limits | Educational language and background knowledge affect relevance and comprehension; cross-cultural transfer is not established |
| Accessibility implications | Removing context can hurt users who need explicit explanation; clutter and distraction can also create barriers, so user-specific testing is necessary |
| Harms | “Reduce cognitive load” can become a rationale for hiding fees, consequences, eligibility, safety information, or recovery guidance |
| Safe content-design application | Remove demonstrably irrelevant decoration, stage complex material, and retain all information needed for informed and successful action |
| Prohibited or high-risk application | Do not shorten controlled facts or omit consequences solely to reduce word count or screen density |
| Product-specific validation | Compare complete variants for comprehension, error, transfer to the next step, and information recall; separately verify completeness with domain owners |
| Evidence freshness | 1988 foundational and 2012 meta-analytic evidence; checked 2026-08-17; product and population validation required |
| Semantic decision ID/version/state | CER-DEC-C004 / v0.1 / proposed; bounded cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C005 — Recognition support is useful only when cues are recognizable

| Field | Value |
| --- | --- |
| Stable ID | CER-C005 |
| Canonical claim label | inference |
| Claim | Visible, meaningful cues may reduce free-recall demands, but high laboratory recognition for studied stimuli does not prove that an icon, label, or option will be familiar, discriminable, or usable in a product. |
| Construct | recognition memory; recall burden; cue familiarity |
| Domain | Recognition versus recall |
| Original source IDs | CE-S007, CE-S025, CE-S048 |
| Source types | original research; normative standard; official guidance |
| Comparison/intervention | Laboratory recognition of studied material is considered alongside scoped accessibility requirements and guidance; no direct product recognition-versus-recall intervention was evaluated. |
| Measured effect representation | Recognition accuracy plus normative or guidance conditions; no combined effect size or product benefit estimate is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C005-v1; sources: CE-S007, CE-S025, CE-S048 |
| Evidence dimensions | observation_strength=corroborated; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=inferred |
| Evidence class | primary and primary official guidance |
| Population or sample | Adult laboratory recognition participants; standards and cognitive-access guidance have no experimental sample |
| Task or environment | Recognize previously studied words, sentences, and pictures; authenticate and navigate web content |
| Outcome | Recognition accuracy and accessibility requirements or guidance |
| Replication or corroboration | Accessibility sources support reducing memory-dependent barriers in defined contexts but do not replicate Shepard's laboratory findings |
| Contradictory or null findings | No direct product comparison of recognition and recall was included; unfamiliar icons can still require recall or interpretation |
| Moderators or boundaries | Prior exposure, label clarity, cue distinctiveness, semantic fit, number of alternatives, language, disability, and context |
| Cultural or localization limits | Symbols and labels may not carry the same meaning across languages, scripts, literacy levels, or cultures |
| Accessibility implications | Persistent labels, examples, visible prior entries, and alternatives to memory tests can reduce barriers; screen-reader names must carry equivalent purpose |
| Harms | Icon-only “recognition” can create ambiguity; security teams may misapply memory reduction without threat modeling |
| Safe content-design application | Pair controls with clear labels, keep needed context visible, and offer accessible alternatives in authentication and multistep tasks |
| Prohibited or high-risk application | Do not assert “recognition beats recall” as proof that a chosen symbol is self-explanatory or secure |
| Product-specific validation | Test first-time and returning users for identification, selection error, assistance, confidence, and accessible-name comprehension |
| Evidence freshness | 1967 foundational research plus current WCAG 2.2 and 2021 COGA guidance; checked 2026-08-17 |
| Semantic decision ID/version/state | CER-DEC-C005 / v0.1 / proposed; product-transfer meaning remains an inference |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; applicability, conformance, practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C006 — Expert and novice mental models can organize the same material differently

| Field | Value |
| --- | --- |
| Stable ID | CER-C006 |
| Canonical claim label | research finding |
| Claim | In the studied physics tasks, experts represented problems through underlying principles while novices relied more on literal surface features. |
| Construct | expertise; problem representation; mental models; sensemaking |
| Domain | Mental models and sensemaking |
| Original source IDs | CE-S008 |
| Source types | original research |
| Comparison/intervention | Expert and novice participants categorized and represented the same physics problems. |
| Measured effect representation | Group differences in category and explanation patterns; no universal individual classifier is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C006-v1; sources: CE-S008 |
| Evidence dimensions | observation_strength=observed; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary |
| Population or sample | Physics experts and novices across four experiments |
| Task or environment | Categorize and represent physics problems |
| Outcome | Categories, explanations, and knowledge used in representation |
| Replication or corroboration | No independent product-domain replication was evaluated in this packet |
| Contradictory or null findings | The source reports group tendencies, not a binary rule; individuals and tasks can overlap |
| Moderators or boundaries | Domain expertise, training, problem type, purpose, and available cues |
| Cultural or localization limits | Physics education and terminology are culturally and institutionally situated; other domains require their own evidence |
| Accessibility implications | Novice-oriented literal cues can aid orientation, while overspecialized taxonomy can exclude users with cognitive or language barriers |
| Harms | Designing only for internal experts can expose system structure rather than user goals; assuming all novices think alike can also misclassify users |
| Safe content-design application | Elicit user categories, preserve expert terminology where required, and bridge surface language to underlying concepts |
| Prohibited or high-risk application | Do not infer a user's competence or simplify consequential content solely from novice or expert labels |
| Product-specific validation | Card-sort and task-test the actual concepts with new, occasional, expert, and support users; record divergent models rather than averaging them away |
| Evidence freshness | Foundational 1981 domain study; rechecked 2026-08-17; direct domain research required |
| Semantic decision ID/version/state | CER-DEC-C006 / v0.1 / proposed; bounded research finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C007 — Information scent is a model, not proof that a label works

| Field | Value |
| --- | --- |
| Stable ID | CER-C007 |
| Canonical claim label | inference |
| Claim | Cues can influence a seeker's estimate of whether a path will yield useful information, but a label's “scent” must be demonstrated for the target goal and audience. |
| Construct | information scent; information foraging; wayfinding |
| Domain | Information scent and wayfinding |
| Original source IDs | CE-S009 |
| Source types | original research |
| Comparison/intervention | Information-seeking and patch-choice observations informed a model; no specific product-label intervention was evaluated. |
| Measured effect representation | Model predictions and observed navigation or information-gain behavior; no label-level effect size is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C007-v1; sources: CE-S009 |
| Evidence dimensions | observation_strength=observed; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=inferred |
| Evidence class | primary theory/model |
| Population or sample | Empirical information-seeking work synthesized into formal and process models |
| Task or environment | Search, patch choice, filtering, and enrichment in information environments |
| Outcome | Predicted navigation and information-gain behavior |
| Replication or corroboration | No independent modern product replication was evaluated in this packet |
| Contradictory or null findings | The model does not certify any specific wording; users may choose a poor cue or abandon despite apparent scent |
| Moderators or boundaries | User goal, domain knowledge, competing links, cost of movement, vocabulary, information value, and environment structure |
| Cultural or localization limits | Terms, metaphors, and category boundaries vary by locale and professional culture |
| Accessibility implications | Clear link purpose, headings, landmarks, and multiple ways to locate content support diverse navigation strategies |
| Harms | Optimizing clickthrough as “scent” can reward curiosity gaps, misleading promises, or dead-end paths |
| Safe content-design application | Make destination, object, and expected result explicit, then test route choice and recovery |
| Prohibited or high-risk application | Do not use information-foraging language to justify deceptive labels or withhold material destination facts |
| Product-specific validation | Run first-click and end-to-end findability tests on versioned navigation; measure correct path, recovery, comprehension, and false-positive clicks |
| Evidence freshness | Foundational 1999 model; checked 2026-08-17; current environment evidence required |
| Semantic decision ID/version/state | CER-DEC-C007 / v0.1 / proposed; product-label use remains an inference |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C008 — Choice overload is conditional; fewer choices are not inherently better

| Field | Value |
| --- | --- |
| Stable ID | CER-C008 |
| Canonical claim label | cross-source finding |
| Claim | Larger assortments produced adverse outcomes in some studies, but a meta-analysis found a near-zero mean with substantial variance, and later synthesis identified task and preference moderators; there is no universal optimal number or fewer-is-better rule. |
| Construct | choice overload; assortment size; decision difficulty |
| Domain | Choice and decision architecture |
| Original source IDs | CE-S010, CE-S011, CE-S012 |
| Source types | original research |
| Comparison/intervention | Smaller and larger assortments were compared across product, topic, and other choice tasks, then synthesized across studies. |
| Measured effect representation | Choice, purchase, satisfaction, regret, and motivation effects with a near-zero mean and substantial heterogeneity in one synthesis; no universal optimum is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C008-v1; sources: CE-S010, CE-S011, CE-S012 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary and meta |
| Population or sample | Consumers and students in the original experiments; 50 experiments with N = 5,036 and 99 observations with N = 7,202 in syntheses |
| Task or environment | Choose products, essay topics, or other options from smaller and larger sets |
| Outcome | Choice, purchase, satisfaction, regret, and motivation |
| Replication or corroboration | CE-S011 and CE-S012 synthesize overlapping prior literature; they are not two independent replications of CE-S010 |
| Contradictory or null findings | CE-S010 reported positive overload effects; CE-S011 found a virtually zero mean; CE-S012 found effects moderated by complexity, task difficulty, preference uncertainty, and decision goal |
| Moderators or boundaries | Option comparability, complexity, expertise, preference certainty, stakes, filtering, decision goal, and outcome definition |
| Cultural or localization limits | Consumer norms, access to alternatives, regulatory requirements, collectivism, income, and market maturity may change the decision |
| Accessibility implications | Too many poorly differentiated choices can burden some users, but removing needed alternatives can exclude access needs or preferences |
| Harms | Arbitrary reduction can steer users, hide alternatives, or convert an accessibility issue into constrained choice |
| Safe content-design application | Improve differentiation, grouping, defaults only when appropriate, comparison support, and progressive disclosure while preserving material alternatives |
| Prohibited or high-risk application | Do not remove or bury options solely because “fewer choices convert better” or cite the jam study as universal proof |
| Product-specific validation | Compare structures using informed choice, comprehension, decision confidence, time, reversal, regret, and subgroup outcomes, not conversion alone |
| Evidence freshness | 2000 primary and 2010–2015 meta-analytic evidence; checked 2026-08-17; living-search update required before policy use |
| Semantic decision ID/version/state | CER-DEC-C008 / v0.1 / proposed; conditional cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C009 — Goal-gradient effects are bounded to salient progress toward a valued goal

| Field | Value |
| --- | --- |
| Stable ID | CER-C009 |
| Canonical claim label | product hypothesis |
| Claim | In studied reward programs, effort increased as people approached a salient reward and endowed progress affected completion; a product progress indicator may help only when progress is truthful, meaningful, and tied to a user-valued goal. |
| Construct | goal-gradient; progress; endowed progress; motivation |
| Domain | Motivation, progress, and feedback |
| Original source IDs | CE-S013 |
| Source types | original research |
| Comparison/intervention | Progress distance and endowed-progress conditions were varied in reward-linked field and experimental tasks. |
| Measured effect representation | Effort rate, persistence, completion, retention, and re-engagement differences; product transfer is not measured. |
| Evidence record IDs and exact source IDs | CER-EV-C009-v1; sources: CE-S013 |
| Evidence dimensions | observation_strength=observed; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=inferred |
| Evidence class | primary |
| Population or sample | Cafe customers, online song raters, and experimental participants |
| Task or environment | Loyalty purchases, reward-linked rating, and paper-and-pencil goal tasks |
| Outcome | Effort rate, persistence, completion, retention, and re-engagement |
| Replication or corroboration | Multiple methods appear within one research program; independent replication was not evaluated here |
| Contradictory or null findings | The source does not show effects for nonreward, involuntary, uncertain, or very long tasks; not every participant necessarily accelerated |
| Moderators or boundaries | Goal value, perceived attainability, truthful distance, reward structure, prior investment, stakes, and autonomy |
| Cultural or localization limits | Reward meanings, time orientation, loyalty norms, and numeracy may differ across locales |
| Accessibility implications | Progress needs text-equivalent status, understandable units, and tolerance for interruption; false precision can increase anxiety |
| Harms | Artificial completion pressure, sunk-cost exploitation, and misleading progress can impair free choice |
| Safe content-design application | Show accurate completed and remaining work for a user-chosen goal and preserve pause, exit, and correction |
| Prohibited or high-risk application | Do not fabricate progress, conceal new steps, or use near-completion pressure for consent, spending, or disclosure |
| Product-specific validation | Test accurate progress against no indicator; measure comprehension, completion, stress, abandonment, error, and perceived control |
| Evidence freshness | 2006 primary evidence; rechecked 2026-08-17; modern product and ethics validation required |
| Semantic decision ID/version/state | CER-DEC-C009 / v0.1 / proposed; any product progress benefit remains a product hypothesis |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C010 — Feedback can improve or reduce performance

| Field | Value |
| --- | --- |
| Stable ID | CER-C010 |
| Canonical claim label | research finding |
| Claim | Feedback interventions improved performance on average in a large synthesis, yet more than one-third reduced performance; “feedback motivates” is not a safe universal rule. |
| Construct | feedback intervention; attention; performance regulation |
| Domain | Motivation, progress, and feedback |
| Original source IDs | CE-S014 |
| Source types | original research |
| Comparison/intervention | Feedback interventions were compared with relevant control or baseline performance conditions across synthesized studies. |
| Measured effect representation | 607 performance effect sizes across 131 studies, including a positive average and more than one-third negative effects; no universal direction is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C010-v1; sources: CE-S014 |
| Evidence dimensions | observation_strength=observed; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | meta |
| Population or sample | 131 studies, 607 effect sizes, and 23,663 observations |
| Task or environment | Varied task-performance feedback interventions |
| Outcome | Performance change |
| Replication or corroboration | Meta-analysis synthesizes multiple studies; it is not evidence that each feedback design replicated across contexts |
| Contradictory or null findings | More than one-third of interventions decreased performance despite a positive average effect |
| Moderators or boundaries | Locus of attention, task learning, motivation, self-focus, task complexity, timing, specificity, and actionability |
| Cultural or localization limits | Authority relationships, face, directness, and feedback norms can alter interpretation |
| Accessibility implications | Feedback must be perceivable, specific, nonpunitive, and persistent enough to act on; excessive or vague alerts can overload users |
| Harms | Public, comparative, shaming, or unresolvable feedback can impair performance and dignity |
| Safe content-design application | State what happened, its effect, and the available next action; test whether users can recover |
| Prohibited or high-risk application | Do not assume more, faster, redder, or more negative feedback improves behavior; do not optimize shame |
| Product-specific validation | Measure corrected performance, repeat error, comprehension, stress, help-seeking, and subgroup effects for the exact feedback timing and channel |
| Evidence freshness | 1996 meta-analysis; rechecked 2026-08-17; living review and product evidence required |
| Semantic decision ID/version/state | CER-DEC-C010 / v0.1 / proposed; heterogeneous research finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C011 — Peak-and-end weighting is not a universal journey rule

| Field | Value |
| --- | --- |
| Stable ID | CER-C011 |
| Canonical claim label | research finding |
| Claim | In a cold-water experiment, retrospective choice was strongly influenced by the worst and final moments and relatively insensitive to added duration; this does not establish a universal product-experience formula. |
| Construct | peak-end effect; duration neglect; remembered utility |
| Domain | Emotion, stress, uncertainty, and trust |
| Original source IDs | CE-S015 |
| Source types | original research |
| Comparison/intervention | Participants experienced and chose between a shorter painful episode and a longer episode with a less-painful ending. |
| Measured effect representation | Retrospective evaluation and repeat-choice proportions; no product-journey effect size is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C011-v1; sources: CE-S015 |
| Evidence dimensions | observation_strength=observed; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary |
| Population or sample | Adult laboratory participants; exact N is not used from the reviewed record |
| Task or environment | Compare a 60-second painful cold-water trial with a 90-second trial whose final 30 seconds were less painful |
| Outcome | Retrospective evaluation and choice of trial to repeat |
| Replication or corroboration | No independent product-journey replication was evaluated in this packet |
| Contradictory or null findings | A minority did not choose the longer trial; the study does not measure ongoing experience, comprehension, trust, or later real-world behavior |
| Moderators or boundaries | Aversiveness, episode boundaries, memory delay, duration, expectation, outcome measure, and salience |
| Cultural or localization limits | Pain reporting, choice, and retrospective evaluation can vary culturally; no locale transfer was established |
| Accessibility implications | Users experiencing pain, fatigue, trauma, anxiety, or cognitive disability may weight episodes differently; avoid designing to an average memory shortcut |
| Harms | “Engineer the ending” can excuse a harmful journey or add discomfort because the last moment tests well |
| Safe content-design application | Treat the end state as one part of an end-to-end evaluation and clearly confirm outcome, next steps, recovery, and support |
| Prohibited or high-risk application | Do not intentionally worsen or prolong an experience, conceal cumulative burden, or claim a pleasant ending neutralizes prior harm |
| Product-specific validation | Measure momentary experience, total burden, task success, delayed recall, trust, and return behavior across the full journey |
| Evidence freshness | Foundational 1993 study; rechecked 2026-08-17; independent journey-specific evidence required |
| Semantic decision ID/version/state | CER-DEC-C011 / v0.1 / proposed; bounded research finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C012 — Aesthetic appeal can bias perceived usability without improving performance

| Field | Value |
| --- | --- |
| Stable ID | CER-C012 |
| Canonical claim label | cross-source finding |
| Claim | Visual appeal can raise perceived usability, while objective performance may not improve and can worsen; aesthetics and usability must be measured separately. |
| Construct | aesthetic-usability effect; halo effect; perceived versus objective usability |
| Domain | Emotion, stress, uncertainty, and trust |
| Original source IDs | CE-S016, CE-S017 |
| Source types | original research |
| Comparison/intervention | Interfaces or devices differing in visual appeal were rated before or after use and compared on perceived usability and task performance. |
| Measured effect representation | Perceived aesthetics and usability changed separately from completion time; directionally improved ratings did not establish improved performance. |
| Evidence record IDs and exact source IDs | CER-EV-C012-v1; sources: CE-S016, CE-S017 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary |
| Population or sample | Adults using an ATM surrogate and 60 participants completing mobile-phone tasks |
| Task or environment | Pre- and post-use ratings and representative device tasks under manipulated aesthetics |
| Outcome | Perceived aesthetics, perceived usability, and task-completion time |
| Replication or corroboration | CE-S017 independently corroborates a perception effect while adding a performance tradeoff; devices and tasks differ |
| Contradictory or null findings | CE-S017 found longer completion despite better perceived usability; beauty and performance were not equivalent |
| Moderators or boundaries | Exposure time, actual usability, prior use event, device, visual style, task, and user preference |
| Cultural or localization limits | Aesthetic conventions and trust signals vary across cultures and subcultures; the samples do not establish universality |
| Accessibility implications | A polished surface can mask contrast, hierarchy, motion, or comprehension barriers; subjective ratings must include disabled users and task evidence |
| Harms | Teams may mistake positive impressions for successful, safe, or accessible task completion |
| Safe content-design application | Evaluate visual clarity and emotional fit alongside task time, error, comprehension, and accessibility |
| Prohibited or high-risk application | Do not use aesthetic ratings as a substitute for usability, informed choice, accessibility, or factual accuracy |
| Product-specific validation | Run blinded or balanced usability comparisons with objective outcomes, perceived ease, trust calibration, and access-needs subgroups |
| Evidence freshness | 2000 and 2011 primary evidence; rechecked 2026-08-17; current-interface evidence required |
| Semantic decision ID/version/state | CER-DEC-C012 / v0.1 / proposed; bounded cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C013 — Acute stress can affect executive function, but effects are heterogeneous

| Field | Value |
| --- | --- |
| Stable ID | CER-C013 |
| Canonical claim label | research finding |
| Claim | Acute stress can affect working memory, inhibition, and cognitive flexibility, but effects differ by executive function, stress timing, and physiological response; one universal “stressed user” rule is unsupported. |
| Construct | acute stress; executive function; cognitive control |
| Domain | Emotion, stress, uncertainty, and trust |
| Original source IDs | CE-S018 |
| Source types | original research |
| Comparison/intervention | Acute-stress induction conditions were compared with control conditions across working-memory, inhibition, and flexibility tasks. |
| Measured effect representation | Function-specific performance effects and cortisol associations with heterogeneity; no individual stress-state classifier is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C013-v1; sources: CE-S018 |
| Evidence dimensions | observation_strength=observed; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | meta |
| Population or sample | Studies of laboratory acute stress and executive-function performance |
| Task or environment | Acute-stress induction followed by working-memory, inhibition, or flexibility tasks |
| Outcome | Executive-function performance and cortisol associations |
| Replication or corroboration | Meta-analysis synthesizes multiple studies with inconsistency; no product-crisis replication was evaluated |
| Contradictory or null findings | The underlying literature included inconsistent and function-specific effects rather than uniform impairment |
| Moderators or boundaries | Stressor type, timing, cortisol, sex and gender variables, task, baseline state, chronicity, and individual differences |
| Cultural or localization limits | Stress appraisal and expression vary culturally; laboratory samples and stressors may not represent local real-world threat |
| Accessibility implications | Users with anxiety, trauma, cognitive disability, pain, or fatigue may need more time, explicit steps, stable context, and human support |
| Harms | Profiling a user as irrational under stress can reduce agency; oversimplification can omit essential explanation or impose paternalism |
| Safe content-design application | In credible high-stress states, make consequences, next steps, time limits, and recovery explicit and keep information available |
| Prohibited or high-risk application | Do not exploit urgency, narrow choices without authority, or infer an individual's capacity from a situational label |
| Product-specific validation | Test realistic scenarios ethically with representative participants; measure comprehension, error, time pressure, stress, and recovery |
| Evidence freshness | 2016 meta-analysis; checked 2026-08-17; current synthesis and domain-specific evidence required |
| Semantic decision ID/version/state | CER-DEC-C013 / v0.1 / proposed; heterogeneous research finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C014 — Appropriate reliance, not maximum trust, is the design target for automation

| Field | Value |
| --- | --- |
| Stable ID | CER-C014 |
| Canonical claim label | inference |
| Claim | Automation interfaces should support reliance calibrated to actual capability and context; maximizing trust can create misuse, while insufficient trust can create disuse. |
| Construct | trust in automation; reliance calibration; uncertainty |
| Domain | Emotion, stress, uncertainty, and trust |
| Original source IDs | CE-S019 |
| Source types | original research |
| Comparison/intervention | Reliance patterns across automation settings and performance conditions were synthesized; no current generative-AI copy intervention was evaluated. |
| Measured effect representation | Trust, reliance, misuse, and disuse relationships represented conceptually and across studies; no portable effect size is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C014-v1; sources: CE-S019 |
| Evidence dimensions | observation_strength=observed; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=inferred |
| Evidence class | narrative review and primary theory/model |
| Population or sample | Literature across aviation, transport, process control, and other automation settings |
| Task or environment | Decide whether and how much to rely on automation under variable performance and context |
| Outcome | Trust, reliance, misuse, and disuse |
| Replication or corroboration | Review integrates multiple domains but predates generative AI; no current product-specific corroboration is included |
| Contradictory or null findings | High trust is not always beneficial and low trust is not always harmful; appropriateness depends on actual performance and task |
| Moderators or boundaries | Reliability, predictability, transparency, task risk, user expertise, time pressure, reversibility, and alternatives |
| Cultural or localization limits | Institutional trust, authority expectations, and automation experience differ across communities and jurisdictions |
| Accessibility implications | Explanations, uncertainty, controls, and alternatives must be understandable and accessible; cognitive burden can itself distort reliance |
| Harms | Anthropomorphic or overconfident copy can produce overreliance; alarmist copy can cause needless rejection of useful support |
| Safe content-design application | State capability, limits, uncertainty, provenance, and user control in proportion to task risk; measure calibrated reliance |
| Prohibited or high-risk application | Do not optimize “trust” or acceptance without measuring correctness, override, verification, and harm |
| Product-specific validation | Compare confidence and reliance with actual system accuracy; measure appropriate acceptance, appropriate rejection, verification, override, and recovery |
| Evidence freshness | Foundational 2004 review; rechecked 2026-08-17; current AI and domain evidence required |
| Semantic decision ID/version/state | CER-DEC-C014 / v0.1 / proposed; product-design transfer remains an inference |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C015 — Social proof and credible-source effects are conditional

| Field | Value |
| --- | --- |
| Stable ID | CER-C015 |
| Canonical claim label | cross-source finding |
| Claim | Descriptive-norm messages changed behavior in two field settings, but direction depended on the reference group and baseline behavior; a separate systematic review found only a small overall behavioral effect of credible sources with substantial context and delivery boundaries. Neither social proof nor authority cues supply a universal outcome or permission to pressure a decision. |
| Construct | descriptive norms; social proof; injunctive norms; source credibility; authority cues |
| Domain | Social influence, social proof, and authority |
| Original source IDs | CE-S020, CE-S021, CE-S049 |
| Source types | original research |
| Comparison/intervention | Descriptive-norm messages and credible-source interventions were compared with alternative reference groups, controls, or less-credible sources in distinct study families. |
| Measured effect representation | Field behavior differences plus a small pooled credible-source behavioral effect with context and delivery heterogeneity; the two constructs are not combined into one effect. |
| Evidence record IDs and exact source IDs | CER-EV-C015-v1; sources: CE-S020, CE-S021, CE-S049 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | two primary field studies plus one systematic review and meta-analysis |
| Population or sample | Hotel guests, households in an energy field experiment, and 40 credible-source comparisons from 34 papers with N = 7,995; the meta-analytic sample was mostly young, White, and student-heavy |
| Task or environment | Towel reuse, household energy use after norm messages, and randomized credible-source interventions measuring observable behavior across mostly education and health contexts |
| Outcome | Towel reuse, subsequent energy consumption, and performed behavior after credible-source interventions |
| Replication or corroboration | Two field contexts corroborate that descriptive norms can affect behavior. The separate credible-source synthesis supports a small bounded behavioral effect, not a replication of the norm studies or a universal authority effect. |
| Contradictory or null findings | Low-energy households increased use after a descriptive average. In the credible-source review, written and non-in-person subgroups were nonsignificant, effects varied by context, and most cases had some risk-of-bias concerns. |
| Moderators or boundaries | Truthfulness, source expertise and trustworthiness in the exact domain, reference-group match, baseline behavior, delivery mode, timing, task, desirability, visibility, stakes, and injunctive context |
| Cultural or localization limits | Group identity, authority, collectivism, privacy, and norm meaning vary across locales and communities |
| Accessibility implications | Numerical or vague social claims may be hard to interpret; present the source, denominator, time period, and nonconformity option clearly |
| Harms | Fabricated popularity or expertise, irrelevant credentials, shaming, stereotype reinforcement, coercion, deference without comprehension, and normalization of undesirable behavior |
| Safe content-design application | Use only verified, current, relevant statistics or accurately scoped source credentials when they materially help the user assess the information; explain the basis and preserve an unpressured alternative |
| Prohibited or high-risk application | Do not invent counts or credentials, cherry-pick reference groups, imply recommendation or jurisdictional authority that is absent, use authority as a substitute for material evidence, or pressure consent or another high-stakes decision |
| Product-specific validation | Verify data provenance, exact credential and domain applicability, subgroup fit, and source relevance; measure comprehension, behavior in both directions, pressure, calibrated trust, and outcomes for people already doing the desired behavior |
| Evidence freshness | 2007–2008 norm field studies plus a 2026 credible-source systematic review/meta-analysis; checked 2026-08-17; current product data, credentials, scope, and local validation required |
| Semantic decision ID/version/state | CER-DEC-C015 / v0.1 / proposed; conditional cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C016 — Argument quality matters more under some elaboration conditions, not for a fixed “route” persona

| Field | Value |
| --- | --- |
| Stable ID | CER-C016 |
| Canonical claim label | research finding |
| Claim | A meta-analysis generally supported a larger strong-versus-weak argument effect under conditions intended to produce central processing, with methodological moderators; processing route is not a stable user type. |
| Construct | elaboration likelihood; argument quality; persuasion |
| Domain | Persuasion and elaboration |
| Original source IDs | CE-S022 |
| Source types | original research |
| Comparison/intervention | Argument quality and persuasion outcomes were synthesized across elaboration-related conditions and study contexts. |
| Measured effect representation | Moderated persuasion effects across studies; no fixed route, persona, or copy formula is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C016-v1; sources: CE-S022 |
| Evidence dimensions | observation_strength=observed; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | meta |
| Population or sample | 134 effect sets from persuasion experiments |
| Task or environment | Evaluate persuasive messages with argument quality and processing conditions manipulated |
| Outcome | Attitude or persuasion measures |
| Replication or corroboration | Meta-analysis synthesizes multiple experiments; source dependence and operational differences remain |
| Contradictory or null findings | Effects were smaller in pre-post designs and induction-strength measures did not consistently explain effect size |
| Moderators or boundaries | Motivation, ability, prior knowledge, message involvement, argument operationalization, timing, and study design |
| Cultural or localization limits | What counts as a strong argument, credible source, or respectful appeal differs across language, culture, and institution |
| Accessibility implications | Users need accessible evidence and enough time to deliberate; complexity and modality can constrain ability without indicating low motivation |
| Harms | Labeling people “peripheral processors” can justify weak evidence, emotional manipulation, or demographic targeting |
| Safe content-design application | Make material reasons and evidence understandable, support deliberation, and test comprehension rather than infer a route |
| Prohibited or high-risk application | Do not withhold substantive facts or substitute authority, scarcity, or emotion because analytics imply low engagement |
| Product-specific validation | Test argument comprehension, evidence recall, informed preference, delayed stability, and pressure across realistic attention and literacy conditions |
| Evidence freshness | 2015 meta-analysis; checked 2026-08-17; current, domain- and culture-specific persuasion evidence required |
| Semantic decision ID/version/state | CER-DEC-C016 / v0.1 / proposed; bounded research finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C017 — Defaults influence decisions but vary and require separate ethical review

| Field | Value |
| --- | --- |
| Stable ID | CER-C017 |
| Canonical claim label | research finding |
| Claim | Defaults increase selection of the preselected option on average, but effects vary and include null and negative results. **[Inference]** Effectiveness does not by itself establish preference fit, informed consent, or ethical acceptability. |
| Construct | default effect; status quo; choice architecture; user control |
| Domain | Defaults, reversibility, and user control |
| Original source IDs | CE-S023, CE-S024 |
| Source types | original research |
| Comparison/intervention | Preselected-option conditions were compared with alternative or no-default conditions across domains; the organ-donation evidence is part of, not independent from, the broader defaults literature. |
| Measured effect representation | Pooled and domain-specific default-selection differences with substantial heterogeneity, nonsignificant results, and negative results; no ethical benefit effect is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C017-v1; sources: CE-S023, CE-S024 |
| Evidence dimensions | observation_strength=observed; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary and meta |
| Population or sample | 58 studies with pooled N = 73,675 plus organ-donation experimental and country-level evidence |
| Task or environment | Make decisions with a preselected option across multiple domains |
| Outcome | Selection of the default and, in one domain, consent-rate differences |
| Replication or corroboration | CE-S023 synthesizes multiple default studies and may include related foundational work; CE-S024 is not independent of the broader literature |
| Contradictory or null findings | Several studies in the meta-analysis were nonsignificant and two were negative; effect heterogeneity was substantial |
| Moderators or boundaries | Endorsement, ease, endowment, stakes, knowledge, reversibility, preference distribution, and institutional context |
| Cultural or localization limits | Consent norms, state legitimacy, regulation, and default meanings vary by jurisdiction and community |
| Accessibility implications | Defaults may reduce interaction burden but can conceal a choice; labels, consequences, change controls, and accessible review remain necessary |
| Harms | Inertia can produce unwanted consent, spending, data sharing, or enrollment, especially where reversal is difficult |
| Safe content-design application | **[Proposal]** Use only with an accountable rationale, transparent consequences, easy change, preference evidence, and appropriate approval. This product-use proposal is not an empirical finding or an approval. |
| Prohibited or high-risk application | **[Proposal]** Do not default material consent, privacy, financial, medical, or legal choices merely because defaults increase uptake. This ethical safeguard is not an independently tested effect or an approval. |
| Product-specific validation | Measure informed preference fit, comprehension, active changes, later reversal, regret, subgroup harm, and support burden; obtain applicable review |
| Evidence freshness | 2003 primary and 2019 meta-analysis; checked 2026-08-17; legal and product context must be current |
| Semantic decision ID/version/state | CER-DEC-C017 / v0.1 / proposed; heterogeneous research finding recorded, while ethical and product-use guidance remains an explicit inference or proposal |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, ethical safeguard, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C018 — Reversibility and confirmation are scoped protections, not decorative reassurance

| Field | Value |
| --- | --- |
| Stable ID | CER-C018 |
| Canonical claim label | sourced fact |
| Claim | WCAG 2.2 Success Criterion 3.3.4 requires at least one of reversibility, input checking with correction, or review and confirmation for covered legal, financial, data-modifying, and test-response submissions at Level AA. |
| Construct | error prevention; reversibility; confirmation; user control |
| Domain | Defaults, reversibility, and user control |
| Original source IDs | CE-S025 |
| Source types | normative standard |
| Comparison/intervention | No behavioral intervention; the record states alternative conformance mechanisms for covered submissions. |
| Measured effect representation | Normative pass/fail condition with scoped alternatives; no behavioral effect size is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C018-v1; sources: CE-S025 |
| Evidence dimensions | observation_strength=observed; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary normative instrument |
| Population or sample | Not applicable |
| Task or environment | Web submissions that cause legal commitments or financial transactions, modify or delete user-controllable data, or submit test responses |
| Outcome | Conformance with the exact success criterion |
| Replication or corroboration | Not applicable to a normative criterion; conformance requires testing the implementation |
| Contradictory or null findings | None within the criterion; the three alternatives mean undo is not the only conforming mechanism |
| Moderators or boundaries | Exact scope, conformance level, process boundary, exception, technology, and implementation |
| Cultural or localization limits | WCAG is designed internationally, but legal meaning and localized review copy still require jurisdiction and language review |
| Accessibility implications | Review, correction, and undo reduce the consequence of mistakes for users with cognitive, motor, visual, and other disabilities |
| Harms | A reassuring label without actual correction or reversal can mislead users and falsely imply conformance |
| Safe content-design application | Specify the consequence, editable data, confirmation step, and recovery path in the content and interaction contract |
| Prohibited or high-risk application | Do not claim WCAG conformance from copy alone or use “You can change this later” unless the capability exists and is usable |
| Product-specific validation | Test the complete process, actual undo or correction, accessible names and states, persistence, timing, and error recovery against the criterion |
| Evidence freshness | WCAG 2.2 Recommendation dated 2024-12-12; checked current 2026-08-17; recheck errata and policy target before use |
| Semantic decision ID/version/state | CER-DEC-C018 / v0.1 / proposed; exact normative meaning recorded, with product applicability not established |
| Semantic approval record IDs/scope/status | record IDs: none; scope: interpretation, product applicability, conformance, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C019 — Habit formation is variable; simple loops and fixed-day rules are unsupported

| Field | Value |
| --- | --- |
| Stable ID | CER-C019 |
| Canonical claim label | cross-source finding |
| Claim | Repetition in a stable context can increase automaticity, but individual trajectories vary widely; a universal cue-routine-reward loop or 21-day or 66-day deadline is not supported by the registered evidence. |
| Construct | habit formation; automaticity; contextual cues; behavioral triggers |
| Domain | Habit formation and behavioral triggers |
| Original source IDs | CE-S026, CE-S027 |
| Source types | original research |
| Comparison/intervention | Repetition of a self-selected behavior in a stable context was followed over time and interpreted alongside a broader habit literature. |
| Measured effect representation | Individual automaticity trajectories and context-response associations, including an 18-to-254-day range to estimated asymptote; no fixed formation deadline is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C019-v1; sources: CE-S026, CE-S027 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary and narrative review |
| Population or sample | 96 volunteers over 12 weeks in CE-S026, with sufficient data from 82 and model fit for 62; broader literature in CE-S027 |
| Task or environment | Repeat a self-selected eating, drinking, or activity behavior in a consistent context |
| Outcome | Self-reported automaticity trajectory and context-response association |
| Replication or corroboration | CE-S027 corroborates the role of recurring contexts across a broader literature; it does not validate one commercial “habit loop” schema |
| Contradictory or null findings | CE-S026's curve fit did not apply equally to all participants; time to 95 percent of asymptote ranged from 18 to 254 days and a missed day did not materially derail formation |
| Moderators or boundaries | Behavior complexity, reward, repetition consistency, context stability, intrinsic goal, opportunity, and individual differences |
| Cultural or localization limits | Daily routines, time, household roles, resources, and the meaning of desirable habits vary across cultures and socioeconomic contexts |
| Accessibility implications | Streaks and repeated prompts can punish episodic disability, executive-function variability, caregiving, or limited access; flexible recovery is essential |
| Harms | Compulsion, shame, notification burden, coercive retention, and false health or behavior promises |
| Safe content-design application | Support user-chosen routines with adjustable cues, easy pause, nonpunitive recovery, and honest progress |
| Prohibited or high-risk application | Do not claim a fixed formation time, engineer compulsive use, or treat broken streaks as failure |
| Product-specific validation | Measure sustained user-valued outcomes, automaticity, opt-out, burden, adverse use, subgroup effects, and persistence after prompts stop |
| Evidence freshness | 2010 primary and 2016 review evidence; checked 2026-08-17; modern domain evidence required |
| Semantic decision ID/version/state | CER-DEC-C019 / v0.1 / proposed; conditional cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C020 — “The Hawthorne effect” is not one stable observer-effect constant

| Field | Value |
| --- | --- |
| Stable ID | CER-C020 |
| Canonical claim label | cross-source finding |
| Claim | Research participation, observation, and inferred study demands can change behavior, but mechanisms, direction, and magnitude vary; a single Hawthorne correction is unsupported. |
| Construct | research reactivity; observer effects; demand characteristics |
| Domain | Research-response and observation biases |
| Original source IDs | CE-S028, CE-S029 |
| Source types | original research |
| Comparison/intervention | Purpose-designed studies of research participation and observation were synthesized alongside a demand-characteristics mechanism. |
| Measured effect representation | Heterogeneous behavioral directions and magnitudes, including a null result; no single observer-effect correction is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C020-v1; sources: CE-S028, CE-S029 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | systematic review and primary theory/model |
| Population or sample | 19 purpose-designed studies, mostly in health settings, plus methodological examples about experimental participation |
| Task or environment | Behavior while being observed, questioned, or aware of research participation |
| Outcome | Behavioral differences attributable to participation or interpretation of study demand |
| Replication or corroboration | CE-S028 finds heterogeneous evidence across designs; CE-S029 supplies a related demand-characteristics mechanism, not a quantitative replication |
| Contradictory or null findings | One reviewed study found no effect and the rest varied greatly; bias and cointerpretation make magnitudes insecure |
| Moderators or boundaries | Awareness, observation method, repeated measurement, social desirability, researcher cues, setting, stakes, and outcome |
| Cultural or localization limits | Deference, privacy, face, authority, and research trust can alter reactivity across cultures |
| Accessibility implications | Accommodations, facilitator behavior, fatigue, and assistive-technology setup can change both behavior and what the study measures |
| Harms | Dismissing inconvenient findings as “Hawthorne” can silence participants; ignoring reactivity can inflate confidence |
| Safe content-design application | Record facilitator contact, observation, study purpose disclosure, demand cues, and deviations; use comparison conditions where ethical |
| Prohibited or high-risk application | Do not apply a universal numeric adjustment or invalidate self-report solely because participants knew they were studied |
| Product-specific validation | Triangulate moderated and unmoderated tasks, behavioral logs, interviews, delayed outcomes, and researcher-blinded coding where feasible |
| Evidence freshness | 1962 theory and 2014 systematic review; checked 2026-08-17; method-specific current review required |
| Semantic decision ID/version/state | CER-DEC-C020 / v0.1 / proposed; heterogeneous cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, research method, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C021 — Color effects are contextual and color cannot be the sole semantic cue

| Field | Value |
| --- | --- |
| Stable ID | CER-C021 |
| Canonical claim label | cross-source finding |
| Claim | Some controlled studies report color-linked differences in affect or task performance, while the research is inconsistent and context-sensitive; no universal color-emotion or color-behavior dictionary is supported, and WCAG prohibits color as the only visual means of conveying specified information. |
| Construct | color perception; context; semantic redundancy; color vision |
| Domain | Cognitive accessibility |
| Original source IDs | CE-S025, CE-S030, CE-S031 |
| Source types | normative standard; original research |
| Comparison/intervention | Controlled color conditions were compared across tasks and reviewed against a separate normative prohibition on color-only meaning. |
| Measured effect representation | Task- and context-specific affect or performance differences plus a scoped conformance condition; these are not combined into a universal color effect. |
| Evidence record IDs and exact source IDs | CER-EV-C021-v1; sources: CE-S025, CE-S030, CE-S031 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary, narrative review, primary theory/model, and primary normative instrument |
| Population or sample | Prior color-psychology literature, six controlled studies with reported samples from 42 to 208, and a normative web standard |
| Task or environment | Detail, creativity, product, and message tasks under color manipulations; web content conveying information |
| Outcome | Cognitive-task performance, proposed motivation, and WCAG conformance |
| Replication or corroboration | CE-S030 reports inconsistent prior findings; CE-S031 is a multi-study primary program, not independent replication; CE-S025 is a separate accessibility requirement |
| Contradictory or null findings | The review characterizes the field as method-sensitive and contextual; findings differ across prior studies and tasks |
| Moderators or boundaries | Hue specification, saturation, brightness, contrast, ambient display, task, learned association, context, and color-vision variation |
| Cultural or localization limits | Color associations and conventions vary by culture, industry, politics, religion, and locale; local evidence is mandatory |
| Accessibility implications | Information, action, and state need text, shape, pattern, position, programmatic state, or another equivalent cue in addition to color |
| Harms | Color-only error, success, risk, or selection states can exclude users and create false emotional or behavioral assumptions |
| Safe content-design application | Use color as a redundant, accessible signal within a tested visual system; document the intended meaning and noncolor equivalent |
| Prohibited or high-risk application | Do not infer emotion, intent, risk tolerance, or competence from color response; never encode critical meaning only in color |
| Product-specific validation | Test contrast and noncolor identification, color-vision conditions, screen modes, cultural meaning, task performance, and assistive technologies |
| Evidence freshness | 2009 primary, 2014 review, and current WCAG 2.2; all checked 2026-08-17 |
| Semantic decision ID/version/state | CER-DEC-C021 / v0.1 / proposed; contextual research finding and exact normative meaning recorded, with applicability not established |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, WCAG applicability, conformance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C022 — Cognitive-access guidance is supplemental and needs disabled-user validation

| Field | Value |
| --- | --- |
| Stable ID | CER-C022 |
| Canonical claim label | sourced fact |
| Claim | W3C's COGA Note recommends clear purpose, familiar structure, understandable content, error recovery, focus support, reduced memory dependence, help, adaptation, and involvement of people with cognitive and learning disabilities, while explicitly stating that this guidance is supplemental and not required for WCAG conformance. |
| Construct | cognitive accessibility; understandable content; user involvement |
| Domain | Cognitive accessibility |
| Original source IDs | CE-S048, CE-S025 |
| Source types | official guidance; normative standard |
| Comparison/intervention | No behavioral intervention; the record distinguishes supplemental cognitive-access guidance from separate WCAG conformance requirements. |
| Measured effect representation | Document status and scoped normative conditions; no empirical accessibility effect size is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C022-v1; sources: CE-S048, CE-S025 |
| Evidence dimensions | observation_strength=corroborated; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary official guidance and primary normative instrument |
| Population or sample | Not applicable to the documents; COGA incorporates user needs, patterns, personas, and task-force research |
| Task or environment | Web content and applications used by people with cognitive and learning disabilities |
| Outcome | Supplemental guidance adoption and separate WCAG conformance |
| Replication or corroboration | WCAG acknowledges incomplete coverage of cognitive needs and points to supplemental guidance; that relationship is not experimental replication |
| Contradictory or null findings | COGA states that publication as a Note does not imply W3C-member endorsement and calls the document work in progress |
| Moderators or boundaries | Disability and access need, task, language, literacy, stress, device, assistive technology, and support context |
| Cultural or localization limits | “Clear,” “familiar,” literal, concise, and supportive language require locale and community validation; direct translation is insufficient |
| Accessibility implications | Cognitive access spans wording, hierarchy, memory, error recovery, distraction, adaptation, and human help, not reading level alone |
| Harms | Treating informative patterns as conformance criteria can produce false compliance; designing without affected users can encode stereotypes |
| Safe content-design application | Use the Note as a candidate pattern source, preserve its status, and co-design and test with people who have relevant cognitive and learning disabilities |
| Prohibited or high-risk application | Do not claim WCAG conformance from following COGA, claim universal accessibility, or replace disabled-user evidence with personas |
| Product-specific validation | Recruit by access need, provide accommodations, evaluate complete tasks, retain divergent findings, and test the applicable WCAG criteria separately |
| Evidence freshness | COGA Working Group Note dated 2021-04-29 and WCAG 2.2 dated 2024-12-12; checked 2026-08-17 |
| Semantic decision ID/version/state | CER-DEC-C022 / v0.1 / proposed; sourced status meaning recorded and any product use remains a proposal |
| Semantic approval record IDs/scope/status | record IDs: none; scope: guidance use, WCAG applicability, conformance, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C023 — Shape preferences and sound-shape correspondences are reliable in aggregate, not universal semantics

| Field | Value |
| --- | --- |
| Stable ID | CER-C023 |
| Canonical claim label | cross-source finding |
| Claim | Curvature preference and bouba/kiki-style sound-shape matching appear reliably in aggregate, but task, expertise, stimulus, phonology, language, and culture create meaningful variation and failures. |
| Construct | shape preference; curvature; sound symbolism; cross-modal correspondence |
| Domain | Cultural, linguistic, and localization boundaries |
| Original source IDs | CE-S032, CE-S033, CE-S034 |
| Source types | original research |
| Comparison/intervention | Curved and angular stimuli were rated, and nonce words were matched to rounded or angular shapes across studies and languages. |
| Measured effect representation | Aggregate preference and congruent-matching effects with stimulus-, task-, expertise-, phonology-, and language-level variation; no universal semantic mapping is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C023-v1; sources: CE-S032, CE-S033, CE-S034 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary, systematic review, semi-systematic review, and meta |
| Population or sample | 61 studies with 106 samples and 309 effects for curvature; 917 speakers of 25 languages, 9 language families, and 10 writing systems for bouba/kiki; additional reviewed studies and failures |
| Task or environment | Rate curved versus angular stimuli or match auditory nonce words to rounded and angular shapes |
| Outcome | Preference ratings and congruent matching |
| Replication or corroboration | The three sources triangulate related shape phenomena but do not replicate one identical construct or task |
| Contradictory or null findings | Curvature preference was not universal; some languages lacked the expected sound-shape pattern; forced-choice and phonotactic legality affect results |
| Moderators or boundaries | Presentation time, stimulus type, expertise, task, forced-choice format, phonology, phonotactics, familiarity, and meaning |
| Cultural or localization limits | Explicitly demonstrated language-level variation means local testing is required; aggregate cross-cultural robustness is not uniformity |
| Accessibility implications | Shape can redundantly support a state, but interpretation cannot rely on shape alone; tactile, textual, programmatic, and contrast equivalents may be needed |
| Harms | Universal shape-emotion claims can stereotype cultures, mislabel controls, or make critical states ambiguous |
| Safe content-design application | Use tested, conventional shapes with labels and redundant cues; treat naming or affect associations as hypotheses |
| Prohibited or high-risk application | Do not infer personality, emotion, danger, or trust from curvature or bouba/kiki correspondence; do not use shape alone for critical meaning |
| Product-specific validation | Test label-shape identification, preference, error, and accessibility in each target language, script, culture, device, and use context |
| Evidence freshness | 2017 synthesis and 2022 primary/meta evidence; checked 2026-08-17 |
| Semantic decision ID/version/state | CER-DEC-C023 / v0.1 / proposed; conditional cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, localization transfer, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C024 — Speech and reading have no universal comprehension winner

| Field | Value |
| --- | --- |
| Stable ID | CER-C024 |
| Canonical claim label | cross-source finding |
| Claim | Across reading-versus-listening studies, the overall comprehension difference was not reliable, and a randomized nonfiction study found no significant modality differences; pacing, outcome, material, and multimodal context matter. |
| Construct | reading comprehension; listening comprehension; modality; pacing |
| Domain | Memory and cognitive load |
| Original source IDs | CE-S035, CE-S036, CE-S039 |
| Source types | original research |
| Comparison/intervention | Reading, listening, and bounded combined-modality conditions were compared across nonfiction and multimedia-learning tasks. |
| Measured effect representation | Overall nonsignificant reading-listening difference with moderator-specific results and adjacent narration-picture effects; no universal modality winner is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C024-v1; sources: CE-S035, CE-S036, CE-S039 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary and meta |
| Population or sample | 46 studies with N = 4,687, a randomized study of 91 adults, and 91 multimedia-learning studies with thousands of participants |
| Task or environment | Read, listen, or combine modalities for nonfiction or multimedia learning under self- or system-paced conditions |
| Outcome | Immediate and delayed comprehension, retention, and transfer |
| Replication or corroboration | CE-S035 and CE-S036 independently support no overall universal winner; CE-S039 concerns narration with pictures and is a bounded adjacent result |
| Contradictory or null findings | Overall reading-listening difference was nonsignificant; some self-paced and inferential conditions favored reading; narration benefits in CE-S039 concentrated in system-paced, dynamic, short materials |
| Moderators or boundaries | Pacing, learner age, text type, inferential demand, duration, visual support, control, hearing, literacy, and familiarity |
| Cultural or localization limits | Oral and literacy practices, language structure, accent, speech rate, translation, and script can change performance |
| Accessibility implications | Provide equivalent modalities, captions or transcripts, playback control, screen-reader compatibility, and a persistent text option; no one mode serves everyone |
| Harms | Voice-only or text-only defaults can exclude users; “people understand speech better” can remove control and reviewability |
| Safe content-design application | Let users choose or combine accessible modalities and control pace; match modality to task and environment |
| Prohibited or high-risk application | Do not remove text, captions, transcripts, or audio alternatives based on a modality slogan |
| Product-specific validation | Test comprehension, navigation, retention, time, interruption recovery, and preference across hearing, vision, literacy, language, and device contexts |
| Evidence freshness | 2016 primary/meta and 2022 meta evidence; checked 2026-08-17 |
| Semantic decision ID/version/state | CER-DEC-C024 / v0.1 / proposed; conditional cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product modality use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C025 — “Dual coding” does not mean any visual improves understanding

| Field | Value |
| --- | --- |
| Stable ID | CER-C025 |
| Canonical claim label | cross-source finding |
| Claim | Integrated, relevant text-picture signaling and some narration-picture combinations can modestly improve learning under bounded conditions, while irrelevant visuals can impair retention and transfer; the blanket dual-coding rule is rejected. |
| Construct | multimedia learning; dual-channel presentation; signaling; coherence |
| Domain | Memory and cognitive load |
| Original source IDs | CE-S037, CE-S038, CE-S039 |
| Source types | original research |
| Comparison/intervention | Relevant signaling, irrelevant details, and narration-picture combinations were compared with alternative instructional conditions across separate syntheses. |
| Measured effect representation | Small or moderated retention, transfer, and integration effects, including harms from irrelevant details; no generic dual-coding effect is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C025-v1; sources: CE-S037, CE-S038, CE-S039 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | meta |
| Population or sample | 27 signaling studies with N = 2,464, 39 seductive-detail effects, and 91 modality studies with retention N = 8,088 and transfer N = 6,664 |
| Task or environment | Learn instructional material containing text, pictures, narration, integration signals, or irrelevant details |
| Outcome | Retention, transfer, and text-picture integration |
| Replication or corroboration | Separate meta-analyses triangulate benefits and harms of different multimedia manipulations; they do not validate a single “dual coding” intervention |
| Contradictory or null findings | Irrelevant details harmed learning; signaling effects were small and moderated; narration advantages concentrated in specific pacing, duration, and animation conditions |
| Moderators or boundaries | Relevance, integration, prior knowledge, pacing, duration, dynamism, redundancy, search demand, and learning objective |
| Cultural or localization limits | Image interpretation, diagram conventions, educational experience, narration, and text direction vary by language and culture |
| Accessibility implications | Every meaningful visual needs an equivalent alternative; audio, text, image, and interaction must not create redundant overload or contradictory sequences |
| Harms | Decorative imagery can distract; a visual-first rule can exclude blind or low-vision users and remove precise text |
| Safe content-design application | Add a visual only when it carries or clarifies task-relevant meaning, explicitly connect it to text, and provide accessible equivalents |
| Prohibited or high-risk application | Do not add stock imagery, icons, or animation merely to claim “dual coding,” and do not replace controlled text with an ambiguous visual |
| Product-specific validation | Compare relevant, irrelevant, and text-only or alternative-modal variants for comprehension, transfer, search, cognitive burden, and accessible-equivalent performance |
| Evidence freshness | 2012 and 2016 meta-analyses; checked 2026-08-17; modern interface and disability evidence required |
| Semantic decision ID/version/state | CER-DEC-C025 / v0.1 / proposed; conditional cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product multimedia use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C026 — The “60,000 times faster” visual-processing claim is unsupported

| Field | Value |
| --- | --- |
| Stable ID | CER-C026 |
| Canonical claim label | open question |
| Claim | A traceable primary study defining and supporting a 60,000-to-1 visual-versus-text processing-speed ratio was not identified in this packet; rapid image-categorization research does not operationalize that comparison. |
| Construct | visual processing speed; citation provenance; quantitative myth |
| Domain | Attention and perception |
| Original source IDs | CE-S040 |
| Source types | original research |
| Comparison/intervention | Rapid natural-image categorization was tested; a study comparing visual and text processing in a common unit at a 60,000-to-1 ratio was not identified in this packet. |
| Measured effect representation | Event-related-potential differentiation and behavioral response to a 20-millisecond image; no visual-versus-text ratio or multiplier is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C026-v1; CER-SEARCH-60000-001; sources: CE-S040 |
| Evidence dimensions | observation_strength=observed; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=inferred |
| Evidence class | primary; bounded negative source search documented separately and not treated as an evidence class |
| Population or sample | Adult participants in a rapid natural-image categorization study; exact N was not used from the reviewed abstract |
| Task or environment | Decide whether a photograph flashed for 20 milliseconds contains an animal |
| Outcome | Event-related potential differentiation and behavioral response |
| Replication or corroboration | An original ratio study or independent replication was not identified in this packet; CE-S040 supports rapid bounded categorization only |
| Contradictory or null findings | The cited primary study contains no text comparison, common unit, or 60,000 multiplier |
| Moderators or boundaries | Image category, exposure, task, response definition, reading fluency, text length, visual complexity, and measurement unit |
| Cultural or localization limits | Reading system, literacy, visual convention, and language are absent from the purported ratio and make a universal comparison implausibly underspecified |
| Accessibility implications | The myth can devalue text alternatives and exclude blind, low-vision, or image-processing-disabled users |
| Harms | Fabricated precision can drive visual replacement of exact, searchable, translatable, and accessible text |
| Safe content-design application | Abstain from the ratio; describe the exact evidence for a specific image-recognition task if it is genuinely relevant |
| Prohibited or high-risk application | Do not publish, lint, rank, or make product decisions from “60,000 times faster” without a traceable original method and replication |
| Product-specific validation | First resolve provenance; then, if a defined product hypothesis remains, compare comprehension and task performance across equivalent accessible formats |
| Evidence freshness | The bounded packet search and CE-S040 were rechecked 2026-08-17; unresolved provenance remains a hard abstention |
| Semantic decision ID/version/state | CER-DEC-C026 / v0.1 / question; open question and hard abstention on the 60,000-to-1 claim |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim publication, rule or lint use, product use, implementation, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C027 — Neural coupling is associated with comprehension, not a copywriting formula

| Field | Value |
| --- | --- |
| Stable ID | CER-C027 |
| Canonical claim label | research finding |
| Claim | In a small natural-story fMRI study, speaker-listener neural coupling was associated with comprehension and disappeared in noncommunication controls; the evidence does not show that a writing technique causes “brain synchrony” or better product outcomes. |
| Construct | speaker-listener neural coupling; communication; comprehension |
| Domain | Persuasion and elaboration |
| Original source IDs | CE-S041 |
| Source types | original research |
| Comparison/intervention | Neural time-series alignment during successful story communication was compared with noncommunication controls. |
| Measured effect representation | Association between spatiotemporal neural alignment and comprehension in one speaker and 11 listeners; no causal writing-intervention effect is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C027-v1; sources: CE-S041 |
| Evidence dimensions | observation_strength=observed; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary |
| Population or sample | One speaker and 11 listeners |
| Task or environment | Tell and listen to an unrehearsed narrative during fMRI, with noncommunication controls |
| Outcome | Spatiotemporal neural alignment and story-comprehension score |
| Replication or corroboration | No independent intervention replication or product-copy study was evaluated in this packet |
| Contradictory or null findings | Coupling vanished where communication failed, but the reported association with comprehension does not establish causal direction or a controllable writing variable |
| Moderators or boundaries | Language comprehension, narrative, speaker, listener, timing model, scanner environment, small sample, and analysis choices |
| Cultural or localization limits | One language and narrow sample cannot support universal narrative or cultural claims |
| Accessibility implications | Neurotypical scanner evidence does not represent deaf, hard-of-hearing, neurodivergent, aphasic, translated, signed, captioned, or assistive-technology-mediated communication |
| Harms | Neuromarketing claims can overstate causality, invade privacy, or legitimize manipulative optimization and pseudoscientific scoring |
| Safe content-design application | Use comprehension and task evidence directly; cite neural coupling only as a bounded research finding, not a target metric |
| Prohibited or high-risk application | Do not score strings for “brain coupling,” infer mental state, or market a copy pattern as neurologically proven |
| Product-specific validation | None authorized from this evidence; any study would require ethics, privacy, specialist methods, preregistration, and independent behavioral outcomes |
| Evidence freshness | 2010 primary study; rechecked 2026-08-17; current systematic and causal evidence absent from this packet |
| Semantic decision ID/version/state | CER-DEC-C027 / v0.1 / proposed; bounded association recorded with explicit product-use abstention |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, product use, neuro-inference use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C028 — Scarcity can affect perceived value; permission and policy are separate

| Field | Value |
| --- | --- |
| Stable ID | CER-C028 |
| Canonical claim label | cross-source finding |
| Claim | Scarcity affected perceived value in an older commodity-theory synthesis, but perceived value is not evidence of user benefit, comprehension, informed consent, ethical permission, or legal applicability. Experimental and official dark-pattern sources address distinct harms and scope-bounded governance; they do not convert the scarcity effect into universal product policy. |
| Construct | scarcity; perceived value; urgency; reactance |
| Domain | Deceptive and manipulative design |
| Original source IDs | CE-S042, CE-S044, CE-S045, CE-S046 |
| Source types | original research; official guidance; regulation |
| Comparison/intervention | Scarcity-value studies were synthesized separately from manipulative-interface experiments and governing instruments. |
| Measured effect representation | Perceived-value effects, sign-up behavior, autonomy outcomes, and scoped legal or enforcement conditions remain separate; no user-benefit or permission effect is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C028-v1; sources: CE-S042, CE-S044, CE-S045, CE-S046 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | meta, primary, and primary official or normative instruments |
| Population or sample | Older scarcity-study corpus, online dark-pattern participants, and official regulatory or enforcement material |
| Task or environment | Value scarce goods or respond to manipulative online choice interfaces |
| Outcome | Perceived desirability, sign-up behavior, autonomy, and legal or enforcement risk |
| Replication or corroboration | Dark-pattern sources do not replicate commodity scarcity effects; they establish separate harm and governance boundaries |
| Contradictory or null findings | CE-S042 does not establish purchase benefit or universal behavior; modern scarcity effect sizes and moderators were not fully synthesized in this packet |
| Moderators or boundaries | Scarcity source, truth, time, quantity, product type, competition, loss, need, price, vulnerability, and stakes |
| Cultural or localization limits | Market trust, consumer law, economic security, time orientation, and scarcity experience differ across jurisdictions and communities |
| Accessibility implications | Timers and pressure can disadvantage users who need more time, support, translation, or assistive technology; timing requirements must also be reviewed |
| Harms | False urgency, panic, overspending, rushed consent, inequity, distrust, and regulatory exposure |
| Safe content-design application | **[Proposal]** Candidate internal policy, non-normative and not approved: state a verified material constraint with source, scope, and update behavior only when users need it to decide; provide sufficient time and alternatives |
| Prohibited or high-risk application | **[Proposal]** Candidate internal prohibition, non-normative and not approved: do not invent low stock, countdowns, demand, expiring benefits, or exclusivity; do not reset timers or hide the basis of urgency. This is not a claim of universal legal applicability. |
| Product-specific validation | Verify source-of-truth and expiration behavior; test factual comprehension, pressure, regret, accessibility, subgroup harm, and legal applicability |
| Evidence freshness | 1991 scarcity synthesis plus 2021–2022 experimental and official material; checked 2026-08-17; current domain law and data required |
| Semantic decision ID/version/state | CER-DEC-C028 / v0.1 / proposed; cross-source risk meaning recorded and separate internal policy remains a proposal |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, internal policy, legal applicability, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C029 — Deceptive design is observable and regulated in bounded contexts

| Field | Value |
| --- | --- |
| Stable ID | CER-C029 |
| Canonical claim label | cross-source finding |
| Claim | Large-scale observation and experiments show that deceptive or manipulative interface patterns occur and can materially change behavior; U.S. agency guidance and EU law establish serious but jurisdiction-specific constraints. |
| Construct | dark patterns; manipulation; deception; autonomy; consumer protection |
| Domain | Deceptive and manipulative design |
| Original source IDs | CE-S043, CE-S044, CE-S045, CE-S046 |
| Source types | original research; official guidance; regulation |
| Comparison/intervention | Large-scale interface observation and manipulative-choice experiments are interpreted separately from agency guidance and jurisdiction-specific regulation. |
| Measured effect representation | Pattern prevalence, behavior and reaction differences, and scoped legal prohibitions; no universal legal classification or product effect is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C029-v1; sources: CE-S043, CE-S044, CE-S045, CE-S046 |
| Evidence dimensions | observation_strength=corroborated; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary and primary official or normative instruments |
| Population or sample | About 53,000 product pages across about 11,000 shopping sites; online experimental participants; official agency and regulatory texts |
| Task or environment | E-commerce crawl, subscription-choice experiments, and regulated online interfaces |
| Outcome | Pattern prevalence, sign-up behavior, negative reaction, consumer-choice impairment, and legal prohibition |
| Replication or corroboration | Crawl, experiment, agency synthesis, and regulation triangulate distinct occurrence, effect, and governance questions; none substitutes for another |
| Contradictory or null findings | Automated detection misses some patterns; not every interface in a taxonomy is unlawful; exact prevalence and effect depend on method and context |
| Moderators or boundaries | Pattern strength, stakes, vulnerable population, intent, omission, asymmetry, reversibility, jurisdiction, service type, and governing law |
| Cultural or localization limits | Consumer expectations, legal definitions, disclosure conventions, and vulnerability differ; jurisdiction-specific review is mandatory |
| Accessibility implications | Obstruction, visual interference, confusing negatives, asymmetric controls, and hidden terms can disproportionately harm disabled users |
| Harms | Unintended purchases, unwanted data disclosure, subscription lock-in, loss of autonomy, inequity, and legal or reputational harm |
| Safe content-design application | Audit choice symmetry, material information, consent, cancellation, defaults, timers, social claims, and recovery; use the least coercive truthful design |
| Prohibited or high-risk application | Do not build or optimize interfaces that deceive, manipulate, obstruct, shame, hide material facts, or impair free and informed decisions |
| Product-specific validation | Combine expert pattern audit, user comprehension and autonomy tests, cancellation or reversal tests, accessibility review, source-of-truth checks, and qualified legal applicability determination |
| Evidence freshness | 2019–2022 empirical and official sources; checked 2026-08-17; consolidated law and enforcement must be rechecked at decision time |
| Semantic decision ID/version/state | CER-DEC-C029 / v0.1 / proposed; bounded cross-source risk finding recorded, not legal advice, with applicability not established |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, legal applicability, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C030 — Population and locale boundaries are part of every psychology claim

| Field | Value |
| --- | --- |
| Stable ID | CER-C030 |
| Canonical claim label | cross-source finding |
| Claim | Behavioral-science samples are often concentrated in Western, educated, industrialized, rich, and democratic populations, while color and shape evidence demonstrates contextual and cross-language variation; universality requires direct population evidence. |
| Construct | external validity; sampling; culture; localization |
| Domain | Cultural, linguistic, and localization boundaries |
| Original source IDs | CE-S030, CE-S032, CE-S033, CE-S034, CE-S047 |
| Source types | original research |
| Comparison/intervention | Behavioral sampling, color contexts, curvature preference, and sound-shape matching were compared across populations, languages, tasks, or literatures. |
| Measured effect representation | Sampling concentration, cross-population similarities, variation, and moderated aggregate effects; no individual cultural profile is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C030-v1; sources: CE-S030, CE-S032, CE-S033, CE-S034, CE-S047 |
| Evidence dimensions | observation_strength=corroborated; challenge=disputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary, primary theory/model, narrative review and critical synthesis, systematic review, semi-systematic review, and meta |
| Population or sample | Broad cross-cultural review, color literature, 61-study curvature synthesis, sound-shape review, and 917 speakers across 25 languages |
| Task or environment | Review psychological sampling and compare color, curvature, and sound-shape responses across contexts |
| Outcome | Cross-population similarity, variation, moderators, and sampling concentration |
| Replication or corroboration | Different constructs independently demonstrate the need for population boundaries; this is not proof that every construct varies culturally |
| Contradictory or null findings | Some aggregate shape correspondences were robust across many languages, while specific languages and tasks differed; variation and commonality coexist |
| Moderators or boundaries | Language, script, education, wealth, institution, task, response format, self-construal, familiarity, and researcher sampling |
| Cultural or localization limits | The claim is itself about limits; it cannot identify a local rule without local sources and participants |
| Accessibility implications | Culture intersects with disability, literacy, age, technology, and socioeconomic access; single-axis localization can still exclude |
| Harms | Universal “human behavior” claims can stereotype, erase local meaning, and misclassify users or risk |
| Safe content-design application | Attach population, locale, language, script, task, and environment to each claim; require local expertise and in-market evidence for transfer |
| Prohibited or high-risk application | Do not apply an average effect as a cultural profile or infer individual behavior from nationality, language, or demographic group |
| Product-specific validation | Recruit and analyze the target locales and intersections; use translated and locally authored materials; retain subgroup nulls and conflicts |
| Evidence freshness | 2010–2022 cross-cultural sources; checked 2026-08-17; target-locale research remains required |
| Semantic decision ID/version/state | CER-DEC-C030 / v0.1 / proposed; bounded cross-source finding proposed for the working register only |
| Semantic approval record IDs/scope/status | record IDs: none; scope: claim guidance, localization transfer, product use, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

### CER-C031 — Accessible authentication limits cognitive-function tests in a defined scope

| Field | Value |
| --- | --- |
| Stable ID | CER-C031 |
| Canonical claim label | sourced fact |
| Claim | WCAG 2.2 Success Criterion 3.3.8 requires that an authentication process not require a cognitive-function test unless an allowed alternative, assistance mechanism, object-recognition case, or personal-content case applies. |
| Construct | accessible authentication; cognitive function; recognition assistance |
| Domain | Recognition versus recall; Cognitive accessibility |
| Original source IDs | CE-S025, CE-S048 |
| Source types | normative standard; official guidance |
| Comparison/intervention | No behavioral intervention; the record states a scoped authentication conformance criterion and its allowed alternatives or exceptions. |
| Measured effect representation | Normative pass/fail condition with explicit exceptions; no cognitive-performance or product-benefit effect size is represented. |
| Evidence record IDs and exact source IDs | CER-EV-C031-v1; sources: CE-S025, CE-S048 |
| Evidence dimensions | observation_strength=corroborated; challenge=undisputed; freshness=current; lineage=active; epistemic_qualifier=none |
| Evidence class | primary normative instrument and primary official guidance |
| Population or sample | Not applicable |
| Task or environment | Web authentication processes at WCAG 2.2 Level AA |
| Outcome | Conformance with the exact criterion and its exceptions |
| Replication or corroboration | Not applicable to a normative criterion; COGA provides supplemental context but does not alter the criterion |
| Contradictory or null findings | The criterion includes exceptions; it is not a blanket ban on every memory action or every recognition task |
| Moderators or boundaries | Authentication scope, exception definitions, alternative method, assistance, security threat model, technology, and conformance level |
| Cultural or localization limits | Authentication instructions and recovery must be localized; local security, identity, and privacy law remains separate |
| Accessibility implications | Password managers, paste, accessible alternatives, and nonmemory pathways can remove barriers for cognitive and learning disabilities |
| Harms | Blocking paste, puzzle-only authentication, inaccessible recovery, or ambiguous object recognition can exclude users or weaken security workarounds |
| Safe content-design application | Specify allowed assistance and alternatives with security and accessibility owners; write clear recovery and error content |
| Prohibited or high-risk application | Do not claim conformance from copy alone, expose secrets, or weaken controls without a threat model and authorized security review |
| Product-specific validation | Test the complete authentication and recovery process with password managers, assistive technologies, cognitive-access participants, and security controls |
| Evidence freshness | WCAG 2.2 Recommendation dated 2024-12-12 and COGA Note dated 2021-04-29; checked 2026-08-17 |
| Semantic decision ID/version/state | CER-DEC-C031 / v0.1 / proposed; exact normative meaning recorded, with applicability and conformance not established |
| Semantic approval record IDs/scope/status | record IDs: none; scope: interpretation, product applicability, security review, conformance, implementation, publication, and release; status: not established; practitioner validation, delivery, and evaluation remain separate and unestablished |

## Cross-register conclusions

- **[Cross-source finding]** Choice, feedback, social proof, defaults, modality, aesthetics, color, shape, and multimedia effects all contain moderators, nulls, reversals, or outcome splits. They cannot be compiled into unconditional writing rules.
- **[Cross-source finding]** Evidence that a tactic changes behavior is separate from evidence that it improves comprehension, reflects user preference, preserves autonomy, is accessible, or is lawful.
- **[Cross-source finding]** A cognitive-ergonomics claim is safe for product consideration only when its population, task, environment, outcome, counterevidence, and validation method match the proposed use.
- **[Inference]** The agent should default to abstention when a claim has no traceable primary source, when the proposed use exceeds the source task, or when controlled facts and approvals are missing.

## Gaps and resolution queue

| Gap ID | Unresolved question | Claims affected | Resolution method | Required exit evidence |
| --- | --- | --- | --- | --- |
| CER-G001 | What current systematic reviews or preregistered replications update each foundational effect? | CER-C001, CER-C003, CER-C005, CER-C006, CER-C007, CER-C011, CER-C014 | Run construct-specific database searches with protocol, inclusion criteria, quality appraisal, and citation-chain checks | Search log, included and excluded studies, risk-of-bias record, and updated claim disposition |
| CER-G002 | Do F-like paths or any proposed Z pattern predict success on current responsive and multilingual interfaces? | CER-C002 | Preregister comparative tasks across viewport, content type, reading direction, locale, and assistive technology | Versioned screens, gaze and task outcomes, subgroup data, and retained nulls |
| CER-G003 | Is there any original operational source for the 60,000-to-1 ratio? | CER-C026 | Trace earliest appearances backward and require defined modalities, unit, sample, method, and replication | Original paper plus independent replication, or formal retired-claim record |
| CER-G004 | Which recognition supports improve the actual product without adding ambiguity or security risk? | CER-C005, CER-C031 | Factorial comparison of labels, icons, visible context, assistance, and accessible authentication alternatives | Error, comprehension, assistance, security, and accessibility results |
| CER-G005 | How do effects change under cognitive disability, acute stress, low literacy, aging, and multilingual use? | all claims, especially CER-C003, CER-C013, CER-C022, CER-C024 | Co-design, ethically recruit intersectional access-needs samples, provide accommodations, and disaggregate outcomes | Participant-reviewed findings, accommodations log, subgroup estimates, adverse events, and nonresponse analysis |
| CER-G006 | What local cultural meanings alter color, shape, norms, persuasion, trust, and feedback? | CER-C010, CER-C014, CER-C015, CER-C016, CER-C021, CER-C023, CER-C030 | Locale-specific source review, local expert adjudication, translation/context notes, and in-market testing | Locale decision packet with explicit transfer and nontransfer bounds |
| CER-G007 | When do behavioral tactics become manipulative for the exact product and jurisdiction? | CER-C009, CER-C015, CER-C017, CER-C019, CER-C028, CER-C029 | Separate effectiveness study from autonomy, vulnerable-user, accessibility, truth, reversal, governing-instrument, owner, and approver reviews | Applicable-instrument record, owner and authorized approval, comprehension, pressure, regret, reversal, and harm evidence |
| CER-G008 | What outcomes should replace weak proxies such as perceived ease, clicks, trust ratings, or neural coupling? | CER-C012, CER-C014, CER-C027 | Define task success, factual comprehension, calibrated reliance, error, recovery, autonomy, and delayed outcomes before experimentation | Approved evaluation protocol and preregistered primary outcomes |

## Promotion gate

A claim remains `proposed` or `open question` until all applicable conditions are met:

1. The exact population, task, environment, construct, and outcome match the proposed use or the transfer is explicitly tested.
2. Current systematic evidence and material counterevidence have been reviewed.
3. Cultural, localization, accessibility, and harm boundaries have been tested with affected users.
4. Controlled facts have a fit evidence source, exact current value and version, declared scope, freshness, and lineage.
5. Applicable governing instruments, accountable owners, and authorized approvers are separately recorded.
6. Product evaluation measures comprehension, task success, error, recovery, autonomy, and subgroup harm rather than conversion alone.
7. Approval, implementation, delivery, and post-release evaluation remain separate records; none is inferred from this register.
