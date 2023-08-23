import { derived, writable, type Writable } from "svelte/store";
import { domToBlob } from "~/lib/core";
import type { IAppStore } from "../models/appStore";

const prevStore: IAppStore = {
  padding: "medium",
  roundness: "medium",
  gradient: "cyan-to-indigo-vertical-gradient",
  dropShadow: "medium",
  imageType: "image/png",
  rotate: {
    x: 0,
    y: 0
  },
  selectedImage: null,
  mainBlockRef: null
};

export const appStore = writable<IAppStore>(prevStore);

interface IAppStoreDomImage {
  blob: Blob | null;
  processing: boolean;
}

export const domImage = derived<Writable<IAppStore>, IAppStoreDomImage>(
  appStore,
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
          blob: typeof blob !== "string" ? blob : null,
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
