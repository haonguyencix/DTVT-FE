import React, { useEffect, Fragment } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getLocalStorage, sendAccessToken } from "services/common";
import { TOKEN } from "services/const";
import { Container } from "@material-ui/core";
import { actSendLoginToken } from "redux/accounts/accountAction";
import { getCredential } from "redux/accounts/accountAction";
import { SOCKET } from "services/const";
import socket from "services/socket";
import Header from "./Header";
import Navbar from "./Navbar";
import Classrooms from "./Classrooms";
import Notification from "./Notification";
import { actAdjustNumNoti } from "redux/posts/postAction";
import { getClassrooms } from "redux/classrooms/classroomAction";
import { PATH } from "routes/const";

const StudentHome = (props) => {
  const dispatch = useDispatch();

  const redirectTo = {
    loginpage: PATH["STUDENT_LOGIN"],
    homepage: PATH["STUDENT_HOME"],
  };

  useEffect(() => {
    const studentLoginToken = getLocalStorage(TOKEN.STUDENT_LOGIN);

    if (studentLoginToken) {
      dispatch(actSendLoginToken(studentLoginToken));
      sendAccessToken(studentLoginToken);
      dispatch(getCredential());
      dispatch(getClassrooms());
    }
  }, [dispatch]);

  useEffect(() => {
    socket.on(SOCKET.CREATE_POST_NOTI, (payload) => {
      toast(<Notification payload={payload} />, {
        autoClose: false,
        closeOnClick: false,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      dispatch(actAdjustNumNoti(+1));
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Header redirectTo={redirectTo} />
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
    </Fragment>
  );
};

export default StudentHome;
