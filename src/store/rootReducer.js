import { combineReducers } from "redux";
import AccountReducer from "../components/accounts/accountReducer";
import OtpReducer from "../components/otp/otpReducer";

const rootReducer = combineReducers({
  accountData: AccountReducer,
  otpData: OtpReducer
});

export default rootReducer;
