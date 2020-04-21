import React from "react";
import { RenderRoutes } from "core/routes";
import { PATH } from "shared/constants";
import StudentLoginGuard from "./guard";
import Introduction from "./pages/Introduction";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const StudentLoginWrapper = ({ routes }) => (
  <StudentLoginGuard>
    <RenderRoutes routes={routes} />
  </StudentLoginGuard>
);

const StudentLoginRoutes = {
  key: "STUDENT_LOGIN",
  path: PATH["STUDENT_LOGIN"],
  component: StudentLoginWrapper,
  routes: [
    {
      key: "INTRODUCTION",
      path: PATH["STUDENT_LOGIN"],
      exact: true,
      component: Introduction,
    },
    {
      key: "STUDENT_SIGNUP",
      path: PATH["STUDENT_SIGNUP"],
      exact: true,
      component: SignUp,
    },
    {
      key: "STUDENT_VERIFY",
      path: PATH["STUDENT_VERIFY"],
      exact: true,
      component: Verify,
    },
    {
      key: "FORGOT_PASSWORD",
      path: PATH["FORGOT_PASSWORD"],
      exact: true,
      component: ForgotPassword,
    },
    {
      key: "RESET_PASSWORD",
      path: PATH["RESET_PASSWORD"],
      exact: true,
      component: ResetPassword,
    },
  ],
};

export default StudentLoginRoutes;
