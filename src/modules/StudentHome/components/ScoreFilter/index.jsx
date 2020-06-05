import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { FormControlLabel, Switch, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actAdjustToggleC, actResetScoresDefault, actSetReset } from "core/store/scores/scoreAction";

const filterNavArr = [
  { status: "total", title: "Tất cả" },
  { status: "success", title: "Đã đạt", className: styles.StatusSuccess },
  { status: "fail", title: "Chưa đạt", className: styles.StatusFail },
  {
    status: "warning",
    title: "Nên cải thiện",
    className: styles.StatusWarning,
  },
];

const ScoreFilter = ({ expand, totalScores, totalCredits, totalSubjects }) => {
  const dispatch = useDispatch();
  const toggleC = useSelector((state) => state.scoreData.toggleC);

  const renderFilterNav = (filterNavArr || []).map((key, index) => (
    <li key={index}>
      <span className={key.className}>
        <b>{key.title}</b>
      </span>
      : {totalSubjects[key.status]} môn - {totalCredits[key.status]} tín chỉ
    </li>
  ));

  const accScore =
    Math.round((totalScores / totalCredits["total"]) * 100) / 100;

  const handleChange = () => {
    dispatch(actAdjustToggleC(!toggleC));
  };

  const handleReset = () => {
    dispatch(actResetScoresDefault())
    dispatch(actSetReset(true));
  }

  return (
    <div
      className={clsx(styles.Container, {
        [styles.OpenInfo]: !expand,
      })}
    >
      {!expand && (
        <Fragment>
          <div className={styles.ToggleC}>
            <FormControlLabel
              label={`${toggleC ? "Tắt" : "Bật"} chỉnh sửa điểm C`}
              control={
                <Switch
                  color="primary"
                  checked={toggleC}
                  onChange={handleChange}
                />
              }
            />
          </div>
          <ul className={styles.Filter}>
            {renderFilterNav}
            <li>
              Điểm tích lũy:&nbsp;
              <b>{!isNaN(accScore) ? accScore : "đợi tí nha..."}</b>
            </li>
          </ul>
          <Button fullWidth className={styles.BtnReset} onClick={handleReset}>Trở về mặc định</Button>
        </Fragment>
      )}
    </div>
  );
};

export default ScoreFilter;
