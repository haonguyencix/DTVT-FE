import React from "react";
import { Switch, Route } from "react-router-dom";

import LectureHome from "modules/LectureHome/routes";
import StudentHome from "modules/StudentHome/routes";
import LectureLogin from "modules/LectureLogin/routes";
import StudentLogin from "modules/StudentLogin/routes"; // phải ở cuối

export const RenderRoutes = ({ routes }) => (
  <Switch>
    {routes.map((route) => (
      <Route
        key={route.key}
        path={route.path}
        exact={route.exact}
        render={(routeProps) => (
          <route.component {...routeProps} routes={route.routes} />
        )}
      />
    ))}
    <Route component={() => <h1>Not Found!</h1>} />
  </Switch>
);

export default [LectureHome, StudentHome, LectureLogin, StudentLogin];
