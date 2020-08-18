import React from "react";
import Table from "./Table";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TableList() {
  const classes = useStyles();

  return (
    <div>
      <Table
        tableHeaderColor="primary"
        tableHead={["글번호", "말머리", "글제목", "작성자", "등록일"]}
        tableData={[
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
          ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
        ]}
      />
      <div className={classes.root}>
        <Pagination count={10} />
      </div>
    </div>
  );
}
