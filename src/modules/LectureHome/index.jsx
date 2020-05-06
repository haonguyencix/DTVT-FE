import React, { Fragment, useEffect } from "react";
import Header from "shared/components/Header";
import { useDispatch } from "react-redux";
import { sendAccessToken } from "core/services/utils";
import { actSendLoginToken } from "core/store/accounts/accountAction";
import { getCredential } from "core/store/accounts/accountAction";
import { TOKEN } from "shared/constants";
import { PATH } from "shared/constants";
import * as Cookies from "js-cookie";

const LectureHomeLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get(TOKEN["LECTURE"]);

    if (token) {
      dispatch(actSendLoginToken(token));
      sendAccessToken(token);
      dispatch(getCredential());
    }
  }, [dispatch]);

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
