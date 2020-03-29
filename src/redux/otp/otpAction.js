import { toast } from "react-toastify";
import { ACCOUNT_ID, TOKEN } from "services/const";
import { setLocalStorage, sendAccessToken } from "services/common";
import { OTP, Credentials } from "./otp";
import { SEND_OTP, CHECK_SEND, SEND_OTP_FORGOT_PASSWORD, SEND_RESET_PASSWORD_TOKEN } from "./otpType";
import { actCheckLoading } from "components/FabProgress/action";
import { actSendAccountId } from "redux/accounts/accountAction";
import OTPService from "./otpService";

// async action
export const sendOTP = values => {
  let credentials = new Credentials(values.id, values.email);
  return dispatch => {
    dispatch(actCheckLoading("REQUEST"));

    OTPService.sendOTP(credentials)
      .then(res => {
        dispatch(actCheckLoading("SUCCESS"));

        dispatch(actSendOtp(res.data.expirationTime / 1000));

        toast.success("Kiểm tra email để lấy mã xác thực nhé!");
      })
      .catch(err => {
        dispatch(actCheckLoading("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const verifyOTP = (values, push) => {
  let otpModel = new OTP(values.id, values.otp);
  return dispatch => {
    dispatch(actCheckLoading("REQUEST"));

    OTPService.verifyOTP(otpModel)
      .then(() => {
        dispatch(actCheckLoading("SUCCESS"));

        dispatch(actCheckSendOtp());

        toast.success("Kích hoạt thành công. Bạn có thể đăng nhập rồi!");

        localStorage.clear();

        push("/");
      })
      .catch(err => {
        dispatch(actCheckLoading("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const sendOtpForgotPassword = values => {
  return dispatch => {
    dispatch(actCheckLoading("REQUEST"));

    OTPService.sendOtpForgotPassword(values)
      .then(res => {
        dispatch(actCheckLoading("SUCCESS"));

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
      .catch(err => {
        dispatch(actCheckLoading("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const loginResetPassword = (values, push) => {
  let otpModel = new OTP(values.id, values.otp);
  return dispatch => {
    dispatch(actCheckLoading("REQUEST"));

    OTPService.loginResetPassword(otpModel)
      .then(res => {
        const token = res.data.token;
        dispatch(actCheckLoading("SUCCESS"));

        dispatch(actSendResetPasswordToken(token));

        setLocalStorage(TOKEN.RESET_PASSWORD, token);

        sendAccessToken(token);

        toast.success("Xác thực thành công!");

        push("/reset-password");
      })
      .catch(err => {
        dispatch(actCheckLoading("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// action creator
export const actSendOtp = expirationTime => ({
  type: SEND_OTP,
  payload: expirationTime
});

export const actCheckSendOtp = _ => ({
  type: CHECK_SEND
});

export const actSendOtpForgotPassword = (expirationTime, email) => ({
  type: SEND_OTP_FORGOT_PASSWORD,
  payload: { expirationTime, email }
});

export const actSendResetPasswordToken = token => ({
  type: SEND_RESET_PASSWORD_TOKEN,
  payload: token
});
