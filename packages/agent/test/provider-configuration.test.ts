import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  providerRecordDigestValid,
  type AuthorizationInput,
} from "@contentmd/governance";
import {
  PROVIDER_NOW,
  providerFixture,
} from "../../governance/test/provider-fixtures.js";
import { FilesystemLocalArtifactStore } from "../src/local-artifacts.js";
import {
  PROVIDER_CONFIGURATION_ARTIFACT,
  FilesystemProviderConfigurationResolver,
  ProviderConfigurationError,
  createProviderConfigurationBundle,
  inspectLocalProviderConfiguration,
  proposeOpenAIProviderConfiguration,
  proposeProviderAuthorization,
} from "../src/provider-configuration.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

function bundleInput() {
  const provider = providerFixture().authorization;
  const { now: _now, ...authorization } = provider.authorization;
  return {
    configuration_id: "provider-configuration.openai.fixture",
    adapter_id: provider.adapter_id,
    adapter_version: provider.adapter_version,
    model_profile: provider.model_profile!,
    data_handling_profile: provider.data_handling_profile!,
    connection: provider.connection!,
    secret_ref: provider.secret_ref!,
    header_template: provider.header_template!,
    provider_grant: provider.provider_grant!,
    authorization: authorization as Omit<AuthorizationInput, "now">,
    revocation_checkpoint: provider.revocation_checkpoint,
    audit_available: true as const,
    authority_effect: "none" as const,
  };
}

describe("provider configuration bundle", () => {
  it("resolves exact record refs without retaining a request or secret material", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-provider-configuration-"));
    temporaryDirectories.push(root);
    const artifacts = new FilesystemLocalArtifactStore(root);
    const bundle = createProviderConfigurationBundle(bundleInput());
    await artifacts.writeCanonical(PROVIDER_CONFIGURATION_ARTIFACT, bundle);
    const resolver = new FilesystemProviderConfigurationResolver();

    const resolved = await resolver.resolve({
      project_root: root,
      model_profile_ref: bundle.model_profile.profile_id,
      connection_ref: bundle.connection.connection_id,
      grant_ref: bundle.provider_grant.grant_id,
      control_refs: bundle.authorization.control_dispositions.map((control) => control.record_ref!),
    });

    expect(resolved.model_profile?.profile_id).toBe("model-profile.openai.fixture");
    expect(providerRecordDigestValid(
      resolved.connection as unknown as Record<string, unknown>,
      "connection_digest",
    )).toBe(true);
    expect(resolved).not.toHaveProperty("request");
    expect(JSON.stringify(resolved)).not.toContain("api_key_value");

    const inspection = await inspectLocalProviderConfiguration(root);
    expect(inspection).toMatchObject({
      configured: true,
      configuration_id: bundle.configuration_id,
      configuration_digest: bundle.configuration_digest,
      model_profile_id: bundle.model_profile.profile_id,
      data_handling_profile_id: bundle.data_handling_profile.profile_id,
      supported_operations: bundle.model_profile.supported_operations,
      granted_operations: bundle.provider_grant.operations,
      granted_data_classes: bundle.provider_grant.data_classes,
      maximum_input_tokens: bundle.model_profile.maximum_input_tokens,
      maximum_output_tokens: bundle.model_profile.maximum_output_tokens,
      authority_effect: "none",
    });
  });

  it("rejects lookup drift, bundle tamper, and credential material", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-provider-configuration-"));
    temporaryDirectories.push(root);
    const artifacts = new FilesystemLocalArtifactStore(root);
    const bundle = createProviderConfigurationBundle(bundleInput());
    await artifacts.writeCanonical(PROVIDER_CONFIGURATION_ARTIFACT, bundle);
    const resolver = new FilesystemProviderConfigurationResolver();
    const lookup = {
      project_root: root,
      model_profile_ref: bundle.model_profile.profile_id,
      connection_ref: bundle.connection.connection_id,
      grant_ref: bundle.provider_grant.grant_id,
      control_refs: bundle.authorization.control_dispositions.map((control) => control.record_ref!),
    };

    await expect(resolver.resolve({ ...lookup, grant_ref: "grant.wrong" }))
      .rejects.toBeInstanceOf(ProviderConfigurationError);
    await artifacts.writeCanonical(PROVIDER_CONFIGURATION_ARTIFACT, {
      ...bundle,
      configuration_digest: "0".repeat(64),
    });
    await expect(resolver.resolve(lookup)).rejects.toMatchObject({
      code: "provider_configuration_digest_invalid",
    });
    expect(() => createProviderConfigurationBundle({
      ...bundleInput(),
      secret_ref: {
        ...bundleInput().secret_ref,
        secret_value: "api_key_value",
      } as never,
    })).toThrow("provider_configuration_secret_material_present");
  });

  it("proposes classify and evaluate capabilities without granting or connecting them", () => {
    const connection = proposeOpenAIProviderConfiguration({
      project_root: "/project",
      requested_model_id: "model.fixture",
      operations: ["classify", "evaluate"],
    });
    const authorization = proposeProviderAuthorization({
      project_root: "/project",
      provider_id: "openai",
      operations: ["classify", "evaluate"],
    });

    expect(connection.proposed_operations).toEqual(["classify", "evaluate"]);
    expect(connection.network_effect).toBe("none");
    expect(connection.grant_effect).toBe("none");
    expect(authorization.operations).toEqual(["classify", "evaluate"]);
    expect(authorization.capability_grant_state).toBe("none");
    expect(authorization.authority_effect).toBe("none");
  });
});
