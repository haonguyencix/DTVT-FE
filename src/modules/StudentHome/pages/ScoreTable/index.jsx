import React, { useEffect, useState, Fragment } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getScores } from "core/store/scores/scoreAction";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  IconButton,
} from "@material-ui/core";
import { Menu, MenuOpen } from "@material-ui/icons";
import ScoreItem from "modules/StudentHome/components/ScoreItem";

const ScoreTable = () => {
  const dispatch = useDispatch();
  const scoresDisplay = useSelector((state) => state.scoreData.scoresDisplay);
  const scoresReal = useSelector((state) => state.scoreData.scoresReal);

  const [expand, setExpand] = useState(false);

  useEffect(() => {
    dispatch(getScores());
  }, [dispatch]);

  let totalScores = 0;
  let totalCreditsSemester = {};
  let totalScoresSemester = {};
  let totalSubjects = { total: 0, success: 0, fail: 0, warning: 0 };
  let totalCredits = { total: 0, success: 0, fail: 0, warning: 0 };

  for(let item of scoresReal) {
    totalScores += item.four;
    totalCredits['total'] += item.credits;
    totalCredits[item.status] += item.credits;
    if(item.credits) totalSubjects[item.status] += 1;
    totalCreditsSemester[item.id] ? totalCreditsSemester[item.id] += item.credits : totalCreditsSemester[item.id] = item.id ? item.credits : 0;
    totalScoresSemester[item.id] ? totalScoresSemester[item.id] += item.four : totalScoresSemester[item.id] = item.id ? item.four : 0;
  }
  totalSubjects['total'] = scoresReal.length;

  const renderTables = Object.keys(scoresDisplay).map((key, index) => {
    const semester = `Học kỳ ${key.substring(key.length - 1)}`;
    const schoolYear = `Năm học 20${key.substring(0, 2)}-20${key.substring(2,4)}`;
    const title = semester + " - " + schoolYear;

    const scoreTemp = parseFloat(totalScoresSemester[key] / totalCreditsSemester[key]);
    const averageScore = Math.round(scoreTemp * 100) / 100
    return (
      <Fragment key={index}>
        {scoresDisplay[key].length && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={10} className={styles.GroupHead}>
                <div>
                  <span>{title}</span>
                  <span>Điểm tích lũy: {!isNaN(averageScore) ? `${averageScore} / ${totalCreditsSemester[key]} tín chỉ` : "chưa xét"}</span>
                </div>
              </TableCell>
            </TableRow>
            {scoresDisplay[key].map((v, i) => (
              <ScoreItem
                key={i}
                item={v}
                expand={expand}
              />
            ))}
          </TableBody>
        )}
      </Fragment>
    );
  });

  const filterNavArr = [
    { status: 'total', title: 'Tất cả' },
    { status: 'success', title: 'Đã đạt', className: styles.StatusSuccess },
    { status: 'fail', title: 'Chưa đạt', className: styles.StatusFail },
    { status: 'warning', title: 'Nên cải thiện', className: styles.StatusWarning },
  ]

  const renderFilterNav = (filterNavArr || []).map((key, index) => (
    <li key={index}><span className={key.className}><b>{key.title}</b></span>: {totalSubjects[key.status]} môn - {totalCredits[key.status]} tín chỉ</li>
  ));

  const accScore = Math.round((totalScores / totalCredits['total']) * 100) / 100

  return (
    <div className={styles.Container}>
      <TableContainer
        className={clsx(styles.TableContainer, {
          [styles.TableShrink]: !expand,
          [styles.TableExpand]: expand,
        })}
        component={Paper}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {expand && <TableCell>Mã MH</TableCell>}
              <TableCell>Tên môn học</TableCell>
              <TableCell>TC</TableCell>
              {expand && (
                <Fragment>
                  <TableCell>% QT</TableCell>
                  <TableCell>% Thi</TableCell>
                  <TableCell>Điểm QT</TableCell>
                  <TableCell>Điểm thi</TableCell>
                </Fragment>
              )}
              <TableCell>Hệ 10</TableCell>
              <TableCell>Hệ 4</TableCell>
              <TableCell>
                <IconButton onClick={() => setExpand((prev) => !prev)}>
                  {expand ? <MenuOpen /> : <Menu />}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          {renderTables}
        </Table>
      </TableContainer>
      <div
        className={clsx(styles.Info, {
          [styles.OpenInfo]: !expand,
        })}
      >
        {!expand && (
          <ul className={styles.Filter}>{renderFilterNav}<li>Điểm tích lũy: <b>{!isNaN(accScore) ? accScore : 'đợi tí nha...'}</b></li></ul>
        )}
      </div>
    </div>
  );
};

export default ScoreTable;
