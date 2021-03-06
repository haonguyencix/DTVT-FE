import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import CreatePost from "shared/components/CreatePost";
import PostList from "shared/components/PostList";

const PostsArea = () => {
  const { classroomId, postType } = useParams();

  const junctionId = classroomId ? classroomId : "";
  const type = postType ? parseInt(postType) : 0;
  
  return (
    <Fragment>
      <CreatePost junctionId={junctionId} type={type} />
      <PostList role="LECTURE" junctionId={junctionId} type={type} />
    </Fragment>
  );
};

export default PostsArea;
