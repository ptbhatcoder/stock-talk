import React, { useCallback, useState } from "react";
import { SearchResult, StockAPIManager } from "../../api-manager";
import { useDebounce } from "../../common/hooks/useDebounce";
import { StockSearchResult } from "./StockSearchResult";
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

  useDebounce(
    () => {
      StockAPIManager.apiManager
        ?.fetchSearchResults(query)
        ?.then(setSearchResults);
    },
    300,
    [query]
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
      <ol>
        {searchResults.map((result) => (
          <StockSearchResult stockPreview={result} />
        ))}
      </ol>
    </div>
  );
};
