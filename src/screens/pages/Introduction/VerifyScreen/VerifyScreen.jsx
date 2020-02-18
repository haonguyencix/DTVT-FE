import React from "react";
import styles from "./VerifyScreen.module.scss";

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
import { MailOutline, Send } from "@material-ui/icons";

// import action
import {
  sendOTP,
  verifyOTP
} from "../../../../components/otp/otpAction";

// import const
import { FETCH_IS_SEND } from "../../../../components/otp/otpConst";

// import components
import Timer from "../../../atoms/Timer/Timer";

// import logo fethub
import FetHubLogo from "../../../../assets/img/fethub_logo.png";
import FabProgress from "../../../atoms/FabProgress/FabProgress";

const VerifyScreen = props => {
  const dispatch = useDispatch();
  const studentId = useSelector(state => state.accountData.studentId);
  const isLoading = useSelector(state => state.isLoading)
  const otpData = useSelector(state => state.otpData);

  return (
    <React.Fragment>
      <FabProgress slug="/" icon={MailOutline} title="Đăng nhập để mở khóa" />
      <div className={styles.Container}>
        <img className={styles.Logo} src={FetHubLogo} alt="FEThub Logo" />
        <Typography className={styles.Title} variant="h5" component="h5">
          Cảm ơn bạn đã đến với FEThub!
        </Typography>
        <p className={styles.Text}>
          Vui lòng xác thực địa chỉ email của bạn để tiếp tục. Sau khi nhận được
          mã xác thực từ chúng tôi qua email, bạn hãy nhập chính xác mã xác thực
          ấy vào ô xác thực để hoàn thành đăng ký nhé!
        </p>
        {!otpData.isSend && (
          <div>
            <Formik
              initialValues={{
                id: studentId,
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
              id: studentId,
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
        )}
      </div>
    </React.Fragment>
  );
};

export default VerifyScreen;
