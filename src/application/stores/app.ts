import { writable } from "svelte/store";
import type { IAppStore } from "../models/appStore";

const state = writable<IAppStore>({
  padding: "medium",
  roundness: "medium",
  gradient: "cyan-to-indigo-vertical-gradient",
  dropShadow: "medium",
  selectedImage: null,
  mainBlockRef: null,
  mainBlockDomImage: null
});

export const appStore = {
  ...state,
  get: <K extends keyof IAppStore>(key: K): IAppStore[K] | null => {
    let value: IAppStore[K] | null = null;
    appStore.subscribe((store) => (value = store[key]))();
    return value;
  }
};

export type IAppStoreData = typeof appStore;
