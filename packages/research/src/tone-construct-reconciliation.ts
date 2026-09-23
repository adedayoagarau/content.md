import { sha256Canonical } from "@contentmd/core";
import type { VoiceToneFeatureName } from "./voice-tone-records.js";

export const TONE_CONSTRUCT_RECONCILIATION_VERSION =
  "contentmd.tone-construct-reconciliation/0.1.0" as const;

export const RECONCILED_VOICE_TONE_FEATURES = [
  "directness",
  "formality",
  "warmth",
  "reassurance",
  "expressiveness",
  "humor",
  "urgency",
  "information_density",
  "authority_stance",
] as const satisfies readonly VoiceToneFeatureName[];

export interface ToneConstructSource {
  source_id: string;
  title: string;
  source_type: "bounded_empirical_practitioner" | "practitioner_method" | "secondary_synthesis"
    | "local_evidence_synthesis";
  url: string | null;
  source_location: string | null;
  published_or_as_of: string;
  retrieved_or_verified: string;
  supported_claims: string[];
  limitations: string[];
  authority_effect: "none";
}

export type ToneConstructMappingDisposition =
  | "close_candidate_correspondence"
  | "partial_overlap"
  | "separate_policy_layer"
  | "observable_marker"
  | "architecture_support"
  | "unmapped_open_question"
  | "secondary_restatement";

export interface ToneConstructMapping {
  mapping_id: string;
  source_id: string;
  source_construct: string;
  source_role: "dimension" | "operational_category" | "architecture_claim" | "expression_marker";
  disposition: ToneConstructMappingDisposition;
  existing_feature_refs: VoiceToneFeatureName[];
  target_system: "voice_feature" | "tone_policy" | "terminology" | "mechanics"
    | "semantic_contract" | "assurance_kernel" | "open_research";
  rationale: string;
  non_equivalence: string[];
}

export type ToneFeatureReconciliationDisposition =
  | "retain_candidate"
  | "rename_or_split_review"
  | "situational_policy_review"
  | "split_fact_from_expression_review"
  | "move_role_truth_to_hard_plane_review";

export interface ToneFeatureReconciliation {
  feature_name: VoiceToneFeatureName;
  disposition: ToneFeatureReconciliationDisposition;
  external_support: "close" | "partial" | "local_only";
  mapping_refs: string[];
  finding: string;
  limitation: string;
}

export interface ToneConstructReconciliationArtifact {
  contract_version: typeof TONE_CONSTRUCT_RECONCILIATION_VERSION;
  artifact_id: "contentmd.tone-construct-reconciliation.en.v0.1";
  language_scope: "en";
  status: "candidate_reconciliation_no_promotion";
  current_model: {
    feature_names: VoiceToneFeatureName[];
    compatibility_status: "qualitatively_compatible_without_numeric_calibration";
    numeric_calibration_status: "not_established";
    construct_validity_status: "not_established";
  };
  sources: ToneConstructSource[];
  mappings: ToneConstructMapping[];
  feature_reconciliation: ToneFeatureReconciliation[];
  decisions: string[];
  open_questions: string[];
  required_validation: string[];
  authority_effect: "none";
  reconciliation_digest: string;
}

function lexical(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

const sources: ToneConstructSource[] = [
  {
    source_id: "tone-source.nng-four-dimensions",
    title: "The Four Dimensions of Tone of Voice",
    source_type: "bounded_empirical_practitioner",
    url: "https://www.nngroup.com/articles/tone-of-voice-dimensions/",
    source_location: null,
    published_or_as_of: "2016-07-17; reviewed 2023-08-16",
    retrieved_or_verified: "2026-09-21",
    supported_claims: [
      "The article proposes formal-casual, serious-funny, respectful-irreverent, and matter-of-fact-enthusiastic spectra.",
      "Its reported survey used 50 American respondents and found statistically significant but small rating differences.",
      "It recommends varying tone by situation while keeping brand personality consistent and testing with users.",
    ],
    limitations: [
      "The proposed dimensions are not a validated universal product-content construct model.",
      "The reported sample is small, US-only, and measured impressions of created examples rather than production task outcomes.",
      "An attempt at humor was measured; successful or appropriate humor was not established.",
    ],
    authority_effect: "none",
  },
  {
    source_id: "tone-source.harwood-voice-chart",
    title: "Voice chart: put one in your UX writing toolkit",
    source_type: "practitioner_method",
    url: "https://medium.com/@rachaelharwood_ux/voice-chart-put-one-in-your-ux-writing-toolkit-08965f0e3b3a",
    source_location: null,
    published_or_as_of: "2024-05-05",
    retrieved_or_verified: "2026-09-21",
    supported_claims: [
      "The practitioner chart organizes voice guidance by attributes, concepts, vocabulary, wordiness, grammar, punctuation, and capitalization.",
      "It treats voice as stable while tone varies across moments in a journey.",
      "It presents the chart as a decision aid for writers, not a calibrated measurement instrument.",
    ],
    limitations: [
      "This is a practitioner explanation derived in part from a referenced book, not an independent validation study.",
      "The worked example is illustrative and does not establish cross-product effectiveness or feature thresholds.",
    ],
    authority_effect: "none",
  },
  {
    source_id: "tone-source.uxdi-tone-guide",
    title: "How to define your tone of voice in UX writing",
    source_type: "secondary_synthesis",
    url: "https://www.uxdesigninstitute.com/blog/tone-of-voice-for-ux-writing/",
    source_location: null,
    published_or_as_of: "2025-01-10",
    retrieved_or_verified: "2026-09-21",
    supported_claims: [
      "The guide distinguishes relatively stable voice from context-dependent tone.",
      "It restates the Nielsen Norman Group dimensions and describes language, structure, punctuation, and emoji as expression choices.",
      "It recommends scenario-specific variation and user research.",
    ],
    limitations: [
      "This is a secondary how-to synthesis rather than independent construct or outcome validation.",
      "Its percentage examples are illustrative and do not supply calibrated feature values.",
    ],
    authority_effect: "none",
  },
  {
    source_id: "tone-source.contentmd-cross-dataset-2026-08-27",
    title: "Cross-dataset voice and tone verification",
    source_type: "local_evidence_synthesis",
    url: null,
    source_location: "research/09-experimental/voice-tone-cross-dataset-verification-2026-08-27/README.md",
    published_or_as_of: "2026-08-27",
    retrieved_or_verified: "2026-09-21",
    supported_claims: [
      "Four first-party guidance systems were qualitatively compatible with the existing nine-feature vocabulary.",
      "The observed guidance supported context-sensitive qualitative hypotheses rather than universal numeric intervals.",
      "Voice was relatively stable while tone varied by state, surface, and consequence in the reviewed systems.",
    ],
    limitations: [
      "The pass did not establish numeric calibration, human agreement, non-English applicability, owner approval, or accessibility conformance.",
      "Public marketing observations cannot validate transactional product states.",
    ],
    authority_effect: "none",
  },
];

const mappings: ToneConstructMapping[] = [
  {
    mapping_id: "tone-map.nng.formality",
    source_id: "tone-source.nng-four-dimensions",
    source_construct: "formal-casual",
    source_role: "dimension",
    disposition: "close_candidate_correspondence",
    existing_feature_refs: ["formality"],
    target_system: "voice_feature",
    rationale: "Both name register formality, but the current feature has no validated anchors and may also contain social distance.",
    non_equivalence: ["Casual register is not necessarily conversational style or interpersonal closeness."],
  },
  {
    mapping_id: "tone-map.nng.humor",
    source_id: "tone-source.nng-four-dimensions",
    source_construct: "serious-funny",
    source_role: "dimension",
    disposition: "close_candidate_correspondence",
    existing_feature_refs: ["humor"],
    target_system: "tone_policy",
    rationale: "The source operationalizes this dimension as an attempt at humor, which is close to the existing humor feature.",
    non_equivalence: ["Seriousness is not always the inverse of humor.", "Attempted humor does not establish successful or appropriate humor."],
  },
  {
    mapping_id: "tone-map.nng.respectfulness",
    source_id: "tone-source.nng-four-dimensions",
    source_construct: "respectful-irreverent",
    source_role: "dimension",
    disposition: "unmapped_open_question",
    existing_feature_refs: [],
    target_system: "open_research",
    rationale: "No current feature directly represents irreverence toward subject matter, and authority stance is not respectfulness.",
    non_equivalence: [
      "Respect for the user and their agency belongs on a hard ethics plane, not an optional style scale.",
      "Irreverence toward a subject can be stylistic without permitting offense, blame, or diminished dignity toward a person.",
    ],
  },
  {
    mapping_id: "tone-map.nng.enthusiasm",
    source_id: "tone-source.nng-four-dimensions",
    source_construct: "matter-of-fact-enthusiastic",
    source_role: "dimension",
    disposition: "partial_overlap",
    existing_feature_refs: ["expressiveness", "warmth"],
    target_system: "tone_policy",
    rationale: "Enthusiasm can use expressive and warm signals, but neither existing feature is equivalent to energy or excitement.",
    non_equivalence: ["Expressiveness also includes metaphor, rhythm, and personality.", "Warmth can be calm and low-energy."],
  },
  {
    mapping_id: "tone-map.nng.context-variation",
    source_id: "tone-source.nng-four-dimensions",
    source_construct: "stable brand personality with situational tone variation",
    source_role: "architecture_claim",
    disposition: "architecture_support",
    existing_feature_refs: [],
    target_system: "tone_policy",
    rationale: "This supports keeping organization voice profiles separate from context-bound tone policies.",
    non_equivalence: ["Architecture agreement does not validate any specific feature, interval, or threshold."],
  },
  {
    mapping_id: "tone-map.harwood.attributes",
    source_id: "tone-source.harwood-voice-chart",
    source_construct: "voice attributes",
    source_role: "operational_category",
    disposition: "separate_policy_layer",
    existing_feature_refs: [],
    target_system: "voice_feature",
    rationale: "Attributes are organization-owned principles that may constrain several features rather than becoming features automatically.",
    non_equivalence: ["A brand adjective is not an observable or calibrated dimension."],
  },
  {
    mapping_id: "tone-map.harwood.concepts",
    source_id: "tone-source.harwood-voice-chart",
    source_construct: "recurring concepts",
    source_role: "operational_category",
    disposition: "separate_policy_layer",
    existing_feature_refs: [],
    target_system: "semantic_contract",
    rationale: "Recurring concepts belong to content models, message semantics, and brand themes rather than tonal intensity.",
    non_equivalence: ["Concept frequency is not voice fidelity or tone fit."],
  },
  {
    mapping_id: "tone-map.harwood.vocabulary",
    source_id: "tone-source.harwood-voice-chart",
    source_construct: "vocabulary and avoided words",
    source_role: "operational_category",
    disposition: "separate_policy_layer",
    existing_feature_refs: [],
    target_system: "terminology",
    rationale: "Product vocabulary requires concept identity, scope, and governance independent of style features.",
    non_equivalence: ["A frequently used word is not automatically approved terminology."],
  },
  {
    mapping_id: "tone-map.harwood.wordiness",
    source_id: "tone-source.harwood-voice-chart",
    source_construct: "wordiness",
    source_role: "operational_category",
    disposition: "partial_overlap",
    existing_feature_refs: ["information_density"],
    target_system: "voice_feature",
    rationale: "Wordiness can inform an observable for information density, but amount, complexity, redundancy, and density are different properties.",
    non_equivalence: ["Short text can be dense; long text can be necessary and well structured."],
  },
  {
    mapping_id: "tone-map.harwood.grammar",
    source_id: "tone-source.harwood-voice-chart",
    source_construct: "grammar choices",
    source_role: "expression_marker",
    disposition: "observable_marker",
    existing_feature_refs: ["formality"],
    target_system: "mechanics",
    rationale: "Grammar choices may provide scoped evidence of register, but mechanics rules should remain directly testable and separately governed.",
    non_equivalence: ["One grammar form does not identify overall formality or voice."],
  },
  {
    mapping_id: "tone-map.harwood.punctuation",
    source_id: "tone-source.harwood-voice-chart",
    source_construct: "punctuation choices",
    source_role: "expression_marker",
    disposition: "observable_marker",
    existing_feature_refs: ["expressiveness", "urgency"],
    target_system: "mechanics",
    rationale: "Punctuation can be an observable signal of expression or urgency but should not determine either feature alone.",
    non_equivalence: ["An exclamation mark does not establish genuine urgency, enthusiasm, accessibility, or appropriateness."],
  },
  {
    mapping_id: "tone-map.harwood.capitalization",
    source_id: "tone-source.harwood-voice-chart",
    source_construct: "capitalization choices",
    source_role: "expression_marker",
    disposition: "observable_marker",
    existing_feature_refs: [],
    target_system: "mechanics",
    rationale: "Capitalization is a scoped mechanics and component-system rule, not a latent tone dimension.",
    non_equivalence: ["Capitalization convention alone does not establish voice fit."],
  },
  {
    mapping_id: "tone-map.local.nine-feature-compatibility",
    source_id: "tone-source.contentmd-cross-dataset-2026-08-27",
    source_construct: "qualitative compatibility of the nine-feature vocabulary",
    source_role: "architecture_claim",
    disposition: "architecture_support",
    existing_feature_refs: [...RECONCILED_VOICE_TONE_FEATURES],
    target_system: "voice_feature",
    rationale: "The local evidence pass supports retaining the feature IDs as qualitative comparison candidates while their constructs are refined.",
    non_equivalence: [
      "Qualitative compatibility does not establish feature independence, numeric anchors, thresholds, or predictive validity.",
    ],
  },
  {
    mapping_id: "tone-map.local.voice-tone-separation",
    source_id: "tone-source.contentmd-cross-dataset-2026-08-27",
    source_construct: "stable voice with context-sensitive tone",
    source_role: "architecture_claim",
    disposition: "architecture_support",
    existing_feature_refs: [],
    target_system: "tone_policy",
    rationale: "The reviewed first-party systems support separating a relatively stable organization profile from context-bound expression policy.",
    non_equivalence: [
      "Shared architecture across the reviewed systems does not establish a universal voice or tone model.",
    ],
  },
  {
    mapping_id: "tone-map.uxdi.voice-tone-separation",
    source_id: "tone-source.uxdi-tone-guide",
    source_construct: "stable voice and context-dependent tone",
    source_role: "architecture_claim",
    disposition: "secondary_restatement",
    existing_feature_refs: [],
    target_system: "tone_policy",
    rationale: "The guide reinforces the architectural separation but does not independently validate it.",
    non_equivalence: ["A secondary restatement does not add independent construct evidence."],
  },
  {
    mapping_id: "tone-map.uxdi.four-dimensions",
    source_id: "tone-source.uxdi-tone-guide",
    source_construct: "four Nielsen Norman Group dimensions",
    source_role: "dimension",
    disposition: "secondary_restatement",
    existing_feature_refs: ["formality", "humor", "expressiveness", "warmth"],
    target_system: "open_research",
    rationale: "The guide repeats the source framework and therefore should not be counted as independent dimensional validation.",
    non_equivalence: ["Worked percentages are illustrative, not calibrated intervals."],
  },
  {
    mapping_id: "tone-map.uxdi.expression-markers",
    source_id: "tone-source.uxdi-tone-guide",
    source_construct: "word choice, sentence structure, active-passive voice, punctuation, and emoji",
    source_role: "expression_marker",
    disposition: "observable_marker",
    existing_feature_refs: ["directness", "formality", "expressiveness", "information_density"],
    target_system: "mechanics",
    rationale: "These are candidate observables to test against features, not substitutes for feature definitions or human judgments.",
    non_equivalence: ["A marker can serve different pragmatic functions in different contexts."],
  },
];

const featureReconciliation: ToneFeatureReconciliation[] = [
  {
    feature_name: "directness",
    disposition: "retain_candidate",
    external_support: "local_only",
    mapping_refs: ["tone-map.local.nine-feature-compatibility", "tone-map.uxdi.expression-markers"],
    finding: "Keep directness as a qualitative candidate for how quickly action, consequence, or answer is stated.",
    limitation: "Direct wording cannot substitute for semantic sufficiency, product truth, or an operable next step.",
  },
  {
    feature_name: "formality",
    disposition: "rename_or_split_review",
    external_support: "close",
    mapping_refs: [
      "tone-map.local.nine-feature-compatibility",
      "tone-map.nng.formality",
      "tone-map.harwood.grammar",
      "tone-map.uxdi.four-dimensions",
    ],
    finding: "The formal-casual correspondence is strong enough to retain compatibility while testing a clearer register construct.",
    limitation: "The current name may collapse grammatical register, conversationality, familiarity, and social distance.",
  },
  {
    feature_name: "warmth",
    disposition: "retain_candidate",
    external_support: "partial",
    mapping_refs: [
      "tone-map.local.nine-feature-compatibility",
      "tone-map.nng.enthusiasm",
      "tone-map.uxdi.four-dimensions",
    ],
    finding: "Warmth remains useful as a bounded relationship signal but is not equivalent to enthusiasm.",
    limitation: "Warmth must not become emotional presumption, false reassurance, or a proxy for user benefit.",
  },
  {
    feature_name: "reassurance",
    disposition: "situational_policy_review",
    external_support: "local_only",
    mapping_refs: ["tone-map.local.nine-feature-compatibility"],
    finding: "Treat reassurance primarily as a context-conditioned treatment whose legitimacy depends on facts and recovery.",
    limitation: "Unsupported reassurance can obscure uncertainty or minimize consequence; it should not be a universally positive voice trait.",
  },
  {
    feature_name: "expressiveness",
    disposition: "rename_or_split_review",
    external_support: "partial",
    mapping_refs: [
      "tone-map.local.nine-feature-compatibility",
      "tone-map.nng.enthusiasm",
      "tone-map.harwood.punctuation",
      "tone-map.uxdi.expression-markers",
    ],
    finding: "Retain compatibility while testing whether energy, emotional intensity, figurative language, and personality need separate observables.",
    limitation: "Enthusiasm is only one possible form of expressiveness and can be inappropriate in consequential states.",
  },
  {
    feature_name: "humor",
    disposition: "retain_candidate",
    external_support: "close",
    mapping_refs: [
      "tone-map.local.nine-feature-compatibility",
      "tone-map.nng.humor",
      "tone-map.uxdi.four-dimensions",
    ],
    finding: "Humor has the closest external correspondence, but its suitability remains strongly context and consequence dependent.",
    limitation: "Detection of an attempt at humor does not establish that it succeeds, is respectful, or is safe.",
  },
  {
    feature_name: "urgency",
    disposition: "split_fact_from_expression_review",
    external_support: "local_only",
    mapping_refs: ["tone-map.local.nine-feature-compatibility", "tone-map.harwood.punctuation"],
    finding: "Separate actual deadline or hazard urgency from the expression signals used to communicate it.",
    limitation: "Style cannot create urgency, and strong urgency markers without product evidence can manipulate or alarm.",
  },
  {
    feature_name: "information_density",
    disposition: "rename_or_split_review",
    external_support: "partial",
    mapping_refs: [
      "tone-map.local.nine-feature-compatibility",
      "tone-map.harwood.wordiness",
      "tone-map.uxdi.expression-markers",
    ],
    finding: "Retain compatibility while separating amount, complexity, redundancy, layering, and density.",
    limitation: "Length alone cannot determine cognitive load, clarity, completeness, or information density.",
  },
  {
    feature_name: "authority_stance",
    disposition: "move_role_truth_to_hard_plane_review",
    external_support: "local_only",
    mapping_refs: ["tone-map.local.nine-feature-compatibility"],
    finding: "Split truthful actor and decision authority from the optional presentation of expertise or institutional stance.",
    limitation: "A style score must never imply that a system, organization, or assistant has authority it does not possess.",
  },
];

const preimage = {
  contract_version: TONE_CONSTRUCT_RECONCILIATION_VERSION,
  artifact_id: "contentmd.tone-construct-reconciliation.en.v0.1" as const,
  language_scope: "en" as const,
  status: "candidate_reconciliation_no_promotion" as const,
  current_model: {
    feature_names: [...RECONCILED_VOICE_TONE_FEATURES],
    compatibility_status: "qualitatively_compatible_without_numeric_calibration" as const,
    numeric_calibration_status: "not_established" as const,
    construct_validity_status: "not_established" as const,
  },
  sources: [...sources].sort((left, right) => lexical(left.source_id, right.source_id)),
  mappings: [...mappings].sort((left, right) => lexical(left.mapping_id, right.mapping_id)),
  feature_reconciliation: RECONCILED_VOICE_TONE_FEATURES.map((featureName) =>
    featureReconciliation.find((item) => item.feature_name === featureName)!),
  decisions: [
    "Keep the nine feature IDs for 0.1 compatibility; do not promote, delete, add, merge, or numerically recalibrate a feature from these sources alone.",
    "Keep organization voice, situational tone, terminology, mechanics, semantics, and assurance as separate systems.",
    "Treat respect for people, non-blaming language, truthful authority, product urgency, and semantic accuracy as hard constraints before advisory tone fit.",
    "Treat grammar, punctuation, capitalization, emoji, length, and word choice as candidate observables whose feature relationship must be tested.",
    "Do not count a secondary restatement as independent construct evidence.",
  ],
  open_questions: [
    "Should formality be renamed or split into register formality and social distance?",
    "Can subject-matter irreverence be defined independently from respect for the user and their agency?",
    "Should enthusiasm or expressive energy become a separate feature from expressiveness and warmth?",
    "Which parts of reassurance are tone policy, recovery design, or measurable user outcome?",
    "How should information amount, linguistic complexity, layering, redundancy, and density be separated?",
    "Which authority-stance observables remain advisory after actor and decision authority move to hard truth checks?",
  ],
  required_validation: [
    "Write atomic construct definitions with inclusion, exclusion, and near-neighbor counterexamples.",
    "Run cognitive interviews before assigning numeric scales or thresholds.",
    "Create English scenario pairs across routine, error, pending, denial, consent, destructive, notification, and support contexts.",
    "Collect qualified independent judgments and preserve indistinguishable, both-unacceptable, insufficient-context, and abstention outcomes.",
    "Test observables against human judgments without allowing marker counts to become ground truth.",
    "Validate by context, surface, risk, and English variant before any comparison or automation claim.",
  ],
  authority_effect: "none" as const,
};

export const TONE_CONSTRUCT_RECONCILIATION: ToneConstructReconciliationArtifact = deepFreeze({
  ...preimage,
  reconciliation_digest: sha256Canonical(preimage),
});

export function verifyToneConstructReconciliation(
  artifact: ToneConstructReconciliationArtifact,
): boolean {
  if (artifact.contract_version !== TONE_CONSTRUCT_RECONCILIATION_VERSION
    || artifact.artifact_id !== "contentmd.tone-construct-reconciliation.en.v0.1"
    || artifact.language_scope !== "en"
    || artifact.status !== "candidate_reconciliation_no_promotion"
    || artifact.authority_effect !== "none"
    || artifact.current_model.numeric_calibration_status !== "not_established"
    || artifact.current_model.construct_validity_status !== "not_established"
    || artifact.current_model.feature_names.length !== RECONCILED_VOICE_TONE_FEATURES.length
    || artifact.current_model.feature_names.some(
      (feature, index) => feature !== RECONCILED_VOICE_TONE_FEATURES[index],
    )) return false;
  const { reconciliation_digest: received, ...replay } = artifact;
  return /^[a-f0-9]{64}$/u.test(received)
    && received === TONE_CONSTRUCT_RECONCILIATION.reconciliation_digest
    && received === sha256Canonical(replay);
}
