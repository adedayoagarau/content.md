import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

type HardResult = "pass" | "fail" | "unknown" | "not_applicable";
type Disposition = "revise" | "escalate" | "human_preference_review";

interface ReviewWorkUnit {
  work_unit_id: string;
  context: {
    state: string;
    situation: string;
    surface: string;
    source_locale: string;
    target_locale: string;
  };
  candidate: {
    text: string;
    voice: string;
    tone: string;
    localization_status: string;
  };
  rubric: {
    hard_dimensions: string[];
    quality_dimensions: string[];
  };
}

interface BlindReviewPacket {
  contract_version: string;
  packet_digest: string;
  sample_count: number;
  review_work_units: ReviewWorkUnit[];
  authority_effect: string;
}

interface ContentDesignPrediction {
  work_unit_id: string;
  disposition: Disposition;
  hard_dimension_results: Record<string, HardResult>;
  quality_dimension_scores: Record<string, number | null>;
  rationale_codes: string[];
  evaluator_version: "contentmd.deterministic-content-design-baseline/0.1.0";
  authority_effect: "none";
}

export interface ContentDesignPredictionSet {
  contract_version: "contentmd.content-design-predictions/0.1.0";
  packet_digest: string;
  evaluator_version: "contentmd.deterministic-content-design-baseline/0.1.0";
  prediction_count: number;
  predictions: ContentDesignPrediction[];
  evaluation_status: "unscored_pending_qualified_gold";
  label_access: "blind_packet_only";
  authority_effect: "none";
  prediction_set_digest: string;
}

export interface ContentDesignReviewSubmissionTemplate {
  contract_version: "contentmd.content-design-review-submission/0.1.0";
  packet_ref: { packet_digest: string; sample_count: number };
  reviewer: {
    reviewer_id: null;
    reviewer_role: "qualified_content_designer";
    reviewed_at: null;
    independent_review_attested: false;
  };
  responses: Array<{
    work_unit_id: string;
    disposition: null;
    hard_dimension_results: Record<string, null>;
    quality_dimension_scores: Record<string, null>;
    rationale: null;
    acceptable_meaning_invariants: null;
    recommended_revision: null;
    review_evidence_refs: null;
  }>;
  submission_state: "incomplete";
  authority_effect: "none";
}

function digest(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function validatePacket(value: unknown): BlindReviewPacket {
  if (value === null || typeof value !== "object") throw new TypeError("content_design_benchmark_invalid:packet");
  const packet = value as BlindReviewPacket;
  if (packet.contract_version !== "contentmd.content-design-blind-review-packet/0.1.0"
    || packet.authority_effect !== "none"
    || !Number.isSafeInteger(packet.sample_count) || packet.sample_count < 1
    || !Array.isArray(packet.review_work_units) || packet.review_work_units.length !== packet.sample_count) {
    throw new TypeError("content_design_benchmark_invalid:packet");
  }
  const { packet_digest: packetDigest, ...preimage } = packet;
  if (packetDigest !== digest(preimage)) throw new TypeError("content_design_benchmark_invalid:packet_digest");
  return packet;
}

function predict(unit: ReviewWorkUnit): ContentDesignPrediction {
  const text = unit.candidate.text;
  const lower = text.toLocaleLowerCase("en-US");
  const state = unit.context.state.toLocaleLowerCase("en-US");
  const falseCertainty = /\beverything is complete\b/u.test(lower) && !/completed successfully/u.test(state);
  const vague = /\bsomething happened\b/u.test(lower) || /^continue\.?$/iu.test(text.trim());
  const blame = /\byou (?:did|entered|chose|caused)\b.*\b(?:incorrect|wrong|failed|mistake)/iu.test(text);
  const pressure = /\bact now\b|\bdon't miss out\b|\bhurry\b/iu.test(text);
  const overloaded = text.trim().split(/\s+/u).length > 28;
  const stateRepresented = lower.includes(state);
  const localeMismatch = unit.context.target_locale !== unit.context.source_locale
    && unit.candidate.localization_status === "source_language_candidate_requires_localization";
  const recovery: HardResult = unit.context.situation !== "payment_unknown"
    ? "not_applicable"
    : /\b(?:check|verify)\b.*\b(?:payment|status|order)\b/iu.test(text) ? "pass" : "fail";
  const hard: Record<string, HardResult> = {
    factual_accuracy: falseCertainty ? "fail" : "unknown",
    state_accuracy: falseCertainty || vague || !stateRepresented ? "fail" : "pass",
    semantic_fidelity: vague || !stateRepresented ? "fail" : "unknown",
    agency: pressure ? "fail" : "unknown",
    recovery,
    authority_boundary: /\b(?:approved|authorized|guaranteed)\b/iu.test(text) ? "unknown" : "pass",
  };
  const hardFailure = Object.values(hard).includes("fail");
  const disposition: Disposition = hardFailure || blame || pressure
    ? "revise"
    : localeMismatch ? "escalate" : "human_preference_review";
  const rationaleCodes = [
    falseCertainty && "unsupported_certainty",
    vague && "unclear_action_or_state",
    !stateRepresented && "state_not_represented",
    blame && "user_blame",
    pressure && "unsupported_urgency_or_pressure",
    overloaded && "poor_economy",
    localeMismatch && "in_locale_review_required",
  ].filter((value): value is string => typeof value === "string");
  return {
    work_unit_id: unit.work_unit_id,
    disposition,
    hard_dimension_results: hard,
    quality_dimension_scores: {
      clarity: vague ? 1 : overloaded ? 2 : 4,
      specificity: vague ? 1 : stateRepresented ? 4 : 2,
      hierarchy: overloaded ? 1 : unit.context.surface === "button" && text.split(/\s+/u).length > 8 ? 2 : 3,
      accessibility_readiness: unit.context.surface === "screen_reader_status" ? (overloaded ? 2 : 3) : null,
      locale_readiness: localeMismatch ? 1 : 4,
      voice_fit: blame || pressure ? 1 : 3,
      tone_fit: blame || pressure ? 1 : 3,
      economy: overloaded ? 1 : vague ? 2 : text.split(/\s+/u).length > 20 ? 2 : 4,
    },
    rationale_codes: rationaleCodes.length === 0 ? ["hard_checks_passed_preference_unresolved"] : rationaleCodes,
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.1.0",
    authority_effect: "none",
  };
}

export function predictContentDesignBenchmark(packetValue: unknown): ContentDesignPredictionSet {
  const packet = validatePacket(packetValue);
  const predictions = packet.review_work_units.map(predict);
  const preimage = {
    contract_version: "contentmd.content-design-predictions/0.1.0" as const,
    packet_digest: packet.packet_digest,
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.1.0" as const,
    prediction_count: predictions.length,
    predictions,
    evaluation_status: "unscored_pending_qualified_gold" as const,
    label_access: "blind_packet_only" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, prediction_set_digest: digest(preimage) };
}

export function createContentDesignReviewSubmissionTemplate(packetValue: unknown): ContentDesignReviewSubmissionTemplate {
  const packet = validatePacket(packetValue);
  return {
    contract_version: "contentmd.content-design-review-submission/0.1.0",
    packet_ref: { packet_digest: packet.packet_digest, sample_count: packet.sample_count },
    reviewer: {
      reviewer_id: null,
      reviewer_role: "qualified_content_designer",
      reviewed_at: null,
      independent_review_attested: false,
    },
    responses: packet.review_work_units.map((unit) => ({
      work_unit_id: unit.work_unit_id,
      disposition: null,
      hard_dimension_results: Object.fromEntries(unit.rubric.hard_dimensions.map((dimension) => [dimension, null])),
      quality_dimension_scores: Object.fromEntries(unit.rubric.quality_dimensions.map((dimension) => [dimension, null])),
      rationale: null,
      acceptable_meaning_invariants: null,
      recommended_revision: null,
      review_evidence_refs: null,
    })),
    submission_state: "incomplete",
    authority_effect: "none",
  };
}

export async function predictLocalContentDesignBenchmark(inputPath: string, outputPath?: string): Promise<ContentDesignPredictionSet> {
  const packet = JSON.parse(await readFile(inputPath, "utf8")) as unknown;
  const result = predictContentDesignBenchmark(packet);
  if (outputPath !== undefined) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}

export async function createLocalContentDesignReviewSubmissionTemplate(inputPath: string, outputPath: string): Promise<ContentDesignReviewSubmissionTemplate> {
  const packet = JSON.parse(await readFile(inputPath, "utf8")) as unknown;
  const result = createContentDesignReviewSubmissionTemplate(packet);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}
