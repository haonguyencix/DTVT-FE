import React from "react";
import styles from "./SignUpScreen.module.scss";

// import libraries
import { Formik, Form } from "formik";
import { withRouter} from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";

// import Material UI
import { TextField, Button, Typography, Fab } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

// import action and schema
import { studentSignUp } from "../../../../components/accounts/accountAction";
import { accountSchema } from "../../../../components/accounts/accountSchema";

// import components
import InputPassword from "../../../atoms/InputPassword/InputPassword";

const SignUpScreen = props => {
  return (
    <>
      <div className={styles.PersonAddWrapper}>
        <Fab size="large" className={styles.PersonAddFab}>
          <PersonAdd fontSize="large" />
        </Fab>
      </div>
      <div className={styles.Container}>
        <Typography variant="h4" component="h4">
          Đăng kí
        </Typography>
        <p className={styles.Title}>Tham gia với chúng tôi ngay hôm nay!</p>
        <Formik
          initialValues={{
            id: "",
            password: "",
            email: "",
            birth: new Date(),
            role: ["student"]
          }}
          validationSchema={accountSchema}
          onSubmit={values => {
            studentSignUp(values, props.history.replace);
          }}
        >
          {({
            handleChange,
            handleBlur,
            errors,
            touched,
            values,
            setFieldValue
          }) => {
            return (
              <Form className={styles.Form}>
                <TextField
                  error={errors.id && touched.id ? true : false}
                  label="Mã số sinh viên"
                  variant="outlined"
                  type="text"
                  name="id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="username"
                  margin="normal"
                  required
                  fullWidth
                  helperText={errors.id && touched.id ? errors.id : ""}
                />
                <InputPassword
                  error={errors.password && touched.password ? "true" : "false"}
                  id="signUpPassword"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Gồm ít nhất 1 ký tự viết hoa, 1 ký tự đặc biệt và 1 số (vd: K16@dtvt)"
                  fullWidth={true}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
                <TextField
                  error={errors.email && touched.email ? true : false}
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  margin="normal"
                  required
                  fullWidth
                  helperText={errors.email && touched.email && errors.email}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    label="Ngày sinh"
                    variant="dialog"
                    name="birth"
                    inputVariant="outlined"
                    margin="normal"
                    value={values.birth}
                    format="dd/MM/yyyy"
                    InputAdornmentProps={{ position: "end" }}
                    onChange={date => setFieldValue("birth", date)}
                    required
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
                <Button
                  className={styles.Submit}
                  type="submit"
                  variant="contained"
                >
                  Đăng kí
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default withRouter(SignUpScreen);
