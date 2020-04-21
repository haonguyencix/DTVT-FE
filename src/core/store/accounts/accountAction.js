import { toast } from "react-toastify";
import { setLocalStorage, sendAccessToken } from "core/services/utils";
import { Student, Lecture, NewPassword } from "./account";
import {
  SEND_LOGIN_TOKEN,
  SEND_ACCOUNT_ID,
  SET_CREDENTIAL,
  CLEAR_STORE,
} from "./accountType";
import { actCheckFabProgress } from "../loading/loadingAction";
import AccountService from "./accountService";
import { TOKEN, ACCOUNT_ID, PATH } from "shared/constants";

const checkWho = { lecture: true, student: false };

// async action
export const signUp = (values, push, role) => {
  const { id, password, birth } = values;

  const account = checkWho[role]
    ? new Lecture(id, password, role)
    : new Student(id, password, role, birth);

  return (dispatch) => {
    dispatch(actCheckFabProgress("REQUEST"));

    AccountService.signUp(account, role)
      .then((res) => {
        const { id } = res.data;

        dispatch(actCheckFabProgress("SUCCESS"));

        dispatch(actSendAccountId(id));

        setLocalStorage(ACCOUNT_ID, id);

        toast.success("Đăng ký thành công!");

        push(checkWho[role] ? PATH["LECTURE_VERIFY"] : PATH["STUDENT_VERIFY"]);
      })
      .catch((err) => {
        dispatch(actCheckFabProgress("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const login = (values, push, role) => {
  return (dispatch) => {
    dispatch(actCheckFabProgress("REQUEST"));

    AccountService.login(values)
      .then((res) => {
        const { token } = res.data;

        dispatch(actCheckFabProgress("SUCCESS"));

        dispatch(actSendLoginToken(token));

        setLocalStorage(
          checkWho[role] ? TOKEN["LECTURE"] : TOKEN["STUDENT"],
          token
        );

        sendAccessToken(token);

        push(checkWho[role] ? PATH["LECTURE_HOME"] : PATH["STUDENT_HOME"]);
      })
      .catch((err) => {
        dispatch(actCheckFabProgress("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// sau khi login thành công sẽ gửi kèm token qua headers
// -> có id, role từ token để lấy định danh
export const getCredential = () => {
  return (dispatch) => {
    AccountService.getCredential()
      .then((res) => {
        dispatch(actSetCredential(res.data));
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const resetPassword = (values, push) => {
  let newPassword = new NewPassword(values.id, values.password);
  return (dispatch) => {
    dispatch(actCheckFabProgress("REQUEST"));

    AccountService.resetPassword(newPassword)
      .then(() => {
        dispatch(actCheckFabProgress("SUCCESS"));

        toast.success("Bạn đã có thể đăng nhập bằng mật khẩu mới!");

        localStorage.clear();

        push(PATH["STUDENT_LOGIN"]);
      })
      .catch((err) => {
        dispatch(actCheckFabProgress("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// action creator
export const actSendLoginToken = (accountToken) => ({
  type: SEND_LOGIN_TOKEN,
  payload: accountToken,
});

export const actSendAccountId = (accountId) => ({
  type: SEND_ACCOUNT_ID,
  payload: accountId,
});

export const actSetCredential = (credential) => ({
  type: SET_CREDENTIAL,
  payload: credential,
});

export const actClearStore = () => ({ type: CLEAR_STORE });
