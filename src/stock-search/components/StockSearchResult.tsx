import React, { useCallback } from "react";
import { useOpenDetails } from "../../common/hooks/useOpenDetails";
import { StockSearchResultProps } from "../schema/StockSearchResult.types";
import "./StockSearchResult.css";

export const StockSearchResult: React.FC<StockSearchResultProps> = ({
  stockPreview: { name, symbol },
}) => {
  const openDetails = useOpenDetails();
  const onClick = useCallback(() => {
    openDetails(symbol);
  }, [openDetails, symbol]);
  return (
    <div
      className="searchResult"
      onClick={onClick}
    >{`${symbol} ( ${name} )`}</div>
  );
};
