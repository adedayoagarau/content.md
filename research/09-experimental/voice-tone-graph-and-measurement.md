---
title: Voice, tone, terminology, context graph, and measurement model
status: proposed
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
scope: A computable, auditable model for representing and evaluating organization voice, situational tone, terminology, context, and expression without reducing them to one universal style score
source_documents:
  - ../03-domain-matrix/voice-tone-terminology.md
  - ../03-domain-matrix/domain-risk-matrix.md
  - ../01-discipline/content-modeling-and-information-architecture.md
  - ../04-surfaces/interaction-pattern-content-practice.md
  - ../06-evaluation/evaluation-and-benchmarks.md
---

# Voice, tone, terminology, context graph, and measurement model

## Result

**[Proposal]** Represent content quality as a typed graph plus a gated, multidimensional measurement record. Do not represent it as a single `brand tone` value, a bag of adjectives, an embedding alone, or one score that can compensate for a false claim, inaccessible interaction, unsafe term, or missing approval.

The proposed system has four separable operations:

1. **Resolve the message context.** Link the semantic message to the event, actor, product state, consequence, risk, domain overlays, locale, cultural questions, accessibility needs, surface, controlled facts, and governing controls.
2. **Evaluate hard constraints.** Return `pass`, `fail`, `unknown`, or `not_applicable` for each approved deterministic rule. A soft score cannot rescue a hard failure.
3. **Measure conditional fit.** Report separate, uncertainty-bearing measures for organization-voice fidelity, situational-tone fit, terminology/concept fidelity, semantic preservation, naturalness, accessibility, localization, and surface fit.
4. **Preserve control-plane state.** Reference evidence, decision, delivery, approval, and evaluation records without copying their states into a synthetic confidence or maturity number.

The graph is intended to answer questions such as:

- Which approved voice principles apply to this expression?
- Why should this state be more explicit and less expressive than a routine state?
- Which concept does this label represent, and what behavior makes that representation true?
- Which domain, locale, accessibility, risk, and surface constraints apply independently?
- Which finding is deterministic, which is a calibrated prediction, and which still needs human judgment?
- Is a score comparable across candidates, contexts, surfaces, or locales—or explicitly not comparable?

This document defines an experimental representation and measurement harness. It does **not** establish universal dimensions, coefficients, thresholds, cultural preferences, legal applicability, or release criteria.

## Evidence and claim boundary

Claim labels follow the [research protocol](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary):

- **[Sourced fact]** is directly supported by a cited source within its scope.
- **[Documented practice]** reports what a named organization or practitioner says it does; it is not a universal rule.
- **[Research finding]** reports a study result within the stated method, sample, and limitations.
- **[Cross-source finding]** is supported by more than one independent source.
- **[Inference]** is this research team's interpretation of evidence.
- **[Proposal]** defines a candidate graph, feature, formula, record, harness, or operating rule.
- **[Product hypothesis]** is a candidate product behavior or pilot target that requires validation.
- **[Open question]** names an unresolved measurement or governance choice.

Source type and method are described in prose or metadata; they are not claim labels. The original repository documents retain their more precise claim labels and source scopes.

### Research basis inherited from this repository

- **[Cross-source finding]** Organization voice is a stable organizational relationship expressed through observable language and product behavior; situational tone adapts to the event, consequence, urgency, uncertainty, agency, channel, and evidenced cognitive or emotional context. See [voice, situational tone, and terminology](../03-domain-matrix/voice-tone-terminology.md#core-finding).
- **[Inference]** Industry does not determine personality. Domain overlays constrain facts, terms, disclosures, sequence, prominence, rights, recovery, evidence, and approval. Risk attaches to the particular decision and state, not to the whole application. See the [domain and risk matrix](../03-domain-matrix/domain-risk-matrix.md#the-axes-that-must-remain-separate).
- **[Inference]** A concept is not its label, a semantic model is not its storage implementation, and relations must be typed when their meanings differ. See [content modeling and information architecture](../01-discipline/content-modeling-and-information-architecture.md#terms-that-must-not-collapse-into-one-another).
- **[Inference]** A message has a semantic identity distinct from its locale-, channel-, surface-, slot-, modality-, and runtime-specific expressions. A pattern is a meaning, behavior, state, action, and recovery contract rather than a reusable sentence. See [interaction-pattern content practice](../04-surfaces/interaction-pattern-content-practice.md#identity-and-status-alignment).
- **[Proposal]** Evidence dimensions, decision state, delivery state, approval records, and evaluation results are independent records. Observation or live delivery does not create approval; approval does not prove implementation or outcome. See [orthogonal evidence dimensions and independent states](../04-surfaces/interaction-pattern-content-practice.md#orthogonal-evidence-dimensions-and-independent-decisiondelivery-states).
- **[Inference]** No single lint score, readability grade, model judge, or conversion metric establishes product-content quality. Evaluation must separate deterministic integrity, contextual review, expert review, representative-user evaluation, and longitudinal outcomes. See [evaluation and benchmarks](../06-evaluation/evaluation-and-benchmarks.md#evaluation-layers).

### External measurement evidence and its limits

| Evidence | What it can support here | What it cannot establish |
| --- | --- | --- |
| **[Research finding]** Mir et al. evaluate text style transfer on a Yelp sentiment dataset as three separate aspects: style-transfer intensity, content preservation, and naturalness, and report tradeoffs among them ([paper](https://aclanthology.org/N19-1049/)). | Keep style strength, meaning preservation, and naturalness as separate measures; inspect tradeoffs rather than selecting one opaque total. | A complete model of product voice, tone, risk, accessibility, terminology, or other domains and datasets. |
| **[Research finding]** Jin et al.'s survey of neural text style transfer describes common evaluation around transferred-style strength, semantic preservation, and fluency, and discusses weaknesses of automatic evaluation ([paper](https://doi.org/10.1162/COLI_a_00426)). | Use the three-part decomposition as a useful lower bound for evaluating rewrites. | Evidence that `style` in text-transfer datasets equals organization voice or situational tone in a product system. |
| **[Research finding]** Babakov et al. compare 57 content-preservation measures on 19 annotated datasets; cross-encoder measures perform strongly in their study, and their Mutual Implication Score models paraphrase as bidirectional entailment ([paper](https://aclanthology.org/2022.acl-srw.23/)). | Treat preservation as its own tested subsystem; evaluate both directions of semantic implication. | Proof that an entailment model preserves product behavior, legal meaning, clinical meaning, timing, recourse, or locale-specific pragmatics. |
| **[Research finding]** Briakou et al. meta-evaluate formality-transfer metrics across Brazilian Portuguese, French, and Italian rather than evaluating English alone ([paper](https://aclanthology.org/2021.emnlp-main.100/)). | Require language-specific metric validation and human correlation. | Universal multilingual validity; the study concerns formality transfer in a limited set of languages. |
| **[Research finding]** GYAFC is a formality-transfer corpus built from selected Yahoo Answers categories and discusses automatic-metric challenges ([paper](https://aclanthology.org/N18-1012/)). | A narrow public baseline for one formality task. | A brand-voice corpus, a product-UX benchmark, or representative evidence across channels, domains, cultures, and locales. |
| **[Research finding]** Danescu-Niculescu-Mizil et al. build and study a politeness classifier from annotated requests in Wikipedia and Stack Exchange communities ([paper](https://aclanthology.org/P13-1025/)). | Candidate linguistic features for the bounded act of making requests. | A culture-independent politeness standard or a general tone target for all speech acts and relationships. |
| **[Sourced fact]** The NRC VAD and Words of Warmth resource pages describe word-association scores for English terms; the VAD page explicitly warns that some machine-translated entries in its multilingual versions may be incorrect or transliterations and supplies ethics and use conditions ([lexicon index](https://saifmohammad.com/WebPages/lexicons.html), [VAD page](https://saifmohammad.com/WebPages/nrc-vad.html)). | Optional, versioned lexical signals for exploratory measurement after licensing and ethics review. | Sentence meaning, user emotion, cultural preference, respectful treatment, contextual warmth, product truth, or safe production use. |
| **[Sourced fact]** Bradley and Terry formalize ranking from paired comparisons in their original statistical method ([paper](https://doi.org/10.1093/biomet/39.3-4.324)). | A transparent candidate-ranking model within one declared dimension and comparable context stratum. | A valid ranking when comparisons are disconnected, intransitive, multidimensional, forced despite ties, or pooled across incomparable contexts. |
| **[Sourced fact]** Krippendorff's alpha measures observed disagreement relative to expected disagreement and can be configured for different measurement levels and missing ratings ([primary overview](https://eric.ed.gov/?id=ED352390)). | Report reliability of annotation separately by dimension, locale, surface, and risk. | Validity of the rubric, correctness of the majority, or permission to erase genuine expert disagreement. |
| **[Research finding]** Brier proposed a squared-error score for probabilistic forecasts ([paper](https://doi.org/10.1175/1520-0493%281950%29078%3C0001%3AVOFEIT%3E2.0.CO%3B2)); Guo et al. study confidence calibration and temperature scaling on image and document classification datasets ([paper](https://proceedings.mlr.press/v70/guo17a.html)). | Evaluate whether a detector's stated probability matches empirical correctness on held-out fixtures. | Calibration of generative truth, human judgment, or a new locale without direct validation; temperature scaling is not assumed to transfer to this system. |

## Non-negotiable separations

**[Proposal]** The implementation must preserve these as different object types and report fields:

| Object | Unit | Example question | Forbidden collapse |
| --- | --- | --- | --- |
| Organization voice | Organization/product relationship over a versioned scope | Does the product consistently enact `direct about consequences`? | `Finance = sober` or one score inferred from a single string |
| Situational tone | One semantic message in one evidenced context | How should expression change for a failed, consequential, possibly duplicated payment? | A permanent brand adjective or component preset |
| Domain constraint | One applicable product/domain overlay | Which payment states and claims require controlled meaning? | Personality, jurisdiction, or risk level |
| Locale and culture | Language/script/market structure plus evidenced local questions | Which date form, institution term, address form, or honorific applies? | National character or demographic preference |
| Accessibility | Perceivable, operable, understandable, and robust content/interaction requirements | What visible label, accessible name, error association, and status announcement are needed? | `Localization`, readability, or a generic inclusion score |
| Risk | Consequence of error or misunderstanding for this decision/state | Is this routine and reversible, or high-consequence with required recourse? | Industry, user identity, emotional valence, or approval |
| Surface/channel | Delivery and reception constraints | Can a lock-screen expression safely expose this event? | The message's semantic identity |
| Terminology | Concept, labels, behavior, locale, and governance | Does `refund` denote the actual event rather than a reversal or credit? | Corpus frequency or stylistic preference |
| Evidence | Provenanced observation with orthogonal dimensions | What was observed, corroborated, disputed, current, or inferred? | Decision, approval, delivery, or confidence |
| Decision | Authorized choice for an exact scope and version | Was this rule proposed, approved, rejected, or superseded? | Evidence strength, implementation, or evaluation result |
| Delivery | Exact occurrence and implementation state | Was this mapped, built, verified, released, or observed live? | Approval or user success |
| Evaluation | Method, sample, result, uncertainty, and limits | What did a test establish within its conditions? | Canon, approval, or delivery status |

# Part I — Typed graph ontology

## 1. Formal model

**[Proposal]** Use a versioned heterogeneous property graph:

```text
G = (V, E, tau_V, tau_E, A_V, A_E, g_version)

tau_V : V -> NodeType
tau_E : E -> EdgeType
E subseteq V x EdgeType x V
A_V(v) = typed node attributes
A_E(e) = typed edge attributes, including scope and provenance
```

Every edge type has a declared domain, range, direction, cardinality, and non-entailment rule. A graph snapshot is valid only if its referential, type, scope, and lifecycle constraints pass. The graph may be implemented in JSON/YAML, relational tables, a property graph, RDF, or another store; the semantic model is not its storage technology.

`g_version` identifies the graph snapshot used for an evaluation. Time-sensitive nodes and edges also carry `valid_from`, `valid_until`, or `review_on` as applicable. Deleting history is not a substitute for supersession.

## 2. Node types

| Node type | Purpose | Minimum fields | Important non-entailment |
| --- | --- | --- | --- |
| `OrganizationVoiceProfile` | Versioned, organization-owned voice scope | `id`, product/org scope, principles, owner, decision reference, version | Does not set situational tone or domain law |
| `VoicePrinciple` | Stable relationship principle with observable behavior | reason, behaviors, avoidances, exceptions, examples/counterexamples | An adjective alone is not a principle |
| `TonePolicy` | Approved or proposed mapping from evidenced context to target ranges | context predicates, target feature intervals, monotonic rules, exceptions | Does not modify the organization voice record |
| `MessageContext` | One resolved context for a semantic message | event, actors, goal, state, consequence, reversibility, urgency, uncertainty, agency, responsibility, entry point | Does not infer emotion or culture from demographics |
| `DomainOverlay` | Bounded product/domain constraints | domain and subdomain, facts/terms, required review, scope, version | Does not assign personality or automatically establish jurisdiction |
| `RiskAssessment` | Consequence classification for a decision/state | level, harm paths, exposure, reversibility, recovery, rationale, owner | Does not apply to the whole app by default |
| `LocaleProfile` | Language/script/market structural requirements | BCP 47 tag, script/direction, formats, institutions, fallback, local review | Language tag alone does not establish culture or jurisdiction |
| `CulturalQuestion` | A potentially relevant, unresolved or evidenced cultural consideration | proposition, evidence, community/locale, status, prohibited inference | A question is not a preference rule |
| `AccessibilityRequirement` | Content and interaction requirement for an access need or conformance target | modality, semantic role, behavior, test method, applicability | Does not collapse language access into disability access |
| `SurfaceProfile` | Channel/component/modality constraints | channel, component, slot, privacy, interruption, length, semantics, fallback | Does not change the semantic message or product truth |
| `SemanticMessage` | Stable meaning and content-decision identity | product, journey, event, actor/need, semantic state, content job, represented concept/action | Is not a literal string or delivery occurrence |
| `Expression` | Locale/channel/surface-specific realization | text/structured slots, locale, channel, surface, modality, runtime condition | One expression is not universal canonical wording |
| `ImplementationOccurrence` | Exact source or runtime location | repository/design/CMS/API coordinates, key, component, condition, environment | Presence or frequency does not mean approved |
| `Concept` | Stable semantic identity independent of labels | definition, boundaries, examples, counterexamples, scheme | Label changes do not create a new concept by default |
| `TermLabel` | Locale- and scope-specific label for a concept | lexical form, language/locale, status, grammatical notes, restrictions | Preferred in one scope does not mean preferred globally |
| `BehaviorContract` | Trigger, actor, state, effect, timing, reversibility, and recovery that make an action/state term true | preconditions, transition, postconditions, failure/partial states | Wording cannot manufacture the behavior |
| `ControlledFact` | A fact or claim whose truth constrains expression | value/source, owner, applicability, freshness, version | A fluent paraphrase is not evidence of truth |
| `GoverningInstrument` | Law, policy, standard, contract, or other control with separately decided applicability | instrument, jurisdiction/scope, effective period, applicability record | Topical relevance does not prove applicability |
| `ConstraintRule` | Deterministic or advisory rule with exact scope | predicate, severity, mode, source decision, exception policy, tests | A probabilistic style judgment is not deterministic because it is encoded |
| `FeatureDefinition` | Versioned definition of an observable measurement | construct, extractor, scale, anchors, normalization, limits | A detector output is not the construct itself |
| `EvidenceSource` | Provenanced evidence with orthogonal evidence dimensions | coordinates, type/role, fitness, observation/challenge/freshness/lineage/epistemic fields | Evidence does not approve a decision |
| `DecisionRecord` | Independent decision lifecycle | exact object/version/scope, state, rationale, history | Does not establish delivery |
| `SemanticDecisionApproval` | Authorized acceptance of exact governed meaning for a defined scope when required | decision ID/version, approver, locale/jurisdiction scope, conditions, date/expiry | Mutation, release-risk acceptance, or task capability |
| `MutationChangeApproval` | Mandatory acceptance of an exact source-of-truth diff or publication transaction | transaction/diff/targets/base/environment, approver, conditions, date/expiry | Semantic approval, release approval, or task capability |
| `ReleaseApproval` | Acceptance of residual risk for an exact build/exposure when release policy requires it | build/artifact, audience, locale/market, environment/window, residual risks, approver, conditions, date/expiry | Semantic approval, mutation approval, or publication capability |
| `ConnectionAuthorization` | Current scoped control-plane record for access to a named connector/resource | principal/client/workspace, scopes/operations, purpose, expiry, revocation check/path | Authorization for any particular task operation |
| `DataProcessingAuthorizationRecord` | Scoped decision and inventory for declared data processing | purpose, data classes/fields, provider/path/region, retention, expiry/revocation | Task capability or legal applicability by itself |
| `PersistenceDecision` | Scoped decision permitting named records/fields to persist beyond a task | record types/fields, purpose, exact store/region/isolation, retention/deletion, owner/approver, issue/version/expiry/revocation | Permission to persist other data, append a record, or run a task |
| `TelemetryDecision` | Scoped decision permitting named events/fields to be emitted | event schema, destination, redaction, purpose, retention, expiry/revocation | Capability for the observed operation |
| `PhaseGateResult` | Current evaluated eligibility of an exact canonical capability implementation/profile | result ID/version, canonical phase and mapped SEC-P0 gate, implementation/profile, result, gate-policy version, issuance/validity/expiry/current-state check | Authorization to perform a task |
| `CapabilityGrant` | Exact, independently issued authorization for one authenticated task operation | grant ID/version/issuer/issuance, principal/workload binding, canonical phase, policy version, operation/tool/resource, data/egress/environment boundary, expiry, current revocation check/path | Approval of content meaning, mutation, release, or permission for another operation |
| `ChangeTransaction` | Scope-locked set of proposed or executed source-of-truth operations | exact operations/targets/base, gate and grant refs, applicable control refs, approvals, preview/result/readback | A prompt, operating mode, or approval as task authorization |
| `ReleaseRecord` | Exposure record for an exact build/artifact and audience | build, environment, audience, locale/flags/time, publication transaction, conditional release approval | Approval, successful delivery, or user outcome by itself |
| `DeliveryRecord` | Independent delivery lifecycle for an exact occurrence | state, environment, build/release, implementer, timestamps | Does not establish approval or outcome |
| `EvaluationRecord` | Versioned evaluation event, ephemeral by default and immutable once separately appended | object, question, method, sample, result, uncertainty, limitations, evaluator, execution-control and persistence disposition | Does not change evidence, decision, or delivery state; immutability does not itself authorize persistence |
| `Rater` | Qualified evaluator profile for a study | expertise, languages/locales, conflict disclosure, anonymized ID | Demographic identity is not a style target |
| `BenchmarkFixture` | Reproducible scenario and expected outcomes | graph snapshot, context, candidates, annotations, split, severity | Synthetic ground truth is not production truth |

## 3. Edge types

| Edge type | Domain -> range | Meaning | Required edge data | Must not imply |
| --- | --- | --- | --- | --- |
| `HAS_PRINCIPLE` | `OrganizationVoiceProfile -> VoicePrinciple` | Profile contains the principle | order/weight if any | Same intensity in every context |
| `APPLIES_TO_MESSAGE` | rule/profile/overlay/requirement -> `SemanticMessage` | Scoped applicability was resolved | resolver, scope, rationale, time | Approval or truth of the target expression |
| `IN_CONTEXT` | `SemanticMessage -> MessageContext` | Message is evaluated in this context | context version | A literal expression |
| `MODULATED_BY` | `SemanticMessage -> TonePolicy` | Tone policy supplies conditional target ranges | matched predicates and rule trace | Mutation of organization voice |
| `HAS_RISK` | `SemanticMessage -> RiskAssessment` | Risk assessment applies to this decision/state | rationale and assessor | Domain-wide risk |
| `HAS_DOMAIN_OVERLAY` | `SemanticMessage -> DomainOverlay` | Domain pack is relevant and applicable at the declared product scope | applicability evidence | Jurisdictional applicability by itself |
| `FOR_LOCALE` | message/expression -> `LocaleProfile` | Locale profile applies | fallback and review status | Culture-wide preference |
| `RAISES_CULTURAL_QUESTION` | message/expression -> `CulturalQuestion` | A question needs evidence or review | trigger and disposition | A rule that may be enforced |
| `REQUIRES_ACCESSIBILITY` | message/expression/surface -> `AccessibilityRequirement` | Requirement applies to the experience | criterion/source and test | That static text alone satisfies it |
| `ON_SURFACE` | `Expression -> SurfaceProfile` | Expression is rendered/delivered under this contract | slot/modality/runtime condition | Semantic equivalence with another expression |
| `EXPRESSES` | `Expression -> SemanticMessage` | Expression realizes the semantic decision | mapping type, loss/ambiguity | Word-for-word interchangeability |
| `REPRESENTS_CONCEPT` | message/expression/term -> `Concept` | Object represents the concept | role and scope | Preferred label or exact equivalence |
| `LABEL_FOR` | `TermLabel -> Concept` | Label names the concept in a scope | label status, locale, surface | Same behavior across products/locales |
| `BINDS_TO_BEHAVIOR` | term/message -> `BehaviorContract` | Meaning is constrained by actual behavior | mapping/version | That the behavior exists or is approved |
| `CONSTRAINED_BY` | message/expression -> fact/instrument/rule | Target must respect the referenced control | applicability and property constrained | One universal precedence order |
| `SUPPORTED_BY` | any claim-bearing node/edge -> `EvidenceSource` | Evidence supports a named property | exact claim and fitness | Approval, applicability, or lack of conflict |
| `CHALLENGED_BY` | any claim-bearing node/edge -> `EvidenceSource` | Evidence disputes a named property | exact conflict | Automatic rejection or replacement |
| `HAS_DECISION` | governed object -> `DecisionRecord` | Object has an independent decision record | version alignment | Delivery, evaluation, or approval |
| `HAS_SEMANTIC_APPROVAL` | `DecisionRecord -> SemanticDecisionApproval` | Exact semantic decision has its separately applicable approval | exact scope/version alignment | Mutation, release, capability, implementation, or outcome |
| `HAS_MUTATION_APPROVAL` | `ChangeTransaction -> MutationChangeApproval` | Exact change transaction has mandatory change-plane approval | diff/target/base alignment | Semantic or release approval; task capability |
| `HAS_RELEASE_APPROVAL` | `ReleaseRecord -> ReleaseApproval` | Exact release carries required residual-risk acceptance | build/exposure alignment | Semantic or mutation approval; publication capability |
| `IMPLEMENTED_AT` | `Expression -> ImplementationOccurrence` | Expression maps to an exact occurrence | mapping type and verification time | Released or live state |
| `HAS_DELIVERY` | `ImplementationOccurrence -> DeliveryRecord` | Occurrence has independent delivery history | occurrence/build alignment | Approval or user success |
| `EVALUATED_BY` | any evaluable object -> `EvaluationRecord` | Evaluation addressed a named question | evaluation version | Canonical truth |
| `SUPERSEDES` | versioned node -> same node type | New version replaces old version for declared scope | effective date and migration | Deletion of history or exact equivalence |
| `CONFLICTS_WITH` | evidence/rule/term/mapping -> compatible type | A named property cannot presently be reconciled | property, scope, severity, resolution owner | Which side is correct |
| `TRANSLATION_OF` | `Expression/TermLabel -> Expression/TermLabel` | Human or machine translation relation | source/target locale, method, review | Semantic or pragmatic equivalence |
| `COUNTERFACTUAL_OF` | `BenchmarkFixture -> BenchmarkFixture` | Pair differs in declared variables only | changed and held-constant fields | That real-world causal assumptions are proven |

## 4. Graph invariants

**[Proposal]** Validate these mechanically where the required data is present:

1. Every `Expression` has exactly one `EXPRESSES` edge to a `SemanticMessage` version, while a `SemanticMessage` may have many expressions.
2. Every `TermLabel` has one `LABEL_FOR` concept within a scheme; homographs are separate label nodes that may point to distinct concepts.
3. `TRANSLATION_OF`, `close_match`, and `exact_match` are different relations. None is inferred from text similarity.
4. A `ConstraintRule` with `mode: hard` must reference a current deterministic decision in `approved` state and its exact approval record before enforcement eligibility; encoding a rule does not authorize enforcement.
5. Evidence fields retain all five orthogonal dimensions. No property called `confidence` may replace them.
6. Decision and delivery states occur only on their respective record types. An `EvaluationRecord` cannot set either state.
7. A `MessageContext` that uses a protected attribute, nationality, language, disability, or demographic proxy as a tone feature fails schema validation unless the field is an explicitly approved functional requirement and records its purpose, evidence, and review.
8. `RiskAssessment` belongs to a semantic decision/state. Reusing it across messages requires an explicit `APPLIES_TO_MESSAGE` edge, not inheritance from domain or route.
9. Every computed result identifies graph, feature-definition, rule, calibration, and rubric versions.
10. Missing context is represented as `unknown`, not zero, neutral, average, or a guessed default.

# Part II — Context and feature representation

## 5. Context is structured, not a demographic embedding

**[Proposal]** Let the resolved context for semantic message `m` be a typed product rather than an undifferentiated vector:

```text
C(m) = C_event x C_actor x C_goal x C_state x C_consequence
       x C_reversibility x C_urgency x C_uncertainty x C_agency
       x C_responsibility x C_relationship x C_entry
       x C_domain x C_locale x C_culture_questions
       x C_accessibility x C_risk x C_surface x C_facts x C_controls
```

`x` means these families are kept separately. A model adapter may encode or concatenate them for computation, but the source record and explanation must retain the family boundaries.

Recommended bounded context features for a first harness:

| Family | Candidate features | Representation | Forbidden inference |
| --- | --- | --- | --- |
| Event/state | success, pending, partial, user-correctable error, system failure, denial, enforcement, loss, crisis | enum/multilabel plus state-model link | `error` from component name alone |
| Consequence | money, access, data, rights, health, safety, reputation, third parties | typed affected objects plus magnitude band | Risk from emotionally negative words |
| Reversibility/recovery | immediate undo, correction, appeal, retry safety, support, none/unknown | typed capabilities with behavior links | Recovery from a CTA label alone |
| Urgency | deadline/source/time-to-harm | timestamp/evidence, not an adjective | Business priority as user urgency |
| Uncertainty | fact unknown, claim uncertain, timing uncertain, applicability unresolved | typed uncertainty reason | Model probability as product uncertainty |
| Agency/responsibility | actor who caused state; actor who can act; system obligation | roles and actions | Blaming the person because input is involved |
| Relationship/expertise | authenticated role, established relationship, task expertise | explicit role/research/profile | Age, nationality, job title, or locale as expertise proxy |
| Locale/culture | language, script, direction, formats, institutions, evidenced local decisions, unresolved questions | references to profile/questions | `Users in country X prefer...` |
| Accessibility | semantic roles, visible/assistive modalities, timing, input, communication support | requirement references | Disability as tone, emotion, or literacy proxy |
| Risk | level plus harm paths, exposure, reversibility, recovery | independent assessment record | Domain-wide default without state analysis |
| Surface | channel, privacy, interruption, slot, truncation, modality, persistence | surface profile | Surface as message meaning |

## 6. Organization-voice representation

**[Proposal]** A voice profile combines behavioral principles with descriptive feature ranges. Behavioral principles are primary; numeric dimensions make differences discussable and testable but do not define the brand by themselves.

Candidate feature families inherited from the voice research are:

- directness;
- social distance;
- warmth;
- expressiveness;
- communicative stance and role truth;
- technical density;
- optimism; and
- anthropomorphism.

Each numeric feature uses a declared `[0,1]` operational scale with positive and negative anchors. `1` is not `better`; it means more of the named construct under the feature definition. For example, `expressiveness = 1` means a high observed use of the approved markers of metaphor, rhythm, humor, or personality—not maximum quality.

Voice is evaluated across a context-balanced set, not certified from one sentence. A voice principle may also impose categorical behavior, such as `state material consequences before reassurance`, which belongs in a rule or human rubric rather than a lexical scalar.

## 7. Situational-tone representation

**[Proposal]** Tone uses a separate feature space because it answers a different question. A minimal tone vector can contain:

```text
tau = [explicitness, warmth, expressive_restraint, urgency,
       uncertainty_calibration, accountability, agency_support,
       deference_noncoercion, emotional_presumption_avoidance,
       information_density]
```

Some names are directional (`expressive_restraint`); feature definitions must state direction to prevent a score from being read backward.

For context `c`, a `TonePolicy` returns target intervals, not a fixed universal point:

```text
I_tau(c) = { i -> [lower_i(c), upper_i(c)] }
```

A transparent first implementation should use matched decision-table rules. An experimental learned controller may use:

```text
tau*_k(c) = clip(beta_0k
                 + sum_j beta_jk * c_j
                 + sum_(p,q in approved_interactions) gamma_pqk * c_p * c_q,
                 0, 1)
```

Conditions on that controller:

- every input is on an allowlist and maps back to a typed context field;
- every nonzero coefficient or interaction has a rule/evaluation trace;
- sign constraints can enforce approved monotonic relations, such as increasing explicitness when verified consequence rises;
- protected attributes and demographic proxies are excluded from generation-time tone inputs;
- coefficients are organization-, task-, language-, and calibration-version specific;
- the output is a target proposal or evaluation expectation, never an approval; and
- a learned controller is rejected if a simpler rule table performs comparably with better interpretability.

Tone targets may narrow or change the allowed expression of voice in a situation. They never write their values back into the organization voice profile.

## 8. Terminology and semantic representation

**[Proposal]** Terminology measurement operates on the concept graph, not string frequency alone. For every concept required by a message, resolve:

- concept identity and boundaries;
- relevant behavior contract;
- preferred, allowed, hidden/search, deprecated, prohibited, and confusable labels by locale and surface;
- controlled facts and governing applicability;
- exact semantic-decision state and approval; and
- expression and implementation occurrences.

Terminology measures should remain separate:

| Measure | Question | Typical mode |
| --- | --- | --- |
| Concept coverage | Are all required concepts represented? | Deterministic plus semantic review |
| Concept fidelity | Does the expression preserve the concept boundary? | Human/domain review; model signal may assist |
| Label compliance | Is an approved/prohibited label used in exact scope? | Deterministic when the rule is exact |
| Behavioral truth | Does the term match trigger, state, effect, timing, and recovery? | Contract test and specialist review |
| Confusion risk | Could this label be mistaken for a distinct concept? | Pairwise comprehension and contextual review |
| Locale fit | Is the approved in-market label and grammatical form used? | TMS/term check plus local-language review |

## 9. Feature observations

**[Proposal]** Every computed feature is an observation with method and limits, not a property asserted directly on the expression:

```text
FeatureObservation = {
  feature_definition_id,
  subject_id,
  context_id,
  raw_value,
  normalized_value,
  scale,
  method: deterministic | model | lexicon | human | user_study | telemetry,
  evidence_spans,
  coverage,
  standard_error_or_interval,
  calibration_profile_id,
  comparable_scope,
  limitations,
  created_at
}
```

Candidate extractor families include:

- deterministic structural features: sentence/turn count, required slot presence, CTA/behavior mapping, controlled-term use, placeholder integrity, accessible-name parity;
- interpretable linguistic markers: hedges, modals, imperatives, actor naming, passive/active constructions, apologies, exclamation, metaphor, first/second person, uncertainty phrases;
- locale-calibrated distributional features: length, syntactic depth, term density, lexical familiarity, with the reference corpus declared;
- human or user ratings anchored by examples and counterexamples;
- model judgments with evidence spans, an `insufficient_evidence` option, and held-out calibration; and
- optional lexicon or embedding signals used only as fallible inputs, never as hard evidence of emotion, culture, voice, or quality.

# Part III — Mathematical measurement model

## 10. Normalize only within a declared measurement scope

**[Proposal]** Every raw feature `z_i` declares its valid domain, direction, reference population, language, surface, and version. For a naturally bounded measure with bounds `[a_i, b_i]`:

```text
x_i = clip((z_i - a_i) / (b_i - a_i), 0, 1)
```

For an unbounded or corpus-relative feature, use robust anchors fixed on the development set:

```text
x_i = clip((z_i - q_05,i) / (q_95,i - q_05,i), 0, 1)
```

where `q_05,i` and `q_95,i` are pre-registered reference quantiles for the exact language, surface, message family, and metric version. Report clipping rates. If the denominator is zero, the feature is invalid for that stratum; do not silently return `0.5`.

For an ordinal human scale `r in {1, ..., K}`:

```text
x = (r - 1) / (K - 1)
```

This transformation makes endpoints comparable within that rubric; it does not make intervals psychologically equal or scores comparable across cultures or rubrics. Retain the original rating.

## 11. Distance to an allowed target interval

**[Proposal]** A target is an interval `I_i(c) = [l_i(c), u_i(c)]`, because several expressions may fit the same decision. For a normalized observation `x_i`:

```text
dist(x_i, I_i) =
  l_i - x_i,  if x_i < l_i
  0,          if l_i <= x_i <= u_i
  x_i - u_i,  if x_i > u_i

fit_i = clip(1 - dist(x_i, I_i) / rho_i, 0, 1)
```

`rho_i` is a predeclared tolerance radius on the normalized scale. It is learned or set from approved anchors and then locked before holdout evaluation. `fit_i = 1` means inside the allowed interval, not perfect universal quality.

If `x_i` has uncertainty interval `[x_i^-, x_i^+]`, calculate a fit interval:

```text
fit_i^- = min_{x in [x_i^-, x_i^+]} fit(x, I_i)
fit_i^+ = max_{x in [x_i^-, x_i^+]} fit(x, I_i)
```

If a decision threshold lies inside `[fit_i^-, fit_i^+]`, return `review` or `insufficient_evidence` according to the risk policy; do not choose the favorable endpoint.

## 12. Hard constraints use four-valued results, not scores

**[Proposal]** For each applicable hard rule `h_j`, return:

```text
h_j(y, c) in {PASS, FAIL, UNKNOWN, NOT_APPLICABLE}
```

The gate result is:

```text
H(y, c) = FAIL
  if any applicable h_j = FAIL

H(y, c) = UNKNOWN
  if no h_j = FAIL and any required applicable h_j = UNKNOWN

H(y, c) = PASS
  if every required applicable h_j = PASS

H(y, c) = NOT_APPLICABLE
  only if the fixture has no applicable hard rules
```

Examples of potential hard checks, only after the repository's enforcement prerequisites are satisfied, include:

- a controlled fact is contradicted;
- a required concept, disclosure element, or recovery field is absent;
- an approved prohibited term appears within its exact scope;
- a CTA label conflicts with the verified action contract;
- a variable, selector, locale key, markup token, or language tag is broken;
- user-visible content exposes a prohibited identifier, secret, or private value;
- a visible label and required accessible name disagree deterministically;
- string concatenation violates an approved localizability contract; or
- an exact high-risk rule lacks the required current decision/approval/applicability reference.

`UNKNOWN` is not half a pass. In high-consequence contexts it normally blocks autonomous progression pending the missing fact, applicability decision, owner, approval, or test. In lower-risk contexts it may allow an explicitly labeled draft while preserving the unknown.

## 13. Soft measures remain a vector

**[Proposal]** For every candidate expression `y` in context `c`, report at least:

```text
S(y, c) = {
  organization_voice: [fit_1, ..., fit_p],
  situational_tone: [fit_1, ..., fit_q],
  terminology: [coverage, fidelity, locale_fit, confusion_risk],
  semantic_preservation: [claim_slot_coverage, forward_implication,
                          reverse_implication, contradiction_risk],
  naturalness: [human_rating, model_signal],
  accessibility: [deterministic_results, contextual_ratings],
  localization: [structural_results, in_market_ratings],
  surface_fit: [privacy, hierarchy, interruption, truncation, modality],
  uncertainty: [...]
}
```

The default output is this scorecard plus evidence and confidence intervals. It is not a total.

### Optional within-context ranking summary

**[Proposal]** When a benchmark or product decision requires one ranking inside one fixed, comparable context, an explicitly configured weighted geometric mean can summarize eligible soft dimensions:

```text
Q_soft(y | c, W) = exp(
  sum_i w_i(c) * log(max(epsilon, fit_i(y,c))) / sum_i w_i(c)
)
```

Conditions:

- compute `Q_soft` only when `H(y,c) = PASS`;
- publish all component scores, weights, floors, missing values, and uncertainty;
- weights are decision-specific and versioned, not inferred from domain labels;
- mandatory dimensions may have independent minimum floors;
- do not compare totals across contexts, risks, surfaces, languages, or rubric versions without demonstrated measurement comparability; and
- never use `Q_soft` to infer approval, implementation, release, or user outcome.

The geometric mean makes a very low component difficult to average away, but it still encodes value judgments. A Pareto frontier or per-dimension pairwise comparison is preferred when candidates trade meaning, voice, tone, and naturalness.

## 14. Voice fidelity is a set-level measure

**[Proposal]** Let `D` be a context-balanced evaluation set and `P` the approved voice principles. For principle `p`, score observable behaviors across eligible fixtures:

```text
V_p(D) = sum_(f in D) omega_f * behavior_fit(p, f)
         / sum_(f in D) omega_f
```

Report `V_p` by risk, event, surface, and locale with a clustered confidence interval. A profile-level vector is:

```text
V(D) = [V_1(D), ..., V_|P|(D)]
```

Do not certify organization voice from a single expression. A message can intentionally be less expressive in a crisis while still enacting the same principles of directness, respect, or role truth.

## 15. Tone fit is context-conditional

**[Proposal]** Given target intervals `I_tau(c)` and observed tone features `tau_hat(y,c)`:

```text
T(y,c) = [fit(tau_hat_1, I_tau,1(c)), ...,
          fit(tau_hat_q, I_tau,q(c))]
```

The evaluator must output the context-to-target trace:

```text
context fact -> matched tone rule -> target interval -> observed evidence -> fit
```

If the system cannot establish the event, consequence, reversibility, responsibility, or urgency that a tone rule depends on, the affected dimension is `unknown`. It must not substitute a generic `empathetic` target.

## 16. Meaning preservation and naturalness stay separate

**[Proposal]** Decompose meaning preservation into typed semantic obligations:

```text
M(y,m) = {
  required_claim_slots,
  prohibited_claims,
  actor_action_object,
  state_and_timing,
  consequence,
  recovery_and_alternatives,
  uncertainty_and_source,
  concept_and_behavior_bindings
}
```

Exact, structured slots use deterministic comparison when possible. For exploratory automatic comparison, store both implication directions separately:

```text
p_forward = P(reference meaning implies candidate meaning)
p_reverse = P(candidate meaning implies reference meaning)
S_bi = min(p_forward, p_reverse)
```

`S_bi` is a deliberately conservative **minimum-direction score**, inspired by bidirectional-entailment evaluation; it is not a probability that both implications hold, a Fréchet lower bound, or the exact Mutual Implication Score implementation. If a joint-event probability were actually needed from only the two marginals, the Fréchet lower bound would be `max(0, p_forward + p_reverse - 1)`, but dependence and model-validity assumptions would still need direct justification. The evaluator must report the two directions separately, contradiction probabilities, and the claims that produced them. High-risk factual, legal, clinical, financial, privacy, security, or safety meaning still requires the applicable specialist and user-context review.

Naturalness or fluency is reported independently. A fluent false claim fails; an accurate but awkward expression may remain eligible for revision. Neither is averaged into `style strength` before diagnosis.

# Part IV — Uncertainty, confidence, and calibration

## 17. Do not call every unknown `confidence`

**[Proposal]** Record at least six different kinds of uncertainty:

| Uncertainty | Example | Representation | Operational effect |
| --- | --- | --- | --- |
| Evidence uncertainty | A product behavior is observed once and disputed by policy | The five evidence dimensions plus conflict links | Retrieve/corroborate; never convert to approval |
| Applicability uncertainty | A rule may not govern this market or role | Applicability record state and accountable resolver | Block governed high-risk use until decided |
| Context uncertainty | It is unknown whether a payment completed | Typed unknown on semantic state | Require uncertainty-preserving content and safe recovery |
| Measurement uncertainty | Raters disagree on whether warmth is proportionate | Distribution, standard error/interval, rater records | Report interval and disagreement; review rubric/context |
| Model uncertainty | A detector assigns `0.64` probability to `blaming language` | Calibrated probability plus profile/version | Compare with held-out correctness; allow abstention |
| Outcome uncertainty | A clear label may or may not improve task success | Hypothesis and user/production evaluation record | Do not infer from copy score |

Evidence strength, model probability, inter-rater agreement, decision state, delivery state, and user-outcome evidence are never substituted for one another.

## 18. Calibrate probabilistic findings

**[Proposal]** A model or classifier may emit a probability only for a clearly defined event, such as `the candidate violates approved rule R` or `qualified raters will mark tone dimension d outside the target range`. Calibrate that event on held-out examples from the same declared scope.

For binary outcomes `y_n in {0,1}` and predicted probabilities `p_n`, report the Brier score:

```text
Brier = (1/N) * sum_n (p_n - y_n)^2
```

Also report a reliability table or diagram. A bin-based expected calibration error may be included:

```text
ECE = sum_(b=1..B) (|B_b| / N) * |accuracy(B_b) - confidence(B_b)|
```

ECE depends on binning and can hide local errors. Therefore also publish bin counts, confidence intervals, maximum observed gaps, Brier score, discrimination metrics, and calibration by risk, rule family, locale, surface, and message family. When sample size is inadequate, mark the profile `uncalibrated` rather than borrowing an English or low-risk calibration.

For continuous or ordinal ratings, compare predicted values with mean or distributional human judgments on held-out items and report error, rank correlation, prediction-interval coverage, and calibration plots. A correlation without calibrated scale agreement is insufficient.

Post-hoc methods such as temperature scaling are experiments, not defaults. Fit them on a calibration split, lock them before the holdout run, and revalidate after model, prompt, feature, corpus, locale, or rubric changes.

## 19. Confidence intervals and clustering

**[Proposal]** Use uncertainty procedures that match the sampling unit:

- bootstrap by semantic message or context family, not by individual rating alone, when several candidates or raters share a message;
- stratify or cluster by locale, surface, domain overlay, and risk when those are evaluation strata;
- report the number of messages, candidates, raters, and independent context families;
- avoid treating repeated model runs as independent user evidence; and
- pre-register whether intervals are percentile, basic, BCa, Bayesian credible intervals, or another method.

For a weighted mean `mu_hat = sum_i w_i x_i / sum_i w_i`, do not report a textbook independent-observation standard error when weights or repeated contexts create dependence; use the declared clustered procedure.

## 20. Decision policy under uncertainty

**[Proposal]** The harness may recommend `eligible`, `revise`, `human_review`, `insufficient_evidence`, or `blocked`. It must not approve, release, or mutate a decision record.

A risk-specific action policy can be written as expected loss:

```text
a* = argmin_(a in Actions) sum_y L_c(a,y) * P(y | observations)
```

where `L_c` is an explicitly approved cost matrix for the context and `y` is a defined evaluation event. This formulation makes tradeoffs inspectable; it does not discover the acceptable cost of harm. Product, domain, accessibility, locale, safety, and governance owners set those costs and review them.

Minimum precedence:

1. Any hard `FAIL` -> `blocked`.
2. A required hard `UNKNOWN` -> `insufficient_evidence` or `human_review` according to the predeclared risk policy.
3. Mandatory human/specialist review for the context -> `human_review`, regardless of soft score.
4. Only hard-eligible candidates enter soft comparison.
5. A calibrated soft interval crossing a required floor -> `human_review` or `revise`, never an optimistic pass.

### Hard eligibility and measurement comparability are independent

**[Proposal]** Never use `comparable` as a synonym for `eligible`. Hard eligibility answers whether a candidate may enter comparative ranking at all. Measurement comparability answers whether one declared dimension is supported for the two candidates in the same versioned stratum. A pair can be measurement-comparable while one candidate is ineligible because a hard rule is `FAIL` or `UNKNOWN`; two candidates can both hard-pass while the requested measure is unsupported across their locales, surfaces, contexts, or rubric versions.

For candidate `y`, define hard comparison eligibility only from an immutable hard-gate result:

```text
E_hard(y,c) = true  iff H(y,c) = PASS
E_hard(y,c) = false iff H(y,c) in {FAIL, UNKNOWN, NOT_APPLICABLE}
```

`NOT_APPLICABLE` does not become a comparison pass: a comparison protocol that permits a no-hard-rules stratum must issue an explicit `PASS` evaluation under a rule-set version whose applicability check itself passed. For pair `(A,B)`, dimension `d`, and context stratum `c`:

```text
E_compare(A,B,d,c) = E_hard(A,c) and E_hard(B,c)
                     and M(A,B,d,c) = SUPPORTED
```

where measurement comparability `M` is one of `SUPPORTED`, `UNSUPPORTED`, or `UNKNOWN`. Both `UNSUPPORTED` and `UNKNOWN` make `E_compare = false`. Every pairwise request must carry external references to two immutably persisted `PASS` evaluation records, including record/result versions and content hash, candidate/context identities, graph/rule-set versions, and the required hard-check `PASS` references. The harness revalidates those bindings and recomputes the declared hash contract; a caller-supplied boolean or hash is never sufficient.

## 21. Independent state records remain untouched

**[Proposal]** An evaluation result references, but never rewrites, the independent records:

```text
evidence_refs: [evidence:...]
decision_ref: decision:...       # may still be proposed/question
semantic_decision_approval_refs: []
mutation_change_approval_refs: []
release_approval_refs: []        # all three are independently applicable and exact-scope
delivery_refs: [delivery:...]    # may be observed-live without approval
evaluation_id: evaluation:...    # this run
recommendation: human_review     # not a state transition
```

Examples of invalid derived claims:

- `confidence > 0.9`, therefore `decision_state = approved`;
- `delivery_state = observed-live`, therefore the term is canonical;
- `evidence = corroborated`, therefore the rule is enforceable;
- `Krippendorff alpha = 0.85`, therefore the output is correct;
- `Q_soft = 0.92`, therefore release is safe.

# Part V — Counterfactual, pairwise, and rater evaluation

## 22. Counterfactual test families

**[Proposal]** A counterfactual fixture pair changes one declared factor while holding the semantic message and other relevant controls constant. The purpose is to test a stated invariance or monotonicity hypothesis, not to claim a causal law about real people.

| Pair | Changed factor | Expected behavior | Failure signal |
| --- | --- | --- | --- |
| Consequence | routine preference -> permanent account/data loss | explicitness and consequence detail do not decrease; expressive flourish normally narrows under an approved policy | Same playful copy or lower disclosed consequence |
| Reversibility | immediate undo -> no practical reversal | review/confirmation and recovery detail increase where policy requires | Identical commitment treatment without rationale |
| Responsibility | person-correctable input -> system/dependency failure | blame/accountability language changes while the action remains truthful | System failure still blames the person |
| State | queued -> completed | completion claim changes only when behavior evidence changes | `Done` remains in the queued state |
| Uncertainty | completion confirmed -> status unknown | calibrated uncertainty appears and unsafe retry is suppressed | False certainty or generic retry |
| Urgency | verified deadline -> no deadline | urgency markers decrease | Artificial scarcity or alarm remains |
| Surface | authenticated UI -> lock-screen push | privacy-safe detail changes while core event/action continuity is retained | Sensitive details leak or action becomes ambiguous |
| Accessibility | visible-only -> screen-reader/status-announcement scenario | semantic relationships remain and programmatic content is added/tested | A visual paraphrase loses the decision or state |
| Locale | locale A -> locale B with approved profile | structure, formats, terms, and grammar adapt; semantic obligations remain | English order or term is copied without local evidence |
| Domain composition | commerce only -> commerce + child + chance-based purchase | required controls compose; personality is not inferred | Playfulness hides money, odds, or permission |
| Protected-attribute swap | names/pronouns or demographic cues change without a relevant functional requirement | score, recommendation, and operative content remain invariant within tolerance | Tone, deference, competence, risk, or support changes without evidence |
| Cultural evidence | locale tag only -> explicit approved in-market finding | adaptation changes only after the evidence/rule appears | Nationality or language alone activates a stereotype rule |

For a scalar feature or fit score `s`, define counterfactual difference:

```text
Delta_cf = s(y, c') - s(y, c)
```

For a monotonic rule with expected direction `d in {-1,+1}`:

```text
monotonic_pass = 1[d * Delta_cf >= -epsilon]
```

For an invariance rule:

```text
invariance_pass = 1[abs(Delta_cf) <= epsilon]
```

`epsilon` is feature-, method-, and stratum-specific and fixed before holdout evaluation. Evaluate both score changes and generated-content changes. A stable score can hide a materially different sentence.

## 23. Pairwise comparisons

**[Proposal]** For contextual dimensions that raters judge more reliably by direct comparison, present two candidates in the same rendered context and ask one question at a time, for example:

- Which candidate makes the actual state and consequence easier to understand?
- Which better enacts the named voice principle without hiding meaning?
- Which has tone more proportionate to this event?
- Which sounds more natural in this locale?

Every response permits `A`, `B`, `indistinguishable`, `both unacceptable`, and `insufficient context`. Do not force a winner. Randomize candidate side and blind system identity where practical. Admit the pair only after both candidate-specific external immutable-record references validate and resolve to hard gate `PASS`, and the requested dimension's measurement-comparability status is `SUPPORTED`; `FAIL`, `UNKNOWN`, `NOT_APPLICABLE`, an absent/stale/mismatched/unverifiable record reference, or comparability `UNKNOWN` blocks the comparison.

For comparable, decisive `A/B` judgments on one dimension and stratum, fit a Bradley-Terry model:

```text
P(A preferred to B | d,c) = exp(theta_A) / (exp(theta_A) + exp(theta_B))
                           = sigmoid(theta_A - theta_B)
```

`theta` is identifiable only up to an additive constant, so fix an anchor or sum-to-zero constraint. Report standard errors or bootstrap intervals and held-out pairwise log loss. If position or rater bias is material, use a predeclared mixed or bias-adjusted extension:

```text
logit P(A > B) = theta_A - theta_B + b_rater_side + b_position
```

Here `b_rater_side` represents an estimated rater-specific tendency to select the left/right label, not a general quality judgment. Ties require a tie-capable model such as a declared Davidson-style extension or separate tie analysis. `both unacceptable` and `insufficient context` are not ties and remain separate outcomes. If the comparison graph is disconnected, do not publish one global ranking. Inspect cycles and context interactions rather than forcing transitive order.

Never pool pairwise judgments across different dimensions into one latent `quality` rank unless a preregistered validation shows that the construct is coherent. Voice, tone, meaning, naturalness, and user outcome normally remain separate.

## 24. Inter-rater reliability and disagreement

**[Proposal]** Use at least two qualified raters for contextual benchmark labels and more when locale, accessibility, domain, or affected-community expertise requires it. Preserve every original rating, rationale, abstention, and adjudication result.

Choose the agreement statistic by data type:

| Rating type | Proposed statistic | Notes |
| --- | --- | --- |
| Nominal `pass/fail/unknown` or pairwise outcome | Krippendorff alpha with nominal distance | Supports multiple raters and missing judgments; also report confusion table and raw agreement |
| Ordered anchored scale | Krippendorff alpha with ordinal distance or weighted kappa for an exactly two-rater complete design | Declare the distance function; do not treat ordinal points as interval by convenience |
| Interval-like continuous feature | Interval alpha and, when design assumptions fit, an intraclass correlation | Report scale/range error and calibration, not agreement alone |
| Candidate rankings | Pairwise agreement plus rank stability; Kendall-style concordance only when complete rankings are actually collected | Do not turn partial incomparable judgments into complete ranks |

Krippendorff's alpha is:

```text
alpha = 1 - D_o / D_e
```

where `D_o` is observed disagreement and `D_e` is disagreement expected from the observed category distribution under the statistic's chance model. Report the distance function, missingness, prevalence, sample size, unit of analysis, and a clustered/bootstrap confidence interval.

Important limits:

- high agreement does not establish construct validity, source truth, or user success;
- low alpha can reflect an unclear rubric, missing context, genuine expert disagreement, prevalence imbalance, heterogeneous strata, or unreliable raters;
- adjudication improves a gold decision but does not retroactively inflate reliability; report pre-adjudication alpha;
- compute reliability by dimension and meaningful stratum before any aggregate; and
- do not discard dissent from locale, accessibility, affected-community, or domain specialists merely because it is outvoted.

**[Product hypothesis]** For pilot development, treat a lower confidence bound below `0.67` on alpha as a trigger to revise the rubric, anchors, context packet, sampling, or rater training before using that dimension for comparative claims. For a deterministic high-risk annotation intended to gate a benchmark, target a lower bound of at least `0.80` plus direct adjudication of every disagreement. These are calibration hypotheses, not universal acceptability standards.

# Part VI — Multilingual, cultural, accessibility, and anti-stereotype controls

## 25. Multilingual measurement limits

**[Proposal]** Scores are locale-bound by default. A feature calibrated for English UI errors is `not_comparable` for Arabic crisis alerts, Brazilian Portuguese onboarding, or Japanese support chat until direct evaluation establishes comparability.

Required controls:

1. Store language, script, direction, locale, market, jurisdiction, surface, and message family on every feature and calibration profile.
2. Normalize length, syntactic, lexical, formality, politeness, VAD, and embedding measures against declared in-language evidence—not translated English thresholds.
3. Use complete strings, typed variables, selectors, and rendered context. Do not score concatenated fragments as if grammar were stable across languages.
4. Test semantic obligations, terminology, naturalness, and pragmatic fit separately with qualified in-market reviewers.
5. Include scripts without whitespace, morphologically rich languages, right-to-left and bidirectional strings, grammatical gender/class, honorific systems, plural categories, and code-switching as first-class fixtures.
6. Mark machine-translated lexicons and silver labels as such. The NRC VAD page's warning about incorrect translations and transliterations illustrates why translation is not local validation.
7. Do not compare raw or normalized scores across locales until common anchors, translated/adapted fixtures, differential-item checks, and local-rater evidence support measurement invariance.
8. If a metric lacks adequate target-language evaluation, return `unsupported_locale` rather than falling back silently to English.

**[Open question]** The harness needs a preregistered measurement-invariance protocol. Candidate methods include shared anchor scenarios, multi-group item-response or factor models, and differential item functioning analysis, but their fit for short product content must be tested rather than assumed.

## 26. Cultural adaptation boundary

**[Proposal]** The graph may store a `CulturalQuestion` or an approved, evidence-linked local decision. It must not generate a `CulturePreference` from country, nationality, language, name, religion, ethnicity, gender, age, disability, or an internet style guide.

Allowed progression:

```text
observed local question
  -> scoped research with affected/in-market participants
  -> evidence record with limits and disagreement
  -> accountable decision and exact approval, if warranted
  -> locale/surface-specific rule or target
  -> evaluation and review trigger
```

The absence of a local rule means `unknown` or `no adaptation required by current evidence`, not `use the English norm` or `infer the culture`.

## 27. Accessibility is an independent outcome plane

**[Proposal]** Accessibility measurement has at least three layers:

- **structural:** visible/programmatic names, roles, relationships, language metadata, error association, status-announcement presence, variable and heading integrity;
- **interaction:** focus/reading order, keyboard and alternative input, timing, interruption, authentication, recovery, and assistive-technology behavior; and
- **understanding and use:** task comprehension and completion with disabled participants and the required communication supports.

A readable visible string cannot average away a missing accessible name. A schema pass cannot certify assistive-technology behavior. A disability or communication need must not lower the presumed expertise, agency, or desired warmth of a person.

## 28. Anti-stereotype constraints

**[Proposal]** Apply these controls as hard schema/rule checks where deterministic and as adversarial tests elsewhere:

- **Input allowlist:** Tone controllers accept event and interaction facts, not demographic proxies. A protected attribute is allowed only when an explicit functional or rights-related requirement needs it, with purpose limitation and review.
- **Counterfactual invariance:** Swap names, pronouns, dialect markers, nationality, age cues, disability cues, and other protected or proxy signals while holding the content job constant. Operative facts, consequence, risk, respect, competence assumptions, support, and recommendation should remain invariant unless a documented requirement justifies a scoped difference.
- **No emotion inference:** Do not label an individual `anxious`, `confused`, `devastated`, or `happy` from their identity, locale, behavior trace, or an affect lexicon. Situations may carry an evidenced risk of stress; content still preserves individual uncertainty.
- **Descriptive is not normative:** Corpus frequency, VAD, warmth, sentiment, formality, and politeness features describe a dataset. They do not define how a group should be addressed.
- **No dialect penalty:** Naturalness or professionalism metrics may not treat a dialect as defective by default. The target register must be explicit, task-supported, and reviewed with speakers.
- **No culture score:** The harness exposes locale-specific evidence and questions; it does not calculate national warmth, deference, directness, or trustworthiness.
- **Outcome audit:** Where lawful, necessary, privacy-preserving, and approved, evaluate comprehension, burden, false positives, support, and recourse across affected groups. Outcome disparities trigger investigation; they do not become new generation-time stereotypes.

# Part VII — Proposed records

## 29. YAML graph slice

**[Proposal]** This fictional example shows a graph slice for an uncertain payment state. It is not canonical payment guidance.

```yaml
schema_version: experimental.voice-tone-graph.v0
graph_snapshot:
  id: graph:checkout:2026-08-17.1
  created_at: 2026-08-17T18:00:00Z
  status: experimental

nodes:
  - id: voice:checkout:v3
    type: OrganizationVoiceProfile
    organization_scope: fictional-checkout
    version: 3
    decision_ref: decision:voice:checkout:v3

  - id: voice-principle:direct-consequence:v2
    type: VoicePrinciple
    name: Be direct about consequences
    behaviors:
      - State what is known before reassurance
      - Name affected money, access, data, or time
    avoid:
      - Unsupported reassurance
      - Euphemism about loss or commitment

  - id: decision:voice:checkout:v3
    type: DecisionRecord
    subject_ref: voice:checkout:v3
    state: proposed
    accountable_owner: fictional-checkout-content
    semantic_decision_approval_refs: []

  - id: message:payment-status-unknown:v1
    type: SemanticMessage
    product: fictional-checkout
    journey: payment
    event: payment_response_lost
    semantic_state: completion_unknown
    content_job: Help the payer avoid a possible duplicate while checking status
    represented_action: inspect_payment_activity

  - id: context:payment-status-unknown:en-US:web:v1
    type: MessageContext
    user_goal: complete_one_payment
    consequence:
      kinds: [money, duplicate_transaction]
      magnitude: consequential_recoverable
    reversibility: unknown
    urgency:
      level: routine
      verified_deadline: null
    uncertainty:
      product_state: completion_unknown
    responsibility:
      event_owner: system_or_dependency
      available_actor: payer
    agency:
      available_actions: [inspect_payment_activity, contact_support]
    facts:
      - fact: prior_request_may_have_committed
        state: unknown

  - id: risk:payment-status-unknown:v1
    type: RiskAssessment
    level: R3
    harm_paths: [duplicate_payment, misleading_completion_claim]
    rationale: The previous request may have moved money and retry safety is unresolved
    decision_ref: decision:risk:payment-status-unknown:v1

  - id: decision:risk:payment-status-unknown:v1
    type: DecisionRecord
    subject_ref: risk:payment-status-unknown:v1
    state: proposed
    accountable_owner: fictional-payments-risk
    semantic_decision_approval_refs: []

  - id: locale:en-US:checkout:v1
    type: LocaleProfile
    language_tag: en-US
    script: Latn
    direction: ltr
    market: US
    local_review_required: true
    local_review_completed: false

  - id: surface:web:inline-status:v2
    type: SurfaceProfile
    channel: authenticated_ui
    component: inline_status
    privacy: authenticated
    persistent: true
    required_slots: [headline, body, action]

  - id: access:status-announcement:v1
    type: AccessibilityRequirement
    requirement: State change is programmatically announced without relying on color
    test_methods: [static_semantics, assistive_technology]

  - id: tone:unknown-consequential-transaction:v1
    type: TonePolicy
    decision_ref: decision:tone:unknown-consequential-transaction:v1
    when:
      semantic_state: completion_unknown
      consequence_contains: money
    target_intervals:
      explicitness: [0.85, 1.00]
      expressive_restraint: [0.85, 1.00]
      uncertainty_calibration: [0.90, 1.00]
      accountability: [0.70, 1.00]
      urgency: [0.10, 0.40]
    prohibited_inferences: [user_emotion, retry_safety]

  - id: decision:tone:unknown-consequential-transaction:v1
    type: DecisionRecord
    subject_ref: tone:unknown-consequential-transaction:v1
    state: proposed
    accountable_owner: fictional-checkout-content
    semantic_decision_approval_refs: []

  - id: concept:payment-completion-unknown:v1
    type: Concept
    definition: The system cannot yet establish whether the payment completed
    scheme: fictional-payment-states

  - id: behavior:inspect-before-retry:v1
    type: BehaviorContract
    trigger: payment_completion_is_unknown
    allowed_action: inspect_payment_activity
    retry_behavior: unresolved
    recovery: contact_support

  - id: expression:payment-status-unknown:en-US:web:a
    type: Expression
    locale: en-US
    channel: authenticated_ui
    text:
      headline: We could not confirm the payment
      body: Check your activity before trying again. The payment may already be complete.
      action: Check activity
    decision_ref: decision:expression:payment-status-unknown:a

  - id: decision:expression:payment-status-unknown:a
    type: DecisionRecord
    subject_ref: expression:payment-status-unknown:en-US:web:a
    state: proposed
    accountable_owner: fictional-payments-content
    semantic_decision_approval_refs: []

edges:
  - {from: "voice:checkout:v3", type: HAS_PRINCIPLE, to: "voice-principle:direct-consequence:v2"}
  - {from: "voice:checkout:v3", type: HAS_DECISION, to: "decision:voice:checkout:v3"}
  - {from: "message:payment-status-unknown:v1", type: IN_CONTEXT, to: "context:payment-status-unknown:en-US:web:v1"}
  - {from: "message:payment-status-unknown:v1", type: MODULATED_BY, to: "tone:unknown-consequential-transaction:v1"}
  - {from: "message:payment-status-unknown:v1", type: HAS_RISK, to: "risk:payment-status-unknown:v1"}
  - {from: "risk:payment-status-unknown:v1", type: HAS_DECISION, to: "decision:risk:payment-status-unknown:v1"}
  - {from: "tone:unknown-consequential-transaction:v1", type: HAS_DECISION, to: "decision:tone:unknown-consequential-transaction:v1"}
  - {from: "expression:payment-status-unknown:en-US:web:a", type: EXPRESSES, to: "message:payment-status-unknown:v1"}
  - {from: "expression:payment-status-unknown:en-US:web:a", type: HAS_DECISION, to: "decision:expression:payment-status-unknown:a"}
  - {from: "expression:payment-status-unknown:en-US:web:a", type: ON_SURFACE, to: "surface:web:inline-status:v2"}
  - {from: "expression:payment-status-unknown:en-US:web:a", type: FOR_LOCALE, to: "locale:en-US:checkout:v1"}
  - {from: "expression:payment-status-unknown:en-US:web:a", type: REQUIRES_ACCESSIBILITY, to: "access:status-announcement:v1"}
  - {from: "message:payment-status-unknown:v1", type: REPRESENTS_CONCEPT, to: "concept:payment-completion-unknown:v1"}
  - {from: "message:payment-status-unknown:v1", type: BINDS_TO_BEHAVIOR, to: "behavior:inspect-before-retry:v1"}
```

## 30. Independent evidence, decision, and delivery records

**[Proposal]** Store these separately even when they concern the same expression:

```yaml
evidence_record:
  id: evidence:runtime:payment-status:41
  subject: behavior:inspect-before-retry:v1
  source_coordinates: services/payments/state-contract.yaml#completion_unknown
  observation_strength: observed
  challenge: disputed
  freshness: current
  lineage: active
  epistemic_qualifier: none
  limitation: Retry idempotency is not established by this source

decision_record:
  id: decision:expression:payment-status-unknown:a
  subject: expression:payment-status-unknown:en-US:web:a
  state: proposed
  accountable_owner: fictional-payments-content
  semantic_decision_approval_refs: []

delivery_record:
  id: delivery:payment-status-unknown:a:web
  occurrence_ref: occurrence:web:payment-status:unknown
  state: unmapped
  environment: null
  release_ref: null
```

The expression can score well while its decision remains `proposed` and delivery remains `unmapped`. That is the correct representation, not missing workflow data to fill from the score.

## 31. JSON evaluation record

**[Proposal]** This complete worked record uses the canonical `snake_case` JSON wire shape and must validate directly as `EvaluationResultWire` in §48; no implicit casing adapter or undocumented projection is permitted:

```json
{
  "result_id": "result:evaluation:fixture:payment-unknown:candidate-a:run-17",
  "result_version": "v1",
  "result_schema_version": "experimental.voice-tone-evaluation.v0",
  "request_id": "request:evaluation:fixture:payment-unknown:candidate-a:run-17",
  "request_version": "v1",
  "request_schema_version": "experimental.voice-tone-evaluate-request.v0",
  "harness_version": "harness:voice-tone:v0.1",
  "input_version_refs": [
    {"artifact_id": "graph:checkout", "version": "2026-08-17.1", "role": "graph"},
    {"artifact_id": "features:voice-tone", "version": "v0.3", "role": "feature_set"},
    {"artifact_id": "rules:checkout", "version": "2026-08-17.1", "role": "rule_set"},
    {"artifact_id": "rubric:voice-tone:pilot", "version": "v0.1", "role": "rubric"},
    {"artifact_id": "calibration:en-US:web:transaction-status", "version": "v1", "role": "calibration"},
    {"artifact_id": "candidate:payment-status-unknown:a", "version": "v1", "role": "candidate"},
    {"artifact_id": "context:payment-status-unknown:en-US:web", "version": "v1", "role": "context"}
  ],
  "evaluation_id": "evaluation:fixture:payment-unknown:candidate-a:run-17",
  "evaluation_version": "v1",
  "candidate_id": "candidate:payment-status-unknown:a",
  "candidate_version": "v1",
  "subject_id": "expression:payment-status-unknown:en-US:web:a",
  "semantic_message_id": "message:payment-status-unknown:v1",
  "context_id": "context:payment-status-unknown:en-US:web:v1",
  "context_version": "v1",
  "version_refs": {
    "graph_version": "graph:checkout:2026-08-17.1",
    "feature_set_version": "features:voice-tone:v0.3",
    "rule_set_version": "rules:checkout:2026-08-17.1",
    "rubric_version": "rubric:voice-tone:pilot:v0.1",
    "calibration_profile_ids": ["calibration:en-US:web:transaction-status:v1"]
  },
  "operation_controls": {
    "control_envelope_id": "control-envelope:evaluate:run-17",
    "control_envelope_version": "v1",
    "control_envelope_record_provenance": {
      "record_schema_version": "operation-control-envelope.v1",
      "record_content_hash": "sha256:1111111111111111111111111111111111111111111111111111111111111111",
      "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1",
      "source_system_id": "control-plane:fictional:v1",
      "source_record_locator": "control-envelopes/run-17",
      "producer_id": "control-plane:fictional:v1",
      "producer_version": "v3",
      "retrieved_at": "2026-08-17T18:00:00Z"
    },
    "issued_by": "trusted-control-plane:fictional:v1",
    "issued_at": "2026-08-17T18:00:00Z",
    "requested_operating_mode": "Advise",
    "authorization_policy_version": "policy:harness-authorization:v3",
    "primary_operation_control_id": "operation-control:evaluate:run-17",
    "operations": [
      {
        "operation_control_id": "operation-control:evaluate:run-17",
        "operation_control_version": "v1",
        "operation_control_record_provenance": {
          "record_schema_version": "authorized-operation-control.v1",
          "record_content_hash": "sha256:2222222222222222222222222222222222222222222222222222222222222222",
          "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1",
          "source_system_id": "control-plane:fictional:v1",
          "source_record_locator": "operation-controls/evaluate/run-17",
          "producer_id": "control-plane:fictional:v1",
          "producer_version": "v3",
          "retrieved_at": "2026-08-17T18:00:00Z"
        },
        "declared_capability_phase": "model.infer",
        "operation_profile": {
          "profile_id": "profile:model-adapter:fictional",
          "profile_version": "v1",
          "profile_schema_version": "capability-profile.v1",
          "profile_content_hash": "sha256:3333333333333333333333333333333333333333333333333333333333333333",
          "provenance": {
            "record_schema_version": "profile-record.v1",
            "record_content_hash": "sha256:3434343434343434343434343434343434343434343434343434343434343434",
            "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1",
            "source_system_id": "profile-registry:fictional:v1",
            "source_record_locator": "profiles/model-adapter/fictional/v1",
            "producer_id": "profile-registry:fictional:v1",
            "producer_version": "v1",
            "retrieved_at": "2026-08-17T18:00:00Z"
          }
        },
        "exact_tool": "adapter:model:fictional:v1",
        "exact_operation": "voice-tone.evaluate",
        "exact_resource": "expression:payment-status-unknown:en-US:web:a",
        "sec_p0_gate_result": {
          "result_id": "phase-result:p0-b:model-adapter:v1",
          "result_version": "v1",
          "result_record_provenance": {
            "record_schema_version": "sec-p0-result.v1",
            "record_content_hash": "sha256:4444444444444444444444444444444444444444444444444444444444444444",
            "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1",
            "source_system_id": "security-gate-registry:fictional:v1",
            "source_record_locator": "sec-p0-b/model-adapter/fictional/v1",
            "producer_id": "security-gate-evaluator:fictional:v1",
            "producer_version": "v1",
            "retrieved_at": "2026-08-17T18:00:00Z"
          },
          "sec_p0_gate": "SEC-P0-B",
          "capability_phase": "model.infer",
          "implementation_profile": {
            "profile_id": "profile:model-adapter:fictional",
            "profile_version": "v1",
            "profile_schema_version": "capability-profile.v1",
            "profile_content_hash": "sha256:3333333333333333333333333333333333333333333333333333333333333333",
            "provenance": {
              "record_schema_version": "profile-record.v1",
              "record_content_hash": "sha256:3434343434343434343434343434343434343434343434343434343434343434",
              "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1",
              "source_system_id": "profile-registry:fictional:v1",
              "source_record_locator": "profiles/model-adapter/fictional/v1",
              "producer_id": "profile-registry:fictional:v1",
              "producer_version": "v1",
              "retrieved_at": "2026-08-17T18:00:00Z"
            }
          },
          "result": "PASS",
          "gate_policy_version": "gate-policy:sec-p0-b:v1",
          "evidence_refs": ["evidence:sec-p0-b:model-adapter:fictional:v1"],
          "conditions": ["Synthetic fixture fields only", "Approved model adapter profile only"],
          "residual_limitations": ["This result does not authorize a task or persistence"],
          "issued_at": "2026-08-17T16:00:00Z",
          "valid_from": "2026-08-17T16:00:00Z",
          "expires_at": "2026-08-18T16:00:00Z",
          "current_state": "current",
          "checked_at": "2026-08-17T18:00:00Z"
        },
        "task_grant": {
          "grant_id": "grant:evaluate:run-17",
          "grant_version": "v1",
          "grant_record_provenance": {
            "record_schema_version": "capability-grant.v1",
            "record_content_hash": "sha256:5555555555555555555555555555555555555555555555555555555555555555",
            "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1",
            "source_system_id": "control-plane:fictional:v1",
            "source_record_locator": "grants/evaluate/run-17/v1",
            "producer_id": "control-plane:fictional:v1",
            "producer_version": "v3",
            "retrieved_at": "2026-08-17T18:00:00Z"
          },
          "issuer_id": "trusted-control-plane:fictional:v1",
          "issued_at": "2026-08-17T17:59:30Z",
          "valid_from": "2026-08-17T17:59:30Z",
          "actor_binding": {
            "kind": "delegated_workload",
            "authenticated_principal_id": "principal:pilot-operator:17",
            "workload_identity_id": "workload:voice-tone-harness:run-17"
          },
          "capability_phase": "model.infer",
          "capability_profile": {
            "profile_id": "profile:model-adapter:fictional",
            "profile_version": "v1",
            "profile_schema_version": "capability-profile.v1",
            "profile_content_hash": "sha256:3333333333333333333333333333333333333333333333333333333333333333",
            "provenance": {
              "record_schema_version": "profile-record.v1",
              "record_content_hash": "sha256:3434343434343434343434343434343434343434343434343434343434343434",
              "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1",
              "source_system_id": "profile-registry:fictional:v1",
              "source_record_locator": "profiles/model-adapter/fictional/v1",
              "producer_id": "profile-registry:fictional:v1",
              "producer_version": "v1",
              "retrieved_at": "2026-08-17T18:00:00Z"
            }
          },
          "authorization_policy_version": "policy:harness-authorization:v3",
          "exact_tool": "adapter:model:fictional:v1",
          "exact_operation": "voice-tone.evaluate",
          "exact_resource": "expression:payment-status-unknown:en-US:web:a",
          "permitted_data_boundary": "synthetic fixture SIBF-CHK-001 candidate A and resolved context only",
          "permitted_egress_boundary": "approved fictional model adapter; no connector or telemetry egress",
          "environment": "isolated-pilot",
          "conditions": ["One evaluation request", "No connector, telemetry, durable memory, or result persistence"],
          "expires_at": "2026-08-17T18:15:00Z",
          "revocation": {
            "state": "unrevoked",
            "checked_at": "2026-08-17T18:00:00Z",
            "check_path": "control-plane/grants/grant:evaluate:run-17/revocation"
          },
          "runtime_constraints": null
        },
        "control_dispositions": {
          "connection_authorization": {
            "disposition": "not_applicable",
            "control_class": "connection_authorization",
            "exact_operation": "voice-tone.evaluate",
            "exact_resource": "expression:payment-status-unknown:en-US:web:a",
            "exact_rationale": "The authorized model adapter receives an egress payload directly; no connector, tenant, or remote content resource is accessed",
            "evidence_refs": ["operation-plan:evaluate:run-17:v1"],
            "decision_id": "control-na:connection:evaluate:run-17",
            "decision_version": "v1",
            "decision_record_provenance": {"record_schema_version": "control-na-decision.v1", "record_content_hash": "sha256:6666666666666666666666666666666666666666666666666666666666666666", "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1", "source_system_id": "control-plane:fictional:v1", "source_record_locator": "dispositions/run-17/connection", "producer_id": "policy-engine:fictional:v1", "producer_version": "v3", "retrieved_at": "2026-08-17T18:00:00Z"},
            "policy_version": "policy:harness-authorization:v3",
            "evaluated_at": "2026-08-17T18:00:00Z",
            "expires_at": "2026-08-17T18:15:00Z",
            "revocation": {"state": "unrevoked", "checked_at": "2026-08-17T18:00:00Z", "check_path": "control-plane/dispositions/run-17/connection/revocation"}
          },
          "data_processing": {
            "disposition": "applicable",
            "record": {
              "control_class": "data_processing",
              "record_id": "processing:fixture-synthetic:model-eval",
              "record_version": "v1",
              "record_provenance": {"record_schema_version": "data-processing-record.v1", "record_content_hash": "sha256:7777777777777777777777777777777777777777777777777777777777777777", "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1", "source_system_id": "privacy-control-registry:fictional:v1", "source_record_locator": "processing/fixture-synthetic/model-eval/v1", "producer_id": "privacy-control-registry:fictional:v1", "producer_version": "v1", "retrieved_at": "2026-08-17T18:00:00Z"},
              "governing_profile": {
                "profile_id": "profile:data-processing:synthetic-model",
                "profile_version": "v1",
                "profile_schema_version": "data-processing-profile.v1",
                "profile_content_hash": "sha256:8888888888888888888888888888888888888888888888888888888888888888",
                "provenance": {"record_schema_version": "profile-record.v1", "record_content_hash": "sha256:8989898989898989898989898989898989898989898989898989898989898989", "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1", "source_system_id": "profile-registry:fictional:v1", "source_record_locator": "profiles/data-processing/synthetic-model/v1", "producer_id": "profile-registry:fictional:v1", "producer_version": "v1", "retrieved_at": "2026-08-17T18:00:00Z"}
              },
              "exact_scope": "Synthetic fixture SIBF-CHK-001 candidate A and resolved context fields for one model evaluation",
              "accountable_owner_id": "owner:fictional-privacy",
              "approval_record_id": "approval:data-processing:synthetic-model:v1",
              "issued_at": "2026-08-17T15:00:00Z",
              "valid_from": "2026-08-17T15:00:00Z",
              "expires_at": "2026-09-17T15:00:00Z",
              "conditions": {
                "purpose": "Evaluate the synthetic candidate against the declared rubric",
                "prohibited_uses": ["training", "secondary profiling", "durable memory"],
                "source_system_ids": ["fixture:SIBF-CHK-001"],
                "data_classes": ["synthetic_product_content"],
                "permitted_fields": ["candidate.expression", "context.resolved_fields", "rubric.criteria"],
                "provider_profile": {
                  "profile_id": "profile:model-adapter:fictional",
                  "profile_version": "v1",
                  "profile_schema_version": "capability-profile.v1",
                  "profile_content_hash": "sha256:3333333333333333333333333333333333333333333333333333333333333333",
                  "provenance": {"record_schema_version": "profile-record.v1", "record_content_hash": "sha256:3434343434343434343434343434343434343434343434343434343434343434", "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1", "source_system_id": "profile-registry:fictional:v1", "source_record_locator": "profiles/model-adapter/fictional/v1", "producer_id": "profile-registry:fictional:v1", "producer_version": "v1", "retrieved_at": "2026-08-17T18:00:00Z"}
                },
                "subprocessor_profile_ids": [],
                "controller_processor_roles": ["fixture_owner:controller", "model_provider:processor"],
                "processing_regions": ["fictional-us-test-region"],
                "training_use": "prohibited",
                "retention_rule": "Provider request and response content retained only for the synchronous task",
                "deletion_path": "privacy-controls/processing/fixture-synthetic/delete",
                "rights_handling_path": "privacy-controls/processing/fixture-synthetic/rights"
              },
              "revocation": {
                "state": "unrevoked",
                "checked_at": "2026-08-17T18:00:00Z",
                "check_path": "control-plane/processing/processing:fixture-synthetic:model-eval/v1/revocation"
              }
            }
          },
          "durable_memory": {
            "disposition": "not_applicable",
            "control_class": "durable_memory",
            "exact_operation": "voice-tone.evaluate",
            "exact_resource": "expression:payment-status-unknown:en-US:web:a",
            "exact_rationale": "The task uses only ephemeral request context and writes no durable memory or retrieval index",
            "evidence_refs": ["operation-plan:evaluate:run-17:v1"],
            "decision_id": "control-na:durable-memory:evaluate:run-17",
            "decision_version": "v1",
            "decision_record_provenance": {"record_schema_version": "control-na-decision.v1", "record_content_hash": "sha256:9999999999999999999999999999999999999999999999999999999999999999", "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1", "source_system_id": "control-plane:fictional:v1", "source_record_locator": "dispositions/run-17/durable-memory", "producer_id": "policy-engine:fictional:v1", "producer_version": "v3", "retrieved_at": "2026-08-17T18:00:00Z"},
            "policy_version": "policy:harness-authorization:v3",
            "evaluated_at": "2026-08-17T18:00:00Z",
            "expires_at": "2026-08-17T18:15:00Z",
            "revocation": {"state": "unrevoked", "checked_at": "2026-08-17T18:00:00Z", "check_path": "control-plane/dispositions/run-17/durable-memory/revocation"}
          },
          "persistence": {
            "disposition": "not_applicable",
            "control_class": "persistence",
            "exact_operation": "voice-tone.evaluate",
            "exact_resource": "result:evaluation:fixture:payment-unknown:candidate-a:run-17",
            "exact_rationale": "The result is returned ephemerally and no record.append operation is present in this envelope",
            "evidence_refs": ["operation-plan:evaluate:run-17:v1"],
            "decision_id": "control-na:persistence:evaluate:run-17",
            "decision_version": "v1",
            "decision_record_provenance": {"record_schema_version": "control-na-decision.v1", "record_content_hash": "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1", "source_system_id": "control-plane:fictional:v1", "source_record_locator": "dispositions/run-17/persistence", "producer_id": "policy-engine:fictional:v1", "producer_version": "v3", "retrieved_at": "2026-08-17T18:00:00Z"},
            "policy_version": "policy:harness-authorization:v3",
            "evaluated_at": "2026-08-17T18:00:00Z",
            "expires_at": "2026-08-17T18:15:00Z",
            "revocation": {"state": "unrevoked", "checked_at": "2026-08-17T18:00:00Z", "check_path": "control-plane/dispositions/run-17/persistence/revocation"}
          },
          "telemetry": {
            "disposition": "not_applicable",
            "control_class": "telemetry",
            "exact_operation": "voice-tone.evaluate",
            "exact_resource": "expression:payment-status-unknown:en-US:web:a",
            "exact_rationale": "The operation emits no telemetry event or raw-content log",
            "evidence_refs": ["operation-plan:evaluate:run-17:v1"],
            "decision_id": "control-na:telemetry:evaluate:run-17",
            "decision_version": "v1",
            "decision_record_provenance": {"record_schema_version": "control-na-decision.v1", "record_content_hash": "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1", "source_system_id": "control-plane:fictional:v1", "source_record_locator": "dispositions/run-17/telemetry", "producer_id": "policy-engine:fictional:v1", "producer_version": "v3", "retrieved_at": "2026-08-17T18:00:00Z"},
            "policy_version": "policy:harness-authorization:v3",
            "evaluated_at": "2026-08-17T18:00:00Z",
            "expires_at": "2026-08-17T18:15:00Z",
            "revocation": {"state": "unrevoked", "checked_at": "2026-08-17T18:00:00Z", "check_path": "control-plane/dispositions/run-17/telemetry/revocation"}
          }
        },
        "policy_decision": {
          "decision_id": "policy-decision:evaluate:run-17",
          "decision_version": "v1",
          "decision_record_provenance": {"record_schema_version": "operation-policy-decision.v1", "record_content_hash": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc", "hash_preimage_contract_id": "hash-contract:control-record:rfc8785:v1", "source_system_id": "control-plane:fictional:v1", "source_record_locator": "policy-decisions/evaluate/run-17", "producer_id": "policy-engine:fictional:v1", "producer_version": "v3", "retrieved_at": "2026-08-17T18:00:00Z"},
          "policy_version": "policy:harness-authorization:v3",
          "result": "allow",
          "reason_code": "authorized_exact_model_evaluation",
          "effective_restrictions": ["synthetic fixture only", "no persistence", "no connector", "no telemetry"],
          "evaluated_at": "2026-08-17T18:00:00Z"
        }
      }
    ],
    "persistence": {
      "mode": "ephemeral",
      "persistence_decision": null,
      "append_operation": null,
      "dispose_after_response": true
    }
  },
  "independent_state_refs": {
    "evidence": ["evidence:runtime:payment-status:41"],
    "decision": "decision:expression:payment-status-unknown:a",
    "semantic_decision_approvals": [],
    "mutation_change_approvals": [],
    "release_approvals": [],
    "delivery": ["delivery:payment-status-unknown:a:web"]
  },
  "hard_constraints": {
    "result": "UNKNOWN",
    "checks": [
      {
        "rule_id": "rule:no-unsafe-retry:v2",
        "result": "UNKNOWN",
        "reason": "Retry idempotency is unresolved",
        "severity": "critical",
        "evidence_refs": ["evidence:runtime:payment-status:41"]
      }
    ]
  },
  "soft_scorecard": {
    "voice": {
      "direct_about_consequences": {"fit": 0.91, "ci": [0.82, 0.96]}
    },
    "tone": {
      "explicitness": {"fit": 0.94, "ci": [0.88, 0.98]},
      "uncertainty_calibration": {"fit": 0.90, "ci": [0.80, 0.96]},
      "expressive_restraint": {"fit": 0.97, "ci": [0.91, 0.99]}
    },
    "semantic_preservation": {
      "required_slot_coverage": 1.0,
      "forward_implication": 0.89,
      "reverse_implication": 0.81,
      "automated_signal_only": true
    },
    "naturalness": {"human_mean": null, "status": "not_yet_rated"},
    "locale": {"status": "proposed_not_in_market_reviewed"},
    "accessibility": {"status": "runtime_test_required"}
  },
  "measurement_comparability": {
    "status": "SUPPORTED",
    "profile_id": "comparability:en-US:web:transaction-status",
    "profile_version": "v1",
    "scope": "same semantic message, en-US, authenticated web inline status, same rubric versions",
    "reasons": ["The declared measurement profile supports this context and version stratum"],
    "not_comparable_to": ["other locales", "push notification", "other risk contexts"]
  },
  "comparison_eligibility": {
    "eligible": false,
    "required_hard_gate": "PASS",
    "actual_hard_gate": "UNKNOWN",
    "hard_pass_reference_issuance": "ineligible",
    "reasons": ["A required hard check is UNKNOWN; measurement comparability does not override hard eligibility"]
  },
  "recommendation": "insufficient_evidence",
  "required_next_evidence": ["Verify retry idempotency and payment-status source of truth"],
  "uncertainty": [
    {"field": "retry_idempotency", "status": "unknown", "decision_effect": "blocks comparison eligibility"}
  ],
  "limitations": [
    "Soft scores do not change decision or delivery state",
    "No in-market or assistive-technology evaluation has been completed"
  ],
  "persistence_outcome": {
    "mode": "ephemeral",
    "persisted": false,
    "reason": "No scoped persistence decision or separately authorized append operation was supplied"
  }
}
```

# Part VIII — Worked examples

## 32. One voice, two situational tones

**[Proposal]** Example: fictional organization voice principles:

- be direct about the actual state;
- preserve the person's agency; and
- avoid claiming certainty the system does not have.

Two contexts share that voice but need different tone:

| Context | Candidate expression | Voice behavior | Tone behavior |
| --- | --- | --- | --- |
| Low-risk, reversible filter reset | `Filters cleared. You can undo this.` | Direct state and agency | Compact, routine, mildly expressive range allowed |
| Consequential payment status unknown | `We could not confirm the payment. Check your activity before trying again—the payment may already be complete.` | Direct state, agency, calibrated uncertainty | More explicit and restrained; no celebration, blame, or unsafe retry |

The second is not a `more serious brand voice`. It is the same relationship under a different event, consequence, and uncertainty.

## 33. A soft score cannot rescue a hard failure

**[Proposal]** Example: fictional candidate:

> Oops—we hit a snag. Try the payment again!

Suppose human raters find its rhythm and naturalness strong. The graph still identifies:

- completion state is unknown;
- retry idempotency is unknown;
- retry might duplicate money movement; and
- `try again` violates the applicable safe-retry rule.

Result:

```text
hard gate: UNKNOWN or FAIL, depending on the verified rule/evidence
naturalness: measured separately
tone: likely outside explicitness and restraint target
recommendation: insufficient_evidence or blocked
```

There is no weighted score in which fluent wording cancels the transaction risk.

## 34. Interpreting interval fit

**[Proposal]** Example: a fictional high-consequence tone policy sets:

```text
explicitness target: [0.80, 1.00]
expressiveness target: [0.00, 0.20]
accountability target: [0.70, 1.00]
```

A candidate has normalized observations:

```text
explicitness = 0.55
expressiveness = 0.65
accountability = 0.45
rho = 1.00 for each feature
```

Then:

```text
explicitness fit = 1 - (0.80 - 0.55) = 0.75
expressiveness fit = 1 - (0.65 - 0.20) = 0.55
accountability fit = 1 - (0.70 - 0.45) = 0.75
```

The output is `[0.75, 0.55, 0.75]`, not `0.68 out of 1` unless a predeclared within-context ranking requires the optional summary. Reviewers can see that expressiveness is the largest mismatch.

## 35. Terminology can be exact while tone varies

**[Proposal]** Example: a concept graph distinguishes `refund`, `reversal`, `account credit`, and `chargeback`. The exact state requires `refund`. The label may be a hard terminology requirement in scope, while surrounding expression varies:

- authenticated UI: concise status plus amount, destination, and expected timing;
- email: subject, status, amount, destination, timing, and support route;
- push: privacy-safe event plus authenticated deep link;
- support script: state, evidence, exceptions, escalation, and dispute boundary.

Tone and density vary by channel and state. The controlled concept does not.

## 36. Multilingual abstention

**[Proposal]** Example: an English warmth detector rates an Arabic crisis alert as `low warmth`. The calibration profile is English UI onboarding, and no Arabic crisis-alert validation exists.

Correct harness result:

```text
metric status: unsupported_locale_and_surface
score: null
fallback: qualified local-language and incident-protocol review
```

Incorrect result: translate the alert into English, score it, and declare the Arabic wording cold.

# Part IX — Benchmark protocol

## 37. Benchmark questions

**[Proposal]** Evaluate at least six subsystems independently:

1. **Graph construction:** Are nodes, typed edges, scopes, conflicts, and state references correct?
2. **Context compilation:** Does the system resolve event, actors, consequence, recovery, risk, locale, accessibility, surface, facts, and unknowns without stereotype or invention?
3. **Hard-rule evaluation:** Does it detect violations and preserve `unknown`/`not_applicable` correctly?
4. **Feature measurement:** Are feature estimates reliable, calibrated, interpretable, and scoped?
5. **Candidate comparison:** Does pairwise or scorecard evaluation align with qualified raters while preserving meaning and abstention?
6. **Generation behavior:** Does a proposed expression satisfy hard constraints and make appropriate, tested voice/tone modulation without changing product meaning?

## 38. Fixture corpus

**[Proposal]** Build licensed, permissioned, or synthetic message families that cross:

- greenfield and takeover;
- ordinary, vulnerable, regulated, adversarial, and crisis contexts;
- R0 through R4 decision/state risk;
- routine, pending, partial, failed, denied, enforced, destructive, recovery, and completed states;
- reversible and irreversible outcomes;
- person-, system-, dependency-, and policy-owned failures;
- UI, email, SMS, push, voice, document, CLI, API, support, and status-page surfaces;
- organization voice profiles with positive/negative examples and justified exceptions;
- single and compound domain overlays;
- current, stale, superseded, conflicting, and missing evidence;
- approved, proposed, implemented, released, and observed-live records that must remain independent;
- language, script, direction, locale, market, and jurisdiction variation;
- visible, keyboard, screen-reader, voice, low-vision, cognitive-access, caption/transcript, Easy Read, language-access, and combined requirements; and
- counterfactual protected-attribute/proxy swaps that should not change the operative result.

Each semantic message family should include:

- graph snapshot and exact context packet;
- controlled facts and deliberately missing facts;
- applicable and non-applicable rules;
- at least one hard-failing candidate;
- at least one fluent but meaning-changing candidate;
- at least one accurate but tone-misaligned candidate;
- eligible alternatives with a genuine soft tradeoff;
- expected abstention/review cases;
- pairwise judgments by dimension; and
- original disagreements and adjudication records.

## 39. Splits and leakage controls

**[Proposal]** Split by semantic-message or journey family so paraphrases of one decision do not occur across train/calibration/test. Maintain:

- development split for feature and rubric iteration;
- calibration split for probabilities, thresholds, interval anchors, and pairwise models;
- public test split for reproducible comparison;
- private holdout for regression integrity; and
- targeted out-of-domain, out-of-surface, and out-of-locale stress sets.

Lock graph, model, prompt, rule, feature, normalization, calibration, rubric, and threshold versions before holdout evaluation. Report excluded, failed, and abstained runs.

## 40. Human annotation protocol

**[Proposal]** For each contextual dimension:

1. Define the construct with positive anchors, negative anchors, counterexamples, and `insufficient context` guidance.
2. Train raters on a separate set; revise the rubric before collecting the locked benchmark.
3. Use at least two qualified raters, with locale, accessibility, and domain expertise matched to the fixture.
4. Randomize/counterbalance candidate order and blind system condition where practical.
5. Collect evidence spans and short rationales for hard or high-severity findings.
6. Compute pre-adjudication agreement and retain original labels.
7. Adjudicate with the accountable expertise, recording the reason rather than majority-only resolution.
8. Keep user comprehension/preference studies separate from expert rule compliance.

## 41. Metrics by subsystem

| Subsystem | Primary metrics | Required disaggregation |
| --- | --- | --- |
| Node/edge extraction | precision, recall, F1 by node/edge type; referential and cardinality validity | source type, context family, locale, surface |
| Context compilation | field accuracy, unknown preservation, conflict recall, unsupported-inference rate | field family, risk, domain, entry point |
| Hard constraints | precision/recall by rule and severity; critical miss count; `unknown` and `not_applicable` accuracy | risk, rule family, locale, surface |
| Soft features | MAE or ordinal error, rank correlation, calibration, interval coverage | feature, rater group, locale, surface, risk |
| Meaning preservation | structured-slot recall, contradiction detection, forward/reverse implication, expert error severity | claim/concept type, risk, language |
| Pairwise ranking | held-out log loss, pairwise accuracy, tie/abstention quality, rank interval/stability | dimension and comparable context stratum |
| Rater reliability | alpha/appropriate statistic with interval, raw agreement, disagreement taxonomy | dimension, locale, domain, accessibility, risk |
| Counterfactual tests | invariance and monotonic pass rates; semantic diff review | changed factor and protected/proxy class |
| Calibration | Brier, reliability gaps/diagram, ECE with bin disclosure, coverage | rule/event, locale, surface, risk, model version |
| Generation | hard-gate pass, Pareto/scorecard position, abstention, human revision effort | task family, run number, model/system condition |
| User outcome | comprehension, task/recovery success, error, assists, trust calibration, harm signals | affected role, access needs, locale, entry point |

No aggregate metric may hide a critical hard-rule miss, unsupported consequential claim, inaccessible required interaction, stereotype violation, or false state transition.

## 42. Baselines and ablations

**[Proposal]** Compare:

1. generic model with the task prompt only;
2. model plus organization voice examples only;
3. model plus typed context but no graph retrieval;
4. full graph/context compiler;
5. full graph plus deterministic rules;
6. full system minus locale/accessibility/domain/risk plane, one ablation at a time;
7. automatic metric-only evaluation;
8. qualified human content-design reference and review, without treating humans as infallible.

Include narrow research baselines only within their scope: GYAFC for selected English formality experiments, the Wikipedia/Stack Exchange request corpus for politeness-feature experiments, and validated multilingual formality metrics for the specific studied languages/tasks. Do not market performance on those corpora as product voice/tone quality.

## 43. Statistical comparison

**[Proposal]** Pre-register primary dimensions and comparisons. For paired systems:

- use paired or clustered bootstrap differences over semantic-message families;
- report effect sizes and confidence intervals, not p-values alone;
- adjust or clearly label exploratory multiplicity when testing many features;
- analyze pass@1 and repeated-run variance separately;
- report cost, latency, tokens, tool calls, and human review time; and
- publish the scorecard, hard failures, abstentions, and counterexamples, not only the favorable mean.

For Bradley-Terry comparisons, check comparison-graph connectivity, order effects, rater effects, cycles, and held-out likelihood. Fit calibration only on the designated calibration split; evaluate it on an untouched test or holdout split, and test drift after every model, prompt, or feature change.

## 44. Pilot acceptance hypotheses

**[Product hypothesis]** These targets are pilot hypotheses, not validated release standards:

- zero unsupported consequential claims and zero critical hard-rule misses in the holdout;
- 100% preservation of deliberately separate evidence, decision, delivery, approval, and evaluation states;
- 100% escalation for `must not guess` fixtures;
- no statistically or materially meaningful operative-content change under protected/proxy counterfactuals without an approved functional reason;
- every reported probability has a current in-scope calibration profile or is labeled uncalibrated;
- pairwise results report ties, both-unacceptable judgments, disconnected strata, and uncertainty;
- pre-adjudication inter-rater reliability meets the dimension-specific pilot target or the dimension remains research-only;
- no locale is called supported without direct structural, linguistic, contextual, and applicable accessibility evidence; and
- user-outcome claims require representative-user or production evidence, not scorecard inference.

# Part X — Failure modes and controls

## 45. Measurement failure modes

| Failure | Symptom | Why it fails | Control |
| --- | --- | --- | --- |
| Universal voice scalar | `Brand voice = 82/100` | Hides principles, contexts, tradeoffs, and uncertainty | Principle vector across balanced contexts |
| Tone/voice collapse | One `friendly` target for every state | Rewards uniformity when consequence requires modulation | Separate voice profile and context-conditioned tone policy |
| Industry stereotype | Domain selects `formal`, `warm`, or `playful` | Converts convention into personality | Domain overlays constrain facts/terms/process only |
| Locale stereotype | Language/country changes warmth or deference automatically | Nationality/language is not preference evidence | Cultural questions plus approved in-market evidence |
| Accessibility average | Strong prose score offsets missing accessible content | Access failure is non-compensable | Independent hard/contextual accessibility results |
| Frequency as canon | Most common term wins | Frequency does not prove concept, behavior, scope, or approval | Stable concept/label graph and decision records |
| Lexicon essentialism | VAD/warmth score treated as emotion or respect | Word associations omit syntax, context, individual state, and culture | Weak signal only; ethics/license/scope checks |
| Embedding-only fit | Cosine similarity becomes semantic or voice truth | Similar vectors can hide changed obligations or states | Typed slots, contradiction tests, bidirectional checks, human review |
| Fluency compensation | Natural sentence rescues false behavior | Quality dimensions are not freely substitutable | Hard gate before soft scorecard |
| Unknown as neutral | Missing fact encoded `0.5` | Makes uncertainty look safely average | First-class `unknown` and risk policy |
| Confidence/state collapse | High probability sets `approved` | Model confidence is not governance | Independent references; evaluation cannot transition states |
| Cross-locale normalization | English quantiles score every language | Language structure and metric validity differ | Locale-specific profile or `unsupported_locale` |
| Translation equivalence | `TRANSLATION_OF` treated as exact meaning | Pragmatics, terms, legal force, and grammar can shift | Review and separate mapping semantics |
| Pairwise forced choice | Raters must choose A or B | Invents preference when both fail or tie | Five-outcome response and tie-capable analysis |
| Disconnected ranking | Bradley-Terry yields one list from unlinked groups | Latent utilities are not identified across components | Connectivity check and per-component results |
| Agreement theater | High alpha called truth | Reliability is not validity or correctness | Expert/user validity evidence and disagreement review |
| Adjudication erasure | Only final gold label is retained | Hides ambiguity and rubric weakness | Retain original ratings and pre-adjudication alpha |
| Metric gaming | Model optimizes contractions, length, or lexicon terms | Proxy becomes target | Holdouts, ablations, adversarial fixtures, user outcomes |
| Score drift | Model/rubric changes but calibration ID remains | Probabilities and thresholds are stale | Version binding and automatic invalidation |
| State-insensitive corpus | Only routine English happy paths | Inflated score misses real harm | Risk/state/surface/locale-stratified fixtures |
| Synthetic-ground-truth inflation | Generated references treated as approved truth | Synthetic data repeats model assumptions | Human/domain review and provenance labels |

## 46. Product and governance failure modes

- The product behavior contradicts the claimed voice principle; wording evaluation passes because behavior was excluded.
- A proposed tone policy becomes an enforceable rule without a current deterministic approved decision and exact scope.
- A domain overlay is retrieved by topic similarity but is inapplicable to the product, role, market, or date.
- The same message is scored without its adjacent claim, CTA, visual hierarchy, accessible relationship, or next state.
- An in-market disagreement is averaged into a global target rather than preserved.
- A high-risk candidate is optimized for conversion while comprehension, regret, complaint, dispute, and recovery are missing.
- A content score is used to assert that an implementation was verified, released, or observed live.
- A benchmark pass is treated as permission for autonomous mutation or publication.

# Part XI — Minimum viable harness API

## 47. Harness properties

**[Proposal]** The minimum harness is read-only with respect to canonical evidence, decision, approval, and delivery records. It returns versioned evaluation results **ephemerally by default**. A result becomes an immutable persisted record only through a separately controlled append operation with its own scoped persistence decision, canonical `draft.patch`/SEC-P0-C binding, and exact current append grant. Generation is optional; source-of-truth mutation, approval, release, and enforcement are outside this API.

Required properties:

- deterministic rule checks are reproducible;
- model/lexicon/human adapters are pluggable and versioned;
- every result is bound to graph, context, feature, rule, rubric, and calibration versions;
- unsupported contexts return typed abstentions;
- candidate and evaluator instructions are isolated from untrusted graph content;
- raw text, personal data, and rater data follow declared access/retention controls;
- identical inputs and deterministic adapters produce content-addressable run IDs;
- every requested operation resolves through a canonical capability-phase -> exact current SEC-P0 result -> exact current task-grant chain; and
- every request and result carries its own ID/version, all material input versions, and the resolved composite operation-control envelope.

## 48. Core operations

The canonical phase vocabulary and SEC-P0 binding are fixed by the security architecture:

| Canonical capability phase | Required current phase result |
| --- | --- |
| `discover.local` | `SEC-P0-A` |
| `research.external`, `model.infer`, `connector.read`, `connector.disconnect` | `SEC-P0-B` |
| `draft.patch` | `SEC-P0-C` |
| `apply.local` | `SEC-P0-D` |
| `connector.write` | `SEC-P0-E` |
| `enforce.ci` | `SEC-P0-F` |
| `verify.runtime` | `SEC-P0-G` |
| `admin.policy` | Never exposed to the content harness; governed out of band |

Aliases such as `draft.isolated`, `apply.remote`, and `enforce.rules` are invalid. Composite work carries one independently authorized operation record per phase; for example, a runtime study that also uses a model carries separate `verify.runtime`/P0-G and `model.infer`/P0-B records and grants.

The single canonical API wire shape is UTF-8 JSON with `snake_case` keys. Every TypeScript declaration suffixed `Wire` below describes that wire shape directly; it is not a camel-case internal projection. The JSON in [§31](#31-json-evaluation-record) must validate as `EvaluationResultWire` without a casing adapter, dropped field, synthesized default, or undocumented mapping. Implementations may use private internal objects only behind explicit total serializers whose round-trip and unknown-field rejection are tested against the wire schema. A `RecordProvenanceWire.record_content_hash` is the digest of the independently stored source record under its named `hash_preimage_contract_id`, not a recursive digest of the containing wire projection; any contract that hashes a record containing its own digest must explicitly replace that digest field with `null` before canonicalization.

```typescript
type Id = string;
type Version = string;
type IsoTimestamp = string;

type RequestedOperatingMode =
  | "Discover"
  | "Advise"
  | "Draft"
  | "Apply"
  | "Enforce";

type CanonicalCapabilityPhase =
  | "discover.local"
  | "research.external"
  | "model.infer"
  | "connector.read"
  | "connector.disconnect"
  | "draft.patch"
  | "apply.local"
  | "connector.write"
  | "enforce.ci"
  | "verify.runtime"
  | "admin.policy";

type ExecutableCapabilityPhase = Exclude<
  CanonicalCapabilityPhase,
  "admin.policy"
>;

type HarnessExecutionPhase = Extract<
  ExecutableCapabilityPhase,
  | "discover.local"
  | "research.external"
  | "model.infer"
  | "connector.read"
  | "connector.disconnect"
  | "draft.patch"
  | "verify.runtime"
>;

type SecP0GateFor<P extends ExecutableCapabilityPhase> =
  P extends "discover.local" ? "SEC-P0-A" :
  P extends
    | "research.external"
    | "model.infer"
    | "connector.read"
    | "connector.disconnect" ? "SEC-P0-B" :
  P extends "draft.patch" ? "SEC-P0-C" :
  P extends "apply.local" ? "SEC-P0-D" :
  P extends "connector.write" ? "SEC-P0-E" :
  P extends "enforce.ci" ? "SEC-P0-F" :
  P extends "verify.runtime" ? "SEC-P0-G" :
  never;

type NonEmpty<T> = [T, ...T[]];
type Sha256Digest = `sha256:${string}`;

type RecordProvenanceWire = {
  record_schema_version: Version;
  record_content_hash: Sha256Digest;
  hash_preimage_contract_id: Id;
  source_system_id: Id;
  source_record_locator: string;
  producer_id: Id;
  producer_version: Version;
  retrieved_at: IsoTimestamp;
};

type VersionedProfileRefWire = {
  profile_id: Id;
  profile_version: Version;
  profile_schema_version: Version;
  profile_content_hash: Sha256Digest;
  provenance: RecordProvenanceWire;
};

type ActorBindingWire =
  | {
      kind: "principal";
      authenticated_principal_id: Id;
      workload_identity_id: null;
    }
  | {
      kind: "workload";
      authenticated_principal_id: null;
      workload_identity_id: Id;
    }
  | {
      kind: "delegated_workload";
      authenticated_principal_id: Id;
      workload_identity_id: Id;
    };

type CurrentRevocationCheckWire = {
  state: "unrevoked";
  checked_at: IsoTimestamp;
  check_path: string;
};

type ControlClassWire =
  | "connection_authorization"
  | "data_processing"
  | "durable_memory"
  | "persistence"
  | "telemetry";

type ConnectionAuthorizationConditionsWire = {
  purpose: string;
  connector_profile: VersionedProfileRefWire;
  tenant_id: Id;
  resource_ids: NonEmpty<Id>;
  permitted_operations: NonEmpty<string>;
  permitted_scopes: NonEmpty<string>;
  permitted_fields: string[];
  terms_version: Version;
  disconnect_path: string;
};

type DataProcessingConditionsWire = {
  purpose: string;
  prohibited_uses: NonEmpty<string>;
  source_system_ids: NonEmpty<Id>;
  data_classes: NonEmpty<string>;
  permitted_fields: NonEmpty<string>;
  provider_profile: VersionedProfileRefWire;
  subprocessor_profile_ids: Id[];
  controller_processor_roles: NonEmpty<string>;
  processing_regions: NonEmpty<string>;
  training_use: "prohibited" | "authorized_exact_scope";
  retention_rule: string;
  deletion_path: string;
  rights_handling_path: string;
};

type DurableMemoryConditionsWire = {
  purpose: string;
  permitted_record_types: NonEmpty<string>;
  permitted_fields: NonEmpty<string>;
  store_profile: VersionedProfileRefWire;
  storage_region: string;
  isolation_boundary: string;
  access_role_ids: NonEmpty<Id>;
  retention_rule: string;
  deletion_path: string;
  export_path: string;
};

type PersistenceConditionsWire = DurableMemoryConditionsWire & {
  immutable_append_only: true;
};

type TelemetryConditionsWire = {
  purpose: string;
  event_schema_version: Version;
  permitted_event_fields: NonEmpty<string>;
  destination_profile: VersionedProfileRefWire;
  redaction_profile: VersionedProfileRefWire;
  processor_profile_ids: Id[];
  processing_regions: NonEmpty<string>;
  access_role_ids: NonEmpty<Id>;
  retention_rule: string;
  deletion_path: string;
};

type ControlConditionsFor<C extends ControlClassWire> =
  C extends "connection_authorization" ? ConnectionAuthorizationConditionsWire :
  C extends "data_processing" ? DataProcessingConditionsWire :
  C extends "durable_memory" ? DurableMemoryConditionsWire :
  C extends "persistence" ? PersistenceConditionsWire :
  C extends "telemetry" ? TelemetryConditionsWire :
  never;

type CurrentControlRecordWire<C extends ControlClassWire> = {
  control_class: C;
  record_id: Id;
  record_version: Version;
  record_provenance: RecordProvenanceWire;
  governing_profile: VersionedProfileRefWire;
  exact_scope: string;
  accountable_owner_id: Id;
  approval_record_id: Id;
  issued_at: IsoTimestamp;
  valid_from: IsoTimestamp;
  expires_at: IsoTimestamp;
  conditions: ControlConditionsFor<C>;
  revocation: CurrentRevocationCheckWire;
};

type NotApplicableControlDispositionWire<C extends ControlClassWire> = {
  disposition: "not_applicable";
  control_class: C;
  exact_operation: string;
  exact_resource: string;
  exact_rationale: string;
  evidence_refs: NonEmpty<Id>;
  decision_id: Id;
  decision_version: Version;
  decision_record_provenance: RecordProvenanceWire;
  policy_version: Version;
  evaluated_at: IsoTimestamp;
  expires_at: IsoTimestamp;
  revocation: CurrentRevocationCheckWire;
};

type ControlDispositionWire<C extends ControlClassWire> =
  | {
      disposition: "applicable";
      record: CurrentControlRecordWire<C>;
    }
  | NotApplicableControlDispositionWire<C>;

type ExhaustiveControlDispositionsWire = {
  connection_authorization: ControlDispositionWire<"connection_authorization">;
  data_processing: ControlDispositionWire<"data_processing">;
  durable_memory: ControlDispositionWire<"durable_memory">;
  persistence: ControlDispositionWire<"persistence">;
  telemetry: ControlDispositionWire<"telemetry">;
};

type CurrentPhaseGateResultWire<P extends HarnessExecutionPhase> = {
  result_id: Id;
  result_version: Version;
  result_record_provenance: RecordProvenanceWire;
  capability_phase: P;
  sec_p0_gate: SecP0GateFor<P>;
  implementation_profile: VersionedProfileRefWire;
  result: "PASS";
  gate_policy_version: Version;
  evidence_refs: NonEmpty<Id>;
  conditions: string[];
  residual_limitations: string[];
  issued_at: IsoTimestamp;
  valid_from: IsoTimestamp;
  expires_at: IsoTimestamp;
  current_state: "current";
  checked_at: IsoTimestamp;
};

type RuntimeGrantConstraintsWire = {
  runtime_plan_id: Id;
  runtime_plan_version: Version;
  runtime_plan_hash: Sha256Digest;
  runtime_plan_provenance: RecordProvenanceWire;
  executor_profile: VersionedProfileRefWire;
  environment_profile: VersionedProfileRefWire;
  build_id: Id;
  build_version: Version;
  build_content_hash: Sha256Digest;
  build_provenance: RecordProvenanceWire;
  executable_or_browser_id: Id;
  executable_or_browser_version: Version;
  immutable_arguments: string[];
  allowed_origins: string[];
  allowed_routes: string[];
  allowed_actions: NonEmpty<string>;
  working_directory: string;
  read_only_mounts: NonEmpty<string>;
  writable_scratch_paths: string[];
  network_request_limit: number;
  redirect_policy: string;
  credential_reference_ids: Id[];
  permitted_data_classes: NonEmpty<string>;
  child_process_policy: "deny" | "exact_allowlist";
  allowed_child_processes: string[];
  download_policy: "deny";
  external_protocol_launch_policy: "deny";
  capture_profile: VersionedProfileRefWire;
  role: string;
  locale: string;
  feature_flags: string[];
  start_state: string;
  cpu_limit: string;
  memory_limit: string;
  action_limit: number;
  max_duration_seconds: number;
  cancellation_path: string;
  cleanup_plan_id: Id;
  cleanup_plan_version: Version;
  cleanup_plan_hash: Sha256Digest;
  cleanup_plan_provenance: RecordProvenanceWire;
};

type CurrentCapabilityGrantBaseWire<P extends HarnessExecutionPhase> = {
  grant_id: Id;
  grant_version: Version;
  grant_record_provenance: RecordProvenanceWire;
  issuer_id: Id;
  issued_at: IsoTimestamp;
  valid_from: IsoTimestamp;
  actor_binding: ActorBindingWire;
  capability_phase: P;
  capability_profile: VersionedProfileRefWire;
  authorization_policy_version: Version;
  exact_tool: string;
  exact_operation: string;
  exact_resource: string;
  permitted_data_boundary: string;
  permitted_egress_boundary: string;
  environment: string;
  conditions: string[];
  expires_at: IsoTimestamp;
  revocation: CurrentRevocationCheckWire;
};

type CurrentCapabilityGrantWire<P extends HarnessExecutionPhase> =
  CurrentCapabilityGrantBaseWire<P> &
  (P extends "verify.runtime"
    ? {runtime_constraints: RuntimeGrantConstraintsWire}
    : {runtime_constraints: null});

type OperationPolicyDecisionWire = {
  decision_id: Id;
  decision_version: Version;
  decision_record_provenance: RecordProvenanceWire;
  policy_version: Version;
  result: "allow";
  reason_code: string;
  effective_restrictions: string[];
  evaluated_at: IsoTimestamp;
};

type AuthorizedOperationControlForWire<P extends HarnessExecutionPhase> = {
  operation_control_id: Id;
  operation_control_version: Version;
  operation_control_record_provenance: RecordProvenanceWire;
  declared_capability_phase: P;
  operation_profile: VersionedProfileRefWire;
  exact_tool: string;
  exact_operation: string;
  exact_resource: string;
  sec_p0_gate_result: CurrentPhaseGateResultWire<P>;
  task_grant: CurrentCapabilityGrantWire<P>;
  control_dispositions: ExhaustiveControlDispositionsWire;
  policy_decision: OperationPolicyDecisionWire;
};

type AuthorizedOperationControlRecordWire = {
  [P in HarnessExecutionPhase]: AuthorizedOperationControlForWire<P>
}[HarnessExecutionPhase];

type ScopedPersistenceDecisionWire = CurrentControlRecordWire<"persistence">;

type AppendOperationControlWire = Omit<
  AuthorizedOperationControlForWire<"draft.patch">,
  "exact_operation" | "task_grant"
> & {
  exact_operation: "record.append";
  task_grant: CurrentCapabilityGrantWire<"draft.patch"> & {
    exact_operation: "record.append";
  };
};

type PersistencePlanWire =
  | {
      mode: "ephemeral";
      persistence_decision: null;
      append_operation: null;
      dispose_after_response: true;
    }
  | {
      mode: "persist";
      persistence_decision: ScopedPersistenceDecisionWire;
      append_operation: AppendOperationControlWire;
      immutable_append: true;
    };

type CompositeOperationControlEnvelopeWire = {
  control_envelope_id: Id;
  control_envelope_version: Version;
  control_envelope_record_provenance: RecordProvenanceWire;
  issued_by: Id;
  issued_at: IsoTimestamp;
  requested_operating_mode: RequestedOperatingMode;
  authorization_policy_version: Version;
  primary_operation_control_id: Id;
  operations: NonEmpty<AuthorizedOperationControlRecordWire>;
  persistence: PersistencePlanWire;
};

type VersionedArtifactRefWire = {
  artifact_id: Id;
  version: Version;
  role: string;
};

type OperationRequestEnvelopeWire = {
  request_id: Id;
  request_version: Version;
  request_schema_version: Version;
  harness_version: Version;
  input_version_refs: NonEmpty<VersionedArtifactRefWire>;
  operation_controls: CompositeOperationControlEnvelopeWire;
};

type EvaluationRecordContentHashWire = {
  algorithm: "sha256";
  canonicalization: "RFC8785";
  preimage_contract_id: "hash-contract:evaluation-result-wire:v1";
  excluded_json_pointers: ["/persistence_outcome/content_hash"];
  digest: Sha256Digest;
};

type ResultPersistenceOutcomeWire =
  | {
      mode: "ephemeral";
      persisted: false;
      reason: string;
    }
  | {
      mode: "persist";
      persisted: true;
      record_store_id: Id;
      persisted_record_id: Id;
      persisted_record_version: Version;
      persistence_decision_id: Id;
      persistence_decision_version: Version;
      append_operation_control_id: Id;
      append_operation_control_version: Version;
      content_hash: EvaluationRecordContentHashWire;
      appended_at: IsoTimestamp;
    };

type OperationResultEnvelopeWire = {
  result_id: Id;
  result_version: Version;
  result_schema_version: Version;
  request_id: Id;
  request_version: Version;
  request_schema_version: Version;
  harness_version: Version;
  input_version_refs: NonEmpty<VersionedArtifactRefWire>;
  operation_controls: CompositeOperationControlEnvelopeWire;
  persistence_outcome: ResultPersistenceOutcomeWire;
};

type CompileContextRequestWire = OperationRequestEnvelopeWire & {
  semantic_message_id: Id;
  graph_version: Id;
  requested_locale?: string;
  surface_id?: Id;
  runtime_facts?: Record<string, unknown>;
};

type ContextPacketWire = OperationResultEnvelopeWire & {
  context_id: Id;
  context_version: Version;
  semantic_message_id: Id;
  graph_version: Id;
  message: Record<string, unknown>;
  voice_profile_refs: Id[];
  tone_policy_matches: Array<{policy_id: Id; matched_predicates: string[]}>;
  domain_overlay_refs: Id[];
  risk_ref?: Id;
  locale_profile_ref?: Id;
  cultural_question_refs: Id[];
  accessibility_requirement_refs: Id[];
  surface_profile_ref?: Id;
  controlled_fact_refs: Id[];
  governing_instrument_refs: Id[];
  unknowns: Array<{field: string; required_for: string[]}>;
  state_refs: {
    evidence: Id[];
    decision: Id[];
    semantic_decision_approvals: Id[];
    mutation_change_approvals: Id[];
    release_approvals: Id[];
    delivery: Id[];
  };
  trace: Array<{selected_id: Id; reason: string}>;
};

type CandidateWire = {
  candidate_id: Id;
  candidate_version: Version;
  semantic_message_id: Id;
  expression: Record<string, unknown>;
  provenance: "human" | "model_assisted" | "generated" | "mixed" | "unknown";
};

type EvaluateRequestWire = OperationRequestEnvelopeWire & {
  candidate: CandidateWire;
  context: ContextPacketWire;
  rule_set_version: Id;
  feature_set_version: Id;
  calibration_profile_ids: Id[];
  rubric_version: Id;
  deterministic_only?: boolean;
};

type HardGateWire = "PASS" | "FAIL" | "UNKNOWN" | "NOT_APPLICABLE";

type MeasurementComparabilityWire = {
  status: "SUPPORTED" | "UNSUPPORTED" | "UNKNOWN";
  profile_id: Id;
  profile_version: Version;
  scope?: string;
  reasons: string[];
  not_comparable_to: string[];
};

type HardPassEvaluationRecordRefWire = {
  evaluation_record_id: Id;
  evaluation_record_version: Version;
  record_store_id: Id;
  persistence_decision_id: Id;
  persistence_decision_version: Version;
  append_operation_control_id: Id;
  append_operation_control_version: Version;
  evaluation_result_id: Id;
  evaluation_result_version: Version;
  evaluation_record_content_hash: EvaluationRecordContentHashWire;
  candidate_id: Id;
  candidate_version: Version;
  context_id: Id;
  context_version: Version;
  graph_version: Id;
  rule_set_version: Id;
  hard_gate: "PASS";
  required_pass_check_refs: NonEmpty<Id>;
};

type ComparisonEligibilityWire = {
  eligible: boolean;
  required_hard_gate: "PASS";
  actual_hard_gate: HardGateWire;
  hard_pass_reference_issuance:
    | "ineligible"
    | "external_after_persisted_pass_record";
  reasons: string[];
};

type IndependentStateRefsWire = {
  evidence: Id[];
  decision: Id;
  semantic_decision_approvals: Id[];
  mutation_change_approvals: Id[];
  release_approvals: Id[];
  delivery: Id[];
};

type HardConstraintCheckWire = {
  rule_id: Id;
  result: HardGateWire;
  reason: string;
  severity: "low" | "medium" | "high" | "critical";
  evidence_refs: Id[];
};

type EvaluationResultWire = OperationResultEnvelopeWire & {
  evaluation_id: Id;
  evaluation_version: Version;
  candidate_id: Id;
  candidate_version: Version;
  subject_id: Id;
  semantic_message_id: Id;
  context_id: Id;
  context_version: Version;
  version_refs: {
    graph_version: Id;
    rule_set_version: Id;
    feature_set_version: Id;
    calibration_profile_ids: Id[];
    rubric_version: Id;
  };
  independent_state_refs: IndependentStateRefsWire;
  hard_constraints: {
    result: HardGateWire;
    checks: HardConstraintCheckWire[];
  };
  soft_scorecard: Record<string, Record<string, unknown>>;
  measurement_comparability: MeasurementComparabilityWire;
  comparison_eligibility: ComparisonEligibilityWire;
  recommendation:
    | "eligible"
    | "revise"
    | "human_review"
    | "insufficient_evidence"
    | "blocked";
  required_next_evidence: string[];
  uncertainty: Array<Record<string, unknown>>;
  limitations: string[];
};

type CompareRequestWire = OperationRequestEnvelopeWire & {
  candidate_a: CandidateWire;
  candidate_b: CandidateWire;
  context: ContextPacketWire;
  hard_pass_a: HardPassEvaluationRecordRefWire;
  hard_pass_b: HardPassEvaluationRecordRefWire;
  dimension: string;
  measurement_comparability_profile_id: Id;
  measurement_comparability_profile_version: Version;
  comparison_model_version: Id;
};

type CompareResultWire = OperationResultEnvelopeWire & {
  comparison_id: Id;
  comparison_version: Version;
  dimension: string;
  comparison_model_version: Id;
  hard_pass_refs: [
    HardPassEvaluationRecordRefWire,
    HardPassEvaluationRecordRefWire
  ];
  measurement_comparability: MeasurementComparabilityWire;
  comparison_eligibility: {
    eligible: boolean;
    both_hard_pass_refs_validated: boolean;
    reasons: string[];
  };
  outcome?:
    | "A"
    | "B"
    | "indistinguishable"
    | "both_unacceptable"
    | "insufficient_context";
  probability_a?: number;
  interval_a?: [number, number];
  evidence: Array<Record<string, unknown>>;
  limitations: string[];
};

type ValidateGraphRequestWire = OperationRequestEnvelopeWire & {
  graph_version: Id;
  graph_schema_version: Version;
};

type GraphValidationResultWire = OperationResultEnvelopeWire & {
  graph_version: Id;
  graph_schema_version: Version;
  valid: boolean;
  findings: Array<Record<string, unknown>>;
};

type RunFixtureRequestWire = OperationRequestEnvelopeWire & {
  fixture_id: Id;
  fixture_version: Version;
  system_id: Id;
  system_version: Version;
};

type FixtureRunResultWire = OperationResultEnvelopeWire & {
  run_id: Id;
  run_version: Version;
  fixture_id: Id;
  fixture_version: Version;
  system_id: Id;
  system_version: Version;
  evaluations: EvaluationResultWire[];
};

type CalibrationReportRequestWire = OperationRequestEnvelopeWire & {
  calibration_profile_id: Id;
  calibration_profile_version: Version;
};

type CalibrationReportResultWire = OperationResultEnvelopeWire & {
  calibration_profile_id: Id;
  calibration_profile_version: Version;
  report: Record<string, unknown>;
};

type ReliabilityReportRequestWire = OperationRequestEnvelopeWire & {
  study_id: Id;
  study_version: Version;
};

type ReliabilityReportResultWire = OperationResultEnvelopeWire & {
  study_id: Id;
  study_version: Version;
  report: Record<string, unknown>;
};

type HarnessErrorResultWire = OperationResultEnvelopeWire & {
  error:
    | "unsupported_measurement_scope"
    | "hard_pass_reference_required"
    | "version_mismatch"
    | "semantic_identity_mismatch"
    | "control_scope_mismatch";
  details: Record<string, unknown>;
  safe_next_step?: string;
};

interface VoiceToneHarness {
  compile_context(
    request: CompileContextRequestWire
  ): Promise<ContextPacketWire | HarnessErrorResultWire>;
  evaluate(
    request: EvaluateRequestWire
  ): Promise<EvaluationResultWire | HarnessErrorResultWire>;
  compare(
    request: CompareRequestWire
  ): Promise<CompareResultWire | HarnessErrorResultWire>;
  validate_graph(
    request: ValidateGraphRequestWire
  ): Promise<GraphValidationResultWire | HarnessErrorResultWire>;
  run_fixture(
    request: RunFixtureRequestWire
  ): Promise<FixtureRunResultWire | HarnessErrorResultWire>;
  calibration_report(
    request: CalibrationReportRequestWire
  ): Promise<CalibrationReportResultWire | HarnessErrorResultWire>;
  reliability_report(
    request: ReliabilityReportRequestWire
  ): Promise<ReliabilityReportResultWire | HarnessErrorResultWire>;
}
```

The trusted control plane constructs this envelope; a model, repository document, caller-provided boolean, approver, or operating mode cannot construct or widen it. For every operation record it verifies at execution time that (1) the phase uses the exact canonical name and maps to the typed SEC-P0 gate, (2) the phase result is `PASS`, current, applicable to the exact versioned implementation profile, unexpired, and evaluated under the recorded gate-policy version, (3) the grant has a version and issuance record, binds the authenticated principal and/or workload, repeats the same phase, exact tool/operation/resource, data/egress/environment boundary and authorization-policy version, carries every effective condition, and is unexpired and currently unrevoked through the named check path, and (4) the envelope, operation control, gate result, grant, policy decision, applicable control records, and every bound profile retain immutable record/profile hashes and source/producer/retrieval provenance. Field disagreement denies rather than selecting the broader value.

The primary operation ID must resolve to exactly one record in `operations`, and operation IDs must be unique. Each additional phase or externally consequential operation needs its own record, current gate result, and current grant. `control_dispositions` is an exhaustive object with exactly five keys—`connection_authorization`, `data_processing`, `durable_memory`, `persistence`, and `telemetry`—and no additional keys. A duplicate-key-rejecting JSON decoder must run before schema validation. Each class occurs exactly once as either (a) `applicable`, with the exact current typed record, complete class-specific conditions, record/profile provenance, owner/approval, validity, expiry, and revocation check, or (b) `not_applicable`, with the exact operation/resource, nonempty rationale and evidence, versioned policy decision provenance, evaluation time, expiry, and current revocation check. Missing, duplicate, class/key-mismatched, both-applicable-and-N/A, generic, expired, revoked, or unverifiable dispositions deny. The requested operating mode expresses intent only and never authorizes an operation. `input_version_refs` and operation-specific version fields must agree; absence or mismatch denies.

For `verify.runtime`, the conditional wire type makes `runtime_constraints` mandatory rather than nullable. The grant must bind the exact runtime plan and provenance, executor and environment profiles, build/hash, executable or browser/version, immutable arguments, origins/routes/actions, start state/role/locale/flags, filesystem and network boundaries, credentials/data classes, child-process/download/external-protocol policy, capture profile, resource/action/time limits, cancellation, and cleanup. For every other phase, `runtime_constraints` must be exactly `null`. A runtime operation that also calls a model or connector carries a separate P0-B operation record and grant; P0-G never supplies it.

Results are ephemeral unless `persistence.mode = "persist"`. In that branch, the persistence decision must authorize the exact result type, fields, purpose, store/profile, region, isolation, access roles, retention, deletion, export, owner, and approval, and `append_operation` must independently bind canonical `draft.patch` to a current SEC-P0-C result and an exact current `record.append` grant for that store and record. The append operation's `control_dispositions.persistence` must be `applicable` and resolve to the same persistence-decision ID/version/hash; every other operation in an ephemeral envelope must disposition persistence as exact `not_applicable`. The append operation cannot authorize source-of-truth mutation. The returned result echoes the fully resolved control envelope and records the append outcome, so a later approval, delivery event, persistence decision, or rerun cannot rewrite the conditions under which it was produced.

`HardPassEvaluationRecordRefWire` is an external reference minted only after an `EvaluationResultWire` with hard gate `PASS` has been immutably appended. It is never embedded back into that evaluation result. Its record/store, persistence-decision, and append-operation IDs/versions are copied exactly from the persisted result's `persistence_outcome`; `evaluation_result_id`/`evaluation_result_version`, `candidate_id`/`candidate_version`, and `context_id`/`context_version` are copied exactly from the persisted evaluation payload. The context record independently carries the same `semantic_message_id` as the candidate and evaluation; any mismatch denies evaluation or reference issuance. Its `evaluation_record_content_hash` uses this exact non-self-referential contract: clone the complete persisted `EvaluationResultWire`, including those immutable candidate, context, semantic-message, graph, rule, and hard-check bindings; replace `/persistence_outcome/content_hash` with JSON `null`; serialize the clone as UTF-8 RFC 8785 canonical JSON; compute SHA-256; and store the lowercase digest with the `sha256:` prefix and the fixed contract ID `hash-contract:evaluation-result-wire:v1`. The append service, comparison service, and auditor recompute the same preimage and verify the persisted record ID/version, candidate/context versions, semantic-message identity, graph/rule versions, `PASS` result, and required `PASS` check refs. An ephemeral result cannot issue this reference and therefore cannot enter pairwise comparison.

## 49. Minimal HTTP surface

**[Proposal]** A transport adapter can expose:

| Method and path | Operation | Side effect |
| --- | --- | --- |
| `POST /v0/context/compile` | Resolve a context packet and its unknowns | Ephemeral result by default; separately authorized immutable append only |
| `POST /v0/evaluations` | Run hard checks and configured soft evaluators | Ephemeral result by default; separately authorized immutable append only |
| `POST /v0/comparisons` | Compare two candidates only after both exact `PASS` references and measurement support validate | Ephemeral result by default; separately authorized immutable append only |
| `POST /v0/fixtures/{id}/runs` | Run one exact benchmark fixture/system version | Ephemeral result by default; separately authorized immutable append only |
| `GET /v0/graphs/{version}/validate` | Validate graph types, references, scopes, and invariants | Ephemeral response; no persistence unless the request composes an authorized append |
| `GET /v0/calibrations/{id}/report` | Return reliability/calibration evidence and limits | Ephemeral response; no persistence unless the request composes an authorized append |
| `GET /v0/studies/{id}/reliability` | Return alpha/agreement, CI, disagreements, and sampling metadata | Ephemeral response; no persistence unless the request composes an authorized append |

Every route consumes the applicable `OperationRequestEnvelopeWire` and returns its declared `OperationResultEnvelopeWire`; transport conventions may carry the full wire control envelope in a signed header or body, but may not replace it with a mode flag or bearer token alone. Missing request/result IDs, schema/harness/input versions, exact controls, or mismatched duplicate fields fail closed. The service rejects evaluation when candidate semantic identity and context semantic identity do not match, and rejects comparison when either external immutable hard-gate record reference is absent, mismatched, unverified, or not `PASS`, or when measurement comparability is `UNSUPPORTED` or `UNKNOWN`. Domain errors such as `unsupported_measurement_scope` and `hard_pass_reference_required` use `HarnessErrorResultWire`, so they retain the same complete result ID/version, input-version list, resolved operation-control envelope, and persistence outcome as successful results. A request denied before a valid trusted envelope exists is not executed as a harness operation; the control plane emits its separately governed denial audit record and no content result.

## 50. Reference execution order

```text
validate graph snapshot and exact IDs
  -> resolve every exact operation through canonical phase, current SEC-P0 result,
     current exact grant, policy, actor/workload, and applicable control records
  -> compile typed context and preserve unknowns/conflicts
  -> resolve applicable hard rules and mandatory reviewers
  -> evaluate hard rules in PASS/FAIL/UNKNOWN/NA space
  -> stop or route when hard gate is not PASS
  -> run supported feature adapters with method/scope metadata
  -> normalize using exact calibration profiles
  -> produce per-dimension fit intervals and scorecard
  -> require immutable PASS evaluation refs for both candidates
  -> compare candidates only when measurement comparability is SUPPORTED
  -> return results ephemerally by default
  -> append an immutable record only under a scoped persistence decision
     plus a separate current draft.patch/P0-C record.append grant
  -> never change evidence, decision, approval, or delivery state
```

# Part XII — Validation agenda

## 51. What must be learned before productization

1. **[Open question]** Which voice and tone dimensions experienced content designers can apply with acceptable reliability across real contexts, and which should remain qualitative principles only?
2. **[Open question]** Are interval targets more reliable and useful than exemplar/ranking-only judgments for short product content?
3. **[Open question]** Which context-to-tone relations are stable enough for monotonic rules, and where do domain, locale, power, or channel interactions defeat simple coefficients?
4. **[Open question]** Can qualified users distinguish voice fidelity from tone fit consistently when both are shown in rendered context?
5. **[Open question]** Which semantic-preservation measures detect omission of consequence, timing, rights, recovery, and behavior in short messages without unacceptable false confidence?
6. **[Open question]** What rater design, sample size, and disagreement process are viable for high-risk, multilingual, accessible product content?
7. **[Open question]** Which counterfactual swaps expose stereotyping without creating unnatural or semantically different fixtures?
8. **[Open question]** How should measurement invariance be tested across languages, scripts, dialects, and surfaces without treating English as the latent norm?
9. **[Open question]** How much authoring and governance burden does this graph impose, and what is the lightest vertical slice that still preserves the required separations?
10. **[Open question]** Do scorecards and pairwise explanations improve expert decisions, or do they create automation bias and metric gaming?

## 52. Minimum viable experiment

**[Proposal]** Begin with one organization, one approved voice profile, one interaction family, two surfaces, two risk levels, and one locale with qualified reviewers. A useful first experiment is 40–60 semantic-message families containing routine/reversible and consequential/error variants, each with hard-failing, meaning-changing, tone-misaligned, and eligible candidates.

The experiment should test:

- graph/type validity;
- context and unknown preservation;
- deterministic terminology/behavior constraints;
- three to five anchored voice/tone dimensions;
- separate semantic preservation and naturalness;
- protected/proxy and consequence counterfactuals;
- blinded pairwise comparisons and Bradley-Terry fit by dimension;
- pre-adjudication Krippendorff alpha and disagreement reasons;
- held-out probability calibration; and
- expert review time and usefulness.

Do not start by deploying a universal style scorer or by training on all existing strings. The first success criterion is whether the harness helps qualified reviewers make a traceable decision while refusing false equivalence, unsupported context, and unsafe compensation.

## Bottom line

**[Proposal]** A computable voice-and-tone system should behave like a constrained decision instrument:

- the graph states what the message means, what context applies, and why;
- hard rules protect truth, behavior, terminology, access, privacy, and exact governed requirements;
- soft measures describe conditional fit with uncertainty rather than declaring universal quality;
- pairwise and human evaluation retain tradeoffs and disagreement;
- multilingual and cultural adaptation require direct evidence rather than demographic inference;
- calibration estimates how reliable a detector is, not whether a decision is approved; and
- evidence, decision, approval, delivery, and evaluation remain independent through the entire lifecycle.

That is the narrowest mathematical model consistent with the repository's research boundary: explicit enough to compute, inspect, test, and falsify, while refusing to turn organization voice, human context, or culture into a single universal number.
