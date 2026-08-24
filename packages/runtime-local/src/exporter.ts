import { createHash } from "node:crypto";
import { mkdir, open, readFile, rename, rm } from "node:fs/promises";
import { dirname } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type ExportReceipt,
  type ExportRequest,
  type RuntimeBinding,
  type RuntimeExporter,
  type RuntimeOperationVerifier,
} from "@contentmd/runtime-sdk";
import { resolveRuntimePath } from "./paths.js";
import {
  isRuntimeDigest,
  requireRuntimeBinding,
  requireRuntimeText,
  requireRuntimeTime,
  workflowEffect,
} from "./runtime.js";

export interface LocalExportArtifact {
  readonly relative_path: string;
  readonly bytes: Uint8Array;
  readonly sha256_digest: string;
  readonly disposition: "required" | "optional";
  readonly export_permission: "permitted" | "forbidden";
}

export interface LocalSnapshotProvider {
  collect(request: ExportRequest): Promise<readonly LocalExportArtifact[]>;
}

export interface LocalExporterOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly snapshot_provider: LocalSnapshotProvider;
  readonly clock: () => string;
}

interface LocalExportManifestEntry {
  readonly relative_path: string;
  readonly sha256_digest: string;
  readonly byte_count: number;
  readonly disposition: "required" | "optional";
}

let temporaryExportSequence = 0;

function digestBytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function validateRequest(request: ExportRequest, binding: RuntimeBinding): void {
  requireRuntimeText(request.export_id, "export_id_invalid");
  requireRuntimeText(request.checkpoint_ref, "export_checkpoint_ref_invalid");
  requireRuntimeTime(request.requested_at, "export_requested_at_invalid");
  if (request.export_id.includes("/")
    || request.export_id.includes("\\")
    || request.schema_version !== "0.1.0"
    || request.project_id !== binding.project_id
    || request.runtime_binding_digest !== binding.descriptor_digest
    || !isRuntimeDigest(request.checkpoint_digest)
    || !isRuntimeDigest(request.request_digest)) {
    throw new RuntimeError("runtime_export_incomplete", "export_request_contract_invalid");
  }
  const { request_digest: supplied, ...preimage } = request;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_export_incomplete", "export_request_digest_invalid");
  }
}

function validateArtifactPath(path: string): void {
  if (path.length === 0
    || path.includes("\0")
    || path.startsWith("/")
    || path.split(/[\\/]/u).includes("..")) {
    throw new RuntimeError("runtime_export_incomplete", "artifact_path_invalid");
  }
}

async function writeVerifiedFile(path: string, bytes: Uint8Array, digest: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  const handle = await open(path, "wx", 0o600);
  try {
    await handle.writeFile(bytes);
    await handle.sync();
  } finally {
    await handle.close();
  }
  if (digestBytes(await readFile(path)) !== digest) {
    throw new RuntimeError("runtime_export_incomplete", "export_readback_digest_mismatch");
  }
}

export class LocalExporter implements RuntimeExporter {
  readonly #root: string;
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #snapshotProvider: LocalSnapshotProvider;
  readonly #clock: () => string;

  constructor(options: LocalExporterOptions) {
    this.#root = options.project_root;
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#snapshotProvider = options.snapshot_provider;
    this.#clock = options.clock;
  }

  async exportSnapshot(
    request: ExportRequest,
    operation: AuthorizedRuntimeOperation,
  ): Promise<ExportReceipt> {
    validateRequest(request, this.#binding);
    const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
      interface_id: "runtime.export",
      method: "exportSnapshot",
      action: "runtime.export.create",
      resources: [{ resource_id: request.export_id, content_digest: request.request_digest }],
      effect_input: request,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireRuntimeBinding(claims, this.#binding);
    const collected = [...await this.#snapshotProvider.collect(request)];
    const seen = new Set<string>();
    for (const artifact of collected) {
      validateArtifactPath(artifact.relative_path);
      if (seen.has(artifact.relative_path)) {
        throw new RuntimeError("runtime_export_incomplete", "duplicate_artifact_path");
      }
      seen.add(artifact.relative_path);
      if (!isRuntimeDigest(artifact.sha256_digest)
        || !(artifact.disposition === "required" || artifact.disposition === "optional")
        || !(artifact.export_permission === "permitted" || artifact.export_permission === "forbidden")) {
        throw new RuntimeError("runtime_export_incomplete", "artifact_contract_invalid");
      }
      if (artifact.disposition === "required" && artifact.export_permission === "forbidden") {
        throw new RuntimeError("runtime_export_incomplete", "required_artifact_forbidden");
      }
    }
    const permitted = collected
      .filter((artifact) => artifact.export_permission === "permitted")
      .sort((left, right) => left.relative_path < right.relative_path ? -1 : left.relative_path > right.relative_path ? 1 : 0);
    const exportParent = resolveRuntimePath(this.#root, ".contentmd/runtime/exports");
    const exportRoot = resolveRuntimePath(
      this.#root,
      `.contentmd/runtime/exports/${request.export_id}`,
    );
    temporaryExportSequence += 1;
    const temporaryRoot = resolveRuntimePath(
      this.#root,
      `.contentmd/runtime/exports/${request.export_id}.tmp-${process.pid}-${temporaryExportSequence}`,
    );
    await mkdir(exportParent, { recursive: true, mode: 0o700 });
    await mkdir(temporaryRoot, { mode: 0o700 });
    try {
      const entries: LocalExportManifestEntry[] = [];
      for (const artifact of permitted) {
        if (digestBytes(artifact.bytes) !== artifact.sha256_digest) {
          throw new RuntimeError("runtime_export_incomplete", "artifact_digest_mismatch");
        }
        const path = resolveRuntimePath(temporaryRoot, artifact.relative_path);
        await writeVerifiedFile(path, artifact.bytes, artifact.sha256_digest);
        entries.push({
          relative_path: artifact.relative_path,
          sha256_digest: artifact.sha256_digest,
          byte_count: artifact.bytes.byteLength,
          disposition: artifact.disposition,
        });
      }
      const manifestPreimage = {
        contract_version: "contentmd.runtime-export-manifest/0.1.0",
        export_id: request.export_id,
        project_id: request.project_id,
        runtime_binding_digest: request.runtime_binding_digest,
        checkpoint_ref: request.checkpoint_ref,
        checkpoint_digest: request.checkpoint_digest,
        request_digest: request.request_digest,
        entries,
        created_at: this.#clock(),
      };
      const manifest = {
        ...manifestPreimage,
        manifest_digest: sha256Canonical(manifestPreimage),
      };
      const manifestBytes = new TextEncoder().encode(canonicalJson(manifest));
      await writeVerifiedFile(
        resolveRuntimePath(temporaryRoot, "manifest.json"),
        manifestBytes,
        digestBytes(manifestBytes),
      );
      await rename(temporaryRoot, exportRoot);
      const issuedAt = this.#clock();
      const receiptId = `export-receipt.${sha256Canonical({
        contract_version: "contentmd.runtime-export-receipt-identity/0.1.0",
        export_id: request.export_id,
        request_digest: request.request_digest,
        manifest_digest: manifest.manifest_digest,
      })}`;
      const receiptPreimage = {
        schema_version: "0.1.0" as const,
        receipt_id: receiptId,
        export_id: request.export_id,
        project_id: request.project_id,
        runtime_binding_digest: request.runtime_binding_digest,
        manifest_ref: `.contentmd/runtime/exports/${request.export_id}/manifest.json`,
        manifest_digest: manifest.manifest_digest,
        status: "completed" as const,
        issued_at: issuedAt,
      };
      return { ...receiptPreimage, receipt_digest: sha256Canonical(receiptPreimage) };
    } catch (error) {
      await rm(temporaryRoot, { recursive: true, force: true });
      throw error;
    }
  }
}
