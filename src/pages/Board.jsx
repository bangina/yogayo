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
import VisibilityIcon from "@material-ui/icons/Visibility";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import axios from "axios";

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
  btn: {
    marginRight: theme.spacing(1),
  },
}));

export default function Board(props) {
  const classes = useStyles();

  const tableHeaderColor = "primary";
  const tableHead = ["말머리", "글제목", "작성자", "등록일"];
  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [globalPosts, setGlobalPosts] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8000/api/posts/";

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("조회목록데이터:", response.data);
        setGlobalPosts(response.data);
      })
      .catch((response) => {
        console.error(response);
      });

    // const newData = [];
    // for (let i = 0; i < globalPosts.length; i++) {
    //   newData.push([
    //     globalPosts[i].id,
    //     globalPosts[i].header,
    //     globalPosts[i].title,
    //     globalPosts[i].writer,
    //     globalPosts[i].regiDate,
    //   ]);
    // }
    setAllData(globalPosts);
    setTableData(globalPosts.slice(0, 10));
  }, []);

  const handlePage = (event, value) => {
    const startNum = (value - 1) * 10;
    const endNum = value * 10 - 1;
    setTableData(allData.slice(startNum, endNum));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom color="primary">
        요가요 커뮤니티
      </Typography>
      <div className={classes.tableResponsive}>
        <div>
          <DropDown
            title="말머리"
            value={["중고장터", "요가", "필라테스", "같이 운동해요", "기타"]}
            onChange={(value) => console.log(value)}
          />
        </div>
        <div style={{ float: "right" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => props.history.push("/board/insert")}
          >
            글쓰기
          </Button>
          <RouterLink to="/myposts">
            <Button variant="outlined" color="primary">
              내 글 보기
            </Button>
          </RouterLink>
        </div>
        <Table className={classes.table}>
          <colgroup>
            <col style={{ width: "20%" }} />
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
            {globalPosts.map((dataItem, index) => {
              console.log(dataItem);
              return (
                <TableRow key={index} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell} key={index}>
                    <RouterLink to={`/board/detail/${dataItem.id}`}>
                      {dataItem.category}
                    </RouterLink>
                  </TableCell>
                  <TableCell className={classes.tableCell} key={index}>
                    <RouterLink to={`/board/detail/${dataItem.id}`}>
                      <div>{dataItem.title} </div>
                      <div style={{ color: "gray" }}>
                        <VisibilityIcon style={{ fontSize: 15 }} /> 10{" "}
                        <ChatBubbleIcon style={{ fontSize: 15 }} /> 5
                      </div>
                    </RouterLink>
                  </TableCell>
                  <TableCell className={classes.tableCell} key={index}>
                    <RouterLink to={`/board/detail/${dataItem.id}`}>
                      {dataItem.username}
                    </RouterLink>
                  </TableCell>
                  <TableCell className={classes.tableCell} key={index}>
                    <RouterLink to={`/board/detail/${dataItem.id}`}>
                      {dataItem.created.substring(0, 10)}
                    </RouterLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className={classes.root}>
        <Pagination
          count={Math.ceil(globalPosts.length / 10)}
          onChange={handlePage}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <SearchBar />
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
