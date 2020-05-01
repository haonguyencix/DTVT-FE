import React from "react";
import styles from "./styles.module.scss";

const DispatchActLoad = (props) => {
  const { height } = props;
  return (
    <div className={styles.DispatchActLoad} style={{ height }}>
      <div className={styles.Container}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default DispatchActLoad;
