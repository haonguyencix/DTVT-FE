import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Post from "components/Post";
import { getPosts } from "redux/posts/postAction";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "services/const";
import { getLocalStorage, sendAccessToken } from "services/common";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const postList = useSelector(state => state.postData.postList);
  const stopFetch = useSelector(state => state.postData.stopFetch);

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  
  const handleScroll = () => {
    const scrollHeight = Math.ceil(window.innerHeight + document.documentElement.scrollTop);
    const htmlHeight = document.documentElement.offsetHeight;

    if (scrollHeight === htmlHeight) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    const lectureLoginToken = getLocalStorage(TOKEN.LECTURE_LOGIN);

    const pagination = { page, limit: 5 };

    console.log("HomeScreen -> pagination", pagination)
    if (lectureLoginToken) {
      sendAccessToken(lectureLoginToken);
      dispatch(getPosts(true, pagination));
    }
  }, [dispatch, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && !stopFetch) {
      setPage(prev => prev + 1);
      setIsFetching(false);
    }
  }, [isFetching, stopFetch]);

  const renderPost = postList.map(item => (
    <Post key={item.id} item={item} />
  ));
  return <div className={styles.Container}>{renderPost}</div>;
};

export default HomeScreen;
