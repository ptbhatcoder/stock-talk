import { AxiosInstance } from "axios";
import { SearchResult } from "../../api-manager";

export const fetchSearchResultsForQueryAtEndpoint = async (
  query: string,
  instance: AxiosInstance,
  apikey: string
): Promise<SearchResult[]> => {
  let results = [];
  try {
    const response = await instance.get("", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: query,
        apikey,
      },
    });
    const { data: { bestMatches = [] } = { bestMatches: [] } } = response;
    results = (bestMatches as any) ?? [];
  } catch (error) {
    results = [];
  }

  return results.map((item: Record<string, string>) => {
    const transformedItem: Record<string, any> = {};
    for (const key in item) {
      const actualKey = key.replace(/^(\d+\.\s)/, "");
      transformedItem[actualKey] = item[key];
    }
    return transformedItem;
  });
};

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
