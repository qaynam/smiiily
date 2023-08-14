import domtoimage from "dom-to-image";

export async function copyBlobToClipBoard(blob: Blob, type: string) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API not available");
  }

  await navigator.clipboard.write([
    new ClipboardItem({
      [type]: blob
    })
  ]);
}

export async function domToBlob(dom: HTMLElement) {
  return await domtoimage.toBlob(dom, {
    quality: 1
  });
}

export async function copyImage(dom: HTMLElement) {
  const blob = await domToBlob(dom);
  await copyBlobToClipBoard(blob, "image/png");
}

export function downloadFromBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = Date.now() + ".png";
  anchor.click();
  URL.revokeObjectURL(url);
}
