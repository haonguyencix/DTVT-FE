import { toast } from "react-toastify";
import { FETCH_CLASSROOM_LIST, FETCH_STUDENT_LIST } from "./classroomType";
import ClassroomService from "./classroomService";

// async action
export const getClassrooms = (filter) => {
  return (dispatch) => {
    ClassroomService.getClassrooms(filter)
      .then((res) => {
        dispatch(actFetchClassroomList(res.data));
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const getStudentList = (classroomId) => {
  return (dispatch) => {
    ClassroomService.getStudentList(classroomId)
      .then((res) => {
        dispatch(actFetchStudentList(res.data, true));
      })
      .catch((err) => {
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

export const actFetchStudentList = (studentList, isFetch) => ({
  type: FETCH_STUDENT_LIST,
  payload: { studentList, isFetch },
});
