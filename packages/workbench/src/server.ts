import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { lstat, readFile, realpath } from "node:fs/promises";
import { isAbsolute, join, relative, sep } from "node:path";
import {
  canonicalJson,
  createContentImprovementBrief,
  rankContentReviewFindings,
  type UserSuppliedImprovementContext,
} from "@contentmd/core";
import {
  applyRegularUserImprovement,
  previewRegularUserImprovement,
  undoRegularUserImprovement,
  type ProjectModelResult,
  type ReviewedIdeCandidate,
} from "@contentmd/agent";
import { WORKBENCH_CLIENT_MODULE } from "./client.js";
import { projectWorkbenchModel, renderWorkbench } from "./render.js";
import { WEBMCP_MODULE } from "./webmcp.js";

const MODEL_PATH = ".contentmd/runtime/model.json";
const REVIEW_PATH = ".contentmd/runtime/task-review.json";
const CSP = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'";

export interface StartWorkbenchOptions {
  root: string;
  model?: ProjectModelResult;
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

async function boundedJson(request: IncomingMessage): Promise<Record<string, unknown>> {
  let bytes = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    bytes += buffer.byteLength;
    if (bytes > 64 * 1024) throw new Error("workbench_request_too_large");
    chunks.push(buffer);
  }
  const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("workbench_request_invalid");
  }
  return parsed as Record<string, unknown>;
}

export async function startWorkbench(options: StartWorkbenchOptions): Promise<WorkbenchServer> {
  const host = options.host ?? "127.0.0.1";
  const port = options.port ?? 4178;
  if (host !== "127.0.0.1" && host !== "::1") throw new Error("workbench_host_not_local");
  if (!Number.isSafeInteger(port) || port < 0 || port > 65_535) throw new Error("workbench_port_invalid");
  const [model, review] = await Promise.all([
    options.model === undefined ? requiredModel(options.root) : Promise.resolve(options.model),
    optionalReview(options.root),
  ]);
  const html = renderWorkbench(model, review);
  const modelJson = canonicalJson(projectWorkbenchModel(model));
  const taskJson = canonicalJson(review);
  const findings = rankContentReviewFindings(model.content_inventory.units, 10);
  let allowedOrigin = "";
  const server = createServer((request, response) => {
    const method = request.method ?? "GET";
    const head = method === "HEAD";
    const path = new URL(request.url ?? "/", "http://localhost").pathname;
    if (method === "POST" && [
      "/api/improvement/compare", "/api/improvement/apply", "/api/improvement/undo",
    ].includes(path)) {
      void (async () => {
        try {
          if (request.headers.origin !== allowedOrigin) throw new Error("workbench_origin_invalid");
          if (!(request.headers["content-type"] ?? "").toLowerCase().startsWith("application/json")) {
            throw new Error("workbench_content_type_invalid");
          }
          const body = await boundedJson(request);
          if (path === "/api/improvement/undo") {
            if (typeof body.transaction_digest !== "string" || body.confirmed !== true) {
              throw new Error("workbench_undo_confirmation_required");
            }
            const undone = await undoRegularUserImprovement({
              project_root: options.root,
              transaction_digest: body.transaction_digest,
              confirmed: true,
            });
            send(response, 200, "application/json; charset=utf-8", canonicalJson({
              transaction_digest: undone.record.transaction.transaction_digest,
              target_path: undone.record.transaction.target_path,
              restored: true,
              readback_verified: true,
              undo_status: undone.record.undo_status,
              authority_effect: undone.record.authority_effect,
            }), false);
            return;
          }
          if (
            typeof body.finding_id !== "string" || typeof body.candidate_expression !== "string"
            || typeof body.facts !== "object" || body.facts === null || Array.isArray(body.facts)
            || typeof body.preview_patch !== "boolean"
            || !Object.values(body.facts as Record<string, unknown>).every((value) => typeof value === "string")
          ) throw new Error("workbench_request_invalid");
          const finding = findings.find((item) => item.finding_id === body.finding_id);
          if (finding === undefined) throw new Error("finding_not_found");
          const unit = model.content_inventory.units.find((item) => item.qualification_id === finding.qualification_ref);
          if (unit === undefined) throw new Error("finding_qualification_not_found");
          const brief = createContentImprovementBrief(finding, unit);
          const context: UserSuppliedImprovementContext = {
            finding_ref: finding.finding_id,
            facts: body.facts as Record<string, string>,
            provenance: "user_supplied",
            authority_effect: "none",
          };
          if (path === "/api/improvement/apply") {
            if (typeof body.transaction_digest !== "string" || body.confirmed !== true) {
              throw new Error("workbench_apply_confirmation_required");
            }
            const applied = await applyRegularUserImprovement({
              project_root: options.root,
              finding,
              unit,
              brief,
              context,
              candidate_expression: body.candidate_expression,
              expected_transaction_digest: body.transaction_digest,
              confirmed: true,
            });
            send(response, 200, "application/json; charset=utf-8", canonicalJson({
              transaction_digest: applied.record.transaction.transaction_digest,
              target_path: applied.record.transaction.target_path,
              changed: applied.record.apply_receipt.changed,
              readback_verified: applied.record.apply_receipt.readback_verified,
              undo_status: applied.record.undo_status,
              record_path: applied.record_path,
              write_effect: "local_source_mutation",
              authority_effect: applied.record.authority_effect,
            }), false);
            return;
          }
          const result = await previewRegularUserImprovement({
            project_root: options.root,
            finding,
            unit,
            brief,
            context,
            candidate_expression: body.candidate_expression,
            include_patch: body.preview_patch,
          });
          send(response, 200, "application/json; charset=utf-8", canonicalJson(result), false);
        } catch (error) {
          const message = error instanceof Error ? error.message : "workbench_request_invalid";
          const status = message === "workbench_request_too_large" ? 413
            : message === "workbench_origin_invalid" ? 403
              : message === "finding_not_found" ? 404 : 400;
          send(response, status, "application/json; charset=utf-8", canonicalJson({ error: message.split(":", 1)[0] }), false);
        }
      })();
      return;
    }
    if (method !== "GET" && !head) {
      send(response, 405, "text/plain; charset=utf-8", "Method not allowed", head);
      return;
    }
    if (path === "/") send(response, 200, "text/html; charset=utf-8", html, head);
    else if (path === "/model.json") send(response, 200, "application/json; charset=utf-8", modelJson, head);
    else if (path === "/task.json") send(response, review === null ? 404 : 200, "application/json; charset=utf-8", review === null ? canonicalJson({ error: "task_not_found" }) : taskJson, head);
    else if (path === "/webmcp.js") send(response, 200, "text/javascript; charset=utf-8", WEBMCP_MODULE, head);
    else if (path === "/workbench.js") send(response, 200, "text/javascript; charset=utf-8", WORKBENCH_CLIENT_MODULE, head);
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
  allowedOrigin = `http://${shownHost}:${address.port}`;
  return {
    url: `http://${shownHost}:${address.port}/`,
    close: () => new Promise<void>((resolve, reject) => {
      server.close((error) => error === undefined ? resolve() : reject(error));
    }),
  };
}
