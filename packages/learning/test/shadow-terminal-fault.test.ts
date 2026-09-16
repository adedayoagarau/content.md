import { describe, expect, it } from "vitest";
import {
  completeShadowSimulation,
  createEvaluationSimulatorVault,
  createShadowEvaluationPlan,
  inspectShadowSimulation,
  startShadowSimulation,
  verifySealedTestReplay,
} from "../src/index.js";
import { task6SealedReplayFixture } from "./task6-fixtures.js";

describe("Task 6 shadow terminal fault isolation", () => {
  it("fails closed when completion is claimed but terminal append crashes", () => {
    const source = task6SealedReplayFixture();
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.shadow-terminal-before-append",
      fault_rules: [{
        operation: "shadow_terminal_append",
        occurrence: 1,
        fault: "before_append",
      }],
    });
    const sealedTest = verifySealedTestReplay(vault, {
      record_mode: "development_fixture",
      replay: source.replay,
    });
    const plan = createShadowEvaluationPlan({
      record_mode: "development_fixture",
      sealed_test: sealedTest,
      start_at: "2026-08-20T19:00:00.000Z",
      earliest_end_at: "2026-09-03T19:00:00.000Z",
      proposed_end_at: "2026-09-04T19:00:00.000Z",
      input_selection_ref: sealedTest.test_population_ref,
    });
    const shadow = startShadowSimulation(vault, {
      record_mode: "development_fixture",
      plan,
      sealed_test: sealedTest,
      shadow_run_id: "shadow.run.task6.consumed-incomplete",
      actor_ref: "actor.task6.shadow-start",
    });
    const completion = {
      record_mode: "development_fixture" as const,
      vault,
      shadow,
      ended_at: "2026-09-04T19:00:00.000Z",
      actor_ref: "actor.task6.shadow-complete",
    };
    expect(() => completeShadowSimulation(completion)).toThrow(
      "task6_contract_invalid:task6_simulated_crash",
    );
    expect(inspectShadowSimulation(vault, shadow.shadow_run_id)).toMatchObject({
      state: "consumed_incomplete",
      completion_claim_event_ref: expect.any(Object),
      terminal_result_ref: null,
    });
    expect(() => completeShadowSimulation(completion)).toThrow(
      "task6_contract_invalid:task6_shadow_completion_incomplete",
    );
  }, 300_000);
});
