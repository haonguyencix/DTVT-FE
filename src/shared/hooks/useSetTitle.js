import { useEffect } from "react";

const useSetTitle = title => {
  useEffect(() => {
    document.title = title;
    return () => document.title = "";
  }, [title]);
};

export default useSetTitle;
