import React from "react";
import "react-calendar/dist/Calendar.css";
import BookingCalendar from "../components/BookingCalendar";
import BookingSessionList from "../components/BookingSessionList";

const Booking = () => {
  return (
    <div>
      <BookingCalendar />
      <BookingSessionList />
    </div>
  );
};

export default Booking;
