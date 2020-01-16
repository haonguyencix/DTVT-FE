// import const
import { FETCH_STUDENT_ID, FETCH_STUDENT_SIGN_IN } from "./accountConst";

// import services
import { getLocalStorage } from "../../services/common";

let initialState = {
  studentId: getLocalStorage("studentId"),
  studentSignIn: null,
  isLoading: false
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT_ID: {
      return { ...state, studentId: action.payload };
    }

    case FETCH_STUDENT_SIGN_IN["REQUEST"]: {
      return {
        ...state,
        isLoading: true
      };
    }

    case FETCH_STUDENT_SIGN_IN["SUCCESS"]: {
      return {
        ...state,
        studentSignIn: action.payload.studentSignIn,
        isLoading: false
      };
    }

    case FETCH_STUDENT_SIGN_IN["FAILURE"]: {
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
