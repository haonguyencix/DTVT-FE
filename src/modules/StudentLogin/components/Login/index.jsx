import React from "react";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { TextField, Button, Typography } from "@material-ui/core";
import InputPassword from "shared/components/InputPassword";
import { login } from "core/store/accounts/accountAction";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <div className={styles.Container}>
        <Typography variant="h4" component="h4" className={styles.Typography}>
          Đăng nhập
        </Typography>
        <Formik
          initialValues={{
            id: "",
            password: ""
          }}
          onSubmit={values => {
            dispatch(login(values, history.push, "student"));
          }}
        >
          {({ handleChange }) => {
            return (
              <Form className={styles.Form}>
                <TextField
                  label="Mã số sinh viên"
                  variant="outlined"
                  type="text"
                  name="id"
                  onChange={handleChange}
                  autoComplete="username"
                  margin="normal"
                  className={styles.TextField}
                  required
                />
                <InputPassword
                  id="signInPassword"
                  handleChange={handleChange}
                  fullWidth={false}
                  className={styles.TextField}
                />
                <Button
                  className={styles.Submit}
                  type="submit"
                  variant="outlined"
                >
                  Đăng nhập
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Login;
