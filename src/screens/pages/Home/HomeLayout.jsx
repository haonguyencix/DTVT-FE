import React, { useEffect } from "react";
import styles from "./HomeLayout.module.scss";
import { useDispatch } from "react-redux";
import { getLocalStorage, sendAccessToken } from "../../../services/common";

// import const
import { FETCH_STUDENT_SIGN_IN } from "../../../components/accounts/accountConst";

// import components
import Header from "../../organisms/Home/Header/Header";
import Navbar from "../../organisms/Home/Navbar/Navbar";
// import Footer from "../../organisms/Home/Footer/Footer";
import Classrooms from "../../organisms/Home/Classrooms/Classrooms";

// import Material UI
import { Container } from "@material-ui/core";

const HomeLayout = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const studentSignIn = getLocalStorage("studentSignIn");

    if (studentSignIn) {
      dispatch({
        type: FETCH_STUDENT_SIGN_IN,
        payload: { studentSignIn }
      });
      sendAccessToken(studentSignIn.token);
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
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default HomeLayout;
