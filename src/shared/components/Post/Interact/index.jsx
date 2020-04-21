import React, { useState, memo, Fragment } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import { interactPost } from "core/store/posts/postAction";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import debounce from "lodash.debounce";

let timeout;

const Interact = props => {
  const { postId, isLike, numInteract } = props;

  const [interact, setInteract] = useState(isLike);
  const [countLike, setCountLike] = useState(numInteract);

  const handleInteract = () => {
    setInteract(!interact);
    setCountLike(interact ? countLike - 1 : countLike + 1);
    
    timeout && timeout.cancel();

    timeout = debounce(() => {
      interactPost({ postId, status: interact ? "unlike" : "like" });
    }, 500);

    timeout();
  };

  return (
    <Fragment>
      <div className={styles.WhoLike}>
        <img
          height="18"
          width="18"
          alt="trái tim"
          src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e"
        />
        <span>
          {countLike !== 0 ? interact ? countLike === 1 ? "Bạn đã thích" : `Bạn và ${countLike - 1} người khác đã thích` : countLike : "Chưa có ai thích"}
        </span>
      </div>
      <div className={styles.Interacts}>
        <Button
          variant="text"
          color="inherit"
          className={clsx(styles.IconButton, {
            [styles.IsTrue]: interact
          })}
          onClick={handleInteract}
          startIcon={
            interact ? (
              <Favorite className={styles.IsTrue} />
            ) : (
              <FavoriteBorder />
            )
          }
        >
          Yêu thích
        </Button>
      </div>
    </Fragment>
  );
};

export default memo(Interact);
