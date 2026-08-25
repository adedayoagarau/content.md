import { createHash } from "node:crypto";
import {
  mkdir,
  open,
  readFile,
  rename,
  unlink,
} from "node:fs/promises";
import { dirname } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthorizedBlob,
  type AuthorizedRuntimeOperation,
  type BlobExpiryReceipt,
  type BlobExpiryRequest,
  type BlobReceipt,
  type BlobRef,
  type BoundRuntimeResource,
  type ReplicaArtifactManifestEntry,
  type ReplicaStorageReceipt,
  type RuntimeBinding,
  type RuntimeBlobStore,
  type RuntimeEffectRequest,
  type RuntimeOperationClaims,
  type RuntimeOperationVerifier,
  type VerifiedBlob,
} from "@contentmd/runtime-sdk";
import { resolveRuntimePath } from "./paths.js";

interface BlobMetadata {
  readonly contract_version: "contentmd.local-blob-metadata/0.1.0";
  readonly blob_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly media_type: string;
  readonly schema_id: string | null;
  readonly data_class: string;
  readonly disposition: "required" | "optional";
  readonly export_permission: "permitted" | "forbidden";
  readonly parent_refs: readonly string[];
  readonly retention_ref: string;
  readonly sha256_digest: string;
  readonly byte_count: number;
  readonly metadata_digest: string;
}

export interface BlobReferenceResolver {
  currentReferences(blobId: string): Promise<readonly string[]>;
}

export interface LocalBlobStoreOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly permitted_data_classes: readonly string[];
  readonly reference_resolver: BlobReferenceResolver;
  readonly clock: () => string;
}

let temporaryFileSequence = 0;

function digestBytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function isDigest(value: string): boolean {
  return /^[a-f0-9]{64}$/u.test(value);
}

function effectInputForBlob(blob: AuthorizedBlob): unknown {
  const { bytes, ...metadata } = blob;
  return {
    ...metadata,
    bytes: {
      byte_count: bytes.byteLength,
      sha256_digest: digestBytes(bytes),
    },
  };
}

function runtimeEffect(input: {
  readonly method: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly data_classes: readonly string[];
  readonly effect_input: unknown;
  readonly byte_count: number;
  readonly runtime_binding_digest: string;
}): RuntimeEffectRequest {
  const preimage = {
    interface_id: "runtime.blob-store",
    method: input.method,
    action: input.action,
    resources: input.resources,
    data_classes: input.data_classes,
    requested_limits: {
      calls: 1,
      bytes: Buffer.byteLength(canonicalJson(input.effect_input), "utf8") + input.byte_count,
      duration_ms: 0,
      records: 1,
      model_tokens: 0,
      browser_actions: 0,
      retries: 0,
    },
    runtime_binding_digest: input.runtime_binding_digest,
  };
  return { ...preimage, effect_digest: sha256Canonical(preimage) };
}

function requireClaimsBinding(claims: RuntimeOperationClaims, binding: RuntimeBinding): void {
  if (claims.project_ref !== binding.project_id
    || claims.runtime_binding_digest !== binding.descriptor_digest) {
    throw new RuntimeError("runtime_binding_not_authorized", "blob_binding_mismatch");
  }
}

function requireBlobBinding(blob: AuthorizedBlob, binding: RuntimeBinding): void {
  if (blob.schema_version !== "0.1.0"
    || blob.project_id !== binding.project_id
    || blob.runtime_binding_digest !== binding.descriptor_digest
    || blob.blob_id.length === 0
    || blob.media_type.length === 0
    || blob.data_class.length === 0
    || blob.retention_ref.length === 0
    || !isDigest(blob.sha256_digest)) {
    throw new RuntimeError("runtime_binding_not_authorized", "blob_contract_mismatch");
  }
}

function metadataFor(blob: AuthorizedBlob): BlobMetadata {
  const preimage = {
    contract_version: "contentmd.local-blob-metadata/0.1.0" as const,
    blob_id: blob.blob_id,
    project_id: blob.project_id,
    runtime_binding_digest: blob.runtime_binding_digest,
    media_type: blob.media_type,
    schema_id: blob.schema_id,
    data_class: blob.data_class,
    disposition: blob.disposition,
    export_permission: blob.export_permission,
    parent_refs: [...blob.parent_refs],
    retention_ref: blob.retention_ref,
    sha256_digest: blob.sha256_digest,
    byte_count: blob.bytes.byteLength,
  };
  return { ...preimage, metadata_digest: sha256Canonical(preimage) };
}

function parseMetadata(bytes: Uint8Array): BlobMetadata {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_metadata_invalid");
  }
  if (canonicalJson(parsed) !== text) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_metadata_noncanonical");
  }
  const metadata = parsed as Partial<BlobMetadata>;
  if (metadata.contract_version !== "contentmd.local-blob-metadata/0.1.0"
    || typeof metadata.blob_id !== "string"
    || typeof metadata.project_id !== "string"
    || typeof metadata.runtime_binding_digest !== "string"
    || typeof metadata.media_type !== "string"
    || !(metadata.schema_id === null || typeof metadata.schema_id === "string")
    || typeof metadata.data_class !== "string"
    || !(metadata.disposition === "required" || metadata.disposition === "optional")
    || !(metadata.export_permission === "permitted" || metadata.export_permission === "forbidden")
    || !Array.isArray(metadata.parent_refs)
    || metadata.parent_refs.some((item) => typeof item !== "string")
    || typeof metadata.retention_ref !== "string"
    || typeof metadata.sha256_digest !== "string"
    || !Number.isSafeInteger(metadata.byte_count)
    || typeof metadata.metadata_digest !== "string") {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_metadata_invalid");
  }
  const { metadata_digest: suppliedDigest, ...preimage } = metadata as BlobMetadata;
  if (suppliedDigest !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_metadata_digest_mismatch");
  }
  return metadata as BlobMetadata;
}

async function readIfPresent(path: string): Promise<Uint8Array | null> {
  try {
    return await readFile(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function writeAtomic(path: string, bytes: Uint8Array, expectedDigest: string): Promise<"stored" | "existing"> {
  const existing = await readIfPresent(path);
  if (existing !== null) {
    if (digestBytes(existing) !== expectedDigest) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "existing_blob_corrupt");
    }
    return "existing";
  }
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  temporaryFileSequence += 1;
  const temporaryPath = `${path}.tmp-${process.pid}-${temporaryFileSequence}`;
  const handle = await open(temporaryPath, "wx", 0o600);
  try {
    await handle.writeFile(bytes);
    await handle.sync();
  } finally {
    await handle.close();
  }
  try {
    const persisted = await readFile(temporaryPath);
    if (digestBytes(persisted) !== expectedDigest) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "temporary_blob_digest_mismatch");
    }
    await rename(temporaryPath, path);
  } catch (error) {
    await unlink(temporaryPath).catch(() => undefined);
    throw error;
  }
  return "stored";
}

export class LocalBlobStore implements RuntimeBlobStore {
  readonly #root: string;
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #permittedDataClasses: readonly string[];
  readonly #references: BlobReferenceResolver;
  readonly #clock: () => string;

  constructor(options: LocalBlobStoreOptions) {
    this.#root = options.project_root;
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#permittedDataClasses = [...options.permitted_data_classes];
    this.#references = options.reference_resolver;
    this.#clock = options.clock;
  }

  async put(blob: AuthorizedBlob, operation: AuthorizedRuntimeOperation): Promise<BlobReceipt> {
    const resources = [{ resource_id: blob.blob_id, content_digest: blob.sha256_digest }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect({
      method: "put",
      action: "runtime.blob.put",
      resources,
      data_classes: [blob.data_class],
      effect_input: effectInputForBlob(blob),
      byte_count: blob.bytes.byteLength,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireClaimsBinding(claims, this.#binding);
    requireBlobBinding(blob, this.#binding);
    if (!this.#permittedDataClasses.includes(blob.data_class)) {
      throw new RuntimeError("runtime_binding_not_authorized", "blob_data_class_not_permitted");
    }
    if (digestBytes(blob.bytes) !== blob.sha256_digest) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_digest_mismatch");
    }

    const blobPath = this.#blobPath(blob.sha256_digest);
    const status = await writeAtomic(blobPath, blob.bytes, blob.sha256_digest);
    const metadata = metadataFor(blob);
    const metadataBytes = new TextEncoder().encode(canonicalJson(metadata));
    await writeAtomic(this.#metadataPath(blob.sha256_digest), metadataBytes, digestBytes(metadataBytes));
    return this.#blobReceipt(metadata, status);
  }

  async get(ref: BlobRef, operation: AuthorizedRuntimeOperation): Promise<VerifiedBlob> {
    const resources = [{ resource_id: ref.blob_id, content_digest: ref.sha256_digest }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect({
      method: "get",
      action: "runtime.blob.get",
      resources,
      data_classes: this.#permittedDataClasses,
      effect_input: ref,
      byte_count: 0,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireClaimsBinding(claims, this.#binding);
    const { metadata, bytes } = await this.#readVerified(ref);
    const preimage = {
      schema_version: "0.1.0" as const,
      blob_id: metadata.blob_id,
      media_type: metadata.media_type,
      byte_count: bytes.byteLength,
      sha256_digest: metadata.sha256_digest,
      verified_at: this.#clock(),
    };
    return {
      ...preimage,
      bytes: new Uint8Array(bytes),
      verification_digest: sha256Canonical(preimage),
    };
  }

  async expire(
    request: BlobExpiryRequest,
    operation: AuthorizedRuntimeOperation,
  ): Promise<BlobExpiryReceipt> {
    const resources = [{
      resource_id: request.blob_ref.blob_id,
      content_digest: request.blob_ref.sha256_digest,
    }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect({
      method: "expire",
      action: "runtime.blob.expire",
      resources,
      data_classes: this.#permittedDataClasses,
      effect_input: request,
      byte_count: 0,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireClaimsBinding(claims, this.#binding);
    const { request_digest: suppliedDigest, ...requestPreimage } = request;
    if (request.schema_version !== "0.1.0"
      || request.project_id !== this.#binding.project_id
      || request.runtime_binding_digest !== this.#binding.descriptor_digest
      || suppliedDigest !== sha256Canonical(requestPreimage)) {
      throw new RuntimeError("runtime_binding_not_authorized", "blob_expiry_request_invalid");
    }
    const { metadata } = await this.#readVerified(request.blob_ref);
    let references: readonly string[];
    try {
      references = await this.#references.currentReferences(metadata.blob_id);
    } catch {
      throw new RuntimeError("runtime_cleanup_not_authorized", "blob_reference_resolution_failed");
    }
    const status = references.length === 0 ? "expired" : "retained_referenced";
    if (status === "expired") {
      await unlink(this.#blobPath(metadata.sha256_digest));
      await unlink(this.#metadataPath(metadata.sha256_digest));
    }
    return this.#expiryReceipt(metadata, status);
  }

  async verify(entry: ReplicaArtifactManifestEntry): Promise<ReplicaStorageReceipt | null> {
    let verified: { metadata: BlobMetadata; bytes: Uint8Array };
    try {
      verified = await this.#readVerified({
        blob_id: entry.artifact_id,
        sha256_digest: entry.sha256_digest,
      });
    } catch (error) {
      if (error instanceof RuntimeError && error.message.endsWith(":blob_not_found")) return null;
      throw error;
    }
    const { metadata, bytes } = verified;
    if (metadata.media_type !== entry.media_type
      || metadata.schema_id !== entry.schema_id
      || metadata.byte_count !== entry.byte_count
      || metadata.disposition !== entry.disposition
      || metadata.export_permission !== entry.export_permission
      || canonicalJson(metadata.parent_refs) !== canonicalJson(entry.parent_refs)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", `blob_manifest_mismatch:${entry.artifact_id}`);
    }
    const preimage = {
      artifact_id: metadata.blob_id,
      sha256_digest: metadata.sha256_digest,
      byte_count: bytes.byteLength,
      receipt_class: "runtime.local.verified-blob",
    };
    return { ...preimage, receipt_digest: sha256Canonical(preimage) };
  }

  #blobPath(digest: string): string {
    if (!isDigest(digest)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_digest_invalid");
    }
    return resolveRuntimePath(
      this.#root,
      `.contentmd/runtime/blobs/sha256/${digest.slice(0, 2)}/${digest}`,
    );
  }

  #metadataPath(digest: string): string {
    if (!isDigest(digest)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_digest_invalid");
    }
    return resolveRuntimePath(
      this.#root,
      `.contentmd/runtime/blobs/metadata/${digest.slice(0, 2)}/${digest}.json`,
    );
  }

  async #readVerified(ref: BlobRef): Promise<{ metadata: BlobMetadata; bytes: Uint8Array }> {
    const metadataBytes = await readIfPresent(this.#metadataPath(ref.sha256_digest));
    const bytes = await readIfPresent(this.#blobPath(ref.sha256_digest));
    if (metadataBytes === null || bytes === null) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_not_found");
    }
    const metadata = parseMetadata(metadataBytes);
    if (metadata.blob_id !== ref.blob_id
      || metadata.sha256_digest !== ref.sha256_digest
      || metadata.project_id !== this.#binding.project_id
      || metadata.runtime_binding_digest !== this.#binding.descriptor_digest
      || metadata.byte_count !== bytes.byteLength
      || digestBytes(bytes) !== ref.sha256_digest) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "blob_integrity_mismatch");
    }
    return { metadata, bytes };
  }

  #blobReceipt(metadata: BlobMetadata, status: "stored" | "existing"): BlobReceipt {
    const issuedAt = this.#clock();
    const identity = {
      contract_version: "contentmd.blob-receipt-identity/0.1.0",
      blob_id: metadata.blob_id,
      runtime_binding_digest: metadata.runtime_binding_digest,
      sha256_digest: metadata.sha256_digest,
      status,
      issued_at: issuedAt,
    };
    const preimage = {
      schema_version: "0.1.0" as const,
      receipt_id: `blob-receipt.${sha256Canonical(identity)}`,
      blob_id: metadata.blob_id,
      project_id: metadata.project_id,
      runtime_binding_digest: metadata.runtime_binding_digest,
      sha256_digest: metadata.sha256_digest,
      byte_count: metadata.byte_count,
      status,
      issued_at: issuedAt,
    };
    return { ...preimage, receipt_digest: sha256Canonical(preimage) };
  }

  #expiryReceipt(
    metadata: BlobMetadata,
    status: "expired" | "retained_referenced",
  ): BlobExpiryReceipt {
    const issuedAt = this.#clock();
    const identity = {
      contract_version: "contentmd.blob-expiry-receipt-identity/0.1.0",
      blob_id: metadata.blob_id,
      runtime_binding_digest: metadata.runtime_binding_digest,
      status,
      issued_at: issuedAt,
    };
    const preimage = {
      schema_version: "0.1.0" as const,
      receipt_id: `blob-expiry-receipt.${sha256Canonical(identity)}`,
      blob_id: metadata.blob_id,
      project_id: metadata.project_id,
      runtime_binding_digest: metadata.runtime_binding_digest,
      status,
      issued_at: issuedAt,
    };
    return { ...preimage, receipt_digest: sha256Canonical(preimage) };
  }
}
