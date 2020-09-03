import React from "react";
import { useSelector } from "react-redux";
import SessionCard from "../components/SessionCard";
import BookingTabs from "../components/BookingTabs";

const MyBookings = () => {
  const globalMemberSessions = useSelector(
    (state) => state.memberSession.memberSessions
  );
  const enrolledSessionIds = globalMemberSessions[0].enrolledSessions; //[1,2,3]
  const globalSessions = useSelector((state) => state.session.sessions);
  const enrolledSessions = [];
  for (let i = 1; i <= enrolledSessionIds.length; i++) {
    enrolledSessions.push(
      globalSessions.filter((globalSession) => globalSession.id === i)
    );
  }
  console.log(enrolledSessionIds);
  console.log(globalSessions);
  console.log("enrolledSessions", enrolledSessions);
  return (
    <div>
      <BookingTabs />
      {enrolledSessions.map((enrolledSession) => (
        <SessionCard
          key={enrolledSession.id}
          enrolledSession={enrolledSession}
        />
      ))}
    </div>
  );
};
export default MyBookings;
