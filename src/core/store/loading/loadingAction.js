import {
  CHECK_FAB_PROGRESS,
  CHECK_FETCH_CLASSROOMS,
  CHECK_FETCH_POSTS,
  CHECK_FETCH_STUDENT_LIST,
} from "./loadingType";

// action creator
export const actCheckFabProgress = (status) => ({
  type: CHECK_FAB_PROGRESS[status],
});

export const actFetchClassroomsLoad = (status) => ({
  type: CHECK_FETCH_CLASSROOMS[status],
});

export const actFetchPostsLoad = (status) => ({
  type: CHECK_FETCH_POSTS[status],
});

export const actGetStudentListLoad = (status) => ({
  type: CHECK_FETCH_STUDENT_LIST[status],
});
