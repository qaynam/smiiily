import { writable } from "svelte/store";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastOptions = {
  message: string;
  type: ToastType;
};
export type Toasts = {
  [id: string]: ToastOptions;
};

const toasts: Toasts = {};
export const toastStore = writable(toasts);
