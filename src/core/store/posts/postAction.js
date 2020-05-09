import { toast } from "react-toastify";
import {
  FETCH_POST_LIST,
  STOP_FETCH_POSTS,
  CHECK_SUBMIT,
  FETCH_NOTI_LIST,
  ADJUST_NUM_NOTI,
  CHECK_BUBBLE_CREATE_POST,
} from "./postType";
import socket from "core/services/socket";
import PostService from "./postService";
import { SOCKET } from "shared/constants";
import { actFetchPostsLoad } from "../loading/loadingAction";

// async action
export const getPosts = (condition = false, pagination = { page: 1, limit: 5 }) => {
  return (dispatch) => {
    !condition && dispatch(actFetchPostsLoad("REQUEST"));

    PostService.getPosts(pagination)
      .then((res) => {
        if (res.data.length === 0) {
          dispatch(actStopFetch(true));
          return;
        }
        dispatch(actFetchPostsLoad("SUCCESS"));

        dispatch(actFetchPostList(condition, res.data));
      })
      .catch((err) => {
        dispatch(actFetchPostsLoad("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const createPost = (formData, closeBtn, textarea) => {
  return (dispatch) => {
    PostService.createPost(formData)
      .then((res) => {
        dispatch(actCheckSubmit(true));
        dispatch(getPosts());

        socket.emit(SOCKET.CREATE_POST_NOTI, res.data);

        closeBtn.click();
        textarea.value = "";
        textarea.style.height = "37px";
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const deletePost = (delObj, horizBtn) => {
  return (dispatch) => {
    PostService.deletePost(delObj)
      .then((res) => {
        dispatch(getPosts());

        horizBtn.click();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// normal function to call service
export const interactPost = (interact) => {
  PostService.interactPost(interact)
    .then((res) => console.log(res.data))
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    });
};

// action creator
export const actFetchPostList = (condition, postList) => ({
  type: FETCH_POST_LIST,
  payload: { condition, postList },
});

export const actStopFetch = (status) => ({
  type: STOP_FETCH_POSTS,
  payload: status,
});

export const actCheckSubmit = (status) => ({
  type: CHECK_SUBMIT,
  payload: status,
});

export const actFetchNotiList = (noti) => ({
  type: FETCH_NOTI_LIST,
  payload: noti,
});

export const actAdjustNumNoti = (direction) => ({
  type: ADJUST_NUM_NOTI,
  payload: direction,
});

export const actSetBubble = (status) => ({
  type: CHECK_BUBBLE_CREATE_POST,
  payload: status
})