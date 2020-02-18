// import libraries
import { toast } from "react-toastify";

// import const
import {
  FETCH_OTP,
  FETCH_IS_SEND,
  FETCH_OTP_FORGOT_PASSWORD,
  FETCH_TOKEN_RESET_PASSWORD
} from "./otpConst";
import { FETCH_STUDENT_ID } from "../accounts/accountConst"
import { FETCH_LOADING } from "../../store/Loading/const";

// import services
import OTPService from "./otpService";
import { setLocalStorage } from "../../services/common";

// import errors
import OTPErrors from "./otpErrors";

// import models
import { OTP, Credentials } from "./otp";

export const sendOTP = values => {
  let credentials = new Credentials(values.id, values.email);
  return dispatch => {
    dispatch({
      type: FETCH_LOADING["REQUEST"]
    });
    OTPService.sendOTP(credentials)
      .then(res => {
        dispatch({
          type: FETCH_LOADING["SUCCESS"]
        });
        dispatch({
          type: FETCH_OTP,
          payload: res.data.expirationTime / 1000
        });
        toast.success("Kiểm tra email để lấy mã xác thực nhé!");
      })
      .catch(err => {
        dispatch({
          type: FETCH_LOADING["FAILURE"]
        });
        OTPErrors.sendOTPErrors(err);
      });
  };
};

export const verifyOTP = (values, push) => {
  let otpModel = new OTP(values.id, values.otp);
  return dispatch => {
    dispatch({
      type: FETCH_LOADING["REQUEST"]
    });
    OTPService.verifyOTP(otpModel)
      .then(res => {
        dispatch({
          type: FETCH_LOADING["SUCCESS"]
        });
        dispatch({
          type: FETCH_IS_SEND
        });
        toast.success("Kích hoạt thành công. Bạn có thể đăng nhập rồi!");
        push("/");
      })
      .catch(err => {
        dispatch({
          type: FETCH_LOADING["FAILURE"]
        });
        OTPErrors.verifyOTPErrors(err);
      });
  };
};

export const sendOtpForgotPassword = values => {
  return dispatch => {
    dispatch({
      type: FETCH_LOADING["REQUEST"]
    });
    OTPService.sendOtpForgotPassword(values)
      .then(res => {
        dispatch({
          type: FETCH_LOADING["SUCCESS"]
        });
        dispatch({
          type: FETCH_STUDENT_ID,
          payload: res.data.id
        })
        dispatch({
          type: FETCH_OTP_FORGOT_PASSWORD,
          payload: {
            expirationTime: res.data.expirationTime / 1000,
            email: res.data.email
          }
        });
        setLocalStorage("studentId", res.data.id)
        toast.success("Kiểm tra email để lấy mã xác thực nhé!");
      })
      .catch(err => {
        dispatch({
          type: FETCH_LOADING["FAILURE"]
        });
        OTPErrors.sendOtpForgotPasswordErrors(err);
      });
  };
};

export const loginResetPassword = (values, push) => {
  let otpModel = new OTP(values.id, values.otp);
  return dispatch => {
    dispatch({
      type: FETCH_LOADING["REQUEST"]
    });
    OTPService.loginResetPassword(otpModel)
      .then(res => {
        const token = res.data.token;
        dispatch({
          type: FETCH_LOADING["SUCCESS"]
        });
        dispatch({
          type: FETCH_TOKEN_RESET_PASSWORD,
          payload: token
        });
        setLocalStorage("token", token);
        toast.success("Xác thực thành công!");
        push("/reset-password");
      })
      .catch(err => {
        dispatch({
          type: FETCH_LOADING["FAILURE"]
        });
        OTPErrors.loginResetPasswordErrors(err);
      });
  };
};
