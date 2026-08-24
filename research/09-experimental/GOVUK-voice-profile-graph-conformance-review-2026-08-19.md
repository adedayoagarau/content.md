---
title: GOV.UK candidate voice-profile graph conformance review
status: working-note
started: 2026-08-19
updated: 2026-08-19
review_mode: static-paper-only
candidate_profile_id: VP-CAND-GOVUK-PUBLIC-001
candidate_profile_version: candidate-0.1
conformance_result: paper-mappable-not-graph-admissible
authority_effect: none
implementation_status: not-built
evaluation_status: not-run
source_documents:
  - public-licensed-voice-profile-candidate-govuk-2026-08-19.md
  - voice-tone-graph-and-measurement.md
  - voice-tone-measurement-simulation-protocol.md
  - ../00-method/research-protocol.md
source_locks:
  candidate_sha256: c3f3185689cc95052ef4dab398609f6b94ec3451b79a46b66aa95cf759e6ef61
  graph_model_sha256: b2d9512c904038faf7fb113fa15f98d9a50a4f0e7c713f6e2f53cb3d622b3384
  simulation_protocol_sha256: 9c7d0ecd64b5f32543fc2a16b69c65fa1ad97c9c3f209cd15a866e5c8dd7bcb8
  research_protocol_sha256: ed9ba9bc2714a53cf107043e00eee6433ab453d9425a58842adc50abdf685ac4
---

# GOV.UK candidate voice-profile graph conformance review

## Result

`VP-CAND-GOVUK-PUBLIC-001@candidate-0.1` is **representable in principle** across the current graph's separate voice, tone, terminology, mechanics, accessibility, privacy, evidence and decision families. It is **not yet an admissible graph snapshot or harness profile**.

The distinction matters. The candidate contains useful public-source semantics, but it lacks the versioned owner, decision, approval, feature, locale, context, concept and edge records required to make those semantics mechanically evaluable without guessing. This review does not fill those gaps by inventing authority or values.

No model, browser, product, graph store, evaluator or simulator was run. No record was approved, enforced, persisted as an operational record, or promoted to organizational truth.

## Review question

Can the public candidate enter the graph without collapsing any of these independent axes?

1. stable organization voice
2. situational tone
3. terminology and mechanics
4. semantic and behavioral truth
5. accessibility, locale and surface constraints
6. evidence, decision, approval, delivery and evaluation state
7. hard eligibility versus soft measurement

## Static conformance matrix

| Graph contract | Candidate material | Static finding | Current disposition |
| --- | --- | --- | --- |
| `OrganizationVoiceProfile` needs ID, product/organization scope, principles, owner, decision reference and version | profile ID/version and four dimensions exist; scope is bounded to documented GOV.UK practice | authorized owner and versioned decision reference are absent | `missing-required-governance-fields` |
| `VoicePrinciple` needs reason, behaviours, avoidances, exceptions and examples/counterexamples | operational meanings, boundaries, evidence and eight synthetic examples exist | examples are not explicitly allocated to every principle, and exception sets are incomplete | `paper-mappable` |
| `TonePolicy` needs typed context predicates, target feature intervals, monotonic rules and exceptions | six state policies separate ordinary validation, serious outage, high stress, legal, transactional and specialist-term conditions | feature definitions and numeric/ordinal target intervals are absent; applicability precedence and exception resolution are not frozen | `policy-semantics-present-measurement-contract-missing` |
| `TermLabel -> Concept` needs locale/scope status and concept identity | eleven terminology/mechanics proposals identify preferred, controlled, avoided and prohibited forms | no stable concept IDs, behavior bindings, exact locale/surface scopes or approved label states exist | `terminology-not-graph-admissible` |
| `ConstraintRule` hard mode needs deterministic predicate, severity, approved decision and exact approval | five non-averagable candidate violations are proposed | none may be enforced because decision and approval are absent | `proposal-only-no-enforcement` |
| `MessageContext` needs event, actors, goal, state, consequence, reversibility, urgency, uncertainty, agency, responsibility and entry point | situational policies name partial state classes | no complete message-specific context packet exists | `context-template-only` |
| `LocaleProfile` needs BCP 47 language/script/market, formats, fallback and local review | sources prescribe UK English and inclusive language within GOV.UK scope | no approved BCP 47 profile, market applicability, fallback or local-review record exists | `locale-unsupported` |
| `AccessibilityRequirement` needs modality, semantic role, behaviour, test method and applicability | descriptive links and no colour/shape/location-only instruction are present | no criterion mapping, surface-specific test or rendered/assistive result exists | `requirement-candidate-not-tested` |
| `SurfaceProfile` needs channel, component, slot, privacy, interruption, length, semantics and fallback | UI and publishing scopes are distinguished in prose | no versioned surface records or exact candidate-to-surface applicability edges exist | `surface-scope-incomplete` |
| `EvidenceSource` retains source coordinates, fitness and five independent evidence dimensions | seven official-source rows identify scope, freshness, rights and limitations | page bodies are not content-hash bound, and the five dimensions are not materialized as typed records | `source-view-not-evidence-record-set` |
| `DecisionRecord` remains separate from approval, delivery and evaluation | the candidate repeatedly says approval, implementation and evaluation are absent | exact decision object/version/state record is absent rather than fabricated | `honest-null-boundary` |
| hard eligibility precedes soft scoring | candidate separates non-averagable rules from four soft voice dimensions | no hard-rule result, feature result, calibration or score is emitted | `design-aligned-not-run` |

## Required node projection

The smallest faithful future graph projection would require these node families. Counts are proposed construction requirements, not current records.

| Node family | Minimum future instances | Candidate source | Missing before materialization |
| --- | ---: | --- | --- |
| `OrganizationVoiceProfile` | 1 | profile header and scope | owner, decision ref, graph/schema version, effective/review dates |
| `VoicePrinciple` | 4 | VP-GOVUK-D01–D04 | typed behaviours, avoidances, exceptions and allocated example refs |
| `TonePolicy` | 6 | VP-GOVUK-T01–T06 | complete predicates, precedence, feature definitions, target intervals, exceptions |
| `Concept` | at least 8 | obligation, option, process need, apology, action, specialist term, speaker role, accessible navigation | definitions, boundaries, behavior contracts and scheme |
| `TermLabel` | at least 11 | VP-GOVUK-L01–L11 | label status, concept ref, locale, surface, restrictions and decision ref |
| `ConstraintRule` | at least 5 | hard-before-soft proposal | exact deterministic predicates/tests, severity, applicability, decision and approval |
| `AccessibilityRequirement` | at least 2 | descriptive-link and non-visual-reference rules | target criteria, modalities, test methods and surface applicability |
| `LocaleProfile` | at least 1 | UK-English source scope | exact language/market, fallback, local reviewer and completion state |
| `EvidenceSource` | 7 | GOVUK-VP-S01–S07 | typed records, content hash or explicit unpinned status, five evidence dimensions |
| `DecisionRecord` | 1 profile plus one per governed rule/policy/label set | candidate governance boundary | accountable owner, exact state, rationale and version |
| `SemanticDecisionApproval` | policy-dependent | none | must remain absent unless validly issued for exact records/scope |

## Required edge projection

| Edge | Required future use | Fail-closed condition |
| --- | --- | --- |
| `HAS_PRINCIPLE` | profile to each of the four principles | every principle is version-aligned and in declared order |
| `SUPPORTED_BY` | each sourced property to exact evidence records | source fitness and property support are explicit; a source does not approve the node |
| `HAS_DECISION` | profile, policies, rules and governed label sets to independent decisions | missing decision leaves the object proposed and unenforceable |
| `HAS_SEMANTIC_APPROVAL` | decision to exact approval only when policy requires it | missing, expired, revoked or scope-mismatched approval blocks enforcement |
| `MODULATED_BY` | a semantic message to matched tone policies | full context predicates and rule trace must match; no profile write-back |
| `LABEL_FOR` | each scoped term label to a stable concept | string similarity or source frequency cannot create a concept link |
| `CONSTRAINED_BY` | message/expression to applicable hard rules, facts or instruments | applicability must be separately resolved |
| `REQUIRES_ACCESSIBILITY` | message/expression/surface to exact accessibility requirement | static prose cannot claim rendered or assistive conformance |
| `FOR_LOCALE` | expression/message to exact locale profile | UK source scope cannot become a universal English fallback |
| `EVALUATED_BY` | future node/object to an immutable evaluation record | evaluation cannot change decision, approval or delivery state |

## Specific non-collapse checks

| Check ID | Pressure case | Required result |
| --- | --- | --- |
| `GOVUK-GC-01` | A warm validation message adds an unnecessary apology | tone/style may be revised, but no service-failure fact is inferred |
| `GOVUK-GC-02` | A concise sentence weakens `must` to an option | hard semantic/controlled-fact failure; soft clarity cannot compensate |
| `GOVUK-GC-03` | A direct CTA says `click the green button` | accessibility rule remains independent of directness score |
| `GOVUK-GC-04` | A serious outage uses humour but includes correct recovery | serious-state rule may fail even when actionability passes |
| `GOVUK-GC-05` | A required specialist term is replaced by a familiar but inaccurate label | concept/behavior fidelity wins over lexical familiarity |
| `GOVUK-GC-06` | The candidate is applied to another country or organization | applicability is `UNKNOWN` or `NOT_APPLICABLE`; no organization-fidelity claim |
| `GOVUK-GC-07` | A page is OGL-readable | rights availability does not create profile approval or enforcement authority |
| `GOVUK-GC-08` | An evaluator agrees with all proposed examples | agreement does not establish cognitive validity, production use or user outcome |

## Integration blockers

| Blocker ID | Why it matters | Earliest safe closure evidence |
| --- | --- | --- |
| `GOVUK-GI-01` | no authorized owner or decision means the profile cannot become organization-owned | hash-bound owner decision for an exact profile version and scope |
| `GOVUK-GI-02` | unpinned rolling pages make later rule reproduction uncertain | permitted source snapshots/hashes and freshness policy |
| `GOVUK-GI-03` | absent feature definitions/anchors make tone intervals arbitrary | cognitive-validation output plus approved feature/rubric versions |
| `GOVUK-GI-04` | no complete context, locale or surface records means policy matching could guess | schema-valid context/locale/surface fixtures with explicit unknowns |
| `GOVUK-GI-05` | absent concepts and behavior contracts let terminology become string matching | approved concept/term/behavior packet with exact scopes |
| `GOVUK-GI-06` | no approved hard-rule decisions means enforcement would overclaim authority | deterministic tests plus current decision/approval/applicability records |
| `GOVUK-GI-07` | no run or calibration evidence means metric outputs would be ungrounded | separately authorized synthetic simulator and later human validation |

## Disposition

The candidate passes a **paper representability** check and fails **graph admission** by design. The current graph model can preserve the necessary distinctions, but the candidate must not be serialized as if its missing governance and measurement fields were merely optional.

The correct next use is an input to the still-proposed offline simulator specification: exercise missing/unknown, wrong-scope, no-approval and hard-versus-soft cases. The review itself grants no permission to write that specification, build the simulator, run a judge or evaluate a product.
