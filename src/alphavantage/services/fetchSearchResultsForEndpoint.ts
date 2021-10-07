import { SearchResult } from "../../api-manager";

export const fetchSearchResultsForEndpoint = async (
  query: string,
  endPoint: string,
  apiKey: string
): Promise<SearchResult[]> => {
  const url = `${endPoint}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`;
  let results = [];
  try {
    const response = await fetch(url);
    const data = await response.json();
    results = data.bestMatches ?? [];
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
