import {
  type AdapterDescriptor,
  type ContentAdapter,
  type DiscoverRequest,
  type DiscoverResult,
} from "@contentmd/adapter-sdk";
import { applyFilesystemChange, type FilesystemApplyReceipt, type FilesystemApplyRequest } from "./apply.js";
import { discoverFilesystemContent } from "./discover.js";
import { previewFilesystemChange, type FilesystemChangePreviewRequest, type PreparedChangeTransaction } from "./preview.js";
import { rollbackFilesystemChange, type FilesystemRollbackReceipt, type FilesystemRollbackRequest } from "./rollback.js";
import { verifyFilesystemChange, type FilesystemVerificationReceipt, type FilesystemVerificationRequest } from "./verify.js";

const descriptor: AdapterDescriptor = {
  adapter_id: "adapter.filesystem",
  adapter_version: "0.1.0",
  display_name: "Local filesystem content adapter",
  capabilities: ["discover", "preview", "apply", "verify", "rollback"],
  authority_effect: "none",
};

export class FilesystemContentAdapter implements ContentAdapter<
  FilesystemChangePreviewRequest,
  PreparedChangeTransaction,
  FilesystemApplyRequest,
  FilesystemApplyReceipt,
  FilesystemVerificationRequest,
  FilesystemVerificationReceipt,
  FilesystemRollbackRequest,
  FilesystemRollbackReceipt
> {
  readonly descriptor = descriptor;

  async discover(request: DiscoverRequest): Promise<DiscoverResult> {
    return discoverFilesystemContent(request);
  }

  async preview(request: FilesystemChangePreviewRequest): Promise<PreparedChangeTransaction> {
    return previewFilesystemChange(request);
  }

  async apply(request: FilesystemApplyRequest): Promise<FilesystemApplyReceipt> {
    return applyFilesystemChange(request);
  }

  async verify(request: FilesystemVerificationRequest): Promise<FilesystemVerificationReceipt> {
    return verifyFilesystemChange(request);
  }

  async rollback(request: FilesystemRollbackRequest): Promise<FilesystemRollbackReceipt> {
    return rollbackFilesystemChange(request);
  }
}
