import React from "react";
import styles from "./styles.module.scss";
import { getLocalStorage } from "core/services/utils";
import { TOKEN, PATH } from "shared/constants";
import { Redirect } from "react-router-dom";

const LectureLoginGuard = props => {
  if (getLocalStorage(TOKEN["LECTURE"])) {
    return <Redirect to={PATH["LECTURE_HOME"]} />
  }

  return <div className={styles.Container}>{props.children}</div>;
};

export default LectureLoginGuard;
