import { authGuardWithWrapper } from "../auth/AuthGuard";

import HomeLayout from "../screens/pages/Home/HomeLayout";

import HomeScreen from "../screens/pages/Home/HomeScreen/HomeScreen";

const homeRoutes = [
  {
    path: "/home",
    key: "HOME",
    exact: true,
    component: authGuardWithWrapper({
      authen: "home",
      layout: HomeLayout,
      screen: HomeScreen,
      redirect: "/"
    })
  }
];

export default homeRoutes;
