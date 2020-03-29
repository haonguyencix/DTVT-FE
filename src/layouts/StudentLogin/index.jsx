import React from "react";
import styles from "./styles.module.scss";

// import components
import Slogans from "./Slogans";
import Login from "./Login";

const StudentLogin = props => {
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

export default StudentLogin;
