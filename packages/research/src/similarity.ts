import { createHash } from "node:crypto";
import {
  canonicalJson,
  sha256Canonical,
  verifyRecordDigest,
} from "@contentmd/core";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import type { ObservedExpressionEvidenceRecord } from "./observed-expression.js";
import type { ResearchRecordRef } from "./source-record.js";

export const DISTINCTIVE_SIMILARITY_THRESHOLD = 0.72 as const;

export interface DistinctiveExpressionFingerprint {
  contract_version: "contentmd.distinctive-expression-fingerprint/0.1.0";
  normalized_expression: string;
  fingerprint: string;
}

export interface ThirdPartyExpressionSimilarityAssessment {
  contract_version: "contentmd.third-party-expression-similarity/0.1.0";
  blocked: boolean;
  exact_match: boolean;
  maximum_score: number;
  threshold: typeof DISTINCTIVE_SIMILARITY_THRESHOLD;
  matching_evidence_refs: ResearchRecordRef[];
  authority_effect: "none";
}

function assertUnicodeScalars(value: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const unit = value.charCodeAt(index);
    if (unit >= 0xd800 && unit <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) {
        throw new TypeError("distinctive_expression_invalid:unicode_scalar");
      }
      index += 1;
    } else if (unit >= 0xdc00 && unit <= 0xdfff) {
      throw new TypeError("distinctive_expression_invalid:unicode_scalar");
    }
  }
}

export function normalizeDistinctiveExpression(value: string): string {
  assertUnicodeScalars(value);
  return [...value.normalize("NFKC").toLowerCase().matchAll(/[\p{L}\p{N}]+/gu)]
    .map((match) => match[0])
    .join(" ");
}

export function fingerprintDistinctiveExpression(
  value: string,
): DistinctiveExpressionFingerprint {
  const normalizedExpression = normalizeDistinctiveExpression(value);
  if (normalizedExpression.length === 0) {
    throw new TypeError("distinctive_expression_invalid:empty");
  }
  const preimage = {
    contract_version: "contentmd.distinctive-expression-fingerprint/0.1.0" as const,
    normalized_expression: normalizedExpression,
  };
  return {
    ...preimage,
    fingerprint: sha256Canonical(preimage),
  };
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function jaccard(left: readonly string[], right: readonly string[]): number {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  const union = new Set([...leftSet, ...rightSet]);
  if (union.size === 0) return 0;
  let intersection = 0;
  for (const value of leftSet) if (rightSet.has(value)) intersection += 1;
  return intersection / union.size;
}

function characterTrigrams(value: string): string[] {
  const padded = `  ${value}  `;
  if (padded.length <= 3) return [padded];
  const output: string[] = [];
  for (let index = 0; index <= padded.length - 3; index += 1) {
    output.push(padded.slice(index, index + 3));
  }
  return output;
}

function similarity(left: string, right: string): number {
  if (left === right) return 1;
  const tokenScore = jaccard(left.split(" "), right.split(" "));
  const trigramScore = jaccard(characterTrigrams(left), characterTrigrams(right));
  return Number(Math.max(tokenScore, trigramScore).toFixed(6));
}

function refFor(record: ObservedExpressionEvidenceRecord): ResearchRecordRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function compareRefs(left: ResearchRecordRef, right: ResearchRecordRef): number {
  const leftBytes = canonicalJson(left);
  const rightBytes = canonicalJson(right);
  return leftBytes < rightBytes ? -1 : leftBytes > rightBytes ? 1 : 0;
}

function verifyExpressionEvidence(record: ObservedExpressionEvidenceRecord): void {
  if (!verifyRecordDigest(record).valid
    || !validateRecord(SCHEMA_IDS.observedExpressionEvidence, record).valid
    || record.payload.span_digest !== sha256Utf8(record.payload.bounded_span)) {
    throw new TypeError(`invalid_distinctive_expression_evidence:${record.record_id}`);
  }
  const fingerprint = fingerprintDistinctiveExpression(record.payload.bounded_span);
  if (record.payload.distinctive_expression_fingerprint !== fingerprint.fingerprint) {
    throw new TypeError(`invalid_distinctive_expression_evidence:${record.record_id}`);
  }
}

export function assessThirdPartyExpressionSimilarity(input: {
  candidate_expression: string;
  evidence: readonly ObservedExpressionEvidenceRecord[];
}): ThirdPartyExpressionSimilarityAssessment {
  const candidate = fingerprintDistinctiveExpression(input.candidate_expression);
  let maximumScore = 0;
  let exactMatch = false;
  const matches: ResearchRecordRef[] = [];
  const seen = new Set<string>();
  for (const evidence of input.evidence) {
    verifyExpressionEvidence(evidence);
    if (seen.has(evidence.record_id)) {
      throw new TypeError(`duplicate_distinctive_expression_evidence:${evidence.record_id}`);
    }
    seen.add(evidence.record_id);
    const observed = fingerprintDistinctiveExpression(evidence.payload.bounded_span);
    const score = similarity(candidate.normalized_expression, observed.normalized_expression);
    maximumScore = Math.max(maximumScore, score);
    if (score === 1) exactMatch = true;
    if (score >= DISTINCTIVE_SIMILARITY_THRESHOLD) matches.push(refFor(evidence));
  }
  matches.sort(compareRefs);
  return {
    contract_version: "contentmd.third-party-expression-similarity/0.1.0",
    blocked: matches.length > 0,
    exact_match: exactMatch,
    maximum_score: maximumScore,
    threshold: DISTINCTIVE_SIMILARITY_THRESHOLD,
    matching_evidence_refs: matches,
    authority_effect: "none",
  };
}
