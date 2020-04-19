import { AuthGuard } from "routes/guard";
import { AUTHEN, PATH } from "routes/const";
import StudentHome from "layouts/StudentHome";
import HomeScreen from "./HomeScreen";

const StudentHomeRoutes = [
  {
    key: "STUDENT_HOME",
    component: AuthGuard({
      authen: AUTHEN.STUDENT_HOME,
      layout: StudentHome,
      screen: HomeScreen,
      redirect: PATH["STUDENT_LOGIN"]
    })
  }
];

export default StudentHomeRoutes;
