import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import DropDown from "../components/DropDown";
import SearchBar from "../components/SearchBar";

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
  const [tableData, setTableData] = useState([]);
  const globalPosts = useSelector((state) => state.posts);

  useEffect(() => {
    setTableData(globalPosts.slice(0, 9));
  }, [globalPosts]);

  const handlePage = (event, value) => {
    const startNum = (value - 1) * 10;
    const endNum = value * 10 - 1;
    setTableData(globalPosts.slice(startNum, endNum));
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom color="primary">
        요기 모여라
      </Typography>
      <div className={classes.tableResponsive}>
        <div>
          <Button
            variant="contained"
            color="primary"
            className="write-btn"
            onClick={() => props.history.push("/board/insert")}
          >
            글쓰기
          </Button>
          <DropDown
            onChange={(value) => console.log("Borad onChange", value)}
          />
        </div>

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
                        <RouterLink to="/board/detail">{prop}</RouterLink>
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
        <Pagination
          count={parseInt(globalPosts.length / 10) + 1}
          onChange={handlePage}
        />
      </div>

      <SearchBar />
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
