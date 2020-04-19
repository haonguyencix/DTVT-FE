import React from "react";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { TextField, Button, Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { signUp } from "redux/accounts/accountAction";
import { AccountSchema } from "redux/accounts/account";
import InputPassword from "components/InputPassword";
import FabProgress from "components/FabProgress";
import { PATH } from "routes/const";

const SignUpScreen = props => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);

  return (
    <React.Fragment>
      <FabProgress
        className={styles.FabProgress}
        slug={PATH["STUDENT_LOGIN"]}
        icon={PersonAdd}
        title="Trở về trang chủ"
      />
      <div className={styles.Container}>
        <Typography variant="h4" component="h4">
          Đăng ký
        </Typography>
        <p className={styles.Title}>
          Hãy điền đầy đủ và chính xác những thông tin bên dưới nhé!
        </p>
        <Formik
          initialValues={{
            id: "",
            password: "",
            birth: new Date(),
          }}
          validationSchema={AccountSchema}
          onSubmit={values => {
            dispatch(signUp(values, props.history.push, "student"));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue
          }) => {
            return (
              <Form className={styles.Form}>
                <TextField
                  name="id"
                  required
                  fullWidth
                  type="text"
                  margin="normal"
                  variant="outlined"
                  onBlur={handleBlur}
                  label="Mã số sinh viên"
                  autoComplete="username"
                  onChange={handleChange}
                  error={errors.id && touched.id ? true : false}
                  helperText={errors.id && touched.id && errors.id}
                />
                <InputPassword
                  fullWidth={true}
                  id="signUpPassword"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.password && touched.password ? "true" : "false"}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  placeholder="Gồm ít nhất 1 ký tự viết hoa, 1 ký tự đặc biệt và 1 số (vd: K16@dtvt)"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    required
                    fullWidth
                    name="birth"
                    disableFuture
                    margin="normal"
                    variant="dialog"
                    label="Ngày sinh"
                    format="dd/MM/yyyy"
                    value={values.birth}
                    inputVariant="outlined"
                    InputAdornmentProps={{ position: "end" }}
                    onChange={date => setFieldValue("birth", date)}
                  />
                </MuiPickersUtilsProvider>
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.Submit}
                  disabled={isLoading}
                >
                  Đăng ký
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default SignUpScreen;
