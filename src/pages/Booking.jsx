import React from "react";
import "react-calendar/dist/Calendar.css";
import BookingCalendar from "../components/BookingCalendar";
import BookingClassList from "../components/BookingClassList";

const Booking = () => {
  return (
    <div>
      {/* onClick=>  set selectedDate  */}
      <BookingCalendar />
      {/* selectedDate로 필터해서 map돌리기 */}
      <BookingClassList />
    </div>
  );
};

export default Booking;
