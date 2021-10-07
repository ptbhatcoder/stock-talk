import { AxiosInstance } from "axios";
import { StockDetails } from "../../api-manager";

export const fetchStockDetailsForStockAtEndpoint = async (
  symbol: string,
  instance: AxiosInstance,
  apikey: string
): Promise<StockDetails | null> => {
  let results = null;
  try {
    const response = await instance.get("", {
      params: {
        function: "OVERVIEW",
        symbol,
        apikey,
      },
    });
    const { data } = response;
    results = data ?? null;
  } catch (error) {
    results = null;
  }

  return results;
};
