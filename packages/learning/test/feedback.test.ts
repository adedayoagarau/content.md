import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { adaptContentDecisionEvent, recordContentDecision } from "@contentmd/learning";
import { SqliteEventStore } from "@contentmd/memory";
import {
  producer,
  PROJECT_ID,
  proposalRecord,
} from "./task2-fixtures.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("content decision feedback", () => {
  it("appends decisions without overwriting proposals or granting mutation approval", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-feedback-"));
    temporaryDirectories.push(root);
    const store = new SqliteEventStore(join(root, "events.sqlite"), {
      permitted_data_classes: ["project_feedback"],
    });
    const first = await recordContentDecision({
      store,
      stream_id: "decision-stream.project-beacon",
      expected_head_digest: null,
      decision_id: "decision.fixture.accepted",
      status: "accepted",
      actor_ref: "actor.fixture-reviewer",
      actor_role: "content_owner",
      rationale: "The state distinction and recovery sequence match the product evidence.",
      proposal_ref: "proposal.rewrite.fixture",
      selected_expression: "We couldn’t confirm this payment. Check its status before trying again.",
      edited_expression: null,
      evidence_reviewed: ["source.product", "review.fixture"],
      scope: "project",
      project_id: "project.beacon",
      occurred_at: "2026-08-20T17:00:00.000Z",
      data_class: "project_feedback",
    });
    const second = await recordContentDecision({
      store,
      stream_id: "decision-stream.project-beacon",
      expected_head_digest: first.event_digest,
      decision_id: "decision.fixture.edited",
      status: "edited",
      actor_ref: "actor.fixture-reviewer",
      actor_role: "content_owner",
      rationale: "The shorter action better fits the local UI while preserving the object.",
      proposal_ref: "proposal.rewrite.fixture",
      selected_expression: null,
      edited_expression: "Delete this workspace",
      evidence_reviewed: ["source.design"],
      scope: "project",
      project_id: "project.beacon",
      occurred_at: "2026-08-20T17:01:00.000Z",
      data_class: "project_feedback",
    });
    const events = await store.readStream("decision-stream.project-beacon");

    expect(events).toHaveLength(2);
    expect(first.status).toBe("accepted");
    expect(second.status).toBe("edited");
    expect(events[0]?.payload).toEqual(expect.objectContaining({ proposal_ref: "proposal.rewrite.fixture" }));
    expect(events[0]?.payload).not.toHaveProperty("mutation_approval_id");
    expect(first.mutation_approval_effect).toBe("none");
    expect(second.sequence).toBe(2);
    expect(Object.keys(first)).toEqual([
      "schema_version",
      "decision_id",
      "status",
      "actor_ref",
      "actor_role",
      "rationale",
      "proposal_ref",
      "selected_expression",
      "edited_expression",
      "evidence_reviewed",
      "scope",
      "project_id",
      "occurred_at",
      "mutation_approval_effect",
      "sequence",
      "event_digest",
    ]);
    expect(first).not.toHaveProperty("content_digest");
    store.close();
  });

  it("supports only the exact decision statuses and their selected-expression rules", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-feedback-"));
    temporaryDirectories.push(root);
    const store = new SqliteEventStore(join(root, "events.sqlite"), {
      permitted_data_classes: ["project_feedback"],
    });
    const base = {
      store,
      stream_id: "decision-stream.statuses",
      expected_head_digest: null,
      decision_id: "decision.fixture.invalid",
      actor_ref: "actor.fixture-reviewer",
      actor_role: "content_owner",
      rationale: "A recorded rationale.",
      proposal_ref: "proposal.fixture",
      selected_expression: null,
      edited_expression: null,
      evidence_reviewed: ["source.fixture"],
      scope: "project" as const,
      project_id: "project.beacon",
      occurred_at: "2026-08-20T17:02:00.000Z",
      data_class: "project_feedback",
    };

    await expect(recordContentDecision({ ...base, status: "accepted" })).rejects.toThrow("accepted_decision_requires_selected_expression");
    await expect(recordContentDecision({ ...base, status: "edited" })).rejects.toThrow("edited_decision_requires_edited_expression");
    store.close();
  });

  it("preserves legacy UTF-16 evidence order while canonicalizing the durable decision boundary", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-feedback-"));
    temporaryDirectories.push(root);
    const store = new SqliteEventStore(join(root, "events.sqlite"), {
      permitted_data_classes: ["project_feedback"],
    });
    const proposal = proposalRecord();
    const supplementary = "evidence.\u{10000}";
    const privateUse = "evidence.\uE000";
    const result = await recordContentDecision({
      store,
      stream_id: "decision-stream.canonical-evidence",
      expected_head_digest: null,
      decision_id: "decision.fixture.canonical-evidence",
      status: "accepted",
      actor_ref: "actor.fixture-reviewer",
      actor_role: "content_owner",
      rationale: "Canonical evidence order must cross the adapter boundary.",
      proposal_ref: proposal.record_id,
      selected_expression: "Continue",
      edited_expression: null,
      evidence_reviewed: [supplementary, privateUse],
      scope: "project",
      project_id: PROJECT_ID,
      occurred_at: "2026-08-20T17:03:00.000Z",
      data_class: "project_feedback",
    });
    const [event] = await store.readStream("decision-stream.canonical-evidence");
    store.close();

    expect(result.evidence_reviewed).toEqual([supplementary, privateUse]);
    expect(adaptContentDecisionEvent({
      event: event!,
      proposal,
      producer: producer("content-decision-adapter"),
    }).decision.payload.evidence_reviewed).toEqual([privateUse, supplementary]);
  });
});
