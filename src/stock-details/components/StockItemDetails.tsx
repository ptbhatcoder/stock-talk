import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StockAPIManager } from "../../api-manager";
import "./StockItemDetails.css";

export const StockItemDetails: React.FC = () => {
  const { stock } = useParams<{ stock: string }>();
  const [details, setDetails] = useState<string>("");
  useEffect(() => {
    console.log(stock);
    StockAPIManager.apiManager
      ?.fetchDetailsForStock(stock)
      ?.then((details) => details && setDetails(JSON.stringify(details)));
  }, [stock]);
  return <div className="details">{details}</div>;
};
