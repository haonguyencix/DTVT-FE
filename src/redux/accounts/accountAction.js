import { toast } from "react-toastify";
import { TOKEN, ACCOUNT_ID } from "services/const";
import { setLocalStorage, sendAccessToken } from "services/common";
import { Student, Lecture, NewPassword } from "./account";
import {
  SEND_LOGIN_TOKEN,
  SEND_ACCOUNT_ID,
  SET_CREDENTIAL
} from "./accountType";
import { actCheckLoading } from "components/FabProgress/action";
import AccountService from "./accountService";

const checkWho = role => {
  switch (role) {
    case "lecture":
      return true;
    case "student":
      return false;
    default:
      break;
  }
};

// async action
export const signUp = (values, push, role) => {
  const { id, password, birth } = values;

  const account = checkWho(role)
    ? new Lecture(id, password, role)
    : new Student(id, password, role, birth);

  return dispatch => {
    dispatch(actCheckLoading("REQUEST"));

    AccountService.signUp(account, role)
      .then(res => {
        const { id } = res.data;

        dispatch(actCheckLoading("SUCCESS"));

        dispatch(actSendAccountId(id));

        setLocalStorage(ACCOUNT_ID, id);

        toast.success("Đăng ký thành công!");

        push(`/${role}-verify`);
      })
      .catch(err => {
        dispatch(actCheckLoading("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const login = (values, push, role) => {
  return dispatch => {
    dispatch(actCheckLoading("REQUEST"));

    AccountService.login(values)
      .then(res => {
        const { token } = res.data;

        dispatch(actCheckLoading("SUCCESS"));

        dispatch(actSendLoginToken(token));

        setLocalStorage(checkWho(role) ? TOKEN.LECTURE_LOGIN : TOKEN.STUDENT_LOGIN, token);

        sendAccessToken(token);

        push(`/${role}-home`);
      })
      .catch(err => {
        dispatch(actCheckLoading("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// sau khi login thành công sẽ gửi kèm token qua headers 
// -> có id, role từ token để lấy định danh
export const getCredential = () => {
  return dispatch => {
    AccountService.getCredential()
      .then(res => {
        toast.success(`Chào mừng ${res.data.lastName} đến với FEThub!`);

        dispatch(actSetCredential(res.data));
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const resetPassword = (values, push) => {
  let newPassword = new NewPassword(values.id, values.password);
  return dispatch => {
    dispatch(actCheckLoading("REQUEST"));

    AccountService.resetPassword(newPassword)
      .then(() => {
        dispatch(actCheckLoading("SUCCESS"));

        toast.success("Bạn đã có thể đăng nhập bằng mật khẩu mới!");

        localStorage.clear();

        push("/");
      })
      .catch(err => {
        dispatch(actCheckLoading("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// action creator
export const actSendLoginToken = accountToken => ({
  type: SEND_LOGIN_TOKEN,
  payload: accountToken
});

export const actSendAccountId = accountId => ({
  type: SEND_ACCOUNT_ID,
  payload: accountId
});

export const actSetCredential = credential => ({
  type: SET_CREDENTIAL,
  payload: credential
});
