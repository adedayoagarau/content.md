import { sha256Canonical } from "@contentmd/core";

const TASK6_RELEASE_PROFILE_PREIMAGE = {
  contract_version: "contentmd.task6-release-profile/0.1.0" as const,
  manifest_raw_bytes_digest: "ea90df4d1897cdd9f622b5b1b62fbc9e1d7a3594f99f24b4534b0e839b134b48",
  manifest_digest: "ea90df4d1897cdd9f622b5b1b62fbc9e1d7a3594f99f24b4534b0e839b134b48",
  admitted_runtime_profile_digests: [
    "601c846dadbc41d223228c9565f6df7328d45db3bc3cf4b247ef5f25ea27dd7e",
    "bcaa218d411ccf1dbf3b8802af6afdf24186aae45a97eaf4c0b5556de168ba77"
  ] as const,
};

export const TASK6_RELEASE_PROFILE = Object.freeze({
  ...TASK6_RELEASE_PROFILE_PREIMAGE,
  release_profile_contract_digest: sha256Canonical(TASK6_RELEASE_PROFILE_PREIMAGE),
});
