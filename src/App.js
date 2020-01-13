import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

// import guards
import IntroGuard from "./auth/introduction/introGuard";

// import routes
import { introRouteArr } from "./auth/introduction/introRoute";

function App() {
  let IntroRoutes = introRouteArr.map((route, index) => (
    <IntroGuard key={index} path={route.path} component={route.main} />
  ));

  return (
    <>
      <BrowserRouter>
        <Switch>
          {IntroRoutes}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
