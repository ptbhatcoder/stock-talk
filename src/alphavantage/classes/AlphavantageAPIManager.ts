import { APIManager } from "../../api-manager";
import { fetchSearchResultsForEndpoint } from "../services/fetchSearchResultsForEndpoint";

const END_POINT = "https://www.alphavantage.co/query";

export class AlphavantageAPIManager implements APIManager {
  constructor(private apiKey: string, private debounceTime: number) {}

  async fetchSearchResults(query: string) {
    const results = await fetchSearchResultsForEndpoint(
      query,
      END_POINT,
      this.apiKey
    )!;

    return results;
  }
}
