import React from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import SelectCustom from "../SelectCustom";

const Control = (props) => {
  const { selectList, className, handleChange, value } = props;

  return (
    <div className={className}>
      {selectList &&
        selectList.map((item) => {
          const { name, common = "", options, styles, disabled = false } = item;
          return (
            <FormControl
              key={name}
              className={styles}
              disabled={disabled}
            >
              <NativeSelect
                input={<SelectCustom />}
                value={value[name]}
                onChange={handleChange}
                name={name}
              >
                {Object.keys(options).map((v, i) => (
                  <option key={i} value={v}>
                    {common} {options[v]}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          )
        })}
    </div>
  );
};

export default Control;
