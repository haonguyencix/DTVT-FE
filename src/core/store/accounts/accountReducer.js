import {
  SEND_LOGIN_TOKEN,
  SEND_ACCOUNT_ID,
  SET_CREDENTIAL
} from "./accountType";
import { ACCOUNT_ID } from "shared/constants";
import { getLocalStorage } from "core/services/utils";

let initialState = {
  credential: null,
  accountLogin: null,
  accountId: getLocalStorage(ACCOUNT_ID) ? getLocalStorage(ACCOUNT_ID) : null
};

const AccountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_LOGIN_TOKEN: {
      return { ...state, accountLogin: payload };
    }

    case SET_CREDENTIAL: {
      return { ...state, credential: payload };
    }

    case SEND_ACCOUNT_ID: {
      return { ...state, accountId: payload };
    }

    default:
      return state;
  }
};

export default AccountReducer;
