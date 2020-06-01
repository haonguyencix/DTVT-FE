import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FormControl, NativeSelect, Button } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import Search from "shared/components/Search";
import SelectCustom from "shared/components/SelectCustom";

const WillOpenFilter = () => {
  const [value, setValue] = useState("Tên môn học");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const selectArr = ["Tên môn học", "Mã môn học"];

  return (
    <div className={styles.FilterBar}>
      <FormControl className={styles.FilterSelect}>
        <NativeSelect
          input={<SelectCustom />}
          value={value}
          onChange={handleChange}
          name="subject-filter"
        >
          {selectArr.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <div className={styles.Search}>
        <Search placeholder={`Tìm theo ${value.toLowerCase()}...`} />
      </div>
      <Button
        variant="contained"
        endIcon={<ExpandMore />}
        className={styles.BtnFilter}
      >
        Lọc
      </Button>
    </div>
  );
};

export default WillOpenFilter;
