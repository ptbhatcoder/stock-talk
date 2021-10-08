import React, { useCallback, useState } from "react";
import { SearchResult, useStockAPIManager } from "../../api-manager";
import { useDebounce } from "../../common/hooks/useDebounce";
import { useOpenDetails } from "../../common/hooks/useOpenDetails";
import { StockSearchResults } from "./StockSearchResults";
import "./StockSearchScreen.css";

export const StockSearchScreen: React.FC<{}> = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const onQueryChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(ev.target.value);
    },
    []
  );

  const stockAPIManager = useStockAPIManager();
  useDebounce(
    () => {
      stockAPIManager?.fetchSearchResults(query)?.then((results) => {
        setSearchResults(
          [...results].sort((r1, r2) => +r2.matchScore - +r1.matchScore)
        );
      });
    },
    300,
    [query, stockAPIManager]
  );

  const openDetails = useOpenDetails();

  const onSubmitClick = () => {
    const timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      if (searchResults.length) {
        openDetails(searchResults[0].symbol);
      } else {
        alert(`Invalid symbol ${query}`);
      }
    }, 0);
  };

  return (
    <div className="searchScreen">
      <h1 style={{ textAlign: "center" }}>Welcome to Stock Talk</h1>
      <div className="searchBarAndButton">
        <input
          type="text"
          className="searchBar"
          placeholder="Type a Stock Symbol (Ex: MSFT)"
          value={query}
          onChange={onQueryChange}
        />
        <button type="submit" className="searchButton" onClick={onSubmitClick}>
          <img
            src="https://www.pngfind.com/pngs/m/59-593293_search-zoom-magnifier-magnifying-glass-comments-search-icon.png"
            alt=""
          />
        </button>
      </div>

      <StockSearchResults results={searchResults} showError={!!query.length} />
    </div>
  );
};
