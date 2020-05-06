import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import Sidebar from "modules/LectureHome/components/Sidebar";

const NewsFeed = (props) => {
  const change = useSelector((state) => state.classroomData.isFetchStudentList);

  return (
    <Container>
      <div className={styles.Wrapper}>
        <div className={styles.Navbar}>Đây là navbar</div>
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
