import { sha256Canonical } from "./canonical-json.js";

export interface SemanticMessageIdentity {
  project_id: string;
  journey: string;
  stage: string;
  state: string;
  user_job: string;
  purpose: string;
  subject: string;
  intended_outcome: string;
}

export interface ExpressionSlotIdentity {
  semantic_message_id: string;
  locale: string;
  channel: string;
  modality: string;
  surface: string;
  slot: string;
  state: string;
}

export interface ExpressionVersionIdentity {
  expression_slot_id: string;
  expression_payload: string;
  source_digest: string;
}

function assertIdentityFields(identity: object, name: string): void {
  for (const [field, value] of Object.entries(identity)) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError(`${name}.${field} must be nonempty`);
    }
  }
}

function identityId(prefix: string, identity: object): string {
  assertIdentityFields(identity, prefix);
  return `${prefix}.${sha256Canonical(identity).slice(0, 32)}`;
}

export function createSemanticMessageId(identity: SemanticMessageIdentity): string {
  return identityId("message", identity);
}

export function createExpressionSlotId(identity: ExpressionSlotIdentity): string {
  return identityId("expression_slot", identity);
}

export function createExpressionVersionId(identity: ExpressionVersionIdentity): string {
  return identityId("expression_version", identity);
}
