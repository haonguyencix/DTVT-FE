import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

const EmptyAlert = ({ msg, className }) => (
  <div className={clsx(styles.Container, className)}>{msg}</div>
);

export default EmptyAlert;
