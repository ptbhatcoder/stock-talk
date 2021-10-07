import { AxiosInstance } from "axios";
import { StockTimeData } from "../../api-manager";

export const fetchStockTimeSeriesForStockAtEndpoint = async (
  symbol: string,
  instance: AxiosInstance,
  apikey: string
): Promise<StockTimeData | null> => {
  let results = null;
  try {
    const response = await instance.get("", {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol,
        apikey,
        outputsize: "full",
      },
    });
    const { data } = response;
    results = data ?? null;
  } catch (error) {
    results = null;
  }

  if (results) {
    const removePrefixNumsFromKeys = (obj: any) => {
      if (typeof obj !== "object") {
        return obj;
      }

      const transformedItem: Record<string, any> = {};
      for (const key in obj) {
        const actualKey = key.replace(/^(\d+\.\s)/, "");
        transformedItem[actualKey] = removePrefixNumsFromKeys(obj[key]);
      }

      return transformedItem;
    };

    results = removePrefixNumsFromKeys(results);
  }

  return results;
};
