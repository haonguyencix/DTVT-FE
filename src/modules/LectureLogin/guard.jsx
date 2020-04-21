import React from "react";
import styles from "./styles.module.scss";
import { TOKEN, PATH } from "shared/constants";
import { Redirect } from "react-router-dom";
import * as Cookies from "js-cookie";

const LectureLoginGuard = props => {
  if (Cookies.get(TOKEN["LECTURE"])) {
    return <Redirect to={PATH["LECTURE_HOME"]} />
  }

  return <div className={styles.Container}>{props.children}</div>;
};

export default LectureLoginGuard;
