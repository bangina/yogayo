import React from "react";
import "react-calendar/dist/Calendar.css";
import BookingCalendar from "../components/BookingCalendar";
import BookingSessionList from "../components/BookingSessionList";
import Typography from "@material-ui/core/Typography";
const Booking = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        수업 예약하기
      </Typography>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Typography gutterBottom color="primary">
          날짜를 선택하세요.
        </Typography>
        <BookingCalendar />
        <BookingSessionList />
      </div>
    </>
  );
};

export default Booking;
