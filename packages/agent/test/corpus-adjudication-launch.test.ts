import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sha256Canonical } from "@contentmd/core";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  CORPUS_ADJUDICATION_REQUIRED_DATA_CLASSES,
  CORPUS_ADJUDICATION_REQUIRED_OPERATIONS,
  CORPUS_ADJUDICATION_REQUIRED_OUTPUT_SCHEMA_IDS,
  createCorpusAdjudicationRemoteLaunchRequest,
  verifyCorpusAdjudicationRemoteLaunchRequest,
} from "../src/corpus-adjudication-launch.js";
import {
  createCorpusAdjudicationPlan,
  type CorpusAdjudicationPlan,
} from "../src/corpus-adjudication.js";
import {
  inspectLocalProviderConfiguration,
  type LocalProviderConfigurationInspection,
} from "../src/provider-configuration.js";

const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const target = {
  provider_id: "provider.openai",
  adapter_id: "adapter.openai.responses",
  destination_origin: "https://api.openai.com",
};
const modelId = "model.fixture.ux-adjudication";
const temporaryDirectories: string[] = [];
let plan: CorpusAdjudicationPlan;

function configuredInspection(
  overrides: Partial<LocalProviderConfigurationInspection> = {},
): LocalProviderConfigurationInspection {
  return {
    configured: true,
    configuration_id: "provider-configuration.corpus-pilot.fixture",
    configuration_digest: sha256Canonical({ configuration: "corpus-pilot-fixture" }),
    provider_id: target.provider_id,
    adapter_id: target.adapter_id,
    requested_model_id: modelId,
    model_profile_id: "model-profile.corpus-pilot.fixture",
    model_profile_status: "current",
    data_handling_profile_id: "provider-data.corpus-pilot.fixture",
    data_handling_profile_status: "current",
    account_id: "account.fixture",
    project_id: "contentmd.ux-content-corpus",
    destination_origin: target.destination_origin,
    connection_status: "current",
    grant_status: "current",
    zero_data_retention_status: "enabled",
    abuse_monitoring_retention: "none",
    prompt_caching: "disabled",
    training_opt_in: false,
    supported_operations: [...CORPUS_ADJUDICATION_REQUIRED_OPERATIONS],
    supported_output_schema_ids: [...CORPUS_ADJUDICATION_REQUIRED_OUTPUT_SCHEMA_IDS],
    granted_operations: [...CORPUS_ADJUDICATION_REQUIRED_OPERATIONS],
    granted_output_schema_ids: [...CORPUS_ADJUDICATION_REQUIRED_OUTPUT_SCHEMA_IDS],
    granted_data_classes: [...CORPUS_ADJUDICATION_REQUIRED_DATA_CLASSES],
    maximum_input_tokens: 32_000,
    maximum_output_tokens: 8_000,
    timeout_ms: 60_000,
    maximum_retries: 0,
    secret_ref_id: "secret-ref.fixture",
    authority_effect: "none",
    ...overrides,
  };
}

beforeAll(async () => {
  plan = await createCorpusAdjudicationPlan({ project_root: workspaceRoot });
});

afterAll(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("corpus adjudication remote launch request", () => {
  it("binds the exact plan, models, boundaries, and worst-case workload without source payload", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-corpus-launch-missing-provider-"));
    temporaryDirectories.push(root);
    const missing = await inspectLocalProviderConfiguration(root);
    const request = createCorpusAdjudicationRemoteLaunchRequest({
      plan,
      target,
      classifier: { requested_model_id: modelId },
      evaluator: { requested_model_id: modelId },
      provider_configuration: missing,
      maximum_refinement_rounds: 2,
    });

    expect(request.configuration_readiness).toEqual({
      status: "blocked",
      reason_codes: ["provider_configuration_missing"],
      advisory_codes: ["classifier_evaluator_share_model"],
    });
    expect(request.required_authorization.status).toBe("blocked_by_configuration");
    expect(request.authorization_subject.workload_ceiling).toMatchObject({
      selected_unit_count: 140,
      maximum_refinement_rounds: 2,
      maximum_model_calls_per_unit: 6,
      maximum_classifier_calls: 420,
      maximum_evaluator_calls: 420,
      maximum_model_calls: 840,
      aggregate_upper_bounds: {
        input_tokens: 26_880_000,
        output_tokens: 6_720_000,
      },
    });
    expect(request.authorization_subject.processing_boundary).toMatchObject({
      language_scope: "english_only",
      retention: "transient_only",
      prompt_reuse: "never",
      training: "never",
      benchmark_scoring: false,
      content_authority_effect: "none",
    });
    expect(JSON.stringify(request)).not.toContain("section_text");
    expect(JSON.stringify(request)).not.toContain("secret-ref.fixture");
    expect(request.network_effect).toBe("none");
    expect(request.write_effect).toBe("none");
    verifyCorpusAdjudicationRemoteLaunchRequest(request);
  });

  it("becomes ready only for a matching current zero-retention provider configuration", () => {
    const request = createCorpusAdjudicationRemoteLaunchRequest({
      plan,
      target,
      classifier: { requested_model_id: modelId },
      evaluator: { requested_model_id: modelId },
      provider_configuration: configuredInspection(),
    });

    expect(request.configuration_readiness.status).toBe("ready");
    expect(request.configuration_readiness.reason_codes).toEqual([]);
    expect(request.required_authorization.status).toBe("ready_for_explicit_authorization");
    expect(request.authorization_subject.provider_configuration_ref).toEqual({
      configuration_id: "provider-configuration.corpus-pilot.fixture",
      configuration_digest: configuredInspection().configuration_digest,
    });
    expect(request.required_authorization.required_affirmations).toContain(
      "allow_remote_processing_of_bounded_public_product_evidence",
    );
  });

  it("fails closed on model, operation, data-class, retention, and limit mismatches", () => {
    const request = createCorpusAdjudicationRemoteLaunchRequest({
      plan,
      target,
      classifier: { requested_model_id: modelId },
      evaluator: { requested_model_id: "model.fixture.independent-evaluator" },
      provider_configuration: configuredInspection({
        zero_data_retention_status: "not_established",
        abuse_monitoring_retention: "30 days",
        prompt_caching: "provider managed",
        granted_operations: ["classify"],
        granted_data_classes: ["public_product_evidence"],
        maximum_output_tokens: 4_000,
      }),
    });

    expect(request.configuration_readiness.status).toBe("blocked");
    expect(request.configuration_readiness.reason_codes).toEqual(expect.arrayContaining([
      "provider_configuration_evaluator_model_mismatch",
      "provider_zero_data_retention_not_enabled",
      "provider_abuse_monitoring_retention_not_disabled",
      "provider_prompt_caching_not_disabled",
      "provider_grant_operations_incomplete",
      "provider_grant_data_classes_incomplete",
      "model_profile_output_token_limit_insufficient",
    ]));
    expect(request.configuration_readiness.advisory_codes).toEqual([]);
  });

  it("detects any mutation to the launch request or authorization subject", () => {
    const request = createCorpusAdjudicationRemoteLaunchRequest({
      plan,
      target,
      classifier: { requested_model_id: modelId },
      evaluator: { requested_model_id: modelId },
      provider_configuration: configuredInspection(),
    });
    const tampered = structuredClone(request);
    tampered.authorization_subject.workload_ceiling.maximum_model_calls = 841;
    expect(() => verifyCorpusAdjudicationRemoteLaunchRequest(tampered))
      .toThrow("corpus_adjudication_launch_invalid:request.authorization_subject");
  });

  it("rejects a newly re-digested plan that weakens the corpus processing boundary", () => {
    const forged = structuredClone(plan) as any;
    forged.processing_boundary.training = "allowed";
    const { plan_id: _planId, plan_digest: _planDigest, ...preimage } = forged;
    const digest = sha256Canonical(preimage);
    forged.plan_id = `corpus_adjudication_plan.${digest.slice(0, 32)}`;
    forged.plan_digest = digest;

    expect(() => createCorpusAdjudicationRemoteLaunchRequest({
      plan: forged,
      target,
      classifier: { requested_model_id: modelId },
      evaluator: { requested_model_id: modelId },
      provider_configuration: configuredInspection(),
    })).toThrow("corpus_adjudication_invalid:plan:contract");
  });
});
