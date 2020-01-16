// import libraries
import { toast } from "react-toastify";

// import const
import { FETCH_OTP, FETCH_VERIFY } from "./otpConst";

// import services
import OTPService from "./otpService";

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
        console.log("TCL: res", res);
        dispatch({
          type: FETCH_OTP["SUCCESS"],
          payload: res.data.data.expirationTime / 1000
        });
        toast.success("Kiểm tra email để lấy mã xác thực nhé!");
      })
      .catch(err => {
        console.log(
          "TCL: err.response.data.message",
          err.response.data.message
        );
        dispatch({
          type: FETCH_OTP["FAILURE"]
        });
        switch (err.response.data.message) {
          case "Account is actived":
            toast.error("Tài khoản đã được kích hoạt trước đó");
            break;
          case "Fail to send mail!":
            toast.error("Gửi mã xác thực thất bại");
            break;
          default:
            toast.error("Lỗi mạng");
            break;
        }
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
        console.log("TCL: res", res);
        dispatch({
          type: FETCH_VERIFY
        });
        toast.success("Tài khoản của bạn đã được kích hoạt!");
        toast.info("Đăng nhập để tiếp tục nhé!");
        replace("/");
      })
      .catch(err => {
        console.log(
          "TCL: err.response.data.message",
          err.response.data.message
        );
        dispatch({
          type: FETCH_OTP["FAILURE"]
        });
        switch (err.response.data.message) {
          case "OTP was expired":
            toast.info("Mã không còn tồn tại. Vui lòng bấm xác thực lại!");
            break;
          case "Account is actived":
            toast.error("Tài khoản đã được kích hoạt trước đó");
            break;
          default:
            toast.error("Lỗi mạng");
            break;
        }
      });
  };
};
