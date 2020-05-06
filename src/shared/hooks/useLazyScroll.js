import { useState, useEffect } from "react";

const useLazyScroll = (stopFetch) => {
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && !stopFetch) {
      setPage(prev => prev + 1);
      setIsFetching(false);
    };
  }, [isFetching, stopFetch]);

  return page;
};

export default useLazyScroll;
