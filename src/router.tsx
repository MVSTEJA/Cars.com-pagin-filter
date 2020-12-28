import React from "react";
import { Switch, Route } from "react-router-dom";

import Purchase from "./components/Purchase";
import NotFound from "./components/NotFound";
import MyFavorites from "./components/MyFavorites";

import { PurchaseRouteProvider } from "./context/PurchaseRouteState";

const MyOrders = () => <h1 className="text-center mb-5">My Orders</h1>;

const Sell = () => <h1 className="text-center mb-5">Sell</h1>;

const Approuter: React.FunctionComponent = () => (
  <div className="p-3 px-5 pb-100">
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
