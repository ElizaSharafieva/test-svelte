import { writable, type Writable } from 'svelte/store'

export function useStorage<T>(key: string, initialValue: T): Writable<T> {
  let serialize = JSON.stringify
  let deserialize = (value: string | null) => (value ? JSON.parse(value) : initialValue);

  let storedValue: T = deserialize(localStorage.getItem(key))

  let store = writable(storedValue ? storedValue : initialValue)
  store.subscribe((value) => localStorage.setItem(key, serialize(value)))

  return store
}
