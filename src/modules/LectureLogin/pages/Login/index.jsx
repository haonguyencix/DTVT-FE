import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { Lock, PersonAdd } from "@material-ui/icons";
import InputPassword from "shared/components/InputPassword";
import FabProgress from "shared/components/FabProgress";
import { login, signUp } from "core/store/accounts/accountAction";
import { PATH } from "shared/constants";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hadAccount, setHadAccount] = useState(true);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Title}>
        <h2>{hadAccount ? "Đăng nhập FEThub" : "Đăng ký tài khoản"}</h2>
        <span>(Giảng viên)</span>
      </div>
      <div className={styles.FormWrapper}>
        <FabProgress
          className={styles.FabProgress}
          slug={PATH["STUDENT_LOGIN"]}
          icon={hadAccount ? Lock : PersonAdd}
          title="Trở về trang chủ"
        />
        <Formik
          initialValues={{
            id: "",
            password: ""
          }}
          onSubmit={values => {
            dispatch(
              hadAccount
                ? login(values, history.push, "lecture")
                : signUp(values, history.push, "lecture")
            );
          }}
        >
          {({ handleChange }) => {
            return (
              <Form className={styles.Form}>
                <TextField
                  label="Mã số giảng viên"
                  variant="outlined"
                  type="text"
                  name="id"
                  onChange={handleChange}
                  autoComplete="username"
                  margin="normal"
                  className={styles.TextField}
                  helperText={
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setHadAccount(!hadAccount)}
                    >
                      {hadAccount
                        ? "Chưa có tài khoản?"
                        : "<- Trở về đăng nhập"}
                    </span>
                  }
                  fullWidth
                  required
                />
                <InputPassword
                  id="signInPassword"
                  handleChange={handleChange}
                  fullWidth={true}
                  className={styles.TextField}
                />
                <Button
                  className={styles.Submit}
                  type="submit"
                  variant="outlined"
                  fullWidth
                >
                  {hadAccount ? "Đăng nhập" : "Đăng ký"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
