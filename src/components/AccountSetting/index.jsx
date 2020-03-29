import React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { ExitToApp, PersonOutline } from "@material-ui/icons";
import { actSendLoginToken, actSetCredential } from "redux/accounts/accountAction";
import { stringShortcut } from "services/common";
import AvtDefaut from "assets/img/avt-default-2.png";

const AccountSetting = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const credential = useSelector(state => state.accountData.credential);

  const signOut = () => {
    dispatch(actSendLoginToken(null));
    dispatch(actSetCredential(null));
    localStorage.clear();
    history.push("/");
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
          <h6>{credential && credential.firstName + " " + credential.lastName}</h6>
          <span className={styles.Email}>
            {credential && stringShortcut(credential.email, 29)}
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

export default AccountSetting;
