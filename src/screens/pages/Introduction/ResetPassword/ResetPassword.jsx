import React from "react";
import styles from "./ResetPassword.module.scss";

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
import { ContactSupport, Send } from "@material-ui/icons";

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
import FabProgress from "../../../atoms/FabProgress/FabProgress";

const ResetPassword = props => {
  const dispatch = useDispatch();
  const { otpData, studentId } = props;

  return (
    <React.Fragment>
      <FabProgress slug="/" icon={ContactSupport} title="Đăng nhập để mở khóa" />
      <div className={styles.Container}>
        <img src={FetHubLogo} width="100px" alt="FEThub Logo" />
        <Typography className={styles.Title} variant="h5" component="h5">
          Đừng lo lắng! Chúng tôi sẽ giúp bạn.
        </Typography>
        <p className={styles.Text}>
            Hãy nhập địa chỉ email mà bạn đã đăng kí với tài khoản của mình vào ô bên dưới nhé!
        </p>
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
                      helperText="Email này phải là email mà bạn đã đăng kí với tài khoản của bạn."
                    />
                    <Button
                      type="submit"
                      className={styles.Submit}
                      disabled={otpData.isLoading}
                    >
                      Đặt lại mật khẩu
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
    </React.Fragment>
  );
};

export default connect(state => ({
  otpData: state.otpData
}))(ResetPassword);
