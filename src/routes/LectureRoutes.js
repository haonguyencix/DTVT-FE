import { authGuardWithWrapper } from "../auth/AuthGuard";

import LectureLayout from "../screens/pages/Lecture/LectureLayout";

import LectureScreen from "../screens/pages/Lecture/LectureScreen/LectureScreen";

const lectureRoutes = [
  {
    path: "/lecture",
    key: "LECTURE",
    exact: true,
    component: authGuardWithWrapper({
      authen: "home",
      layout: LectureLayout,
      screen: LectureScreen,
      redirect: "/home"
    })
  }
];

export default lectureRoutes;
