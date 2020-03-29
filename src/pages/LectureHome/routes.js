import { authGuardWithWrapper } from "routes/guard";
import { AUTHEN } from "routes/const";
import LectureHome from "layouts/LectureHome";
import HomeScreen from "./HomeScreen";

const LectureHomeRoutes = [
  {
    path: "/lecture-home",
    key: "LECTURE_HOME",
    component: authGuardWithWrapper({
      authen: AUTHEN.LECTURE_HOME,
      layout: LectureHome,
      screen: HomeScreen,
      redirect: "/"
    })
  }
];

export default LectureHomeRoutes;
