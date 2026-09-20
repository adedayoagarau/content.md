import { endianness } from "node:os";
import { sha256Canonical } from "@contentmd/core";

type GoldenRuntimeContract =
  | "contentmd.pairwise-runtime-profile/0.1.0"
  | "contentmd.task6-runtime-profile/0.1.0";

export function currentGoldenRuntimeProfileDigest(
  contractVersion: GoldenRuntimeContract,
): string {
  return sha256Canonical({
    contract_version: contractVersion,
    node_version: process.versions.node,
    v8_version: process.versions.v8,
    icu_version: process.versions.icu!,
    unicode_version: process.versions.unicode!,
    platform: process.platform,
    architecture: process.arch,
    endianness: endianness(),
  });
}
