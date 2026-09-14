import { createLocalContentDesignReviewSubmissionTemplate, predictLocalContentDesignBenchmark } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand } from "./shared.js";

export function registerBenchmark(program: Command): void {
  const benchmark = program.command("benchmark").description("evaluate bounded content-design capabilities");
  benchmark.command("content-design")
    .description("predict a blinded content-design review packet")
    .requiredOption("--packet <path>", "immutable blinded review packet")
    .option("--out <path>", "new output file; refuses to overwrite")
    .option("--review-template <path>", "create a new independent-review response template")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: { packet: string; out?: string; reviewTemplate?: string; json?: boolean }) => runCommand(options, async () => {
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
