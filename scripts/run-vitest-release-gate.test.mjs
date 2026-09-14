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

test("isolates the complete learning journey without dropping the remaining file", () => {
  const file = "packages/agent/test/learning-workflow.test.ts";
  const runs = releaseGateRuns(["packages/core/test/smoke.test.ts", file]);
  assert.equal(runs.length, 3);
  assert.deepEqual(runs.map((run) => run.file), ["packages/core/test/smoke.test.ts", file, file]);
  assert.match(runs[1].namePattern, /^\^\(\?!/u);
  assert.match(runs[2].namePattern, /runs real examples/u);
  assert.deepEqual(selectReleaseGateRuns(runs, 2), runs.slice(1));
  assert.throws(() => selectReleaseGateRuns(runs, 0), /invalid_from/);
});
