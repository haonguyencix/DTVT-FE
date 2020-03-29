import { authGuardWithWrapper } from "routes/guard";
import { AUTHEN } from "routes/const";
import StudentHome from "layouts/StudentHome";
import HomeScreen from "./HomeScreen";

const StudentHomeRoutes = [
  {
    path: "/student-home",
    key: "STUDENT_HOME",
    component: authGuardWithWrapper({
      authen: AUTHEN.STUDENT_HOME,
      layout: StudentHome,
      screen: HomeScreen,
      redirect: "/"
    })
  }
];

export default StudentHomeRoutes;
