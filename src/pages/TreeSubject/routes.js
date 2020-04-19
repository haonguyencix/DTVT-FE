import { AuthGuard } from "routes/guard";
import { AUTHEN, PATH } from "routes/const";
import TreeSubjectLayout from "../../layouts/TreeSubject";
import TreeSubjectScreen from "../TreeSubject/TreeSubjectScreen";

const treeSubjectRoutes = [
  {
    key: "TREE_SUBJECT",
    component: AuthGuard({
      authen: AUTHEN.STUDENT_HOME,
      layout: TreeSubjectLayout,
      screen: TreeSubjectScreen,
      redirect: PATH["STUDENT_LOGIN"],
    }),
  },
];

export default treeSubjectRoutes;
