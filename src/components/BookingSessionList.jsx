import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import BookingModal from "./BookingModal";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/core/Slider";
import cx from "clsx";
import { selectSession } from "../redux/session";
import { openModal } from "../redux/modal";

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
    margin-left: 1rem;
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
const BookingSessionList = () => {
  const styles = useStyles();
  const sliderStyles = useSliderStyles();
  const globalSession = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const todaySessions = globalSession.sessions.filter(
    (session) =>
      session.sessionDate.getDate() === globalSession.selectedDate.getDate()
  );
  const [selectedSession, setSelectedSession] = useState({});
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
      case 0:
        return "일";
      default:
        return "";
    }
  };

  const onBtnClick = (e) => {
    const selectedSession = globalSession.sessions.filter(
      (session) => session.id.toString() === e.currentTarget.value.toString()
    )[0];
    dispatch(openModal());
    dispatch(selectSession(selectedSession));
  };

  return (
    <>
      <StyledTimeline>
        <Timeline>
          {todaySessions.map((session) => (
            <>
              {/* 카드 형식 */}
              <TimelineItem key={session.id}>
                <TimelineSeparator>
                  <TimelineDot color="secondary">
                    {session.startTime}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={cx(styles.card)} elevation={0}>
                    <CardContent
                      style={{
                        background:
                          "rgba(0,0,0,0.1)",
                      }}
                    >
                      <CardMedia
                        image="/static/images/cards/live-from-space.jpg"
                        title="Live from space album cover"
                      >
                        <Avatar>
                          {printDay(session.sessionDate.getDay())}
                        </Avatar>
                      </CardMedia>
                    </CardContent>
                    <Box>
                      <h3 className={styles.heading}>{session.sessionName}</h3>
                      <p variant="h5">
                        {session.sessionDate.getMonth()}월{" "}
                        {session.sessionDate.getDate()}일{" "}
                        {printDay(session.sessionDate.getDay())}
                        요일 <br />
                        {session.startTime} - {session.endTime}
                      </p>
                      <p className={styles.subheader}>
                        {session.companyName} • {session.place}
                      </p>
                      <Box display={"flex"} alignItems={"center"}>
                        <Slider
                          classes={sliderStyles}
                          value={
                            (session.enrolledPeople.length /
                              session.maxPeople) *
                            100
                          }
                        />
                        <span className={styles.value}>
                          {session.enrolledPeople.length}/{session.maxPeople}명
                          신청
                        </span>
                      </Box>
                      <Button
                        variant={
                          session.maxPeople === session.enrolledPeople
                            ? "outlined"
                            : "contained"
                        }
                        onClick={(e) => onBtnClick(e)}
                        value={session.id}
                        color="primary"
                      >
                        {session.maxPeople === session.enrolledPeople
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
      <BookingModal isOpen={isOpen} selectedSession={selectedSession} />
    </>
  );
};
export default BookingSessionList;
