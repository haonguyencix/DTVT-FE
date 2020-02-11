import React from "react";
import styles from "./Navbar.module.scss";

// import libraries
import { NavLink } from "react-router-dom";

// import material UI
import { Avatar, Tooltip } from "@material-ui/core";
import { Home, Face, Flag } from "@material-ui/icons";

// import services
import { stringShortcut, getFirstLetter } from "../../../../services/common";

const menuArr = [
  { name: "Bảng tin", slug: "/home", icon: Home },
  { name: "Đoàn - Hội", slug: "/uiz", icon: Flag },
  { name: "Diễn đàn sinh viên", slug: "/hello", icon: Face }
];

const clubArr = [
  { name: "EET - Clb Học thuật", slug: "/hello" },
  { name: "ETEC - Clb Tiếng anh", slug: "/hello" }
];

const Navbar = () => {
  const renderMenuItems = menuArr.map((item, index) => (
    <li key={index} className={styles.LinkItem}>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
        to={item.slug}
      >
        <item.icon className={styles.Icon} />
        {item.name}
      </NavLink>
    </li>
  ));

  const renderClubs = clubArr.map((item, index) => (
    <li key={index}>
      <Tooltip title={item.name.length > 20 ? item.name : ""}>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.NavLinkActive}
          to={item.slug}
        >
          <Avatar className={styles.Avt}>{getFirstLetter(item.name, false, 0)}</Avatar>
          {stringShortcut(item.name, 20)}
        </NavLink>
      </Tooltip>
    </li>
  ));

  return (
    <ul className={styles.Container}>
      {renderMenuItems}
      <h3 className={styles.Subheader}>CÂU LẠC BỘ</h3>
      {renderClubs}
      {/* API GET club list */}
    </ul>
  );
};

export default Navbar;
