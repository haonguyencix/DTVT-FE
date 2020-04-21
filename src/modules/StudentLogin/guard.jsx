import React from "react";
import styles from "./styles.module.scss";
import Slogans from "./components/Slogans";
import Login from "./components/Login";
import { PATH, TOKEN } from "shared/constants";
import { getLocalStorage } from "core/services/utils";
import { Redirect } from "react-router-dom";

const StudentLoginGuard = props => {
  if (getLocalStorage(TOKEN["STUDENT"])) {
    return <Redirect to={PATH["STUDENT_HOME"]} />;
  }

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

export default StudentLoginGuard;
