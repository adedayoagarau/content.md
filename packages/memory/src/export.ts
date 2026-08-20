import { canonicalJson } from "@contentmd/core";
import type { StoredEvent } from "./event-store.js";

interface EventExportDocument {
  schema_version: "0.1.0";
  events: StoredEvent[];
}

export function encodeEventExport(events: readonly StoredEvent[]): Uint8Array {
  const document: EventExportDocument = {
    schema_version: "0.1.0",
    events: [...events],
  };
  return new TextEncoder().encode(canonicalJson(document));
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
    !Array.isArray(parsed.events)
  ) {
    throw new TypeError("invalid_event_export");
  }
  if (canonicalJson(parsed) !== text) {
    throw new TypeError("noncanonical_event_export");
  }
  return parsed as unknown as EventExportDocument;
}
