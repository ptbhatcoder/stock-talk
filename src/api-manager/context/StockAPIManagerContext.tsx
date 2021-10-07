import React, { useContext } from "react";
import { APIManager } from "../schema/APIManager.type";

export const StockAPIManagerContext = React.createContext<APIManager | null>(
  null
);

export const useStockAPIManager = () => useContext(StockAPIManagerContext);
