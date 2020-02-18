// import libraries
import { toast } from "react-toastify";

class OTPErrors {
  sendOTPErrors(err) {
    if (err.response) {
      switch (err.response.data.message) {
        case "Account is actived":
          toast.error("Tài khoản đã được kích hoạt trước đó");
          break;
        case "Account not found":
          toast.error("Mã số sinh viên này không tồn tại");
          break;
        case "Account has not actived":
          toast.error("Tài khoản chưa được kích hoạt");
          break;
        case "Email is actived":
          toast.error(
            "Email này đã được đăng kí trước đó. Vui lòng kiểm tra lại!"
          );
          break;
        case "Fail to send mail!":
          toast.error("Gửi mã xác thực thất bại");
          break;
        case "Email is not correct":
          toast.error("Đây không phải email bạn đăng ký?");
          break;
        default:
          toast.error("Lỗi mạng");
          break;
      }
    } else {
      toast.error("Lỗi mạng, vui lòng kiểm tra lại kết nối!");
    }
  }

  verifyOTPErrors(err) {
    if (err.response) {
      switch (err.response.data.message) {
        case "OTP was expired":
          toast.info("Mã không còn tồn tại. Vui lòng kiểm tra lại!");
          break;
        case "Account is actived":
          toast.error("Tài khoản đã được kích hoạt trước đó");
          break;
        default:
          toast.error("Lỗi mạng");
          break;
      }
    } else {
      toast.error("Lỗi mạng, vui lòng kiểm tra lại kết nối!");
    }
  }

  sendOtpForgotPasswordErrors(err) {
    if (err.response) {
      switch (err.response.data.message) {
        case "Account not found":
          toast.info("Tài khoản không tồn tại!");
          break;
        case "Account has not actived":
          toast.error("Tài khoản này chưa được kích hoạt!");
          break;
        case "Fail to send mail!":
          toast.error("Gửi mã xác thực thất bại!");
          break;
        case "Fail!":
          toast.error("Gửi mã xác thực thất bại!");
          break;
        default:
          toast.error("Lỗi mạng");
          break;
      }
    } else {
      toast.error("Lỗi mạng, vui lòng kiểm tra lại kết nối!");
    }
  }

  loginResetPasswordErrors(err) {
    if (err.response) {
      switch (err.response.data.message) {
        case "ID is not correct":
          toast.info("Tài khoản không tồn tại!");
          break;
        case "Account has not actived":
          toast.error("Tài khoản này chưa được kích hoạt!");
          break;
        case "OTP was expired":
          toast.error("Mã xác thực đã hết hạn!");
          break;
        default:
          toast.error("Lỗi mạng");
          break;
      }
    } else {
      toast.error("Lỗi mạng, vui lòng kiểm tra lại kết nối!");
    }
  }
}

export default new OTPErrors();
