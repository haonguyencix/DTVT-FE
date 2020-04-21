import React from "react";
import styles from "./styles.module.scss";
import { getFirstLetter, formatDistance } from "core/services/utils";
import { Avatar } from "@material-ui/core";
import AvtDefaut from "assets/img/avt-default-2.png";

const Notification = (props) => {
  const { createdBy, createdAt, numImgs } = props.payload;
  console.log(props.payload);

  return (
    <div className={styles.Container}>
      {false ? (
        <Avatar
          src={AvtDefaut}
          className={styles.Avt}
          alt="Ảnh đại diện của giảng viên"
        />
      ) : (
        <Avatar className={styles.Avt}>
          {getFirstLetter(createdBy, true, 0)}
        </Avatar>
      )}
      <div className={styles.Body}>
        <span className={styles.CreatedBy}>{createdBy}</span> đã thêm{" "}
        {numImgs === 0 ? "1 bài viết mới" : numImgs + " ảnh mới"}
        <div className={styles.CreateAt}>{formatDistance(createdAt)}</div>
      </div>
    </div>
  );
};

export default Notification;
