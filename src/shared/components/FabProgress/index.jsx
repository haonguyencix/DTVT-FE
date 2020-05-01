import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fab, Tooltip, CircularProgress } from "@material-ui/core";

const FabProgress = props => {
  const isLoading = useSelector(state => state.isLoading.fabProgess);

  return (
    <div className={props.className}>
      <div className={styles.Wrapper}>
        <Tooltip title={props.title}>
          <Link to={props.slug}>
            <Fab size="large" className={styles.FabIcon}>
              <props.icon fontSize="large" />
            </Fab>
          </Link>
        </Tooltip>
        {isLoading && (
          <CircularProgress size={67} className={styles.FabProgress} />
        )}
      </div>
    </div>
  );
};

export default FabProgress;
