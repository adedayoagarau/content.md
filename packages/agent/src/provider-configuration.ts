import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  providerRecordDigestValid,
  type AuthorizationInput,
  type ModelProfile,
  type ProviderCapabilityGrant,
  type ProviderConnectionRecord,
  type ProviderDataHandlingProfile,
  type RequestHeaderTemplate,
  type RevocationCheckpoint,
  type SecretRef,
} from "@contentmd/governance";
import {
  FilesystemLocalArtifactStore,
  LocalArtifactError,
  type LocalArtifactStore,
} from "./local-artifacts.js";
import type {
  ProviderConfigurationLookup,
  ProviderConfigurationResolver,
  ResolvedProviderConfiguration,
} from "./live-model-executor.js";

export const PROVIDER_CONFIGURATION_ARTIFACT = "provider-configuration.json" as const;

export interface ProviderConfigurationBundleInput {
  configuration_id: string;
  adapter_id: string;
  adapter_version: string;
  model_profile: ModelProfile;
  data_handling_profile: ProviderDataHandlingProfile;
  connection: ProviderConnectionRecord;
  secret_ref: SecretRef;
  header_template: RequestHeaderTemplate;
  provider_grant: ProviderCapabilityGrant;
  authorization: Omit<AuthorizationInput, "now">;
  revocation_checkpoint: RevocationCheckpoint;
  audit_available: true;
  authority_effect: "none";
}

export interface ProviderConfigurationBundle extends ProviderConfigurationBundleInput {
  schema_version: "contentmd.provider-configuration-bundle/0.1.0";
  configuration_digest: string;
}

export type ProviderConfigurationErrorCode =
  | "provider_configuration_invalid"
  | "provider_configuration_digest_invalid"
  | "provider_configuration_reference_mismatch"
  | "provider_configuration_secret_material_present";

export class ProviderConfigurationError extends Error {
  readonly code: ProviderConfigurationErrorCode;

  constructor(code: ProviderConfigurationErrorCode) {
    super(code);
    this.name = "ProviderConfigurationError";
    this.code = code;
  }
}

const FORBIDDEN_SECRET_KEYS = new Set([
  "secret",
  "secret_value",
  "api_key",
  "api_key_value",
  "credential",
  "credential_value",
  "authorization_value",
  "bearer_token",
  "access_token",
]);

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

function assertNoSecretMaterial(value: unknown, seen = new Set<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    const keys = Reflect.ownKeys(value);
    if (keys.some((key) => typeof key !== "string"
      || (key !== "length" && !/^(?:0|[1-9][0-9]*)$/u.test(key)))) {
      throw new ProviderConfigurationError("provider_configuration_invalid");
    }
    for (let index = 0; index < value.length; index += 1) {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        throw new ProviderConfigurationError("provider_configuration_invalid");
      }
      assertNoSecretMaterial(descriptor.value, seen);
    }
    return;
  }
  for (const key of Reflect.ownKeys(value)) {
    if (typeof key !== "string") throw new ProviderConfigurationError("provider_configuration_invalid");
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      throw new ProviderConfigurationError("provider_configuration_invalid");
    }
    if (FORBIDDEN_SECRET_KEYS.has(key)) {
      throw new ProviderConfigurationError("provider_configuration_secret_material_present");
    }
    assertNoSecretMaterial(descriptor.value, seen);
  }
}

function validRecord(record: object, digestField: string): boolean {
  try {
    return providerRecordDigestValid(record as Record<string, unknown>, digestField);
  } catch {
    return false;
  }
}

function sameRef(
  ref: { record_id: string; content_digest: string },
  recordId: string,
  digest: string,
): boolean {
  return ref.record_id === recordId && ref.content_digest === digest;
}

function sorted(values: readonly string[]): string[] {
  return [...values].sort((left, right) =>
    Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")));
}

function validateBundleFields(bundle: ProviderConfigurationBundleInput): void {
  assertNoSecretMaterial(bundle);
  if (typeof bundle.configuration_id !== "string" || bundle.configuration_id.length === 0
    || typeof bundle.adapter_id !== "string" || bundle.adapter_id.length === 0
    || typeof bundle.adapter_version !== "string" || bundle.adapter_version.length === 0
    || bundle.audit_available !== true || bundle.authority_effect !== "none"
    || !validRecord(bundle.model_profile, "profile_digest")
    || !validRecord(bundle.data_handling_profile, "profile_digest")
    || !validRecord(bundle.connection, "connection_digest")
    || !validRecord(bundle.secret_ref, "secret_ref_digest")
    || !validRecord(bundle.header_template, "template_digest")
    || !validRecord(bundle.provider_grant, "grant_digest")) {
    throw new ProviderConfigurationError("provider_configuration_invalid");
  }
  const providerId = bundle.model_profile.provider_id;
  if (bundle.data_handling_profile.provider_id !== providerId
    || bundle.connection.provider_id !== providerId
    || bundle.secret_ref.provider_id !== providerId
    || bundle.header_template.provider_id !== providerId
    || bundle.provider_grant.provider_id !== providerId
    || bundle.header_template.adapter_id !== bundle.adapter_id
    || bundle.header_template.adapter_version !== bundle.adapter_version
    || bundle.provider_grant.adapter_id !== bundle.adapter_id
    || bundle.connection.secret_ref_id !== bundle.secret_ref.secret_ref_id
    || bundle.secret_ref.connection_id !== bundle.connection.connection_id
    || bundle.connection.project_id !== bundle.secret_ref.project_id
    || bundle.connection.project_id !== bundle.data_handling_profile.project_id
    || bundle.connection.account_id !== bundle.secret_ref.account_id
    || !sameRef(
      bundle.model_profile.data_handling_profile_ref,
      bundle.data_handling_profile.profile_id,
      bundle.data_handling_profile.profile_digest,
    )
    || !sameRef(
      bundle.connection.data_handling_profile_ref,
      bundle.data_handling_profile.profile_id,
      bundle.data_handling_profile.profile_digest,
    )
    || !sameRef(
      bundle.connection.header_template_ref,
      bundle.header_template.template_id,
      bundle.header_template.template_digest,
    )
    || !sameRef(
      bundle.provider_grant.model_profile_ref,
      bundle.model_profile.profile_id,
      bundle.model_profile.profile_digest,
    )
    || !sameRef(
      bundle.provider_grant.connection_ref,
      bundle.connection.connection_id,
      bundle.connection.connection_digest,
    )
    || bundle.authorization.capability_grant?.grant_id !== bundle.provider_grant.grant_id
    || bundle.authorization.capability_grant?.principal_ref !== bundle.provider_grant.principal_ref
    || bundle.authorization.capability_grant?.workload_ref !== bundle.provider_grant.workload_ref) {
    throw new ProviderConfigurationError("provider_configuration_reference_mismatch");
  }
}

export function createProviderConfigurationBundle(
  input: ProviderConfigurationBundleInput,
): ProviderConfigurationBundle {
  validateBundleFields(input);
  const preimage = {
    schema_version: "contentmd.provider-configuration-bundle/0.1.0" as const,
    ...structuredClone(input),
  };
  return deepFreeze({
    ...preimage,
    configuration_digest: sha256Canonical(preimage),
  });
}

function verifyProviderConfigurationBundle(value: unknown): ProviderConfigurationBundle {
  assertNoSecretMaterial(value);
  if (value === null || typeof value !== "object") {
    throw new ProviderConfigurationError("provider_configuration_invalid");
  }
  const bundle = value as ProviderConfigurationBundle;
  if (bundle.schema_version !== "contentmd.provider-configuration-bundle/0.1.0"
    || typeof bundle.configuration_digest !== "string") {
    throw new ProviderConfigurationError("provider_configuration_invalid");
  }
  const { configuration_digest: received, ...preimage } = bundle;
  if (received !== sha256Canonical(preimage)) {
    throw new ProviderConfigurationError("provider_configuration_digest_invalid");
  }
  validateBundleFields(bundle);
  return deepFreeze(structuredClone(bundle));
}

export class FilesystemProviderConfigurationResolver implements ProviderConfigurationResolver {
  readonly #storeFactory: (projectRoot: string) => LocalArtifactStore;

  constructor(storeFactory: (projectRoot: string) => LocalArtifactStore =
    (projectRoot) => new FilesystemLocalArtifactStore(projectRoot)) {
    this.#storeFactory = storeFactory;
  }

  async resolve(input: ProviderConfigurationLookup): Promise<ResolvedProviderConfiguration> {
    const bundle = verifyProviderConfigurationBundle(
      await this.#storeFactory(input.project_root).readCanonical(PROVIDER_CONFIGURATION_ARTIFACT),
    );
    const expectedControlRefs = sorted(bundle.authorization.control_dispositions
      .filter((control) => control.applicability === "applicable")
      .map((control) => control.record_ref)
      .filter((ref): ref is string => ref !== null));
    if (input.model_profile_ref !== bundle.model_profile.profile_id
      || input.connection_ref !== bundle.connection.connection_id
      || input.grant_ref !== bundle.provider_grant.grant_id
      || canonicalJson(sorted(input.control_refs)) !== canonicalJson(expectedControlRefs)) {
      throw new ProviderConfigurationError("provider_configuration_reference_mismatch");
    }
    return deepFreeze({
      authorization: structuredClone(bundle.authorization),
      adapter_id: bundle.adapter_id,
      adapter_version: bundle.adapter_version,
      model_profile: structuredClone(bundle.model_profile),
      data_handling_profile: structuredClone(bundle.data_handling_profile),
      connection: structuredClone(bundle.connection),
      secret_ref: structuredClone(bundle.secret_ref),
      header_template: structuredClone(bundle.header_template),
      provider_grant: structuredClone(bundle.provider_grant),
      revocation_checkpoint: structuredClone(bundle.revocation_checkpoint),
      audit_available: bundle.audit_available,
    });
  }
}

export interface LocalProviderConfigurationInspection {
  configured: boolean;
  configuration_id: string | null;
  provider_id: string | null;
  adapter_id: string | null;
  requested_model_id: string | null;
  account_id: string | null;
  project_id: string | null;
  destination_origin: string | null;
  connection_status: string | null;
  grant_status: string | null;
  secret_ref_id: string | null;
  authority_effect: "none";
}

export async function inspectLocalProviderConfiguration(
  projectRoot: string,
): Promise<Readonly<LocalProviderConfigurationInspection>> {
  let raw: unknown;
  try {
    raw = await new FilesystemLocalArtifactStore(projectRoot)
      .readCanonical(PROVIDER_CONFIGURATION_ARTIFACT);
  } catch (error) {
    if (error instanceof LocalArtifactError && error.code === "local_artifact_read_failed") {
      return deepFreeze({
        configured: false,
        configuration_id: null,
        provider_id: null,
        adapter_id: null,
        requested_model_id: null,
        account_id: null,
        project_id: null,
        destination_origin: null,
        connection_status: null,
        grant_status: null,
        secret_ref_id: null,
        authority_effect: "none",
      });
    }
    throw error;
  }
  const bundle = verifyProviderConfigurationBundle(raw);
  return deepFreeze({
    configured: true,
    configuration_id: bundle.configuration_id,
    provider_id: bundle.model_profile.provider_id,
    adapter_id: bundle.adapter_id,
    requested_model_id: bundle.model_profile.requested_model_id,
    account_id: bundle.connection.account_id,
    project_id: bundle.connection.project_id,
    destination_origin: bundle.connection.origin,
    connection_status: bundle.connection.status,
    grant_status: bundle.provider_grant.revocation_state,
    secret_ref_id: bundle.secret_ref.secret_ref_id,
    authority_effect: "none",
  });
}

export interface OpenAIConnectionProposal {
  schema_version: "contentmd.provider-connection-proposal/0.1.0";
  proposal_id: string;
  proposal_digest: string;
  provider_id: "provider.openai";
  adapter_id: "adapter.openai.responses";
  adapter_version: "0.1.0";
  requested_model_id: string;
  destination_origin: "https://api.openai.com";
  endpoint_class: "responses";
  proposed_operations: ["strategy", "draft", "rewrite"];
  provider_application_state: "none";
  required_records: string[];
  project_scope_digest: string;
  connection_effect: "none";
  grant_effect: "none";
  secret_effect: "none";
  network_effect: "none";
  authority_effect: "none";
}

export function proposeOpenAIProviderConfiguration(input: {
  project_root: string;
  requested_model_id: string;
}): Readonly<OpenAIConnectionProposal> {
  if (typeof input.project_root !== "string" || input.project_root.length === 0
    || typeof input.requested_model_id !== "string" || input.requested_model_id.length === 0) {
    throw new ProviderConfigurationError("provider_configuration_invalid");
  }
  const base = {
    schema_version: "contentmd.provider-connection-proposal/0.1.0" as const,
    provider_id: "provider.openai" as const,
    adapter_id: "adapter.openai.responses" as const,
    adapter_version: "0.1.0" as const,
    requested_model_id: input.requested_model_id,
    destination_origin: "https://api.openai.com" as const,
    endpoint_class: "responses" as const,
    proposed_operations: ["strategy", "draft", "rewrite"] as ["strategy", "draft", "rewrite"],
    provider_application_state: "none" as const,
    required_records: [
      "model_profile",
      "provider_data_handling_profile",
      "provider_connection",
      "secret_ref_without_secret_value",
      "request_header_template",
      "provider_capability_grant",
      "four_control_dispositions",
      "current_revocation_checkpoint",
      "verification_plan",
    ],
    project_scope_digest: sha256Canonical({
      contract: "contentmd.provider-connection-proposal-project/0.1.0",
      project_root: input.project_root,
    }),
    connection_effect: "none" as const,
    grant_effect: "none" as const,
    secret_effect: "none" as const,
    network_effect: "none" as const,
    authority_effect: "none" as const,
  };
  const proposalDigest = sha256Canonical(base);
  return deepFreeze({
    ...base,
    proposal_id: `provider-connection-proposal.${proposalDigest.slice(0, 32)}`,
    proposal_digest: proposalDigest,
  });
}

export interface ProviderAuthorizationProposal {
  schema_version: "contentmd.provider-authorization-proposal/0.1.0";
  proposal_id: string;
  proposal_digest: string;
  provider_id: "provider.openai";
  operations: Array<"strategy" | "draft" | "rewrite">;
  requested_action: "model.generate";
  capability_grant_state: "none";
  project_scope_digest: string;
  grant_effect: "none";
  authority_effect: "none";
}

const WRITER_OPERATION_ORDER = ["strategy", "draft", "rewrite"] as const;

export function proposeProviderAuthorization(input: {
  project_root: string;
  provider_id: "openai";
  operations: readonly string[];
}): Readonly<ProviderAuthorizationProposal> {
  if (typeof input.project_root !== "string" || input.project_root.length === 0
    || input.provider_id !== "openai" || !Array.isArray(input.operations)
    || input.operations.length === 0 || new Set(input.operations).size !== input.operations.length
    || input.operations.some((operation) => !WRITER_OPERATION_ORDER.includes(
      operation as (typeof WRITER_OPERATION_ORDER)[number],
    ))) {
    throw new ProviderConfigurationError("provider_configuration_invalid");
  }
  const operations = WRITER_OPERATION_ORDER.filter((operation) => input.operations.includes(operation));
  const base = {
    schema_version: "contentmd.provider-authorization-proposal/0.1.0" as const,
    provider_id: "provider.openai" as const,
    operations: [...operations],
    requested_action: "model.generate" as const,
    capability_grant_state: "none" as const,
    project_scope_digest: sha256Canonical({
      contract: "contentmd.provider-authorization-project-scope/0.1.0",
      project_root: input.project_root,
    }),
    grant_effect: "none" as const,
    authority_effect: "none" as const,
  };
  const proposalDigest = sha256Canonical(base);
  return deepFreeze({
    ...base,
    proposal_id: `provider-authorization-proposal.${proposalDigest.slice(0, 32)}`,
    proposal_digest: proposalDigest,
  });
}
