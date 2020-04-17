import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Post from "components/Post";
import useLazyScroll from "hooks/useLazyScroll";
import { getPosts } from "redux/posts/postAction";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "services/const";
import { getLocalStorage, sendAccessToken } from "services/common";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postData.postList);

  const page = useLazyScroll();

  useEffect(() => {
    const lectureLoginToken = getLocalStorage(TOKEN.LECTURE_LOGIN);
    const pagination = { page, limit: 5 };

    if (lectureLoginToken) {
      sendAccessToken(lectureLoginToken);
      dispatch(getPosts(true, pagination));
    }
  }, [dispatch, page]);

  const renderPost = postList.map((item) => <Post key={item.id} item={item} />);
  return <div className={styles.Container}>{renderPost}</div>;
};

export default HomeScreen;
