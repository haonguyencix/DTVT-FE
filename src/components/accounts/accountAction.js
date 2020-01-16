// import libraries
import { toast } from "react-toastify";

// import const
import { FETCH_STUDENT_ID, FETCH_STUDENT_SIGN_IN } from "./accountConst";

// import services
import AccountService from "./accountService";
import {
  asyncCall,
  setLocalStorage,
  sendAccessToken
} from "../../services/common";

// import models
import { StudentAccount } from "./account";

// async action
export const studentSignUp = (values, replace) => {
  const { id, password, birth, role } = values;
  let studentModel = new StudentAccount(id, password, birth, role);
  return dispatch => {
    AccountService.studentSignUp(studentModel)
      .then(res => {
      console.log("TCL: studentSignUp -> res", res)
        dispatch({
          type: FETCH_STUDENT_ID,
          payload: id
        });
        setLocalStorage("studentId", id);
        toast.success("Đăng ký thành công!");
        replace("/verify-email");
      })
      .catch(err => {
        console.log("TCL: studentSignUp -> err.response.data.message", err.response.data.message)
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
      });
  };
};

export const studentSignIn = (values, replace) => {
  return dispatch => {
    dispatch({
      type: FETCH_STUDENT_SIGN_IN["REQUEST"]
    });
    AccountService.studentSignIn(values)
      .then(res => {
      console.log("TCL: studentSignIn -> res", res)
        setLocalStorage("studentSignIn", res.data);
        sendAccessToken(res.data.token);
        asyncCall(1000)
          .then(() => dispatch({
            type: FETCH_STUDENT_SIGN_IN["SUCCESS"],
            payload: { studentSignIn: res.data }
          }))
          .then(() => {
            toast.success("Đăng nhập thành công!");
            replace("/home");
          });
      })
      .catch(err => {
        asyncCall(1000)
          .then(() =>
            dispatch({
              type: FETCH_STUDENT_SIGN_IN["FAILURE"]
            })
          )
          .then(() => {
            console.log("TCL: studentSignIn -> err.response.data.message", err.response.data.message)
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
          });
      });
  };
};
