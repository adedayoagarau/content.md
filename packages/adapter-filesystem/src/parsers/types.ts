import type {
  ContentChannel,
  ContentModality,
  ContentSyntaxKind,
  InventoryArtifact,
  RepositoryClaimDraft,
  StackFact,
} from "@contentmd/adapter-sdk";

export interface OccurrenceDraft {
  source_artifact: string;
  line: number;
  column: number;
  end_line: number;
  end_column: number;
  syntax_kind: ContentSyntaxKind;
  expression_payload: string;
  locale: string;
  channel: ContentChannel;
  modality: ContentModality;
  component: string | null;
  route: string | null;
  semantic_context: string;
}

export interface ParserInput {
  project_root: string;
  artifact: InventoryArtifact;
  source: string;
  stack_facts: StackFact[];
}

export interface ParserResult {
  occurrences: OccurrenceDraft[];
  claims: RepositoryClaimDraft[];
  warnings: string[];
  unsupported: string[];
}

export interface ArtifactParser {
  parser_id: string;
  supports(input: ParserInput): boolean;
  parse(input: ParserInput): ParserResult;
}
