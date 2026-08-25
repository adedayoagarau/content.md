import { describe, expect, it } from "vitest";
import * as writer from "@contentmd/writer";
import {
  createProjectFactPromptContext,
  type PromptContextItem,
} from "@contentmd/writer";
import { projectFactFixture } from "./project-fact-test-fixtures.js";
import {
  approvedExampleFixture,
  counterexampleFixture,
} from "./product-example-test-fixtures.js";

const contextPacketRef = {
  record_id: "context.product-example.fixture",
  schema_id: "contentmd.context-packet",
  schema_version: "0.1.0" as const,
  content_digest: "a".repeat(64),
};

type ProductExampleFactory = (input: unknown) => {
  source_ref: { record_id: string };
  data_class: string;
  content: Record<string, unknown>;
  verification: Record<string, unknown>;
};

describe("product-example prompt context", () => {
  it("replays a current project-owned approved expression while withholding source locators", () => {
    const createContext = (writer as unknown as {
      createProductExamplePromptContext?: ProductExampleFactory;
    }).createProductExamplePromptContext;
    expect(createContext).toBeTypeOf("function");

    const fixture = approvedExampleFixture();
    const context = createContext!(fixture.input);
    const projectFact = createProjectFactPromptContext(
      projectFactFixture(fixture.task).input,
    );
    const prompt = writer.compileStrategyPrompt({
      project_id: fixture.projectId,
      task: fixture.task,
      review_finding_refs: [],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [projectFact, context] as PromptContextItem[],
    });

    expect(context.data_class).toBe("approved_example");
    expect(context.source_ref.record_id).toBe("expression.product-example.fixture");
    expect(context.content.expression_payload).toBe(fixture.expression);
    expect(prompt.input).toContain(fixture.expression);
    expect(JSON.stringify(context.verification)).toContain(fixture.sourceLocator);
    expect(prompt.input).not.toContain(fixture.sourceLocator);
    expect(prompt.input).not.toContain("lineage_records");
    expect(prompt.input).not.toContain("qualification_input");
    expect(Object.isFrozen(context)).toBe(true);
  });

  it("admits a project-owned counterexample only with its deterministic finding replay", () => {
    const fixture = counterexampleFixture();
    const context = writer.createProductExamplePromptContext(fixture.input);
    const projectFact = createProjectFactPromptContext(
      projectFactFixture(fixture.task).input,
    );
    const prompt = writer.compileStrategyPrompt({
      project_id: fixture.projectId,
      task: fixture.task,
      review_finding_refs: [],
      pattern_refs: [],
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [projectFact, context],
    });

    expect(context.data_class).toBe("counterexample");
    expect(context.content.expression_payload).toBe(fixture.expression);
    expect(context.content.counterexample_rationale).toBe(fixture.finding.rationale);
    expect(prompt.input).toContain(fixture.expression);
    expect(prompt.input).toContain(fixture.finding.suggested_next_action);
    expect(prompt.input).not.toContain("review_input");
    expect(prompt.input).not.toContain("source_artifact");
  });

  it("rejects unknown fields in the qualification envelope", () => {
    const fixture = approvedExampleFixture();
    expect(() => writer.createProductExamplePromptContext({
      ...fixture.input,
      caller_asserted_quality: "excellent",
    } as typeof fixture.input)).toThrow("product_example_prompt_context_invalid:input_shape");
  });
});
