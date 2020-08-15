import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
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
  const classes = useStyles();
  const date = new Date();
  const [klasses, setKlasses] = useState([
    {
      id: 1,
      klassDate: date.getDate(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 2,
      klassDate: date.getDate(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 3,
      klassDate: date.getDate(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 4,
      klassDate: date.getDate() + 1,
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 5,
      klassDate: date.getDate() + 2,
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 6,
      klassDate: new Date().getDate() + 3,
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
  ]);
  const todayKlasses = klasses.filter(
    (klass) => klass.klassDate === new Date().getDate()
  );
  console.log(klasses[0]);
  console.log(todayKlasses);
  console.log(new Date());
  return (
    <StyledTimeline>
      <Timeline>
        {todayKlasses.map((klass) => (
          <TimelineItem key={klass.id}>
            <TimelineSeparator>
              {/* <span>{klass.date}요일</span> */}
              <TimelineDot color="secondary">{klass.startTime}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  {klass.klassName}
                </Typography>
                <Typography>
                  {klass.startTime} - {klass.endTime} | {klass.place}
                </Typography>
                <Link to={`/register/${klass.id}`}>
                  <Button variant="outlined" color="primary">
                    수강신청
                  </Button>
                </Link>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </StyledTimeline>
  );
};

export default BookingClassList;
