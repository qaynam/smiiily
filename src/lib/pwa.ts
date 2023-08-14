export function initPWA({
  onBeforeInstallPrompt,
  onAppInstalled,
  onWindowLoad
}: {
  onBeforeInstallPrompt: (e: any) => void;
  onAppInstalled: (e: Event) => void;
  onWindowLoad: (e: Event) => void;
}): () => void {
  let unsubscribe: () => void = () => void 0;
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", onWindowLoad);
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    unsubscribe = () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
      window.removeEventListener("load", onWindowLoad);
    };
  }

  return unsubscribe;
}
