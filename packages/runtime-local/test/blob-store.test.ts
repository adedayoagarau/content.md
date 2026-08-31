import { createHash } from "node:crypto";
import { access, mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import { LocalBlobStore } from "@contentmd/runtime-local";
import type {
  AuthorizedBlob,
  AuthorizedRuntimeOperation,
  BlobExpiryRequest,
  ReplicaArtifactManifestEntry,
  RuntimeOperationClaims,
} from "@contentmd/runtime-sdk";
import {
  AUTHORIZATION_REF,
  NOW,
  authorityFixture,
  runtimeBindingFixture,
  runtimeClaims,
} from "./runtime-test-fixtures.js";

const temporaryRoots = new Set<string>();
afterEach(async () => {
  await Promise.all([...temporaryRoots].map((root) => rm(root, { recursive: true, force: true })));
  temporaryRoots.clear();
});

function bytesDigest(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "contentmd-runtime-blobs-"));
  temporaryRoots.add(root);
  const authorization = authorityFixture(root);
  const binding = runtimeBindingFixture();
  const references = new Set<string>();
  let counter = 0;
  const store = new LocalBlobStore({
    project_root: root,
    binding,
    authority: authorization.authority,
    permitted_data_classes: ["product-content", "runtime-metadata"],
    reference_resolver: {
      async currentReferences(blobId) {
        return references.has(blobId) ? ["event.runtime.references-blob"] : [];
      },
    },
    clock: () => NOW,
  });
  async function issue(input: {
    readonly action: string;
    readonly resource_id: string;
    readonly content_digest: string | null;
    readonly data_classes: readonly string[];
  }): Promise<AuthorizedRuntimeOperation> {
    counter += 1;
    const claims = runtimeClaims({
      capability_id: `capability.runtime.blob.${counter}`,
      nonce: `nonce.runtime.blob.${counter}`,
      action: input.action,
      resources: [{
        resource_id: input.resource_id,
        content_digest: input.content_digest,
      }],
      data_classes: input.data_classes,
      resource_limits: {
        calls: 1,
        bytes: 16_384,
        duration_ms: 2_000,
        records: 1,
        model_tokens: 0,
        browser_actions: 0,
        retries: 0,
      },
      runtime_binding_digest: binding.descriptor_digest,
    } satisfies Partial<RuntimeOperationClaims>);
    authorization.resolver.accept(claims);
    return authorization.authority.issue(AUTHORIZATION_REF, claims);
  }
  return { root, store, binding, references, issue, authorization };
}

function blob(bindingDigest: string): AuthorizedBlob {
  const bytes = new TextEncoder().encode("Canonical product guidance\n");
  return {
    schema_version: "0.1.0",
    blob_id: "blob.runtime.product-guidance",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    media_type: "text/markdown",
    schema_id: null,
    data_class: "product-content",
    disposition: "required",
    export_permission: "permitted",
    parent_refs: ["policy.runtime.content"],
    retention_ref: "retention.runtime.project",
    bytes,
    sha256_digest: bytesDigest(bytes),
  };
}

function expiryRequest(input: AuthorizedBlob): BlobExpiryRequest {
  const preimage = {
    schema_version: "0.1.0" as const,
    request_id: "blob-expiry.runtime.product-guidance",
    project_id: input.project_id,
    runtime_binding_digest: input.runtime_binding_digest,
    blob_ref: {
      blob_id: input.blob_id,
      sha256_digest: input.sha256_digest,
    },
    reason: "retention_expired",
    requested_at: NOW,
  };
  return { ...preimage, request_digest: sha256Canonical(preimage) };
}

describe("local content-addressed blob store", () => {
  it("stores mode-0600 bytes by SHA-256 and independently verifies reads", async () => {
    const f = await fixture();
    const input = blob(f.binding.descriptor_digest);
    const putOperation = await f.issue({
      action: "runtime.blob.put",
      resource_id: input.blob_id,
      content_digest: input.sha256_digest,
      data_classes: [input.data_class],
    });

    const receipt = await f.store.put(input, putOperation);
    expect(receipt).toMatchObject({
      blob_id: input.blob_id,
      sha256_digest: input.sha256_digest,
      byte_count: input.bytes.byteLength,
      status: "stored",
    });
    expect(receipt.receipt_digest).toMatch(/^[a-f0-9]{64}$/u);

    const path = join(
      f.root,
      ".contentmd/runtime/blobs/sha256",
      input.sha256_digest.slice(0, 2),
      input.sha256_digest,
    );
    expect(await readFile(path)).toEqual(Buffer.from(input.bytes));
    expect((await stat(path)).mode & 0o777).toBe(0o600);

    const verified = await f.store.get({
      blob_id: input.blob_id,
      sha256_digest: input.sha256_digest,
    }, await f.issue({
      action: "runtime.blob.get",
      resource_id: input.blob_id,
      content_digest: input.sha256_digest,
      data_classes: ["product-content", "runtime-metadata"],
    }));
    expect(verified.bytes).toEqual(input.bytes);
    expect(verified.sha256_digest).toBe(input.sha256_digest);
    expect(verified.verification_digest).toMatch(/^[a-f0-9]{64}$/u);
    f.authorization.ledger.close();
  });

  it("rejects mismatched bytes without creating the content-addressed file", async () => {
    const f = await fixture();
    const valid = blob(f.binding.descriptor_digest);
    const input = { ...valid, sha256_digest: "0".repeat(64) };
    await expect(f.store.put(input, await f.issue({
      action: "runtime.blob.put",
      resource_id: input.blob_id,
      content_digest: input.sha256_digest,
      data_classes: [input.data_class],
    }))).rejects.toThrow("runtime_canonical_commit_unavailable:blob_digest_mismatch");
    await expect(access(join(
      f.root,
      ".contentmd/runtime/blobs/sha256/00",
      input.sha256_digest,
    ))).rejects.toThrow();
    f.authorization.ledger.close();
  });

  it("keeps a referenced blob and expires it only after references clear", async () => {
    const f = await fixture();
    const input = blob(f.binding.descriptor_digest);
    await f.store.put(input, await f.issue({
      action: "runtime.blob.put",
      resource_id: input.blob_id,
      content_digest: input.sha256_digest,
      data_classes: [input.data_class],
    }));
    const request = expiryRequest(input);
    f.references.add(input.blob_id);
    await expect(f.store.expire(request, await f.issue({
      action: "runtime.blob.expire",
      resource_id: input.blob_id,
      content_digest: input.sha256_digest,
      data_classes: ["product-content", "runtime-metadata"],
    }))).resolves.toMatchObject({ status: "retained_referenced" });

    f.references.clear();
    await expect(f.store.expire(request, await f.issue({
      action: "runtime.blob.expire",
      resource_id: input.blob_id,
      content_digest: input.sha256_digest,
      data_classes: ["product-content", "runtime-metadata"],
    }))).resolves.toMatchObject({ status: "expired" });
    await expect(f.store.get(request.blob_ref, await f.issue({
      action: "runtime.blob.get",
      resource_id: input.blob_id,
      content_digest: input.sha256_digest,
      data_classes: ["product-content", "runtime-metadata"],
    }))).rejects.toThrow("runtime_canonical_commit_unavailable:blob_not_found");
    f.authorization.ledger.close();
  });

  it("does not write when the capability resource is not the blob", async () => {
    const f = await fixture();
    const input = blob(f.binding.descriptor_digest);
    await expect(f.store.put(input, await f.issue({
      action: "runtime.blob.put",
      resource_id: "blob.runtime.other",
      content_digest: input.sha256_digest,
      data_classes: [input.data_class],
    }))).rejects.toThrow("runtime_binding_not_authorized");
    await expect(access(join(
      f.root,
      ".contentmd/runtime/blobs/sha256",
      input.sha256_digest.slice(0, 2),
      input.sha256_digest,
    ))).rejects.toThrow();
    f.authorization.ledger.close();
  });

  it("independently verifies stored bytes for the canonical replica protocol", async () => {
    const f = await fixture();
    const input = blob(f.binding.descriptor_digest);
    await f.store.put(input, await f.issue({
      action: "runtime.blob.put",
      resource_id: input.blob_id,
      content_digest: input.sha256_digest,
      data_classes: [input.data_class],
    }));
    const manifestEntry: ReplicaArtifactManifestEntry = {
      artifact_id: input.blob_id,
      media_type: input.media_type,
      schema_id: input.schema_id,
      sha256_digest: input.sha256_digest,
      byte_count: input.bytes.byteLength,
      disposition: input.disposition,
      export_permission: input.export_permission,
      parent_refs: input.parent_refs,
      expected_receipt_class: "runtime.local.verified-blob",
    };
    const receipt = await f.store.verify(manifestEntry);
    expect(receipt).toEqual({
      artifact_id: input.blob_id,
      sha256_digest: input.sha256_digest,
      byte_count: input.bytes.byteLength,
      receipt_class: "runtime.local.verified-blob",
      receipt_digest: sha256Canonical({
        artifact_id: input.blob_id,
        sha256_digest: input.sha256_digest,
        byte_count: input.bytes.byteLength,
        receipt_class: "runtime.local.verified-blob",
      }),
    });
    f.authorization.ledger.close();
  });
});
