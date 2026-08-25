import { lstat, mkdir, open, readFile, realpath, rename, unlink } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { dirname, isAbsolute, join, relative, sep } from "node:path";
import {
  canonicalJson,
  sha256Canonical,
  type ClaimKind,
  type JsonValue,
} from "@contentmd/core";
import { compileProjectModel, type ProjectModelResult } from "./model-workflow.js";

const REQUESTED_CLAIM_KINDS = [
  "product_identity",
  "audience_job",
  "workflow_stage",
  "voice_guidance",
  "terminology_guidance",
] as const satisfies readonly ClaimKind[];
const MAX_CONTEXT_ITEM_CHARS = 12_000;
const MAX_PACKET_CONTEXT_CHARS = 48_000;

export interface RepositoryInterpretationContextItem {
  source_ref: string;
  locator: string;
  content_digest: string;
  bounded_text: string;
}

export interface RepositoryInterpretationPacket {
  contract_version: "contentmd.repository-interpretation-packet/0.1.0";
  project_id: string;
  inventory_ref: string;
  context_items: RepositoryInterpretationContextItem[];
  requested_claim_kinds: ClaimKind[];
  output_contract: "contentmd.repository-interpretation-response/0.1.0";
  authority_effect: "none";
  packet_digest: string;
}

export interface InterpretationCitation {
  source_ref: string;
  source_digest: string;
  start_line: number;
  end_line: number;
  quoted_text: string;
}

export interface ProposedInterpretationClaim {
  claim_kind: (typeof REQUESTED_CLAIM_KINDS)[number];
  subject: string;
  value: string | string[];
  citations: InterpretationCitation[];
  confidence: "high" | "medium" | "low";
  limitations: string[];
  decision_status: "proposed";
  authority_effect: "none";
}

export interface RepositoryInterpretationResponse {
  contract_version: "contentmd.repository-interpretation-response/0.1.0";
  packet_digest: string;
  project_id: string;
  proposed_claims: ProposedInterpretationClaim[];
  persona_candidates: Array<{
    name: string;
    description: string;
    citations: InterpretationCitation[];
    authority_effect: "none";
  }>;
  voice_dimensions: Array<{
    dimension: string;
    position: number;
    rationale: string;
    citations: InterpretationCitation[];
    authority_effect: "none";
  }>;
  terminology_candidates: Array<{
    term: string;
    guidance: string;
    citations: InterpretationCitation[];
    authority_effect: "none";
  }>;
  conflicts: Array<{
    summary: string;
    claim_refs: string[];
    citations: InterpretationCitation[];
    authority_effect: "none";
  }>;
  open_questions: Array<{
    question: string;
    citations: InterpretationCitation[];
    authority_effect: "none";
  }>;
}

export interface ProposedInterpretationReceipt {
  contract_version: "contentmd.repository-interpretation-receipt/0.1.0";
  project_id: string;
  packet_digest: string;
  record_ref: ".contentmd/records/repository-interpretation.json";
  record_digest: string;
  accepted_proposed_claims: number;
  authority_effect: "none";
  receipt_digest: string;
}

function boundedText(content: string, remaining: number): string {
  const limit = Math.min(MAX_CONTEXT_ITEM_CHARS, remaining);
  if (content.length <= limit) return content;
  const candidate = content.slice(0, limit);
  const lastNewline = candidate.lastIndexOf("\n");
  return lastNewline > 0 ? candidate.slice(0, lastNewline + 1) : candidate;
}

export function createRepositoryInterpretationPacket(
  model: ProjectModelResult,
): RepositoryInterpretationPacket {
  let remaining = MAX_PACKET_CONTEXT_CHARS;
  const contextItems = [...model.sources]
    .sort((left, right) => left.locator.localeCompare(right.locator, "en"))
    .flatMap((source) => {
      if (remaining <= 0) return [];
      const text = boundedText(source.content, remaining);
      remaining -= text.length;
      return [{
        source_ref: source.source_id,
        locator: source.locator,
        content_digest: source.content_digest,
        bounded_text: text,
      }];
    });
  const preimage = {
    contract_version: "contentmd.repository-interpretation-packet/0.1.0" as const,
    project_id: model.project_id,
    inventory_ref: model.discovery.inventory.inventory_digest,
    context_items: contextItems,
    requested_claim_kinds: [...REQUESTED_CLAIM_KINDS],
    output_contract: "contentmd.repository-interpretation-response/0.1.0" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, packet_digest: sha256Canonical(preimage) };
}

function record(value: unknown, code = "interpretation_response_invalid"): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(code);
  return value as Record<string, unknown>;
}

function exactKeys(value: Record<string, unknown>, expected: string[]): void {
  const actual = Object.keys(value).sort((left, right) => left.localeCompare(right, "en"));
  const wanted = [...expected].sort((left, right) => left.localeCompare(right, "en"));
  if (canonicalJson(actual) !== canonicalJson(wanted)) throw new Error("interpretation_response_invalid");
}

function nonemptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function stringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(nonemptyString);
}

function citations(value: unknown): InterpretationCitation[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error("interpretation_response_invalid");
  return value.map((entry) => {
    const item = record(entry);
    exactKeys(item, ["source_ref", "source_digest", "start_line", "end_line", "quoted_text"]);
    if (
      !nonemptyString(item.source_ref) || !nonemptyString(item.source_digest) ||
      !Number.isInteger(item.start_line) || !Number.isInteger(item.end_line) ||
      typeof item.quoted_text !== "string"
    ) throw new Error("interpretation_response_invalid");
    return item as unknown as InterpretationCitation;
  });
}

function validateResponse(value: unknown): RepositoryInterpretationResponse {
  const response = record(value);
  exactKeys(response, [
    "contract_version", "packet_digest", "project_id", "proposed_claims",
    "persona_candidates", "voice_dimensions", "terminology_candidates", "conflicts", "open_questions",
  ]);
  if (
    response.contract_version !== "contentmd.repository-interpretation-response/0.1.0" ||
    !nonemptyString(response.packet_digest) || !nonemptyString(response.project_id)
  ) throw new Error("interpretation_response_invalid");
  for (const key of ["proposed_claims", "persona_candidates", "voice_dimensions", "terminology_candidates", "conflicts", "open_questions"]) {
    if (!Array.isArray(response[key])) throw new Error("interpretation_response_invalid");
  }

  for (const entry of response.proposed_claims as unknown[]) {
    const item = record(entry);
    exactKeys(item, ["claim_kind", "subject", "value", "citations", "confidence", "limitations", "decision_status", "authority_effect"]);
    if (!REQUESTED_CLAIM_KINDS.includes(item.claim_kind as (typeof REQUESTED_CLAIM_KINDS)[number])) {
      throw new Error("interpretation_claim_kind_invalid");
    }
    if (
      !nonemptyString(item.subject) ||
      !(nonemptyString(item.value) || (stringList(item.value) && item.value.length > 0)) ||
      !["high", "medium", "low"].includes(String(item.confidence)) ||
      !stringList(item.limitations) || item.decision_status !== "proposed" || item.authority_effect !== "none"
    ) throw new Error("interpretation_response_invalid");
    citations(item.citations);
  }

  const arrayContracts: Array<[string, string[], (item: Record<string, unknown>) => boolean]> = [
    ["persona_candidates", ["name", "description", "citations", "authority_effect"], (item) => nonemptyString(item.name) && nonemptyString(item.description)],
    ["voice_dimensions", ["dimension", "position", "rationale", "citations", "authority_effect"], (item) => nonemptyString(item.dimension) && typeof item.position === "number" && Number.isFinite(item.position) && nonemptyString(item.rationale)],
    ["terminology_candidates", ["term", "guidance", "citations", "authority_effect"], (item) => nonemptyString(item.term) && nonemptyString(item.guidance)],
    ["conflicts", ["summary", "claim_refs", "citations", "authority_effect"], (item) => nonemptyString(item.summary) && stringList(item.claim_refs)],
    ["open_questions", ["question", "citations", "authority_effect"], (item) => nonemptyString(item.question)],
  ];
  for (const [key, keys, valid] of arrayContracts) {
    for (const entry of response[key] as unknown[]) {
      const item = record(entry);
      exactKeys(item, keys);
      if (!valid(item) || item.authority_effect !== "none") throw new Error("interpretation_response_invalid");
      citations(item.citations);
    }
  }
  return response as unknown as RepositoryInterpretationResponse;
}

function allCitations(response: RepositoryInterpretationResponse): InterpretationCitation[] {
  return [
    ...response.proposed_claims,
    ...response.persona_candidates,
    ...response.voice_dimensions,
    ...response.terminology_candidates,
    ...response.conflicts,
    ...response.open_questions,
  ].flatMap((item) => item.citations);
}

function replayCitations(packet: RepositoryInterpretationPacket, response: RepositoryInterpretationResponse): void {
  const sources = new Map(packet.context_items.map((item) => [item.source_ref, item]));
  for (const citation of allCitations(response)) {
    const source = sources.get(citation.source_ref);
    if (source === undefined) throw new Error("interpretation_source_ref_invalid");
    if (citation.source_digest !== source.content_digest) throw new Error("interpretation_source_changed");
    const lines = source.bounded_text.split(/\r?\n/u);
    if (
      citation.start_line < 1 || citation.end_line < citation.start_line ||
      citation.end_line > lines.length
    ) throw new Error("interpretation_source_span_invalid");
    const quoted = lines.slice(citation.start_line - 1, citation.end_line).join("\n");
    if (quoted !== citation.quoted_text) throw new Error("interpretation_source_span_invalid");
  }
}

async function ensureSafeDirectory(root: string, relativePath: string): Promise<string> {
  const resolvedRoot = await realpath(root);
  let current = resolvedRoot;
  for (const part of relativePath.split("/")) {
    current = join(current, part);
    try {
      const stat = await lstat(current);
      if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error("interpretation_write_path_invalid");
    } catch (error) {
      if (error instanceof Error && error.message === "interpretation_write_path_invalid") throw error;
      await mkdir(current, { mode: 0o700 });
    }
    const actual = await realpath(current);
    const fromRoot = relative(resolvedRoot, actual);
    if (isAbsolute(fromRoot) || fromRoot === ".." || fromRoot.startsWith(`..${sep}`)) {
      throw new Error("interpretation_write_path_invalid");
    }
  }
  return current;
}

async function writeCanonicalAtomic(root: string, relativePath: string, value: unknown): Promise<void> {
  const directory = await ensureSafeDirectory(root, dirname(relativePath));
  const target = join(directory, relativePath.slice(dirname(relativePath).length + 1));
  try {
    if ((await lstat(target)).isSymbolicLink()) throw new Error("interpretation_write_path_invalid");
  } catch (error) {
    if (error instanceof Error && error.message === "interpretation_write_path_invalid") throw error;
  }
  const temporary = join(directory, `.${randomUUID()}.tmp`);
  const handle = await open(temporary, "wx", 0o600);
  try {
    await handle.writeFile(canonicalJson(value), "utf8");
    await handle.sync();
    await handle.close();
    await rename(temporary, target);
  } catch (error) {
    await handle.close().catch(() => undefined);
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

export async function ingestRepositoryInterpretation(
  root: string,
  rawResponse: unknown,
): Promise<ProposedInterpretationReceipt> {
  const response = validateResponse(rawResponse);
  const model = await compileProjectModel({ project_root: root });
  const packet = createRepositoryInterpretationPacket(model);
  if (response.project_id !== packet.project_id || response.packet_digest !== packet.packet_digest) {
    throw new Error("interpretation_source_changed");
  }
  replayCitations(packet, response);

  const proposedClaims = response.proposed_claims.map((claim) => {
    const identity = { ...claim };
    const proposalId = `proposed-claim.${sha256Canonical(identity).slice(0, 24)}`;
    const preimage = { proposal_id: proposalId, ...identity };
    return { ...preimage, proposal_digest: sha256Canonical(preimage) };
  });
  const recordPreimage = {
    contract_version: "contentmd.repository-interpretation-record/0.1.0" as const,
    project_id: packet.project_id,
    packet_digest: packet.packet_digest,
    decision_status: "proposed" as const,
    proposed_claims: proposedClaims,
    persona_candidates: response.persona_candidates,
    voice_dimensions: response.voice_dimensions,
    terminology_candidates: response.terminology_candidates,
    conflicts: response.conflicts,
    open_questions: response.open_questions,
    authority_effect: "none" as const,
  };
  const record = { ...recordPreimage, record_digest: sha256Canonical(recordPreimage) };
  const receiptPreimage = {
    contract_version: "contentmd.repository-interpretation-receipt/0.1.0" as const,
    project_id: packet.project_id,
    packet_digest: packet.packet_digest,
    record_ref: ".contentmd/records/repository-interpretation.json" as const,
    record_digest: record.record_digest,
    accepted_proposed_claims: proposedClaims.length,
    authority_effect: "none" as const,
  };
  const receipt = { ...receiptPreimage, receipt_digest: sha256Canonical(receiptPreimage) };
  await writeCanonicalAtomic(root, ".contentmd/records/repository-interpretation.json", record);
  await writeCanonicalAtomic(root, ".contentmd/runtime/repository-interpretation-receipt.json", receipt);
  return receipt;
}
