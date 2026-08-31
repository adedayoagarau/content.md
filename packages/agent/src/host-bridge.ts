import {
  lstat,
  mkdir,
  readFile,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { basename, dirname, isAbsolute, join, normalize } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";

export type HostKind = "agents" | "claude" | "codex" | "gemini" | "copilot";

const hostPaths: Record<HostKind, string> = {
  agents: "AGENTS.md",
  claude: "CLAUDE.md",
  codex: "CODEX.md",
  gemini: "GEMINI.md",
  copilot: ".github/copilot-instructions.md",
};

const hostPathAliases: Record<HostKind, readonly string[]> = {
  agents: ["AGENTS.md", "agents.md"],
  claude: ["CLAUDE.md", "claude.md"],
  codex: ["CODEX.md", "codex.md"],
  gemini: ["GEMINI.md", "gemini.md"],
  copilot: [".github/copilot-instructions.md"],
};

export const HOST_BRIDGE_VERSION = "0.2.0" as const;

const bridgeBody = `## content.md\n\nFor material user-facing content work, load \`CONTENT.md\` and the relevant structured records before proposing a change. Run \`contentmd doctor\` when the contract or governance state is unclear. A content proposal never grants mutation, approval, release, or publication authority.\n\nIf the contract is not loaded, ask the user to run \`contentmd doctor\` before changing user-facing content. Do this at most once per task and do not interrupt unrelated engineering work.\n`;
const bridgeBodyDigest = sha256Text(bridgeBody);
const bridgeStartMarker = `<!-- contentmd:bridge:start version="${HOST_BRIDGE_VERSION}" digest="${bridgeBodyDigest}" -->`;
const bridgeEndMarker = "<!-- contentmd:bridge:end -->";
const bridgeBlock = `${bridgeStartMarker}\n${bridgeBody}${bridgeEndMarker}\n`;
const bridgeStartPattern = /<!-- contentmd:bridge:start(?: [^>]*)? -->/g;
const bridgeEndPattern = /<!-- contentmd:bridge:end -->/g;
const bridgeBlockPattern = /<!-- contentmd:bridge:start(?: [^>]*)? -->\n?[\s\S]*?<!-- contentmd:bridge:end -->\n?/;

function sha256Text(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

async function readIfPresent(path: string): Promise<string | null> {
  try {
    const stat = await lstat(path);
    if (stat.isSymbolicLink()) throw new Error(`host_bridge_symlink_unsupported:${path}`);
    return await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export interface HostBridgePreview {
  host: HostKind;
  project_root: string;
  relative_path: string;
  status: "change_proposed" | "current" | "outdated" | "malformed";
  before_digest: string | null;
  after_digest: string;
  after_content: string;
  preview_digest: string;
}

function validatedRelativePath(host: HostKind, requestedRelativePath?: string): string {
  const relativePath = requestedRelativePath ?? hostPaths[host];
  const normalized = normalize(relativePath);
  if (
    isAbsolute(relativePath) ||
    normalized === ".." ||
    normalized.startsWith("../") ||
    normalized !== relativePath
  ) {
    throw new Error(`host_bridge_invalid_path:${relativePath}`);
  }
  if (host === "copilot") {
    if (relativePath !== hostPaths.copilot) throw new Error(`host_bridge_invalid_path:${relativePath}`);
    return relativePath;
  }
  if (!hostPathAliases[host].map((path) => basename(path)).includes(basename(relativePath))) {
    throw new Error(`host_bridge_invalid_path:${relativePath}`);
  }
  return relativePath;
}

function bridgeState(current: string | null): {
  status: HostBridgePreview["status"];
  afterContent: string;
} {
  if (current === null || current.length === 0) {
    return { status: "change_proposed", afterContent: bridgeBlock };
  }
  const starts = current.match(bridgeStartPattern) ?? [];
  const ends = current.match(bridgeEndPattern) ?? [];
  if (starts.length === 0 && ends.length === 0) {
    const prefix = current.endsWith("\n") ? current : `${current}\n`;
    return { status: "change_proposed", afterContent: `${prefix}\n${bridgeBlock}` };
  }
  if (starts.length !== 1 || ends.length !== 1) {
    return { status: "malformed", afterContent: current };
  }
  const match = current.match(bridgeBlockPattern);
  if (match === null) return { status: "malformed", afterContent: current };
  if (match[0] === bridgeBlock) return { status: "current", afterContent: current };
  return {
    status: "outdated",
    afterContent: current.replace(bridgeBlockPattern, bridgeBlock),
  };
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

export interface HostBridgeRemovalPreview {
  host: HostKind;
  project_root: string;
  relative_path: string;
  status: "removal_proposed" | "absent" | "malformed";
  before_digest: string | null;
  after_digest: string | null;
  after_content: string | null;
  delete_file: boolean;
  preview_digest: string;
}

export async function planHostBridgeRemoval(
  projectRoot: string,
  host: HostKind,
  requestedRelativePath?: string,
): Promise<HostBridgeRemovalPreview> {
  const relativePath = validatedRelativePath(host, requestedRelativePath);
  const current = await readIfPresent(join(projectRoot, relativePath));
  const starts = current?.match(bridgeStartPattern) ?? [];
  const ends = current?.match(bridgeEndPattern) ?? [];
  const match = current?.match(bridgeBlockPattern) ?? null;
  const status: HostBridgeRemovalPreview["status"] = current === null || (starts.length === 0 && ends.length === 0)
    ? "absent"
    : starts.length !== 1 || ends.length !== 1 || match === null
      ? "malformed"
      : "removal_proposed";
  const afterContent = status === "removal_proposed" && current !== null && match !== null
    ? current.replace(match[0], "")
    : null;
  const preimage = {
    host,
    project_root: projectRoot,
    relative_path: relativePath,
    status,
    before_digest: current === null ? null : sha256Text(current),
    after_digest: afterContent === null ? null : sha256Text(afterContent),
    after_content: afterContent,
    delete_file: afterContent === "",
  };
  return { ...preimage, preview_digest: sha256Canonical(preimage) };
}

export async function removeHostBridge(
  preview: HostBridgeRemovalPreview,
  approval: HostBridgeApproval,
): Promise<HostBridgeReceipt> {
  if (
    preview.status !== "removal_proposed" ||
    approval.status !== "current" ||
    approval.preview_digest !== preview.preview_digest
  ) {
    throw new Error("host_bridge_removal_approval_mismatch");
  }
  const target = join(preview.project_root, preview.relative_path);
  const current = await readIfPresent(target);
  if (current === null || sha256Text(current) !== preview.before_digest) {
    throw new Error("host_bridge_source_changed");
  }
  if (preview.after_content === null || sha256Text(preview.after_content) !== preview.after_digest) {
    throw new Error("host_bridge_preview_integrity_failure");
  }
  if (preview.delete_file) {
    await unlink(target);
  } else {
    const temporaryPath = join(dirname(target), `.${basename(target)}.contentmd-${process.pid}.tmp`);
    await writeFile(temporaryPath, preview.after_content, { encoding: "utf8", flag: "wx" });
    try {
      await rename(temporaryPath, target);
    } catch (error) {
      await unlink(temporaryPath);
      throw error;
    }
  }
  const receiptPreimage = {
    approval_id: approval.approval_id,
    relative_path: preview.relative_path,
    after_digest: preview.after_digest ?? sha256Text(""),
  };
  return { ...receiptPreimage, receipt_digest: sha256Canonical(receiptPreimage) };
}

export async function planHostBridge(
  projectRoot: string,
  host: HostKind,
  requestedRelativePath?: string,
): Promise<HostBridgePreview> {
  const relativePath = validatedRelativePath(host, requestedRelativePath);
  const current = await readIfPresent(join(projectRoot, relativePath));
  const state = bridgeState(current);
  const preimage = {
    host,
    project_root: projectRoot,
    relative_path: relativePath,
    status: state.status,
    before_digest: current === null ? null : sha256Text(current),
    after_digest: sha256Text(state.afterContent),
    after_content: state.afterContent,
  };
  return { ...preimage, preview_digest: sha256Canonical(preimage) };
}

export async function installHostBridge(
  preview: HostBridgePreview,
  approval: HostBridgeApproval,
): Promise<HostBridgeReceipt> {
  if (
    !["change_proposed", "outdated"].includes(preview.status) ||
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
    return "Run `contentmd doctor` before changing user-facing content so the project context, content decisions, and review rules are applied.";
  }
}

export function canonicalHostBridgeBlock(): string {
  return canonicalJson({ version: HOST_BRIDGE_VERSION, digest: bridgeBodyDigest, bridge: bridgeBlock });
}
