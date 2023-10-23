
import { writable } from 'svelte/store';
import type { IrisItem } from './IrisItem';

const _dataStore = () => {
  const { set, update, subscribe } = writable([{}])

  return {
    subscribe,
    set: (data: Array<IrisItem>) => set(data),
    update: (item: IrisItem) => update((currentState: any) => {
      currentState.csvData.push(item)
      return { ...currentState }
    })
  }
}

export const dataStore = _dataStore();