import React, { memo } from "react";
import styles from "./styles.module.scss";
import { Avatar } from "@material-ui/core";
import LectureAvt from "assets/img/avt-default-2.png";
import { stringShortcut, getFirstLetter } from "services/common";
import { WatchLater, Room, VpnKey, GroupWork } from "@material-ui/icons";

const ClassroomHover = (props) => {
  const { time, name, lecture } = props.item;

  const renderTime = time.map((item, index) => (
    <span key={index}>
      {index > 0 && ";"} Thứ {item.day}: tiết {item.start}-{item.start + item.count}
    </span>
  ));

  const classroomInfoArr = [
    { icon: VpnKey, content: "Mã 850322" },
    { icon: GroupWork, content: "Nhóm 01 - Thực hành 02" },
    { icon: Room, content: "Phòng C.D102" },
    { icon: WatchLater, content: renderTime },
  ];

  const renderInfoItem = classroomInfoArr.map((item, index) => (
    <li key={index} className={styles.InfoItem}>
      <span className={styles.Content}>
        <item.icon className={styles.Icon} />
        {item.content}
      </span>
    </li>
  ));

  return (
    <ul className={styles.Container}>
      <li className={styles.Header}>
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
        <div>
          <h6>{stringShortcut(name, 40)}</h6>
          <span className={styles.Lecture}>{lecture}</span>
        </div>
      </li>
      {renderInfoItem}
    </ul>
  );
};

export default memo(ClassroomHover);
