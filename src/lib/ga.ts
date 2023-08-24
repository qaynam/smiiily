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
  IMAGE_SELECTED = "_image_selected",
  IMAGE_ROTATE = "_image_rotate"
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
      this.loadTagManager();
      this.initFn();
    }
  }

  private loadTagManager() {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_TRACKING_ID}`;
    script.async = true;
    document.body.appendChild(script);
    this.scriptAppended = true;
  }

  private initFn() {
    const script = document.createElement("script");
    script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${PUBLIC_GA_TRACKING_ID}');
    `;
    document.body.appendChild(script);
  }

  public sendEvent(action: GAActions, ...args: string[]) {
    window.dataLayer.push("event", action, ...args);
  }
}

const ga = GA.getInstance();

export { ga as GA };
