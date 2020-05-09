import React from "react";
import styles from "./styles.module.scss";
import { WatchLater } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { PATH } from "shared/constants";

const ClassroomItem = (props) => {
  const { id, times } = props.classroom;
  const { groupName } = props;

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
    <NavLink
      to={PATH["LECTURE_CLASSROOM"](id)}
      className={styles.Container}
      activeClassName={styles.Active}
    >
      <span className={styles.Line}></span>
      <span className={styles.Content}>{groupName}</span>
      <div className={styles.Hover}>
        <div>
          <WatchLater className={styles.Icon} />
          <ul>{renderTime}</ul>
        </div>
      </div>
    </NavLink>
  );
};

export default ClassroomItem;
