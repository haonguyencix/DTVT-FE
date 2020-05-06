import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

const Menu = (props) => {
  const { menuList, arrow, width } = props;
  const { top, right, bottom, left } = props.position;

  return (
    <ul
      className={clsx(styles.Menu, {
        [styles[arrow]]: true,
      })}
      style={{ top, bottom, left, right, width }}
    >
      {menuList &&
        menuList.map((item, index) => (
          <li
            key={index}
            className={styles.MenuItem}
          >
            <span
              className={styles.Item}
              onClick={() => (item.event ? item.event() : {})}
            >
              <item.icon className={styles.Icon} />
              {item.content}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default Menu;
