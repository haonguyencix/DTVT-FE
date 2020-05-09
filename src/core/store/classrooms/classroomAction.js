import { toast } from "react-toastify";
import {
  FETCH_CLASSROOM_LIST,
  FETCH_CLASSROOM_INFO,
  FETCH_STUDENT_LIST,
  SET_CLASSROOM_SELECTED,
} from "./classroomType";
import {
  actFetchClassroomsLoad,
  actGetStudentListLoad,
  actFetchClassroomInfoLoad,
} from "../loading/loadingAction";
import ClassroomService from "./classroomService";

// async action
export const getClassrooms = (filter, role) => {
  return (dispatch) => {
    dispatch(actFetchClassroomsLoad("REQUEST"));

    ClassroomService.getClassrooms(filter, role)
      .then((res) => {
        dispatch(actFetchClassroomsLoad("SUCCESS"));

        dispatch(actFetchClassroomList(res.data));
      })
      .catch((err) => {
        dispatch(actFetchClassroomsLoad("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const getStudentList = (classroomId) => {
  return (dispatch) => {
    dispatch(actGetStudentListLoad("REQUEST"));

    ClassroomService.getStudentList(classroomId)
      .then((res) => {
        dispatch(actGetStudentListLoad("SUCCESS"));

        dispatch(actFetchStudentList(res.data));
      })
      .catch((err) => {
        dispatch(actGetStudentListLoad("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const appointLead = (studentId, classroomId, status, horizBtn) => {
  return (dispatch) => {
    ClassroomService.appointLead(studentId, classroomId, status)
      .then((res) => {
        const { status, fullname } = res.data;

        dispatch(getStudentList(classroomId));

        horizBtn.click();

        toast.info(`Bạn đã ${status.toLowerCase()} ${fullname} làm QTV`);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const getClassroomInfo = (classroomId) => {
  return (dispatch) => {
    dispatch(actFetchClassroomInfoLoad("REQUEST"));

    ClassroomService.getClassroomInfo(classroomId)
      .then((res) => {
        dispatch(actFetchClassroomInfoLoad("SUCCESS"));

        dispatch(actFetchClassroomInfo(res.data, true));
      })
      .catch((err) => {
        dispatch(actFetchClassroomInfoLoad("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// action creator
export const actFetchClassroomList = (classrooms) => ({
  type: FETCH_CLASSROOM_LIST,
  payload: classrooms,
});

export const actFetchStudentList = (studentList) => ({
  type: FETCH_STUDENT_LIST,
  payload: studentList,
});

export const actFetchClassroomInfo = (classroomInfo, isFetch) => ({
  type: FETCH_CLASSROOM_INFO,
  payload: { classroomInfo, isFetch },
});

export const actSetClassroomSelecteds = (subjectId, selecteds) => ({
  type: SET_CLASSROOM_SELECTED,
  payload: { subjectId, selecteds }
});