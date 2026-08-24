import { Ajv2020, type ErrorObject } from "ajv/dist/2020.js";
import humanCalibrationArtifactsSchema from "./human-calibration-artifacts.schema.json" with { type: "json" };

export interface HumanCalibrationArtifactValidation {
  valid: boolean;
  errors: string[];
}

const ajv = new Ajv2020({ allErrors: true, strict: true, strictTypes: false });
const validator = ajv.compile(humanCalibrationArtifactsSchema);

function formatError(error: ErrorObject): string {
  const path = error.instancePath.length > 0 ? error.instancePath : "/";
  return `${path} ${error.message ?? "is invalid"}`;
}

export function validateHumanCalibrationArtifact(
  value: unknown,
): HumanCalibrationArtifactValidation {
  const valid = validator(value);
  return {
    valid,
    errors: valid ? [] : (validator.errors ?? []).map(formatError),
  };
}

export const humanCalibrationArtifactsSchemaDocument = humanCalibrationArtifactsSchema;
