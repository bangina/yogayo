import React from "react";
import "react-calendar/dist/Calendar.css";
import BookingCalendar from "../components/BookingCalendar";
import BookingSessionList from "../components/BookingSessionList";
import Typography from "@material-ui/core/Typography";
import { isUserAuthenticated } from "../utils/authUtils";
import { useHistory } from "react-router-dom";
const Booking = () => {
  let history = useHistory();
  return (
    <>
      {isUserAuthenticated() ? (
        <>
          <Typography variant="h4" gutterBottom color="primary">
            수업 예약하기
          </Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" gutterBottom color="primary" style={{ width: "100%" }}>
              날짜를 선택하세요.
            </Typography>
            <BookingCalendar />
            <BookingSessionList />
          </div>
        </>
      ) : (
        history.push("main")
      )}
    </>
  );
};

export default Booking;
