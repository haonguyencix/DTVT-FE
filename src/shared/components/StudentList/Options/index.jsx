import React, { useState, useRef, memo } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { IconButton, ClickAwayListener } from "@material-ui/core";
import { MoreHoriz, ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import { appointLead } from "core/store/classrooms/classroomAction";
import Menu from "shared/components/Menu";

const Options = (props) => {
  const { studentId, classroomId, isLead } = props.data;
  const dispatch = useDispatch();
  const horizBtn = useRef(null);
  const [open, setOpen] = useState(false);

  const appointLeadFunc = () => {
    dispatch(
      appointLead(
        studentId,
        classroomId,
        isLead ? "dismiss" : "appoint",
        horizBtn.current
      )
    );
  };

  const menuList = [
    {
      icon: isLead ? ThumbDownAlt : ThumbUpAlt,
      content: `${isLead ? "Bỏ chỉ định" : "Chỉ định"} làm quản trị viên`,
      event: appointLeadFunc,
    },
  ];

  const position = { top: 40, right: 0 };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={clsx(styles.Container, props.className, {
        [styles.Active]: open
      })}>
        <IconButton
          size="small"
          ref={horizBtn}
          onClick={() => setOpen(!open)}
          className={styles.IconButton}
        >
          <MoreHoriz />
        </IconButton>
        {open && (
          <Menu
            menuList={menuList}
            position={position}
            width={260}
            arrow="top"
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default memo(Options);
