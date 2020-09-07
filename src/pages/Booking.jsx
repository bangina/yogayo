import React from "react";
import "react-calendar/dist/Calendar.css";
import BookingCalendar from "../components/BookingCalendar";
import BookingSessionList from "../components/BookingSessionList";

const Booking = () => {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      <BookingCalendar />
      <BookingSessionList />
    </div>
  );
};

export default Booking;
