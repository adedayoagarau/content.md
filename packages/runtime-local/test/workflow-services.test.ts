import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  createLocalWorkflowServices,
  LocalApprovalPause,
  LocalJobRunner,
  LocalProgressPublisher,
  LocalScheduler,
} from "@contentmd/runtime-local";
import type {
  ApprovalPauseRequest,
  ApprovalResolution,
  AuthorizedRuntimeOperation,
  BoundRuntimeResource,
  GovernedJob,
  ProgressEvent,
  RuntimeOperationClaims,
  ScheduledGovernedJob,
} from "@contentmd/runtime-sdk";
import {
  AUTHORIZATION_REF,
  NOW,
  authorityFixture,
  runtimeBindingFixture,
  runtimeClaims,
} from "./runtime-test-fixtures.js";

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "contentmd-runtime-workflows-"));
  const authorization = authorityFixture(root);
  const binding = runtimeBindingFixture();
  let counter = 0;
  async function issue(input: {
    readonly action: string;
    readonly resources: readonly BoundRuntimeResource[];
    readonly data_classes?: readonly string[];
    readonly records?: number;
  }): Promise<AuthorizedRuntimeOperation> {
    counter += 1;
    const claims = runtimeClaims({
      capability_id: `capability.runtime.workflow.${counter}`,
      nonce: `nonce.runtime.workflow.${counter}`,
      action: input.action,
      resources: input.resources,
      data_classes: input.data_classes ?? ["runtime-metadata"],
      resource_limits: {
        calls: 1,
        bytes: 65_536,
        duration_ms: 5_000,
        records: input.records ?? 1,
        model_tokens: 0,
        browser_actions: 0,
        retries: 0,
      },
      runtime_binding_digest: binding.descriptor_digest,
    } satisfies Partial<RuntimeOperationClaims>);
    authorization.resolver.accept(claims);
    return authorization.authority.issue(AUTHORIZATION_REF, claims);
  }
  return { root, authorization, binding, issue };
}

function job(bindingDigest: string, jobId = "job.runtime.fixture"): GovernedJob {
  const preimage = {
    schema_version: "0.1.0" as const,
    job_id: jobId,
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    handler_id: "handler.runtime.fixture",
    input_ref: "input.runtime.fixture",
    input_digest: "a".repeat(64),
    requested_at: NOW,
  };
  return { ...preimage, job_digest: sha256Canonical(preimage) };
}

function pauseRequest(bindingDigest: string): ApprovalPauseRequest {
  const preimage = {
    schema_version: "0.1.0" as const,
    pause_id: "approval-pause.runtime.fixture",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    subject_ref: "job.runtime.paused",
    subject_digest: "b".repeat(64),
    approval_class: "content_change",
    requested_at: NOW,
    expires_at: "2026-08-23T13:00:00.000Z",
  };
  return { ...preimage, request_digest: sha256Canonical(preimage) };
}

function resolution(request: ApprovalPauseRequest): ApprovalResolution {
  const preimage = {
    schema_version: "0.1.0" as const,
    resolution_id: "approval-resolution.runtime.fixture",
    pause_id: request.pause_id,
    project_id: request.project_id,
    subject_ref: request.subject_ref,
    subject_digest: request.subject_digest,
    decision_ref: "approval.runtime.fixture",
    decision_digest: "c".repeat(64),
    disposition: "approved" as const,
    resolved_at: NOW,
  };
  return { ...preimage, resolution_digest: sha256Canonical(preimage) };
}

function progress(input: {
  readonly binding_digest: string;
  readonly sequence: number;
  readonly predecessor_digest: string | null;
}): ProgressEvent {
  const preimage = {
    schema_version: "0.1.0" as const,
    event_id: `progress-event.runtime.${input.sequence}`,
    operation_id: "operation.runtime.fixture",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: input.binding_digest,
    sequence: input.sequence,
    predecessor_digest: input.predecessor_digest,
    status: "running",
    message: `Step ${input.sequence}`,
    occurred_at: NOW,
  };
  return { ...preimage, event_digest: sha256Canonical(preimage) };
}

function schedule(bindingDigest: string): ScheduledGovernedJob {
  const preimage = {
    schema_version: "0.1.0" as const,
    schedule_id: "schedule.runtime.fixture",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    governed_job_ref: "job.runtime.scheduled",
    governed_job_digest: "d".repeat(64),
    schedule_expression: "2026-08-24T12:00:00.000Z",
    timezone: "UTC",
    next_occurrence: "2026-08-24T12:00:00.000Z",
  };
  return { ...preimage, schedule_digest: sha256Canonical(preimage) };
}

describe("local governed workflow services", () => {
  it("runs queued jobs to completion through registered handler IDs only", async () => {
    const f = await fixture();
    const runner = new LocalJobRunner({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      handlers: {
        "handler.runtime.fixture": async () => ({
          status: "completed",
          output_ref: "output.runtime.fixture",
          output_digest: "e".repeat(64),
        }),
      },
      clock: () => NOW,
    });
    const input = job(f.binding.descriptor_digest);
    await expect(runner.start(input, await f.issue({
      action: "runtime.job.start",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }))).resolves.toMatchObject({ status: "queued" });
    await expect(runner.inspect(input.job_id, await f.issue({
      action: "runtime.job.inspect",
      resources: [{ resource_id: input.job_id, content_digest: null }],
    }))).resolves.toMatchObject({ status: "queued", attempt: 1 });
    await expect(runner.run(input.job_id, await f.issue({
      action: "runtime.job.run",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }))).resolves.toMatchObject({
      status: "completed",
      attempt: 1,
      output_ref: "output.runtime.fixture",
    });
    runner.close();
    f.authorization.ledger.close();
  });

  it("rejects a conflicting job ID and requires a separate cancellation capability", async () => {
    const f = await fixture();
    const runner = new LocalJobRunner({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      handlers: { "handler.runtime.fixture": async () => ({ status: "completed", output_ref: null, output_digest: null }) },
      clock: () => NOW,
    });
    const input = job(f.binding.descriptor_digest, "job.runtime.cancelled");
    await runner.start(input, await f.issue({
      action: "runtime.job.start",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }));
    const changed = { ...input, input_digest: "f".repeat(64) };
    const changedJob = { ...changed, job_digest: sha256Canonical({
      schema_version: changed.schema_version,
      job_id: changed.job_id,
      project_id: changed.project_id,
      runtime_binding_digest: changed.runtime_binding_digest,
      handler_id: changed.handler_id,
      input_ref: changed.input_ref,
      input_digest: changed.input_digest,
      requested_at: changed.requested_at,
    }) };
    await expect(runner.start(changedJob, await f.issue({
      action: "runtime.job.start",
      resources: [{ resource_id: changedJob.job_id, content_digest: changedJob.job_digest }],
    }))).rejects.toThrow("event_id_digest_conflict");

    await expect(runner.cancel(input.job_id, "operator_cancelled", await f.issue({
      action: "runtime.job.inspect",
      resources: [{ resource_id: input.job_id, content_digest: null }],
    }))).rejects.toThrow("runtime_binding_not_authorized");
    await expect(runner.cancel(input.job_id, "operator_cancelled", await f.issue({
      action: "runtime.job.cancel",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }))).resolves.toMatchObject({ status: "cancelled" });
    runner.close();
    f.authorization.ledger.close();
  });

  it("resumes an approval-paused job without creating a second attempt", async () => {
    const f = await fixture();
    let calls = 0;
    const runner = new LocalJobRunner({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      handlers: {
        "handler.runtime.fixture": async () => {
          calls += 1;
          return calls === 1
            ? { status: "approval_paused", output_ref: null, output_digest: null }
            : { status: "completed", output_ref: "output.runtime.resumed", output_digest: "1".repeat(64) };
        },
      },
      clock: () => NOW,
    });
    const input = job(f.binding.descriptor_digest, "job.runtime.paused");
    await runner.start(input, await f.issue({
      action: "runtime.job.start",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }));
    await expect(runner.run(input.job_id, await f.issue({
      action: "runtime.job.run",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }))).resolves.toMatchObject({ status: "approval_paused", attempt: 1 });
    await expect(runner.run(input.job_id, await f.issue({
      action: "runtime.job.run",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }))).resolves.toMatchObject({ status: "completed", attempt: 1 });
    runner.close();
    f.authorization.ledger.close();
  });

  it.each(["expired", "revoked"] as const)("leaves an approval pending when resolution authority is %s", async (failure) => {
    const f = await fixture();
    const approvals = new LocalApprovalPause({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      clock: () => NOW,
    });
    const request = pauseRequest(f.binding.descriptor_digest);
    await approvals.pause(request, await f.issue({
      action: "runtime.approval.pause",
      resources: [{ resource_id: request.pause_id, content_digest: request.subject_digest }],
    }));
    const decision = resolution(request);
    const invalidOperation = await f.issue({
      action: "runtime.approval.resolve",
      resources: [{ resource_id: request.pause_id, content_digest: request.subject_digest }],
    });
    if (failure === "expired") f.authorization.setNow("2026-08-23T12:16:00.000Z");
    else f.authorization.resolver.currentness = "revoked";
    await expect(approvals.resolve(decision, invalidOperation))
      .rejects.toThrow("runtime_binding_not_authorized");
    f.authorization.setNow(NOW);
    f.authorization.resolver.currentness = "current";
    await expect(approvals.inspect(request.pause_id, await f.issue({
      action: "runtime.approval.inspect",
      resources: [{ resource_id: request.pause_id, content_digest: request.subject_digest }],
    }))).resolves.toMatchObject({ status: "pending" });
    approvals.close();
    f.authorization.ledger.close();
  });

  it("publishes only a monotonic digest-linked progress sequence", async () => {
    const f = await fixture();
    const publisher = new LocalProgressPublisher({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      clock: () => NOW,
    });
    const first = progress({ binding_digest: f.binding.descriptor_digest, sequence: 1, predecessor_digest: null });
    await expect(publisher.publish(first, await f.issue({
      action: "runtime.progress.publish",
      resources: [{ resource_id: first.operation_id, content_digest: first.event_digest }],
    }))).resolves.toBeUndefined();
    const gap = progress({ binding_digest: f.binding.descriptor_digest, sequence: 3, predecessor_digest: first.event_digest });
    await expect(publisher.publish(gap, await f.issue({
      action: "runtime.progress.publish",
      resources: [{ resource_id: gap.operation_id, content_digest: gap.event_digest }],
    }))).rejects.toThrow("runtime_canonical_commit_unavailable:progress_sequence_gap");
    const second = progress({ binding_digest: f.binding.descriptor_digest, sequence: 2, predecessor_digest: first.event_digest });
    await expect(publisher.publish(second, await f.issue({
      action: "runtime.progress.publish",
      resources: [{ resource_id: second.operation_id, content_digest: second.event_digest }],
    }))).resolves.toBeUndefined();
    publisher.close();
    f.authorization.ledger.close();
  });

  it("keeps a cancelled schedule inspectable but never active", async () => {
    const f = await fixture();
    const scheduler = new LocalScheduler({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      clock: () => NOW,
    });
    const input = schedule(f.binding.descriptor_digest);
    await expect(scheduler.schedule(input, await f.issue({
      action: "runtime.schedule.create",
      resources: [{ resource_id: input.schedule_id, content_digest: input.schedule_digest }],
    }))).resolves.toMatchObject({ status: "active" });
    await expect(scheduler.cancel(input.schedule_id, "operator_cancelled", await f.issue({
      action: "runtime.schedule.cancel",
      resources: [{ resource_id: input.schedule_id, content_digest: input.schedule_digest }],
    }))).resolves.toMatchObject({ status: "cancelled", next_occurrence: null });
    await expect(scheduler.inspect(input.schedule_id, await f.issue({
      action: "runtime.schedule.inspect",
      resources: [{ resource_id: input.schedule_id, content_digest: null }],
    }))).resolves.toMatchObject({ status: "cancelled", next_occurrence: null });
    scheduler.close();
    f.authorization.ledger.close();
  });

  it("composes the workflow capabilities without giving records executable handlers", async () => {
    const f = await fixture();
    const services = createLocalWorkflowServices({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      handlers: {
        "handler.runtime.fixture": async () => ({
          status: "completed",
          output_ref: "output.runtime.composed",
          output_digest: "2".repeat(64),
        }),
      },
      clock: () => NOW,
    });
    const input = job(f.binding.descriptor_digest, "job.runtime.composed");
    await services.jobs.start(input, await f.issue({
      action: "runtime.job.start",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }));
    await expect(services.jobs.run(input.job_id, await f.issue({
      action: "runtime.job.run",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }))).resolves.toMatchObject({ status: "completed", attempt: 1 });
    services.close();
    f.authorization.ledger.close();
  });

  it("persists an ambiguous remote outcome and never reruns its handler after restart", async () => {
    const f = await fixture();
    let calls = 0;
    const options = {
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      handlers: {
        "handler.runtime.fixture": async () => {
          calls += 1;
          return { status: "remote_outcome_unknown" as const, output_ref: null, output_digest: null };
        },
      },
      clock: () => NOW,
    };
    const input = job(f.binding.descriptor_digest, "job.runtime.remote-unknown");
    const first = new LocalJobRunner(options);
    await first.start(input, await f.issue({
      action: "runtime.job.start",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }));
    await expect(first.run(input.job_id, await f.issue({
      action: "runtime.job.run",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }))).resolves.toMatchObject({ status: "remote_outcome_unknown", attempt: 1 });
    first.close();

    const restored = new LocalJobRunner(options);
    await expect(restored.inspect(input.job_id, await f.issue({
      action: "runtime.job.inspect",
      resources: [{ resource_id: input.job_id, content_digest: null }],
    }))).resolves.toMatchObject({ status: "remote_outcome_unknown", attempt: 1 });
    await expect(restored.run(input.job_id, await f.issue({
      action: "runtime.job.run",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    }))).rejects.toThrow("remote_outcome_requires_resolution");
    expect(calls).toBe(1);
    restored.close();

    const database = new DatabaseSync(join(f.root, ".contentmd/runtime/runtime.sqlite"), { readOnly: true });
    const transitions = database.prepare(`
      SELECT to_status FROM runtime_workflow_audit
      WHERE resource_id = ? ORDER BY rowid ASC
    `).all(input.job_id) as Array<{ to_status: string }>;
    expect(transitions.map((entry) => entry.to_status)).toEqual([
      "queued",
      "running",
      "remote_outcome_unknown",
    ]);
    database.close();
    f.authorization.ledger.close();
  });

  it("rejects a replayed workflow capability before it can change state", async () => {
    const f = await fixture();
    const runner = new LocalJobRunner({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      handlers: {
        "handler.runtime.fixture": async () => ({ status: "completed", output_ref: null, output_digest: null }),
      },
      clock: () => NOW,
    });
    const input = job(f.binding.descriptor_digest, "job.runtime.replay");
    const operation = await f.issue({
      action: "runtime.job.start",
      resources: [{ resource_id: input.job_id, content_digest: input.job_digest }],
    });
    await runner.start(input, operation);
    await expect(runner.start(input, operation)).rejects.toThrow("runtime_operation_nonce_replayed");
    await expect(runner.inspect(input.job_id, await f.issue({
      action: "runtime.job.inspect",
      resources: [{ resource_id: input.job_id, content_digest: null }],
    }))).resolves.toMatchObject({ status: "queued", attempt: 1 });
    runner.close();
    f.authorization.ledger.close();
  });
});
