import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";

// import images
import LectureAvt from "assets/img/avt-hao.png";

// import material UI
import { Avatar, Tooltip } from "@material-ui/core";

// import services
import { stringShortcut, getFirstLetter } from "services/common";
import ClassroomHover from "../ClassroomHover";

const Classroom = props => {
  const { item } = props;
  const lecture = item.firstName + " " + item.lastName;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ClassItems = useRef(null);

  const handleMouseMove = event => {
    const left = event.pageX - ClassItems.current.offsetLeft;
    const top = event.pageY - ClassItems.current.offsetTop;
    setMousePosition({
      x: left - 220,
      y: event.clientY < 510 ? top + 20 : top - 220
    });
  };

  return (
    <div
      ref={ClassItems}
      onMouseMove={handleMouseMove}
      className={styles.ClassItems}
    >
      <div className={styles.Wrapper}>
        <Tooltip
          title={item.subjectName.length > 36 ? item.subjectName : ""}
          placement="top"
          arrow
        >
          <h6 className={styles.ClassName}>{stringShortcut(item.subjectName, 36)}</h6>
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
        style={{ top: `${mousePosition.y}px`, left: `${mousePosition.x}px` }}
      >
        <ClassroomHover item={item} />
      </span>
    </div>
  );
};

export default Classroom;
