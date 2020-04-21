import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { PATH } from "shared/constants";
import Spinner from "shared/components/Spinner";
import PostList from "shared/components/PostList";
import NewsFeed from "./pages/NewsFeed";

const LectureHomeGuard = lazy(() => import("./guard"));
const PostDetail = lazy(() => import("shared/components/PostDetail"));

const LectureHomeWrapper = ({ routes }) => (
  <Suspense fallback={<Spinner />}>
    <LectureHomeGuard>
      <RenderRoutes routes={routes} />
    </LectureHomeGuard>
  </Suspense>
);

const NewsFeedWrapper = ({ routes }) => (
  <NewsFeed>
    <RenderRoutes routes={routes} />
  </NewsFeed>
);

const LectureHomeRoutes = {
  key: "LECTURE_HOME",
  path: PATH["LECTURE_HOME"],
  component: LectureHomeWrapper,
  routes: [
    {
      key: "NEWS_FEED",
      path: PATH["LECTURE_HOME"],
      component: NewsFeedWrapper,
      routes: [
        {
          key: "LECTURE_POST_LIST",
          path: PATH["LECTURE_HOME"],
          exact: true,
          component: () => <PostList role="LECTURE" />,
        },
        {
          key: "LECTURE_POST_DETAIL",
          path: PATH["LECTURE_POST_DETAIL"],
          exact: true,
          component: PostDetail,
        },
      ],
    },
  ],
};

export default LectureHomeRoutes;
