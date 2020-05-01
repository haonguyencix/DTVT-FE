import { toast } from "react-toastify";
import { FETCH_CLASSROOM_LIST, FETCH_STUDENT_LIST } from "./classroomType";
import { actFetchClassroomsLoad, actGetStudentListLoad } from "../loading/loadingAction";
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

        dispatch(actFetchStudentList(res.data, true));
      })
      .catch((err) => {
        dispatch(actGetStudentListLoad("FAILURE"));
        
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
