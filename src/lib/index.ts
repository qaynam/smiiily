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
  const scale = 4;
  return await domtoimage.toBlob(dom, {
    quality: 1,
    width: dom.clientWidth * scale,
    height: dom.clientHeight * scale,
    style: {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
      width: dom.clientWidth + "px",
      height: dom.clientHeight + "px"
    }
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
