import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { Redirect } from "react-router-dom";
import { PATH, TOKEN } from "shared/constants";
import Spinner from "shared/components/Spinner";
import Introduction from "./pages/Introduction";
import * as Cookies from "js-cookie";

const StudentLoginLayout = lazy(() => import("."));
const SignUp = lazy(() => import("./pages/SignUp"));
const Verify = lazy(() => import("./pages/Verify"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const StudentLoginGuard = ({ routes }) => {
  if (Cookies.get(TOKEN["STUDENT"])) {
    return <Redirect to={PATH["STUDENT_HOME"]} />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <StudentLoginLayout>
        <RenderRoutes routes={routes} />
      </StudentLoginLayout>
    </Suspense>
  );
};

const StudentLoginRoutes = {
  key: "STUDENT_LOGIN",
  path: PATH["STUDENT_LOGIN"],
  component: StudentLoginGuard,
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
