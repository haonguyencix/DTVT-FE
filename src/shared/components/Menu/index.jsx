import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

const Menu = (props) => {
  const { menuList, position } = props;

  return (
    <ul
      className={clsx(styles.Menu, {
        [styles[position]]: true,
      })}
    >
      {menuList &&
        menuList.map((item, index) => (
          <li key={index} className={styles.MenuItem}>
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
