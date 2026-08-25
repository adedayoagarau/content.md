#!/usr/bin/env node
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import {
  derivePublicEvidenceSubjectRef,
  verifyPublicEvidenceDispositionLedger,
} from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input } from "./verify-public-product-corpus.mjs";

function scalar(left, right) {
  const leftPoints = [...left].map((character) => character.codePointAt(0));
  const rightPoints = [...right].map((character) => character.codePointAt(0));
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] - rightPoints[index];
  }
  return leftPoints.length - rightPoints.length;
}

export async function verifyPublicProductEvidenceDispositionsFromDisk(options) {
  const input = await readPublicProductCorpusV2Input(options);
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const subjects = [];
  for (const batch of input.batches) {
    for (const [kind, lines, idKey] of [["source", batch.source_lines, "source_id"], ["observation", batch.observation_lines, "observation_id"]]) {
      for (const exactLineBytes of lines) {
        const record = JSON.parse(decoder.decode(exactLineBytes));
        subjects.push(derivePublicEvidenceSubjectRef({ batch_id: batch.batch_id, record_kind: kind, record_id: record[idKey], exact_line_bytes: exactLineBytes }));
      }
    }
  }
  subjects.sort((left, right) => scalar(
    `${left.batch_id}\0${left.record_kind}\0${left.record_id}\0${left.record_digest}`,
    `${right.batch_id}\0${right.record_kind}\0${right.record_id}\0${right.record_digest}`,
  ));
  return verifyPublicEvidenceDispositionLedger({ known_subjects: subjects, sets: input.disposition_sets, events_in_append_order: input.disposition_events, governance: input.review_governance, as_of: input.as_of, verification_mode: input.verification_mode });
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const rootIndex = process.argv.indexOf("--root");
  const asOfIndex = process.argv.indexOf("--as-of");
  try {
    if (asOfIndex < 0) throw new Error("--as-of is required");
    const result = await verifyPublicProductEvidenceDispositionsFromDisk({ root: rootIndex < 0 ? "research/09-experimental/public-product-corpus" : process.argv[rootIndex + 1], asOf: process.argv[asOfIndex + 1] });
    process.stdout.write(`${JSON.stringify(result.head, null, 2)}\n`);
  } catch (error) { process.stderr.write(`${error.stack ?? error.message}\n`); process.exitCode = 1; }
}
