import type { DurableRecord } from "@contentmd/core";

export interface ResearchRecordRef {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}

export type ResearchAuthorityEffect = "none";

export interface ResearchSourcePayload {
  contract_version: "contentmd.research-source/0.1.0";
  requested_url: string;
  canonical_url: string;
  effective_url: string;
  publisher: string;
  title: string;
  accessed_at: string;
  access_method:
    | "operator_directed_computer_use_public_web"
    | "official_document_download"
    | "recorded_fixture";
  body_retention_state: "body_not_retained" | "bounded_span_retained";
  retained_content_digest: string | null;
  access_disposition: "public_unauthenticated" | "not_observed" | "access_blocked";
  rights_disposition:
    | "rights_unknown_evidence_only"
    | "licensed_evidence_only"
    | "public_domain_evidence_only"
    | "project_owned";
  profile_isolation_state: "established_signed_out_ephemeral" | "not_established";
  privacy_class: "public_no_personal_data";
  redirects: string[];
  limitations: string[];
  authority_effect: ResearchAuthorityEffect;
}

export type ResearchSourceRecord = DurableRecord<ResearchSourcePayload>;
