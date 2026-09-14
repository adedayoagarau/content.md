#!/usr/bin/env node

import { mkdtemp, readFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const distribution = path.join(root, "distribution/contentmd");
const manifest = JSON.parse(await readFile(path.join(distribution, "package.json"), "utf8"));
const npmCache = await mkdtemp(path.join(tmpdir(), "contentmd-release-npm-cache-"));
const toolchainPath = `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ""}`;

for (const requiredFile of ["SECURITY.md", "CONTRIBUTING.md", "docs/public-api.md"]) {
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

const expectedTag = `v${manifest.version}`;
const suppliedTag = process.env.CONTENTMD_RELEASE_TAG ?? process.env.GITHUB_REF_NAME;
if (suppliedTag !== undefined && suppliedTag !== expectedTag) fail(`tag_expected_${expectedTag}_received_${suppliedTag}`);

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
  npm_version: npmVersion,
  node_engine: manifest.engines.node,
  repository: manifest.repository.url,
  publish_access: manifest.publishConfig.access,
  files,
  publish_effect: "none_dry_run",
  bootstrap_status: "first_authenticated_publish_required_before_trusted_publisher_binding",
}, null, 2));
} finally {
  await rm(npmCache, { recursive: true, force: true });
}
