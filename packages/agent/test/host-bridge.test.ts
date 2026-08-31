import { mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  ReminderTracker,
  installHostBridge,
  planHostBridge,
  planHostBridgeRemoval,
  removeHostBridge,
} from "@contentmd/agent";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("host bridges", () => {
  it("previews and installs a bounded AGENTS.md bridge without replacing host instructions", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-host-bridge-"));
    temporaryDirectories.push(root);
    const original = "# Existing agent instructions\nPreserve this instruction.\n";
    await writeFile(join(root, "AGENTS.md"), original, "utf8");

    const preview = await planHostBridge(root, "agents");

    expect(preview.status).toBe("change_proposed");
    expect(await readFile(join(root, "AGENTS.md"), "utf8")).toBe(original);
    expect(preview.after_content).toContain(original);
    expect(preview.after_content).toContain("<!-- contentmd:bridge:start version=\"0.2.0\"");

    const receipt = await installHostBridge(preview, {
      approval_id: "approval.fixture.bridge.001",
      preview_digest: preview.preview_digest,
      status: "current",
    });

    expect(receipt.relative_path).toBe("AGENTS.md");
    expect(await readFile(join(root, "AGENTS.md"), "utf8")).toBe(preview.after_content);
    expect((await planHostBridge(root, "agents")).status).toBe("current");
  });

  it("emits one dismissible reminder only for relevant unloaded content work", () => {
    const tracker = new ReminderTracker();
    const request = {
      task_id: "task.fixture.content.001",
      material_content_work: true,
      content_contract_loaded: false,
    };

    expect(tracker.remind(request)).toBe(
      "Run `contentmd doctor` before changing user-facing content so the project context, content decisions, and review rules are applied.",
    );
    expect(tracker.remind(request)).toBeNull();

    tracker.acknowledge("task.fixture.content.002");
    expect(
      tracker.remind({
        ...request,
        task_id: "task.fixture.content.002",
      }),
    ).toBeNull();
    expect(
      tracker.remind({
        ...request,
        task_id: "task.fixture.engineering.001",
        material_content_work: false,
      }),
    ).toBeNull();
  });

  it("creates a scoped versioned bridge when no host file exists", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-host-bridge-"));
    temporaryDirectories.push(root);

    const preview = await planHostBridge(root, "agents", "apps/web/AGENTS.md");

    expect(preview).toMatchObject({
      relative_path: "apps/web/AGENTS.md",
      status: "change_proposed",
      before_digest: null,
    });
    expect(preview.after_content).toContain("version=\"0.2.0\"");
    await installHostBridge(preview, {
      approval_id: "approval.fixture.bridge.scoped",
      preview_digest: preview.preview_digest,
      status: "current",
    });
    expect((await planHostBridge(root, "agents", "apps/web/AGENTS.md")).status).toBe("current");
  });

  it("proposes an update for a legacy bridge and fails closed for malformed markers", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-host-bridge-"));
    temporaryDirectories.push(root);
    await writeFile(join(root, "AGENTS.md"), "# Existing\n\n<!-- contentmd:bridge:start -->\nOld bridge.\n<!-- contentmd:bridge:end -->\n", "utf8");

    const outdated = await planHostBridge(root, "agents");
    expect(outdated.status).toBe("outdated");
    expect(outdated.after_content).toContain("version=\"0.2.0\"");

    await writeFile(join(root, "AGENTS.md"), "# Existing\n<!-- contentmd:bridge:start -->\n", "utf8");
    const malformed = await planHostBridge(root, "agents");
    expect(malformed.status).toBe("malformed");
    await expect(installHostBridge(malformed, {
      approval_id: "approval.fixture.bridge.malformed",
      preview_digest: malformed.preview_digest,
      status: "current",
    })).rejects.toThrow("host_bridge_approval_mismatch");
  });

  it("removes only the managed block and preserves host-authored bytes", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-host-bridge-"));
    temporaryDirectories.push(root);
    const original = "# Existing agent instructions\nPreserve this instruction.\n";
    await writeFile(join(root, "AGENTS.md"), original, "utf8");
    const install = await planHostBridge(root, "agents");
    await installHostBridge(install, {
      approval_id: "approval.fixture.bridge.remove.install",
      preview_digest: install.preview_digest,
      status: "current",
    });

    const removal = await planHostBridgeRemoval(root, "agents");
    expect(removal.status).toBe("removal_proposed");
    await removeHostBridge(removal, {
      approval_id: "approval.fixture.bridge.remove",
      preview_digest: removal.preview_digest,
      status: "current",
    });
    expect(await readFile(join(root, "AGENTS.md"), "utf8")).toBe(`${original}\n`);
  });

  it("refuses to replace a symlinked host instruction file", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-host-bridge-"));
    temporaryDirectories.push(root);
    await writeFile(join(root, "shared.md"), "# Shared instructions\n", "utf8");
    await symlink("shared.md", join(root, "AGENTS.md"));

    await expect(planHostBridge(root, "agents")).rejects.toThrow("host_bridge_symlink_unsupported");
    expect(await readFile(join(root, "shared.md"), "utf8")).toBe("# Shared instructions\n");
  });
});
