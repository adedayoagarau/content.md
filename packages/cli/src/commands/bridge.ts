import {
  installHostBridge,
  planHostBridge,
  planHostBridgeRemoval,
  removeHostBridge,
  type HostKind,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface BridgeOptions extends RootOptions {
  host: string;
  path?: string;
  remove?: boolean;
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
    .option("--path <relative-path>", "scoped host instruction path")
    .option("--remove", "preview or remove only the managed marker block")
    .option("--yes", "approve installation of the exact preview")
    .action(async (options: BridgeOptions) => runCommand(options, async () => {
      const host = hostKind(options.host);
      if (options.remove === true) {
        const preview = await planHostBridgeRemoval(options.root, host, options.path);
        const previewData = {
          host,
          relative_path: preview.relative_path,
          status: preview.status,
          before_digest: preview.before_digest,
          after_digest: preview.after_digest,
          preview_digest: preview.preview_digest,
          delete_file: preview.delete_file,
          authority_effect: "local_instruction_mutation" as const,
        };
        if (options.yes !== true || preview.status !== "removal_proposed") {
          return {
            command_id: "bridge.remove.preview",
            record_refs: [preview.preview_digest],
            next_actions: preview.status === "removal_proposed"
              ? ["Review the preview, then rerun with --remove --yes to remove this exact block."]
              : [],
            data: previewData,
          };
        }
        const receipt = await removeHostBridge(preview, {
          approval_id: `approval.local-host-bridge-removal.${preview.preview_digest.slice(0, 16)}`,
          preview_digest: preview.preview_digest,
          status: "current",
        });
        return {
          command_id: "bridge.remove",
          record_refs: [receipt.receipt_digest],
          data: { ...previewData, status: "removed", receipt },
        };
      }
      const preview = await planHostBridge(options.root, host, options.path);
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
      if (["current", "malformed"].includes(preview.status)) {
        return {
          command_id: preview.status === "current" ? "bridge.install" : "bridge.preview",
          record_refs: [preview.preview_digest],
          next_actions: preview.status === "malformed"
            ? ["Repair the marker block manually, then preview the bridge again."]
            : [],
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
