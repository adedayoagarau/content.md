import { createHash, randomUUID } from "node:crypto";
import {
  link,
  lstat,
  mkdir,
  open,
  readFile,
  realpath,
  unlink,
} from "node:fs/promises";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  AI_ADJUDICATION_CRITERIA,
  UX_WRITING_COORDINATE_AXES,
  createAiAdjudicationTask,
  type AiAdjudicationDecisionStatus,
  type AiAdjudicationSourceLabel,
  type AiAdjudicationTask,
  type UxWritingCoordinateAxis,
} from "@contentmd/evaluation";
import type { ModelObjectRef } from "@contentmd/model-provider-sdk";
import {
  runAiAdjudication,
  type AiAdjudicationModelContext,
  type AiAdjudicationRunResult,
} from "./ai-adjudication-workflow.js";

export const UX_CONTENT_PILOT_DOMAINS = [
  "AI", "COMM", "DEV", "EDU", "FIN", "HLTH", "MEDIA", "PROD", "SVC", "TRAV",
] as const;

export const UX_CONTENT_PILOT_TAXONOMIES = [
  "T1", "T2", "T3", "T4", "T5", "T6", "T7",
  "T8", "T9", "T10", "T11", "T12", "T13", "T14",
] as const;

const DEFAULT_QUEUE_PATH = "ux-content-corpus/_generated/review-queue.jsonl";
const DEFAULT_PRODUCTS_PATH = "ux-content-corpus/_generated/products.jsonl";
const DEFAULT_CROSSWALK_PATH = "ux-content-corpus/_schema/TAXONOMY-CROSSWALK.json";
const SELECTION_STRATEGY = "balanced_domain_taxonomy_matrix_sha256_v1" as const;
const DIGEST = /^[a-f0-9]{64}$/u;
const AXES = new Set<string>(UX_WRITING_COORDINATE_AXES);

export type UxContentPilotDomain = typeof UX_CONTENT_PILOT_DOMAINS[number];
export type UxContentPilotTaxonomy = typeof UX_CONTENT_PILOT_TAXONOMIES[number];

interface CorpusSourceRef {
  digest: string;
  end_line: number;
  path: string;
  start_line: number;
}

interface CorpusProductRecord extends Record<string, unknown> {
  auth_state: string;
  domain: string;
  governance: {
    model_processing_blockers: string[];
    model_processing_eligibility: string;
    model_retention_eligibility: string;
    prompt_eligibility: string;
    rights_status: string;
    training_eligibility: string;
  };
  industry: string;
  language_scope: {
    project_scope: string;
    review_status: string;
  };
  name: string;
  platform_observed: string;
  product_id: string;
  product_projection_digest: string;
  split: {
    leakage_group_id: string;
    split: string;
  };
}

interface CorpusReviewUnit extends Record<string, unknown> {
  adjudication_required: boolean;
  authority_effect: string;
  blocked_by: string[];
  fallback_route: string;
  label_layers: {
    ai_labels: unknown;
    derived_labels: AiAdjudicationSourceLabel[];
    human_override: unknown;
    source_labels: AiAdjudicationSourceLabel[];
  };
  model_processing_eligibility: string;
  model_retention_eligibility: string;
  primary_adjudicator: string;
  processing_authorization_required: boolean;
  product_id: string;
  requested_labels: {
    coordinate_axes: UxWritingCoordinateAxis[];
  };
  review_status: string;
  review_unit_digest: string;
  review_unit_id: string;
  schema_version: string;
  source_ref: CorpusSourceRef;
  split: string;
  taxonomy_id: string;
}

interface CorpusTaxonomyEntry {
  content_decision_dimensions: string[];
  coordinate_axes: UxWritingCoordinateAxis[];
  label: string;
  non_equivalence: string;
  taxonomy_id: string;
}

export interface CorpusAdjudicationPlanUnit {
  sequence: number;
  domain: string;
  taxonomy: {
    taxonomy_id: string;
    label: string;
    non_equivalence: string;
  };
  product: {
    product_id: string;
    product_projection_digest: string;
    name: string;
    industry: string;
    platform_observed: string;
    auth_state: string;
  };
  review_unit_id: string;
  review_unit_digest: string;
  source_ref: CorpusSourceRef;
  source_labels: AiAdjudicationSourceLabel[];
  requested_axes: UxWritingCoordinateAxis[];
  selection_key: string;
  unit_digest: string;
}

export interface CorpusAdjudicationPlan {
  contract_version: "contentmd.corpus-adjudication-plan/0.1.0";
  plan_id: string;
  plan_digest: string;
  plan_kind: "english_ux_content_discovery_pilot";
  split: "discovery";
  sample_matrix: ["domain", "taxonomy"];
  selection_strategy: typeof SELECTION_STRATEGY;
  source_witnesses: {
    queue: { path: string; raw_bytes_digest: string };
    products: { path: string; raw_bytes_digest: string };
    taxonomy_crosswalk: { path: string; raw_bytes_digest: string };
  };
  domains: string[];
  taxonomy_ids: string[];
  counts: {
    selected_unit_count: number;
    matrix_cell_count: number;
    unique_product_count: number;
    eligible_pool_count: number;
    excluded_status_counts: Record<string, number>;
    verified_source_section_count: number;
  };
  units: CorpusAdjudicationPlanUnit[];
  processing_boundary: {
    language_scope: "english_only";
    model_processing: "classification_and_evaluation_with_explicit_run_authorization";
    retention: "transient_only";
    prompt_reuse: "never";
    training: "never";
    benchmark_scoring: false;
  };
  authority_effect: "none";
}

export interface CreateCorpusAdjudicationPlanInput {
  project_root: string;
  queue_path?: string;
  products_path?: string;
  taxonomy_crosswalk_path?: string;
  split?: "discovery";
  domains?: readonly string[];
  taxonomy_ids?: readonly string[];
}

export interface CorpusAdjudicationExecutionRef {
  record_id: string;
  content_digest: string;
  execution_mode: "recorded" | "local" | "remote";
}

interface CorpusAdjudicationModelBinding {
  provider_id: string;
  provider_version: string;
  adapter_id: string;
  adapter_version: string;
  execution_mode: "recorded" | "local" | "remote";
  deterministic_status: "recorded_exact" | "declared_deterministic" | "not_deterministic";
  requested_model_id: string;
  requested_model_profile_ref: ModelObjectRef;
  memory_scope: "none";
  resource_limits_digest: string;
  execution_ref: CorpusAdjudicationExecutionRef;
}

export interface CorpusAdjudicationRunManifest {
  contract_version: "contentmd.corpus-adjudication-batch-run/0.1.0";
  run_id: string;
  run_digest: string;
  plan_ref: {
    plan_id: string;
    plan_digest: string;
  };
  processing_authorization_ref: string;
  classifier: CorpusAdjudicationModelBinding;
  evaluator: CorpusAdjudicationModelBinding;
  maximum_refinement_rounds: number;
  storage_contract: "immutable_content_addressed_records_with_jsonl_projection";
  source_payload_retention: "none";
  authority_effect: "none";
}

export interface CorpusAdjudicationStoredResult {
  contract_version: "contentmd.corpus-adjudication-result/0.1.0";
  batch_run_id: string;
  sequence: number;
  unit_ref: {
    unit_digest: string;
    review_unit_id: string;
    review_unit_digest: string;
  };
  product_id: string;
  domain: string;
  taxonomy_id: string;
  source_ref: CorpusSourceRef;
  adjudication_run: AiAdjudicationRunResult;
  authority_effect: "none";
  record_digest: string;
}

interface SliceSummary {
  total: number;
  ai_accepted: number;
  abstained: number;
  human_exception: number;
  invalid_model_decision: number;
}

export interface CorpusAdjudicationSummary {
  contract_version: "contentmd.corpus-adjudication-summary/0.1.0";
  summary_id: string;
  summary_digest: string;
  batch_run_id: string;
  plan_id: string;
  completed_unit_count: number;
  decision_status_counts: Record<string, number>;
  route_counts: Record<string, number>;
  final_evaluation_verdict_counts: Record<string, number>;
  refinement_round_counts: Record<string, number>;
  revisions_triggered_count: number;
  trajectory_step_count: number;
  criterion_status_counts: Record<string, Record<string, number>>;
  requested_axis_counts: Record<string, number>;
  final_axis_status_counts: Record<string, Record<string, number>>;
  failure_reason_counts: Record<string, number>;
  by_domain: Record<string, SliceSummary>;
  by_taxonomy: Record<string, SliceSummary>;
  result_record_digests: string[];
  authority_effect: "none";
}

export interface RunCorpusAdjudicationBatchInput {
  project_root: string;
  result_store_root?: string;
  plan: CorpusAdjudicationPlan;
  processing_authorization_ref: string;
  classifier: AiAdjudicationModelContext;
  evaluator: AiAdjudicationModelContext;
  classifier_execution_ref: CorpusAdjudicationExecutionRef;
  evaluator_execution_ref: CorpusAdjudicationExecutionRef;
  maximum_refinement_rounds?: number;
}

export interface CorpusAdjudicationBatchResult {
  plan_ref: { plan_id: string; plan_digest: string };
  run: CorpusAdjudicationRunManifest;
  summary: CorpusAdjudicationSummary;
  store: {
    run_directory: string;
    manifest: string;
    plan: string;
    decisions: string;
    summary: string;
  };
}

export class CorpusAdjudicationError extends Error {
  constructor(readonly detail: string) {
    super(`corpus_adjudication_invalid:${detail}`);
    this.name = "CorpusAdjudicationError";
  }
}

function invalid(detail: string): never {
  throw new CorpusAdjudicationError(detail);
}

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
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

function canonicalClone<T>(value: T): T {
  return JSON.parse(canonicalJson(value)) as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonempty(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) invalid(field);
}

function sha256Bytes(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}

function within(root: string, candidate: string): boolean {
  const path = relative(root, candidate);
  return path === "" || (path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path));
}

async function readRepositoryFile(projectRoot: string, inputPath: string): Promise<{
  absolute_path: string;
  relative_path: string;
  bytes: Buffer;
}> {
  const root = await realpath(projectRoot).catch(() => invalid("project_root"));
  const candidate = resolve(root, inputPath);
  if (!within(root, candidate) || candidate === root) invalid(`path_escape:${inputPath}`);
  const stat = await lstat(candidate).catch(() => invalid(`file_missing:${inputPath}`));
  if (!stat.isFile() || stat.isSymbolicLink()) invalid(`file_type:${inputPath}`);
  const actual = await realpath(candidate).catch(() => invalid(`file_missing:${inputPath}`));
  if (!within(root, actual) || actual === root) invalid(`path_escape:${inputPath}`);
  const path = relative(root, actual).split(sep).join("/");
  return { absolute_path: actual, relative_path: path, bytes: await readFile(actual) };
}

function decodeUtf8(bytes: Uint8Array, field: string): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return invalid(`${field}:utf8`);
  }
}

function parseJsonl(bytes: Uint8Array, field: string): Record<string, unknown>[] {
  const text = decodeUtf8(bytes, field);
  if (!text.endsWith("\n")) invalid(`${field}:terminal_newline`);
  const lines = text.slice(0, -1).split("\n");
  if (lines.length === 0 || lines.some((line) => line.length === 0)) invalid(`${field}:jsonl`);
  return lines.map((line, index) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(line) as unknown;
    } catch {
      return invalid(`${field}:json:${index + 1}`);
    }
    if (!isRecord(parsed)) invalid(`${field}:record:${index + 1}`);
    return parsed;
  });
}

function verifyDigestRecord(value: Record<string, unknown>, digestField: string, field: string): void {
  const claimed = value[digestField];
  if (typeof claimed !== "string" || !DIGEST.test(claimed)) invalid(`${field}:${digestField}`);
  const preimage = { ...value };
  delete preimage[digestField];
  if (sha256Canonical(preimage) !== claimed) invalid(`${field}:${digestField}:mismatch`);
}

function normalizedList(
  provided: readonly string[] | undefined,
  defaults: readonly string[],
  field: string,
  order: readonly string[],
): string[] {
  const values = provided === undefined ? [...defaults] : [...provided];
  if (values.length === 0 || new Set(values).size !== values.length) invalid(field);
  if (values.some((value) => !order.includes(value))) invalid(`${field}:unknown`);
  const index = new Map(order.map((value, position) => [value, position]));
  return values.sort((left, right) => index.get(left)! - index.get(right)!);
}

function normalizeSourceLabels(unit: CorpusReviewUnit): AiAdjudicationSourceLabel[] {
  if (unit.label_layers.ai_labels !== null || unit.label_layers.human_override !== null) {
    invalid(`${unit.review_unit_id}:preexisting_adjudication`);
  }
  const labels = [...unit.label_layers.source_labels, ...unit.label_layers.derived_labels]
    .map((label, index) => {
      if (!isRecord(label)) invalid(`${unit.review_unit_id}:source_label:${index}`);
      nonempty(label.label_id, `${unit.review_unit_id}:source_label:${index}:label_id`);
      nonempty(label.dimension, `${unit.review_unit_id}:source_label:${index}:dimension`);
      nonempty(label.value, `${unit.review_unit_id}:source_label:${index}:value`);
      if (label.layer !== "source" && label.layer !== "derived") {
        invalid(`${unit.review_unit_id}:source_label:${index}:layer`);
      }
      if (!Array.isArray(label.evidence_refs)
        || label.evidence_refs.some((ref) => typeof ref !== "string" || ref.length === 0)) {
        invalid(`${unit.review_unit_id}:source_label:${index}:evidence_refs`);
      }
      return {
        label_id: label.label_id,
        layer: label.layer,
        dimension: label.dimension,
        value: label.value,
        evidence_refs: [...new Set(label.evidence_refs)].sort(compareUtf8),
      };
    })
    .sort((left, right) => compareUtf8(left.label_id, right.label_id));
  if (new Set(labels.map((label) => label.label_id)).size !== labels.length) {
    invalid(`${unit.review_unit_id}:source_labels:duplicate`);
  }
  return labels;
}

function validateSourceRef(value: CorpusSourceRef, field: string): CorpusSourceRef {
  if (!isRecord(value) || typeof value.path !== "string" || value.path.length === 0
    || !DIGEST.test(value.digest)
    || !Number.isSafeInteger(value.start_line) || value.start_line < 1
    || !Number.isSafeInteger(value.end_line) || value.end_line < value.start_line) {
    invalid(field);
  }
  return {
    digest: value.digest,
    end_line: value.end_line,
    path: value.path,
    start_line: value.start_line,
  };
}

async function readBoundedSection(projectRoot: string, sourceRef: CorpusSourceRef): Promise<string> {
  const ref = validateSourceRef(sourceRef, "source_ref");
  const source = await readRepositoryFile(projectRoot, ref.path);
  const text = decodeUtf8(source.bytes, ref.path);
  const lines = text.split("\n");
  if (lines.at(-1) === "") lines.pop();
  if (ref.end_line > lines.length) invalid(`source_ref:line_range:${ref.path}`);
  const section = lines.slice(ref.start_line - 1, ref.end_line).join("\n");
  if (sha256Bytes(section) !== ref.digest) invalid(`source_ref:digest_mismatch:${ref.path}`);
  return section;
}

function strictEligible(unit: CorpusReviewUnit, product: CorpusProductRecord, split: string): boolean {
  return unit.split === split
    && product.split.split === split
    && unit.review_status === "pending_ai_adjudication"
    && unit.adjudication_required === true
    && unit.authority_effect === "none"
    && unit.primary_adjudicator === "ai"
    && unit.fallback_route === "human_exception_only"
    && unit.processing_authorization_required === true
    && unit.model_processing_eligibility
      === "classification_and_evaluation_with_explicit_run_authorization"
    && unit.model_retention_eligibility === "transient_only"
    && Array.isArray(unit.blocked_by) && unit.blocked_by.length === 0
    && product.language_scope.project_scope === "english_only"
    && product.language_scope.review_status === "english_indicated"
    && product.governance.model_processing_eligibility
      === "classification_and_evaluation_with_explicit_run_authorization"
    && product.governance.model_retention_eligibility === "transient_only"
    && product.governance.prompt_eligibility === "never"
    && product.governance.training_eligibility === "never"
    && product.governance.model_processing_blockers.length === 0;
}

function assertPlan(plan: CorpusAdjudicationPlan): void {
  if (plan.contract_version !== "contentmd.corpus-adjudication-plan/0.1.0"
    || plan.plan_kind !== "english_ux_content_discovery_pilot"
    || plan.split !== "discovery"
    || canonicalJson(plan.sample_matrix) !== canonicalJson(["domain", "taxonomy"])
    || plan.selection_strategy !== SELECTION_STRATEGY
    || plan.authority_effect !== "none"
    || plan.units.length !== plan.counts.selected_unit_count
    || plan.counts.matrix_cell_count !== plan.domains.length * plan.taxonomy_ids.length
    || plan.counts.selected_unit_count !== plan.counts.matrix_cell_count
    || plan.counts.verified_source_section_count !== plan.units.length
    || plan.processing_boundary.language_scope !== "english_only"
    || plan.processing_boundary.model_processing
      !== "classification_and_evaluation_with_explicit_run_authorization"
    || plan.processing_boundary.retention !== "transient_only"
    || plan.processing_boundary.prompt_reuse !== "never"
    || plan.processing_boundary.training !== "never"
    || plan.processing_boundary.benchmark_scoring !== false) {
    invalid("plan:contract");
  }
  const expectedDomains = UX_CONTENT_PILOT_DOMAINS.filter((domain) => plan.domains.includes(domain));
  const expectedTaxonomies = UX_CONTENT_PILOT_TAXONOMIES.filter((taxonomy) =>
    plan.taxonomy_ids.includes(taxonomy));
  if (plan.domains.length === 0 || plan.taxonomy_ids.length === 0
    || canonicalJson(plan.domains) !== canonicalJson(expectedDomains)
    || canonicalJson(plan.taxonomy_ids) !== canonicalJson(expectedTaxonomies)) {
    invalid("plan:matrix");
  }
  for (const [name, witness] of Object.entries(plan.source_witnesses)) {
    if (typeof witness.path !== "string" || witness.path.length === 0
      || !DIGEST.test(witness.raw_bytes_digest)) invalid(`plan:witness:${name}`);
  }
  const cells = new Set<string>();
  for (const [index, unit] of plan.units.entries()) {
    const { unit_digest: claimed, ...preimage } = unit;
    const cell = `${unit.domain}\u0000${unit.taxonomy.taxonomy_id}`;
    if (unit.sequence !== index + 1
      || !plan.domains.includes(unit.domain)
      || !plan.taxonomy_ids.includes(unit.taxonomy.taxonomy_id)
      || cells.has(cell)
      || claimed !== sha256Canonical(preimage)) {
      invalid(`plan:unit:${index + 1}`);
    }
    cells.add(cell);
  }
  const { plan_id: claimedId, plan_digest: claimedDigest, ...preimage } = plan;
  const digest = sha256Canonical(preimage);
  if (claimedDigest !== digest || claimedId !== `corpus_adjudication_plan.${digest.slice(0, 32)}`) {
    invalid("plan:digest");
  }
}

export function verifyCorpusAdjudicationPlan(plan: CorpusAdjudicationPlan): void {
  assertPlan(plan);
}

export async function createCorpusAdjudicationPlan(
  input: CreateCorpusAdjudicationPlanInput,
): Promise<CorpusAdjudicationPlan> {
  nonempty(input.project_root, "project_root");
  const split = input.split ?? "discovery";
  if (split !== "discovery") invalid("split:discovery_only");
  const domains = normalizedList(
    input.domains,
    UX_CONTENT_PILOT_DOMAINS,
    "domains",
    UX_CONTENT_PILOT_DOMAINS,
  );
  const taxonomyIds = normalizedList(
    input.taxonomy_ids,
    UX_CONTENT_PILOT_TAXONOMIES,
    "taxonomy_ids",
    UX_CONTENT_PILOT_TAXONOMIES,
  );
  const [queueFile, productsFile, crosswalkFile] = await Promise.all([
    readRepositoryFile(input.project_root, input.queue_path ?? DEFAULT_QUEUE_PATH),
    readRepositoryFile(input.project_root, input.products_path ?? DEFAULT_PRODUCTS_PATH),
    readRepositoryFile(input.project_root, input.taxonomy_crosswalk_path ?? DEFAULT_CROSSWALK_PATH),
  ]);
  const productValues = parseJsonl(productsFile.bytes, "products");
  const queueValues = parseJsonl(queueFile.bytes, "queue");
  const products = new Map<string, CorpusProductRecord>();
  for (const [index, value] of productValues.entries()) {
    verifyDigestRecord(value, "product_projection_digest", `products:${index + 1}`);
    const product = value as CorpusProductRecord;
    nonempty(product.product_id, `products:${index + 1}:product_id`);
    nonempty(product.domain, `products:${index + 1}:domain`);
    if (products.has(product.product_id)) invalid(`products:duplicate:${product.product_id}`);
    products.set(product.product_id, product);
  }
  const queue = queueValues.map((value, index) => {
    verifyDigestRecord(value, "review_unit_digest", `queue:${index + 1}`);
    const unit = value as CorpusReviewUnit;
    nonempty(unit.review_unit_id, `queue:${index + 1}:review_unit_id`);
    nonempty(unit.product_id, `queue:${index + 1}:product_id`);
    nonempty(unit.taxonomy_id, `queue:${index + 1}:taxonomy_id`);
    validateSourceRef(unit.source_ref, `queue:${index + 1}:source_ref`);
    if (!products.has(unit.product_id)) invalid(`queue:unknown_product:${unit.product_id}`);
    return unit;
  });
  if (new Set(queue.map((unit) => unit.review_unit_id)).size !== queue.length) {
    invalid("queue:duplicate_review_unit");
  }

  let crosswalkValue: unknown;
  try {
    crosswalkValue = JSON.parse(decodeUtf8(crosswalkFile.bytes, "taxonomy_crosswalk")) as unknown;
  } catch {
    return invalid("taxonomy_crosswalk:json");
  }
  if (!isRecord(crosswalkValue)
    || crosswalkValue.$schema_version
      !== "contentmd.ux-content-corpus-taxonomy-crosswalk/0.1.0"
    || crosswalkValue.authority_effect !== "none"
    || !Array.isArray(crosswalkValue.entries)) {
    invalid("taxonomy_crosswalk:contract");
  }
  const crosswalk = new Map<string, CorpusTaxonomyEntry>();
  for (const [index, rawEntry] of crosswalkValue.entries.entries()) {
    if (!isRecord(rawEntry)) invalid(`taxonomy_crosswalk:entry:${index + 1}`);
    const entry = rawEntry as unknown as CorpusTaxonomyEntry;
    nonempty(entry.taxonomy_id, `taxonomy_crosswalk:entry:${index + 1}:taxonomy_id`);
    nonempty(entry.label, `taxonomy_crosswalk:entry:${index + 1}:label`);
    nonempty(entry.non_equivalence, `taxonomy_crosswalk:entry:${index + 1}:non_equivalence`);
    if (!Array.isArray(entry.coordinate_axes) || entry.coordinate_axes.length === 0
      || new Set(entry.coordinate_axes).size !== entry.coordinate_axes.length
      || entry.coordinate_axes.some((axis) => !AXES.has(axis))) {
      invalid(`taxonomy_crosswalk:entry:${index + 1}:coordinate_axes`);
    }
    if (crosswalk.has(entry.taxonomy_id)) invalid(`taxonomy_crosswalk:duplicate:${entry.taxonomy_id}`);
    crosswalk.set(entry.taxonomy_id, entry);
  }
  if (taxonomyIds.some((taxonomyId) => !crosswalk.has(taxonomyId))) {
    invalid("taxonomy_crosswalk:coverage");
  }

  const eligible = queue.filter((unit) => {
    const product = products.get(unit.product_id)!;
    return domains.includes(product.domain)
      && taxonomyIds.includes(unit.taxonomy_id)
      && strictEligible(unit, product, split);
  });
  const selected: Array<{ unit: CorpusReviewUnit; product: CorpusProductRecord; selectionKey: string }> = [];
  for (const domain of domains) {
    const uses = new Map<string, number>();
    for (const taxonomyId of taxonomyIds) {
      const candidates = eligible
        .filter((unit) => unit.taxonomy_id === taxonomyId
          && products.get(unit.product_id)!.domain === domain)
        .map((unit) => {
          const product = products.get(unit.product_id)!;
          const selectionKey = sha256Canonical({
            selection_strategy: SELECTION_STRATEGY,
            domain,
            taxonomy_id: taxonomyId,
            review_unit_digest: unit.review_unit_digest,
          });
          return { unit, product, selectionKey };
        })
        .sort((left, right) => (uses.get(left.unit.product_id) ?? 0)
          - (uses.get(right.unit.product_id) ?? 0)
          || compareUtf8(left.selectionKey, right.selectionKey)
          || compareUtf8(left.unit.review_unit_id, right.unit.review_unit_id));
      const chosen = candidates[0];
      if (chosen === undefined) invalid(`matrix_cell_empty:${domain}:${taxonomyId}`);
      selected.push(chosen);
      uses.set(chosen.unit.product_id, (uses.get(chosen.unit.product_id) ?? 0) + 1);
    }
  }

  const units: CorpusAdjudicationPlanUnit[] = [];
  for (const [index, selectedUnit] of selected.entries()) {
    const { unit, product, selectionKey } = selectedUnit;
    const taxonomy = crosswalk.get(unit.taxonomy_id)!;
    if (canonicalJson(unit.requested_labels.coordinate_axes)
      !== canonicalJson(taxonomy.coordinate_axes)) {
      invalid(`${unit.review_unit_id}:crosswalk_axes_mismatch`);
    }
    const sourceLabels = normalizeSourceLabels(unit);
    const evidenceRef = `source-section.${unit.source_ref.digest}`;
    if (sourceLabels.some((label) => label.evidence_refs.some((ref) => ref !== evidenceRef))) {
      invalid(`${unit.review_unit_id}:source_label_evidence`);
    }
    await readBoundedSection(input.project_root, unit.source_ref);
    const preimage = {
      sequence: index + 1,
      domain: product.domain,
      taxonomy: {
        taxonomy_id: taxonomy.taxonomy_id,
        label: taxonomy.label,
        non_equivalence: taxonomy.non_equivalence,
      },
      product: {
        product_id: product.product_id,
        product_projection_digest: product.product_projection_digest,
        name: product.name,
        industry: product.industry,
        platform_observed: product.platform_observed,
        auth_state: product.auth_state,
      },
      review_unit_id: unit.review_unit_id,
      review_unit_digest: unit.review_unit_digest,
      source_ref: validateSourceRef(unit.source_ref, `${unit.review_unit_id}:source_ref`),
      source_labels: sourceLabels,
      requested_axes: [...unit.requested_labels.coordinate_axes],
      selection_key: selectionKey,
    };
    units.push({ ...preimage, unit_digest: sha256Canonical(preimage) });
  }

  const excludedStatusCounts: Record<string, number> = {};
  for (const unit of queue) {
    if (unit.review_status === "pending_ai_adjudication") continue;
    excludedStatusCounts[unit.review_status] = (excludedStatusCounts[unit.review_status] ?? 0) + 1;
  }
  const preimage = {
    contract_version: "contentmd.corpus-adjudication-plan/0.1.0" as const,
    plan_kind: "english_ux_content_discovery_pilot" as const,
    split,
    sample_matrix: ["domain", "taxonomy"] as ["domain", "taxonomy"],
    selection_strategy: SELECTION_STRATEGY,
    source_witnesses: {
      queue: { path: queueFile.relative_path, raw_bytes_digest: sha256Bytes(queueFile.bytes) },
      products: { path: productsFile.relative_path, raw_bytes_digest: sha256Bytes(productsFile.bytes) },
      taxonomy_crosswalk: {
        path: crosswalkFile.relative_path,
        raw_bytes_digest: sha256Bytes(crosswalkFile.bytes),
      },
    },
    domains,
    taxonomy_ids: taxonomyIds,
    counts: {
      selected_unit_count: units.length,
      matrix_cell_count: domains.length * taxonomyIds.length,
      unique_product_count: new Set(units.map((unit) => unit.product.product_id)).size,
      eligible_pool_count: eligible.length,
      excluded_status_counts: Object.fromEntries(
        Object.entries(excludedStatusCounts).sort(([left], [right]) => compareUtf8(left, right)),
      ),
      verified_source_section_count: units.length,
    },
    units,
    processing_boundary: {
      language_scope: "english_only" as const,
      model_processing: "classification_and_evaluation_with_explicit_run_authorization" as const,
      retention: "transient_only" as const,
      prompt_reuse: "never" as const,
      training: "never" as const,
      benchmark_scoring: false as const,
    },
    authority_effect: "none" as const,
  };
  const planDigest = sha256Canonical(preimage);
  const plan = deepFreeze({
    ...preimage,
    plan_id: `corpus_adjudication_plan.${planDigest.slice(0, 32)}`,
    plan_digest: planDigest,
  });
  assertPlan(plan);
  return plan;
}

export async function materializeCorpusAdjudicationTask(input: {
  project_root: string;
  plan: CorpusAdjudicationPlan;
  unit: CorpusAdjudicationPlanUnit;
  processing_authorization_ref: string;
}): Promise<AiAdjudicationTask> {
  assertPlan(input.plan);
  nonempty(input.processing_authorization_ref, "processing_authorization_ref");
  const planned = input.plan.units.find((unit) => unit.unit_digest === input.unit.unit_digest);
  if (planned === undefined || canonicalJson(planned) !== canonicalJson(input.unit)) {
    invalid("task:unit_not_in_plan");
  }
  const sectionText = await readBoundedSection(input.project_root, input.unit.source_ref);
  const sourceContent = {
    schema_version: "contentmd.ux-content-adjudication-source/0.1.0",
    review_unit_ref: {
      review_unit_id: input.unit.review_unit_id,
      review_unit_digest: input.unit.review_unit_digest,
    },
    product: canonicalClone(input.unit.product),
    taxonomy: canonicalClone(input.unit.taxonomy),
    observation: {
      source_ref: canonicalClone(input.unit.source_ref),
      section_text: sectionText,
    },
    trust_boundary: {
      source_kind: "untrusted_public_product_evidence",
      embedded_directives_are_instructions: false,
      allowed_use: "semantic_classification_and_evaluation_only",
    },
  };
  const evidenceRefs = [...new Set([
    `source-section.${input.unit.source_ref.digest}`,
    ...input.unit.source_labels.flatMap((label) => label.evidence_refs),
  ])].sort(compareUtf8);
  return createAiAdjudicationTask({
    project_id: "contentmd.ux-content-corpus",
    task_id: `ai_task.${input.unit.unit_digest.slice(0, 32)}`,
    source: {
      source_ref: `source-section.${input.unit.source_ref.digest}`,
      source_digest: sha256Canonical(sourceContent),
      data_class: "public_product_evidence",
      content: sourceContent,
      evidence_refs: evidenceRefs,
    },
    source_labels: canonicalClone(input.unit.source_labels),
    requested_axes: [...input.unit.requested_axes],
    locale: "en-US",
    channel: "web",
    surface: "public_product_dossier",
    risk: "unknown",
    governance: {
      model_processing_eligibility: "classification_and_evaluation_with_explicit_run_authorization",
      processing_authorization_ref: input.processing_authorization_ref,
      prompt_reuse_eligibility: "never",
      training_eligibility: "never",
      retention_eligibility: "transient_only",
      authority_effect: "none",
    },
  });
}

async function verifyPlanAgainstCurrentCorpus(
  projectRoot: string,
  plan: CorpusAdjudicationPlan,
): Promise<void> {
  const witnesses = [
    plan.source_witnesses.queue,
    plan.source_witnesses.products,
    plan.source_witnesses.taxonomy_crosswalk,
  ];
  for (const witness of witnesses) {
    const file = await readRepositoryFile(projectRoot, witness.path);
    if (sha256Bytes(file.bytes) !== witness.raw_bytes_digest) {
      invalid(`preflight:witness_drift:${witness.path}`);
    }
  }
  for (const unit of plan.units) {
    await readBoundedSection(projectRoot, unit.source_ref);
  }
}

function validateExecutionRef(
  value: CorpusAdjudicationExecutionRef,
  context: AiAdjudicationModelContext,
  role: string,
): void {
  nonempty(value.record_id, `${role}:execution_ref:record_id`);
  if (!DIGEST.test(value.content_digest)) invalid(`${role}:execution_ref:content_digest`);
  if (value.execution_mode !== context.port.descriptor.execution_mode) {
    invalid(`${role}:execution_ref:mode`);
  }
}

function modelBinding(
  context: AiAdjudicationModelContext,
  executionRef: CorpusAdjudicationExecutionRef,
  role: string,
): CorpusAdjudicationModelBinding {
  validateExecutionRef(executionRef, context, role);
  if (context.memory_scope !== "none") invalid(`${role}:memory_scope`);
  if (context.requested_provider_id !== context.port.descriptor.provider_id
    || context.requested_model_id.trim().length === 0
    || !DIGEST.test(context.requested_model_profile_ref.content_digest)
    || !context.port.descriptor.strict_schema_output) {
    invalid(`${role}:context`);
  }
  return {
    provider_id: context.port.descriptor.provider_id,
    provider_version: context.port.descriptor.provider_version,
    adapter_id: context.port.descriptor.adapter_id,
    adapter_version: context.port.descriptor.adapter_version,
    execution_mode: context.port.descriptor.execution_mode,
    deterministic_status: context.port.descriptor.deterministic_status,
    requested_model_id: context.requested_model_id,
    requested_model_profile_ref: canonicalClone(context.requested_model_profile_ref),
    memory_scope: "none",
    resource_limits_digest: sha256Canonical(context.resource_limits),
    execution_ref: canonicalClone(executionRef),
  };
}

function safeRelativePath(path: string): string[] {
  if (path.length === 0 || isAbsolute(path) || path.includes("\0")) invalid("store:path");
  const parts = path.split(/[\\/]/u);
  if (parts.some((part) => part.length === 0 || part === "." || part === "..")) {
    invalid("store:path");
  }
  return parts;
}

class ImmutableCorpusAdjudicationStore {
  readonly #root: string;
  readonly #runId: string;
  #basePromise: Promise<string> | null = null;

  constructor(root: string, runId: string) {
    this.#root = root;
    this.#runId = runId;
  }

  async #base(): Promise<string> {
    if (this.#basePromise !== null) return this.#basePromise;
    this.#basePromise = (async () => {
      const root = await realpath(this.#root).catch(() => invalid("store:root"));
      let current = root;
      for (const part of [".contentmd", "adjudication", "runs", this.#runId]) {
        const next = join(current, part);
        try {
          const stat = await lstat(next);
          if (!stat.isDirectory() || stat.isSymbolicLink()) invalid(`store:directory:${part}`);
        } catch (error) {
          if (error instanceof CorpusAdjudicationError) throw error;
          if ((error as NodeJS.ErrnoException).code !== "ENOENT") invalid(`store:directory:${part}`);
          await mkdir(next, { mode: 0o700 });
        }
        const actual = await realpath(next).catch(() => invalid(`store:directory:${part}`));
        if (!within(root, actual) || actual === root) invalid(`store:directory:${part}`);
        current = actual;
      }
      return current;
    })();
    return this.#basePromise;
  }

  async #target(relativePath: string, createParents: boolean): Promise<string> {
    const parts = safeRelativePath(relativePath);
    const base = await this.#base();
    let parent = base;
    for (const part of parts.slice(0, -1)) {
      const next = join(parent, part);
      try {
        const stat = await lstat(next);
        if (!stat.isDirectory() || stat.isSymbolicLink()) invalid(`store:directory:${part}`);
      } catch (error) {
        if (error instanceof CorpusAdjudicationError) throw error;
        if ((error as NodeJS.ErrnoException).code !== "ENOENT" || !createParents) {
          invalid(`store:directory:${part}`);
        }
        await mkdir(next, { mode: 0o700 });
      }
      const actual = await realpath(next).catch(() => invalid(`store:directory:${part}`));
      if (!within(base, actual) || actual === base) invalid(`store:directory:${part}`);
      parent = actual;
    }
    const target = join(parent, parts.at(-1)!);
    if (!within(base, target) || target === base) invalid("store:path");
    return target;
  }

  async readBytes(relativePath: string): Promise<string | null> {
    const target = await this.#target(relativePath, false).catch((error: unknown) => {
      if (error instanceof CorpusAdjudicationError && error.detail.startsWith("store:directory:")) {
        return null;
      }
      throw error;
    });
    if (target === null) return null;
    try {
      const stat = await lstat(target);
      if (!stat.isFile() || stat.isSymbolicLink()) invalid(`store:file:${relativePath}`);
    } catch (error) {
      if (error instanceof CorpusAdjudicationError) throw error;
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      invalid(`store:file:${relativePath}`);
    }
    const bytes = await readFile(target).catch(() => invalid(`store:read:${relativePath}`));
    return decodeUtf8(bytes, `store:${relativePath}`);
  }

  async writeBytes(relativePath: string, bytes: string): Promise<void> {
    const existing = await this.readBytes(relativePath);
    if (existing !== null) {
      if (existing !== bytes) invalid(`store:conflict:${relativePath}`);
      return;
    }
    const target = await this.#target(relativePath, true);
    const parent = resolve(target, "..");
    const temporary = join(parent, `.${randomUUID()}.tmp`);
    let handle: Awaited<ReturnType<typeof open>> | null = null;
    try {
      handle = await open(temporary, "wx", 0o600);
      await handle.writeFile(bytes, "utf8");
      await handle.sync();
      await handle.close();
      handle = null;
      await link(temporary, target);
      await unlink(temporary);
      const directory = await open(parent, "r");
      try { await directory.sync(); } finally { await directory.close(); }
    } catch (error) {
      if (handle !== null) await handle.close().catch(() => undefined);
      await unlink(temporary).catch(() => undefined);
      if ((error as NodeJS.ErrnoException).code === "EEXIST") {
        const concurrent = await this.readBytes(relativePath);
        if (concurrent === bytes) return;
      }
      invalid(`store:write:${relativePath}`);
    }
  }

  async writeCanonical(relativePath: string, value: unknown): Promise<void> {
    await this.writeBytes(relativePath, canonicalJson(value));
  }

  async readCanonical<T>(relativePath: string): Promise<T | null> {
    const bytes = await this.readBytes(relativePath);
    if (bytes === null) return null;
    let value: unknown;
    try {
      value = JSON.parse(bytes) as unknown;
    } catch {
      return invalid(`store:json:${relativePath}`);
    }
    if (canonicalJson(value) !== bytes) invalid(`store:canonical:${relativePath}`);
    return value as T;
  }
}

function increment(record: Record<string, number>, key: string): void {
  record[key] = (record[key] ?? 0) + 1;
}

function emptySlice(): SliceSummary {
  return { total: 0, ai_accepted: 0, abstained: 0, human_exception: 0, invalid_model_decision: 0 };
}

function addSlice(
  slices: Record<string, SliceSummary>,
  key: string,
  result: CorpusAdjudicationStoredResult,
): void {
  const slice = slices[key] ?? emptySlice();
  slice.total += 1;
  if (result.adjudication_run.decision.status === "ai_accepted") slice.ai_accepted += 1;
  if (result.adjudication_run.decision.status === "abstained") slice.abstained += 1;
  if (result.adjudication_run.decision.route === "human_exception") slice.human_exception += 1;
  if (result.adjudication_run.decision.status === "invalid_model_decision") {
    slice.invalid_model_decision += 1;
  }
  slices[key] = slice;
}

function summarizeResults(
  run: CorpusAdjudicationRunManifest,
  plan: CorpusAdjudicationPlan,
  results: CorpusAdjudicationStoredResult[],
): CorpusAdjudicationSummary {
  const statuses: AiAdjudicationDecisionStatus[] = [
    "ai_accepted", "abstained", "authority_escalation", "revision_exhausted",
    "revision_stalled", "invalid_model_decision",
  ];
  const decisionStatusCounts = Object.fromEntries(statuses.map((status) => [status, 0]));
  const routeCounts: Record<string, number> = { proceed: 0, abstain: 0, human_exception: 0 };
  const verdictCounts: Record<string, number> = { pass: 0, revise: 0, abstain: 0, escalate: 0, none: 0 };
  const roundCounts: Record<string, number> = { "0": 0, "1": 0, "2": 0, "3": 0 };
  const criterionCounts = Object.fromEntries(AI_ADJUDICATION_CRITERIA.map((criterion) => [
    criterion,
    { pass: 0, fail: 0, unknown: 0, not_evaluated: 0 },
  ]));
  const requestedAxisCounts = Object.fromEntries(UX_WRITING_COORDINATE_AXES.map((axis) => [axis, 0]));
  const finalAxisStatusCounts = Object.fromEntries(UX_WRITING_COORDINATE_AXES.map((axis) => [
    axis,
    { exact: 0, ambiguous: 0, unclassified: 0, not_returned: 0 },
  ]));
  const failureReasonCounts: Record<string, number> = {};
  const byDomain: Record<string, SliceSummary> = {};
  const byTaxonomy: Record<string, SliceSummary> = {};
  let revisionsTriggered = 0;
  let trajectoryStepCount = 0;

  for (const result of results) {
    const unit = plan.units[result.sequence - 1];
    if (unit === undefined || unit.unit_digest !== result.unit_ref.unit_digest) {
      invalid(`summary:unit_binding:${result.sequence}`);
    }
    increment(decisionStatusCounts, result.adjudication_run.decision.status);
    increment(routeCounts, result.adjudication_run.decision.route);
    increment(verdictCounts, result.adjudication_run.final_evaluation?.verdict ?? "none");
    increment(roundCounts, String(result.adjudication_run.refinement_rounds_used));
    if (result.adjudication_run.refinement_rounds_used > 0) revisionsTriggered += 1;
    trajectoryStepCount += result.adjudication_run.trajectory.length;
    const criterionByName = new Map(
      result.adjudication_run.final_evaluation?.criteria.map((criterion) => [criterion.criterion, criterion]) ?? [],
    );
    for (const criterion of AI_ADJUDICATION_CRITERIA) {
      increment(criterionCounts[criterion]!, criterionByName.get(criterion)?.status ?? "not_evaluated");
    }
    const finalLabels = new Map(
      result.adjudication_run.final_classification?.labels.map((label) => [label.axis, label]) ?? [],
    );
    for (const axis of unit.requested_axes) {
      increment(requestedAxisCounts, axis);
      increment(finalAxisStatusCounts[axis]!, finalLabels.get(axis)?.status ?? "not_returned");
    }
    if (result.adjudication_run.failure !== null) {
      increment(failureReasonCounts, result.adjudication_run.failure.reason_code);
    }
    addSlice(byDomain, result.domain, result);
    addSlice(byTaxonomy, result.taxonomy_id, result);
  }
  const preimage = {
    contract_version: "contentmd.corpus-adjudication-summary/0.1.0" as const,
    batch_run_id: run.run_id,
    plan_id: plan.plan_id,
    completed_unit_count: results.length,
    decision_status_counts: decisionStatusCounts,
    route_counts: routeCounts,
    final_evaluation_verdict_counts: verdictCounts,
    refinement_round_counts: roundCounts,
    revisions_triggered_count: revisionsTriggered,
    trajectory_step_count: trajectoryStepCount,
    criterion_status_counts: criterionCounts,
    requested_axis_counts: requestedAxisCounts,
    final_axis_status_counts: finalAxisStatusCounts,
    failure_reason_counts: Object.fromEntries(
      Object.entries(failureReasonCounts).sort(([left], [right]) => compareUtf8(left, right)),
    ),
    by_domain: Object.fromEntries(Object.entries(byDomain).sort(([left], [right]) => compareUtf8(left, right))),
    by_taxonomy: Object.fromEntries(Object.entries(byTaxonomy).sort(([left], [right]) => {
      return Number(left.slice(1)) - Number(right.slice(1));
    })),
    result_record_digests: results.map((result) => result.record_digest),
    authority_effect: "none" as const,
  };
  const summaryDigest = sha256Canonical(preimage);
  return deepFreeze({
    ...preimage,
    summary_id: `corpus_adjudication_summary.${summaryDigest.slice(0, 32)}`,
    summary_digest: summaryDigest,
  });
}

function verifyAdjudicationRunIntegrity(
  value: AiAdjudicationRunResult,
  unit: CorpusAdjudicationPlanUnit,
): void {
  if (!isRecord(value)
    || value.contract_version !== "contentmd.ai-adjudication-run/0.1.0"
    || value.authority_effect !== "none"
    || value.task_id !== `ai_task.${unit.unit_digest.slice(0, 32)}`
    || !DIGEST.test(value.task_digest)
    || !DIGEST.test(value.run_digest)) {
    invalid(`stored_result:adjudication_run:${unit.sequence}`);
  }
  const { run_id: runId, run_digest: runDigest, ...runPreimage } = value;
  if (runDigest !== sha256Canonical(runPreimage)
    || runId !== `ai_adjudication_run.${runDigest.slice(0, 32)}`) {
    invalid(`stored_result:adjudication_run_digest:${unit.sequence}`);
  }
  const decision = value.decision;
  const {
    decision_id: decisionId,
    decision_digest: decisionDigest,
    ...decisionPreimage
  } = decision;
  if (decisionDigest !== sha256Canonical(decisionPreimage)
    || decisionId !== `ai_adjudication.${decisionDigest.slice(0, 32)}`
    || decision.task_id !== value.task_id
    || decision.task_digest !== value.task_digest) {
    invalid(`stored_result:decision_digest:${unit.sequence}`);
  }
  if (value.final_classification !== null) {
    const { classification_digest: digest, ...preimage } = value.final_classification;
    if (digest !== sha256Canonical(preimage)) {
      invalid(`stored_result:classification_digest:${unit.sequence}`);
    }
  }
  if (value.final_evaluation !== null) {
    const { evaluation_digest: digest, ...preimage } = value.final_evaluation;
    if (digest !== sha256Canonical(preimage)) {
      invalid(`stored_result:evaluation_digest:${unit.sequence}`);
    }
  }
}

function verifyStoredResult(
  value: CorpusAdjudicationStoredResult,
  run: CorpusAdjudicationRunManifest,
  unit: CorpusAdjudicationPlanUnit,
): CorpusAdjudicationStoredResult {
  if (!isRecord(value)
    || value.contract_version !== "contentmd.corpus-adjudication-result/0.1.0"
    || value.batch_run_id !== run.run_id
    || value.sequence !== unit.sequence
    || value.unit_ref.unit_digest !== unit.unit_digest
    || value.unit_ref.review_unit_id !== unit.review_unit_id
    || value.unit_ref.review_unit_digest !== unit.review_unit_digest
    || value.product_id !== unit.product.product_id
    || value.domain !== unit.domain
    || value.taxonomy_id !== unit.taxonomy.taxonomy_id
    || canonicalJson(value.source_ref) !== canonicalJson(unit.source_ref)
    || value.authority_effect !== "none") {
    invalid(`stored_result:binding:${unit.sequence}`);
  }
  verifyDigestRecord(value as unknown as Record<string, unknown>, "record_digest", `stored_result:${unit.sequence}`);
  verifyAdjudicationRunIntegrity(value.adjudication_run, unit);
  return deepFreeze(canonicalClone(value));
}

export async function runCorpusAdjudicationBatch(
  input: RunCorpusAdjudicationBatchInput,
): Promise<CorpusAdjudicationBatchResult> {
  assertPlan(input.plan);
  nonempty(input.project_root, "project_root");
  nonempty(input.processing_authorization_ref, "processing_authorization_ref");
  await verifyPlanAgainstCurrentCorpus(input.project_root, input.plan);
  const maximumRefinementRounds = input.maximum_refinement_rounds ?? 2;
  if (!Number.isSafeInteger(maximumRefinementRounds)
    || maximumRefinementRounds < 0 || maximumRefinementRounds > 3) {
    invalid("maximum_refinement_rounds");
  }
  const classifier = modelBinding(input.classifier, input.classifier_execution_ref, "classifier");
  const evaluator = modelBinding(input.evaluator, input.evaluator_execution_ref, "evaluator");
  const runPreimage = {
    contract_version: "contentmd.corpus-adjudication-batch-run/0.1.0" as const,
    plan_ref: { plan_id: input.plan.plan_id, plan_digest: input.plan.plan_digest },
    processing_authorization_ref: input.processing_authorization_ref,
    classifier,
    evaluator,
    maximum_refinement_rounds: maximumRefinementRounds,
    storage_contract: "immutable_content_addressed_records_with_jsonl_projection" as const,
    source_payload_retention: "none" as const,
    authority_effect: "none" as const,
  };
  const runDigest = sha256Canonical(runPreimage);
  const run = deepFreeze({
    ...runPreimage,
    run_id: `corpus_adjudication_run.${runDigest.slice(0, 32)}`,
    run_digest: runDigest,
  });
  const store = new ImmutableCorpusAdjudicationStore(
    input.result_store_root ?? input.project_root,
    run.run_id,
  );
  await store.writeCanonical("run.json", run);
  await store.writeCanonical("plan.json", input.plan);

  const results: CorpusAdjudicationStoredResult[] = [];
  for (const unit of input.plan.units) {
    const resultPath = `results/${String(unit.sequence).padStart(4, "0")}.json`;
    const existing = await store.readCanonical<CorpusAdjudicationStoredResult>(resultPath);
    if (existing !== null) {
      results.push(verifyStoredResult(existing, run, unit));
      continue;
    }
    const task = await materializeCorpusAdjudicationTask({
      project_root: input.project_root,
      plan: input.plan,
      unit,
      processing_authorization_ref: input.processing_authorization_ref,
    });
    const adjudicationRun = await runAiAdjudication({
      task,
      classifier: input.classifier,
      evaluator: input.evaluator,
      maximum_refinement_rounds: maximumRefinementRounds,
    });
    const resultPreimage = {
      contract_version: "contentmd.corpus-adjudication-result/0.1.0" as const,
      batch_run_id: run.run_id,
      sequence: unit.sequence,
      unit_ref: {
        unit_digest: unit.unit_digest,
        review_unit_id: unit.review_unit_id,
        review_unit_digest: unit.review_unit_digest,
      },
      product_id: unit.product.product_id,
      domain: unit.domain,
      taxonomy_id: unit.taxonomy.taxonomy_id,
      source_ref: canonicalClone(unit.source_ref),
      adjudication_run: canonicalClone(adjudicationRun),
      authority_effect: "none" as const,
    };
    const result = deepFreeze({ ...resultPreimage, record_digest: sha256Canonical(resultPreimage) });
    await store.writeCanonical(resultPath, result);
    results.push(result);
  }
  const summary = summarizeResults(run, input.plan, results);
  await store.writeBytes("decisions.jsonl", results.map((result) => canonicalJson(result)).join(""));
  await store.writeCanonical("summary.json", summary);
  const base = `.contentmd/adjudication/runs/${run.run_id}`;
  return deepFreeze({
    plan_ref: { plan_id: input.plan.plan_id, plan_digest: input.plan.plan_digest },
    run,
    summary,
    store: {
      run_directory: base,
      manifest: `${base}/run.json`,
      plan: `${base}/plan.json`,
      decisions: `${base}/decisions.jsonl`,
      summary: `${base}/summary.json`,
    },
  });
}
