import React, { useEffect, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { StockTimePoint, useStockAPIManager } from "../../api-manager";

export const StockDayChart: React.FC<{ symbol: string }> = ({ symbol }) => {
  const [stockData, setStockData] = useState<any[]>([]);

  const stockAPIManager = useStockAPIManager();
  useEffect(() => {
    const fetchStockTimeSeries = async () => {
      const result = await stockAPIManager?.fetchStockTimeSeries(symbol);
      if (result) {
        setStockData(formatStockData(result["Time Series (1min)"]));
      }
    };
    fetchStockTimeSeries();
  }, [stockAPIManager, symbol]);
  return (
    <CanvasJSChart
      options={{
        data: [
          {
            type: "candlesticks",
            dataPoints: stockData.map(
              ({ date, open, high, low, close }: any) => ({
                x: new Date(date),
                y: [open, high, low, close],
              })
            ),
          },
        ],
      }}
    />
  );
};

function formatStockData(stockData: Record<string, StockTimePoint>) {
  // Convert stockData from an object to an array
  return Object.entries(stockData).map(
    ([date, priceData]: [string, StockTimePoint]) => {
      return {
        date,
        open: Number((priceData as any).open),
        high: Number((priceData as any)["2. high"]),
        low: Number((priceData as any)["3. low"]),
        close: Number((priceData as any)["4. close"]),
      };
    }
  );
}
