import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import {
  getClassroomInfo,
  actFetchClassroomInfo,
} from "core/store/classrooms/classroomAction";
import { TOKEN, PATH } from "shared/constants";
import { sendAccessToken } from "core/services/utils";
import BgClassroom from "assets/img/bg-classroom.png";
import * as Cookies from "js-cookie";
import DispatchActLoad from "shared/components/DispatchActLoad";
import Sticky from "shared/hocs/Sticky";

const ClassroomDetail = (props) => {
  const { role } = props;
  const { classroomId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.isLoading.fetchClassroomInfoLoad
  );
  const classroomInfo = useSelector(
    (state) => state.classroomData.classroomInfo
  );

  const {
    theory,
    practice,
    subjectName,
    studentListLength,
    // subjectId,
    // firstName,
    // lastName,
    // credits,
    // lectureId,
    // email,
    // phone,
  } = classroomInfo;

  // const lecture = firstName && lastName ? firstName + " " + lastName : "";

  const leadZero = (value) => {
    if (value < 10) return "0" + value;
    return value;
  };

  const temp = practice ? " - Thực hành" + leadZero(practice) : "";
  const groupName = "Nhóm " + leadZero(theory) + temp;

  const navList = [
    { content: "Bảng tin lớp", slug: PATH[`${role}_CLASSROOM_NEWSFEED`](classroomId) },
    {
      content: `Sinh viên (${studentListLength})`,
      slug: PATH[`${role === "LECTURE" ? "LECTURE_" : ''}STUDENT_LIST`](classroomId),
    },
    { content: "Tài liệu", slug: "/asdfhwefsd/asdfqwe/fasdfasdf/as" },
    { content: "Bài tập", slug: "/asdfhwefsd/asdfqwe/fasdfasdf/as" },
    { content: "Điểm số", slug: "/asdfhwefsd/asdfqwe/fasdfasdf/as" },
  ];

  const renderNavList = navList.map((item, index) => (
    <NavLink
      key={index}
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
      to={item.slug || ""}
    >
      {item.content}
    </NavLink>
  ));

  useEffect(() => {
    const token = Cookies.get(TOKEN[role]);

    if (token) {
      sendAccessToken(token);
      dispatch(getClassroomInfo(classroomId));
    }

    return () => dispatch(actFetchClassroomInfo({}, false));
  }, [dispatch, classroomId, role]);

  return (
    <div className={styles.Container}>
      {isLoading ? (
        <DispatchActLoad height="20vh" />
      ) : (
        <div className={styles.ClassroomInfo}>
          <div
            style={{ backgroundImage: `url(${BgClassroom})` }}
            className={styles.Background}
          ></div>
          <div className={styles.InfoContent}>
            <h1>{subjectName && subjectName.toUpperCase()}</h1>
            <p>{groupName}</p>
          </div>
          <Sticky
            className={styles.Sticky}
            overlay={styles.StickyOverlay}
            top={88}
            width="44.1vw"
          >
            <div className={styles.Navigation}>
              <div>{renderNavList}</div>
            </div>
          </Sticky>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default ClassroomDetail;
