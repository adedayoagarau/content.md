import { sha256Canonical } from "@contentmd/core";

const TASK6_RELEASE_PROFILE_PREIMAGE = {
  contract_version: "contentmd.task6-release-profile/0.1.0" as const,
  manifest_raw_bytes_digest: "72e6cb75e9d938bffac47163c6289e02090df43c2c452568326297c95eac63fe",
  manifest_digest: "72e6cb75e9d938bffac47163c6289e02090df43c2c452568326297c95eac63fe",
  admitted_runtime_profile_digests: [
    "9e6043132165513ea090e92540f5d3f4c4aa4c0f98a23784f6ed683f2b4c9656",
    "e08c1f54731db0ade599ad63b97edbbf06caae7c84e5f5160a5e154ab4428fb7",
  ] as const,
};

export const TASK6_RELEASE_PROFILE = Object.freeze({
  ...TASK6_RELEASE_PROFILE_PREIMAGE,
  release_profile_contract_digest: sha256Canonical(TASK6_RELEASE_PROFILE_PREIMAGE),
});
