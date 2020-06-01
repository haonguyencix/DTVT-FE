import { combineReducers } from "redux";
import { CLEAR_STORE } from "./accounts/accountType";
import isLoading from "./loading/loadingReducer";
import accountData from "./accounts/accountReducer";
import otpData from "./otp/otpReducer";
import postData from "./posts/postReducer";
import classroomData from "./classrooms/classroomReducer";
import scoreData from "./scores/scoreReducer";

const appReducer = combineReducers({
  isLoading,
  accountData,
  otpData,
  postData,
  classroomData,
  scoreData
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
