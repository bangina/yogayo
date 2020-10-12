import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputLabel: {
    fontSize: "14px",
  },
  menuItem: {
    fontSize: "14px",
    minHeight: 0,
  },
}));

export default function DropDown(props) {
  const classes = useStyles();
  // console.log(props, "props");
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-label" className={classes.inputLabel}>
        {props.title}
      </InputLabel>
      <Select onChange={handleChange} className={classes.select}>
        {props.value.map((v) => (
          <MenuItem value={v} className={classes.menuItem}>
            {v}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
