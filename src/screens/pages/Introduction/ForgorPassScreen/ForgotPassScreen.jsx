import React from "react";
import styles from "./ForgotPassScreen.module.scss";

// import libraries
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";

// import Material UI
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText
} from "@material-ui/core";
import { ContactSupport, Send, ArrowForward } from "@material-ui/icons";

// import action
import {
  sendOtpForgotPassword,
  loginResetPassword
} from "../../../../components/otp/otpAction";

// import const
import { FETCH_IS_SEND } from "../../../../components/otp/otpConst";

// import components
import Timer from "../../../atoms/Timer/Timer";
import FabProgress from "../../../atoms/FabProgress/FabProgress";

// import logo fethub
import FetHubLogo from "../../../../assets/img/fethub_logo.png";

const ForgotPassScreen = props => {
  const dispatch = useDispatch();
  const studentId = useSelector(state => state.accountData.studentId);
  const isLoading = useSelector(state => state.isLoading);
  const otpData = useSelector(state => state.otpData);

  return (
    <React.Fragment>
      <FabProgress slug="/" icon={ContactSupport} title="Trở về trang chủ" />
      <div className={styles.Container}>
        <img className={styles.Logo} src={FetHubLogo} alt="FEThub Logo" />
        <Typography className={styles.Title} variant="h5" component="h5">
          Đừng lo lắng! Chúng tôi sẽ giúp bạn.
        </Typography>
        {!otpData.isSend && (
          <React.Fragment>
            <p className={styles.Text}>
              Hãy nhập vào mã số sinh viên để tìm tài khoản của bạn!
            </p>
            <Formik
              initialValues={{
                id: ""
              }}
              onSubmit={values => {
                dispatch(sendOtpForgotPassword(values));
              }}
            >
              {({ handleChange }) => {
                return (
                  <Form>
                    <TextField
                      name="id"
                      required
                      fullWidth
                      type="text"
                      margin="normal"
                      variant="outlined"
                      label="Mã số sinh viên"
                      autoComplete="username"
                      onChange={handleChange}
                    />
                    <Button
                      type="submit"
                      className={styles.Submit}
                      disabled={isLoading || otpData.isSend}
                    >
                      Tìm tài khoản
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </React.Fragment>
        )}
        {otpData.isSend && (
          <React.Fragment>
            <p className={styles.Text}>
              Chúng tôi đã gửi một mã xác thực vào email: {otpData.email}
            </p>
            <a
              className={styles.GoToEmail}
              href="https://mail.google.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <ArrowForward className={styles.ArrowIcon} />
              <span>Đi đến Email của bạn!</span>
            </a>
            <Formik
              initialValues={{
                id: studentId,
                otp: ""
              }}
              onSubmit={values => {
                dispatch(loginResetPassword(values, props.history.push));
              }}
            >
              {({ handleChange }) => {
                return (
                  <Form>
                    <FormControl
                      variant="outlined"
                      margin="normal"
                      required
                      className={styles.FormControl}
                    >
                      <InputLabel htmlFor="otp">Mã OTP</InputLabel>
                      <OutlinedInput
                        id="otp"
                        type="tel"
                        name="otp"
                        label="Mã OTP"
                        labelWidth={70}
                        autoComplete="otp"
                        variant="outlined"
                        onChange={handleChange}
                        inputProps={{ maxLength: 6 }}
                        endAdornment={
                          <InputAdornment position="start">
                            <IconButton
                              edge="end"
                              type="submit"
                              disabled={isLoading}
                            >
                              <Send color="primary" />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText>
                        Mã sẽ tồn tại trong{" "}
                        <Timer expirationTime={otpData.expirationTime} />
                      </FormHelperText>
                    </FormControl>
                    <Button
                      type="button"
                      className={styles.Submit}
                      onClick={() => dispatch({ type: FETCH_IS_SEND })}
                    >
                      Gửi lại mã xác thực
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ForgotPassScreen;
