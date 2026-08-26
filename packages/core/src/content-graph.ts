import { canonicalJson, sha256Canonical, type JsonValue } from "./canonical-json.js";

export type ContentGraphNodeType =
  | "product"
  | "audience"
  | "job"
  | "journey"
  | "stage"
  | "state"
  | "route"
  | "ia_node"
  | "navigation_relation"
  | "semantic_message"
  | "expression_slot"
  | "expression_version"
  | "implementation_occurrence"
  | "evidence_claim"
  | "authority_assessment"
  | "conflict"
  | "persona"
  | "voice_dimension"
  | "coverage_gap"
  | "open_question";

export interface ContentGraphNode {
  node_id: string;
  node_type: ContentGraphNodeType;
  label: string;
  lifecycle_state: "proposed";
  authority_effect: "none";
  evidence_refs: string[];
  attributes: Record<string, JsonValue>;
}

export interface ContentGraphEdge {
  edge_id: string;
  from_node_id: string;
  relation: string;
  to_node_id: string;
}

export interface ContentGraph {
  schema_version: "contentmd.content-graph/0.1.0";
  project_id: string;
  source_digest: string;
  nodes: ContentGraphNode[];
  edges: ContentGraphEdge[];
  graph_digest: string;
}

function compareNodes(left: ContentGraphNode, right: ContentGraphNode): number {
  return left.node_type.localeCompare(right.node_type) || left.node_id.localeCompare(right.node_id);
}

function compareEdges(left: ContentGraphEdge, right: ContentGraphEdge): number {
  return left.from_node_id.localeCompare(right.from_node_id) ||
    left.relation.localeCompare(right.relation) ||
    left.to_node_id.localeCompare(right.to_node_id);
}

export function createContentGraph(input: {
  project_id: string;
  source_digest: string;
  nodes: ContentGraphNode[];
  edges: Omit<ContentGraphEdge, "edge_id">[];
}): ContentGraph {
  const nodes = [...input.nodes].sort(compareNodes);
  const nodeIds = new Set<string>();
  for (const node of nodes) {
    if (nodeIds.has(node.node_id)) throw new Error(`duplicate_graph_node:${node.node_id}`);
    nodeIds.add(node.node_id);
  }

  const edges = input.edges.map((edge) => {
    if (!nodeIds.has(edge.from_node_id) || !nodeIds.has(edge.to_node_id)) {
      throw new Error(`dangling_graph_edge:${edge.from_node_id}:${edge.to_node_id}`);
    }
    return {
      ...edge,
      edge_id: `edge.${sha256Canonical(edge).slice(0, 32)}`,
    };
  }).sort(compareEdges);
  const edgeIds = new Set<string>();
  for (const edge of edges) {
    if (edgeIds.has(edge.edge_id)) throw new Error(`duplicate_graph_edge:${edge.edge_id}`);
    edgeIds.add(edge.edge_id);
  }

  const preimage = {
    schema_version: "contentmd.content-graph/0.1.0" as const,
    project_id: input.project_id,
    source_digest: input.source_digest,
    nodes,
    edges,
  };
  return { ...preimage, graph_digest: sha256Canonical(preimage) };
}

export function contentGraphBytes(graph: ContentGraph): string {
  return canonicalJson(graph);
}
