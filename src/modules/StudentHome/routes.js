import React, { lazy, Suspense } from "react";
import { RenderRoutes } from "core/routes";
import { Redirect } from "react-router-dom";
import { PATH, TOKEN } from "shared/constants";
import LazyloadPage from "shared/components/LazyloadPage";
import NewsFeed from "./pages/NewsFeed";
import ClassroomDetail from "shared/hocs/ClassroomDetail";
import PostsArea from "./components/PostsArea";
import PostList from "shared/components/PostList";
import StudentList from "shared/components/StudentList";
import * as Cookies from "js-cookie";

const StudentHomeLayout = lazy(() => import("."));
const TreeSubject = lazy(() => import("./pages/TreeSubject"));
const PostDetail = lazy(() => import("shared/components/PostDetail"));
const SubjectWillOpen = lazy(() => import("./pages/SubjectWillOpen"));
const ScoreTable = lazy(() => import("./pages/ScoreTable"));
const SubjectSelected = lazy(() => import("./pages/SelectedSubject"));

const StudentHomeGuard = ({ routes }) => {
  // if (!Cookies.get(TOKEN["STUDENT"])) {
  //   return <Redirect to={PATH["STUDENT_LOGIN"]} />;
  // }
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

const ClassroomDetailWrapper = ({ routes }) => (
  <ClassroomDetail role="STUDENT">
    <RenderRoutes routes={routes} />
  </ClassroomDetail>
);

const StudentHomeRoutes = {
  // root
  key: "STUDENT_HOME",
  path: PATH["STUDENT_HOME"],
  component: StudentHomeGuard,
  routes: [
    // children cấp này không phân biệt active
    {
      key: "TREE_SUBJECT",
      path: PATH["TREE_SUBJECT"],
      component: TreeSubject,
    },
    {
      key: "SUBJECT_WILL_OPEN",
      path: PATH["SUBJECT_WILL_OPEN"],
      exact: true,
      component: SubjectWillOpen,
    },
    {
      key: "SUBJECT_SELECTED",
      path: PATH["SUBJECT_SELECTED"],
      exact: true,
      component: SubjectSelected,
    },
    {
      key: "STUDENT_SCORE_TABLE",
      path: PATH["STUDENT_SCORE_TABLE"],
      exact: true,
      component: ScoreTable,
    },
    {
      key: "NEWS_FEED",
      path: PATH["STUDENT_HOME"], // vì vậy ta dùng path của root
      component: NewsFeedWrapper,
      routes: [
        // children 1
        {
          key: "STUDENT_POST_LIST",
          path: PATH["STUDENT_POST_LIST"],
          exact: true,
          component: PostsArea,
        },
        {
          key: "STUDENT_POST_DETAIL",
          path: PATH["STUDENT_POST_DETAIL"](PATH["POST_ID"]),
          exact: true,
          component: PostDetail,
        },
        {
          key: "STUDENT_POST_SAVED",
          path: PATH["STUDENT_POST_SAVED"],
          exact: true,
          component: () => <PostList role="STUDENT" junctionId={""} type={5} />,
        },
        {
          key: "STUDENT_CLASSROOM",
          path: PATH["STUDENT_CLASSROOM"](
            PATH["CLASSROOM_ID"],
            PATH["POST_TYPE"]
          ),
          component: ClassroomDetailWrapper,
          routes: [
            // children 2
            {
              key: "STUDENT_CLASSROOM_NEWSFEED",
              path: PATH["STUDENT_CLASSROOM_NEWSFEED"](
                PATH["CLASSROOM_ID"],
                PATH["POST_TYPE"]
              ),
              exact: true,
              component: PostsArea,
            },
            {
              key: "STUDENT_LIST",
              path: PATH["STUDENT_LIST"](
                PATH["CLASSROOM_ID"],
                PATH["POST_TYPE"]
              ),
              exact: true,
              component: () => <StudentList role="STUDENT" />,
            },
          ],
        },
      ],
    },
  ],
};

export default StudentHomeRoutes;
