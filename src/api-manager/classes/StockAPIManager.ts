import { APIManager } from "../schema/APIManager.type";

export class StockAPIManager {
  private static currentApiManager: APIManager | null = null;
  static set apiManager(manager: APIManager | null) {
    this.currentApiManager = manager;
  }

  static get apiManager(): APIManager | null {
    return this.currentApiManager;
  }
}
