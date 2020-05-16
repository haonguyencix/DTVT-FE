import React, { memo } from "react";
import styles from "./styles.module.scss";
import { Avatar } from "@material-ui/core";
import LectureAvt from "assets/img/avt-default-2.png";
import { stringShortcut, getFirstLetter } from "core/services/utils";
import {
  WatchLater,
  VpnKey,
  GroupWork,
  CollectionsBookmark,
} from "@material-ui/icons";

const ClassroomHover = (props) => {
  const {
    subjectId,
    theory,
    practice,
    times,
    subjectName,
    firstName,
    lastName,
    credits,
  } = props.classroom;

  const leadZero = (value) => {
    if (value < 10) return "0" + value;
    return value;
  };

  const temp = practice ? " - Thực hành" + leadZero(practice) : "";
  const groupName = "Nhóm " + leadZero(theory) + temp;

  const lecture = firstName + " " + lastName;

  const renderTime = times.map((item, index) => {
    const { day, start, count, room } = item;

    const session = () => {
      if(1 <= start <= 5 ) return "Sáng";
      if(6 <= start <= 10) return "Chiều";
      if(11 <= start <= 13) return "Tối";
    };

    return (
      <div key={index}>
       {session()} thứ {day}: tiết {start}-{start + (count - 1)} - phòng: {room}.
      </div>
    );
  });

  const classroomInfoArr = [
    { icon: VpnKey, content: subjectId },
    { icon: CollectionsBookmark, content: `${credits} tín chỉ` },
    { icon: GroupWork, content: `${groupName}` },
    { icon: WatchLater, content: <div>{renderTime}</div> },
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
          <h6>{stringShortcut(subjectName, 40)}</h6>
          <span className={styles.Lecture}>{lecture}</span>
        </div>
      </li>
      {renderInfoItem}
    </ul>
  );
};

export default memo(ClassroomHover);
