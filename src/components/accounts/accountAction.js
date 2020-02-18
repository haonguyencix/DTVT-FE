// import libraries
import { toast } from "react-toastify";

// import const
import { FETCH_STUDENT_SIGN_IN, FETCH_STUDENT_ID } from "./accountConst";
import { FETCH_LOADING } from "../../store/Loading/const";

// import services
import AccountService from "./accountService";
import { setLocalStorage } from "../../services/common";

// import errors
import AccountErrors from "./accountErrors";

// import models
import { StudentAccount, NewPassword } from "./account";

// async action
export const studentSignUp = (values, push) => {
  const { id, password, birth, role } = values;
  let studentModel = new StudentAccount(id, password, birth, role);
  return dispatch => {
    dispatch({
      type: FETCH_LOADING["REQUEST"]
    });
    AccountService.studentSignUp(studentModel)
      .then(res => {
        dispatch({
          type: FETCH_LOADING["SUCCESS"]
        });
        dispatch({
          type: FETCH_STUDENT_ID,
          payload: res.data.id
        });
        setLocalStorage("studentId", res.data.id);
        toast.success("Đăng ký thành công!");
        push("/verify");
      })
      .catch(err => {
        dispatch({
          type: FETCH_LOADING["FAILURE"]
        });
        AccountErrors.studentSignUpErrors(err);
      });
  };
};

export const studentSignIn = (values, push) => {
  return dispatch => {
    dispatch({
      type: FETCH_LOADING["REQUEST"]
    });
    AccountService.studentSignIn(values)
      .then(res => {
        const studentData = res.data;
        dispatch({
          type: FETCH_LOADING["SUCCESS"]
        });
        dispatch({
          type: FETCH_STUDENT_SIGN_IN,
          payload: { studentSignIn: studentData }
        });
        setLocalStorage("studentSignIn", studentData);
        toast.success(
          `Chào mừng ${studentData.profile &&
            studentData.profile.lastName} đến với FEThub!`
        );
        push("/home");
      })
      .catch(err => {
        dispatch({
          type: FETCH_LOADING["FAILURE"]
        });
        AccountErrors.studentSignInErrors(err);
      });
  };
};

export const resetPassword = (values, push) => {
  let newPassword = new NewPassword(values.id, values.password);
  return dispatch => {
    dispatch({
      type: FETCH_LOADING["REQUEST"]
    });
    AccountService.resetPassword(newPassword)
      .then(res => {
        dispatch({
          type: FETCH_LOADING["SUCCESS"]
        });
        toast.success("Bạn đã có thể đăng nhập bằng mật khẩu mới!");
        push("/");
      })
      .catch(err => {
        dispatch({
          type: FETCH_LOADING["FAILURE"]
        });
        AccountErrors.resetPasswordErrors(err);
      });
  };
};
