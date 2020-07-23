import React, { useEffect, Fragment } from "react";
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
import DispatchActLoad from "shared/components/DispatchActLoad";
import Sticky from "shared/hocs/Sticky";
import * as Cookies from "js-cookie";

const ClassroomDetail = (props) => {
  const { role } = props;

  const { classroomId, postType } = useParams();

  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state) => state.isLoading.fetchClassroomInfoLoad
  );
  const classroomInfo = useSelector(
    (state) => state.classroomData.classroomInfo
  );

  const {
    theory = 0,
    practice = 0,
    name = '',
    studentListLength,
    subjectId = "",
    credits = 0,
    firstName = '',
    lastName = ''
  } = classroomInfo;

  const leadZero = (value) => {
    if (value < 10) return "0" + value;
    return value;
  };

  const temp = practice ? " - Thực hành" + leadZero(practice) : "";
  const groupName = theory ? "Nhóm " + leadZero(theory) + temp : "";

  const navList = [
    {
      content: "Bảng tin lớp",
      slug: PATH[`${role}_CLASSROOM_NEWSFEED`](classroomId, postType),
    },
    {
      content: `Sinh viên (${studentListLength})`,
      slug: PATH[`${role === "LECTURE" ? "LECTURE_" : ""}STUDENT_LIST`](
        classroomId,
        postType
      ),
    },
    { content: "Giảng viên", slug: "/asdfhwefsd/asdfqwe/fasdfasdf/as"},
    { content: "Tài liệu", slug: "/asdfhwefsd/asdfqwe/fasdfasdf/as" },
    { content: "Điểm số", slug: "/asdfhwefsd/asdfqwe/fasdfasdf/as" },
  ];

  const renderInfoContent = () => {
    switch (parseInt(postType)) {
      case 1:
        return (
          <Fragment>
            <h1>{name.toUpperCase()}</h1>
            <p>{groupName} - {subjectId} - {credits} tín chỉ</p>
            <p>GV. {firstName} {lastName}</p>
          </Fragment>
        );

      case 2:
        return (
          <Fragment>
            <h1>LỚP {name.toUpperCase()}</h1>
            <p>CVHT: {firstName + " " + lastName}</p>
          </Fragment>
        );

      default:
        break;
    }
  };

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
      console.log(postType);
      dispatch(getClassroomInfo(classroomId, postType));
    }

    return () => dispatch(actFetchClassroomInfo({}, false));
  }, [dispatch, classroomId, postType, role]);

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
          <div className={styles.InfoContent}>{renderInfoContent()}</div>
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
