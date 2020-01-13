import React from "react";
import styles from "./Slogans.module.scss";

// import Material UI
import { Search, Assignment, GroupWork } from "@material-ui/icons";

const sloganArr = [
  {
    icon: <Search fontSize="large" />,
    text: "Trang thông tin của khoa Điện tử viễn thông."
  },
  {
    icon: <Assignment fontSize="large" />,
    text: "Giúp bạn quản lý học phần theo cách tốt nhất."
  },
  {
    icon: <GroupWork fontSize="large" />,
    text: "Học tập theo một cách khác biệt."
  }
];

const Slogans = () => {

  const _renderSloganItem = _ => {
    return sloganArr.map((item, index) => {
      return (
        <div key={index} className={styles.Item}>
          {item.icon}
          <span className={styles.Text}>{item.text}</span>
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles.Content}>
        <div className={styles.Container}>{_renderSloganItem()}</div>
      </div>
    </>
  );
};

export default Slogans;
