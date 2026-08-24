import type { ModelObjectRef } from "@contentmd/model-provider-sdk";
import {
  canonicalStringSet,
  compileVersionedPrompt,
  type CompiledPrompt,
  type PromptContextItem,
} from "../prompt-compiler.js";
import type { ContentTaskPacket } from "../task-packet.js";
import { promptTemplate } from "./common.js";

export interface CompileStrategyPromptInput {
  project_id: string;
  task: ContentTaskPacket;
  review_finding_refs: string[];
  pattern_refs: string[];
  context_packet_ref: ModelObjectRef;
  retrieval_snapshot_ref: ModelObjectRef | null;
  context_items: PromptContextItem[];
}

export const STRATEGY_PROMPT_TEMPLATE = promptTemplate(
  "contentmd.prompt.strategy",
  "Propose an evidence-grounded content strategy, message hierarchy, navigation language, claim handling, uncertainty, and tradeoffs.",
);

export function compileStrategyPrompt(input: CompileStrategyPromptInput): CompiledPrompt {
  return compileVersionedPrompt({
    template: STRATEGY_PROMPT_TEMPLATE,
    output_schema_id: "contentmd.strategy-model-output/0.1.0",
    project_id: input.project_id,
    task: input.task,
    review_finding_refs: canonicalStringSet(input.review_finding_refs, "review_finding_refs"),
    context_packet_ref: input.context_packet_ref,
    retrieval_snapshot_ref: input.retrieval_snapshot_ref,
    context_items: input.context_items,
    payload: {
      operation: "strategy",
      task: input.task,
      review_finding_refs: canonicalStringSet(input.review_finding_refs, "review_finding_refs"),
      pattern_refs: canonicalStringSet(input.pattern_refs, "pattern_refs"),
    },
  });
}
