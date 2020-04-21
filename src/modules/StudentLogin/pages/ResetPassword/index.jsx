import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import { resetPassword } from "core/store/accounts/accountAction";
import { TOKEN, PATH } from "shared/constants";
import { sendAccessToken, getLocalStorage } from "core/services/utils";
import { actSendResetPasswordToken } from "core/store/otp/otpAction";
import InputPassword from "shared/components/InputPassword";
import FabProgress from "shared/components/FabProgress";
import FetHubLogo from "assets/img/fethub_logo.png";

const ResetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const studentId = useSelector(state => state.accountData.accountId);
  const isLoading = useSelector(state => state.isLoading);

  useEffect(() => {
    const token = getLocalStorage(TOKEN["RESET_PASSWORD"]);
    if (token) {
      dispatch(actSendResetPasswordToken(token));
      sendAccessToken(token);
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <FabProgress
        className={styles.FabProgress}
        slug={PATH["STUDENT_LOGIN"]}
        icon={Autorenew}
        title="Trở về trang chủ"
      />
      <div className={styles.Container}>
        <img className={styles.Logo} src={FetHubLogo} alt="FEThub Logo" />
        <Typography className={styles.Title} variant="h5" component="h5">
          Tạo mật khẩu mới
        </Typography>
        <p className={styles.Text}>
          Mật khẩu mới phải có ít nhất 8 ký tự. Mật khẩu mạnh là mật khẩu được
          kết hợp từ các ký tự, số và dấu câu. VD: K16@dtvt
        </p>
        <Formik
          initialValues={{
            id: studentId,
            password: ""
          }}
          onSubmit={values => {
            dispatch(resetPassword(values, history.push));
          }}
        >
          {({ handleBlur, handleChange }) => {
            return (
              <Form>
                <InputPassword
                  fullWidth={true}
                  id="resetPassword"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <Button
                  type="submit"
                  className={styles.Submit}
                  disabled={isLoading}
                >
                  Đổi mật khẩu
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
