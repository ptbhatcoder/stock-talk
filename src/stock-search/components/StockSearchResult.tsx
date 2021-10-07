import React from "react";
import { StockSearchResultProps } from "../schema/StockSearchResult.types";
import "./StockSearchResult.css";

export const StockSearchResult: React.FC<StockSearchResultProps> = ({
  stockPreview: { name, symbol },
}) => {
  return <div className="searchResult">{`${symbol} ( ${name} )`}</div>;
};
