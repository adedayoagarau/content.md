#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { verifyPublicProductExperienceTaxonomy } from "../packages/research/dist/index.js";

export async function verifyPublicProductExperienceTaxonomyFromDisk({ root, asOf, verificationMode = "official" }) {
  const taxonomy = JSON.parse(await readFile(path.join(root, "experience-taxonomy.json"), "utf8"));
  const governance = JSON.parse(await readFile(path.join(root, "public-product-review-governance.json"), "utf8"));
  return verifyPublicProductExperienceTaxonomy({ taxonomy, governance, as_of: asOf, verification_mode: verificationMode });
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const rootIndex = process.argv.indexOf("--root");
  const asOfIndex = process.argv.indexOf("--as-of");
  try {
    if (asOfIndex < 0) throw new Error("--as-of is required");
    const result = await verifyPublicProductExperienceTaxonomyFromDisk({ root: rootIndex < 0 ? "research/09-experimental/public-product-corpus" : process.argv[rootIndex + 1], asOf: process.argv[asOfIndex + 1] });
    process.stdout.write(`${JSON.stringify(result.taxonomy_ref, null, 2)}\n`);
  } catch (error) { process.stderr.write(`${error.stack ?? error.message}\n`); process.exitCode = 1; }
}
