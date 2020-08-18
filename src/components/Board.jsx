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
import Button from "@material-ui/core/Button";

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
    [1, "gravida", "egestas. Aliquam", "Lacota", "Oct 26, 2020"],
    [
      2,
      "dis",
      "mauris a nunc. In at pede. Cras vulputate velit eu",
      "Kyla",
      "Jul 17, 2020",
    ],
    [3, "ridiculus", "lectus.", "Medge", "Feb 22, 2021"],
    [
      4,
      "elementum",
      "libero est, congue a, aliquet vel,",
      "Justina",
      "Apr 1, 2020",
    ],
    [5, "dolor", "felis eget varius ultrices,", "Hermione", "Apr 20, 2021"],
    [
      6,
      "Vestibulum",
      "commodo tincidunt nibh. Phasellus nulla.",
      "Meredith",
      "Nov 6, 2019",
    ],
    [7, "diam.", "nec", "Darryl", "Nov 13, 2019"],
    [8, "sit", "in,", "Lysandra", "Nov 18, 2020"],
    [
      9,
      "dictum.",
      "Cras pellentesque. Sed dictum. Proin eget odio.",
      "Xantha",
      "Apr 15, 2020",
    ],
    [10, "sem", "feugiat nec, diam.", "Kelsie", "Dec 14, 2019"],
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

        <Button variant="contained" color="primary">
          글쓰기
        </Button>
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
