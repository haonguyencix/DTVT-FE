import React from "react";
import styles from "./IntroScreen.module.scss";
import { Link } from "react-router-dom";

// import Material UI
import { Typography, Button } from "@material-ui/core";
import { Lock } from "@material-ui/icons";

// import logo fethub
import FetHubLogo from "../../../../assets/img/fethub_logo.png";

const IntroScreen = props => {
  return (
    <>
      {props.render({ slug: "/", icon: Lock, title: "Đăng nhập để mở khóa" })}
      <div className={styles.Container}>
        <img src={FetHubLogo} alt="FEThub Logo" width="100px" />
        <Typography className={styles.Title} variant="h5" component="h5">
          Bạn đã thật sự quản lý hoạt các động học tập của mình một cách tốt
          nhất?
        </Typography>
        <p className={styles.SubTitle}>Tham gia với FEThub ngay hôm nay!</p>
        <Link to="/student-signup">
          <Button className={styles.Button} variant="contained" fullWidth>
            Đăng kí
          </Button>
        </Link>
      </div>
    </>
  );
};

export default IntroScreen;
