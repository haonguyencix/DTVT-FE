import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import {
  AssignmentInd,
  Description,
  FormatListNumbered,
  Timeline,
  Home,
  WatchLater,
} from "@material-ui/icons";
import Menu from "shared/components/Menu";
import { ClickAwayListener } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { PATH } from "shared/constants";

const ClassroomItem = (props) => {
  const { id, theory, practice, times } = props.item;

  const history = useHistory();

  const [open, setOpen] = useState(false);

  const cloneTheory = theory
    ? `Nhóm ${theory < 10 ? "0" + theory : theory}`
    : "";

  const clonePractice = practice
    ? ` - Thực hành ${practice < 10 ? "0" + practice : practice}`
    : "";

const routeStudentListPage = () => {
    history.push(PATH["LECTURE_STUDENT_LIST"] + `/${id}`);
  };

  const menuList = [
    { icon: Home, content: "Bảng tin lớp" },
    { icon: AssignmentInd, content: "Danh sách lớp", event: routeStudentListPage },
    { icon: Description, content: "Tài liệu" },
    { icon: FormatListNumbered, content: "Bài tập" },
    { icon: Timeline, content: "Điểm số" },
  ];

  const position = { top: -14, right: 61 };

  const renderTime = times.map((item, index) => {
    const { day, start, count, room } = item;

    const session = () => {
      if (1 <= start <= 5) return "Sáng";
      if (6 <= start <= 10) return "Chiều";
      if (11 <= start <= 13) return "Tối";
    };

    return (
      <li key={index}>
        <b>
          {session()} thứ {day}
        </b>
        : tiết {start} -> {start + (count - 1)} - phòng: {room}
      </li>
    );
  });

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={styles.Container} onClick={() => setOpen(!open)}>
        <span className={styles.Line}></span>
        <span
          className={clsx(styles.Content, {
            [styles.Active]: open,
          })}
        >
          {cloneTheory + clonePractice}
        </span>
        {open ? (
          <Menu menuList={menuList} position={position} arrow="left" />
        ) : (
          <div className={styles.Hover}>
            <div>
              <WatchLater className={styles.Icon} />
              <ul>{renderTime}</ul>
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ClassroomItem;
