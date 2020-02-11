// import libraries
import { toast } from "react-toastify";

class ClassroomErrors {
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
}

export default new ClassroomErrors();
