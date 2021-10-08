import React from "react";
import { StockSearchResultsProps } from "../schema/StockSearchResults.types";
import { StockSearchResult } from "./StockSearchResult";
import "./StockSearchResults.css";

export const StockSearchResults: React.FC<StockSearchResultsProps> = ({
  results,
  showError,
}) => {
  const className = results.length ? "searchResults" : "searchResults noItem";

  const url = showError
    ? "https://lh3.googleusercontent.com/proxy/lqnMFI8rIp-1MrFdUbctIaCWDBDkWnalZnYGWSVMAMXKSHyMVdOD1_QSulzLH3cWfzBjCkucDNn7nGmsLhQBZAGJ1Ts"
    : "https://img.freepik.com/free-vector/organic-flat-web-search-illustration_52683-60699.jpg?size=338&ext=jpg";
  return (
    <div className={className}>
      {results.length ? (
        results.map((result, i) => (
          <StockSearchResult stockPreview={result} key={`searchResult_${i}`} />
        ))
      ) : (
        <img src={url} alt="no-items-found" className={"noItemImg"} />
      )}
    </div>
  );
};
