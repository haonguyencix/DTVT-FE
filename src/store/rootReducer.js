import { combineReducers } from "redux";
import LoadingReducer from "./Loading/reducer"
import AccountReducer from "../components/accounts/accountReducer";
import OtpReducer from "../components/otp/otpReducer";

const rootReducer = combineReducers({
  isLoading: LoadingReducer,
  accountData: AccountReducer,
  otpData: OtpReducer
});

export default rootReducer;
