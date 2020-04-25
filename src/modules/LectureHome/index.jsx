import React, { Fragment } from "react";
import Header from "shared/components/Header";
import { PATH } from "shared/constants";

const LectureHomeLayout = (props) => {
  return (
    <Fragment>
      <Header
        backHome={PATH["LECTURE_HOME"]}
        backLogin={PATH["LECTURE_LOGIN"]}
      />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default LectureHomeLayout;
