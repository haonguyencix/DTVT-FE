import { FETCH_POST_LIST, STOP_FETCH_POSTS } from "./postType";

let initialState = {
  postList: [],
  stopFetch: false
};

const LectureReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POST_LIST:
      return {
        ...state,
        postList: payload.condition
          ? [...state.postList, ...payload.postList]
          : payload.postList
      };

    case STOP_FETCH_POSTS:
      return { ...state, stopFetch: payload };
      
    default:
      return state;
  }
};

export default LectureReducer;
