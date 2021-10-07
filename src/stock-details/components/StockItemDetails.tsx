import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  defaultStockDetails,
  StockDetails,
  useStockAPIManager,
} from "../../api-manager";
import "./StockItemDetails.css";

export const StockItemDetails: React.FC = () => {
  const { stock } = useParams<{ stock: string }>();
  const [details, setDetails] = useState<StockDetails>({
    ...defaultStockDetails,
  });

  const stockAPIManager = useStockAPIManager();
  useEffect(() => {
    console.log(stock);
    stockAPIManager
      ?.fetchDetailsForStock(stock)
      ?.then((details) => details && setDetails(details));
  }, [stock, stockAPIManager]);
  return <div className="details">{JSON.stringify(details)}</div>;
};
