import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Cookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Main = (props) => {
  const loginMember = {
    name: "test1",
    email: "test1@gmail.com",
    password: "test1",
    mobile: "010-1111-1111",
    Voucher: {
      id: 1,
      center: "솔방울 요가원",
      VoucherName: "[특가] 6:1 3개월 24회 수강권",
      date: "2020.8.19 ~ 2020.10.19",
      attendance: "24회 중 1회 출석",
    },
  };

  const classes = useStyles();

  const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get("member");
    return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
  };

  const loginUser = getLoggedInUser();

  useEffect(() => {
    if (!loginUser) {
      props.history.push("/login");
    }
  });

  const onLogout = () => {
    const cookies = new Cookies();
    cookies.remove("member");
    props.history.push("/login");
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {loginUser ? loginUser.name : ""}님{/* {loginMember.name}님 */}
            </Typography>
            <Typography
              // variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {loginMember.Voucher.center} <br />
              {loginMember.Voucher.VoucherName} <br />
              {loginMember.Voucher.date} <br />
              {loginMember.Voucher.attendance} <br />
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.history.push("/booking")}
                  >
                    수업 예약
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    name="logout"
                    onClick={onLogout}
                  >
                    로그아웃
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="./img/yoga.jpg"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    요가 기록
                  </Typography>
                  <Typography>
                    요가 기록 설명글 어쩌구 저쩌구 랄라블라
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => props.history.push("/diary")}
                  >
                    바로가기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="./img/people.jpg"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    커뮤니티
                  </Typography>
                  <Typography>
                    커뮤니티 설명글 와라랄ㄹ라라라라ㅏ라랄
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => props.history.push("/board")}
                  >
                    바로가기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Main;