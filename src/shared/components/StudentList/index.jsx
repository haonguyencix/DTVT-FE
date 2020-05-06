import React, { useEffect, Fragment } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getStudentList,
  actFetchStudentList,
} from "core/store/classrooms/classroomAction";
import * as Cookies from "js-cookie";
import { TOKEN } from "shared/constants";
import {
  sendAccessToken,
  capitalizeFirstLetterEachWord,
  stringShortcut,
} from "core/services/utils";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@material-ui/core";
import DispatchActLoad from "../DispatchActLoad";
import EmptyAlert from "../EmptyAlert";
import Options from "./Options";

const StudentList = (props) => {
  const { role } = props;
  const { classroomId } = useParams();
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.classroomData.studentList);
  const isLoading = useSelector((state) => state.isLoading.getStudentsLoad);

  const renderStudents = (arr) =>
    arr.map((item, index) => {
      const { studentId, firstName, lastName, classId, email, isLead } = item;
      const optionProps = { studentId, classroomId, isLead };
      return (
        <TableRow key={studentId + index} className={styles.TableRow}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{studentId}</TableCell>
          <TableCell>
            {capitalizeFirstLetterEachWord(firstName + " " + lastName)}
          </TableCell>
          <TableCell>{classId.toUpperCase()}</TableCell>
          <TableCell>{email ? stringShortcut(email, 26) : ""}</TableCell>
          {role === "LECTURE" && (
            <TableCell>
              <Options className={styles.Options} data={optionProps} />
            </TableCell>
          )}
        </TableRow>
      );
    });

  const renderTables = Object.keys(studentList).map((key, index) => (
    <Fragment key={index}>
      <h6 className={styles.Title}>{key}</h6>
      {studentList[key].length ? (
        <TableContainer className={styles.TableContainer} component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Mã sinh viên</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Email</TableCell>
                {role === "LECTURE" && <TableCell></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>{renderStudents(studentList[key])}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyAlert msg={`Vẫn chưa có ${key.toLowerCase()}`} />
      )}
    </Fragment>
  ));

  useEffect(() => {
    const token = Cookies.get(TOKEN[role]);

    if (token) {
      sendAccessToken(token);
      dispatch(getStudentList(classroomId));
    }

    return () => dispatch(actFetchStudentList([], false));
  }, [dispatch, classroomId, role]);

  return (
    <div className={styles.Container}>
      {renderTables}
      {isLoading && <DispatchActLoad height={200} />}
    </div>
  );
};

export default StudentList;
