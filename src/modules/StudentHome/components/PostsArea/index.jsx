import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "shared/components/CreatePost";
import PostList from "shared/components/PostList";

const PostsArea = () => {
  const { classroomId, postType } = useParams();

  const isLead = useSelector((state) => state.classroomData.isLead);

  const junctionId = classroomId ? classroomId : "";
  const type = postType ? parseInt(postType) : 0;

  return (
    <Fragment>
      {isLead && <CreatePost junctionId={junctionId} type={type} />}
      <PostList role="STUDENT" junctionId={junctionId} type={type} />
    </Fragment>
  );
};

export default PostsArea;
