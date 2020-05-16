import {
  FETCH_CLASSROOM_LIST,
  FETCH_STUDENT_LIST,
  FETCH_CLASSROOM_INFO,
  SET_CLASSROOM_SELECTED
} from "./classroomType";

let initialState = {
  classroomList: [],
  classroomInfo: {},
  studentList: {},
  isFetchClassroom: false,
  classroomSelecteds: {},
  isLead: false
};

const ClassroomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CLASSROOM_LIST:
      return { ...state, classroomList: payload };

    case FETCH_STUDENT_LIST:
      return { ...state, studentList: payload };

    case FETCH_CLASSROOM_INFO:
      return {
        ...state,
        isFetchClassroom: payload.isFetch,
        classroomInfo: payload.classroomInfo,
        isLead: payload.isLead
      };

    case SET_CLASSROOM_SELECTED:
      state.classroomSelecteds[payload.subjectId] = payload.selecteds;
      return { ...state }

    default:
      return state;
  }
};

export default ClassroomReducer;
