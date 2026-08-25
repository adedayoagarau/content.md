import type { ResearchEvidenceDimensions } from "@contentmd/research";

export const MAX_BOUNDED_SPAN_SCALARS = 280 as const;

export interface RecordedComputerUseObservation {
  surface: string;
  journey: string;
  state: string;
  channel: string;
  locale: string;
  locator: string;
  bounded_span: string | null;
  availability: "observed" | "not_observed" | "access_blocked";
  direct_exercise_state:
    | "directly_exercised_synthetic_input"
    | "visible_not_exercised"
    | "not_observed";
  observation_strength: "direct_visible_observation" | "official_example" | "not_observed";
  evidence_dimensions: ResearchEvidenceDimensions;
  taint_flags: string[];
  limitations: string[];
}

export interface RecordedComputerUseCapture {
  contract_version: "contentmd.recorded-computer-use-capture/0.1.0";
  capture_id: string;
  captured_at: string;
  requested_url: string;
  canonical_url: string;
  effective_url: string;
  redirects: string[];
  publisher: string;
  title: string;
  access_method: "operator_directed_computer_use_public_web" | "recorded_fixture";
  access_disposition: "public_unauthenticated" | "not_observed" | "access_blocked";
  rights_disposition:
    | "rights_unknown_evidence_only"
    | "licensed_evidence_only"
    | "public_domain_evidence_only"
    | "project_owned";
  profile_isolation_state: "established_signed_out_ephemeral" | "not_established";
  privacy_class: "public_no_personal_data";
  body_retained: false;
  capture_disposition: {
    controlled_corpus_eligibility: false;
    benchmark_eligibility: false;
    source_evidence_effect: "none";
  };
  observations: RecordedComputerUseObservation[];
  limitations: string[];
}

export interface RecordedCaptureValidation {
  valid: boolean;
  errors: string[];
}

const ROOT_KEYS = [
  "access_disposition",
  "access_method",
  "body_retained",
  "canonical_url",
  "capture_disposition",
  "capture_id",
  "captured_at",
  "contract_version",
  "effective_url",
  "limitations",
  "observations",
  "privacy_class",
  "profile_isolation_state",
  "publisher",
  "redirects",
  "requested_url",
  "rights_disposition",
  "title",
] as const;

const OBSERVATION_KEYS = [
  "availability",
  "bounded_span",
  "channel",
  "direct_exercise_state",
  "evidence_dimensions",
  "journey",
  "limitations",
  "locale",
  "locator",
  "observation_strength",
  "state",
  "surface",
  "taint_flags",
] as const;

const EVIDENCE_KEYS = ["accessibility", "behavior", "localization", "meaning", "outcome"] as const;
const DISPOSITION_KEYS = [
  "benchmark_eligibility",
  "controlled_corpus_eligibility",
  "source_evidence_effect",
] as const;

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object"
    && value !== null
    && Object.getPrototypeOf(value) === Object.prototype;
}

function hasExactKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const keys = Object.keys(value).sort();
  return keys.length === expected.length
    && keys.every((key, index) => key === [...expected].sort()[index]);
}

function isNonemptyScalarText(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.isWellFormed();
}

function isStringSet(value: unknown, allowEmpty: boolean): value is string[] {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) return false;
  if (!value.every(isNonemptyScalarText)) return false;
  return new Set(value).size === value.length;
}

function isHttpsUrl(value: unknown): value is string {
  if (!isNonemptyScalarText(value)) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isCanonicalTimestamp(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
    return false;
  }
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) && new Date(milliseconds).toISOString() === value;
}

function scalarLength(value: string): number {
  return [...value].length;
}

function validateObservation(value: unknown, index: number): string | null {
  if (!isPlainRecord(value) || !hasExactKeys(value, OBSERVATION_KEYS)) {
    return `observation_shape_invalid:${index}`;
  }
  for (const key of ["surface", "journey", "state", "channel", "locale", "locator"] as const) {
    if (!isNonemptyScalarText(value[key])) return `observation_text_invalid:${index}:${key}`;
  }
  if (value.bounded_span !== null) {
    if (!isNonemptyScalarText(value.bounded_span)) return `bounded_span_invalid:${index}`;
    if (scalarLength(value.bounded_span) > MAX_BOUNDED_SPAN_SCALARS) {
      return `bounded_span_too_large:${index}`;
    }
  }
  if (!["observed", "not_observed", "access_blocked"].includes(value.availability as string)) {
    return `availability_invalid:${index}`;
  }
  if (![
    "directly_exercised_synthetic_input",
    "visible_not_exercised",
    "not_observed",
  ].includes(value.direct_exercise_state as string)) {
    return `direct_exercise_state_invalid:${index}`;
  }
  if (![
    "direct_visible_observation",
    "official_example",
    "not_observed",
  ].includes(value.observation_strength as string)) {
    return `observation_strength_invalid:${index}`;
  }
  if (!isPlainRecord(value.evidence_dimensions)
    || !hasExactKeys(value.evidence_dimensions, EVIDENCE_KEYS)) {
    return `evidence_dimensions_invalid:${index}`;
  }
  const dimensions = value.evidence_dimensions;
  if (!["observed_direct", "observed_indirect", "not_observed"].includes(dimensions.behavior as string)
    || !["explicit", "inferred_from_visible_context", "not_observed"].includes(dimensions.meaning as string)
    || !["observed", "not_observed"].includes(dimensions.accessibility as string)
    || !["observed", "not_observed"].includes(dimensions.localization as string)
    || !["observed", "not_observed"].includes(dimensions.outcome as string)) {
    return `evidence_dimensions_invalid:${index}`;
  }
  if (!isStringSet(value.taint_flags, true)) return `taint_flags_invalid:${index}`;
  if (!isStringSet(value.limitations, false)) return `limitations_invalid:${index}`;
  return null;
}

export function validateRecordedComputerUseCapture(
  value: unknown,
): RecordedCaptureValidation {
  if (!isPlainRecord(value) || !hasExactKeys(value, ROOT_KEYS)) {
    return { valid: false, errors: ["capture_shape_invalid"] };
  }
  if (value.contract_version !== "contentmd.recorded-computer-use-capture/0.1.0") {
    return { valid: false, errors: ["contract_version_invalid"] };
  }
  for (const key of ["capture_id", "publisher", "title"] as const) {
    if (!isNonemptyScalarText(value[key])) return { valid: false, errors: [`${key}_invalid`] };
  }
  if (!isCanonicalTimestamp(value.captured_at)) {
    return { valid: false, errors: ["captured_at_invalid"] };
  }
  for (const key of ["requested_url", "canonical_url", "effective_url"] as const) {
    if (!isHttpsUrl(value[key])) return { valid: false, errors: [`${key}_invalid`] };
  }
  if (!Array.isArray(value.redirects) || !value.redirects.every(isHttpsUrl)) {
    return { valid: false, errors: ["redirects_invalid"] };
  }
  if (!["operator_directed_computer_use_public_web", "recorded_fixture"].includes(value.access_method as string)) {
    return { valid: false, errors: ["access_method_invalid"] };
  }
  if (!["public_unauthenticated", "not_observed", "access_blocked"].includes(value.access_disposition as string)) {
    return { valid: false, errors: ["access_disposition_invalid"] };
  }
  if (![
    "rights_unknown_evidence_only",
    "licensed_evidence_only",
    "public_domain_evidence_only",
    "project_owned",
  ].includes(value.rights_disposition as string)) {
    return { valid: false, errors: ["rights_disposition_invalid"] };
  }
  if (!["established_signed_out_ephemeral", "not_established"].includes(value.profile_isolation_state as string)) {
    return { valid: false, errors: ["profile_isolation_state_invalid"] };
  }
  if (value.privacy_class !== "public_no_personal_data" || value.body_retained !== false) {
    return { valid: false, errors: ["privacy_or_body_retention_invalid"] };
  }
  if (!isPlainRecord(value.capture_disposition)
    || !hasExactKeys(value.capture_disposition, DISPOSITION_KEYS)
    || value.capture_disposition.controlled_corpus_eligibility !== false
    || value.capture_disposition.benchmark_eligibility !== false
    || value.capture_disposition.source_evidence_effect !== "none") {
    return { valid: false, errors: ["capture_disposition_invalid"] };
  }
  if (!Array.isArray(value.observations)) {
    return { valid: false, errors: ["observations_invalid"] };
  }
  for (let index = 0; index < value.observations.length; index += 1) {
    const error = validateObservation(value.observations[index], index);
    if (error !== null) return { valid: false, errors: [error] };
  }
  if (!isStringSet(value.limitations, false)) {
    return { valid: false, errors: ["limitations_invalid"] };
  }
  return { valid: true, errors: [] };
}
