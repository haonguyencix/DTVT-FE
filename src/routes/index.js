import React from "react";
import { Switch, Route } from "react-router-dom";

// import routes
import StudentLogin from "pages/StudentLogin/routes";
import StudentHome from "pages/StudentHome/routes";
import LectureLogin from "pages/LectureLogin/routes";
import LectureHome from "pages/LectureHome/routes";
import TreeSubject from 'pages/TreeSubject/routes';

const ROUTES = [
  ...StudentLogin,
  ...StudentHome,
  ...LectureLogin,
  ...LectureHome,
  ...TreeSubject
];

export const RenderRoutes = ({ routes }) => (
  <Switch>
    {routes.map(route => (
      <Route
        exact={true}
        key={route.key}
        path={route.path}
        render={routerProps => <route.component {...routerProps} />}
      />
    ))}
    <Route component={() => <h1>Not Found!</h1>} />
  </Switch>
);

export default ROUTES;
