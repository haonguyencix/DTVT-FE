import { authGuardWithWrapper } from "routes/guard";
import { AUTHEN } from "routes/const";
import TreeSubjectLayout from "../../layouts/TreeSubject";
import TreeSubjectScreen from "../TreeSubject/TreeSubjectScreen";

const treeSubjectRoutes = [
  {
    path: "/tree-subject",
    key: "TREESUBJECT",
    exact: true,
    component: authGuardWithWrapper({
      authen: AUTHEN.STUDENT_HOME,
      layout: TreeSubjectLayout,
      screen: TreeSubjectScreen,
      redirect: "/home"
    })
  }
];

export default treeSubjectRoutes;
