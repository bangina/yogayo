import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      display: "flex",
      paddingLeft: 0,
      minWidth: 288,
      borderRadius: 12,
      boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
      marginBottom: "10px",
      "& > *": {
        padding: spacing(1),
      },
      "& > *:nth-child(1)": {
        marginRight: spacing(2),
      },
      "& > *:nth-child(2)": {
        flex: "auto",
      },
    },
    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 16,
      marginBottom: 0,
    },
    subheader: {
      fontFamily: family,
      fontSize: 14,
      color: palette.grey[600],
      letterSpacing: "1px",
      marginBottom: 4,
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
    color1: {
      color: "#fff",
      backgroundColor: "#b12a5b",
    },
  };
});
const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
    width: "70%",
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
export const SessionCard = (props) => {
  const styles = useStyles();
  const sliderStyles = useSliderStyles();
  const enrolledSession = props.enrolledSession[0];
  const printDay = (props) => {
    switch (props) {
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";
      case 0:
        return "일";
      default:
        return "";
    }
  };
  return (
    <Card className={cx(styles.card)} elevation={0}>
      <CardContent style={{ background: "pink" }}>
        <CardMedia
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        >
          <Avatar className={styles.color2}>
            {printDay(enrolledSession.sessionDate.getDay())}
          </Avatar>
        </CardMedia>
      </CardContent>
      <Box>
        <h3 className={styles.heading}>{enrolledSession.sessionName}</h3>
        <p variant="h5">
          {enrolledSession.sessionDate.getMonth()}월{" "}
          {enrolledSession.sessionDate.getDate()}일{" "}
          {enrolledSession.sessionDate.getDay()}
          요일 <br />
          {enrolledSession.startTime} - {enrolledSession.endTime}
        </p>
        <p className={styles.subheader}>
          {enrolledSession.companyName} • {enrolledSession.place}
        </p>
        <Box display={"flex"} alignItems={"center"}>
          <Slider
            classes={sliderStyles}
            value={
              (enrolledSession.enrolledPeople.length /
                enrolledSession.maxPeople) *
              100
            }
          />
          <span className={styles.value}>
            {enrolledSession.enrolledPeople.length}/{enrolledSession.maxPeople}
            명 신청
          </span>
        </Box>
        <Button variant="outlined" color="primary">
          취소하기
        </Button>
      </Box>
    </Card>
  );
};

export default SessionCard;
