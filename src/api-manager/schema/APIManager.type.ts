import { StockTimeData } from "..";
import { SearchResult } from "./SearchResult.type";
import { StockDetails } from "./StockDetails.type";

export interface APIManager {
  fetchSearchResults(query: string): Promise<SearchResult[]>;
  fetchDetailsForStock(stock: string): Promise<StockDetails | null>;
  fetchStockTimeSeries(stock: string): Promise<StockTimeData | null>;
}
