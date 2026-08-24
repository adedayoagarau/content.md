import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  canonicalizeModelOutput,
  createModelRequest,
  resolveRequestOutputSchema,
  type GovernedModelRequest,
  type ModelExecutionPort,
  type ModelObjectRef,
  type ModelOutputSchemaId,
  type ModelOperation,
  type ModelRequestResourceLimits,
} from "@contentmd/model-provider-sdk";
import type { ContentTaskPacket } from "./task-packet.js";
import {
  verifyAndProjectPatternPromptContext,
  type PatternPromptContextVerification,
} from "./pattern-context.js";
import {
  assertProjectFactPromptBinding,
  verifyAndProjectProjectFactPromptContext,
  type ProjectFactPromptContextItem,
  type ProjectFactPromptContextVerification,
} from "./project-fact-context.js";
import {
  assertProductExamplePromptBinding,
  verifyAndProjectProductExamplePromptContext,
  type ProductExamplePromptContextItem,
  type ProductExamplePromptContextVerification,
} from "./product-example-context.js";
import {
  assertReviewFindingPromptBinding,
  verifyAndProjectReviewFindingPromptContext,
  type ReviewFindingPromptContextItem,
  type ReviewFindingPromptContextVerification,
} from "./review-finding-context.js";
import {
  verifyAndProjectVoicePromptContext,
  type VoicePromptContextVerification,
} from "./voice-context.js";

export type PromptContextDataClass =
  | "approved_example"
  | "approved_pattern"
  | "counterexample"
  | "project_fact"
  | "public"
  | "review_finding"
  | "uncertainty"
  | "voice_tone_guidance";

export interface PromptContextItem {
  source_ref: ModelObjectRef;
  data_class: PromptContextDataClass;
  content: unknown;
  verification?: PatternPromptContextVerification
    | ProjectFactPromptContextVerification
    | ProductExamplePromptContextVerification
    | ReviewFindingPromptContextVerification
    | VoicePromptContextVerification;
}

export interface EgressItemRef {
  source_ref: ModelObjectRef;
  data_class: PromptContextDataClass | "task_context";
  item_digest: string;
}

export interface CompiledPrompt {
  schema_version: "contentmd.compiled-prompt/0.1.0";
  template_id: string;
  template_version: "0.1.0";
  template_digest: string;
  instructions: string;
  input: string;
  context_refs: ModelObjectRef[];
  retrieval_snapshot_ref: ModelObjectRef | null;
  egress_items: EgressItemRef[];
  prompt_digest: string;
  authority_effect: "none";
}

export interface PromptTemplateDefinition {
  template_id: string;
  template_version: "0.1.0";
  instructions: string;
}

export interface CompileVersionedPromptInput {
  template: PromptTemplateDefinition;
  output_schema_id: ModelOutputSchemaId;
  project_id?: string;
  task?: ContentTaskPacket;
  review_finding_refs?: string[];
  context_packet_ref: ModelObjectRef;
  retrieval_snapshot_ref: ModelObjectRef | null;
  context_items: PromptContextItem[];
  payload: unknown;
}

export interface WriterModelExecutionContext {
  project_id: string;
  surface: string;
  memory_scope: "public" | "organization" | "project" | "session" | "none";
  requested_provider_id: string;
  requested_model_profile_ref: ModelObjectRef;
  requested_model_id: string;
  context_packet_ref: ModelObjectRef;
  retrieval_snapshot_ref: ModelObjectRef | null;
  context_items: PromptContextItem[];
  resource_limits: ModelRequestResourceLimits;
}

export interface ExecuteCompiledWriterPromptInput {
  operation: ModelOperation;
  output_schema_id: ModelOutputSchemaId;
  task: ContentTaskPacket;
  prompt: CompiledPrompt;
  execution: WriterModelExecutionContext;
}

export interface ExecutedWriterPrompt {
  request: GovernedModelRequest;
  response: Awaited<ReturnType<ModelExecutionPort["execute"]>>["response"];
  output: unknown;
}

const DIGEST = /^[a-f0-9]{64}$/u;
const ALLOWED_DATA_CLASSES = new Set<PromptContextDataClass>([
  "approved_example",
  "approved_pattern",
  "counterexample",
  "project_fact",
  "public",
  "review_finding",
  "uncertainty",
  "voice_tone_guidance",
]);
const UNAVAILABLE_CONTEXT_DATA_CLASSES = [
  "uncertainty",
] as const satisfies readonly PromptContextDataClass[];
const FORBIDDEN_KEYS = new Set([
  "api_key",
  "bounded_span",
  "browser_capture",
  "competitor_expression",
  "credential",
  "hidden_file_content",
  "private_memory",
  "distinctive_expression_fingerprint",
  "raw_private_memory",
  "secret",
  "span_digest",
  "unauthorized_private_context",
]);

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function invalid(detail: string): never {
  throw new TypeError(`invalid_compiled_prompt:${detail}`);
}

function text(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0) invalid(field);
}

function validateRef(value: ModelObjectRef, field: string): void {
  text(value.record_id, `${field}.record_id`);
  text(value.schema_id, `${field}.schema_id`);
  text(value.schema_version, `${field}.schema_version`);
  if (!DIGEST.test(value.content_digest)) invalid(`${field}.content_digest`);
}

function rejectForbiddenGraph(value: unknown, path: string, ancestors = new Set<object>()): void {
  if (value === null || typeof value === "string" || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid(path);
    return;
  }
  if (typeof value !== "object" || ancestors.has(value)) invalid(path);
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      const keys = Reflect.ownKeys(value);
      if (keys.length !== value.length + 1 || keys[keys.length - 1] !== "length") invalid(path);
      for (let index = 0; index < value.length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
        if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
          invalid(`${path}[${index}]`);
        }
        rejectForbiddenGraph(descriptor.value, `${path}[${index}]`, ancestors);
      }
      return;
    }
    for (const key of Reflect.ownKeys(value)) {
      if (typeof key !== "string") invalid(path);
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) invalid(path);
      if (FORBIDDEN_KEYS.has(key)) throw new TypeError(`prompt_context_forbidden:${path}.${key}`);
      rejectForbiddenGraph(descriptor.value, `${path}.${key}`, ancestors);
    }
  } finally {
    ancestors.delete(value);
  }
}

function canonicalClone<T>(value: T): T {
  return JSON.parse(canonicalJson(value)) as T;
}

function sortedRefs(values: ModelObjectRef[]): ModelObjectRef[] {
  const byId = new Map<string, ModelObjectRef>();
  for (const value of values) {
    validateRef(value, "context_ref");
    const clone = canonicalClone(value);
    const prior = byId.get(clone.record_id);
    if (prior !== undefined && canonicalJson(prior) !== canonicalJson(clone)) {
      invalid(`conflicting_context_ref:${clone.record_id}`);
    }
    byId.set(clone.record_id, clone);
  }
  return [...byId.values()].sort((left, right) => compareUtf8(left.record_id, right.record_id));
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

export function canonicalStringSet(values: string[], field: string): string[] {
  if (!Array.isArray(values)) invalid(field);
  for (const value of values) text(value, field);
  return [...new Set(values)].sort(compareUtf8);
}

export function compileVersionedPrompt(input: CompileVersionedPromptInput): CompiledPrompt {
  text(input.template.template_id, "template.template_id");
  if (input.template.template_version !== "0.1.0") invalid("template.template_version");
  text(input.template.instructions, "template.instructions");
  validateRef(input.context_packet_ref, "context_packet_ref");
  if (input.retrieval_snapshot_ref !== null) {
    validateRef(input.retrieval_snapshot_ref, "retrieval_snapshot_ref");
  }
  rejectForbiddenGraph(input.payload, "payload");

  const contextItems = input.context_items.map((item, index) => {
    validateRef(item.source_ref, `context_items[${index}].source_ref`);
    if (!ALLOWED_DATA_CLASSES.has(item.data_class)) {
      throw new TypeError(`prompt_context_forbidden:context_items[${index}].data_class`);
    }
    if (item.data_class === "public") {
      throw new TypeError("prompt_context_forbidden:public_unverified");
    }
    if ((item.data_class === "approved_example" || item.data_class === "counterexample")
      && item.verification === undefined) {
      throw new TypeError(`prompt_context_forbidden:${item.data_class}_unverified`);
    }
    if ((UNAVAILABLE_CONTEXT_DATA_CLASSES as readonly PromptContextDataClass[])
      .includes(item.data_class)) {
      throw new TypeError(`prompt_context_forbidden:${item.data_class}_unverified`);
    }
    if (item.data_class === "approved_pattern" && item.verification === undefined) {
      throw new TypeError("prompt_context_forbidden:approved_pattern_unverified");
    }
    if (item.data_class === "project_fact" && item.verification === undefined) {
      throw new TypeError("prompt_context_forbidden:project_fact_unverified");
    }
    if (item.data_class === "review_finding" && item.verification === undefined) {
      throw new TypeError("prompt_context_forbidden:review_finding_unverified");
    }
    if (item.data_class === "voice_tone_guidance" && item.verification === undefined) {
      throw new TypeError("prompt_context_forbidden:voice_tone_guidance_unverified");
    }
    if (item.data_class !== "approved_pattern"
      && item.data_class !== "project_fact"
      && item.data_class !== "approved_example"
      && item.data_class !== "counterexample"
      && item.data_class !== "review_finding"
      && item.data_class !== "voice_tone_guidance"
      && item.verification !== undefined) {
      throw new TypeError(`prompt_context_forbidden:context_items[${index}].verification`);
    }
    const safeItem = item.data_class === "approved_pattern"
      ? verifyAndProjectPatternPromptContext(item as Parameters<
        typeof verifyAndProjectPatternPromptContext
      >[0])
      : item.data_class === "project_fact"
        ? verifyAndProjectProjectFactPromptContext(item as ProjectFactPromptContextItem)
      : item.data_class === "approved_example" || item.data_class === "counterexample"
        ? verifyAndProjectProductExamplePromptContext(item as ProductExamplePromptContextItem)
      : item.data_class === "review_finding"
        ? verifyAndProjectReviewFindingPromptContext(item as ReviewFindingPromptContextItem)
      : item.data_class === "voice_tone_guidance"
        ? verifyAndProjectVoicePromptContext(item as Parameters<
          typeof verifyAndProjectVoicePromptContext
        >[0])
        : item;
    rejectForbiddenGraph(safeItem.content, `context_items[${index}].content`);
    return canonicalClone(safeItem);
  }).sort((left, right) => {
    const refOrder = compareUtf8(left.source_ref.record_id, right.source_ref.record_id);
    return refOrder !== 0 ? refOrder : compareUtf8(sha256Canonical(left), sha256Canonical(right));
  });

  const projectFacts = contextItems.filter((item) => (
    item.data_class === "project_fact"
  )) as Array<Omit<ProjectFactPromptContextItem, "verification">>;
  if (input.task !== undefined) {
    if (input.project_id === undefined) {
      throw new TypeError("prompt_context_forbidden:project_fact_scope");
    }
    for (const item of projectFacts) {
      assertProjectFactPromptBinding(item, input.task, input.project_id);
    }
    const receivedFactRefs = projectFacts
      .map((item) => item.content.fact_ref.record_id)
      .sort(compareUtf8);
    const requiredFactRefs = [...input.task.required_fact_refs].sort(compareUtf8);
    if (new Set(receivedFactRefs).size !== receivedFactRefs.length
      || canonicalJson(receivedFactRefs) !== canonicalJson(requiredFactRefs)) {
      throw new TypeError("prompt_context_forbidden:project_fact_coverage");
    }
  } else if (projectFacts.length > 0) {
    throw new TypeError("prompt_context_forbidden:project_fact_task_binding");
  }

  const productExamples = contextItems.filter((item) => (
    item.data_class === "approved_example" || item.data_class === "counterexample"
  )) as Array<Omit<ProductExamplePromptContextItem, "verification">>;
  if (productExamples.length > 0) {
    if (input.task === undefined || input.project_id === undefined) {
      throw new TypeError("prompt_context_forbidden:approved_example_task_binding");
    }
    for (const item of productExamples) {
      assertProductExamplePromptBinding(item, input.task, input.project_id);
    }
  }

  const reviewFindings = contextItems.filter((item) => (
    item.data_class === "review_finding"
  )) as Array<Omit<ReviewFindingPromptContextItem, "verification">>;
  if (reviewFindings.length > 0 || (input.review_finding_refs?.length ?? 0) > 0) {
    if (input.task === undefined || input.project_id === undefined
      || input.review_finding_refs === undefined) {
      throw new TypeError("prompt_context_forbidden:review_finding_task_binding");
    }
    for (const item of reviewFindings) {
      assertReviewFindingPromptBinding(item, input.task, input.project_id);
    }
    const received = reviewFindings.map((item) => item.content.finding_ref.record_id)
      .sort(compareUtf8);
    const expected = canonicalStringSet(input.review_finding_refs, "review_finding_refs");
    if (new Set(received).size !== received.length
      || canonicalJson(received) !== canonicalJson(expected)) {
      throw new TypeError("prompt_context_forbidden:review_finding_coverage");
    }
  }

  const resolvedSchema = resolveRequestOutputSchema(input.output_schema_id);
  const payload = canonicalClone(input.payload);
  const contextPacketRef = canonicalClone(input.context_packet_ref);
  const retrievalSnapshotRef = canonicalClone(input.retrieval_snapshot_ref);
  const templateDigest = sha256Canonical(input.template);
  const inputBytes = canonicalJson({
    output_schema: {
      schema_id: resolvedSchema.schema_id,
      schema_version: resolvedSchema.schema_version,
      schema_digest: resolvedSchema.schema_digest,
    },
    authority_boundary: {
      proposal_only: true,
      may_create_fact: false,
      may_create_decision: false,
      may_create_approval: false,
      may_apply_change: false,
      may_publish: false,
    },
    payload,
    context: contextItems,
  });
  const egressItems: EgressItemRef[] = [
    {
      source_ref: contextPacketRef,
      data_class: "task_context" as const,
      item_digest: sha256Canonical({
        source_ref: contextPacketRef,
        data_class: "task_context",
        content: payload,
      }),
    },
    ...contextItems.map((item) => ({
      source_ref: item.source_ref,
      data_class: item.data_class as PromptContextDataClass,
      item_digest: sha256Canonical({
        source_ref: item.source_ref,
        data_class: item.data_class,
        content: item.content,
      }),
    })),
  ].sort((left, right) => compareUtf8(left.item_digest, right.item_digest));
  if (new Set(egressItems.map((item) => item.item_digest)).size !== egressItems.length) {
    invalid("duplicate_egress_item");
  }
  const preimage = {
    schema_version: "contentmd.compiled-prompt/0.1.0" as const,
    template_id: input.template.template_id,
    template_version: input.template.template_version,
    template_digest: templateDigest,
    instructions: input.template.instructions,
    input: inputBytes,
    context_refs: sortedRefs([
      contextPacketRef,
      ...contextItems.map((item) => item.source_ref),
    ]),
    retrieval_snapshot_ref: retrievalSnapshotRef,
    egress_items: egressItems,
    authority_effect: "none" as const,
  };
  return deepFreeze({
    ...preimage,
    prompt_digest: sha256Canonical(preimage),
  });
}

export async function executeCompiledWriterPrompt(
  port: ModelExecutionPort,
  input: ExecuteCompiledWriterPromptInput,
): Promise<ExecutedWriterPrompt> {
  if (input.execution.context_items.some((item) => item.data_class === "public")
    || input.prompt.egress_items.some((item) => item.data_class === "public")) {
    throw new Error("writer_public_context_forbidden");
  }
  for (const dataClass of UNAVAILABLE_CONTEXT_DATA_CLASSES) {
    if (input.execution.context_items.some((item) => item.data_class === dataClass)
      || input.prompt.egress_items.some((item) => item.data_class === dataClass)) {
      throw new Error(`writer_unverified_context_forbidden:${dataClass}`);
    }
  }
  if (input.execution.context_items.some((item) => (
    (item.data_class === "approved_example" || item.data_class === "counterexample")
      && item.verification === undefined
  ))) {
    const unavailable = input.execution.context_items.find((item) => (
      (item.data_class === "approved_example" || item.data_class === "counterexample")
        && item.verification === undefined
    ));
    throw new Error(`writer_unverified_context_forbidden:${unavailable!.data_class}`);
  }
  const canonicalEgressSet = (items: EgressItemRef[]) => items
    .map((item) => canonicalClone(item))
    .sort((left, right) => compareUtf8(canonicalJson(left), canonicalJson(right)));
  const executionProjectFacts = input.execution.context_items.filter((item) => (
    item.data_class === "project_fact"
  ));
  for (const item of executionProjectFacts) {
    const projected = verifyAndProjectProjectFactPromptContext(item as ProjectFactPromptContextItem);
    if (projected.content.project_id !== input.execution.project_id) {
      throw new Error("writer_project_fact_scope_mismatch");
    }
    if (projected.content.task_id !== input.task.task_id
      || projected.content.task_digest !== input.task.task_digest) {
      throw new Error("writer_project_fact_task_mismatch");
    }
    const expectedItemDigest = sha256Canonical({
      source_ref: projected.source_ref,
      data_class: projected.data_class,
      content: projected.content,
    });
    if (!input.prompt.egress_items.some((egress) => (
      egress.data_class === "project_fact"
      && egress.item_digest === expectedItemDigest
      && canonicalJson(egress.source_ref) === canonicalJson(projected.source_ref)
    ))) {
      throw new Error("writer_project_fact_prompt_mismatch");
    }
  }
  const executionProductExamples = input.execution.context_items.filter((item) => (
    item.data_class === "approved_example" || item.data_class === "counterexample"
  ));
  const expectedProductExampleEgress: EgressItemRef[] = [];
  for (const item of executionProductExamples) {
    const projected = verifyAndProjectProductExamplePromptContext(
      item as ProductExamplePromptContextItem,
    );
    try {
      assertProductExamplePromptBinding(projected, input.task, input.execution.project_id);
    } catch {
      throw new Error("writer_approved_example_binding_mismatch");
    }
    expectedProductExampleEgress.push({
      source_ref: projected.source_ref,
      data_class: projected.data_class,
      item_digest: sha256Canonical({
        source_ref: projected.source_ref,
        data_class: projected.data_class,
        content: projected.content,
      }),
    });
  }
  const suppliedProductExampleEgress = input.prompt.egress_items.filter((egress) => (
    egress.data_class === "approved_example" || egress.data_class === "counterexample"
  ));
  if (canonicalJson(canonicalEgressSet(expectedProductExampleEgress))
    !== canonicalJson(canonicalEgressSet(suppliedProductExampleEgress))) {
    throw new Error("writer_approved_example_prompt_mismatch");
  }
  const executionReviewFindings = input.execution.context_items.filter((item) => (
    item.data_class === "review_finding"
  ));
  const expectedReviewFindingEgress: EgressItemRef[] = [];
  for (const item of executionReviewFindings) {
    const projected = verifyAndProjectReviewFindingPromptContext(
      item as ReviewFindingPromptContextItem,
    );
    try {
      assertReviewFindingPromptBinding(projected, input.task, input.execution.project_id);
    } catch {
      throw new Error("writer_review_finding_binding_mismatch");
    }
    const expectedItemDigest = sha256Canonical({
      source_ref: projected.source_ref,
      data_class: projected.data_class,
      content: projected.content,
    });
    expectedReviewFindingEgress.push({
      source_ref: projected.source_ref,
      data_class: projected.data_class,
      item_digest: expectedItemDigest,
    });
  }
  const suppliedReviewFindingEgress = input.prompt.egress_items.filter((egress) => (
    egress.data_class === "review_finding"
  ));
  if (canonicalJson(canonicalEgressSet(expectedReviewFindingEgress))
    !== canonicalJson(canonicalEgressSet(suppliedReviewFindingEgress))) {
    throw new Error("writer_review_finding_prompt_mismatch");
  }
  const request = createModelRequest({
    operation: input.operation,
    output_schema_id: input.output_schema_id,
    prompt_template: {
      template_id: input.prompt.template_id,
      template_version: input.prompt.template_version,
      template_digest: input.prompt.template_digest,
    },
    context_packet_ref: input.execution.context_packet_ref,
    retrieval_snapshot_ref: input.execution.retrieval_snapshot_ref,
    requested_provider_id: input.execution.requested_provider_id,
    requested_model_profile_ref: input.execution.requested_model_profile_ref,
    requested_model_id: input.execution.requested_model_id,
    scope: {
      project_id: input.execution.project_id,
      task_id: input.task.task_id,
      memory_scope: input.execution.memory_scope,
      locale: input.task.locale,
      channel: input.task.channel,
      surface: input.execution.surface,
      risk: input.task.risk,
    },
    data_classes: input.prompt.egress_items.map((item) => item.data_class),
    egress_item_digests: input.prompt.egress_items.map((item) => item.item_digest),
    resource_limits: input.execution.resource_limits,
    provider_application_state: "none",
    input: {
      instructions: input.prompt.instructions,
      input: input.prompt.input,
      prompt_digest: input.prompt.prompt_digest,
      authority_effect: "none",
    },
    authority_effect: "none",
  });
  const result = await port.execute(request);
  if (result.response.response_state !== "completed" || result.canonical_output === null) {
    throw new Error(`writer_model_response_not_completed:${result.response.response_state}`);
  }
  if (
    result.response.request_id !== request.request_id ||
    result.response.authority_effect !== "none"
  ) {
    throw new Error("writer_model_response_invalid:binding");
  }
  const canonical = canonicalizeModelOutput(input.output_schema_id, result.canonical_output);
  if (
    result.response.canonical_output_digest !== canonical.canonical_output_digest ||
    result.response.output_digest !== canonical.canonical_output_digest
  ) {
    throw new Error("writer_model_response_invalid:digest");
  }
  return deepFreeze({
    request,
    response: canonicalClone(result.response),
    output: JSON.parse(canonical.canonical_output_bytes) as unknown,
  });
}
