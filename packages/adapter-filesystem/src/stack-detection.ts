import { dirname, extname } from "node:path";
import { sha256Canonical } from "@contentmd/core";
import type { RepositoryInventory, StackFact } from "@contentmd/adapter-sdk";
import { readInventoryArtifactText } from "./source-candidates.js";

const PYTHON_HINTS = new Map([
  ["fastapi", "fastapi"],
  ["flask", "flask"],
  ["django", "django"],
]);
const JS_HINTS = new Map([
  ["next", "next"],
  ["react", "react"],
  ["vite", "vite"],
]);

function workspaceRoot(manifestRef: string): string {
  const directory = dirname(manifestRef);
  return directory === "." ? "" : directory;
}

function stackId(fact: Omit<StackFact, "stack_id">): string {
  return `stack.${sha256Canonical(fact).slice(0, 24)}`;
}

function pythonHints(source: string): string[] {
  const projectSection = /^\[project\]\s*$(?<body>[\s\S]*?)(?=^\[[^\]]+\]\s*$|(?![\s\S]))/mu.exec(source)?.groups?.body ?? "";
  const dependencyBody = /^dependencies\s*=\s*\[(?<dependencies>[\s\S]*?)\]\s*$/mu.exec(projectSection)?.groups?.dependencies ?? "";
  const dependencyNames = [...dependencyBody.matchAll(/["']([a-z0-9][a-z0-9._-]*)[^"']*["']/giu)]
    .map((match) => match[1]?.toLowerCase())
    .filter((name): name is string => name !== undefined);
  return [...PYTHON_HINTS]
    .filter(([dependency]) => dependencyNames.includes(dependency))
    .map(([, hint]) => hint);
}

function packageFacts(source: string): { dependencyNames: string[]; hasTypeScript: boolean } | null {
  try {
    const parsed = JSON.parse(source) as Record<string, unknown>;
    const dependencyNames = ["dependencies", "devDependencies", "peerDependencies"]
      .flatMap((key) => {
        const value = parsed[key];
        return value !== null && typeof value === "object" && !Array.isArray(value)
          ? Object.keys(value)
          : [];
      })
      .sort((left, right) => left.localeCompare(right, "en"));
    return { dependencyNames, hasTypeScript: dependencyNames.includes("typescript") };
  } catch {
    return null;
  }
}

export async function detectStacks(inventory: RepositoryInventory): Promise<StackFact[]> {
  const stacks: StackFact[] = [];
  for (const artifact of inventory.artifacts) {
    if (artifact.relative_path === "pyproject.toml") {
      const source = await readInventoryArtifactText(inventory, artifact);
      const preimage: Omit<StackFact, "stack_id"> = {
        kind: "python",
        workspace_root: "",
        manifest_ref: artifact.relative_path,
        framework_hints: pythonHints(source),
        confidence: "high",
      };
      stacks.push({ stack_id: stackId(preimage), ...preimage });
      continue;
    }
    if (artifact.relative_path.endsWith("/pyproject.toml")) {
      const source = await readInventoryArtifactText(inventory, artifact);
      const preimage: Omit<StackFact, "stack_id"> = {
        kind: "python",
        workspace_root: workspaceRoot(artifact.relative_path),
        manifest_ref: artifact.relative_path,
        framework_hints: pythonHints(source),
        confidence: "high",
      };
      stacks.push({ stack_id: stackId(preimage), ...preimage });
      continue;
    }
    if (artifact.relative_path === "package.json" || artifact.relative_path.endsWith("/package.json")) {
      const source = await readInventoryArtifactText(inventory, artifact);
      const facts = packageFacts(source);
      if (facts === null) continue;
      const root = workspaceRoot(artifact.relative_path);
      const hasTypeScriptArtifact = inventory.artifacts.some((candidate) => {
        const inWorkspace = root === "" || candidate.relative_path.startsWith(`${root}/`);
        return inWorkspace && [".ts", ".tsx"].includes(extname(candidate.relative_path));
      });
      const preimage: Omit<StackFact, "stack_id"> = {
        kind: facts.hasTypeScript || hasTypeScriptArtifact ? "typescript" : "javascript",
        workspace_root: root,
        manifest_ref: artifact.relative_path,
        framework_hints: [...JS_HINTS]
          .filter(([dependency]) => facts.dependencyNames.includes(dependency))
          .map(([, hint]) => hint),
        confidence: "high",
      };
      stacks.push({ stack_id: stackId(preimage), ...preimage });
    }
  }
  if (stacks.length === 0) {
    const documentation = inventory.artifacts
      .filter((artifact) => /(?:^|\/)(?:readme|product|design|prd)[^/]*\.(?:md|mdx)$/iu.test(artifact.relative_path))
      .sort((left, right) => {
        const leftProduct = /(?:^|\/)product\.md$/iu.test(left.relative_path) ? 0 : 1;
        const rightProduct = /(?:^|\/)product\.md$/iu.test(right.relative_path) ? 0 : 1;
        return leftProduct - rightProduct || left.relative_path.localeCompare(right.relative_path, "en");
      })[0];
    if (documentation !== undefined) {
      const preimage: Omit<StackFact, "stack_id"> = {
        kind: "documentation",
        workspace_root: "",
        manifest_ref: documentation.relative_path,
        framework_hints: [],
        confidence: "medium",
      };
      stacks.push({ stack_id: stackId(preimage), ...preimage });
    }
  }
  return stacks.sort((left, right) => left.manifest_ref.localeCompare(right.manifest_ref, "en"));
}
