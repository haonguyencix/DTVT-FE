import React, { Fragment } from "react";
import Header from "shared/components/Header";
import { getLocalStorage } from "core/services/utils";
import { TOKEN, PATH } from "shared/constants";
import { Redirect } from "react-router-dom";

const LectureHomeGuard = (props) => {
  if (!getLocalStorage(TOKEN["LECTURE"])) {
    return <Redirect to={PATH["LECTURE_LOGIN"]} />;
  }

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

export default LectureHomeGuard;
