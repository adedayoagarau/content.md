import { describe, expect, it } from "vitest";
import { finalizeRecord } from "@contentmd/core";
import type { ModelExecutionPort } from "@contentmd/model-provider-sdk";
import {
  compileStrategyPrompt,
  createProjectFactPromptContext,
  executeCompiledWriterPrompt,
  type WriterModelExecutionContext,
} from "@contentmd/writer";
import { projectFactFixture, projectFactTask } from "./project-fact-test-fixtures.js";

const contextPacketRef = {
  record_id: "context.project-fact.fixture",
  schema_id: "contentmd.context-packet",
  schema_version: "0.1.0" as const,
  content_digest: "a".repeat(64),
};

function compileFixture() {
  const fixture = projectFactFixture();
  const context = createProjectFactPromptContext(fixture.input);
  const prompt = compileStrategyPrompt({
    project_id: fixture.input.project_id,
    task: fixture.task,
    review_finding_refs: [],
    pattern_refs: [],
    context_packet_ref: contextPacketRef,
    retrieval_snapshot_ref: null,
    context_items: [context],
  });
  return { ...fixture, context, prompt };
}

describe("project-owned fact prompt context", () => {
  it("replays fact lineage and current approval while withholding source locators", () => {
    const { context, prompt, source, fact, approval } = compileFixture();

    expect(context.data_class).toBe("project_fact");
    expect(context.source_ref.record_id).toBe(fact.record_id);
    expect(context.content.claim).toBe(fact.payload.claim);
    expect(context.content.verification_digest).toBe(context.verification.verification_digest);
    expect(JSON.stringify(context.verification)).toContain(source.payload.locator);
    expect(prompt.input).toContain(fact.payload.claim);
    expect(prompt.input).toContain(source.record_id);
    expect(prompt.input).toContain(approval.record_id);
    expect(prompt.input).toContain(context.verification.verification_digest);
    expect(prompt.input).not.toContain(source.payload.locator);
    expect(prompt.input).not.toContain("qualification_input");
    expect(prompt.authority_effect).toBe("none");
    expect(Object.isFrozen(context)).toBe(true);
    expect(Object.isFrozen(context.verification)).toBe(true);
  });

  it("rejects incomplete lineage, expired approval, wrong project, and an unrequired fact", () => {
    const fixture = projectFactFixture();
    expect(() => createProjectFactPromptContext({
      ...fixture.input,
      source_records: [],
    })).toThrow("project_fact_prompt_context_invalid:source_set");

    const { content_digest: _approvalDigest, ...approvalInput } = fixture.approval;
    const expiredApproval = finalizeRecord({
      ...approvalInput,
      payload: {
        ...approvalInput.payload,
        expires_at: "2026-08-21T12:00:00Z",
      },
    });
    expect(() => createProjectFactPromptContext({
      ...fixture.input,
      approval_record: expiredApproval,
    })).toThrow("project_fact_prompt_context_invalid:approval_not_current");

    expect(() => createProjectFactPromptContext({
      ...fixture.input,
      project_id: "project.other",
    })).toThrow("project_fact_prompt_context_invalid:fact_scope");

    expect(() => createProjectFactPromptContext({
      ...fixture.input,
      task: projectFactTask(["fact.other"]),
    })).toThrow("project_fact_prompt_context_invalid:task_fact");
  });

  it("rejects projected-content tampering and incomplete required-fact coverage", () => {
    const fixture = projectFactFixture();
    const context = createProjectFactPromptContext(fixture.input);
    const tampered = structuredClone(context);
    tampered.content.claim = "A caller replaced the approved claim.";
    expect(() => compileStrategyPrompt({
      project_id: fixture.input.project_id,
      task: fixture.task,
      review_finding_refs: [],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [tampered],
    })).toThrow("prompt_context_forbidden:project_fact_replay_mismatch");

    const twoFactTask = projectFactTask([
      fixture.fact.record_id,
      "fact.second-required",
    ]);
    const oneOfTwo = projectFactFixture(twoFactTask);
    const oneContext = createProjectFactPromptContext(oneOfTwo.input);
    expect(() => compileStrategyPrompt({
      project_id: oneOfTwo.input.project_id,
      task: twoFactTask,
      review_finding_refs: [],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [oneContext],
    })).toThrow("prompt_context_forbidden:project_fact_coverage");
  });

  it("binds a compiled fact to the execution project before provider access", async () => {
    const fixture = compileFixture();
    let providerCalled = false;
    const provider: ModelExecutionPort = {
      descriptor: {
        provider_id: "provider.must-not-run",
        provider_version: "0.2.0",
        adapter_id: "adapter.must-not-run",
        adapter_version: "0.2.0",
        execution_mode: "recorded",
        deterministic_status: "recorded_exact",
        network_required: false,
        remote_authorization_required: false,
        supported_request_versions: ["contentmd.model-request/0.2.0"],
        strict_schema_output: true,
      },
      async execute() {
        providerCalled = true;
        throw new Error("provider_should_not_run");
      },
    };
    const execution: WriterModelExecutionContext = {
      project_id: "project.other",
      surface: "checkout",
      memory_scope: "project",
      requested_provider_id: provider.descriptor.provider_id,
      requested_model_profile_ref: {
        record_id: "model-profile.fixture",
        schema_id: "contentmd.model-profile",
        schema_version: "0.1.0",
        content_digest: "e".repeat(64),
      },
      requested_model_id: "model.fixture",
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [fixture.context],
      resource_limits: {
        maximum_calls: 1,
        maximum_retries: 0,
        maximum_input_bytes: 131_072,
        maximum_output_bytes: 65_536,
        maximum_input_tokens: 8_000,
        maximum_output_tokens: 2_000,
        timeout_ms: 30_000,
      },
    };

    await expect(executeCompiledWriterPrompt(provider, {
      operation: "strategy",
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      task: fixture.task,
      prompt: fixture.prompt,
      execution,
    })).rejects.toThrow("writer_project_fact_scope_mismatch");
    expect(providerCalled).toBe(false);
  });

  it("rejects raw public execution context before provider access", async () => {
    const fixture = compileFixture();
    let providerCalled = false;
    const provider: ModelExecutionPort = {
      descriptor: {
        provider_id: "provider.must-not-run",
        provider_version: "0.2.0",
        adapter_id: "adapter.must-not-run",
        adapter_version: "0.2.0",
        execution_mode: "recorded",
        deterministic_status: "recorded_exact",
        network_required: false,
        remote_authorization_required: false,
        supported_request_versions: ["contentmd.model-request/0.2.0"],
        strict_schema_output: true,
      },
      async execute() {
        providerCalled = true;
        throw new Error("provider_should_not_run");
      },
    };
    const execution: WriterModelExecutionContext = {
      project_id: fixture.input.project_id,
      surface: "checkout",
      memory_scope: "project",
      requested_provider_id: provider.descriptor.provider_id,
      requested_model_profile_ref: {
        record_id: "model-profile.fixture",
        schema_id: "contentmd.model-profile",
        schema_version: "0.1.0",
        content_digest: "e".repeat(64),
      },
      requested_model_id: "model.fixture",
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [
        fixture.context,
        {
          source_ref: {
            record_id: "public.unverified",
            schema_id: "contentmd.public-fixture",
            schema_version: "0.1.0",
            content_digest: "c".repeat(64),
          },
          data_class: "public",
          content: { mechanism: "Unreviewed public-source material." },
        },
      ],
      resource_limits: {
        maximum_calls: 1,
        maximum_retries: 0,
        maximum_input_bytes: 131_072,
        maximum_output_bytes: 65_536,
        maximum_input_tokens: 8_000,
        maximum_output_tokens: 2_000,
        timeout_ms: 30_000,
      },
    };

    await expect(executeCompiledWriterPrompt(provider, {
      operation: "strategy",
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      task: fixture.task,
      prompt: fixture.prompt,
      execution,
    })).rejects.toThrow("writer_public_context_forbidden");
    expect(providerCalled).toBe(false);

    const compiledWithPublicEgress = structuredClone(fixture.prompt);
    compiledWithPublicEgress.egress_items.push({
      source_ref: execution.context_items[1]!.source_ref,
      data_class: "public",
      item_digest: "d".repeat(64),
    });
    await expect(executeCompiledWriterPrompt(provider, {
      operation: "strategy",
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      task: fixture.task,
      prompt: compiledWithPublicEgress,
      execution: {
        ...execution,
        context_items: [fixture.context],
      },
    })).rejects.toThrow("writer_public_context_forbidden");
    expect(providerCalled).toBe(false);
  });
});
