import React from "react";
import styles from "./SignIn.module.scss";

// import libraries
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// import Material UI
import { TextField, Button } from "@material-ui/core";

// import components
import InputPassword from "../../../atoms/InputPassword/InputPassword";

// import action and schema
import { studentSignIn } from "../../../../components/accounts/accountAction";

const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <div className={styles.Container}>
        <Formik
          initialValues={{
            id: "",
            password: ""
          }}
          onSubmit={values => {
            dispatch(studentSignIn(values, history.replace));
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
                  required
                />
                <InputPassword
                  id="signInPassword"
                  handleChange={handleChange}
                  fullWidth={false}
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

export default SignIn;
