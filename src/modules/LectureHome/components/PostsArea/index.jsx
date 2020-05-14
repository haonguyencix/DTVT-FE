import React, { Fragment } from "react";
import CreatePost from "modules/LectureHome/components/CreatePost";
import PostList from "shared/components/PostList";
import { useParams } from "react-router-dom";

const PostsArea = () => {
  const { classroomId, postType } = useParams();
  return (
    <Fragment>
      <CreatePost
        junctionId={classroomId ? classroomId : ""}
        type={postType ? parseInt(postType) : 0}
      />
      <PostList
        role="LECTURE"
        junctionId={classroomId ? classroomId : ""}
        type={postType ? parseInt(postType) : 0}
      />
    </Fragment>
  );
};

export default PostsArea;
