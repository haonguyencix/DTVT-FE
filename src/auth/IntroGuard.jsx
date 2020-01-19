import React from "react";
import { Route, Redirect } from "react-router-dom";

//import service
import { getLocalStorage } from "../services/common";

// import layout
import IntroLayout from "../screens/pages/Introduction/IntroLayout";

// import components
import FabProgress from "../screens/atoms/FabProgress/FabProgress";

const IntroGuard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routerProps => {
        if (!getLocalStorage("studentSignIn")) {
          return (
            <IntroLayout>
              <Component
                {...routerProps}
                render={props => <FabProgress {...props} />}
              />
            </IntroLayout>
          );
        }
        return <Redirect to="/home" />;
      }}
    />
  );
};

export default IntroGuard;
