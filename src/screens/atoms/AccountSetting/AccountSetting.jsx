import React from "react";
import styles from "./AccountSetting.module.scss";
import { connect, useDispatch } from "react-redux";

import AvtDefaut from "../../../assets/img/avt-default-2.png";

// import libraries
import { Link } from "react-router-dom";

// import material
import { Avatar } from "@material-ui/core";
import { ExitToApp, PersonOutline } from "@material-ui/icons";

// import const
import { FETCH_STUDENT_SIGN_IN } from "../../../components/accounts/accountConst";

// import services
import { stringShortcut } from "../../../services/common";

const AccountSetting = props => {
  const { profile } = props;
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch({
      type: FETCH_STUDENT_SIGN_IN["SUCCESS"],
      payload: { studentSignIn: null }
    });
    // localStorage.removeItem("studentSignIn"); // đang phát triển chưa mở được
  };

  return (
    <ul className={styles.Container}>
      <li className={styles.Profile}>
        <Avatar
          src={AvtDefaut}
          className={styles.AvtImg}
          alt="Avatar mặc định"
        />
        <div>
          <h6>{profile && profile.name}</h6>
          <span className={styles.Email}>
            {profile && stringShortcut(profile.email, 29)}
          </span>
        </div>
      </li>
      <li className={styles.LinkItem}>
        <Link className={styles.Link} to="/student-profile">
          <PersonOutline className={styles.Icon} />
          Sửa hồ sơ
        </Link>
      </li>
      <li className={styles.LinkItem}>
        <span className={styles.Link} onClick={() => signOut()}>
          <ExitToApp className={styles.Icon} />
          Đăng xuất
        </span>
      </li>
    </ul>
  );
};

export default connect(state => ({
  profile:
    state.accountData.studentSignIn && state.accountData.studentSignIn.profile
}))(AccountSetting);
