import { CHECK_FAB_PROGRESS } from "./loadingType";

let initialState = false;

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_FAB_PROGRESS["REQUEST"]: {
      return true;
    }

    case CHECK_FAB_PROGRESS["SUCCESS"]: {
      return false;
    }

    case CHECK_FAB_PROGRESS["FAILURE"]: {
      return false;
    }

    default:
      return state;
  }
};

export default LoadingReducer;
