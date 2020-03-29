// import const
import { SEND_POST_LIST } from "./postType";

let initialState = {
  postList: []
};

const LectureReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_POST_LIST:
      return {...state, postList: payload};

    default:
      return state;
  }
};

export default LectureReducer;
