import React, { useState, memo } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { interactPost } from "redux/posts/postAction";
import debounce from "lodash.debounce";

let timeout;

const Interact = props => {
  const { type, text, IconFalse, IconTrue } = props.item;

  const dispatch = useDispatch();

  const [interact, setInteract] = useState({
    like: props.isLike,
    save: false
  });

  const handleInteract = () => {
    setInteract({ ...interact, [type]: !interact[type] });

    const interactObj = {
      postId: props.postId,
      status: interact[type] ? "un" : "do",
      type: type
    };

    timeout && timeout.cancel();

    timeout = debounce(() => {
      dispatch(interactPost(interactObj));
    }, 500);

    timeout();
  };

  return (
    <Button
      variant="text"
      color="inherit"
      className={clsx(styles.IconButton, {
        [styles.IsTrue]: interact[type]
      })}
      onClick={handleInteract}
      startIcon={
        interact[type] ? <IconTrue className={styles.IsTrue} /> : <IconFalse />
      }
    >
      {text}
    </Button>
  );
};

export default memo(Interact);
