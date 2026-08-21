#!/usr/bin/env node

import { createHash } from "node:crypto";
import { request } from "node:https";
import {
  access,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  buildBoundaryMachines,
  canonicalJson,
  sha256Canonical,
} from "./generate-unicode-17-artifacts.mjs";

const WORKSPACE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_ROOT = resolve(WORKSPACE_ROOT, "fixtures/learning-ranking");
const SOURCE_TARGET = resolve(OUTPUT_ROOT, "unicode-17-sources");
const LOCK_TARGET = resolve(OUTPUT_ROOT, "unicode-17-source-lock.json");
const RECEIPT_TARGET = resolve(OUTPUT_ROOT, "unicode-17-acquisition-receipt.json");
const SCRIPT_PATH = "scripts/acquire-unicode-17-sources.mjs";
const EXACT_HOST = "www.unicode.org";
const TOTAL_BYTE_CAP = 32 * 1024 * 1024;
const RESPONSE_TIMEOUT_MS = 30_000;
const TEXT_DECODER = new TextDecoder("utf-8", { fatal: true });

const UCD_PATHS = [
  "UnicodeData.txt",
  "CompositionExclusions.txt",
  "DerivedNormalizationProps.txt",
  "CaseFolding.txt",
  "PropList.txt",
  "auxiliary/WordBreakProperty.txt",
  "auxiliary/GraphemeBreakProperty.txt",
  "auxiliary/WordBreakTest.txt",
  "auxiliary/GraphemeBreakTest.txt",
  "DerivedCoreProperties.txt",
  "emoji/emoji-data.txt",
  "ReadMe.txt",
];

const SOURCE_REQUESTS = [
  ...UCD_PATHS.map((path) => ({
    path,
    public_url: `https://${EXACT_HOST}/Public/17.0.0/ucd/${path}`,
  })),
  {
    path: "reports/tr29-47.html",
    public_url: `https://${EXACT_HOST}/reports/tr29/tr29-47.html`,
  },
].sort((left, right) => {
  const leftScalars = [...left.path].map((value) => value.codePointAt(0));
  const rightScalars = [...right.path].map((value) => value.codePointAt(0));
  const length = Math.min(leftScalars.length, rightScalars.length);
  for (let index = 0; index < length; index += 1) {
    if (leftScalars[index] !== rightScalars[index]) return leftScalars[index] - rightScalars[index];
  }
  return leftScalars.length - rightScalars.length;
});

const LICENSE_REQUEST = {
  path: "license.txt",
  public_url: `https://${EXACT_HOST}/license.txt`,
};

const ARTIFACT_INPUTS = [
  {
    artifact_id: "unicode-normalization",
    algorithm_id: "unicode-normalization/17.0.0-nfkc-v1",
    source_paths: ["UnicodeData.txt", "CompositionExclusions.txt", "DerivedNormalizationProps.txt"],
    rule_source_path: null,
    conformance_test_path: null,
    expected_rules_digest: null,
  },
  {
    artifact_id: "unicode-casefold",
    algorithm_id: "unicode-casefold/17.0.0-full-default-v1",
    source_paths: ["CaseFolding.txt"],
    rule_source_path: null,
    conformance_test_path: null,
    expected_rules_digest: null,
  },
  {
    artifact_id: "unicode-whitespace",
    algorithm_id: "unicode-whitespace/17.0.0-white-space-v1",
    source_paths: ["PropList.txt"],
    rule_source_path: null,
    conformance_test_path: null,
    expected_rules_digest: null,
  },
  {
    artifact_id: "unicode-word-break",
    algorithm_id: "unicode-word-break/17.0.0-uax29-default-v1",
    source_paths: ["auxiliary/WordBreakProperty.txt", "emoji/emoji-data.txt"],
    rule_source_path: "reports/tr29-47.html",
    conformance_test_path: "auxiliary/WordBreakTest.txt",
    expected_rules_digest: null,
  },
  {
    artifact_id: "unicode-grapheme-break",
    algorithm_id: "unicode-grapheme-break/17.0.0-uax29-extended-v1",
    source_paths: ["auxiliary/GraphemeBreakProperty.txt", "DerivedCoreProperties.txt", "emoji/emoji-data.txt"],
    rule_source_path: "reports/tr29-47.html",
    conformance_test_path: "auxiliary/GraphemeBreakTest.txt",
    expected_rules_digest: null,
  },
];

function fail(detail) {
  throw new Error(`unicode_source_acquisition_failed:${detail}`);
}

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function exists(path) {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function decodeUtf8(bytes, detail) {
  let text;
  try {
    text = TEXT_DECODER.decode(bytes);
  } catch {
    fail(`utf8:${detail}`);
  }
  if (text.charCodeAt(0) === 0xfeff) fail(`bom:${detail}`);
  return text;
}

function validateHeader(path, text) {
  if (path === "UnicodeData.txt") {
    if (!/^[0-9A-F]{4,6};[^;]+;(?:[^;]*;){12}[^;]*$/m.test(text)) fail(`header:${path}`);
    return;
  }
  if (path === "ReadMe.txt") {
    if (!text.includes("Version 17.0.0") || !text.includes("Unicode Character Database")) fail(`header:${path}`);
    return;
  }
  if (path === "reports/tr29-47.html") {
    const semanticHeader = text
      .slice(0, 32_768)
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, " ")
      .replace(/<[^>]+>/gu, " ")
      .replaceAll("&nbsp;", " ")
      .replaceAll("&#160;", " ")
      .replaceAll("&amp;", "&")
      .replace(/\s+/gu, " ")
      .trim();
    if (!semanticHeader.includes("Unicode® Standard Annex #29")
        || !semanticHeader.includes("Unicode Text Segmentation")
        || !/Version\s+Unicode 17\.0\.0/u.test(semanticHeader)
        || !/Revision\s+47/u.test(semanticHeader)) {
      fail(`header:${path}:${sha256Bytes(Buffer.from(text, "utf8"))}:${JSON.stringify(semanticHeader.slice(0, 1024))}`);
    }
    return;
  }
  if (path === "license.txt") {
    if (!text.startsWith("UNICODE LICENSE V3")
        || !text.includes("COPYRIGHT AND PERMISSION NOTICE")
        || !text.includes("Copyright © 1991-2026 Unicode, Inc.")) fail(`header:${path}`);
    return;
  }
  if (path === "emoji/emoji-data.txt") {
    const header = text.slice(0, 4096);
    if (!header.includes("emoji-data.txt")
        || !header.includes("Emoji Data for UTS #51")
        || !header.includes("Version: 17.0")) fail(`header:${path}`);
    return;
  }
  const basename = path.split("/").at(-1).replace(".txt", "");
  if (!text.slice(0, 4096).includes(basename) || !text.slice(0, 4096).includes("17.0.0")) fail(`header:${path}`);
}

function fetchExact(url, budget) {
  return new Promise((resolvePromise, rejectPromise) => {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== EXACT_HOST || parsed.username || parsed.password || parsed.search || parsed.hash) {
      rejectPromise(new Error(`unicode_source_acquisition_failed:url:${url}`));
      return;
    }
    const req = request({
      protocol: "https:",
      hostname: EXACT_HOST,
      port: 443,
      method: "GET",
      path: parsed.pathname,
      agent: false,
      headers: {
        accept: "text/plain,text/html;q=0.9,*/*;q=0.1",
        "accept-encoding": "identity",
        "user-agent": "contentmd-unicode-17-source-acquisition/0.1.0",
      },
    }, (response) => {
      if (response.statusCode !== 200 || response.headers.location) {
        response.resume();
        rejectPromise(new Error(`unicode_source_acquisition_failed:http:${url}:${response.statusCode ?? "none"}`));
        return;
      }
      const chunks = [];
      response.on("data", (chunk) => {
        budget.total += chunk.length;
        if (budget.total > TOTAL_BYTE_CAP) {
          req.destroy(new Error("unicode_source_acquisition_failed:total_byte_cap"));
          return;
        }
        chunks.push(chunk);
      });
      response.on("end", () => resolvePromise(Buffer.concat(chunks)));
      response.on("error", rejectPromise);
    });
    req.setTimeout(RESPONSE_TIMEOUT_MS, () => req.destroy(new Error(`unicode_source_acquisition_failed:timeout:${url}`)));
    req.on("error", rejectPromise);
    req.end();
  });
}

async function acquireEntry(entry, stageRoot, budget) {
  const first = await fetchExact(entry.public_url, budget);
  const second = await fetchExact(entry.public_url, budget);
  if (first.byteLength === 0 || !first.equals(second)) fail(`double_fetch_mismatch:${entry.path}`);
  const text = decodeUtf8(first, entry.path);
  validateHeader(entry.path, text);
  const firstPath = resolve(stageRoot, "first", entry.path);
  const secondPath = resolve(stageRoot, "second", entry.path);
  await mkdir(dirname(firstPath), { recursive: true });
  await mkdir(dirname(secondPath), { recursive: true });
  await writeFile(firstPath, first, { flag: "wx" });
  await writeFile(secondPath, second, { flag: "wx" });
  const raw_bytes_digest = sha256Bytes(first);
  return {
    source_lock: {
      path: entry.path,
      public_url: entry.public_url,
      raw_bytes_digest,
      byte_count: first.byteLength,
    },
    receipt: {
      path: entry.path,
      public_url: entry.public_url,
      first_fetch: { byte_count: first.byteLength, raw_bytes_digest },
      second_fetch: { byte_count: second.byteLength, raw_bytes_digest: sha256Bytes(second) },
    },
    firstPath,
  };
}

async function publish(stageRoot, acquired, lockBytes, receiptBytes) {
  const publishSuffix = `.tmp-${process.pid}`;
  const temporarySource = `${SOURCE_TARGET}${publishSuffix}`;
  const temporaryLock = `${LOCK_TARGET}${publishSuffix}`;
  const temporaryReceipt = `${RECEIPT_TARGET}${publishSuffix}`;
  let sourcePublished = false;
  let lockPublished = false;
  let receiptPublished = false;
  await mkdir(OUTPUT_ROOT, { recursive: true });
  try {
    await mkdir(temporarySource, { recursive: false });
    for (const entry of acquired) {
      const destination = resolve(temporarySource, entry.source_lock.path);
      await mkdir(dirname(destination), { recursive: true });
      await cp(entry.firstPath, destination, { force: false, errorOnExist: true });
    }
    await writeFile(temporaryLock, lockBytes, { encoding: "utf8", flag: "wx" });
    await writeFile(temporaryReceipt, receiptBytes, { encoding: "utf8", flag: "wx" });
    await rename(temporarySource, SOURCE_TARGET);
    sourcePublished = true;
    await rename(temporaryLock, LOCK_TARGET);
    lockPublished = true;
    await rename(temporaryReceipt, RECEIPT_TARGET);
    receiptPublished = true;
  } catch (error) {
    if (receiptPublished) await unlink(RECEIPT_TARGET).catch(() => undefined);
    if (lockPublished) await unlink(LOCK_TARGET).catch(() => undefined);
    if (sourcePublished) await rm(SOURCE_TARGET, { recursive: true, force: true }).catch(() => undefined);
    await rm(temporarySource, { recursive: true, force: true }).catch(() => undefined);
    await unlink(temporaryLock).catch(() => undefined);
    await unlink(temporaryReceipt).catch(() => undefined);
    throw error;
  } finally {
    await rm(stageRoot, { recursive: true, force: true }).catch(() => undefined);
  }
}

async function main(args) {
  if (args.length !== 0) fail("arguments");
  if (await exists(SOURCE_TARGET) || await exists(LOCK_TARGET) || await exists(RECEIPT_TARGET)) fail("target_exists");

  const stageRoot = await mkdtemp(join(tmpdir(), "contentmd-unicode17-"));
  const budget = { total: 0 };
  try {
    const acquiredSources = [];
    for (const requestEntry of SOURCE_REQUESTS) acquiredSources.push(await acquireEntry(requestEntry, stageRoot, budget));
    const acquiredLicense = await acquireEntry(LICENSE_REQUEST, stageRoot, budget);
    const machines = buildBoundaryMachines();
    const artifact_inputs = ARTIFACT_INPUTS.map((entry) => ({
      ...entry,
      expected_rules_digest: entry.artifact_id === "unicode-word-break"
        ? machines.word.machine_digest
        : entry.artifact_id === "unicode-grapheme-break"
          ? machines.grapheme.machine_digest
          : null,
    }));
    const sourceLock = {
      contract_version: "contentmd.unicode-source-lock/0.1.0",
      unicode_version: "17.0.0",
      license: acquiredLicense.source_lock,
      sources: acquiredSources.map((entry) => entry.source_lock),
      artifact_inputs,
    };
    const lockBytes = canonicalJson(sourceLock);
    const scriptBytes = await readFile(fileURLToPath(import.meta.url));
    const receiptPreimage = {
      contract_version: "contentmd.unicode-acquisition-receipt/0.1.0",
      unicode_version: "17.0.0",
      exact_host: EXACT_HOST,
      acquisition_script: { path: SCRIPT_PATH, raw_bytes_digest: sha256Bytes(scriptBytes) },
      entries: [...acquiredSources.map((entry) => entry.receipt), acquiredLicense.receipt],
      source_lock_raw_bytes_digest: sha256Bytes(Buffer.from(lockBytes, "utf8")),
      acquired_at: new Date().toISOString(),
      status: "development_fixture_verified",
      authority_effect: "none",
    };
    const receiptBytes = canonicalJson({ ...receiptPreimage, receipt_digest: sha256Canonical(receiptPreimage) });
    await publish(stageRoot, [...acquiredSources, acquiredLicense], lockBytes, receiptBytes);
  } catch (error) {
    await rm(stageRoot, { recursive: true, force: true }).catch(() => undefined);
    throw error;
  }
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  main(process.argv.slice(2)).catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
