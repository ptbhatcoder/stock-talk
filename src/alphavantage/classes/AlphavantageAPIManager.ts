import { APIManager } from "../../api-manager";
import { fetchSearchResultsForQueryAtEndpoint } from "../services/fetchSearchResultsForQueryAtEndpoint";
import { fetchStockDetailsForStockAtEndpoint } from "../services/fetchStockDetailsForStockAtEndpoint";

const END_POINT = "https://www.alphavantage.co/query";

export class AlphavantageAPIManager implements APIManager {
  constructor(private apiKey: string, private debounceTime: number) {}

  async fetchSearchResults(query: string) {
    const results = await fetchSearchResultsForQueryAtEndpoint(
      query,
      END_POINT,
      this.apiKey
    )!;

    return results;
  }

  async fetchDetailsForStock(stock: string) {
    const details = await fetchStockDetailsForStockAtEndpoint(
      stock,
      END_POINT,
      this.apiKey
    );
    return details;
  }
}
