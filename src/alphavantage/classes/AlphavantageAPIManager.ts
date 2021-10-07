import { APIManager } from "../../api-manager";
import { fetchSearchResultsForQueryAtEndpoint } from "../services/fetchSearchResultsForQueryAtEndpoint";
import { fetchStockDetailsForStockAtEndpoint } from "../services/fetchStockDetailsForStockAtEndpoint";
import axios from "axios";

const DEFAULT_BASE_END_POINT = "https://www.alphavantage.co/query";

export class AlphavantageAPIManager implements APIManager {
  private axiosInstance;
  constructor(
    private apiKey: string,
    baseURL: string = DEFAULT_BASE_END_POINT
  ) {
    this.axiosInstance = axios.create({
      baseURL,
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
}
