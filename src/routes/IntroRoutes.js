import { authGuardWithWrapper } from '../auth/AuthGuard';

import IntroLayout from '../screens/pages/Introduction/IntroLayout';
import VerifyScreen from "../screens/pages/Introduction/VerifyScreen/VerifyScreen";
import SignUpScreen from "../screens/pages/Introduction/SignUpScreen/SignUpScreen";
import IntroScreen from "../screens/pages/Introduction/IntroScreen/IntroScreen";


const introRoutes = [
  {
    path: "/", key: "INTRO", exact: true, component: authGuardWithWrapper(IntroLayout, IntroScreen, false)
  },
  {
    path: "/verify", key: 'VERIFY', exact: true, component: authGuardWithWrapper(IntroLayout, VerifyScreen, false)
  },
  {
    path: "/student-signup", key: 'STUDENT_SIGNUP', exact: true, component: authGuardWithWrapper(IntroLayout, SignUpScreen, false)
  },
];

export default introRoutes;
