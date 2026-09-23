import { describe, expect, it } from "vitest";
import {
  createContentDecisionContract,
  verifyContentDecisionContract,
} from "@contentmd/evaluation";
import { contentDecisionInput } from "./content-decision-test-fixtures.js";

describe("content decision contract", () => {
  it("normalizes unordered evidence and emits a deeply immutable deterministic contract", () => {
    const left = contentDecisionInput();
    const right = structuredClone(left);
    right.classifications.reverse();
    right.semantic_contract.required_facts.reverse();
    right.semantic_contract.semantic_invariants.reverse();
    right.semantic_contract.prohibited_claims.reverse();
    right.assurance_plan.core_criterion_ids.reverse();
    right.assurance_plan.acceptance_criteria.reverse();

    const first = createContentDecisionContract(left);
    const second = createContentDecisionContract(right);

    expect(second).toEqual(first);
    expect(verifyContentDecisionContract(first)).toBe(true);
    expect(first.contract_id).toMatch(/^content-decision\.[a-f0-9]{32}$/u);
    expect(first.contract_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.semantic_contract.required_facts)).toBe(true);
    expect(Object.isFrozen(first.semantic_contract.required_facts[0])).toBe(true);
    expect(() => {
      first.subject.locale = "en-GB";
    }).toThrow();
  });

  it("keeps model output provisional rather than granting decision authority", () => {
    const classification = contentDecisionInput();
    const workIntent = classification.classifications.find(
      (item) => item.dimension === "work_intent",
    )!;
    Object.assign(workIntent, {
      status: "established",
      label: "review",
      evidence_refs: ["evidence.synthetic"],
      method: "model",
    });
    expect(() => createContentDecisionContract(classification))
      .toThrow("content_decision_contract_invalid:classifications.0.model_authority");

    const intervention = contentDecisionInput();
    intervention.intervention.method = "model";
    expect(() => createContentDecisionContract(intervention))
      .toThrow("content_decision_contract_invalid:intervention.model_authority");
  });

  it("enforces the current English-only scope", () => {
    const input = contentDecisionInput();
    input.subject.locale = "fr-FR";

    expect(() => createContentDecisionContract(input))
      .toThrow("content_decision_contract_invalid:subject.locale_non_english");
  });

  it("requires facts and invariants before content-producing work", () => {
    const input = contentDecisionInput("write");
    input.semantic_contract.required_facts = [];
    input.semantic_contract.semantic_invariants = [];

    expect(() => createContentDecisionContract(input))
      .toThrow("content_decision_contract_invalid:semantic_contract.insufficient_for_content_production");
  });

  it("allows the valid decision that content is not the intervention", () => {
    const input = contentDecisionInput("decide");
    input.intervention = {
      status: "decided",
      type: "change_product_behavior",
      rationale: "The product must expose a reliable outcome before copy can resolve the problem.",
      evidence_refs: ["decision.product-change.synthetic"],
      method: "human",
      method_ref: "review.product-change.synthetic",
    };
    input.semantic_contract.required_facts = [];
    input.semantic_contract.semantic_invariants = [];

    expect(createContentDecisionContract(input).intervention.type).toBe("change_product_behavior");
  });

  it("detects post-creation tampering through deterministic replay", () => {
    const contract = createContentDecisionContract(contentDecisionInput());
    const forged = structuredClone(contract);
    forged.subject.surface = "different surface";

    expect(verifyContentDecisionContract(forged)).toBe(false);
  });
});
