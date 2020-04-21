import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { Container, Avatar, IconButton, Tooltip } from "@material-ui/core";
import { Notifications, Assignment } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { PATH } from "shared/constants";
import AvtDefault from "assets/img/avt-default-2.png";
import Search from "shared/components/Search";
import AccountSetting from "shared/components/AccountSetting";
import NotificationBadge from "modules/StudentHome/components/NotificationBadge";
import FetHubLogo from "assets/img/logo-min.png";

const Header = (props) => {
  const credential = useSelector((state) => state.accountData.credential);

  return (
    <header className={styles.Header}>
      <Container>
        <div className={styles.Rows}>
          <div className={styles.Left}>
            <Link to={props.backHome} className={styles.Logo}>
              <img
                className={styles.LogoImg}
                src={FetHubLogo}
                alt="FEThub Logo"
              />
              <span className={styles.LogoName}>FEThub</span>
            </Link>
          </div>
          <div className={styles.Center}>
            <Search />
          </div>
          <div className={styles.Right}>
            {credential && credential.role === "student" && (
              <Tooltip title="Sơ đồ cây môn học" arrow>
                <Link to={PATH["TREE_SUBJECT"]}>
                  <IconButton className={styles.IconButton}>
                    <Assignment className={styles.Icon} />
                  </IconButton>
                </Link>
              </Tooltip>
            )}
            <Tooltip title="Thông báo" arrow>
              <IconButton className={styles.IconButton}>
                <NotificationBadge>
                  <Notifications className={styles.Icon} />
                </NotificationBadge>
              </IconButton>
            </Tooltip>
            <div className={styles.Avatar}>
              <Avatar
                src={AvtDefault}
                className={styles.AvtImg}
                alt="Avatar mặc định"
              />
              <div className={styles.AccountSetting}>
                <AccountSetting
                  backLogin={props.backLogin}
                  credential={credential}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
