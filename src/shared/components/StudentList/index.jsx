import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getStudentList,
  actFetchStudentList,
} from "core/store/classrooms/classroomAction";
import * as Cookies from "js-cookie";
import { TOKEN } from "shared/constants";
import { sendAccessToken, capitalizeFirstLetterEachWord } from "core/services/utils";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@material-ui/core";

const StudentList = () => {
  const { classroomId } = useParams();
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.classroomData.studentList);

  const renderStudent = studentList.map((item, index) => (
    <TableRow key={item.studentId + index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item.studentId}</TableCell>
      <TableCell>
        {capitalizeFirstLetterEachWord(item.firstName + " " + item.lastName)}
      </TableCell>
      <TableCell>{item.classId.toUpperCase()}</TableCell>
      <TableCell>{item.email}</TableCell>
    </TableRow>
  ));

  useEffect(() => {
    const token = Cookies.get(TOKEN["STUDENT"]);

    if (token) {
      sendAccessToken(token);
      dispatch(getStudentList(classroomId));
    }

    return () => dispatch(actFetchStudentList([], false));
  }, [dispatch, classroomId]);

  return (
    <TableContainer className={styles.Container} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Mã sinh viên</TableCell>
            <TableCell>Họ và tên</TableCell>
            <TableCell>Lớp</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderStudent}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentList;
