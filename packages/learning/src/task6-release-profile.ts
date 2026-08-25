import { sha256Canonical } from "@contentmd/core";

const TASK6_RELEASE_PROFILE_PREIMAGE = {
  contract_version: "contentmd.task6-release-profile/0.1.0" as const,
  manifest_raw_bytes_digest: "402ebe4416fe442646b89d080170cb4210a3cc909fb971528cc9ea966e8d96b3",
  manifest_digest: "402ebe4416fe442646b89d080170cb4210a3cc909fb971528cc9ea966e8d96b3",
  admitted_runtime_profile_digests: [
    "601c846dadbc41d223228c9565f6df7328d45db3bc3cf4b247ef5f25ea27dd7e",
  ] as const,
};

export const TASK6_RELEASE_PROFILE = Object.freeze({
  ...TASK6_RELEASE_PROFILE_PREIMAGE,
  release_profile_contract_digest: sha256Canonical(TASK6_RELEASE_PROFILE_PREIMAGE),
});
