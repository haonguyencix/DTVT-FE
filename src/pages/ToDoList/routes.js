import { authGuardWithWrapper } from "routes/guard";
import { AUTHEN } from "routes/const";
import TasksLayout from "layouts/ToDoList";
import TasksScreen from "./TasksScreen";

const ToDoListRoutes = [
  {
    path: "/tasks",
    key: "TASKS",
    component: authGuardWithWrapper({
      authen: AUTHEN.STUDENT_HOME,
      layout: TasksLayout,
      screen: TasksScreen,
      redirect: "/home"
    })
  }
];

export default ToDoListRoutes;
