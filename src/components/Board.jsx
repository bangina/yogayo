import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  primaryTableHeader: {
    color: "#cf556c",
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
  },
  tableHeadCell: {
    color: "inherit",
    "&, &$tableCell": {
      fontSize: "1em",
    },
  },
  tableCell: {
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontSize: "0.8125rem",
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Board(props) {
  const classes = useStyles();

  const tableHeaderColor = "primary";
  const tableHead = ["글번호", "말머리", "글제목", "작성자", "등록일"];
  const tableData = [
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
    ["1", "[기타]", "요가 재밌어요~~", "요친놈", "2020-08-18"],
  ];

  return (
    <div>
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className={classes.root}>
        <Pagination count={10} />
      </div>
    </div>
  );
}

Board.defaultProps = {
  tableHeaderColor: "gray",
};

Board.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
