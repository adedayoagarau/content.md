#!/usr/bin/env node

import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const distribution = path.join(root, "distribution/contentmd");
const scratch = await mkdtemp(path.join(tmpdir(), "contentmd-distribution-"));
const npmCache = path.join(scratch, "npm-cache");

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, NPM_CONFIG_CACHE: npmCache },
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed\n${result.stdout}\n${result.stderr}`);
  }
  return result.stdout;
}

run(process.execPath, [path.join(root, "scripts/build-contentmd-distribution.mjs")], root);
const packOutput = JSON.parse(run("npm", ["pack", distribution, "--json", "--pack-destination", scratch], root));
const packed = packOutput[0];
if (packed.name !== "contentmd" || packed.version !== "0.1.0") throw new Error("unexpected package identity");
if (!packed.files.some(({ path: file }) => file === "dist/contentmd.cjs")) throw new Error("binary missing from tarball");
if (packed.files.some(({ path: file }) => file.startsWith("packages/") || file.startsWith("research/"))) {
  throw new Error("repository internals leaked into tarball");
}
const packageManifest = JSON.parse(await readFile(path.join(distribution, "package.json"), "utf8"));
if (
  packageManifest.license !== "Apache-2.0" || packageManifest.engines?.node !== ">=24.14.0 <25"
  || packageManifest.repository?.url !== "git+https://github.com/adedayoagarau/content.md.git"
  || packageManifest.publishConfig?.access !== "public"
) throw new Error("public package metadata incomplete");

const consumer = path.join(scratch, "consumer");
await mkdir(consumer);
await writeFile(path.join(consumer, "package.json"), '{"name":"contentmd-smoke-consumer","private":true}\n');
const tarball = path.join(scratch, packed.filename);
run("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarball], consumer);
const binary = path.join(consumer, "node_modules/.bin/contentmd");
const installedEntry = path.join(consumer, "node_modules/contentmd/dist/contentmd.cjs");
const help = run(process.execPath, [installedEntry, "--help"], consumer);
if (!help.includes("init") || !help.includes("serve") || !help.includes("task") || !help.includes("undo")) {
  throw new Error("installed CLI help is missing core commands");
}

const fixture = path.join(scratch, "fixture");
await mkdir(path.join(fixture, "src"), { recursive: true });
await writeFile(path.join(fixture, "package.json"), '{"name":"contentmd-smoke-fixture","private":true}\n');
const fixtureSource = 'export function App() { return <main><p>Payment failed.</p></main>; }\n';
await writeFile(path.join(fixture, "src/App.tsx"), fixtureSource);
const previewResult = spawnSync(process.execPath, [installedEntry, "init", "--root", fixture, "--json"], {
  cwd: consumer,
  encoding: "utf8",
});
if (previewResult.status !== 20) {
  throw new Error(`init preview returned ${previewResult.status}\n${previewResult.stdout}\n${previewResult.stderr}`);
}
const preview = JSON.parse(previewResult.stdout);
if (preview.status !== "blocked_by_evidence"
  || preview.data?.adoption?.status !== "ready_for_local_approval"
  || typeof preview.data?.adoption?.plan_digest !== "string") {
  throw new Error("installed CLI did not produce a digest-bound init preview");
}
if ((await readFile(path.join(fixture, "src/App.tsx"), "utf8")) !== fixtureSource) {
  throw new Error("init preview mutated the fixture");
}

const bare = run(process.execPath, [installedEntry], fixture);
if (!bare.includes("scan.summary: completed") || !bare.includes("qualified content:") || !bare.includes("write effect: none (preview only)")) {
  throw new Error(`installed bare command did not run the regular-user scan\n${bare}`);
}
const npxResult = JSON.parse(run("npx", [
  "--no-install", "contentmd", "scan", "--summary", "--root", fixture, "--json",
], consumer));
if (
  npxResult.command_id !== "scan.summary" || npxResult.data?.write_effect !== "none"
  || npxResult.data?.occurrence_count !== 1 || npxResult.data?.qualified_count !== 1
) throw new Error("local npx journey did not return the compact qualified-content summary");
const improvement = JSON.parse(run(process.execPath, [
  installedEntry, "scan", "--root", fixture, "--improve", "1", "--json",
], consumer));
const contextPath = path.join(scratch, "improvement-context.json");
await writeFile(contextPath, JSON.stringify({
  finding_ref: improvement.data.improvement_brief.finding_ref,
  facts: Object.fromEntries(improvement.data.improvement_brief.required_facts.map((fact) => [fact, `Fixture fact: ${fact}`])),
  provenance: "user_supplied",
  authority_effect: "none",
}));
const candidate = "Payment failed. Check your details and try again.";
const patchPreview = JSON.parse(run(process.execPath, [
  installedEntry, "scan", "--root", fixture, "--improve", "1", "--context", contextPath,
  "--candidate", candidate, "--preview-patch", "--json",
], consumer));
const transactionDigest = patchPreview.data.patch_preview?.transaction_digest;
if (typeof transactionDigest !== "string") throw new Error("installed package did not preview the regular-user patch");
const applied = JSON.parse(run(process.execPath, [
  installedEntry, "scan", "--root", fixture, "--improve", "1", "--context", contextPath,
  "--candidate", candidate, "--apply-patch", transactionDigest, "--yes", "--json",
], consumer));
if (
  applied.command_id !== "scan.apply-improvement" || applied.data?.applied_change?.readback_verified !== true
  || applied.data?.write_effect !== "local_source_mutation" || typeof applied.audit_ref !== "string"
  || !(await readFile(path.join(fixture, "src/App.tsx"), "utf8")).includes(candidate)
) throw new Error("installed package did not apply the confirmed regular-user patch");
const undone = JSON.parse(run(process.execPath, [
  installedEntry, "undo", "--root", fixture, "--transaction", transactionDigest, "--yes", "--json",
], consumer));
if (
  undone.command_id !== "undo.regular-user-improvement" || undone.data?.readback_verified !== true
  || (await readFile(path.join(fixture, "src/App.tsx"), "utf8")) !== fixtureSource
) throw new Error("installed package did not restore the regular-user patch");
const reviewPath = path.join(scratch, "qualification-review.json");
const reviewSample = JSON.parse(run(process.execPath, [
  installedEntry, "scan", "--root", fixture, "--review-sample", "10",
  "--review-output", reviewPath, "--json",
], consumer));
const reviewPacket = JSON.parse(await readFile(reviewPath, "utf8"));
if (
  reviewSample.command_id !== "scan.review-sample" || reviewPacket.sample_size !== 1
  || reviewPacket.items.some((item) => item.reviewer_qualification !== null || item.reviewer_role !== null)
) throw new Error("installed package did not create a reviewer-blank qualification packet");
for (const item of reviewPacket.items) {
  item.reviewer_qualification = item.proposed_qualification;
  item.reviewer_role = "distribution_smoke_reviewer_fixture";
  item.reviewer_notes = "Synthetic packaging smoke test; not human review evidence.";
}
await writeFile(reviewPath, JSON.stringify(reviewPacket));
const reviewEvaluation = JSON.parse(run(process.execPath, [
  installedEntry, "scan", "--root", fixture, "--evaluate-review", reviewPath, "--json",
], consumer));
if (
  reviewEvaluation.command_id !== "scan.review-evaluation"
  || reviewEvaluation.data?.review_evaluation?.evaluation?.exact_disposition_accuracy !== 1
  || reviewEvaluation.data?.review_evaluation?.authority_effect !== "none"
) throw new Error("installed package did not evaluate the completed qualification packet");
try {
  await readFile(path.join(fixture, ".contentmd/runtime/discovery.json"), "utf8");
  throw new Error("regular-user scan unexpectedly persisted discovery state");
} catch (error) {
  if ((error).code !== "ENOENT") throw error;
}
run("npm", ["uninstall", "--no-audit", "--no-fund", "contentmd"], consumer);
try {
  await readFile(installedEntry, "utf8");
  throw new Error("contentmd remained installed after clean uninstall");
} catch (error) {
  if ((error).code !== "ENOENT") throw error;
}

console.log(JSON.stringify({
  package: `${packed.name}@${packed.version}`,
  tarball_size: packed.size,
  unpacked_size: packed.unpackedSize,
  file_count: packed.entryCount,
  installed_binary: "node_modules/.bin/contentmd",
  init_preview_status: preview.data.adoption.status,
  governance_exit_code: previewResult.status,
  fixture_mutated: false,
  bare_scan_completed: true,
  local_npx_scan_completed: true,
  qualification_review_sample_completed: true,
  qualification_review_evaluation_completed: true,
  regular_user_patch_applied: true,
  regular_user_patch_undone: true,
  scan_write_effect: npxResult.data.write_effect,
  qualified_content_count: npxResult.data.qualified_count,
  clean_uninstall_verified: true,
}, null, 2));
