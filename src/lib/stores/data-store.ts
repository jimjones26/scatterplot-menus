import { get, writable } from 'svelte/store';
import type { IrisItem } from './IrisItem';

let _initialStoreValue: object = {
  data: [],
  selectedX: null,
  selectedY: null,
  hoveredValue: null,
}

const _dataStore = () => {
  const { set, update, subscribe } = writable(_initialStoreValue)

  return {
    subscribe,
    updateData: (data: Array<IrisItem>) => update((currentState: object) => {
      return { ...currentState, data: data }
    }),
    updateSelectedX: (value: any) => update((currentState: object) => {
      return { ...currentState, selectedX: value }
    }),
    updateSelectedY: (value: any) => update((currentState: object) => {
      return { ...currentState, selectedY: value }
    }),
    updateHoveredValue: (value: any) => update((currentState: object) => {
      return { ...currentState, hoveredValue: value }
    })
  }
}

export const dataStore = _dataStore();