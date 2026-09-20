import { describe, expect, it } from "vitest";
import { classifyUseCase, selectCopyTemplate } from "../src/usecase-classifier.js";

describe("deterministic use-case classifier", () => {
  it("classifies confirmed actions exactly and repeats byte-equivalently", () => {
    const input = { text: "Saved", surface: "toast", state: "complete", action: "save", outcome: "confirmed" as const };
    expect(classifyUseCase(input)).toEqual(classifyUseCase(input));
    expect(classifyUseCase(input).use_case).toBe("action_success");
  });

  it("abstains when the rules disagree", () => {
    const result = classifyUseCase({ text: "", surface: "panel", state: "empty error" });
    expect(result.confidence).toBe("ambiguous");
    expect(result.use_case).toBeNull();
  });

  it("does not select copy without its required fact", () => {
    const classification = classifyUseCase({ text: "", surface: "toast", state: "complete", action: "save", outcome: "confirmed" });
    const result = selectCopyTemplate(classification, {}, [{ template_id: "saved", use_case: "action_success", required_facts: ["object"], render: (facts) => `${facts.object} saved` }]);
    expect(result.disposition).toBe("abstain");
  });
});
