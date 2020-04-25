import React, { useState, useRef, memo } from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { IconButton, ClickAwayListener } from "@material-ui/core";
import { MoreHoriz, HighlightOff } from "@material-ui/icons";
import { deletePost } from "core/store/posts/postAction";
import Menu from "shared/components/Menu";

const MoreHorizon = props => {
  const { postId, haveImgs, haveInteract } = props;

  const dispatch = useDispatch();

  const horizBtn = useRef(null);

  const [open, setOpen] = useState(false);

  const delPost = () => {
    const delObj = { postId, haveImgs, haveInteract };
    dispatch(deletePost(delObj, horizBtn.current));
  };

  const menuList = [
    { icon: HighlightOff, content: "Xóa bài đăng", event: delPost }
  ]

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={styles.Container}>
        <IconButton ref={horizBtn} onClick={() => setOpen(!open)}>
          <MoreHoriz />
        </IconButton>
        {open && <Menu menuList={menuList} position="bottom" />}
      </div>
    </ClickAwayListener>
  );
};

export default memo(MoreHorizon);
