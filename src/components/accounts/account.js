// import libraries
import { format } from "date-fns";
import * as yup from "yup";

export class StudentAccount {
  constructor(_id, _password, _birth, _role) {
    this.id = _id;
    this.password = _password;
    this.birth = format(_birth, "yyyy-MM-dd");
    this.role = _role;
  }
}

export const AccountSchema = yup.object().shape({
  id: yup
    .string()
    .required("Mã số sinh viên không được bỏ trống")
    .matches(/^\d+$/, "Chỉ bao gồm số")
    .min(10, "Phải có ít nhất 10 kí tự"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
      "Mật khẩu phải có ít nhất 1 ký tự viết hoa, 1 ký tự đặc biệt và 1 số (ví dụ: K16@dtvt)"
    )
    .min(8, "Phải có ít nhất 8 kí tự"),
  birth: yup.string().required("Ngày sinh không được bỏ trống")
});
