#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

function scalar(left, right) {
  const leftPoints = [...left].map((character) => character.codePointAt(0));
  const rightPoints = [...right].map((character) => character.codePointAt(0));
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] - rightPoints[index];
  }
  return leftPoints.length - rightPoints.length;
}
function canonical(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  return `{${Object.keys(value).sort(scalar).map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
}
function digest(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function canonicalDigest(value) { return digest(Buffer.from(`${canonical(value)}\n`)); }

async function enumerate(root) {
  const batches = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}-batch-\d+$/u.test(entry.name)).map((entry) => entry.name).sort(scalar);
  const files = [];
  for (const batch of batches) for (const entry of (await readdir(path.join(root, batch), { withFileTypes: true })).filter((item) => item.isFile()).map((item) => item.name).sort(scalar)) files.push(`${batch}/${entry}`);
  return files;
}

export async function generateImmutableBaseline(root) {
  const entries = [];
  for (const relative of await enumerate(root)) {
    const bytes = await readFile(path.join(root, relative));
    entries.push({ path: relative, byte_length: bytes.byteLength, sha256: digest(bytes) });
  }
  const preimage = { contract_version: "contentmd.public-product-immutable-batch-baseline/0.1.0", entries, authority_effect: "none" };
  return { ...preimage, baseline_digest: canonicalDigest(preimage) };
}

export async function verifyImmutableBaseline(root, baseline) {
  if (baseline.baseline_digest !== canonicalDigest(Object.fromEntries(Object.entries(baseline).filter(([key]) => key !== "baseline_digest")))) throw new Error("immutable_batch_mismatch:baseline_digest");
  const current = await generateImmutableBaseline(root);
  if (canonical(current.entries) !== canonical(baseline.entries)) throw new Error("immutable_batch_mismatch:entries");
  return true;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const rootIndex = process.argv.indexOf("--root");
  const outputIndex = process.argv.indexOf("--output");
  const root = rootIndex < 0 ? "research/09-experimental/public-product-corpus" : process.argv[rootIndex + 1];
  try {
    const baseline = await generateImmutableBaseline(root);
    const bytes = `${JSON.stringify(baseline, null, 2)}\n`;
    if (outputIndex >= 0) await writeFile(process.argv[outputIndex + 1], bytes);
    else process.stdout.write(bytes);
  } catch (error) { process.stderr.write(`${error.stack ?? error.message}\n`); process.exitCode = 1; }
}
