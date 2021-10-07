import React from "react";
import { AlphavantageAPIManager } from "./alphavantage";
import { useInitialiseAPIManager } from "./api-manager";
import "./App.css";
import { StockSearchScreen } from "./stock-search";

export const ALPHAVANTAGE_API_KEY = "EO0XS78XNV3VBYNN";

const App: React.FC<{}> = function () {
  useInitialiseAPIManager(
    new AlphavantageAPIManager(ALPHAVANTAGE_API_KEY, 300)
  );
  return (
    <div className="App">
      <StockSearchScreen />
    </div>
  );
};

export default App;
