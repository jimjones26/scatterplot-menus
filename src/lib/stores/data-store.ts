
import { get, writable } from 'svelte/store';
import type { IrisItem } from './IrisItem';

let _initialStoreValue: object = {
  data: [],
  selectedX: null,
  selectedY: null
}

const _dataStore = () => {
  const { set, update, subscribe } = writable(_initialStoreValue)

  return {
    subscribe,
    updateData: (data: Array<IrisItem>) => update((currentState: object) => {
      return { ...currentState, data: data }
    }),
    updateSelectedX: (value: number) => update((currentState: object) => {
      return { ...currentState, selectedX: value }
    }),
    updateSelectedY: (value: number) => update((currentState: object) => {
      return { ...currentState, selectedY: value }
    })
  }
}

export const dataStore = _dataStore();