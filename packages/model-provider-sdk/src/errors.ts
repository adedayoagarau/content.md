export type ModelProviderContractErrorCode =
  | "invalid_model_request"
  | "model_output_invalid"
  | "model_schema_not_projectable"
  | "unknown_model_output_schema";

export class ModelProviderContractError extends Error {
  readonly code: ModelProviderContractErrorCode;
  readonly details: readonly string[];

  constructor(
    code: ModelProviderContractErrorCode,
    detail: string,
    details: readonly string[] = [],
  ) {
    super(`${code}:${detail}`);
    this.name = "ModelProviderContractError";
    this.code = code;
    this.details = Object.freeze([...details]);
  }
}
