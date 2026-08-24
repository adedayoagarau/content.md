import type { ModelObjectRef } from "@contentmd/model-provider-sdk";
import type { ContentDraftProposal } from "../draft.js";
import {
  compileVersionedPrompt,
  type CompiledPrompt,
  type PromptContextItem,
} from "../prompt-compiler.js";
import type { ContentStrategyProposal } from "../strategy.js";
import type { ContentTaskPacket } from "../task-packet.js";
import { promptTemplate } from "./common.js";

export interface CompileRewritePromptInput {
  project_id: string;
  task: ContentTaskPacket;
  strategy: ContentStrategyProposal;
  draft: ContentDraftProposal;
  context_packet_ref: ModelObjectRef;
  retrieval_snapshot_ref: ModelObjectRef | null;
  context_items: PromptContextItem[];
}

export const REWRITE_PROMPT_TEMPLATE = promptTemplate(
  "contentmd.prompt.rewrite",
  "Propose exact reversible diffs with verification and rollback plans. Do not apply changes or request approval.",
);

export function compileRewritePrompt(input: CompileRewritePromptInput): CompiledPrompt {
  return compileVersionedPrompt({
    template: REWRITE_PROMPT_TEMPLATE,
    output_schema_id: "contentmd.rewrite-model-output/0.1.0",
    project_id: input.project_id,
    task: input.task,
    context_packet_ref: input.context_packet_ref,
    retrieval_snapshot_ref: input.retrieval_snapshot_ref,
    context_items: input.context_items,
    payload: {
      operation: "rewrite",
      task: input.task,
      strategy: input.strategy,
      draft: input.draft,
    },
  });
}
