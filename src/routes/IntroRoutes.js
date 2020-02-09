import { authGuardWithWrapper } from "../auth/AuthGuard";
import { getLocalStorage } from "../services/common";

import IntroLayout from "../screens/pages/Introduction/IntroLayout";

import VerifyScreen from "../screens/pages/Introduction/VerifyScreen/VerifyScreen";
import SignUpScreen from "../screens/pages/Introduction/SignUpScreen/SignUpScreen";
import IntroScreen from "../screens/pages/Introduction/IntroScreen/IntroScreen";
import ResetPassword from "../screens/pages/Introduction/ResetPassword/ResetPassword";

const introRoutes = [
  {
    path: "/",
    key: "INTRO",
    exact: true,
    component: authGuardWithWrapper(
      IntroLayout,
      IntroScreen,
      !getLocalStorage("studentSignIn"),
      "/home"
    )
  },
  {
    path: "/verify",
    key: "VERIFY",
    exact: true,
    component: authGuardWithWrapper(
      IntroLayout,
      VerifyScreen,
      !getLocalStorage("studentSignIn") && getLocalStorage("studentId"),
      "/home"
    )
  },
  {
    path: "/student-signup",
    key: "STUDENT_SIGNUP",
    exact: true,
    component: authGuardWithWrapper(
      IntroLayout,
      SignUpScreen,
      !getLocalStorage("studentSignIn"),
      "/home"
    )
  },
  {
    path: "/reset-password",
    key: "RESET_PASSWORD",
    exact: true,
    component: authGuardWithWrapper(
      IntroLayout,
      ResetPassword,
      !getLocalStorage("studentSignIn"),
      "/home"
    )
  }
];

export default introRoutes;
