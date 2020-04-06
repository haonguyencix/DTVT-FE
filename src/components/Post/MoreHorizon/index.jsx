import React, { useState, useRef, memo } from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { IconButton, ClickAwayListener } from "@material-ui/core";
import { MoreHoriz, HighlightOff } from "@material-ui/icons";
import { deletePost } from "redux/posts/postAction";

const MoreHorizon = props => {
  const { postId, haveImgs, haveInteract } = props;

  const dispatch = useDispatch();

  const horizBtn = useRef(null);

  const [open, setOpen] = useState(false);

  const delPost = () => {
    const delObj = { postId, haveImgs, haveInteract };
    dispatch(deletePost(delObj, horizBtn.current));
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={styles.Container}>
        <IconButton ref={horizBtn} onClick={() => setOpen(!open)}>
          <MoreHoriz />
        </IconButton>
        {open && (
          <ul className={styles.Menu}>
            <li className={styles.MenuItem}>
              <span className={styles.Item} onClick={() => delPost()}>
                <HighlightOff className={styles.Icon} />
                Xóa bài đăng
              </span>
            </li>
          </ul>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default memo(MoreHorizon);
