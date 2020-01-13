import React from "react";
import styles from "./IntroScreen.module.scss";
import { Link } from "react-router-dom";

// import Material UI
import { Fab, Typography, Button } from "@material-ui/core";
import { Lock } from "@material-ui/icons";

// import images
import FetLogo from "../../../../assets/img/logo-fet.png";

const IntroScreen = () => {
  return (
    <>
      <div className={styles.IconWrapper}>
        <Fab size="large" className={styles.Icon}>
          <Lock fontSize="large" />
        </Fab>
      </div>
      <div className={styles.Container}>
        <img src={FetLogo} alt="FET Logo" width="60px" height="60px" />
        <Typography variant="h4" component="h4">
          Xem điều gì xảy ra trên thế giới ngay bây giờ!
        </Typography>
        <p className={styles.Title}>Tham gia với chúng tôi ngay hôm nay!</p>
        <Link to="/student-signup">
          <Button variant="contained" className={styles.Button} fullWidth>
            Đăng kí
          </Button>
        </Link>
      </div>
    </>
  );
};

export default IntroScreen;
