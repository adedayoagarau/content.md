import { canonicalJson } from "./canonical-json.js";
import { verifyRecordDigest, type DurableRecord } from "./records.js";

export interface RecordGraphRef {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}

export interface RecordGraphEdge<TRelationship extends string = string> {
  from_ref: RecordGraphRef;
  relationship: TRelationship;
  to_ref: RecordGraphRef;
}

export interface CompiledRecordGraph<TRelationship extends string = string> {
  node_refs: RecordGraphRef[];
  edges: RecordGraphEdge<TRelationship>[];
}

function compareCanonical(left: unknown, right: unknown): number {
  const leftBytes = canonicalJson(left);
  const rightBytes = canonicalJson(right);
  return leftBytes < rightBytes ? -1 : leftBytes > rightBytes ? 1 : 0;
}

function refFor(record: DurableRecord<unknown>): RecordGraphRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function copyRef(ref: RecordGraphRef): RecordGraphRef {
  return {
    record_id: ref.record_id,
    schema_id: ref.schema_id,
    schema_version: ref.schema_version,
    content_digest: ref.content_digest,
  };
}

function exactRef(left: RecordGraphRef, right: RecordGraphRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

export function compileRecordGraph<TRelationship extends string>(input: {
  nodes: readonly DurableRecord<unknown>[];
  edges: readonly RecordGraphEdge<TRelationship>[];
  acyclic_relationships?: "all" | readonly TRelationship[];
}): CompiledRecordGraph<TRelationship> {
  const recordsById = new Map<string, DurableRecord<unknown>>();
  for (const record of input.nodes) {
    if (recordsById.has(record.record_id)) {
      throw new TypeError(`duplicate_record_graph_node:${record.record_id}`);
    }
    if (!verifyRecordDigest(record).valid) {
      throw new TypeError(`invalid_record_graph_node_digest:${record.record_id}`);
    }
    recordsById.set(record.record_id, record);
  }

  const edges = input.edges.map((edge) => {
    const from = recordsById.get(edge.from_ref.record_id);
    const to = recordsById.get(edge.to_ref.record_id);
    if (from === undefined || to === undefined
      || !exactRef(refFor(from), edge.from_ref)
      || !exactRef(refFor(to), edge.to_ref)) {
      throw new TypeError(
        `dangling_record_graph_edge:${edge.from_ref.record_id}:${edge.to_ref.record_id}`,
      );
    }
    return {
      from_ref: copyRef(edge.from_ref),
      relationship: edge.relationship,
      to_ref: copyRef(edge.to_ref),
    };
  }).sort(compareCanonical);

  for (let index = 1; index < edges.length; index += 1) {
    if (compareCanonical(edges[index - 1], edges[index]) === 0) {
      throw new TypeError(
        `duplicate_record_graph_edge:${edges[index]!.from_ref.record_id}:${edges[index]!.relationship}:${edges[index]!.to_ref.record_id}`,
      );
    }
  }

  const acyclic = input.acyclic_relationships ?? "all";
  const acyclicRelationships = acyclic === "all" ? null : new Set(acyclic);
  const adjacency = new Map<string, string[]>();
  for (const recordId of recordsById.keys()) adjacency.set(recordId, []);
  for (const edge of edges) {
    if (acyclicRelationships === null || acyclicRelationships.has(edge.relationship)) {
      adjacency.get(edge.from_ref.record_id)!.push(edge.to_ref.record_id);
    }
  }

  const state = new Map<string, "visiting" | "visited">();
  const visit = (recordId: string): void => {
    if (state.get(recordId) === "visiting") {
      throw new TypeError(`cyclic_record_graph_dependency:${recordId}`);
    }
    if (state.get(recordId) === "visited") return;
    state.set(recordId, "visiting");
    for (const target of adjacency.get(recordId) ?? []) visit(target);
    state.set(recordId, "visited");
  };
  for (const recordId of [...recordsById.keys()].sort()) visit(recordId);

  return {
    node_refs: [...recordsById.values()].map(refFor).sort(compareCanonical),
    edges,
  };
}
