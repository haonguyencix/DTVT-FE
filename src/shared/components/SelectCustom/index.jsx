import { withStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";

const SelectCustom = withStyles((theme) => ({
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

export default SelectCustom;
