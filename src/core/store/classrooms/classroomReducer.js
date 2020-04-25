import { FETCH_CLASSROOM_LIST, FETCH_STUDENT_LIST } from "./classroomType";

let initialState = {
  classroomList: [],
  studentList: [],
  isFetchStudentList: false,
};

const ClassroomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CLASSROOM_LIST:
      return { ...state, classroomList: payload };

    case FETCH_STUDENT_LIST:
      return {
        ...state,
        studentList: payload.studentList,
        isFetchStudentList: payload.isFetch,
      };

    default:
      return state;
  }
};

export default ClassroomReducer;
