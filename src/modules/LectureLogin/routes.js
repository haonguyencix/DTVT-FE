import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { PATH } from "shared/constants";
import Spinner from "shared/components/Spinner";
import Login from "./pages/Login";

const LectureLoginGuard = lazy(() => import("./guard"));
const Verify = lazy(() => import("./pages/Verify"));

const LectureLoginWrapper = ({ routes }) => (
  <Suspense fallback={<Spinner />}>
    <LectureLoginGuard>
      <RenderRoutes routes={routes} />
    </LectureLoginGuard>
  </Suspense>
);

const LectureLoginRoutes = {
  key: "LECTURE_LOGIN",
  path: PATH["LECTURE_LOGIN"],
  component: LectureLoginWrapper,
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
