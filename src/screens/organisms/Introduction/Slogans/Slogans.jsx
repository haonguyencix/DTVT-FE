import React from "react";
import styles from "./Slogans.module.scss";

// import Material UI
import { Search, Assignment, GroupWork } from "@material-ui/icons";

const sloganArr = [
  {
    icon: Search,
    text: "Trang thông tin của khoa Điện tử viễn thông."
  },
  {
    icon: GroupWork,
    text: "Nắm bắt thông tin nhanh chóng và chính xác."
  },
  {
    icon: Assignment,
    text: "Quản lý học phần hiệu quả vượt mong đợi."
  }
];

const Slogans = () => {
  const renderSloganItems = sloganArr.map((item, index) => (
    <div key={index} className={styles.Item}>
      <item.icon fontSize="large" />
      <span className={styles.Text}>{item.text}</span>
    </div>
  ));

  return <div className={styles.Container}>{renderSloganItems}</div>;
};

export default Slogans;
