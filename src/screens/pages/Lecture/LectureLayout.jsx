import React from "react";
import styles from "./LectureLayout.module.scss";

const LectureLayout = props => {
  return <div className={styles.Container}>{props.children}</div>;
};

export default LectureLayout;
