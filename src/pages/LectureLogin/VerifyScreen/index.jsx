import React from "react";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText
} from "@material-ui/core";
import { MailOutline, Send } from "@material-ui/icons";
import { sendOTP, verifyOTP } from "redux/otp/otpAction";
import { actCheckSendOtp } from "redux/otp/otpAction";
import Timer from "components/Timer";

import FabProgress from "components/FabProgress";
import { PATH } from "routes/const";

const VerifyScreen = props => {
  const dispatch = useDispatch();
  const lectureId = useSelector(state => state.accountData.accountId);
  const isLoading = useSelector(state => state.isLoading);
  const otpData = useSelector(state => state.otpData);

  return (
    <React.Fragment>
      <div className={styles.Wrapper}>
        <div className={styles.Title}>
          <h2>{otpData.isSend ? "Nhập mã xác thực" : "Nhận mã xác thực"}</h2>
          <span>(Giảng viên)</span>
        </div>
        <div className={styles.FormWrapper}>
          <FabProgress
            className={styles.FabProgress}
            slug={PATH["LECTURE_LOGIN"]}
            icon={MailOutline}
            title="Trở về trang chủ"
          />
          {!otpData.isSend && (
            <div>
              <Formik
                initialValues={{
                  id: lectureId,
                  email: ""
                }}
                onSubmit={values => {
                  dispatch(sendOTP(values));
                }}
              >
                {({ handleChange }) => {
                  return (
                    <Form>
                      <TextField
                        required
                        fullWidth
                        type="email"
                        name="email"
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        autoComplete="email"
                        onChange={handleChange}
                        helperText="Email này phải là email còn đang hoạt động của bạn."
                      />
                      <Button
                        type="submit"
                        className={styles.Submit}
                        fullWidth
                        disabled={isLoading || otpData.isSend}
                      >
                        Xác thực địa chỉ email
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}
          {otpData.isSend && (
            <Formik
              initialValues={{
                id: lectureId,
                otp: ""
              }}
              onSubmit={values => {
                dispatch(verifyOTP(values, props.history.push));
              }}
            >
              {({ handleChange }) => {
                return (
                  <Form>
                    <FormControl
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
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
                      fullWidth
                      onClick={() => dispatch(actCheckSendOtp())}
                    >
                      Gửi lại mã xác thực
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifyScreen;
