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
  capitalizeFirstLetterEachWord
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
import CopyText from "shared/hocs/CopyText";

const StudentList = (props) => {
  const { role } = props;
  const { classroomId, postType } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading.getStudentsLoad);
  const studentList = useSelector((state) => state.classroomData.studentList);

  const renderStudents = (arr) =>
    arr.map((item, index) => {
      const { studentId, firstName, lastName, classId, email, isLead } = item;
      const optionProps = { studentId, classroomId, isLead, postType };
      return (
        <TableRow key={studentId + index} className={styles.TableRow}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{studentId}</TableCell>
          <TableCell>
            {capitalizeFirstLetterEachWord(firstName + " " + lastName)}
          </TableCell>
          {parseInt(postType) === 1 && <TableCell>{classId.toUpperCase()}</TableCell>}
          <TableCell>
            <CopyText value={email}>
              <span>{email ? "[Đã ẩn đi]" : ""}</span>
            </CopyText>
          </TableCell>
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
                {parseInt(postType) === 1 && <TableCell>Lớp</TableCell>}
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
      dispatch(getStudentList(classroomId, postType));
    }

    return () => dispatch(actFetchStudentList({}, false));
  }, [dispatch, classroomId, postType, role]);

  return (
    <div className={styles.Container}>
      {renderTables}
      {isLoading && <DispatchActLoad height="60vh" />}
    </div>
  );
};

export default StudentList;
