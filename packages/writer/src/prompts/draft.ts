import type { ModelObjectRef } from "@contentmd/model-provider-sdk";
import {
  compileVersionedPrompt,
  type CompiledPrompt,
  type PromptContextItem,
} from "../prompt-compiler.js";
import type { ContentStrategyProposal } from "../strategy.js";
import type { ContentTaskPacket } from "../task-packet.js";
import { promptTemplate } from "./common.js";

export interface CompileDraftPromptInput {
  project_id: string;
  task: ContentTaskPacket;
  strategy: ContentStrategyProposal;
  context_packet_ref: ModelObjectRef;
  retrieval_snapshot_ref: ModelObjectRef | null;
  context_items: PromptContextItem[];
}

export const DRAFT_PROMPT_TEMPLATE = promptTemplate(
  "contentmd.prompt.draft",
  "Propose evidence-grounded alternatives that preserve required facts, omit prohibited claims, name uncertainty, and remain unapplied.",
);

export function compileDraftPrompt(input: CompileDraftPromptInput): CompiledPrompt {
  return compileVersionedPrompt({
    template: DRAFT_PROMPT_TEMPLATE,
    output_schema_id: "contentmd.draft-model-output/0.1.0",
    project_id: input.project_id,
    task: input.task,
    context_packet_ref: input.context_packet_ref,
    retrieval_snapshot_ref: input.retrieval_snapshot_ref,
    context_items: input.context_items,
    payload: {
      operation: "draft",
      task: input.task,
      strategy: input.strategy,
    },
  });
}
