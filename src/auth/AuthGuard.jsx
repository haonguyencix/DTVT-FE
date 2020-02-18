import React from "react";
import { Redirect } from "react-router-dom";
import { getLocalStorage } from "../services/common";

const checkAuthen = authen => {
  if (authen === "home") {
    return getLocalStorage("studentSignIn");
  } else if (authen === "intro") {
    return !getLocalStorage("studentSignIn");
  } else if (authen === "verify") {
    return !getLocalStorage("studentSignIn") && getLocalStorage("studentId");
  } else if (authen === "reset-pasword") {
    return getLocalStorage("token") && getLocalStorage("studentId");
  }
};

export const authGuardWithWrapper = ComponentProps => {

  return props => {
    if (checkAuthen(ComponentProps.authen)) {
      return (
        <ComponentProps.layout>
          <ComponentProps.screen {...props} />
        </ComponentProps.layout>
      );
    }
    return <Redirect to={ComponentProps.redirect} />;
  };
};
