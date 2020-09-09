import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
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
  value: {
    textAlign: "right",
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
    backgroundColor: "rgb(202,211,216)",
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "#b12a5b",
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                솔방울 {bull} 요가왕 요가원
              </Typography>
              <Typography variant="h5" component="h2">
                6:1 주 2회 3개월 이용권
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <br />
                <br />
              </Typography>
              <Typography variant="body2" component="p">
                2020.9.8 ~ 2020.11.8
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                이용상태
              </Typography>
              <Typography variant="h5" component="h2">
                사용중 {bull} 24일 남음 {bull} 잔여 3/10
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <br />
                결제 정보
              </Typography>
              <Typography variant="body2" component="p">
                430,000 원
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6" component="h2">
                출석률
              </Typography>

              <Typography
                className={classes.value}
                color="textSecondary"
                gutterBottom
              >
                총 10회중 3회 출석
              </Typography>

              <Slider classes={sliderStyles} value={30} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
