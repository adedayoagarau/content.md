import { describe, expect, it } from "vitest";
import type { ModelExecutionPort } from "@contentmd/model-provider-sdk";
import * as writer from "@contentmd/writer";
import {
  createProjectFactPromptContext,
  createReviewFindingPromptContext,
  type WriterModelExecutionContext,
} from "@contentmd/writer";
import { projectFactFixture } from "./project-fact-test-fixtures.js";
import { reviewFindingFixture } from "./review-finding-test-fixtures.js";

const contextPacketRef = {
  record_id: "context.review-finding.fixture",
  schema_id: "contentmd.context-packet",
  schema_version: "0.1.0" as const,
  content_digest: "a".repeat(64),
};

type ReviewContextFactory = (input: unknown) => {
  source_ref: { record_id: string };
  data_class: string;
  content: Record<string, unknown>;
  verification: Record<string, unknown>;
};

describe("review-finding prompt context", () => {
  it("replays the deterministic report while withholding source expression text", () => {
    const createContext = (writer as unknown as {
      createReviewFindingPromptContext?: ReviewContextFactory;
    }).createReviewFindingPromptContext;
    expect(createContext).toBeTypeOf("function");

    const fixture = reviewFindingFixture();
    const context = createContext!(fixture.input);
    const projectFact = createProjectFactPromptContext(
      projectFactFixture(fixture.task).input,
    );
    const prompt = writer.compileStrategyPrompt({
      project_id: fixture.projectId,
      task: fixture.task,
      review_finding_refs: [fixture.finding.finding_id],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [projectFact, context] as writer.PromptContextItem[],
    });

    expect(context.data_class).toBe("review_finding");
    expect(context.source_ref.record_id).toBe(fixture.finding.finding_id);
    expect(context.content.rationale).toBe(fixture.finding.rationale);
    expect(JSON.stringify(context.verification)).toContain("Payment failed. Try again.");
    expect(prompt.input).toContain(fixture.finding.rationale);
    expect(prompt.input).toContain(fixture.finding.suggested_next_action);
    expect(prompt.input).not.toContain("Payment failed. Try again.");
    expect(prompt.input).not.toContain("expression_payload");
    expect(prompt.input).not.toContain('"review_input":');
    expect(prompt.input).not.toContain("qualification_input");
    expect(Object.isFrozen(context)).toBe(true);
  });

  it("rejects report tampering and incomplete finding coverage", () => {
    const fixture = reviewFindingFixture();
    const tamperedReport = structuredClone(fixture.reviewReport);
    const selected = tamperedReport.findings.find((finding) => (
      finding.finding_id === fixture.finding.finding_id
    ));
    if (selected === undefined) throw new Error("missing selected finding");
    selected.suggested_next_action = "A caller replaced the deterministic action.";
    expect(() => createReviewFindingPromptContext({
      ...fixture.input,
      review_report: tamperedReport,
    })).toThrow("review_finding_prompt_context_invalid:review_replay");

    const context = createReviewFindingPromptContext(fixture.input);
    const projectFact = createProjectFactPromptContext(
      projectFactFixture(fixture.task).input,
    );
    expect(() => writer.compileStrategyPrompt({
      project_id: fixture.projectId,
      task: fixture.task,
      review_finding_refs: [],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [projectFact, context],
    })).toThrow("prompt_context_forbidden:review_finding_coverage");
  });

  it("rejects a foreign review proof before provider access", async () => {
    const fixture = reviewFindingFixture();
    const context = createReviewFindingPromptContext(fixture.input);
    const projectFact = createProjectFactPromptContext(
      projectFactFixture(fixture.task).input,
    );
    const prompt = writer.compileStrategyPrompt({
      project_id: fixture.projectId,
      task: fixture.task,
      review_finding_refs: [fixture.finding.finding_id],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [projectFact, context],
    });
    const foreign = reviewFindingFixture(fixture.task, "project.other");
    const foreignContext = createReviewFindingPromptContext(foreign.input);
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
      project_id: fixture.projectId,
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
      context_items: [projectFact, foreignContext],
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

    await expect(writer.executeCompiledWriterPrompt(provider, {
      operation: "strategy",
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      task: fixture.task,
      prompt,
      execution,
    })).rejects.toThrow("writer_review_finding_binding_mismatch");
    expect(providerCalled).toBe(false);

    const promptWithExtraFinding = structuredClone(prompt);
    promptWithExtraFinding.egress_items.push({
      source_ref: {
        record_id: "finding.self-authored",
        schema_id: "contentmd.content-finding",
        schema_version: "0.1.0",
        content_digest: "9".repeat(64),
      },
      data_class: "review_finding",
      item_digest: "8".repeat(64),
    });
    await expect(writer.executeCompiledWriterPrompt(provider, {
      operation: "strategy",
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      task: fixture.task,
      prompt: promptWithExtraFinding,
      execution: {
        ...execution,
        context_items: [projectFact, context],
      },
    })).rejects.toThrow("writer_review_finding_prompt_mismatch");
    expect(providerCalled).toBe(false);
  });
});
