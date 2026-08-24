import { createHash } from "node:crypto";
import { sha256Canonical } from "@contentmd/core";
import {
  rankEligibleExpressions,
  type SimulatedBindingProjection,
  type Task6ObjectRef,
  type VerifiedPairwiseCandidate,
  type VerifiedRankingModel,
} from "@contentmd/learning";
import type { ContentDraftProposal } from "@contentmd/writer";

export type DraftSelectionReason =
  | "active_model_verified"
  | "no_active_binding"
  | "binding_baseline"
  | "binding_suspended"
  | "binding_pending_readback"
  | "active_model_evidence_missing"
  | "active_model_binding_mismatch"
  | "active_model_verification_failed";

export interface GovernedDraftSelection {
  readonly contract_version: "contentmd.governed-draft-selection/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
  readonly proposal_id: string;
  readonly draft_digest: string;
  readonly fallback_baseline_ref: Task6ObjectRef;
  readonly binding_projection_id: string | null;
  readonly binding_projection_digest: string | null;
  readonly model_ref: Task6ObjectRef | null;
  readonly selection_path: "verified_learned_rank" | "deterministic_safe_fallback";
  readonly reason_code: DraftSelectionReason;
  readonly selected_alternative_index: number;
  readonly selected_expression_digest: string;
  readonly ordered_expression_digests: readonly [string, ...string[]];
  readonly ranking_output_digest: string | null;
  readonly selection_digest: string;
}

export interface SelectGovernedDraftAlternativeInput {
  readonly record_mode: "development_fixture";
  readonly draft: ContentDraftProposal;
  readonly fallback_baseline_ref: Task6ObjectRef;
  readonly binding_projection: SimulatedBindingProjection | null;
  readonly verified_model: VerifiedRankingModel | null;
  readonly verified_candidates:
    | readonly [VerifiedPairwiseCandidate, ...VerifiedPairwiseCandidate[]]
    | null;
}

const DIGEST = /^[a-f0-9]{64}$/u;

function fail(code: string): never {
  throw new Error(`draft_selection_invalid:${code}`);
}

function expressionDigest(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function sameRef(left: Task6ObjectRef | null, right: Task6ObjectRef): boolean {
  return left !== null
    && left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

function validRef(value: Task6ObjectRef): boolean {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && typeof value.record_id === "string" && value.record_id.length > 0
    && typeof value.schema_id === "string" && value.schema_id.length > 0
    && value.schema_version === "0.1.0"
    && DIGEST.test(value.content_digest);
}

function verifyProjection(value: SimulatedBindingProjection): void {
  if (value.contract_version !== "contentmd.simulated-binding-projection/0.1.0"
    || value.record_mode !== "development_fixture"
    || value.authority_effect !== "none"
    || typeof value.projection_id !== "string"
    || !DIGEST.test(value.projection_digest)
    || value.baseline_ref === null
    || !validRef(value.baseline_ref)) {
    fail("binding_projection");
  }
  const { projection_id: projectionId, projection_digest: projectionDigest, ...semantic } = value;
  const expectedDigest = sha256Canonical(semantic);
  if (projectionDigest !== expectedDigest
    || projectionId !== `simulated_binding_projection.${expectedDigest.slice(0, 32)}`) {
    fail("binding_projection");
  }
}

function deepFreeze(value: unknown, seen = new Set<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  Object.freeze(value);
}

function immutable<T>(value: T): T {
  const copy = structuredClone(value);
  deepFreeze(copy);
  return copy;
}

function modelRef(model: VerifiedRankingModel): Task6ObjectRef {
  return {
    record_id: model.record.record_id,
    schema_id: model.record.schema_id,
    schema_version: model.record.schema_version,
    content_digest: model.record.content_digest,
  };
}

function fallbackReason(projection: SimulatedBindingProjection | null): DraftSelectionReason {
  if (projection === null) return "no_active_binding";
  if (projection.projection_stage === "pending") return "binding_pending_readback";
  if (projection.state === "baseline") return "binding_baseline";
  if (projection.state === "suspended") return "binding_suspended";
  return "active_model_evidence_missing";
}

export function selectGovernedDraftAlternative(
  input: SelectGovernedDraftAlternativeInput,
): GovernedDraftSelection {
  if (input === null || typeof input !== "object" || input.record_mode !== "development_fixture"
    || input.draft === null || typeof input.draft !== "object"
    || input.draft.schema_version !== "contentmd.draft-proposal/0.1.0"
    || input.draft.lifecycle_state !== "proposed"
    || input.draft.authority_effect !== "none"
    || typeof input.draft.proposal_id !== "string" || input.draft.proposal_id.length === 0
    || !Array.isArray(input.draft.alternatives) || input.draft.alternatives.length === 0
    || !validRef(input.fallback_baseline_ref)) {
    fail("input");
  }
  if (input.binding_projection !== null) {
    verifyProjection(input.binding_projection);
    if (!sameRef(input.binding_projection.baseline_ref, input.fallback_baseline_ref)) {
      fail("baseline_binding");
    }
  }
  const alternativeDigests = input.draft.alternatives.map((alternative) => {
    if (alternative === null || typeof alternative !== "object"
      || typeof alternative.proposed_text !== "string") fail("alternative");
    return expressionDigest(alternative.proposed_text);
  });
  if (new Set(alternativeDigests).size !== alternativeDigests.length) {
    fail("duplicate_expression");
  }
  const deterministicOrder = alternativeDigests
    .map((digest, index) => ({ digest, index }))
    .sort((left, right) => left.digest < right.digest ? -1 : left.digest > right.digest ? 1 : 0);

  let selectionPath: GovernedDraftSelection["selection_path"] = "deterministic_safe_fallback";
  let reasonCode = fallbackReason(input.binding_projection);
  let selected = deterministicOrder[0]!;
  let orderedExpressionDigests = deterministicOrder.map(({ digest }) => digest) as [string, ...string[]];
  let selectedModelRef: Task6ObjectRef | null = null;
  let rankingOutputDigest: string | null = null;

  if (input.binding_projection?.projection_stage === "verified"
    && input.binding_projection.state === "candidate") {
    if (input.binding_projection.model_ref === null
      || input.verified_model === null
      || input.verified_candidates === null) {
      reasonCode = "active_model_evidence_missing";
    } else {
      const verifiedModelRef = modelRef(input.verified_model);
      if (!sameRef(input.binding_projection.model_ref, verifiedModelRef)) {
        reasonCode = "active_model_binding_mismatch";
      } else {
        if (input.verified_candidates.length !== alternativeDigests.length
          || input.verified_candidates.some((candidate) =>
            !alternativeDigests.includes(candidate.expression_digest))) {
          fail("candidate_expression_binding");
        }
        try {
          const ranking = rankEligibleExpressions(input.verified_model, input.verified_candidates);
          const ordered = ranking.ordered_candidates.map((candidate) => {
            const index = alternativeDigests.indexOf(candidate.expression_digest);
            if (index < 0) fail("candidate_expression_binding");
            return { digest: candidate.expression_digest, index };
          });
          selectionPath = "verified_learned_rank";
          reasonCode = "active_model_verified";
          selected = ordered[0]!;
          orderedExpressionDigests = ordered.map(({ digest }) => digest) as [string, ...string[]];
          selectedModelRef = verifiedModelRef;
          rankingOutputDigest = ranking.output_digest;
        } catch (error) {
          if (error instanceof Error && error.message === "draft_selection_invalid:candidate_expression_binding") {
            throw error;
          }
          reasonCode = "active_model_verification_failed";
        }
      }
    }
  }

  const preimage = {
    contract_version: "contentmd.governed-draft-selection/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    proposal_id: input.draft.proposal_id,
    draft_digest: sha256Canonical(input.draft),
    fallback_baseline_ref: input.fallback_baseline_ref,
    binding_projection_id: input.binding_projection?.projection_id ?? null,
    binding_projection_digest: input.binding_projection?.projection_digest ?? null,
    model_ref: selectedModelRef,
    selection_path: selectionPath,
    reason_code: reasonCode,
    selected_alternative_index: selected.index,
    selected_expression_digest: selected.digest,
    ordered_expression_digests: orderedExpressionDigests,
    ranking_output_digest: rankingOutputDigest,
  };
  return immutable({ ...preimage, selection_digest: sha256Canonical(preimage) });
}
