import React from "react";
import { StockSearchResultsProps } from "../schema/StockSearchResults.types";
import { StockSearchResult } from "./StockSearchResult";
import "./StockSearchResults.css";

export const StockSearchResults: React.FC<StockSearchResultsProps> = ({
  results,
}) => {
  const className = results.length
    ? ".searchResults"
    : ".searchResults .noItem";
  return (
    <div className={className}>
      {results.map((result, i) => (
        <StockSearchResult stockPreview={result} key={`searchResult_${i}`} />
      ))}
    </div>
  );
};
