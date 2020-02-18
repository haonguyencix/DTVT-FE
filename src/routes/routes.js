import React from "react";
import { Switch, Route } from "react-router-dom";

import introRoutes from "./HomeRoutes";
import homeRoutes from "./IntroRoutes";
import taskRoutes from "./TaskRoutes";
import lectureRoutes from "./LectureRoutes";

const ROUTES = [...introRoutes, ...homeRoutes, ...taskRoutes, ...lectureRoutes];

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
      {routes.map(route => {
        return <RouteCustom key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export default ROUTES;
