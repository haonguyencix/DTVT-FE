import React, { Fragment, useEffect } from "react";
import styles from "./styles.module.scss";
import Header from "shared/components/Header";
import { sendAccessToken } from "core/services/utils";
import { actSendLoginToken } from "core/store/accounts/accountAction";
import { getCredential } from "core/store/accounts/accountAction";
import { TOKEN, PATH } from "shared/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  Home,
  AssignmentInd,
  Stars,
  LocalLibrary,
  Assignment,
  PermContactCalendar,
  Timeline,
  AlarmOff,
  LibraryBooks,
} from "@material-ui/icons";
import { Container } from "@material-ui/core";
import Navbar from "shared/components/Navbar";
import * as Cookies from "js-cookie";

const StudentHomeLayout = (props) => {
  const dispatch = useDispatch();

  const credential = useSelector((state) => state.accountData.credential);
  const classId = credential ? credential.classId : "";
  const grade = credential ? "Khóa " + credential.classId.slice(4, 6) : "";

  useEffect(() => {
    const token = Cookies.get(TOKEN["STUDENT"]);

    if (token) {
      dispatch(actSendLoginToken(token));
      sendAccessToken(token);
      dispatch(getCredential());
    }
  }, [dispatch]);

  const navList = {
    "": [
      { name: "Bảng tin", slug: PATH["STUDENT_POST_LIST"], Icon: Home },
      {
        name: "Diễn đàn sinh viên",
        slug: "/student-forum",
        Icon: LocalLibrary,
      },
      {
        name: "Sơ đồ cây môn học",
        slug: PATH["TREE_SUBJECT"],
        Icon: Assignment,
      },
      { name: "Đã thích", slug: PATH["STUDENT_POST_SAVED"], Icon: Stars },
    ],
    "Thông báo": [
      {
        name: "Môn sắp mở",
        slug: PATH["SUBJECT_WILL_OPEN"],
        Icon: LibraryBooks,
      },
      {
        name: "Môn đã chọn",
        slug: PATH["SUBJECT_SELECTED"],
        Icon: LibraryBooks,
      },
      { name: "Bảng điểm", slug: PATH["STUDENT_SCORE_TABLE"], Icon: Timeline },
      { name: "Nghỉ học", slug: "/student-absent", Icon: AlarmOff },
    ],
    Nhóm: [
      {
        name: grade,
        slug: "/student-grade",
        Icon: PermContactCalendar,
      },
      {
        name: "Lớp " + classId,
        slug: PATH["STUDENT_CLASSROOM_NEWSFEED"](classId, 2),
        Icon: AssignmentInd,
      },
    ],
  };

  return (
    <Fragment>
      <Header
        backHome={PATH["STUDENT_POST_LIST"]}
        backLogin={PATH["STUDENT_LOGIN"]}
      />
      <Container>
        <div className={styles.Wrapper}>
          <Navbar navList={navList} />
          <main>{props.children}</main>
        </div>
      </Container>
    </Fragment>
  );
};

export default StudentHomeLayout;
