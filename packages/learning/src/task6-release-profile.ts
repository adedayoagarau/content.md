import { sha256Canonical } from "@contentmd/core";

const TASK6_RELEASE_PROFILE_PREIMAGE = {
  contract_version: "contentmd.task6-release-profile/0.1.0" as const,
  manifest_raw_bytes_digest: "bbd166d7b453a35f2f6498c29df99c70d7dbc2f2036e2bd989fe08a4cd354f32",
  manifest_digest: "bbd166d7b453a35f2f6498c29df99c70d7dbc2f2036e2bd989fe08a4cd354f32",
  admitted_runtime_profile_digests: [
    "601c846dadbc41d223228c9565f6df7328d45db3bc3cf4b247ef5f25ea27dd7e",
    "bcaa218d411ccf1dbf3b8802af6afdf24186aae45a97eaf4c0b5556de168ba77"
  ] as const,
};

export const TASK6_RELEASE_PROFILE = Object.freeze({
  ...TASK6_RELEASE_PROFILE_PREIMAGE,
  release_profile_contract_digest: sha256Canonical(TASK6_RELEASE_PROFILE_PREIMAGE),
});
