import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  const { menuList } = props;

  return (
    <ul className={styles.Container}>
      {menuList.map((item, index) => (
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
      ))}
    </ul>
  );
};

export default Navbar;
