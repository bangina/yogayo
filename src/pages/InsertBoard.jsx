import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DropDown from "../components/DropDown";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const InsertBoard = () => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <div>
        <DropDown />

        <TextField
          id="title"
          label="제목"
          multiline
          fullWidth
          variant="outlined"
        />

        <TextField
          id="content"
          label="내용"
          multiline
          fullWidth
          variant="outlined"
          rows={10}
        />

        <Button className="write-btn" variant="contained" color="primary">
          글쓰기
        </Button>
      </div>
    </form>
  );
};

export default InsertBoard;
