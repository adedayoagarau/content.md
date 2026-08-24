import { sha256Canonical } from "@contentmd/core";

const TASK6_RELEASE_PROFILE_PREIMAGE = {
  contract_version: "contentmd.task6-release-profile/0.1.0" as const,
  manifest_raw_bytes_digest: "f5af257228a84f367b615ed9b24b3345599f7708e57b41b74fe069af731d26ea",
  manifest_digest: "f5af257228a84f367b615ed9b24b3345599f7708e57b41b74fe069af731d26ea",
  admitted_runtime_profile_digests: [
    "601c846dadbc41d223228c9565f6df7328d45db3bc3cf4b247ef5f25ea27dd7e",
  ] as const,
};

export const TASK6_RELEASE_PROFILE = Object.freeze({
  ...TASK6_RELEASE_PROFILE_PREIMAGE,
  release_profile_contract_digest: sha256Canonical(TASK6_RELEASE_PROFILE_PREIMAGE),
});
