import React from "react";
import { Route } from "react-router-dom";

// import layout
import IntroLayout from "../screens/pages/Introduction/IntroLayout";

// import components
import FabProgress from "../screens/atoms/FabProgress/FabProgress";

const IntroGuard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routerProps => (
        <IntroLayout>
          <Component
            {...routerProps}
            render={props => <FabProgress {...props} />}
          />
        </IntroLayout>
      )}
    />
  );
};

export default IntroGuard;
