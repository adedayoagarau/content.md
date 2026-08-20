import {
  AdapterCapabilityError,
  type AdapterDescriptor,
  type ApplyReceipt,
  type ApprovedChangeRequest,
  type ChangePreview,
  type ChangePreviewRequest,
  type ContentAdapter,
  type DiscoverRequest,
  type DiscoverResult,
  type RollbackReceipt,
  type RollbackRequest,
  type VerificationReceipt,
  type VerificationRequest,
} from "@contentmd/adapter-sdk";
import { discoverFilesystemContent } from "./discover.js";

const descriptor: AdapterDescriptor = {
  adapter_id: "adapter.filesystem",
  adapter_version: "0.1.0",
  display_name: "Local filesystem content adapter",
  capabilities: ["discover"],
  authority_effect: "none",
};

export class FilesystemContentAdapter implements ContentAdapter {
  readonly descriptor = descriptor;

  async discover(request: DiscoverRequest): Promise<DiscoverResult> {
    return discoverFilesystemContent(request);
  }

  async preview(_request: ChangePreviewRequest): Promise<ChangePreview> {
    throw new AdapterCapabilityError("unsupported_capability", "filesystem.preview");
  }

  async apply(_request: ApprovedChangeRequest): Promise<ApplyReceipt> {
    throw new AdapterCapabilityError("unsupported_capability", "filesystem.apply");
  }

  async verify(_request: VerificationRequest): Promise<VerificationReceipt> {
    throw new AdapterCapabilityError("unsupported_capability", "filesystem.verify");
  }

  async rollback(_request: RollbackRequest): Promise<RollbackReceipt> {
    throw new AdapterCapabilityError("unsupported_capability", "filesystem.rollback");
  }
}
