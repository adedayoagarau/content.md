import {
  finalizeRecord,
  sha256Canonical,
  verifyRecordDigest,
  type DurableRecord,
  type DurableRecordInput,
} from "@contentmd/core";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import type { ResearchRecordRef } from "./source-record.js";

export type CompanyKnowledgeTrainingEligibility = "never" | "pending_review" | "approved";

export interface CompanyKnowledgeProduct {
  product_id: string;
  product_name: string;
  industry_ids: string[];
  surface_refs: string[];
  ia_nodes: Array<{ node_id: string; label: string; kind: "page" | "route" | "feature" | "navigation" }>;
  ia_edges: Array<{ from_node_id: string; relationship: "contains" | "links_to" | "offers" | "requires"; to_node_id: string }>;
  content_pattern_refs: string[];
  terminology: Array<{ label: string; status: "preferred" | "controlled" | "avoid" | "unknown"; concept: string; evidence_refs: string[] }>;
  representative_strings: Array<{
    string_id: string;
    text: string;
    state: string;
    slot: string;
    source_refs: ResearchRecordRef[];
    rights_basis: "evidence_only" | "licensed" | "project_owned" | "consented";
    training_eligible: boolean;
  }>;
}

export interface CompanyKnowledgePayload {
  contract_version: "contentmd.company-knowledge-packet/0.1.0";
  company_id: string;
  company_name: string;
  knowledge_version: number;
  status: "proposed" | "reviewed" | "approved";
  source_refs: ResearchRecordRef[];
  voice_tone: {
    feature_hypotheses: Array<{ feature_name: string; qualitative_value: string; confidence: "low" | "medium" | "high"; evidence_refs: ResearchRecordRef[] }>;
    stable_voice_principles: Array<{ principle_id: string; statement: string; evidence_refs: ResearchRecordRef[] }>;
    situational_tone_policies: Array<{ policy_id: string; context: string; policy: string; exclusions: string[]; evidence_refs: ResearchRecordRef[] }>;
  };
  content_style: {
    mechanics: string[];
    terminology_notes: string[];
    content_patterns: Array<{ pattern_id: string; name: string; use_when: string; evidence_refs: ResearchRecordRef[] }>;
  };
  products: CompanyKnowledgeProduct[];
  training: {
    eligibility: CompanyKnowledgeTrainingEligibility;
    rights_basis: "none" | "evidence_only" | "licensed" | "project_owned" | "consented";
    approved_example_refs: string[];
    excluded_example_refs: string[];
    review_refs: ResearchRecordRef[];
    limitations: string[];
  };
  authority_effect: "none";
}

export type CompanyKnowledgePacket = DurableRecord<CompanyKnowledgePayload>;

export function createCompanyKnowledgePacket(input: Omit<DurableRecordInput<CompanyKnowledgePayload>, "schema_id" | "schema_version" | "record_version">): CompanyKnowledgePacket {
  const record = finalizeRecord({
    ...input,
    schema_id: SCHEMA_IDS.companyKnowledgePacket,
    schema_version: "0.1.0" as const,
    record_version: 1,
  });
  const validation = validateRecord(SCHEMA_IDS.companyKnowledgePacket, record);
  if (!validation.valid) throw new TypeError(`invalid_company_knowledge_packet:${validation.errors.join("|")}`);
  return record;
}

export function verifyCompanyKnowledgePacket(packet: CompanyKnowledgePacket): boolean {
  return verifyRecordDigest(packet).valid && validateRecord(SCHEMA_IDS.companyKnowledgePacket, packet).valid;
}

export function trainingEligibleCompanyKnowledge(packet: CompanyKnowledgePacket): CompanyKnowledgePacket {
  if (!verifyCompanyKnowledgePacket(packet)) throw new TypeError("company_knowledge_training_invalid:packet");
  const training = packet.payload.training;
  const examples = packet.payload.products.flatMap((product) => product.representative_strings);
  const eligibleExamples = examples.filter((example) => example.training_eligible);
  const approved = new Set(training.approved_example_refs);
  if (packet.payload.status !== "approved"
    || training.eligibility !== "approved"
    || !["licensed", "project_owned", "consented"].includes(training.rights_basis)
    || training.approved_example_refs.length === 0
    || training.review_refs.length === 0
    || eligibleExamples.length === 0
    || eligibleExamples.some((example) => example.rights_basis === "evidence_only" || !approved.has(example.string_id))
    || training.approved_example_refs.some((id) => !eligibleExamples.some((example) => example.string_id === id))) {
    throw new TypeError("company_knowledge_training_invalid:rights_or_approval");
  }
  return packet;
}

export interface CompanyKnowledgeTrainingExample {
  example_id: string;
  company_id: string;
  company_name: string;
  product_id: string;
  product_name: string;
  industry_ids: string[];
  state: string;
  slot: string;
  text: string;
  source_refs: ResearchRecordRef[];
}

export function companyKnowledgeTrainingExamples(packet: CompanyKnowledgePacket): CompanyKnowledgeTrainingExample[] {
  const approved = trainingEligibleCompanyKnowledge(packet);
  return approved.payload.products.flatMap((product) => product.representative_strings
    .filter((example) => example.training_eligible && approved.payload.training.approved_example_refs.includes(example.string_id))
    .map((example) => ({
      example_id: example.string_id,
      company_id: approved.payload.company_id,
      company_name: approved.payload.company_name,
      product_id: product.product_id,
      product_name: product.product_name,
      industry_ids: [...product.industry_ids].sort(),
      state: example.state,
      slot: example.slot,
      text: example.text,
      source_refs: example.source_refs,
    })))
    .sort((a, b) => a.example_id.localeCompare(b.example_id));
}

export function companyKnowledgeTrainingDigest(packet: CompanyKnowledgePacket): string {
  return sha256Canonical(trainingEligibleCompanyKnowledge(packet).payload);
}
