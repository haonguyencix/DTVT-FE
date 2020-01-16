// import const
import { FETCH_OTP, FETCH_OTP_RESEND, FETCH_VERIFY } from "./otpConst";

let initialState = {
  expirationTime: 0,
  isLoading: false, 
  isSubmit: false
};

const OtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OTP["REQUEST"]:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_OTP["SUCCESS"]: {
      return {
        ...state,
        expirationTime: action.payload,
        isLoading: false,
        isSubmit: true
      };
    }

    case FETCH_OTP["FAILURE"]: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case FETCH_OTP_RESEND: {
      return {
        ...state,
        isSubmit: false
      };
    }

    case FETCH_VERIFY: {
      return {
        ...state,
        isLoading: false,
        isSubmit: false
      };
    }

    default:
      return state;
  }
};

export default OtpReducer;
