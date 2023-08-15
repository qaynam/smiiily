import { toastStore, type ToastType } from "~/stores/toast";

export const Toast = {
  subscribe: toastStore.subscribe,
  show: (message: string, type: ToastType, duration = 5000) => {
    toastStore.update((toasts) => {
      const id = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
      toasts[id] = { message, type };

      setTimeout(() => {
        delete toasts[id];
        toastStore.set(toasts);
      }, duration);

      return toasts;
    });
  }
};
