import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControl, NativeSelect, InputBase } from "@material-ui/core";

const CustomSelect = withStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  input: {
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #c1c1c1",
    padding: "10px 26px 10px 12px",
    "&:focus": {
      backgroundColor: theme.palette.background.paper,
      borderColor: "#000",
      borderRadius: 8,
    },
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
}))(InputBase);

const Control = (props) => {
  const { selectList, className, handleChange, value } = props;

  return (
    <div className={className}>
      {selectList &&
        selectList.map((item) => (
          <FormControl
            key={item.name}
            className={item.styles}
          >
            <NativeSelect
              input={<CustomSelect />}
              value={value[item.name]}
              onChange={handleChange}
              name={item.name}
            >
              {item.options.map((i) => (
                <option key={i} value={i}>
                  {item.content} {i}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        ))}
    </div>
  );
};

export default Control;
