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
        setStockData(formatStockData(result["Time Series (Daily)"]));
      }
    };
    fetchStockTimeSeries();
  }, [stockAPIManager, symbol]);
  return (
    <CanvasJSChart
      options={{
        axisY: {
          // Minimum value is 10% less than the lowest price in the dataset
          minimum: Math.min(...stockData.map((data) => data.low)) / 1.1,
          // Minimum value is 10% more than the highest price in the dataset
          maximum: Math.max(...stockData.map((data) => data.high)) * 1.1,
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
          scaleBreaks: {
            spacing: 0,
            fillOpacity: 0,
            lineThickness: 0,
            customBreaks: stockData.reduce((breaks, value, index, array) => {
              // Just return on the first iteration
              // Since there is no previous data point
              if (index === 0) return breaks;

              // Time in UNIX for current and previous data points
              const currentDataPointUnix = Number(new Date(value.date));
              const previousDataPointUnix = Number(
                new Date(array[index - 1].date)
              );

              // One day converted to milliseconds
              const oneDayInMs = 86400000;

              // Difference between the current and previous data points
              // In milliseconds
              const difference = previousDataPointUnix - currentDataPointUnix;

              return difference === oneDayInMs
                ? // Difference is 1 day, no scale break is needed
                  breaks
                : // Difference is more than 1 day, need to create
                  // A new scale break
                  [
                    ...breaks,
                    {
                      startValue: currentDataPointUnix,
                      endValue: previousDataPointUnix - oneDayInMs,
                    },
                  ];
            }, []),
          },
        },
        data: [
          {
            type: "candlestick",
            xValueFormatString: "MMM, YYYY",
            yValueFormatString: "$###.#",
            markerSize: 12,
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
  return stockData
    ? Object.entries(stockData).map(
        ([date, { open, high, low, close }]: [string, StockTimePoint]) => {
          return {
            date,
            open: +open,
            high: +high,
            low: +low,
            close: +close,
          };
        }
      )
    : [];
}
