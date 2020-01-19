import React from "react";
import styles from "./VerifyScreen.module.scss";

// import libraries
import { Formik, Form } from "formik";
import { connect, useDispatch } from "react-redux";

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
import { MailOutline, Send } from "@material-ui/icons";

// import action
import {
  sendOtpToUserByMail,
  verifyOTP
} from "../../../../components/otp/otpAction";

// import const
import { FETCH_OTP_RESEND } from "../../../../components/otp/otpConst";

// import components
import Timer from "../../../atoms/Timer/Timer";

// import logo fethub
import FetHubLogo from "../../../../assets/img/fethub_logo.png";

const VerifyEmailScreen = props => {
  const dispatch = useDispatch();
  const { otpData, studentId } = props;

  return (
    <>
      {props.render({
        slug: "/",
        icon: MailOutline,
        title: "Quay về trang chủ"
      })}
      <div className={styles.Container}>
        <img src={FetHubLogo} width="100px" alt="FEThub Logo" />
        <Typography className={styles.Title} variant="h5" component="h5">
          Cảm ơn bạn đã đến với FEThub!
        </Typography>
        <p className={styles.Text}>
          Vui lòng xác thực địa chỉ email của bạn để tiếp tục. Sau khi nhận được mã xác thực từ chúng tôi qua email,
          bạn hãy nhập chính xác mã xác thực ấy vào ô xác thực để hoàn thành đăng ký nhé!
        </p>
        {otpData.isSubmit && (
          <Formik
            initialValues={{
              id: studentId,
              otp: ""
            }}
            onSubmit={values => {
              dispatch(verifyOTP(values, props.history.replace));
            }}
          >
            {({ handleChange }) => {
              return (
                <Form className={styles.OtpArea}>
                  <FormControl variant="outlined" margin="normal" required>
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
                            disabled={otpData.isLoading}
                          >
                            <Send color="primary" />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      Mã sẽ tồn tại trong{" "}
                      <Timer expirationTime={otpData.expirationTime} />
                      <span
                        type="button"
                        className={styles.ResendOtp}
                        onClick={() => dispatch({ type: FETCH_OTP_RESEND })}
                      >
                        {" "}
                        -> Xác thực lại!
                      </span>
                    </FormHelperText>
                  </FormControl>
                </Form>
              );
            }}
          </Formik>
        )}
        {!otpData.isSubmit && (
          <div>
            <Formik
              initialValues={{
                id: studentId,
                email: ""
              }}
              onSubmit={values => {
                dispatch(sendOtpToUserByMail(values));
              }}
            >
              {({ handleChange }) => {
                return (
                  <Form className={styles.OtpArea}>
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
                      disabled={otpData.isLoading || otpData.isSubmit}
                    >
                      Xác thực địa chỉ email
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </>
  );
};

export default connect(state => ({
  studentId: state.accountData.studentId,
  otpData: state.otpData
}))(VerifyEmailScreen);
