import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  defaultStockDetails,
  StockDetails,
  useStockAPIManager,
} from "../../api-manager";
import { StockDayChart } from "./StockDayChart";
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
  const {
    Name,
    Symbol,
    Exchange,
    Description,
    Industry,
    MarketCapitalization,
    PERatio,
    DividendYield,
    Country,
    Currency,
  } = details;
  return (
    <div className="details">
      <div className="nameAndSymbol">
        <div className="name">
          {Name}
          <span className="industry">{`(${Industry})`}</span>
        </div>
        <div className="symbol">{`${Exchange}: ${Symbol}`}</div>
      </div>
      <div>
        <StockDayChart symbol={stock} />
      </div>
      <div className="vitals">
        <div className="vitalRow">
          <div className="vitalCell">
            {`Market-Cap: ${MarketCapitalization} ${Currency}`}
          </div>
          <div className="vitalCell">{`PE-Ratio: ${PERatio}`}</div>
        </div>
        <div className="vitalRow">
          <div className="vitalCell">
            {`Div-Yield: ${DividendYield} ${Currency}`}
          </div>
          <div className="vitalCell">{`Country: ${Country}`}</div>
        </div>
      </div>
      <p className="description">{Description}</p>
    </div>
  );
};
