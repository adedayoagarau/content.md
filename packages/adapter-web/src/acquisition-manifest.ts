import {
  evaluateResearchAcquisition,
  type ResearchAcquisitionDenialReason,
  type ResearchAcquisitionManifest,
} from "@contentmd/research";
import {
  validateRecordedComputerUseCapture,
  type RecordedComputerUseCapture,
} from "./computer-use-capture.js";

export type RecordedCaptureDenialReason =
  | ResearchAcquisitionDenialReason
  | "capture_invalid"
  | "system_not_allowed"
  | "capture_profile_mismatch"
  | "observation_limit_exceeded"
  | "requested_url_not_allowed"
  | "canonical_url_not_allowed"
  | "effective_url_not_allowed"
  | "redirect_not_allowed";

export type RecordedCaptureAcquisitionDecision =
  | { allowed: true; reason: null; authority_effect: "none" }
  | { allowed: false; reason: RecordedCaptureDenialReason; authority_effect: "none" };

function originAllowed(url: string, origins: readonly string[]): boolean {
  return origins.includes(new URL(url).origin);
}

function routeAllowed(url: string, routes: readonly string[]): boolean {
  return routes.includes(url);
}

export function verifyRecordedCaptureAcquisition(
  manifest: ResearchAcquisitionManifest,
  capture: RecordedComputerUseCapture,
): RecordedCaptureAcquisitionDecision {
  const captureValidation = validateRecordedComputerUseCapture(capture);
  if (!captureValidation.valid) {
    return { allowed: false, reason: "capture_invalid", authority_effect: "none" };
  }

  const manifestDecision = evaluateResearchAcquisition(manifest);
  if (manifestDecision.reason === "manifest_invalid"
    || manifestDecision.reason === "manifest_digest_invalid") {
    return manifestDecision;
  }

  if (!manifest.payload.systems.includes(capture.capture_id)) {
    return { allowed: false, reason: "system_not_allowed", authority_effect: "none" };
  }
  if (capture.observations.length > manifest.payload.observation_limit) {
    return { allowed: false, reason: "observation_limit_exceeded", authority_effect: "none" };
  }

  for (const [field, value] of [
    ["requested_url", capture.requested_url],
    ["canonical_url", capture.canonical_url],
    ["effective_url", capture.effective_url],
  ] as const) {
    if (!originAllowed(value, manifest.payload.allowed_origins)
      || !routeAllowed(value, manifest.payload.allowed_routes)) {
      return {
        allowed: false,
        reason: `${field}_not_allowed` as RecordedCaptureDenialReason,
        authority_effect: "none",
      };
    }
  }
  for (const redirect of capture.redirects) {
    if (!originAllowed(redirect, manifest.payload.allowed_origins)
      || !routeAllowed(redirect, manifest.payload.allowed_routes)) {
      return { allowed: false, reason: "redirect_not_allowed", authority_effect: "none" };
    }
  }

  if (manifest.payload.profile_isolation_state === "established_signed_out_ephemeral"
    && capture.profile_isolation_state !== "established_signed_out_ephemeral") {
    return { allowed: false, reason: "capture_profile_mismatch", authority_effect: "none" };
  }
  return manifestDecision;
}
