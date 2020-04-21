import { toast } from "react-toastify";
import {
  FETCH_POST_LIST,
  STOP_FETCH_POSTS,
  CHECK_SUBMIT,
  FETCH_NOTI_LIST,
  ADJUST_NUM_NOTI,
} from "./postType";
import socket from "core/services/socket";
import PostService from "./postService";
import { SOCKET } from "shared/constants";

// async action
export const getPosts = (condition, pagination) => {
  return (dispatch) => {
    PostService.getPosts(pagination)
      .then((res) => {
        if (res.data.length === 0) {
          dispatch(actStopFetch(true));
          return;
        }
        dispatch(actFetchPostList(condition, res.data));
      })
      .catch((err) => {
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
        dispatch(getPosts(false, { page: 1, limit: 5 }));

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
        dispatch(getPosts(false, { page: 1, limit: 5 }));

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
