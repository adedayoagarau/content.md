import { existsSync } from "node:fs";
import { DatabaseSync, type SQLOutputValue } from "node:sqlite";
import { sha256Canonical } from "@contentmd/core";
import { assertSupportedSqliteRuntime } from "@contentmd/memory";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type RuntimeBinding,
  type RuntimeHealth,
  type RuntimeHealthReport,
  type RuntimeOperationVerifier,
} from "@contentmd/runtime-sdk";
import { resolveRuntimePath } from "./paths.js";
import {
  requireRuntimeBinding,
  workflowEffect,
} from "./runtime.js";

export interface LocalHealthCheckResult {
  readonly status: "pass" | "fail" | "unknown";
  readonly detail: string;
}

export type LocalHealthCheck = () => Promise<LocalHealthCheckResult>;

export interface LocalRuntimeHealthOptions {
  readonly project_root: string;
  readonly authority: RuntimeOperationVerifier;
  readonly checks?: Readonly<Record<string, LocalHealthCheck>>;
  readonly clock: () => string;
}

function rowValue(row: Record<string, SQLOutputValue> | undefined): string | null {
  if (row === undefined) return null;
  const value = row.quick_check;
  return typeof value === "string" ? value : null;
}

export class LocalRuntimeHealth implements RuntimeHealth {
  readonly #root: string;
  readonly #authority: RuntimeOperationVerifier;
  readonly #checks: Readonly<Record<string, LocalHealthCheck>>;
  readonly #clock: () => string;

  constructor(options: LocalRuntimeHealthOptions) {
    this.#root = options.project_root;
    this.#authority = options.authority;
    this.#checks = Object.freeze({ ...(options.checks ?? {}) });
    this.#clock = options.clock;
  }

  async inspect(
    binding: RuntimeBinding,
    operation: AuthorizedRuntimeOperation,
  ): Promise<RuntimeHealthReport> {
    const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
      interface_id: "runtime.health",
      method: "inspect",
      action: "runtime.health.inspect",
      resources: [{ resource_id: binding.binding_id, content_digest: binding.descriptor_digest }],
      effect_input: { binding_id: binding.binding_id, binding_digest: binding.descriptor_digest },
      runtime_binding_digest: binding.descriptor_digest,
    }));
    requireRuntimeBinding(claims, binding);
    const detailed: Array<{ check_id: string; status: "pass" | "fail" | "unknown"; detail: string }> = [];
    try {
      assertSupportedSqliteRuntime();
      detailed.push({ check_id: "runtime.node", status: "pass", detail: "supported_node_runtime" });
    } catch {
      detailed.push({ check_id: "runtime.node", status: "fail", detail: "unsupported_node_runtime" });
    }
    const runtimePath = resolveRuntimePath(this.#root, ".contentmd/runtime/runtime.sqlite");
    if (!existsSync(runtimePath)) {
      detailed.push({ check_id: "runtime.sqlite", status: "unknown", detail: "runtime_database_not_initialized" });
    } else {
      try {
        const database = new DatabaseSync(runtimePath, { readOnly: true });
        const result = rowValue(database.prepare("PRAGMA quick_check").get() as Record<string, SQLOutputValue> | undefined);
        database.close();
        detailed.push({
          check_id: "runtime.sqlite",
          status: result === "ok" ? "pass" : "fail",
          detail: result === "ok" ? "sqlite_quick_check_passed" : "sqlite_quick_check_failed",
        });
      } catch {
        detailed.push({ check_id: "runtime.sqlite", status: "fail", detail: "sqlite_open_failed" });
      }
    }
    for (const [checkId, check] of Object.entries(this.#checks)
      .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)) {
      if (checkId.length === 0) {
        throw new RuntimeError("runtime_canonical_commit_unavailable", "health_check_id_invalid");
      }
      try {
        const result = await check();
        if (!(result.status === "pass" || result.status === "fail" || result.status === "unknown")) {
          throw new Error("health_check_status_invalid");
        }
        detailed.push({ check_id: checkId, status: result.status, detail: result.detail });
      } catch {
        detailed.push({ check_id: checkId, status: "fail", detail: "health_check_failed_closed" });
      }
    }
    const checkResults = detailed
      .sort((left, right) => left.check_id < right.check_id ? -1 : left.check_id > right.check_id ? 1 : 0)
      .map((check) => ({
        check_id: check.check_id,
        status: check.status,
        detail_digest: sha256Canonical({
          contract_version: "contentmd.runtime-health-detail/0.1.0",
          check_id: check.check_id,
          detail: check.detail,
        }),
      }));
    const status: RuntimeHealthReport["status"] = checkResults.some((check) => check.status === "fail")
      ? "unhealthy"
      : checkResults.some((check) => check.status === "unknown")
        ? "degraded"
        : "healthy";
    const inspectedAt = this.#clock();
    const reportId = `runtime-health.${sha256Canonical({
      contract_version: "contentmd.runtime-health-report-identity/0.1.0",
      project_id: binding.project_id,
      runtime_binding_digest: binding.descriptor_digest,
      check_results: checkResults,
      inspected_at: inspectedAt,
    })}`;
    const preimage = {
      schema_version: "0.1.0" as const,
      report_id: reportId,
      project_id: binding.project_id,
      runtime_binding_digest: binding.descriptor_digest,
      status,
      check_results: checkResults,
      inspected_at: inspectedAt,
    };
    return { ...preimage, report_digest: sha256Canonical(preimage) };
  }
}
