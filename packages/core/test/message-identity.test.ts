import { describe, expect, it } from "vitest";
import {
  createExpressionSlotId,
  createExpressionVersionId,
  createSemanticMessageId,
  type ExpressionSlotIdentity,
  type SemanticMessageIdentity,
} from "@contentmd/core";

const baseMessage: SemanticMessageIdentity = {
  project_id: "project.beacon",
  journey: "checkout",
  stage: "submission",
  state: "before_submit",
  user_job: "complete_checkout",
  purpose: "continue_checkout",
  subject: "checkout",
  intended_outcome: "advance_without_submission",
};

const baseExpression: ExpressionSlotIdentity = {
  semantic_message_id: createSemanticMessageId(baseMessage),
  locale: "en-US",
  channel: "web",
  modality: "visible",
  surface: "checkout",
  slot: "primary_action",
  state: "before_submit",
};

describe("semantic message and expression identity", () => {
  it("allows the same literal to realize different semantic messages", () => {
    const beforeSubmit = createSemanticMessageId(baseMessage);
    const afterSubmit = createSemanticMessageId({
      ...baseMessage,
      state: "outcome_unknown",
      purpose: "check_status",
      intended_outcome: "avoid_duplicate_payment",
    });
    const literal = "Continue";

    expect(literal).toBe("Continue");
    expect(beforeSubmit).not.toBe(afterSubmit);
  });

  it("allows one message to have distinct locale and channel expressions", () => {
    const webEnglish = createExpressionSlotId(baseExpression);
    const smsFrench = createExpressionSlotId({
      ...baseExpression,
      locale: "fr-CA",
      channel: "sms",
    });

    expect(webEnglish).not.toBe(smsFrench);
  });

  it("uses every context dimension in expression-slot identity", () => {
    const fields: Array<keyof ExpressionSlotIdentity> = [
      "semantic_message_id",
      "locale",
      "channel",
      "modality",
      "surface",
      "slot",
      "state",
    ];
    const original = createExpressionSlotId(baseExpression);

    for (const field of fields) {
      const changed = { ...baseExpression, [field]: `${baseExpression[field]}.changed` };
      expect(createExpressionSlotId(changed), field).not.toBe(original);
    }
  });

  it("versions an expression from its exact slot, payload, and source", () => {
    const first = createExpressionVersionId({
      expression_slot_id: createExpressionSlotId(baseExpression),
      expression_payload: "Continue",
      source_digest: "a".repeat(64),
    });
    const revised = createExpressionVersionId({
      expression_slot_id: createExpressionSlotId(baseExpression),
      expression_payload: "Review order",
      source_digest: "a".repeat(64),
    });

    expect(first).not.toBe(revised);
  });
});
