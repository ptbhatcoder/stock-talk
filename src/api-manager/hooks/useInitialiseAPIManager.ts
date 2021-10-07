import { useEffect, useRef } from "react";
import { StockAPIManager } from "../classes/StockAPIManager";
import { APIManager } from "../schema/APIManager.type";

export const useInitialiseAPIManager = (apiManager: APIManager) => {
  const apiManagerRef = useRef<APIManager>(apiManager);
  useEffect(() => {
    StockAPIManager.apiManager = apiManagerRef.current;
    return () => {
      StockAPIManager.apiManager = null;
    };
  }, []);
};
