import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function MultilineTextFields(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    console.log(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">말머리</InputLabel>
        <Select onChange={handleChange}>
          <MenuItem value={"중고거래"}>중고거래</MenuItem>
          <MenuItem value={"요가"}>요가</MenuItem>
          <MenuItem value={"필라테스"}>필라테스</MenuItem>
          <MenuItem value={"기타"}>기타</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
