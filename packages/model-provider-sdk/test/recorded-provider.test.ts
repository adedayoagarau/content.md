import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  RecordedModelProvider,
  canonicalizeModelOutput,
  createModelRequest,
  modelRequestDigest,
  type GovernedModelRequestInput,
} from "@contentmd/model-provider-sdk";

const temporaryDirectories: string[] = [];

const objectRef = (recordId: string) => ({
  record_id: recordId,
  schema_id: "contentmd.fixture-record",
  schema_version: "0.1.0",
  content_digest: "a".repeat(64),
});

function governedRequestInput(): GovernedModelRequestInput {
  return {
    operation: "classify",
    output_schema_id: "contentmd.classification-model-output/0.1.0",
    prompt_template: {
      template_id: "contentmd.prompt.classify",
      template_version: "0.1.0",
      template_digest: "b".repeat(64),
    },
    context_packet_ref: objectRef("context.fixture"),
    retrieval_snapshot_ref: null,
    requested_provider_id: "provider.recorded-fixture",
    requested_model_profile_ref: objectRef("model-profile.fixture"),
    requested_model_id: "model.synthetic-classifier-v2",
    scope: {
      project_id: "project.fixture",
      task_id: "task.fixture",
      memory_scope: "project",
      locale: "en-US",
      channel: "web",
      surface: "checkout",
      risk: "high",
    },
    data_classes: ["project_fact"],
    egress_item_digests: ["c".repeat(64)],
    resource_limits: {
      maximum_calls: 1,
      maximum_retries: 0,
      maximum_input_bytes: 16_384,
      maximum_output_bytes: 32_768,
      maximum_input_tokens: 4_000,
      maximum_output_tokens: 1_000,
      timeout_ms: 30_000,
    },
    provider_application_state: "none",
    input: { request: "Classify this content task." },
    authority_effect: "none",
  };
}

function classificationOutput() {
  return {
    authority_effect: "none",
    intent: "draft",
    risk_level: "high",
    risk_signals: [{
      category: "financial_consequence",
      rationale: "The task concerns a payment retry.",
      evidence_refs: ["evidence.payment.state"],
    }],
    review_requirements: ["product_owner"],
    uncertainty: ["The payment outcome is not established."],
  };
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("RecordedModelProvider", () => {
  it("executes an exact 0.2 request offline and returns a canonical proposal-only result", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-recorded-provider-"));
    temporaryDirectories.push(root);
    const input = governedRequestInput();
    const request = createModelRequest(input);
    const output = classificationOutput();
    const cassette = {
      schema_version: "contentmd.recorded-model-entry/0.2.0",
      request_digest: modelRequestDigest(request),
      provider_id: "provider.recorded-fixture",
      adapter_id: "adapter.recorded",
      adapter_version: "0.2.0",
      model_id: "model.synthetic-classifier-v2",
      provider_response_id: "recorded.response.fixture",
      provider_created_at: "2026-08-22T20:00:00.000Z",
      output,
      input_tokens: 19,
      output_tokens: 31,
      cached_input_tokens: 0,
      service_tier: null,
      deterministic_status: "recorded_exact",
    };
    const path = join(root, "cassette.jsonl");
    await writeFile(path, `${JSON.stringify(cassette)}\n`);
    const provider = await RecordedModelProvider.fromFile(path);

    const result = await provider.execute(request);
    const canonical = canonicalizeModelOutput(input.output_schema_id, output);

    expect(provider.descriptor).toEqual({
      provider_id: "provider.recorded",
      provider_version: "0.2.0",
      adapter_id: "adapter.recorded",
      adapter_version: "0.2.0",
      execution_mode: "recorded",
      deterministic_status: "recorded_exact",
      network_required: false,
      remote_authorization_required: false,
      supported_request_versions: ["contentmd.model-request/0.1.0", "contentmd.model-request/0.2.0"],
      strict_schema_output: true,
    });
    expect(result.canonical_output).toEqual(output);
    expect(result.response).toEqual(expect.objectContaining({
      schema_version: "contentmd.model-response/0.2.0",
      request_id: request.request_id,
      response_state: "completed",
      canonical_output_digest: canonical.canonical_output_digest,
      output_digest: canonical.canonical_output_digest,
      provider_storage_requested: false,
      retry_count: 0,
      authority_effect: "none",
    }));
    expect(result.response.token_accounting).toEqual({
      input_tokens: 19,
      output_tokens: 31,
      total_tokens: 50,
      cached_input_tokens: 0,
    });
    expect(Object.isFrozen(result)).toBe(true);
    expect(await provider.execute(request)).toEqual(result);
  });

  it.each([
    ["provider", { provider_id: "provider.other" }],
    ["model", { model_id: "model.other" }],
    ["input token ceiling", { input_tokens: 4_001 }],
    ["output token ceiling", { output_tokens: 1_001 }],
  ] as const)("fails closed on a governed %s mismatch", async (_label, override) => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-recorded-provider-"));
    temporaryDirectories.push(root);
    const input = governedRequestInput();
    const request = createModelRequest(input);
    const cassette = {
      schema_version: "contentmd.recorded-model-entry/0.2.0",
      request_digest: modelRequestDigest(request),
      provider_id: input.requested_provider_id,
      adapter_id: "adapter.recorded",
      adapter_version: "0.2.0",
      model_id: input.requested_model_id,
      provider_response_id: "recorded.response.fixture",
      provider_created_at: "2026-08-22T20:00:00.000Z",
      output: classificationOutput(),
      input_tokens: 19,
      output_tokens: 31,
      cached_input_tokens: 0,
      service_tier: null,
      deterministic_status: "recorded_exact",
      ...override,
    };
    const path = join(root, "cassette.jsonl");
    await writeFile(path, `${JSON.stringify(cassette)}\n`);
    const provider = await RecordedModelProvider.fromFile(path);

    await expect(provider.execute(request)).rejects.toThrow("recorded_response_binding_mismatch");
  });

  it("rejects unknown governed cassette fields before execution", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-recorded-provider-"));
    temporaryDirectories.push(root);
    const request = createModelRequest(governedRequestInput());
    const cassette = {
      schema_version: "contentmd.recorded-model-entry/0.2.0",
      request_digest: modelRequestDigest(request),
      provider_id: request.requested_provider_id,
      adapter_id: "adapter.recorded",
      adapter_version: "0.2.0",
      model_id: request.requested_model_id,
      provider_response_id: null,
      provider_created_at: null,
      output: classificationOutput(),
      input_tokens: 19,
      output_tokens: 31,
      cached_input_tokens: 0,
      service_tier: null,
      deterministic_status: "recorded_exact",
      ungoverned_metadata: "must not be accepted",
    };
    const path = join(root, "cassette.jsonl");
    await writeFile(path, `${JSON.stringify(cassette)}\n`);

    await expect(RecordedModelProvider.fromFile(path)).rejects.toThrow(
      "invalid_recorded_model_entry:1:shape",
    );
  });

  it("rejects a canonical output larger than the request byte ceiling", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-recorded-provider-"));
    temporaryDirectories.push(root);
    const input = governedRequestInput();
    input.resource_limits.maximum_output_bytes = 1;
    const request = createModelRequest(input);
    const cassette = {
      schema_version: "contentmd.recorded-model-entry/0.2.0",
      request_digest: modelRequestDigest(request),
      provider_id: input.requested_provider_id,
      adapter_id: "adapter.recorded",
      adapter_version: "0.2.0",
      model_id: input.requested_model_id,
      provider_response_id: null,
      provider_created_at: null,
      output: classificationOutput(),
      input_tokens: 19,
      output_tokens: 31,
      cached_input_tokens: 0,
      service_tier: null,
      deterministic_status: "recorded_exact",
    };
    const path = join(root, "cassette.jsonl");
    await writeFile(path, `${JSON.stringify(cassette)}\n`);
    const provider = await RecordedModelProvider.fromFile(path);

    await expect(provider.execute(request)).rejects.toThrow("recorded_response_binding_mismatch");
  });

  it("returns an exact digest-bound recorded response", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-recorded-provider-"));
    temporaryDirectories.push(root);
    const request = createModelRequest({
      operation: "draft",
      output_schema_id: "contentmd.test-output/0.1.0",
      input: { task: "fixture" },
    });
    const cassette = {
      schema_version: "contentmd.recorded-model-entry/0.1.0",
      request_digest: modelRequestDigest(request),
      provider_id: "provider.recorded-fixture",
      model_id: "model.synthetic-writer-v1",
      output: { text: "Recorded output" },
      input_tokens: 11,
      output_tokens: 4,
      deterministic_status: "recorded_exact",
    };
    const path = join(root, "cassette.jsonl");
    await writeFile(path, `${JSON.stringify(cassette)}\n`);
    const provider = await RecordedModelProvider.fromFile(path);

    const response = await provider.generate(request);

    expect(response.input_digest).toBe(modelRequestDigest(request));
    expect(response.output).toEqual({ text: "Recorded output" });
    expect(response.output_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(response.deterministic_status).toBe("recorded_exact");
    expect(response.provider_id).toBe("provider.recorded-fixture");
  });

  it("fails closed when the exact request digest is absent", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-recorded-provider-"));
    temporaryDirectories.push(root);
    const path = join(root, "cassette.jsonl");
    await writeFile(path, "");
    const provider = await RecordedModelProvider.fromFile(path);
    const request = createModelRequest({
      operation: "rewrite",
      output_schema_id: "contentmd.test-output/0.1.0",
      input: { task: "not-recorded" },
    });

    await expect(provider.generate(request)).rejects.toThrow(
      `recorded_response_not_found:${modelRequestDigest(request)}`,
    );
  });
});
