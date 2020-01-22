import { authGuardWithWrapper } from '../auth/AuthGuard';
import HomeScreen from "../screens/pages/Home/HomeScreen/HomeScreen";
import HomeLayout from '../screens/pages/Home/HomeLayout';

const homeRoutes = [
  { path: "/home", key: "HOME", component: authGuardWithWrapper(HomeLayout, HomeScreen, true) }
]

export default homeRoutes;
