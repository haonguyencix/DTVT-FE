import React, { Fragment } from "react";
import CreatePost from "modules/LectureHome/components/CreatePost";
import PostList from "shared/components/PostList";

const PostsArea = () => {
  return (
    <Fragment>
      <CreatePost />
      <PostList role="LECTURE" />
    </Fragment>
  );
};

export default PostsArea;
