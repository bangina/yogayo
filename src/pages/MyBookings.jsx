import React from "react";
import { useSelector } from "react-redux";
import SessionCard from "../components/SessionCard";
import BookingTabs from "../components/BookingTabs";

const MyBookings = () => {
  const globalSession = useSelector((state) => state.session);
  const enrolledSessions = globalSession.enrolledSessions;
  return (
    <div>
      <BookingTabs />
      {enrolledSessions.map((enrolledSession) => (
        <SessionCard key={enrolledSession.id} session={enrolledSession} />
      ))}
    </div>
  );
};
export default MyBookings;
