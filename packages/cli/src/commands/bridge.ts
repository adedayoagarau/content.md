import {
  installHostBridge,
  planHostBridge,
  type HostKind,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface BridgeOptions extends RootOptions {
  host: string;
  yes?: boolean;
}

const HOSTS = new Set<HostKind>(["agents", "claude", "codex", "gemini", "copilot"]);

function hostKind(value: string): HostKind {
  if (!HOSTS.has(value as HostKind)) throw new Error(`invalid_input:unsupported_host:${value}`);
  return value as HostKind;
}

export function registerBridge(program: Command): void {
  withRoot(program.command("bridge").description("preview or install a bounded host-instruction bridge"))
    .requiredOption("--host <host>", "agents, claude, codex, gemini, or copilot")
    .option("--yes", "approve installation of the exact preview")
    .action(async (options: BridgeOptions) => runCommand(options, async () => {
      const host = hostKind(options.host);
      const preview = await planHostBridge(options.root, host);
      const previewData = {
        host,
        relative_path: preview.relative_path,
        status: preview.status,
        before_digest: preview.before_digest,
        after_digest: preview.after_digest,
        preview_digest: preview.preview_digest,
        authority_effect: "none" as const,
      };

      if (options.yes !== true) {
        return {
          command_id: "bridge.preview",
          record_refs: [preview.preview_digest],
          next_actions: [
            "Review the preview, then rerun with --yes to install this exact bridge.",
          ],
          data: previewData,
        };
      }
      if (preview.status === "already_installed") {
        return {
          command_id: "bridge.install",
          record_refs: [preview.preview_digest],
          data: previewData,
        };
      }

      const receipt = await installHostBridge(preview, {
        approval_id: `approval.local-host-bridge.${preview.preview_digest.slice(0, 16)}`,
        preview_digest: preview.preview_digest,
        status: "current",
      });
      return {
        command_id: "bridge.install",
        record_refs: [receipt.receipt_digest],
        data: {
          ...previewData,
          status: "installed",
          receipt,
        },
      };
    }));
}
