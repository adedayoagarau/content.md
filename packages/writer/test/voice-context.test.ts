import { describe, expect, it } from "vitest";
import { qualifyVoiceToneProfile } from "@contentmd/evaluation";
import {
  compileVersionedPrompt,
  createVoicePromptContext,
  type PromptContextItem,
} from "@contentmd/writer";
import { eligibleVoiceFixture } from "../../evaluation/test/voice-tone-test-fixtures.js";

const ref = {
  record_id: "context.voice.fixture",
  schema_id: "contentmd.fixture-record",
  schema_version: "0.1.0" as const,
  content_digest: "a".repeat(64),
};

describe("bounded writer voice context", () => {
  it("projects only approved intervals and references into proposal-only prompts", () => {
    const fixture = eligibleVoiceFixture();
    const voiceContext = createVoicePromptContext(fixture.qualify_input);
    const prompt = compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.voice-fixture",
        template_version: "0.1.0",
        instructions: "Use approved bounded guidance only. Produce a proposal, never a decision.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: ref,
      retrieval_snapshot_ref: null,
      context_items: [voiceContext],
      payload: { task: "synthetic recovery" },
    });

    expect(voiceContext.data_class).toBe("voice_tone_guidance");
    expect(voiceContext.content.verification_digest).toBe(
      voiceContext.verification.verification_digest,
    );
    expect(prompt.input).toContain("voice_tone_guidance");
    expect(prompt.input).toContain("directness");
    expect(prompt.input).toContain(voiceContext.verification.verification_digest);
    expect(prompt.input).not.toContain("Synthetic evidence-bound voice candidate");
    expect(prompt.input).not.toContain("qualification_input");
    expect(prompt.input).not.toContain("bounded_span");
    expect(prompt.authority_effect).toBe("none");
  });

  it("rejects self-attested voice guidance without a complete replay proof", () => {
    const fixture = eligibleVoiceFixture();
    const profile = qualifyVoiceToneProfile(fixture.qualify_input);
    const unverified = {
      source_ref: profile.map_snapshot_ref,
      data_class: "voice_tone_guidance",
      content: {
        contract_version: "contentmd.voice-prompt-context/0.1.0",
        profile_digest: profile.profile_digest,
        feature_values: profile.feature_values,
        authority_effect: "none",
      },
    } as PromptContextItem;

    expect(() => compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.voice-fixture",
        template_version: "0.1.0",
        instructions: "Produce a proposal.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: ref,
      retrieval_snapshot_ref: null,
      context_items: [unverified],
      payload: { task: "synthetic recovery" },
    })).toThrow("prompt_context_forbidden:voice_tone_guidance_unverified");
  });

  it("replays voice guidance and rejects content or approval-currentness drift", () => {
    const fixture = eligibleVoiceFixture();
    const voiceContext = createVoicePromptContext(fixture.qualify_input);
    const tampered = structuredClone(voiceContext);
    tampered.content.locale = "fr-FR";

    expect(() => compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.voice-fixture",
        template_version: "0.1.0",
        instructions: "Produce a proposal.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: ref,
      retrieval_snapshot_ref: null,
      context_items: [tampered],
      payload: { task: "synthetic recovery" },
    })).toThrow("prompt_context_forbidden:voice_tone_guidance_replay_mismatch");

    expect(() => createVoicePromptContext({
      ...fixture.qualify_input,
      task_scope: {
        ...fixture.qualify_input.task_scope,
        evaluation_at: "2027-01-01T00:00:00Z",
      },
    })).toThrow("voice_profile_not_eligible:approval_not_current");
  });

  it("rejects raw browser expression evidence even when labeled public", () => {
    const raw = {
      source_ref: {
        record_id: "observed_expression.forbidden",
        schema_id: "contentmd.observed-expression-evidence-record",
        schema_version: "0.1.0",
        content_digest: "b".repeat(64),
      },
      data_class: "public",
      content: {
        contract_version: "contentmd.observed-expression-evidence/0.1.0",
        bounded_span: "Distinctive third-party expression",
      },
    } as PromptContextItem;

    expect(() => compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.voice-fixture",
        template_version: "0.1.0",
        instructions: "Produce a proposal.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: ref,
      retrieval_snapshot_ref: null,
      context_items: [raw],
      payload: { task: "synthetic recovery" },
    })).toThrow("prompt_context_forbidden");
  });
});
