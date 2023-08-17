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
  if (!dom) {
    throw new Error("dom is null");
  }

  if (!dom.clientWidth || !dom.clientHeight) {
    throw new Error("dom.clientWidth or dom.clientHeight is null or 0");
  }

  try {
    const result = await domtoimage.toBlob(dom, {
      quality: 1,
      width: dom.clientWidth * scale,
      height: dom.clientHeight * scale,
      cacheBust: false,
      bgcolor: "transparent",
      style: {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: dom.clientWidth + "px",
        height: dom.clientHeight + "px"
      }
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("domToBlob error");
  }
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

export function camelToPascal(str: string) {
  return str.replace(/^\w/, (c) => c.toUpperCase());
}
