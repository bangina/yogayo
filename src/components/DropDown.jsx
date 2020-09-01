import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "15ch",
    },
  },
}));

export default function MultilineTextFields(props) {
  const classes = useStyles();
  const options = ["말머리 선택", "중고장터", "기타"];
  const [selectedOption, setSelectedOption] = useState("말머리 선택");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-currency"
          select
          value={selectedOption}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  );
}
