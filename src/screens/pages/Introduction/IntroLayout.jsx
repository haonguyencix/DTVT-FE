import React from "react";
import styles from "./IntroLayout.module.scss";
import Slogans from "../../organisms/Introduction/Slogans/Slogans";
import SignIn from "../../organisms/Introduction/SignIn/SignIn";

const IntroLayout = props => {
  return (
    <div className={styles.Container}>
      <div className={styles.Left}>
        <Slogans />
      </div>
      <div className={styles.Right}>
        <div className={styles.Inner}>
          <SignIn />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default IntroLayout;
