import React from "react";
import styles from "./FabProgress.module.scss";

// import libraries
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import Material UI
import { Fab, Tooltip, CircularProgress } from "@material-ui/core";

const FabProgress = props => {
  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <Tooltip title={props.title}>
          <Link to={props.slug}>
            <Fab size="large" className={styles.FabIcon}>
              <props.icon fontSize="large" />
            </Fab>
          </Link>
        </Tooltip>
        {props.isLoading && (
          <CircularProgress size={67} className={styles.FabProgress} />
        )}
      </div>
    </div>
  );
};

export default connect(state => ({
  isLoading: state.accountData.isLoading || state.otpData.isLoading
}))(FabProgress);
