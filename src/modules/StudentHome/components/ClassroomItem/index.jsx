import React, { useState, useRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { Avatar, Tooltip } from "@material-ui/core";
import { stringShortcut, getFirstLetter } from "core/services/utils";
import { NavLink } from "react-router-dom";
import LectureAvt from "assets/img/avt-hao.png";
import ClassroomHover from "../ClassroomHover";
import { PATH } from "shared/constants";
import { useSelector } from "react-redux";

const ClassroomItem = (props) => {
  const { id, firstName, lastName, subjectName } = props.item;
  const lecture = firstName + " " + lastName;

  const ClassItem = useRef(null);
  const isFetchClassroom = useSelector(state => state.classroomData.isFetchClassroom)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const left = event.pageX - ClassItem.current.offsetLeft;
    const top = event.pageY - ClassItem.current.offsetTop;
    setMousePosition({
      x: left - 220,
      y: event.clientY < 510 ? top + 20 : top - 220,
    });
  };

  return (
      <NavLink
        ref={ClassItem}
        onMouseMove={handleMouseMove}
        activeClassName={styles.Active}
        to={PATH["STUDENT_CLASSROOM_NEWSFEED"](id, 1)}
        className={clsx(styles.ClassItem, {
          [styles.ClassItemExpand]: isFetchClassroom,
        })}
      >
        <div className={styles.Wrapper}>
          <Tooltip
            title={subjectName.length > 36 ? subjectName : ""}
            placement="top"
            arrow
          >
            <h6 className={styles.ClassName}>
              {stringShortcut(subjectName, 36)}
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
        <span
          className={styles.Hover}
          style={{
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
          }}
        >
          <ClassroomHover classroom={props.item} />
        </span>
      </NavLink>
  );
};

export default ClassroomItem;
