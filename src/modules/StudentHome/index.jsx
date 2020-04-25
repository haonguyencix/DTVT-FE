import React, { Fragment, useEffect } from "react";
import Header from "shared/components/Header";
import { sendAccessToken } from "core/services/utils";
import { actSendLoginToken } from "core/store/accounts/accountAction";
import { getCredential } from "core/store/accounts/accountAction";
import { TOKEN, PATH } from "shared/constants";
import { useDispatch } from "react-redux";
import * as Cookies from "js-cookie";

const StudentHomeLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get(TOKEN["STUDENT"]);

    if (token) {
      dispatch(actSendLoginToken(token));
      sendAccessToken(token);
      dispatch(getCredential());
    }
  }, [dispatch]);

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

export default StudentHomeLayout;
