import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { Redirect } from "react-router-dom";
import { TOKEN, PATH } from "shared/constants";
import LazyloadPage from "shared/components/LazyloadPage";
import NewsFeed from "./pages/NewsFeed";
import PostsArea from "./components/PostsArea";
import StudentList from "shared/components/StudentList";
import * as Cookies from "js-cookie";

const LectureHomeLayout = lazy(() => import("."));
const ClassroomDetail = lazy(() => import('./pages/ClassroomDetail'));
const PostDetail = lazy(() => import("shared/components/PostDetail"));

const LectureHomeGuard = ({ routes }) => {
  if (!Cookies.get(TOKEN["LECTURE"])) {
    return <Redirect to={PATH["LECTURE_LOGIN"]} />;
  }
  return (
    <Suspense fallback={<LazyloadPage />}>
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

const ClassroomDetailWrapper = ({ routes }) => (
  <ClassroomDetail role="LECTURE">
    <RenderRoutes routes={routes} />
  </ClassroomDetail>
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
          key: "LECTURE_CLASSROOM",
          path: PATH["LECTURE_CLASSROOM"](PATH["CLASSROOM_ID"]),
          component: ClassroomDetailWrapper,
          routes: [
            {
              key: "LECTURE_CLASSROOM_NEWSFEED",
              path: PATH["LECTURE_CLASSROOM_NEWSFEED"](PATH["CLASSROOM_ID"], PATH["POST_TYPE"]),
              exact: true,
              component: PostsArea,
            },
            {
              key: "LECTURE_STUDENT_LIST",
              path: PATH["LECTURE_STUDENT_LIST"](PATH["CLASSROOM_ID"]),
              exact: true,
              component: () => <StudentList role="LECTURE" />,
            },
          ]
        },
        {
          key: "LECTURE_POST_LIST",
          path: PATH["LECTURE_HOME"],
          exact: true,
          component: PostsArea,
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
