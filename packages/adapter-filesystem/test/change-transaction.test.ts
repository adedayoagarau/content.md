import { cp, lstat, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  applyFilesystemChange,
  previewFilesystemChange,
  rollbackFilesystemChange,
  verifyFilesystemChange,
  type ChangeAuthorization,
  type PreparedChangeTransaction,
} from "@contentmd/adapter-filesystem";

const fixtureRoot = fileURLToPath(
  new URL("../../../fixtures/synthetic-web-app/", import.meta.url),
);
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

async function fixtureCopy(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "contentmd-change-fixture-"));
  temporaryDirectories.push(root);
  await cp(fixtureRoot, root, { recursive: true });
  return root;
}

async function preview(root: string): Promise<PreparedChangeTransaction> {
  return previewFilesystemChange({
    project_root: root,
    operation_id: "operation.fixture.apply",
    transaction_id: "txn_fixture_delete_workspace_v1",
    proposal_id: "prop_fixture_delete_workspace_v1",
    decision_id: "dec_fixture_delete_workspace_v1",
    approval_id: "apr_fixture_delete_workspace_v1",
    verification_id: "verify_fixture_delete_workspace_v1",
    target_path: "src/components/CheckoutSummary.tsx",
    additional_target_paths: [],
    line: 9,
    column: 29,
    before: "Delete workspace",
    after: "Delete this workspace",
  });
}

function authorization(
  transaction: PreparedChangeTransaction,
  overrides: Partial<ChangeAuthorization> = {},
): ChangeAuthorization {
  return {
    operation_id: transaction.operation_id,
    action: "filesystem.write",
    disposition: "allow",
    approval_id: transaction.approval_id,
    approval_class: "mutation",
    approval_status: "issued",
    approval_revocation_state: "current",
    approval_expires_at: "2026-08-21T00:00:00.000Z",
    checked_at: "2026-08-20T18:00:00.000Z",
    subject_digest: transaction.transaction_digest,
    verification_plan_ref: transaction.verification_id,
    ...overrides,
  };
}

describe("governed filesystem change transaction", () => {
  it("previews, atomically applies, reads back, and separately rolls back one exact change", async () => {
    const root = await fixtureCopy();
    const transaction = await preview(root);

    expect(transaction).toMatchObject({
      transaction_id: "txn_fixture_delete_workspace_v1",
      proposal_id: "prop_fixture_delete_workspace_v1",
      decision_id: "dec_fixture_delete_workspace_v1",
      approval_id: "apr_fixture_delete_workspace_v1",
      verification_id: "verify_fixture_delete_workspace_v1",
      target_path: "src/components/CheckoutSummary.tsx",
      mutation_status: "previewed_not_applied",
    });
    expect(transaction.unified_diff).toContain("-Delete workspace");
    expect(transaction.unified_diff).toContain("+Delete this workspace");

    const applyReceipt = await applyFilesystemChange({
      project_root: root,
      transaction,
      authorization: authorization(transaction),
    });
    expect(applyReceipt.changed).toBe(true);
    expect(applyReceipt.readback_verified).toBe(true);
    expect(await readFile(join(root, transaction.target_path), "utf8")).toContain("Delete this workspace");

    const verification = await verifyFilesystemChange({ project_root: root, transaction, apply_receipt: applyReceipt });
    expect(verification.verified).toBe(true);

    const rollback = await rollbackFilesystemChange({
      project_root: root,
      transaction,
      apply_receipt: applyReceipt,
      authorization: authorization(transaction, {
        operation_id: "operation.fixture.rollback",
        action: "filesystem.rollback",
        approval_id: "approval.fixture.rollback",
      }),
    });
    expect(rollback.rolled_back).toBe(true);
    expect(rollback.readback_verified).toBe(true);
    expect(await readFile(join(root, transaction.target_path), "utf8")).toContain("Delete workspace");
    expect((await lstat(join(root, transaction.target_path))).isSymbolicLink()).toBe(false);
  });

  it("rejects missing, wrong-subject, and expired mutation authority", async () => {
    const root = await fixtureCopy();
    const transaction = await preview(root);

    await expect(applyFilesystemChange({ project_root: root, transaction, authorization: null })).rejects.toThrow("mutation_authorization_missing");
    await expect(applyFilesystemChange({
      project_root: root,
      transaction,
      authorization: authorization(transaction, { subject_digest: "0".repeat(64) }),
    })).rejects.toThrow("mutation_authorization_subject_mismatch");
    await expect(applyFilesystemChange({
      project_root: root,
      transaction,
      authorization: authorization(transaction, { approval_expires_at: "2026-08-20T17:59:59.000Z" }),
    })).rejects.toThrow("mutation_approval_expired");
  });

  it("rejects path escape, symlink escape, multi-file widening, and unsupported encoding", async () => {
    const root = await fixtureCopy();
    const outside = await mkdtemp(join(tmpdir(), "contentmd-change-outside-"));
    temporaryDirectories.push(outside);
    await writeFile(join(outside, "outside.tsx"), "Delete workspace\n");
    await symlink(join(outside, "outside.tsx"), join(root, "src", "outside.tsx"));

    await expect(previewFilesystemChange({
      ...previewInput(root),
      target_path: "../outside.tsx",
    })).rejects.toThrow("change_target_outside_project_root");
    await expect(previewFilesystemChange({
      ...previewInput(root),
      target_path: "src/outside.tsx",
      line: 1,
      column: 1,
    })).rejects.toThrow("change_target_symlink_not_allowed");
    await expect(previewFilesystemChange({
      ...previewInput(root),
      additional_target_paths: ["src/App.tsx"],
    })).rejects.toThrow("change_multi_file_widening_denied");

    await writeFile(join(root, "src", "invalid.tsx"), new Uint8Array([0xff, 0xfe, 0xfd]));
    await expect(previewFilesystemChange({
      ...previewInput(root),
      target_path: "src/invalid.tsx",
      line: 1,
      column: 1,
    })).rejects.toThrow("change_target_encoding_unsupported");
  });

  it("rejects changed source bytes and failed verification readback", async () => {
    const root = await fixtureCopy();
    const transaction = await preview(root);
    const target = join(root, transaction.target_path);
    await writeFile(target, `${await readFile(target, "utf8")}\n// concurrent edit\n`);
    await expect(applyFilesystemChange({
      project_root: root,
      transaction,
      authorization: authorization(transaction),
    })).rejects.toThrow("change_source_digest_mismatch");

    const fresh = await fixtureCopy();
    const freshTransaction = await preview(fresh);
    const receipt = await applyFilesystemChange({
      project_root: fresh,
      transaction: freshTransaction,
      authorization: authorization(freshTransaction),
    });
    await writeFile(join(fresh, freshTransaction.target_path), "tampered after apply\n");
    await expect(verifyFilesystemChange({
      project_root: fresh,
      transaction: freshTransaction,
      apply_receipt: receipt,
    })).rejects.toThrow("verification_readback_mismatch");
    await expect(rollbackFilesystemChange({
      project_root: fresh,
      transaction: freshTransaction,
      apply_receipt: receipt,
      authorization: authorization(freshTransaction, {
        operation_id: "operation.fixture.rollback",
        action: "filesystem.rollback",
        approval_id: "approval.fixture.rollback",
      }),
    })).rejects.toThrow("rollback_source_digest_mismatch");
  });
});

function previewInput(root: string) {
  return {
    project_root: root,
    operation_id: "operation.fixture.apply",
    transaction_id: "txn_fixture_delete_workspace_v1",
    proposal_id: "prop_fixture_delete_workspace_v1",
    decision_id: "dec_fixture_delete_workspace_v1",
    approval_id: "apr_fixture_delete_workspace_v1",
    verification_id: "verify_fixture_delete_workspace_v1",
    target_path: "src/components/CheckoutSummary.tsx",
    additional_target_paths: [] as string[],
    line: 9,
    column: 29,
    before: "Delete workspace",
    after: "Delete this workspace",
  };
}
