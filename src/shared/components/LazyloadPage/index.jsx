import React from "react";
import styles from "./styles.module.scss";

const LazyloadPage = () => {
  return (
    <>
      <div className={styles.OverlayLoader}></div>
      <div className={styles.Loader}>
        <span className={styles.SugarcubeLazyloadPage}></span>
      </div>
    </>
  );
};

export default LazyloadPage;
