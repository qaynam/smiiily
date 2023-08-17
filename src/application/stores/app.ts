import { derived, get, writable, type Writable } from "svelte/store";
import { domToBlob } from "~/lib/common";
import type { IAppStore } from "../models/appStore";

const prevStore: IAppStore = {
  padding: "medium",
  roundness: "medium",
  gradient: "cyan-to-indigo-vertical-gradient",
  dropShadow: "medium",
  selectedImage: null,
  mainBlockRef: null
};

const state = writable<IAppStore>(prevStore);

export const appStore = {
  ...state,
  get: (key: keyof IAppStore) => {
    return get(state)[key];
  }
};

interface IAppStoreDomImage {
  blob: Blob | null;
  processing: boolean;
}

export const domImage = derived<Writable<IAppStore>, IAppStoreDomImage>(
  state,
  ($appStore, set, update) => {
    let timer: NodeJS.Timeout | null = null;
    const ref = $appStore.mainBlockRef;
    const selectedImage = $appStore.selectedImage;
    const shouldGenerateImage = ref && selectedImage;

    if (!selectedImage) {
      set({
        blob: null,
        processing: false
      });

      return () => void 0;
    }

    if (shouldGenerateImage) {
      update((store) => {
        store.processing = true;
        return store;
      });

      timer = setTimeout(async () => {
        const blob = await domToBlob(ref);
        set({
          blob,
          processing: false
        });
      }, 1000);

      return () => {
        timer && clearTimeout(timer);
      };
    }
  },
  {
    blob: null,
    processing: false
  }
);

export type IAppStoreData = typeof appStore;
