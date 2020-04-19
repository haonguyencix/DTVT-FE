import { FETCH_CLASSROOM_LIST } from "./classroomType";

let initialState = {
  classroomList: [],
};

const ClassroomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CLASSROOM_LIST:
      return { ...state, classroomList: payload };

    default:
      return state;
  }
};

export default ClassroomReducer;
