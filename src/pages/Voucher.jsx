import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { useContainedCardHeaderStyles } from "@mui-treasury/styles/cardHeader/contained";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    marginTop: 40,
    borderRadius: spacing(0.5),
    transition: "0.3s",
    width: "90%",
    maxWidth: "600px",
    margin: "auto",
    overflow: "initial",
    background: "#ffffff",
  },
  content: {
    paddingTop: 0,
    textAlign: "left",
    overflowX: "auto",
    "& table": {
      marginBottom: 0,
    },
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: spacing(2),
    },
  },
}));

let id = 0;
function createData(name, value) {
  id += 1;
  return { id, name, value };
}

const rows = [
  // comment
  createData("수강권 명", "1:6 소그룹 3개월 이용권"),
  createData("기간", "2020.8.19 - 2020.10.19"),
  createData("총 횟수", "24회"),
  createData("출석", "1회"),
  createData("남은 횟수", "23회"),
];

export const Voucher = React.memo(function ElevatedHeaderCard() {
  const classes = useStyles();
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();
  return (
    <div>
      {!rows ? (
        <div className={classes.root}>
          <Alert severity="error">
            <AlertTitle>수강권 없음</AlertTitle>
            <strong>수강권</strong>을 등록해 주세요
          </Alert>
        </div>
      ) : (
        <Card className={cx(classes.card, cardShadowStyles.root)}>
          <CardHeader
            className={cardHeaderShadowStyles.root}
            classes={cardHeaderStyles}
            title={"내 회원권 정보"}
            subheader={""}
          />
          <CardContent className={classes.content}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>요가원</TableCell>
                  <TableCell align="right">솔방울 요가원</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

export default Voucher;
