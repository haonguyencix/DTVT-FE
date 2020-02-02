import { combineReducers } from "redux";
import AccountReducer from "../components/accounts/accountReducer";
import OtpReducer from "../components/otp/otpReducer";
import tasksReducer from "../components/tasks/tasksReducer";

const rootReducer = combineReducers({
  accountData: AccountReducer,
  otpData: OtpReducer,
  tasksData: tasksReducer
});

export default rootReducer;
