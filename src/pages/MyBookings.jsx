import React, { useState } from "react";
import { useSelector } from "react-redux";
import SessionCard from "../components/SessionCard";
import Voucher from "./Voucher";
import TabBar from "../components/TabBar";
import TabPanel from "../components/TabPanel";

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

  const [value, setValue] = useState(0);

  const handleChage = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Voucher />
      <TabBar onChange={handleChage} menu="bookings">
        <TabPanel value={value} index={0}>
          {enrolledSessions.map((enrolledSession) => (
            <SessionCard
              key={enrolledSession.id}
              enrolledSession={enrolledSession}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {enrolledSessions.map((enrolledSession) => (
            <SessionCard
              key={enrolledSession.id}
              enrolledSession={enrolledSession}
            />
          ))}
        </TabPanel>
      </TabBar>
    </div>
  );
};
export default MyBookings;
