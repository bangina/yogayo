import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
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
import BookingCard from "./BookingCard"
import { selectSession } from "../redux/session";
import { openModal } from "../redux/modal";
import axios from "axios";

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
    background: rgba(207, 85, 108, 1);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    padding: 0;
    margin-bottom: 0;
    text-align: center;
    display: block;
    margin-top: 0;
  }
  .MuiTimelineConnector-root {
    background: rgba(0, 0, 0, 0.15);
    width: 1px;
  }
`;
const BookingSessionList = () => {
  const globalLesson = useSelector((state) => state.session);
  const [selectedSession, setSelectedSession] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const selectedDate = globalLesson.selectedDate;
  const apiUrl = `http://127.0.0.1:8000/api/lessons/${selectedDate.getFullYear()}-${
    selectedDate.getMonth() + 1
  }-${selectedDate.getDate()}`;
  const apiCall = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        setSessions(response.data);
        console.log("sessions 부킹 세션 리스트", response.data)
      })
      .catch((response) => {
        console.error(response);
      });
  };
  useEffect(() => {
    apiCall();
  }, [selectedDate]);
  
  return (
    <>
      <StyledTimeline>
          {sessions.map((session) => (
            <BookingCard session={session} key={session.id} type="booking"/>
          ))}
      </StyledTimeline>
      <BookingModal isOpen={isOpen} selectedSession={selectedSession} />
    </>
  );
};
export default BookingSessionList;
