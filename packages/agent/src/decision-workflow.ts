import {
  createLearningCandidate,
  recordContentDecision,
  type ContentDecisionInput,
  type ContentDecisionRecord,
  type LearningCandidateInput,
  type LearningCandidateRecord,
} from "@contentmd/learning";
import type {
  AuthorizedAppendOnlyEventStore,
  AuthorizedRuntimeOperation,
} from "@contentmd/runtime-sdk";

export interface DecisionWorkflowInput {
  store: AuthorizedAppendOnlyEventStore;
  operation: AuthorizedRuntimeOperation;
  decision: Omit<ContentDecisionInput, "store" | "operation">;
  candidate: Omit<LearningCandidateInput, "supporting_decision_refs">;
}

export interface DecisionWorkflowResult {
  decision: ContentDecisionRecord;
  candidate: LearningCandidateRecord;
}

export async function recordDecisionAndCreateCandidate(
  input: DecisionWorkflowInput,
): Promise<DecisionWorkflowResult> {
  const decision = await recordContentDecision({
    ...input.decision,
    store: input.store,
    operation: input.operation,
  });
  const candidate = createLearningCandidate({
    ...input.candidate,
    supporting_decision_refs: [decision.decision_id],
  });
  return { decision, candidate };
}
