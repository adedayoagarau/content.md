import { describe, expect, it } from "vitest";
import {
  companyKnowledgeTrainingDigest,
  createCompanyKnowledgePacket,
  verifyCompanyKnowledgePacket,
  type CompanyKnowledgePayload,
} from "@contentmd/research";

const source = { record_id: "source.fixture", schema_id: "contentmd.research-source-record", schema_version: "0.1.0" as const, content_digest: "a".repeat(64) };
const scope = { memory_scope: "project" as const, project_id: "project.fixture", resource_refs: [], data_classes: ["public-synthetic"] };

function payload(training: CompanyKnowledgePayload["training"]): CompanyKnowledgePayload {
  return {
    contract_version: "contentmd.company-knowledge-packet/0.1.0",
    company_id: "company.fixture",
    company_name: "Fixture Company",
    knowledge_version: 1,
    status: training.eligibility === "approved" ? "approved" : "reviewed",
    source_refs: [source],
    voice_tone: {
      feature_hypotheses: [{ feature_name: "directness", qualitative_value: "high", confidence: "medium", evidence_refs: [source] }],
      stable_voice_principles: [{ principle_id: "clear", statement: "Make the next action obvious.", evidence_refs: [source] }],
      situational_tone_policies: [],
    },
    content_style: { mechanics: ["Use sentence case."], terminology_notes: ["Prefer user terms."], content_patterns: [] },
    products: [{
      product_id: "product.fixture", product_name: "Fixture App", industry_ids: ["software"], surface_refs: ["surface.web"],
      ia_nodes: [{ node_id: "home", label: "Home", kind: "page" }], ia_edges: [], content_pattern_refs: [], terminology: [],
      representative_strings: [{ string_id: "example.001", text: "Start a project", state: "ready", slot: "cta", source_refs: [source], rights_basis: training.rights_basis === "project_owned" ? "project_owned" : "evidence_only", training_eligible: training.eligibility === "approved" }],
    }],
    training,
    authority_effect: "none",
  };
}

function packet(training: CompanyKnowledgePayload["training"]) {
  return createCompanyKnowledgePacket({ record_id: "company-knowledge.fixture", scope, provenance: [], lifecycle_state: "proposed", payload: payload(training) });
}

describe("company knowledge packets", () => {
  it("creates and verifies a deterministic packet while keeping public evidence out of training", () => {
    const value = packet({ eligibility: "pending_review", rights_basis: "evidence_only", approved_example_refs: [], excluded_example_refs: ["example.001"], review_refs: [], limitations: ["Public evidence is not training material."] });
    expect(verifyCompanyKnowledgePacket(value)).toBe(true);
    expect(() => companyKnowledgeTrainingDigest(value)).toThrow("rights_or_approval");
  });

  it("admits only explicitly approved project-owned examples into the training view", () => {
    const value = packet({ eligibility: "approved", rights_basis: "project_owned", approved_example_refs: ["example.001"], excluded_example_refs: [], review_refs: [source], limitations: [] });
    expect(verifyCompanyKnowledgePacket(value)).toBe(true);
    expect(companyKnowledgeTrainingDigest(value)).toMatch(/^[a-f0-9]{64}$/u);
  });
});
