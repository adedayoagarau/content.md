import { createServer, type ServerResponse } from "node:http";
import { lstat, readFile, realpath } from "node:fs/promises";
import { isAbsolute, join, relative, sep } from "node:path";
import { canonicalJson } from "@contentmd/core";
import type { ProjectModelResult, ReviewedIdeCandidate } from "@contentmd/agent";
import { projectWorkbenchModel, renderWorkbench } from "./render.js";
import { WEBMCP_MODULE } from "./webmcp.js";

const MODEL_PATH = ".contentmd/runtime/model.json";
const REVIEW_PATH = ".contentmd/runtime/task-review.json";
const CSP = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'";

export interface StartWorkbenchOptions {
  root: string;
  host?: string;
  port?: number;
}

export interface WorkbenchServer {
  url: string;
  close(): Promise<void>;
}

function controlledHeaders(contentType: string): Record<string, string> {
  return {
    "Content-Type": contentType,
    "Content-Security-Policy": CSP,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    "Origin-Agent-Cluster": "?1",
    "Permissions-Policy": "tools=(self)",
  };
}

async function fixedArtifact(root: string, relativePath: string): Promise<string> {
  const resolvedRoot = await realpath(root);
  let current = resolvedRoot;
  for (const part of relativePath.split("/")) {
    current = join(current, part);
    const stat = await lstat(current);
    if (stat.isSymbolicLink()) throw new Error("workbench_artifact_path_invalid");
    const actual = await realpath(current);
    const fromRoot = relative(resolvedRoot, actual);
    if (isAbsolute(fromRoot) || fromRoot === ".." || fromRoot.startsWith(`..${sep}`)) {
      throw new Error("workbench_artifact_path_invalid");
    }
  }
  return current;
}

async function requiredModel(root: string): Promise<ProjectModelResult> {
  let bytes: string;
  try {
    bytes = await readFile(await fixedArtifact(root, MODEL_PATH), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") throw new Error("workbench_model_missing");
    throw error;
  }
  const value = JSON.parse(bytes) as ProjectModelResult;
  if (
    value === null || typeof value !== "object" || typeof value.project_id !== "string" ||
    !Array.isArray(value.graph?.nodes) || !Array.isArray(value.graph?.edges)
  ) throw new Error("workbench_model_invalid");
  return value;
}

async function optionalReview(root: string): Promise<ReviewedIdeCandidate | null> {
  try {
    const value = JSON.parse(await readFile(await fixedArtifact(root, REVIEW_PATH), "utf8")) as ReviewedIdeCandidate;
    if (value === null || typeof value !== "object" || value.authority_effect !== "none") {
      throw new Error("workbench_task_invalid");
    }
    return value;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function send(response: ServerResponse, status: number, contentType: string, body: string, head: boolean): void {
  response.writeHead(status, controlledHeaders(contentType));
  response.end(head ? undefined : body);
}

export async function startWorkbench(options: StartWorkbenchOptions): Promise<WorkbenchServer> {
  const host = options.host ?? "127.0.0.1";
  const port = options.port ?? 4178;
  if (host !== "127.0.0.1" && host !== "::1") throw new Error("workbench_host_not_local");
  if (!Number.isSafeInteger(port) || port < 0 || port > 65_535) throw new Error("workbench_port_invalid");
  const [model, review] = await Promise.all([requiredModel(options.root), optionalReview(options.root)]);
  const html = renderWorkbench(model, review);
  const modelJson = canonicalJson(projectWorkbenchModel(model));
  const taskJson = canonicalJson(review);
  const server = createServer((request, response) => {
    const method = request.method ?? "GET";
    const head = method === "HEAD";
    if (method !== "GET" && !head) {
      send(response, 405, "text/plain; charset=utf-8", "Method not allowed", head);
      return;
    }
    const path = new URL(request.url ?? "/", "http://localhost").pathname;
    if (path === "/") send(response, 200, "text/html; charset=utf-8", html, head);
    else if (path === "/model.json") send(response, 200, "application/json; charset=utf-8", modelJson, head);
    else if (path === "/task.json") send(response, review === null ? 404 : 200, "application/json; charset=utf-8", review === null ? canonicalJson({ error: "task_not_found" }) : taskJson, head);
    else if (path === "/webmcp.js") send(response, 200, "text/javascript; charset=utf-8", WEBMCP_MODULE, head);
    else send(response, 404, "text/plain; charset=utf-8", "Not found", head);
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      server.off("error", reject);
      resolve();
    });
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    server.close();
    throw new Error("workbench_listen_failed");
  }
  const shownHost = host === "::1" ? "[::1]" : host;
  return {
    url: `http://${shownHost}:${address.port}/`,
    close: () => new Promise<void>((resolve, reject) => {
      server.close((error) => error === undefined ? resolve() : reject(error));
    }),
  };
}
