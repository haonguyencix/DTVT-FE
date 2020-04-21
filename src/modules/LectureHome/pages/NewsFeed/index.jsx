import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { sendAccessToken } from "core/services/utils";
import { Container } from "@material-ui/core";
import { actSendLoginToken } from "core/store/accounts/accountAction";
import { getCredential } from "core/store/accounts/accountAction";
import { TOKEN } from "shared/constants";
import CreatePost from "modules/LectureHome/components/CreatePost";
import Clock from "shared/components/Clock";
import * as Cookies from "js-cookie";

const NewsFeed = (props) => {
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
    <Container>
      <div className={styles.Wrapper}>
        <div className={styles.Navbar}>
          <Clock
            className={styles.Clock}
            size="120px"
            bgColor="#fff"
            borderColor="#000"
            numColor="#000"
          />
        </div>
        <div className={styles.Children}>
          <CreatePost />
          {props.children}
        </div>
        <div className={styles.Classrooms}>Đây là danh mục lớp đang dạy</div>
      </div>
    </Container>
  );
};

export default NewsFeed;