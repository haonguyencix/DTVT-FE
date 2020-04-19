import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import FetHubLogo from "assets/img/fethub_logo.png";
import FabProgress from "components/FabProgress";
import { PATH } from "routes/const";

const IntroScreen = () => {
  return (
    <React.Fragment>
      <FabProgress
        className={styles.FabProgress}
        slug={PATH["STUDENT_LOGIN"]}
        icon={Lock}
        title="Đăng nhập để mở khóa"
      />
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
          <Link to={PATH["STUDENT_SIGNUP"]} className={styles.BtnSignUp}>
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
