import { FETCH_POST_LIST, STOP_FETCH_POSTS, CHECK_SUBMIT, FETCH_NOTI_LIST, ADJUST_NUM_NOTI } from "./postType";

let initialState = {
  postList: [],
  stopFetch: false,
  isSubmit: false,
  notiList: [],
  numNoti: 0
};

const PostReducer = (state = initialState, { type, payload }) => {
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

    case CHECK_SUBMIT:
      return { ...state, isSubmit: payload };

    case FETCH_NOTI_LIST:
      return { ...state, notiList: payload}

    case ADJUST_NUM_NOTI:
      return { ...state, numNoti: state.numNoti + payload }
      
    default:
      return state;
  }
};

export default PostReducer;
