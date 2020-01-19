// import libraries
import { toast } from "react-toastify";

// import const
import { FETCH_OTP, FETCH_VERIFY } from "./otpConst";

// import services
import OTPService from "./otpService";

// import errors
import OTPErrors from "./otpErrors";

// import models
import { OTP, Credentials } from "./otp";

export const sendOtpToUserByMail = values => {
  let credentials = new Credentials(values.id, values.email);
  return dispatch => {
    dispatch({
      type: FETCH_OTP["REQUEST"]
    });
    OTPService.sendOtpFromServer(credentials)
      .then(res => {
        dispatch({
          type: FETCH_OTP["SUCCESS"],
          payload: res.data.data.expirationTime / 1000
        });
        toast.success("Kiểm tra email để lấy mã xác thực nhé!");
      })
      .catch(err => {
        dispatch({
          type: FETCH_OTP["FAILURE"]
        });
        OTPErrors.sendOTPErrors(err);
      });
  };
};

export const verifyOTP = (values, replace) => {
  let otpModel = new OTP(values.id, values.otp);
  return dispatch => {
    dispatch({
      type: FETCH_OTP["REQUEST"]
    });
    OTPService.verifyOTP(otpModel)
      .then(res => {
        dispatch({
          type: FETCH_VERIFY
        });
        toast.success("Tài khoản của bạn đã được kích hoạt!");
        toast.info("Đăng nhập để tiếp tục nhé!");
        replace("/");
      })
      .catch(err => {
        dispatch({
          type: FETCH_OTP["FAILURE"]
        });
        OTPErrors.verifyOTPErrors(err);
      });
  };
};
