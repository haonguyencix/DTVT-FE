import { FETCH_TASKS } from './tasksConst';

let initialState = {
    tasks: [],
    isLoading: false
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS['REQUEST']:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_TASKS['SUCCESS']:
            return {
                tasks: action.payload,
                isLoading: false
            };
        case FETCH_TASKS['FAILURE']:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};
export default tasksReducer;