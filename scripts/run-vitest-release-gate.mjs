#!/usr/bin/env node

import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const LEARNING_WORKFLOW_FILE = "packages/agent/test/learning-workflow.test.ts";

export async function discoverVitestFiles(workspaceRoot = root) {
  const entries = await readdir(path.join(workspaceRoot, "packages"), { withFileTypes: true });
  const files = [];
  for (const entry of entries.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const testRoot = path.join(workspaceRoot, "packages", entry.name, "test");
    let names;
    try {
      names = await readdir(testRoot);
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      throw error;
    }
    for (const name of names.filter((candidate) => candidate.endsWith(".test.ts")).sort()) {
      files.push(`packages/${entry.name}/test/${name}`);
    }
  }
  return files;
}

export function releaseGateRuns(files) {
  return files.flatMap((file) => file === LEARNING_WORKFLOW_FILE ? [
    { file, namePattern: "^(?!.*runs real examples, dataset, and deterministic training with one fresh durable authority per phase).*$" },
    { file, namePattern: "runs real examples, dataset, and deterministic training with one fresh durable authority per phase" },
  ] : [{ file, namePattern: null }]);
}

export function selectReleaseGateRuns(runs, from = 1) {
  if (!Number.isSafeInteger(from) || from < 1 || from > runs.length) throw new Error(`vitest_release_gate_invalid_from:${from}`);
  return runs.slice(from - 1);
}

export function runVitestReleaseGateItem(item, workspaceRoot = root) {
  const args = [path.join(workspaceRoot, "node_modules/vitest/vitest.mjs"), "run", item.file];
  if (item.namePattern !== null) args.push("-t", item.namePattern);
  const result = spawnSync(process.execPath, args, { cwd: workspaceRoot, stdio: "inherit" });
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0) throw new Error(`vitest_release_gate_failed:${item.file}:${item.namePattern ?? "all"}:${result.status ?? "signal"}`);
}

async function main() {
  const allRuns = releaseGateRuns(await discoverVitestFiles());
  const fromIndex = process.argv.indexOf("--from");
  const from = fromIndex === -1 ? 1 : Number(process.argv[fromIndex + 1]);
  const runs = selectReleaseGateRuns(allRuns, from);
  if (runs.length === 0) throw new Error("vitest_release_gate_missing");
  for (const [index, item] of runs.entries()) {
    process.stdout.write(`\n[vitest ${from + index}/${allRuns.length}] ${item.file}${item.namePattern === null ? "" : ` :: ${item.namePattern}`}\n`);
    runVitestReleaseGateItem(item);
  }
  process.stdout.write(`\nAll ${runs.length} isolated Vitest runs passed.\n`);
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
