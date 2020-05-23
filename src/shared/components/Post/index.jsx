import React, { useState, useRef, Fragment } from "react";
import styles from "./styles.module.scss";
import { Avatar } from "@material-ui/core";
import { stringShortcut, formatDistance } from "core/services/utils";
import Interact from "./Interact";
import MoreHorizon from "./MoreHorizon";
import Gallery from "./Gallery";

const Post = (props) => {
  console.log(props.item)
  const {
    id,
    avt,
    firstName,
    lastName,
    postType,
    createdAt,
    postContent,
    firstImg,
    numImgs,
    numInteract,
    isLike,
  } = props.item;

  const [seeMoreState, setSeeMore] = useState({
    isShowAll: false,
    height: 0,
  });

  const postParagraph = useRef(null);

  const seeMore = () => {
    setSeeMore({
      ...seeMoreState,
      isShowAll: !seeMoreState.isShowAll,
      height: postParagraph.current.offsetHeight + 200,
    });
  };

  const nl2br = (str) => {
    return str.split("\n").map((item, index, arr) => (
      <Fragment key={index}>
        {item} {arr.length - 1 !== index && <br />}
      </Fragment>
    ));
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={styles.Left}>
          <Avatar src={avt} className={styles.AvtImg} alt="Avatar mặc định" />
          <div>
            <h6 className={styles.PostedBy}>{firstName + " " + lastName}</h6>
            <span className={styles.PostedAt}>{createdAt ? formatDistance(createdAt) : ''}</span>
          </div>
        </div>
        <div className={styles.Right}>
          <MoreHorizon
            postId={id}
            postType={postType}
            haveImgs={firstImg || numImgs > 0 ? true : false}
            haveInteract={numInteract > 0 ? true : false}
          />
        </div>
      </div>
      <div className={styles.Body}>
        {postContent && (
          <div className={styles.Content}>
            <p
              ref={postParagraph}
              style={{
                height: seeMoreState.isShowAll ? seeMoreState.height : "auto",
              }}
            >
              {nl2br(
                seeMoreState.isShowAll
                  ? postContent.trim()
                  : stringShortcut(postContent.trim(), 400)
              )}
              {postContent.length > 399 && (
                <span onClick={seeMore}>
                  {!seeMoreState.isShowAll ? "Xem thêm" : ""}
                </span>
              )}
            </p>
            <span onClick={seeMore}>
              {seeMoreState.isShowAll ? "Thu gọn" : ""}
            </span>
          </div>
        )}
        {(firstImg || numImgs > 0) && (
          <Gallery postId={id} numImgs={numImgs} firstImg={firstImg} />
        )}
      </div>
      <Interact postId={id} isLike={isLike} numInteract={numInteract} />
    </div>
  );
};

export default Post;
