import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

// import Material UI
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Search = () => {
  const [isChangeColor, setIsChangeColor] = useState(false);

  const handleFocus = () => {
    setIsChangeColor(true);
  };

  const handleBlur = () => {
    setIsChangeColor(false);
  };

  return (
    <div
      className={clsx(styles.Container, {
        [styles.BorderColorChanged]: isChangeColor
      })}
    >
      <div
        className={clsx(styles.Icon, { [styles.ColorChanged]: isChangeColor })}
      >
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Tìm kiếm…"
        className={styles.InputBase}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Search;
