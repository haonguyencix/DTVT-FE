import { authGuardWithWrapper } from "../auth/AuthGuard";

import IntroLayout from "../screens/pages/Introduction/IntroLayout";

import VerifyScreen from "../screens/pages/Introduction/VerifyScreen/VerifyScreen";
import SignUpScreen from "../screens/pages/Introduction/SignUpScreen/SignUpScreen";
import IntroScreen from "../screens/pages/Introduction/IntroScreen/IntroScreen";
import ForgotPassScreen from "../screens/pages/Introduction/ForgorPassScreen/ForgotPassScreen";
import ResetPassScreen from "../screens/pages/Introduction/ResetPassScreen/ResetPassScreen";

const introRoutes = [
  {
    path: "/",
    key: "INTRO",
    exact: true,
    component: authGuardWithWrapper({
      authen: "intro",
      layout: IntroLayout,
      screen: IntroScreen,
      redirect: "/home"
    })
  },
  {
    path: "/verify",
    key: "VERIFY",
    exact: true,
    component: authGuardWithWrapper({
      authen: "verify",
      layout: IntroLayout,
      screen: VerifyScreen,
      redirect: "/home"
    })
  },
  {
    path: "/student-signup",
    key: "STUDENT_SIGNUP",
    exact: true,
    component: authGuardWithWrapper({
      authen: "intro",
      layout: IntroLayout,
      screen: SignUpScreen,
      redirect: "/home"
    })
  },
  {
    path: "/forgot-password",
    key: "FORGOT_PASSWORD",
    exact: true,
    component: authGuardWithWrapper({
      authen: "intro",
      layout: IntroLayout,
      screen: ForgotPassScreen,
      redirect: "/home"
    })
  },
  {
    path: "/reset-password",
    key: "RESET_PASSWORD",
    exact: true,
    component: authGuardWithWrapper({
      authen: "reset-pasword",
      layout: IntroLayout,
      screen: ResetPassScreen,
      redirect: "/home"
    })
  }
];

export default introRoutes;
