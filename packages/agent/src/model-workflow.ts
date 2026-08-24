import { createHash } from "node:crypto";
import { readFile, realpath } from "node:fs/promises";
import { join } from "node:path";
import { FilesystemContentAdapter, type DiscoverResult } from "@contentmd/adapter-filesystem";
import {
  compileContentContext,
  sha256Canonical,
  type ContentGraph,
  type ContextSourceDocument,
} from "@contentmd/core";

export interface CompileProjectModelRequest {
  project_root: string;
}

export interface ProjectModelResult {
  project_id: string;
  sources: ContextSourceDocument[];
  discovery: DiscoverResult;
  graph: ContentGraph;
}

function sha256Text(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function portableProjectId(packageName: string): string {
  const normalized = packageName
    .toLowerCase()
    .replace(/^@/u, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
  return `project.${normalized || "unnamed"}`;
}

async function readContextSource(
  projectRoot: string,
  locator: "DESIGN.md" | "PRODUCT.md",
): Promise<ContextSourceDocument> {
  const content = await readFile(join(projectRoot, locator), "utf8");
  const contentDigest = sha256Text(content);
  return {
    source_id: `source.${sha256Canonical({ locator, content_digest: contentDigest }).slice(0, 32)}`,
    source_type: locator === "PRODUCT.md" ? "product_document" : "design_document",
    locator,
    content_digest: contentDigest,
    content,
  };
}

export async function compileProjectModel(
  request: CompileProjectModelRequest,
): Promise<ProjectModelResult> {
  const projectRoot = await realpath(request.project_root);
  const packageDocument = JSON.parse(await readFile(join(projectRoot, "package.json"), "utf8")) as {
    name?: unknown;
  };
  const packageName = typeof packageDocument.name === "string" ? packageDocument.name : "unnamed";
  const projectId = portableProjectId(packageName);
  const sources = await Promise.all([
    readContextSource(projectRoot, "DESIGN.md"),
    readContextSource(projectRoot, "PRODUCT.md"),
  ]);
  sources.sort((left, right) => left.locator.localeCompare(right.locator));
  const discovery = await new FilesystemContentAdapter().discover({ project_root: projectRoot });
  const graph = compileContentContext({
    project_id: projectId,
    sources,
    discovery: {
      scan_digest: discovery.scan_digest,
      occurrences: discovery.occurrences,
    },
  });
  return { project_id: projectId, sources, discovery, graph };
}
