import {
  classifyLocalUxWritingUseCase,
  createCorpusAdjudicationRemoteLaunchRequest,
  createCorpusAdjudicationPlan,
  evaluateLocalUxWritingUseCaseBenchmark,
  inspectLocalProviderConfiguration,
  runCorpusAdjudicationBatch,
  type AiAdjudicationModelContext,
} from "@contentmd/agent";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { sha256Canonical } from "@contentmd/core";
import {
  RecordedModelProvider,
  type ModelExecutionPort,
} from "@contentmd/model-provider-sdk";
import type { Command } from "commander";
import { runCommand } from "./shared.js";

interface JsonOptions {
  json?: boolean;
}

interface CorpusAdjudicationOptions extends JsonOptions {
  root: string;
  queue: string;
  products: string;
  crosswalk: string;
  split: string;
  sampleMatrix: string;
  mode: string;
  cassette?: string;
  processingAuthorizationRef?: string;
  classifierModel: string;
  evaluatorModel: string;
  maximumRefinementRounds: number;
}

interface CorpusLaunchOptions extends JsonOptions {
  root: string;
  queue: string;
  products: string;
  crosswalk: string;
  split: string;
  sampleMatrix: string;
  provider: string;
  classifierModel: string;
  evaluatorModel: string;
  maximumRefinementRounds: number;
}

function recordedContext(
  port: ModelExecutionPort,
  role: "classifier" | "evaluator",
  modelId: string,
): AiAdjudicationModelContext {
  const profile = {
    provider_id: port.descriptor.provider_id,
    model_id: modelId,
    role,
    purpose: "ux_content_corpus_adjudication",
  };
  return {
    port,
    requested_provider_id: port.descriptor.provider_id,
    requested_model_profile_ref: {
      record_id: `model-profile.corpus-adjudication.${role}.${sha256Canonical(profile).slice(0, 16)}`,
      schema_id: "contentmd.model-profile",
      schema_version: "0.1.0",
      content_digest: sha256Canonical(profile),
    },
    requested_model_id: modelId,
    memory_scope: "none",
    resource_limits: {
      maximum_calls: 1,
      maximum_retries: 0,
      maximum_input_bytes: 2_000_000,
      maximum_output_bytes: 131_072,
      maximum_input_tokens: 250_000,
      maximum_output_tokens: 20_000,
      timeout_ms: 60_000,
    },
  };
}

function refinementRounds(value: string): number {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > 3) {
    throw new Error("corpus_adjudication_invalid:maximum_refinement_rounds");
  }
  return parsed;
}

export function registerUsecase(program: Command): void {
  const usecase = program.command("usecase")
    .description("classify and evaluate deterministic English UX-writing use cases");

  usecase.command("classify")
    .description("classify one structured request in authority-free shadow mode")
    .requiredOption("--input <path>", "structured use-case request JSON")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: JsonOptions & { input: string }) => runCommand(options, async () => {
      const result = await classifyLocalUxWritingUseCase(options.input);
      return {
        command_id: "usecase.classify",
        status: "completed" as const,
        record_refs: [result.classification.classification_id, result.resolution.resolution_id],
        warnings: result.resolution.status === "abstain"
          ? [`Policy resolution abstained: ${result.resolution.reason ?? "unspecified"}.`]
          : [],
        data: result,
      };
    }));

  usecase.command("evaluate")
    .description("evaluate a frozen use-case benchmark without writing project state")
    .requiredOption("--benchmark <path>", "benchmark JSONL")
    .requiredOption("--adjudications <path>", "adjudication JSONL")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: JsonOptions & { benchmark: string; adjudications: string }) => runCommand(options, async () => {
      const report = await evaluateLocalUxWritingUseCaseBenchmark(options.benchmark, options.adjudications);
      const blocked = report.release_disposition === "hold_for_qualified_review";
      return {
        command_id: "usecase.evaluate",
        status: blocked ? "blocked_by_evidence" as const : report.release_disposition === "qualified_regression_fail"
          ? "findings_present" as const : "completed" as const,
        record_refs: [report.report_digest],
        next_actions: blocked
          ? ["Run qualified AI classifier-evaluator adjudication; use a person only for an explicit authority or failure exception."]
          : [],
        data: report,
      };
    }));

  usecase.command("adjudicate-corpus")
    .description("plan or replay the governed 140-unit English UX-content discovery pilot")
    .requiredOption("--root <path>", "repository root containing ux-content-corpus")
    .option("--queue <path>", "review queue relative to the repository root", "ux-content-corpus/_generated/review-queue.jsonl")
    .option("--products <path>", "product projection relative to the repository root", "ux-content-corpus/_generated/products.jsonl")
    .option("--crosswalk <path>", "taxonomy crosswalk relative to the repository root", "ux-content-corpus/_schema/TAXONOMY-CROSSWALK.json")
    .option("--split <name>", "corpus split; this pilot is discovery-only", "discovery")
    .option("--sample-matrix <axes>", "sampling matrix; must be domain,taxonomy", "domain,taxonomy")
    .option("--mode <mode>", "plan or recorded", "plan")
    .option("--cassette <path>", "recorded model-response JSONL; required for recorded mode")
    .option("--processing-authorization-ref <ref>", "explicit authorization bound to this classification/evaluation run")
    .option("--classifier-model <id>", "recorded classifier model id", "model.recorded.ux-classifier")
    .option("--evaluator-model <id>", "recorded evaluator model id", "model.recorded.ux-evaluator")
    .option("--maximum-refinement-rounds <count>", "bounded classifier revision rounds (0-3)", refinementRounds, 2)
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: CorpusAdjudicationOptions) => runCommand(options, async () => {
      if (options.split !== "discovery") {
        throw new Error("corpus_adjudication_invalid:split:discovery_only");
      }
      if (options.sampleMatrix !== "domain,taxonomy") {
        throw new Error("corpus_adjudication_invalid:sample_matrix");
      }
      if (options.mode !== "plan" && options.mode !== "recorded") {
        throw new Error("corpus_adjudication_invalid:mode");
      }
      const plan = await createCorpusAdjudicationPlan({
        project_root: options.root,
        queue_path: options.queue,
        products_path: options.products,
        taxonomy_crosswalk_path: options.crosswalk,
        split: "discovery",
      });
      if (options.mode === "plan") {
        return {
          command_id: "usecase.adjudicate-corpus",
          record_refs: [plan.plan_id, plan.plan_digest],
          warnings: ["Planning made no model call and wrote no adjudication state."],
          next_actions: [
            "For remote processing, run usecase prepare-corpus-run with exact model IDs; for offline replay, authorize the exact plan and provide a digest-bound cassette.",
          ],
          data: { mode: "plan" as const, plan },
        };
      }
      if (options.cassette === undefined || options.cassette.length === 0) {
        throw new Error("corpus_adjudication_invalid:recorded:cassette_required");
      }
      if (options.processingAuthorizationRef === undefined
        || options.processingAuthorizationRef.length === 0) {
        throw new Error("corpus_adjudication_invalid:recorded:processing_authorization_required");
      }
      const cassetteBytes = await readFile(options.cassette);
      const cassetteDigest = createHash("sha256").update(cassetteBytes).digest("hex");
      const provider = await RecordedModelProvider.fromFile(options.cassette);
      const classifier = recordedContext(provider, "classifier", options.classifierModel);
      const evaluator = recordedContext(provider, "evaluator", options.evaluatorModel);
      const result = await runCorpusAdjudicationBatch({
        project_root: options.root,
        plan,
        processing_authorization_ref: options.processingAuthorizationRef,
        classifier,
        evaluator,
        classifier_execution_ref: {
          record_id: `recorded-cassette.classifier.${cassetteDigest.slice(0, 24)}`,
          content_digest: cassetteDigest,
          execution_mode: "recorded",
        },
        evaluator_execution_ref: {
          record_id: `recorded-cassette.evaluator.${cassetteDigest.slice(0, 24)}`,
          content_digest: cassetteDigest,
          execution_mode: "recorded",
        },
        maximum_refinement_rounds: options.maximumRefinementRounds,
      });
      const findingCount = (result.summary.route_counts.human_exception ?? 0)
        + (result.summary.route_counts.abstain ?? 0);
      return {
        command_id: "usecase.adjudicate-corpus",
        status: findingCount > 0 ? "findings_present" as const : "completed" as const,
        record_refs: [result.run.run_id, result.summary.summary_id],
        audit_ref: result.store.manifest,
        warnings: findingCount > 0
          ? [`${findingCount} units require abstention or an explicit failure/authority exception.`]
          : [],
        data: { mode: "recorded" as const, ...result },
      };
    }));

  usecase.command("prepare-corpus-run")
    .description("prepare an exact no-network authorization request for the remote corpus pilot")
    .requiredOption("--root <path>", "repository root containing ux-content-corpus")
    .option("--queue <path>", "review queue relative to the repository root", "ux-content-corpus/_generated/review-queue.jsonl")
    .option("--products <path>", "product projection relative to the repository root", "ux-content-corpus/_generated/products.jsonl")
    .option("--crosswalk <path>", "taxonomy crosswalk relative to the repository root", "ux-content-corpus/_schema/TAXONOMY-CROSSWALK.json")
    .option("--split <name>", "corpus split; this pilot is discovery-only", "discovery")
    .option("--sample-matrix <axes>", "sampling matrix; must be domain,taxonomy", "domain,taxonomy")
    .option("--provider <id>", "remote provider; currently openai", "openai")
    .requiredOption("--classifier-model <id>", "exact classifier model id")
    .requiredOption("--evaluator-model <id>", "exact evaluator model id")
    .option("--maximum-refinement-rounds <count>", "bounded classifier revision rounds (0-3)", refinementRounds, 2)
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: CorpusLaunchOptions) => runCommand(options, async () => {
      if (options.split !== "discovery") {
        throw new Error("corpus_adjudication_launch_invalid:split:discovery_only");
      }
      if (options.sampleMatrix !== "domain,taxonomy") {
        throw new Error("corpus_adjudication_launch_invalid:sample_matrix");
      }
      if (options.provider !== "openai") {
        throw new Error(`unsupported_provider:${options.provider}`);
      }
      const [plan, providerConfiguration] = await Promise.all([
        createCorpusAdjudicationPlan({
          project_root: options.root,
          queue_path: options.queue,
          products_path: options.products,
          taxonomy_crosswalk_path: options.crosswalk,
          split: "discovery",
        }),
        inspectLocalProviderConfiguration(options.root),
      ]);
      const launchRequest = createCorpusAdjudicationRemoteLaunchRequest({
        plan,
        target: {
          provider_id: "provider.openai",
          adapter_id: "adapter.openai.responses",
          destination_origin: "https://api.openai.com",
        },
        classifier: { requested_model_id: options.classifierModel },
        evaluator: { requested_model_id: options.evaluatorModel },
        provider_configuration: providerConfiguration,
        maximum_refinement_rounds: options.maximumRefinementRounds,
      });
      const blocked = launchRequest.configuration_readiness.status === "blocked";
      return {
        command_id: "usecase.prepare-corpus-run",
        status: "completed" as const,
        record_refs: [
          launchRequest.request_id,
          launchRequest.authorization_subject.subject_id,
        ],
        warnings: [
          "Preparation made no model call, sent no corpus data, wrote no state, and granted no authority.",
          ...launchRequest.configuration_readiness.reason_codes.map((reason) =>
            `Launch configuration is blocked: ${reason}.`),
          ...launchRequest.configuration_readiness.advisory_codes.map((reason) =>
            `Launch advisory: ${reason}.`),
        ],
        next_actions: blocked
          ? [
              "Install one current digest-valid provider configuration for the exact model, classify/evaluate operations, schemas, data classes, project, and zero-data-retention boundary; then rerun this command.",
            ]
          : [
              `Explicitly authorize processing and remote egress for subject ${launchRequest.authorization_subject.subject_id} at digest ${launchRequest.authorization_subject.subject_digest}; preparation alone is not authorization.`,
            ],
        data: {
          mode: "remote_launch_preparation" as const,
          launch_request: launchRequest,
        },
      };
    }));
}
