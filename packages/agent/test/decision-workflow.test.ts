import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { recordDecisionAndCreateCandidate } from "@contentmd/agent";
import { authorizedEventStoreFixture } from "../../runtime-local/test/runtime-test-fixtures.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("decision workflow", () => {
  it("records feedback and creates only a non-promoted scoped candidate", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-decision-workflow-"));
    temporaryDirectories.push(root);
    const runtime = await authorizedEventStoreFixture({
      root,
      project_id: "project.beacon",
      permitted_data_classes: ["project_feedback"],
    });
    const store = runtime.store;
    const command = {
      event_id: "event.decision.fixture.accepted",
      stream_id: "decision-stream.project-beacon",
      event_type: "content_decision_recorded",
      occurred_at: "2026-08-20T17:10:00.000Z",
      actor_ref: "actor.fixture-reviewer",
      data_class: "project_feedback",
      payload: {
        schema_version: "contentmd.content-decision/0.1.0",
        decision_id: "decision.fixture.accepted",
        status: "accepted",
        actor_ref: "actor.fixture-reviewer",
        actor_role: "content_owner",
        rationale: "The recovery sequence matches the reviewed product-state evidence.",
        proposal_ref: "proposal.draft.fixture",
        selected_expression: "We couldn’t confirm this payment. Check its status before trying again.",
        edited_expression: null,
        evidence_reviewed: ["review.fixture", "source.product"],
        scope: "project",
        project_id: "project.beacon",
        occurred_at: "2026-08-20T17:10:00.000Z",
        mutation_approval_effect: "none",
      },
      expected_head_digest: null,
    };
    const result = await recordDecisionAndCreateCandidate({
      store,
      operation: await runtime.issue(
        "runtime.event.append",
        [{ resource_id: command.stream_id, content_digest: null }],
        [command.data_class],
        command,
        1,
      ),
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
    const query = { stream_id: "decision-stream.project-beacon", after_sequence: 0, maximum_records: 10 };
    expect(await store.readStream(query, await runtime.issue(
      "runtime.event.read",
      [{ resource_id: query.stream_id, content_digest: null }],
      ["project_feedback"],
      query,
      query.maximum_records,
    ))).toHaveLength(1);
    await runtime.close();
  });
});
