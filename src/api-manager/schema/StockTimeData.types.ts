export interface StockTimeMetadata {
  Information: string;
  Symbol: string;
  "Last Refreshed": string;
  Interval: string;
  "Output Size": string;
  "Time Zone": string;
}

export interface StockTimePoint {
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
}

export interface StockTimeData {
  "Meta Data": StockTimeMetadata;
  "Time Series (1min)": Record<string, StockTimePoint>;
}
