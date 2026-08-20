import { assertRecordId } from "./identity.js";
import { sha256Canonical } from "./canonical-json.js";

export type LifecycleState =
  | "proposed"
  | "approved"
  | "active"
  | "superseded"
  | "retired"
  | "rejected";

export type MemoryScope = "task" | "personal" | "project" | "organization" | "public";

export interface RecordScope {
  memory_scope: MemoryScope;
  project_id: string | null;
  resource_refs: string[];
  data_classes: string[];
}

export interface ProvenanceRef {
  record_id: string;
  relationship: string;
  content_digest: string;
}

export interface DurableRecordInput<TPayload> {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  record_version: number;
  scope: RecordScope;
  provenance: ProvenanceRef[];
  lifecycle_state: LifecycleState;
  payload: TPayload;
}

export interface DurableRecord<TPayload> extends DurableRecordInput<TPayload> {
  content_digest: string;
}

export type DigestVerification =
  | { valid: true }
  | { valid: false; reason: "content_digest_mismatch" | "content_digest_malformed" };

export function finalizeRecord<TPayload>(
  input: DurableRecordInput<TPayload>,
): DurableRecord<TPayload> {
  assertRecordId(input.record_id);
  const contentDigest = sha256Canonical(input);
  return { ...input, content_digest: contentDigest };
}

export function verifyRecordDigest<TPayload>(record: DurableRecord<TPayload>): DigestVerification {
  if (!/^[a-f0-9]{64}$/.test(record.content_digest)) {
    return { valid: false, reason: "content_digest_malformed" };
  }
  const { content_digest: receivedDigest, ...preimage } = record;
  const expectedDigest = sha256Canonical(preimage);
  return receivedDigest === expectedDigest
    ? { valid: true }
    : { valid: false, reason: "content_digest_mismatch" };
}
