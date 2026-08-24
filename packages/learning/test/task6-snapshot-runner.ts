import { canonicalJson, decodeCanonicalDag, encodeCanonicalDag } from "@contentmd/core";
import {
  createEvaluationSimulatorVault,
  exportEvaluationSimulatorSnapshot,
  restoreEvaluationSimulatorVault,
  verifySealedTestReplay,
} from "../src/index.js";
import { task6PassingSealedReplayFixture } from "./task6-fixtures.js";

const source = task6PassingSealedReplayFixture();
const replay = decodeCanonicalDag(encodeCanonicalDag(source.replay)) as typeof source.replay;
const vault = createEvaluationSimulatorVault({
  record_mode: "development_fixture",
  vault_id: "vault.task6.transfer-complete-replay",
  fault_rules: [],
});
const sealed = verifySealedTestReplay(vault, {
  record_mode: "development_fixture",
  replay,
});
const snapshot = exportEvaluationSimulatorSnapshot(vault);
const successor = restoreEvaluationSimulatorVault({
  record_mode: "development_fixture",
  snapshot,
  fault_rules: [],
});
const reauthenticated = verifySealedTestReplay(successor, {
  record_mode: "development_fixture",
  replay,
});
const successorSnapshot = exportEvaluationSimulatorSnapshot(successor);

process.stdout.write(canonicalJson({
  contract_version: "contentmd.task6-snapshot-acceptance/0.1.0",
  authority_effect: "none",
  state_encoding: snapshot.state_encoding,
  state_byte_count: snapshot.state_byte_count,
  first_transfer_generation: snapshot.transfer_generation,
  successor_transfer_generation: successorSnapshot.transfer_generation,
  root_lineage_preserved: successor.root_lineage_id === vault.root_lineage_id,
  handle_reauthenticated: canonicalJson(reauthenticated) === canonicalJson(sealed),
  snapshot_digest: snapshot.snapshot_digest,
  successor_snapshot_digest: successorSnapshot.snapshot_digest,
}));
