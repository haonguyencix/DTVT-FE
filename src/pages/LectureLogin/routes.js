import { lazy } from "react";
import { authGuardWithWrapper } from "routes/guard";
import { AUTHEN } from "routes/const";
import LectureLogin from "layouts/LectureLogin";
import VerifyScreen from "./VerifyScreen";

const LoginScreen = lazy(() => import("./LoginScreen"));

const LectureLoginRoutes = [
  {
    path: "/lecture",
    key: "LECTURE_LOGIN",
    component: authGuardWithWrapper({
      authen: AUTHEN.LECTURE_LOGIN,
      layout: LectureLogin,
      screen: LoginScreen,
      redirect: "/lecture-home"
    })
  },
  {
    path: "/lecture-verify",
    key: "LECTURE_VERIFY",
    component: authGuardWithWrapper({
      authen: AUTHEN.LECTURE_VERIFY,
      layout: LectureLogin,
      screen: VerifyScreen,
      redirect: "/lecture-home"
    })
  }
];

export default LectureLoginRoutes;
