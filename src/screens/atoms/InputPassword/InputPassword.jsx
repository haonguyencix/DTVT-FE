import React, { useState } from "react";
import { Link } from "react-router-dom";

// import Material UI
import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const InputPassword = props => {
  const [showPassword, setShowPassword] = useState(false);

  const isTrueSet = value => {
    return value === "true";
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <FormControl
      error={isTrueSet(props.error)}
      className={props.className}
      variant="outlined"
      required
      fullWidth={props.fullWidth}
      margin="normal"
    >
      <InputLabel htmlFor={props.id}>Mật khẩu</InputLabel>
      <OutlinedInput
        id={props.id}
        type={showPassword ? "text" : "password"}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        name="password"
        autoComplete="password"
        placeholder={props.placeholder}
        labelWidth={80}
        endAdornment={
          <InputAdornment position="start">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {props.id === "signInPassword" && (
        <FormHelperText>
          <Link to="/reset-password">Quên mật khẩu?</Link>
        </FormHelperText>
      )}
      {isTrueSet(props.error) && (
        <FormHelperText>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default InputPassword;
