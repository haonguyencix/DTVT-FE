// import libraries
import { toast } from "react-toastify";

// import const
import { FETCH_STUDENT_SIGN_IN, FETCH_STUDENT_SIGN_UP } from "./classConst";

// import services
import AccountService from "./classroomService";
import { setLocalStorage, sendAccessToken } from "../../services/common";

// import errors
import AccountErrors from "./classErrors";

// import models
import { StudentAccount } from "./account";

// async action
export const studentSignUp = (values, push) => {
  const { id, password, birth, role } = values;
  let studentModel = new StudentAccount(id, password, birth, role);
  return dispatch => {
    dispatch({
      type: FETCH_STUDENT_SIGN_UP["REQUEST"]
    });
    AccountService.studentSignUp(studentModel)
      .then(res => {
        dispatch({
          type: FETCH_STUDENT_SIGN_UP["SUCCESS"],
          payload: res.data.id
        });
        setLocalStorage("studentId", res.data.id);
        toast.success("Đăng ký thành công!");
        push("/verify");
      })
      .catch(err => {
        dispatch({
          type: FETCH_STUDENT_SIGN_UP["FAILURE"]
        });
        AccountErrors.studentSignUpErrors(err);
      });
  };
};

export const studentSignIn = (values, push) => {
  return dispatch => {
    dispatch({
      type: FETCH_STUDENT_SIGN_IN["REQUEST"]
    });
    AccountService.studentSignIn(values)
      .then(res => {
        dispatch({
          type: FETCH_STUDENT_SIGN_IN["SUCCESS"],
          payload: { studentSignIn: res.data }
        });
        setLocalStorage("studentSignIn", res.data);
        sendAccessToken(res.data.token);
        push("/home");
      })
      .catch(err => {
        dispatch({
          type: FETCH_STUDENT_SIGN_IN["FAILURE"]
        });
        AccountErrors.studentSignInErrors(err);
      });
  };
};
