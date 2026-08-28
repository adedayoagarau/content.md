import { sha256Canonical } from "./canonical-json.js";
import type {
  ContentQualificationState,
  QualifiedContentUnit,
} from "./content-qualification.js";
import { evaluateContentQualification, type ContentQualificationEvaluation } from "./content-qualification-evaluation.js";

export interface ContentQualificationReviewItem {
  review_item_id: string;
  occurrence_id: string;
  qualification_id: string;
  expression: string;
  source_artifact: string;
  semantic_context: string;
  source_layer: string;
  proposed_qualification: ContentQualificationState;
  proposed_domains: string[];
  proposed_functions: string[];
  proposed_formats: string[];
  classification_reasons: string[];
  reviewer_qualification: ContentQualificationState | null;
  reviewer_role: string | null;
  reviewer_notes: string | null;
  authority_effect: "none";
}

export interface ContentQualificationReviewPacket {
  contract_version: "contentmd.qualification-review-packet/0.1.0";
  sample_method: "deterministic_stratified_round_robin";
  population_size: number;
  requested_sample_size: number;
  sample_size: number;
  strata_count: number;
  items: ContentQualificationReviewItem[];
  review_status: "awaiting_independent_review";
  authority_effect: "none";
  packet_digest: string;
}

export interface CompletedContentQualificationReview {
  packet_digest: string;
  completed_item_count: number;
  reviewer_roles: string[];
  evaluation: ContentQualificationEvaluation;
  review_status: "independently_reviewed";
  authority_effect: "none";
  review_digest: string;
}

function stratum(unit: QualifiedContentUnit): string {
  return [
    unit.qualification,
    unit.source_layer,
    unit.practice_domains[0] ?? "none",
    unit.functions[0] ?? "none",
    unit.formats[0] ?? "none",
  ].join("|");
}

export function createContentQualificationReviewPacket(
  units: QualifiedContentUnit[],
  requestedSampleSize: number,
): ContentQualificationReviewPacket {
  if (!Number.isInteger(requestedSampleSize) || requestedSampleSize < 1 || requestedSampleSize > 500) {
    throw new TypeError("qualification_review_sample_size_invalid");
  }
  const groups = new Map<string, QualifiedContentUnit[]>();
  for (const unit of units) groups.set(stratum(unit), [...(groups.get(stratum(unit)) ?? []), unit]);
  const queues = [...groups.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([key, values]) => ({
    key,
    values: values.sort((left, right) => {
      const leftKey = sha256Canonical({ qualification_id: left.qualification_id, stratum: key });
      const rightKey = sha256Canonical({ qualification_id: right.qualification_id, stratum: key });
      return leftKey.localeCompare(rightKey);
    }),
    index: 0,
  }));
  const selected: QualifiedContentUnit[] = [];
  while (selected.length < Math.min(requestedSampleSize, units.length)) {
    let added = false;
    for (const queue of queues) {
      const unit = queue.values[queue.index];
      if (unit === undefined) continue;
      selected.push(unit);
      queue.index += 1;
      added = true;
      if (selected.length === Math.min(requestedSampleSize, units.length)) break;
    }
    if (!added) break;
  }
  const items = selected.map((unit) => {
    const preimage = { qualification_id: unit.qualification_id, occurrence_id: unit.occurrence_id };
    return {
      review_item_id: `qualification-review.${sha256Canonical(preimage).slice(0, 24)}`,
      occurrence_id: unit.occurrence_id,
      qualification_id: unit.qualification_id,
      expression: unit.expression,
      source_artifact: unit.source_artifact,
      semantic_context: unit.semantic_context,
      source_layer: unit.source_layer,
      proposed_qualification: unit.qualification,
      proposed_domains: unit.practice_domains,
      proposed_functions: unit.functions,
      proposed_formats: unit.formats,
      classification_reasons: unit.classification_reasons,
      reviewer_qualification: null,
      reviewer_role: null,
      reviewer_notes: null,
      authority_effect: "none" as const,
    };
  });
  const preimage = {
    contract_version: "contentmd.qualification-review-packet/0.1.0" as const,
    sample_method: "deterministic_stratified_round_robin" as const,
    population_size: units.length,
    requested_sample_size: requestedSampleSize,
    sample_size: items.length,
    strata_count: groups.size,
    items,
    review_status: "awaiting_independent_review" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, packet_digest: sha256Canonical(preimage) };
}

export function evaluateCompletedContentQualificationReview(
  packet: ContentQualificationReviewPacket,
  units: QualifiedContentUnit[],
): CompletedContentQualificationReview {
  if (
    packet.contract_version !== "contentmd.qualification-review-packet/0.1.0"
    || packet.sample_method !== "deterministic_stratified_round_robin"
    || packet.authority_effect !== "none" || !Array.isArray(packet.items)
  ) throw new TypeError("qualification_review_packet_invalid");
  const originalItems = packet.items.map((item) => ({
    ...item,
    reviewer_qualification: null,
    reviewer_role: null,
    reviewer_notes: null,
  }));
  const originalPreimage = {
    contract_version: packet.contract_version,
    sample_method: packet.sample_method,
    population_size: packet.population_size,
    requested_sample_size: packet.requested_sample_size,
    sample_size: packet.sample_size,
    strata_count: packet.strata_count,
    items: originalItems,
    review_status: "awaiting_independent_review" as const,
    authority_effect: packet.authority_effect,
  };
  if (sha256Canonical(originalPreimage) !== packet.packet_digest || packet.sample_size !== packet.items.length) {
    throw new TypeError("qualification_review_packet_digest_invalid");
  }
  const unitsByQualification = new Map(units.map((unit) => [unit.qualification_id, unit]));
  const cases = packet.items.map((item) => {
    const unit = unitsByQualification.get(item.qualification_id);
    if (
      unit === undefined || unit.occurrence_id !== item.occurrence_id || unit.expression !== item.expression
      || unit.source_artifact !== item.source_artifact || item.authority_effect !== "none"
    ) throw new TypeError("qualification_review_source_changed");
    if (item.reviewer_qualification === null || typeof item.reviewer_role !== "string" || item.reviewer_role.trim().length === 0) {
      throw new TypeError("qualification_review_incomplete");
    }
    return {
      occurrence_id: unit.occurrence_id,
      source_artifact: unit.source_artifact,
      syntax_kind: unit.syntax_kind,
      expression_payload: unit.expression,
      channel: unit.channel,
      modality: unit.modality,
      component: unit.component,
      route: unit.route,
      semantic_context: unit.semantic_context,
      ...(unit.line === null ? {} : { line: unit.line }),
      ...(unit.column === null ? {} : { column: unit.column }),
      ...(unit.end_line === null ? {} : { end_line: unit.end_line }),
      ...(unit.end_column === null ? {} : { end_column: unit.end_column }),
      expected_qualification: item.reviewer_qualification,
    };
  });
  const evaluation = evaluateContentQualification(cases);
  const preimage = {
    packet_digest: packet.packet_digest,
    completed_item_count: packet.items.length,
    reviewer_roles: [...new Set(packet.items.map((item) => item.reviewer_role!.trim()))].sort(),
    evaluation,
    review_status: "independently_reviewed" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, review_digest: sha256Canonical(preimage) };
}
