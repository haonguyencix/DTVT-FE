// import const
import { FETCH_CLASSROOMS } from "./classConst";

let initialState = {
  classrooms: null,
  isLoading: false
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLASSROOMS["REQUEST"]: {
      return {
        ...state,
        isLoading: true
      };
    }

    case FETCH_CLASSROOMS["SUCCESS"]: {
      return {
        ...state,
        classrooms: action.payload.classrooms,
        isLoading: false
      };
    }

    case FETCH_CLASSROOMS["FAILURE"]: {
      return {
        ...state,
        isLoading: false
      };
    }

    default:
      return state;
  }
};

export default AccountReducer;
