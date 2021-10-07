import { APIManager } from "../../api-manager";
import { fetchSearchResultsForQueryAtEndpoint } from "../services/fetchSearchResultsForQueryAtEndpoint";
import { fetchStockDetailsForStockAtEndpoint } from "../services/fetchStockDetailsForStockAtEndpoint";
import axios from "axios";
import localForage from "localforage";
import { setupCache } from "axios-cache-adapter";
import { fetchStockTimeSeriesForStockAtEndpoint } from "../services/fetchStockTimeSeriesForStockAtEndpoint";

const DEFAULT_BASE_END_POINT = "https://www.alphavantage.co/query";

export class AlphavantageAPIManager implements APIManager {
  private axiosInstance;
  constructor(
    private apiKey: string,
    baseURL: string = DEFAULT_BASE_END_POINT
  ) {
    const cache = setupCache({
      maxAge: 60 * 60 * 1000,
      store: localForage,
      exclude: { query: false },
    });
    this.axiosInstance = axios.create({
      baseURL,
      adapter: cache.adapter,
    });
  }

  async fetchSearchResults(query: string) {
    const results = await fetchSearchResultsForQueryAtEndpoint(
      query,
      this.axiosInstance,
      this.apiKey
    )!;

    return results;
  }

  async fetchDetailsForStock(stock: string) {
    const details = await fetchStockDetailsForStockAtEndpoint(
      stock,
      this.axiosInstance,
      this.apiKey
    );
    return details;
  }

  async fetchStockTimeSeries(stock: string) {
    const details = await fetchStockTimeSeriesForStockAtEndpoint(
      stock,
      this.axiosInstance,
      this.apiKey
    );
    return details;
  }
}
