#!/usr/bin/env node

import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const distribution = path.join(root, "distribution/contentmd");
const scratch = await mkdtemp(path.join(tmpdir(), "contentmd-distribution-"));
const npmCache = path.join(scratch, "npm-cache");
const toolchainPath = `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ""}`;

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, PATH: toolchainPath, NPM_CONFIG_CACHE: npmCache },
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed\n${result.stdout}\n${result.stderr}`);
  }
  return result.stdout;
}

async function startPackedServer(entry, args, cwd, label) {
  const child = spawn(process.execPath, [entry, ...args], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, PATH: toolchainPath },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const result = await new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => reject(new Error(`packed ${label} timeout\n${stderr}`)), 10_000);
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
      try {
        const parsed = JSON.parse(stdout);
        clearTimeout(timeout);
        resolve(parsed);
      } catch {
        // The canonical JSON envelope may arrive in more than one chunk.
      }
    });
    child.stderr.on("data", (chunk) => { stderr += String(chunk); });
    child.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.once("exit", (code) => {
      if (code !== null && code !== 0) {
        clearTimeout(timeout);
        reject(new Error(`packed ${label} exited ${code}\n${stdout}\n${stderr}`));
      }
    });
  });
  return { child, result };
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
  env: { ...process.env, PATH: toolchainPath },
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
  "--offline", "--", "contentmd", "scan", "--summary", "--root", fixture, "--json",
], consumer));
if (
  npxResult.command_id !== "scan.summary" || npxResult.data?.write_effect !== "none"
  || npxResult.data?.occurrence_count !== 1 || npxResult.data?.qualified_count !== 1
) throw new Error("local npx journey did not return the compact qualified-content summary");
const benchmarkPacketPath = path.join(scratch, "review-sample-100.json");
const benchmarkSample = JSON.parse(run(process.execPath, [
  installedEntry, "benchmark", "content-design", "--sample-out", benchmarkPacketPath, "--json",
], consumer));
const benchmarkPacket = JSON.parse(await readFile(benchmarkPacketPath, "utf8"));
if (
  benchmarkSample.command_id !== "benchmark.content-design.sample"
  || benchmarkPacket.sample_count !== 100
  || benchmarkPacket.packet_digest !== "99810c8924715b8e10aa04e3f49e3e804b59e4154c538f4a2da15c825f4a3d2b"
  || JSON.stringify(benchmarkPacket).includes("generator_label")
) throw new Error("installed package did not create the expected blinded content-design packet");
const benchmarkPredictionsPath = path.join(scratch, "contentmd-predictions.json");
const benchmarkPredictions = JSON.parse(run(process.execPath, [
  installedEntry, "benchmark", "content-design", "--packet", benchmarkPacketPath,
  "--out", benchmarkPredictionsPath, "--json",
], consumer));
if (
  benchmarkPredictions.command_id !== "benchmark.content-design"
  || benchmarkPredictions.data?.prediction_count !== 100
  || benchmarkPredictions.data?.evaluation_status !== "unscored_pending_qualified_gold"
  || benchmarkPredictions.data?.label_access !== "blind_packet_only"
) throw new Error("installed package did not produce blind packet-bound predictions");
const benchmarkReviewPath = path.join(scratch, "content-design-review.json");
const benchmarkReview = JSON.parse(run(process.execPath, [
  installedEntry, "benchmark", "content-design", "--packet", benchmarkPacketPath,
  "--review-template", benchmarkReviewPath, "--json",
], consumer));
const benchmarkReviewTemplate = JSON.parse(await readFile(benchmarkReviewPath, "utf8"));
if (
  benchmarkReview.command_id !== "benchmark.content-design.review-template"
  || benchmarkReviewTemplate.responses?.length !== 100
  || benchmarkReviewTemplate.submission_state !== "incomplete"
  || benchmarkReviewTemplate.reviewer?.independent_review_attested !== false
) throw new Error("installed package did not create a reviewer-blank content-design template");
const benchmarkReviewWorkbench = await startPackedServer(installedEntry, [
  "benchmark", "content-design", "--packet", benchmarkPacketPath,
  "--review-workbench", "--port", "0", "--json",
], consumer, "content-design review workbench");
try {
  const response = await fetch(benchmarkReviewWorkbench.result.data.url);
  const html = await response.text();
  const reviewDataResponse = await fetch(new URL("review-data.json", benchmarkReviewWorkbench.result.data.url));
  const reviewDataText = await reviewDataResponse.text();
  const reviewData = JSON.parse(reviewDataText);
  if (
    response.status !== 200 || !html.includes("Judge the meaning, not the generator")
    || !html.includes("<dt>State</dt>") || !html.includes("Export completed review")
    || reviewDataResponse.status !== 200 || reviewData.packet?.sample_count !== 100
    || reviewDataText.includes("generator_label")
  ) throw new Error("packed content-design review workbench did not render the blinded review flow");
} finally {
  benchmarkReviewWorkbench.child.kill("SIGTERM");
  if (benchmarkReviewWorkbench.child.exitCode === null) {
    await new Promise((resolve) => benchmarkReviewWorkbench.child.once("exit", resolve));
  }
}
const packedWorkbench = await startPackedServer(installedEntry, [
  "serve", "--root", fixture, "--port", "0", "--json",
], consumer, "workbench");
try {
  if (packedWorkbench.result.command_id !== "serve" || packedWorkbench.result.data?.write_effect !== "none") {
    throw new Error("packed workbench did not start with a non-mutating result");
  }
  const workbenchResponse = await fetch(packedWorkbench.result.data.url);
  const workbenchHtml = await workbenchResponse.text();
  if (
    workbenchResponse.status !== 200
    || !workbenchHtml.includes("Improve the highest-priority content issue")
    || !workbenchHtml.includes("Preview mode")
    || !workbenchHtml.includes("npx contentmd init --yes --plan-digest")
    || !workbenchHtml.includes('class="improvement-form"')
  ) throw new Error("packed workbench did not render the first-run product flow");
} finally {
  packedWorkbench.child.kill("SIGTERM");
  if (packedWorkbench.child.exitCode === null) {
    await new Promise((resolve) => packedWorkbench.child.once("exit", resolve));
  }
}
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
const freshAdoptionPreviewResult = spawnSync(process.execPath, [
  installedEntry, "init", "--root", fixture, "--json",
], {
  cwd: consumer,
  encoding: "utf8",
  env: { ...process.env, PATH: toolchainPath },
});
if (freshAdoptionPreviewResult.status !== 20) {
  throw new Error(`fresh adoption preview returned ${freshAdoptionPreviewResult.status}\n${freshAdoptionPreviewResult.stdout}\n${freshAdoptionPreviewResult.stderr}`);
}
const freshAdoptionPreview = JSON.parse(freshAdoptionPreviewResult.stdout);
const freshPlanDigest = freshAdoptionPreview.data?.adoption?.plan_digest;
if (typeof freshPlanDigest !== "string") throw new Error("fresh adoption plan digest missing");
const adopted = JSON.parse(run(process.execPath, [
  installedEntry, "init", "--root", fixture, "--yes", "--plan-digest", freshPlanDigest, "--json",
], consumer));
if (
  adopted.command_id !== "init.apply"
  || adopted.data?.plan_digest !== freshPlanDigest
  || !adopted.data?.created_paths?.includes("CONTENT.md")
  || !adopted.data?.created_paths?.includes(".contentmd/manifest.json")
) throw new Error("installed package did not apply the exact approved adoption plan");
for (const relativePath of [
  "CONTENT.md",
  ".contentmd/manifest.json",
  ".contentmd/governance/starter-policy.yaml",
  ".contentmd/records/repository-model.json",
]) {
  await readFile(path.join(fixture, relativePath), "utf8");
}
if ((await readFile(path.join(fixture, "src/App.tsx"), "utf8")) !== fixtureSource) {
  throw new Error("repository adoption changed product source");
}
const doctor = JSON.parse(run(process.execPath, [
  installedEntry, "doctor", "--root", fixture, "--json",
], consumer));
if (doctor.command_id !== "doctor" || doctor.data?.overall_status === "not_adopted") {
  throw new Error("adopted fixture still reports not adopted");
}
const uninstallPreview = JSON.parse(run(process.execPath, [
  installedEntry, "uninstall", "--root", fixture, "--preview", "--json",
], consumer));
if (
  uninstallPreview.command_id !== "uninstall.preview"
  || !uninstallPreview.data?.owned_files?.includes("CONTENT.md")
  || JSON.stringify(uninstallPreview.data).includes("src/App.tsx")
) throw new Error("installed package did not produce a bounded uninstall preview");
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
  content_design_sample_count: benchmarkPacket.sample_count,
  content_design_packet_digest: benchmarkPacket.packet_digest,
  content_design_predictions_completed: true,
  content_design_review_template_completed: true,
  content_design_review_workbench_completed: true,
  packed_workbench_completed: true,
  qualification_review_sample_completed: true,
  qualification_review_evaluation_completed: true,
  regular_user_patch_applied: true,
  regular_user_patch_undone: true,
  exact_adoption_applied: true,
  adopted_doctor_status: doctor.data.overall_status,
  bounded_uninstall_preview_completed: true,
  scan_write_effect: npxResult.data.write_effect,
  qualified_content_count: npxResult.data.qualified_count,
  clean_uninstall_verified: true,
}, null, 2));
