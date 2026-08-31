import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import { reviewLocalUxWriting } from "@contentmd/agent";
import type { UxWritingReviewRequest } from "@contentmd/evaluation";

describe("local UX-writing review", () => {
  it("persists a deterministic report and repair brief without model execution", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-uxw-review-"));
    try {
    const inputPath = join(root, "review-request.json");
    const request: UxWritingReviewRequest = {
      contract_version: "contentmd.ux-writing-review-request/0.1.0",
      request_id: "uxw.request.fixture",
      target: { source_artifact: "checkout.tsx", line: 1, column: 1, text: "Try again" },
      facts: {
        "evidence.present": true, "actor.authority_known": true, "agency.choice_required": false,
        "state.outcome_evidence": "unknown_possible", "recovery.retry_safe": false,
        "recovery.required": true, "recovery.available": true, "control.present": false,
        "navigation.destination_present": false, "system.generated_or_hybrid": false,
        "expression.invariants_preserved": true, "locale.specialist_review_required": false,
        "governance.authority_effect": "none",
      },
      evidence_refs: ["fact.payment-state"],
      preserve: ["Outcome is unknown"],
      must_not_claim: ["Payment failed"],
      required_facts: ["Outcome may be unknown"],
      consequence: "A retry may duplicate payment",
      recovery: "Check status",
      channel: "web",
      locale: "en-US",
      acceptance_criteria: ["No unsafe retry"],
      unresolved_questions: [],
      authority_effect: "none",
    };
    await writeFile(inputPath, JSON.stringify(request), "utf8");
    const result = await reviewLocalUxWriting(root, inputPath);
    expect(result.report.hard_plane_status).toBe("fail");
    expect(JSON.parse(await readFile(join(root, ".contentmd/runtime/ux-writing-review.json"), "utf8"))).toEqual(result.report);
    expect(JSON.parse(await readFile(join(root, ".contentmd/runtime/ux-writing-repair-brief.json"), "utf8"))).toEqual(result.repair_brief);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
