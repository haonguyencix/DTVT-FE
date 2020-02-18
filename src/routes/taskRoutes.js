import { authGuardWithWrapper } from "../auth/AuthGuard";

import TasksLayout from "../screens/pages/Tasks/TasksLayout";

import TasksScreen from "../screens/pages/Tasks/TasksScreen/TasksScreen";

const taskRoutes = [
  {
    path: "/tasks",
    key: "TASKS",
    exact: true,
    component: authGuardWithWrapper({
      authen: "home",
      layout: TasksLayout,
      screen: TasksScreen,
      redirect: "/home"
    })
  }
];

export default taskRoutes;
