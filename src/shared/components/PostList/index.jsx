import React, { useEffect, Fragment } from "react";
import Post from "shared/components/Post";
import useLazyScroll from "shared/hooks/useLazyScroll";
import { getPosts } from "core/store/posts/postAction";
import { useDispatch, useSelector } from "react-redux";
import { sendAccessToken } from "core/services/utils";
import { TOKEN } from "shared/constants";
import DispatchActLoad from "shared/components/DispatchActLoad";
import EmptyAlert from "shared/components/EmptyAlert";
import * as Cookies from "js-cookie";

const PostList = (props) => {
  const { role, junctionId, type } = props;

  const dispatch = useDispatch();  
  
  const postList = useSelector((state) => state.postData.postList);
  const stopFetch = useSelector((state) => state.postData.stopFetch);
  const isLoading = useSelector((state) => state.isLoading.fetchPostsLoad);
  
  const page = useLazyScroll(stopFetch);
  
  useEffect(() => {
    const token = Cookies.get(TOKEN[role]);
    const pagination = { page, limit: 5 };

    if (token) {
      sendAccessToken(token);
      dispatch(getPosts(page > 1, pagination, { type, junctionId }));
    }
  }, [dispatch, page, role, type, junctionId]);

  const renderPosts = postList.map((item, index) => (
    <Post key={index} item={item} />
  ));

  return (
    <Fragment>
      {isLoading ? <DispatchActLoad height={400} /> : renderPosts}
      {stopFetch && <EmptyAlert msg="Không còn bài đăng nào" />}
    </Fragment>
  );
};

export default PostList;
