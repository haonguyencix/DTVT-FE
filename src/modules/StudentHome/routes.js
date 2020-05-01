import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { Redirect } from "react-router-dom";
import { PATH, TOKEN } from "shared/constants";
import LazyloadPage from "shared/components/LazyloadPage";
import PostList from "shared/components/PostList";
import NewsFeed from "./pages/NewsFeed";
import * as Cookies from "js-cookie";

const StudentHomeLayout = lazy(() => import("."));
const TreeSubject = lazy(() => import("./pages/TreeSubject"));
const StudentList = lazy(() => import("shared/components/StudentList"));
const PostDetail = lazy(() => import("shared/components/PostDetail"));

const StudentHomeGuard = ({ routes }) => {
  if (!Cookies.get(TOKEN["STUDENT"])) {
    return <Redirect to={PATH["STUDENT_LOGIN"]} />;
  }
  return (
    <Suspense fallback={<LazyloadPage />}>
      <StudentHomeLayout>
        <RenderRoutes routes={routes} />
      </StudentHomeLayout>
    </Suspense>
  );
};

const NewsFeedWrapper = ({ routes }) => (
  <NewsFeed>
    <RenderRoutes routes={routes} />
  </NewsFeed>
);

const StudentHomeRoutes = {
  key: "STUDENT_HOME",
  path: PATH["STUDENT_HOME"],
  component: StudentHomeGuard,
  routes: [
    {
      key: "TREE_SUBJECT",
      path: PATH["TREE_SUBJECT"],
      component: TreeSubject,
    },
    {
      key: "NEWS_FEED",
      path: PATH["STUDENT_HOME"],
      component: NewsFeedWrapper,
      routes: [
        {
          key: "STUDENT_POST_LIST",
          path: PATH["STUDENT_HOME"],
          exact: true,
          component: () => <PostList role="STUDENT" />,
        },
        {
          key: "STUDENT_LIST_IN_CLASSROOM",
          path: PATH["STUDENT_LIST_IN_CLASSROOM"] + "/:classroomId",
          exact: true,
          component: StudentList,
        },
        {
          key: "STUDENT_POST_DETAIL",
          path: PATH["STUDENT_POST_DETAIL"],
          exact: true,
          component: PostDetail,
        },
      ],
    },
  ],
};

export default StudentHomeRoutes;
