import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { Redirect } from "react-router-dom";
import { TOKEN, PATH } from "shared/constants";
import Spinner from "shared/components/Spinner";
import Login from "./pages/Login";
import * as Cookies from "js-cookie";

const LectureLoginLayout = lazy(() => import("."));
const Verify = lazy(() => import("./pages/Verify"));

const LectureLoginGuard = ({ routes }) => {
  if (Cookies.get(TOKEN["LECTURE"])) {
    return <Redirect to={PATH["LECTURE_HOME"]} />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <LectureLoginLayout>
        <RenderRoutes routes={routes} />
      </LectureLoginLayout>
    </Suspense>
  );
};

const LectureLoginRoutes = {
  key: "LECTURE_LOGIN",
  path: PATH["LECTURE_LOGIN"],
  component: LectureLoginGuard,
  routes: [
    {
      key: "LOGIN_PAGE",
      path: PATH["LECTURE_LOGIN"],
      exact: true,
      component: Login,
    },
    {
      key: "VERIFY",
      path: PATH["LECTURE_VERIFY"],
      exact: true,
      component: Verify,
    },
  ],
};

export default LectureLoginRoutes;
