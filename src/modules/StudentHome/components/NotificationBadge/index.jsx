import React from "react";
import { Badge } from "@material-ui/core";
import { useSelector } from "react-redux";

const NotificationBadge = (props) => {
  const numNoti = useSelector((state) => state.postData.numNoti);

  return (
    <Badge color="secondary" badgeContent={numNoti} max={9}>
      {props.children}
    </Badge>
  );
};

export default NotificationBadge;
