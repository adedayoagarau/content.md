import { sha256Canonical, type JsonValue } from "./canonical-json.js";
import {
  createContentGraph,
  type ContentGraph,
  type ContentGraphEdge,
  type ContentGraphNode,
  type ContentGraphNodeType,
} from "./content-graph.js";
import {
  createExpressionSlotId,
  createExpressionVersionId,
  createSemanticMessageId,
  type ExpressionSlotIdentity,
  type SemanticMessageIdentity,
} from "./message-identity.js";

export interface ContextSourceDocument {
  source_id: string;
  source_type: string;
  locator: string;
  content_digest: string;
  content: string;
}

export interface ContextOccurrenceInput {
  occurrence_id: string;
  source_artifact: string;
  line: number;
  column: number;
  syntax_kind: string;
  expression_payload: string;
  locale: string;
  channel: string;
  modality: string;
  component: string | null;
  route: string | null;
  semantic_context: string;
}

export interface ContextCompilerInput {
  project_id: string;
  sources: ContextSourceDocument[];
  discovery: {
    scan_digest: string;
    occurrences: ContextOccurrenceInput[];
  };
}

interface MessageContext {
  journey: string;
  stage: string;
  state: string;
  user_job: string;
  purpose: string;
  subject: string;
  intended_outcome: string;
  surface: string;
  slot: string;
}

function graphNodeId(nodeType: ContentGraphNodeType, key: string): string {
  return `${nodeType}.${sha256Canonical({ node_type: nodeType, key }).slice(0, 32)}`;
}

function firstHeading(content: string): string | null {
  const match = /^#\s+(.+?)\s*$/mu.exec(content);
  return match?.[1]?.trim() ?? null;
}

function primaryAudience(content: string): string | null {
  const match = /\bprimary user is\s+([^\.\n]+)/iu.exec(content);
  return match?.[1]?.trim().replace(/^(?:a|an|the)\s+/iu, "") ?? null;
}

function primaryJob(content: string): string | null {
  const match = /\bmerchant teams\s+([^\.\n]+)/iu.exec(content);
  return match?.[1]?.trim() ?? null;
}

function contextForOccurrence(occurrence: ContextOccurrenceInput): MessageContext {
  const searchable = `${occurrence.expression_payload} ${occurrence.semantic_context}`.toLowerCase();
  if (occurrence.route !== null) {
    return {
      journey: occurrence.route.includes("checkout") ? "checkout" : "workspace_management",
      stage: "navigation",
      state: "destination_available",
      user_job: "navigate_product",
      purpose: "navigate",
      subject: occurrence.route,
      intended_outcome: "reach_destination",
      surface: `route:${occurrence.route}`,
      slot: "navigation_label",
    };
  }
  if (searchable.includes("payment failed") || searchable.includes("unknownoutcome")) {
    return {
      journey: "checkout",
      stage: "post_submission",
      state: "payment_outcome_unknown",
      user_job: "resolve_payment_state",
      purpose: "check_payment_status",
      subject: "payment_attempt",
      intended_outcome: "avoid_duplicate_payment",
      surface: occurrence.component ?? "payment_status",
      slot: "status_message",
    };
  }
  if (searchable.includes("delete workspace")) {
    return {
      journey: "workspace_management",
      stage: "decision",
      state: "workspace_deletion_available",
      user_job: "manage_workspace",
      purpose: "delete_workspace",
      subject: "workspace",
      intended_outcome: "remove_local_workspace",
      surface: occurrence.component ?? "workspace_settings",
      slot: "destructive_action",
    };
  }
  const isCheckout = /\b(checkout|cart|bag|basket|order|payment)\b/u.test(searchable);
  const isCatalogMessage = occurrence.semantic_context.startsWith("message_key:");
  const propertyContext = isCatalogMessage
    ? occurrence.semantic_context
    : `${occurrence.component ?? occurrence.source_artifact}:${occurrence.semantic_context}`;
  return {
    journey: isCheckout ? "checkout" : "product_use",
    stage: isCheckout ? "review" : "interaction",
    state: "content_available",
    user_job: isCheckout ? "review_checkout" : "use_product",
    purpose: propertyContext,
    subject: isCatalogMessage ? occurrence.semantic_context : occurrence.component ?? occurrence.route ?? occurrence.source_artifact,
    intended_outcome: "understand_or_act",
    surface: isCatalogMessage ? "message_catalog" : occurrence.component ?? occurrence.source_artifact,
    slot: occurrence.semantic_context,
  };
}

function node(
  nodeType: ContentGraphNodeType,
  key: string,
  label: string,
  evidenceRefs: string[],
  attributes: Record<string, JsonValue> = {},
): ContentGraphNode {
  return {
    node_id: graphNodeId(nodeType, key),
    node_type: nodeType,
    label,
    lifecycle_state: "proposed",
    authority_effect: "none",
    evidence_refs: [...new Set(evidenceRefs)].sort(),
    attributes,
  };
}

export function compileContentContext(input: ContextCompilerInput): ContentGraph {
  if (input.project_id.trim().length === 0) throw new TypeError("project_id must be nonempty");
  const nodes = new Map<string, ContentGraphNode>();
  const edges = new Map<string, Omit<ContentGraphEdge, "edge_id">>();

  const putNode = (next: ContentGraphNode): ContentGraphNode => {
    const current = nodes.get(next.node_id);
    if (current === undefined) {
      nodes.set(next.node_id, next);
      return next;
    }
    const merged = {
      ...current,
      evidence_refs: [...new Set([...current.evidence_refs, ...next.evidence_refs])].sort(),
    };
    nodes.set(next.node_id, merged);
    return merged;
  };
  const putEdge = (from: ContentGraphNode, relation: string, to: ContentGraphNode): void => {
    const edge = { from_node_id: from.node_id, relation, to_node_id: to.node_id };
    edges.set(sha256Canonical(edge), edge);
  };

  const sortedSources = [...input.sources].sort((left, right) => left.locator.localeCompare(right.locator));
  const productSource = sortedSources.find((source) => source.source_type === "product_document") ?? sortedSources[0];
  const productLabel = productSource === undefined ? input.project_id : firstHeading(productSource.content) ?? input.project_id;
  const product = putNode(node("product", input.project_id, productLabel, productSource === undefined ? [] : [productSource.source_id], {
    project_id: input.project_id,
    source_status: productSource === undefined ? "not_established" : "source_present_not_approved",
  }));

  const sourceText = sortedSources.map((source) => source.content).join("\n");
  const audienceLabel = primaryAudience(sourceText) ?? "primary audience not established";
  const audience = putNode(node("audience", audienceLabel, audienceLabel, sortedSources.map((source) => source.source_id), {
    establishment: primaryAudience(sourceText) === null ? "open_question" : "documented_proposal",
  }));
  putEdge(product, "has_audience", audience);

  const jobLabel = primaryJob(sourceText) ?? "primary user job not established";
  const job = putNode(node("job", jobLabel, jobLabel, sortedSources.map((source) => source.source_id), {
    establishment: primaryJob(sourceText) === null ? "open_question" : "documented_proposal",
  }));
  putEdge(audience, "performs", job);

  for (const occurrence of [...input.discovery.occurrences].sort((left, right) => left.occurrence_id.localeCompare(right.occurrence_id))) {
    const context = contextForOccurrence(occurrence);
    const evidence = [occurrence.occurrence_id];
    const journey = putNode(node("journey", context.journey, context.journey, evidence));
    const stage = putNode(node("stage", `${context.journey}:${context.stage}`, context.stage, evidence, { journey: context.journey }));
    const state = putNode(node("state", `${context.journey}:${context.stage}:${context.state}`, context.state, evidence, {
      journey: context.journey,
      stage: context.stage,
    }));
    putEdge(product, "has_journey", journey);
    putEdge(journey, "has_stage", stage);
    putEdge(stage, "has_state", state);

    if (occurrence.route !== null) {
      const route = putNode(node("route", occurrence.route, occurrence.route, evidence, { path: occurrence.route }));
      const iaNode = putNode(node("ia_node", occurrence.route, occurrence.route, evidence, { destination: occurrence.route }));
      const relation = putNode(node(
        "navigation_relation",
        `${occurrence.expression_payload}:${occurrence.route}`,
        `${occurrence.expression_payload} → ${occurrence.route}`,
        evidence,
        { label: occurrence.expression_payload, destination: occurrence.route },
      ));
      putEdge(product, "exposes_route", route);
      putEdge(route, "resolves_to", iaNode);
      putEdge(relation, "labels", iaNode);
    }

    const messageIdentity: SemanticMessageIdentity = {
      project_id: input.project_id,
      journey: context.journey,
      stage: context.stage,
      state: context.state,
      user_job: context.user_job,
      purpose: context.purpose,
      subject: context.subject,
      intended_outcome: context.intended_outcome,
    };
    const messageId = createSemanticMessageId(messageIdentity);
    const message = putNode({
      ...node("semantic_message", messageId, context.purpose, evidence, { ...messageIdentity }),
      node_id: messageId,
    });
    putEdge(state, "requires_message", message);

    const slotIdentity: ExpressionSlotIdentity = {
      semantic_message_id: messageId,
      locale: occurrence.locale,
      channel: occurrence.channel,
      modality: occurrence.modality,
      surface: context.surface,
      slot: context.slot,
      state: context.state,
    };
    const slotId = createExpressionSlotId(slotIdentity);
    const slot = putNode({
      ...node("expression_slot", slotId, `${context.surface}:${context.slot}`, evidence, { ...slotIdentity }),
      node_id: slotId,
    });
    const sourceDigest = sha256Canonical({
      source_artifact: occurrence.source_artifact,
      line: occurrence.line,
      column: occurrence.column,
      expression_payload: occurrence.expression_payload,
    });
    const versionId = createExpressionVersionId({
      expression_slot_id: slotId,
      expression_payload: occurrence.expression_payload,
      source_digest: sourceDigest,
    });
    const version = putNode({
      ...node("expression_version", versionId, occurrence.expression_payload, evidence, {
        expression_slot_id: slotId,
        expression_payload: occurrence.expression_payload,
        source_digest: sourceDigest,
      }),
      node_id: versionId,
    });
    const implementation = putNode({
      ...node("implementation_occurrence", occurrence.occurrence_id, occurrence.expression_payload, evidence, {
        source_artifact: occurrence.source_artifact,
        line: occurrence.line,
        column: occurrence.column,
        syntax_kind: occurrence.syntax_kind,
      }),
      node_id: occurrence.occurrence_id,
    });
    putEdge(message, "has_expression_slot", slot);
    putEdge(slot, "has_version", version);
    putEdge(version, "implemented_at", implementation);
  }

  const openQuestions = [
    {
      key: "content_change_approver",
      label: "Who can approve content changes?",
      reason: "No authenticated approval record was supplied.",
    },
    {
      key: "observed_live_strings",
      label: "Which discovered strings are observed in a live product?",
      reason: "Source presence establishes implementation candidates, not observed runtime behavior.",
    },
    {
      key: "publication_authority",
      label: "Who can authorize external publication?",
      reason: "No publication grant was supplied.",
    },
  ];
  for (const question of openQuestions) {
    const questionNode = putNode(node("open_question", question.key, question.label, [], {
      reason: question.reason,
      status: "open",
    }));
    putEdge(product, "has_open_question", questionNode);
  }

  const sourceDigest = sha256Canonical({
    sources: sortedSources.map((source) => ({
      source_id: source.source_id,
      locator: source.locator,
      content_digest: source.content_digest,
    })),
    scan_digest: input.discovery.scan_digest,
  });
  return createContentGraph({
    project_id: input.project_id,
    source_digest: sourceDigest,
    nodes: [...nodes.values()],
    edges: [...edges.values()],
  });
}
