import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { recordDecisionAndCreateCandidate } from "@contentmd/agent";
import { SqliteEventStore } from "@contentmd/memory";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("decision workflow", () => {
  it("records feedback and creates only a non-promoted scoped candidate", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-decision-workflow-"));
    temporaryDirectories.push(root);
    const store = new SqliteEventStore(join(root, "events.sqlite"), {
      permitted_data_classes: ["project_feedback"],
    });
    const result = await recordDecisionAndCreateCandidate({
      store,
      decision: {
        stream_id: "decision-stream.project-beacon",
        expected_head_digest: null,
        decision_id: "decision.fixture.accepted",
        status: "accepted",
        actor_ref: "actor.fixture-reviewer",
        actor_role: "content_owner",
        rationale: "The recovery sequence matches the reviewed product-state evidence.",
        proposal_ref: "proposal.draft.fixture",
        selected_expression: "We couldn’t confirm this payment. Check its status before trying again.",
        edited_expression: null,
        evidence_reviewed: ["source.product", "review.fixture"],
        scope: "project",
        project_id: "project.beacon",
        occurred_at: "2026-08-20T17:10:00.000Z",
        data_class: "project_feedback",
      },
      candidate: {
        hypothesis: "Status verification should precede retry when payment outcome is unknown.",
        expected_benefit: "Reduce unsafe duplicate-payment guidance.",
        contradicting_decision_refs: [],
        data_scope: "project",
        project_id: "project.beacon",
        rights_privacy_disposition: "permitted_for_candidate",
        evaluation_plan: "Evaluate against the frozen recovery set.",
        rollback_plan: "Retire the candidate and rebuild projections.",
        learning_data_permission_ref: "permission.learning.project-beacon",
      },
    });

    expect(result.decision.status).toBe("accepted");
    expect(result.candidate.supporting_decision_refs).toEqual(["decision.fixture.accepted"]);
    expect(result.candidate.promotion_status).toBe("not_requested");
    expect(result.candidate.authority_effect).toBe("none");
    expect(await store.readStream("decision-stream.project-beacon")).toHaveLength(1);
    store.close();
  });
});
