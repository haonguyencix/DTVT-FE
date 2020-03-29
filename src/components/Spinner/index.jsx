import React from "react";
import styles from "./styles.module.scss";

const Spinner = () => {
  return (
    <>
      <div className={styles.OverlayLoader}></div>
      <div className={styles.Loader}>
        <span className={styles.SugarcubeSpinner}></span>
      </div>
    </>
  );
};

export default Spinner;
