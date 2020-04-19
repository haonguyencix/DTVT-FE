import React, { Suspense } from "react";
import { Redirect } from "react-router-dom";
import { getLocalStorage } from "services/common";
import { TOKEN, ACCOUNT_ID } from "services/const";
import { AUTHEN } from "./const";
import Spinner from "components/Spinner";

const checkAuthen = authenType => {
  switch (authenType) {
    case AUTHEN.STUDENT_HOME:
      return getLocalStorage(TOKEN.STUDENT_LOGIN) || getLocalStorage(TOKEN.LECTURE_LOGIN);

    case AUTHEN.STUDENT_LOGIN:
      return !getLocalStorage(TOKEN.STUDENT_LOGIN);

    case AUTHEN.STUDENT_VERIFY:
      return !getLocalStorage(TOKEN.STUDENT_LOGIN) && getLocalStorage(ACCOUNT_ID);

    case AUTHEN.LECTURE_HOME:
      return getLocalStorage(TOKEN.LECTURE_LOGIN);

    case AUTHEN.LECTURE_LOGIN:
      return !getLocalStorage(TOKEN.LECTURE_LOGIN);

    case AUTHEN.LECTURE_VERIFY:
      return !getLocalStorage(TOKEN.LECTURE_LOGIN) && getLocalStorage(ACCOUNT_ID);

    case AUTHEN.RESET_PASSWORD:
      return getLocalStorage(TOKEN.RESET_PASSWORD) && getLocalStorage(ACCOUNT_ID);
      
    default:
      break;
  }
};

export const AuthGuard = Props => {
  return routeProps => {
    if (checkAuthen(Props.authen)) {
      return (
        <Suspense fallback={<Spinner />}>
          <Props.layout>
            <Props.screen {...routeProps} />
          </Props.layout>
        </Suspense>
      );
    }
    return <Redirect to={Props.redirect} />;
  };
};
