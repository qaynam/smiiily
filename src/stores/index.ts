import { writable } from "svelte/store";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastOptions = {
  message: string;
  type: ToastType;
};
export type Toast = {
  [id: string]: ToastOptions;
};

const toasts: Toast = {};
const toastWritable = writable(toasts);

export const toastStore = {
  subscribe: toastWritable.subscribe,
  show: (message: string, type: ToastType, duration = 5000) => {
    toastWritable.update((toasts) => {
      const id = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
      toasts[id] = { message, type };

      setTimeout(() => {
        delete toasts[id];
        toastWritable.set(toasts);
      }, duration);

      return toasts;
    });
  }
};
