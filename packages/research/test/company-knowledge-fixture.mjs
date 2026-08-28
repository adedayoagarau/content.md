import { sha256Canonical } from "../../core/dist/index.js";

const source = { record_id: "source.fixture", schema_id: "contentmd.research-source-record", schema_version: "0.1.0", content_digest: "a".repeat(64) };
export function createCompanyKnowledgePacket() {
  const payload = {
    contract_version: "contentmd.company-knowledge-packet/0.1.0", company_id: "company.fixture", company_name: "Fixture Company", knowledge_version: 1, status: "reviewed", source_refs: [source],
    voice_tone: { feature_hypotheses: [], stable_voice_principles: [{ principle_id: "clear", statement: "Make the next action obvious.", evidence_refs: [source] }], situational_tone_policies: [] },
    content_style: { mechanics: [], terminology_notes: [], content_patterns: [] },
    products: [{ product_id: "product.fixture", product_name: "Fixture App", industry_ids: ["software"], surface_refs: [], ia_nodes: [], ia_edges: [], content_pattern_refs: [], terminology: [], representative_strings: [] }],
    training: { eligibility: "never", rights_basis: "evidence_only", approved_example_refs: [], excluded_example_refs: [], review_refs: [], limitations: ["Fixture only"] }, authority_effect: "none",
  };
  const input = { record_id: "company-knowledge.fixture", schema_id: "contentmd.company-knowledge-packet", schema_version: "0.1.0", record_version: 1, scope: { memory_scope: "project", project_id: "project.fixture", resource_refs: [], data_classes: ["public-synthetic"] }, provenance: [], lifecycle_state: "proposed", payload };
  return { ...input, content_digest: sha256Canonical(input) };
}
