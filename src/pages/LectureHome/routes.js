import { AuthGuard } from "routes/guard";
import { PATH, AUTHEN } from "routes/const";
import LectureHome from "layouts/LectureHome";
import HomeScreen from "./HomeScreen";

const LectureHomeRoutes = [
  {
    key: "LECTURE_HOME",
    component: AuthGuard({
      authen: AUTHEN.LECTURE_HOME,
      layout: LectureHome,
      screen: HomeScreen,
      redirect: PATH["STUDENT_LOGIN"]
    })
  }
];

export default LectureHomeRoutes;
