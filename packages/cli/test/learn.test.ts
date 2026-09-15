import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { DatabaseSync } from "node:sqlite";
import { afterEach, describe, expect, it } from "vitest";
import { canonicalJson, encodeCanonicalDag, sha256Canonical, type CanonicalDag } from "@contentmd/core";
import {
  adaptContentDecisionEvent,
  buildLearningDataset,
  createSimulatedPromotionDecision,
  createEvaluationSimulatorVault,
  determineLearningEligibility,
  exportEvaluationSimulatorSnapshot,
  qualifyFeedback,
  trainPairwiseLogistic,
} from "../../learning/src/index.js";
import {
  eligibilityFixture,
  preferenceFixture,
  qualificationFixture,
} from "../../learning/test/task2-fixtures.js";
import { task5DatasetReplayFixture } from "../../learning/test/task5-fixtures.js";
import { task6PassingSealedReplayFixture } from "../../learning/test/task6-fixtures.js";
import { buildProgram } from "../src/main.js";
import {
  learningPhaseAuthorityFixture,
  learningStatusAuthorityFixture,
} from "./learning-authority-fixture.js";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const temporaryDirectories: string[] = [];
let passingSealedReplayFixture: ReturnType<typeof task6PassingSealedReplayFixture> | undefined;

function sharedPassingSealedReplayFixture() {
  passingSealedReplayFixture ??= task6PassingSealedReplayFixture();
  return passingSealedReplayFixture;
}

function readDagPath(dag: CanonicalDag, path: readonly string[]): unknown {
  const nodes = new Map(dag.nodes.map((node) => [node.node_digest, node]));
  let digest = dag.root_digest;
  for (const key of path) {
    const node = nodes.get(digest);
    if (node?.kind !== "object") throw new Error(`canonical_dag_path_not_object:${key}`);
    const entry = node.entries.find(([candidate]) => candidate === key);
    if (entry === undefined) throw new Error(`canonical_dag_path_missing:${key}`);
    digest = entry[1];
  }
  const readValue = (nodeDigest: string): unknown => {
    const node = nodes.get(nodeDigest);
    if (node === undefined) throw new Error("canonical_dag_path_missing_node");
    if (node.kind === "array") return node.items.map(readValue);
    if (node.kind === "object") {
      return Object.fromEntries(node.entries.map(([key, valueDigest]) => [key, readValue(valueDigest)]));
    }
    return node.kind === "null" ? null : node.value;
  };
  return readValue(digest);
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => (
    rm(directory, { recursive: true, force: true })
  )));
});

const EXPECTED_PHASES = [
  "examples",
  "dataset",
  "train",
  "verify-model",
  "evaluate",
  "shadow",
  "promote",
  "status",
  "drift",
  "rollback",
  "benchmark",
] as const;

async function executeStatus(root: string): Promise<{
  readonly envelope: Record<string, unknown>;
  readonly stdout: string;
}> {
  let stdout = "";
  try {
    ({ stdout } = await execute(process.execPath, [
      "--import", "tsx", cliSource,
      "learn", "status", "--root", root, "--json",
    ], { cwd: workspaceRoot, env: { ...process.env, NO_COLOR: "1" } }));
  } catch (error) {
    stdout = (error as { stdout?: string }).stdout ?? "";
  }
  let envelope: Record<string, unknown> = {};
  try { envelope = JSON.parse(stdout) as Record<string, unknown>; } catch { /* Assert below. */ }
  return { envelope, stdout };
}

async function executeLearn(root: string, phase: string, input?: string): Promise<{
  readonly envelope: Record<string, unknown>;
  readonly stdout: string;
}> {
  const args = ["--import", "tsx", cliSource, "learn", phase];
  if (input !== undefined) args.push(phase === "promote" ? "--decision" : "--input", input);
  args.push("--root", root, "--json");
  let stdout = "";
  try {
    ({ stdout } = await execute(process.execPath, args, {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
    }));
  } catch (error) {
    stdout = (error as { stdout?: string }).stdout ?? "";
  }
  let envelope: Record<string, unknown> = {};
  try { envelope = JSON.parse(stdout) as Record<string, unknown>; } catch { /* Assert below. */ }
  return { envelope, stdout };
}

function examplesInputFixture() {
  const qualification = qualificationFixture(adaptContentDecisionEvent);
  const qualified = qualifyFeedback(qualification.input);
  const eligibilityInput = eligibilityFixture(
    qualified,
    qualification.evidence,
    qualification.adapted.decision,
  );
  const eligibility = determineLearningEligibility(eligibilityInput);
  return {
    qualification_input: qualification.input,
    eligibility_input: eligibilityInput,
    preference_input: preferenceFixture(
      qualified,
      eligibility,
      eligibilityInput,
      qualification.adapted.decision,
      qualification.evidence,
    ),
  };
}

describe("governed recursive learning CLI", () => {
  it("registers the exact lifecycle commands in dependency order", () => {
    const program = buildProgram();
    const learn = program.commands.find((command) => command.name() === "learn");

    expect(learn?.commands.map((command) => command.name())).toEqual(EXPECTED_PHASES);
  });

  it("never exposes --yes or another inferred-approval option on learning commands", () => {
    const program = buildProgram();
    const learn = program.commands.find((command) => command.name() === "learn")!;

    for (const command of learn.commands) {
      expect(command.options.map((option) => option.long)).not.toContain("--yes");
      expect(command.options.map((option) => option.long)).not.toContain("--approve");
      expect(command.options.map((option) => option.long)).not.toContain("--force");
    }
  });

  it("requires an exact separate decision path for promotion", () => {
    const program = buildProgram();
    const learn = program.commands.find((command) => command.name() === "learn")!;
    const promote = learn.commands.find((command) => command.name() === "promote")!;
    const decision = promote.options.find((option) => option.long === "--decision");

    expect(decision?.required).toBe(true);
  });

  it("requires a complete replay input for the shadow phase", () => {
    const program = buildProgram();
    const learn = program.commands.find((command) => command.name() === "learn")!;
    const shadow = learn.commands.find((command) => command.name() === "shadow")!;
    const input = shadow.options.find((option) => option.long === "--input");

    expect(input?.required).toBe(true);
  });

  it("reverifies the persisted training model without selecting or activating it", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-verify-model-"));
    temporaryDirectories.push(root);
    const fixture = sharedPassingSealedReplayFixture();
    const request = fixture.replay.model_dependencies.training_request;
    const training = trainPairwiseLogistic(request);
    if (training.state !== "trained") throw new Error(`unexpected_training_state:${training.state}`);
    const artifact = encodeCanonicalDag({
      contract_version: "contentmd.local-learning-training-artifact/0.1.0" as const,
      training_replay: {
        contract_version: "contentmd.local-pairwise-training-replay/0.1.0" as const,
        record_mode: request.record_mode,
        purpose: request.purpose,
        dataset_replay: request.dataset.replay,
        feature_matrix_replay: request.feature_matrix.replay,
        code_manifest: request.code_manifest.manifest,
        runtime_profile: request.runtime_profile.profile,
      },
      training,
    });
    const artifactPath = join(root, ".contentmd/runtime/learning-training-result.dag.json");
    await mkdir(dirname(artifactPath), { recursive: true });
    await writeFile(artifactPath, canonicalJson(artifact));

    const { envelope, stdout } = await executeLearn(root, "verify-model");

    expect(envelope, stdout).toMatchObject({
      command_id: "learn.verify-model",
      status: "completed",
      record_refs: [training.model_record.record_id],
      data: {
        phase: "verify_model",
        authority_effect: "none",
        training_artifact_digest: artifact.root_digest,
        model_ref: {
          record_id: training.model_record.record_id,
          schema_id: training.model_record.schema_id,
          schema_version: training.model_record.schema_version,
          content_digest: training.model_record.content_digest,
        },
      },
    });
    expect(stdout).not.toContain("coefficient");
    expect(stdout).not.toContain("selected_expression");
  // Constructing and verifying the exhaustive deterministic fixture is
  // intentionally CPU-bound and is materially slower on shared Linux runners.
  }, 3_600_000);

  it.each(["drift", "rollback"] as const)(
    "requires a complete replay input for the %s phase",
    (phase) => {
      const program = buildProgram();
      const learn = program.commands.find((command) => command.name() === "learn")!;
      const command = learn.commands.find((candidate) => candidate.name() === phase)!;
      const input = command.options.find((option) => option.long === "--input");

      expect(input?.required).toBe(true);
    },
  );

  it("executes status only with a current single-use local authority bundle", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-status-"));
    temporaryDirectories.push(root);
    const authorityPath = join(
      root,
      ".contentmd/governance/learning-workflow-authority.json",
    );
    await mkdir(dirname(authorityPath), { recursive: true });
    await writeFile(authorityPath, `${JSON.stringify(learningStatusAuthorityFixture({
      project_id: "project.task7.cli",
      workflow_id: "learning-workflow.task7.cli",
      expected_head_digest: null,
    }), null, 2)}\n`);

    const { envelope, stdout } = await executeStatus(root);

    expect(envelope, JSON.stringify(envelope)).toMatchObject({
      command_id: "learn.status",
      status: "completed",
      audit_ref: expect.stringMatching(/^[a-f0-9]{64}$/u),
      data: {
        workflow_id: "learning-workflow.task7.cli",
        project_id: "project.task7.cli",
        completed_phases: [],
        authority_effect: "none",
      },
    });
    expect(stdout).not.toContain("expression");
  });

  it("qualifies one real preference example without exposing its expression", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-examples-"));
    temporaryDirectories.push(root);
    const input = examplesInputFixture();
    const inputPath = join(root, ".contentmd/learning/examples-input.json");
    const authorityPath = join(
      root,
      ".contentmd/governance/learning-workflow-authority.json",
    );
    await mkdir(dirname(inputPath), { recursive: true });
    await mkdir(dirname(authorityPath), { recursive: true });
    await writeFile(inputPath, `${JSON.stringify(input, null, 2)}\n`);
    await writeFile(authorityPath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: "project.task2.fixture",
      workflow_id: "learning-workflow.task7.cli-examples",
      expected_head_digest: null,
      operation_id: "operation.learning.examples",
      include_inspection: false,
    }), null, 2)}\n`);

    const { envelope, stdout } = await executeLearn(root, "examples", inputPath);

    expect(envelope).toMatchObject({
      command_id: "learn.examples",
      status: "completed",
      record_refs: [
        expect.stringMatching(/^feedback-qualification\./u),
        expect.stringMatching(/^learning-eligibility\./u),
        expect.stringMatching(/^preference-example\./u),
      ],
      audit_ref: expect.stringMatching(/^[a-f0-9]{64}$/u),
      data: {
        phase: "examples",
        authority_effect: "none",
        denominators: [
          { name: "eligible_examples", value: 1 },
          { name: "submitted_examples", value: 1 },
        ],
        exclusions: [],
      },
    });
    expect(stdout).not.toContain("Use a clear next step.");
    expect(stdout).not.toContain("selected_expression");
  }, 60_000);

  it("seals, trains, and evaluates only after each durable prerequisite", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-dataset-"));
    temporaryDirectories.push(root);
    const governancePath = join(
      root,
      ".contentmd/governance/learning-workflow-authority.json",
    );
    const examplesPath = join(root, ".contentmd/learning/examples-input.json");
    const datasetPath = join(root, ".contentmd/learning/dataset-input.json");
    await mkdir(dirname(governancePath), { recursive: true });
    await mkdir(dirname(examplesPath), { recursive: true });
    await writeFile(examplesPath, `${JSON.stringify(examplesInputFixture(), null, 2)}\n`);
    await writeFile(governancePath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: "project.task2.fixture",
      workflow_id: "learning-workflow.task7.cli-dataset",
      expected_head_digest: null,
      operation_id: "operation.learning.examples-for-dataset",
      include_inspection: false,
    }), null, 2)}\n`);
    const examples = await executeLearn(root, "examples", examplesPath);
    expect(examples.envelope).toMatchObject({ status: "completed" });
    const examplesAudit = examples.envelope.audit_ref;
    expect(examplesAudit).toEqual(expect.stringMatching(/^[a-f0-9]{64}$/u));

    const replay = task5DatasetReplayFixture();
    await writeFile(datasetPath, `${JSON.stringify({
      build_input: replay.build_input,
      seal: replay.seal,
    }, null, 2)}\n`);
    await writeFile(governancePath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: "project.task2.fixture",
      workflow_id: "learning-workflow.task7.cli-dataset",
      expected_head_digest: examplesAudit as string,
      operation_id: "operation.learning.dataset",
      include_inspection: false,
    }), null, 2)}\n`);

    const { envelope, stdout } = await executeLearn(root, "dataset", datasetPath);

    expect(envelope, JSON.stringify(envelope)).toMatchObject({
      command_id: "learn.dataset",
      status: "completed",
      record_refs: [
        expect.stringMatching(/^learning-dataset\./u),
        expect.stringMatching(/^learning-dataset\./u),
      ],
      audit_ref: expect.stringMatching(/^[a-f0-9]{64}$/u),
      data: {
        phase: "dataset",
        authority_effect: "none",
        denominators: [
          { name: "excluded_examples", value: 0 },
          { name: "included_examples", value: 120 },
          { name: "submitted_examples", value: 120 },
        ],
        exclusions: [],
      },
    });
    expect(stdout).not.toContain("selected_expression");
    expect(stdout).not.toContain("expression\":");

    const datasetAudit = envelope.audit_ref;
    expect(datasetAudit).toEqual(expect.stringMatching(/^[a-f0-9]{64}$/u));
    const trainPath = join(root, ".contentmd/learning/train-input.json");
    const evaluationSource = sharedPassingSealedReplayFixture();
    const trainingRequest = evaluationSource.replay.model_dependencies.training_request;
    await writeFile(trainPath, `${JSON.stringify({
      contract_version: "contentmd.local-pairwise-training-replay/0.1.0",
      record_mode: trainingRequest.record_mode,
      purpose: trainingRequest.purpose,
      dataset_replay: trainingRequest.dataset.replay,
      feature_matrix_replay: trainingRequest.feature_matrix.replay,
      code_manifest: trainingRequest.code_manifest.manifest,
      runtime_profile: trainingRequest.runtime_profile.profile,
    }, null, 2)}\n`);
    await writeFile(governancePath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: "project.task2.fixture",
      workflow_id: "learning-workflow.task7.cli-dataset",
      expected_head_digest: datasetAudit as string,
      operation_id: "operation.learning.train",
      include_inspection: false,
    }), null, 2)}\n`);

    const trained = await executeLearn(root, "train", trainPath);

    expect(trained.envelope, JSON.stringify(trained.envelope)).toMatchObject({
      command_id: "learn.train",
      status: "completed",
      record_refs: [
        expect.stringMatching(/^model_training_statistics\./u),
        expect.stringMatching(/^ranking_model\./u),
      ],
      audit_ref: expect.stringMatching(/^[a-f0-9]{64}$/u),
      data: {
        phase: "train",
        authority_effect: "none",
        denominators: [{ name: "training_pairs", value: 80 }],
        exclusions: [],
        training_artifact_digest: expect.stringMatching(/^[a-f0-9]{64}$/u),
        training_artifact_path: ".contentmd/runtime/learning-training-result.dag.json",
      },
    });
    expect(trained.stdout).not.toContain("selected_expression");
    expect(trained.stdout).not.toContain("expression\":");
    const trainingArtifactPath = join(
      root,
      ".contentmd/runtime/learning-training-result.dag.json",
    );
    const trainingArtifact = JSON.parse(await readFile(trainingArtifactPath, "utf8"));
    expect(readDagPath(trainingArtifact, ["contract_version"]))
      .toBe("contentmd.local-learning-training-artifact/0.1.0");
    expect(readDagPath(trainingArtifact, ["training", "state"])).toBe("trained");
    expect(readDagPath(trainingArtifact, ["training", "model_record", "record_id"]))
      .toBe(trained.envelope.record_refs?.[1]);
    expect(trainingArtifact.root_digest).toBe(
      (trained.envelope.data as { training_artifact_digest: string }).training_artifact_digest,
    );

    const trainingAudit = trained.envelope.audit_ref;
    expect(trainingAudit).toEqual(expect.stringMatching(/^[a-f0-9]{64}$/u));
    const evaluationPath = join(root, ".contentmd/learning/evaluation-input.json");
    const initialVault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task7.cli-evaluation",
      fault_rules: [],
    });
    const initialSnapshot = exportEvaluationSimulatorSnapshot(initialVault);
    await writeFile(evaluationPath, `${JSON.stringify({
      contract_version: "contentmd.local-learning-evaluation-replay/0.1.0",
      record_mode: "development_fixture",
      vault_snapshot: initialSnapshot,
      fault_rules: [],
      replay_dag: encodeCanonicalDag(evaluationSource.replay),
      attempt_id: "attempt.task7.cli-evaluation",
      opened_at: evaluationSource.openedAt,
      actor_ref: "actor.learning-status-operator",
    }, null, 2)}\n`);
    await writeFile(governancePath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: "project.task2.fixture",
      workflow_id: "learning-workflow.task7.cli-dataset",
      expected_head_digest: trainingAudit as string,
      operation_id: "operation.learning.evaluate",
      include_inspection: false,
    }), null, 2)}\n`);

    const evaluated = await executeLearn(root, "evaluate", evaluationPath);

    expect(evaluated.envelope, JSON.stringify(evaluated.envelope)).toMatchObject({
      command_id: "learn.evaluate",
      status: "completed",
      record_refs: [
        expect.stringMatching(/^sealed_test_handle\./u),
        expect.stringMatching(/^learning_evaluation\./u),
      ],
      audit_ref: expect.stringMatching(/^[a-f0-9]{64}$/u),
      data: {
        phase: "evaluate",
        authority_effect: "none",
        denominators: [
          { name: "decisive_pairs", value: 20 },
          { name: "evaluation_failures", value: 0 },
          { name: "leakage_groups", value: 5 },
        ],
        exclusions: [],
        evaluation_artifact_digest: expect.stringMatching(/^[a-f0-9]{64}$/u),
        evaluation_artifact_path: ".contentmd/runtime/learning-evaluation-result.dag.json",
        vault_snapshot_digest: expect.stringMatching(/^[a-f0-9]{64}$/u),
        vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json",
      },
    });
    const evaluationArtifact = JSON.parse(await readFile(
      join(root, ".contentmd/runtime/learning-evaluation-result.dag.json"),
      "utf8",
    )) as CanonicalDag;
    expect(readDagPath(evaluationArtifact, ["contract_version"]))
      .toBe("contentmd.local-learning-evaluation-artifact/0.1.0");
    expect(readDagPath(evaluationArtifact, ["evaluation", "evaluation_record", "payload", "evaluation_state"]))
      .toBe("passed");
    expect(readDagPath(evaluationArtifact, ["sealed_test_replay", "contract_version"]))
      .toBe("contentmd.sealed-test-replay/0.1.0");
    expect(evaluationArtifact.root_digest).toBe(
      (evaluated.envelope.data as Record<string, unknown>).evaluation_artifact_digest,
    );
    const successor = JSON.parse(await readFile(
      join(root, ".contentmd/runtime/learning-vault-snapshot.json"),
      "utf8",
    )) as Record<string, unknown>;
    expect(successor).toMatchObject({
      contract_version: "contentmd.evaluation-simulator-snapshot/0.1.0",
      transfer_generation: 2,
      snapshot_digest: (evaluated.envelope.data as Record<string, unknown>)
        .vault_snapshot_digest,
    });
    expect(evaluated.stdout).not.toContain("selected_expression");
    expect(evaluated.stdout).not.toContain("expression\":");

    const shadowStartAt = evaluationSource.replay.dataset_replay.build_input.evaluation_at;
    const shadowBuild = buildLearningDataset(
      evaluationSource.replay.dataset_replay.build_input,
    );
    const shadowPath = join(root, ".contentmd/learning/shadow-input.json");
    const shadowReplay = {
      contract_version: "contentmd.local-learning-shadow-observations/0.1.0" as const,
      observations: Array.from({ length: 2 }, (_, index) => {
        const pair = evaluationSource.shadowPairs[index % evaluationSource.shadowPairs.length]!;
        return {
          observation_id: `shadow.observation.task7.cli.${String(index).padStart(3, "0")}`,
          observed_at: shadowStartAt,
          outcome_replay: {
            dataset: {
              contract_version: "contentmd.drift-dataset-replay/0.1.0" as const,
              build_input: evaluationSource.replay.dataset_replay.build_input,
              expected_build_result: shadowBuild,
            },
            pair: {
              example_ref: pair.example_ref,
              leakage_group_ref: pair.leakage_group_ref,
              candidate_a: pair.candidate_a,
              candidate_b: pair.candidate_b,
              risk_slice_witness: pair.risk_slice_witness,
            },
          },
        };
      }),
    };
    await writeFile(shadowPath, `${JSON.stringify({
      contract_version: "contentmd.local-learning-shadow-replay/0.1.0",
      record_mode: "development_fixture",
      fault_rules: [],
      replay_dag: encodeCanonicalDag(shadowReplay),
      start_at: shadowStartAt,
      earliest_end_at: "2026-09-03T19:00:00.000Z",
      proposed_end_at: "2026-09-04T19:00:00.000Z",
      shadow_run_id: "shadow.run.task7.cli",
      actor_ref: "actor.learning-status-operator",
      ended_at: "2026-09-04T19:00:00.000Z",
    }, null, 2)}\n`);
    await writeFile(governancePath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: "project.task2.fixture",
      workflow_id: "learning-workflow.task7.cli-dataset",
      expected_head_digest: evaluated.envelope.audit_ref as string,
      operation_id: "operation.learning.shadow",
      include_inspection: false,
    }), null, 2)}\n`);

    const shadowed = await executeLearn(root, "shadow", shadowPath);

    expect(shadowed.envelope, JSON.stringify(shadowed.envelope)).toMatchObject({
      command_id: "learn.shadow",
      status: "completed",
      record_refs: [
        expect.stringMatching(/^learning_evaluation\./u),
        expect.stringMatching(/^shadow_evaluation_plan\./u),
        "shadow.run.task7.cli",
        expect.stringMatching(/^shadow_result\./u),
      ],
      findings: [{ code: "shadow_insufficient" }],
      audit_ref: expect.stringMatching(/^[a-f0-9]{64}$/u),
      data: {
        phase: "shadow",
        authority_effect: "none",
        denominators: [
          { name: "decisive_pairs", value: 2 },
          { name: "leakage_groups", value: 2 },
          { name: "observations", value: 2 },
        ],
        exclusions: [],
        shadow_artifact_digest: expect.stringMatching(/^[a-f0-9]{64}$/u),
        shadow_artifact_path: ".contentmd/runtime/learning-shadow-result.dag.json",
        vault_snapshot_digest: expect.stringMatching(/^[a-f0-9]{64}$/u),
        vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json",
      },
    });
    const shadowSuccessor = JSON.parse(await readFile(
      join(root, ".contentmd/runtime/learning-vault-snapshot.json"),
      "utf8",
    )) as Record<string, unknown>;
    expect(shadowSuccessor).toMatchObject({
      contract_version: "contentmd.evaluation-simulator-snapshot/0.1.0",
      transfer_generation: 3,
      snapshot_digest: (shadowed.envelope.data as Record<string, unknown>)
        .vault_snapshot_digest,
    });
    const shadowDag = JSON.parse(await readFile(
      join(root, ".contentmd/runtime/learning-shadow-result.dag.json"),
      "utf8",
    )) as CanonicalDag;
    expect(readDagPath(shadowDag, ["contract_version"])).toBe(
      "contentmd.local-learning-shadow-artifact/0.1.0",
    );
    expect(readDagPath(shadowDag, ["evaluation_artifact_digest"])).toBe(
      evaluationArtifact.root_digest,
    );
    expect(shadowDag.root_digest).toBe(
      (shadowed.envelope.data as Record<string, unknown>).shadow_artifact_digest,
    );

    const decisionPath = join(root, ".contentmd/learning/promotion-decision.json");
    const actorFixtureDigest = sha256Canonical({ actor: "task7-cli-governance-reviewer" });
    const decision = createSimulatedPromotionDecision({
      record_mode: "development_fixture",
      evaluation: readDagPath(evaluationArtifact, ["evaluation"]) as Parameters<
        typeof createSimulatedPromotionDecision
      >[0]["evaluation"],
      shadow_result: readDagPath(shadowDag, ["shadow", "result"]) as Parameters<
        typeof createSimulatedPromotionDecision
      >[0]["shadow_result"],
      proposed_scope: evaluationSource.replay.proposed_scope,
      actor_fixture_ref: {
        record_id: `actor_fixture.${actorFixtureDigest.slice(0, 32)}`,
        schema_id: "contentmd.simulated-actor-fixture",
        schema_version: "0.1.0",
        content_digest: actorFixtureDigest,
      },
      rationale: "The bounded shadow window is insufficient, so promotion remains rejected.",
      decision: "reject_simulation",
      expected_head_digest: null,
    });
    await writeFile(decisionPath, `${JSON.stringify({
      contract_version: "contentmd.local-learning-promotion-decision/0.1.0",
      record_mode: "development_fixture",
      fault_rules: [],
      decision,
      actor_ref: "actor.learning-status-operator",
      occurred_at: "2026-09-04T20:00:00.000Z",
    }, null, 2)}\n`);
    await writeFile(governancePath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: "project.task2.fixture",
      workflow_id: "learning-workflow.task7.cli-dataset",
      expected_head_digest: shadowed.envelope.audit_ref as string,
      operation_id: "operation.learning.promote",
      include_inspection: false,
    }), null, 2)}\n`);

    const promoted = await executeLearn(root, "promote", decisionPath);

    expect(promoted.envelope, JSON.stringify(promoted.envelope)).toMatchObject({
      command_id: "learn.promote",
      status: "completed",
      record_refs: [decision.decision_id],
      findings: [{ code: "promotion_decision_rejected" }],
      audit_ref: expect.stringMatching(/^[a-f0-9]{64}$/u),
      data: {
        phase: "promote",
        authority_effect: "none",
        denominators: [
          { name: "promotion_decisions", value: 1 },
          { name: "promotion_transitions", value: 0 },
        ],
        exclusions: ["promotion_not_applied"],
        promotion_artifact_digest: expect.stringMatching(/^[a-f0-9]{64}$/u),
        promotion_artifact_path: ".contentmd/runtime/learning-promotion-result.dag.json",
        vault_snapshot_digest: expect.stringMatching(/^[a-f0-9]{64}$/u),
        vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json",
      },
    });
    const promotionDag = JSON.parse(await readFile(
      join(root, ".contentmd/runtime/learning-promotion-result.dag.json"),
      "utf8",
    )) as CanonicalDag;
    expect(readDagPath(promotionDag, ["contract_version"])).toBe(
      "contentmd.local-learning-promotion-artifact/0.1.0",
    );
    expect(readDagPath(promotionDag, ["shadow_artifact_digest"])).toBe(shadowDag.root_digest);
    expect(readDagPath(promotionDag, ["promotion", "decision", "decision_id"])).toBe(
      decision.decision_id,
    );
    expect(readDagPath(promotionDag, ["promotion", "transition"])).toBeNull();
    expect(promotionDag.root_digest).toBe(
      (promoted.envelope.data as Record<string, unknown>).promotion_artifact_digest,
    );
    const promotionSuccessor = JSON.parse(await readFile(
      join(root, ".contentmd/runtime/learning-vault-snapshot.json"),
      "utf8",
    )) as Record<string, unknown>;
    expect(promotionSuccessor).toMatchObject({
      contract_version: "contentmd.evaluation-simulator-snapshot/0.1.0",
      transfer_generation: 4,
      snapshot_digest: (promoted.envelope.data as Record<string, unknown>)
        .vault_snapshot_digest,
    });
    expect(shadowed.stdout).not.toContain("selected_expression");
    expect(shadowed.stdout).not.toContain("expression\":");
    expect(promoted.stdout).not.toContain("selected_expression");
    expect(promoted.stdout).not.toContain("expression\":");
  }, 3_600_000);

  it("rejects a malformed evaluation DAG before opening governed runtime state", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-evaluate-invalid-"));
    temporaryDirectories.push(root);
    const inputPath = join(root, ".contentmd/learning/evaluation-input.json");
    await mkdir(dirname(inputPath), { recursive: true });
    await writeFile(inputPath, `${JSON.stringify({
      contract_version: "contentmd.local-learning-evaluation-replay/0.1.0",
      record_mode: "development_fixture",
      vault_snapshot: {},
      fault_rules: [],
      replay_dag: {
        contract_version: "contentmd.canonical-dag/0.1.0",
        root_digest: "0".repeat(64),
        nodes: [],
        manifest_digest: "0".repeat(64),
      },
      attempt_id: "attempt.task7.invalid-dag",
      opened_at: "2026-08-23T00:00:00.000Z",
      actor_ref: "actor.learning-status-operator",
    }, null, 2)}\n`);

    const { envelope } = await executeLearn(root, "evaluate", inputPath);

    expect(envelope).toMatchObject({
      command_id: "command.error",
      status: "invalid_input",
      findings: [{ code: "learning_workflow_input_invalid" }],
    });
    expect(() => new DatabaseSync(
      join(root, ".contentmd/runtime/authority.sqlite"),
      { readOnly: true },
    )).toThrow();
  });

  it("rejects a malformed shadow DAG before opening governed runtime state", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-shadow-invalid-"));
    temporaryDirectories.push(root);
    const inputPath = join(root, ".contentmd/learning/shadow-input.json");
    await mkdir(dirname(inputPath), { recursive: true });
    await writeFile(inputPath, `${JSON.stringify({
      contract_version: "contentmd.local-learning-shadow-replay/0.1.0",
      record_mode: "development_fixture",
      fault_rules: [],
      replay_dag: {
        contract_version: "contentmd.canonical-dag/0.1.0",
        root_digest: "0".repeat(64),
        nodes: [],
        manifest_digest: "0".repeat(64),
      },
      start_at: "2026-08-20T20:00:00.000Z",
      earliest_end_at: "2026-09-03T20:00:00.000Z",
      proposed_end_at: "2026-09-04T20:00:00.000Z",
      shadow_run_id: "shadow.run.task7.invalid-dag",
      actor_ref: "actor.learning-status-operator",
      ended_at: "2026-09-04T20:00:00.000Z",
    }, null, 2)}\n`);

    const { envelope } = await executeLearn(root, "shadow", inputPath);

    expect(envelope).toMatchObject({
      command_id: "command.error",
      status: "invalid_input",
      findings: [{ code: "learning_workflow_input_invalid" }],
    });
    expect(() => new DatabaseSync(
      join(root, ".contentmd/runtime/authority.sqlite"),
      { readOnly: true },
    )).toThrow();
  });

  it("rejects a malformed promotion decision before opening governed runtime state", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-promote-invalid-"));
    temporaryDirectories.push(root);
    const decisionPath = join(root, ".contentmd/learning/promotion-decision.json");
    await mkdir(dirname(decisionPath), { recursive: true });
    await writeFile(decisionPath, "{}\n");

    const { envelope } = await executeLearn(root, "promote", decisionPath);

    expect(envelope).toMatchObject({
      command_id: "command.error",
      status: "invalid_input",
      findings: [{ code: "learning_workflow_input_invalid" }],
    });
    expect(() => new DatabaseSync(
      join(root, ".contentmd/runtime/authority.sqlite"),
      { readOnly: true },
    )).toThrow();
  });

  it.each(["drift", "rollback"] as const)(
    "rejects a malformed %s replay before opening governed runtime state",
    async (phase) => {
      const root = await mkdtemp(join(tmpdir(), `contentmd-learn-${phase}-invalid-`));
      temporaryDirectories.push(root);
      const inputPath = join(root, `.contentmd/learning/${phase}-input.json`);
      await mkdir(dirname(inputPath), { recursive: true });
      await writeFile(inputPath, "{}\n");

      const { envelope } = await executeLearn(root, phase, inputPath);

      expect(envelope).toMatchObject({
        command_id: "command.error",
        status: "invalid_input",
        findings: [{ code: "learning_workflow_input_invalid" }],
      });
      expect(() => new DatabaseSync(
        join(root, ".contentmd/runtime/authority.sqlite"),
        { readOnly: true },
      )).toThrow();
    },
  );

  it("rejects rollback when the promotion artifact is not bound to the persisted shadow lineage", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-rollback-lineage-"));
    temporaryDirectories.push(root);
    const runtimeRoot = join(root, ".contentmd/runtime");
    const inputPath = join(root, ".contentmd/learning/rollback-input.json");
    await mkdir(runtimeRoot, { recursive: true });
    await mkdir(dirname(inputPath), { recursive: true });

    const evaluationDag = encodeCanonicalDag({
      contract_version: "contentmd.local-learning-evaluation-artifact/0.1.0",
      sealed_test_replay: {},
      evaluation: {},
    });
    const shadowDag = encodeCanonicalDag({
      contract_version: "contentmd.local-learning-shadow-artifact/0.1.0",
      evaluation_artifact_digest: evaluationDag.root_digest,
      shadow: {},
    });
    const promotionDag = encodeCanonicalDag({
      contract_version: "contentmd.local-learning-promotion-artifact/0.1.0",
      shadow_artifact_digest: "0".repeat(64),
      promotion: { transition: null },
    });
    await Promise.all([
      writeFile(join(runtimeRoot, "learning-evaluation-result.dag.json"), `${JSON.stringify(evaluationDag)}\n`),
      writeFile(join(runtimeRoot, "learning-shadow-result.dag.json"), `${JSON.stringify(shadowDag)}\n`),
      writeFile(join(runtimeRoot, "learning-promotion-result.dag.json"), `${JSON.stringify(promotionDag)}\n`),
      writeFile(join(runtimeRoot, "learning-vault-snapshot.json"), "{}\n"),
      writeFile(inputPath, `${JSON.stringify({
        contract_version: "contentmd.local-learning-rollback-replay/0.1.0",
        record_mode: "development_fixture",
        fault_rules: [],
        binding_stream_id: "binding.stream.task7.lineage",
        expected_head_digest: "1".repeat(64),
        requested_target_event_digest: null,
        ordered_target_replays: [],
        fallback_baseline_ref: {},
        reason_code: "operator_simulation",
        actor_ref: "actor.learning-status-operator",
        occurred_at: "2026-09-05T20:00:00.000Z",
      })}\n`),
    ]);

    const { envelope } = await executeLearn(root, "rollback", inputPath);

    expect(envelope).toMatchObject({
      command_id: "command.error",
      status: "invalid_input",
      findings: [{
        code: "learning_workflow_input_invalid",
        message: "learning_workflow_input_invalid:learning_artifact_binding",
      }],
    });
    expect(() => new DatabaseSync(
      join(root, ".contentmd/runtime/authority.sqlite"),
      { readOnly: true },
    )).toThrow();
  });

  it("denies an evaluation actor not bound to the single-use authority", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-evaluate-actor-"));
    temporaryDirectories.push(root);
    const projectId = "project.task7.actor-mismatch";
    const inputPath = join(root, ".contentmd/learning/evaluation-input.json");
    const authorityPath = join(
      root,
      ".contentmd/governance/learning-workflow-authority.json",
    );
    await mkdir(dirname(inputPath), { recursive: true });
    await mkdir(dirname(authorityPath), { recursive: true });
    await writeFile(inputPath, `${JSON.stringify({
      contract_version: "contentmd.local-learning-evaluation-replay/0.1.0",
      record_mode: "development_fixture",
      vault_snapshot: {},
      fault_rules: [],
      replay_dag: encodeCanonicalDag({ proposed_scope: { project_id: projectId } }),
      attempt_id: "attempt.task7.actor-mismatch",
      opened_at: "2026-08-23T00:00:00.000Z",
      actor_ref: "actor.not-authorized-for-evaluation",
    }, null, 2)}\n`);
    await writeFile(authorityPath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: projectId,
      workflow_id: "learning-workflow.task7.actor-mismatch",
      expected_head_digest: null,
      operation_id: "operation.learning.evaluate-actor-mismatch",
      include_inspection: false,
    }), null, 2)}\n`);

    const { envelope } = await executeLearn(root, "evaluate", inputPath);

    expect(envelope).toMatchObject({
      command_id: "command.error",
      status: "denied_by_governance",
      findings: [{
        code: "runtime_binding_not_authorized",
        message: "runtime_binding_not_authorized:learning_workflow_actor_mismatch",
      }],
    });
    const database = new DatabaseSync(
      join(root, ".contentmd/runtime/events.sqlite"),
      { readOnly: true },
    );
    try {
      expect(database.prepare("SELECT COUNT(*) AS count FROM events").get()).toMatchObject({
        count: 0,
      });
    } finally {
      database.close();
    }
  });

  it("denies a shadow actor not bound to the single-use authority before restoring the vault", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-shadow-actor-"));
    temporaryDirectories.push(root);
    const projectId = "project.task7.shadow-actor-mismatch";
    const inputPath = join(root, ".contentmd/learning/shadow-input.json");
    const authorityPath = join(
      root,
      ".contentmd/governance/learning-workflow-authority.json",
    );
    const runtimeDirectory = join(root, ".contentmd/runtime");
    await mkdir(dirname(inputPath), { recursive: true });
    await mkdir(dirname(authorityPath), { recursive: true });
    await mkdir(runtimeDirectory, { recursive: true });
    await writeFile(inputPath, `${JSON.stringify({
      contract_version: "contentmd.local-learning-shadow-replay/0.1.0",
      record_mode: "development_fixture",
      fault_rules: [],
      replay_dag: encodeCanonicalDag({
        contract_version: "contentmd.local-learning-shadow-observations/0.1.0",
        observations: [],
      }),
      start_at: "2026-08-20T20:00:00.000Z",
      earliest_end_at: "2026-09-03T20:00:00.000Z",
      proposed_end_at: "2026-09-04T20:00:00.000Z",
      shadow_run_id: "shadow.run.task7.actor-mismatch",
      actor_ref: "actor.not-authorized-for-shadow",
      ended_at: "2026-09-04T20:00:00.000Z",
    }, null, 2)}\n`);
    await writeFile(
      join(runtimeDirectory, "learning-evaluation-result.dag.json"),
      `${JSON.stringify(encodeCanonicalDag({
        contract_version: "contentmd.local-learning-evaluation-artifact/0.1.0",
        sealed_test_replay: { proposed_scope: { project_id: projectId } },
        evaluation: {},
      }), null, 2)}\n`,
    );
    await writeFile(
      join(runtimeDirectory, "learning-vault-snapshot.json"),
      "{}\n",
    );
    await writeFile(authorityPath, `${JSON.stringify(learningPhaseAuthorityFixture({
      project_id: projectId,
      workflow_id: "learning-workflow.task7.shadow-actor-mismatch",
      expected_head_digest: null,
      operation_id: "operation.learning.shadow-actor-mismatch",
      include_inspection: false,
    }), null, 2)}\n`);

    const { envelope } = await executeLearn(root, "shadow", inputPath);

    expect(envelope).toMatchObject({
      command_id: "command.error",
      status: "denied_by_governance",
      findings: [{
        code: "runtime_binding_not_authorized",
        message: "runtime_binding_not_authorized:learning_workflow_actor_mismatch",
      }],
    });
    const database = new DatabaseSync(
      join(root, ".contentmd/runtime/events.sqlite"),
      { readOnly: true },
    );
    try {
      expect(database.prepare("SELECT COUNT(*) AS count FROM events").get()).toMatchObject({
        count: 0,
      });
    } finally {
      database.close();
    }
  });

  it("denies a malformed authority-reference map before opening runtime state", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-status-invalid-"));
    temporaryDirectories.push(root);
    const authorityPath = join(
      root,
      ".contentmd/governance/learning-workflow-authority.json",
    );
    await mkdir(dirname(authorityPath), { recursive: true });
    const bundle = learningStatusAuthorityFixture({
      project_id: "project.task7.invalid",
      workflow_id: "learning-workflow.task7.invalid",
      expected_head_digest: null,
    });
    await writeFile(authorityPath, `${JSON.stringify({
      ...bundle,
      operation_authorization_refs: null,
    }, null, 2)}\n`);

    const { envelope } = await executeStatus(root);

    expect(envelope).toMatchObject({
      command_id: "command.error",
      status: "denied_by_governance",
      findings: [{ code: "runtime_binding_not_authorized" }],
    });
    expect(() => new DatabaseSync(
      join(root, ".contentmd/runtime/authority.sqlite"),
      { readOnly: true },
    )).toThrow();
  });

  it("denies replay of a consumed authority bundle without appending another workflow event", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-learn-status-replay-"));
    temporaryDirectories.push(root);
    const authorityPath = join(
      root,
      ".contentmd/governance/learning-workflow-authority.json",
    );
    await mkdir(dirname(authorityPath), { recursive: true });
    await writeFile(authorityPath, `${JSON.stringify(learningStatusAuthorityFixture({
      project_id: "project.task7.replay",
      workflow_id: "learning-workflow.task7.replay",
      expected_head_digest: null,
    }), null, 2)}\n`);

    const first = await executeStatus(root);
    const second = await executeStatus(root);
    const database = new DatabaseSync(
      join(root, ".contentmd/runtime/events.sqlite"),
      { readOnly: true },
    );
    const count = database.prepare("SELECT COUNT(*) AS count FROM events").get() as { count: number };
    database.close();

    expect(first.envelope).toMatchObject({ command_id: "learn.status", status: "completed" });
    expect(second.envelope).toMatchObject({
      command_id: "command.error",
      status: "denied_by_governance",
      findings: [{ code: "runtime_operation_nonce_replayed" }],
    });
    expect(count.count).toBe(1);
  });
});
