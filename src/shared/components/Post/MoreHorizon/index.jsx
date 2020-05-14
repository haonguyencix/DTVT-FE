import React, { useState, useRef, memo } from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IconButton, ClickAwayListener } from "@material-ui/core";
import { MoreHoriz, HighlightOff } from "@material-ui/icons";
import { deletePost } from "core/store/posts/postAction";
import Menu from "shared/components/Menu";

const MoreHorizon = (props) => {
  const { classroomId } = useParams();
  const { postId, postType, haveImgs, haveInteract } = props;

  const dispatch = useDispatch();

  const horizBtn = useRef(null);

  const [open, setOpen] = useState(false);

  const delPost = () => {
    const delObj = {
      postId,
      haveImgs,
      haveInteract,
      postType,
      junctionId: classroomId ? classroomId : "",
    };
    dispatch(deletePost(delObj, horizBtn.current));
  };

  const menuList = [
    { icon: HighlightOff, content: "Xóa bài đăng", event: delPost },
  ];

  const position = { top: 55, right: 0 };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={styles.Container}>
        <IconButton ref={horizBtn} onClick={() => setOpen(!open)}>
          <MoreHoriz />
        </IconButton>
        {open && <Menu menuList={menuList} position={position} arrow="top" />}
      </div>
    </ClickAwayListener>
  );
};

export default memo(MoreHorizon);
