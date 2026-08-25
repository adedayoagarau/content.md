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
import type { AuthorityAssessment, ClaimKind, EvidenceClaim } from "./evidence-claims.js";

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
  claims: EvidenceClaim[];
  authority_assessments: AuthorityAssessment[];
  proposed_guidance?: {
    record_digest: string;
    proposed_claims: Array<{
      proposal_id: string;
      claim_kind: ClaimKind;
      value: JsonValue;
      citations: Array<{ source_ref: string }>;
      confidence: "high" | "medium" | "low";
      decision_status: "proposed";
      authority_effect: "none";
    }>;
  };
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

function claimLabel(claim: EvidenceClaim): string {
  if (typeof claim.value === "string") return claim.value;
  if (Array.isArray(claim.value) && claim.value.every((item) => typeof item === "string")) {
    return claim.value.join(" → ");
  }
  return JSON.stringify(claim.value);
}

function selectedClaims(
  claims: EvidenceClaim[],
  assessments: AuthorityAssessment[],
): EvidenceClaim[] {
  const byId = new Map(claims.map((claim) => [claim.claim_id, claim]));
  return assessments.flatMap((assessment) => {
    if (assessment.selected_claim_ref === null) return [];
    const claim = byId.get(assessment.selected_claim_ref);
    return claim === undefined ? [] : [claim];
  });
}

function selectedClaim(
  claims: EvidenceClaim[],
  kind: ClaimKind,
  subject?: RegExp,
): EvidenceClaim | null {
  return claims.find((claim) => claim.claim_kind === kind && (subject === undefined || subject.test(claim.subject))) ?? null;
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
  const orderedClaims = [...input.claims].sort((left, right) => left.claim_id.localeCompare(right.claim_id, "en"));
  const orderedAssessments = [...input.authority_assessments]
    .sort((left, right) => left.assessment_id.localeCompare(right.assessment_id, "en"));
  const selected = selectedClaims(orderedClaims, orderedAssessments);
  const productClaim = selectedClaim(selected, "product_identity", /^product name$/iu) ??
    selectedClaim(selected, "product_identity");
  const audienceClaim = selectedClaim(selected, "audience_job", /audience|primary user/iu);
  const jobClaim = selectedClaim(selected, "audience_job", /job|users and jobs/iu);
  const workflowClaim = selectedClaim(selected, "workflow_stage");
  const product = putNode(node(
    "product",
    input.project_id,
    productClaim === null ? input.project_id : claimLabel(productClaim),
    productClaim === null ? [] : [productClaim.claim_id, productClaim.source_ref],
    {
      project_id: input.project_id,
      source_status: productClaim === null ? "not_established" : "selected_provisional_claim",
    },
  ));

  const audience = audienceClaim === null ? null : putNode(node(
    "audience", audienceClaim.claim_id, claimLabel(audienceClaim),
    [audienceClaim.claim_id, audienceClaim.source_ref],
    { establishment: "selected_provisional_claim" },
  ));
  if (audience !== null) putEdge(product, "has_audience", audience);

  const job = jobClaim === null ? null : putNode(node(
    "job", jobClaim.claim_id, claimLabel(jobClaim),
    [jobClaim.claim_id, jobClaim.source_ref],
    { establishment: "selected_provisional_claim" },
  ));
  if (job !== null) putEdge(audience ?? product, audience === null ? "has_job" : "performs", job);

  if (workflowClaim !== null) {
    const stages = Array.isArray(workflowClaim.value)
      ? workflowClaim.value.filter((item): item is string => typeof item === "string")
      : [];
    const journey = putNode(node(
      "journey", workflowClaim.claim_id, claimLabel(workflowClaim),
      [workflowClaim.claim_id, workflowClaim.source_ref],
      { establishment: "selected_provisional_claim" },
    ));
    putEdge(product, "has_journey", journey);
    stages.forEach((stageLabel, index) => {
      const stage = putNode(node(
        "stage", `${workflowClaim.claim_id}:${index}`, stageLabel,
        [workflowClaim.claim_id, workflowClaim.source_ref],
        { journey: journey.label, order: index + 1 },
      ));
      putEdge(journey, "has_stage", stage);
    });
  }

  for (const claim of orderedClaims) {
    const claimNode = putNode({
      ...node("evidence_claim", claim.claim_id, claimLabel(claim), [claim.claim_id, claim.source_ref], {
        claim_kind: claim.claim_kind,
        subject: claim.subject,
        evidence_class: claim.evidence_class,
        lifecycle: claim.lifecycle,
        value: claim.value,
        scope: claim.scope,
      }),
      node_id: claim.claim_id,
    });
    putEdge(product, "has_evidence_claim", claimNode);
    if (claim.claim_kind === "voice_guidance") {
      const voice = putNode(node(
        "voice_dimension", claim.claim_id, claimLabel(claim), [claim.claim_id, claim.source_ref],
        { subject: claim.subject, selection_status: selected.includes(claim) ? "selected" : "candidate" },
      ));
      putEdge(product, "has_voice_dimension", voice);
    }
  }

  for (const assessment of orderedAssessments) {
    const references = [
      ...(assessment.selected_claim_ref === null ? [] : [assessment.selected_claim_ref]),
      ...assessment.supporting_claim_refs,
      ...assessment.conflicting_claim_refs,
    ];
    const assessmentNode = putNode({
      ...node("authority_assessment", assessment.assessment_id, `${assessment.claim_kind}: ${assessment.subject}`, references, {
        selected_claim_ref: assessment.selected_claim_ref,
        supporting_claim_refs: assessment.supporting_claim_refs,
        conflicting_claim_refs: assessment.conflicting_claim_refs,
        superseded_claim_refs: assessment.superseded_claim_refs,
        resolution: assessment.resolution,
      }),
      node_id: assessment.assessment_id,
    });
    putEdge(product, "has_authority_assessment", assessmentNode);
    if (assessment.conflicting_claim_refs.length > 0) {
      const conflict = putNode(node(
        "conflict", assessment.assessment_id, `${assessment.claim_kind}: ${assessment.subject}`,
        references,
        {
          status: assessment.selected_claim_ref === null ? "unresolved" : "resolved_provisionally",
          selected_claim_ref: assessment.selected_claim_ref,
          conflicting_claim_refs: assessment.conflicting_claim_refs,
        },
      ));
      putEdge(assessmentNode, "records_conflict", conflict);
    }
  }

  for (const proposal of input.proposed_guidance?.proposed_claims ?? []) {
    const proposalNode = putNode({
      ...node(
        "evidence_claim",
        proposal.proposal_id,
        typeof proposal.value === "string" ? proposal.value : JSON.stringify(proposal.value),
        proposal.citations.map((citation) => citation.source_ref),
        {
          claim_kind: proposal.claim_kind,
          value: proposal.value,
          confidence: proposal.confidence,
          decision_status: "proposed",
          interpretation_record_digest: input.proposed_guidance?.record_digest ?? "",
        },
      ),
      node_id: proposal.proposal_id,
    });
    putEdge(product, "has_proposed_guidance", proposalNode);
  }

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

  const missingClaims = [
    { key: "product_identity", missing: productClaim === null, label: "What is the product's established identity?" },
    { key: "primary_audience", missing: audienceClaim === null, label: "Who is the primary audience?" },
    { key: "primary_job", missing: jobClaim === null, label: "What is the primary user job?" },
    { key: "workflow", missing: workflowClaim === null, label: "What is the primary end-to-end workflow?" },
  ];
  for (const gap of missingClaims.filter((item) => item.missing)) {
    const gapNode = putNode(node("coverage_gap", gap.key, gap.label, [], {
      missing_claim: gap.key,
      status: "not_established",
    }));
    putEdge(product, "has_coverage_gap", gapNode);
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
    ...missingClaims.filter((item) => item.missing).map((item) => ({
      key: `missing_${item.key}`,
      label: item.label,
      reason: `No selected ${item.key} evidence claim was available.`,
    })),
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
    claim_digests: orderedClaims.map((claim) => claim.claim_digest),
    assessment_digests: orderedAssessments.map((assessment) => assessment.assessment_digest),
    proposed_guidance_digest: input.proposed_guidance?.record_digest ?? null,
    scan_digest: input.discovery.scan_digest,
  });
  return createContentGraph({
    project_id: input.project_id,
    source_digest: sourceDigest,
    nodes: [...nodes.values()],
    edges: [...edges.values()],
  });
}
