import { predictLocalContentDesignBenchmark } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand } from "./shared.js";

export function registerBenchmark(program: Command): void {
  const benchmark = program.command("benchmark").description("evaluate bounded content-design capabilities");
  benchmark.command("content-design")
    .description("predict a blinded content-design review packet")
    .requiredOption("--packet <path>", "immutable blinded review packet")
    .option("--out <path>", "new output file; refuses to overwrite")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: { packet: string; out?: string; json?: boolean }) => runCommand(options, async () => {
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
