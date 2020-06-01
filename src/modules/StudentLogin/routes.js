import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { Redirect } from "react-router-dom";
import { PATH, TOKEN } from "shared/constants";
import LazyloadPage from "shared/components/LazyloadPage";
import Introduction from "./pages/Introduction";
import * as Cookies from "js-cookie";

const StudentLoginLayout = lazy(() => import("."));
const SignUp = lazy(() => import("./pages/SignUp"));
const Verify = lazy(() => import("./pages/Verify"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const StudentLoginGuard = ({ routes }) => {
  if (Cookies.get(TOKEN["STUDENT"])) {
    return <Redirect to={PATH["STUDENT_POST_LIST"]} />;
  }
  return (
    <Suspense fallback={<LazyloadPage />}>
      <StudentLoginLayout>
        <RenderRoutes routes={routes} />
      </StudentLoginLayout>
    </Suspense>
  );
};

const ResetPasswordGuard = () => {
  if (!Cookies.get(TOKEN["RESET_PASSWORD"])) {
    return <Redirect to={PATH["STUDENT_LOGIN"]} />;
  }
  return <ResetPassword />
}

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
      path: PATH["VERIFY"],
      exact: true,
      component: Verify,
    },
    {
      key: "STUDENT_FORGOT_PASSWORD",
      path: PATH["FORGOT_PASSWORD"],
      exact: true,
      component: ForgotPassword,
    },
    {
      key: "STUDENT_RESET_PASSWORD",
      path: PATH["RESET_PASSWORD"],
      exact: true,
      component: ResetPasswordGuard,
    },
  ],
};

export default StudentLoginRoutes;
