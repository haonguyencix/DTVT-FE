import React from "react";
import { Redirect } from "react-router-dom";
import { getLocalStorage } from "../services/common";

/**
 * isAuthen = false => check chưa đăng nhập
 * isAuthen = true => check đã đăng nhập
 */
export const authGuardWithWrapper = (WrapComponent, Component, isAuthen) => {
  return props => {
    /**
    * chưa đăng nhập => đẩy user vào trang Intro
    * đã đăng nhập => đẩy user vào trang Home
    */
    if (isAuthen ? getLocalStorage("studentSignIn") : !getLocalStorage("studentSignIn")) {
      return (
        <WrapComponent>
          <Component {...props} />
        </WrapComponent>
      );
    }
    return <Redirect to="/" />;
  };
};

