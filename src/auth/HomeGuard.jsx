import React from "react";
import { Route, Redirect } from "react-router-dom";

//import service
import { getLocalStorage } from "../services/common";

// import layout
import HomeLayout from "../screens/pages/Home/HomeLayout";

const HomeGuard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routerProps => {
        if (getLocalStorage("studentSignIn")) {
          return (
            <HomeLayout>
              <Component {...routerProps} />
            </HomeLayout>
          );
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default HomeGuard;
