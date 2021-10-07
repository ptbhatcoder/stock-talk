import React, { useCallback, useState } from "react";
import { SearchResult, useStockAPIManager } from "../../api-manager";
import { useDebounce } from "../../common/hooks/useDebounce";
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
      stockAPIManager?.fetchSearchResults(query)?.then(setSearchResults);
    },
    300,
    [query, stockAPIManager]
  );

  return (
    <div className="searchScreen">
      <input
        type="text"
        className="searchBar"
        placeholder="Search for a stock here"
        value={query}
        onChange={onQueryChange}
      />
      <StockSearchResults results={searchResults} />
    </div>
  );
};
