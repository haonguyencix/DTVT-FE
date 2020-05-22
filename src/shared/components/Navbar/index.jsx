import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { getFirstLetter, stringShortcut } from "core/services/utils";
import { Avatar } from "@material-ui/core";

const Navbar = (props) => {
  const { navList } = props;

  const renderLinks = (arr) =>
    arr.map((item, index) => {
      const { name, slug, Icon } = item;
      return (
        <li key={index} className={styles.LinkItem}>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.NavLinkActive}
            to={slug}
          >
            {Icon ? (
              <Fragment>
                <Icon className={styles.Icon} />
                {name}
              </Fragment>
            ) : (
              <Fragment>
                <Avatar className={styles.Avt}>
                  {getFirstLetter(name, false, 0)}
                </Avatar>
                {stringShortcut(name, 20)}
              </Fragment>
            )}
          </NavLink>
        </li>
      );
    });

  const renderNavList = Object.keys(navList).map((key, index) => (
      <Fragment key={index}>
        {key && <h6 className={styles.Title}>{key}</h6>}
        <ul className={styles.Links}>{renderLinks(navList[key])}</ul>
      </Fragment>
  ));

  return <div className={styles.Container}>{renderNavList}</div>;
};

export default Navbar;
