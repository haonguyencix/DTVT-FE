import { toast } from "react-toastify";
import { FETCH_CLASSROOM_LIST } from "./classroomType";
import ClassroomService from "./classroomService";

// async action
export const getClassrooms = () => {
  return (dispatch) => {
    ClassroomService.getClassrooms()
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

// action creator
export const actFetchClassroomList = (classrooms) => ({
  type: FETCH_CLASSROOM_LIST,
  payload: classrooms,
});