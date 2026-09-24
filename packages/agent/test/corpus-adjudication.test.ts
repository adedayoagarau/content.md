import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  AI_ADJUDICATION_CRITERIA,
  type AiAdjudicationCriterion,
} from "@contentmd/evaluation";
import {
  canonicalizeModelOutput,
  modelRequestDigest,
  RecordedModelProvider,
  resolveRequestOutputSchema,
  type GovernedModelRequest,
  type GovernedModelResponse,
  type ModelExecutionPort,
  type ModelExecutionResult,
  type ModelProviderDescriptor,
} from "@contentmd/model-provider-sdk";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createCorpusAdjudicationPlan,
  materializeCorpusAdjudicationTask,
  runCorpusAdjudicationBatch,
  type CorpusAdjudicationPlan,
  type CorpusAdjudicationPlanUnit,
} from "../src/corpus-adjudication.js";
import type { AiAdjudicationModelContext } from "../src/ai-adjudication-workflow.js";

const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const temporaryDirectories: string[] = [];
let fullPlan: CorpusAdjudicationPlan;
let oneCellPlan: CorpusAdjudicationPlan;

function criterion(
  name: AiAdjudicationCriterion,
  evidenceRef: string,
): {
  criterion: AiAdjudicationCriterion;
  status: "pass";
  rationale: string;
  evidence_refs: string[];
} {
  return {
    criterion: name,
    status: "pass",
    rationale: `${name} is supported by the bounded source.`,
    evidence_refs: name === "requested_axis_coverage" || name === "ontology_conformance"
      ? [] : [evidenceRef],
  };
}

class AdaptiveRecordedPort implements ModelExecutionPort {
  readonly descriptor: ModelProviderDescriptor;
  readonly requests: GovernedModelRequest[] = [];
  readonly outputs: unknown[] = [];

  constructor(providerId: string) {
    this.descriptor = {
      provider_id: providerId,
      provider_version: "0.1.0-test",
      adapter_id: `adapter.${providerId}`,
      adapter_version: "0.1.0-test",
      execution_mode: "recorded",
      deterministic_status: "recorded_exact",
      network_required: false,
      remote_authorization_required: false,
      supported_request_versions: ["contentmd.model-request/0.2.0"],
      strict_schema_output: true,
    };
  }

  async execute(request: GovernedModelRequest): Promise<ModelExecutionResult> {
    this.requests.push(request);
    const requestInput = request.input as {
      payload: {
        task?: {
          source: { evidence_refs: string[] };
          requested_axes: string[];
          coordinate_ontology: { axes: Record<string, { kind: string; values: string[] }> };
        };
        source?: { evidence_refs: string[] };
        requested_axes?: string[];
        coordinate_ontology?: { axes: Record<string, { kind: string; values: string[] }> };
      };
    };
    const projected = requestInput.payload.task ?? requestInput.payload;
    const evidenceRef = projected.source!.evidence_refs[0]!;
    const output = request.output_schema_id === "contentmd.ux-coordinate-classification-model-output/0.1.0"
      ? {
          authority_effect: "none",
          decision_state: "model_proposed",
          model_processing_purpose: "classification_only",
          labels: projected.requested_axes!.map((axis) => {
            const ontology = projected.coordinate_ontology!.axes[axis]!;
            const value = ontology.kind === "canonical_english_bcp47" ? "en-US" : ontology.values[0]!;
            return {
              axis,
              status: "exact",
              values: [value],
              rationale: `The bounded source supports the ${axis} label.`,
              evidence_refs: [evidenceRef],
              uncertainty: "none",
            };
          }),
          uncertainties: [],
        }
      : {
          authority_effect: "none",
          model_processing_purpose: "evaluation_only",
          verdict: "pass",
          criteria: AI_ADJUDICATION_CRITERIA.map((name) => criterion(name, evidenceRef)),
          corrections: [],
          unresolved: [],
          authority_escalation_reasons: [],
        };
    this.outputs.push(output);
    const canonical = canonicalizeModelOutput(request.output_schema_id, output);
    const schema = resolveRequestOutputSchema(request.output_schema_id);
    const response: GovernedModelResponse = {
      schema_version: "contentmd.model-response/0.2.0",
      request_id: request.request_id,
      provider_id: request.requested_provider_id,
      adapter_id: this.descriptor.adapter_id,
      adapter_version: this.descriptor.adapter_version,
      model_profile_ref: request.requested_model_profile_ref,
      requested_model_id: request.requested_model_id,
      model_id: request.requested_model_id,
      provider_response_id: `recorded.${this.requests.length}`,
      provider_created_at: null,
      response_state: "completed",
      incomplete_reason: null,
      refusal_reason: null,
      input_digest: request.input_digest,
      provider_output_digest: canonical.canonical_output_digest,
      parsed_output_digest: canonical.canonical_output_digest,
      canonical_output_digest: canonical.canonical_output_digest,
      output_digest: canonical.canonical_output_digest,
      schema_projection_id: schema.provider_projection.projection_id,
      schema_projection_digest: schema.provider_projection.projection_digest,
      token_accounting: {
        input_tokens: 100,
        output_tokens: 50,
        total_tokens: 150,
        cached_input_tokens: 0,
      },
      timeout_observed: false,
      retry_count: 0,
      service_tier: null,
      provider_storage_requested: false,
      output_ref: null,
      retention_disposition: "transient_only",
      deterministic_status: "recorded_exact",
      authority_effect: "none",
      output,
    };
    return { response, canonical_output: output };
  }
}

function context(
  port: ModelExecutionPort,
  role: "classifier" | "evaluator",
): AiAdjudicationModelContext {
  const modelId = `model.${role}.fixture`;
  return {
    port,
    requested_provider_id: port.descriptor.provider_id,
    requested_model_profile_ref: {
      record_id: `model-profile.${role}.fixture`,
      schema_id: "contentmd.model-profile",
      schema_version: "0.1.0",
      content_digest: sha256Canonical({ role, model_id: modelId }),
    },
    requested_model_id: modelId,
    memory_scope: "none",
    resource_limits: {
      maximum_calls: 1,
      maximum_retries: 0,
      maximum_input_bytes: 2_000_000,
      maximum_output_bytes: 131_072,
      maximum_input_tokens: 250_000,
      maximum_output_tokens: 20_000,
      timeout_ms: 60_000,
    },
  };
}

function executionRef(role: "classifier" | "evaluator") {
  return {
    record_id: `recorded-cassette.${role}.fixture`,
    content_digest: sha256Canonical({ cassette: "fixture", role }),
    execution_mode: "recorded" as const,
  };
}

async function copySelectedSource(root: string, unit: CorpusAdjudicationPlanUnit): Promise<string> {
  const destination = join(root, unit.source_ref.path);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(workspaceRoot, unit.source_ref.path), destination);
  return destination;
}

async function copyPlanWitnesses(root: string, plan: CorpusAdjudicationPlan): Promise<void> {
  for (const witness of [
    plan.source_witnesses.queue,
    plan.source_witnesses.products,
    plan.source_witnesses.taxonomy_crosswalk,
  ]) {
    const destination = join(root, witness.path);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(join(workspaceRoot, witness.path), destination);
  }
}

beforeAll(async () => {
  [fullPlan, oneCellPlan] = await Promise.all([
    createCorpusAdjudicationPlan({ project_root: workspaceRoot }),
    createCorpusAdjudicationPlan({
      project_root: workspaceRoot,
      domains: ["PROD"],
      taxonomy_ids: ["T1"],
    }),
  ]);
});

afterAll(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("UX-content corpus adjudication pilot", () => {
  it("selects one verified discovery unit for every domain and taxonomy cell", async () => {
    const replay = await createCorpusAdjudicationPlan({ project_root: workspaceRoot });
    expect(replay).toEqual(fullPlan);
    expect(fullPlan.counts).toEqual({
      selected_unit_count: 140,
      matrix_cell_count: 140,
      unique_product_count: 136,
      eligible_pool_count: 1904,
      excluded_status_counts: {
        excluded_outside_language_scope: 28,
        excluded_pending_legal_review: 28,
      },
      verified_source_section_count: 140,
    });
    for (const domain of fullPlan.domains) {
      expect(fullPlan.units.filter((unit) => unit.domain === domain)).toHaveLength(14);
    }
    for (const taxonomyId of fullPlan.taxonomy_ids) {
      expect(fullPlan.units.filter((unit) => unit.taxonomy.taxonomy_id === taxonomyId)).toHaveLength(10);
    }
    expect(JSON.stringify(fullPlan)).not.toContain("section_text");
    expect(fullPlan.units.every((unit) => unit.source_labels.every((label) =>
      label.layer === "source" || label.layer === "derived"))).toBe(true);
  });

  it("rechecks source bytes when materializing a task and fails closed on drift", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-corpus-source-drift-"));
    temporaryDirectories.push(root);
    const unit = oneCellPlan.units[0]!;
    const sourcePath = await copySelectedSource(root, unit);
    const task = await materializeCorpusAdjudicationTask({
      project_root: root,
      plan: oneCellPlan,
      unit,
      processing_authorization_ref: "authorization.corpus-pilot.fixture",
    });
    expect(task.source.source_ref).toBe(`source-section.${unit.source_ref.digest}`);
    expect(task.governance).toMatchObject({
      retention_eligibility: "transient_only",
      prompt_reuse_eligibility: "never",
      training_eligibility: "never",
    });
    const original = await readFile(sourcePath, "utf8");
    const lines = original.split("\n");
    lines[unit.source_ref.start_line - 1] = `${lines[unit.source_ref.start_line - 1]} drift`;
    await writeFile(sourcePath, lines.join("\n"), "utf8");
    await expect(materializeCorpusAdjudicationTask({
      project_root: root,
      plan: oneCellPlan,
      unit,
      processing_authorization_ref: "authorization.corpus-pilot.fixture",
    })).rejects.toThrow("source_ref:digest_mismatch");
  });

  it("preflights every plan witness before the first provider call", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-corpus-preflight-"));
    temporaryDirectories.push(root);
    const unit = oneCellPlan.units[0]!;
    await copyPlanWitnesses(root, oneCellPlan);
    const sourcePath = await copySelectedSource(root, unit);
    const original = await readFile(sourcePath, "utf8");
    const lines = original.split("\n");
    lines[unit.source_ref.start_line - 1] = `${lines[unit.source_ref.start_line - 1]} drift`;
    await writeFile(sourcePath, lines.join("\n"), "utf8");
    const classifierPort = new AdaptiveRecordedPort("provider.classifier.fixture");
    const evaluatorPort = new AdaptiveRecordedPort("provider.evaluator.fixture");
    await expect(runCorpusAdjudicationBatch({
      project_root: root,
      plan: oneCellPlan,
      processing_authorization_ref: "authorization.corpus-pilot.fixture",
      classifier: context(classifierPort, "classifier"),
      evaluator: context(evaluatorPort, "evaluator"),
      classifier_execution_ref: executionRef("classifier"),
      evaluator_execution_ref: executionRef("evaluator"),
    })).rejects.toThrow("source_ref:digest_mismatch");
    expect(classifierPort.requests).toHaveLength(0);
    expect(evaluatorPort.requests).toHaveLength(0);
  });

  it("runs offline, stores no raw source payload, and resumes without another model call", async () => {
    const storeRoot = await mkdtemp(join(tmpdir(), "contentmd-corpus-adjudication-store-"));
    temporaryDirectories.push(storeRoot);
    const classifierPort = new AdaptiveRecordedPort("provider.classifier.fixture");
    const evaluatorPort = new AdaptiveRecordedPort("provider.evaluator.fixture");
    const first = await runCorpusAdjudicationBatch({
      project_root: workspaceRoot,
      result_store_root: storeRoot,
      plan: oneCellPlan,
      processing_authorization_ref: "authorization.corpus-pilot.fixture",
      classifier: context(classifierPort, "classifier"),
      evaluator: context(evaluatorPort, "evaluator"),
      classifier_execution_ref: executionRef("classifier"),
      evaluator_execution_ref: executionRef("evaluator"),
    });
    expect(first.summary).toMatchObject({
      completed_unit_count: 1,
      decision_status_counts: { ai_accepted: 1 },
      route_counts: { proceed: 1, abstain: 0, human_exception: 0 },
      final_evaluation_verdict_counts: { pass: 1 },
    });
    expect(classifierPort.requests).toHaveLength(1);
    expect(evaluatorPort.requests).toHaveLength(1);

    const runRoot = join(storeRoot, first.store.run_directory);
    const durableBytes = (await Promise.all([
      readFile(join(runRoot, "run.json"), "utf8"),
      readFile(join(runRoot, "plan.json"), "utf8"),
      readFile(join(runRoot, "results/0001.json"), "utf8"),
      readFile(join(runRoot, "decisions.jsonl"), "utf8"),
      readFile(join(runRoot, "summary.json"), "utf8"),
    ])).join("\n");
    expect(durableBytes).not.toContain("section_text");
    expect(durableBytes).not.toContain("untrusted_public_product_evidence\"");

    const resumedClassifier = new AdaptiveRecordedPort("provider.classifier.fixture");
    const resumedEvaluator = new AdaptiveRecordedPort("provider.evaluator.fixture");
    const resumed = await runCorpusAdjudicationBatch({
      project_root: workspaceRoot,
      result_store_root: storeRoot,
      plan: oneCellPlan,
      processing_authorization_ref: "authorization.corpus-pilot.fixture",
      classifier: context(resumedClassifier, "classifier"),
      evaluator: context(resumedEvaluator, "evaluator"),
      classifier_execution_ref: executionRef("classifier"),
      evaluator_execution_ref: executionRef("evaluator"),
    });
    expect(resumed).toEqual(first);
    expect(resumedClassifier.requests).toHaveLength(0);
    expect(resumedEvaluator.requests).toHaveLength(0);

    const resultPath = join(runRoot, "results/0001.json");
    const tampered = JSON.parse(await readFile(resultPath, "utf8")) as any;
    tampered.adjudication_run.run_digest = "f".repeat(64);
    const { record_digest: _oldDigest, ...tamperedPreimage } = tampered;
    tampered.record_digest = sha256Canonical(tamperedPreimage);
    await writeFile(resultPath, canonicalJson(tampered), "utf8");
    await expect(runCorpusAdjudicationBatch({
      project_root: workspaceRoot,
      result_store_root: storeRoot,
      plan: oneCellPlan,
      processing_authorization_ref: "authorization.corpus-pilot.fixture",
      classifier: context(new AdaptiveRecordedPort("provider.classifier.fixture"), "classifier"),
      evaluator: context(new AdaptiveRecordedPort("provider.evaluator.fixture"), "evaluator"),
      classifier_execution_ref: executionRef("classifier"),
      evaluator_execution_ref: executionRef("evaluator"),
    })).rejects.toThrow("stored_result:adjudication_run_digest");
  });

  it("replays the batch through the exact cassette-backed RecordedModelProvider", async () => {
    const captureStore = await mkdtemp(join(tmpdir(), "contentmd-corpus-cassette-capture-"));
    const replayStore = await mkdtemp(join(tmpdir(), "contentmd-corpus-cassette-replay-"));
    const cassetteRoot = await mkdtemp(join(tmpdir(), "contentmd-corpus-cassette-"));
    temporaryDirectories.push(captureStore, replayStore, cassetteRoot);
    const captureClassifier = new AdaptiveRecordedPort("provider.recorded");
    const captureEvaluator = new AdaptiveRecordedPort("provider.recorded");
    await runCorpusAdjudicationBatch({
      project_root: workspaceRoot,
      result_store_root: captureStore,
      plan: oneCellPlan,
      processing_authorization_ref: "authorization.corpus-pilot.recorded-fixture",
      classifier: context(captureClassifier, "classifier"),
      evaluator: context(captureEvaluator, "evaluator"),
      classifier_execution_ref: executionRef("classifier"),
      evaluator_execution_ref: executionRef("evaluator"),
    });
    const exchanges = [
      ...captureClassifier.requests.map((request, index) => ({
        request,
        output: captureClassifier.outputs[index],
      })),
      ...captureEvaluator.requests.map((request, index) => ({
        request,
        output: captureEvaluator.outputs[index],
      })),
    ];
    const cassette = exchanges.map(({ request, output }, index) => JSON.stringify({
      schema_version: "contentmd.recorded-model-entry/0.2.0",
      request_digest: modelRequestDigest(request),
      provider_id: request.requested_provider_id,
      adapter_id: "adapter.recorded",
      adapter_version: "0.2.0",
      model_id: request.requested_model_id,
      provider_response_id: `recorded.corpus.${index + 1}`,
      provider_created_at: null,
      output,
      input_tokens: 100,
      output_tokens: 50,
      cached_input_tokens: 0,
      service_tier: null,
      deterministic_status: "recorded_exact",
    })).join("\n") + "\n";
    const cassettePath = join(cassetteRoot, "responses.jsonl");
    await writeFile(cassettePath, cassette, "utf8");
    const provider = await RecordedModelProvider.fromFile(cassettePath);
    const replay = await runCorpusAdjudicationBatch({
      project_root: workspaceRoot,
      result_store_root: replayStore,
      plan: oneCellPlan,
      processing_authorization_ref: "authorization.corpus-pilot.recorded-fixture",
      classifier: context(provider, "classifier"),
      evaluator: context(provider, "evaluator"),
      classifier_execution_ref: {
        record_id: "recorded-cassette.classifier.exact-fixture",
        content_digest: sha256Canonical(cassette),
        execution_mode: "recorded",
      },
      evaluator_execution_ref: {
        record_id: "recorded-cassette.evaluator.exact-fixture",
        content_digest: sha256Canonical(cassette),
        execution_mode: "recorded",
      },
    });
    expect(replay.summary.decision_status_counts.ai_accepted).toBe(1);
    expect(replay.summary.failure_reason_counts).toEqual({});
  });
});
