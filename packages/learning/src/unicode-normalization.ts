import { createHash } from "node:crypto";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import type { RawUtf8Artifact } from "./feedback.js";
import type { ArtifactRef } from "./records.js";

export interface FrozenUnicodeArtifactWitness {
  path: string;
  bytes_utf8: string;
  raw_bytes_digest: string;
  artifact_ref: ArtifactRef;
}

export interface UnicodeArtifactBundle {
  contract_version: "contentmd.unicode-artifact-bundle/0.1.0";
  source_lock: RawUtf8Artifact;
  acquisition_receipt: RawUtf8Artifact;
  generator: RawUtf8Artifact;
  normalization: FrozenUnicodeArtifactWitness;
  casefold: FrozenUnicodeArtifactWitness;
  whitespace: FrozenUnicodeArtifactWitness;
  word_break: FrozenUnicodeArtifactWitness;
  grapheme_break: FrozenUnicodeArtifactWitness;
  bundle_digest: string;
}

export interface VerifiedUnicodeArtifactBundle {
  readonly bundle_digest: string;
  readonly unicode_version: "17.0.0";
  readonly artifact_refs: readonly ArtifactRef[];
}

interface ScalarRange { start: number; end: number }
interface ValuedScalarRange extends ScalarRange { value: number }
interface DecompositionMapping {
  scalar: number;
  kind: "canonical" | "compatibility";
  mapping: number[];
}
interface CompositionPair { starter: number; combining: number; composite: number }
interface NormalizationTables {
  canonical_combining_class_ranges: ValuedScalarRange[];
  decomposition_mappings: DecompositionMapping[];
  composition_exclusions: number[];
  composition_pairs: CompositionPair[];
  hangul: typeof HANGUL;
}
interface CasefoldMapping { scalar: number; mapping: number[] }
interface CasefoldTables { mappings: CasefoldMapping[] }
interface WhitespaceTables { ranges: ScalarRange[] }
interface VerifiedTables {
  normalization: NormalizationTables;
  casefold: CasefoldTables;
  whitespace: WhitespaceTables;
}
interface SourceLockEntry {
  path: string;
  public_url: string;
  raw_bytes_digest: string;
  byte_count: number;
}
interface ArtifactInputEntry {
  artifact_id: string;
  algorithm_id: string;
  source_paths: string[];
  rule_source_path: string | null;
  conformance_test_path: string | null;
  expected_rules_digest: string | null;
}
interface ParsedSourceLock {
  license: SourceLockEntry;
  sources: SourceLockEntry[];
  artifact_inputs: ArtifactInputEntry[];
}
interface ArtifactSpec {
  bundle_key: "normalization" | "casefold" | "whitespace" | "word_break" | "grapheme_break";
  artifact_id: string;
  path: string;
  algorithm_id: string;
  source_paths: readonly string[];
  rule_source_path: string | null;
  conformance_test_path: string | null;
  expected_rules_digest: string | null;
}
type JsonRecord = Record<string, unknown>;

const UNICODE_VERSION = "17.0.0" as const;
const DIGEST_PATTERN = /^[a-f0-9]{64}$/;
const SOURCE_LOCK_PATH = "fixtures/learning-ranking/unicode-17-source-lock.json";
const RECEIPT_PATH = "fixtures/learning-ranking/unicode-17-acquisition-receipt.json";
const GENERATOR_PATH = "scripts/generate-unicode-17-artifacts.mjs";
const ACQUISITION_PATH = "scripts/acquire-unicode-17-sources.mjs";
const FROZEN_SOURCE_LOCK_DIGEST = "82e4a09c5815322f04368d80fc4a98fa70f861bbb66226892136cd4ae16d8049";
const FROZEN_ACQUISITION_RECEIPT_DIGEST = "e8d8bcb7fce088bc311222f4b8a7bdf01e898fc612be196079e4e81bbbe1741b";
const FROZEN_GENERATOR_DIGEST = "afbc659a3820ecd2f3aedbb9ba07462e35c41c144d066a31beef8761fc39e836";
const FROZEN_ARTIFACT_DIGESTS = {
  normalization: "20713609c69e39d772b701bc42f38f891c0db1454006e14096f448201303e08c",
  casefold: "beeefc0e74d41da3eb66754dc80252477884b8169e013217cc94ba0255b8edb5",
  whitespace: "1d45af3473c7df9cb80d73dff29c7f03cd63ff217788e327dcb164713a5a0c0f",
  word_break: "128391f02a63e52b4d1dabfe3f12e06e4c40ff2059f932a6555c0cc5fe82f693",
  grapheme_break: "ba62a38d7c87d477c208946006df6e918612420838297fea47c0792300c063ff",
} as const;
const HANGUL = {
  s_base: 44032, l_base: 4352, v_base: 4449, t_base: 4519,
  l_count: 19, v_count: 21, t_count: 28, n_count: 588, s_count: 11172,
} as const;
const WORD_PROPERTY_ORDER = [
  "Other", "CR", "LF", "Newline", "Extend", "ZWJ", "Regional_Indicator", "Format",
  "Katakana", "Hebrew_Letter", "ALetter", "Single_Quote", "Double_Quote", "MidNumLet",
  "MidLetter", "MidNum", "Numeric", "ExtendNumLet", "WSegSpace",
] as const;
const GRAPHEME_PROPERTY_ORDER = [
  "Other", "CR", "LF", "Control", "Extend", "ZWJ", "Regional_Indicator", "Prepend",
  "SpacingMark", "L", "V", "T", "LV", "LVT",
] as const;
const SOURCE_PATHS = [
  "CaseFolding.txt", "CompositionExclusions.txt", "DerivedCoreProperties.txt",
  "DerivedNormalizationProps.txt", "PropList.txt", "ReadMe.txt", "UnicodeData.txt",
  "auxiliary/GraphemeBreakProperty.txt", "auxiliary/GraphemeBreakTest.txt",
  "auxiliary/WordBreakProperty.txt", "auxiliary/WordBreakTest.txt", "emoji/emoji-data.txt",
  "reports/tr29-47.html",
] as const;
const ARTIFACT_SPECS: readonly ArtifactSpec[] = [
  {
    bundle_key: "normalization", artifact_id: "unicode-normalization",
    path: "fixtures/learning-ranking/unicode-17-normalization.json",
    algorithm_id: "unicode-normalization/17.0.0-nfkc-v1",
    source_paths: ["UnicodeData.txt", "CompositionExclusions.txt", "DerivedNormalizationProps.txt"],
    rule_source_path: null, conformance_test_path: null, expected_rules_digest: null,
  },
  {
    bundle_key: "casefold", artifact_id: "unicode-casefold",
    path: "fixtures/learning-ranking/unicode-17-casefold.json",
    algorithm_id: "unicode-casefold/17.0.0-full-default-v1", source_paths: ["CaseFolding.txt"],
    rule_source_path: null, conformance_test_path: null, expected_rules_digest: null,
  },
  {
    bundle_key: "whitespace", artifact_id: "unicode-whitespace",
    path: "fixtures/learning-ranking/unicode-17-whitespace.json",
    algorithm_id: "unicode-whitespace/17.0.0-white-space-v1", source_paths: ["PropList.txt"],
    rule_source_path: null, conformance_test_path: null, expected_rules_digest: null,
  },
  {
    bundle_key: "word_break", artifact_id: "unicode-word-break",
    path: "fixtures/learning-ranking/unicode-17-word-break.json",
    algorithm_id: "unicode-word-break/17.0.0-uax29-default-v1",
    source_paths: ["auxiliary/WordBreakProperty.txt", "emoji/emoji-data.txt"],
    rule_source_path: "reports/tr29-47.html", conformance_test_path: "auxiliary/WordBreakTest.txt",
    expected_rules_digest: "e343c896838c45b3d39bd77825150a9032cdb0ebb12327f1fe0a3add1f60bfdf",
  },
  {
    bundle_key: "grapheme_break", artifact_id: "unicode-grapheme-break",
    path: "fixtures/learning-ranking/unicode-17-grapheme-break.json",
    algorithm_id: "unicode-grapheme-break/17.0.0-uax29-extended-v1",
    source_paths: ["auxiliary/GraphemeBreakProperty.txt", "DerivedCoreProperties.txt", "emoji/emoji-data.txt"],
    rule_source_path: "reports/tr29-47.html", conformance_test_path: "auxiliary/GraphemeBreakTest.txt",
    expected_rules_digest: "b33b4524d8f91cae2dab1274e290c415c7210c755df3c843f9c762c944aab192",
  },
];
const VERIFIED_TABLES = new WeakMap<VerifiedUnicodeArtifactBundle, VerifiedTables>();

export class UnicodeArtifactError extends TypeError {
  readonly code: string;
  constructor(suffix: "unicode_artifact" | "unicode_scalar") {
    const code = `task3_contract_invalid:${suffix}`;
    super(code);
    this.name = "UnicodeArtifactError";
    this.code = code;
  }
}

function artifactFailure(): never { throw new Error("unicode_artifact"); }
function assertArtifact(condition: unknown): asserts condition { if (!condition) artifactFailure(); }
function isRecord(value: unknown): value is JsonRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
function closedRecord(value: unknown, keys: readonly string[]): JsonRecord {
  assertArtifact(isRecord(value));
  const ownKeys = Reflect.ownKeys(value);
  assertArtifact(ownKeys.length === keys.length && ownKeys.every((key) => typeof key === "string"));
  const actual = new Set(ownKeys as string[]);
  assertArtifact(keys.every((key) => actual.has(key)));
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    assertArtifact(descriptor?.enumerable === true && "value" in descriptor);
  }
  return value;
}
function arrayValue(value: unknown): unknown[] { assertArtifact(Array.isArray(value)); return value; }
function stringValue(value: unknown): string { assertArtifact(typeof value === "string"); return value; }
function digestValue(value: unknown): string {
  const digest = stringValue(value); assertArtifact(DIGEST_PATTERN.test(digest)); return digest;
}
function positiveInteger(value: unknown): number {
  assertArtifact(Number.isSafeInteger(value) && (value as number) > 0); return value as number;
}
function isUnicodeScalar(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) >= 0 && (value as number) <= 0x10ffff
    && !((value as number) >= 0xd800 && (value as number) <= 0xdfff);
}
function scalarValue(value: unknown): number { assertArtifact(isUnicodeScalar(value)); return value; }
function assertScalarSequence(scalars: readonly number[]): void {
  if (!Array.isArray(scalars) || !scalars.every(isUnicodeScalar)) throw new UnicodeArtifactError("unicode_scalar");
}
function sameJson(left: unknown, right: unknown): boolean { return canonicalJson(left) === canonicalJson(right); }
function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}
function parseCanonicalJson(bytes: string): JsonRecord {
  assertArtifact(typeof bytes === "string" && !bytes.startsWith("\ufeff"));
  let parsed: unknown;
  try { parsed = JSON.parse(bytes); } catch { artifactFailure(); }
  assertArtifact(canonicalJson(parsed) === bytes && isRecord(parsed));
  return parsed;
}
function verifyRawArtifact(value: unknown, path: string, json: boolean): { bytes: string; digest: string } {
  const record = closedRecord(value, ["path", "bytes_utf8", "raw_bytes_digest"]);
  assertArtifact(record.path === path);
  const bytes = stringValue(record.bytes_utf8);
  const digest = digestValue(record.raw_bytes_digest);
  assertArtifact(sha256Utf8(bytes) === digest);
  if (json) parseCanonicalJson(bytes);
  return { bytes, digest };
}

function expectedPublicUrl(path: string): string {
  return path === "reports/tr29-47.html"
    ? "https://www.unicode.org/reports/tr29/tr29-47.html"
    : `https://www.unicode.org/Public/17.0.0/ucd/${path}`;
}
function parseSourceEntry(value: unknown, path: string, publicUrl: string): SourceLockEntry {
  const entry = closedRecord(value, ["path", "public_url", "raw_bytes_digest", "byte_count"]);
  assertArtifact(entry.path === path && entry.public_url === publicUrl);
  return { path, public_url: publicUrl, raw_bytes_digest: digestValue(entry.raw_bytes_digest), byte_count: positiveInteger(entry.byte_count) };
}
function parseSourceLock(bytes: string): ParsedSourceLock {
  const lock = closedRecord(parseCanonicalJson(bytes), ["contract_version", "unicode_version", "license", "sources", "artifact_inputs"]);
  assertArtifact(lock.contract_version === "contentmd.unicode-source-lock/0.1.0" && lock.unicode_version === UNICODE_VERSION);
  const values = arrayValue(lock.sources);
  assertArtifact(values.length === SOURCE_PATHS.length);
  const sources = SOURCE_PATHS.map((path, index) => parseSourceEntry(values[index], path, expectedPublicUrl(path)));
  const license = parseSourceEntry(lock.license, "license.txt", "https://www.unicode.org/license.txt");
  const inputValues = arrayValue(lock.artifact_inputs);
  assertArtifact(inputValues.length === ARTIFACT_SPECS.length);
  const artifact_inputs = ARTIFACT_SPECS.map((spec, index): ArtifactInputEntry => {
    const input = closedRecord(inputValues[index], ["artifact_id", "algorithm_id", "source_paths", "rule_source_path", "conformance_test_path", "expected_rules_digest"]);
    assertArtifact(input.artifact_id === spec.artifact_id && input.algorithm_id === spec.algorithm_id);
    assertArtifact(sameJson(input.source_paths, spec.source_paths));
    assertArtifact(input.rule_source_path === spec.rule_source_path && input.conformance_test_path === spec.conformance_test_path);
    assertArtifact(input.expected_rules_digest === spec.expected_rules_digest);
    return { artifact_id: spec.artifact_id, algorithm_id: spec.algorithm_id, source_paths: [...spec.source_paths], rule_source_path: spec.rule_source_path, conformance_test_path: spec.conformance_test_path, expected_rules_digest: spec.expected_rules_digest };
  });
  return { license, sources, artifact_inputs };
}

function verifyReceipt(bytes: string, lockDigest: string, lock: ParsedSourceLock): void {
  const receipt = closedRecord(parseCanonicalJson(bytes), ["contract_version", "unicode_version", "exact_host", "acquisition_script", "entries", "source_lock_raw_bytes_digest", "acquired_at", "status", "authority_effect", "receipt_digest"]);
  assertArtifact(receipt.contract_version === "contentmd.unicode-acquisition-receipt/0.1.0" && receipt.unicode_version === UNICODE_VERSION);
  assertArtifact(receipt.exact_host === "www.unicode.org" && receipt.status === "development_fixture_verified" && receipt.authority_effect === "none");
  assertArtifact(receipt.source_lock_raw_bytes_digest === lockDigest);
  const script = closedRecord(receipt.acquisition_script, ["path", "raw_bytes_digest"]);
  assertArtifact(script.path === ACQUISITION_PATH); digestValue(script.raw_bytes_digest);
  const acquiredAt = stringValue(receipt.acquired_at);
  const parsedAt = new Date(acquiredAt);
  assertArtifact(!Number.isNaN(parsedAt.valueOf()) && parsedAt.toISOString() === acquiredAt);
  const expectedEntries = [...lock.sources, lock.license];
  const entries = arrayValue(receipt.entries);
  assertArtifact(entries.length === expectedEntries.length);
  for (const [index, expected] of expectedEntries.entries()) {
    const entry = closedRecord(entries[index], ["path", "public_url", "first_fetch", "second_fetch"]);
    assertArtifact(entry.path === expected.path && entry.public_url === expected.public_url);
    for (const key of ["first_fetch", "second_fetch"] as const) {
      const fetch = closedRecord(entry[key], ["byte_count", "raw_bytes_digest"]);
      assertArtifact(fetch.byte_count === expected.byte_count && fetch.raw_bytes_digest === expected.raw_bytes_digest);
    }
  }
  const receivedDigest = digestValue(receipt.receipt_digest);
  const preimage = { contract_version: receipt.contract_version, unicode_version: receipt.unicode_version, exact_host: receipt.exact_host, acquisition_script: receipt.acquisition_script, entries: receipt.entries, source_lock_raw_bytes_digest: receipt.source_lock_raw_bytes_digest, acquired_at: receipt.acquired_at, status: receipt.status, authority_effect: receipt.authority_effect };
  assertArtifact(sha256Canonical(preimage) === receivedDigest);
}

function parseRange(value: unknown, priorEnd: number, valued = false): ScalarRange | ValuedScalarRange {
  const range = closedRecord(value, valued ? ["start", "end", "value"] : ["start", "end"]);
  const start = scalarValue(range.start);
  const end = scalarValue(range.end);
  assertArtifact(start <= end && start > priorEnd);
  if (!valued) return { start, end };
  const classValue = positiveInteger(range.value);
  assertArtifact(classValue <= 255);
  return { start, end, value: classValue };
}
function parseRanges(value: unknown, valued = false): Array<ScalarRange | ValuedScalarRange> {
  const output: Array<ScalarRange | ValuedScalarRange> = [];
  let priorEnd = -1;
  for (const item of arrayValue(value)) {
    const range = parseRange(item, priorEnd, valued);
    output.push(range);
    priorEnd = range.end;
  }
  return output;
}
function assertAcyclicMappings(mappings: readonly DecompositionMapping[]): void {
  const byScalar = new Map(mappings.map((entry) => [entry.scalar, entry.mapping]));
  const state = new Map<number, 1 | 2>();
  const visit = (scalar: number): void => {
    assertArtifact(state.get(scalar) !== 1);
    if (state.get(scalar) === 2 || !byScalar.has(scalar)) return;
    state.set(scalar, 1);
    for (const child of byScalar.get(scalar)!) visit(child);
    state.set(scalar, 2);
  };
  for (const scalar of byScalar.keys()) visit(scalar);
}
function parseNormalizationTables(value: unknown): NormalizationTables {
  const tables = closedRecord(value, ["canonical_combining_class_ranges", "decomposition_mappings", "composition_exclusions", "composition_pairs", "hangul"]);
  const canonicalCombining = parseRanges(tables.canonical_combining_class_ranges, true) as ValuedScalarRange[];
  for (let index = 1; index < canonicalCombining.length; index += 1) {
    const previous = canonicalCombining[index - 1]!;
    const current = canonicalCombining[index]!;
    assertArtifact(previous.end + 1 !== current.start || previous.value !== current.value);
  }
  const mappings: DecompositionMapping[] = [];
  let priorScalar = -1;
  for (const value of arrayValue(tables.decomposition_mappings)) {
    const entry = closedRecord(value, ["scalar", "kind", "mapping"]);
    const scalar = scalarValue(entry.scalar);
    assertArtifact(scalar > priorScalar && (entry.kind === "canonical" || entry.kind === "compatibility"));
    const mapping = arrayValue(entry.mapping).map(scalarValue);
    assertArtifact(mapping.length > 0);
    mappings.push({ scalar, kind: entry.kind, mapping });
    priorScalar = scalar;
  }
  const exclusions: number[] = [];
  priorScalar = -1;
  for (const value of arrayValue(tables.composition_exclusions)) {
    const scalar = scalarValue(value);
    assertArtifact(scalar > priorScalar);
    exclusions.push(scalar);
    priorScalar = scalar;
  }
  const pairs: CompositionPair[] = [];
  let priorTuple: [number, number, number] | null = null;
  const pairKeys = new Set<string>();
  for (const value of arrayValue(tables.composition_pairs)) {
    const entry = closedRecord(value, ["starter", "combining", "composite"]);
    const pair = { starter: scalarValue(entry.starter), combining: scalarValue(entry.combining), composite: scalarValue(entry.composite) };
    const tuple: [number, number, number] = [pair.starter, pair.combining, pair.composite];
    if (priorTuple) {
      const comparison = tuple[0] - priorTuple[0]
        || tuple[1] - priorTuple[1]
        || tuple[2] - priorTuple[2];
      assertArtifact(comparison > 0);
    }
    const pairKey = `${pair.starter}.${pair.combining}`;
    assertArtifact(!pairKeys.has(pairKey)); pairKeys.add(pairKey);
    pairs.push(pair); priorTuple = tuple;
  }
  const hangul = closedRecord(tables.hangul, Object.keys(HANGUL));
  assertArtifact(sameJson(hangul, HANGUL));
  const mappingByScalar = new Map(mappings.map((entry) => [entry.scalar, entry]));
  const exclusionSet = new Set(exclusions);
  for (const pair of pairs) {
    const mapping = mappingByScalar.get(pair.composite);
    assertArtifact(mapping?.kind === "canonical" && sameJson(mapping.mapping, [pair.starter, pair.combining]));
    assertArtifact(!exclusionSet.has(pair.composite) && lookupValuedRange(canonicalCombining, pair.starter) === 0);
  }
  assertAcyclicMappings(mappings);
  return { canonical_combining_class_ranges: canonicalCombining, decomposition_mappings: mappings, composition_exclusions: exclusions, composition_pairs: pairs, hangul: HANGUL };
}
function parseCasefoldTables(value: unknown): CasefoldTables {
  const tables = closedRecord(value, ["mappings"]);
  const mappings: CasefoldMapping[] = [];
  let priorScalar = -1;
  for (const value of arrayValue(tables.mappings)) {
    const entry = closedRecord(value, ["scalar", "mapping"]);
    const scalar = scalarValue(entry.scalar);
    assertArtifact(scalar > priorScalar);
    const mapping = arrayValue(entry.mapping).map(scalarValue);
    assertArtifact(mapping.length > 0);
    mappings.push({ scalar, mapping }); priorScalar = scalar;
  }
  return { mappings };
}
function parseWhitespaceTables(value: unknown): WhitespaceTables {
  const tables = closedRecord(value, ["ranges"]);
  const ranges = parseRanges(tables.ranges) as ScalarRange[];
  assertArtifact(ranges.length > 0);
  for (let index = 1; index < ranges.length; index += 1) assertArtifact(ranges[index - 1]!.end + 1 < ranges[index]!.start);
  return { ranges };
}
function verifyPropertyRanges(value: unknown, allowed: readonly string[], complete: boolean): void {
  const ranges = arrayValue(value);
  let priorEnd = -1;
  let priorProperty: string | null = null;
  for (const [index, value] of ranges.entries()) {
    const entry = closedRecord(value, ["start", "end", "property"]);
    const start = scalarValue(entry.start); const end = scalarValue(entry.end); const property = stringValue(entry.property);
    assertArtifact(start <= end && start > priorEnd && allowed.includes(property));
    if (complete) assertArtifact(start !== priorEnd + 1 || property !== priorProperty);
    if (complete) assertArtifact(start === (index === 0 ? 0 : priorEnd === 0xd7ff ? 0xe000 : priorEnd + 1));
    priorEnd = end; priorProperty = property;
  }
  if (complete) assertArtifact(ranges.length > 0 && priorEnd === 0x10ffff);
}
function verifyBoundaryMachine(value: unknown, spec: ArtifactSpec): void {
  const machine = closedRecord(value, ["contract_version", "machine_id", "unicode_version", "uax29_revision", "conformance_profile", "scan_direction", "rule_order", "steps", "default_decision", "machine_digest"]);
  assertArtifact(machine.contract_version === "contentmd.unicode-boundary-machine/0.1.0" && machine.machine_id === spec.algorithm_id);
  assertArtifact(machine.unicode_version === UNICODE_VERSION && machine.uax29_revision === 47 && machine.scan_direction === "left_to_right" && machine.default_decision === "break");
  assertArtifact(machine.machine_digest === spec.expected_rules_digest);
  const expectedOrder = spec.bundle_key === "word_break"
    ? ["WB1", "WB2", "WB3", "WB3a", "WB3b", "WB3c", "WB3d", "WB4", "WB5", "WB6", "WB7", "WB7a", "WB7b", "WB7c", "WB8", "WB9", "WB10", "WB11", "WB12", "WB13", "WB13a", "WB13b", "WB15", "WB16", "WB999"]
    : ["GB1", "GB2", "GB3", "GB4", "GB5", "GB6", "GB7", "GB8", "GB9", "GB9a", "GB9b", "GB9c", "GB11", "GB12", "GB13", "GB999"];
  assertArtifact(sameJson(machine.rule_order, expectedOrder));
  assertArtifact(machine.conformance_profile === (spec.bundle_key === "word_break" ? "UAX29-C2-1-default-word" : "UAX29-C1-1-extended-grapheme"));
  const steps = arrayValue(machine.steps);
  assertArtifact(steps.length === expectedOrder.length);
  for (const [index, value] of steps.entries()) {
    assertArtifact(isRecord(value) && value.rule_id === expectedOrder[index] && value.priority === index);
  }
  const { machine_digest: _digest, ...preimage } = machine;
  assertArtifact(sha256Canonical(preimage) === machine.machine_digest);
}
function verifyBoundaryTables(value: unknown, spec: ArtifactSpec): void {
  const grapheme = spec.bundle_key === "grapheme_break";
  const tables = closedRecord(value, grapheme
    ? ["rule_machine", "rules_digest", "property_order", "property_ranges", "extended_pictographic_ranges", "indic_conjunct_break_ranges"]
    : ["rule_machine", "rules_digest", "property_order", "property_ranges", "extended_pictographic_ranges"]);
  assertArtifact(tables.rules_digest === spec.expected_rules_digest);
  verifyBoundaryMachine(tables.rule_machine, spec);
  const order = grapheme ? GRAPHEME_PROPERTY_ORDER : WORD_PROPERTY_ORDER;
  assertArtifact(sameJson(tables.property_order, order));
  verifyPropertyRanges(tables.property_ranges, order, true);
  const extended = parseRanges(tables.extended_pictographic_ranges) as ScalarRange[];
  assertArtifact(extended.length > 0);
  for (let index = 1; index < extended.length; index += 1) assertArtifact(extended[index - 1]!.end + 1 < extended[index]!.start);
  if (grapheme) verifyPropertyRanges(tables.indic_conjunct_break_ranges, ["Consonant", "Extend", "Linker"], false);
}

function verifyFrozenArtifact(value: unknown, spec: ArtifactSpec, lockDigest: string, generatorDigest: string, lock: ParsedSourceLock): { ref: ArtifactRef; tables: unknown } {
  const witness = closedRecord(value, ["path", "bytes_utf8", "raw_bytes_digest", "artifact_ref"]);
  assertArtifact(witness.path === spec.path);
  const bytes = stringValue(witness.bytes_utf8); const rawDigest = digestValue(witness.raw_bytes_digest);
  assertArtifact(sha256Utf8(bytes) === rawDigest);
  assertArtifact(rawDigest === FROZEN_ARTIFACT_DIGESTS[spec.bundle_key]);
  const ref = closedRecord(witness.artifact_ref, ["artifact_id", "artifact_version", "artifact_digest"]);
  assertArtifact(ref.artifact_id === spec.artifact_id && ref.artifact_version === UNICODE_VERSION && ref.artifact_digest === rawDigest);
  const artifact = closedRecord(parseCanonicalJson(bytes), ["contract_version", "artifact_id", "artifact_version", "unicode_version", "algorithm_id", "source_lock", "source_entries", "generator", "tables", "tables_digest"]);
  assertArtifact(artifact.contract_version === "contentmd.unicode-artifact/0.1.0" && artifact.artifact_id === spec.artifact_id && artifact.artifact_version === UNICODE_VERSION);
  assertArtifact(artifact.unicode_version === UNICODE_VERSION && artifact.algorithm_id === spec.algorithm_id);
  const artifactLock = closedRecord(artifact.source_lock, ["path", "raw_bytes_digest"]);
  assertArtifact(artifactLock.path === SOURCE_LOCK_PATH && artifactLock.raw_bytes_digest === lockDigest);
  const generator = closedRecord(artifact.generator, ["path", "raw_bytes_digest"]);
  assertArtifact(generator.path === GENERATOR_PATH && generator.raw_bytes_digest === generatorDigest);
  assertArtifact(artifact.tables_digest === sha256Canonical(artifact.tables));
  const input = lock.artifact_inputs.find((entry) => entry.artifact_id === spec.artifact_id);
  assertArtifact(input !== undefined);
  const sourceEntries = arrayValue(artifact.source_entries);
  assertArtifact(sourceEntries.length === input.source_paths.length && sourceEntries.length > 0);
  for (const [index, path] of input.source_paths.entries()) {
    const source = lock.sources.find((entry) => entry.path === path); assertArtifact(source !== undefined);
    const entry = closedRecord(sourceEntries[index], ["path", "raw_bytes_digest", "byte_count"]);
    assertArtifact(entry.path === source.path && entry.raw_bytes_digest === source.raw_bytes_digest && entry.byte_count === source.byte_count);
  }
  return { ref: { artifact_id: spec.artifact_id, artifact_version: UNICODE_VERSION, artifact_digest: rawDigest }, tables: artifact.tables };
}

function verifyBundleInternal(value: unknown): VerifiedUnicodeArtifactBundle {
  const bundle = closedRecord(value, ["contract_version", "source_lock", "acquisition_receipt", "generator", "normalization", "casefold", "whitespace", "word_break", "grapheme_break", "bundle_digest"]);
  assertArtifact(bundle.contract_version === "contentmd.unicode-artifact-bundle/0.1.0");
  const bundleDigest = digestValue(bundle.bundle_digest);
  const preimage = { contract_version: bundle.contract_version, source_lock: bundle.source_lock, acquisition_receipt: bundle.acquisition_receipt, generator: bundle.generator, normalization: bundle.normalization, casefold: bundle.casefold, whitespace: bundle.whitespace, word_break: bundle.word_break, grapheme_break: bundle.grapheme_break };
  assertArtifact(sha256Canonical(preimage) === bundleDigest);
  const sourceLockRaw = verifyRawArtifact(bundle.source_lock, SOURCE_LOCK_PATH, true);
  const receiptRaw = verifyRawArtifact(bundle.acquisition_receipt, RECEIPT_PATH, true);
  const generatorRaw = verifyRawArtifact(bundle.generator, GENERATOR_PATH, false);
  assertArtifact(sourceLockRaw.digest === FROZEN_SOURCE_LOCK_DIGEST);
  assertArtifact(receiptRaw.digest === FROZEN_ACQUISITION_RECEIPT_DIGEST);
  assertArtifact(generatorRaw.digest === FROZEN_GENERATOR_DIGEST);
  const lock = parseSourceLock(sourceLockRaw.bytes);
  verifyReceipt(receiptRaw.bytes, sourceLockRaw.digest, lock);
  const artifacts = ARTIFACT_SPECS.map((spec) => ({ spec, ...verifyFrozenArtifact(bundle[spec.bundle_key], spec, sourceLockRaw.digest, generatorRaw.digest, lock) }));
  const normalization = parseNormalizationTables(artifacts[0]!.tables);
  const casefold = parseCasefoldTables(artifacts[1]!.tables);
  const whitespace = parseWhitespaceTables(artifacts[2]!.tables);
  verifyBoundaryTables(artifacts[3]!.tables, artifacts[3]!.spec);
  verifyBoundaryTables(artifacts[4]!.tables, artifacts[4]!.spec);
  const verified: VerifiedUnicodeArtifactBundle = Object.freeze({ bundle_digest: bundleDigest, unicode_version: UNICODE_VERSION, artifact_refs: Object.freeze(artifacts.map(({ ref }) => Object.freeze({ ...ref }))) });
  VERIFIED_TABLES.set(verified, { normalization, casefold, whitespace });
  return verified;
}

export function verifyUnicodeArtifactBundle(bundle: UnicodeArtifactBundle): VerifiedUnicodeArtifactBundle {
  try { return verifyBundleInternal(bundle); }
  catch (error) {
    if (error instanceof UnicodeArtifactError) throw error;
    throw new UnicodeArtifactError("unicode_artifact");
  }
}

function scalarKey(scalar: number): string { return scalar.toString(16).padStart(6, "0"); }
export function scalarTrigramSet(scalars: readonly number[]): string[] {
  assertScalarSequence(scalars);
  const trigrams = new Set<string>();
  for (let index = 0; index + 2 < scalars.length; index += 1) {
    trigrams.add(`${scalarKey(scalars[index]!)}.${scalarKey(scalars[index + 1]!)}.${scalarKey(scalars[index + 2]!)}`);
  }
  return [...trigrams].sort();
}
function scalarsEqual(left: readonly number[], right: readonly number[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
export function areNearDuplicates(left: readonly number[], right: readonly number[]): boolean {
  assertScalarSequence(left); assertScalarSequence(right);
  if (left.length < 3 || right.length < 3) return left.length < 3 && right.length < 3 && scalarsEqual(left, right);
  const leftSet = new Set(scalarTrigramSet(left));
  const rightSet = new Set(scalarTrigramSet(right));
  let intersectionSize = 0;
  for (const trigram of leftSet) if (rightSet.has(trigram)) intersectionSize += 1;
  const unionSize = leftSet.size + rightSet.size - intersectionSize;
  return BigInt(intersectionSize) * 20n >= BigInt(unionSize) * 17n;
}

function lookupRange<T extends ScalarRange>(ranges: readonly T[], scalar: number): T | null {
  let low = 0; let high = ranges.length - 1;
  while (low <= high) {
    const middle = (low + high) >>> 1;
    const range = ranges[middle]!;
    if (scalar < range.start) high = middle - 1;
    else if (scalar > range.end) low = middle + 1;
    else return range;
  }
  return null;
}
function lookupValuedRange(ranges: readonly ValuedScalarRange[], scalar: number): number {
  return lookupRange(ranges, scalar)?.value ?? 0;
}
function decodeScalars(input: string): number[] {
  if (typeof input !== "string") throw new UnicodeArtifactError("unicode_scalar");
  const output: number[] = [];
  for (let index = 0; index < input.length; index += 1) {
    const first = input.charCodeAt(index);
    if (first >= 0xd800 && first <= 0xdbff) {
      if (index + 1 >= input.length) throw new UnicodeArtifactError("unicode_scalar");
      const second = input.charCodeAt(index + 1);
      if (second < 0xdc00 || second > 0xdfff) throw new UnicodeArtifactError("unicode_scalar");
      output.push(0x10000 + ((first - 0xd800) << 10) + second - 0xdc00);
      index += 1;
    } else if (first >= 0xdc00 && first <= 0xdfff) {
      throw new UnicodeArtifactError("unicode_scalar");
    } else output.push(first);
  }
  return output;
}
function decomposeHangul(scalar: number): number[] | null {
  const index = scalar - HANGUL.s_base;
  if (index < 0 || index >= HANGUL.s_count) return null;
  const trailingIndex = index % HANGUL.t_count;
  const output = [HANGUL.l_base + Math.floor(index / HANGUL.n_count), HANGUL.v_base + Math.floor((index % HANGUL.n_count) / HANGUL.t_count)];
  if (trailingIndex !== 0) output.push(HANGUL.t_base + trailingIndex);
  return output;
}
function composeHangul(starter: number, combining: number): number | null {
  const leadingIndex = starter - HANGUL.l_base;
  const vowelIndex = combining - HANGUL.v_base;
  if (leadingIndex >= 0 && leadingIndex < HANGUL.l_count && vowelIndex >= 0 && vowelIndex < HANGUL.v_count) {
    return HANGUL.s_base + (leadingIndex * HANGUL.v_count + vowelIndex) * HANGUL.t_count;
  }
  const syllableIndex = starter - HANGUL.s_base;
  const trailingIndex = combining - HANGUL.t_base;
  if (syllableIndex >= 0 && syllableIndex < HANGUL.s_count && syllableIndex % HANGUL.t_count === 0 && trailingIndex > 0 && trailingIndex < HANGUL.t_count) return starter + trailingIndex;
  return null;
}
function normalizeNfkc(scalars: readonly number[], tables: NormalizationTables): number[] {
  const decompositionByScalar = new Map(tables.decomposition_mappings.map((entry) => [entry.scalar, entry.mapping]));
  const decomposed: number[] = [];
  const active = new Set<number>();
  const decompose = (scalar: number): void => {
    if (active.has(scalar)) throw new UnicodeArtifactError("unicode_artifact");
    const mapping = decomposeHangul(scalar) ?? decompositionByScalar.get(scalar);
    if (!mapping) { decomposed.push(scalar); return; }
    active.add(scalar);
    for (const child of mapping) decompose(child);
    active.delete(scalar);
  };
  for (const scalar of scalars) decompose(scalar);

  const ordered: number[] = [];
  for (const scalar of decomposed) {
    const scalarClass = lookupValuedRange(tables.canonical_combining_class_ranges, scalar);
    ordered.push(scalar);
    if (scalarClass === 0) continue;
    let position = ordered.length - 1;
    while (position > 0) {
      const previousClass = lookupValuedRange(tables.canonical_combining_class_ranges, ordered[position - 1]!);
      if (previousClass === 0 || previousClass <= scalarClass) break;
      ordered[position] = ordered[position - 1]!;
      position -= 1;
    }
    ordered[position] = scalar;
  }

  const pairMap = new Map(tables.composition_pairs.map((pair) => [`${pair.starter}.${pair.combining}`, pair.composite]));
  const composed: number[] = [];
  let starterPosition = -1; let starter = -1; let lastClass = 0;
  for (const scalar of ordered) {
    const scalarClass = lookupValuedRange(tables.canonical_combining_class_ranges, scalar);
    const composite = starterPosition >= 0 ? composeHangul(starter, scalar) ?? pairMap.get(`${starter}.${scalar}`) ?? null : null;
    if (composite !== null && (lastClass === 0 || lastClass < scalarClass)) {
      composed[starterPosition] = composite; starter = composite; continue;
    }
    if (scalarClass === 0) { starterPosition = composed.length; starter = scalar; lastClass = 0; }
    else lastClass = scalarClass;
    composed.push(scalar);
  }
  return composed;
}
function resolveVerifiedTables(bundle: UnicodeArtifactBundle | VerifiedUnicodeArtifactBundle): VerifiedTables {
  if (typeof bundle === "object" && bundle !== null) {
    const existing = VERIFIED_TABLES.get(bundle as VerifiedUnicodeArtifactBundle);
    if (existing) return existing;
  }
  const verified = verifyUnicodeArtifactBundle(bundle as UnicodeArtifactBundle);
  return VERIFIED_TABLES.get(verified)!;
}
export function normalizeForLeakage(expression: string, bundle: UnicodeArtifactBundle | VerifiedUnicodeArtifactBundle): number[] {
  const tables = resolveVerifiedTables(bundle);
  const normalized = normalizeNfkc(decodeScalars(expression), tables.normalization);
  const foldMap = new Map(tables.casefold.mappings.map((entry) => [entry.scalar, entry.mapping]));
  const folded = normalized.flatMap((scalar) => foldMap.get(scalar) ?? [scalar]);
  const collapsed: number[] = [];
  let inWhitespace = false;
  for (const scalar of folded) {
    const whitespace = lookupRange(tables.whitespace.ranges, scalar) !== null;
    if (whitespace) { if (!inWhitespace) collapsed.push(0x20); inWhitespace = true; }
    else { collapsed.push(scalar); inWhitespace = false; }
  }
  if (collapsed[0] === 0x20) collapsed.shift();
  if (collapsed.at(-1) === 0x20) collapsed.pop();
  return collapsed;
}
