import * as yup from "yup";

export const accountSchema = yup.object().shape({
  id: yup
    .string()
    .required("Mã số sinh viên không được bỏ trống")
    .min(10, "Phải có ít nhất 10 kí tự")
    .matches(/^\d+$/, "Chỉ được gõ số"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Phải có ít nhất 8 kí tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải có ít nhất 1 ký tự viết hoa, 1 ký tự đặc biệt và 1 số"
    ),
  email: yup
    .string()
    .required("Email không được bỏ trống")
    .email("Email không đúng định dạng"),
  birth: yup.string().required("Ngày sinh không được bỏ trống")
});
