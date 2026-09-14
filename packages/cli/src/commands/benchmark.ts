import {
  createLocalContentDesignReviewSubmissionTemplate,
  predictLocalContentDesignBenchmark,
  qualifyLocalContentDesignReview,
  scoreLocalContentDesignBenchmark,
  writeBuiltinContentDesignReviewPacket,
} from "@contentmd/agent";
import type { Command } from "commander";
import { startContentDesignReviewWorkbench } from "@contentmd/workbench";
import { runCommand } from "./shared.js";

function port(value: string): number {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > 65_535) throw new Error("benchmark_review_port_invalid");
  return parsed;
}

export function registerBenchmark(program: Command): void {
  const benchmark = program.command("benchmark").description("evaluate bounded content-design capabilities");
  benchmark.command("content-design")
    .description("predict a blinded content-design review packet")
    .option("--packet <path>", "immutable blinded review packet")
    .option("--sample-out <path>", "write the built-in blinded 100-scenario sample to a new file")
    .option("--out <path>", "new output file; refuses to overwrite")
    .option("--review-template <path>", "create a new independent-review response template")
    .option("--submission <path>", "completed independent-review response file")
    .option("--gold-out <path>", "new qualified benchmark-gold output file")
    .option("--gold <path>", "qualified benchmark-gold file")
    .option("--predictions <path>", "packet-bound prediction file")
    .option("--report-out <path>", "new evaluation-report output file")
    .option("--review-workbench", "start the loopback-only independent-review workbench")
    .option("--host <host>", "loopback host", "127.0.0.1")
    .option("--port <port>", "review workbench port", port, 4179)
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: { packet?: string; sampleOut?: string; out?: string; reviewTemplate?: string; submission?: string; goldOut?: string; gold?: string; predictions?: string; reportOut?: string; reviewWorkbench?: boolean; host: string; port: number; json?: boolean }) => runCommand(options, async () => {
      if (options.sampleOut !== undefined) {
        if (options.packet !== undefined || options.out !== undefined || options.reviewTemplate !== undefined
          || options.submission !== undefined || options.goldOut !== undefined || options.gold !== undefined
          || options.predictions !== undefined || options.reportOut !== undefined || options.reviewWorkbench === true) {
          throw new Error("content_design_benchmark_invalid:sample_out_is_standalone");
        }
        const packet = await writeBuiltinContentDesignReviewPacket(options.sampleOut);
        return {
          command_id: "benchmark.content-design.sample",
          record_refs: [packet.packet_digest],
          warnings: ["This packet is blinded and contains no hidden generator labels."],
          next_actions: ["Open the review workbench or create a review template for independent assessment."],
          data: { output: options.sampleOut, packet_digest: packet.packet_digest, sample_count: packet.sample_count, write_effect: "create_only", authority_effect: "none" },
        };
      }
      if (options.packet === undefined) throw new Error("content_design_benchmark_invalid:packet_required");
      const packetPath = options.packet;
      if (options.reviewWorkbench === true) {
        const server = await startContentDesignReviewWorkbench({ packet: packetPath, host: options.host, port: options.port });
        return {
          command_id: "benchmark.content-design.review-workbench",
          record_refs: [],
          warnings: ["Review progress is stored only in this browser until you export a completed response file."],
          next_actions: [`Open ${server.url}`],
          data: { url: server.url, write_effect: "none", authority_effect: "none" },
        };
      }
      if (options.submission !== undefined || options.goldOut !== undefined) {
        if (options.submission === undefined || options.goldOut === undefined) throw new Error("content_design_benchmark_invalid:submission_and_gold_out_required");
        const gold = await qualifyLocalContentDesignReview(packetPath, options.submission, options.goldOut);
        return {
          command_id: "benchmark.content-design.qualify",
          record_refs: [gold.packet_ref.packet_digest, gold.gold_set_digest],
          warnings: ["Qualified records are benchmark-eligible only; retrieval and training remain disabled."],
          next_actions: ["Score a prediction set bound to this packet, then inspect every weak slice before changing the evaluator."],
          data: gold,
        };
      }
      if (options.gold !== undefined || options.predictions !== undefined || options.reportOut !== undefined) {
        if (options.gold === undefined || options.predictions === undefined || options.reportOut === undefined) throw new Error("content_design_benchmark_invalid:gold_predictions_and_report_out_required");
        const report = await scoreLocalContentDesignBenchmark(options.gold, options.predictions, options.reportOut);
        return {
          command_id: "benchmark.content-design.score",
          record_refs: [report.gold_set_digest, report.prediction_set_digest, report.report_digest],
          next_actions: ["Review overall and slice-level results; do not optimize against aggregate score alone."],
          data: report,
        };
      }
      if (options.reviewTemplate !== undefined) {
        if (options.out !== undefined) throw new Error("content_design_benchmark_invalid:choose_out_or_review_template");
        const template = await createLocalContentDesignReviewSubmissionTemplate(packetPath, options.reviewTemplate);
        return {
          command_id: "benchmark.content-design.review-template",
          record_refs: [template.packet_ref.packet_digest],
          warnings: ["This template is incomplete and cannot create benchmark gold until qualified independent review is complete."],
          next_actions: ["Complete every response without opening hidden generator labels, then submit it for qualification."],
          data: template,
        };
      }
      const result = await predictLocalContentDesignBenchmark(packetPath, options.out);
      return {
        command_id: "benchmark.content-design",
        record_refs: [result.packet_digest, result.prediction_set_digest],
        warnings: ["Predictions are unscored until independently reviewed qualified gold exists."],
        next_actions: ["Complete the blinded human review, qualify it, then score this exact prediction set."],
        data: result,
      };
    }));
}
