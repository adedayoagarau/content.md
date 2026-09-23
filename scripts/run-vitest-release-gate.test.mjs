import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { discoverVitestFiles, releaseGateRuns, selectReleaseGateRuns } from "./run-vitest-release-gate.mjs";

test("discovers every TypeScript test file in stable order", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "contentmd-vitest-gate-"));
  try {
    await mkdir(path.join(root, "packages/zeta/test"), { recursive: true });
    await mkdir(path.join(root, "packages/alpha/test"), { recursive: true });
    await writeFile(path.join(root, "packages/zeta/test/z.test.ts"), "");
    await writeFile(path.join(root, "packages/alpha/test/b.test.ts"), "");
    await writeFile(path.join(root, "packages/alpha/test/a.test.ts"), "");
    assert.deepEqual(await discoverVitestFiles(root), [
      "packages/alpha/test/a.test.ts",
      "packages/alpha/test/b.test.ts",
      "packages/zeta/test/z.test.ts",
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("groups light packages while isolating heavy packages and the complete learning journey", () => {
  const file = "packages/agent/test/learning-workflow.test.ts";
  const runs = releaseGateRuns([
    "packages/adapter-filesystem/test/a.test.ts",
    "packages/adapter-filesystem/test/b.test.ts",
    file,
    "packages/cli/test/scan.test.ts",
    "packages/core/test/a.test.ts",
    "packages/core/test/b.test.ts",
  ]);
  assert.equal(runs.length, 5);
  assert.deepEqual(runs.map((run) => run.files), [
    [file],
    [file],
    ["packages/cli/test/scan.test.ts"],
    ["packages/adapter-filesystem/test/a.test.ts", "packages/adapter-filesystem/test/b.test.ts"],
    ["packages/core/test/a.test.ts", "packages/core/test/b.test.ts"],
  ]);
  assert.match(runs[0].namePattern, /^\^\(\?!/u);
  assert.match(runs[1].namePattern, /runs real examples/u);
  assert.deepEqual(selectReleaseGateRuns(runs, 2), runs.slice(1));
  assert.throws(() => selectReleaseGateRuns(runs, 0), /invalid_from/);
});

test("covers every ordinary file exactly once", () => {
  const files = [
    "packages/adapter-filesystem/test/a.test.ts",
    "packages/adapter-filesystem/test/b.test.ts",
    "packages/cli/test/scan.test.ts",
    "packages/core/test/smoke.test.ts",
    "packages/learning/test/ranking.test.ts",
  ];
  const covered = releaseGateRuns(files).flatMap((run) => run.files);
  assert.deepEqual(covered.toSorted(), files.toSorted());
});
