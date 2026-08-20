import type { Projector, StoredEvent } from "./event-store.js";

export function rebuildProjection<TState>(
  events: readonly StoredEvent[],
  projector: Projector<TState>,
): TState {
  return events.reduce(
    (state, event) => projector.apply(state, event),
    projector.initial(),
  );
}
