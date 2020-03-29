import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { getLocalStorage, sendAccessToken } from "services/common";
import { TOKEN } from "services/const";
import { Container } from "@material-ui/core";
import Header from "./Header";
import Navbar from "./Navbar";
import Classrooms from "./Classrooms";
import { actSendLoginToken } from "redux/accounts/accountAction";
import { getCredential } from "redux/accounts/accountAction";

const StudentHome = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const studentLoginToken = getLocalStorage(TOKEN.STUDENT_LOGIN);

    if (studentLoginToken) {
      dispatch(actSendLoginToken(studentLoginToken));
      sendAccessToken(studentLoginToken);
      dispatch(getCredential());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <Container>
        <div className={styles.Wrapper}>
          <div className={styles.Navbar}>
            <Navbar />
          </div>
          <div className={styles.Children}>{props.children}</div>
          <div className={styles.Classrooms}>
            <Classrooms />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default StudentHome;
