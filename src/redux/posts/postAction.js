import { toast } from "react-toastify";
import { SEND_POST_LIST } from "./postType";
import { actCheckLoading } from "components/FabProgress/action";
import PostService from "./postService";

// async action
export const createPost = formData => {
  return dispatch => {
    dispatch(actCheckLoading("REQUEST"));

    PostService.createPost(formData)
      .then(res => {
        dispatch(actCheckLoading("SUCCESS"));

        console.log(res);
      })
      .catch(err => {
        dispatch(actCheckLoading("FAILURE"));

        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const getPosts = () => {
  return dispatch => {
    PostService.getPosts()
      .then(res => {
        console.log(res);

        dispatch(actSendPostList(res.data));
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

export const interactPost = interact => {
  return dispatch => {
    PostService.interactPost(interact)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
}

// action creator
export const actSendPostList = postList => ({
  type: SEND_POST_LIST,
  payload: postList
});
