import { readFile } from "node:fs/promises";
import {
  localArtifactRef,
  prepareContentTask,
  reviewIdeCandidate,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerTask(program: Command): void {
  const task = program.command("task").description("prepare and review repository-derived IDE writing tasks");

  withRoot(task.command("prepare").description("prepare a bounded IDE writing task"))
    .requiredOption("--request <text>", "content task request")
    .requiredOption("--target <path:line>", "exact repository target")
    .action(async (options: RootOptions & { request: string; target: string }) => runCommand(options, async () => {
      const prepared = await prepareContentTask(options.root, {
        request: options.request,
        target: options.target,
      });
      return {
        command_id: "task.prepare",
        record_refs: [prepared.task.task_digest, prepared.prepared_digest],
        audit_ref: localArtifactRef(options.root, "prepared-task.json"),
        data: prepared,
      };
    }));

  withRoot(task.command("review").description("review a structured IDE writing candidate"))
    .requiredOption("--input <file>", "candidate JSON")
    .action(async (options: RootOptions & { input: string }) => runCommand(options, async () => {
      const candidate = JSON.parse(await readFile(options.input, "utf8")) as unknown;
      const review = await reviewIdeCandidate(options.root, candidate);
      return {
        command_id: "task.review",
        record_refs: [review.review_digest],
        audit_ref: localArtifactRef(options.root, "task-review.json"),
        data: review,
      };
    }));
}
