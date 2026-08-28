#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { verifyCompanyKnowledgePacket } from "../packages/research/dist/index.js";

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index < 0 ? fallback : process.argv[index + 1];
}

async function readPackets(root) {
  const entries = await fs.readdir(root, { withFileTypes: true }).catch(() => []);
  const packets = [];
  for (const entry of entries.filter((item) => item.isFile() && item.name.endsWith(".json")).sort((a, b) => a.name.localeCompare(b.name))) {
    const filePath = path.join(root, entry.name);
    try {
      packets.push({ file: entry.name, packet: JSON.parse(await fs.readFile(filePath, "utf8")) });
    } catch (error) {
      packets.push({ file: entry.name, packet: null, error: error instanceof Error ? error.message : String(error) });
    }
  }
  return packets;
}

export async function verifyCompanyKnowledgeCorpus({ root, targetCompanies = 5000 }) {
  const rows = await readPackets(root);
  const errors = [];
  const companyIds = new Set();
  const productIds = new Set();
  const industries = new Set();
  let approvedTrainingPackets = 0;
  for (const row of rows) {
    if (row.packet === null || !verifyCompanyKnowledgePacket(row.packet)) {
      errors.push({ file: row.file, code: "packet_invalid", detail: row.error ?? "schema_or_digest" });
      continue;
    }
    const payload = row.packet.payload;
    if (companyIds.has(payload.company_id)) errors.push({ file: row.file, code: "duplicate_company_id", detail: payload.company_id });
    companyIds.add(payload.company_id);
    for (const product of payload.products) {
      productIds.add(`${payload.company_id}|${product.product_id}`);
      for (const industry of product.industry_ids) industries.add(industry);
    }
    if (payload.training.eligibility === "approved") approvedTrainingPackets += 1;
  }
  const summary = { packet_files: rows.length, companies: companyIds.size, products: productIds.size, industries: industries.size, approved_training_packets: approvedTrainingPackets, target_companies: targetCompanies, status: errors.length === 0 && companyIds.size >= Number(targetCompanies) ? "pass" : "incomplete" };
  return { summary, errors, authority_effect: "none", prompt_eligibility: "never", training_eligibility: "pending_review", benchmark_eligibility: false };
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = arg("--root", "research/09-experimental/company-knowledge-corpus/packets");
  const targetCompanies = Number(arg("--target-companies", "5000"));
  const result = await verifyCompanyKnowledgeCorpus({ root, targetCompanies });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.summary.status !== "pass") process.exitCode = 1;
}
