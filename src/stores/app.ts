import { writable } from "svelte/store";

export interface AppStore {
  mainBlockRef: HTMLDivElement | null;
  mainBlockImageBlob: Blob | null;
}

export const appStore = writable<AppStore>({
  mainBlockRef: null,
  mainBlockImageBlob: null
});
