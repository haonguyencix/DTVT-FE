import React from "react";
import styles from "./styles.module.scss";

const LectureLoginLayout = (props) => {
  return <div className={styles.Container}>{props.children}</div>;
};

export default LectureLoginLayout;
