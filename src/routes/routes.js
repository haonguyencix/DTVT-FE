import React from "react";
import { Switch, Route } from "react-router-dom";
import introRoutes from "./homeRoutes";
import homeRoutes from "./introRoutes";

const ROUTES = [...introRoutes, ...homeRoutes];

function RouteCustom(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => {
        return <RouteCustom key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export default ROUTES;
