// import guards
import IntroGuard from "../auth/IntroGuard";

// import screens
import VerifyScreen from "../screens/pages/Introduction/VerifyScreen/VerifyScreen";
import SignUpScreen from "../screens/pages/Introduction/SignUpScreen/SignUpScreen";
import IntroScreen from "../screens/pages/Introduction/IntroScreen/IntroScreen";

const introRoutes = {
  verify: {
    path: "/verify",
    guard: IntroGuard,
    component: VerifyScreen
  },
  studentSignUp: {
    path: "/student-signup",
    guard: IntroGuard,
    component: SignUpScreen
  },
  introScreen: { path: "/", guard: IntroGuard, component: IntroScreen }
};

export default Object.values(introRoutes);
