import { AppStoreRepository } from "./repositories/appStoreRepository";
import { AppService } from "./services/AppService";
import { appStore } from "./stores/app";

class App {
  private static instance: App;
  private constructor(private readonly appService: AppService) {}

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App(new AppService(new AppStoreRepository(appStore)));
    }
    return App.instance;
  }

  getAppService() {
    return this.appService;
  }
}

const app = App.getInstance();

export { app as App };
