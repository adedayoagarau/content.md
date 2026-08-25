import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = fileURLToPath(new URL("../", import.meta.url));
const packagesRoot = new URL("../packages/", import.meta.url);
const packageDirectories = (await readdir(packagesRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const manifests = new Map();
for (const directory of packageDirectories) {
  const manifestPath = new URL(`../packages/${directory}/package.json`, import.meta.url);
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  if (manifests.has(manifest.name)) {
    throw new Error(`Duplicate workspace package name: ${manifest.name}`);
  }
  manifests.set(manifest.name, { directory, manifest });
}

const importPattern = /(?:from\s+|import\s*\()\s*["'](@contentmd\/[^"'/]+)["']/g;
const errors = [];

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
    if (entry.isFile() && entry.name.endsWith(".ts")) files.push(path);
  }
  return files;
}

for (const [packageName, { directory, manifest }] of manifests) {
  const declared = new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {}),
  ]);
  const src = fileURLToPath(new URL(`../packages/${directory}/src/`, import.meta.url));
  for (const file of await sourceFiles(src)) {
    const source = await readFile(file, "utf8");
    if (/\bSqliteEventStore\b/.test(source)
      && packageName !== "@contentmd/memory"
      && packageName !== "@contentmd/runtime-local") {
      errors.push(`${relative(workspaceRoot, file)} constructs or imports raw SqliteEventStore`);
    }
    for (const match of source.matchAll(importPattern)) {
      const importedPackage = match[1];
      if (importedPackage !== packageName && !declared.has(importedPackage)) {
        errors.push(
          `${relative(workspaceRoot, file)} imports ${importedPackage} without declaring it`,
        );
      }
      if (!manifests.has(importedPackage)) {
        errors.push(`${relative(workspaceRoot, file)} imports unknown ${importedPackage}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Package boundary check passed for ${manifests.size} packages.`);
