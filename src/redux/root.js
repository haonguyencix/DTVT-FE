import { combineReducers } from "redux";
import isLoading from "components/FabProgress/reducer";
import accountData from "./accounts/accountReducer";
import otpData from "./otp/otpReducer";
import postData from "./posts/postReducer";

const rootReducer = combineReducers({
  isLoading,
  accountData,
  otpData,
  postData
});

export default rootReducer;
