import { sha256Canonical, type JsonValue } from "./canonical-json.js";

export type SourceLifecycle =
  | "canonical"
  | "active"
  | "draft"
  | "historical"
  | "superseded"
  | "rejected"
  | "unknown";

export type EvidenceClass =
  | "documented"
  | "implemented"
  | "tested"
  | "observed"
  | "approved"
  | "historical";

export type ClaimKind =
  | "product_identity"
  | "audience_job"
  | "workflow_stage"
  | "product_scope"
  | "architecture_decision"
  | "organizational_policy"
  | "implemented_behavior"
  | "live_behavior"
  | "content_expression"
  | "voice_guidance"
  | "terminology_guidance"
  | "organizational_approval";

export interface EvidenceClaim {
  claim_id: string;
  claim_kind: ClaimKind;
  subject: string;
  value: JsonValue;
  evidence_class: EvidenceClass;
  source_ref: string;
  source_span: { start_line: number; end_line: number };
  source_links?: Array<{ label: string; target: string; line: number }>;
  lifecycle: SourceLifecycle;
  effective_date: string | null;
  scope: string[];
  confidence: "high" | "medium" | "low";
  limitations: string[];
  authority_effect: "none";
  claim_digest: string;
}

export type AuthorityResolution =
  | "explicit_lifecycle_and_scope"
  | "configured_authority_source"
  | "evidence_class_applicability"
  | "unresolved";

export interface AuthorityAssessment {
  assessment_id: string;
  claim_kind: ClaimKind;
  subject: string;
  scope: string[];
  selected_claim_ref: string | null;
  supporting_claim_refs: string[];
  conflicting_claim_refs: string[];
  superseded_claim_refs: string[];
  resolution: AuthorityResolution;
  limitations: string[];
  authority_effect: "none";
  assessment_digest: string;
}

export interface ResolveAuthorityOptions {
  authority_source_refs?: string[];
}

export interface EvidenceClaimDraftInput {
  claim_kind: ClaimKind;
  subject: string;
  value: JsonValue;
  source_ref: string;
  source_span: { start_line: number; end_line: number };
  source_links: Array<{ label: string; target: string; line: number }>;
  confidence: "high" | "medium" | "low";
  limitations: string[];
  authority_effect: "none";
}

export interface EvidenceSourceCandidateInput {
  source_id: string;
  relative_path: string;
  lifecycle: SourceLifecycle;
  evidence_class: EvidenceClass;
  declared_date: string | null;
  scope: {
    products: string[];
    services: string[];
    markets: string[];
    locales: string[];
    surfaces: string[];
    versions: string[];
  };
  limitations: string[];
  authority_effect: "none";
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

function sourceScope(source: EvidenceSourceCandidateInput): string[] {
  const dimensions: Array<[string, string[]]> = [
    ["product", source.scope.products],
    ["service", source.scope.services],
    ["market", source.scope.markets],
    ["locale", source.scope.locales],
    ["surface", source.scope.surfaces],
    ["version", source.scope.versions],
  ];
  const scope = dimensions.flatMap(([dimension, values]) => values.map((value) => `${dimension}:${value}`));
  return scope.length > 0 ? uniqueSorted(scope) : ["repository"];
}

function claimPreimage(claim: Omit<EvidenceClaim, "claim_digest">): Record<string, unknown> {
  return { ...claim };
}

export function finalizeEvidenceClaim(
  draft: EvidenceClaimDraftInput,
  source: EvidenceSourceCandidateInput,
): EvidenceClaim {
  if (draft.source_ref !== source.relative_path) {
    throw new Error(`evidence_claim_source_mismatch:${draft.source_ref}`);
  }
  if (draft.source_span.start_line < 1 || draft.source_span.end_line < draft.source_span.start_line) {
    throw new Error(`evidence_claim_span_invalid:${draft.source_ref}`);
  }
  const identity = {
    claim_kind: draft.claim_kind,
    subject: draft.subject,
    value: draft.value,
    evidence_class: source.evidence_class,
    source_ref: source.source_id,
    source_span: draft.source_span,
    source_links: draft.source_links,
    lifecycle: source.lifecycle,
    effective_date: source.declared_date,
    scope: sourceScope(source),
    confidence: draft.confidence,
    limitations: uniqueSorted([...source.limitations, ...draft.limitations]),
    authority_effect: "none" as const,
  };
  const claimId = `claim.${sha256Canonical(identity).slice(0, 24)}`;
  const preimage: Omit<EvidenceClaim, "claim_digest"> = { claim_id: claimId, ...identity };
  return { ...preimage, claim_digest: sha256Canonical(claimPreimage(preimage)) };
}

function verifiedClaim(claim: EvidenceClaim): void {
  const { claim_digest: digest, ...preimage } = claim;
  if (sha256Canonical(claimPreimage(preimage)) !== digest) {
    throw new Error(`evidence_claim_digest_mismatch:${claim.claim_id}`);
  }
}

function applicable(claim: EvidenceClaim, authoritySources: Set<string>): boolean {
  if (["draft", "rejected", "superseded", "historical"].includes(claim.lifecycle)) return false;
  switch (claim.claim_kind) {
    case "organizational_approval":
      return claim.evidence_class === "approved" && authoritySources.has(claim.source_ref);
    case "live_behavior":
      return claim.evidence_class === "observed";
    case "implemented_behavior":
      return claim.evidence_class === "implemented" || claim.evidence_class === "tested";
    case "content_expression":
      return ["implemented", "tested", "observed", "approved"].includes(claim.evidence_class) ||
        ((claim.lifecycle === "canonical" || claim.lifecycle === "active") && claim.evidence_class === "documented");
    default:
      return (claim.lifecycle === "canonical" || claim.lifecycle === "active") &&
        (claim.evidence_class === "documented" || claim.evidence_class === "approved");
  }
}

function lifecycleRank(lifecycle: SourceLifecycle): number {
  return { canonical: 5, active: 4, unknown: 3, historical: 2, draft: 1, superseded: 0, rejected: 0 }[lifecycle];
}

function confidenceRank(confidence: EvidenceClaim["confidence"]): number {
  return { high: 3, medium: 2, low: 1 }[confidence];
}

function applicabilityRank(claim: EvidenceClaim): string {
  return [
    String(lifecycleRank(claim.lifecycle)).padStart(2, "0"),
    claim.effective_date ?? "",
    String(confidenceRank(claim.confidence)).padStart(2, "0"),
  ].join(":");
}

function groupKey(claim: EvidenceClaim): string {
  return sha256Canonical({ claim_kind: claim.claim_kind, subject: claim.subject, scope: uniqueSorted(claim.scope) });
}

function resolutionFor(claim: EvidenceClaim): AuthorityResolution {
  if (claim.claim_kind === "organizational_approval") return "configured_authority_source";
  if (["live_behavior", "implemented_behavior", "content_expression"].includes(claim.claim_kind)) {
    return "evidence_class_applicability";
  }
  return "explicit_lifecycle_and_scope";
}

export function resolveAuthority(
  claims: EvidenceClaim[],
  options: ResolveAuthorityOptions = {},
): AuthorityAssessment[] {
  claims.forEach(verifiedClaim);
  const authoritySources = new Set(options.authority_source_refs ?? []);
  const groups = new Map<string, EvidenceClaim[]>();
  for (const claim of claims) {
    const key = groupKey(claim);
    groups.set(key, [...(groups.get(key) ?? []), claim]);
  }

  return [...groups.entries()].sort(([left], [right]) => left.localeCompare(right, "en")).map(([, group]) => {
    const ordered = [...group].sort((left, right) => left.claim_id.localeCompare(right.claim_id, "en"));
    const eligible = ordered.filter((claim) => applicable(claim, authoritySources));
    const topRank = eligible.map(applicabilityRank).sort().at(-1) ?? null;
    const top = topRank === null ? [] : eligible.filter((claim) => applicabilityRank(claim) === topRank);
    const valueDigests = new Set(top.map((claim) => sha256Canonical(claim.value)));
    const selected = top.length > 0 && valueDigests.size === 1 ? top[0] ?? null : null;
    const conflicting = selected === null
      ? ordered
      : ordered.filter((claim) => sha256Canonical(claim.value) !== sha256Canonical(selected.value));
    const supporting = selected === null
      ? []
      : top.filter((claim) => claim.claim_id !== selected.claim_id && sha256Canonical(claim.value) === sha256Canonical(selected.value));
    const first = ordered[0];
    if (first === undefined) throw new Error("authority_assessment_empty_group");
    const assessmentIdentity = {
      claim_kind: first.claim_kind,
      subject: first.subject,
      scope: uniqueSorted(first.scope),
      claim_refs: ordered.map((claim) => claim.claim_id),
    };
    const assessmentId = `authority.${sha256Canonical(assessmentIdentity).slice(0, 24)}`;
    const preimage: Omit<AuthorityAssessment, "assessment_digest"> = {
      assessment_id: assessmentId,
      claim_kind: first.claim_kind,
      subject: first.subject,
      scope: uniqueSorted(first.scope),
      selected_claim_ref: selected?.claim_id ?? null,
      supporting_claim_refs: supporting.map((claim) => claim.claim_id),
      conflicting_claim_refs: conflicting.map((claim) => claim.claim_id),
      superseded_claim_refs: ordered
        .filter((claim) => claim.lifecycle === "superseded" || claim.lifecycle === "rejected")
        .map((claim) => claim.claim_id),
      resolution: selected === null ? "unresolved" : resolutionFor(selected),
      limitations: selected === null ? ["authority_unresolved"] : ["selection_does_not_grant_authority"],
      authority_effect: "none",
    };
    return { ...preimage, assessment_digest: sha256Canonical(preimage) };
  });
}
