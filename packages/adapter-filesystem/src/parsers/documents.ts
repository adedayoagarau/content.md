import { parseDocument } from "yaml";
import type { RepositoryClaimDraft } from "@contentmd/adapter-sdk";
import type { ArtifactParser, ParserResult } from "./types.js";

interface MarkdownSection {
  heading: string;
  heading_line: number;
  content_lines: Array<{ line: number; value: string }>;
}

function sections(source: string): MarkdownSection[] {
  const result: MarkdownSection[] = [];
  let current: MarkdownSection | null = null;
  source.split(/\r?\n/u).forEach((line, index) => {
    const heading = /^##\s+(.+?)\s*$/u.exec(line)?.[1];
    if (heading !== undefined) {
      current = { heading, heading_line: index + 1, content_lines: [] };
      result.push(current);
    } else if (current !== null) {
      current.content_lines.push({ line: index + 1, value: line });
    }
  });
  return result;
}

function firstParagraph(section: MarkdownSection): { value: string; start: number; end: number } | null {
  const content = section.content_lines.filter((line) => line.value.trim().length > 0);
  const first = content[0];
  if (first === undefined) return null;
  const paragraph: typeof content = [];
  for (const line of content) {
    if (paragraph.length > 0 && line.line > (paragraph.at(-1)?.line ?? 0) + 1) break;
    paragraph.push(line);
  }
  return {
    value: paragraph.map((line) => line.value.trim()).join(" "),
    start: first.line,
    end: paragraph.at(-1)?.line ?? first.line,
  };
}

function tableRows(section: MarkdownSection): Array<{ line: number; cells: string[] }> {
  const rows = section.content_lines.flatMap((entry) => {
    const trimmed = entry.value.trim();
    if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return [];
    const cells = trimmed.slice(1, -1).split("|").map((cell) => cell.trim());
    return [{ line: entry.line, cells }];
  });
  if (rows.length < 3 || !rows[1]?.cells.every((cell) => /^:?-{3,}:?$/u.test(cell))) return [];
  return rows.slice(2).filter((row) => row.cells.some((cell) => cell.length > 0));
}

function explicitLinks(section: MarkdownSection): Array<{ label: string; target: string; line: number }> {
  return section.content_lines.flatMap((entry) =>
    [...entry.value.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/gu)].map((match) => ({
      label: match[1]?.trim() ?? "",
      target: match[2]?.trim() ?? "",
      line: entry.line,
    })).filter((link) => link.label.length > 0 && link.target.length > 0)
  );
}

function claim(
  sourceRef: string,
  claimKind: RepositoryClaimDraft["claim_kind"],
  subject: string,
  value: string | string[],
  startLine: number,
  endLine: number,
  sourceLinks: Array<{ label: string; target: string; line: number }> = [],
): RepositoryClaimDraft {
  return {
    claim_kind: claimKind,
    subject,
    value,
    source_ref: sourceRef,
    source_span: { start_line: startLine, end_line: endLine },
    source_links: sourceLinks,
    confidence: "high",
    limitations: ["structured_document_claim_requires_authority_resolution"],
    authority_effect: "none",
  };
}

function markdownClaims(source: string, sourceRef: string): RepositoryClaimDraft[] {
  const claims: RepositoryClaimDraft[] = [];
  for (const section of sections(source)) {
    const normalized = section.heading.toLowerCase();
    const rows = tableRows(section);
    const links = explicitLinks(section);
    if ((normalized === "terminology" || normalized === "terms") && rows.length > 0) {
      for (const row of rows) {
        const subject = row.cells[0] ?? "";
        const value = row.cells[1] ?? "";
        if (subject.length > 0 && value.length > 0) {
          claims.push(claim(sourceRef, "terminology_guidance", subject, value, row.line, row.line));
        }
      }
      continue;
    }
    if ((normalized === "product scope" || normalized === "scope") && links.length > 0) {
      const values = links.map((link) => link.label);
      claims.push(claim(
        sourceRef,
        "product_scope",
        section.heading,
        values.length === 1 ? values[0] ?? "" : values,
        links[0]?.line ?? section.heading_line,
        links.at(-1)?.line ?? section.heading_line,
        links,
      ));
      continue;
    }
    if ((normalized === "voice" || normalized === "voice guidance") && rows.length > 0) {
      for (const row of rows) {
        const subject = row.cells[0] ?? "";
        const value = row.cells.slice(1).filter((cell) => cell.length > 0).join(" | ");
        if (subject.length > 0 && value.length > 0) {
          claims.push(claim(sourceRef, "voice_guidance", subject, value, row.line, row.line));
        }
      }
      continue;
    }
    const paragraph = firstParagraph(section);
    if (paragraph === null) continue;
    if (normalized === "one sentence" || normalized === "product identity" || normalized === "product name") {
      claims.push(claim(sourceRef, "product_identity", section.heading, paragraph.value, paragraph.start, paragraph.end));
    } else if (
      normalized === "primary user" || normalized === "primary audience" ||
      normalized === "primary job" || normalized === "users and jobs"
    ) {
      claims.push(claim(sourceRef, "audience_job", section.heading, paragraph.value, paragraph.start, paragraph.end));
    } else if (normalized === "workflow" || normalized === "journey") {
      const stages = paragraph.value.split("→").map((stage, index, all) => {
        const normalizedStage = stage.trim();
        return index === all.length - 1 ? (normalizedStage.split(",", 1)[0] ?? "").trim() : normalizedStage;
      }).filter((stage) => stage.length > 0);
      if (stages.length > 1) {
        claims.push(claim(sourceRef, "workflow_stage", section.heading, stages, paragraph.start, paragraph.end));
      }
    } else if (normalized === "decision" || normalized === "architecture decision") {
      claims.push(claim(sourceRef, "architecture_decision", section.heading, paragraph.value, paragraph.start, paragraph.end));
    } else if (normalized === "voice" || normalized === "voice guidance") {
      claims.push(claim(sourceRef, "voice_guidance", section.heading, paragraph.value, paragraph.start, paragraph.end));
    } else if (normalized === "terminology" || normalized === "terms") {
      claims.push(claim(sourceRef, "terminology_guidance", section.heading, paragraph.value, paragraph.start, paragraph.end));
    } else if (normalized === "product scope" || normalized === "scope") {
      claims.push(claim(sourceRef, "product_scope", section.heading, paragraph.value, paragraph.start, paragraph.end));
    }
  }
  return claims;
}

function yamlClaims(source: string, sourceRef: string): RepositoryClaimDraft[] {
  const document = parseDocument(source, { uniqueKeys: true });
  if (document.errors.length > 0) {
    throw new Error(`invalid_yaml:${sourceRef}:${document.errors[0]?.message ?? "parse_error"}`);
  }
  const value = document.toJS() as unknown;
  if (value === null || typeof value !== "object" || Array.isArray(value)) return [];
  const record = value as Record<string, unknown>;
  const mappings: Array<[string, RepositoryClaimDraft["claim_kind"]]> = [
    ["product_identity", "product_identity"],
    ["audience_job", "audience_job"],
    ["workflow", "workflow_stage"],
    ["voice", "voice_guidance"],
    ["terminology", "terminology_guidance"],
  ];
  const lineCount = source.split(/\r?\n/u).length;
  return mappings.flatMap(([key, claimKind]) => {
    const item = record[key];
    if (typeof item === "string") return [claim(sourceRef, claimKind, key, item, 1, lineCount)];
    if (Array.isArray(item) && item.every((entry) => typeof entry === "string")) {
      return [claim(sourceRef, claimKind, key, item as string[], 1, lineCount)];
    }
    return [];
  });
}

export const documentArtifactParser: ArtifactParser = {
  parser_id: "parser.filesystem.documents",
  supports({ artifact }) {
    return [".md", ".mdx", ".yaml", ".yml"].includes(artifact.extension);
  },
  parse({ artifact, source }): ParserResult {
    const claims = artifact.extension === ".yaml" || artifact.extension === ".yml"
      ? yamlClaims(source, artifact.relative_path)
      : markdownClaims(source, artifact.relative_path);
    return { occurrences: [], claims, warnings: [], unsupported: [] };
  },
};
