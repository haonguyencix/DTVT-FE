import { combineReducers } from "redux";
import AccountReducer from "../components/accounts/accountReducer";

const rootReducer = combineReducers({
  accountData: AccountReducer
});

export default rootReducer;
