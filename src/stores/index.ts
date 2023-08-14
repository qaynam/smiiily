import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastOptions = {
  message: string;
  type: ToastType;
};
export type Toast = Map<string, ToastOptions>;

const toasts: Toast = new Map();
const toastWritable = writable(toasts);

export const toastStore = {
  subscribe: toastWritable.subscribe,
  show: (message: string, type: ToastType, duration: number) => {
    toastWritable.update((toasts) => {
      const id = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

      toasts.set(id, { message, type });

      setTimeout(() => {
        toasts.delete(id);
        toastWritable.set(toasts);
      }, duration);

      return toasts;
    });
  }
};
