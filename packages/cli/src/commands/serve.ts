import { compileProjectModel, diagnoseLocalProject, resolveRepositoryWorkspace } from "@contentmd/agent";
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
    .option("--workspace <path>", "serve one declared monorepo workspace")
    .action(async (options: RootOptions & { host: string; port: number; workspace?: string }) => runCommand(options, async () => {
      const doctor = await diagnoseLocalProject(options.root);
      const scope = await resolveRepositoryWorkspace(options.root, options.workspace);
      const model = await compileProjectModel({
        project_root: scope.project_root,
        repository_root: scope.repository_root,
      });
      const server = await startWorkbench({
        root: scope.project_root,
        model,
        host: options.host,
        port: options.port,
      });
      return {
        command_id: "serve",
        findings: doctor.checks.filter((check) => check.status !== "pass"),
        warnings: doctor.overall_status === "ready" ? [] : ["Workbench guidance remains provisional."],
        next_actions: [`Open ${server.url}`],
        data: { doctor, url: server.url, workspace_selection: scope.selection, write_effect: "none" },
      };
    }));
}
