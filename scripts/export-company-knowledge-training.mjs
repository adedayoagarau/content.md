import fs from "node:fs";
import path from "node:path";
import { companyKnowledgeTrainingExamples } from "../packages/research/dist/index.js";

const root = process.argv[2] ?? "research/09-experimental/company-knowledge-corpus/packets";
const files = fs.existsSync(root) ? fs.readdirSync(root).filter((name) => name.endsWith(".json")).sort() : [];
const output = [];
for (const file of files) {
  const packet = JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  output.push(...companyKnowledgeTrainingExamples(packet));
}
process.stdout.write(output.map((row) => JSON.stringify(row)).join("\n") + (output.length ? "\n" : ""));
