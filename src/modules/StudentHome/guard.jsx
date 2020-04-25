import React, { Fragment } from "react";
import Header from "shared/components/Header";
import { TOKEN, PATH } from "shared/constants";
import { Redirect } from "react-router-dom";
import * as Cookies from "js-cookie";

const StudentHomeGuard = (props) => {
  if (!Cookies.get(TOKEN["STUDENT"])) {
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
