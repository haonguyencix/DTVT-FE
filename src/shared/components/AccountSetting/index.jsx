import React from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { ExitToApp, PersonOutline } from "@material-ui/icons";
import { actClearStore } from "core/store/accounts/accountAction";
import { stringShortcut } from "core/services/utils";
import AvtDefaut from "assets/img/avt-default-2.png";
import { PATH, TOKEN } from "shared/constants";
import * as Cookies from "js-cookie";

const AccountSetting = props => {
  const { credential } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const signOut = () => {
    localStorage.clear();
    dispatch(actClearStore());
    history.push(props.backLogin);
    const role = credential ? credential.role.toUpperCase() : '';
    if(role) Cookies.remove(TOKEN[role]);
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
        <Link className={styles.Link} to={PATH["STUDENT_PROFILE"]}>
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
