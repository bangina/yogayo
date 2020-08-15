import React from "react";
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
  return (
    <StyledTimeline>
      <Timeline>
      <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">09:00</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                아쉬탕가 중급
              </Typography>
              <Typography>09:00 - 10:00 | 간디룸A</Typography>
              <Button variant="outlined" color="primary">
                수강신청
              </Button>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">09:00</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                아쉬탕가 중급
              </Typography>
              <Typography>09:00 - 10:00 | 간디룸A</Typography>
              <Button variant="outlined" color="primary">
                수강신청
              </Button>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">09:00</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                아쉬탕가 중급
              </Typography>
              <Typography>09:00 - 10:00 | 간디룸A</Typography>
              <Button variant="outlined" color="primary">
                수강신청
              </Button>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">09:00</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                아쉬탕가 중급
              </Typography>
              <Typography>09:00 - 10:00 | 간디룸A</Typography>
              <Button variant="outlined" color="primary">
                수강신청
              </Button>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        </Timeline>
    </StyledTimeline>
  );
};

export default BookingClassList;
