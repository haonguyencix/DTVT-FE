import React, { useEffect } from "react";
import styles from "./ResetPassScreen.module.scss";

// import libraries
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// import Material UI
import { Button, Typography } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";

// import component
import InputPassword from "../../../atoms/InputPassword/InputPassword";
import FabProgress from "../../../atoms/FabProgress/FabProgress";

// import logo fethub
import FetHubLogo from "../../../../assets/img/fethub_logo.png";

// import action
import { resetPassword } from "../../../../components/accounts/accountAction";

// import service
import { sendAccessToken, getLocalStorage } from "../../../../services/common";

// import const
import { FETCH_TOKEN_RESET_PASSWORD } from "../../../../components/otp/otpConst";

const ResetPassScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const studentId = useSelector(state => state.accountData.studentId);
  const isLoading = useSelector(state => state.isLoading);

  useEffect(() => {
    const token = getLocalStorage("token");
    if (token) {
      dispatch({
        type: FETCH_TOKEN_RESET_PASSWORD,
        payload: token
      });
      sendAccessToken(token);
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <FabProgress slug="/" icon={Autorenew} title="Trở về trang chủ" />
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

export default ResetPassScreen;
