import { browser } from "$app/environment";

export function camelToPascal(str: string) {
  return str.replace(/^\w/, (c) => c.toUpperCase());
}

export function isImageFile(file: File) {
  const pattern = /^image\/(png|jpeg|jpg|gif|webp)$/;
  const type = file.type;

  return pattern.test(type);
}

export function isFileSizeOver(file: File, size: number) {
  return file.size > size;
}

export function isAppleDevice() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    /iPad|iPhone|iPod|Safari|Apple|safari|apple/.test(window.navigator.userAgent) &&
    !(window as any).MSStream
  );
}

export function isSPView() {
  return browser && window.innerWidth < 768;
}
