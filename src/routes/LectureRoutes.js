import { authGuardWithWrapper } from "../auth/AuthGuard";
import { getLocalStorage } from "../services/common";

import LectureLayout from "../screens/pages/Lecture/LectureLayout";

import LectureScreen from "../screens/pages/Lecture/LectureScreen/LectureScreen";

const lectureRoutes = [
  {
    path: "/lecture",
    key: "LECTURE",
    exact: true,
    component: authGuardWithWrapper(
      LectureLayout,
      LectureScreen,
      !getLocalStorage("studentSignIn"),
      "/home"
    )
  }
];

export default lectureRoutes;
