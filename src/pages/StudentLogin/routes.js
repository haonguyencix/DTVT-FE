import { authGuardWithWrapper } from "routes/guard";
import { AUTHEN } from "routes/const";
import StudentLogin from "layouts/StudentLogin";
import VerifyScreen from "./VerifyScreen";
import SignUpScreen from "./SignUpScreen";
import IntroScreen from "./IntroScreen";
import ForgotPassScreen from "./ForgotPassScreen";
import ResetPassScreen from "./ResetPassScreen";

const StudentLoginRoutes = [
  {
    path: "/",
    key: "STUDENT_LOGIN",
    component: authGuardWithWrapper({
      authen: AUTHEN.STUDENT_LOGIN,
      layout: StudentLogin,
      screen: IntroScreen,
      redirect: "/student-home"
    })
  },
  {
    path: "/student-verify",
    key: "STUDENT_VERIFY",
    component: authGuardWithWrapper({
      authen: AUTHEN.STUDENT_VERIFY,
      layout: StudentLogin,
      screen: VerifyScreen,
      redirect: "/student-home"
    })
  },
  {
    path: "/student-signup",
    key: "STUDENT_SIGNUP",
    component: authGuardWithWrapper({
      authen: AUTHEN.STUDENT_LOGIN,
      layout: StudentLogin,
      screen: SignUpScreen,
      redirect: "/student-home"
    })
  },
  {
    path: "/forgot-password",
    key: "FORGOT_PASSWORD",
    component: authGuardWithWrapper({
      authen: AUTHEN.STUDENT_LOGIN,
      layout: StudentLogin,
      screen: ForgotPassScreen,
      redirect: "/student-home"
    })
  },
  {
    path: "/reset-password",
    key: "RESET_PASSWORD",
    component: authGuardWithWrapper({
      authen: AUTHEN.RESET_PASSWORD,
      layout: StudentLogin,
      screen: ResetPassScreen,
      redirect: "/student-home"
    })
  }
];

export default StudentLoginRoutes;
