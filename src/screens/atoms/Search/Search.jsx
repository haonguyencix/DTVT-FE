import React, { useState } from "react";
import styles from "./Search.module.scss";

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
      className={[
        styles.Container,
        `${isChangeColor && styles.BorderColorChanged}`
      ].join(" ")}
    >
      <div
        className={[
          styles.Icon,
          `${isChangeColor && styles.ColorChanged}`
        ].join(" ")}
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
