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
  } = props.item;
  const clonePractice = practice ? ` - Thực hành ${practice}` : "";
  const lecture = firstName + " " + lastName;

  const renderTime = times.map((item, index) => (
    <div key={index}>
      Thứ {item.day}: tiết {item.start}-{item.start + (item.count - 1)} - phòng: {item.room}.
    </div>
  ));

  const classroomInfoArr = [
    { icon: VpnKey, content: subjectId },
    { icon: CollectionsBookmark, content: `${credits} tín chỉ` },
    { icon: GroupWork, content: `Nhóm ${theory + clonePractice}` },
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
