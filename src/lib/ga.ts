import { PUBLIC_GA_TRACKING_ID } from "$env/static/public";

declare global {
  interface Window {
    _gaq: unknown[];
    dataLayer: unknown[];
  }
}

export enum GAActions {
  CLICK = "_button_click",
  IMAGE_DROP = "_image_drop",
  IMAGE_PASTE = "_image_paste",
  IMAGE_SELECTED = "_image_selected"
}

class GA {
  private static instance: GA;
  private scriptAppended: unknown;

  public static getInstance(): GA {
    if (!GA.instance) {
      GA.instance = new GA();
    }
    return GA.instance;
  }

  public async load() {
    if (!this.scriptAppended) {
      await this.loadTagManager();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push("js", new Date());
      window.dataLayer.push("config", PUBLIC_GA_TRACKING_ID);
    }
  }

  private async loadTagManager() {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_TRACKING_ID}`;
    script.async = true;
    document.body.appendChild(script);
    this.scriptAppended = true;
  }

  public sendEvent(action: GAActions, ...args: string[]) {
    window.dataLayer.push("event", action, ...args);
  }
}

const ga = GA.getInstance();

export { ga as GA };
