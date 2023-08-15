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

export async function domToBlob(dom: Element) {
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

export function downloadFromBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Smiiily_" + window.crypto.randomUUID() + ".png";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function isIOS() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) || isSafari();
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
