import {
  CHECK_FAB_PROGRESS,
  CHECK_FETCH_CLASSROOMS,
  CHECK_FETCH_POSTS,
  CHECK_FETCH_STUDENT_LIST,
  CHECK_FETCH_CLASSROOM_INFO
} from "./loadingType";

let initialState = {
  fabProgess: false,
  fetchClassroomsLoad: false,
  fetchPostsLoad: false,
  getStudentsLoad: false,
  fetchClassroomInfoLoad: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_FAB_PROGRESS["REQUEST"]: {
      return { ...state, fabProgess: true };
    }

    case CHECK_FAB_PROGRESS["SUCCESS"]: {
      return { ...state, fabProgess: false };
    }

    case CHECK_FAB_PROGRESS["FAILURE"]: {
      return { ...state, fabProgess: false };
    }

    case CHECK_FETCH_CLASSROOMS["REQUEST"]: {
      return { ...state, fetchClassroomsLoad: true };
    }

    case CHECK_FETCH_CLASSROOMS["SUCCESS"]: {
      return { ...state, fetchClassroomsLoad: false };
    }

    case CHECK_FETCH_CLASSROOMS["FAILURE"]: {
      return { ...state, fetchClassroomsLoad: false };
    }
 
    case CHECK_FETCH_POSTS["REQUEST"]: {
      return { ...state, fetchPostsLoad: true };
    }

    case CHECK_FETCH_POSTS["SUCCESS"]: {
      return { ...state, fetchPostsLoad: false };
    }

    case CHECK_FETCH_POSTS["FAILURE"]: {
      return { ...state, fetchPostsLoad: false };
    }
 
    case CHECK_FETCH_STUDENT_LIST["REQUEST"]: {
      return { ...state, getStudentsLoad: true };
    }

    case CHECK_FETCH_STUDENT_LIST["SUCCESS"]: {
      return { ...state, getStudentsLoad: false };
    }

    case CHECK_FETCH_STUDENT_LIST["FAILURE"]: {
      return { ...state, getStudentsLoad: false };
    }

    case CHECK_FETCH_CLASSROOM_INFO["REQUEST"]: {
      return { ...state, fetchClassroomInfoLoad: true };
    }

    case CHECK_FETCH_CLASSROOM_INFO["SUCCESS"]: {
      return { ...state, fetchClassroomInfoLoad: false };
    }

    case CHECK_FETCH_CLASSROOM_INFO["FAILURE"]: {
      return { ...state, fetchClassroomInfoLoad: false };
    }
 
    default:
      return state;
  }
};

export default LoadingReducer;
