import React, { memo } from "react";
import styles from "./styles.module.scss";
import { Avatar } from "@material-ui/core";
import LectureAvt from "assets/img/avt-default-2.png";
import { stringShortcut, getFirstLetter } from "services/common";
import { WatchLater, Room, VpnKey, GroupWork } from "@material-ui/icons";

const ClassroomHover = props => {
  const { time, name, lecture } = props.item;

  const renderTime = Object.keys(time).map((day, index) => (
    <span key={index}>
      {index > 0 && ";"} Thứ {day}: tiết{" "}
      {time[day].map((period, i) => (i > 0 && "-") + period)}
    </span>
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
      <li className={styles.InfoItem}>
        <span className={styles.Content}>
          <VpnKey className={styles.Icon} />
          Mã 850322
        </span>
      </li>
      <li className={styles.InfoItem}>
        <span className={styles.Content}>
          <GroupWork className={styles.Icon} />
          Nhóm 01 - Thực hành 02
        </span>
      </li>
      <li className={styles.InfoItem}>
        <span className={styles.Content}>
          <Room className={styles.Icon} />
          Phòng C.D102
        </span>
      </li>
      <li className={styles.InfoItem}>
        <span className={styles.Content}>
          <WatchLater className={styles.Icon} />
          {renderTime}
        </span>
      </li>
    </ul>
  );
};

export default memo(ClassroomHover);
