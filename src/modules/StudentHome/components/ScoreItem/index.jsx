import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import WordScores from "modules/StudentHome/components/WordScores";
import { TableRow, TableCell } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutline, Cancel } from "@material-ui/icons";

const checkStatus = {
  fail: <Cancel className={styles.StatusFail} />,
  warning: <ErrorOutline className={styles.StatusWarning} />,
  success: <CheckCircleOutline className={styles.StatusSuccess} />,
};

const ScoreItem = ({ item, expand }) => {
  const {
    subjectId,
    subjectName,
    credits,
    endPercent,
    midScore,
    endScore,
    average,
    four,
    status,
  } = item;

  return (
    <TableRow className={styles.TableRow}>
      {expand && <TableCell>{subjectId}</TableCell>}
      <TableCell>{subjectName}</TableCell>
      <TableCell align="center">{credits}</TableCell>
      {expand && (
        <Fragment>
          <TableCell align="center">{100 - endPercent}</TableCell>
          <TableCell align="center">{endPercent}</TableCell>
          <TableCell align="center">
            {midScore !== null ? midScore : "Chưa có"}
          </TableCell>
          <TableCell align="center">
            {endScore !== null ? endScore : "Chưa có"}
          </TableCell>
        </Fragment>
      )}
      <TableCell align="center">{Math.round(average * 100) / 100}</TableCell>
      <TableCell align="center">
        <WordScores
          expand={expand}
          initial={four}
          credits={credits}
          subjectId={subjectId}
          condition={midScore !== null && endScore !== null}
        />
      </TableCell>
      <TableCell align="center">
        {midScore !== null && endScore !== null
          ? checkStatus[status]
          : "Chưa xét"}
      </TableCell>
    </TableRow>
  );
};

export default ScoreItem;
