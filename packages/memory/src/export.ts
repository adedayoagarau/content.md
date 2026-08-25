import { canonicalJson, sha256Canonical } from "@contentmd/core";
import type { StoredEvent } from "./event-store.js";

interface EventExportDocument {
  schema_version: "0.1.0";
  events: readonly StoredEvent[];
  document_digest: string;
}

export function encodeEventExport(events: readonly StoredEvent[]): Uint8Array {
  const preimage = {
    schema_version: "0.1.0",
    events: [...events],
  } as const;
  const document: EventExportDocument = {
    ...preimage,
    document_digest: sha256Canonical(preimage),
  };
  return new TextEncoder().encode(canonicalJson(document));
}

function verifyEvent(event: StoredEvent): void {
  canonicalJson(event.payload);
  if (event.payload_digest !== sha256Canonical(event.payload)) {
    throw new Error(`event_export_integrity_failure:${event.event_id}:payload_digest`);
  }
  const preimage = {
    event_id: event.event_id,
    stream_id: event.stream_id,
    sequence: event.sequence,
    schema_version: event.schema_version,
    event_type: event.event_type,
    occurred_at: event.occurred_at,
    actor_ref: event.actor_ref,
    data_class: event.data_class,
    payload: event.payload,
    predecessor_digest: event.predecessor_digest,
  };
  if (event.event_digest !== sha256Canonical(preimage)) {
    throw new Error(`event_export_integrity_failure:${event.event_id}:event_digest`);
  }
}

export function decodeEventExport(bytes: Uint8Array): EventExportDocument {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  const parsed: unknown = JSON.parse(text);
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("schema_version" in parsed) ||
    parsed.schema_version !== "0.1.0" ||
    !("events" in parsed) ||
    !Array.isArray(parsed.events) ||
    !("document_digest" in parsed) ||
    typeof parsed.document_digest !== "string"
  ) {
    throw new TypeError("invalid_event_export");
  }
  if (canonicalJson(parsed) !== text) {
    throw new TypeError("noncanonical_event_export");
  }
  const document = parsed as unknown as EventExportDocument;
  if (document.document_digest !== sha256Canonical({
    schema_version: document.schema_version,
    events: document.events,
  })) {
    throw new Error("event_export_integrity_failure:document_digest");
  }
  const heads = new Map<string, { sequence: number; event_digest: string }>();
  for (const event of document.events) {
    verifyEvent(event);
    const head = heads.get(event.stream_id);
    if (event.sequence !== (head?.sequence ?? 0) + 1
      || event.predecessor_digest !== (head?.event_digest ?? null)) {
      throw new Error(`event_export_integrity_failure:${event.event_id}:predecessor`);
    }
    heads.set(event.stream_id, {
      sequence: event.sequence,
      event_digest: event.event_digest,
    });
  }
  return document;
}
