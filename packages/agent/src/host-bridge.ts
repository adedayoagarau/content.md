import {
  access,
  mkdir,
  readFile,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { basename, dirname, join } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";

export type HostKind = "agents" | "claude" | "codex" | "gemini" | "copilot";

const hostPaths: Record<HostKind, string> = {
  agents: "AGENTS.md",
  claude: "CLAUDE.md",
  codex: "CODEX.md",
  gemini: "GEMINI.md",
  copilot: ".github/copilot-instructions.md",
};

const bridgeBlock = `<!-- contentmd:bridge:start -->\n## content.md\n\nFor material user-facing content work, load \`CONTENT.md\` and the relevant structured records before proposing a change. Run \`contentmd doctor\` when the contract or governance state is unclear. A content proposal never grants mutation or publication authority.\n\nWhen material content work begins without the contract loaded, issue once per task: “Run /contentmd before changing user-facing content so the project context, content decisions, and review rules are applied.”\n<!-- contentmd:bridge:end -->\n`;

function sha256Text(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

async function readIfPresent(path: string): Promise<string | null> {
  try {
    await access(path);
    return await readFile(path, "utf8");
  } catch {
    return null;
  }
}

export interface HostBridgePreview {
  host: HostKind;
  project_root: string;
  relative_path: string;
  status: "change_proposed" | "already_installed";
  before_digest: string | null;
  after_digest: string;
  after_content: string;
  preview_digest: string;
}

export interface HostBridgeApproval {
  approval_id: string;
  preview_digest: string;
  status: "current" | "revoked" | "expired";
}

export interface HostBridgeReceipt {
  approval_id: string;
  relative_path: string;
  after_digest: string;
  receipt_digest: string;
}

export async function planHostBridge(
  projectRoot: string,
  host: HostKind,
): Promise<HostBridgePreview> {
  const relativePath = hostPaths[host];
  const current = await readIfPresent(join(projectRoot, relativePath));
  const alreadyInstalled = current?.includes("<!-- contentmd:bridge:start -->") ?? false;
  const prefix = current === null || current.length === 0 ? "" : current.endsWith("\n") ? current : `${current}\n`;
  const afterContent = alreadyInstalled ? (current ?? "") : `${prefix}${prefix.length > 0 ? "\n" : ""}${bridgeBlock}`;
  const preimage = {
    host,
    project_root: projectRoot,
    relative_path: relativePath,
    status: alreadyInstalled ? ("already_installed" as const) : ("change_proposed" as const),
    before_digest: current === null ? null : sha256Text(current),
    after_digest: sha256Text(afterContent),
    after_content: afterContent,
  };
  return { ...preimage, preview_digest: sha256Canonical(preimage) };
}

export async function installHostBridge(
  preview: HostBridgePreview,
  approval: HostBridgeApproval,
): Promise<HostBridgeReceipt> {
  if (
    preview.status !== "change_proposed" ||
    approval.status !== "current" ||
    approval.preview_digest !== preview.preview_digest
  ) {
    throw new Error("host_bridge_approval_mismatch");
  }
  const target = join(preview.project_root, preview.relative_path);
  const current = await readIfPresent(target);
  const currentDigest = current === null ? null : sha256Text(current);
  if (currentDigest !== preview.before_digest) throw new Error("host_bridge_source_changed");
  if (sha256Text(preview.after_content) !== preview.after_digest) {
    throw new Error("host_bridge_preview_integrity_failure");
  }

  await mkdir(dirname(target), { recursive: true });
  const temporaryPath = join(
    dirname(target),
    `.${basename(target)}.contentmd-${process.pid}.tmp`,
  );
  await writeFile(temporaryPath, preview.after_content, { encoding: "utf8", flag: "wx" });
  try {
    await rename(temporaryPath, target);
  } catch (error) {
    await unlink(temporaryPath);
    throw error;
  }

  const receiptPreimage = {
    approval_id: approval.approval_id,
    relative_path: preview.relative_path,
    after_digest: preview.after_digest,
  };
  return {
    ...receiptPreimage,
    receipt_digest: sha256Canonical(receiptPreimage),
  };
}

export interface ReminderRequest {
  task_id: string;
  material_content_work: boolean;
  content_contract_loaded: boolean;
}

export class ReminderTracker {
  readonly #seen = new Set<string>();
  readonly #acknowledged = new Set<string>();

  acknowledge(taskId: string): void {
    this.#acknowledged.add(taskId);
  }

  remind(request: ReminderRequest): string | null {
    if (
      !request.material_content_work ||
      request.content_contract_loaded ||
      this.#seen.has(request.task_id) ||
      this.#acknowledged.has(request.task_id)
    ) {
      return null;
    }
    this.#seen.add(request.task_id);
    return "Run /contentmd before changing user-facing content so the project context, content decisions, and review rules are applied.";
  }
}

export function canonicalHostBridgeBlock(): string {
  return canonicalJson({ bridge: bridgeBlock });
}
