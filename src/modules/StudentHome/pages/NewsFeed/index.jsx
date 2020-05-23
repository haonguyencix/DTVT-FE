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
import {
  Home,
  AssignmentInd,
  Stars,
  LocalLibrary,
  PermContactCalendar,
  Timeline,
  AlarmOff,
  LibraryBooks,
} from "@material-ui/icons";

const NewsFeed = (props) => {
  const dispatch = useDispatch();
  const change = useSelector((state) => state.classroomData.isFetchClassroom);
  const credential = useSelector((state) => state.accountData.credential);
  const classId = credential ? credential.classId : "";
  const grade = credential ? "Khóa " + credential.classId.slice(4, 6) : "";

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

  const navList = {
    "": [
      { name: "Bảng tin", slug: PATH["STUDENT_POST_LIST"], Icon: Home },
      {
        name: "Diễn đàn sinh viên",
        slug: PATH["STUDENT_POST_SAVED"],
        Icon: LocalLibrary,
      },
      { name: "Đã thích", slug: PATH["STUDENT_POST_SAVED"], Icon: Stars },
    ],
    "Thông báo": [
      { name: "Đăng ký môn", slug: "/hello", Icon: LibraryBooks },
      { name: "Bảng điểm", slug: PATH["STUDENT_POST_SAVED"], Icon: Timeline },
      { name: "Nghỉ học", slug: PATH["STUDENT_POST_SAVED"], Icon: AlarmOff },
    ],
    Nhóm: [
      {
        name: grade,
        slug: PATH["STUDENT_POST_SAVED"],
        Icon: PermContactCalendar,
      },
      {
        name: "Lớp " + classId,
        slug: PATH["STUDENT_CLASSROOM_NEWSFEED"](classId, 2),
        Icon: AssignmentInd,
      },
    ],
    "Câu lạc bộ": [
      { name: "EET - CLB Học thuật", slug: "/hello" },
      { name: "ETEC - CLB Tiếng anh", slug: "/hello" },
    ],
  };

  return (
    <Container>
      <div className={styles.Wrapper}>
        <div className={styles.Navbar}>
          <Navbar navList={navList} />
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
