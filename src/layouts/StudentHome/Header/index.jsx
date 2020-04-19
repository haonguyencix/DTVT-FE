import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import FetHubLogo from "assets/img/logo-min.png";
import { Container, Avatar, IconButton, Tooltip } from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import AvtDefault from "assets/img/avt-default-2.png";
import Search from "components/Search";
import AccountSetting from "components/AccountSetting";
import NotiBadge from "../NotiBadge";

const Header = (props) => {
  return (
    <header className={styles.Header}>
      <Container>
        <div className={styles.Rows}>
          <div className={styles.Left}>
            <Link to={props.redirectTo.homepage} className={styles.Logo}>
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
            <Tooltip title="Thông báo" arrow>
              <IconButton className={styles.IconButton}>
                <NotiBadge>
                  <Notifications className={styles.Icon} />
                </NotiBadge>
              </IconButton>
            </Tooltip>
            <div className={styles.Avatar}>
              <Avatar
                src={AvtDefault}
                className={styles.AvtImg}
                alt="Avatar mặc định"
              />
              <div className={styles.AccountSetting}>
                <AccountSetting redirectTo={props.redirectTo.loginpage} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
