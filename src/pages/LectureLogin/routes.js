import { lazy } from "react";
import { AuthGuard } from "routes/guard";
import { AUTHEN, PATH } from "routes/const";
import LectureLogin from "layouts/LectureLogin";
import VerifyScreen from "./VerifyScreen";

const LoginScreen = lazy(() => import("./LoginScreen"));

const LectureLoginRoutes = [
  {
    key: "LECTURE_LOGIN",
    component: AuthGuard({
      authen: AUTHEN.LECTURE_LOGIN,
      layout: LectureLogin,
      screen: LoginScreen,
      redirect: PATH["LECTURE_HOME"]
    })
  },
  {
    key: "LECTURE_VERIFY",
    component: AuthGuard({
      authen: AUTHEN.LECTURE_VERIFY,
      layout: LectureLogin,
      screen: VerifyScreen,
      redirect: PATH["LECTURE_HOME"]
    })
  }
];

export default LectureLoginRoutes;
