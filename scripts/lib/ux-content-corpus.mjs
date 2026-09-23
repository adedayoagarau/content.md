import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";

export const UX_CONTENT_CORPUS_COMPILER_VERSION =
  "contentmd.ux-content-corpus-compiler/0.2.0";

export const GENERATED_DIRECTORY = "ux-content-corpus/_generated";

const CORPUS_DIRECTORY = "ux-content-corpus";
const PRODUCT_DIRECTORY = `${CORPUS_DIRECTORY}/products`;
const RIGHTS_POLICY_PATH = `${CORPUS_DIRECTORY}/_schema/RIGHTS-POLICY.json`;
const TAXONOMY_CROSSWALK_PATH = `${CORPUS_DIRECTORY}/_schema/TAXONOMY-CROSSWALK.json`;
const EXISTING_CORPUS_DIRECTORY = "research/09-experimental/public-product-corpus";
const COMPILER_SOURCE_PATHS = [
  "scripts/compile-ux-content-corpus.mjs",
  "scripts/lib/ux-content-corpus.mjs",
];
const REQUIRED_NODE_VERSION = "24.20.0";

const EXPECTED_DOMAINS = ["AI", "COMM", "DEV", "EDU", "FIN", "HLTH", "MEDIA", "PROD", "SVC", "TRAV"];
const TAXONOMY_IDS = Array.from({ length: 14 }, (_, index) => `T${index + 1}`);
const TAXONOMY_ID_SET = new Set(TAXONOMY_IDS);
const COORDINATE_AXES = new Set([
  "work_intent", "journey", "state", "event_state", "message_purposes", "content_slot",
  "interaction_pattern", "action_family", "channel", "attention_mode", "task_structure",
  "state_cause", "content_scope", "reversibility", "conversation_state", "locale", "risk",
]);
const CONTENT_DECISION_DIMENSIONS = new Set([
  "work_intent", "product_context", "evidence_authority", "user_context", "user_need",
  "product_need", "content_need", "experience", "content_object", "risk", "governance",
  "voice_profile", "tone_context", "lifecycle",
]);
const TERMINAL_SECTION_NAMES = ["Transferable patterns", "Caveats & gaps", "Sources"];

function lexical(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function deepSort(value) {
  if (Array.isArray(value)) return value.map(deepSort);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort(lexical).map((key) => [key, deepSort(value[key])]),
    );
  }
  return value;
}

export function canonicalJson(value) {
  return `${JSON.stringify(deepSort(value))}\n`;
}

export function canonicalJsonl(records) {
  return records.map((record) => JSON.stringify(deepSort(record))).join("\n") + (records.length > 0 ? "\n" : "");
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function withDigest(value, field) {
  return { ...value, [field]: sha256(canonicalJson(value)) };
}

function assert(condition, reason) {
  if (!condition) throw new TypeError(`ux_content_corpus_invalid:${reason}`);
}

function repositoryPath(repositoryRoot, path) {
  const root = resolve(repositoryRoot);
  const absolute = resolve(root, path);
  assert(absolute === root || absolute.startsWith(`${root}${sep}`), `path_escape:${path}`);
  return absolute;
}

async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") return false;
    throw error;
  }
}

async function listFiles(root, relativeDirectory = "") {
  const absolute = join(root, relativeDirectory);
  if (!(await pathExists(absolute))) return [];
  const entries = await readdir(absolute, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((left, right) => lexical(left.name, right.name))) {
    const child = join(relativeDirectory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(root, child));
    else if (entry.isFile()) files.push(child.split(sep).join("/"));
  }
  return files;
}

function countLf(bytes) {
  let count = 0;
  for (const byte of bytes) if (byte === 10) count += 1;
  return count;
}

function lineOf(lines, index) {
  return index >= 0 ? index + 1 : null;
}

function normalizeCompany(value) {
  return [...value.normalize("NFKC").toLocaleLowerCase("en-US").matchAll(/[\p{L}\p{N}]+/gu)]
    .map((match) => match[0]).join(" ");
}

function cleanUrl(raw) {
  let value = raw.replace(/[|*_]+$/gu, "").replace(/[.,;:!?]+$/gu, "");
  while (value.endsWith(")")) {
    const opens = [...value].filter((character) => character === "(").length;
    const closes = [...value].filter((character) => character === ")").length;
    if (closes <= opens) break;
    value = value.slice(0, -1);
  }
  return value;
}

function extractUrls(value) {
  const matches = value.match(/https?:\/\/[^\s<>\[\]"'`]+/gu) ?? [];
  return matches.map(cleanUrl).filter((url) => url.length > 8);
}

function parseUrl(raw) {
  const truncated = raw.includes("…") || raw.endsWith("...");
  try {
    const parsed = new URL(raw);
    if (!new Set(["http:", "https:"]).has(parsed.protocol)) throw new Error("protocol");
    return {
      host_key: parsed.hostname.toLocaleLowerCase("en-US").replace(/^www\./u, ""),
      normalized_url: parsed.href,
      status: truncated ? "truncated_or_placeholder" : "syntactically_valid_unverified",
    };
  } catch {
    return { host_key: null, normalized_url: raw, status: "invalid_url" };
  }
}

function evidenceCounts(value) {
  const counts = { absent: 0, documented: 0, observed: 0 };
  for (const match of value.matchAll(/\[(observed|documented|absent)(?=[,\]\s])/giu)) {
    counts[match[1].toLocaleLowerCase("en-US")] += 1;
  }
  return counts;
}

function addEvidenceCounts(target, source) {
  target.absent += source.absent;
  target.documented += source.documented;
  target.observed += source.observed;
}

function evidenceTotal(counts) {
  return counts.absent + counts.documented + counts.observed;
}

function metadataFromLines(lines) {
  const metadata = new Map();
  const lineRefs = new Map();
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^\|\s*([^|]+?)\s*\|\s*(.*?)\s*\|\s*$/u);
    if (!match) continue;
    const field = match[1].trim();
    if (field === "Field" || /^[-:]+$/u.test(field)) continue;
    metadata.set(field, match[2].trim());
    lineRefs.set(field, index + 1);
  }
  return { metadata, lineRefs };
}

function classifyCompleteness(value) {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/^\*\*/u, "").trim().toLocaleLowerCase("en-US");
  if (/^full(?:\b|[*,.])/u.test(cleaned)) return "full";
  if (/^partial(?:\b|[*,.])/u.test(cleaned)) return "partial";
  if (/^blocked(?:\b|[*,.])/u.test(cleaned)) return "blocked";
  return null;
}

function sectionBoundaries(lines) {
  const boundaries = [];
  const seen = new Set();
  const duplicates = [];
  for (let index = 0; index < lines.length; index += 1) {
    const taxonomyMatch = lines[index].match(/^##\s+T(1[0-4]|[1-9])(?:\s+|$)/u);
    if (taxonomyMatch) {
      const taxonomyId = `T${Number(taxonomyMatch[1])}`;
      if (seen.has(taxonomyId)) duplicates.push({ taxonomy_id: taxonomyId, line: index + 1 });
      seen.add(taxonomyId);
      boundaries.push({ kind: "taxonomy", taxonomy_id: taxonomyId, line: index + 1 });
      continue;
    }
    const terminal = TERMINAL_SECTION_NAMES.find((name) => lines[index].trim() === `## ${name}`);
    if (terminal) boundaries.push({ kind: "terminal", name: terminal, line: index + 1 });
  }
  const sections = [];
  for (let index = 0; index < boundaries.length; index += 1) {
    const boundary = boundaries[index];
    const endLine = (boundaries[index + 1]?.line ?? lines.length + 1) - 1;
    if (boundary.kind === "taxonomy") sections.push({ ...boundary, end_line: endLine });
  }
  return { boundaries, duplicates, sections };
}

function terminalRange(lines, boundaries, name) {
  const index = boundaries.findIndex((boundary) => boundary.kind === "terminal" && boundary.name === name);
  if (index < 0) return null;
  return {
    start_line: boundaries[index].line,
    end_line: (boundaries[index + 1]?.line ?? lines.length + 1) - 1,
  };
}

function quoteReviewCandidates(lines) {
  const candidates = [];
  let start = null;
  let collected = [];
  const flush = (endIndex) => {
    if (start === null) return;
    const joined = collected.join("\n");
    const wordCount = (joined.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) ?? []).length;
    if (wordCount > 25) {
      candidates.push({
        digest: sha256(joined),
        end_line: endIndex,
        start_line: start + 1,
        word_count: wordCount,
      });
    }
    start = null;
    collected = [];
  };
  for (let index = 0; index < lines.length; index += 1) {
    if (/^\s*>/u.test(lines[index])) {
      if (start === null) start = index;
      collected.push(lines[index]);
    } else {
      flush(index);
    }
  }
  flush(lines.length);
  return candidates;
}

function rightsForProduct(rank, policy) {
  const override = policy.overrides.find((entry) => entry.product_rank === rank);
  return {
    ...policy.default,
    ...(override ?? {}),
    prohibited_until_separately_authorized: policy.prohibited_until_separately_authorized,
    quotation_review: policy.quotation_review.status,
  };
}

function parseProduct(path, text, rightsPolicy) {
  const lines = text.split("\n");
  if (lines.at(-1) === "") lines.pop();
  const titleLine = lines.findIndex((line) => /^#\s+/u.test(line));
  const titleMatch = titleLine >= 0 ? lines[titleLine].match(/^#\s+(\d{3})\.\s+(.+?)\s*$/u) : null;
  const filenameMatch = path.match(/\/(\d{3})-([^/]+)\.md$/u);
  const { metadata, lineRefs } = metadataFromLines(lines);
  const rank = Number(metadata.get("Corpus rank") ?? titleMatch?.[1] ?? filenameMatch?.[1]);
  const name = titleMatch?.[2] ?? filenameMatch?.[2] ?? "unknown";
  const domain = metadata.get("Domain")?.match(/`([A-Z]+)`/u)?.[1] ?? null;
  const primaryUrlRaw = extractUrls(metadata.get("Primary URL") ?? "")[0] ?? null;
  const primaryUrl = primaryUrlRaw === null ? null : parseUrl(primaryUrlRaw);
  const { boundaries, duplicates, sections } = sectionBoundaries(lines);
  const productEvidence = evidenceCounts(text);
  const quoteCandidates = quoteReviewCandidates(lines);
  const rights = rightsForProduct(rank, rightsPolicy);
  const locale = metadata.get("Locale / market observed") ?? null;
  const sectionRecords = sections.map((section) => {
    const sectionText = lines.slice(section.line - 1, section.end_line).join("\n");
    const counts = evidenceCounts(sectionText);
    return {
      digest: sha256(sectionText),
      end_line: section.end_line,
      evidence_counts: counts,
      evidence_statuses: Object.keys(counts).filter((key) => counts[key] > 0).sort(lexical),
      start_line: section.line,
      taxonomy_id: section.taxonomy_id,
      url_count: lines.slice(section.line - 1, section.end_line)
        .reduce((total, line) => total + extractUrls(line).length, 0),
    };
  });
  const urlOccurrences = [];
  for (let index = 0; index < lines.length; index += 1) {
    for (const rawUrl of extractUrls(lines[index])) {
      urlOccurrences.push({ line: index + 1, raw_url: rawUrl, ...parseUrl(rawUrl) });
    }
  }
  const transferableRange = terminalRange(lines, boundaries, "Transferable patterns");
  const patternCandidates = [];
  if (transferableRange) {
    for (let index = transferableRange.start_line; index < transferableRange.end_line; index += 1) {
      const line = lines[index];
      if (/^(?:[-*+]\s+|\d+\.\s+)/u.test(line)) {
        patternCandidates.push({ digest: sha256(line), line: index + 1 });
      }
    }
  }
  return {
    auth_state: metadata.get("Auth state") ?? null,
    completeness: classifyCompleteness(metadata.get("Harvest completeness")),
    completeness_digest: metadata.has("Harvest completeness")
      ? sha256(metadata.get("Harvest completeness")) : null,
    domain,
    duplicates,
    harvest_date: metadata.get("Harvest date") ?? null,
    industry: metadata.get("Industry / sub-vertical") ?? null,
    language_review_status: locale && /(?:\ben(?:-[a-z]{2})?\b|\benglish\b)/iu.test(locale)
      ? "english_indicated" : "manual_review_required",
    line_count: lines.length,
    line_refs: Object.fromEntries(lineRefs),
    locale,
    metadata_fields: [...metadata.keys()].sort(lexical),
    name,
    pages_inspected: metadata.get("Pages inspected") ?? null,
    pattern_candidates: patternCandidates,
    platform: metadata.get("Platform observed") ?? null,
    primary_host: primaryUrl?.host_key ?? null,
    primary_url: primaryUrl?.normalized_url ?? null,
    primary_url_status: primaryUrl?.status ?? "missing",
    product_evidence: productEvidence,
    quote_candidates: quoteCandidates,
    rank,
    rights,
    section_records: sectionRecords,
    source_file: path,
    source_text_digest: sha256(text),
    terminal_sections: Object.fromEntries(TERMINAL_SECTION_NAMES.map((terminal) => [
      terminal, terminalRange(lines, boundaries, terminal),
    ])),
    title_line: lineOf(lines, titleLine),
    url_occurrences: urlOccurrences,
  };
}

function validateRightsPolicy(policy) {
  assert(policy?.$schema_version === "contentmd.ux-content-corpus-rights-policy/0.2.0", "rights_policy_version");
  assert(policy.default?.authority_effect === "none", "rights_policy_authority");
  assert(policy.default?.model_processing_eligibility
    === "classification_and_evaluation_with_explicit_run_authorization",
    "rights_policy_model_processing_eligibility");
  assert(policy.default?.model_retention_eligibility === "transient_only",
    "rights_policy_model_retention_eligibility");
  assert(policy.default?.processing_authorization_required === true,
    "rights_policy_processing_authorization");
  assert(policy.default?.prompt_eligibility === "never", "rights_policy_prompt_eligibility");
  assert(policy.default?.training_eligibility === "never", "rights_policy_training_eligibility");
  assert(policy.default?.benchmark_eligibility === false, "rights_policy_benchmark_eligibility");
  assert(Array.isArray(policy.overrides), "rights_policy_overrides");
  for (const override of policy.overrides) {
    if (override.rights_status === "excluded_pending_legal_review") {
      assert(override.model_processing_eligibility === "never",
        `rights_policy_excluded_model_processing:${override.product_rank}`);
      assert(override.model_retention_eligibility === "never",
        `rights_policy_excluded_model_retention:${override.product_rank}`);
    }
  }
}

function validateCrosswalk(crosswalk) {
  assert(crosswalk?.$schema_version === "contentmd.ux-content-corpus-taxonomy-crosswalk/0.1.0", "crosswalk_version");
  assert(crosswalk.authority_effect === "none", "crosswalk_authority");
  assert(Array.isArray(crosswalk.entries) && crosswalk.entries.length === 14, "crosswalk_entry_count");
  const ids = crosswalk.entries.map((entry) => entry.taxonomy_id).sort((left, right) =>
    Number(left.slice(1)) - Number(right.slice(1)));
  assert(JSON.stringify(ids) === JSON.stringify(TAXONOMY_IDS), "crosswalk_taxonomy_coverage");
  for (const entry of crosswalk.entries) {
    assert(TAXONOMY_ID_SET.has(entry.taxonomy_id), `crosswalk_taxonomy_id:${entry.taxonomy_id}`);
    assert(typeof entry.label === "string" && entry.label.length > 0, `crosswalk_label:${entry.taxonomy_id}`);
    assert(typeof entry.non_equivalence === "string" && entry.non_equivalence.length > 0,
      `crosswalk_non_equivalence:${entry.taxonomy_id}`);
    assert(entry.coordinate_axes.every((axis) => COORDINATE_AXES.has(axis)),
      `crosswalk_coordinate_axis:${entry.taxonomy_id}`);
    assert(entry.content_decision_dimensions.every((dimension) => CONTENT_DECISION_DIMENSIONS.has(dimension)),
      `crosswalk_decision_dimension:${entry.taxonomy_id}`);
  }
}

async function loadExistingCorpusSources(repositoryRoot) {
  const files = (await listFiles(repositoryRoot, EXISTING_CORPUS_DIRECTORY))
    .filter((path) => path.endsWith("/sources.jsonl"));
  const records = [];
  const witnesses = [];
  for (const path of files) {
    const bytes = await readFile(repositoryPath(repositoryRoot, path));
    witnesses.push({
      byte_count: bytes.length,
      path,
      raw_bytes_digest: sha256(bytes),
    });
    const lines = bytes.toString("utf8").split("\n");
    for (let index = 0; index < lines.length; index += 1) {
      if (lines[index].trim().length === 0) continue;
      let value;
      try {
        value = JSON.parse(lines[index]);
      } catch {
        throw new TypeError(`ux_content_corpus_invalid:existing_source_json:${path}:${index + 1}`);
      }
      const sourceUrl = value.canonical_url ?? value.source_url ?? null;
      const parsed = typeof sourceUrl === "string" ? parseUrl(sourceUrl) : null;
      records.push({
        company_key: typeof value.company === "string" ? normalizeCompany(value.company) : null,
        host_key: parsed?.host_key ?? null,
        line: index + 1,
        path,
        source_id: typeof value.source_id === "string"
          ? value.source_id : `existing.${sha256(`${path}:${index + 1}`).slice(0, 16)}`,
      });
    }
  }
  const dependency = withDigest({
    contract_version: "contentmd.public-product-source-dependency/0.1.0",
    file_count: witnesses.length,
    files: witnesses.sort((left, right) => lexical(left.path, right.path)),
    source_record_count: records.length,
  }, "dependency_digest");
  return { dependency, records };
}

function assignSplits(products) {
  const assignments = new Map();
  for (const domain of EXPECTED_DOMAINS) {
    const members = products.filter((product) => product.domain === domain)
      .map((product) => ({
        product,
        split_key: sha256(`contentmd.ux-content-corpus-split/0.1.0:${product.rank}`),
      }))
      .sort((left, right) => lexical(left.split_key, right.split_key));
    for (let index = 0; index < members.length; index += 1) {
      const split = index < 14 ? "discovery" : index < 17 ? "calibration" : "sealed_evaluation_candidate";
      assignments.set(members[index].product.rank, {
        assignment_digest: sha256(`${members[index].split_key}:${split}`),
        leakage_group_id: `uxcorpus.product.${String(members[index].product.rank).padStart(3, "0")}`,
        split,
      });
    }
  }
  for (const product of products) {
    if (!assignments.has(product.rank)) {
      assignments.set(product.rank, {
        assignment_digest: sha256(`contentmd.ux-content-corpus-split/0.1.0:${product.rank}:unassigned`),
        leakage_group_id: `uxcorpus.product.${String(product.rank).padStart(3, "0")}`,
        split: "unassigned",
      });
    }
  }
  return assignments;
}

function issueSort(left, right) {
  const severityOrder = { error: 0, blocker: 1, warning: 2 };
  return (severityOrder[left.severity] - severityOrder[right.severity])
    || lexical(left.code, right.code)
    || lexical(left.path ?? "", right.path ?? "")
    || ((left.line ?? 0) - (right.line ?? 0));
}

function buildAudit(products, indexText) {
  const issues = [];
  const requiredMetadata = [
    "Domain", "Industry / sub-vertical", "Primary URL", "Corpus rank",
    "Benchmark strength (source list)", "Locale / market observed", "Platform observed",
    "Auth state", "Regulatory posture", "Harvest date", "Pages inspected", "Harvest completeness",
  ];
  const addIssue = (severity, code, detail = {}) => issues.push({ code, severity, ...detail });

  if (products.length !== 200) {
    addIssue("error", "PRODUCT_COUNT_MISMATCH", { actual: products.length, expected: 200, path: PRODUCT_DIRECTORY });
  }
  const ranks = new Map();
  for (const product of products) {
    ranks.set(product.rank, (ranks.get(product.rank) ?? 0) + 1);
    for (const field of requiredMetadata) {
      if (!product.metadata_fields.includes(field)) {
        addIssue("error", "REQUIRED_METADATA_MISSING", {
          field,
          path: product.source_file,
          product_rank: product.rank,
        });
      }
    }
    const filenameRank = Number(product.source_file.match(/\/(\d{3})-/u)?.[1]);
    if (!Number.isInteger(product.rank) || product.rank !== filenameRank) {
      addIssue("error", "PRODUCT_RANK_MISMATCH", {
        filename_rank: Number.isInteger(filenameRank) ? filenameRank : null,
        metadata_rank: Number.isInteger(product.rank) ? product.rank : null,
        path: product.source_file,
      });
    }
    if (!EXPECTED_DOMAINS.includes(product.domain)) {
      addIssue("error", "DOMAIN_INVALID", { actual: product.domain, path: product.source_file, product_rank: product.rank });
    }
    for (const taxonomyId of TAXONOMY_IDS) {
      const section = product.section_records.find((candidate) => candidate.taxonomy_id === taxonomyId);
      if (!section) {
        addIssue("error", "TAXONOMY_SECTION_MISSING", {
          path: product.source_file,
          product_rank: product.rank,
          taxonomy_id: taxonomyId,
        });
      } else if (evidenceTotal(section.evidence_counts) === 0) {
        addIssue("warning", "TAXONOMY_SECTION_EVIDENCE_MARKER_MISSING", {
          line: section.start_line,
          path: product.source_file,
          product_rank: product.rank,
          taxonomy_id: taxonomyId,
        });
      }
    }
    for (const duplicate of product.duplicates) {
      addIssue("error", "TAXONOMY_SECTION_DUPLICATE", {
        line: duplicate.line,
        path: product.source_file,
        product_rank: product.rank,
        taxonomy_id: duplicate.taxonomy_id,
      });
    }
    for (const terminal of TERMINAL_SECTION_NAMES) {
      if (product.terminal_sections[terminal] === null) {
        addIssue("error", "TERMINAL_SECTION_MISSING", {
          path: product.source_file,
          product_rank: product.rank,
          section: terminal,
        });
      }
    }
    if (product.completeness === null) {
      addIssue("warning", "HARVEST_COMPLETENESS_NONCANONICAL", {
        line: product.line_refs["Harvest completeness"] ?? null,
        path: product.source_file,
        product_rank: product.rank,
      });
    }
    if (product.language_review_status !== "english_indicated") {
      addIssue("blocker", "ENGLISH_SCOPE_REQUIRES_REVIEW", {
        line: product.line_refs["Locale / market observed"] ?? null,
        path: product.source_file,
        product_rank: product.rank,
      });
    }
    if (product.primary_url_status !== "syntactically_valid_unverified") {
      addIssue("warning", "PRIMARY_URL_REQUIRES_REVIEW", {
        line: product.line_refs["Primary URL"] ?? null,
        path: product.source_file,
        product_rank: product.rank,
        url_status: product.primary_url_status,
      });
    }
    for (const candidate of product.quote_candidates) {
      addIssue("blocker", "LONG_BLOCKQUOTE_REQUIRES_QUOTATION_REVIEW", {
        digest: candidate.digest,
        end_line: candidate.end_line,
        line: candidate.start_line,
        path: product.source_file,
        product_rank: product.rank,
        word_count: candidate.word_count,
      });
    }
    if (product.rights.rights_status === "excluded_pending_legal_review") {
      addIssue("blocker", "PRODUCT_EXCLUDED_PENDING_LEGAL_REVIEW", {
        path: product.source_file,
        product_rank: product.rank,
        reason_code: product.rights.reason_code,
      });
    }
  }

  for (let rank = 1; rank <= 200; rank += 1) {
    if (!ranks.has(rank)) addIssue("error", "PRODUCT_RANK_MISSING", { product_rank: rank, path: PRODUCT_DIRECTORY });
    else if (ranks.get(rank) !== 1) addIssue("error", "PRODUCT_RANK_DUPLICATE", {
      actual: ranks.get(rank), product_rank: rank, path: PRODUCT_DIRECTORY,
    });
  }
  const domainCounts = Object.fromEntries(EXPECTED_DOMAINS.map((domain) => [
    domain, products.filter((product) => product.domain === domain).length,
  ]));
  for (const [domain, count] of Object.entries(domainCounts)) {
    if (count !== 20) addIssue("error", "DOMAIN_BALANCE_MISMATCH", { actual: count, domain, expected: 20, path: PRODUCT_DIRECTORY });
  }

  const evidence = { absent: 0, documented: 0, observed: 0 };
  for (const product of products) addEvidenceCounts(evidence, product.product_evidence);
  const indexLines = indexText.split("\n");
  const evidenceIndex = indexLines.findIndex((line) => line.includes("| Evidence markers |"));
  if (evidenceIndex >= 0) {
    const declared = [...indexLines[evidenceIndex].matchAll(/\d[\d,]*/gu)]
      .map((match) => Number(match[0].replaceAll(",", "")));
    const actual = [evidenceTotal(evidence), evidence.observed, evidence.documented, evidence.absent];
    const labels = ["total", "observed", "documented", "absent"];
    for (let index = 0; index < actual.length; index += 1) {
      if (declared[index] !== actual[index]) {
        addIssue("warning", "INDEX_EVIDENCE_COUNT_STALE", {
          actual: actual[index],
          declared: declared[index] ?? null,
          field: labels[index],
          line: evidenceIndex + 1,
          path: `${CORPUS_DIRECTORY}/corpus-index.md`,
        });
      }
    }
  } else {
    addIssue("warning", "INDEX_EVIDENCE_SUMMARY_MISSING", { path: `${CORPUS_DIRECTORY}/corpus-index.md` });
  }
  const completenessIndex = indexLines.findIndex((line) => line.includes("| Harvest completeness |"));
  if (completenessIndex >= 0) {
    const declared = [...indexLines[completenessIndex].matchAll(/\d[\d,]*/gu)]
      .map((match) => Number(match[0].replaceAll(",", "")));
    if (declared.reduce((sum, value) => sum + value, 0) > products.length) {
      addIssue("warning", "INDEX_COMPLETENESS_COUNTS_NONEXCLUSIVE", {
        declared_counts: declared,
        line: completenessIndex + 1,
        path: `${CORPUS_DIRECTORY}/corpus-index.md`,
        product_count: products.length,
      });
    }
  }

  issues.sort(issueSort);
  const issueCounts = {};
  for (const issue of issues) issueCounts[issue.code] = (issueCounts[issue.code] ?? 0) + 1;
  const structuralErrorCount = issues.filter((issue) => issue.severity === "error").length;
  const governanceBlockerCount = issues.filter((issue) => issue.severity === "blocker").length;
  const taxonomySectionCount = products.reduce((sum, product) => sum + product.section_records.length, 0);
  const completenessCounts = { blocked: 0, full: 0, noncanonical: 0, partial: 0 };
  for (const product of products) {
    if (product.completeness === null) completenessCounts.noncanonical += 1;
    else completenessCounts[product.completeness] += 1;
  }
  return withDigest({
    authority_effect: "none",
    benchmark_eligibility: false,
    compiler_version: UX_CONTENT_CORPUS_COMPILER_VERSION,
    completeness_counts: completenessCounts,
    controlled_corpus_eligibility: structuralErrorCount === 0 && governanceBlockerCount === 0,
    counts: {
      domain_counts: domainCounts,
      evidence_markers: { ...evidence, total: evidenceTotal(evidence) },
      governance_blocker_count: governanceBlockerCount,
      issue_count: issues.length,
      long_blockquote_review_candidate_count: issues
        .filter((issue) => issue.code === "LONG_BLOCKQUOTE_REQUIRES_QUOTATION_REVIEW").length,
      product_count: products.length,
      structural_error_count: structuralErrorCount,
      taxonomy_section_count: taxonomySectionCount,
      taxonomy_section_expected_count: products.length * 14,
      warning_count: issues.filter((issue) => issue.severity === "warning").length,
    },
    generation_state: "complete_with_reported_defects",
    issue_counts_by_code: issueCounts,
    issues,
    prompt_eligibility: "never",
    source_scope: "public_unauthenticated_surfaces_as_declared_by_source_files",
    model_processing_eligibility: "per_record_policy_with_explicit_run_authorization",
    training_eligibility: "never",
  }, "audit_digest");
}

function makeProductRecords(products, splits, rawFileMap) {
  return products.map((product) => {
    const productId = `uxcorpus.product.${String(product.rank).padStart(3, "0")}`;
    const split = splits.get(product.rank);
    const missingSections = TAXONOMY_IDS.filter((taxonomyId) =>
      !product.section_records.some((section) => section.taxonomy_id === taxonomyId));
    const languageBlocked = product.language_review_status !== "english_indicated";
    const modelProcessingEligibility = languageBlocked
      ? "never" : product.rights.model_processing_eligibility;
    const modelRetentionEligibility = modelProcessingEligibility === "never"
      ? "never" : product.rights.model_retention_eligibility;
    const modelProcessingBlockers = [
      ...(product.rights.rights_status === "excluded_pending_legal_review" ? ["rights_review"] : []),
      ...(languageBlocked ? ["language_scope"] : []),
    ].sort(lexical);
    return withDigest({
      authority_effect: "none",
      auth_state: product.auth_state,
      benchmark_eligibility: false,
      classifier_status: "source_labels_available_ai_coordinate_decision_pending",
      corpus_rank: product.rank,
      domain: product.domain,
      evidence_counts: product.product_evidence,
      governance: {
        allowed_uses: product.rights.allowed_uses,
        model_processing_blockers: modelProcessingBlockers,
        model_processing_eligibility: modelProcessingEligibility,
        model_retention_eligibility: modelRetentionEligibility,
        prompt_eligibility: "never",
        processing_authorization_required: product.rights.processing_authorization_required,
        rights_status: product.rights.rights_status,
        training_eligibility: "never",
      },
      harvest: {
        completeness: product.completeness,
        completeness_source_digest: product.completeness_digest,
        date: product.harvest_date,
        pages_inspected: product.pages_inspected,
      },
      industry: product.industry,
      language_scope: {
        declared_observation: product.locale,
        project_scope: "english_only",
        review_status: product.language_review_status,
      },
      name: product.name,
      platform_observed: product.platform,
      primary_host: product.primary_host,
      primary_url: product.primary_url,
      product_id: productId,
      projection_version: "contentmd.ux-content-product-projection/0.2.0",
      source: {
        byte_count: rawFileMap.get(product.source_file)?.byte_count ?? null,
        line_count: product.line_count,
        path: product.source_file,
        raw_bytes_digest: product.source_text_digest,
      },
      split,
      taxonomy: {
        missing_sections: missingSections,
        present_sections: product.section_records.map((section) => section.taxonomy_id)
          .sort((left, right) => Number(left.slice(1)) - Number(right.slice(1))),
      },
    }, "product_projection_digest");
  }).sort((left, right) => left.corpus_rank - right.corpus_rank);
}

function makeSectionRecords(products, splits, crosswalkMap) {
  const records = [];
  for (const product of products) {
    const productId = `uxcorpus.product.${String(product.rank).padStart(3, "0")}`;
    const split = splits.get(product.rank);
    const languageBlocked = product.language_review_status !== "english_indicated";
    const modelProcessingEligibility = languageBlocked
      ? "never" : product.rights.model_processing_eligibility;
    const modelRetentionEligibility = modelProcessingEligibility === "never"
      ? "never" : product.rights.model_retention_eligibility;
    const modelProcessingBlockers = [
      ...(product.rights.rights_status === "excluded_pending_legal_review" ? ["rights_review"] : []),
      ...(languageBlocked ? ["language_scope"] : []),
    ].sort(lexical);
    for (const section of product.section_records) {
      const crosswalk = crosswalkMap.get(section.taxonomy_id);
      records.push(withDigest({
        authority_effect: "none",
        benchmark_eligibility: false,
        candidate_classification_questions: {
          content_decision_dimensions: crosswalk.content_decision_dimensions,
          coordinate_axes: crosswalk.coordinate_axes,
          status: "candidate_only",
        },
        evidence_counts: section.evidence_counts,
        evidence_statuses: section.evidence_statuses,
        label_layers: {
          ai_labels: null,
          derived_labels: [{
            dimension: "corpus_split",
            evidence_refs: [],
            label_id: `derived-label.${section.digest}.corpus-split`,
            layer: "derived",
            value: split.split,
          }],
          human_override: null,
          source_labels: [{
            dimension: "taxonomy_section",
            evidence_refs: [`source-section.${section.digest}`],
            label_id: `source-label.${section.digest}.taxonomy-section`,
            layer: "source",
            value: section.taxonomy_id,
          }],
        },
        language_scope: {
          project_scope: "english_only",
          review_status: product.language_review_status,
        },
        model_processing_blockers: modelProcessingBlockers,
        model_processing_eligibility: modelProcessingEligibility,
        model_retention_eligibility: modelRetentionEligibility,
        product_id: productId,
        projection_version: "contentmd.ux-content-section-projection/0.2.0",
        prompt_eligibility: "never",
        processing_authorization_required: product.rights.processing_authorization_required,
        rights_status: product.rights.rights_status,
        section_id: `uxcorpus.section.${String(product.rank).padStart(3, "0")}.${section.taxonomy_id.toLocaleLowerCase("en-US")}`,
        source_ref: {
          digest: section.digest,
          end_line: section.end_line,
          path: product.source_file,
          start_line: section.start_line,
        },
        split,
        taxonomy_id: section.taxonomy_id,
        training_eligibility: "never",
        url_count: section.url_count,
      }, "section_projection_digest"));
    }
  }
  return records.sort((left, right) => lexical(left.section_id, right.section_id));
}

function makeSourceRecords(products) {
  const sources = new Map();
  for (const product of products) {
    const productId = `uxcorpus.product.${String(product.rank).padStart(3, "0")}`;
    for (const occurrence of product.url_occurrences) {
      const key = occurrence.normalized_url;
      const current = sources.get(key) ?? {
        host_key: occurrence.host_key,
        products: new Set(),
        refs: new Map(),
        rights_statuses: new Set(),
        statuses: new Set(),
        url: key,
      };
      current.products.add(productId);
      current.refs.set(`${product.source_file}:${occurrence.line}`, {
        line: occurrence.line,
        path: product.source_file,
        product_id: productId,
      });
      current.rights_statuses.add(product.rights.rights_status);
      current.statuses.add(occurrence.status);
      sources.set(key, current);
    }
  }
  return [...sources.values()].map((source) => withDigest({
    access_status: "not_retrieved_or_verified_by_compiler",
    authority_effect: "none",
    benchmark_eligibility: false,
    host_key: source.host_key,
    product_ids: [...source.products].sort(lexical),
    projection_version: "contentmd.ux-content-source-index/0.1.0",
    prompt_eligibility: "never",
    research_source_record_status: "insufficient_metadata_not_coerced",
    rights_statuses: [...source.rights_statuses].sort(lexical),
    source_id: `uxcorpus.source.${sha256(source.url).slice(0, 20)}`,
    source_refs: [...source.refs.values()].sort((left, right) =>
      lexical(left.path, right.path) || left.line - right.line),
    syntactic_statuses: [...source.statuses].sort(lexical),
    training_eligibility: "never",
    url: source.url,
  }, "source_projection_digest")).sort((left, right) => lexical(left.source_id, right.source_id));
}

function makePatternCandidateRecords(products, splits) {
  const records = [];
  for (const product of products) {
    const productId = `uxcorpus.product.${String(product.rank).padStart(3, "0")}`;
    for (const candidate of product.pattern_candidates) {
      records.push(withDigest({
        adjudication_required: true,
        authority_effect: "none",
        benchmark_eligibility: false,
        candidate_id: `uxcorpus.pattern.${String(product.rank).padStart(3, "0")}.${candidate.line}`,
        condition_and_boundary_review_required: true,
        eligible_for_metrics: false,
        pattern_status: product.rights.rights_status === "excluded_pending_legal_review"
          ? "excluded_pending_legal_review" : "unreviewed_candidate",
        product_id: productId,
        projection_version: "contentmd.ux-content-pattern-candidate/0.1.0",
        prompt_eligibility: "never",
        source_ref: {
          digest: candidate.digest,
          line: candidate.line,
          path: product.source_file,
        },
        split: splits.get(product.rank),
        training_eligibility: "never",
      }, "pattern_candidate_digest"));
    }
  }
  return records.sort((left, right) => lexical(left.candidate_id, right.candidate_id));
}

function makeOverlapRecords(products, existingRecords, dependencyDigest) {
  const records = [];
  for (const product of products) {
    const companyKey = normalizeCompany(product.name);
    const matches = existingRecords.filter((record) =>
      (product.primary_host !== null && record.host_key === product.primary_host)
      || (companyKey.length > 0 && record.company_key === companyKey));
    if (matches.length === 0) continue;
    const uniqueMatches = new Map();
    for (const match of matches) uniqueMatches.set(`${match.path}:${match.line}:${match.source_id}`, match);
    const matchBasis = new Set();
    for (const match of uniqueMatches.values()) {
      if (product.primary_host !== null && match.host_key === product.primary_host) matchBasis.add("primary_host");
      if (companyKey.length > 0 && match.company_key === companyKey) matchBasis.add("normalized_company_name");
    }
    records.push(withDigest({
      authority_effect: "none",
      deduplication_action: "cross_reference_existing_evidence_do_not_copy",
      dependency_digest: dependencyDigest,
      existing_source_refs: [...uniqueMatches.values()].map((match) => ({
        line: match.line,
        path: match.path,
        source_id: match.source_id,
      })).sort((left, right) => lexical(left.path, right.path) || left.line - right.line),
      match_basis: [...matchBasis].sort(lexical),
      product_id: `uxcorpus.product.${String(product.rank).padStart(3, "0")}`,
      projection_version: "contentmd.ux-content-overlap-crosswalk/0.1.0",
    }, "overlap_digest"));
  }
  return records.sort((left, right) => lexical(left.product_id, right.product_id));
}

function makeReviewQueue(sectionRecords, crosswalkMap) {
  return sectionRecords.map((section) => {
    const crosswalk = crosswalkMap.get(section.taxonomy_id);
    const blockedBy = [...new Set(section.model_processing_blockers)].sort(lexical);
    const reviewStatus = blockedBy.includes("rights_review")
      ? "excluded_pending_legal_review"
      : blockedBy.includes("language_scope")
        ? "excluded_outside_language_scope"
        : "pending_ai_adjudication";
    return withDigest({
      adjudication_required: true,
      adjudication_system: "contentmd.ai-adjudication/0.1.0",
      authority_effect: "none",
      blocked_by: blockedBy,
      eligible_for_metrics: false,
      fallback_route: "human_exception_only",
      label_layers: section.label_layers,
      leakage_group_id: section.split.leakage_group_id,
      model_processing_eligibility: section.model_processing_eligibility,
      model_retention_eligibility: section.model_retention_eligibility,
      primary_adjudicator: "ai",
      processing_authorization_ref: null,
      processing_authorization_required: section.processing_authorization_required,
      product_id: section.product_id,
      requested_labels: {
        content_decision_dimensions: crosswalk.content_decision_dimensions,
        coordinate_axes: crosswalk.coordinate_axes,
      },
      review_status: reviewStatus,
      review_unit_id: `review.${section.section_id}`,
      schema_version: "contentmd.ux-content-review-unit/0.2.0",
      source_ref: section.source_ref,
      split: section.split.split,
      taxonomy_id: section.taxonomy_id,
    }, "review_unit_digest");
  }).sort((left, right) => lexical(left.review_unit_id, right.review_unit_id));
}

async function buildRawManifest(repositoryRoot) {
  const paths = (await listFiles(repositoryRoot, CORPUS_DIRECTORY))
    .filter((path) => !path.startsWith(`${GENERATED_DIRECTORY}/`));
  const files = [];
  for (const path of paths) {
    const bytes = await readFile(repositoryPath(repositoryRoot, path));
    files.push({
      byte_count: bytes.length,
      lf_count: countLf(bytes),
      path,
      raw_bytes_digest: sha256(bytes),
    });
  }
  return withDigest({
    authority_effect: "none",
    compiler_version: UX_CONTENT_CORPUS_COMPILER_VERSION,
    file_count: files.length,
    files,
    manifest_version: "contentmd.ux-content-raw-manifest/0.1.0",
    raw_byte_count: files.reduce((sum, file) => sum + file.byte_count, 0),
  }, "manifest_digest");
}

async function buildCompilerDependency(repositoryRoot) {
  const files = [];
  for (const path of COMPILER_SOURCE_PATHS) {
    const bytes = await readFile(repositoryPath(repositoryRoot, path));
    files.push({
      byte_count: bytes.length,
      path,
      raw_bytes_digest: sha256(bytes),
    });
  }
  return withDigest({
    compiler_version: UX_CONTENT_CORPUS_COMPILER_VERSION,
    files,
    node_version: REQUIRED_NODE_VERSION,
  }, "dependency_digest");
}

function generatedCrosswalk(crosswalk, sourceDigest) {
  return withDigest({
    authority_effect: "none",
    crosswalk_version: "contentmd.ux-content-taxonomy-crosswalk-projection/0.1.0",
    entries: crosswalk.entries,
    source_digest: sourceDigest,
    status: "candidate_crosswalk_available_for_ai_adjudication",
  }, "crosswalk_digest");
}

function outputWitness(path, bytes) {
  return {
    byte_count: Buffer.byteLength(bytes, "utf8"),
    path,
    raw_bytes_digest: sha256(bytes),
  };
}

export async function buildUxContentCorpusArtifacts({ repositoryRoot }) {
  assert(process.versions.node === REQUIRED_NODE_VERSION,
    `node_version:expected_${REQUIRED_NODE_VERSION}:actual_${process.versions.node}`);
  const root = resolve(repositoryRoot);
  const [rightsBytes, crosswalkBytes, indexText, rawManifest, existing, compilerDependency] = await Promise.all([
    readFile(repositoryPath(root, RIGHTS_POLICY_PATH)),
    readFile(repositoryPath(root, TAXONOMY_CROSSWALK_PATH)),
    readFile(repositoryPath(root, `${CORPUS_DIRECTORY}/corpus-index.md`), "utf8"),
    buildRawManifest(root),
    loadExistingCorpusSources(root),
    buildCompilerDependency(root),
  ]);
  const rightsPolicy = JSON.parse(rightsBytes.toString("utf8"));
  const crosswalk = JSON.parse(crosswalkBytes.toString("utf8"));
  validateRightsPolicy(rightsPolicy);
  validateCrosswalk(crosswalk);

  const productPaths = (await listFiles(root, PRODUCT_DIRECTORY))
    .filter((path) => /^ux-content-corpus\/products\/\d{3}-[^/]+\.md$/u.test(path));
  const products = [];
  for (const path of productPaths) {
    const text = await readFile(repositoryPath(root, path), "utf8");
    products.push(parseProduct(path, text, rightsPolicy));
  }
  products.sort((left, right) => left.rank - right.rank || lexical(left.source_file, right.source_file));

  const rawFileMap = new Map(rawManifest.files.map((file) => [file.path, file]));
  const splits = assignSplits(products);
  const crosswalkMap = new Map(crosswalk.entries.map((entry) => [entry.taxonomy_id, entry]));
  const audit = buildAudit(products, indexText);
  const productRecords = makeProductRecords(products, splits, rawFileMap);
  const sectionRecords = makeSectionRecords(products, splits, crosswalkMap);
  const sourceRecords = makeSourceRecords(products);
  const patternRecords = makePatternCandidateRecords(products, splits);
  const overlapRecords = makeOverlapRecords(products, existing.records, existing.dependency.dependency_digest);
  const reviewQueue = makeReviewQueue(sectionRecords, crosswalkMap);
  const taxonomyCrosswalk = generatedCrosswalk(crosswalk, sha256(crosswalkBytes));

  const output = new Map([
    [`${GENERATED_DIRECTORY}/audit.json`, canonicalJson(audit)],
    [`${GENERATED_DIRECTORY}/overlap-crosswalk.jsonl`, canonicalJsonl(overlapRecords)],
    [`${GENERATED_DIRECTORY}/pattern-candidates.jsonl`, canonicalJsonl(patternRecords)],
    [`${GENERATED_DIRECTORY}/products.jsonl`, canonicalJsonl(productRecords)],
    [`${GENERATED_DIRECTORY}/raw-manifest.json`, canonicalJson(rawManifest)],
    [`${GENERATED_DIRECTORY}/review-queue.jsonl`, canonicalJsonl(reviewQueue)],
    [`${GENERATED_DIRECTORY}/sections.jsonl`, canonicalJsonl(sectionRecords)],
    [`${GENERATED_DIRECTORY}/source-index.jsonl`, canonicalJsonl(sourceRecords)],
    [`${GENERATED_DIRECTORY}/taxonomy-crosswalk.json`, canonicalJson(taxonomyCrosswalk)],
  ]);
  const splitCounts = { calibration: 0, discovery: 0, sealed_evaluation_candidate: 0, unassigned: 0 };
  for (const assignment of splits.values()) splitCounts[assignment.split] += 1;
  const witnesses = [...output.entries()].map(([path, bytes]) => outputWitness(path, bytes))
    .sort((left, right) => lexical(left.path, right.path));
  const projectionManifest = withDigest({
    authority_effect: "none",
    benchmark_eligibility: false,
    compiler_version: UX_CONTENT_CORPUS_COMPILER_VERSION,
    compiler_dependency: compilerDependency,
    controlled_corpus_eligibility: audit.controlled_corpus_eligibility,
    counts: {
      overlap_product_count: overlapRecords.length,
      pattern_candidate_count: patternRecords.length,
      product_count: productRecords.length,
      review_unit_count: reviewQueue.length,
      section_count: sectionRecords.length,
      source_locator_count: sourceRecords.length,
      split_counts: splitCounts,
    },
    existing_public_product_dependency: existing.dependency,
    files: witnesses,
    manifest_version: "contentmd.ux-content-projection-manifest/0.1.0",
    prompt_eligibility: "never",
    model_processing_eligibility: "per_record_policy_with_explicit_run_authorization",
    raw_manifest_digest: rawManifest.manifest_digest,
    training_eligibility: "never",
  }, "projection_manifest_digest");
  output.set(`${GENERATED_DIRECTORY}/projection-manifest.json`, canonicalJson(projectionManifest));

  return {
    audit,
    existing_dependency: existing.dependency,
    output,
    overlap_records: overlapRecords,
    pattern_records: patternRecords,
    product_records: productRecords,
    projection_manifest: projectionManifest,
    raw_manifest: rawManifest,
    review_queue: reviewQueue,
    section_records: sectionRecords,
    source_records: sourceRecords,
    taxonomy_crosswalk: taxonomyCrosswalk,
  };
}

export async function compareGeneratedArtifacts({ artifacts, repositoryRoot }) {
  const root = resolve(repositoryRoot);
  const missing = [];
  const changed = [];
  for (const [path, expected] of artifacts.output) {
    const absolute = repositoryPath(root, path);
    if (!(await pathExists(absolute))) {
      missing.push(path);
      continue;
    }
    const actual = await readFile(absolute, "utf8");
    if (actual !== expected) changed.push(path);
  }
  const existingGenerated = await listFiles(root, GENERATED_DIRECTORY);
  const expectedPaths = new Set(artifacts.output.keys());
  const unexpected = existingGenerated.filter((path) => !expectedPaths.has(path));
  return {
    changed: changed.sort(lexical),
    missing: missing.sort(lexical),
    ok: missing.length === 0 && changed.length === 0 && unexpected.length === 0,
    unexpected: unexpected.sort(lexical),
  };
}

export async function writeGeneratedArtifacts({ artifacts, repositoryRoot }) {
  const root = resolve(repositoryRoot);
  await mkdir(repositoryPath(root, GENERATED_DIRECTORY), { recursive: true });
  for (const [path, bytes] of [...artifacts.output.entries()].sort(([left], [right]) => lexical(left, right))) {
    const absolute = repositoryPath(root, path);
    await mkdir(dirname(absolute), { recursive: true });
    await writeFile(absolute, bytes, "utf8");
  }
  return compareGeneratedArtifacts({ artifacts, repositoryRoot: root });
}

export async function compileUxContentCorpus({ check = false, repositoryRoot }) {
  const artifacts = await buildUxContentCorpusArtifacts({ repositoryRoot });
  const comparison = check
    ? await compareGeneratedArtifacts({ artifacts, repositoryRoot })
    : await writeGeneratedArtifacts({ artifacts, repositoryRoot });
  return {
    audit_digest: artifacts.audit.audit_digest,
    changed: comparison.changed,
    controlled_corpus_eligibility: artifacts.audit.controlled_corpus_eligibility,
    generated_file_count: artifacts.output.size,
    missing: comparison.missing,
    mode: check ? "check" : "write",
    ok: comparison.ok,
    overlap_product_count: artifacts.overlap_records.length,
    product_count: artifacts.product_records.length,
    projection_manifest_digest: artifacts.projection_manifest.projection_manifest_digest,
    review_unit_count: artifacts.review_queue.length,
    section_count: artifacts.section_records.length,
    source_locator_count: artifacts.source_records.length,
    unexpected: comparison.unexpected,
  };
}
