import test from "node:test";
import assert from "node:assert/strict";

import {
  expectedAuthoredScenarioBankFiles,
  generateAuthoredScenarioBank,
} from "./generate-authored-content-design-scenario-bank.mjs";

test("verifies the deterministic 100-scenario authored bank", async () => {
  const result = await generateAuthoredScenarioBank();
  assert.equal(result.verification_status, "passed");
  assert.equal(result.scenario_count, 100);
  assert.equal(result.generated_scenario_count, 95);
  assert.equal(result.domain_count, 19);
  assert.equal(result.surface_family_count, 10);
  assert.ok(result.state_type_count >= 60);
  assert.equal(expectedAuthoredScenarioBankFiles().size, 477);
});
