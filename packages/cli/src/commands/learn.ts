import {
  assertLocalWritingBenchmarkOfficialActionAuthorized,
  evaluateLocalLearning,
  runLocalLearningDataset,
  runLocalLearningDrift,
  runLocalLearningEvaluation,
  runLocalLearningExamples,
  runLocalLearningPromotion,
  runLocalLearningRollback,
  runLocalLearningShadow,
  runLocalLearningTraining,
  loadLocalVerifiedTrainingModel,
  statusLocalLearning,
  verifyLocalWritingBenchmarkOfficialState,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand } from "./shared.js";

interface LegacyLearnOptions {
  root?: string;
  json?: boolean;
}

export function registerLearn(program: Command): void {
  const learn = program.command("learn")
    .description("evaluate, but never auto-promote, learning candidates")
    .option("--root <path>", "project root")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: LegacyLearnOptions) => runCommand(options, async () => {
      if (options.root === undefined) throw new Error("learning_workflow_input_invalid:root");
      const result = await evaluateLocalLearning(options.root);
      return {
        command_id: "learn",
        status: "blocked_by_evidence" as const,
        findings: [{ code: result.reason, disposition: result.disposition }],
        next_actions: result.disposition === "not_authorized"
          ? ["Establish a separate scoped learning-data permission before evaluation."]
          : ["Collect additional accepted decisions before proposing a candidate."],
        data: result,
      };
    }));

  for (const [phase, description] of [
    ["examples", "qualify feedback and create governed preference examples"],
    ["dataset", "build and seal an eligible learning dataset"],
    ["train", "train a deterministic offline ranking candidate"],
    ["verify-model", "reverify a persisted ranking-model training artifact"],
    ["evaluate", "evaluate a trained candidate against sealed evidence"],
    ["shadow", "run an authority-free shadow comparison"],
    ["promote", "propose a separately decided model promotion"],
    ["status", "inspect the durable learning workflow status"],
    ["drift", "measure post-promotion drift without changing authority"],
    ["rollback", "propose a separately authorized model rollback"],
  ] as const) {
    const command = learn.command(phase).description(description);
    if (phase === "promote") {
      command.requiredOption(
        "--decision <path>",
        "separately issued exact promotion decision record",
      );
    }
    if (phase === "shadow") {
      command.requiredOption("--input <path>", "complete governed shadow replay");
    }
    if (phase === "drift" || phase === "rollback") {
      command.requiredOption("--input <path>", `complete governed ${phase} replay`);
    }
    if (phase === "examples") {
      command.requiredOption("--input <path>", "complete qualification and preference replay");
      command.action(async (phaseOptions: { input: string }) => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await runLocalLearningExamples(options.root, phaseOptions.input);
          return {
            command_id: "learn.examples",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: {
              phase: "examples" as const,
              result_digest: result.audit.result_digest,
              denominators: [...result.audit.denominators],
              exclusions: [...result.audit.exclusions],
              authority_effect: "none" as const,
            },
          };
        });
      });
    }
    if (phase === "dataset") {
      command.requiredOption("--input <path>", "complete dataset build and seal replay");
      command.action(async (phaseOptions: { input: string }) => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await runLocalLearningDataset(options.root, phaseOptions.input);
          return {
            command_id: "learn.dataset",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: {
              phase: "dataset" as const,
              result_digest: result.audit.result_digest,
              denominators: [...result.audit.denominators],
              exclusions: [...result.audit.exclusions],
              authority_effect: "none" as const,
            },
          };
        });
      });
    }
    if (phase === "train") {
      command.requiredOption("--input <path>", "complete verified training request");
      command.action(async (phaseOptions: { input: string }) => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await runLocalLearningTraining(options.root, phaseOptions.input);
          return {
            command_id: "learn.train",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: {
              phase: "train" as const,
              result_digest: result.audit.result_digest,
              denominators: [...result.audit.denominators],
              exclusions: [...result.audit.exclusions],
              authority_effect: "none" as const,
              training_artifact_digest: result.training_artifact_digest,
              training_artifact_path: result.training_artifact_path,
            },
          };
        });
      });
    }
    if (phase === "verify-model") {
      command.action(async () => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const verified = await loadLocalVerifiedTrainingModel(options.root);
          const model = verified.model.record;
          return {
            command_id: "learn.verify-model",
            record_refs: [model.record_id],
            data: {
              phase: "verify_model" as const,
              authority_effect: "none" as const,
              training_artifact_digest: verified.training_artifact_digest,
              model_ref: {
                record_id: model.record_id,
                schema_id: model.schema_id,
                schema_version: model.schema_version,
                content_digest: model.content_digest,
              },
            },
          };
        });
      });
    }
    if (phase === "evaluate") {
      command.requiredOption("--input <path>", "complete sealed evaluation replay");
      command.action(async (phaseOptions: { input: string }) => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await runLocalLearningEvaluation(options.root, phaseOptions.input);
          return {
            command_id: "learn.evaluate",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: {
              phase: "evaluate" as const,
              result_digest: result.audit.result_digest,
              denominators: [...result.audit.denominators],
              exclusions: [...result.audit.exclusions],
              authority_effect: "none" as const,
              evaluation_artifact_digest: result.evaluation_artifact_digest,
              evaluation_artifact_path: result.evaluation_artifact_path,
              vault_snapshot_digest: result.vault_snapshot.snapshot_digest,
              vault_snapshot_path: result.vault_snapshot_path,
            },
          };
        });
      });
    }
    if (phase === "shadow") {
      command.action(async (phaseOptions: { input: string }) => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await runLocalLearningShadow(options.root, phaseOptions.input);
          return {
            command_id: "learn.shadow",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: {
              phase: "shadow" as const,
              result_digest: result.audit.result_digest,
              denominators: [...result.audit.denominators],
              exclusions: [...result.audit.exclusions],
              authority_effect: "none" as const,
              shadow_artifact_digest: result.shadow_artifact_digest,
              shadow_artifact_path: result.shadow_artifact_path,
              vault_snapshot_digest: result.vault_snapshot.snapshot_digest,
              vault_snapshot_path: result.vault_snapshot_path,
            },
          };
        });
      });
    }
    if (phase === "promote") {
      command.action(async (phaseOptions: { decision: string }) => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await runLocalLearningPromotion(options.root, phaseOptions.decision);
          return {
            command_id: "learn.promote",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: {
              phase: "promote" as const,
              result_digest: result.audit.result_digest,
              denominators: [...result.audit.denominators],
              exclusions: [...result.audit.exclusions],
              authority_effect: "none" as const,
              promotion_artifact_digest: result.promotion_artifact_digest,
              promotion_artifact_path: result.promotion_artifact_path,
              vault_snapshot_digest: result.vault_snapshot.snapshot_digest,
              vault_snapshot_path: result.vault_snapshot_path,
            },
          };
        });
      });
    }
    if (phase === "drift") {
      command.action(async (phaseOptions: { input: string }) => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await runLocalLearningDrift(options.root, phaseOptions.input);
          return {
            command_id: "learn.drift",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: {
              phase: "drift" as const,
              result_digest: result.audit.result_digest,
              denominators: [...result.audit.denominators],
              exclusions: [...result.audit.exclusions],
              authority_effect: "none" as const,
              drift_artifact_digest: result.drift_artifact_digest,
              drift_artifact_path: result.drift_artifact_path,
              vault_snapshot_digest: result.vault_snapshot.snapshot_digest,
              vault_snapshot_path: result.vault_snapshot_path,
            },
          };
        });
      });
    }
    if (phase === "rollback") {
      command.action(async (phaseOptions: { input: string }) => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await runLocalLearningRollback(options.root, phaseOptions.input);
          return {
            command_id: "learn.rollback",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: {
              phase: "rollback" as const,
              result_digest: result.audit.result_digest,
              denominators: [...result.audit.denominators],
              exclusions: [...result.audit.exclusions],
              authority_effect: "none" as const,
              rollback_artifact_digest: result.rollback_artifact_digest,
              rollback_artifact_path: result.rollback_artifact_path,
              vault_snapshot_digest: result.vault_snapshot.snapshot_digest,
              vault_snapshot_path: result.vault_snapshot_path,
            },
          };
        });
      });
    }
    if (phase === "status") {
      command.action(async () => {
        const options = learn.opts() as LegacyLearnOptions;
        await runCommand(options, async () => {
          if (options.root === undefined) {
            throw new Error("learning_workflow_input_invalid:root");
          }
          const result = await statusLocalLearning(options.root);
          return {
            command_id: "learn.status",
            record_refs: [...result.audit.record_refs],
            findings: result.audit.reason_codes.map((code) => ({ code })),
            audit_ref: result.audit.event_digest,
            data: result.data,
          };
        });
      });
    }
  }

  const benchmark = learn.command("benchmark")
    .description("inspect or operate the sealed LIL-WRITE-001 benchmark boundary");
  for (const [action, description] of [
    ["seal", "seal one separately authorized official benchmark attempt"],
    ["ingest-review", "ingest one separately authorized official review packet"],
    ["open-result", "open one separately authorized official benchmark result"],
    ["verify", "verify the current official benchmark state"],
  ] as const) {
    const command = benchmark.command(action).description(description);
    if (action !== "verify") {
      command.requiredOption("--input <path>", `complete ${action} input and action-time authority`);
    }
    command.action(async (actionOptions: { input?: string }) => {
      const options = learn.opts() as LegacyLearnOptions;
      await runCommand(options, async () => {
        if (options.root === undefined) {
          throw new Error("writing_benchmark_official_state_invalid:root");
        }
        if (action === "verify") {
          return {
            command_id: "learn.benchmark.verify",
            data: await verifyLocalWritingBenchmarkOfficialState(options.root),
          };
        }
        return assertLocalWritingBenchmarkOfficialActionAuthorized(
          options.root,
          action === "ingest-review" ? "ingest_review" : action === "open-result"
            ? "open_result"
            : "seal",
          actionOptions.input ?? "",
        );
      });
    });
  }
}
