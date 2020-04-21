// import const
import {
  SEND_OTP,
  CHECK_SEND,
  SEND_OTP_FORGOT_PASSWORD,
  SEND_RESET_PASSWORD_TOKEN
} from "./otpType";

let initialState = {
  expirationTime: 0,
  isSend: false,
  email: "",
  token: ""
};

const OtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP: {
      return {
        ...state,
        expirationTime: action.payload,
        isSend: true
      };
    }

    case SEND_OTP_FORGOT_PASSWORD: {
      return {
        ...state,
        expirationTime: action.payload.expirationTime,
        email: action.payload.email,
        isSend: true
      };
    }

    case CHECK_SEND: {
      return {
        ...state,
        isSend: false
      };
    }

    case SEND_RESET_PASSWORD_TOKEN: {
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
