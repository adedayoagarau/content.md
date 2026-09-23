#!/usr/bin/env node

import { mkdtemp, readFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const distribution = path.join(root, "distribution/contentmd");
const manifest = JSON.parse(await readFile(path.join(distribution, "package.json"), "utf8"));
const publishWorkflow = await readFile(path.join(root, ".github/workflows/publish-npm.yml"), "utf8");
const verificationWorkflow = await readFile(path.join(root, ".github/workflows/verify.yml"), "utf8");
const npmCache = await mkdtemp(path.join(tmpdir(), "contentmd-release-npm-cache-"));
const toolchainPath = `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ""}`;

for (const requiredFile of [
  "SECURITY.md",
  "CONTRIBUTING.md",
  "docs/content-design-standard.md",
  "docs/public-api.md",
  "docs/tests/fixtures/content-design-authored-challenges/README.md",
  "docs/tests/fixtures/content-design-disagreement-pilot/README.md",
  "docs/tests/fixtures/content-design-disagreement-pilot/REVIEWER-PROMPT.md",
  "docs/verification/content-design-benchmark-10000.md",
  "docs/verification/content-design-external-model-audit-10000.md",
  "docs/verification/host-agent-acceptance-0.1.md",
  "docs/verification/open-source-security-0.1.md",
]) {
  const contents = await readFile(path.join(root, requiredFile), "utf8");
  if (contents.trim().length === 0) fail(`empty_release_document_${requiredFile}`);
}

function fail(message) {
  throw new Error(`contentmd_release_invalid:${message}`);
}

function run(command, args, cwd = root) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, PATH: toolchainPath, NPM_CONFIG_CACHE: npmCache },
  });
  if (result.status !== 0) fail(`${command}_${args[0] ?? "command"}_failed\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

try {
if (manifest.name !== "contentmd") fail("package_name");
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u.test(manifest.version)) fail("package_version");
if (manifest.private === true) fail("package_private");
if (manifest.license !== "Apache-2.0") fail("license");
if (manifest.bin?.contentmd !== "dist/contentmd.cjs") fail("binary");
if (manifest.repository?.url !== "git+https://github.com/adedayoagarau/content.md.git") fail("repository");
if (manifest.publishConfig?.access !== "public") fail("public_access");
if (manifest.engines?.node !== ">=24.14.0 <25") fail("node_engine");

const requiredPublishGates = [
  "pnpm build",
  "pnpm test",
  "pnpm lint",
  "pnpm verify:foundation",
  "pnpm verify:learning",
  "pnpm verify:content-design-benchmark",
  "pnpm verify:content-design-challenges",
  "pnpm verify:host-agents",
  "pnpm test:distribution",
  "pnpm verify:security",
  "pnpm verify:release",
];
function workflowRunCommands(workflow) {
  return [...workflow.matchAll(/^\s+run:\s*([^#\r\n]+?)\s*$/gmu)]
    .map((match) => match[1].trim());
}
const publishRunCommandList = workflowRunCommands(publishWorkflow);
const verificationRunCommandList = workflowRunCommands(verificationWorkflow);
const publishRunCommands = new Set(publishRunCommandList);
const verificationRunCommands = new Set(verificationRunCommandList);
for (const requiredGate of requiredPublishGates) {
  if (!publishRunCommands.has(requiredGate)) fail(`publish_workflow_missing_${requiredGate.replaceAll(" ", "_").replaceAll(":", "_")}`);
  if (!verificationRunCommands.has(requiredGate)) fail(`verification_workflow_missing_${requiredGate.replaceAll(" ", "_").replaceAll(":", "_")}`);
}
function verifyGateOrder(workflowName, commands) {
  let previous = -1;
  for (const gate of requiredPublishGates) {
    const index = commands.indexOf(gate);
    if (index <= previous) fail(`${workflowName}_workflow_gate_order_${gate.replaceAll(" ", "_").replaceAll(":", "_")}`);
    previous = index;
  }
}
verifyGateOrder("publish", publishRunCommandList);
verifyGateOrder("verification", verificationRunCommandList);
function verifyPinnedActions(workflowName, workflow) {
  const actions = [...workflow.matchAll(/^\s*uses:\s*([^\s#]+)/gmu)].map((match) => match[1]);
  if (actions.length === 0) fail(`${workflowName}_workflow_missing_actions`);
  for (const action of actions) {
    const revision = action.split("@").at(-1) ?? "";
    if (!/^[0-9a-f]{40}$/u.test(revision)) fail(`${workflowName}_workflow_mutable_action_${action}`);
  }
  return actions;
}
const actionUses = verifyPinnedActions("publish", publishWorkflow);
const verificationActionUses = verifyPinnedActions("verification", verificationWorkflow);
if (!/^permissions:\r?\n  contents: read\s*$/mu.test(verificationWorkflow)
  || /^\s+[a-z-]+:\s*write\s*$/mu.test(verificationWorkflow)) fail("verification_workflow_permissions");

const expectedTag = `v${manifest.version}`;
// The publication workflow opts into tag validation; generic GitHub refs also name branches and PR merges.
const suppliedTag = process.env.CONTENTMD_RELEASE_TAG;
if (suppliedTag !== undefined && suppliedTag !== expectedTag) fail(`tag_expected_${expectedTag}_received_${suppliedTag}`);
const headCommit = run("git", ["rev-parse", "HEAD"]).trim();
let releaseTagCommit = null;
if (suppliedTag !== undefined) {
  releaseTagCommit = run("git", ["rev-list", "-n", "1", `refs/tags/${suppliedTag}`]).trim();
  if (!/^[0-9a-f]{40}$/u.test(releaseTagCommit)) fail(`tag_unresolved_${suppliedTag}`);
  if (releaseTagCommit !== headCommit) fail(`tag_${suppliedTag}_points_to_${releaseTagCommit}_not_head_${headCommit}`);
}

const npmVersion = run("npm", ["--version"]).trim();
const [npmMajor, npmMinor] = npmVersion.split(".").map(Number);
if (!Number.isInteger(npmMajor) || !Number.isInteger(npmMinor) || npmMajor < 11 || (npmMajor === 11 && npmMinor < 5)) {
  fail(`npm_11_5_1_required_received_${npmVersion}`);
}

run(process.execPath, [path.join(root, "scripts/build-contentmd-distribution.mjs")]);
const sourceReadme = await readFile(path.join(root, "README.md"), "utf8");
const packagedReadme = await readFile(path.join(distribution, "README.md"), "utf8");
if (packagedReadme !== sourceReadme) fail("packaged_readme_stale");
for (const repositoryOnlyTarget of ["docs/", "CONTRIBUTING.md", "SECURITY.md"]) {
  if (packagedReadme.includes(`](${repositoryOnlyTarget}`)) {
    fail(`packaged_readme_missing_target_${repositoryOnlyTarget.replaceAll("/", "_")}`);
  }
}
const dryRun = JSON.parse(run("npm", ["publish", "--dry-run", "--json"], distribution));
const published = Array.isArray(dryRun)
  ? dryRun[0]
  : dryRun[manifest.name] ?? dryRun;
const files = (published.files ?? []).map((item) => item.path).sort();
const expectedFiles = ["LICENSE", "README.md", "dist/contentmd.cjs", "package.json"];
if (JSON.stringify(files) !== JSON.stringify(expectedFiles)) fail(`package_files_${files.join(",")}`);
if (published.name !== manifest.name || published.version !== manifest.version) fail("dry_run_identity");

console.log(JSON.stringify({
  package: `${manifest.name}@${manifest.version}`,
  expected_tag: expectedTag,
  head_commit: headCommit,
  release_tag_commit: releaseTagCommit,
  npm_version: npmVersion,
  node_engine: manifest.engines.node,
  repository: manifest.repository.url,
  publish_access: manifest.publishConfig.access,
  publish_workflow_actions: actionUses,
  publish_workflow_gates: requiredPublishGates.map((gate) => gate.slice("pnpm ".length)),
  verification_workflow_actions: verificationActionUses,
  verification_workflow_gates: requiredPublishGates.map((gate) => gate.slice("pnpm ".length)),
  files,
  publish_effect: "none_dry_run",
  bootstrap_status: "first_authenticated_publish_required_before_trusted_publisher_binding",
}, null, 2));
} finally {
  await rm(npmCache, { recursive: true, force: true });
}
