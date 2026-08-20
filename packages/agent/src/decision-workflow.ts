import {
  createLearningCandidate,
  recordContentDecision,
  type ContentDecisionInput,
  type ContentDecisionRecord,
  type LearningCandidateInput,
  type LearningCandidateRecord,
} from "@contentmd/learning";
import type { AppendOnlyEventStore } from "@contentmd/memory";

export interface DecisionWorkflowInput {
  store: AppendOnlyEventStore;
  decision: Omit<ContentDecisionInput, "store">;
  candidate: Omit<LearningCandidateInput, "supporting_decision_refs">;
}

export interface DecisionWorkflowResult {
  decision: ContentDecisionRecord;
  candidate: LearningCandidateRecord;
}

export async function recordDecisionAndCreateCandidate(
  input: DecisionWorkflowInput,
): Promise<DecisionWorkflowResult> {
  const decision = await recordContentDecision({ ...input.decision, store: input.store });
  const candidate = createLearningCandidate({
    ...input.candidate,
    supporting_decision_refs: [decision.decision_id],
  });
  return { decision, candidate };
}
