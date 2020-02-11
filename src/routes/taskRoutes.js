import { authGuardWithWrapper } from '../auth/AuthGuard';
import TasksLayout from '../screens/pages/Tasks/TasksLayout';
import TasksScreen from '../screens/pages/Tasks/TasksScreen/TasksScreen';

const taskRoutes = [
    {path:'/tasks',key:"TASKS",exact:true,component:authGuardWithWrapper(TasksLayout,TasksScreen,false)}
]

export default taskRoutes;