#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const WORKSPACE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LOCK_PATH = "fixtures/learning-ranking/unicode-17-source-lock.json";
const RECEIPT_PATH = "fixtures/learning-ranking/unicode-17-acquisition-receipt.json";
const SOURCE_ROOT = "fixtures/learning-ranking/unicode-17-sources";
const GENERATOR_PATH = "scripts/generate-unicode-17-artifacts.mjs";
const UNICODE_VERSION = "17.0.0";
const UAX29_REVISION = 47;
const DIGEST_PATTERN = /^[a-f0-9]{64}$/;
const TEXT_DECODER = new TextDecoder("utf-8", { fatal: true });

const ARTIFACTS = [
  {
    artifact_id: "unicode-normalization",
    file: "fixtures/learning-ranking/unicode-17-normalization.json",
    algorithm_id: "unicode-normalization/17.0.0-nfkc-v1",
    source_paths: ["UnicodeData.txt", "CompositionExclusions.txt", "DerivedNormalizationProps.txt"],
    rule_source_path: null,
    conformance_test_path: null,
  },
  {
    artifact_id: "unicode-casefold",
    file: "fixtures/learning-ranking/unicode-17-casefold.json",
    algorithm_id: "unicode-casefold/17.0.0-full-default-v1",
    source_paths: ["CaseFolding.txt"],
    rule_source_path: null,
    conformance_test_path: null,
  },
  {
    artifact_id: "unicode-whitespace",
    file: "fixtures/learning-ranking/unicode-17-whitespace.json",
    algorithm_id: "unicode-whitespace/17.0.0-white-space-v1",
    source_paths: ["PropList.txt"],
    rule_source_path: null,
    conformance_test_path: null,
  },
  {
    artifact_id: "unicode-word-break",
    file: "fixtures/learning-ranking/unicode-17-word-break.json",
    algorithm_id: "unicode-word-break/17.0.0-uax29-default-v1",
    source_paths: ["auxiliary/WordBreakProperty.txt", "emoji/emoji-data.txt"],
    rule_source_path: "reports/tr29-47.html",
    conformance_test_path: "auxiliary/WordBreakTest.txt",
  },
  {
    artifact_id: "unicode-grapheme-break",
    file: "fixtures/learning-ranking/unicode-17-grapheme-break.json",
    algorithm_id: "unicode-grapheme-break/17.0.0-uax29-extended-v1",
    source_paths: ["auxiliary/GraphemeBreakProperty.txt", "DerivedCoreProperties.txt", "emoji/emoji-data.txt"],
    rule_source_path: "reports/tr29-47.html",
    conformance_test_path: "auxiliary/GraphemeBreakTest.txt",
  },
];

const REQUIRED_SOURCE_PATHS = [
  "CaseFolding.txt",
  "CompositionExclusions.txt",
  "DerivedCoreProperties.txt",
  "DerivedNormalizationProps.txt",
  "PropList.txt",
  "ReadMe.txt",
  "UnicodeData.txt",
  "auxiliary/GraphemeBreakProperty.txt",
  "auxiliary/GraphemeBreakTest.txt",
  "auxiliary/WordBreakProperty.txt",
  "auxiliary/WordBreakTest.txt",
  "emoji/emoji-data.txt",
  "reports/tr29-47.html",
];

const REQUIRED_SOURCE_IDENTITIES = REQUIRED_SOURCE_PATHS.map((path) => ({
  path,
  public_url: path === "reports/tr29-47.html"
    ? "https://www.unicode.org/reports/tr29/tr29-47.html"
    : `https://www.unicode.org/Public/17.0.0/ucd/${path}`,
}));

const WORD_PROPERTY_ORDER = [
  "Other", "CR", "LF", "Newline", "Extend", "ZWJ", "Regional_Indicator", "Format",
  "Katakana", "Hebrew_Letter", "ALetter", "Single_Quote", "Double_Quote", "MidNumLet",
  "MidLetter", "MidNum", "Numeric", "ExtendNumLet", "WSegSpace",
];

const GRAPHEME_PROPERTY_ORDER = [
  "Other", "CR", "LF", "Control", "Extend", "ZWJ", "Regional_Indicator", "Prepend",
  "SpacingMark", "L", "V", "T", "LV", "LVT",
];

function fail(detail) {
  throw new Error(`unicode_artifact_generation_failed:${detail}`);
}

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalize(value, path, ancestors) {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail(`non_finite_number:${path}`);
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (typeof value !== "object") fail(`non_canonical_value:${path}`);
  if (ancestors.has(value)) fail(`cycle:${path}`);
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      return `[${value.map((entry, index) => canonicalize(entry, `${path}[${index}]`, ancestors)).join(",")}]`;
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) fail(`non_plain_object:${path}`);
    return `{${Reflect.ownKeys(value)
      .map((key) => {
        if (typeof key !== "string") fail(`symbol_key:${path}`);
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor?.enumerable || !("value" in descriptor)) fail(`non_data_property:${path}.${key}`);
        return key;
      })
      .sort((left, right) => left.localeCompare(right, "en"))
      .map((key) => `${JSON.stringify(key)}:${canonicalize(value[key], `${path}.${key}`, ancestors)}`)
      .join(",")}}`;
  } finally {
    ancestors.delete(value);
  }
}

export function canonicalJson(value) {
  return `${canonicalize(value, "$", new Set())}\n`;
}

export function sha256Canonical(value) {
  return sha256Bytes(Buffer.from(canonicalJson(value), "utf8"));
}

function property(domain, ...values) {
  return { op: "property", domain, values };
}

function sequence(...terms) {
  return { op: "sequence", terms };
}

function choice(...terms) {
  return { op: "choice", terms };
}

function repeat(term, minimum = 0, maximum = null) {
  return { op: "repeat", minimum, maximum, term };
}

function boundary(rule_id, priority, decision, left, right) {
  return { step_kind: "boundary", rule_id, priority, decision, left, right };
}

function finalizeMachine(machine) {
  return { ...machine, machine_digest: sha256Canonical(machine) };
}

export function buildBoundaryMachines() {
  const wb = (...values) => property("word_break", ...values);
  const gb = (...values) => property("grapheme_cluster_break", ...values);
  const ep = () => property("extended_pictographic", "Yes");
  const incb = (...values) => property("indic_conjunct_break", ...values);
  const macro = (...values) => property("word_macro", ...values);
  const any = () => property("universal", "Any");
  const sot = { op: "sot" };
  const eot = { op: "eot" };
  const midLetter = choice(wb("MidLetter"), macro("MidNumLetQ"));
  const midNumber = choice(wb("MidNum"), macro("MidNumLetQ"));
  const alphaNumericKatakana = choice(macro("AHLetter"), wb("Numeric"), wb("Katakana"));

  const wordSteps = [
    boundary("WB1", 0, "break", sot, any()),
    boundary("WB2", 1, "break", any(), eot),
    boundary("WB3", 2, "no_break", wb("CR"), wb("LF")),
    boundary("WB3a", 3, "break", wb("Newline", "CR", "LF"), any()),
    boundary("WB3b", 4, "break", any(), wb("Newline", "CR", "LF")),
    boundary("WB3c", 5, "no_break", wb("ZWJ"), ep()),
    boundary("WB3d", 6, "no_break", wb("WSegSpace"), wb("WSegSpace")),
    {
      step_kind: "ignore_rewrite",
      rule_id: "WB4",
      priority: 7,
      ignored_properties: ["Extend", "Format", "ZWJ"],
      except_after: ["sot", "CR", "LF", "Newline"],
      later_rule_view: "remove_ignored_and_project_boundaries",
    },
    boundary("WB5", 8, "no_break", macro("AHLetter"), macro("AHLetter")),
    boundary("WB6", 9, "no_break", macro("AHLetter"), sequence(midLetter, macro("AHLetter"))),
    boundary("WB7", 10, "no_break", sequence(macro("AHLetter"), midLetter), macro("AHLetter")),
    boundary("WB7a", 11, "no_break", wb("Hebrew_Letter"), wb("Single_Quote")),
    boundary("WB7b", 12, "no_break", wb("Hebrew_Letter"), sequence(wb("Double_Quote"), wb("Hebrew_Letter"))),
    boundary("WB7c", 13, "no_break", sequence(wb("Hebrew_Letter"), wb("Double_Quote")), wb("Hebrew_Letter")),
    boundary("WB8", 14, "no_break", wb("Numeric"), wb("Numeric")),
    boundary("WB9", 15, "no_break", macro("AHLetter"), wb("Numeric")),
    boundary("WB10", 16, "no_break", wb("Numeric"), macro("AHLetter")),
    boundary("WB11", 17, "no_break", sequence(wb("Numeric"), midNumber), wb("Numeric")),
    boundary("WB12", 18, "no_break", wb("Numeric"), sequence(midNumber, wb("Numeric"))),
    boundary("WB13", 19, "no_break", wb("Katakana"), wb("Katakana")),
    boundary("WB13a", 20, "no_break", choice(alphaNumericKatakana, wb("ExtendNumLet")), wb("ExtendNumLet")),
    boundary("WB13b", 21, "no_break", wb("ExtendNumLet"), alphaNumericKatakana),
    boundary("WB15", 22, "no_break", { op: "regional_indicator_prefix", parity: "odd" }, wb("Regional_Indicator")),
    boundary("WB16", 23, "no_break", { op: "regional_indicator_prefix", parity: "odd" }, wb("Regional_Indicator")),
    boundary("WB999", 24, "break", any(), any()),
  ];

  const graphemeSteps = [
    boundary("GB1", 0, "break", sot, any()),
    boundary("GB2", 1, "break", any(), eot),
    boundary("GB3", 2, "no_break", gb("CR"), gb("LF")),
    boundary("GB4", 3, "break", gb("Control", "CR", "LF"), any()),
    boundary("GB5", 4, "break", any(), gb("Control", "CR", "LF")),
    boundary("GB6", 5, "no_break", gb("L"), gb("L", "V", "LV", "LVT")),
    boundary("GB7", 6, "no_break", gb("LV", "V"), gb("V", "T")),
    boundary("GB8", 7, "no_break", gb("LVT", "T"), gb("T")),
    boundary("GB9", 8, "no_break", any(), gb("Extend", "ZWJ")),
    boundary("GB9a", 9, "no_break", any(), gb("SpacingMark")),
    boundary("GB9b", 10, "no_break", gb("Prepend"), any()),
    boundary(
      "GB9c",
      11,
      "no_break",
      { op: "indic_conjunct_prefix" },
      incb("Consonant"),
    ),
    boundary(
      "GB11",
      12,
      "no_break",
      { op: "extended_pictographic_extend_zwj_prefix" },
      ep(),
    ),
    boundary("GB12", 13, "no_break", { op: "regional_indicator_prefix", parity: "odd" }, gb("Regional_Indicator")),
    boundary("GB13", 14, "no_break", { op: "regional_indicator_prefix", parity: "odd" }, gb("Regional_Indicator")),
    boundary("GB999", 15, "break", any(), any()),
  ];

  const wordPreimage = {
    contract_version: "contentmd.unicode-boundary-machine/0.1.0",
    machine_id: "unicode-word-break/17.0.0-uax29-default-v1",
    unicode_version: UNICODE_VERSION,
    uax29_revision: UAX29_REVISION,
    conformance_profile: "UAX29-C2-1-default-word",
    scan_direction: "left_to_right",
    rule_order: wordSteps.map((step) => step.rule_id),
    steps: wordSteps,
    default_decision: "break",
  };
  const graphemePreimage = {
    contract_version: "contentmd.unicode-boundary-machine/0.1.0",
    machine_id: "unicode-grapheme-break/17.0.0-uax29-extended-v1",
    unicode_version: UNICODE_VERSION,
    uax29_revision: UAX29_REVISION,
    conformance_profile: "UAX29-C1-1-extended-grapheme",
    scan_direction: "left_to_right",
    rule_order: graphemeSteps.map((step) => step.rule_id),
    steps: graphemeSteps,
    default_decision: "break",
  };
  return {
    word: finalizeMachine(wordPreimage),
    grapheme: finalizeMachine(graphemePreimage),
  };
}

function parseHexScalar(value, detail) {
  if (!/^[0-9A-F]{4,6}$/.test(value)) fail(`invalid_scalar:${detail}`);
  const scalar = Number.parseInt(value, 16);
  if (scalar > 0x10ffff || (scalar >= 0xd800 && scalar <= 0xdfff)) fail(`invalid_scalar:${detail}`);
  return scalar;
}

function parseUnicodeDataCodePoint(value, detail) {
  if (!/^[0-9A-F]{4,6}$/.test(value)) fail(`invalid_code_point:${detail}`);
  const codePoint = Number.parseInt(value, 16);
  if (codePoint > 0x10ffff) fail(`invalid_code_point:${detail}`);
  return codePoint;
}

function parseRange(value, detail) {
  const fields = value.split("..");
  if (fields.length > 2) fail(`invalid_range:${detail}`);
  const start = parseHexScalar(fields[0], detail);
  const end = fields.length === 2 ? parseHexScalar(fields[1], detail) : start;
  if (end < start) fail(`descending_range:${detail}`);
  if (start <= 0xdfff && end >= 0xd800) fail(`surrogate_range:${detail}`);
  return { start, end };
}

function dataLines(text) {
  return text.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n");
}

function semicolonRows(text, expectedMinimumFields = 2) {
  const rows = [];
  for (const [index, original] of dataLines(text).entries()) {
    const body = original.split("#", 1)[0].trim();
    if (body.length === 0) continue;
    const fields = body.split(";").map((field) => field.trim());
    if (fields.length < expectedMinimumFields) fail(`field_count:${index + 1}`);
    rows.push({ fields, line: index + 1 });
  }
  return rows;
}

function mergeRanges(ranges, key = "value") {
  const sorted = [...ranges].sort((left, right) => left.start - right.start || left.end - right.end);
  const merged = [];
  for (const range of sorted) {
    const previous = merged.at(-1);
    if (previous && range.start <= previous.end) fail("overlapping_ranges");
    if (previous && range.start === previous.end + 1 && previous[key] === range[key]) {
      previous.end = range.end;
    } else {
      merged.push({ ...range });
    }
  }
  return merged;
}

function assertSortedNonoverlapping(ranges, allowAdjacent = true) {
  let priorEnd = -1;
  for (const range of ranges) {
    if (!Number.isInteger(range.start) || !Number.isInteger(range.end) || range.end < range.start) fail("invalid_generated_range");
    if (range.start <= priorEnd) fail("unsorted_generated_range");
    if (!allowAdjacent && range.start === priorEnd + 1) fail("unmerged_generated_range");
    priorEnd = range.end;
  }
}

function lookupRange(ranges, scalar, fallback = null, valueField = "property") {
  let low = 0;
  let high = ranges.length - 1;
  while (low <= high) {
    const middle = (low + high) >>> 1;
    const range = ranges[middle];
    if (scalar < range.start) high = middle - 1;
    else if (scalar > range.end) low = middle + 1;
    else return range[valueField];
  }
  return fallback;
}

function parseUnicodeData(text) {
  const rows = dataLines(text).filter((line) => line.length > 0).map((line, index) => {
    const fields = line.split(";");
    if (fields.length !== 15) fail(`unicode_data_field_count:${index + 1}`);
    return { fields, line: index + 1 };
  });
  const combining = [];
  const mappings = [];
  const cccByScalar = new Map();
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const scalar = parseUnicodeDataCodePoint(row.fields[0], `UnicodeData:${row.line}`);
    const name = row.fields[1];
    let end = scalar;
    if (name.endsWith(", First>")) {
      const last = rows[index + 1];
      if (!last || !last.fields[1].endsWith(", Last>")) fail(`unicode_data_range_pair:${row.line}`);
      end = parseUnicodeDataCodePoint(last.fields[0], `UnicodeData:${last.line}`);
      if (end <= scalar) fail(`unicode_data_range_order:${row.line}`);
      for (let field = 2; field < 15; field += 1) {
        if (row.fields[field] !== last.fields[field]) fail(`unicode_data_range_mismatch:${row.line}:${field}`);
      }
      index += 1;
    } else if (name.endsWith(", Last>")) {
      fail(`unicode_data_unpaired_last:${row.line}`);
    }

    if (scalar >= 0xd800 && end <= 0xdfff) continue;
    if (scalar <= 0xdfff && end >= 0xd800) fail(`unicode_data_partial_surrogate_range:${row.line}`);

    const ccc = Number.parseInt(row.fields[3], 10);
    if (!Number.isInteger(ccc) || ccc < 0 || ccc > 255) fail(`unicode_data_ccc:${row.line}`);
    if (ccc !== 0) {
      combining.push({ start: scalar, end, value: ccc });
      for (let current = scalar; current <= end; current += 1) cccByScalar.set(current, ccc);
    }

    const decomposition = row.fields[5];
    if (decomposition.length > 0) {
      if (end !== scalar) fail(`unicode_data_range_decomposition:${row.line}`);
      const tokens = decomposition.split(/ +/u);
      const tagged = tokens[0].startsWith("<");
      if (tagged) {
        if (!/^<[A-Za-z]+>$/.test(tokens[0])) fail(`unicode_data_decomposition_tag:${row.line}`);
        tokens.shift();
      }
      if (tokens.length === 0) fail(`unicode_data_empty_decomposition:${row.line}`);
      mappings.push({
        scalar,
        kind: tagged ? "compatibility" : "canonical",
        mapping: tokens.map((token) => parseHexScalar(token, `UnicodeData:${row.line}`)),
      });
    }
  }
  const canonical_combining_class_ranges = mergeRanges(combining);
  assertSortedNonoverlapping(canonical_combining_class_ranges);
  mappings.sort((left, right) => left.scalar - right.scalar);
  return { canonical_combining_class_ranges, decomposition_mappings: mappings, cccByScalar };
}

function parseFullCompositionExclusions(derivedText, explicitText) {
  const full = [];
  for (const { fields, line } of semicolonRows(derivedText, 2)) {
    if (fields[1] !== "Full_Composition_Exclusion") continue;
    const range = parseRange(fields[0], `DerivedNormalizationProps:${line}`);
    for (let scalar = range.start; scalar <= range.end; scalar += 1) full.push(scalar);
  }
  const set = new Set(full);
  for (const [index, original] of dataLines(explicitText).entries()) {
    const body = original.split("#", 1)[0].trim();
    if (body.length === 0) continue;
    const range = parseRange(body, `CompositionExclusions:${index + 1}`);
    for (let scalar = range.start; scalar <= range.end; scalar += 1) {
      if (!set.has(scalar)) fail(`composition_exclusion_not_full:${scalar.toString(16)}`);
    }
  }
  return [...set].sort((left, right) => left - right);
}

function buildNormalizationTables(sources) {
  const parsed = parseUnicodeData(sources.get("UnicodeData.txt"));
  const composition_exclusions = parseFullCompositionExclusions(
    sources.get("DerivedNormalizationProps.txt"),
    sources.get("CompositionExclusions.txt"),
  );
  const excluded = new Set(composition_exclusions);
  const composition_pairs = [];
  for (const entry of parsed.decomposition_mappings) {
    if (entry.kind !== "canonical" || entry.mapping.length !== 2 || excluded.has(entry.scalar)) continue;
    if ((parsed.cccByScalar.get(entry.mapping[0]) ?? 0) !== 0) continue;
    composition_pairs.push({ starter: entry.mapping[0], combining: entry.mapping[1], composite: entry.scalar });
  }
  composition_pairs.sort((left, right) => left.starter - right.starter || left.combining - right.combining || left.composite - right.composite);
  return {
    canonical_combining_class_ranges: parsed.canonical_combining_class_ranges,
    decomposition_mappings: parsed.decomposition_mappings,
    composition_exclusions,
    composition_pairs,
    hangul: {
      s_base: 44032,
      l_base: 4352,
      v_base: 4449,
      t_base: 4519,
      l_count: 19,
      v_count: 21,
      t_count: 28,
      n_count: 588,
      s_count: 11172,
    },
  };
}

function buildCasefoldTables(text) {
  const selected = new Map();
  for (const { fields, line } of semicolonRows(text, 4)) {
    if (fields.length !== 4) fail(`casefold_field_count:${line}`);
    const scalar = parseHexScalar(fields[0], `CaseFolding:${line}`);
    const status = fields[1];
    if (!["C", "F", "S", "T"].includes(status)) fail(`casefold_status:${line}`);
    if (status === "S" || status === "T") continue;
    const mapping = fields[2].split(/ +/u).map((token) => parseHexScalar(token, `CaseFolding:${line}`));
    if (mapping.length === 0) fail(`casefold_empty:${line}`);
    const existing = selected.get(scalar);
    if (!existing || status === "F") selected.set(scalar, { scalar, mapping, status });
    else if (existing.status === status && canonicalJson(existing.mapping) !== canonicalJson(mapping)) fail(`casefold_conflict:${line}`);
  }
  return {
    mappings: [...selected.values()]
      .sort((left, right) => left.scalar - right.scalar)
      .map(({ scalar, mapping }) => ({ scalar, mapping })),
  };
}

function buildWhitespaceTables(text) {
  const ranges = [];
  for (const { fields, line } of semicolonRows(text, 2)) {
    if (fields[1] !== "White_Space") continue;
    ranges.push(parseRange(fields[0], `PropList:${line}`));
  }
  if (ranges.length === 0) fail("white_space_absent");
  const merged = mergeRanges(ranges, "missing").map(({ start, end }) => ({ start, end }));
  assertSortedNonoverlapping(merged);
  return { ranges: merged };
}

function parsePropertyRanges(text, expectedProperties, sourceName, selector = null) {
  const ranges = [];
  for (const { fields, line } of semicolonRows(text, 2)) {
    const selected = selector ? selector(fields, line) : fields[1];
    if (selected === null) continue;
    if (!expectedProperties.includes(selected)) fail(`unknown_property:${sourceName}:${line}:${selected}`);
    ranges.push({ ...parseRange(fields[0], `${sourceName}:${line}`), property: selected });
  }
  const sorted = ranges.sort((left, right) => left.start - right.start || left.end - right.end);
  assertSortedNonoverlapping(sorted);
  return sorted;
}

function completePropertyPartition(namedRanges) {
  const output = [];
  let cursor = 0;
  for (const range of namedRanges) {
    if (cursor < range.start) {
      const gapEnd = range.start - 1;
      if (cursor <= 0xd7ff) output.push({ start: cursor, end: Math.min(gapEnd, 0xd7ff), property: "Other" });
      if (gapEnd >= 0xe000) output.push({ start: Math.max(cursor, 0xe000), end: gapEnd, property: "Other" });
    }
    output.push(range);
    cursor = range.end + 1;
    if (cursor === 0xd800) cursor = 0xe000;
  }
  if (cursor <= 0x10ffff) {
    if (cursor <= 0xd7ff) output.push({ start: cursor, end: 0xd7ff, property: "Other" });
    output.push({ start: Math.max(cursor, 0xe000), end: 0x10ffff, property: "Other" });
  }
  return mergeRanges(output, "property");
}

function parseExtendedPictographic(text) {
  const ranges = [];
  for (const { fields, line } of semicolonRows(text, 2)) {
    if (fields[1] !== "Extended_Pictographic") continue;
    ranges.push(parseRange(fields[0], `emoji-data:${line}`));
  }
  if (ranges.length === 0) fail("extended_pictographic_absent");
  return mergeRanges(ranges, "missing").map(({ start, end }) => ({ start, end }));
}

function parseIndicConjunctBreak(text) {
  const allowed = ["Consonant", "Extend", "Linker"];
  const ranges = parsePropertyRanges(
    text,
    allowed,
    "DerivedCoreProperties",
    (fields, line) => {
      if (fields[1] !== "InCB") return null;
      if (fields.length !== 3) fail(`incb_field_count:${line}`);
      return fields[2];
    },
  );
  for (const propertyName of allowed) {
    if (!ranges.some((range) => range.property === propertyName)) fail(`incb_property_absent:${propertyName}`);
  }
  return ranges;
}

function parseConformanceCases(text, sourceName) {
  const cases = [];
  for (const [index, original] of dataLines(text).entries()) {
    const body = original.split("#", 1)[0].trim();
    if (body.length === 0) continue;
    const tokens = body.split(/\s+/u);
    const markers = [];
    const scalars = [];
    let expectingMarker = true;
    for (const token of tokens) {
      if (expectingMarker) {
        if (token !== "÷" && token !== "×") fail(`conformance_marker:${sourceName}:${index + 1}`);
        markers.push(token === "÷");
      } else {
        scalars.push(parseHexScalar(token, `${sourceName}:${index + 1}`));
      }
      expectingMarker = !expectingMarker;
    }
    if (expectingMarker || markers.length !== scalars.length + 1) fail(`conformance_shape:${sourceName}:${index + 1}`);
    cases.push({ line: index + 1, scalars, breaks: markers });
  }
  if (cases.length === 0) fail(`conformance_empty:${sourceName}`);
  return cases;
}

function isNewlineWordProperty(propertyName) {
  return propertyName === "Newline" || propertyName === "CR" || propertyName === "LF";
}

function isWordIgnored(propertyName) {
  return propertyName === "Extend" || propertyName === "Format" || propertyName === "ZWJ";
}

function isAhLetter(propertyName) {
  return propertyName === "ALetter" || propertyName === "Hebrew_Letter";
}

function isMidLetter(propertyName) {
  return propertyName === "MidLetter" || propertyName === "MidNumLet" || propertyName === "Single_Quote";
}

function isMidNumber(propertyName) {
  return propertyName === "MidNum" || propertyName === "MidNumLet" || propertyName === "Single_Quote";
}

function wordBoundaries(scalars, propertyRanges, extendedPictographicRanges) {
  const properties = scalars.map((scalar) => lookupRange(propertyRanges, scalar, "Other"));
  const extended = scalars.map((scalar) => lookupRange(extendedPictographicRanges, scalar, false, "present") === true);
  const ignored = [];
  for (const [index, propertyName] of properties.entries()) {
    if (!isWordIgnored(propertyName)) {
      ignored.push(false);
      continue;
    }
    let previous = index - 1;
    while (previous >= 0 && ignored[previous]) previous -= 1;
    ignored.push(previous >= 0 && !isNewlineWordProperty(properties[previous]));
  }
  const significant = properties.map((_, index) => index).filter((index) => !ignored[index]);
  const position = new Map(significant.map((index, order) => [index, order]));
  const previousSignificant = (index) => {
    for (let current = index; current >= 0; current -= 1) if (!ignored[current]) return current;
    return -1;
  };
  const nextSignificant = (index) => {
    for (let current = index; current < scalars.length; current += 1) if (!ignored[current]) return current;
    return scalars.length;
  };

  const breaks = Array(scalars.length + 1).fill(true);
  for (let boundaryIndex = 1; boundaryIndex < scalars.length; boundaryIndex += 1) {
    const rawLeft = boundaryIndex - 1;
    const rawRight = boundaryIndex;
    const rawLeftProperty = properties[rawLeft];
    const rawRightProperty = properties[rawRight];
    if (rawLeftProperty === "CR" && rawRightProperty === "LF") {
      breaks[boundaryIndex] = false;
      continue;
    }
    if (isNewlineWordProperty(rawLeftProperty) || isNewlineWordProperty(rawRightProperty)) continue;
    if (rawLeftProperty === "ZWJ" && extended[rawRight]) {
      breaks[boundaryIndex] = false;
      continue;
    }
    if (rawLeftProperty === "WSegSpace" && rawRightProperty === "WSegSpace") {
      breaks[boundaryIndex] = false;
      continue;
    }
    if (ignored[rawRight]) {
      breaks[boundaryIndex] = false;
      continue;
    }

    const left = previousSignificant(rawLeft);
    const right = nextSignificant(rawRight);
    if (left < 0 || right >= scalars.length) continue;
    const rightOrder = position.get(right);
    const leftOrder = position.get(left);
    const beforeLeft = leftOrder > 0 ? significant[leftOrder - 1] : -1;
    const afterRight = rightOrder + 1 < significant.length ? significant[rightOrder + 1] : scalars.length;
    const leftProperty = properties[left];
    const rightProperty = properties[right];
    const beforeLeftProperty = beforeLeft >= 0 ? properties[beforeLeft] : null;
    const afterRightProperty = afterRight < scalars.length ? properties[afterRight] : null;

    if (isAhLetter(leftProperty) && isAhLetter(rightProperty)) breaks[boundaryIndex] = false;
    else if (isAhLetter(leftProperty) && isMidLetter(rightProperty) && isAhLetter(afterRightProperty)) breaks[boundaryIndex] = false;
    else if (isAhLetter(beforeLeftProperty) && isMidLetter(leftProperty) && isAhLetter(rightProperty)) breaks[boundaryIndex] = false;
    else if (leftProperty === "Hebrew_Letter" && rightProperty === "Single_Quote") breaks[boundaryIndex] = false;
    else if (leftProperty === "Hebrew_Letter" && rightProperty === "Double_Quote" && afterRightProperty === "Hebrew_Letter") breaks[boundaryIndex] = false;
    else if (beforeLeftProperty === "Hebrew_Letter" && leftProperty === "Double_Quote" && rightProperty === "Hebrew_Letter") breaks[boundaryIndex] = false;
    else if (leftProperty === "Numeric" && rightProperty === "Numeric") breaks[boundaryIndex] = false;
    else if (isAhLetter(leftProperty) && rightProperty === "Numeric") breaks[boundaryIndex] = false;
    else if (leftProperty === "Numeric" && isAhLetter(rightProperty)) breaks[boundaryIndex] = false;
    else if (beforeLeftProperty === "Numeric" && isMidNumber(leftProperty) && rightProperty === "Numeric") breaks[boundaryIndex] = false;
    else if (leftProperty === "Numeric" && isMidNumber(rightProperty) && afterRightProperty === "Numeric") breaks[boundaryIndex] = false;
    else if (leftProperty === "Katakana" && rightProperty === "Katakana") breaks[boundaryIndex] = false;
    else if (["Numeric", "Katakana", "ExtendNumLet"].includes(leftProperty) || isAhLetter(leftProperty)) {
      if (rightProperty === "ExtendNumLet") breaks[boundaryIndex] = false;
    }
    if (breaks[boundaryIndex] && leftProperty === "ExtendNumLet" && (["Numeric", "Katakana"].includes(rightProperty) || isAhLetter(rightProperty))) {
      breaks[boundaryIndex] = false;
    }
    if (breaks[boundaryIndex] && leftProperty === "Regional_Indicator" && rightProperty === "Regional_Indicator") {
      let count = 0;
      for (let order = leftOrder; order >= 0 && properties[significant[order]] === "Regional_Indicator"; order -= 1) count += 1;
      if (count % 2 === 1) breaks[boundaryIndex] = false;
    }
  }
  return breaks;
}

function graphemeBoundaries(scalars, propertyRanges, extendedPictographicRanges, indicRanges) {
  const properties = scalars.map((scalar) => lookupRange(propertyRanges, scalar, "Other"));
  const extended = scalars.map((scalar) => lookupRange(extendedPictographicRanges, scalar, false, "present") === true);
  const indic = scalars.map((scalar) => lookupRange(indicRanges, scalar, null));
  const breaks = Array(scalars.length + 1).fill(true);
  for (let index = 1; index < scalars.length; index += 1) {
    const left = properties[index - 1];
    const right = properties[index];
    if (left === "CR" && right === "LF") {
      breaks[index] = false;
      continue;
    }
    if (["Control", "CR", "LF"].includes(left) || ["Control", "CR", "LF"].includes(right)) continue;
    if (left === "L" && ["L", "V", "LV", "LVT"].includes(right)) breaks[index] = false;
    else if (["LV", "V"].includes(left) && ["V", "T"].includes(right)) breaks[index] = false;
    else if (["LVT", "T"].includes(left) && right === "T") breaks[index] = false;
    else if (right === "Extend" || right === "ZWJ") breaks[index] = false;
    else if (right === "SpacingMark") breaks[index] = false;
    else if (left === "Prepend") breaks[index] = false;
    else if (indic[index] === "Consonant") {
      let cursor = index - 1;
      let linkerSeen = false;
      while (cursor >= 0 && (indic[cursor] === "Extend" || indic[cursor] === "Linker")) {
        if (indic[cursor] === "Linker") linkerSeen = true;
        cursor -= 1;
      }
      if (linkerSeen && cursor >= 0 && indic[cursor] === "Consonant") breaks[index] = false;
    }
    if (breaks[index] && extended[index] && left === "ZWJ") {
      let cursor = index - 2;
      while (cursor >= 0 && properties[cursor] === "Extend") cursor -= 1;
      if (cursor >= 0 && extended[cursor]) breaks[index] = false;
    }
    if (breaks[index] && left === "Regional_Indicator" && right === "Regional_Indicator") {
      let count = 0;
      for (let cursor = index - 1; cursor >= 0 && properties[cursor] === "Regional_Indicator"; cursor -= 1) count += 1;
      if (count % 2 === 1) breaks[index] = false;
    }
  }
  return breaks;
}

function verifyConformance(cases, boundaryFunction, detail) {
  for (const testCase of cases) {
    const actual = boundaryFunction(testCase.scalars);
    if (actual.length !== testCase.breaks.length || actual.some((value, index) => value !== testCase.breaks[index])) {
      const mismatch = actual.findIndex((value, index) => value !== testCase.breaks[index]);
      fail(`conformance:${detail}:${testCase.line}:${mismatch}`);
    }
  }
}

function buildBoundaryTables(sources, machines) {
  const wordNamed = parsePropertyRanges(
    sources.get("auxiliary/WordBreakProperty.txt"),
    WORD_PROPERTY_ORDER.filter((entry) => entry !== "Other"),
    "WordBreakProperty",
  );
  const graphemeNamed = parsePropertyRanges(
    sources.get("auxiliary/GraphemeBreakProperty.txt"),
    GRAPHEME_PROPERTY_ORDER.filter((entry) => entry !== "Other"),
    "GraphemeBreakProperty",
  );
  const wordPropertyRanges = completePropertyPartition(wordNamed);
  const graphemePropertyRanges = completePropertyPartition(graphemeNamed);
  const extendedRanges = parseExtendedPictographic(sources.get("emoji/emoji-data.txt"))
    .map((range) => ({ ...range, present: true }));
  const indicRanges = parseIndicConjunctBreak(sources.get("DerivedCoreProperties.txt"));
  assertSortedNonoverlapping(wordPropertyRanges);
  assertSortedNonoverlapping(graphemePropertyRanges);
  assertSortedNonoverlapping(extendedRanges);
  assertSortedNonoverlapping(indicRanges);

  const wordCases = parseConformanceCases(sources.get("auxiliary/WordBreakTest.txt"), "WordBreakTest");
  const graphemeCases = parseConformanceCases(sources.get("auxiliary/GraphemeBreakTest.txt"), "GraphemeBreakTest");
  verifyConformance(
    wordCases,
    (scalars) => wordBoundaries(scalars, wordPropertyRanges, extendedRanges),
    "word",
  );
  verifyConformance(
    graphemeCases,
    (scalars) => graphemeBoundaries(scalars, graphemePropertyRanges, extendedRanges, indicRanges),
    "grapheme",
  );

  return {
    word: {
      rule_machine: machines.word,
      rules_digest: machines.word.machine_digest,
      property_order: WORD_PROPERTY_ORDER,
      property_ranges: wordPropertyRanges,
      extended_pictographic_ranges: extendedRanges.map(({ start, end }) => ({ start, end })),
    },
    grapheme: {
      rule_machine: machines.grapheme,
      rules_digest: machines.grapheme.machine_digest,
      property_order: GRAPHEME_PROPERTY_ORDER,
      property_ranges: graphemePropertyRanges,
      extended_pictographic_ranges: extendedRanges.map(({ start, end }) => ({ start, end })),
      indic_conjunct_break_ranges: indicRanges,
    },
  };
}

function assertCanonicalJsonBytes(bytes, detail) {
  let parsed;
  try {
    parsed = JSON.parse(bytes);
  } catch {
    fail(`json:${detail}`);
  }
  if (canonicalJson(parsed) !== bytes) fail(`noncanonical_json:${detail}`);
  return parsed;
}

function assertExactKeys(value, expected, detail) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`shape:${detail}`);
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (canonicalJson(actual) !== canonicalJson(wanted)) fail(`keys:${detail}`);
}

export function verifySourceLockContract(lock) {
  assertExactKeys(lock, ["contract_version", "unicode_version", "license", "sources", "artifact_inputs"], "source_lock");
  if (lock.contract_version !== "contentmd.unicode-source-lock/0.1.0" || lock.unicode_version !== UNICODE_VERSION) fail("source_lock_version");
  if (!Array.isArray(lock.sources) || !Array.isArray(lock.artifact_inputs)) fail("source_lock_arrays");
  if (lock.sources.length !== REQUIRED_SOURCE_IDENTITIES.length) fail("source_lock_source_count");
  for (const [index, expected] of REQUIRED_SOURCE_IDENTITIES.entries()) {
    const entry = lock.sources[index];
    assertExactKeys(entry, ["path", "public_url", "raw_bytes_digest", "byte_count"], `source:${index}`);
    if (entry.path !== expected.path) fail(`source_lock_path:${index}`);
    if (entry.public_url !== expected.public_url) fail(`source_lock_public_url:${index}`);
    if (!DIGEST_PATTERN.test(entry.raw_bytes_digest) || !Number.isSafeInteger(entry.byte_count) || entry.byte_count <= 0) fail(`source_entry:${index}`);
  }
  assertExactKeys(lock.license, ["path", "public_url", "raw_bytes_digest", "byte_count"], "source:license");
  if (lock.license.path !== "license.txt" || lock.license.public_url !== "https://www.unicode.org/license.txt") fail("license_identity");
  if (!DIGEST_PATTERN.test(lock.license.raw_bytes_digest) || !Number.isSafeInteger(lock.license.byte_count) || lock.license.byte_count <= 0) fail("license_entry");

  if (lock.artifact_inputs.length !== ARTIFACTS.length) fail("artifact_input_count");
  const machines = buildBoundaryMachines();
  for (const [index, expected] of ARTIFACTS.entries()) {
    const entry = lock.artifact_inputs[index];
    assertExactKeys(entry, ["artifact_id", "algorithm_id", "source_paths", "rule_source_path", "conformance_test_path", "expected_rules_digest"], `artifact_input:${index}`);
    for (const field of ["artifact_id", "algorithm_id", "rule_source_path", "conformance_test_path"]) {
      if (entry[field] !== expected[field]) fail(`artifact_input:${index}:${field}`);
    }
    if (canonicalJson(entry.source_paths) !== canonicalJson(expected.source_paths)) fail(`artifact_input:${index}:source_paths`);
    const expectedRuleDigest = entry.artifact_id === "unicode-word-break"
      ? machines.word.machine_digest
      : entry.artifact_id === "unicode-grapheme-break"
        ? machines.grapheme.machine_digest
        : null;
    if (entry.expected_rules_digest !== expectedRuleDigest) fail(`artifact_input:${index}:rules_digest`);
  }
  return machines;
}

async function loadAndVerifyInputs() {
  const lockBytesBuffer = await readFile(resolve(WORKSPACE_ROOT, LOCK_PATH));
  const lockBytes = TEXT_DECODER.decode(lockBytesBuffer);
  const lock = assertCanonicalJsonBytes(lockBytes, "source_lock");
  const machines = verifySourceLockContract(lock);

  const entries = [...lock.sources, lock.license];
  const sources = new Map();
  const rawEntries = new Map();
  for (const entry of entries) {
    assertExactKeys(entry, ["path", "public_url", "raw_bytes_digest", "byte_count"], `source:${entry.path}`);
    if (!DIGEST_PATTERN.test(entry.raw_bytes_digest) || !Number.isSafeInteger(entry.byte_count) || entry.byte_count <= 0) fail(`source_entry:${entry.path}`);
    const raw = await readFile(resolve(WORKSPACE_ROOT, SOURCE_ROOT, entry.path));
    if (raw.byteLength !== entry.byte_count || sha256Bytes(raw) !== entry.raw_bytes_digest) fail(`source_digest:${entry.path}`);
    const text = TEXT_DECODER.decode(raw);
    if (text.charCodeAt(0) === 0xfeff) fail(`source_bom:${entry.path}`);
    sources.set(entry.path, text);
    rawEntries.set(entry.path, { path: entry.path, raw_bytes_digest: entry.raw_bytes_digest, byte_count: entry.byte_count });
  }

  const receiptBytesBuffer = await readFile(resolve(WORKSPACE_ROOT, RECEIPT_PATH));
  const receiptBytes = TEXT_DECODER.decode(receiptBytesBuffer);
  const receipt = assertCanonicalJsonBytes(receiptBytes, "acquisition_receipt");
  assertExactKeys(receipt, [
    "contract_version", "unicode_version", "exact_host", "acquisition_script", "entries",
    "source_lock_raw_bytes_digest", "acquired_at", "status", "authority_effect", "receipt_digest",
  ], "acquisition_receipt");
  const { receipt_digest: receivedReceiptDigest, ...receiptPreimage } = receipt;
  if (sha256Canonical(receiptPreimage) !== receivedReceiptDigest) fail("receipt_digest");
  if (receipt.contract_version !== "contentmd.unicode-acquisition-receipt/0.1.0"
      || receipt.unicode_version !== UNICODE_VERSION
      || receipt.exact_host !== "www.unicode.org"
      || receipt.status !== "development_fixture_verified"
      || receipt.authority_effect !== "none") fail("receipt_envelope");
  if (receipt.source_lock_raw_bytes_digest !== sha256Bytes(lockBytesBuffer)) fail("receipt_lock_digest");
  const acquisitionBytes = await readFile(resolve(WORKSPACE_ROOT, "scripts/acquire-unicode-17-sources.mjs"));
  if (receipt.acquisition_script?.path !== "scripts/acquire-unicode-17-sources.mjs"
      || receipt.acquisition_script?.raw_bytes_digest !== sha256Bytes(acquisitionBytes)) fail("receipt_script_digest");
  if (!Array.isArray(receipt.entries) || receipt.entries.length !== entries.length) fail("receipt_entries");
  for (const [index, entry] of entries.entries()) {
    const observed = receipt.entries[index];
    if (observed.path !== entry.path || observed.public_url !== entry.public_url) fail(`receipt_entry:${index}`);
    for (const fetch of [observed.first_fetch, observed.second_fetch]) {
      if (fetch?.byte_count !== entry.byte_count || fetch?.raw_bytes_digest !== entry.raw_bytes_digest) fail(`receipt_fetch:${index}`);
    }
  }
  if (Number.isNaN(Date.parse(receipt.acquired_at))) fail("receipt_timestamp");
  return { lock, lockBytes, sources, rawEntries, machines };
}

function sourceEntriesFor(artifact, rawEntries) {
  return artifact.source_paths.map((path) => {
    const entry = rawEntries.get(path);
    if (!entry) fail(`missing_source_entry:${path}`);
    return entry;
  });
}

async function buildArtifacts() {
  const { lock, lockBytes, sources, rawEntries, machines } = await loadAndVerifyInputs();
  const generatorBytes = await readFile(resolve(WORKSPACE_ROOT, GENERATOR_PATH));
  const generatorDigest = sha256Bytes(generatorBytes);
  const sourceLockDigest = sha256Bytes(Buffer.from(lockBytes, "utf8"));
  const normalization = buildNormalizationTables(sources);
  const casefold = buildCasefoldTables(sources.get("CaseFolding.txt"));
  const whitespace = buildWhitespaceTables(sources.get("PropList.txt"));
  const boundaries = buildBoundaryTables(sources, machines);
  const tablesById = new Map([
    ["unicode-normalization", normalization],
    ["unicode-casefold", casefold],
    ["unicode-whitespace", whitespace],
    ["unicode-word-break", boundaries.word],
    ["unicode-grapheme-break", boundaries.grapheme],
  ]);

  return ARTIFACTS.map((artifact) => {
    const lockInput = lock.artifact_inputs.find((entry) => entry.artifact_id === artifact.artifact_id);
    if (!lockInput) fail(`missing_artifact_input:${artifact.artifact_id}`);
    const tables = tablesById.get(artifact.artifact_id);
    const envelope = {
      contract_version: "contentmd.unicode-artifact/0.1.0",
      artifact_id: artifact.artifact_id,
      artifact_version: UNICODE_VERSION,
      unicode_version: UNICODE_VERSION,
      algorithm_id: artifact.algorithm_id,
      source_lock: { path: LOCK_PATH, raw_bytes_digest: sourceLockDigest },
      source_entries: sourceEntriesFor(artifact, rawEntries),
      generator: { path: GENERATOR_PATH, raw_bytes_digest: generatorDigest },
      tables,
      tables_digest: sha256Canonical(tables),
    };
    return { path: artifact.file, bytes: canonicalJson(envelope) };
  });
}

async function writeArtifacts(outputs) {
  const temporaryPaths = [];
  try {
    for (const output of outputs) {
      const target = resolve(WORKSPACE_ROOT, output.path);
      const temporary = `${target}.tmp-${process.pid}`;
      await writeFile(temporary, output.bytes, { encoding: "utf8", flag: "wx" });
      temporaryPaths.push({ temporary, target });
    }
    for (const entry of temporaryPaths) await rename(entry.temporary, entry.target);
  } catch (error) {
    await Promise.all(temporaryPaths.map(({ temporary }) => unlink(temporary).catch(() => undefined)));
    throw error;
  }
}

async function checkArtifacts(outputs) {
  for (const output of outputs) {
    let observed;
    try {
      observed = await readFile(resolve(WORKSPACE_ROOT, output.path), "utf8");
    } catch {
      fail(`missing_generated_artifact:${output.path}`);
    }
    if (observed !== output.bytes) fail(`generated_artifact_mismatch:${output.path}`);
  }
}

async function main(args) {
  if (args.length > 1 || (args.length === 1 && args[0] !== "--check")) fail("arguments");
  const outputs = await buildArtifacts();
  for (const output of outputs) assertCanonicalJsonBytes(output.bytes, output.path);
  if (args[0] === "--check") await checkArtifacts(outputs);
  else await writeArtifacts(outputs);
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  main(process.argv.slice(2)).catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
