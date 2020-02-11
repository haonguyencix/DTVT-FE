import React, { useState } from "react";
import styles from "./Post.module.scss";

// import material
import { Avatar, IconButton, Button } from "@material-ui/core";
import {
  MoreHoriz,
  FavoriteBorder,
  Favorite,
  PlaylistAdd,
  PlaylistAddCheck
} from "@material-ui/icons";

const Post = props => {
  const { avt, postedBy, postedAt, content, attachment } = props.item;

  const [isLike, setIsLike] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const nl2br = str => {
    return str.split("\n").map((item, index, arr) => (
      <React.Fragment key={index}>
        {item} {arr.length - 1 !== index && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={styles.Left}>
          <Avatar src={avt} className={styles.AvtImg} alt="Avatar mặc định" />
          <div>
            <h6 className={styles.PostedBy}>{postedBy}</h6>
            <span className={styles.PostedAt}>{postedAt}</span>
          </div>
        </div>
        <div className={styles.Right}>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </div>
      </div>
      <div className={styles.Body}>
        <div className={styles.Content}>
          <p>{nl2br(content)}</p>
        </div>
        <img className={styles.Img} src={attachment} alt={postedBy} />
      </div>
      <div className={styles.Footer}>
        <div className={styles.IconButtons}>
          <div>
            <Button
              variant="text"
              color="inherit"
              className={[
                styles.IconButton,
                `${isLike ? styles.IsTrue : styles.IsFalse}`
              ].join(" ")}
              onClick={() => setIsLike(!isLike)}
              startIcon={
                !isLike ? (
                  <FavoriteBorder className={styles.IsFalse} />
                ) : (
                  <Favorite className={styles.IsTrue} />
                )
              }
            >
              Thích
            </Button>
          </div>
          <div>
            <Button
              variant="text"
              color="inherit"
              className={[
                styles.IconButton,
                `${isSave ? styles.IsTrue : styles.IsFalse}`
              ].join(" ")}
              onClick={() => setIsSave(!isSave)}
              startIcon={
                !isSave ? (
                  <PlaylistAdd className={styles.IsFalse} />
                ) : (
                  <PlaylistAddCheck className={styles.IsTrue} />
                )
              }
            >
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
