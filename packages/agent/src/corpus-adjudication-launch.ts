import { sha256Canonical } from "@contentmd/core";
import type { ModelRequestResourceLimits } from "@contentmd/model-provider-sdk";
import {
  verifyCorpusAdjudicationPlan,
  type CorpusAdjudicationPlan,
} from "./corpus-adjudication.js";
import type { LocalProviderConfigurationInspection } from "./provider-configuration.js";

const DIGEST = /^[a-f0-9]{64}$/u;
const CLASSIFICATION_SCHEMA_ID = "contentmd.ux-coordinate-classification-model-output/0.1.0";
const EVALUATION_SCHEMA_ID = "contentmd.ux-coordinate-evaluation-model-output/0.1.0";

export const CORPUS_ADJUDICATION_REQUIRED_OPERATIONS = [
  "classify",
  "evaluate",
] as const;

export const CORPUS_ADJUDICATION_REQUIRED_OUTPUT_SCHEMA_IDS = [
  CLASSIFICATION_SCHEMA_ID,
  EVALUATION_SCHEMA_ID,
] as const;

export const CORPUS_ADJUDICATION_REQUIRED_DATA_CLASSES = [
  "classification_task",
  "existing_labels",
  "proposed_semantic_classification",
  "public_product_evidence",
] as const;

export const CORPUS_ADJUDICATION_DEFAULT_REQUEST_LIMITS = Object.freeze({
  maximum_calls: 1,
  maximum_retries: 0,
  maximum_input_bytes: 262_144,
  maximum_output_bytes: 65_536,
  maximum_input_tokens: 32_000,
  maximum_output_tokens: 8_000,
  timeout_ms: 60_000,
}) satisfies Readonly<ModelRequestResourceLimits>;

export interface CorpusAdjudicationRemoteTarget {
  provider_id: string;
  adapter_id: string;
  destination_origin: string;
}

export interface CorpusAdjudicationLaunchModelSelection {
  requested_model_id: string;
}

export interface CorpusAdjudicationAuthorizationSubject {
  contract_version: "contentmd.corpus-adjudication-authorization-subject/0.1.0";
  subject_id: string;
  subject_digest: string;
  plan_ref: {
    plan_id: string;
    plan_digest: string;
  };
  provider_configuration_ref: {
    configuration_id: string;
    configuration_digest: string;
  } | null;
  execution: {
    mode: "remote";
    target: CorpusAdjudicationRemoteTarget;
    classifier: CorpusAdjudicationLaunchModelSelection;
    evaluator: CorpusAdjudicationLaunchModelSelection;
    evaluator_independence: {
      distinct_request: true;
      blinded_to_classifier_rationale: true;
      distinct_model: boolean;
    };
  };
  workload_ceiling: {
    selected_unit_count: number;
    maximum_refinement_rounds: number;
    maximum_model_calls_per_unit: number;
    maximum_classifier_calls: number;
    maximum_evaluator_calls: number;
    maximum_model_calls: number;
    aggregate_upper_bounds: {
      input_bytes: number;
      output_bytes: number;
      input_tokens: number;
      output_tokens: number;
      duration_ms: number;
    };
  };
  per_request_limits: ModelRequestResourceLimits;
  processing_boundary: {
    language_scope: "english_only";
    operations: Array<(typeof CORPUS_ADJUDICATION_REQUIRED_OPERATIONS)[number]>;
    data_classes: string[];
    output_schema_ids: string[];
    memory_scope: "none";
    provider_application_state: "none";
    retention: "transient_only";
    durable_source_payload_storage: "none";
    prompt_reuse: "never";
    training: "never";
    benchmark_scoring: false;
    content_authority_effect: "none";
  };
}

export interface CorpusAdjudicationProviderSnapshot {
  configured: boolean;
  configuration_ref: {
    configuration_id: string;
    configuration_digest: string;
  } | null;
  provider_id: string | null;
  adapter_id: string | null;
  requested_model_id: string | null;
  model_profile_id: string | null;
  model_profile_status: string | null;
  data_handling_profile_id: string | null;
  data_handling_profile_status: string | null;
  project_id: string | null;
  destination_origin: string | null;
  connection_status: string | null;
  grant_status: string | null;
  zero_data_retention_status: string | null;
  abuse_monitoring_retention: string | null;
  prompt_caching: string | null;
  training_opt_in: boolean | null;
  supported_operations: string[];
  supported_output_schema_ids: string[];
  granted_operations: string[];
  granted_output_schema_ids: string[];
  granted_data_classes: string[];
  maximum_input_tokens: number | null;
  maximum_output_tokens: number | null;
  timeout_ms: number | null;
  maximum_retries: number | null;
}

export interface CorpusAdjudicationRemoteLaunchRequest {
  contract_version: "contentmd.corpus-adjudication-remote-launch-request/0.1.0";
  request_id: string;
  request_digest: string;
  authorization_subject: CorpusAdjudicationAuthorizationSubject;
  provider_configuration: CorpusAdjudicationProviderSnapshot;
  configuration_readiness: {
    status: "ready" | "blocked";
    reason_codes: string[];
    advisory_codes: string[];
  };
  required_authorization: {
    status: "blocked_by_configuration" | "ready_for_explicit_authorization";
    authorization_kind: "corpus_model_processing_and_remote_egress";
    subject_ref: string;
    subject_digest: string;
    required_affirmations: [
      "allow_remote_processing_of_bounded_public_product_evidence",
      "classification_and_evaluation_only",
      "transient_processing_only",
      "no_prompt_reuse",
      "no_training",
      "no_benchmark_scoring",
      "bounded_call_ceiling",
      "no_content_authority",
    ];
  };
  network_effect: "none";
  write_effect: "none";
  authority_effect: "none";
}

export interface CreateCorpusAdjudicationRemoteLaunchRequestInput {
  plan: CorpusAdjudicationPlan;
  target: CorpusAdjudicationRemoteTarget;
  classifier: CorpusAdjudicationLaunchModelSelection;
  evaluator: CorpusAdjudicationLaunchModelSelection;
  provider_configuration: LocalProviderConfigurationInspection;
  maximum_refinement_rounds?: number;
  per_request_limits?: ModelRequestResourceLimits;
}

export class CorpusAdjudicationLaunchError extends Error {
  constructor(readonly detail: string) {
    super(`corpus_adjudication_launch_invalid:${detail}`);
    this.name = "CorpusAdjudicationLaunchError";
  }
}

function invalid(detail: string): never {
  throw new CorpusAdjudicationLaunchError(detail);
}

function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) invalid(field);
  return value.trim();
}

function positiveInteger(value: unknown, field: string): number {
  if (!Number.isSafeInteger(value) || (value as number) <= 0) invalid(field);
  return value as number;
}

function multiply(left: number, right: number, field: string): number {
  const result = left * right;
  if (!Number.isSafeInteger(result)) invalid(field);
  return result;
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

function sorted(values: readonly string[]): string[] {
  return [...new Set(values)].sort((left, right) =>
    Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")));
}

function includesAll(values: readonly string[], required: readonly string[]): boolean {
  return required.every((value) => values.includes(value));
}

function normalizedLimits(
  value: ModelRequestResourceLimits | undefined,
): ModelRequestResourceLimits {
  const limits = value ?? CORPUS_ADJUDICATION_DEFAULT_REQUEST_LIMITS;
  if (limits.maximum_calls !== 1) invalid("per_request_limits.maximum_calls");
  if (limits.maximum_retries !== 0) invalid("per_request_limits.maximum_retries");
  for (const field of [
    "maximum_input_bytes",
    "maximum_output_bytes",
    "maximum_input_tokens",
    "maximum_output_tokens",
    "timeout_ms",
  ] as const) positiveInteger(limits[field], `per_request_limits.${field}`);
  return structuredClone(limits);
}

function configurationRef(
  inspection: LocalProviderConfigurationInspection,
): CorpusAdjudicationProviderSnapshot["configuration_ref"] {
  if (!inspection.configured
    || inspection.configuration_id === null
    || inspection.configuration_digest === null
    || !DIGEST.test(inspection.configuration_digest)) return null;
  return {
    configuration_id: inspection.configuration_id,
    configuration_digest: inspection.configuration_digest,
  };
}

function providerSnapshot(
  inspection: LocalProviderConfigurationInspection,
): CorpusAdjudicationProviderSnapshot {
  return {
    configured: inspection.configured,
    configuration_ref: configurationRef(inspection),
    provider_id: inspection.provider_id,
    adapter_id: inspection.adapter_id,
    requested_model_id: inspection.requested_model_id,
    model_profile_id: inspection.model_profile_id,
    model_profile_status: inspection.model_profile_status,
    data_handling_profile_id: inspection.data_handling_profile_id,
    data_handling_profile_status: inspection.data_handling_profile_status,
    project_id: inspection.project_id,
    destination_origin: inspection.destination_origin,
    connection_status: inspection.connection_status,
    grant_status: inspection.grant_status,
    zero_data_retention_status: inspection.zero_data_retention_status,
    abuse_monitoring_retention: inspection.abuse_monitoring_retention,
    prompt_caching: inspection.prompt_caching,
    training_opt_in: inspection.training_opt_in,
    supported_operations: sorted(inspection.supported_operations),
    supported_output_schema_ids: sorted(inspection.supported_output_schema_ids),
    granted_operations: sorted(inspection.granted_operations),
    granted_output_schema_ids: sorted(inspection.granted_output_schema_ids),
    granted_data_classes: sorted(inspection.granted_data_classes),
    maximum_input_tokens: inspection.maximum_input_tokens,
    maximum_output_tokens: inspection.maximum_output_tokens,
    timeout_ms: inspection.timeout_ms,
    maximum_retries: inspection.maximum_retries,
  };
}

function readinessReasons(input: {
  snapshot: CorpusAdjudicationProviderSnapshot;
  target: CorpusAdjudicationRemoteTarget;
  classifierModel: string;
  evaluatorModel: string;
  limits: ModelRequestResourceLimits;
}): string[] {
  const { snapshot, target, classifierModel, evaluatorModel, limits } = input;
  if (!snapshot.configured) return ["provider_configuration_missing"];
  const reasons: string[] = [];
  if (snapshot.configuration_ref === null) reasons.push("provider_configuration_reference_invalid");
  if (snapshot.provider_id !== target.provider_id) reasons.push("provider_configuration_provider_mismatch");
  if (snapshot.adapter_id !== target.adapter_id) reasons.push("provider_configuration_adapter_mismatch");
  if (snapshot.destination_origin !== target.destination_origin) {
    reasons.push("provider_configuration_destination_mismatch");
  }
  if (snapshot.project_id !== "contentmd.ux-content-corpus") {
    reasons.push("provider_configuration_project_mismatch");
  }
  if (snapshot.requested_model_id !== classifierModel) {
    reasons.push("provider_configuration_classifier_model_mismatch");
  }
  if (snapshot.requested_model_id !== evaluatorModel) {
    reasons.push("provider_configuration_evaluator_model_mismatch");
  }
  if (snapshot.model_profile_status !== "current") reasons.push("model_profile_not_current");
  if (snapshot.data_handling_profile_status !== "current") {
    reasons.push("provider_data_handling_profile_not_current");
  }
  if (snapshot.connection_status !== "current") reasons.push("provider_connection_not_current");
  if (snapshot.grant_status !== "current") reasons.push("provider_grant_not_current");
  if (snapshot.zero_data_retention_status !== "enabled") {
    reasons.push("provider_zero_data_retention_not_enabled");
  }
  if (snapshot.abuse_monitoring_retention !== "none") {
    reasons.push("provider_abuse_monitoring_retention_not_disabled");
  }
  if (snapshot.prompt_caching !== "disabled") {
    reasons.push("provider_prompt_caching_not_disabled");
  }
  if (snapshot.training_opt_in !== false) reasons.push("provider_training_opt_out_not_verified");
  if (!includesAll(snapshot.supported_operations, CORPUS_ADJUDICATION_REQUIRED_OPERATIONS)) {
    reasons.push("model_profile_operations_incomplete");
  }
  if (!includesAll(snapshot.granted_operations, CORPUS_ADJUDICATION_REQUIRED_OPERATIONS)) {
    reasons.push("provider_grant_operations_incomplete");
  }
  if (!includesAll(snapshot.supported_output_schema_ids, CORPUS_ADJUDICATION_REQUIRED_OUTPUT_SCHEMA_IDS)) {
    reasons.push("model_profile_output_schemas_incomplete");
  }
  if (!includesAll(snapshot.granted_output_schema_ids, CORPUS_ADJUDICATION_REQUIRED_OUTPUT_SCHEMA_IDS)) {
    reasons.push("provider_grant_output_schemas_incomplete");
  }
  if (!includesAll(snapshot.granted_data_classes, CORPUS_ADJUDICATION_REQUIRED_DATA_CLASSES)) {
    reasons.push("provider_grant_data_classes_incomplete");
  }
  if (snapshot.maximum_input_tokens === null
    || limits.maximum_input_tokens > snapshot.maximum_input_tokens) {
    reasons.push("model_profile_input_token_limit_insufficient");
  }
  if (snapshot.maximum_output_tokens === null
    || limits.maximum_output_tokens > snapshot.maximum_output_tokens) {
    reasons.push("model_profile_output_token_limit_insufficient");
  }
  if (snapshot.timeout_ms === null || limits.timeout_ms > snapshot.timeout_ms) {
    reasons.push("model_profile_timeout_limit_insufficient");
  }
  if (snapshot.maximum_retries !== 0) reasons.push("model_profile_retry_policy_invalid");
  return sorted(reasons);
}

export function createCorpusAdjudicationRemoteLaunchRequest(
  input: CreateCorpusAdjudicationRemoteLaunchRequestInput,
): CorpusAdjudicationRemoteLaunchRequest {
  verifyCorpusAdjudicationPlan(input.plan);
  const target: CorpusAdjudicationRemoteTarget = {
    provider_id: text(input.target.provider_id, "target.provider_id"),
    adapter_id: text(input.target.adapter_id, "target.adapter_id"),
    destination_origin: text(input.target.destination_origin, "target.destination_origin"),
  };
  let origin: URL;
  try {
    origin = new URL(target.destination_origin);
  } catch {
    return invalid("target.destination_origin");
  }
  if (origin.protocol !== "https:" || origin.origin !== target.destination_origin) {
    invalid("target.destination_origin");
  }
  const classifierModel = text(input.classifier.requested_model_id, "classifier.requested_model_id");
  const evaluatorModel = text(input.evaluator.requested_model_id, "evaluator.requested_model_id");
  const maximumRefinementRounds = input.maximum_refinement_rounds ?? 2;
  if (!Number.isSafeInteger(maximumRefinementRounds)
    || maximumRefinementRounds < 0 || maximumRefinementRounds > 3) {
    invalid("maximum_refinement_rounds");
  }
  const limits = normalizedLimits(input.per_request_limits);
  const selectedUnitCount = positiveInteger(
    input.plan.counts.selected_unit_count,
    "plan.counts.selected_unit_count",
  );
  const callsPerRole = multiply(selectedUnitCount, maximumRefinementRounds + 1, "workload.calls");
  const maximumModelCalls = multiply(callsPerRole, 2, "workload.calls");
  const snapshot = providerSnapshot(input.provider_configuration);
  const reasonCodes = readinessReasons({
    snapshot,
    target,
    classifierModel,
    evaluatorModel,
    limits,
  });
  const advisoryCodes = classifierModel === evaluatorModel
    ? ["classifier_evaluator_share_model"]
    : [];
  const subjectPreimage = {
    contract_version: "contentmd.corpus-adjudication-authorization-subject/0.1.0" as const,
    plan_ref: {
      plan_id: input.plan.plan_id,
      plan_digest: input.plan.plan_digest,
    },
    provider_configuration_ref: snapshot.configuration_ref,
    execution: {
      mode: "remote" as const,
      target,
      classifier: { requested_model_id: classifierModel },
      evaluator: { requested_model_id: evaluatorModel },
      evaluator_independence: {
        distinct_request: true as const,
        blinded_to_classifier_rationale: true as const,
        distinct_model: classifierModel !== evaluatorModel,
      },
    },
    workload_ceiling: {
      selected_unit_count: selectedUnitCount,
      maximum_refinement_rounds: maximumRefinementRounds,
      maximum_model_calls_per_unit: (maximumRefinementRounds + 1) * 2,
      maximum_classifier_calls: callsPerRole,
      maximum_evaluator_calls: callsPerRole,
      maximum_model_calls: maximumModelCalls,
      aggregate_upper_bounds: {
        input_bytes: multiply(maximumModelCalls, limits.maximum_input_bytes, "workload.input_bytes"),
        output_bytes: multiply(maximumModelCalls, limits.maximum_output_bytes, "workload.output_bytes"),
        input_tokens: multiply(maximumModelCalls, limits.maximum_input_tokens, "workload.input_tokens"),
        output_tokens: multiply(maximumModelCalls, limits.maximum_output_tokens, "workload.output_tokens"),
        duration_ms: multiply(maximumModelCalls, limits.timeout_ms, "workload.duration_ms"),
      },
    },
    per_request_limits: limits,
    processing_boundary: {
      language_scope: "english_only" as const,
      operations: [...CORPUS_ADJUDICATION_REQUIRED_OPERATIONS],
      data_classes: [...CORPUS_ADJUDICATION_REQUIRED_DATA_CLASSES],
      output_schema_ids: [...CORPUS_ADJUDICATION_REQUIRED_OUTPUT_SCHEMA_IDS],
      memory_scope: "none" as const,
      provider_application_state: "none" as const,
      retention: "transient_only" as const,
      durable_source_payload_storage: "none" as const,
      prompt_reuse: "never" as const,
      training: "never" as const,
      benchmark_scoring: false as const,
      content_authority_effect: "none" as const,
    },
  };
  const subjectDigest = sha256Canonical(subjectPreimage);
  const authorizationSubject: CorpusAdjudicationAuthorizationSubject = {
    ...subjectPreimage,
    subject_id: `corpus_adjudication_authorization_subject.${subjectDigest.slice(0, 32)}`,
    subject_digest: subjectDigest,
  };
  const ready = reasonCodes.length === 0;
  const requestPreimage = {
    contract_version: "contentmd.corpus-adjudication-remote-launch-request/0.1.0" as const,
    authorization_subject: authorizationSubject,
    provider_configuration: snapshot,
    configuration_readiness: {
      status: ready ? "ready" as const : "blocked" as const,
      reason_codes: reasonCodes,
      advisory_codes: advisoryCodes,
    },
    required_authorization: {
      status: ready ? "ready_for_explicit_authorization" as const : "blocked_by_configuration" as const,
      authorization_kind: "corpus_model_processing_and_remote_egress" as const,
      subject_ref: authorizationSubject.subject_id,
      subject_digest: authorizationSubject.subject_digest,
      required_affirmations: [
        "allow_remote_processing_of_bounded_public_product_evidence",
        "classification_and_evaluation_only",
        "transient_processing_only",
        "no_prompt_reuse",
        "no_training",
        "no_benchmark_scoring",
        "bounded_call_ceiling",
        "no_content_authority",
      ] as CorpusAdjudicationRemoteLaunchRequest["required_authorization"]["required_affirmations"],
    },
    network_effect: "none" as const,
    write_effect: "none" as const,
    authority_effect: "none" as const,
  };
  const requestDigest = sha256Canonical(requestPreimage);
  return deepFreeze({
    ...requestPreimage,
    request_id: `corpus_adjudication_remote_launch_request.${requestDigest.slice(0, 32)}`,
    request_digest: requestDigest,
  });
}

export function verifyCorpusAdjudicationRemoteLaunchRequest(
  request: CorpusAdjudicationRemoteLaunchRequest,
): void {
  if (request.contract_version !== "contentmd.corpus-adjudication-remote-launch-request/0.1.0"
    || request.network_effect !== "none"
    || request.write_effect !== "none"
    || request.authority_effect !== "none") invalid("request.contract");
  const subject = request.authorization_subject;
  const { subject_id: claimedSubjectId, subject_digest: claimedSubjectDigest, ...subjectPreimage } = subject;
  const subjectDigest = sha256Canonical(subjectPreimage);
  if (claimedSubjectDigest !== subjectDigest
    || claimedSubjectId !== `corpus_adjudication_authorization_subject.${subjectDigest.slice(0, 32)}`
    || request.required_authorization.subject_ref !== claimedSubjectId
    || request.required_authorization.subject_digest !== claimedSubjectDigest) {
    invalid("request.authorization_subject");
  }
  const { request_id: claimedRequestId, request_digest: claimedRequestDigest, ...requestPreimage } = request;
  const requestDigest = sha256Canonical(requestPreimage);
  if (claimedRequestDigest !== requestDigest
    || claimedRequestId !== `corpus_adjudication_remote_launch_request.${requestDigest.slice(0, 32)}`) {
    invalid("request.digest");
  }
}
