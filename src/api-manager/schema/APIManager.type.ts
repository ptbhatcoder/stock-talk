import { SearchResult } from "./SearchResult.type";

export interface APIManager {
  fetchSearchResults(query: string): Promise<SearchResult[]>;
}
