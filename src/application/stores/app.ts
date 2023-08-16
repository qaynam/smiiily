import { writable } from "svelte/store";
import type { IAppStore } from "../models/appStore";
import { domToBlob } from "~/lib/common";

let prevStore: IAppStore = {
  padding: "medium",
  roundness: "medium",
  gradient: "cyan-to-indigo-vertical-gradient",
  dropShadow: "medium",
  domImageGenerating: false,
  selectedImage: null,
  mainBlockRef: null,
  mainBlockDomImage: null
};

class LazyUpdate {
  private timer: NodeJS.Timeout | null = null;
  async add(callback: () => Promise<void>) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      callback().then(() => {
        this.timer = null;
      });
    }, 1000);
  }
}
const lazyUpdate = new LazyUpdate();

const state = writable<IAppStore>(prevStore);

export const appStore = {
  ...state,
  get: <K extends keyof IAppStore>(key: K): IAppStore[K] | null => {
    let value: IAppStore[K] | null = null;
    appStore.subscribe((store) => (value = store[key]))();
    return value;
  },
  updateBlob: async () => {
    const store = appStore.get("mainBlockRef");
    if (store) {
      const blob = await domToBlob(store);
      appStore.update((store) => {
        return {
          ...store,
          mainBlockDomImage: blob,
          domImageGenerating: false
        };
      });
    }
  }
};

appStore.subscribe(async (store) => {
  if (
    store.mainBlockRef &&
    store.selectedImage &&
    (prevStore.padding !== store.padding ||
      prevStore.roundness !== store.roundness ||
      prevStore.gradient !== store.gradient ||
      prevStore.dropShadow !== store.dropShadow ||
      prevStore.selectedImage !== store.selectedImage)
  ) {
    const ref = store.mainBlockRef;
    lazyUpdate.add(appStore.updateBlob);
    appStore.update((store) => {
      store.domImageGenerating = !!store.mainBlockDomImage;
      store.mainBlockRef = ref;
      return store;
    });
  }
  prevStore = {
    ...store
  };
});

export type IAppStoreData = typeof appStore;
