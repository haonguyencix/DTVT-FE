import React from "react";

// import libraries
import { BrowserRouter as Router, Switch } from "react-router-dom";

// import routes
import introRoutes from "./IntroRoutes";
import homeRoutes from "./HomeRoutes";

const Routes = () => {
  const routeArr = [...introRoutes, ...homeRoutes];

  return (
    <Router>
      <Switch>
        {routeArr.map((route, index) => (
          <route.guard
            exact
            key={index}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default Routes;
