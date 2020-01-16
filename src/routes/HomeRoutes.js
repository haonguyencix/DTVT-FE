// import guards
import HomeGuard from "../auth/HomeGuard";

// import screens
import HomeScreen from "../screens/pages/Home/HomeScreen/HomeScreen";

const homeRoutes = {
  homeScreen: { path: "/home", guard: HomeGuard, component: HomeScreen }
};

export default Object.values(homeRoutes);
