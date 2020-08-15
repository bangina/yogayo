import React from "react";
import "react-calendar/dist/Calendar.css";
import BookingCalendar from "./BookingCalendar";
import BookingClassList from "./BookingClassList";

const Booking = () => {
  return (
    <div>
      <BookingCalendar />
      <BookingClassList />
    </div>
  );
};

export default Booking;
