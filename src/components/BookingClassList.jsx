import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import BookingModal from "./BookingModal";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/core/Slider";
import cx from "clsx";

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
const StyledTimeline = styled(Timeline)`
  color: red;
  padding: 0;
  .MuiTimeline-root {
    padding: 0;
  }
  .MuiTimelineContent-root {
    padding: 6px 0;
  }
  .MuiTimelineItem-missingOppositeContent:before {
    flex: 0;
  }
  .MuiTimelineItem-missingOppositeContent:before {
    padding: 0;
  }
  .MuiTimelineSeparator-root {
    margin-right: 5px;
  }
  .MuiTimelineDot-root {
    color: #fff;
    padding: 5px 10px;
    border-radius: 50px;
  }
`;
const BookingClassList = () => {
  const styles = useStyles();
  const sliderStyles = useSliderStyles();
  const globalklass = useSelector((state) => state.klass);
  const todayKlasses = globalklass.klasses.filter(
    (klass) => klass.klassDate.getDate() === globalklass.selectedDate.getDate()
  );
  const [selectedKlass, setSelectedKlass] = useState({});
  const [isOpen, setIsOpen] = useState(false);

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
      case 7:
        return "일";
      default:
        return "";
    }
  };

  const onBtnClick = (e) => {
    setIsOpen(true);
    setSelectedKlass(
      globalklass.klasses.filter(
        (klass) => klass.id.toString() === e.currentTarget.value.toString()
      )[0]
      //filter 메소드는 결과물이 array로 리턴됨. id값 일치하는 수업은 1개 이므로 배열의 첫번째[0] object만 저장.
    );
    console.log(isOpen);
  };

  return (
    <>
      <StyledTimeline>
        <Timeline>
          {todayKlasses.map((klass) => (
            <>
              {/* 카드 형식 */}
              <TimelineItem key={klass.id}>
                <TimelineSeparator>
                  <TimelineDot color="secondary">{klass.startTime}</TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={cx(styles.card)} elevation={0}>
                    <CardContent style={{ background: "pink" }}>
                      <CardMedia
                        image="/static/images/cards/live-from-space.jpg"
                        title="Live from space album cover"
                      >
                        <Avatar className={styles.color2}>
                          {printDay(klass.klassDate.getDay())}
                        </Avatar>
                      </CardMedia>
                    </CardContent>
                    <Box>
                      <h3 className={styles.heading}>{klass.klassName}</h3>
                      <p variant="h5">
                        {klass.klassDate.getMonth()}월{" "}
                        {klass.klassDate.getDate()}일{" "}
                        {printDay(klass.klassDate.getDay())}
                        요일 <br />
                        {klass.startTime} - {klass.endTime}
                      </p>
                      <p className={styles.subheader}>
                        {klass.companyName} • {klass.place}
                      </p>
                      <Box display={"flex"} alignItems={"center"}>
                        <Slider
                          classes={sliderStyles}
                          value={(klass.enrolledPeople / klass.maxPeople) * 100}
                        />
                        <span className={styles.value}>
                          {klass.enrolledPeople}/{klass.maxPeople}명 신청
                        </span>
                      </Box>
                      <Button
                        variant={
                          klass.maxPeople === klass.enrolledPeople
                            ? "outlined"
                            : "contained"
                        }
                        onClick={(e) => onBtnClick(e)}
                        value={klass.id}
                        color="primary"
                      >
                        {klass.maxPeople === klass.enrolledPeople
                          ? "대기하기"
                          : "수강신청"}
                      </Button>
                    </Box>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            </>
          ))}
        </Timeline>
      </StyledTimeline>
      <BookingModal isOpen={isOpen} selectedKlass={selectedKlass} />;
    </>
  );
};
export default BookingClassList;
