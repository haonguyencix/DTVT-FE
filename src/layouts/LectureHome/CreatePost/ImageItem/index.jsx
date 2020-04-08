import React from "react";
import styles from "./styles.module.scss";
import { Close } from "@material-ui/icons";

const ImageItem = props => {
  return (
    <div className={styles.ImageItems}>
      <div
        className={styles.ImageItem}
        style={{ backgroundImage: `url(${props.url})` }}
      >
        <span className={styles.Position}>{props.position}</span>
        <div className={styles.Overlay}>
          <Close
            className={styles.CloseIcon}
            onClick={() => props.deleteImageItem(props.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageItem;
