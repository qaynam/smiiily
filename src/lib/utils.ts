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
