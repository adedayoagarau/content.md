import { diagnoseLocalProject } from "@contentmd/agent";
import { startWorkbench } from "@contentmd/workbench";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

function port(value: string): number {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > 65_535) {
    throw new Error("workbench_port_invalid");
  }
  return parsed;
}

export function registerServe(program: Command): void {
  withRoot(program.command("serve").description("start the read-only local content workbench"))
    .option("--host <host>", "loopback host", "127.0.0.1")
    .option("--port <port>", "local port", port, 4178)
    .action(async (options: RootOptions & { host: string; port: number }) => runCommand(options, async () => {
      const doctor = await diagnoseLocalProject(options.root);
      let server;
      try {
        server = await startWorkbench({
          root: options.root,
          host: options.host,
          port: options.port,
        });
      } catch (error) {
        if (error instanceof Error && error.message === "workbench_model_missing") {
          return {
            command_id: "serve",
            status: "blocked_by_evidence" as const,
            findings: [{ code: "workbench_model_missing", message: "No compiled repository model is available." }],
            next_actions: ["Run contentmd model first."],
            data: { doctor, url: null },
          };
        }
        throw error;
      }
      return {
        command_id: "serve",
        findings: doctor.checks.filter((check) => check.status !== "pass"),
        warnings: doctor.overall_status === "ready" ? [] : ["Workbench guidance remains provisional."],
        next_actions: [`Open ${server.url}`],
        data: { doctor, url: server.url },
      };
    }));
}
