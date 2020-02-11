import { authGuardWithWrapper } from "../auth/AuthGuard";
import { getLocalStorage } from "../services/common";

import HomeLayout from "../screens/pages/Home/HomeLayout";

import HomeScreen from "../screens/pages/Home/HomeScreen/HomeScreen";

const homeRoutes = [
  {
    path: "/home",
    key: "HOME",
    component: authGuardWithWrapper(
      HomeLayout,
      HomeScreen,
      getLocalStorage("studentSignIn"),
      "/"
    )
  }
];

export default homeRoutes;
