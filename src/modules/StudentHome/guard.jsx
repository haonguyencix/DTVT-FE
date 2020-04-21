import React, { Fragment } from "react";
import Header from "shared/components/Header";
import { getLocalStorage } from "core/services/utils";
import { TOKEN, PATH } from "shared/constants";
import { Redirect } from "react-router-dom";

const StudentHomeGuard = (props) => {
  if (!getLocalStorage(TOKEN["STUDENT"])) {
    return <Redirect to={PATH["STUDENT_LOGIN"]} />;
  }

  return (
    <Fragment>
      <Header
        backHome={PATH["STUDENT_HOME"]}
        backLogin={PATH["STUDENT_LOGIN"]}
      />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default StudentHomeGuard;
