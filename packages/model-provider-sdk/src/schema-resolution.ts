import { sha256Canonical } from "@contentmd/core";
import {
  ModelOutputSchemaError,
  resolveModelOutputSchema,
  type ModelOutputSchemaId,
  type ProviderModelOutputSchemaProjection,
} from "@contentmd/schemas";
import { ModelProviderContractError } from "./errors.js";

export type { ModelOutputSchemaId } from "@contentmd/schemas";

export interface ResolvedRequestOutputSchema {
  schema_id: ModelOutputSchemaId;
  schema_version: "0.1.0";
  schema_digest: string;
  maximum_output_bytes: number;
  provider_projection: ProviderModelOutputSchemaProjection;
}

export interface CanonicalModelOutput {
  output_schema_id: ModelOutputSchemaId;
  output_schema_digest: string;
  canonical_output: string;
  canonical_output_bytes: string;
  canonical_output_digest: string;
}

function mapSchemaError(error: unknown): never {
  if (error instanceof ModelOutputSchemaError) {
    const code = error.code === "model_schema_not_projectable"
      ? "model_schema_not_projectable"
      : error.code === "unknown_model_output_schema"
        ? "unknown_model_output_schema"
        : "model_output_invalid";
    throw new ModelProviderContractError(
      code,
      error.message,
      error.findings.map((finding) =>
        `${finding.instance_path || "/"} ${finding.keyword}: ${finding.message}`),
    );
  }
  throw error;
}

export function resolveRequestOutputSchema(
  schemaId: ModelOutputSchemaId,
): ResolvedRequestOutputSchema {
  try {
    const definition = resolveModelOutputSchema(schemaId);
    if (definition.projection_compatibility.status !== "compatible") {
      throw new ModelProviderContractError(
        "model_schema_not_projectable",
        schemaId,
      );
    }
    return Object.freeze({
      schema_id: definition.schema_id,
      schema_version: definition.schema_version,
      schema_digest: definition.schema_digest,
      maximum_output_bytes: definition.maximum_output_bytes,
      provider_projection: definition.provider_projection,
    });
  } catch (error) {
    return mapSchemaError(error);
  }
}

export function canonicalizeModelOutput(
  schemaId: ModelOutputSchemaId,
  value: unknown,
): CanonicalModelOutput {
  try {
    const definition = resolveModelOutputSchema(schemaId);
    const bytes = definition.canonicalize(value);
    return Object.freeze({
      output_schema_id: schemaId,
      output_schema_digest: definition.schema_digest,
      canonical_output: bytes,
      canonical_output_bytes: bytes,
      canonical_output_digest: sha256Canonical(value),
    });
  } catch (error) {
    return mapSchemaError(error);
  }
}
