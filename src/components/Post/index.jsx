import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import { Avatar, IconButton } from "@material-ui/core";
import {
  MoreHoriz,
  FavoriteBorder,
  Favorite,
  PlaylistAdd,
  PlaylistAddCheck
} from "@material-ui/icons";
import { _baseURL } from "services/axios";
import { parseISO, formatDistanceToNow } from "date-fns";
import vietnamese from "date-fns/locale/vi";
import { stringShortcut } from "services/common";
import Interact from "components/Interact";

const Post = props => {
  const {
    id,
    avt,
    firstName,
    lastName,
    createdAt,
    postContent,
    images,
    liked,
    isLike
  } = props.item;

  const interactArr = [
    {
      type: "like",
      text: "Thích",
      IconFalse: FavoriteBorder,
      IconTrue: Favorite
    },
    {
      type: "save",
      text: "Lưu",
      IconFalse: PlaylistAdd,
      IconTrue: PlaylistAddCheck
    }
  ];

  const renderInteract = interactArr.map((item, index) => (
    <Interact key={index} item={item} postId={id} isLike={isLike} />
  ));

  // const renderWhoLike = liked.map(item => (
  //   <span key={item.id}>
  //     {item.accountName}
  //   </span>
  // ))

  const [seeMoreState, setSeeMore] = useState({
    isShowAll: false,
    height: 0
  });

  const postParagraph = useRef(null);

  const seeMore = () => {
    setSeeMore({
      ...seeMoreState,
      isShowAll: !seeMoreState.isShowAll,
      height: postParagraph.current.offsetHeight + 200
    });
  };

  const nl2br = str => {
    return str.split("\n").map((item, index, arr) => (
      <React.Fragment key={index}>
        {item} {arr.length - 1 !== index && <br />}
      </React.Fragment>
    ));
  };

  const formatDistance = UTC => {
    const formated = formatDistanceToNow(parseISO(UTC), { locale: vietnamese });
    return formated.charAt(0).toUpperCase() + formated.slice(1);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={styles.Left}>
          <Avatar src={avt} className={styles.AvtImg} alt="Avatar mặc định" />
          <div>
            <h6 className={styles.PostedBy}>{firstName + " " + lastName}</h6>
            <span className={styles.PostedAt}>{formatDistance(createdAt)}</span>
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
          <p
            ref={postParagraph}
            style={{
              height: seeMoreState.isShowAll ? seeMoreState.height : "auto"
            }}
          >
            {nl2br(
              seeMoreState.isShowAll
                ? postContent
                : stringShortcut(postContent, 400)
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
        {images && (
          <img
            className={styles.Img}
            src={images[0] && _baseURL + images[0].imageUrl}
            alt={lastName}
          />
        )}
      </div>
      <div className={styles.Footer}>
        <div className={styles.WhoLike}>
          <img
            height="18"
            width="18"
            alt="trái tim"
            src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e"
          />
          <span>
            {liked && liked.length !== 0 ? liked.length : "Chưa có ai thích"}
          </span>
        </div>
        <div className={styles.Interacts}>{renderInteract}</div>
      </div>
    </div>
  );
};

export default Post;
