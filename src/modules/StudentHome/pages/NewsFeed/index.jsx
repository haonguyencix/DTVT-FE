import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET } from "shared/constants";
import { actAdjustNumNoti } from "core/store/posts/postAction";
import socket from "core/services/socket";
import Notification from "modules/StudentHome/components/Notification";
import Sidebar from "modules/StudentHome/components/Sidebar";


const NewsFeed = (props) => {
  const dispatch = useDispatch();
  const change = useSelector((state) => state.classroomData.isFetchClassroom);

  useEffect(() => {
    socket.on(SOCKET.CREATE_POST_NOTI, (payload) => {
      toast(<Notification payload={payload} />, {
        autoClose: 30000,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      dispatch(actAdjustNumNoti(+1));
    });
    return () => socket.close();
  }, [dispatch]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Offset}></div>
      <div
        className={clsx(styles.Children, {
          [styles.ChildrenExpand]: change,
        })}
      >
        {props.children}
      </div>
      <div
        className={clsx(styles.Sidebar, {
          [styles.SidebarShrink]: change,
        })}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default NewsFeed;
