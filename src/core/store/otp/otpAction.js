import { toast } from "react-toastify";
import { ACCOUNT_ID, TOKEN, PATH } from "shared/constants";
import { setLocalStorage, sendAccessToken } from "core/services/utils";
import { OTP, Credentials } from "./otp";
import {
  SEND_OTP,
  CHECK_SEND,
  SEND_OTP_FORGOT_PASSWORD,
  SEND_RESET_PASSWORD_TOKEN,
} from "./otpType";
import { actCheckFabProgress } from "../loading/loadingAction";
import { actSendAccountId } from "core/store/accounts/accountAction";
import OTPService from "./otpService";

// async action
export const sendOTP = (values) => {
  let credentials = new Credentials(values.id, values.email);
  return (dispatch) => {
    dispatch(actCheckFabProgress("REQUEST"));

    OTPService.sendOTP(credentials)
      .then((res) => {
        dispatch(actCheckFabProgress("SUCCESS"));

        dispatch(actSendOtp(res.data.expirationTime / 1000));

        toast.success("Kiểm tra email để lấy mã xác thực nhé!");
      })
      .catch((err) => {
        dispatch(actCheckFabProgress("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const verifyOTP = (values, push) => {
  let otpModel = new OTP(values.id, values.otp);
  return (dispatch) => {
    dispatch(actCheckFabProgress("REQUEST"));

    OTPService.verifyOTP(otpModel)
      .then(() => {
        dispatch(actCheckFabProgress("SUCCESS"));

        dispatch(actCheckSendOtp());

        toast.success("Kích hoạt thành công. Bạn có thể đăng nhập rồi!");

        localStorage.clear();

        push(PATH["STUDENT_HOME"]);
      })
      .catch((err) => {
        dispatch(actCheckFabProgress("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const sendOtpForgotPassword = (values) => {
  return (dispatch) => {
    dispatch(actCheckFabProgress("REQUEST"));

    OTPService.sendOtpForgotPassword(values)
      .then((res) => {
        dispatch(actCheckFabProgress("SUCCESS"));

        dispatch(actSendAccountId(res.data.id));

        dispatch(
          actSendOtpForgotPassword(
            res.data.expirationTime / 1000,
            res.data.email
          )
        );

        setLocalStorage(ACCOUNT_ID, res.data.id);

        toast.success("Kiểm tra email để lấy mã xác thực nhé!");
      })
      .catch((err) => {
        dispatch(actCheckFabProgress("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const loginResetPassword = (values, push) => {
  let otpModel = new OTP(values.id, values.otp);
  return (dispatch) => {
    dispatch(actCheckFabProgress("REQUEST"));

    OTPService.loginResetPassword(otpModel)
      .then((res) => {
        const token = res.data.token;
        dispatch(actCheckFabProgress("SUCCESS"));

        dispatch(actSendResetPasswordToken(token));

        setLocalStorage(TOKEN["RESET_PASSWORD"], token);

        sendAccessToken(token);

        toast.success("Xác thực thành công!");

        push(PATH["RESET_PASSWORD"]);
      })
      .catch((err) => {
        dispatch(actCheckFabProgress("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// action creator
export const actSendOtp = (expirationTime) => ({
  type: SEND_OTP,
  payload: expirationTime,
});

export const actCheckSendOtp = (_) => ({
  type: CHECK_SEND,
});

export const actSendOtpForgotPassword = (expirationTime, email) => ({
  type: SEND_OTP_FORGOT_PASSWORD,
  payload: { expirationTime, email },
});

export const actSendResetPasswordToken = (token) => ({
  type: SEND_RESET_PASSWORD_TOKEN,
  payload: token,
});

export const actCheckSend = () => ({ type: CHECK_SEND });
