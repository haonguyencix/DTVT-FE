import React, { useEffect }  from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { TOKEN } from "services/const";
import { getLocalStorage, sendAccessToken } from "services/common";
import { Container } from "@material-ui/core";
import CreatePost from "./CreatePost";
import Header from "layouts/StudentHome/Header";
import Clock from "components/Clock";
import { actSendLoginToken } from "redux/accounts/accountAction";
import { getCredential } from "redux/accounts/accountAction";

const LectureHome = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const lectureLoginToken = getLocalStorage(TOKEN.LECTURE_LOGIN);
    
    if (lectureLoginToken) {
      dispatch(actSendLoginToken(lectureLoginToken));
      sendAccessToken(lectureLoginToken);
      dispatch(getCredential());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header redirectTo="/lecture" />
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
    </React.Fragment>
  );
};

export default LectureHome;
