import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetail } from "core/store/posts/postAction";
import Post from "../Post";

const PostDetail = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();
  
  const postDetail = useSelector(state => state.postData.postDetail);

  useEffect(() => {
    dispatch(getPostDetail(postId));
  }, [dispatch, postId]);

  return <Post item={postDetail} />;
};

export default PostDetail;
