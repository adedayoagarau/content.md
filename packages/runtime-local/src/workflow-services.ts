import type {
  RuntimeBinding,
  RuntimeOperationVerifier,
} from "@contentmd/runtime-sdk";
import { LocalApprovalPause } from "./approval-pause.js";
import { LocalJobRunner, type LocalJobHandler } from "./job-runner.js";
import { LocalProgressPublisher } from "./progress-publisher.js";
import { LocalScheduler } from "./scheduler.js";

export interface LocalWorkflowServicesOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly handlers: Readonly<Record<string, LocalJobHandler>>;
  readonly clock: () => string;
}

export interface LocalWorkflowServices {
  readonly jobs: LocalJobRunner;
  readonly approvals: LocalApprovalPause;
  readonly progress: LocalProgressPublisher;
  readonly scheduler: LocalScheduler;
  close(): void;
}

export function createLocalWorkflowServices(
  options: LocalWorkflowServicesOptions,
): LocalWorkflowServices {
  const jobs = new LocalJobRunner(options);
  const approvals = new LocalApprovalPause(options);
  const progress = new LocalProgressPublisher(options);
  const scheduler = new LocalScheduler(options);
  let closed = false;
  return Object.freeze({
    jobs,
    approvals,
    progress,
    scheduler,
    close(): void {
      if (closed) return;
      closed = true;
      const failures: unknown[] = [];
      for (const service of [scheduler, progress, approvals, jobs]) {
        try {
          service.close();
        } catch (error) {
          failures.push(error);
        }
      }
      if (failures.length > 0) throw failures[0];
    },
  });
}
