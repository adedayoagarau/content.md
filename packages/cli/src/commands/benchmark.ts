import {
  createLocalContentDesignReviewSubmissionTemplate,
  predictLocalContentDesignBenchmark,
  qualifyLocalContentDesignReview,
  scoreLocalContentDesignBenchmark,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand } from "./shared.js";

export function registerBenchmark(program: Command): void {
  const benchmark = program.command("benchmark").description("evaluate bounded content-design capabilities");
  benchmark.command("content-design")
    .description("predict a blinded content-design review packet")
    .requiredOption("--packet <path>", "immutable blinded review packet")
    .option("--out <path>", "new output file; refuses to overwrite")
    .option("--review-template <path>", "create a new independent-review response template")
    .option("--submission <path>", "completed independent-review response file")
    .option("--gold-out <path>", "new qualified benchmark-gold output file")
    .option("--gold <path>", "qualified benchmark-gold file")
    .option("--predictions <path>", "packet-bound prediction file")
    .option("--report-out <path>", "new evaluation-report output file")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: { packet: string; out?: string; reviewTemplate?: string; submission?: string; goldOut?: string; gold?: string; predictions?: string; reportOut?: string; json?: boolean }) => runCommand(options, async () => {
      if (options.submission !== undefined || options.goldOut !== undefined) {
        if (options.submission === undefined || options.goldOut === undefined) throw new Error("content_design_benchmark_invalid:submission_and_gold_out_required");
        const gold = await qualifyLocalContentDesignReview(options.packet, options.submission, options.goldOut);
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
        const template = await createLocalContentDesignReviewSubmissionTemplate(options.packet, options.reviewTemplate);
        return {
          command_id: "benchmark.content-design.review-template",
          record_refs: [template.packet_ref.packet_digest],
          warnings: ["This template is incomplete and cannot create benchmark gold until qualified independent review is complete."],
          next_actions: ["Complete every response without opening hidden generator labels, then submit it for qualification."],
          data: template,
        };
      }
      const result = await predictLocalContentDesignBenchmark(options.packet, options.out);
      return {
        command_id: "benchmark.content-design",
        record_refs: [result.packet_digest, result.prediction_set_digest],
        warnings: ["Predictions are unscored until independently reviewed qualified gold exists."],
        next_actions: ["Complete the blinded human review, qualify it, then score this exact prediction set."],
        data: result,
      };
    }));
}
