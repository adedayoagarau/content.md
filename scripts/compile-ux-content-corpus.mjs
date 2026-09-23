#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalJson, compileUxContentCorpus } from "./lib/ux-content-corpus.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));

if (args.has("--help") || args.has("-h")) {
  process.stdout.write([
    "Usage: node scripts/compile-ux-content-corpus.mjs [--check]",
    "",
    "Without --check, rebuild deterministic metadata-only projections.",
    "With --check, compare checked-in projections with a fresh in-memory build.",
    "Reported corpus defects are fail-closed data, not a compiler failure.",
    "",
  ].join("\n"));
  process.exit(0);
}

const unknown = [...args].filter((arg) => arg !== "--check");
if (unknown.length > 0) {
  process.stderr.write(`Unknown option: ${unknown.join(", ")}\n`);
  process.exit(2);
}

try {
  const result = await compileUxContentCorpus({ check: args.has("--check"), repositoryRoot: ROOT });
  process.stdout.write(canonicalJson(result));
  if (!result.ok) process.exitCode = 1;
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
}
