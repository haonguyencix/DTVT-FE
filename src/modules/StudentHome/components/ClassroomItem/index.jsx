import React, { useState, useRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { Avatar, Tooltip, ClickAwayListener } from "@material-ui/core";
import { stringShortcut, getFirstLetter } from "core/services/utils";
import { useHistory } from "react-router-dom";
import LectureAvt from "assets/img/avt-hao.png";
import ClassroomHover from "../ClassroomHover";
import Menu from "shared/components/Menu";
import {
  AssignmentInd,
  Description,
  FormatListNumbered,
  Timeline,
  Home,
  AccountCircle,
} from "@material-ui/icons";
import { PATH } from "shared/constants";
import { useSelector } from "react-redux";

const ClassroomItem = (props) => {
  const { item } = props;
  const lecture = item.firstName + " " + item.lastName;

  const history = useHistory();
  const ClassItem = useRef(null);
  const isFetchClassroom = useSelector(state => state.classroomData.isFetchClassroom)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  const routeStudentListPage = () => {
    history.push(PATH["STUDENT_LIST"] + `/${item.id}`);
  }
  
  const menuList = [
    { icon: Home, content: "Bảng tin lớp" },
    { icon: AssignmentInd, content: "Danh sách lớp", event: routeStudentListPage },
    { icon: AccountCircle, content: "Giảng viên" },
    { icon: Description, content: "Tài liệu" },
    { icon: FormatListNumbered, content: "Bài tập" },
    { icon: Timeline, content: "Điểm số" },
  ];

  const position = { top: -1, left: -198 };

  const handleMouseMove = (event) => {
    const left = event.pageX - ClassItem.current.offsetLeft;
    const top = event.pageY - ClassItem.current.offsetTop;
    setMousePosition({
      x: left - 220,
      y: event.clientY < 510 ? top + 20 : top - 220,
    });
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div
        ref={ClassItem}
        className={clsx(styles.ClassItem, {
          [styles.ClassItemExpand]: isFetchClassroom
        })}
        onMouseMove={handleMouseMove}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.Wrapper}>
          <Tooltip
            title={item.subjectName.length > 36 ? item.subjectName : ""}
            placement="top"
            arrow
          >
            <h6 className={styles.ClassName}>
              {stringShortcut(item.subjectName, 36)}
            </h6>
          </Tooltip>
          {false ? (
            <Avatar
              src={LectureAvt}
              className={styles.LectureAvt}
              alt="Ảnh đại diện của giảng viên"
            />
          ) : (
            <Avatar className={styles.LectureAvt}>
              {getFirstLetter(lecture, true, 0)}
            </Avatar>
          )}
        </div>
        <p className={styles.LectureName}>{lecture}</p>
        {open ? (
          <Menu menuList={menuList} position={position} arrow="right" />
        ) : (
          <span
            className={styles.Hover}
            style={{
              top: `${mousePosition.y}px`,
              left: `${mousePosition.x}px`,
            }}
          >
            <ClassroomHover item={item} />
          </span>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ClassroomItem;
