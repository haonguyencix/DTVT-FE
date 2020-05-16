import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET, PATH } from "shared/constants";
import { Container } from "@material-ui/core";
import { actAdjustNumNoti } from "core/store/posts/postAction";
import socket from "core/services/socket";
import Navbar from "shared/components/Navbar";
import Notification from "modules/StudentHome/components/Notification";
import Sidebar from "modules/StudentHome/components/Sidebar";
import { Home, AssignmentInd, Stars } from "@material-ui/icons";

const NewsFeed = (props) => {
  const dispatch = useDispatch();
  const change = useSelector((state) => state.classroomData.isFetchClassroom);
  const credential = useSelector((state) => state.accountData.credential);
  const classId = credential ? "Lớp " + credential.classId : "";

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

  const menuList = [
    { name: "Bảng tin", slug: PATH["STUDENT_POST_LIST"], icon: Home },
    { name: classId, slug: "/hello", icon: AssignmentInd },
    { name: "Đã thích", slug: PATH["STUDENT_POST_SAVED"], icon: Stars },
  ];

  return (
    <Container>
      <div className={styles.Wrapper}>
        <div className={styles.Navbar}>
          <Navbar menuList={menuList} />
        </div>
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
    </Container>
  );
};

export default NewsFeed;
