// import libraries
import { toast } from "react-toastify";

class OTPErrors {
  sendOTPErrors(err) {
    if (err.response) {
      switch (err.response.data.message) {
        case "Account is actived":
          toast.error("Tài khoản đã được kích hoạt trước đó");
          break;
        case "Email is actived":
          toast.error("Email này đã được đăng kí trước đó. Vui lòng kiểm tra lại!");
          break;
        case "Fail to send mail!":
          toast.error("Gửi mã xác thực thất bại");
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
}

export default new OTPErrors();
