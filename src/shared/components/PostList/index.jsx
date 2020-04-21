import React, { useEffect } from "react";
import Post from "shared/components/Post";
import useLazyScroll from "shared/hooks/useLazyScroll";
import { getPosts } from "core/store/posts/postAction";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage, sendAccessToken } from "core/services/utils";
import { TOKEN } from "shared/constants";

const PostList = (props) => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postData.postList);

  const page = useLazyScroll();

  useEffect(() => {
    const token = getLocalStorage(TOKEN[props.role]);
    const pagination = { page, limit: 5 };

    if (token) {
      sendAccessToken(token);
      dispatch(getPosts(true, pagination));
    }
  }, [dispatch, page, props.role]);

  return (
    <div>
      {postList.map((item) => (
        <Post key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PostList;
