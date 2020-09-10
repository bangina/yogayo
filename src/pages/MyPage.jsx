import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import PlaceIcon from "@material-ui/icons/Place";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    // background: "#f3717d",
    // color: "#fff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    // marginBottom: 12,
  },
});

const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
    width: "100%",
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(202,211,225)",
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "#f3717d",
  },
  thumb: {
    display: "none",
  },
}));

export default function SimpleCard() {
  const classes = useStyles();
  const sliderStyles = useSliderStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div style={{ marginBottom: "15px" }}>
      <Typography variant="h4" color="" gutterBottom>
        마이 페이지
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography className={classes.title} gutterBottom>
                  나의 정보
                </Typography>
                <RouterLink to="/mypage/edit">
                  <Button variant="outlined">정보 변경하기</Button>
                </RouterLink>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <Typography>솔방울 회원님</Typography>
                  <Typography gutterBottom>solbangall@gmail.com</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                이용 정보
              </Typography>

              <Typography className={classes.title} color="" gutterBottom>
                <PlaceIcon /> 센터 : 요가왕 요가원
              </Typography>
              <Typography>
                <ConfirmationNumberIcon /> 6:1 주 2회 3개월 이용권
              </Typography>
              <Typography component="h2">이용권 정상 (잔여횟수 7회)</Typography>
              <Typography color="textSecondary" gutterBottom>
                총 10회중 3회 사용
              </Typography>
              <Slider classes={sliderStyles} value={30} />
              <Typography variant="body2" component="p">
                2020.9.8 ~ 2020.11.8 (24일 남음)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
