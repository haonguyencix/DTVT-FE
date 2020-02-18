import { FETCH_LOADING } from "./const";

let initialState = false;

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOADING["REQUEST"]: {
      return true;
    }

    case FETCH_LOADING["SUCCESS"]: {
      return false;
    }

    case FETCH_LOADING["FAILURE"]: {
      return false;
    }

    default:
      return state;
  }
};

export default LoadingReducer;
