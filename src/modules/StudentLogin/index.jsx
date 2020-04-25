import React from "react";
import styles from "./styles.module.scss";
import Slogans from "./components/Slogans";
import Login from "./components/Login";

const StudentLoginLayout = props => {
  return (
    <div className={styles.Container}>
      <div className={styles.Left}>
        <Slogans />
      </div>
      <div className={styles.Right}>
        <div className={styles.Inner}>
          <Login />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default StudentLoginLayout;
