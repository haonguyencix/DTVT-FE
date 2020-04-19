import { AuthGuard } from "routes/guard";
import { PATH, AUTHEN } from "routes/const";
import StudentLogin from "layouts/StudentLogin";
import VerifyScreen from "./VerifyScreen";
import SignUpScreen from "./SignUpScreen";
import IntroScreen from "./IntroScreen";
import ForgotPassScreen from "./ForgotPassScreen";
import ResetPassScreen from "./ResetPassScreen";

const StudentLoginRoutes = [
  {
    key: "STUDENT_LOGIN",
    component: AuthGuard({
      authen: AUTHEN.STUDENT_LOGIN,
      layout: StudentLogin,
      screen: IntroScreen,
      redirect: PATH["STUDENT_HOME"]
    })
  },
  {
    key: "STUDENT_VERIFY",
    component: AuthGuard({
      authen: AUTHEN.STUDENT_VERIFY,
      layout: StudentLogin,
      screen: VerifyScreen,
      redirect: PATH["STUDENT_HOME"]
    })
  },
  {
    key: "STUDENT_SIGNUP",
    component: AuthGuard({
      authen: AUTHEN.STUDENT_LOGIN,
      layout: StudentLogin,
      screen: SignUpScreen,
      redirect: PATH["STUDENT_HOME"]
    })
  },
  {
    key: "FORGOT_PASSWORD",
    component: AuthGuard({
      authen: AUTHEN.STUDENT_LOGIN,
      layout: StudentLogin,
      screen: ForgotPassScreen,
      redirect: PATH["STUDENT_HOME"]
    })
  },
  {
    key: "RESET_PASSWORD",
    component: AuthGuard({
      authen: AUTHEN.RESET_PASSWORD,
      layout: StudentLogin,
      screen: ResetPassScreen,
      redirect: PATH["STUDENT_HOME"]
    })
  }
];

export default StudentLoginRoutes;
