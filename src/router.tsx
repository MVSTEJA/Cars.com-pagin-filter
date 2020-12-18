import React from "react";
import { Switch, Route } from "react-router-dom";

import Purchase from "./components/Purchase";
import NotFound from "./components/NotFound";
import MyFavorites from "./components/MyFavorites";

import { PurchaseRouteProvider } from "./context/PurchaseRouteState";

const MyOrders = () => <span>My orders</span>;

const Sell = () => <span data-testid="sell-page">Sell</span>;

const Approuter: React.FunctionComponent<any> = () => (
  <div className="p-3 px-5">
    <Switch>
      <Route path="/" exact>
        <PurchaseRouteProvider>
          <Purchase />
        </PurchaseRouteProvider>
      </Route>
      <Route path="/my-favorites" exact>
        <MyFavorites />
      </Route>
      <Route path="/my-orders" exact>
        <MyOrders />
      </Route>
      <Route path="/sell" exact>
        <Sell />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </div>
);
export default Approuter;
