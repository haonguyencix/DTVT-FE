// import guards
import IntroGuard from "../auth/IntroGuard";

// import screens
import VerifyEmailScreen from "../screens/pages/Introduction/VerifyEmailScreen/VerifyEmailScreen";
import SignUpScreen from "../screens/pages/Introduction/SignUpScreen/SignUpScreen";
import IntroScreen from "../screens/pages/Introduction/IntroScreen/IntroScreen";

const introRoutes = {
  verifyEmail: {
    path: "/verify-email",
    guard: IntroGuard,
    component: VerifyEmailScreen
  },
  studentSignUp: {
    path: "/student-signup",
    guard: IntroGuard,
    component: SignUpScreen
  },
  introScreen: { path: "/", guard: IntroGuard, component: IntroScreen }
};

export default Object.values(introRoutes);
