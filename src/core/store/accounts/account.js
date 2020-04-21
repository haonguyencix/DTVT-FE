// import libraries
import { format } from "date-fns";
import * as yup from "yup";

export class Student {
  constructor(_id, _password, _role, _birth) {
    this.id = _id;
    this.password = _password;
    this.role = _role;
    this.birth = format(_birth, "yyyy-MM-dd");
  }
}

export class Lecture {
  constructor(_id, _password, _role) {
    this.id = _id;
    this.password = _password;
    this.role = _role;
  }
}

export class NewPassword {
  constructor(_id, _newPassword) {
    this.id = _id;
    this.newPassword = _newPassword;
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
    .min(8, "Phải có ít nhất 8 kí tự"),
  birth: yup.string().required("Ngày sinh không được bỏ trống")
});

export const newPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Ô này không được bỏ trống")
    .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
});
