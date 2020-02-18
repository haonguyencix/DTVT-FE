// import const
import {
  FETCH_OTP,
  FETCH_IS_SEND,
  FETCH_OTP_FORGOT_PASSWORD,
  FETCH_TOKEN_RESET_PASSWORD
} from "./otpConst";

let initialState = {
  expirationTime: 0,
  isSend: false,
  email: "",
  token: ""
};

const OtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OTP: {
      return {
        ...state,
        expirationTime: action.payload,
        isSend: true
      };
    }

    case FETCH_OTP_FORGOT_PASSWORD: {
      return {
        ...state,
        expirationTime: action.payload.expirationTime,
        email: action.payload.email,
        isSend: true
      };
    }

    case FETCH_IS_SEND: {
      return {
        ...state,
        isSend: false
      };
    }

    case FETCH_TOKEN_RESET_PASSWORD: {
      return {
        ...state,
        token: action.payload
      };
    }

    default:
      return state;
  }
};

export default OtpReducer;
