import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  ReminderTracker,
  installHostBridge,
  planHostBridge,
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
    expect(preview.after_content).toContain("<!-- contentmd:bridge:start -->");

    const receipt = await installHostBridge(preview, {
      approval_id: "approval.fixture.bridge.001",
      preview_digest: preview.preview_digest,
      status: "current",
    });

    expect(receipt.relative_path).toBe("AGENTS.md");
    expect(await readFile(join(root, "AGENTS.md"), "utf8")).toBe(preview.after_content);
    expect((await planHostBridge(root, "agents")).status).toBe("already_installed");
  });

  it("emits one dismissible reminder only for relevant unloaded content work", () => {
    const tracker = new ReminderTracker();
    const request = {
      task_id: "task.fixture.content.001",
      material_content_work: true,
      content_contract_loaded: false,
    };

    expect(tracker.remind(request)).toBe(
      "Run /contentmd before changing user-facing content so the project context, content decisions, and review rules are applied.",
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
});
