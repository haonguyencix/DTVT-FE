import React from "react";
import styles from "./IntroScreen.module.scss";
import { Link } from "react-router-dom";

// import Material UI
import { Typography, Button } from "@material-ui/core";
import { Lock } from "@material-ui/icons";

// import logo fethub
import FetHubLogo from "../../../../assets/img/fethub_logo.png";
import FabProgress from "../../../atoms/FabProgress/FabProgress";

const IntroScreen = () => {
  return (
    <React.Fragment>
      <FabProgress slug="/" icon={Lock} title="Đăng nhập để mở khóa" />
      <div className={styles.Container}>
        <img className={styles.Logo} src={FetHubLogo} alt="FEThub Logo" />
        <Typography className={styles.Title} variant="h5" component="h5">
          Cập nhật những thông tin mới nhất từ khoa Điện tử viễn thông!
        </Typography>
        <p className={styles.SubTitle}>
          Đăng ký tham gia với FEThub ngay hôm nay!
        </p>
        <div className={styles.Buttons}>
          <Button className={styles.BtnSignIn} variant="contained">
            Đăng nhập
          </Button>
          <Link to="/student-signup" className={styles.BtnSignUp}>
            <Button variant="contained" fullWidth>
              Đăng ký
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IntroScreen;
