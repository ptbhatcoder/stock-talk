import React from "react";
import { StockSearchResultProps } from "../schema/StockSearchResult.types";

export const StockSearchResult: React.FC<StockSearchResultProps> = ({
  stockPreview,
}) => {
  return (
    <li>
      <div>{JSON.stringify(stockPreview)}</div>
    </li>
  );
};
