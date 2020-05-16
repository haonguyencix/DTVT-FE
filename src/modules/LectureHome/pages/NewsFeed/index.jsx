import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { Home, Description, FormatListNumbered, Timeline } from "@material-ui/icons";
import { PATH } from "shared/constants";
import Sidebar from "modules/LectureHome/components/Sidebar";
import Navbar from "shared/components/Navbar";

const NewsFeed = (props) => {
  const change = useSelector((state) => state.classroomData.isFetchClassroom);

  const menuList = [
    { name: "Bảng tin", slug: PATH["LECTURE_POST_LIST"], icon: Home },
    { name: "Tài liệu", slug: "/uiz", icon: Description },
    { name: "Bài tập", slug: "/uiz", icon: FormatListNumbered },
    { name: "Điểm số", slug: "/ui1z", icon: Timeline },
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
