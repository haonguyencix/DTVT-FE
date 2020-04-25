import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET } from "shared/constants";
import { Container } from "@material-ui/core";
import { actAdjustNumNoti } from "core/store/posts/postAction";
import socket from "core/services/socket";
import Navbar from "modules/StudentHome/components/Navbar";
import Classrooms from "modules/StudentHome/components/Classrooms";
import Notification from "modules/StudentHome/components/Notification";

const NewsFeed = (props) => {
  const dispatch = useDispatch();
  const isFetchStudentList = useSelector(state => state.classroomData.isFetchStudentList)

  useEffect(() => {
    socket.on(SOCKET.CREATE_POST_NOTI, (payload) => {
      toast(<Notification payload={payload} />, {
        autoClose: false,
        closeOnClick: false,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      dispatch(actAdjustNumNoti(+1));
    });
    return () => socket.close();
  }, [dispatch]);

  return (
      <Container>
        <div className={styles.Wrapper}>
          <div className={styles.Navbar}>
            <Navbar />
          </div>
          <div className={clsx(styles.Children, {
            [styles.ChildrenExpand]: isFetchStudentList
          })}>{props.children}</div>
          <div className={clsx(styles.Classrooms, {
            [styles.ClassroomsShrink]: isFetchStudentList
          })}>
            <Classrooms />
          </div>
        </div>
      </Container>
  );
};

export default NewsFeed;
