import { endianness } from "node:os";
import { sha256Canonical } from "@contentmd/core";

export const RELEASE_NODE_VERSION = "24.20.0" as const;

export interface ReleaseRuntimeTarget {
  platform: "darwin" | "linux";
  architecture: "arm64" | "x64";
  fixture_suffix: "" | ".linux-x64";
}

export function currentReleaseRuntimeTarget(): ReleaseRuntimeTarget {
  if (process.platform === "darwin" && process.arch === "arm64") {
    return { platform: "darwin", architecture: "arm64", fixture_suffix: "" };
  }
  if (process.platform === "linux" && process.arch === "x64") {
    return { platform: "linux", architecture: "x64", fixture_suffix: ".linux-x64" };
  }
  throw new Error(`unsupported_release_runtime_target:${process.platform}:${process.arch}`);
}

function observedRuntimeIdentity(contractVersion:
  | "contentmd.pairwise-runtime-profile/0.1.0"
  | "contentmd.task6-runtime-profile/0.1.0") {
  const icu = process.versions.icu;
  const unicode = process.versions.unicode;
  if (icu === undefined || unicode === undefined) {
    throw new Error("release_runtime_i18n_versions_unavailable");
  }
  currentReleaseRuntimeTarget();
  return {
    contract_version: contractVersion,
    node_version: RELEASE_NODE_VERSION,
    v8_version: process.versions.v8,
    icu_version: icu,
    unicode_version: unicode,
    platform: process.platform,
    architecture: process.arch,
    endianness: endianness(),
  };
}

export function pairwiseRuntimeProfileInput() {
  const identity = observedRuntimeIdentity("contentmd.pairwise-runtime-profile/0.1.0");
  return { ...identity, profile_digest: sha256Canonical(identity) };
}

export function task6RuntimeProfileInput() {
  const identity = observedRuntimeIdentity("contentmd.task6-runtime-profile/0.1.0");
  return { ...identity, profile_digest: sha256Canonical(identity) };
}
