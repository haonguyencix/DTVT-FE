import {
  FETCH_POST_LIST,
  FETCH_POST_DETAIL,
  STOP_FETCH_POSTS,
  CHECK_SUBMIT,
  FETCH_NOTI_LIST,
  ADJUST_NUM_NOTI,
  CHECK_BUBBLE_CREATE_POST,
  SELECT_POST_TYPE,
} from "./postType";

let initialState = {
  postList: [],
  postDetail: {},
  stopFetch: false,
  isSubmit: false,
  notiList: [],
  numNoti: 0,
  isBubble: false,
  typeSelected: 0,
};

const PostReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POST_LIST:
      return {
        ...state,
        postList: payload.condition
          ? [...state.postList, ...payload.postList]
          : payload.postList,
      };
    
    case FETCH_POST_DETAIL:
      return { state, postDetail: payload }

    case STOP_FETCH_POSTS:
      return { ...state, stopFetch: payload };

    case CHECK_SUBMIT:
      return { ...state, isSubmit: payload };

    case FETCH_NOTI_LIST:
      return { ...state, notiList: payload };

    case ADJUST_NUM_NOTI:
      return { ...state, numNoti: state.numNoti + payload };

    case CHECK_BUBBLE_CREATE_POST:
      return { ...state, isBubble: payload };

    case SELECT_POST_TYPE:
      return { ...state, typeSelected: payload };

    default:
      return state;
  }
};

export default PostReducer;
