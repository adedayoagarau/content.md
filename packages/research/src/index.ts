export const PACKAGE_ID = "@contentmd/research" as const;

export * from "./ingest.js";
export * from "./browser-observation.js";
export * from "./claim-record.js";
export * from "./observed-expression.js";
export * from "./pattern-converter.js";
export * from "./pattern-disposition.js";
export * from "./pattern-synthesis.js";
export {
  derivePublicEvidenceSubjectRef,
  verifyPublicEvidenceDispositionLedger,
  type EvidenceDispositionReason,
  type ProposedEvidenceTransition,
  type PublicEvidenceDispositionEvent,
  type PublicEvidenceDispositionLedgerHead,
  type PublicEvidenceDispositionSet,
  type PublicEvidenceSubjectRef,
  type ResolvedEvidenceDisposition,
  type VerifiedDispositionLedger,
} from "./public-evidence-disposition.js";
export {
  PublicProductContractError,
  PUBLIC_PRODUCT_ERROR_PRECEDENCE,
  assertClosedPlainRecord,
  compareUnicodeScalar,
  immutableClone,
  sha256Bytes,
  type PublicProductContractErrorCode,
  type PublicProductDigestRef,
} from "./public-product-contracts.js";
export {
  createPublicProductReviewReceipt,
  verifyPublicProductReviewPair,
  type PublicProductReviewGovernanceEvidence,
  type PublicProductReviewKind,
  type PublicProductReviewReceipt,
} from "./public-product-review.js";
export {
  PUBLIC_PRODUCT_COVERAGE_SLOTS,
  createTaxonomyProposal,
  normalizePublicProductSignature,
  verifyPublicProductExperienceTaxonomy,
  type ExperienceMapping,
  type NormalizedStructuralSignature,
  type PublicProductExperienceTaxonomy,
  type PublicProductTaxonomyDefinition,
  type PublicProductTaxonomyProposal,
  type RawStructuralSignature,
  type VerifiedExperienceTaxonomy,
} from "./public-product-taxonomy.js";
export {
  verifyPublicProductCorpusV2,
  type NormalizedPublicProductEvidence,
  type PublicProductActiveCounts,
  type PublicProductBatchBytes,
  type PublicProductCorpusError,
  type PublicProductCorpusReportV2,
  type PublicProductCorpusTargets,
  type PublicProductCoverageCounts,
  type PublicProductRawCounts,
  type VerifyPublicProductCorpusV2Input,
} from "./public-product-projection.js";
export {
  adjudicatePublicProductPatternReviewsV2,
  compilePublicProductPatternHypothesesV2,
  type CanonicalPatternSignature,
  type PublicProductPatternAdjudicationV2,
  type PublicProductPatternHypothesisReportV2,
  type PublicProductPatternHypothesisV2,
} from "./public-product-hypothesis.js";
export {
  planPublicProductCorpusExpansionV2,
  type ExpansionProductAssignment,
  type PublicProductExpansionPlanV2,
} from "./public-product-expansion.js";
export * from "./pattern-packet-v01.js";
export * from "./pattern-record.js";
export * from "./research-batch.js";
export * from "./ranking-boundary.js";
export * from "./retrieve.js";
export * from "./source-record.js";
export * from "./similarity.js";
export * from "./voice-tone-records.js";
export * from "./voice-tone-graph.js";
export * from "./voice-tone-map.js";
