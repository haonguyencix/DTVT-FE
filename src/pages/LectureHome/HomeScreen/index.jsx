import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Post from "components/Post";
import { getPosts } from "redux/posts/postAction";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "services/const";
import { getLocalStorage, sendAccessToken } from "services/common";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.postData.postList);
  console.log("HomeScreen -> postList", postList)

  useEffect(() => {
    const lectureLoginToken = getLocalStorage(TOKEN.LECTURE_LOGIN);
    
    if (lectureLoginToken) {
      sendAccessToken(lectureLoginToken);
      dispatch(getPosts());
    }
  }, [dispatch]);

  const renderPost = postList.map((item, index) => (
    <Post key={index} item={item} />
  ));
  return <div className={styles.Container}>{renderPost}</div>;
};

export default HomeScreen;
