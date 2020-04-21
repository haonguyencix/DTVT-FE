import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { PATH } from "shared/constants";
import Spinner from "shared/components/Spinner";
import PostList from "shared/components/PostList";
import NewsFeed from "./pages/NewsFeed";

const StudentHomeGuard = lazy(() => import("./guard"));
const TreeSubject = lazy(() => import("./pages/TreeSubject"));
const PostDetail = lazy(() => import("shared/components/PostDetail"));

const StudentHomeWrapper = ({ routes }) => (
  <Suspense fallback={<Spinner />}>
    <StudentHomeGuard>
      <RenderRoutes routes={routes} />
    </StudentHomeGuard>
  </Suspense>
);

const NewsFeedWrapper = ({ routes }) => (
  <NewsFeed>
    <RenderRoutes routes={routes} />
  </NewsFeed>
);

const StudentHomeRoutes = {
  key: "STUDENT_HOME",
  path: PATH["STUDENT_HOME"],
  component: StudentHomeWrapper,
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
