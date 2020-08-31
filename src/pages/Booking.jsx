import React from "react";
import "react-calendar/dist/Calendar.css";
import BookingCalendar from "../components/BookingCalendar";
import BookingSessionList from "../components/BookingSessionList";

const Booking = () => {
  return (
    <div>
      {/* onClick=>  set selectedDate  */}
      <BookingCalendar />
      {/* selectedDate로 필터해서 map돌리기 */}
      <BookingSessionList />
    </div>
  );
};

export default Booking;
