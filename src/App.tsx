import React from "react";
import { AlphavantageAPIManager } from "./alphavantage";
import { useInitialiseAPIManager } from "./api-manager";
import "./App.css";
import { StockSearchScreen } from "./stock-search";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StockItemDetails } from "./stock-details";

export const ALPHAVANTAGE_API_KEY = "EO0XS78XNV3VBYNN";

const AppWithRoutes: React.FC<{}> = function () {
  return (
    <>
      <StockSearchScreen />
      <Switch>
        <Route path="/details/:stock" exact>
          <StockItemDetails />
        </Route>
      </Switch>
    </>
  );
};

const App: React.FC<{}> = function () {
  useInitialiseAPIManager(
    new AlphavantageAPIManager(ALPHAVANTAGE_API_KEY, 300)
  );
  return (
    <div className="App">
      <BrowserRouter>
        <AppWithRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
