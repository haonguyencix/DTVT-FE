import React from "react";
import { Route } from "react-router-dom";

// import layout
import IntroLayout from "./introLayout";

const IntroGuard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routerProps => {
        return (
          <IntroLayout>
            <Component {...routerProps} />
          </IntroLayout>
        );
      }}
    />
  );
};

export default IntroGuard;
