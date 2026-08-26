import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  prepareContentTask,
  reviewIdeCandidate,
  type IdeWritingCandidate,
} from "@contentmd/agent";

const fixture = fileURLToPath(new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url));
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

async function root(): Promise<string> {
  const path = await mkdtemp(join(tmpdir(), "contentmd-task-"));
  temporaryDirectories.push(path);
  await cp(fixture, path, { recursive: true });
  return path;
}

describe("repository-derived IDE writing task", () => {
  it("prepares an exact occurrence-bound proposed task", async () => {
    const project = await root();
    const prepared = await prepareContentTask(project, {
      request: "Improve the Analyze empty state",
      target: "studio/app/analyze/page.tsx:8",
    });

    expect(prepared.task).toMatchObject({
      target_occurrence_refs: [expect.stringMatching(/^occurrence\./u)],
      voice_profile_refs: expect.any(Array),
      terminology_refs: expect.any(Array),
      decision_status: "proposed",
      authority_effect: "none",
    });
    expect(prepared.context_items.every((item) =>
      prepared.task.evidence_refs.includes(item.source_ref.record_id)
    )).toBe(true);
    expect(JSON.stringify(prepared)).not.toContain("PRIVATE_DATA_CANARY");
  });

  it("reviews a cited IDE candidate and returns an exact preview without applying it", async () => {
    const project = await root();
    const prepared = await prepareContentTask(project, {
      request: "Improve the Analyze empty state",
      target: "studio/app/analyze/page.tsx:8",
    });
    const candidate: IdeWritingCandidate = {
      contract_version: "contentmd.ide-writing-candidate/0.1.0",
      task_digest: prepared.task.task_digest,
      alternatives: [{
        candidate_id: "candidate.empty-state.001",
        text: "Choose a product and stage to begin analysis.",
        rationale: "Names the inputs needed to continue.",
        evidence_refs: prepared.task.evidence_refs,
      }],
      recommended_candidate_id: "candidate.empty-state.001",
      claimed_authority_effect: "none",
    };

    const review = await reviewIdeCandidate(project, candidate);

    expect(review).toMatchObject({
      decision_status: "proposed",
      authority_effect: "none",
      preview_diff: {
        source_artifact: "studio/app/analyze/page.tsx",
        before: "Nothing to analyze yet",
        after: "Choose a product and stage to begin analysis.",
      },
    });
  });

  it("rejects stale tasks, absent evidence, extra keys, and claimed authority", async () => {
    const project = await root();
    const prepared = await prepareContentTask(project, {
      request: "Improve the Analyze empty state",
      target: "studio/app/analyze/page.tsx:8",
    });
    const base = {
      contract_version: "contentmd.ide-writing-candidate/0.1.0",
      task_digest: prepared.task.task_digest,
      alternatives: [{
        candidate_id: "candidate.empty-state.001",
        text: "Choose a product and stage to begin analysis.",
        rationale: "Names the inputs needed to continue.",
        evidence_refs: prepared.task.evidence_refs,
      }],
      recommended_candidate_id: "candidate.empty-state.001",
      claimed_authority_effect: "none",
    } as const;

    await expect(reviewIdeCandidate(project, { ...base, task_digest: "0".repeat(64) }))
      .rejects.toThrow("ide_candidate_task_stale");
    await expect(reviewIdeCandidate(project, {
      ...base,
      alternatives: [{ ...base.alternatives[0], evidence_refs: ["source.missing"] }],
    })).rejects.toThrow("ide_candidate_evidence_invalid");
    await expect(reviewIdeCandidate(project, { ...base, claimed_authority_effect: "publish" } as any))
      .rejects.toThrow("ide_candidate_invalid");
    await expect(reviewIdeCandidate(project, { ...base, target_file: "other.tsx" } as any))
      .rejects.toThrow("ide_candidate_invalid");

    const preparedPath = join(project, ".contentmd/runtime/prepared-task.json");
    const tampered = JSON.parse(await readFile(preparedPath, "utf8"));
    tampered.request = "A different request";
    await writeFile(preparedPath, JSON.stringify(tampered), "utf8");
    await expect(reviewIdeCandidate(project, base)).rejects.toThrow("ide_candidate_task_stale");
  });

  it("does not follow a .contentmd symlink when persisting a prepared task", async () => {
    const project = await root();
    const outside = await mkdtemp(join(tmpdir(), "contentmd-task-outside-"));
    temporaryDirectories.push(outside);
    await mkdir(join(outside, "runtime"));
    await symlink(outside, join(project, ".contentmd"));

    await expect(prepareContentTask(project, {
      request: "Improve the Analyze empty state",
      target: "studio/app/analyze/page.tsx:8",
    })).rejects.toThrow("content_task_write_path_invalid");
    await expect(readFile(join(outside, "runtime/prepared-task.json"), "utf8")).rejects.toThrow();
  });
});
