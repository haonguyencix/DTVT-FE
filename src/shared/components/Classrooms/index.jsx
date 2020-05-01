import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "shared/constants";
import { sendAccessToken } from "core/services/utils";
import { getClassrooms } from "core/store/classrooms/classroomAction";
import * as Cookies from "js-cookie";
import DispatchActLoad from "../DispatchActLoad";

const Classrooms = (props) => {
  const { className, role, render, value } = props;

  const dispatch = useDispatch();
  const classrooms = useSelector((state) => state.classroomData.classroomList);
  const isLoading = useSelector((state) => state.isLoading.fetchClassroomsLoad);

  useEffect(() => {
    const token = Cookies.get(TOKEN[role]);

    if (token) {
      sendAccessToken(token);
      dispatch(getClassrooms(value, role));
    }
  }, [dispatch, value, role]);

  const renderClassrooms = classrooms.map((item, index) => (
    <Fragment key={index}>{render(item)}</Fragment>
  ));

  return (
    <div className={className}>
      {isLoading ? <DispatchActLoad height={280} /> : renderClassrooms}
    </div>
  );
};

export default Classrooms;
