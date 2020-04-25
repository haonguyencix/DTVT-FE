import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { Redirect } from "react-router-dom";
import { TOKEN, PATH } from "shared/constants";
import Spinner from "shared/components/Spinner";
import PostList from "shared/components/PostList";
import NewsFeed from "./pages/NewsFeed";
import * as Cookies from "js-cookie";

const LectureHomeLayout = lazy(() => import("."));
const PostDetail = lazy(() => import("shared/components/PostDetail"));

const LectureHomeGuard = ({ routes }) => {
  if (!Cookies.get(TOKEN["LECTURE"])) {
    return <Redirect to={PATH["LECTURE_LOGIN"]} />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <LectureHomeLayout>
        <RenderRoutes routes={routes} />
      </LectureHomeLayout>
    </Suspense>
  );
};

const NewsFeedWrapper = ({ routes }) => (
  <NewsFeed>
    <RenderRoutes routes={routes} />
  </NewsFeed>
);

const LectureHomeRoutes = {
  key: "LECTURE_HOME",
  path: PATH["LECTURE_HOME"],
  component: LectureHomeGuard,
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
