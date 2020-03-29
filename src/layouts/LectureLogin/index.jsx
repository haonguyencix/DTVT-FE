import React from "react";
import styles from "./styles.module.scss";

const LectureLogin = props => {
  return <div className={styles.Container}>{props.children}</div>;
};

export default LectureLogin;
