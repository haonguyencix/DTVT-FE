import React from "react";
import styles from "./Header.module.scss";

// import libraries
import { Link } from "react-router-dom";

// import logo fethub
import FetHubLogo from "../../../../assets/img/logo-min.png";

// import material
import {
  Container,
  Avatar,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { Notifications, LibraryBooks } from "@material-ui/icons";

// import avatar default
import AvtDefault from "../../../../assets/img/avt-default-2.png";

// import components
import Search from "../../../atoms/Search/Search";
import AccountSetting from "../../../atoms/AccountSetting/AccountSetting";

const iconButtons = [
  { key: "BOOK_ICON", icon: LibraryBooks, title: "Quản lý học phần" },
  { key: "NOTI_ICON", icon: Notifications, title: "Thông báo" }
];

const Header = props => {
  const renderIconButton = iconButtons.map(item => (
    <Tooltip key={item.key} title={item.title} arrow>
      <IconButton className={styles.IconButton}>
        <item.icon className={styles.Icon} />
      </IconButton>
    </Tooltip>
  ));
  return (
    <header className={styles.Header}>
      <Container>
        <div className={styles.Rows}>
          <div className={styles.Left}>
            <Link to="/home" className={styles.Logo}>
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
            {renderIconButton}
            <div className={styles.Avatar}>
              <Avatar
                src={AvtDefault}
                className={styles.AvtImg}
                alt="Avatar mặc định"
              />
              <div className={styles.AccountSetting}>
                <AccountSetting />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
