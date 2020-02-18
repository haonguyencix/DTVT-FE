// import libraries
import { toast } from "react-toastify";

class AccountErrors {
  studentSignUpErrors(err) {
    if (err.response) {
      switch (err.response.data.message) {
        case "Please enter exact ID":
          toast.error("Vui lòng kiểm tra lại mã số sinh viên");
          break;
        case "ID already registed":
          toast.error("Mã số sinh viên này đã được đăng ký");
          break;
        case "Can not access!":
          toast.error("Không phải bạn?");
          break;
        default:
          toast.error("Lỗi mạng");
          break;
      }
    } else {
      toast.error("Lỗi mạng, vui lòng kiểm tra lại kết nối!");
    }
  }

  studentSignInErrors(err) {
    if (err.response) {
      switch (err.response.data.message) {
        case "Email or password is incorrect!":
          toast.error("Mã số sinh viên hoặc mật khẩu không đúng!");
          break;
        case "Account has not actived":
          toast.error("Tài khoản chưa được kích hoạt");
          break;
        default:
          toast.error("Lỗi mạng");
          break;
      }
    } else {
      toast.error("Lỗi mạng, vui lòng kiểm tra lại kết nối!");
    }
  }

  resetPasswordErrors(err) {
    if (err.response) {
      switch (err.response.data.message) {
        case "Account not found":
          toast.error("Mã số sinh viên không tồn tại!");
          break;
        case "Update fail!":
          toast.error("Reset mật khẩu lỗi!");
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

export default new AccountErrors();
