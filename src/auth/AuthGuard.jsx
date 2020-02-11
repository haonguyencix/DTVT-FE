import React from "react";
import { Redirect } from "react-router-dom";

export const authGuardWithWrapper = (
  WrapComponent,
  Component,
  Condition,
  RedirectTo
) => {
  return props => {
    if (Condition) {
      return (
        <WrapComponent>
          <Component {...props} />
        </WrapComponent>
      );
    }
    return <Redirect to={RedirectTo} />;
  };
};
