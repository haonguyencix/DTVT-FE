import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getLocalStorage, sendAccessToken } from "../../../services/common";

// import const
import { FETCH_STUDENT_SIGN_IN } from "../../../components/accounts/accountConst";

// import components
import Header from "../../organisms/Home/Header/Header";
import Footer from "../../organisms/Home/Footer/Footer";

const HomeLayout = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const studentSignIn = getLocalStorage("studentSignIn").data;
    
    if (studentSignIn) {
      dispatch({
        type: FETCH_STUDENT_SIGN_IN["SUCCESS"],
        payload: { studentSignIn }
      });
      sendAccessToken(studentSignIn.token);
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header {...props} />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default connect(state => ({
  studentSignIn: state.accountData.studentSignIn
}))(HomeLayout);
