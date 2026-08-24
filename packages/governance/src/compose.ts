import type {
  ComposedPolicy,
  ControlType,
  EgressMode,
  GovernancePolicy,
  ResourceLimits,
} from "./policy.js";

const limitKeys = [
  "calls",
  "bytes",
  "duration_ms",
  "records",
  "model_tokens",
  "browser_actions",
  "retries",
] as const satisfies readonly (keyof ResourceLimits)[];

function sortedUnique<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function intersection<T extends string>(lists: readonly (readonly T[])[]): T[] {
  if (lists.length === 0) return [];
  const first = lists[0] ?? [];
  const rest = lists.slice(1);
  return sortedUnique(first.filter((value) => rest.every((list) => list.includes(value))));
}

function zeroLimits(): ResourceLimits {
  return {
    calls: 0,
    bytes: 0,
    duration_ms: 0,
    records: 0,
    model_tokens: 0,
    browser_actions: 0,
    retries: 0,
  };
}

function minimumLimits(policies: readonly GovernancePolicy[]): ResourceLimits {
  const result = zeroLimits();
  for (const key of limitKeys) {
    result[key] = Math.min(...policies.map((policy) => policy.max_limits[key]));
  }
  return result;
}

export function composePolicies(policies: readonly GovernancePolicy[]): ComposedPolicy {
  if (policies.length === 0) {
    return {
      status: "invalid",
      reason_codes: ["policy_missing"],
      policy_refs: [],
      allowed_actions: [],
      denied_actions: [],
      review_actions: [],
      allowed_adapters: [],
      denied_adapters: [],
      permitted_data_classes: [],
      denied_data_classes: [],
      permitted_egress: [],
      max_limits: zeroLimits(),
      human_approval_actions: [],
      required_control_types: [],
    };
  }

  const reasonCodes = policies
    .filter((policy) => policy.status !== "current")
    .map((policy) => `policy_not_current:${policy.policy_id}`)
    .sort();

  return {
    status: reasonCodes.length === 0 ? "current" : "invalid",
    reason_codes: reasonCodes,
    policy_refs: policies
      .map((policy) => `${policy.policy_id}@${policy.policy_version}`)
      .sort(),
    allowed_actions: intersection(policies.map((policy) => policy.allowed_actions)),
    denied_actions: sortedUnique(policies.flatMap((policy) => policy.denied_actions)),
    review_actions: sortedUnique(policies.flatMap((policy) => policy.review_actions)),
    allowed_adapters: intersection(policies.map((policy) => policy.allowed_adapters)),
    denied_adapters: sortedUnique(policies.flatMap((policy) => policy.denied_adapters)),
    permitted_data_classes: intersection(
      policies.map((policy) => policy.permitted_data_classes),
    ),
    denied_data_classes: sortedUnique(
      policies.flatMap((policy) => policy.denied_data_classes),
    ),
    permitted_egress: intersection<EgressMode>(
      policies.map((policy) => policy.permitted_egress),
    ),
    max_limits: minimumLimits(policies),
    human_approval_actions: sortedUnique(
      policies.flatMap((policy) => policy.human_approval_actions),
    ),
    required_control_types: sortedUnique<ControlType>(
      policies.flatMap((policy) => policy.required_control_types),
    ),
  };
}

export { limitKeys };
