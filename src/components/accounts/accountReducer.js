// import const
import { FETCH_STUDENT_SIGN_IN, FETCH_STUDENT_ID } from "./accountConst";

// import services
import { getLocalStorage } from "../../services/common";

let initialState = {
  studentSignIn: null,
  studentId: getLocalStorage("studentId") ? getLocalStorage("studentId") : null,
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT_SIGN_IN: {
      return {
        ...state,
        studentSignIn: action.payload.studentSignIn,
      };
    }

    case FETCH_STUDENT_ID: {
      return {
        ...state,
        studentId: action.payload,
      };
    }

    default:
      return state;
  }
};

export default AccountReducer;
