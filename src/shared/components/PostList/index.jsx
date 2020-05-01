import React, { useEffect, Fragment } from "react";
import Post from "shared/components/Post";
import useLazyScroll from "shared/hooks/useLazyScroll";
import { getPosts } from "core/store/posts/postAction";
import { useDispatch, useSelector } from "react-redux";
import { sendAccessToken } from "core/services/utils";
import { TOKEN } from "shared/constants";
import * as Cookies from "js-cookie";
import DispatchActLoad from "../DispatchActLoad";

const PostList = (props) => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postData.postList);
  const isLoading = useSelector((state) => state.isLoading.fetchPostsLoad);

  const page = useLazyScroll();

  useEffect(() => {
    const token = Cookies.get(TOKEN[props.role]);
    const pagination = { page, limit: 5 };

    if (token) {
      sendAccessToken(token);
      dispatch(getPosts(page > 1, pagination));
    }
  }, [dispatch, page, props.role]);

  const renderPosts = postList.map((item) => (
    <Post key={item.id} item={item} />
  ));

  return <Fragment>{isLoading ? <DispatchActLoad height={400} /> : renderPosts}</Fragment>;
};

export default PostList;
