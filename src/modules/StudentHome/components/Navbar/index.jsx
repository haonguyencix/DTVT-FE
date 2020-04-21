import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import {
  Home,
  Description,
  AssignmentInd,
  Timeline,
  FormatListNumbered,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { PATH } from "shared/constants";

const Navbar = () => {
  const credential = useSelector((state) => state.accountData.credential);
  const classId = credential ? "Lớp " + credential.classId : "";

  const menuArr = [
    { name: "Bảng tin", slug: PATH["STUDENT_HOME"], icon: Home },
    { name: classId, slug: "/hello", icon: AssignmentInd },
    { name: "Tài liệu", slug: "/uiz", icon: Description },
    { name: "Bài tập", slug: "/uiz", icon: FormatListNumbered },
    { name: "Điểm số", slug: "/ui1z", icon: Timeline },
  ];

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

  return <ul className={styles.Container}>{renderMenuItems}</ul>;
};

export default Navbar;
