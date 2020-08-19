import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import BookingModal from "./BookingModal";

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
  const globalklass = useSelector((state) => state.klass);
  const todayKlasses = globalklass.klasses.filter(
    (klass) => klass.klassDate.getDate() === globalklass.selectedDate.getDate()
  );
  const [selectedKlass, setSelectedKlass] = useState({
    id: "",
    klassDate: new Date(),
    startTime: "",
    endTime: "",
    place: "",
    klassName: "힐링 요가",
    companyName: "",
    maxPeople: "",
    enrolledPeople: "",
  });
  const [open, setOpen] = useState(false);
  const openModal = (e) => {
    // setSelectedKlass(todayKlasses.filter((k) => k.id == e.target.value));
    // console.log(e.target.value);
  };

  return (
    <>
      <StyledTimeline>
        <Timeline>
          {todayKlasses.map((klass) => (
            <TimelineItem key={klass.id}>
              <TimelineSeparator>
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
                  {/* <Link to={`/register/${klass.id}`}> */}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={openModal}
                    value={klass.id}
                  >
                    수강신청
                  </Button>
                  {/* </Link> */}
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </StyledTimeline>
      <BookingModal open={open} selectedKlass={selectedKlass} />
    </>
  );
};

export default BookingClassList;
