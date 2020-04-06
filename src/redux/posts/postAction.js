import { toast } from "react-toastify";
import { FETCH_POST_LIST, STOP_FETCH_POSTS } from "./postType";
import { actCheckLoading } from "components/FabProgress/action";
import socket from "services/socket";
import PostService from "./postService";
import { SOCKET } from "services/const";

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

export const createPost = (formData, credential, closeBtn, textarea) => {
  return (dispatch) => {
    dispatch(actCheckLoading("REQUEST"));

    PostService.createPost(formData)
      .then((res) => {
        dispatch(actCheckLoading("SUCCESS"));

        dispatch(getPosts(false, { page: 1, limit: 5 }));

        closeBtn.click();
        textarea.value = "";
        textarea.style.height = "37px";

        const createdBy = credential.firstName + " " + credential.lastName;
        const noti = { ...res.data, createdBy };

        socket.emit(SOCKET.CREATE_POST_NOTI, noti);
      })
      .catch((err) => {
        dispatch(actCheckLoading("FAILURE"));

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
        console.log(res);

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
