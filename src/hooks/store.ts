import { writable } from 'svelte/store';

export function reducible(state: any, reducer: any) {
  const { update, subscribe } = writable(state);

  function dispatch(action: any) {
    update((state) => reducer(state, action));
  }

  return [{ subscribe }, dispatch];
}
