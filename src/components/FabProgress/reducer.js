import { CHECK_LOADING } from "./const";

let initialState = false;

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_LOADING["REQUEST"]: {
      return true;
    }

    case CHECK_LOADING["SUCCESS"]: {
      return false;
    }

    case CHECK_LOADING["FAILURE"]: {
      return false;
    }

    default:
      return state;
  }
};

export default LoadingReducer;
