import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      display: "flex",
      padding: spacing(2),
      minWidth: 288,
      borderRadius: 12,
      boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
      marginBottom: "10px",
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
  };
});

const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
    width: "80%",
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(202,211,216)",
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(117,156,250)",
  },
  thumb: {
    display: "none",
  },
}));
export const ClassCard = (props) => {
  const styles = useStyles();
  const sliderStyles = useSliderStyles();
  const {
    id,
    klassDate,
    startTime,
    endTime,
    place,
    klassName,
    companyName,
    enrolledPeople,
    maxPeople,
  } = props.klass;

  return (
    <Card className={cx(styles.card)} elevation={0}>
      <CardMedia
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      >
        <Avatar>{klassDate.getDay()}</Avatar>
      </CardMedia>
      <Box>
        <h3 className={styles.heading}>{klassName}</h3>
        <p variant="h5">
          {klassDate.getMonth()}월 {klassDate.getDate()}일 {klassDate.getDay()}
          요일 <br />
          {startTime} - {endTime}
        </p>
        <p className={styles.subheader}>
          {companyName} • {place}
        </p>
        <Box display={"flex"} alignItems={"center"}>
          <Slider
            classes={sliderStyles}
            value={(enrolledPeople / maxPeople) * 100}
          />
          <span className={styles.value}>
            {enrolledPeople}/{maxPeople}명 신청
          </span>
        </Box>
      </Box>
    </Card>
  );
};

export default ClassCard;
