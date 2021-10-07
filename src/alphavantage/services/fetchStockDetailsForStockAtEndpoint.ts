import { StockDetails } from "../../api-manager";

export const fetchStockDetailsForStockAtEndpoint = async (
  stock: string,
  endPoint: string,
  apiKey: string
): Promise<StockDetails | null> => {
  const url = `${endPoint}?function=OVERVIEW&symbol=${stock}&apikey=${apiKey}`;
  let results = null;
  try {
    const response = await fetch(url);
    results = await response.json();
  } catch (error) {
    results = null;
  }

  return results;
};
