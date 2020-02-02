import { FETCH_TASKS } from './tasksConst';
import TasksService from './tasksService.js';

export const fetchTasksRequest = () => {
    return {
        type: FETCH_TASKS['REQUEST']
    }
}

export const fetchTasksSuccess = (tasks) => {
    return {
        type: FETCH_TASKS['SUCCESS'],
        payload: tasks
    }
}

export const fetchTasksFail = () => {
    return {
        type: FETCH_TASKS['FAILURE']
    }
}

export const fetchTasks = () => {
    return dispatch => {
        dispatch(fetchTasksRequest());
        TasksService.fetchTasks()
            .then(res => {
                dispatch(fetchTasksSuccess(res.data));
            }).catch(err=>{
                dispatch(fetchTasksFail());
            })
    }
}